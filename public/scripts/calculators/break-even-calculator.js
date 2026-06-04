(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('fixed')) setValue('fixed-costs', params.get('fixed'));
    if (params.has('variable')) setValue('variable-cost', params.get('variable'));
    if (params.has('price')) setValue('selling-price', params.get('price'));
    if (params.has('units')) setValue('expected-units', params.get('units'));
    if (params.has('profit')) setValue('target-profit', params.get('profit'));

    if (params.toString()) setTimeout(() => calculateResults(), 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('fixed', getValue('fixed-costs'));
    params.set('variable', getValue('variable-cost'));
    params.set('price', getValue('selling-price'));
    params.set('units', getValue('expected-units'));
    params.set('profit', getValue('target-profit'));
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('keypress', function(e) { if (e.key === 'Enter') { e.preventDefault(); calculateResults(); } });
      input.addEventListener('change', saveToURL);
    });

    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function calculateResults() {
    const fixedCosts = getValue('fixed-costs');
    const variableCost = getValue('variable-cost');
    const sellingPrice = getValue('selling-price');
    const expectedUnits = getValue('expected-units');
    const targetProfit = getValue('target-profit');

    if (sellingPrice <= variableCost) {
      showError('Selling price must be greater than variable cost per unit.');
      return;
    }
    if (fixedCosts <= 0) {
      showError('Please enter your fixed costs.');
      return;
    }

    saveToURL();

    const contributionMargin = sellingPrice - variableCost;
    const contributionMarginRatio = contributionMargin / sellingPrice;
    const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
    const breakEvenRevenue = fixedCosts / contributionMarginRatio;

    // Target profit units
    const targetProfitUnits = targetProfit > 0 ? Math.ceil((fixedCosts + targetProfit) / contributionMargin) : null;

    // Expected units analysis
    let projectedProfit = null;
    let safetyMargin = null;
    if (expectedUnits > 0) {
      projectedProfit = (expectedUnits * contributionMargin) - fixedCosts;
      safetyMargin = ((expectedUnits - breakEvenUnits) / expectedUnits) * 100;
    }

    // Profit at various levels
    const levels = [0.5, 0.75, 1, 1.25, 1.5, 2].map(mult => {
      const units = Math.round(breakEvenUnits * mult);
      const revenue = units * sellingPrice;
      const totalCosts = fixedCosts + (units * variableCost);
      const profit = revenue - totalCosts;
      return { mult, units, revenue, totalCosts, profit };
    });

    // Pricing scenarios
    const scenarios = [
      { label: 'Price +10%', price: sellingPrice * 1.1, variable: variableCost },
      { label: 'Price -10%', price: sellingPrice * 0.9, variable: variableCost },
      { label: 'Variable Cost +10%', price: sellingPrice, variable: variableCost * 1.1 },
      { label: 'Variable Cost -10%', price: sellingPrice, variable: variableCost * 0.9 }
    ].map(s => {
      const cm = s.price - s.variable;
      const be = cm > 0 ? Math.ceil(fixedCosts / cm) : Infinity;
      return { ...s, breakEven: be, diff: be - breakEvenUnits };
    });

    displayResults({
      fixedCosts, variableCost, sellingPrice, contributionMargin, contributionMarginRatio,
      breakEvenUnits, breakEvenRevenue, targetProfitUnits, targetProfit,
      expectedUnits, projectedProfit, safetyMargin, levels, scenarios
    });
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('break-even-result');
    if (!resultDiv) return;

    const isProfitable = data.projectedProfit !== null && data.projectedProfit > 0;
    const statusClass = data.projectedProfit === null ? 'status-good' : isProfitable ? 'status-excellent' : 'status-loss';

    resultDiv.innerHTML = `
      <h3>⚖️ Break-Even Analysis</h3>

      ${data.expectedUnits > 0 ? `
        <div class="profit-status ${statusClass}">
          <div class="status-icon">${isProfitable ? '✅' : '🚨'}</div>
          <div class="status-content">
            <strong>${isProfitable ? `Profitable — ${formatCurrency(data.projectedProfit)}/month` : `Loss of ${formatCurrency(Math.abs(data.projectedProfit))}/month`}</strong>
            <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">
              ${isProfitable
                ? `Safety margin: ${data.safetyMargin.toFixed(1)}% above break-even`
                : `Need ${data.breakEvenUnits - data.expectedUnits} more units to break even`}
            </p>
          </div>
        </div>
      ` : ''}

      <div class="margin-cards">
        <div class="margin-card highlight">
          <div class="margin-card-icon">⚖️</div>
          <div class="margin-card-value">${data.breakEvenUnits.toLocaleString()}</div>
          <div class="margin-card-label">Break-Even Units</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">💵</div>
          <div class="margin-card-value">${formatCurrency(data.breakEvenRevenue)}</div>
          <div class="margin-card-label">Break-Even Revenue</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📊</div>
          <div class="margin-card-value">${formatCurrency(data.contributionMargin)}</div>
          <div class="margin-card-label">Contribution Margin/Unit</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📈</div>
          <div class="margin-card-value">${(data.contributionMarginRatio * 100).toFixed(1)}%</div>
          <div class="margin-card-label">CM Ratio</div>
        </div>
      </div>

      ${data.targetProfitUnits ? `
        <div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
          <h4>🎯 To reach your target profit of ${formatCurrency(data.targetProfit)}/month:</h4>
          <p>You need to sell <strong>${data.targetProfitUnits.toLocaleString()} units</strong> (${formatCurrency(data.targetProfitUnits * data.sellingPrice)} in revenue)</p>
        </div>
      ` : ''}

      <div class="break-even-visual">
        <h4>📊 Profit/Loss Zone</h4>
        <div class="zone-bar">
          <div class="zone-loss" style="width: 50%;">
            <span>LOSS ZONE</span>
          </div>
          <div class="zone-marker">⚖️ ${data.breakEvenUnits} units</div>
          <div class="zone-profit" style="width: 50%;">
            <span>PROFIT ZONE</span>
          </div>
        </div>
        ${data.expectedUnits > 0 ? `
          <div class="expected-marker" style="margin-top: 0.5rem; text-align: center;">
            📍 Your expected: ${data.expectedUnits} units (${data.expectedUnits >= data.breakEvenUnits ? 'in profit zone ✅' : 'in loss zone ⚠️'})
          </div>
        ` : ''}
      </div>

      <div class="profit-breakdown">
        <h4>📋 Profit at Various Volumes</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Volume</th><th>Units</th><th>Revenue</th><th>Total Costs</th><th>Profit/Loss</th></tr></thead>
            <tbody>
              ${data.levels.map(l => `
                <tr class="${l.mult === 1 ? 'current-row' : ''}">
                  <td>${l.mult === 1 ? 'Break-Even' : (l.mult * 100) + '% of BE'}</td>
                  <td>${l.units.toLocaleString()}</td>
                  <td>${formatCurrency(l.revenue)}</td>
                  <td>${formatCurrency(l.totalCosts)}</td>
                  <td class="${l.profit >= 0 ? 'text-success' : 'text-danger'}"><strong>${formatCurrency(l.profit)}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="pricing-scenarios">
        <h4>🔮 Pricing & Cost Scenarios</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Scenario</th><th>Break-Even Units</th><th>Change</th></tr></thead>
            <tbody>
              <tr class="current-row"><td><strong>Current</strong></td><td><strong>${data.breakEvenUnits}</strong></td><td>—</td></tr>
              ${data.scenarios.map(s => `
                <tr>
                  <td>${s.label}</td>
                  <td>${s.breakEven === Infinity ? '∞' : s.breakEven.toLocaleString()}</td>
                  <td class="${s.diff <= 0 ? 'text-success' : 'text-danger'}">${s.diff > 0 ? '+' : ''}${s.diff === Infinity ? '∞' : s.diff}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="insights-grid">
        <div class="insight-card insight-info">
          <div class="insight-icon">💡</div>
          <div class="insight-content"><h5>Contribution Margin</h5><p>Each unit sold contributes ${formatCurrency(data.contributionMargin)} toward covering fixed costs and profit.</p></div>
        </div>
        <div class="insight-card insight-success">
          <div class="insight-icon">📈</div>
          <div class="insight-content"><h5>After Break-Even</h5><p>Every additional unit beyond ${data.breakEvenUnits} generates ${formatCurrency(data.contributionMargin)} in pure profit.</p></div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    const resultDiv = document.getElementById('break-even-result');
    if (resultDiv) { resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`; resultDiv.classList.remove('hidden'); }
  }

  function getValue(id) { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }
  function setValue(id, value) { const el = document.getElementById(id); if (el) el.value = value; }
  function formatCurrency(amount) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount); }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'Break-Even Calculator', url }).catch(() => copyToClipboard(url)); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-calculation');
      if (btn) { const orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(() => { btn.innerHTML = orig; }, 2000); }
    }).catch(() => {});
  }
})();
