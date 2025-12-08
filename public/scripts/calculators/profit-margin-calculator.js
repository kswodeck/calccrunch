// Profit Margin Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    revenue: 100000,
    cogs: 60000,
    revenueFrequency: 12,
    otherIncome: 0,
    operatingExpenses: 15000,
    expensesFrequency: 12,
    interestExpense: 2000,
    depreciation: 3000,
    taxRate: 21,
    unitsSold: '',
    mode: 'simple'
  };

  // Frequency labels and multipliers
  const FREQUENCY_CONFIG = {
    365: { label: 'Daily', adjective: 'Daily', plural: 'days', toAnnual: 365 },
    52: { label: 'Weekly', adjective: 'Weekly', plural: 'weeks', toAnnual: 52 },
    26: { label: 'Bi-Weekly', adjective: 'Bi-Weekly', plural: 'bi-weekly periods', toAnnual: 26 },
    12: { label: 'Monthly', adjective: 'Monthly', plural: 'months', toAnnual: 12 },
    4: { label: 'Quarterly', adjective: 'Quarterly', plural: 'quarters', toAnnual: 4 },
    1: { label: 'Annual', adjective: 'Annual', plural: 'years', toAnnual: 1 }
  };

  // Industry scenarios
  const SCENARIOS = {
    retail: {
      name: 'Retail',
      revenue: 500000,
      cogs: 300000,
      operatingExpenses: 150000,
      otherIncome: 0,
      interestExpense: 5000,
      depreciation: 10000,
      taxRate: 25,
      benchmark: { gross: 40, operating: 10, net: 3 }
    },
    software: {
      name: 'SaaS/Software',
      revenue: 1000000,
      cogs: 200000,
      operatingExpenses: 500000,
      otherIncome: 5000,
      interestExpense: 10000,
      depreciation: 50000,
      taxRate: 21,
      benchmark: { gross: 80, operating: 25, net: 18 }
    },
    manufacturing: {
      name: 'Manufacturing',
      revenue: 2000000,
      cogs: 1400000,
      operatingExpenses: 350000,
      otherIncome: 10000,
      interestExpense: 30000,
      depreciation: 80000,
      taxRate: 24,
      benchmark: { gross: 30, operating: 12, net: 7 }
    },
    service: {
      name: 'Service Business',
      revenue: 300000,
      cogs: 90000,
      operatingExpenses: 120000,
      otherIncome: 0,
      interestExpense: 2000,
      depreciation: 5000,
      taxRate: 22,
      benchmark: { gross: 70, operating: 28, net: 15 }
    },
    restaurant: {
      name: 'Restaurant',
      revenue: 800000,
      cogs: 280000,
      operatingExpenses: 400000,
      otherIncome: 0,
      interestExpense: 8000,
      depreciation: 15000,
      taxRate: 23,
      benchmark: { gross: 65, operating: 12, net: 5 }
    }
  };

  // State
  let state = {
    mode: 'simple',
    activeScenario: null,
    lastCalculationResults: null,
    viewPeriod: 'input' // 'input', 'annual', 'monthly', 'daily'
  };

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadFromURL();
    attachEventListeners();
  });

  function initializeForm() {
    setValue('revenue', DEFAULT_VALUES.revenue);
    setValue('cogs', DEFAULT_VALUES.cogs);
    setValue('revenue-frequency', DEFAULT_VALUES.revenueFrequency);
    setValue('other-income', DEFAULT_VALUES.otherIncome);
    setValue('operating-expenses', DEFAULT_VALUES.operatingExpenses);
    setValue('expenses-frequency', DEFAULT_VALUES.expensesFrequency);
    setValue('interest-expense', DEFAULT_VALUES.interestExpense);
    setValue('depreciation', DEFAULT_VALUES.depreciation);
    setValue('tax-rate', DEFAULT_VALUES.taxRate);
    setValue('units-sold', DEFAULT_VALUES.unitsSold);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    const fields = [
      { id: 'revenue', param: 'revenue' },
      { id: 'cogs', param: 'cogs' },
      { id: 'other-income', param: 'other_income' },
      { id: 'operating-expenses', param: 'operating_expenses' },
      { id: 'interest-expense', param: 'interest_expense' },
      { id: 'depreciation', param: 'depreciation' },
      { id: 'tax-rate', param: 'tax_rate' },
      { id: 'units-sold', param: 'units_sold' }
    ];
    
    fields.forEach(field => {
      if (params.has(field.param)) {
        const value = parseFloat(params.get(field.param));
        if (!isNaN(value)) {
          setValue(field.id, value);
        }
      }
    });
    
    // Load revenue frequency
    if (params.has('revenue_frequency')) {
      const frequency = parseInt(params.get('revenue_frequency'));
      if (FREQUENCY_CONFIG[frequency]) {
        setValue('revenue-frequency', frequency);
      }
    }
    
    // Load expenses frequency
    if (params.has('expenses_frequency')) {
      const frequency = parseInt(params.get('expenses_frequency'));
      if (FREQUENCY_CONFIG[frequency]) {
        setValue('expenses-frequency', frequency);
      }
    }
    
    // Load mode
    if (params.has('mode')) {
      const mode = params.get('mode');
      if (mode === 'advanced' || mode === 'simple') {
        setMode(mode);
      }
    }
    
    // Load scenario
    if (params.has('scenario')) {
      const scenario = params.get('scenario');
      if (SCENARIOS[scenario]) {
        state.activeScenario = scenario;
        updateScenarioButtons();
      }
    }
    
    // Auto-calculate if we loaded values
    if (params.toString()) {
      setTimeout(() => {
        calculateResults();
      }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    params.set('revenue', getValue('revenue'));
    params.set('cogs', getValue('cogs'));
    params.set('revenue_frequency', getValue('revenue-frequency'));
    params.set('other_income', getValue('other-income'));
    params.set('mode', state.mode);
    
    if (state.mode === 'advanced') {
      params.set('operating_expenses', getValue('operating-expenses'));
      params.set('expenses_frequency', getValue('expenses-frequency'));
      params.set('interest_expense', getValue('interest-expense'));
      params.set('depreciation', getValue('depreciation'));
      params.set('tax_rate', getValue('tax-rate'));
      
      const unitsSold = getValue('units-sold');
      if (unitsSold > 0) {
        params.set('units_sold', unitsSold);
      }
    }
    
    if (state.activeScenario) {
      params.set('scenario', state.activeScenario);
    }
    
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        calculateResults();
        document.querySelector(".calculator-result")?.scrollIntoView({behavior: 'smooth', block: 'start'});
      });
    }

    // Mode toggle
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const mode = this.dataset.mode;
        setMode(mode);
        saveToURL();
      });
    });

    // Frequency changes
    const revenueFrequencySelect = document.getElementById('revenue-frequency');
    if (revenueFrequencySelect) {
      revenueFrequencySelect.addEventListener('change', function() {
        state.activeScenario = null;
        updateScenarioButtons();
        saveToURL();
      });
    }
    
    const expensesFrequencySelect = document.getElementById('expenses-frequency');
    if (expensesFrequencySelect) {
      expensesFrequencySelect.addEventListener('change', function() {
        state.activeScenario = null;
        updateScenarioButtons();
        saveToURL();
      });
    }

    // Scenario buttons
    const scenarioBtns = document.querySelectorAll('.scenario-btn');
    scenarioBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const scenario = this.dataset.scenario;
        loadScenario(scenario);
      });
    });

    // Reset button
    const resetBtn = document.getElementById('reset-form');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetForm);
    }

    // Add change listeners to all inputs
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateResults();
        }
      });
      
      input.addEventListener('change', function() {
        if (this.id !== 'revenue-frequency' && this.id !== 'expenses-frequency') {
          state.activeScenario = null;
          updateScenarioButtons();
        }
        saveToURL();
      });
      
      if (input.type === 'number') {
        let saveTimeout;
        input.addEventListener('input', function() {
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => {
            state.activeScenario = null;
            updateScenarioButtons();
            saveToURL();
          }, 500);
        });
      }
    });

    // Share button
    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }
  }

  function setMode(mode) {
    state.mode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Show/hide advanced sections
    document.querySelectorAll('.advanced-section').forEach(section => {
      section.classList.toggle('hidden', mode !== 'advanced');
    });
  }

  function loadScenario(scenarioKey) {
    const scenario = SCENARIOS[scenarioKey];
    if (!scenario) return;
    
    state.activeScenario = scenarioKey;
    
    setValue('revenue', scenario.revenue);
    setValue('cogs', scenario.cogs);
    setValue('revenue-frequency', 1); // Industry scenarios are annual
    setValue('other-income', scenario.otherIncome);
    setValue('operating-expenses', scenario.operatingExpenses);
    setValue('expenses-frequency', 1); // Industry scenarios are annual
    setValue('interest-expense', scenario.interestExpense);
    setValue('depreciation', scenario.depreciation);
    setValue('tax-rate', scenario.taxRate);
    
    // Switch to advanced mode to show all fields
    setMode('advanced');
    
    updateScenarioButtons();
    saveToURL();
  }

  function updateScenarioButtons() {
    document.querySelectorAll('.scenario-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.scenario === state.activeScenario);
    });
  }

  function resetForm() {
    initializeForm();
    setMode('simple');
    state.activeScenario = null;
    state.viewPeriod = 'annual';
    updateScenarioButtons();
    
    // Clear URL parameters
    window.history.replaceState({}, '', window.location.pathname);
    
    // Hide results
    const resultDiv = document.getElementById('profit-result');
    if (resultDiv) {
      resultDiv.classList.add('hidden');
    }
  }

  function calculateResults() {
    const revenue = getValue('revenue');
    const cogs = getValue('cogs');
    const revenueFrequency = getValue('revenue-frequency');
    const otherIncome = getValue('other-income');
    const operatingExpenses = state.mode === 'advanced' ? getValue('operating-expenses') : 0;
    const expensesFrequency = state.mode === 'advanced' ? getValue('expenses-frequency') : 12;
    const interestExpense = state.mode === 'advanced' ? getValue('interest-expense') : 0;
    const depreciation = state.mode === 'advanced' ? getValue('depreciation') : 0;
    const taxRate = state.mode === 'advanced' ? getValue('tax-rate') : 0;
    const unitsSold = getValue('units-sold');
    
    // Validate inputs
    if (!validateInputs(revenue, cogs)) {
      return;
    }
    
    saveToURL();
    
    // Get frequency configs
    const revenueFreqConfig = FREQUENCY_CONFIG[revenueFrequency];
    const expensesFreqConfig = FREQUENCY_CONFIG[expensesFrequency];
    
    // Calculate annual values (normalize everything to annual)
    const annualRevenue = revenue * revenueFreqConfig.toAnnual;
    const annualCogs = cogs * revenueFreqConfig.toAnnual;
    const annualOtherIncome = otherIncome * revenueFreqConfig.toAnnual;
    const annualOperatingExpenses = operatingExpenses * expensesFreqConfig.toAnnual;
    const annualInterestExpense = interestExpense * expensesFreqConfig.toAnnual;
    const annualDepreciation = depreciation * expensesFreqConfig.toAnnual;
    
    // Calculate annual profit metrics
    const annualGrossProfit = annualRevenue - annualCogs;
    const grossMargin = (annualGrossProfit / annualRevenue) * 100;
    const markup = annualCogs > 0 ? (annualGrossProfit / annualCogs) * 100 : 0;
    
    // Operating profit (EBIT)
    const annualOperatingProfit = annualGrossProfit - annualOperatingExpenses;
    const operatingMargin = (annualOperatingProfit / annualRevenue) * 100;
    
    // EBITDA
    const annualEbitda = annualOperatingProfit + annualDepreciation;
    const ebitdaMargin = (annualEbitda / annualRevenue) * 100;
    
    // Earnings Before Tax (EBT)
    const annualEbt = annualOperatingProfit + annualOtherIncome - annualInterestExpense;
    
    // Net profit
    const annualTaxes = annualEbt > 0 ? annualEbt * (taxRate / 100) : 0;
    const annualNetProfit = annualEbt - annualTaxes;
    const netMargin = (annualNetProfit / annualRevenue) * 100;
    
    // Calculate monthly values
    const monthlyRevenue = annualRevenue / 12;
    const monthlyCogs = annualCogs / 12;
    const monthlyOtherIncome = annualOtherIncome / 12;
    const monthlyGrossProfit = annualGrossProfit / 12;
    const monthlyOperatingExpenses = annualOperatingExpenses / 12;
    const monthlyOperatingProfit = annualOperatingProfit / 12;
    const monthlyInterestExpense = annualInterestExpense / 12;
    const monthlyDepreciation = annualDepreciation / 12;
    const monthlyEbitda = annualEbitda / 12;
    const monthlyEbt = annualEbt / 12;
    const monthlyTaxes = annualTaxes / 12;
    const monthlyNetProfit = annualNetProfit / 12;
    
    // Per unit calculations (based on input period units)
    let perUnitData = null;
    if (unitsSold > 0) {
      perUnitData = {
        revenuePerUnit: revenue / unitsSold,
        cogsPerUnit: cogs / unitsSold,
        grossProfitPerUnit: (revenue - cogs) / unitsSold,
        netProfitPerUnit: (annualNetProfit / revenueFreqConfig.toAnnual) / unitsSold
      };
    }
    
    // Break-even analysis (annual)
    const breakEvenRevenue = annualCogs + annualOperatingExpenses + annualInterestExpense;
    const breakEvenMargin = annualRevenue > 0 ? ((annualRevenue - breakEvenRevenue) / annualRevenue) * 100 : 0;
    
    // Get scenario benchmark if applicable
    const benchmark = state.activeScenario ? SCENARIOS[state.activeScenario].benchmark : null;
    
    const results = {
      // Input values (as entered)
      inputRevenue: revenue,
      inputCogs: cogs,
      inputOtherIncome: otherIncome,
      inputOperatingExpenses: operatingExpenses,
      inputInterestExpense: interestExpense,
      inputDepreciation: depreciation,
      
      // Frequency info
      revenueFrequency,
      revenueFrequencyLabel: revenueFreqConfig.label,
      revenueToAnnual: revenueFreqConfig.toAnnual,
      expensesFrequency,
      expensesFrequencyLabel: expensesFreqConfig.label,
      expensesToAnnual: expensesFreqConfig.toAnnual,
      
      // Annual values (normalized)
      annualRevenue,
      annualCogs,
      annualOtherIncome,
      annualGrossProfit,
      annualOperatingExpenses,
      annualOperatingProfit,
      annualInterestExpense,
      annualDepreciation,
      annualEbitda,
      annualEbt,
      annualTaxes,
      annualNetProfit,
      
      // Monthly values
      monthlyRevenue,
      monthlyCogs,
      monthlyOtherIncome,
      monthlyGrossProfit,
      monthlyOperatingExpenses,
      monthlyOperatingProfit,
      monthlyInterestExpense,
      monthlyDepreciation,
      monthlyEbitda,
      monthlyEbt,
      monthlyTaxes,
      monthlyNetProfit,
      
      // Margins (always based on annual)
      grossMargin,
      markup,
      operatingMargin,
      ebitdaMargin,
      netMargin,
      taxRate,
      
      // Other
      perUnitData,
      breakEvenRevenue,
      breakEvenMargin,
      benchmark,
      mode: state.mode
    };
    
    state.lastCalculationResults = results;
    state.viewPeriod = 'annual';
    displayResults(results);
  }

  function validateInputs(revenue, cogs) {
    if (revenue <= 0) {
      showError('Revenue must be greater than zero');
      return false;
    }
    if (cogs < 0) {
      showError('Cost of Goods Sold cannot be negative');
      return false;
    }
    if (cogs > revenue * 10) {
      showError('Cost of Goods Sold seems unusually high compared to revenue');
      return false;
    }
    return true;
  }

  function showError(message) {
    const resultDiv = document.getElementById('profit-result');
    if (resultDiv) {
      resultDiv.innerHTML = `
        <div class="alert alert-error">
          <strong>Error:</strong> ${message}
        </div>
      `;
      resultDiv.classList.remove('hidden');
    }
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('profit-result');
    if (!resultDiv) return;
    
    const statusClass = getStatusClass(results.netMargin, results.grossMargin);
    const statusMessage = getStatusMessage(results.netMargin, results.grossMargin, results.benchmark);
    
    // Generate time period tabs
    const periodTabs = generatePeriodTabs(results);
    
    resultDiv.innerHTML = `
      <div class="result-header-actions">
        <h3>📊 Profit Analysis Results</h3>
        <div class="result-actions">
          <button class="btn-action" id="print-results">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print
          </button>
        </div>
      </div>
      
      <div class="profit-status ${statusClass}">
        <div class="status-icon">${getStatusIcon(statusClass)}</div>
        <div class="status-content">
          <strong>${statusMessage.title}</strong>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">${statusMessage.description}</p>
        </div>
      </div>
      
      ${periodTabs}
      
      <div id="results-content">
        ${generateResultsContent(results, state.viewPeriod)}
      </div>
    `;
    
    resultDiv.classList.remove('hidden');
    
    // Attach event listeners
    attachResultEventListeners(results);
  }

  function generatePeriodTabs(results) {
    const periods = [
      { id: 'annual', label: 'Annual' },
      { id: 'monthly', label: 'Monthly' }
    ];
    
    return `
      <div class="time-period-tabs">
        <span style="font-weight: 600; color: #6b7280; margin-right: 0.5rem;">View as:</span>
        ${periods.map(period => `
          <button type="button" class="time-period-tab ${state.viewPeriod === period.id ? 'active' : ''}" data-period="${period.id}">
            ${period.label}
          </button>
        `).join('')}
      </div>
    `;
  }

  function generateResultsContent(results, viewPeriod) {
    // Get values based on selected view period
    const periodData = getPeriodData(results, viewPeriod);
    const periodLabel = getPeriodLabel(results, viewPeriod);
    
    return `
      <div class="margin-cards">
        ${generateMarginCards(results, periodData, periodLabel)}
      </div>
      
      ${generateWaterfallChart(results, periodData, periodLabel)}
      
      ${generateMarginComparison(results)}
      
      ${results.mode === 'advanced' ? generateDetailedBreakdown(results, periodData, periodLabel) : ''}
      
      ${generatePeriodSummary(results)}
      
      ${generatePricingScenarios(results, periodData, periodLabel)}
      
      <div class="profit-insights">
        <h4>💡 Key Insights</h4>
        <div class="insights-grid">
          ${generateInsights(results)}
        </div>
      </div>
    `;
  }

  function getPeriodData(results, viewPeriod) {
    if (viewPeriod === 'monthly') {
      return {
        revenue: results.monthlyRevenue,
        cogs: results.monthlyCogs,
        otherIncome: results.monthlyOtherIncome,
        grossProfit: results.monthlyGrossProfit,
        operatingExpenses: results.monthlyOperatingExpenses,
        operatingProfit: results.monthlyOperatingProfit,
        interestExpense: results.monthlyInterestExpense,
        depreciation: results.monthlyDepreciation,
        ebitda: results.monthlyEbitda,
        ebt: results.monthlyEbt,
        taxes: results.monthlyTaxes,
        netProfit: results.monthlyNetProfit
      };
    }
    // Default to annual
    return {
      revenue: results.annualRevenue,
      cogs: results.annualCogs,
      otherIncome: results.annualOtherIncome,
      grossProfit: results.annualGrossProfit,
      operatingExpenses: results.annualOperatingExpenses,
      operatingProfit: results.annualOperatingProfit,
      interestExpense: results.annualInterestExpense,
      depreciation: results.annualDepreciation,
      ebitda: results.annualEbitda,
      ebt: results.annualEbt,
      taxes: results.annualTaxes,
      netProfit: results.annualNetProfit
    };
  }

  function getPeriodLabel(results, viewPeriod) {
    return viewPeriod === 'monthly' ? 'Monthly' : 'Annual';
  }

  function attachResultEventListeners(results) {
    // Print button
    const printBtn = document.getElementById('print-results');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }
    
    // Period tabs
    const periodTabs = document.querySelectorAll('.time-period-tab');
    periodTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        state.viewPeriod = this.dataset.period;
        
        // Update active tab
        periodTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Update results content
        const resultsContent = document.getElementById('results-content');
        if (resultsContent) {
          resultsContent.innerHTML = generateResultsContent(results, state.viewPeriod);
        }
      });
    });
  }

  function generateMarginCards(results, periodData, periodLabel) {
    const cards = [
      {
        icon: '💵',
        label: `${periodLabel} Gross Profit`,
        value: results.grossMargin.toFixed(1) + '%',
        amount: formatCurrency(periodData.grossProfit),
        positive: periodData.grossProfit >= 0,
        highlight: false
      },
      {
        icon: '📊',
        label: 'Markup',
        value: results.markup.toFixed(1) + '%',
        amount: 'On cost basis',
        positive: results.markup >= 0,
        highlight: false
      }
    ];
    
    if (results.mode === 'advanced') {
      cards.push({
        icon: '⚙️',
        label: `${periodLabel} Operating`,
        value: results.operatingMargin.toFixed(1) + '%',
        amount: formatCurrency(periodData.operatingProfit),
        positive: periodData.operatingProfit >= 0,
        highlight: false
      });
      
      cards.push({
        icon: '📈',
        label: `${periodLabel} EBITDA`,
        value: results.ebitdaMargin.toFixed(1) + '%',
        amount: formatCurrency(periodData.ebitda),
        positive: periodData.ebitda >= 0,
        highlight: false
      });
    }
    
    cards.push({
      icon: '🎯',
      label: `${periodLabel} Net Profit`,
      value: results.netMargin.toFixed(1) + '%',
      amount: formatCurrency(periodData.netProfit),
      positive: periodData.netProfit >= 0,
      highlight: true
    });
    
    return cards.map(card => `
      <div class="margin-card ${card.highlight ? 'highlight' : ''}">
        <div class="margin-card-icon">${card.icon}</div>
        <div class="margin-card-value ${card.positive ? 'positive' : 'negative'}">${card.value}</div>
        <div class="margin-card-label">${card.label}</div>
        <div class="margin-card-amount">${card.amount}</div>
      </div>
    `).join('');
  }

  function generateWaterfallChart(results, periodData, periodLabel) {
    const maxValue = periodData.revenue;
    
    const getWidth = (value) => Math.max(Math.abs(value / maxValue) * 100, 5);
    
    let rows = [
      { label: `${periodLabel} Revenue`, value: periodData.revenue, class: 'revenue' },
      { label: 'COGS', value: periodData.cogs, class: 'cogs' },
      { label: 'Gross Profit', value: periodData.grossProfit, class: periodData.grossProfit >= 0 ? 'gross' : 'loss' }
    ];
    
    if (results.mode === 'advanced') {
      rows.push({ label: 'Operating Exp.', value: periodData.operatingExpenses, class: 'opex' });
      rows.push({ label: 'Operating Profit', value: periodData.operatingProfit, class: periodData.operatingProfit >= 0 ? 'operating' : 'loss' });
    }
    
    rows.push({ label: 'Net Profit', value: periodData.netProfit, class: periodData.netProfit >= 0 ? 'net' : 'loss' });
    
    return `
      <div class="waterfall-chart">
        <h4>📉 ${periodLabel} Profit Waterfall</h4>
        <div class="waterfall-bar-container">
          ${rows.map(row => `
            <div class="waterfall-row">
              <div class="waterfall-label">${row.label}</div>
              <div class="waterfall-bar-wrapper">
                <div class="waterfall-bar ${row.class}" style="width: ${getWidth(row.value)}%;">
                  <span class="waterfall-value">${getWidth(row.value) > 10 ? formatCurrency(row.value) : ''}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function generateMarginComparison(results) {
    const margins = [
      { label: 'Gross Margin', value: results.grossMargin, class: 'gross-bar' }
    ];
    
    if (results.mode === 'advanced') {
      margins.push({ label: 'Operating', value: results.operatingMargin, class: 'operating-bar' });
    }
    
    margins.push({ label: 'Net Margin', value: results.netMargin, class: 'net-bar' });
    
    // Add benchmark comparison if available
    let benchmarkHtml = '';
    if (results.benchmark) {
      benchmarkHtml = `
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed #d1d5db;">
          <h5 style="margin: 0 0 1rem 0; color: #6b7280; font-size: 0.875rem;">
            📊 Industry Benchmark Comparison
          </h5>
          <div class="comparison-row">
            <div class="comparison-label">Your Gross</div>
            <div class="comparison-bar-wrapper">
              <div class="comparison-bar ${results.grossMargin >= 0 ? 'gross-bar' : 'negative-bar'}" style="width: ${Math.min(Math.abs(results.grossMargin), 100)}%;">
                <span class="comparison-percent">${results.grossMargin.toFixed(1)}%</span>
              </div>
            </div>
          </div>
          <div class="comparison-row">
            <div class="comparison-label">Benchmark</div>
            <div class="comparison-bar-wrapper">
              <div class="comparison-bar" style="width: ${results.benchmark.gross}%; background: linear-gradient(90deg, #9ca3af 0%, #d1d5db 100%);">
                <span class="comparison-percent">${results.benchmark.gross}%</span>
              </div>
            </div>
          </div>
          <p style="margin: 1rem 0 0 0; font-size: 0.875rem; color: #6b7280;">
            ${results.grossMargin >= results.benchmark.gross 
              ? `✅ Your gross margin exceeds the industry benchmark by ${(results.grossMargin - results.benchmark.gross).toFixed(1)} percentage points.` 
              : `⚠️ Your gross margin is ${(results.benchmark.gross - results.grossMargin).toFixed(1)} percentage points below industry benchmark.`}
          </p>
        </div>
      `;
    }
    
    return `
      <div class="margin-comparison">
        <h4>📊 Margin Comparison</h4>
        <div class="comparison-bars">
          ${margins.map(margin => `
            <div class="comparison-row">
              <div class="comparison-label">${margin.label}</div>
              <div class="comparison-bar-wrapper">
                <div class="comparison-bar profit-margin-bar ${margin.value >= 0 ? margin.class : 'negative-bar'}" style="width: ${Math.min(Math.abs(margin.value), 100)}%;">
                  <span class="comparison-percent">${margin.value.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        ${benchmarkHtml}
      </div>
    `;
  }

  function generateDetailedBreakdown(results, periodData, periodLabel) {
    return `
      <div class="profit-breakdown">
        <h4>📋 ${periodLabel} P&L Breakdown</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>${periodLabel} Amount</th>
                <th>% of Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Revenue</strong></td>
                <td><strong>${formatCurrency(periodData.revenue)}</strong></td>
                <td>100.0%</td>
              </tr>
              <tr class="expense-row">
                <td>Cost of Goods Sold (COGS)</td>
                <td class="text-danger">(${formatCurrency(periodData.cogs)})</td>
                <td>${((periodData.cogs / periodData.revenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr class="subtotal-row">
                <td><strong>Gross Profit</strong></td>
                <td class="${periodData.grossProfit >= 0 ? 'text-success' : 'text-danger'}"><strong>${formatCurrency(periodData.grossProfit)}</strong></td>
                <td><strong>${results.grossMargin.toFixed(1)}%</strong></td>
              </tr>
              <tr class="expense-row">
                <td>Operating Expenses</td>
                <td class="text-danger">(${formatCurrency(periodData.operatingExpenses)})</td>
                <td>${((periodData.operatingExpenses / periodData.revenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr class="expense-row">
                <td>Depreciation & Amortization</td>
                <td class="text-danger">(${formatCurrency(periodData.depreciation)})</td>
                <td>${((periodData.depreciation / periodData.revenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr class="subtotal-row">
                <td><strong>Operating Profit (EBIT)</strong></td>
                <td class="${periodData.operatingProfit >= 0 ? 'text-success' : 'text-danger'}"><strong>${formatCurrency(periodData.operatingProfit)}</strong></td>
                <td><strong>${results.operatingMargin.toFixed(1)}%</strong></td>
              </tr>
              <tr>
                <td>Other Income</td>
                <td class="text-success">${formatCurrency(periodData.otherIncome)}</td>
                <td>${((periodData.otherIncome / periodData.revenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr class="expense-row">
                <td>Interest Expense</td>
                <td class="text-danger">(${formatCurrency(periodData.interestExpense)})</td>
                <td>${((periodData.interestExpense / periodData.revenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr class="subtotal-row">
                <td><strong>Earnings Before Tax (EBT)</strong></td>
                <td class="${periodData.ebt >= 0 ? 'text-success' : 'text-danger'}"><strong>${formatCurrency(periodData.ebt)}</strong></td>
                <td><strong>${((periodData.ebt / periodData.revenue) * 100).toFixed(1)}%</strong></td>
              </tr>
              <tr class="expense-row">
                <td>Taxes (${results.taxRate}%)</td>
                <td class="text-danger">(${formatCurrency(periodData.taxes)})</td>
                <td>${((periodData.taxes / periodData.revenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr class="total-row">
                <td><strong>Net Profit</strong></td>
                <td class="${periodData.netProfit >= 0 ? 'text-success' : 'text-danger'}"><strong>${formatCurrency(periodData.netProfit)}</strong></td>
                <td><strong>${results.netMargin.toFixed(1)}%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        ${results.perUnitData ? `
          <div style="margin-top: 1.5rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
            <h5 style="margin: 0 0 1rem 0;">📦 Per Unit Analysis <span class="frequency-badge">${results.revenueFrequencyLabel}</span></h5>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
              <div>
                <div style="font-size: 0.75rem; color: #6b7280;">Revenue/Unit</div>
                <div style="font-weight: 700;">${formatCurrency(results.perUnitData.revenuePerUnit)}</div>
              </div>
              <div>
                <div style="font-size: 0.75rem; color: #6b7280;">COGS/Unit</div>
                <div style="font-weight: 700;">${formatCurrency(results.perUnitData.cogsPerUnit)}</div>
              </div>
              <div>
                <div style="font-size: 0.75rem; color: #6b7280;">Gross Profit/Unit</div>
                <div style="font-weight: 700; color: #10b981;">${formatCurrency(results.perUnitData.grossProfitPerUnit)}</div>
              </div>
              <div>
                <div style="font-size: 0.75rem; color: #6b7280;">Net Profit/Unit</div>
                <div style="font-weight: 700; color: ${results.perUnitData.netProfitPerUnit >= 0 ? '#10b981' : '#ef4444'};">${formatCurrency(results.perUnitData.netProfitPerUnit)}</div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  function generatePeriodSummary(results) {
    // Show input summary with frequencies, then annual/monthly comparison
    const showExpensesFreq = results.mode === 'advanced' && results.revenueFrequency !== results.expensesFrequency;
    
    return `
      <div class="profit-breakdown" style="background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%);">
        <h4>📅 Input Summary & Projections</h4>
        
        <div style="margin-bottom: 1.5rem; padding: 1rem; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <h5 style="margin: 0 0 0.75rem 0; color: #92400e;">📥 Your Inputs</h5>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div>
              <div style="font-size: 0.75rem; color: #6b7280;">Revenue <span class="frequency-badge">${results.revenueFrequencyLabel}</span></div>
              <div style="font-weight: 700;">${formatCurrency(results.inputRevenue)}</div>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: #6b7280;">COGS <span class="frequency-badge">${results.revenueFrequencyLabel}</span></div>
              <div style="font-weight: 700;">${formatCurrency(results.inputCogs)}</div>
            </div>
            ${results.inputOtherIncome > 0 ? `
              <div>
                <div style="font-size: 0.75rem; color: #6b7280;">Other Income <span class="frequency-badge">${results.revenueFrequencyLabel}</span></div>
                <div style="font-weight: 700;">${formatCurrency(results.inputOtherIncome)}</div>
              </div>
            ` : ''}
            ${results.mode === 'advanced' ? `
              <div>
                <div style="font-size: 0.75rem; color: #6b7280;">Operating Expenses <span class="frequency-badge">${results.expensesFrequencyLabel}</span></div>
                <div style="font-weight: 700;">${formatCurrency(results.inputOperatingExpenses)}</div>
              </div>
              ${results.inputInterestExpense > 0 ? `
                <div>
                  <div style="font-size: 0.75rem; color: #6b7280;">Interest Expense <span class="frequency-badge">${results.expensesFrequencyLabel}</span></div>
                  <div style="font-weight: 700;">${formatCurrency(results.inputInterestExpense)}</div>
                </div>
              ` : ''}
              ${results.inputDepreciation > 0 ? `
                <div>
                  <div style="font-size: 0.75rem; color: #6b7280;">Depreciation <span class="frequency-badge">${results.expensesFrequencyLabel}</span></div>
                  <div style="font-weight: 700;">${formatCurrency(results.inputDepreciation)}</div>
                </div>
              ` : ''}
            ` : ''}
          </div>
          ${showExpensesFreq ? `
            <p style="margin: 0.75rem 0 0 0; font-size: 0.75rem; color: #92400e;">
              ⚠️ Revenue/COGS entered as <strong>${results.revenueFrequencyLabel}</strong>, Operating Expenses entered as <strong>${results.expensesFrequencyLabel}</strong> — all normalized to annual for calculations.
            </p>
          ` : ''}
        </div>
        
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Monthly</th>
                <th>Annual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Revenue</td>
                <td>${formatCurrency(results.monthlyRevenue)}</td>
                <td>${formatCurrency(results.annualRevenue)}</td>
              </tr>
              <tr>
                <td>Gross Profit</td>
                <td class="${results.monthlyGrossProfit >= 0 ? 'text-success' : 'text-danger'}">${formatCurrency(results.monthlyGrossProfit)}</td>
                <td class="${results.annualGrossProfit >= 0 ? 'text-success' : 'text-danger'}">${formatCurrency(results.annualGrossProfit)}</td>
              </tr>
              ${results.mode === 'advanced' ? `
                <tr>
                  <td>Operating Profit</td>
                  <td class="${results.monthlyOperatingProfit >= 0 ? 'text-success' : 'text-danger'}">${formatCurrency(results.monthlyOperatingProfit)}</td>
                  <td class="${results.annualOperatingProfit >= 0 ? 'text-success' : 'text-danger'}">${formatCurrency(results.annualOperatingProfit)}</td>
                </tr>
              ` : ''}
              <tr class="total-row">
                <td><strong>Net Profit</strong></td>
                <td class="${results.monthlyNetProfit >= 0 ? 'text-success' : 'text-danger'}"><strong>${formatCurrency(results.monthlyNetProfit)}</strong></td>
                <td class="${results.annualNetProfit >= 0 ? 'text-success' : 'text-danger'}"><strong>${formatCurrency(results.annualNetProfit)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function generatePricingScenarios(results, periodData, periodLabel) {
    const scenarios = [
      { change: -10, label: '-10% Revenue' },
      { change: -5, label: '-5% Revenue' },
      { change: 0, label: 'Current' },
      { change: 5, label: '+5% Revenue' },
      { change: 10, label: '+10% Revenue' }
    ];
    
    return `
      <div class="pricing-scenarios">
        <h4>🔮 ${periodLabel} Revenue Impact Scenarios</h4>
        <p style="color: #6b7280; margin-bottom: 1rem; font-size: 0.875rem;">
          See how changes in ${periodLabel.toLowerCase()} revenue affect your bottom line (assuming fixed costs)
        </p>
        <div class="breakdown-table-container">
          <table class="scenarios-table">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>${periodLabel} Revenue</th>
                <th>Gross Profit</th>
                <th>Net Profit</th>
                <th>Net Margin</th>
              </tr>
            </thead>
            <tbody>
              ${scenarios.map(scenario => {
                const newRevenue = periodData.revenue * (1 + scenario.change / 100);
                const newGrossProfit = newRevenue - periodData.cogs;
                const newOperatingProfit = newGrossProfit - periodData.operatingExpenses;
                const newEbt = newOperatingProfit + periodData.otherIncome - periodData.interestExpense;
                const newTaxes = newEbt > 0 ? newEbt * (results.taxRate / 100) : 0;
                const newNetProfit = newEbt - newTaxes;
                const newNetMargin = (newNetProfit / newRevenue) * 100;
                const profitChange = newNetProfit - periodData.netProfit;
                
                return `
                  <tr class="${scenario.change === 0 ? 'current-row' : ''}">
                    <td>${scenario.label} ${scenario.change === 0 ? '<span class="badge">Current</span>' : ''}</td>
                    <td>${formatCurrency(newRevenue)}</td>
                    <td>${formatCurrency(newGrossProfit)}</td>
                    <td>
                      ${formatCurrency(newNetProfit)}
                      ${scenario.change !== 0 ? `
                        <span class="${profitChange >= 0 ? 'improvement-positive' : 'improvement-negative'}">
                          (${profitChange >= 0 ? '+' : ''}${formatCurrency(profitChange)})
                        </span>
                      ` : ''}
                    </td>
                    <td>${newNetMargin.toFixed(1)}%</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function generateInsights(results) {
    const insights = [];
    
    // Gross margin insight
    if (results.grossMargin >= 50) {
      insights.push({
        type: 'success',
        icon: '💪',
        title: 'Strong Gross Margin',
        text: `Your ${results.grossMargin.toFixed(1)}% gross margin indicates healthy pricing power and efficient cost management.`
      });
    } else if (results.grossMargin >= 25) {
      insights.push({
        type: 'info',
        icon: '📊',
        title: 'Moderate Gross Margin',
        text: `Your ${results.grossMargin.toFixed(1)}% gross margin is typical for many industries. Consider ways to reduce COGS or increase prices.`
      });
    } else if (results.grossMargin > 0) {
      insights.push({
        type: 'warning',
        icon: '⚠️',
        title: 'Low Gross Margin',
        text: `Your ${results.grossMargin.toFixed(1)}% gross margin leaves little room for operating expenses. Review your pricing strategy.`
      });
    }
    
    // Markup vs Margin
    insights.push({
      type: 'info',
      icon: '🔢',
      title: 'Markup Equivalent',
      text: `Your ${results.grossMargin.toFixed(1)}% margin equals a ${results.markup.toFixed(1)}% markup on cost. Use markup when pricing from cost basis.`
    });
    
    // Frequency info if different frequencies used
    if (results.mode === 'advanced' && results.revenueFrequency !== results.expensesFrequency) {
      insights.push({
        type: 'info',
        icon: '📅',
        title: 'Mixed Frequencies',
        text: `Revenue entered as ${results.revenueFrequencyLabel.toLowerCase()}, expenses as ${results.expensesFrequencyLabel.toLowerCase()}. All figures normalized to annual for accurate calculations.`
      });
    }
    
    // Profitability
    if (results.annualNetProfit < 0) {
      insights.push({
        type: 'danger',
        icon: '🚨',
        title: 'Operating at a Loss',
        text: `You're losing ${formatCurrency(Math.abs(results.annualNetProfit))} annually. Urgently review costs or increase revenue.`
      });
    } else if (results.netMargin >= 15) {
      insights.push({
        type: 'success',
        icon: '🎯',
        title: 'Excellent Profitability',
        text: `Your ${results.netMargin.toFixed(1)}% net margin is exceptional. You have strong leverage for growth or reinvestment.`
      });
    } else if (results.netMargin >= 5) {
      insights.push({
        type: 'info',
        icon: '✅',
        title: 'Healthy Profitability',
        text: `Your ${results.netMargin.toFixed(1)}% net margin is solid. Focus on scaling while maintaining efficiency.`
      });
    }
    
    // Break-even insight
    if (results.mode === 'advanced' && results.breakEvenMargin > 0) {
      insights.push({
        type: 'info',
        icon: '⚖️',
        title: 'Break-Even Buffer',
        text: `You're ${results.breakEvenMargin.toFixed(1)}% above break-even. Annual revenue could drop by ${formatCurrency(results.annualRevenue - results.breakEvenRevenue)} before losing money.`
      });
    }
    
    // Cost structure
    if (results.mode === 'advanced') {
      const totalCosts = results.annualCogs + results.annualOperatingExpenses + results.annualInterestExpense + results.annualDepreciation;
      const cogsPercent = (results.annualCogs / totalCosts) * 100;
      
      if (cogsPercent > 70) {
        insights.push({
          type: 'warning',
          icon: '📦',
          title: 'High Direct Costs',
          text: `COGS represents ${cogsPercent.toFixed(0)}% of total costs. Negotiate better supplier terms or find efficiencies in production.`
        });
      }
    }
    
    // Benchmark comparison
    if (results.benchmark) {
      const grossDiff = results.grossMargin - results.benchmark.gross;
      const netDiff = results.netMargin - results.benchmark.net;
      
      if (grossDiff >= 5 && netDiff >= 2) {
        insights.push({
          type: 'success',
          icon: '🏆',
          title: 'Above Industry Benchmark',
          text: `You're outperforming industry averages by ${grossDiff.toFixed(1)}pp gross and ${netDiff.toFixed(1)}pp net margin.`
        });
      } else if (grossDiff < -5 || netDiff < -2) {
        insights.push({
          type: 'warning',
          icon: '📉',
          title: 'Below Industry Benchmark',
          text: `Your margins are below industry averages. Analyze competitors to identify improvement opportunities.`
        });
      }
    }
    
    return insights.map(insight => `
      <div class="insight-card insight-${insight.type}">
        <div class="insight-icon">${insight.icon}</div>
        <div class="insight-content">
          <h5>${insight.title}</h5>
          <p>${insight.text}</p>
        </div>
      </div>
    `).join('');
  }

  function getStatusClass(netMargin, grossMargin) {
    if (netMargin < 0) return 'status-loss';
    if (netMargin >= 15 && grossMargin >= 40) return 'status-excellent';
    if (netMargin >= 5) return 'status-good';
    if (netMargin >= 0) return 'status-moderate';
    return 'status-poor';
  }

  function getStatusIcon(statusClass) {
    switch (statusClass) {
      case 'status-excellent': return '🌟';
      case 'status-good': return '✅';
      case 'status-moderate': return '📊';
      case 'status-poor': return '⚠️';
      case 'status-loss': return '🚨';
      default: return '📊';
    }
  }

  function getStatusMessage(netMargin, grossMargin, benchmark) {
    if (netMargin < 0) {
      return {
        title: 'Operating at a Loss',
        description: 'Your business is currently unprofitable. Review costs and pricing strategy to achieve positive margins.'
      };
    }
    if (netMargin >= 15 && grossMargin >= 40) {
      return {
        title: 'Excellent Profitability',
        description: 'Your margins are outstanding! You have strong pricing power and efficient cost management.'
      };
    }
    if (netMargin >= 5) {
      return {
        title: 'Healthy Profit Margins',
        description: 'Your business shows solid profitability. Focus on scaling while maintaining these margins.'
      };
    }
    if (netMargin >= 0) {
      return {
        title: 'Marginal Profitability',
        description: 'You\'re profitable but margins are thin. Small changes in costs or revenue can significantly impact profits.'
      };
    }
    return {
      title: 'Review Your Pricing',
      description: 'Your margins need attention. Consider increasing prices or reducing costs.'
    };
  }

  function shareCalculation() {
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'Profit Margin Calculation',
        text: 'Check out my profit margin analysis',
        url: url
      }).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      const shareBtn = document.getElementById('share-calculation');
      if (shareBtn) {
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '✓ Link Copied!';
        shareBtn.classList.add('btn-success');
        setTimeout(() => {
          shareBtn.innerHTML = originalText;
          shareBtn.classList.remove('btn-success');
        }, 2000);
      }
    } catch (err) {
      alert('Failed to copy link. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textarea);
  }

  // Helper functions
  function getValue(id) {
    const element = document.getElementById(id);
    return element ? parseFloat(element.value) || 0 : 0;
  }

  function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.value = value;
    }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

})();