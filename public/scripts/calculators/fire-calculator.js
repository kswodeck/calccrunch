(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('age')) setValue('current-age', params.get('age'));
    if (params.has('target')) setValue('target-age', params.get('target'));
    if (params.has('savings')) setValue('current-savings', params.get('savings'));
    if (params.has('income')) setValue('annual-income', params.get('income'));
    if (params.has('expenses')) setValue('annual-expenses', params.get('expenses'));
    if (params.has('monthly')) setValue('monthly-savings', params.get('monthly'));
    if (params.has('return')) setValue('return-rate', params.get('return'));
    if (params.has('inflation')) setValue('inflation-rate', params.get('inflation'));
    if (params.has('swr')) setValue('withdrawal-rate', params.get('swr'));

    if (params.toString()) setTimeout(() => calculateResults(), 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('age', getValue('current-age'));
    params.set('target', getValue('target-age'));
    params.set('savings', getValue('current-savings'));
    params.set('income', getValue('annual-income'));
    params.set('expenses', getValue('annual-expenses'));
    params.set('monthly', getValue('monthly-savings'));
    params.set('return', getValue('return-rate'));
    params.set('inflation', getValue('inflation-rate'));
    params.set('swr', getValue('withdrawal-rate'));
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
    const currentAge = getValue('current-age');
    const targetAge = getValue('target-age');
    const currentSavings = getValue('current-savings');
    const annualIncome = getValue('annual-income');
    const annualExpenses = getValue('annual-expenses');
    const monthlySavings = getValue('monthly-savings');
    const returnRate = getValue('return-rate') / 100;
    const inflationRate = getValue('inflation-rate') / 100;
    const withdrawalRate = getValue('withdrawal-rate') / 100;

    if (annualExpenses <= 0 || withdrawalRate <= 0) {
      showError('Please enter valid expenses and withdrawal rate.');
      return;
    }

    saveToURL();

    // FIRE number
    const fireNumber = annualExpenses / withdrawalRate;

    // Real return rate (inflation-adjusted)
    const realReturn = (1 + returnRate) / (1 + inflationRate) - 1;

    // Savings rate
    const annualSavings = monthlySavings * 12;
    const savingsRate = annualIncome > 0 ? (annualSavings / annualIncome) * 100 : 0;

    // Year-by-year projection
    const projection = [];
    let balance = currentSavings;
    let yearsToFire = null;
    const monthlyReturn = returnRate / 12;

    for (let year = 0; year <= 50; year++) {
      if (year > 0) {
        // Compound monthly
        for (let m = 0; m < 12; m++) {
          balance = balance * (1 + monthlyReturn) + monthlySavings;
        }
      }

      projection.push({
        year,
        age: currentAge + year,
        balance: balance,
        percentToFire: Math.min((balance / fireNumber) * 100, 100)
      });

      if (yearsToFire === null && balance >= fireNumber) {
        yearsToFire = year;
      }

      if (year > 0 && balance >= fireNumber * 2) break;
    }

    if (yearsToFire === null) yearsToFire = 50;

    const fireAge = currentAge + yearsToFire;
    const progressPct = Math.min((currentSavings / fireNumber) * 100, 100);

    // Coast FIRE: amount needed today that grows to FIRE number by target age with no contributions
    const yearsToTarget = targetAge - currentAge;
    const coastFireNumber = yearsToTarget > 0 ? fireNumber / Math.pow(1 + returnRate, yearsToTarget) : fireNumber;

    // FIRE type
    let fireType;
    if (annualExpenses < 40000) fireType = { name: 'Lean FIRE', emoji: '🍃', desc: 'Minimalist lifestyle' };
    else if (annualExpenses <= 100000) fireType = { name: 'Regular FIRE', emoji: '🔥', desc: 'Comfortable middle-class' };
    else fireType = { name: 'Fat FIRE', emoji: '🌟', desc: 'Luxurious early retirement' };

    // What-if scenarios
    const whatIf = [
      { label: 'Save $500 more/month', monthlySavingsAdj: monthlySavings + 500 },
      { label: 'Returns 1% lower', returnAdj: returnRate - 0.01 },
      { label: 'Expenses +10%', expensesAdj: annualExpenses * 1.1 }
    ].map(scenario => {
      const ms = scenario.monthlySavingsAdj || monthlySavings;
      const rr = scenario.returnAdj || returnRate;
      const exp = scenario.expensesAdj || annualExpenses;
      const fn = exp / withdrawalRate;
      let bal = currentSavings;
      let yrs = null;
      const mr = rr / 12;
      for (let y = 1; y <= 50; y++) {
        for (let m = 0; m < 12; m++) { bal = bal * (1 + mr) + ms; }
        if (bal >= fn) { yrs = y; break; }
      }
      return { ...scenario, yearsToFire: yrs || 50, fireNumber: fn };
    });

    displayResults({
      fireNumber, yearsToFire, fireAge, currentAge, currentSavings, progressPct,
      savingsRate, coastFireNumber, fireType, projection, whatIf, annualExpenses, monthlySavings
    });
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('fire-result');
    if (!resultDiv) return;

    const displayProjection = data.projection.filter((_, i) => {
      if (data.yearsToFire <= 15) return true;
      return i % Math.ceil(data.yearsToFire / 15) === 0 || i === data.yearsToFire;
    }).slice(0, 20);

    resultDiv.innerHTML = `
      <h3>${data.fireType.emoji} Your FIRE Plan</h3>

      <div class="profit-status ${data.yearsToFire <= 10 ? 'status-excellent' : data.yearsToFire <= 20 ? 'status-good' : 'status-moderate'}">
        <div class="status-icon">${data.yearsToFire <= 10 ? '🚀' : data.yearsToFire <= 20 ? '📈' : '📊'}</div>
        <div class="status-content">
          <strong>${data.yearsToFire <= 10 ? 'On track for early FIRE!' : data.yearsToFire <= 20 ? 'Solid FIRE timeline' : 'Long road ahead — increase savings rate'}</strong>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">${data.fireType.name} (${data.fireType.desc}) — ${formatCurrency(data.annualExpenses)}/year in retirement</p>
        </div>
      </div>

      <div class="age-hero">
        <div class="age-big">${formatCurrency(data.fireNumber)}</div>
        <div style="color: var(--color-gray-dark);">Your FIRE Number (25× annual expenses)</div>
      </div>

      <div class="progress-section">
        <h4>📊 Progress to FIRE</h4>
        <div class="progress-bar-container" style="height: 2rem; border-radius: 1rem; overflow: hidden;">
          <div class="progress-bar" style="width: ${data.progressPct}%; background: linear-gradient(90deg, #10b981, #34d399); border-radius: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
            ${data.progressPct.toFixed(1)}%
          </div>
        </div>
        <small>${formatCurrency(data.currentSavings)} of ${formatCurrency(data.fireNumber)}</small>
      </div>

      <div class="margin-cards">
        <div class="margin-card highlight">
          <div class="margin-card-icon">🎯</div>
          <div class="margin-card-value">${data.yearsToFire}</div>
          <div class="margin-card-label">Years to FIRE</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">🎂</div>
          <div class="margin-card-value">${data.fireAge}</div>
          <div class="margin-card-label">FIRE Age</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">💰</div>
          <div class="margin-card-value">${data.savingsRate.toFixed(0)}%</div>
          <div class="margin-card-label">Savings Rate</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">🏖️</div>
          <div class="margin-card-value">${formatCurrency(data.coastFireNumber)}</div>
          <div class="margin-card-label">Coast FIRE Number</div>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>📅 Portfolio Growth Projection</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Year</th><th>Age</th><th>Portfolio</th><th>% to FIRE</th></tr></thead>
            <tbody>
              ${displayProjection.map(p => `
                <tr class="${p.year === data.yearsToFire ? 'current-row' : ''}">
                  <td>${p.year === 0 ? 'Now' : 'Year ' + p.year}</td>
                  <td>${p.age}</td>
                  <td><strong>${formatCurrency(p.balance)}</strong></td>
                  <td>${p.percentToFire.toFixed(1)}% ${p.year === data.yearsToFire ? '🎉' : ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="pricing-scenarios">
        <h4>🔮 What-If Scenarios</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Scenario</th><th>Years to FIRE</th><th>Difference</th></tr></thead>
            <tbody>
              <tr class="current-row"><td><strong>Current Plan</strong></td><td><strong>${data.yearsToFire} years</strong></td><td>—</td></tr>
              ${data.whatIf.map(w => `
                <tr>
                  <td>${w.label}</td>
                  <td>${w.yearsToFire} years</td>
                  <td class="${w.yearsToFire < data.yearsToFire ? 'text-success' : 'text-danger'}">${w.yearsToFire - data.yearsToFire > 0 ? '+' : ''}${w.yearsToFire - data.yearsToFire} years</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="insights-grid">
        <div class="insight-card insight-success">
          <div class="insight-icon">💰</div>
          <div class="insight-content"><h5>Monthly Savings</h5><p>You're investing ${formatCurrency(data.monthlySavings)}/month (${data.savingsRate.toFixed(0)}% savings rate). FIRE community targets 50%+.</p></div>
        </div>
        <div class="insight-card insight-info">
          <div class="insight-icon">🏖️</div>
          <div class="insight-content"><h5>Coast FIRE</h5><p>If you already had ${formatCurrency(data.coastFireNumber)} invested, you could stop saving and still reach FIRE by your target age.</p></div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    const resultDiv = document.getElementById('fire-result');
    if (resultDiv) { resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`; resultDiv.classList.remove('hidden'); }
  }

  function getValue(id) { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }
  function setValue(id, value) { const el = document.getElementById(id); if (el) el.value = value; }
  function formatCurrency(amount) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount); }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'FIRE Calculator', url }).catch(() => copyToClipboard(url)); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-calculation');
      if (btn) { const orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(() => { btn.innerHTML = orig; }, 2000); }
    }).catch(() => {});
  }
})();
