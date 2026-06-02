(function() {
  'use strict';

  let appliances = [];

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('rate')) setValue('electricity-rate', params.get('rate'));
    if (params.has('period')) setValue('billing-period', params.get('period'));
    if (params.has('items')) {
      try {
        const items = JSON.parse(decodeURIComponent(params.get('items')));
        if (Array.isArray(items)) {
          appliances = items;
          renderApplianceList();
        }
      } catch(e) {}
    }
    if (params.toString() && appliances.length > 0) setTimeout(() => calculateResults(), 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('rate', getValue('electricity-rate'));
    params.set('period', getValue('billing-period'));
    if (appliances.length > 0) {
      params.set('items', encodeURIComponent(JSON.stringify(appliances)));
    }
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('add-preset-btn').addEventListener('click', addPreset);
    document.getElementById('add-custom-btn').addEventListener('click', addCustom);
    document.getElementById('clear-all-btn').addEventListener('click', clearAll);
    document.getElementById('share-calculation').addEventListener('click', shareCalculation);

    document.getElementById('appliance-preset').addEventListener('dblclick', addPreset);

    document.querySelectorAll('.form-input, .form-select').forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (this.id === 'custom-hours' || this.id === 'custom-watts' || this.id === 'custom-name') {
            addCustom();
          } else {
            calculateResults();
          }
        }
      });
      input.addEventListener('change', saveToURL);
    });
  }

  function addPreset() {
    const select = document.getElementById('appliance-preset');
    if (!select.value) return;

    const [name, watts, hours] = select.value.split('|');
    appliances.push({ name, watts: parseFloat(watts), hours: parseFloat(hours) });
    select.value = '';
    renderApplianceList();
    saveToURL();
  }

  function addCustom() {
    const name = document.getElementById('custom-name').value.trim();
    const watts = parseFloat(document.getElementById('custom-watts').value);
    const hours = parseFloat(document.getElementById('custom-hours').value);

    if (!name) { alert('Please enter an appliance name.'); return; }
    if (!watts || watts <= 0) { alert('Please enter a valid wattage.'); return; }
    if (!hours || hours <= 0) { alert('Please enter daily usage hours.'); return; }

    appliances.push({ name, watts, hours });
    document.getElementById('custom-name').value = '';
    document.getElementById('custom-watts').value = '';
    document.getElementById('custom-hours').value = '';
    renderApplianceList();
    saveToURL();
  }

  function removeAppliance(index) {
    appliances.splice(index, 1);
    renderApplianceList();
    saveToURL();
  }

  function clearAll() {
    appliances = [];
    renderApplianceList();
    saveToURL();
    document.getElementById('electricity-result').classList.add('hidden');
  }

  function renderApplianceList() {
    const listSection = document.getElementById('appliance-list-section');
    const listDiv = document.getElementById('appliance-list');
    const countSpan = document.getElementById('appliance-count');

    if (appliances.length === 0) {
      listSection.style.display = 'none';
      return;
    }

    listSection.style.display = '';
    countSpan.textContent = `(${appliances.length})`;

    listDiv.innerHTML = appliances.map((a, i) => `
      <div class="appliance-item" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--color-bg-light); border-radius: 8px; margin-bottom: 0.5rem;">
        <div style="flex: 1;">
          <strong>${a.name}</strong>
          <span style="color: var(--color-gray-dark); font-size: 0.85rem;"> — ${a.watts}W × ${a.hours}h/day</span>
        </div>
        <div style="font-weight: 600; color: var(--color-primary); white-space: nowrap;">
          ${((a.watts * a.hours) / 1000).toFixed(2)} kWh/day
        </div>
        <button type="button" class="btn-remove" onclick="window.__removeAppliance(${i})" style="background: none; border: none; cursor: pointer; color: var(--color-danger); font-size: 1.2rem; padding: 0 0.5rem;" title="Remove">×</button>
      </div>
    `).join('');
  }

  window.__removeAppliance = removeAppliance;

  function calculateResults() {
    if (appliances.length === 0) {
      showError('Please add at least one appliance to calculate costs.');
      return;
    }

    const rate = parseFloat(getValue('electricity-rate')) || 0.16;
    const period = getValue('billing-period');
    const days = period === 'annual' ? 365 : 30;
    const periodLabel = period === 'annual' ? 'Annual' : 'Monthly';

    saveToURL();

    const results = appliances.map(a => {
      const dailyKwh = (a.watts * a.hours) / 1000;
      const periodKwh = dailyKwh * days;
      const periodCost = periodKwh * rate;
      const annualCost = dailyKwh * 365 * rate;
      return {
        ...a,
        dailyKwh,
        periodKwh,
        periodCost,
        annualCost
      };
    });

    const totalDailyKwh = results.reduce((sum, r) => sum + r.dailyKwh, 0);
    const totalPeriodKwh = results.reduce((sum, r) => sum + r.periodKwh, 0);
    const totalPeriodCost = results.reduce((sum, r) => sum + r.periodCost, 0);
    const totalAnnualCost = results.reduce((sum, r) => sum + r.annualCost, 0);

    results.sort((a, b) => b.periodCost - a.periodCost);

    const topConsumer = results[0];
    const topConsumerPct = (topConsumer.periodCost / totalPeriodCost * 100).toFixed(0);

    displayResults({
      results, totalDailyKwh, totalPeriodKwh, totalPeriodCost, totalAnnualCost,
      rate, days, periodLabel, topConsumer, topConsumerPct
    });
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('electricity-result');
    if (!resultDiv) return;

    const maxCost = data.results[0].periodCost;

    resultDiv.innerHTML = `
      <h3>⚡ Electricity Cost Breakdown</h3>

      <div class="profit-status ${data.totalAnnualCost < 1500 ? 'status-excellent' : data.totalAnnualCost < 3000 ? 'status-good' : 'status-moderate'}">
        <div class="status-icon">${data.totalAnnualCost < 1500 ? '🟢' : data.totalAnnualCost < 3000 ? '🟡' : '🔴'}</div>
        <div class="status-content">
          <strong>Estimated ${data.periodLabel} Bill: ${formatCurrency(data.totalPeriodCost)}</strong>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">
            ${data.results.length} appliance${data.results.length > 1 ? 's' : ''} consuming ${data.totalDailyKwh.toFixed(1)} kWh/day at $${data.rate}/kWh
          </p>
        </div>
      </div>

      <div class="margin-cards">
        <div class="margin-card highlight">
          <div class="margin-card-icon">💰</div>
          <div class="margin-card-value">${formatCurrency(data.totalPeriodCost)}</div>
          <div class="margin-card-label">${data.periodLabel} Cost</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">⚡</div>
          <div class="margin-card-value">${data.totalPeriodKwh.toFixed(0)}</div>
          <div class="margin-card-label">${data.periodLabel} kWh</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📅</div>
          <div class="margin-card-value">${formatCurrency(data.totalAnnualCost)}</div>
          <div class="margin-card-label">Annual Cost</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📊</div>
          <div class="margin-card-value">${data.totalDailyKwh.toFixed(1)}</div>
          <div class="margin-card-label">kWh/Day</div>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>📊 Cost by Appliance</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Appliance</th><th>Watts</th><th>Hrs/Day</th><th>kWh/Day</th><th>${data.periodLabel} Cost</th><th>% of Total</th></tr></thead>
            <tbody>
              ${data.results.map((r, i) => `
                <tr class="${i === 0 ? 'current-row' : ''}">
                  <td><strong>${r.name}</strong></td>
                  <td>${r.watts.toLocaleString()}W</td>
                  <td>${r.hours}h</td>
                  <td>${r.dailyKwh.toFixed(2)}</td>
                  <td><strong>${formatCurrency(r.periodCost)}</strong></td>
                  <td>${(r.periodCost / data.totalPeriodCost * 100).toFixed(1)}%</td>
                </tr>
              `).join('')}
              <tr style="font-weight: bold; border-top: 2px solid var(--color-border);">
                <td>TOTAL</td>
                <td>—</td>
                <td>—</td>
                <td>${data.totalDailyKwh.toFixed(2)}</td>
                <td>${formatCurrency(data.totalPeriodCost)}</td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>📈 Energy Usage Chart</h4>
        <div style="padding: 1rem 0;">
          ${data.results.slice(0, 10).map(r => {
            const pct = (r.periodCost / maxCost * 100).toFixed(0);
            return `
              <div style="margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 0.85rem;">
                  <span>${r.name}</span>
                  <span style="font-weight: 600;">${formatCurrency(r.periodCost)}</span>
                </div>
                <div style="height: 1.25rem; background: var(--color-bg-light); border-radius: 6px; overflow: hidden;">
                  <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, var(--color-primary), var(--color-light-blue)); border-radius: 6px; transition: width 0.3s;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      ${getEVComparison(data.rate)}

      <div class="insights-grid">
        <div class="insight-card insight-info">
          <div class="insight-icon">🔌</div>
          <div class="insight-content">
            <h5>Biggest Consumer</h5>
            <p><strong>${data.topConsumer.name}</strong> accounts for ${data.topConsumerPct}% of your electricity costs (${formatCurrency(data.topConsumer.periodCost)}/${data.periodLabel.toLowerCase()}).</p>
          </div>
        </div>
        <div class="insight-card insight-success">
          <div class="insight-icon">💡</div>
          <div class="insight-content">
            <h5>Savings Opportunity</h5>
            <p>Reducing ${data.topConsumer.name} usage by 25% would save ${formatCurrency(data.topConsumer.annualCost * 0.25)}/year.</p>
          </div>
        </div>
      </div>

      <div class="pricing-scenarios">
        <h4>💰 Rate Comparison</h4>
        <p style="color: var(--color-gray-dark); margin-bottom: 1rem; font-size: 0.9rem;">See how different electricity rates affect your bill:</p>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Rate</th><th>Monthly</th><th>Annual</th><th>vs Current</th></tr></thead>
            <tbody>
              ${[0.10, 0.13, 0.16, 0.20, 0.25, 0.30].map(r => {
                const monthlyCost = data.totalDailyKwh * 30 * r;
                const annualCost = data.totalDailyKwh * 365 * r;
                const diff = annualCost - data.totalAnnualCost;
                const isCurrent = Math.abs(r - data.rate) < 0.005;
                return `
                  <tr class="${isCurrent ? 'current-row' : ''}">
                    <td>$${r.toFixed(2)}/kWh${isCurrent ? ' (yours)' : ''}</td>
                    <td>${formatCurrency(monthlyCost)}</td>
                    <td>${formatCurrency(annualCost)}</td>
                    <td class="${diff < 0 ? 'text-success' : diff > 0 ? 'text-danger' : ''}">${isCurrent ? '—' : (diff >= 0 ? '+' : '') + formatCurrency(diff)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function getEVComparison(rate) {
    const evEfficiency = 3.5; // miles per kWh
    const evBattery = 60; // kWh typical
    const fullChargeCost = evBattery * rate;
    const evCostPerMile = rate / evEfficiency;
    const gasPrice = 3.50;
    const gasMpg = 28;
    const gasCostPerMile = gasPrice / gasMpg;
    const savingsPct = ((gasCostPerMile - evCostPerMile) / gasCostPerMile * 100).toFixed(0);
    const annualMiles = 12000;
    const evAnnualFuel = annualMiles * evCostPerMile;
    const gasAnnualFuel = annualMiles * gasCostPerMile;

    return `
      <div class="pricing-scenarios">
        <h4>🚗 EV vs Gasoline Cost (at your rate)</h4>
        <p style="color: var(--color-gray-dark); margin-bottom: 1rem; font-size: 0.9rem;">Based on $${rate}/kWh electricity, $3.50/gal gas, 28 MPG average, 12,000 mi/year:</p>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Metric</th><th>Electric Vehicle</th><th>Gasoline Car</th></tr></thead>
            <tbody>
              <tr>
                <td>Cost per mile</td>
                <td class="text-success"><strong>$${evCostPerMile.toFixed(3)}</strong></td>
                <td>$${gasCostPerMile.toFixed(3)}</td>
              </tr>
              <tr>
                <td>Full "tank" cost</td>
                <td class="text-success"><strong>${formatCurrency(fullChargeCost)}</strong> (${(evBattery * evEfficiency).toFixed(0)} mi range)</td>
                <td>${formatCurrency(gasPrice * 14)} (14 gal, ${14 * gasMpg} mi range)</td>
              </tr>
              <tr>
                <td>Annual fuel cost (12k mi)</td>
                <td class="text-success"><strong>${formatCurrency(evAnnualFuel)}</strong></td>
                <td>${formatCurrency(gasAnnualFuel)}</td>
              </tr>
              <tr class="current-row">
                <td><strong>Annual savings with EV</strong></td>
                <td colspan="2" class="text-success"><strong>${formatCurrency(gasAnnualFuel - evAnnualFuel)}/year (${savingsPct}% less)</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function showError(message) {
    const resultDiv = document.getElementById('electricity-result');
    if (resultDiv) { resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`; resultDiv.classList.remove('hidden'); }
  }

  function getValue(id) { const el = document.getElementById(id); return el ? el.value : ''; }
  function setValue(id, value) { const el = document.getElementById(id); if (el) el.value = value; }
  function formatCurrency(amount) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount); }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'Electricity Cost Calculator', url }).catch(() => copyToClipboard(url)); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-calculation');
      if (btn) { const orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(() => { btn.innerHTML = orig; }, 2000); }
    }).catch(() => {});
  }
})();
