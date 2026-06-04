(function() {
  'use strict';

  const BRACKETS_2026 = {
    single: [
      { min: 0, max: 11925, rate: 10 },
      { min: 11926, max: 48475, rate: 12 },
      { min: 48476, max: 103350, rate: 22 },
      { min: 103351, max: 197300, rate: 24 },
      { min: 197301, max: 250525, rate: 32 },
      { min: 250526, max: 626350, rate: 35 },
      { min: 626351, max: Infinity, rate: 37 }
    ],
    mfj: [
      { min: 0, max: 23850, rate: 10 },
      { min: 23851, max: 96950, rate: 12 },
      { min: 96951, max: 206700, rate: 22 },
      { min: 206701, max: 394600, rate: 24 },
      { min: 394601, max: 501050, rate: 32 },
      { min: 501051, max: 751600, rate: 35 },
      { min: 751601, max: Infinity, rate: 37 }
    ],
    mfs: [
      { min: 0, max: 11925, rate: 10 },
      { min: 11926, max: 48475, rate: 12 },
      { min: 48476, max: 103350, rate: 22 },
      { min: 103351, max: 197300, rate: 24 },
      { min: 197301, max: 250525, rate: 32 },
      { min: 250526, max: 375800, rate: 35 },
      { min: 375801, max: Infinity, rate: 37 }
    ],
    hoh: [
      { min: 0, max: 17000, rate: 10 },
      { min: 17001, max: 64850, rate: 12 },
      { min: 64851, max: 103350, rate: 22 },
      { min: 103351, max: 197300, rate: 24 },
      { min: 197301, max: 250500, rate: 32 },
      { min: 250501, max: 626350, rate: 35 },
      { min: 626351, max: Infinity, rate: 37 }
    ]
  };

  const STANDARD_DEDUCTIONS = { single: 15000, mfj: 30000, mfs: 15000, hoh: 22500 };

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('status')) document.getElementById('filing-status').value = params.get('status');
    if (params.has('income')) setValue('gross-income', params.get('income'));
    if (params.has('k401')) setValue('deduction-401k', params.get('k401'));
    if (params.has('ira')) setValue('deduction-ira', params.get('ira'));
    if (params.has('hsa')) setValue('deduction-hsa', params.get('hsa'));
    if (params.has('student')) setValue('deduction-student', params.get('student'));
    if (params.has('ded_type')) {
      document.getElementById('deduction-type').value = params.get('ded_type');
      toggleItemized();
    }
    if (params.has('itemized')) setValue('itemized-amount', params.get('itemized'));

    if (params.toString()) setTimeout(() => calculateResults(), 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('status', document.getElementById('filing-status').value);
    params.set('income', getValue('gross-income'));
    params.set('k401', getValue('deduction-401k'));
    params.set('ira', getValue('deduction-ira'));
    params.set('hsa', getValue('deduction-hsa'));
    params.set('student', getValue('deduction-student'));
    params.set('ded_type', document.getElementById('deduction-type').value);
    if (document.getElementById('deduction-type').value === 'itemized') {
      params.set('itemized', getValue('itemized-amount'));
    }
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('deduction-type').addEventListener('change', toggleItemized);

    document.querySelectorAll('.form-input, .form-select').forEach(input => {
      input.addEventListener('keypress', function(e) { if (e.key === 'Enter') { e.preventDefault(); calculateResults(); } });
      input.addEventListener('change', saveToURL);
    });

    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function toggleItemized() {
    const isItemized = document.getElementById('deduction-type').value === 'itemized';
    document.getElementById('itemized-amount-group').style.display = isItemized ? 'block' : 'none';
  }

  function calculateResults() {
    const filingStatus = document.getElementById('filing-status').value;
    const grossIncome = getValue('gross-income');
    const k401 = getValue('deduction-401k');
    const ira = getValue('deduction-ira');
    const hsa = getValue('deduction-hsa');
    const student = getValue('deduction-student');
    const deductionType = document.getElementById('deduction-type').value;

    if (grossIncome <= 0) { showError('Please enter a valid gross income.'); return; }

    saveToURL();

    const aboveLineDeductions = k401 + ira + hsa + student;
    const agi = grossIncome - aboveLineDeductions;

    const standardDed = STANDARD_DEDUCTIONS[filingStatus];
    const itemizedDed = deductionType === 'itemized' ? getValue('itemized-amount') : 0;
    const deduction = deductionType === 'standard' ? standardDed : itemizedDed;

    const taxableIncome = Math.max(0, agi - deduction);
    const brackets = BRACKETS_2026[filingStatus];

    // Calculate tax per bracket
    const bracketBreakdown = [];
    let remainingIncome = taxableIncome;
    let totalTax = 0;

    for (const bracket of brackets) {
      const bracketSize = bracket.max === Infinity ? Infinity : bracket.max - bracket.min + 1;
      const incomeInBracket = Math.min(Math.max(0, remainingIncome), bracketSize);
      const taxInBracket = incomeInBracket * (bracket.rate / 100);

      bracketBreakdown.push({
        rate: bracket.rate,
        min: bracket.min,
        max: bracket.max,
        incomeInBracket,
        taxInBracket,
        filled: incomeInBracket > 0
      });

      totalTax += taxInBracket;
      remainingIncome -= incomeInBracket;
      if (remainingIncome <= 0) break;
    }

    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
    const marginalRate = bracketBreakdown.filter(b => b.filled).pop()?.rate || 0;
    const afterTaxIncome = grossIncome - totalTax;

    // What-if scenarios
    const whatIf = [10000, 25000, 50000].map(extra => {
      const newTaxable = taxableIncome + extra;
      let newTax = 0;
      let remaining = newTaxable;
      for (const bracket of brackets) {
        const size = bracket.max === Infinity ? Infinity : bracket.max - bracket.min + 1;
        const inBracket = Math.min(Math.max(0, remaining), size);
        newTax += inBracket * (bracket.rate / 100);
        remaining -= inBracket;
        if (remaining <= 0) break;
      }
      return { extra, additionalTax: newTax - totalTax, marginalOnExtra: ((newTax - totalTax) / extra) * 100 };
    });

    displayResults({
      grossIncome, aboveLineDeductions, agi, deduction, deductionType, standardDed,
      taxableIncome, bracketBreakdown, totalTax, effectiveRate, marginalRate, afterTaxIncome, whatIf, filingStatus
    });
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('tax-result');
    if (!resultDiv) return;

    const statusLabels = { single: 'Single', mfj: 'Married Filing Jointly', mfs: 'Married Filing Separately', hoh: 'Head of Household' };
    const maxBracketIncome = data.bracketBreakdown.reduce((max, b) => Math.max(max, b.incomeInBracket), 0);

    resultDiv.innerHTML = `
      <h3>📊 Tax Calculation Results</h3>

      <div class="profit-status ${data.effectiveRate < 15 ? 'status-good' : data.effectiveRate < 25 ? 'status-moderate' : 'status-loss'}">
        <div class="status-icon">${data.effectiveRate < 15 ? '✅' : data.effectiveRate < 25 ? '📊' : '⚠️'}</div>
        <div class="status-content">
          <strong>Effective Tax Rate: ${data.effectiveRate.toFixed(1)}%</strong>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Marginal bracket: ${data.marginalRate}% | Filing: ${statusLabels[data.filingStatus]}</p>
        </div>
      </div>

      <div class="margin-cards">
        <div class="margin-card">
          <div class="margin-card-icon">💵</div>
          <div class="margin-card-value">${formatCurrency(data.totalTax)}</div>
          <div class="margin-card-label">Total Federal Tax</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📊</div>
          <div class="margin-card-value">${data.effectiveRate.toFixed(1)}%</div>
          <div class="margin-card-label">Effective Rate</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📈</div>
          <div class="margin-card-value">${data.marginalRate}%</div>
          <div class="margin-card-label">Marginal Rate</div>
        </div>
        <div class="margin-card highlight">
          <div class="margin-card-icon">🏦</div>
          <div class="margin-card-value">${formatCurrency(data.afterTaxIncome)}</div>
          <div class="margin-card-label">After-Tax Income</div>
        </div>
      </div>

      <div class="bracket-visual">
        <h4>📊 Tax Bracket Breakdown</h4>
        <div class="bracket-bars">
          ${data.bracketBreakdown.filter(b => b.filled).map(b => {
            const width = maxBracketIncome > 0 ? (b.incomeInBracket / maxBracketIncome) * 100 : 0;
            return `
              <div class="bracket-row">
                <div class="bracket-rate">${b.rate}%</div>
                <div class="bracket-bar-wrapper">
                  <div class="bracket-bar" style="width: ${Math.max(width, 5)}%; background: hsl(${200 - b.rate * 4}, 70%, 50%);">
                    <span class="bracket-amount">${formatCurrency(b.incomeInBracket)}</span>
                  </div>
                </div>
                <div class="bracket-tax">${formatCurrency(b.taxInBracket)}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>📋 Income Breakdown</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <tbody>
              <tr><td>Gross Income</td><td><strong>${formatCurrency(data.grossIncome)}</strong></td></tr>
              ${data.aboveLineDeductions > 0 ? `<tr class="expense-row"><td>Above-the-Line Deductions</td><td class="text-danger">(${formatCurrency(data.aboveLineDeductions)})</td></tr>` : ''}
              <tr><td>Adjusted Gross Income (AGI)</td><td><strong>${formatCurrency(data.agi)}</strong></td></tr>
              <tr class="expense-row"><td>${data.deductionType === 'standard' ? 'Standard' : 'Itemized'} Deduction</td><td class="text-danger">(${formatCurrency(data.deduction)})</td></tr>
              <tr class="subtotal-row"><td><strong>Taxable Income</strong></td><td><strong>${formatCurrency(data.taxableIncome)}</strong></td></tr>
              <tr class="total-row"><td><strong>Federal Tax Owed</strong></td><td class="text-danger"><strong>${formatCurrency(data.totalTax)}</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="pricing-scenarios">
        <h4>🔮 What If You Earned More?</h4>
        <p style="color: var(--color-gray-dark); margin-bottom: 1rem; font-size: 0.875rem;">See how additional income would be taxed at your marginal rate</p>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Additional Income</th><th>Additional Tax</th><th>Effective Rate on Extra</th></tr></thead>
            <tbody>
              ${data.whatIf.map(w => `
                <tr>
                  <td>+${formatCurrency(w.extra)}</td>
                  <td class="text-danger">+${formatCurrency(w.additionalTax)}</td>
                  <td>${w.marginalOnExtra.toFixed(1)}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    const resultDiv = document.getElementById('tax-result');
    if (resultDiv) {
      resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`;
      resultDiv.classList.remove('hidden');
    }
  }

  function getValue(id) { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }
  function setValue(id, value) { const el = document.getElementById(id); if (el) el.value = value; }
  function formatCurrency(amount) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount); }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'Tax Bracket Calculator', url }).catch(() => copyToClipboard(url)); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-calculation');
      if (btn) { const orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(() => { btn.innerHTML = orig; }, 2000); }
    }).catch(() => {});
  }
})();
