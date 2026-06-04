(function() {
  'use strict';

  // Business type presets
  const PRESETS = {
    saas: {
      label: 'Online / SaaS Business',
      'cost-legal': 500, 'cost-licenses': 100, 'cost-branding': 1500, 'cost-website': 5000,
      'cost-inventory': 0, 'cost-equipment': 2000, 'cost-lease-deposit': 0, 'cost-renovations': 0,
      'cost-marketing-launch': 3000, 'cost-professional': 1500, 'cost-technology': 4000, 'cost-insurance-annual': 800,
      'monthly-rent': 0, 'monthly-utilities': 0, 'num-employees': 1, 'avg-salary': 5000,
      'monthly-contractors': 2000, 'monthly-software': 500, 'monthly-marketing': 1500,
      'monthly-insurance': 75, 'monthly-supplies': 0, 'monthly-phone': 100,
      'monthly-accounting': 200, 'monthly-loans': 0, 'monthly-owner-salary': 4000, 'monthly-misc': 500,
      hideFields: ['row-inventory', 'row-lease-deposit', 'row-rent', 'row-supplies']
    },
    service: {
      label: 'Service-Based Business',
      'cost-legal': 500, 'cost-licenses': 300, 'cost-branding': 1000, 'cost-website': 2000,
      'cost-inventory': 0, 'cost-equipment': 1000, 'cost-lease-deposit': 3000, 'cost-renovations': 0,
      'cost-marketing-launch': 2000, 'cost-professional': 1500, 'cost-technology': 2000, 'cost-insurance-annual': 1500,
      'monthly-rent': 1000, 'monthly-utilities': 150, 'num-employees': 0, 'avg-salary': 4000,
      'monthly-contractors': 1000, 'monthly-software': 200, 'monthly-marketing': 800,
      'monthly-insurance': 125, 'monthly-supplies': 100, 'monthly-phone': 100,
      'monthly-accounting': 200, 'monthly-loans': 0, 'monthly-owner-salary': 4000, 'monthly-misc': 400,
      hideFields: ['row-inventory']
    },
    retail: {
      label: 'Retail / Brick-and-Mortar',
      'cost-legal': 800, 'cost-licenses': 500, 'cost-branding': 2000, 'cost-website': 2000,
      'cost-inventory': 15000, 'cost-equipment': 8000, 'cost-lease-deposit': 9000, 'cost-renovations': 12000,
      'cost-marketing-launch': 3000, 'cost-professional': 2000, 'cost-technology': 3000, 'cost-insurance-annual': 2500,
      'monthly-rent': 3000, 'monthly-utilities': 400, 'num-employees': 2, 'avg-salary': 3000,
      'monthly-contractors': 0, 'monthly-software': 150, 'monthly-marketing': 1000,
      'monthly-insurance': 200, 'monthly-supplies': 500, 'monthly-phone': 150,
      'monthly-accounting': 300, 'monthly-loans': 0, 'monthly-owner-salary': 3500, 'monthly-misc': 600,
      hideFields: []
    },
    restaurant: {
      label: 'Food / Restaurant',
      'cost-legal': 1000, 'cost-licenses': 2000, 'cost-branding': 2000, 'cost-website': 1500,
      'cost-inventory': 5000, 'cost-equipment': 30000, 'cost-lease-deposit': 12000, 'cost-renovations': 40000,
      'cost-marketing-launch': 3000, 'cost-professional': 3000, 'cost-technology': 5000, 'cost-insurance-annual': 3500,
      'monthly-rent': 4000, 'monthly-utilities': 800, 'num-employees': 5, 'avg-salary': 2800,
      'monthly-contractors': 0, 'monthly-software': 200, 'monthly-marketing': 800,
      'monthly-insurance': 300, 'monthly-supplies': 3000, 'monthly-phone': 150,
      'monthly-accounting': 400, 'monthly-loans': 0, 'monthly-owner-salary': 3500, 'monthly-misc': 800,
      hideFields: []
    },
    ecommerce: {
      label: 'E-commerce (Physical Products)',
      'cost-legal': 500, 'cost-licenses': 200, 'cost-branding': 1500, 'cost-website': 4000,
      'cost-inventory': 10000, 'cost-equipment': 1000, 'cost-lease-deposit': 0, 'cost-renovations': 0,
      'cost-marketing-launch': 5000, 'cost-professional': 1500, 'cost-technology': 2000, 'cost-insurance-annual': 1000,
      'monthly-rent': 0, 'monthly-utilities': 0, 'num-employees': 0, 'avg-salary': 4000,
      'monthly-contractors': 500, 'monthly-software': 300, 'monthly-marketing': 2000,
      'monthly-insurance': 100, 'monthly-supplies': 200, 'monthly-phone': 100,
      'monthly-accounting': 250, 'monthly-loans': 0, 'monthly-owner-salary': 3000, 'monthly-misc': 500,
      hideFields: ['row-lease-deposit']
    },
    freelance: {
      label: 'Freelance / Consulting',
      'cost-legal': 300, 'cost-licenses': 100, 'cost-branding': 500, 'cost-website': 1500,
      'cost-inventory': 0, 'cost-equipment': 1500, 'cost-lease-deposit': 0, 'cost-renovations': 0,
      'cost-marketing-launch': 1000, 'cost-professional': 1000, 'cost-technology': 2000, 'cost-insurance-annual': 800,
      'monthly-rent': 0, 'monthly-utilities': 0, 'num-employees': 0, 'avg-salary': 4000,
      'monthly-contractors': 0, 'monthly-software': 150, 'monthly-marketing': 300,
      'monthly-insurance': 75, 'monthly-supplies': 0, 'monthly-phone': 100,
      'monthly-accounting': 150, 'monthly-loans': 0, 'monthly-owner-salary': 5000, 'monthly-misc': 300,
      hideFields: ['row-inventory', 'row-lease-deposit', 'row-rent', 'row-supplies']
    },
    app: {
      label: 'Mobile App',
      'cost-legal': 500, 'cost-licenses': 200, 'cost-branding': 2000, 'cost-website': 2000,
      'cost-inventory': 0, 'cost-equipment': 3000, 'cost-lease-deposit': 0, 'cost-renovations': 0,
      'cost-marketing-launch': 5000, 'cost-professional': 2000, 'cost-technology': 5000, 'cost-insurance-annual': 800,
      'monthly-rent': 0, 'monthly-utilities': 0, 'num-employees': 2, 'avg-salary': 6000,
      'monthly-contractors': 3000, 'monthly-software': 400, 'monthly-marketing': 2000,
      'monthly-insurance': 75, 'monthly-supplies': 0, 'monthly-phone': 100,
      'monthly-accounting': 200, 'monthly-loans': 0, 'monthly-owner-salary': 4000, 'monthly-misc': 500,
      hideFields: ['row-inventory', 'row-lease-deposit', 'row-rent', 'row-supplies']
    }
  };

  const ALL_HIDEABLE = ['row-inventory', 'row-lease-deposit', 'row-rent', 'row-supplies', 'group-renovations', 'group-utilities'];

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
    applyBusinessTypeVisibility();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('type')) {
      const el = document.getElementById('business-type');
      if (el) el.value = params.get('type');
    }

    const fieldMap = getFieldMap();
    for (const [key, id] of Object.entries(fieldMap)) {
      if (params.has(key)) setValue(id, params.get(key));
    }

    if (params.has('growth')) {
      const el = document.getElementById('revenue-growth');
      if (el) el.value = params.get('growth');
    }

    if (params.toString()) setTimeout(() => calculateResults(), 100);
  }

  function getFieldMap() {
    return {
      legal: 'cost-legal', licenses: 'cost-licenses', branding: 'cost-branding',
      website: 'cost-website', inventory: 'cost-inventory', equipment: 'cost-equipment',
      deposit: 'cost-lease-deposit', renovations: 'cost-renovations', mktlaunch: 'cost-marketing-launch',
      professional: 'cost-professional', technology: 'cost-technology', insannual: 'cost-insurance-annual',
      rent: 'monthly-rent', utilities: 'monthly-utilities', employees: 'num-employees',
      salary: 'avg-salary', contractors: 'monthly-contractors', software: 'monthly-software',
      marketing: 'monthly-marketing', insurance: 'monthly-insurance', supplies: 'monthly-supplies',
      phone: 'monthly-phone', accounting: 'monthly-accounting', loans: 'monthly-loans',
      ownersalary: 'monthly-owner-salary', misc: 'monthly-misc',
      rev1: 'revenue-month1', rev6: 'revenue-month6', rev12: 'revenue-month12',
      funding: 'available-funding', runway: 'desired-runway'
    };
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('type', document.getElementById('business-type').value);

    const fieldMap = getFieldMap();
    for (const [key, id] of Object.entries(fieldMap)) {
      const val = getValue(id);
      if (val !== 0) params.set(key, val);
    }

    params.set('growth', document.getElementById('revenue-growth').value);

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('.form-input, .form-select').forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); calculateResults(); }
      });
      input.addEventListener('change', saveToURL);
    });

    document.getElementById('business-type').addEventListener('change', function() {
      applyPreset(this.value);
      applyBusinessTypeVisibility();
      saveToURL();
    });

    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function applyPreset(type) {
    const preset = PRESETS[type];
    if (!preset) return;

    const skipFields = ['hideFields', 'label'];
    for (const [id, val] of Object.entries(preset)) {
      if (skipFields.includes(id)) continue;
      setValue(id, val);
    }
  }

  function applyBusinessTypeVisibility() {
    const type = document.getElementById('business-type').value;
    const preset = PRESETS[type];
    if (!preset) return;

    // Show all first
    ALL_HIDEABLE.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = '';
    });

    // Hide specific ones
    if (preset.hideFields) {
      preset.hideFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
    }
  }

  function calculateResults() {
    const funding = getValue('available-funding');
    if (funding <= 0) {
      showError('Please enter your available funding/savings.');
      return;
    }

    saveToURL();

    // Calculate one-time costs
    const oneTimeCosts = {
      'Legal Formation': getValue('cost-legal'),
      'Licenses & Permits': getValue('cost-licenses'),
      'Branding & Logo': getValue('cost-branding'),
      'Website Development': getValue('cost-website'),
      'Initial Inventory': getValue('cost-inventory'),
      'Equipment & Furniture': getValue('cost-equipment'),
      'Lease Deposit': getValue('cost-lease-deposit'),
      'Renovations / Buildout': getValue('cost-renovations'),
      'Marketing Launch': getValue('cost-marketing-launch'),
      'Professional Services': getValue('cost-professional'),
      'Technology Setup': getValue('cost-technology'),
      'Insurance (First Year)': getValue('cost-insurance-annual')
    };

    const totalOneTime = Object.values(oneTimeCosts).reduce((a, b) => a + b, 0);

    // Calculate monthly costs
    const payroll = getValue('num-employees') * getValue('avg-salary');
    const monthlyCosts = {
      'Rent / Lease': getValue('monthly-rent'),
      'Utilities': getValue('monthly-utilities'),
      'Payroll': payroll,
      'Contractors': getValue('monthly-contractors'),
      'Software': getValue('monthly-software'),
      'Marketing': getValue('monthly-marketing'),
      'Insurance': getValue('monthly-insurance'),
      'Supplies': getValue('monthly-supplies'),
      'Phone / Internet': getValue('monthly-phone'),
      'Accounting': getValue('monthly-accounting'),
      'Loan Payments': getValue('monthly-loans'),
      "Owner's Salary": getValue('monthly-owner-salary'),
      'Miscellaneous': getValue('monthly-misc')
    };

    const totalMonthly = Object.values(monthlyCosts).reduce((a, b) => a + b, 0);

    // Revenue projections
    const rev1 = getValue('revenue-month1');
    const rev6 = getValue('revenue-month6');
    const rev12 = getValue('revenue-month12');
    const growthModel = document.getElementById('revenue-growth').value;
    const desiredRunway = getValue('desired-runway') || 12;

    // Calculate monthly revenue for each month (1-12)
    const monthlyRevenue = [];
    for (let m = 1; m <= Math.max(12, desiredRunway); m++) {
      monthlyRevenue.push(getRevenueForMonth(m, rev1, rev6, rev12, growthModel));
    }

    // Gross burn rate (total monthly spending, no revenue)
    const grossBurn = totalMonthly;

    // Net burn for month 1
    const netBurnMonth1 = totalMonthly - rev1;

    // Cash flow projection
    const cashFlow = [];
    let cashBalance = funding;
    let cashZeroMonth = null;
    let breakEvenMonth = null;

    for (let m = 1; m <= Math.max(12, desiredRunway); m++) {
      const startingCash = cashBalance;
      const revenue = monthlyRevenue[m - 1];
      const expenses = (m === 1) ? totalOneTime + totalMonthly : totalMonthly;
      const netFlow = revenue - expenses;
      cashBalance = startingCash + netFlow;

      if (cashBalance <= 0 && cashZeroMonth === null) {
        cashZeroMonth = m;
      }

      if (revenue >= totalMonthly && breakEvenMonth === null) {
        breakEvenMonth = m;
      }

      cashFlow.push({
        month: m,
        startingCash: startingCash,
        revenue: revenue,
        expenses: expenses,
        netFlow: netFlow,
        endingCash: cashBalance
      });
    }

    // Runway calculation: how many months until cash runs out
    let runwayMonths = null;
    let tempCash = funding;
    for (let m = 1; m <= 60; m++) {
      const rev = getRevenueForMonth(m, rev1, rev6, rev12, growthModel);
      const exp = (m === 1) ? totalOneTime + totalMonthly : totalMonthly;
      tempCash = tempCash + rev - exp;
      if (tempCash <= 0) {
        runwayMonths = m;
        break;
      }
    }

    // Total funding needed for desired runway
    let cumulativeExpenses = 0;
    let cumulativeRevenue = 0;
    for (let m = 1; m <= desiredRunway; m++) {
      cumulativeExpenses += (m === 1) ? totalOneTime + totalMonthly : totalMonthly;
      cumulativeRevenue += getRevenueForMonth(m, rev1, rev6, rev12, growthModel);
    }
    const totalFundingNeeded = cumulativeExpenses - cumulativeRevenue;
    const fundingGap = totalFundingNeeded - funding;

    // What-if: revenue comes 3 months late
    let cumulativeExpensesLate = 0;
    let cumulativeRevenueLate = 0;
    for (let m = 1; m <= desiredRunway; m++) {
      cumulativeExpensesLate += (m === 1) ? totalOneTime + totalMonthly : totalMonthly;
      // Shift revenue by 3 months
      const lateMonth = m - 3;
      cumulativeRevenueLate += lateMonth > 0 ? getRevenueForMonth(lateMonth, rev1, rev6, rev12, growthModel) : 0;
    }
    const fundingNeededLate = cumulativeExpensesLate - cumulativeRevenueLate;
    const additionalNeededIfLate = fundingNeededLate - totalFundingNeeded;

    // Business type
    const businessType = document.getElementById('business-type').value;

    displayResults({
      totalOneTime, totalMonthly, grossBurn, netBurnMonth1,
      oneTimeCosts, monthlyCosts, funding, desiredRunway,
      runwayMonths, breakEvenMonth, cashZeroMonth,
      totalFundingNeeded, fundingGap, cashFlow,
      additionalNeededIfLate, businessType, monthlyRevenue
    });
  }

  function getRevenueForMonth(month, rev1, rev6, rev12, model) {
    if (month <= 0) return 0;
    if (month === 1) return rev1;
    if (month === 6) return rev6;
    if (month === 12) return rev12;

    if (model === 'exponential') {
      // Exponential interpolation between known points
      if (month < 6) {
        if (rev1 === 0) return rev6 * (month - 1) / 5;
        const rate = Math.pow(rev6 / Math.max(rev1, 1), 1 / 5);
        return rev1 * Math.pow(rate, month - 1);
      } else if (month <= 12) {
        if (rev6 === 0) return rev12 * (month - 6) / 6;
        const rate = Math.pow(rev12 / Math.max(rev6, 1), 1 / 6);
        return rev6 * Math.pow(rate, month - 6);
      } else {
        // Extrapolate beyond 12 at same growth rate as months 6-12
        if (rev6 === 0) return rev12 * (1 + (month - 12) * 0.1);
        const rate = Math.pow(rev12 / Math.max(rev6, 1), 1 / 6);
        return rev12 * Math.pow(rate, month - 12);
      }
    } else {
      // Linear interpolation
      if (month < 6) {
        return rev1 + (rev6 - rev1) * (month - 1) / 5;
      } else if (month <= 12) {
        return rev6 + (rev12 - rev6) * (month - 6) / 6;
      } else {
        // Extrapolate linearly beyond 12
        const monthlyGrowth = (rev12 - rev6) / 6;
        return rev12 + monthlyGrowth * (month - 12);
      }
    }
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('startup-cost-result');
    if (!resultDiv) return;

    // Determine risk indicators
    const warnings = [];
    if (data.runwayMonths !== null && data.runwayMonths < 6) {
      warnings.push({ level: 'danger', icon: '🚨', text: `Runway is only ${data.runwayMonths} month${data.runwayMonths !== 1 ? 's' : ''} — less than 6 months is very risky` });
    } else if (data.runwayMonths !== null && data.runwayMonths < 12) {
      warnings.push({ level: 'warning', icon: '⚠️', text: `Runway is ${data.runwayMonths} months — consider securing additional funding` });
    }

    if (data.monthlyRevenue[0] === 0 && data.monthlyRevenue[1] === 0 && data.monthlyRevenue[2] === 0) {
      warnings.push({ level: 'warning', icon: '⚠️', text: 'No revenue projected for 3+ months — ensure you have sufficient reserves' });
    }

    if (data.grossBurn > 10000 && data.funding < data.grossBurn * 6) {
      warnings.push({ level: 'warning', icon: '⚠️', text: `Monthly burn of ${formatCurrency(data.grossBurn)} without 6+ months of funding coverage` });
    }

    if (data.fundingGap > 0) {
      warnings.push({ level: 'danger', icon: '🚨', text: `Funding gap of ${formatCurrency(data.fundingGap)} — you need more capital for your desired ${data.desiredRunway}-month runway` });
    }

    // Cost breakdown bars
    const maxOneTime = Math.max(...Object.values(data.oneTimeCosts));
    const maxMonthly = Math.max(...Object.values(data.monthlyCosts));

    // Recommendations based on business type
    const recommendations = getRecommendations(data.businessType, data);

    // Build cash flow table (show up to 12 months or desired runway, whichever is less for display)
    const displayMonths = Math.min(data.cashFlow.length, 12);
    const cashFlowRows = data.cashFlow.slice(0, displayMonths).map(cf => `
      <tr class="${cf.endingCash < 0 ? 'row-danger' : cf.endingCash < data.grossBurn ? 'row-warning' : ''}">
        <td>Month ${cf.month}</td>
        <td>${formatCurrency(cf.startingCash)}</td>
        <td class="text-success">${formatCurrency(cf.revenue)}</td>
        <td class="text-danger">${formatCurrency(cf.expenses)}</td>
        <td class="${cf.netFlow >= 0 ? 'text-success' : 'text-danger'}">${formatCurrency(cf.netFlow)}</td>
        <td class="${cf.endingCash < 0 ? 'text-danger' : ''}">${formatCurrency(cf.endingCash)}</td>
      </tr>
    `).join('');

    // One-time cost bars
    const oneTimeBars = Object.entries(data.oneTimeCosts)
      .filter(([, val]) => val > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([label, val]) => `
        <div class="cost-bar-row">
          <span class="cost-bar-label">${label}</span>
          <div class="cost-bar-track">
            <div class="cost-bar-fill" style="width: ${(val / maxOneTime) * 100}%"></div>
          </div>
          <span class="cost-bar-value">${formatCurrency(val)}</span>
        </div>
      `).join('');

    // Monthly cost bars
    const monthlyBars = Object.entries(data.monthlyCosts)
      .filter(([, val]) => val > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([label, val]) => `
        <div class="cost-bar-row">
          <span class="cost-bar-label">${label}</span>
          <div class="cost-bar-track">
            <div class="cost-bar-fill monthly-fill" style="width: ${(val / maxMonthly) * 100}%"></div>
          </div>
          <span class="cost-bar-value">${formatCurrency(val)}/mo</span>
        </div>
      `).join('');

    resultDiv.innerHTML = `
      <h3>📊 Startup Cost Analysis</h3>

      ${warnings.length > 0 ? `
        <div class="risk-warnings">
          ${warnings.map(w => `
            <div class="risk-alert risk-${w.level}">
              <span class="risk-icon">${w.icon}</span>
              <span class="risk-text">${w.text}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="margin-cards">
        <div class="margin-card highlight">
          <div class="margin-card-icon">💰</div>
          <div class="margin-card-value">${formatCurrency(data.totalOneTime + data.totalMonthly)}</div>
          <div class="margin-card-label">Total to Launch (Month 1)</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">🔥</div>
          <div class="margin-card-value">${formatCurrency(data.grossBurn)}</div>
          <div class="margin-card-label">Monthly Burn Rate</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">⏱️</div>
          <div class="margin-card-value">${data.runwayMonths !== null ? data.runwayMonths + ' mo' : '∞'}</div>
          <div class="margin-card-label">Runway (Cash-Zero)</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📈</div>
          <div class="margin-card-value">${data.breakEvenMonth !== null ? 'Month ' + data.breakEvenMonth : 'N/A'}</div>
          <div class="margin-card-label">Break-Even Month</div>
        </div>
      </div>

      <div class="margin-cards" style="margin-top: 1rem;">
        <div class="margin-card">
          <div class="margin-card-icon">📋</div>
          <div class="margin-card-value">${formatCurrency(data.totalOneTime)}</div>
          <div class="margin-card-label">One-Time Costs</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">🔄</div>
          <div class="margin-card-value">${formatCurrency(data.totalMonthly)}</div>
          <div class="margin-card-label">Monthly Recurring</div>
        </div>
        <div class="margin-card ${data.fundingGap > 0 ? 'card-danger' : ''}">
          <div class="margin-card-icon">${data.fundingGap > 0 ? '⚠️' : '✅'}</div>
          <div class="margin-card-value">${data.fundingGap > 0 ? formatCurrency(data.fundingGap) : formatCurrency(Math.abs(data.fundingGap))}</div>
          <div class="margin-card-label">${data.fundingGap > 0 ? 'Funding Gap' : 'Funding Surplus'}</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">💵</div>
          <div class="margin-card-value">${formatCurrency(data.totalFundingNeeded)}</div>
          <div class="margin-card-label">Total Funding Needed (${data.desiredRunway} mo)</div>
        </div>
      </div>

      <div class="cost-breakdown-section">
        <h4>📊 One-Time Cost Breakdown</h4>
        <div class="cost-bars">
          ${oneTimeBars}
        </div>
      </div>

      <div class="cost-breakdown-section">
        <h4>🔄 Monthly Cost Breakdown</h4>
        <div class="cost-bars">
          ${monthlyBars}
        </div>
      </div>

      <div class="cost-split-visual">
        <h4>💡 Cost Split: One-Time vs Recurring (12 months)</h4>
        <div class="split-bar">
          <div class="split-onetime" style="width: ${(data.totalOneTime / (data.totalOneTime + data.totalMonthly * 12)) * 100}%">
            <span>One-Time: ${formatCurrency(data.totalOneTime)}</span>
          </div>
          <div class="split-recurring" style="width: ${((data.totalMonthly * 12) / (data.totalOneTime + data.totalMonthly * 12)) * 100}%">
            <span>Recurring (12mo): ${formatCurrency(data.totalMonthly * 12)}</span>
          </div>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>📅 Month-by-Month Cash Flow Projection</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Starting Cash</th>
                <th>Revenue</th>
                <th>Expenses</th>
                <th>Net Flow</th>
                <th>Ending Cash</th>
              </tr>
            </thead>
            <tbody>
              ${cashFlowRows}
            </tbody>
          </table>
        </div>
      </div>

      <div class="whatif-section">
        <h4>🔮 What-If Scenario</h4>
        <div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
          <p><strong>If revenue comes 3 months later than expected:</strong></p>
          <p>You would need an additional <strong>${formatCurrency(data.additionalNeededIfLate)}</strong> in funding to maintain your ${data.desiredRunway}-month runway.</p>
          <p>Total needed: ${formatCurrency(data.totalFundingNeeded + data.additionalNeededIfLate)}</p>
        </div>
      </div>

      ${recommendations.length > 0 ? `
        <div class="insights-grid">
          ${recommendations.map(r => `
            <div class="insight-card ${r.type}">
              <div class="insight-icon">${r.icon}</div>
              <div class="insight-content">
                <h5>${r.title}</h5>
                <p>${r.text}</p>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <style>
        .risk-warnings { margin-bottom: 1.5rem; }
        .risk-alert { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 0.5rem; font-weight: 500; }
        .risk-danger { background: #fee2e2; border: 1px solid #fca5a5; color: #991b1b; }
        .risk-warning { background: #fef3c7; border: 1px solid #fcd34d; color: #92400e; }
        .risk-icon { font-size: 1.2rem; }
        .cost-breakdown-section { margin: 1.5rem 0; }
        .cost-bars { display: flex; flex-direction: column; gap: 0.5rem; }
        .cost-bar-row { display: flex; align-items: center; gap: 0.75rem; }
        .cost-bar-label { min-width: 140px; font-size: 0.85rem; color: var(--color-text-secondary, #666); }
        .cost-bar-track { flex: 1; height: 20px; background: var(--color-bg-secondary, #f0f0f0); border-radius: 4px; overflow: hidden; }
        .cost-bar-fill { height: 100%; background: var(--color-primary, #4f46e5); border-radius: 4px; transition: width 0.3s ease; }
        .cost-bar-fill.monthly-fill { background: var(--color-success, #10b981); }
        .cost-bar-value { min-width: 90px; text-align: right; font-weight: 600; font-size: 0.85rem; }
        .cost-split-visual { margin: 1.5rem 0; }
        .split-bar { display: flex; height: 36px; border-radius: 8px; overflow: hidden; font-size: 0.8rem; font-weight: 600; }
        .split-onetime { background: var(--color-primary, #4f46e5); color: white; display: flex; align-items: center; justify-content: center; padding: 0 0.5rem; white-space: nowrap; overflow: hidden; }
        .split-recurring { background: var(--color-success, #10b981); color: white; display: flex; align-items: center; justify-content: center; padding: 0 0.5rem; white-space: nowrap; overflow: hidden; }
        .whatif-section { margin: 1.5rem 0; }
        .row-danger { background: #fee2e2 !important; }
        .row-warning { background: #fef3c7 !important; }
        .card-danger { border-color: #fca5a5 !important; background: #fee2e2 !important; }
        @media (max-width: 600px) {
          .cost-bar-label { min-width: 100px; font-size: 0.75rem; }
          .cost-bar-value { min-width: 70px; font-size: 0.75rem; }
          .split-bar { font-size: 0.7rem; }
        }
      </style>
    `;

    resultDiv.classList.remove('hidden');
  }

  function getRecommendations(businessType, data) {
    const recs = [];

    switch (businessType) {
      case 'saas':
        recs.push({ type: 'insight-info', icon: '💡', title: 'SaaS Tip', text: 'Focus on minimizing development costs with an MVP. Launch fast, validate with real users, then invest in scaling.' });
        recs.push({ type: 'insight-success', icon: '📈', title: 'Growth Strategy', text: 'SaaS businesses typically reach profitability in 18-24 months. Prioritize customer acquisition cost vs. lifetime value ratio.' });
        break;
      case 'service':
        recs.push({ type: 'insight-info', icon: '💡', title: 'Service Business Tip', text: 'You can start generating revenue quickly. Focus initial spending on marketing and building your client pipeline.' });
        recs.push({ type: 'insight-success', icon: '📈', title: 'Scale Strategy', text: 'Service businesses have lower startup costs but watch for the income ceiling. Plan for hiring or productizing early.' });
        break;
      case 'retail':
        recs.push({ type: 'insight-info', icon: '💡', title: 'Retail Tip', text: 'Negotiate lease terms carefully — look for rent-free buildout periods. Inventory management is your biggest ongoing challenge.' });
        recs.push({ type: 'insight-success', icon: '📈', title: 'Location Matters', text: 'Foot traffic analysis is critical. Consider starting with a pop-up or shared space to validate your concept before a full lease.' });
        break;
      case 'restaurant':
        recs.push({ type: 'insight-info', icon: '💡', title: 'Restaurant Tip', text: 'Equipment and buildout are your largest costs. Consider used equipment and phased buildout to reduce initial capital needs.' });
        recs.push({ type: 'insight-success', icon: '📈', title: 'Cash Flow Reality', text: 'Restaurants typically need 6-12 months to reach profitability. Keep at least 6 months of operating cash as reserve.' });
        break;
      case 'ecommerce':
        recs.push({ type: 'insight-info', icon: '💡', title: 'E-commerce Tip', text: 'Start with a small inventory range to test demand. Customer acquisition cost will be your biggest ongoing expense.' });
        recs.push({ type: 'insight-success', icon: '📈', title: 'Marketing Focus', text: 'Budget 15-25% of projected revenue for marketing. Build email lists early — they have the highest ROI for e-commerce.' });
        break;
      case 'freelance':
        recs.push({ type: 'insight-info', icon: '💡', title: 'Freelance Tip', text: 'Your startup costs are minimal — focus spending on portfolio, networking, and skill development. Start while employed if possible.' });
        recs.push({ type: 'insight-success', icon: '📈', title: 'Income Strategy', text: 'Build recurring revenue through retainers. Aim for 3 months of expenses saved before going full-time freelance.' });
        break;
      case 'app':
        recs.push({ type: 'insight-info', icon: '💡', title: 'App Development Tip', text: 'Build an MVP with core features only. Development costs escalate quickly — scope creep is the #1 budget killer for apps.' });
        recs.push({ type: 'insight-success', icon: '📈', title: 'Launch Strategy', text: 'Budget heavily for user acquisition post-launch. Most apps need 2-3x the development budget for marketing to gain traction.' });
        break;
    }

    // Universal recommendations based on numbers
    if (data.runwayMonths !== null && data.runwayMonths < 12) {
      recs.push({ type: 'insight-warning', icon: '⚠️', title: 'Extend Your Runway', text: 'Consider reducing monthly costs or securing additional funding. Businesses often take longer than expected to reach profitability.' });
    }

    if (data.grossBurn > 0 && data.monthlyCosts["Owner's Salary"] / data.grossBurn > 0.4) {
      recs.push({ type: 'insight-info', icon: '💡', title: 'Owner Salary Note', text: 'Your salary is over 40% of monthly burn. Consider reducing your draw in early months to extend runway.' });
    }

    return recs;
  }

  function showError(message) {
    const resultDiv = document.getElementById('startup-cost-result');
    if (resultDiv) {
      resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`;
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

  function formatCurrency(amount) {
    if (amount < 0) {
      return '-' + new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.abs(amount));
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  }

  function shareCalculation() {
    saveToURL();
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Startup Cost Calculator', url }).catch(() => copyToClipboard(url));
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-calculation');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Link Copied!';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
      }
    }).catch(() => {});
  }
})();
