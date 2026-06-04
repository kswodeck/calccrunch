(function() {
  'use strict';

  // US Federal Tax Brackets 2026
  const BRACKETS = {
    single: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 }
    ],
    mfj: [
      { min: 0, max: 23850, rate: 0.10 },
      { min: 23850, max: 96950, rate: 0.12 },
      { min: 96950, max: 206700, rate: 0.22 },
      { min: 206700, max: 394600, rate: 0.24 },
      { min: 394600, max: 501050, rate: 0.32 },
      { min: 501050, max: 751600, rate: 0.35 },
      { min: 751600, max: Infinity, rate: 0.37 }
    ],
    mfs: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 375800, rate: 0.35 },
      { min: 375800, max: Infinity, rate: 0.37 }
    ],
    hoh: [
      { min: 0, max: 17000, rate: 0.10 },
      { min: 17000, max: 64850, rate: 0.12 },
      { min: 64850, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250500, rate: 0.32 },
      { min: 250500, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 }
    ]
  };

  const STANDARD_DEDUCTIONS = { single: 15000, mfj: 30000, mfs: 15000, hoh: 22500 };

  // State tax rates (simplified effective rates)
  const STATE_TAX = { 'us': 0, 'us-ca': 0.08, 'us-ny': 0.065, 'us-tx': 0, 'uk': 0, 'ca': 0, 'au': 0, 'other': 0 };

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('income')) setValue('desired-income', params.get('income'));
    if (params.has('region')) setSelectValue('tax-region', params.get('region'));
    if (params.has('filing')) setSelectValue('filing-status', params.get('filing'));
    if (params.has('manualTax')) setValue('manual-tax-rate', params.get('manualTax'));
    if (params.has('software')) setValue('expense-software', params.get('software'));
    if (params.has('equipment')) setValue('expense-equipment', params.get('equipment'));
    if (params.has('office')) setValue('expense-office', params.get('office'));
    if (params.has('marketing')) setValue('expense-marketing', params.get('marketing'));
    if (params.has('development')) setValue('expense-development', params.get('development'));
    if (params.has('bizInsurance')) setValue('expense-insurance', params.get('bizInsurance'));
    if (params.has('otherExp')) setValue('expense-other', params.get('otherExp'));
    if (params.has('health')) setValue('health-insurance', params.get('health'));
    if (params.has('retirement')) setValue('retirement-pct', params.get('retirement'));
    if (params.has('vacation')) setValue('vacation-days', params.get('vacation'));
    if (params.has('sick')) setValue('sick-days', params.get('sick'));
    if (params.has('holidays')) setValue('holidays', params.get('holidays'));
    if (params.has('hours')) setValue('hours-per-week', params.get('hours'));
    if (params.has('utilization')) setValue('utilization-rate', params.get('utilization'));

    toggleManualTax();
    if (params.toString()) setTimeout(() => calculateResults(), 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('income', getValue('desired-income'));
    params.set('region', getSelectValue('tax-region'));
    params.set('filing', getSelectValue('filing-status'));
    if (getSelectValue('tax-region') === 'other') params.set('manualTax', getValue('manual-tax-rate'));
    params.set('software', getValue('expense-software'));
    params.set('equipment', getValue('expense-equipment'));
    params.set('office', getValue('expense-office'));
    params.set('marketing', getValue('expense-marketing'));
    params.set('development', getValue('expense-development'));
    params.set('bizInsurance', getValue('expense-insurance'));
    params.set('otherExp', getValue('expense-other'));
    params.set('health', getValue('health-insurance'));
    params.set('retirement', getValue('retirement-pct'));
    params.set('vacation', getValue('vacation-days'));
    params.set('sick', getValue('sick-days'));
    params.set('holidays', getValue('holidays'));
    params.set('hours', getValue('hours-per-week'));
    params.set('utilization', getValue('utilization-rate'));
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', function() {
      calculateResults();
      const result = document.querySelector('.calculator-result');
      if (result) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('.form-input, .form-select').forEach(function(input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); calculateResults(); }
      });
      input.addEventListener('change', saveToURL);
    });

    document.getElementById('tax-region').addEventListener('change', toggleManualTax);
    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function toggleManualTax() {
    const region = getSelectValue('tax-region');
    const manualRow = document.getElementById('manual-tax-row');
    if (manualRow) {
      manualRow.style.display = region === 'other' ? '' : 'none';
    }
  }

  function calculateResults() {
    const desiredIncome = getValue('desired-income');
    if (desiredIncome <= 0) {
      showError('Please enter a desired annual take-home income.');
      return;
    }

    saveToURL();

    const region = getSelectValue('tax-region');
    const filingStatus = getSelectValue('filing-status');
    const manualTaxRate = getValue('manual-tax-rate') / 100;

    // Business expenses
    const expenses = {
      software: getValue('expense-software'),
      equipment: getValue('expense-equipment'),
      office: getValue('expense-office'),
      marketing: getValue('expense-marketing'),
      development: getValue('expense-development'),
      insurance: getValue('expense-insurance'),
      other: getValue('expense-other')
    };
    const totalExpenses = Object.values(expenses).reduce((sum, v) => sum + v, 0);

    // Benefits
    const healthInsuranceMonthly = getValue('health-insurance');
    const healthInsuranceAnnual = healthInsuranceMonthly * 12;
    const retirementPct = getValue('retirement-pct') / 100;

    // Schedule
    const vacationDays = getValue('vacation-days');
    const sickDays = getValue('sick-days');
    const holidays = getValue('holidays');
    const hoursPerWeek = getValue('hours-per-week');
    const utilizationRate = getValue('utilization-rate') / 100;

    // Calculate available billable hours
    const totalWeekdays = 261; // Average weekdays per year
    const workingDays = totalWeekdays - vacationDays - sickDays - holidays;
    const hoursPerDay = hoursPerWeek / 5;
    const totalWorkingHours = workingDays * hoursPerDay;
    const billableHours = totalWorkingHours * utilizationRate;

    // Iterative tax calculation: find gross revenue that yields desired take-home
    // gross = take-home + taxes + expenses + benefits
    // We need to solve for gross because taxes depend on gross
    let grossRevenue = desiredIncome * 1.5; // Initial guess
    let iterations = 0;
    let taxes, selfEmploymentTax, federalIncomeTax, stateTax, retirementContribution;

    while (iterations < 50) {
      // Self-employment tax: 15.3% on 92.35% of net earnings (up to SS wage base)
      const netEarnings = grossRevenue - totalExpenses;
      const seBase = netEarnings * 0.9235;
      const ssWageBase = 168600; // 2025 SS wage base
      const ssTax = Math.min(seBase, ssWageBase) * 0.124;
      const medicareTax = seBase * 0.029;
      const additionalMedicare = seBase > 200000 ? (seBase - 200000) * 0.009 : 0;
      selfEmploymentTax = ssTax + medicareTax + additionalMedicare;

      // Deduction for half of SE tax
      const seDeduction = selfEmploymentTax / 2;

      // Health insurance deduction (self-employed can deduct premiums)
      const healthDeduction = healthInsuranceAnnual;

      // Retirement contribution
      retirementContribution = grossRevenue * retirementPct;

      // Taxable income for federal
      const standardDeduction = STANDARD_DEDUCTIONS[filingStatus] || 15000;
      const taxableIncome = Math.max(0, netEarnings - seDeduction - healthDeduction - retirementContribution - standardDeduction);

      // Federal income tax
      if (region === 'other') {
        federalIncomeTax = grossRevenue * manualTaxRate;
        stateTax = 0;
        selfEmploymentTax = 0;
      } else if (region === 'uk' || region === 'ca' || region === 'au') {
        // Simplified international tax estimation
        const intlRates = { 'uk': 0.30, 'ca': 0.28, 'au': 0.32 };
        federalIncomeTax = netEarnings * (intlRates[region] || 0.30);
        stateTax = 0;
        selfEmploymentTax = netEarnings * 0.09; // National insurance / CPP / super equivalent
      } else {
        // US federal brackets
        const brackets = BRACKETS[filingStatus] || BRACKETS.single;
        federalIncomeTax = calculateBracketTax(taxableIncome, brackets);
        // State tax
        const stateRate = STATE_TAX[region] || 0;
        stateTax = taxableIncome * stateRate;
      }

      taxes = selfEmploymentTax + federalIncomeTax + stateTax;

      // Check if this gross revenue covers everything
      const requiredGross = desiredIncome + taxes + totalExpenses + healthInsuranceAnnual + retirementContribution;
      const diff = requiredGross - grossRevenue;

      if (Math.abs(diff) < 1) break;
      grossRevenue = requiredGross;
      iterations++;
    }

    const totalTaxes = selfEmploymentTax + federalIncomeTax + stateTax;

    // Calculate rates
    const hourlyRate = grossRevenue / billableHours;
    const dailyRate = hourlyRate * 8;
    const weeklyRate = dailyRate * 5;
    const monthlyRetainer = grossRevenue / 12;

    // Rate tiers
    const economyRate = hourlyRate * 0.8;
    const standardRate = hourlyRate;
    const premiumRate = hourlyRate * 1.5;

    // Project rate suggestions
    const project10hr = hourlyRate * 10;
    const project20hr = hourlyRate * 20;
    const project40hr = hourlyRate * 40;

    // Revenue projections at different utilization rates
    const projections = [0.50, 0.65, 0.80].map(function(util) {
      const bh = totalWorkingHours * util;
      const annualRev = hourlyRate * bh;
      return { utilization: util, billableHours: bh, annualRevenue: annualRev, monthlyRevenue: annualRev / 12 };
    });

    // Breakdown percentages for visual bar
    const breakdownTotal = grossRevenue;
    const takeHomePct = (desiredIncome / breakdownTotal) * 100;
    const taxesPct = (totalTaxes / breakdownTotal) * 100;
    const expensesPct = (totalExpenses / breakdownTotal) * 100;
    const benefitsPct = ((healthInsuranceAnnual + retirementContribution) / breakdownTotal) * 100;

    displayResults({
      desiredIncome,
      grossRevenue,
      hourlyRate,
      dailyRate,
      weeklyRate,
      monthlyRetainer,
      economyRate,
      standardRate,
      premiumRate,
      project10hr,
      project20hr,
      project40hr,
      totalTaxes,
      selfEmploymentTax,
      federalIncomeTax,
      stateTax,
      totalExpenses,
      healthInsuranceAnnual,
      retirementContribution,
      workingDays,
      totalWorkingHours,
      billableHours,
      utilizationRate,
      hoursPerWeek,
      vacationDays,
      sickDays,
      holidays,
      projections,
      takeHomePct,
      taxesPct,
      expensesPct,
      benefitsPct
    });
  }

  function calculateBracketTax(taxableIncome, brackets) {
    let tax = 0;
    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i];
      if (taxableIncome <= bracket.min) break;
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      tax += taxableInBracket * bracket.rate;
    }
    return tax;
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('freelance-rate-result');
    if (!resultDiv) return;

    const rateQuality = data.hourlyRate < 50 ? 'status-moderate' :
                        data.hourlyRate < 100 ? 'status-good' : 'status-excellent';
    const rateEmoji = data.hourlyRate < 50 ? '📊' : data.hourlyRate < 100 ? '📈' : '🚀';
    const rateMessage = data.hourlyRate < 50 ? 'Your rate is on the lower end — consider increasing your income goal or reducing time off' :
                        data.hourlyRate < 100 ? 'A solid professional rate for experienced freelancers' :
                        'A premium rate — make sure your expertise and portfolio justify this to clients';

    resultDiv.innerHTML = `
      <h3>💼 Your Freelance Rate Card</h3>

      <div class="profit-status ${rateQuality}">
        <div class="status-icon">${rateEmoji}</div>
        <div class="status-content">
          <strong>${rateMessage}</strong>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Based on ${formatCurrency(data.desiredIncome)} take-home goal with ${Math.round(data.utilizationRate * 100)}% utilization</p>
        </div>
      </div>

      <div class="age-hero">
        <div class="age-big">${formatCurrency(data.hourlyRate)}<span style="font-size: 0.4em; opacity: 0.7;">/hour</span></div>
        <div style="color: var(--color-gray-dark);">Your Minimum Hourly Rate</div>
      </div>

      <div class="margin-cards">
        <div class="margin-card highlight">
          <div class="margin-card-icon">⏰</div>
          <div class="margin-card-value">${formatCurrency(data.hourlyRate)}</div>
          <div class="margin-card-label">Hourly</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">🌅</div>
          <div class="margin-card-value">${formatCurrency(data.dailyRate * 0.5)}</div>
          <div class="margin-card-label">Half-Day (4hr)</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📅</div>
          <div class="margin-card-value">${formatCurrency(data.dailyRate)}</div>
          <div class="margin-card-label">Full Day (8hr)</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📆</div>
          <div class="margin-card-value">${formatCurrency(data.weeklyRate)}</div>
          <div class="margin-card-label">Weekly</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">🗓️</div>
          <div class="margin-card-value">${formatCurrency(data.monthlyRetainer)}</div>
          <div class="margin-card-label">Monthly Retainer</div>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>🎯 Rate Tiers</h4>
        <p style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--color-gray-dark);">Offer clients tiered pricing to anchor perception and capture different budgets.</p>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Tier</th><th>Hourly</th><th>Daily</th><th>What's Included</th></tr></thead>
            <tbody>
              <tr>
                <td><strong>Economy (0.8x)</strong></td>
                <td>${formatCurrency(data.economyRate)}/hr</td>
                <td>${formatCurrency(data.economyRate * 8)}/day</td>
                <td>Basic deliverables, standard timeline</td>
              </tr>
              <tr class="current-row">
                <td><strong>Standard (1x)</strong></td>
                <td>${formatCurrency(data.standardRate)}/hr</td>
                <td>${formatCurrency(data.standardRate * 8)}/day</td>
                <td>Full service, revisions included</td>
              </tr>
              <tr>
                <td><strong>Premium (1.5x)</strong></td>
                <td>${formatCurrency(data.premiumRate)}/hr</td>
                <td>${formatCurrency(data.premiumRate * 8)}/day</td>
                <td>Priority scheduling, rush delivery, strategy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>📦 Project Rate Suggestions</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Project Size</th><th>Estimated Hours</th><th>Rate</th></tr></thead>
            <tbody>
              <tr><td>Small project</td><td>~10 hours</td><td>${formatCurrency(data.project10hr)}</td></tr>
              <tr><td>Medium project</td><td>~20 hours</td><td>${formatCurrency(data.project20hr)}</td></tr>
              <tr><td>Large project</td><td>~40 hours</td><td>${formatCurrency(data.project40hr)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>💰 Where Your Revenue Goes</h4>
        <div style="margin: 1rem 0; border-radius: 0.5rem; overflow: hidden; display: flex; height: 2.5rem; font-size: 0.75rem; font-weight: bold; color: white; text-align: center;">
          <div style="width: ${data.takeHomePct}%; background: #10b981; display: flex; align-items: center; justify-content: center; min-width: 3rem;" title="Take-Home: ${formatCurrency(data.desiredIncome)}">${data.takeHomePct.toFixed(0)}%</div>
          <div style="width: ${data.taxesPct}%; background: #ef4444; display: flex; align-items: center; justify-content: center; min-width: 3rem;" title="Taxes: ${formatCurrency(data.totalTaxes)}">${data.taxesPct.toFixed(0)}%</div>
          <div style="width: ${data.expensesPct}%; background: #f59e0b; display: flex; align-items: center; justify-content: center; min-width: 3rem;" title="Expenses: ${formatCurrency(data.totalExpenses)}">${data.expensesPct.toFixed(0)}%</div>
          <div style="width: ${data.benefitsPct}%; background: #6366f1; display: flex; align-items: center; justify-content: center; min-width: 3rem;" title="Benefits: ${formatCurrency(data.healthInsuranceAnnual + data.retirementContribution)}">${data.benefitsPct.toFixed(0)}%</div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.85rem; margin-bottom: 1rem;">
          <span><span style="display:inline-block;width:12px;height:12px;background:#10b981;border-radius:2px;margin-right:4px;"></span>Take-Home: ${formatCurrency(data.desiredIncome)}</span>
          <span><span style="display:inline-block;width:12px;height:12px;background:#ef4444;border-radius:2px;margin-right:4px;"></span>Taxes: ${formatCurrency(data.totalTaxes)}</span>
          <span><span style="display:inline-block;width:12px;height:12px;background:#f59e0b;border-radius:2px;margin-right:4px;"></span>Expenses: ${formatCurrency(data.totalExpenses)}</span>
          <span><span style="display:inline-block;width:12px;height:12px;background:#6366f1;border-radius:2px;margin-right:4px;"></span>Benefits: ${formatCurrency(data.healthInsuranceAnnual + data.retirementContribution)}</span>
        </div>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Category</th><th>Annual Amount</th></tr></thead>
            <tbody>
              <tr class="current-row"><td><strong>Your Take-Home Pay</strong></td><td><strong>${formatCurrency(data.desiredIncome)}</strong></td></tr>
              <tr><td>Self-Employment Tax (FICA)</td><td>${formatCurrency(data.selfEmploymentTax)}</td></tr>
              <tr><td>Federal Income Tax</td><td>${formatCurrency(data.federalIncomeTax)}</td></tr>
              <tr><td>State/Local Tax</td><td>${formatCurrency(data.stateTax)}</td></tr>
              <tr><td>Business Expenses</td><td>${formatCurrency(data.totalExpenses)}</td></tr>
              <tr><td>Health Insurance</td><td>${formatCurrency(data.healthInsuranceAnnual)}</td></tr>
              <tr><td>Retirement Contributions</td><td>${formatCurrency(data.retirementContribution)}</td></tr>
              <tr class="current-row"><td><strong>Total Revenue Needed</strong></td><td><strong>${formatCurrency(data.grossRevenue)}</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>⏱️ Billable Hours Breakdown</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Metric</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Total weekdays in year</td><td>261 days</td></tr>
              <tr><td>Minus vacation</td><td>-${data.vacationDays} days</td></tr>
              <tr><td>Minus sick/personal days</td><td>-${data.sickDays} days</td></tr>
              <tr><td>Minus holidays</td><td>-${data.holidays} days</td></tr>
              <tr class="current-row"><td><strong>Available working days</strong></td><td><strong>${data.workingDays} days</strong></td></tr>
              <tr><td>Hours per day (${data.hoursPerWeek}hr/wk / 5)</td><td>${(data.hoursPerWeek / 5).toFixed(1)} hrs/day</td></tr>
              <tr><td>Total working hours</td><td>${Math.round(data.totalWorkingHours)} hours</td></tr>
              <tr><td>Utilization rate</td><td>${Math.round(data.utilizationRate * 100)}%</td></tr>
              <tr class="current-row"><td><strong>Billable hours per year</strong></td><td><strong>${Math.round(data.billableHours)} hours</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>📊 Revenue at Different Utilization Rates</h4>
        <p style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--color-gray-dark);">What you'd earn at your calculated rate (${formatCurrency(data.hourlyRate)}/hr) with different utilization levels.</p>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Utilization</th><th>Billable Hrs/Year</th><th>Annual Revenue</th><th>Monthly Revenue</th></tr></thead>
            <tbody>
              ${data.projections.map(function(p) {
                const isCurrent = Math.round(p.utilization * 100) === Math.round(data.utilizationRate * 100);
                return '<tr class="' + (isCurrent ? 'current-row' : '') + '">' +
                  '<td>' + Math.round(p.utilization * 100) + '%' + (isCurrent ? ' (yours)' : '') + '</td>' +
                  '<td>' + Math.round(p.billableHours) + ' hrs</td>' +
                  '<td>' + formatCurrency(p.annualRevenue) + '</td>' +
                  '<td>' + formatCurrency(p.monthlyRevenue) + '</td></tr>';
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="margin-cards">
        <div class="margin-card highlight">
          <div class="margin-card-icon">🎯</div>
          <div class="margin-card-value">${formatCurrency(data.grossRevenue)}</div>
          <div class="margin-card-label">Annual Revenue Target</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📅</div>
          <div class="margin-card-value">${formatCurrency(data.grossRevenue / 12)}</div>
          <div class="margin-card-label">Monthly Revenue Target</div>
        </div>
      </div>

      <div class="pricing-scenarios">
        <h4>🏷️ Reality Check: Industry Comparison</h4>
        <p style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--color-gray-dark);">Common freelance rate ranges (USD) by field. Your calculated rate: <strong>${formatCurrency(data.hourlyRate)}/hr</strong>.</p>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Industry</th><th>Beginner</th><th>Intermediate</th><th>Expert</th></tr></thead>
            <tbody>
              <tr><td>Web Development</td><td>$50-75</td><td>$75-150</td><td>$150-300+</td></tr>
              <tr><td>Graphic Design</td><td>$35-60</td><td>$60-100</td><td>$100-200+</td></tr>
              <tr><td>Copywriting</td><td>$40-70</td><td>$70-120</td><td>$120-250+</td></tr>
              <tr><td>Marketing/Strategy</td><td>$50-80</td><td>$80-150</td><td>$150-350+</td></tr>
              <tr><td>Video/Animation</td><td>$45-75</td><td>$75-150</td><td>$150-300+</td></tr>
              <tr><td>Consulting</td><td>$75-125</td><td>$125-250</td><td>$250-500+</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="insights-grid">
        <div class="insight-card insight-info">
          <div class="insight-icon">💡</div>
          <div class="insight-content">
            <h5>If This Rate Feels Too High...</h5>
            <p>Try adjusting: reduce time off, increase hours/week, lower retirement %, cut expenses, or accept a lower take-home. Even a 5% increase in utilization rate significantly impacts your required hourly rate.</p>
          </div>
        </div>
        <div class="insight-card insight-success">
          <div class="insight-icon">📈</div>
          <div class="insight-content">
            <h5>Growing Beyond Hourly</h5>
            <p>Once established, shift to project or value-based pricing. Your hourly rate is a floor — charge based on the value you deliver, not just time spent.</p>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    const resultDiv = document.getElementById('freelance-rate-result');
    if (resultDiv) {
      resultDiv.innerHTML = '<div class="alert alert-error"><strong>Error:</strong> ' + message + '</div>';
      resultDiv.classList.remove('hidden');
    }
  }

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? parseFloat(el.value) || 0 : 0;
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function getSelectValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  }

  function setSelectValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Freelance Rate Calculator', url: url }).catch(function() { copyToClipboard(url); });
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      const btn = document.getElementById('share-calculation');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Link Copied!';
        setTimeout(function() { btn.innerHTML = orig; }, 2000);
      }
    }).catch(function() {});
  }
})();
