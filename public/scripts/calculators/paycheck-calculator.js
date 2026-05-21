(function() {
  'use strict';

  const BRACKETS_2026_SINGLE = [
    { min: 0, max: 11925, rate: 10 },
    { min: 11926, max: 48475, rate: 12 },
    { min: 48476, max: 103350, rate: 22 },
    { min: 103351, max: 197300, rate: 24 },
    { min: 197301, max: 250525, rate: 32 },
    { min: 250526, max: 626350, rate: 35 },
    { min: 626351, max: Infinity, rate: 37 }
  ];

  const BRACKETS_2026_MFJ = [
    { min: 0, max: 23850, rate: 10 },
    { min: 23851, max: 96950, rate: 12 },
    { min: 96951, max: 206700, rate: 22 },
    { min: 206701, max: 394600, rate: 24 },
    { min: 394601, max: 501050, rate: 32 },
    { min: 501051, max: 751600, rate: 35 },
    { min: 751601, max: Infinity, rate: 37 }
  ];

  const STANDARD_DEDUCTIONS = { single: 15000, mfj: 30000, mfs: 15000, hoh: 22500 };
  const SS_WAGE_BASE = 176100;
  const SS_RATE = 0.062;
  const MEDICARE_RATE = 0.0145;
  const MEDICARE_ADDITIONAL_THRESHOLD = 200000;
  const MEDICARE_ADDITIONAL_RATE = 0.009;

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('pay')) setValue('gross-pay', params.get('pay'));
    if (params.has('freq')) document.getElementById('pay-frequency').value = params.get('freq');
    if (params.has('status')) document.getElementById('filing-status').value = params.get('status');
    if (params.has('state')) document.getElementById('state').value = params.get('state');
    if (params.has('k401')) setValue('deduction-401k', params.get('k401'));
    if (params.has('health')) setValue('health-insurance', params.get('health'));
    if (params.has('hsa')) setValue('hsa-contribution', params.get('hsa'));
    if (params.has('other')) setValue('other-pretax', params.get('other'));

    if (params.toString()) setTimeout(() => calculateResults(), 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('pay', getValue('gross-pay'));
    params.set('freq', document.getElementById('pay-frequency').value);
    params.set('status', document.getElementById('filing-status').value);
    params.set('state', document.getElementById('state').value);
    params.set('k401', getValue('deduction-401k'));
    params.set('health', getValue('health-insurance'));
    params.set('hsa', getValue('hsa-contribution'));
    params.set('other', getValue('other-pretax'));
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('.form-input, .form-select').forEach(input => {
      input.addEventListener('keypress', function(e) { if (e.key === 'Enter') { e.preventDefault(); calculateResults(); } });
      input.addEventListener('change', saveToURL);
    });

    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function calculateResults() {
    const grossPay = getValue('gross-pay');
    const payFrequency = parseInt(document.getElementById('pay-frequency').value);
    const filingStatus = document.getElementById('filing-status').value;
    const stateRate = parseFloat(document.getElementById('state').value) / 100;
    const k401Pct = getValue('deduction-401k') / 100;
    const healthInsurance = getValue('health-insurance');
    const hsaContribution = getValue('hsa-contribution');
    const otherPretax = getValue('other-pretax');

    if (grossPay <= 0) { showError('Please enter a valid gross pay amount.'); return; }

    saveToURL();

    // Annualize
    const annualGross = grossPay * payFrequency;

    // Pre-tax deductions (annual)
    const annual401k = annualGross * k401Pct;
    const annualHealth = healthInsurance;
    const annualHSA = hsaContribution;
    const annualOtherPretax = otherPretax;
    const totalPretax = annual401k + annualHealth + annualHSA + annualOtherPretax;

    // Taxable income for federal
    const standardDed = STANDARD_DEDUCTIONS[filingStatus] || STANDARD_DEDUCTIONS.single;
    const federalTaxable = Math.max(0, annualGross - totalPretax - standardDed);

    // Federal tax
    const brackets = (filingStatus === 'mfj') ? BRACKETS_2026_MFJ : BRACKETS_2026_SINGLE;
    let federalTax = 0;
    let remaining = federalTaxable;
    for (const bracket of brackets) {
      const size = bracket.max === Infinity ? Infinity : bracket.max - bracket.min + 1;
      const inBracket = Math.min(Math.max(0, remaining), size);
      federalTax += inBracket * (bracket.rate / 100);
      remaining -= inBracket;
      if (remaining <= 0) break;
    }

    // Social Security
    const ssWages = Math.min(annualGross, SS_WAGE_BASE);
    const socialSecurity = ssWages * SS_RATE;

    // Medicare
    let medicare = annualGross * MEDICARE_RATE;
    if (annualGross > MEDICARE_ADDITIONAL_THRESHOLD) {
      medicare += (annualGross - MEDICARE_ADDITIONAL_THRESHOLD) * MEDICARE_ADDITIONAL_RATE;
    }

    const fica = socialSecurity + medicare;

    // State tax
    const stateTax = annualGross * stateRate;

    // Totals
    const totalTax = federalTax + fica + stateTax;
    const annualNetPay = annualGross - totalTax - totalPretax;

    // Per paycheck
    const perPaycheck = {
      gross: annualGross / payFrequency,
      federal: federalTax / payFrequency,
      fica: fica / payFrequency,
      state: stateTax / payFrequency,
      pretax: totalPretax / payFrequency,
      net: annualNetPay / payFrequency
    };

    const effectiveRate = (totalTax / annualGross) * 100;
    const savingsRate = (totalPretax / annualGross) * 100;

    displayResults({
      annualGross, annual401k, annualHealth, annualHSA, annualOtherPretax, totalPretax,
      federalTax, socialSecurity, medicare, fica, stateTax, totalTax,
      annualNetPay, perPaycheck, payFrequency, effectiveRate, savingsRate
    });
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('paycheck-result');
    if (!resultDiv) return;

    const freqLabels = { 52: 'Weekly', 26: 'Bi-Weekly', 24: 'Semi-Monthly', 12: 'Monthly', 1: 'Annual' };
    const freqLabel = freqLabels[data.payFrequency] || 'Per Period';

    // Pie chart percentages
    const fedPct = (data.federalTax / data.annualGross * 100).toFixed(1);
    const ficaPct = (data.fica / data.annualGross * 100).toFixed(1);
    const statePct = (data.stateTax / data.annualGross * 100).toFixed(1);
    const pretaxPct = (data.totalPretax / data.annualGross * 100).toFixed(1);
    const netPct = (data.annualNetPay / data.annualGross * 100).toFixed(1);

    resultDiv.innerHTML = `
      <h3>💰 Take-Home Pay Breakdown</h3>

      <div class="age-hero">
        <div class="age-big">${formatCurrency(data.perPaycheck.net)} <span class="age-unit">per ${freqLabel.toLowerCase()} paycheck</span></div>
        <div style="color: var(--color-gray-dark); margin-top: 0.5rem;">
          ${formatCurrency(data.annualNetPay)} annual take-home | ${data.effectiveRate.toFixed(1)}% total tax rate
        </div>
      </div>

      <div class="margin-cards">
        <div class="margin-card">
          <div class="margin-card-icon">💵</div>
          <div class="margin-card-value">${formatCurrency(data.perPaycheck.gross)}</div>
          <div class="margin-card-label">${freqLabel} Gross</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">🏛️</div>
          <div class="margin-card-value">${formatCurrency(data.perPaycheck.federal)}</div>
          <div class="margin-card-label">Federal Tax</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">🏥</div>
          <div class="margin-card-value">${formatCurrency(data.perPaycheck.fica)}</div>
          <div class="margin-card-label">FICA</div>
        </div>
        <div class="margin-card highlight">
          <div class="margin-card-icon">🏦</div>
          <div class="margin-card-value">${formatCurrency(data.perPaycheck.net)}</div>
          <div class="margin-card-label">Take-Home</div>
        </div>
      </div>

      <div class="paycheck-pie">
        <h4>📊 Where Every Dollar Goes</h4>
        <div class="pie-legend">
          <div class="pie-item"><span class="pie-swatch" style="background: #10b981;"></span> Take-Home: ${netPct}%</div>
          <div class="pie-item"><span class="pie-swatch" style="background: #ef4444;"></span> Federal Tax: ${fedPct}%</div>
          <div class="pie-item"><span class="pie-swatch" style="background: #f59e0b;"></span> FICA: ${ficaPct}%</div>
          <div class="pie-item"><span class="pie-swatch" style="background: #8b5cf6;"></span> State Tax: ${statePct}%</div>
          <div class="pie-item"><span class="pie-swatch" style="background: #3b82f6;"></span> Pre-Tax Deductions: ${pretaxPct}%</div>
        </div>
        <div class="stacked-bar">
          <div class="stacked-segment" style="width: ${netPct}%; background: #10b981;" title="Take-Home"></div>
          <div class="stacked-segment" style="width: ${fedPct}%; background: #ef4444;" title="Federal Tax"></div>
          <div class="stacked-segment" style="width: ${ficaPct}%; background: #f59e0b;" title="FICA"></div>
          <div class="stacked-segment" style="width: ${statePct}%; background: #8b5cf6;" title="State Tax"></div>
          <div class="stacked-segment" style="width: ${pretaxPct}%; background: #3b82f6;" title="Pre-Tax"></div>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>📋 Annual Breakdown</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Item</th><th>Per Paycheck</th><th>Monthly</th><th>Annual</th></tr></thead>
            <tbody>
              <tr><td><strong>Gross Pay</strong></td><td>${formatCurrency(data.perPaycheck.gross)}</td><td>${formatCurrency(data.annualGross / 12)}</td><td><strong>${formatCurrency(data.annualGross)}</strong></td></tr>
              <tr class="expense-row"><td>Federal Income Tax</td><td class="text-danger">(${formatCurrency(data.perPaycheck.federal)})</td><td class="text-danger">(${formatCurrency(data.federalTax / 12)})</td><td class="text-danger">(${formatCurrency(data.federalTax)})</td></tr>
              <tr class="expense-row"><td>Social Security</td><td class="text-danger">(${formatCurrency(data.socialSecurity / data.payFrequency)})</td><td class="text-danger">(${formatCurrency(data.socialSecurity / 12)})</td><td class="text-danger">(${formatCurrency(data.socialSecurity)})</td></tr>
              <tr class="expense-row"><td>Medicare</td><td class="text-danger">(${formatCurrency(data.medicare / data.payFrequency)})</td><td class="text-danger">(${formatCurrency(data.medicare / 12)})</td><td class="text-danger">(${formatCurrency(data.medicare)})</td></tr>
              <tr class="expense-row"><td>State Tax</td><td class="text-danger">(${formatCurrency(data.perPaycheck.state)})</td><td class="text-danger">(${formatCurrency(data.stateTax / 12)})</td><td class="text-danger">(${formatCurrency(data.stateTax)})</td></tr>
              ${data.annual401k > 0 ? `<tr class="expense-row"><td>401(k)</td><td class="text-danger">(${formatCurrency(data.annual401k / data.payFrequency)})</td><td class="text-danger">(${formatCurrency(data.annual401k / 12)})</td><td class="text-danger">(${formatCurrency(data.annual401k)})</td></tr>` : ''}
              ${data.annualHealth > 0 ? `<tr class="expense-row"><td>Health Insurance</td><td class="text-danger">(${formatCurrency(data.annualHealth / data.payFrequency)})</td><td class="text-danger">(${formatCurrency(data.annualHealth / 12)})</td><td class="text-danger">(${formatCurrency(data.annualHealth)})</td></tr>` : ''}
              ${data.annualHSA > 0 ? `<tr class="expense-row"><td>HSA</td><td class="text-danger">(${formatCurrency(data.annualHSA / data.payFrequency)})</td><td class="text-danger">(${formatCurrency(data.annualHSA / 12)})</td><td class="text-danger">(${formatCurrency(data.annualHSA)})</td></tr>` : ''}
              <tr class="total-row"><td><strong>Take-Home Pay</strong></td><td class="text-success"><strong>${formatCurrency(data.perPaycheck.net)}</strong></td><td class="text-success"><strong>${formatCurrency(data.annualNetPay / 12)}</strong></td><td class="text-success"><strong>${formatCurrency(data.annualNetPay)}</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="insights-grid">
        <div class="insight-card insight-info">
          <div class="insight-icon">📊</div>
          <div class="insight-content"><h5>Total Tax Rate</h5><p>${data.effectiveRate.toFixed(1)}% of your gross pay goes to taxes (federal + FICA + state)</p></div>
        </div>
        ${data.totalPretax > 0 ? `
        <div class="insight-card insight-success">
          <div class="insight-icon">💰</div>
          <div class="insight-content"><h5>Savings Rate</h5><p>${data.savingsRate.toFixed(1)}% of gross goes to pre-tax savings (${formatCurrency(data.totalPretax)}/year)</p></div>
        </div>` : ''}
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    const resultDiv = document.getElementById('paycheck-result');
    if (resultDiv) { resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`; resultDiv.classList.remove('hidden'); }
  }

  function getValue(id) { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }
  function setValue(id, value) { const el = document.getElementById(id); if (el) el.value = value; }
  function formatCurrency(amount) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount); }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'Paycheck Calculator', url }).catch(() => copyToClipboard(url)); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-calculation');
      if (btn) { const orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(() => { btn.innerHTML = orig; }, 2000); }
    }).catch(() => {});
  }
})();
