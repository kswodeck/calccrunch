// ROI Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    mode: 'simple',
    roiType: 'investment',
    timePeriodValue: 1,
    timePeriodUnit: 'years',
    riskFreeRate: 4.5,
    inflationRate: 3,
    vacancyRate: 5,
    appreciationRate: 3
  };

  const ROI_TYPE_LABELS = {
    investment: { return: 'Final Value', help: 'Total value at end of period' },
    marketing: { return: 'Revenue Generated', help: 'Total revenue from campaign' },
    project: { return: 'Project Returns', help: 'Total returns from project' },
    realestate: { return: 'Sale Price / Current Value', help: 'Expected sale price or current market value' }
  };

  // State
  let state = {
    mode: 'simple',
    roiType: 'investment',
    comparisons: [],
    comparisonCounter: 0
  };

  // DOM Elements
  let elements = {};

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    cacheElements();
    loadFromURL();
    attachEventListeners();
    updateUI();
  });

  function cacheElements() {
    elements = {
      form: document.getElementById('roi-calculator-form'),
      calculateBtn: document.getElementById('calculate-btn'),
      shareBtn: document.getElementById('share-calculation'),
      resetBtn: document.getElementById('reset-form'),
      resultDiv: document.getElementById('roi-result'),
      investmentName: document.getElementById('investment-name'),
      timePeriodValue: document.getElementById('time-period-value'),
      timePeriodUnit: document.getElementById('time-period-unit'),
      initialInvestment: document.getElementById('initial-investment'),
      additionalCosts: document.getElementById('additional-costs'),
      finalValue: document.getElementById('final-value'),
      recurringIncome: document.getElementById('recurring-income'),
      recurringFrequency: document.getElementById('recurring-frequency'),
      returnLabel: document.getElementById('return-label'),
      returnHelp: document.getElementById('return-help'),
      // Marketing fields
      leadsGenerated: document.getElementById('leads-generated'),
      conversionRate: document.getElementById('conversion-rate'),
      customerLtv: document.getElementById('customer-ltv'),
      costPerLead: document.getElementById('cost-per-lead'),
      // Real Estate fields
      monthlyRent: document.getElementById('monthly-rent'),
      vacancyRate: document.getElementById('vacancy-rate'),
      annualExpenses: document.getElementById('annual-expenses'),
      appreciationRate: document.getElementById('appreciation-rate'),
      // Advanced fields
      riskFreeRate: document.getElementById('risk-free-rate'),
      inflationRate: document.getElementById('inflation-rate'),
      alternativeInvestment: document.getElementById('alternative-investment'),
      targetRoi: document.getElementById('target-roi'),
      // Scenario fields
      worstReturn: document.getElementById('worst-return'),
      worstProbability: document.getElementById('worst-probability'),
      expectedReturn: document.getElementById('expected-return'),
      expectedProbability: document.getElementById('expected-probability'),
      bestReturn: document.getElementById('best-return'),
      bestProbability: document.getElementById('best-probability'),
      // Containers
      comparisonContainer: document.getElementById('comparison-container'),
      addComparisonBtn: document.getElementById('add-comparison-btn')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load basic fields
    const fields = [
      { id: 'investment-name', param: 'name' },
      { id: 'time-period-value', param: 'period' },
      { id: 'time-period-unit', param: 'unit' },
      { id: 'initial-investment', param: 'initial' },
      { id: 'additional-costs', param: 'costs' },
      { id: 'final-value', param: 'final' },
      { id: 'recurring-income', param: 'recurring' },
      { id: 'recurring-frequency', param: 'freq' },
      { id: 'leads-generated', param: 'leads' },
      { id: 'conversion-rate', param: 'cvr' },
      { id: 'customer-ltv', param: 'ltv' },
      { id: 'monthly-rent', param: 'rent' },
      { id: 'vacancy-rate', param: 'vacancy' },
      { id: 'annual-expenses', param: 'expenses' },
      { id: 'appreciation-rate', param: 'appr' },
      { id: 'risk-free-rate', param: 'rfr' },
      { id: 'inflation-rate', param: 'inflation' },
      { id: 'alternative-investment', param: 'alt' },
      { id: 'target-roi', param: 'target' },
      { id: 'worst-return', param: 'worst' },
      { id: 'worst-probability', param: 'worstp' },
      { id: 'expected-return', param: 'expected' },
      { id: 'expected-probability', param: 'expectedp' },
      { id: 'best-return', param: 'best' },
      { id: 'best-probability', param: 'bestp' }
    ];
    
    fields.forEach(field => {
      if (params.has(field.param)) {
        setValue(field.id, params.get(field.param));
      }
    });
    
    // Load mode
    if (params.has('mode')) {
      state.mode = params.get('mode');
      setMode(state.mode);
    }
    
    // Load ROI type
    if (params.has('type')) {
      state.roiType = params.get('type');
      setRoiType(state.roiType);
    }
    
    // Load comparisons
    if (params.has('compare')) {
      try {
        const compareData = JSON.parse(decodeURIComponent(params.get('compare')));
        compareData.forEach(comp => {
          addComparison(comp);
        });
      } catch (e) {
        console.error('Error parsing comparison data:', e);
      }
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    // Save mode and type
    params.set('mode', state.mode);
    params.set('type', state.roiType);
    
    // Save basic fields
    const fieldsToSave = [
      { id: 'investment-name', param: 'name' },
      { id: 'time-period-value', param: 'period' },
      { id: 'time-period-unit', param: 'unit' },
      { id: 'initial-investment', param: 'initial' },
      { id: 'additional-costs', param: 'costs' },
      { id: 'final-value', param: 'final' },
      { id: 'recurring-income', param: 'recurring' },
      { id: 'recurring-frequency', param: 'freq' }
    ];
    
    fieldsToSave.forEach(field => {
      const value = getValue(field.id);
      if (value) params.set(field.param, value);
    });
    
    // Save type-specific fields
    if (state.roiType === 'marketing') {
      saveIfValue(params, 'leads-generated', 'leads');
      saveIfValue(params, 'conversion-rate', 'cvr');
      saveIfValue(params, 'customer-ltv', 'ltv');
    }
    
    if (state.roiType === 'realestate') {
      saveIfValue(params, 'monthly-rent', 'rent');
      saveIfValue(params, 'vacancy-rate', 'vacancy');
      saveIfValue(params, 'annual-expenses', 'expenses');
      saveIfValue(params, 'appreciation-rate', 'appr');
    }
    
    // Save advanced fields
    if (state.mode === 'advanced') {
      saveIfValue(params, 'risk-free-rate', 'rfr');
      saveIfValue(params, 'inflation-rate', 'inflation');
      saveIfValue(params, 'alternative-investment', 'alt');
      saveIfValue(params, 'target-roi', 'target');
      saveIfValue(params, 'worst-return', 'worst');
      saveIfValue(params, 'worst-probability', 'worstp');
      saveIfValue(params, 'expected-return', 'expected');
      saveIfValue(params, 'expected-probability', 'expectedp');
      saveIfValue(params, 'best-return', 'best');
      saveIfValue(params, 'best-probability', 'bestp');
    }
    
    // Save comparisons
    const compareData = state.comparisons.map(comp => {
      const row = document.querySelector(`[data-comparison-id="${comp.id}"]`);
      if (!row) return null;
      return {
        name: row.querySelector('.comparison-name')?.value || '',
        initial: row.querySelector('.comparison-initial')?.value || '',
        final: row.querySelector('.comparison-final')?.value || '',
        period: row.querySelector('.comparison-period')?.value || ''
      };
    }).filter(c => c && (c.name || c.initial || c.final));
    
    if (compareData.length > 0) {
      params.set('compare', encodeURIComponent(JSON.stringify(compareData)));
    }
    
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function saveIfValue(params, elementId, paramName) {
    const value = getValue(elementId);
    if (value) params.set(paramName, value);
  }

  function attachEventListeners() {
    // Calculate button
    if (elements.calculateBtn) {
      elements.calculateBtn.addEventListener('click', () => {
        calculateResults();
        document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    
    // Mode toggle
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        setMode(this.dataset.mode);
        saveToURL();
      });
    });
    
    // ROI type toggle
    const roiTypeBtns = document.querySelectorAll('.roi-type-btn');
    roiTypeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        setRoiType(this.dataset.type);
        saveToURL();
      });
    });
    
    // Add comparison button
    if (elements.addComparisonBtn) {
      elements.addComparisonBtn.addEventListener('click', () => addComparison());
    }
    
    // Reset button
    if (elements.resetBtn) {
      elements.resetBtn.addEventListener('click', resetForm);
    }
    
    // Share button
    if (elements.shareBtn) {
      elements.shareBtn.addEventListener('click', shareCalculation);
    }
    
    // Auto-save on input change
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        updateCalculatedFields();
        saveToURL();
      });
      
      if (input.type === 'number' || input.type === 'text') {
        input.addEventListener('input', debounce(() => {
          updateCalculatedFields();
          saveToURL();
        }, 500));
      }
      
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateResults();
        }
      });
    });
  }

  function setMode(mode) {
    state.mode = mode;
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    document.querySelectorAll('.advanced-section').forEach(section => {
      section.classList.toggle('hidden', mode !== 'advanced');
    });
  }

  function setRoiType(type) {
    state.roiType = type;
    
    document.querySelectorAll('.roi-type-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });
    
    // Update labels
    const labels = ROI_TYPE_LABELS[type];
    if (elements.returnLabel) {
      elements.returnLabel.textContent = labels.return;
    }
    if (elements.returnHelp) {
      elements.returnHelp.textContent = labels.help;
    }
    
    // Show/hide type-specific sections
    document.querySelector('.marketing-section')?.classList.toggle('hidden', type !== 'marketing');
    document.querySelector('.realestate-section')?.classList.toggle('hidden', type !== 'realestate');
  }

  function updateUI() {
    setMode(state.mode);
    setRoiType(state.roiType);
    updateCalculatedFields();
  }

  function updateCalculatedFields() {
    // Calculate cost per lead for marketing
    if (state.roiType === 'marketing') {
      const initialInvestment = parseFloat(getValue('initial-investment')) || 0;
      const additionalCosts = parseFloat(getValue('additional-costs')) || 0;
      const leads = parseFloat(getValue('leads-generated')) || 0;
      
      if (leads > 0) {
        const cpl = (initialInvestment + additionalCosts) / leads;
        if (elements.costPerLead) {
          elements.costPerLead.value = cpl.toFixed(2);
        }
      }
    }
  }

  function addComparison(data = null) {
    state.comparisonCounter++;
    const compId = `comparison-${state.comparisonCounter}`;
    
    const comparison = {
      id: compId,
      name: data?.name || '',
      initial: data?.initial || '',
      final: data?.final || '',
      period: data?.period || '1'
    };
    
    state.comparisons.push(comparison);
    
    const compRow = document.createElement('div');
    compRow.className = 'comparison-row';
    compRow.dataset.comparisonId = compId;
    
    compRow.innerHTML = `
      <div class="comparison-header">
        <span class="comparison-number">Investment #${state.comparisons.length + 1}</span>
        <button type="button" class="remove-comparison-btn" data-comparison-id="${compId}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${compId}-name">Name</label>
          <input type="text" id="${compId}-name" class="form-input comparison-name" placeholder="Investment name" value="${comparison.name}" />
        </div>
        <div class="form-group">
          <label for="${compId}-initial">Initial Cost</label>
          <div class="input-group">
            <input type="number" id="${compId}-initial" class="form-input comparison-initial" placeholder="10000" value="${comparison.initial}" min="0" step="100" />
            <span class="input-addon">$</span>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${compId}-final">Final Value</label>
          <div class="input-group">
            <input type="number" id="${compId}-final" class="form-input comparison-final" placeholder="15000" value="${comparison.final}" min="0" step="100" />
            <span class="input-addon">$</span>
          </div>
        </div>
        <div class="form-group">
          <label for="${compId}-period">Time (Years)</label>
          <input type="number" id="${compId}-period" class="form-input comparison-period" placeholder="1" value="${comparison.period}" min="0.1" step="0.5" />
        </div>
      </div>
    `;
    
    elements.comparisonContainer.appendChild(compRow);
    
    // Add event listeners
    const inputs = compRow.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('input', debounce(() => saveToURL(), 500));
    });
    
    const removeBtn = compRow.querySelector('.remove-comparison-btn');
    removeBtn.addEventListener('click', () => removeComparison(compId));
    
    updateComparisonNumbers();
  }

  function removeComparison(compId) {
    const compRow = document.querySelector(`[data-comparison-id="${compId}"]`);
    if (compRow) {
      compRow.remove();
    }
    
    state.comparisons = state.comparisons.filter(c => c.id !== compId);
    updateComparisonNumbers();
    saveToURL();
  }

  function updateComparisonNumbers() {
    const compRows = elements.comparisonContainer.querySelectorAll('.comparison-row');
    compRows.forEach((row, index) => {
      const numberSpan = row.querySelector('.comparison-number');
      if (numberSpan) {
        numberSpan.textContent = `Investment #${index + 2}`;
      }
    });
  }

  function resetForm() {
    if (!confirm('Reset all inputs and start over?')) return;
    
    // Reset state
    state.mode = 'simple';
    state.roiType = 'investment';
    state.comparisons = [];
    state.comparisonCounter = 0;
    
    // Clear form fields
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
      if (input.type === 'number') {
        input.value = '';
      } else if (input.type === 'text') {
        input.value = '';
      }
    });
    
    // Reset selects to defaults
    setValue('time-period-value', '1');
    setValue('time-period-unit', 'years');
    setValue('recurring-frequency', 'annually');
    setValue('risk-free-rate', '4.5');
    setValue('inflation-rate', '3');
    setValue('vacancy-rate', '5');
    setValue('appreciation-rate', '3');
    
    // Clear comparison container
    elements.comparisonContainer.innerHTML = '';
    
    // Reset UI
    setMode('simple');
    setRoiType('investment');
    
    // Hide results
    elements.resultDiv.classList.add('hidden');
    
    // Clear URL
    window.history.replaceState({}, '', window.location.pathname);
  }

  function calculateResults() {
    // Get basic inputs
    const investmentName = getValue('investment-name') || 'Primary Investment';
    const timePeriodValue = parseFloat(getValue('time-period-value')) || 1;
    const timePeriodUnit = getValue('time-period-unit') || 'years';
    const initialInvestment = parseFloat(getValue('initial-investment')) || 0;
    const additionalCosts = parseFloat(getValue('additional-costs')) || 0;
    let finalValue = parseFloat(getValue('final-value')) || 0;
    const recurringIncome = parseFloat(getValue('recurring-income')) || 0;
    const recurringFrequency = getValue('recurring-frequency') || 'annually';
    
    // Validate
    if (initialInvestment <= 0) {
      alert('Please enter an initial investment amount.');
      return;
    }
    
    if (finalValue <= 0 && recurringIncome <= 0) {
      alert('Please enter a final value or recurring income.');
      return;
    }
    
    saveToURL();
    
    // Convert time to years
    let timeInYears = timePeriodValue;
    if (timePeriodUnit === 'months') {
      timeInYears = timePeriodValue / 12;
    }
    
    // Calculate recurring income total
    let recurringTotal = 0;
    if (recurringIncome > 0) {
      switch (recurringFrequency) {
        case 'monthly':
          recurringTotal = recurringIncome * 12 * timeInYears;
          break;
        case 'quarterly':
          recurringTotal = recurringIncome * 4 * timeInYears;
          break;
        case 'annually':
        default:
          recurringTotal = recurringIncome * timeInYears;
          break;
      }
    }
    
    // Handle real estate specific calculations
    if (state.roiType === 'realestate') {
      const monthlyRent = parseFloat(getValue('monthly-rent')) || 0;
      const vacancyRate = parseFloat(getValue('vacancy-rate')) || 5;
      const annualExpenses = parseFloat(getValue('annual-expenses')) || 0;
      const appreciationRate = parseFloat(getValue('appreciation-rate')) || 3;
      
      // Calculate rental income (adjusted for vacancy)
      const annualRent = monthlyRent * 12 * (1 - vacancyRate / 100);
      const netOperatingIncome = annualRent - annualExpenses;
      recurringTotal = netOperatingIncome * timeInYears;
      
      // Calculate appreciated value if final value not specified
      if (finalValue === 0) {
        finalValue = initialInvestment * Math.pow(1 + appreciationRate / 100, timeInYears);
      }
    }
    
    // Handle marketing specific calculations
    let marketingMetrics = null;
    if (state.roiType === 'marketing') {
      const leads = parseFloat(getValue('leads-generated')) || 0;
      const cvr = parseFloat(getValue('conversion-rate')) || 0;
      const ltv = parseFloat(getValue('customer-ltv')) || 0;
      
      if (leads > 0 && cvr > 0 && ltv > 0) {
        const customers = leads * (cvr / 100);
        const revenue = customers * ltv;
        
        // Override final value with calculated revenue if not specified
        if (finalValue === 0) {
          finalValue = revenue;
        }
        
        marketingMetrics = {
          leads,
          conversionRate: cvr,
          customers,
          ltv,
          calculatedRevenue: revenue,
          costPerLead: (initialInvestment + additionalCosts) / leads,
          costPerCustomer: (initialInvestment + additionalCosts) / customers
        };
      }
    }
    
    // Calculate total costs and returns
    const totalCost = initialInvestment + additionalCosts;
    const totalReturn = finalValue + recurringTotal;
    const netGain = totalReturn - totalCost;
    
    // Calculate basic ROI
    const roi = totalCost > 0 ? (netGain / totalCost) * 100 : 0;
    
    // Calculate annualized ROI (CAGR for appreciation-based returns)
    let annualizedRoi = 0;
    if (timeInYears > 0 && totalCost > 0) {
      // Use CAGR formula: (Final/Initial)^(1/years) - 1
      annualizedRoi = (Math.pow(totalReturn / totalCost, 1 / timeInYears) - 1) * 100;
    }
    
    // Calculate payback period
    let paybackPeriod = 0;
    const annualReturn = recurringTotal / timeInYears || (totalReturn - totalCost) / timeInYears;
    if (annualReturn > 0) {
      paybackPeriod = totalCost / annualReturn;
    }
    
    // Advanced metrics
    let advancedMetrics = null;
    if (state.mode === 'advanced') {
      const riskFreeRate = parseFloat(getValue('risk-free-rate')) || 4.5;
      const inflationRate = parseFloat(getValue('inflation-rate')) || 3;
      const alternativeReturn = parseFloat(getValue('alternative-investment')) || 0;
      const targetRoi = parseFloat(getValue('target-roi')) || 0;
      
      // Real return (inflation adjusted)
      const realReturn = ((1 + annualizedRoi / 100) / (1 + inflationRate / 100) - 1) * 100;
      
      // Excess return over risk-free
      const excessReturn = annualizedRoi - riskFreeRate;
      
      // Opportunity cost vs alternative
      let opportunityCost = 0;
      if (alternativeReturn > 0) {
        const alternativeEndValue = totalCost * Math.pow(1 + alternativeReturn / 100, timeInYears);
        opportunityCost = totalReturn - alternativeEndValue;
      }
      
      // Target achievement
      const targetAchieved = targetRoi > 0 ? roi >= targetRoi : true;
      const targetGap = targetRoi > 0 ? roi - targetRoi : 0;
      
      advancedMetrics = {
        riskFreeRate,
        inflationRate,
        realReturn,
        excessReturn,
        alternativeReturn,
        opportunityCost,
        targetRoi,
        targetAchieved,
        targetGap
      };
    }
    
    // Scenario analysis
    let scenarioResults = null;
    if (state.mode === 'advanced') {
      const worstReturn = parseFloat(getValue('worst-return')) || 0;
      const worstProb = parseFloat(getValue('worst-probability')) || 0;
      const expectedReturn = parseFloat(getValue('expected-return')) || 0;
      const expectedProb = parseFloat(getValue('expected-probability')) || 0;
      const bestReturn = parseFloat(getValue('best-return')) || 0;
      const bestProb = parseFloat(getValue('best-probability')) || 0;
      
      if (worstReturn || expectedReturn || bestReturn) {
        const worstRoi = totalCost > 0 ? ((worstReturn + recurringTotal - totalCost) / totalCost) * 100 : 0;
        const expectedRoi = totalCost > 0 ? ((expectedReturn + recurringTotal - totalCost) / totalCost) * 100 : 0;
        const bestRoi = totalCost > 0 ? ((bestReturn + recurringTotal - totalCost) / totalCost) * 100 : 0;
        
        // Expected value calculation
        const totalProb = worstProb + expectedProb + bestProb;
        let expectedValue = 0;
        if (totalProb > 0) {
          expectedValue = (worstReturn * (worstProb / 100)) + 
                          (expectedReturn * (expectedProb / 100)) + 
                          (bestReturn * (bestProb / 100));
        }
        
        scenarioResults = {
          worst: { value: worstReturn, roi: worstRoi, probability: worstProb },
          expected: { value: expectedReturn, roi: expectedRoi, probability: expectedProb },
          best: { value: bestReturn, roi: bestRoi, probability: bestProb },
          expectedValue,
          probabilitiesValid: Math.abs(totalProb - 100) < 0.1
        };
      }
    }
    
    // Comparison calculations
    let comparisons = [];
    state.comparisons.forEach(comp => {
      const row = document.querySelector(`[data-comparison-id="${comp.id}"]`);
      if (!row) return;
      
      const name = row.querySelector('.comparison-name')?.value || 'Unnamed';
      const initial = parseFloat(row.querySelector('.comparison-initial')?.value) || 0;
      const final = parseFloat(row.querySelector('.comparison-final')?.value) || 0;
      const period = parseFloat(row.querySelector('.comparison-period')?.value) || 1;
      
      if (initial > 0 && final > 0) {
        const compRoi = ((final - initial) / initial) * 100;
        const compAnnualized = (Math.pow(final / initial, 1 / period) - 1) * 100;
        
        comparisons.push({
          name,
          initial,
          final,
          period,
          netGain: final - initial,
          roi: compRoi,
          annualizedRoi: compAnnualized
        });
      }
    });
    
    // Build results object
    const results = {
      name: investmentName,
      roiType: state.roiType,
      timeInYears,
      timePeriodValue,
      timePeriodUnit,
      
      // Costs
      initialInvestment,
      additionalCosts,
      totalCost,
      
      // Returns
      finalValue,
      recurringIncome,
      recurringTotal,
      totalReturn,
      netGain,
      
      // ROI metrics
      roi,
      annualizedRoi,
      paybackPeriod,
      
      // Type-specific
      marketingMetrics,
      
      // Advanced
      advancedMetrics,
      scenarioResults,
      
      // Comparisons
      comparisons,
      
      // Mode
      mode: state.mode
    };
    
    displayResults(results);
  }

  function displayResults(results) {
    const resultDiv = elements.resultDiv;
    if (!resultDiv) return;
    
    const isPositive = results.roi > 0;
    
    resultDiv.innerHTML = `
      <div class="result-header-actions">
        <h3>📊 ROI Analysis: ${results.name}</h3>
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
      
      ${generateSummaryCards(results)}
      
      ${generateRoiGauge(results)}
      
      ${generateTimelineChart(results)}
      
      ${results.marketingMetrics ? generateMarketingMetrics(results.marketingMetrics) : ''}
      
      ${results.advancedMetrics ? generateAdvancedMetrics(results) : ''}
      
      ${results.scenarioResults ? generateScenarioResults(results.scenarioResults, results.totalCost) : ''}
      
      ${results.comparisons.length > 0 ? generateComparisonTable(results) : ''}
      
      <div class="roi-insights">
        <h4>💡 Investment Insights</h4>
        <div class="insights-grid">
          ${generateInsights(results)}
        </div>
      </div>
    `;
    
    resultDiv.classList.remove('hidden');
    
    // Attach print listener
    const printBtn = document.getElementById('print-results');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }
  }

  function generateSummaryCards(results) {
    const isPositive = results.roi > 0;
    
    const cards = [
      {
        icon: '💰',
        value: formatCurrency(results.totalCost),
        label: 'Total Investment',
        highlight: false,
        positive: null
      },
      {
        icon: '📈',
        value: formatCurrency(results.totalReturn),
        label: 'Total Return',
        highlight: false,
        positive: results.totalReturn > results.totalCost
      },
      {
        icon: isPositive ? '✅' : '❌',
        value: formatCurrency(results.netGain),
        label: 'Net Gain/Loss',
        highlight: false,
        positive: isPositive
      },
      {
        icon: '📊',
        value: results.roi.toFixed(1) + '%',
        label: 'Total ROI',
        highlight: true,
        positive: isPositive
      },
      {
        icon: '📅',
        value: results.annualizedRoi.toFixed(1) + '%',
        label: 'Annualized ROI',
        highlight: false,
        positive: results.annualizedRoi > 0
      }
    ];
    
    if (results.paybackPeriod > 0 && results.paybackPeriod < 100) {
      cards.push({
        icon: '⏱️',
        value: results.paybackPeriod.toFixed(1) + ' yrs',
        label: 'Payback Period',
        highlight: false,
        positive: results.paybackPeriod <= results.timeInYears
      });
    }
    
    return `
      <div class="roi-summary-cards">
        ${cards.map(card => `
          <div class="roi-card ${card.highlight ? 'highlight' : ''} ${card.positive === true ? 'positive' : ''} ${card.positive === false ? 'negative' : ''}">
            <div class="roi-card-icon">${card.icon}</div>
            <div class="roi-card-value ${card.positive === true ? 'positive' : ''} ${card.positive === false ? 'negative' : ''}">${card.value}</div>
            <div class="roi-card-label">${card.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function generateRoiGauge(results) {
    // Map ROI to angle (-90 to 90 degrees, where -90 is bad, 90 is excellent)
    // Clamp ROI between -50% and 100% for display purposes
    const clampedRoi = Math.max(-50, Math.min(100, results.roi));
    const angle = ((clampedRoi + 50) / 150) * 180 - 90;
    
    let roiClass = '';
    let roiLabel = '';
    if (results.roi < 0) {
      roiClass = 'negative';
      roiLabel = 'Loss';
    } else if (results.roi < 10) {
      roiClass = 'low';
      roiLabel = 'Low Return';
    } else if (results.roi < 25) {
      roiClass = 'moderate';
      roiLabel = 'Moderate Return';
    } else if (results.roi < 50) {
      roiClass = 'good';
      roiLabel = 'Good Return';
    } else {
      roiClass = 'excellent';
      roiLabel = 'Excellent Return';
    }
    
    return `
      <div class="roi-gauge-container">
        <h4>ROI Performance</h4>
        <div class="roi-gauge">
          <div class="roi-gauge-bg"></div>
          <div class="roi-gauge-center"></div>
          <div class="roi-gauge-needle" style="transform: translateX(-50%) rotate(${angle}deg);"></div>
          <div class="roi-gauge-value">${results.roi.toFixed(1)}%</div>
        </div>
        <div style="margin-top: 1rem; font-weight: 600; color: var(--color-primary-blue);">${roiLabel}</div>
        <div style="font-size: 0.85rem; color: var(--color-gray-dark); margin-top: 0.5rem;">
          ${results.timeInYears.toFixed(1)} year${results.timeInYears !== 1 ? 's' : ''} investment period
        </div>
      </div>
    `;
  }

  function generateTimelineChart(results) {
    const maxValue = Math.max(results.totalCost, results.totalReturn);
    const costHeight = (results.totalCost / maxValue) * 150;
    const returnHeight = (results.totalReturn / maxValue) * 150;
    
    return `
      <div class="timeline-chart">
        <h4>💵 Investment vs Return</h4>
        <div class="timeline-bars">
          <div class="timeline-bar-group">
            <div class="timeline-bar investment" style="height: ${costHeight}px;">
              ${formatCompact(results.totalCost)}
            </div>
            <div class="timeline-label">Investment</div>
          </div>
          <div class="timeline-bar-group">
            <div class="timeline-bar return" style="height: ${returnHeight}px;">
              ${formatCompact(results.totalReturn)}
            </div>
            <div class="timeline-label">Return</div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
          <div style="text-align: center;">
            <div style="font-size: 0.8rem; color: var(--color-gray-dark);">Initial</div>
            <div style="font-weight: 700;">${formatCurrency(results.initialInvestment)}</div>
          </div>
          ${results.additionalCosts > 0 ? `
          <div style="text-align: center;">
            <div style="font-size: 0.8rem; color: var(--color-gray-dark);">+ Additional</div>
            <div style="font-weight: 700;">${formatCurrency(results.additionalCosts)}</div>
          </div>
          ` : ''}
          <div style="text-align: center;">
            <div style="font-size: 0.8rem; color: var(--color-gray-dark);">Final Value</div>
            <div style="font-weight: 700;">${formatCurrency(results.finalValue)}</div>
          </div>
          ${results.recurringTotal > 0 ? `
          <div style="text-align: center;">
            <div style="font-size: 0.8rem; color: var(--color-gray-dark);">+ Recurring</div>
            <div style="font-weight: 700;">${formatCurrency(results.recurringTotal)}</div>
          </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function generateMarketingMetrics(metrics) {
    return `
      <div class="timeline-chart">
        <h4>📣 Marketing Campaign Metrics</h4>
        <div class="roi-summary-cards" style="margin-top: 1rem;">
          <div class="roi-card">
            <div class="roi-card-icon">👥</div>
            <div class="roi-card-value">${metrics.leads.toLocaleString()}</div>
            <div class="roi-card-label">Leads Generated</div>
          </div>
          <div class="roi-card">
            <div class="roi-card-icon">🎯</div>
            <div class="roi-card-value">${metrics.customers.toFixed(0)}</div>
            <div class="roi-card-label">New Customers</div>
          </div>
          <div class="roi-card">
            <div class="roi-card-icon">💵</div>
            <div class="roi-card-value">${formatCurrency(metrics.costPerLead)}</div>
            <div class="roi-card-label">Cost Per Lead</div>
          </div>
          <div class="roi-card">
            <div class="roi-card-icon">🛒</div>
            <div class="roi-card-value">${formatCurrency(metrics.costPerCustomer)}</div>
            <div class="roi-card-label">Cost Per Customer</div>
          </div>
        </div>
      </div>
    `;
  }

  function generateAdvancedMetrics(results) {
    const adv = results.advancedMetrics;
    
    return `
      <div class="timeline-chart">
        <h4>📈 Advanced Metrics</h4>
        <div class="roi-summary-cards" style="margin-top: 1rem;">
          <div class="roi-card ${adv.realReturn > 0 ? 'positive' : 'negative'}">
            <div class="roi-card-icon">💹</div>
            <div class="roi-card-value ${adv.realReturn > 0 ? 'positive' : 'negative'}">${adv.realReturn.toFixed(1)}%</div>
            <div class="roi-card-label">Real Return (Inflation Adj.)</div>
          </div>
          <div class="roi-card ${adv.excessReturn > 0 ? 'positive' : 'negative'}">
            <div class="roi-card-icon">📊</div>
            <div class="roi-card-value ${adv.excessReturn > 0 ? 'positive' : 'negative'}">${adv.excessReturn.toFixed(1)}%</div>
            <div class="roi-card-label">Excess vs Risk-Free</div>
          </div>
          ${adv.alternativeReturn > 0 ? `
          <div class="roi-card ${adv.opportunityCost >= 0 ? 'positive' : 'negative'}">
            <div class="roi-card-icon">${adv.opportunityCost >= 0 ? '✅' : '⚠️'}</div>
            <div class="roi-card-value ${adv.opportunityCost >= 0 ? 'positive' : 'negative'}">${formatCurrency(adv.opportunityCost)}</div>
            <div class="roi-card-label">vs Alternative (${adv.alternativeReturn}%)</div>
          </div>
          ` : ''}
          ${adv.targetRoi > 0 ? `
          <div class="roi-card ${adv.targetAchieved ? 'positive' : 'negative'}">
            <div class="roi-card-icon">${adv.targetAchieved ? '🎯' : '❌'}</div>
            <div class="roi-card-value ${adv.targetAchieved ? 'positive' : 'negative'}">${adv.targetGap > 0 ? '+' : ''}${adv.targetGap.toFixed(1)}%</div>
            <div class="roi-card-label">${adv.targetAchieved ? 'Above' : 'Below'} Target (${adv.targetRoi}%)</div>
          </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function generateScenarioResults(scenarios, totalCost) {
    if (!scenarios.worst.value && !scenarios.expected.value && !scenarios.best.value) {
      return '';
    }
    
    return `
      <div class="timeline-chart">
        <h4>🎲 Scenario Analysis</h4>
        ${!scenarios.probabilitiesValid ? '<p style="color: #f59e0b; font-size: 0.85rem; margin-bottom: 1rem;">⚠️ Probabilities don\'t sum to 100%</p>' : ''}
        <div class="scenario-results">
          ${scenarios.worst.value ? `
          <div class="scenario-result-card worst">
            <div class="scenario-label">🔻 Worst Case (${scenarios.worst.probability}%)</div>
            <div class="scenario-roi" style="color: #ef4444;">${scenarios.worst.roi.toFixed(1)}%</div>
            <div class="scenario-value">${formatCurrency(scenarios.worst.value)}</div>
          </div>
          ` : ''}
          ${scenarios.expected.value ? `
          <div class="scenario-result-card expected">
            <div class="scenario-label">📊 Expected (${scenarios.expected.probability}%)</div>
            <div class="scenario-roi" style="color: #3b82f6;">${scenarios.expected.roi.toFixed(1)}%</div>
            <div class="scenario-value">${formatCurrency(scenarios.expected.value)}</div>
          </div>
          ` : ''}
          ${scenarios.best.value ? `
          <div class="scenario-result-card best">
            <div class="scenario-label">🔺 Best Case (${scenarios.best.probability}%)</div>
            <div class="scenario-roi" style="color: #10b981;">${scenarios.best.roi.toFixed(1)}%</div>
            <div class="scenario-value">${formatCurrency(scenarios.best.value)}</div>
          </div>
          ` : ''}
        </div>
        ${scenarios.expectedValue > 0 ? `
        <div style="text-align: center; margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
          <div style="font-size: 0.9rem; color: var(--color-gray-dark);">Probability-Weighted Expected Value</div>
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary-blue);">${formatCurrency(scenarios.expectedValue)}</div>
        </div>
        ` : ''}
      </div>
    `;
  }

  function generateComparisonTable(results) {
    // Add primary investment to comparison
    const allInvestments = [
      {
        name: results.name + ' (Primary)',
        initial: results.totalCost,
        final: results.totalReturn,
        period: results.timeInYears,
        netGain: results.netGain,
        roi: results.roi,
        annualizedRoi: results.annualizedRoi
      },
      ...results.comparisons
    ];
    
    // Find best values
    const bestRoi = Math.max(...allInvestments.map(i => i.roi));
    const bestAnnualized = Math.max(...allInvestments.map(i => i.annualizedRoi));
    
    return `
      <div class="comparison-table-container">
        <h4>📊 Investment Comparison</h4>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Investment</th>
              <th>Initial Cost</th>
              <th>Final Value</th>
              <th>Period (Yrs)</th>
              <th>Net Gain</th>
              <th>ROI</th>
              <th>Annualized</th>
            </tr>
          </thead>
          <tbody>
            ${allInvestments.map(inv => `
              <tr>
                <td>${inv.name}</td>
                <td>${formatCurrency(inv.initial)}</td>
                <td>${formatCurrency(inv.final)}</td>
                <td>${inv.period.toFixed(1)}</td>
                <td class="${inv.netGain >= 0 ? '' : 'negative'}">${formatCurrency(inv.netGain)}</td>
                <td class="${inv.roi === bestRoi ? 'best-value' : ''}">${inv.roi.toFixed(1)}%</td>
                <td class="${inv.annualizedRoi === bestAnnualized ? 'best-value' : ''}">${inv.annualizedRoi.toFixed(1)}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function generateInsights(results) {
    const insights = [];
    
    // ROI assessment
    if (results.roi >= 25) {
      insights.push({
        type: 'success',
        icon: '🎉',
        title: 'Excellent Return',
        text: `Your ${results.roi.toFixed(1)}% ROI significantly outperforms typical market returns. This is an exceptional investment.`
      });
    } else if (results.roi >= 10) {
      insights.push({
        type: 'success',
        icon: '✅',
        title: 'Solid Return',
        text: `Your ${results.roi.toFixed(1)}% ROI is competitive with historical stock market averages.`
      });
    } else if (results.roi >= 0) {
      insights.push({
        type: 'warning',
        icon: '📊',
        title: 'Modest Return',
        text: `Your ${results.roi.toFixed(1)}% ROI is positive but may not keep pace with inflation long-term.`
      });
    } else {
      insights.push({
        type: 'danger',
        icon: '⚠️',
        title: 'Negative Return',
        text: `Your investment has lost ${Math.abs(results.roi).toFixed(1)}% of its value. Consider your exit strategy.`
      });
    }
    
    // Annualized vs total
    if (results.timeInYears > 1) {
      insights.push({
        type: 'info',
        icon: '📅',
        title: 'Annualized Perspective',
        text: `Over ${results.timeInYears.toFixed(1)} years, your ${results.roi.toFixed(1)}% total return equals ${results.annualizedRoi.toFixed(1)}% annually (CAGR).`
      });
    }
    
    // Payback period
    if (results.paybackPeriod > 0 && results.paybackPeriod < 100) {
      if (results.paybackPeriod <= results.timeInYears) {
        insights.push({
          type: 'success',
          icon: '⏱️',
          title: 'Quick Payback',
          text: `You'll recover your investment in ${results.paybackPeriod.toFixed(1)} years - within your investment period.`
        });
      } else {
        insights.push({
          type: 'warning',
          icon: '⏱️',
          title: 'Extended Payback',
          text: `Payback period of ${results.paybackPeriod.toFixed(1)} years exceeds your ${results.timeInYears.toFixed(1)} year timeline.`
        });
      }
    }
    
    // Advanced insights
    if (results.advancedMetrics) {
      const adv = results.advancedMetrics;
      
      if (adv.realReturn < 0 && results.roi > 0) {
        insights.push({
          type: 'warning',
          icon: '📉',
          title: 'Inflation Impact',
          text: `After ${adv.inflationRate}% inflation, your real return is ${adv.realReturn.toFixed(1)}%. Your purchasing power may be declining.`
        });
      }
      
      if (adv.excessReturn < 0) {
        insights.push({
          type: 'info',
          icon: '🏦',
          title: 'Risk-Free Alternative',
          text: `A risk-free investment at ${adv.riskFreeRate}% would outperform this investment by ${Math.abs(adv.excessReturn).toFixed(1)}% annually.`
        });
      }
      
      if (adv.opportunityCost < 0) {
        insights.push({
          type: 'warning',
          icon: '💸',
          title: 'Opportunity Cost',
          text: `Investing in your ${adv.alternativeReturn}% alternative would have earned ${formatCurrency(Math.abs(adv.opportunityCost))} more.`
        });
      }
    }
    
    // Comparison insights
    if (results.comparisons.length > 0) {
      const allRois = [results.roi, ...results.comparisons.map(c => c.roi)];
      const bestRoi = Math.max(...allRois);
      const isPrimaryBest = results.roi === bestRoi;
      
      if (isPrimaryBest) {
        insights.push({
          type: 'success',
          icon: '🏆',
          title: 'Best Performer',
          text: `Your primary investment has the highest ROI among all compared options.`
        });
      } else {
        const bestInv = results.comparisons.find(c => c.roi === bestRoi);
        insights.push({
          type: 'info',
          icon: '📊',
          title: 'Better Alternative',
          text: `"${bestInv.name}" outperforms your primary investment with ${bestRoi.toFixed(1)}% ROI.`
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

  function shareCalculation() {
    const url = window.location.href;
    
    const shareData = {
      title: 'ROI Calculator',
      text: 'Check out my ROI analysis',
      url: url
    };
    
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showCopyConfirmation();
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      showCopyConfirmation();
    } catch (err) {
      alert('Failed to copy link. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textarea);
  }

  function showCopyConfirmation() {
    const shareBtn = elements.shareBtn;
    if (shareBtn) {
      const originalHTML = shareBtn.innerHTML;
      shareBtn.innerHTML = '✓ Link Copied!';
      shareBtn.style.background = '#10b981';
      shareBtn.style.borderColor = '#10b981';
      shareBtn.style.color = 'white';
      
      setTimeout(() => {
        shareBtn.innerHTML = originalHTML;
        shareBtn.style.background = '';
        shareBtn.style.borderColor = '';
        shareBtn.style.color = '';
      }, 2000);
    }
  }

  // Helper functions
  function getValue(id) {
    const element = document.getElementById(id);
    if (!element) return '';
    return element.value;
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

  function formatCompact(value) {
    if (value >= 1000000) {
      return '$' + (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
      return '$' + (value / 1000).toFixed(0) + 'K';
    }
    return formatCurrency(value);
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

})();