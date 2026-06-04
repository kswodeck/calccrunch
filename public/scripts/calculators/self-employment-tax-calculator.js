(function() {
  'use strict';

  // 2024 Federal Tax Brackets
  const BRACKETS_2024 = {
    single: [
      { min: 0, max: 11600, rate: 10 },
      { min: 11600, max: 47150, rate: 12 },
      { min: 47150, max: 100525, rate: 22 },
      { min: 100525, max: 191950, rate: 24 },
      { min: 191950, max: 243725, rate: 32 },
      { min: 243725, max: 609350, rate: 35 },
      { min: 609350, max: Infinity, rate: 37 }
    ],
    mfj: [
      { min: 0, max: 23200, rate: 10 },
      { min: 23200, max: 94300, rate: 12 },
      { min: 94300, max: 201050, rate: 22 },
      { min: 201050, max: 383900, rate: 24 },
      { min: 383900, max: 487450, rate: 32 },
      { min: 487450, max: 731200, rate: 35 },
      { min: 731200, max: Infinity, rate: 37 }
    ],
    mfs: [
      { min: 0, max: 11600, rate: 10 },
      { min: 11600, max: 47150, rate: 12 },
      { min: 47150, max: 100525, rate: 22 },
      { min: 100525, max: 191950, rate: 24 },
      { min: 191950, max: 243725, rate: 32 },
      { min: 243725, max: 365600, rate: 35 },
      { min: 365600, max: Infinity, rate: 37 }
    ],
    hoh: [
      { min: 0, max: 16550, rate: 10 },
      { min: 16550, max: 63100, rate: 12 },
      { min: 63100, max: 100500, rate: 22 },
      { min: 100500, max: 191950, rate: 24 },
      { min: 191950, max: 243700, rate: 32 },
      { min: 243700, max: 609350, rate: 35 },
      { min: 609350, max: Infinity, rate: 37 }
    ]
  };

  // 2024 Standard Deductions
  const STANDARD_DEDUCTIONS = { single: 14600, mfj: 29200, mfs: 14600, hoh: 21900 };

  // 2024 Social Security wage base
  const SS_WAGE_BASE = 168600;
  const SE_TAX_RATE = 0.153; // 12.4% SS + 2.9% Medicare
  const SS_RATE = 0.124;
  const MEDICARE_RATE = 0.029;
  const SE_INCOME_FACTOR = 0.9235; // 92.35% of net SE income

  // State income tax rates (simplified effective rates for 2024)
  const STATE_RATES = {
    'AL': 5.0, 'AK': 0, 'AZ': 2.5, 'AR': 4.4, 'CA': 9.3,
    'CO': 4.4, 'CT': 5.0, 'DE': 6.6, 'FL': 0, 'GA': 5.49,
    'HI': 7.2, 'ID': 5.8, 'IL': 4.95, 'IN': 3.05, 'IA': 5.7,
    'KS': 5.7, 'KY': 4.0, 'LA': 4.25, 'ME': 7.15, 'MD': 5.75,
    'MA': 5.0, 'MI': 4.25, 'MN': 7.85, 'MS': 5.0, 'MO': 4.95,
    'MT': 6.75, 'NE': 6.64, 'NV': 0, 'NH': 0, 'NJ': 6.37,
    'NM': 4.9, 'NY': 6.85, 'NC': 4.5, 'ND': 1.95, 'OH': 3.5,
    'OK': 4.75, 'OR': 8.75, 'PA': 3.07, 'RI': 5.99, 'SC': 6.4,
    'SD': 0, 'TN': 0, 'TX': 0, 'UT': 4.65, 'VT': 6.6,
    'VA': 5.75, 'WA': 0, 'WV': 5.12, 'WI': 5.3, 'WY': 0,
    'DC': 6.5
  };

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('income')) setValue('gross-income', params.get('income'));
    if (params.has('expenses')) setValue('business-expenses', params.get('expenses'));
    if (params.has('status')) document.getElementById('filing-status').value = params.get('status');
    if (params.has('state')) document.getElementById('state').value = params.get('state');
    if (params.has('other')) setValue('other-income', params.get('other'));
    if (params.has('withholding')) setValue('w2-withholding', params.get('withholding'));
    if (params.has('ret_type')) document.getElementById('retirement-type').value = params.get('ret_type');
    if (params.has('ret_amt')) setValue('retirement-amount', params.get('ret_amt'));
    if (params.has('health')) setValue('health-insurance', params.get('health'));
    if (params.has('prior_tax')) setValue('prior-year-tax', params.get('prior_tax'));
    if (params.has('qmethod')) {
      document.getElementById('quarterly-method').value = params.get('qmethod');
      toggleQuarterlyInputs();
    }
    if (params.has('q1')) setValue('q1-income', params.get('q1'));
    if (params.has('q2')) setValue('q2-income', params.get('q2'));
    if (params.has('q3')) setValue('q3-income', params.get('q3'));
    if (params.has('q4')) setValue('q4-income', params.get('q4'));

    if (params.toString()) setTimeout(function() { calculateResults(); }, 100);
  }

  function saveToURL() {
    var params = new URLSearchParams();
    params.set('income', getValue('gross-income'));
    params.set('expenses', getValue('business-expenses'));
    params.set('status', document.getElementById('filing-status').value);
    params.set('state', document.getElementById('state').value);
    params.set('other', getValue('other-income'));
    params.set('withholding', getValue('w2-withholding'));
    params.set('ret_type', document.getElementById('retirement-type').value);
    params.set('ret_amt', getValue('retirement-amount'));
    params.set('health', getValue('health-insurance'));
    params.set('prior_tax', getValue('prior-year-tax'));
    params.set('qmethod', document.getElementById('quarterly-method').value);
    if (document.getElementById('quarterly-method').value === 'custom') {
      params.set('q1', getValue('q1-income'));
      params.set('q2', getValue('q2-income'));
      params.set('q3', getValue('q3-income'));
      params.set('q4', getValue('q4-income'));
    }
    var newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', function() {
      calculateResults();
      var resultEl = document.querySelector('.calculator-result');
      if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('quarterly-method').addEventListener('change', toggleQuarterlyInputs);

    document.querySelectorAll('.form-input, .form-select').forEach(function(input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); calculateResults(); }
      });
      input.addEventListener('change', saveToURL);
    });

    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function toggleQuarterlyInputs() {
    var isCustom = document.getElementById('quarterly-method').value === 'custom';
    document.getElementById('custom-quarters').style.display = isCustom ? 'block' : 'none';
  }

  function calculateResults() {
    var grossIncome = getValue('gross-income');
    var businessExpenses = getValue('business-expenses');
    var filingStatus = document.getElementById('filing-status').value;
    var state = document.getElementById('state').value;
    var otherIncome = getValue('other-income');
    var w2Withholding = getValue('w2-withholding');
    var retirementType = document.getElementById('retirement-type').value;
    var retirementAmount = getValue('retirement-amount');
    var healthInsurance = getValue('health-insurance');
    var priorYearTax = getValue('prior-year-tax');
    var quarterlyMethod = document.getElementById('quarterly-method').value;

    if (grossIncome <= 0) {
      showError('Please enter a valid gross self-employment income.');
      return;
    }

    saveToURL();

    // Step 1: Calculate net self-employment income
    var netSEIncome = Math.max(0, grossIncome - businessExpenses);

    // Step 2: Calculate SE tax
    var seIncomeForTax = netSEIncome * SE_INCOME_FACTOR;
    var ssTax = 0;
    var medicareTax = 0;

    // Social Security portion (capped at wage base)
    var ssIncome = Math.min(seIncomeForTax, SS_WAGE_BASE);
    ssTax = ssIncome * SS_RATE;

    // Medicare portion (no cap)
    medicareTax = seIncomeForTax * MEDICARE_RATE;

    // Additional Medicare Tax (0.9% on income over $200k single / $250k MFJ)
    var additionalMedicareThreshold = (filingStatus === 'mfj') ? 250000 : 200000;
    var additionalMedicareTax = 0;
    if (seIncomeForTax > additionalMedicareThreshold) {
      additionalMedicareTax = (seIncomeForTax - additionalMedicareThreshold) * 0.009;
    }

    var totalSETax = ssTax + medicareTax + additionalMedicareTax;

    // Step 3: SE tax deduction (half of SE tax, excluding additional Medicare)
    var seTaxDeduction = (ssTax + medicareTax) / 2;

    // Step 4: Calculate AGI
    var agi = netSEIncome + otherIncome - seTaxDeduction - retirementAmount - healthInsurance;
    agi = Math.max(0, agi);

    // Step 5: Standard deduction
    var standardDeduction = STANDARD_DEDUCTIONS[filingStatus];
    var taxableIncome = Math.max(0, agi - standardDeduction);

    // Step 6: Calculate federal income tax
    var federalTax = calculateFederalTax(taxableIncome, filingStatus);

    // Step 7: Calculate state income tax
    var stateRate = STATE_RATES[state] || 0;
    var stateTaxableIncome = Math.max(0, netSEIncome + otherIncome - seTaxDeduction - retirementAmount - healthInsurance);
    var stateTax = stateTaxableIncome * (stateRate / 100);

    // Step 8: Total tax liability
    var totalAnnualTax = totalSETax + federalTax + stateTax;

    // Step 9: Subtract withholdings already paid
    var remainingTax = Math.max(0, totalAnnualTax - w2Withholding);

    // Step 10: Quarterly payments
    var quarterlyPayment = remainingTax / 4;

    // Custom quarterly breakdown
    var quarterlyBreakdown = [];
    if (quarterlyMethod === 'custom') {
      var q1 = getValue('q1-income');
      var q2 = getValue('q2-income');
      var q3 = getValue('q3-income');
      var q4 = getValue('q4-income');
      var totalCustom = q1 + q2 + q3 + q4;
      if (totalCustom > 0) {
        quarterlyBreakdown = [
          { quarter: 'Q1', income: q1, payment: remainingTax * (q1 / totalCustom) },
          { quarter: 'Q2', income: q2, payment: remainingTax * (q2 / totalCustom) },
          { quarter: 'Q3', income: q3, payment: remainingTax * (q3 / totalCustom) },
          { quarter: 'Q4', income: q4, payment: remainingTax * (q4 / totalCustom) }
        ];
      } else {
        quarterlyBreakdown = [
          { quarter: 'Q1', income: 0, payment: quarterlyPayment },
          { quarter: 'Q2', income: 0, payment: quarterlyPayment },
          { quarter: 'Q3', income: 0, payment: quarterlyPayment },
          { quarter: 'Q4', income: 0, payment: quarterlyPayment }
        ];
      }
    } else {
      var evenIncome = netSEIncome / 4;
      quarterlyBreakdown = [
        { quarter: 'Q1', income: evenIncome, payment: quarterlyPayment },
        { quarter: 'Q2', income: evenIncome, payment: quarterlyPayment },
        { quarter: 'Q3', income: evenIncome, payment: quarterlyPayment },
        { quarter: 'Q4', income: evenIncome, payment: quarterlyPayment }
      ];
    }

    // Safe harbor calculations
    var safeHarbor90 = totalAnnualTax * 0.9;
    var safeHarbor100 = priorYearTax;
    var safeHarbor110 = priorYearTax * 1.1; // For AGI > $150k
    var useHighIncome = agi > 150000;
    var safeHarborPriorYear = useHighIncome ? safeHarbor110 : safeHarbor100;
    var recommendedSafeHarbor = 0;
    if (priorYearTax > 0) {
      recommendedSafeHarbor = Math.min(safeHarbor90, safeHarborPriorYear);
    } else {
      recommendedSafeHarbor = safeHarbor90;
    }
    var safeHarborQuarterly = Math.max(0, recommendedSafeHarbor - w2Withholding) / 4;

    // Effective tax rate
    var totalIncome = netSEIncome + otherIncome;
    var effectiveRate = totalIncome > 0 ? (totalAnnualTax / totalIncome) * 100 : 0;

    // Take-home income
    var takeHome = totalIncome - totalAnnualTax;

    displayResults({
      grossIncome: grossIncome,
      businessExpenses: businessExpenses,
      netSEIncome: netSEIncome,
      seIncomeForTax: seIncomeForTax,
      ssTax: ssTax,
      medicareTax: medicareTax,
      additionalMedicareTax: additionalMedicareTax,
      totalSETax: totalSETax,
      seTaxDeduction: seTaxDeduction,
      otherIncome: otherIncome,
      retirementAmount: retirementAmount,
      healthInsurance: healthInsurance,
      agi: agi,
      standardDeduction: standardDeduction,
      taxableIncome: taxableIncome,
      federalTax: federalTax,
      state: state,
      stateRate: stateRate,
      stateTax: stateTax,
      totalAnnualTax: totalAnnualTax,
      w2Withholding: w2Withholding,
      remainingTax: remainingTax,
      quarterlyPayment: quarterlyPayment,
      quarterlyBreakdown: quarterlyBreakdown,
      quarterlyMethod: quarterlyMethod,
      safeHarbor90: safeHarbor90,
      safeHarborPriorYear: safeHarborPriorYear,
      recommendedSafeHarbor: recommendedSafeHarbor,
      safeHarborQuarterly: safeHarborQuarterly,
      priorYearTax: priorYearTax,
      useHighIncome: useHighIncome,
      effectiveRate: effectiveRate,
      takeHome: takeHome,
      totalIncome: totalIncome,
      filingStatus: filingStatus
    });
  }

  function calculateFederalTax(taxableIncome, filingStatus) {
    var brackets = BRACKETS_2024[filingStatus];
    var tax = 0;
    var remaining = taxableIncome;

    for (var i = 0; i < brackets.length; i++) {
      var bracket = brackets[i];
      var bracketSize = bracket.max === Infinity ? Infinity : bracket.max - bracket.min;
      var incomeInBracket = Math.min(Math.max(0, remaining), bracketSize);
      tax += incomeInBracket * (bracket.rate / 100);
      remaining -= incomeInBracket;
      if (remaining <= 0) break;
    }

    return tax;
  }

  function displayResults(data) {
    var resultDiv = document.getElementById('self-employment-tax-result');
    if (!resultDiv) return;

    var statusLabels = {
      single: 'Single',
      mfj: 'Married Filing Jointly',
      mfs: 'Married Filing Separately',
      hoh: 'Head of Household'
    };

    // Calculate bar widths for visual breakdown
    var maxTax = Math.max(data.totalSETax, data.federalTax, data.stateTax, 1);
    var seWidth = (data.totalSETax / data.totalAnnualTax) * 100 || 0;
    var fedWidth = (data.federalTax / data.totalAnnualTax) * 100 || 0;
    var stateWidth = (data.stateTax / data.totalAnnualTax) * 100 || 0;

    var quarterlyHTML = '';
    if (data.quarterlyMethod === 'custom') {
      quarterlyHTML = data.quarterlyBreakdown.map(function(q) {
        return '<tr><td>' + q.quarter + ' (Income: ' + formatCurrency(q.income) + ')</td><td><strong>' + formatCurrency(q.payment) + '</strong></td></tr>';
      }).join('');
    } else {
      quarterlyHTML = data.quarterlyBreakdown.map(function(q) {
        return '<tr><td>' + q.quarter + '</td><td><strong>' + formatCurrency(q.payment) + '</strong></td></tr>';
      }).join('');
    }

    var safeHarborHTML = '';
    if (data.priorYearTax > 0) {
      safeHarborHTML = '\n        <div class="profit-breakdown">\n          <h4>Safe Harbor Comparison</h4>\n          <div class="breakdown-table-container">\n            <table class="profit-table">\n              <tbody>\n                <tr><td>90% of Current Year Tax</td><td>' + formatCurrency(data.safeHarbor90) + '</td></tr>\n                <tr><td>' + (data.useHighIncome ? '110%' : '100%') + ' of Prior Year Tax' + (data.useHighIncome ? ' (AGI > $150k)' : '') + '</td><td>' + formatCurrency(data.safeHarborPriorYear) + '</td></tr>\n                <tr class="total-row"><td><strong>Recommended Minimum (lower of two)</strong></td><td><strong>' + formatCurrency(data.recommendedSafeHarbor) + '</strong></td></tr>\n                <tr><td>Safe Harbor Quarterly Payment</td><td><strong>' + formatCurrency(data.safeHarborQuarterly) + '</strong></td></tr>\n              </tbody>\n            </table>\n          </div>\n        </div>';
    }

    resultDiv.innerHTML = '\n      <h3>Estimated Quarterly Tax Results</h3>\n\n      <div class="profit-status ' + (data.effectiveRate < 25 ? 'status-good' : data.effectiveRate < 35 ? 'status-moderate' : 'status-loss') + '">\n        <div class="status-icon">' + (data.effectiveRate < 25 ? '&#10004;' : data.effectiveRate < 35 ? '&#128202;' : '&#9888;') + '</div>\n        <div class="status-content">\n          <strong>Effective Tax Rate: ' + data.effectiveRate.toFixed(1) + '%</strong>\n          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Filing: ' + statusLabels[data.filingStatus] + ' | State: ' + data.state + ' (' + data.stateRate + '%)</p>\n        </div>\n      </div>\n\n      <div class="margin-cards">\n        <div class="margin-card highlight">\n          <div class="margin-card-icon">&#128176;</div>\n          <div class="margin-card-value">' + formatCurrency(data.quarterlyPayment) + '</div>\n          <div class="margin-card-label">Quarterly Payment</div>\n        </div>\n        <div class="margin-card">\n          <div class="margin-card-icon">&#128181;</div>\n          <div class="margin-card-value">' + formatCurrency(data.totalAnnualTax) + '</div>\n          <div class="margin-card-label">Total Annual Tax</div>\n        </div>\n        <div class="margin-card">\n          <div class="margin-card-icon">&#128200;</div>\n          <div class="margin-card-value">' + data.effectiveRate.toFixed(1) + '%</div>\n          <div class="margin-card-label">Effective Rate</div>\n        </div>\n        <div class="margin-card">\n          <div class="margin-card-icon">&#127968;</div>\n          <div class="margin-card-value">' + formatCurrency(data.takeHome) + '</div>\n          <div class="margin-card-label">Take-Home Income</div>\n        </div>\n      </div>\n\n      <div class="bracket-visual">\n        <h4>Tax Composition Breakdown</h4>\n        <div class="bracket-bars">\n          <div class="bracket-row">\n            <div class="bracket-rate">SE Tax</div>\n            <div class="bracket-bar-wrapper">\n              <div class="bracket-bar" style="width: ' + Math.max(seWidth, 3) + '%; background: #e74c3c;">\n                <span class="bracket-amount">' + formatCurrency(data.totalSETax) + '</span>\n              </div>\n            </div>\n            <div class="bracket-tax">' + seWidth.toFixed(0) + '%</div>\n          </div>\n          <div class="bracket-row">\n            <div class="bracket-rate">Federal</div>\n            <div class="bracket-bar-wrapper">\n              <div class="bracket-bar" style="width: ' + Math.max(fedWidth, 3) + '%; background: #3498db;">\n                <span class="bracket-amount">' + formatCurrency(data.federalTax) + '</span>\n              </div>\n            </div>\n            <div class="bracket-tax">' + fedWidth.toFixed(0) + '%</div>\n          </div>\n          <div class="bracket-row">\n            <div class="bracket-rate">State</div>\n            <div class="bracket-bar-wrapper">\n              <div class="bracket-bar" style="width: ' + Math.max(stateWidth, 3) + '%; background: #2ecc71;">\n                <span class="bracket-amount">' + formatCurrency(data.stateTax) + '</span>\n              </div>\n            </div>\n            <div class="bracket-tax">' + stateWidth.toFixed(0) + '%</div>\n          </div>\n        </div>\n        <div style="margin-top: 1rem; height: 24px; border-radius: 12px; overflow: hidden; display: flex;">\n          <div style="width: ' + seWidth + '%; background: #e74c3c;" title="SE Tax: ' + formatCurrency(data.totalSETax) + '"></div>\n          <div style="width: ' + fedWidth + '%; background: #3498db;" title="Federal Tax: ' + formatCurrency(data.federalTax) + '"></div>\n          <div style="width: ' + stateWidth + '%; background: #2ecc71;" title="State Tax: ' + formatCurrency(data.stateTax) + '"></div>\n        </div>\n        <div style="display: flex; gap: 1rem; margin-top: 0.5rem; font-size: 0.8rem; flex-wrap: wrap;">\n          <span><span style="display: inline-block; width: 12px; height: 12px; background: #e74c3c; border-radius: 2px; margin-right: 4px;"></span>SE Tax</span>\n          <span><span style="display: inline-block; width: 12px; height: 12px; background: #3498db; border-radius: 2px; margin-right: 4px;"></span>Federal Income Tax</span>\n          <span><span style="display: inline-block; width: 12px; height: 12px; background: #2ecc71; border-radius: 2px; margin-right: 4px;"></span>State Income Tax</span>\n        </div>\n      </div>\n\n      <div class="profit-breakdown">\n        <h4>Quarterly Payment Schedule</h4>\n        <div class="breakdown-table-container">\n          <table class="profit-table">\n            <thead><tr><th>Quarter</th><th>Estimated Payment</th></tr></thead>\n            <tbody>\n              ' + quarterlyHTML + '\n              <tr class="total-row"><td><strong>Total Annual</strong></td><td><strong>' + formatCurrency(data.remainingTax) + '</strong></td></tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n      ' + safeHarborHTML + '\n\n      <div class="profit-breakdown">\n        <h4>Detailed Tax Calculation</h4>\n        <div class="breakdown-table-container">\n          <table class="profit-table">\n            <tbody>\n              <tr><td>Gross Self-Employment Income</td><td>' + formatCurrency(data.grossIncome) + '</td></tr>\n              <tr class="expense-row"><td>Business Expenses</td><td class="text-danger">(' + formatCurrency(data.businessExpenses) + ')</td></tr>\n              <tr class="subtotal-row"><td><strong>Net Self-Employment Income</strong></td><td><strong>' + formatCurrency(data.netSEIncome) + '</strong></td></tr>\n              <tr><td>SE Income Subject to Tax (92.35%)</td><td>' + formatCurrency(data.seIncomeForTax) + '</td></tr>\n              <tr><td>Social Security Tax (12.4%)</td><td class="text-danger">' + formatCurrency(data.ssTax) + '</td></tr>\n              <tr><td>Medicare Tax (2.9%)</td><td class="text-danger">' + formatCurrency(data.medicareTax) + '</td></tr>\n              ' + (data.additionalMedicareTax > 0 ? '<tr><td>Additional Medicare Tax (0.9%)</td><td class="text-danger">' + formatCurrency(data.additionalMedicareTax) + '</td></tr>' : '') + '\n              <tr class="subtotal-row"><td><strong>Total Self-Employment Tax</strong></td><td class="text-danger"><strong>' + formatCurrency(data.totalSETax) + '</strong></td></tr>\n              <tr><td colspan="2" style="padding-top: 1rem; border-top: 1px solid var(--color-border);"></td></tr>\n              <tr><td>SE Tax Deduction (50% of SE tax)</td><td class="text-success">(' + formatCurrency(data.seTaxDeduction) + ')</td></tr>\n              ' + (data.otherIncome > 0 ? '<tr><td>Other Income (W-2, etc.)</td><td>' + formatCurrency(data.otherIncome) + '</td></tr>' : '') + '\n              ' + (data.retirementAmount > 0 ? '<tr><td>Retirement Contribution Deduction</td><td class="text-success">(' + formatCurrency(data.retirementAmount) + ')</td></tr>' : '') + '\n              ' + (data.healthInsurance > 0 ? '<tr><td>Health Insurance Deduction</td><td class="text-success">(' + formatCurrency(data.healthInsurance) + ')</td></tr>' : '') + '\n              <tr><td>Adjusted Gross Income (AGI)</td><td>' + formatCurrency(data.agi) + '</td></tr>\n              <tr class="expense-row"><td>Standard Deduction</td><td class="text-danger">(' + formatCurrency(data.standardDeduction) + ')</td></tr>\n              <tr class="subtotal-row"><td><strong>Taxable Income</strong></td><td><strong>' + formatCurrency(data.taxableIncome) + '</strong></td></tr>\n              <tr><td>Federal Income Tax</td><td class="text-danger">' + formatCurrency(data.federalTax) + '</td></tr>\n              <tr><td>State Income Tax (' + data.state + ' @ ' + data.stateRate + '%)</td><td class="text-danger">' + formatCurrency(data.stateTax) + '</td></tr>\n              <tr><td colspan="2" style="padding-top: 1rem; border-top: 1px solid var(--color-border);"></td></tr>\n              <tr class="total-row"><td><strong>Total Annual Tax Liability</strong></td><td class="text-danger"><strong>' + formatCurrency(data.totalAnnualTax) + '</strong></td></tr>\n              ' + (data.w2Withholding > 0 ? '<tr><td>Less: Taxes Already Withheld</td><td class="text-success">(' + formatCurrency(data.w2Withholding) + ')</td></tr><tr class="total-row"><td><strong>Remaining Tax Due</strong></td><td class="text-danger"><strong>' + formatCurrency(data.remainingTax) + '</strong></td></tr>' : '') + '\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n      <div class="pricing-scenarios">\n        <h4>Tips to Reduce Your Tax Burden</h4>\n        <div class="breakdown-table-container">\n          <table class="profit-table">\n            <thead><tr><th>Strategy</th><th>Potential Annual Savings</th></tr></thead>\n            <tbody>\n              ' + getTaxTips(data) + '\n            </tbody>\n          </table>\n        </div>\n      </div>\n    ';

    resultDiv.classList.remove('hidden');
  }

  function getTaxTips(data) {
    var tips = [];

    // Retirement tip
    if (data.retirementAmount === 0) {
      var potentialSaving = Math.min(23000, data.netSEIncome * 0.25);
      var estimatedSaving = potentialSaving * (data.effectiveRate / 100);
      tips.push('<tr><td>Open a Solo 401(k) or SEP IRA</td><td class="text-success">Up to ' + formatCurrency(estimatedSaving) + '</td></tr>');
    }

    // Health insurance tip
    if (data.healthInsurance === 0) {
      tips.push('<tr><td>Deduct health insurance premiums</td><td class="text-success">Varies by premium</td></tr>');
    }

    // Home office
    tips.push('<tr><td>Claim home office deduction ($5/sq ft, up to 300 sq ft)</td><td class="text-success">Up to ' + formatCurrency(1500 * (data.effectiveRate / 100)) + '</td></tr>');

    // S-Corp election
    if (data.netSEIncome > 50000) {
      var reasonableSalary = data.netSEIncome * 0.6;
      var seSavings = (data.netSEIncome - reasonableSalary) * SE_INCOME_FACTOR * SE_TAX_RATE;
      tips.push('<tr><td>Consider S-Corp election (on profit above salary)</td><td class="text-success">Up to ' + formatCurrency(seSavings) + '</td></tr>');
    }

    // QBI deduction
    if (data.taxableIncome < 191950) {
      var qbiSaving = data.netSEIncome * 0.20 * (data.effectiveRate / 100);
      tips.push('<tr><td>Qualified Business Income (QBI) deduction (20%)</td><td class="text-success">Up to ' + formatCurrency(qbiSaving) + '</td></tr>');
    }

    // HSA
    tips.push('<tr><td>Contribute to an HSA (if eligible)</td><td class="text-success">Up to ' + formatCurrency(4150 * (data.effectiveRate / 100)) + '</td></tr>');

    return tips.join('');
  }

  function showError(message) {
    var resultDiv = document.getElementById('self-employment-tax-result');
    if (resultDiv) {
      resultDiv.innerHTML = '<div class="alert alert-error"><strong>Error:</strong> ' + message + '</div>';
      resultDiv.classList.remove('hidden');
    }
  }

  function getValue(id) {
    var el = document.getElementById(id);
    return el ? parseFloat(el.value) || 0 : 0;
  }

  function setValue(id, value) {
    var el = document.getElementById(id);
    if (el) el.value = value;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  function shareCalculation() {
    var url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Self-Employment Quarterly Tax Calculator', url: url }).catch(function() { copyToClipboard(url); });
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      var btn = document.getElementById('share-calculation');
      if (btn) {
        var orig = btn.innerHTML;
        btn.innerHTML = '&#10003; Link Copied!';
        setTimeout(function() { btn.innerHTML = orig; }, 2000);
      }
    }).catch(function() {});
  }
})();
