// Sales Commission Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    commissionType: 'percentage',
    baseCommissionRate: 10,
    timePeriod: 'monthly',
    baseSalary: '',
    salesQuota: '',
    quotaBonus: '',
    acceleratorRate: '',
    incomeGoal: '',
    spiffBonus: '',
    referralBonus: '',
    quickTotalSales: '',
    quickDealCount: '',
    mode: 'simple'
  };

  const TIME_PERIOD_LABELS = {
    weekly: 'Weekly',
    biweekly: 'Bi-Weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    annual: 'Annual'
  };

  // State
  let state = {
    mode: 'simple',
    sales: [],
    tiers: [],
    saleCounter: 0,
    tierCounter: 0
  };

  // DOM Elements
  let elements = {};

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    cacheElements();
    initializeForm();
    loadFromURL();
    attachEventListeners();
    updateUI();
  });

  function cacheElements() {
    elements = {
      form: document.getElementById('sales-commission-form'),
      calculateBtn: document.getElementById('calculate-btn'),
      shareBtn: document.getElementById('share-calculation'),
      resetBtn: document.getElementById('reset-form'),
      resultDiv: document.getElementById('commission-result'),
      commissionType: document.getElementById('commission-type'),
      baseCommissionRate: document.getElementById('base-commission-rate'),
      rateAddon: document.getElementById('rate-addon'),
      rateHelp: document.getElementById('rate-help'),
      baseRateGroup: document.getElementById('base-rate-group'),
      timePeriod: document.getElementById('time-period'),
      baseSalary: document.getElementById('base-salary'),
      salesQuota: document.getElementById('sales-quota'),
      quotaBonus: document.getElementById('quota-bonus'),
      acceleratorRate: document.getElementById('accelerator-rate'),
      incomeGoal: document.getElementById('income-goal'),
      spiffBonus: document.getElementById('spiff-bonus'),
      referralBonus: document.getElementById('referral-bonus'),
      quickTotalSales: document.getElementById('quick-total-sales'),
      quickDealCount: document.getElementById('quick-deal-count'),
      salesContainer: document.getElementById('sales-container'),
      tiersContainer: document.getElementById('tiers-container'),
      addSaleBtn: document.getElementById('add-sale-btn'),
      addTierBtn: document.getElementById('add-tier-btn'),
      salesSummary: document.getElementById('sales-summary'),
      totalSalesPreview: document.getElementById('total-sales-preview'),
      dealCountPreview: document.getElementById('deal-count-preview')
    };
  }

  function initializeForm() {
    setValue('commission-type', DEFAULT_VALUES.commissionType);
    setValue('base-commission-rate', DEFAULT_VALUES.baseCommissionRate);
    setValue('time-period', DEFAULT_VALUES.timePeriod);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load basic fields
    const fields = [
      { id: 'commission-type', param: 'type' },
      { id: 'base-commission-rate', param: 'rate' },
      { id: 'time-period', param: 'period' },
      { id: 'base-salary', param: 'salary' },
      { id: 'sales-quota', param: 'quota' },
      { id: 'quota-bonus', param: 'qbonus' },
      { id: 'accelerator-rate', param: 'accel' },
      { id: 'income-goal', param: 'goal' },
      { id: 'spiff-bonus', param: 'spiff' },
      { id: 'referral-bonus', param: 'ref' },
      { id: 'quick-total-sales', param: 'total' },
      { id: 'quick-deal-count', param: 'deals' }
    ];
    
    fields.forEach(field => {
      if (params.has(field.param)) {
        const value = params.get(field.param);
        setValue(field.id, value);
      }
    });
    
    // Load mode
    if (params.has('mode')) {
      const mode = params.get('mode');
      if (mode === 'advanced' || mode === 'simple') {
        state.mode = mode;
        setMode(mode);
      }
    }
    
    // Load sales entries
    if (params.has('sales')) {
      try {
        const salesData = JSON.parse(decodeURIComponent(params.get('sales')));
        salesData.forEach(sale => {
          addSale(sale);
        });
      } catch (e) {
        console.error('Error parsing sales data:', e);
      }
    }
    
    // Load tiers
    if (params.has('tiers')) {
      try {
        const tiersData = JSON.parse(decodeURIComponent(params.get('tiers')));
        tiersData.forEach(tier => {
          addTier(tier);
        });
      } catch (e) {
        console.error('Error parsing tiers data:', e);
      }
    }
    
    // Add default sale if none loaded
    if (state.sales.length === 0) {
      addSale();
    }
    
    // Add default tiers if none loaded and tiered type
    if (state.tiers.length === 0 && getValue('commission-type') === 'tiered') {
      addDefaultTiers();
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    // Save basic fields
    params.set('type', getValue('commission-type'));
    params.set('rate', getValue('base-commission-rate'));
    params.set('period', getValue('time-period'));
    params.set('mode', state.mode);
    
    const baseSalary = getValue('base-salary');
    if (baseSalary) params.set('salary', baseSalary);
    
    if (state.mode === 'advanced') {
      const quota = getValue('sales-quota');
      const qbonus = getValue('quota-bonus');
      const accel = getValue('accelerator-rate');
      const goal = getValue('income-goal');
      const spiff = getValue('spiff-bonus');
      const ref = getValue('referral-bonus');
      
      if (quota) params.set('quota', quota);
      if (qbonus) params.set('qbonus', qbonus);
      if (accel) params.set('accel', accel);
      if (goal) params.set('goal', goal);
      if (spiff) params.set('spiff', spiff);
      if (ref) params.set('ref', ref);
    }
    
    const quickTotal = getValue('quick-total-sales');
    const quickDeals = getValue('quick-deal-count');
    if (quickTotal) params.set('total', quickTotal);
    if (quickDeals) params.set('deals', quickDeals);
    
    // Save sales entries
    const salesData = state.sales.map(sale => {
      const row = document.querySelector(`[data-sale-id="${sale.id}"]`);
      if (!row) return null;
      return {
        name: row.querySelector('.sale-name')?.value || '',
        amount: row.querySelector('.sale-amount')?.value || '',
        product: row.querySelector('.sale-product')?.value || ''
      };
    }).filter(s => s && (s.name || s.amount || s.product));
    
    if (salesData.length > 0) {
      params.set('sales', encodeURIComponent(JSON.stringify(salesData)));
    }
    
    // Save tiers
    if (getValue('commission-type') === 'tiered') {
      const tiersData = state.tiers.map(tier => {
        const row = document.querySelector(`[data-tier-id="${tier.id}"]`);
        if (!row) return null;
        return {
          min: row.querySelector('.tier-min')?.value || '0',
          max: row.querySelector('.tier-max')?.value || '',
          rate: row.querySelector('.tier-rate')?.value || ''
        };
      }).filter(t => t && t.rate);
      
      if (tiersData.length > 0) {
        params.set('tiers', encodeURIComponent(JSON.stringify(tiersData)));
      }
    }
    
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
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
        const mode = this.dataset.mode;
        setMode(mode);
        saveToURL();
      });
    });
    
    // Commission type change
    if (elements.commissionType) {
      elements.commissionType.addEventListener('change', function() {
        updateCommissionTypeUI();
        saveToURL();
      });
    }
    
    // Add sale button
    if (elements.addSaleBtn) {
      elements.addSaleBtn.addEventListener('click', () => addSale());
    }
    
    // Add tier button
    if (elements.addTierBtn) {
      elements.addTierBtn.addEventListener('click', () => addTier());
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
        updateSalesPreview();
        saveToURL();
      });
      
      if (input.type === 'number' || input.type === 'text') {
        input.addEventListener('input', debounce(() => {
          updateSalesPreview();
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
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Show/hide advanced sections
    document.querySelectorAll('.advanced-section').forEach(section => {
      section.classList.toggle('hidden', mode !== 'advanced');
    });
  }

  function updateCommissionTypeUI() {
    const type = getValue('commission-type');
    const tieredSection = document.querySelector('.tiered-section');
    
    // Update rate addon and help text
    if (type === 'flat') {
      elements.rateAddon.textContent = '$';
      elements.rateHelp.textContent = 'Amount earned per sale';
    } else {
      elements.rateAddon.textContent = '%';
      elements.rateHelp.textContent = 'Percentage of sale value';
    }
    
    // Show/hide tiered section
    if (tieredSection) {
      tieredSection.classList.toggle('hidden', type !== 'tiered');
    }
    
    // Show/hide base rate group for tiered
    if (elements.baseRateGroup) {
      elements.baseRateGroup.classList.toggle('hidden', type === 'tiered');
    }
    
    // Add default tiers if switching to tiered and no tiers exist
    if (type === 'tiered' && state.tiers.length === 0) {
      addDefaultTiers();
    }
  }

  function updateUI() {
    updateCommissionTypeUI();
    updateSalesPreview();
  }

  function addDefaultTiers() {
    addTier({ min: '0', max: '10000', rate: '5' });
    addTier({ min: '10000', max: '25000', rate: '8' });
    addTier({ min: '25000', max: '', rate: '12' });
  }

  function addSale(data = null) {
    state.saleCounter++;
    const saleId = `sale-${state.saleCounter}`;
    
    const sale = {
      id: saleId,
      name: data?.name || '',
      amount: data?.amount || '',
      product: data?.product || ''
    };
    
    state.sales.push(sale);
    
    const saleRow = document.createElement('div');
    saleRow.className = 'sales-row';
    saleRow.dataset.saleId = saleId;
    
    saleRow.innerHTML = `
      <div class="sales-header">
        <span class="sale-number">Sale #${state.sales.length}</span>
        <button type="button" class="remove-sale-btn" data-sale-id="${saleId}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${saleId}-name">
            Customer/Deal Name
          </label>
          <input 
            type="text" 
            id="${saleId}-name" 
            class="form-input sale-name"
            placeholder="e.g., Acme Corp"
            value="${sale.name}"
            data-sale-id="${saleId}"
          />
          <small class="form-help">Optional identifier</small>
        </div>
        <div class="form-group">
          <label for="${saleId}-product">
            Product/Service
          </label>
          <input 
            type="text" 
            id="${saleId}-product" 
            class="form-input sale-product"
            placeholder="e.g., Enterprise Plan"
            value="${sale.product}"
            data-sale-id="${saleId}"
          />
          <small class="form-help">Optional product name</small>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${saleId}-amount">
            Sale Amount <span class="required">*</span>
          </label>
          <div class="input-group">
            <input 
              type="number" 
              id="${saleId}-amount" 
              class="form-input sale-amount"
              placeholder="5000"
              min="0"
              step="100"
              value="${sale.amount}"
              data-sale-id="${saleId}"
              required
            />
            <span class="input-addon">$</span>
          </div>
          <small class="form-help">Total value of this sale</small>
        </div>
      </div>
    `;
    
    elements.salesContainer.appendChild(saleRow);
    
    // Add event listeners
    const nameInput = saleRow.querySelector('.sale-name');
    const productInput = saleRow.querySelector('.sale-product');
    const amountInput = saleRow.querySelector('.sale-amount');
    const removeBtn = saleRow.querySelector('.remove-sale-btn');
    
    [nameInput, productInput, amountInput].forEach(input => {
      input.addEventListener('input', debounce(() => {
        updateSalesPreview();
        saveToURL();
      }, 500));
    });
    
    removeBtn.addEventListener('click', () => removeSale(saleId));
    
    updateSaleNumbers();
    updateSalesPreview();
  }

  function removeSale(saleId) {
    if (state.sales.length <= 1) {
      alert('You must have at least one sale entry.');
      return;
    }
    
    const saleRow = document.querySelector(`[data-sale-id="${saleId}"]`);
    if (saleRow) {
      saleRow.remove();
    }
    
    state.sales = state.sales.filter(s => s.id !== saleId);
    updateSaleNumbers();
    updateSalesPreview();
    saveToURL();
  }

  function updateSaleNumbers() {
    const saleRows = elements.salesContainer.querySelectorAll('.sales-row');
    saleRows.forEach((row, index) => {
      const numberSpan = row.querySelector('.sale-number');
      if (numberSpan) {
        numberSpan.textContent = `Sale #${index + 1}`;
      }
    });
  }

  function updateSalesPreview() {
    let totalSales = 0;
    let dealCount = 0;
    
    state.sales.forEach(sale => {
      const row = document.querySelector(`[data-sale-id="${sale.id}"]`);
      if (row) {
        const amount = parseFloat(row.querySelector('.sale-amount')?.value) || 0;
        if (amount > 0) {
          totalSales += amount;
          dealCount++;
        }
      }
    });
    
    if (dealCount > 0) {
      elements.salesSummary.style.display = 'block';
      elements.totalSalesPreview.textContent = formatCurrency(totalSales);
      elements.dealCountPreview.textContent = dealCount;
    } else {
      elements.salesSummary.style.display = 'none';
    }
  }

  function addTier(data = null) {
    state.tierCounter++;
    const tierId = `tier-${state.tierCounter}`;
    
    const tier = {
      id: tierId,
      min: data?.min || '0',
      max: data?.max || '',
      rate: data?.rate || ''
    };
    
    state.tiers.push(tier);
    
    const tierRow = document.createElement('div');
    tierRow.className = 'tier-row';
    tierRow.dataset.tierId = tierId;
    
    tierRow.innerHTML = `
      <div class="tier-header">
        <span class="tier-number">Tier #${state.tiers.length}</span>
        <button type="button" class="remove-tier-btn" data-tier-id="${tierId}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${tierId}-min">
            Sales From <span class="required">*</span>
          </label>
          <div class="input-group">
            <input 
              type="number" 
              id="${tierId}-min" 
              class="form-input tier-min"
              placeholder="0"
              min="0"
              step="1000"
              value="${tier.min}"
              data-tier-id="${tierId}"
              required
            />
            <span class="input-addon">$</span>
          </div>
          <small class="form-help">Minimum sales amount</small>
        </div>
        <div class="form-group">
          <label for="${tierId}-max">
            Sales To
          </label>
          <div class="input-group">
            <input 
              type="number" 
              id="${tierId}-max" 
              class="form-input tier-max"
              placeholder="No limit"
              min="0"
              step="1000"
              value="${tier.max}"
              data-tier-id="${tierId}"
            />
            <span class="input-addon">$</span>
          </div>
          <small class="form-help">Maximum (blank = no limit)</small>
        </div>
        <div class="form-group">
          <label for="${tierId}-rate">
            Commission Rate <span class="required">*</span>
          </label>
          <div class="input-group">
            <input 
              type="number" 
              id="${tierId}-rate" 
              class="form-input tier-rate"
              placeholder="5"
              min="0"
              max="100"
              step="0.5"
              value="${tier.rate}"
              data-tier-id="${tierId}"
              required
            />
            <span class="input-addon">%</span>
          </div>
          <small class="form-help">Rate for this tier</small>
        </div>
      </div>
    `;
    
    elements.tiersContainer.appendChild(tierRow);
    
    // Add event listeners
    const inputs = tierRow.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('input', debounce(() => saveToURL(), 500));
    });
    
    const removeBtn = tierRow.querySelector('.remove-tier-btn');
    removeBtn.addEventListener('click', () => removeTier(tierId));
    
    updateTierNumbers();
  }

  function removeTier(tierId) {
    if (state.tiers.length <= 1) {
      alert('You must have at least one tier.');
      return;
    }
    
    const tierRow = document.querySelector(`[data-tier-id="${tierId}"]`);
    if (tierRow) {
      tierRow.remove();
    }
    
    state.tiers = state.tiers.filter(t => t.id !== tierId);
    updateTierNumbers();
    saveToURL();
  }

  function updateTierNumbers() {
    const tierRows = elements.tiersContainer.querySelectorAll('.tier-row');
    tierRows.forEach((row, index) => {
      const numberSpan = row.querySelector('.tier-number');
      if (numberSpan) {
        numberSpan.textContent = `Tier #${index + 1}`;
      }
    });
  }

  function resetForm() {
    if (!confirm('Reset all inputs and start over?')) return;
    
    // Reset state
    state.mode = 'simple';
    state.sales = [];
    state.tiers = [];
    state.saleCounter = 0;
    state.tierCounter = 0;
    
    // Reset form fields
    initializeForm();
    setValue('base-salary', '');
    setValue('sales-quota', '');
    setValue('quota-bonus', '');
    setValue('accelerator-rate', '');
    setValue('income-goal', '');
    setValue('spiff-bonus', '');
    setValue('referral-bonus', '');
    setValue('quick-total-sales', '');
    setValue('quick-deal-count', '');
    
    // Clear containers
    elements.salesContainer.innerHTML = '';
    elements.tiersContainer.innerHTML = '';
    
    // Reset UI
    setMode('simple');
    updateUI();
    
    // Add default sale
    addSale();
    
    // Hide results
    elements.resultDiv.classList.add('hidden');
    
    // Clear URL
    window.history.replaceState({}, '', window.location.pathname);
  }

  function calculateResults() {
    // Get total sales (quick entry or individual sales)
    let totalSales = parseFloat(getValue('quick-total-sales')) || 0;
    let dealCount = parseInt(getValue('quick-deal-count')) || 0;
    let salesBreakdown = [];
    
    // If no quick entry, calculate from individual sales
    if (totalSales === 0) {
      state.sales.forEach(sale => {
        const row = document.querySelector(`[data-sale-id="${sale.id}"]`);
        if (row) {
          const name = row.querySelector('.sale-name')?.value || 'Sale';
          const product = row.querySelector('.sale-product')?.value || '';
          const amount = parseFloat(row.querySelector('.sale-amount')?.value) || 0;
          
          if (amount > 0) {
            totalSales += amount;
            dealCount++;
            salesBreakdown.push({ name, product, amount });
          }
        }
      });
    }
    
    if (totalSales === 0 && dealCount === 0) {
      alert('Please enter at least one sale amount or use quick entry.');
      return;
    }
    
    saveToURL();
    
    // Get commission parameters
    const commissionType = getValue('commission-type');
    const baseRate = parseFloat(getValue('base-commission-rate')) || 0;
    const timePeriod = getValue('time-period');
    const baseSalary = parseFloat(getValue('base-salary')) || 0;
    
    // Advanced parameters
    const salesQuota = parseFloat(getValue('sales-quota')) || 0;
    const quotaBonus = parseFloat(getValue('quota-bonus')) || 0;
    const acceleratorRate = parseFloat(getValue('accelerator-rate')) || 0;
    const incomeGoal = parseFloat(getValue('income-goal')) || 0;
    const spiffBonus = parseFloat(getValue('spiff-bonus')) || 0;
    const referralBonus = parseFloat(getValue('referral-bonus')) || 0;
    
    // Calculate commission based on type
    let baseCommission = 0;
    let acceleratorCommission = 0;
    let tierBreakdown = [];
    
    if (commissionType === 'flat') {
      baseCommission = baseRate * dealCount;
    } else if (commissionType === 'percentage') {
      if (state.mode === 'advanced' && salesQuota > 0 && acceleratorRate > 0) {
        // Sales up to quota at base rate
        const salesUnderQuota = Math.min(totalSales, salesQuota);
        const salesOverQuota = Math.max(0, totalSales - salesQuota);
        
        baseCommission = salesUnderQuota * (baseRate / 100);
        acceleratorCommission = salesOverQuota * (acceleratorRate / 100);
      } else {
        baseCommission = totalSales * (baseRate / 100);
      }
    } else if (commissionType === 'tiered') {
      // Calculate tiered commission
      const tiers = getTiersFromDOM();
      let remainingSales = totalSales;
      
      tiers.sort((a, b) => a.min - b.min);
      
      tiers.forEach((tier, index) => {
        if (remainingSales <= 0) return;
        
        const tierMin = tier.min;
        const tierMax = tier.max || Infinity;
        const tierRange = tierMax - tierMin;
        
        let salesInTier = 0;
        
        if (totalSales > tierMin) {
          if (totalSales >= tierMax) {
            salesInTier = tierRange;
          } else {
            salesInTier = totalSales - tierMin;
          }
        }
        
        if (salesInTier > 0) {
          const commissionInTier = salesInTier * (tier.rate / 100);
          baseCommission += commissionInTier;
          
          tierBreakdown.push({
            tier: index + 1,
            min: tierMin,
            max: tierMax,
            rate: tier.rate,
            sales: salesInTier,
            commission: commissionInTier
          });
        }
      });
    }
    
    // Calculate quota achievement bonus
    let quotaAchievementBonus = 0;
    let quotaPercentage = 0;
    if (state.mode === 'advanced' && salesQuota > 0) {
      quotaPercentage = (totalSales / salesQuota) * 100;
      if (quotaPercentage >= 100) {
        quotaAchievementBonus = quotaBonus;
      }
    }
    
    // Calculate totals
    const totalBonuses = quotaAchievementBonus + spiffBonus + referralBonus;
    const totalCommission = baseCommission + acceleratorCommission;
    const totalEarnings = baseSalary + totalCommission + totalBonuses;
    
    // Calculate metrics
    const effectiveRate = totalSales > 0 ? (totalCommission / totalSales) * 100 : 0;
    const avgDealSize = dealCount > 0 ? totalSales / dealCount : 0;
    const earningsPerDeal = dealCount > 0 ? totalCommission / dealCount : 0;
    
    // Calculate goal progress
    let goalProgress = 0;
    let salesNeededForGoal = 0;
    if (incomeGoal > 0) {
      goalProgress = (totalEarnings / incomeGoal) * 100;
      if (goalProgress < 100) {
        const remainingNeeded = incomeGoal - totalEarnings;
        const effectiveRateDecimal = effectiveRate / 100;
        if (effectiveRateDecimal > 0) {
          salesNeededForGoal = remainingNeeded / effectiveRateDecimal;
        }
      }
    }
    
    // Build results object
    const results = {
      // Sales data
      totalSales,
      dealCount,
      salesBreakdown,
      avgDealSize,
      
      // Commission data
      commissionType,
      baseRate,
      baseCommission,
      acceleratorCommission,
      acceleratorRate,
      totalCommission,
      effectiveRate,
      earningsPerDeal,
      tierBreakdown,
      
      // Salary and bonuses
      baseSalary,
      quotaAchievementBonus,
      spiffBonus,
      referralBonus,
      totalBonuses,
      
      // Totals
      totalEarnings,
      
      // Quota tracking
      salesQuota,
      quotaPercentage,
      
      // Goal tracking
      incomeGoal,
      goalProgress,
      salesNeededForGoal,
      
      // Meta
      timePeriod,
      periodLabel: TIME_PERIOD_LABELS[timePeriod],
      mode: state.mode
    };
    
    displayResults(results);
  }

  function getTiersFromDOM() {
    const tiers = [];
    state.tiers.forEach(tier => {
      const row = document.querySelector(`[data-tier-id="${tier.id}"]`);
      if (row) {
        const min = parseFloat(row.querySelector('.tier-min')?.value) || 0;
        const max = parseFloat(row.querySelector('.tier-max')?.value) || 0;
        const rate = parseFloat(row.querySelector('.tier-rate')?.value) || 0;
        
        if (rate > 0) {
          tiers.push({ min, max: max || null, rate });
        }
      }
    });
    return tiers;
  }

  function displayResults(results) {
    const resultDiv = elements.resultDiv;
    if (!resultDiv) return;
    
    resultDiv.innerHTML = `
      <div class="result-header-actions">
        <h3>💰 Commission Results</h3>
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
      
      ${results.mode === 'advanced' && results.salesQuota > 0 ? generateQuotaProgress(results) : ''}
      
      ${results.mode === 'advanced' && results.incomeGoal > 0 ? generateGoalProgress(results) : ''}
      
      ${generateEarningsChart(results)}
      
      ${results.commissionType === 'tiered' && results.tierBreakdown.length > 0 ? generateTierVisual(results) : ''}
      
      ${results.salesBreakdown.length > 0 ? generateSalesBreakdown(results) : ''}
      
      <div class="commission-insights">
        <h4>💡 Performance Insights</h4>
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
    const cards = [
      {
        icon: '💵',
        value: formatCurrency(results.totalSales),
        label: `${results.periodLabel} Sales`,
        highlight: false
      },
      {
        icon: '📊',
        value: results.dealCount,
        label: 'Deals Closed',
        highlight: false
      },
      {
        icon: '💰',
        value: formatCurrency(results.totalCommission),
        label: 'Total Commission',
        highlight: false
      },
      {
        icon: '🎯',
        value: results.effectiveRate.toFixed(1) + '%',
        label: 'Effective Rate',
        highlight: false
      }
    ];
    
    if (results.baseSalary > 0 || results.totalBonuses > 0) {
      cards.push({
        icon: '🏆',
        value: formatCurrency(results.totalEarnings),
        label: 'Total Earnings',
        highlight: true
      });
    }
    
    if (results.avgDealSize > 0) {
      cards.push({
        icon: '📈',
        value: formatCurrency(results.avgDealSize),
        label: 'Avg Deal Size',
        highlight: false
      });
    }
    
    return `
      <div class="commission-summary-cards">
        ${cards.map(card => `
          <div class="summary-card ${card.highlight ? 'highlight' : ''}">
            <div class="summary-card-icon">${card.icon}</div>
            <div class="summary-card-value ${card.highlight ? 'highlight' : ''}">${card.value}</div>
            <div class="summary-card-label">${card.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function generateQuotaProgress(results) {
    const percentage = Math.min(results.quotaPercentage, 150);
    const displayPercentage = results.quotaPercentage.toFixed(1);
    
    let barClass = 'under-quota';
    if (results.quotaPercentage >= 100) barClass = 'at-quota';
    if (results.quotaPercentage > 110) barClass = 'over-quota';
    
    return `
      <div class="quota-progress-container">
        <div class="quota-progress-header">
          <h4>📊 Quota Progress</h4>
          <span class="quota-percentage">${displayPercentage}%</span>
        </div>
        <div class="progress-bar-wrapper">
          <div class="progress-bar-fill ${barClass}" style="width: ${Math.min(percentage, 100)}%">
            <span class="progress-bar-text">${formatCurrency(results.totalSales)}</span>
          </div>
        </div>
        <div class="progress-milestones">
          <div class="milestone ${results.quotaPercentage >= 50 ? 'achieved' : ''}">
            <div>50%</div>
            <div>${formatCurrency(results.salesQuota * 0.5)}</div>
          </div>
          <div class="milestone ${results.quotaPercentage >= 75 ? 'achieved' : ''}">
            <div>75%</div>
            <div>${formatCurrency(results.salesQuota * 0.75)}</div>
          </div>
          <div class="milestone ${results.quotaPercentage >= 100 ? 'achieved' : ''}">
            <div>100%</div>
            <div>${formatCurrency(results.salesQuota)}</div>
          </div>
          <div class="milestone ${results.quotaPercentage >= 125 ? 'achieved' : ''}">
            <div>125%</div>
            <div>${formatCurrency(results.salesQuota * 1.25)}</div>
          </div>
        </div>
      </div>
    `;
  }

  function generateGoalProgress(results) {
    const progress = Math.min(results.goalProgress, 100);
    const remaining = Math.max(0, results.incomeGoal - results.totalEarnings);
    
    return `
      <div class="goal-progress">
        <h4>🎯 Income Goal Progress</h4>
        <div class="progress-bar-wrapper" style="margin: 1rem 0;">
          <div class="progress-bar-fill ${results.goalProgress >= 100 ? 'at-quota' : 'under-quota'}" style="width: ${progress}%">
            <span class="progress-bar-text">${results.goalProgress.toFixed(1)}%</span>
          </div>
        </div>
        <div class="goal-stats">
          <div class="goal-stat">
            <div class="goal-stat-value">${formatCurrency(results.totalEarnings)}</div>
            <div class="goal-stat-label">Current Earnings</div>
          </div>
          <div class="goal-stat">
            <div class="goal-stat-value">${formatCurrency(results.incomeGoal)}</div>
            <div class="goal-stat-label">Goal</div>
          </div>
          <div class="goal-stat">
            <div class="goal-stat-value">${formatCurrency(remaining)}</div>
            <div class="goal-stat-label">Remaining</div>
          </div>
          ${results.salesNeededForGoal > 0 ? `
          <div class="goal-stat">
            <div class="goal-stat-value">${formatCurrency(results.salesNeededForGoal)}</div>
            <div class="goal-stat-label">Sales Needed</div>
          </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function generateEarningsChart(results) {
    const items = [];
    const maxValue = Math.max(
      results.baseSalary,
      results.baseCommission,
      results.acceleratorCommission,
      results.totalBonuses
    );
    
    if (results.baseSalary > 0) {
      items.push({
        label: 'Base Salary',
        value: results.baseSalary,
        class: 'base-salary'
      });
    }
    
    items.push({
      label: 'Base Commission',
      value: results.baseCommission,
      class: 'base-commission'
    });
    
    if (results.acceleratorCommission > 0) {
      items.push({
        label: 'Accelerator',
        value: results.acceleratorCommission,
        class: 'accelerator'
      });
    }
    
    if (results.totalBonuses > 0) {
      items.push({
        label: 'Bonuses',
        value: results.totalBonuses,
        class: 'bonus'
      });
    }
    
    return `
      <div class="earnings-chart">
        <h4>💵 Earnings Breakdown</h4>
        <div class="earnings-bar-container">
          ${items.map(item => `
            <div class="earnings-bar-row">
              <div class="earnings-bar-label">${item.label}</div>
              <div class="earnings-bar-wrapper">
                <div class="earnings-bar ${item.class}" style="width: ${maxValue > 0 ? (item.value / maxValue * 100) : 0}%">
                  <span class="earnings-bar-amount">${formatCurrency(item.value)}</span>
                </div>
              </div>
            </div>
          `).join('')}
          <div class="earnings-bar-row" style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #e5e7eb;">
            <div class="earnings-bar-label" style="font-weight: 700;">Total Earnings</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-accent-orange);">
              ${formatCurrency(results.totalEarnings)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function generateTierVisual(results) {
    const totalCommission = results.tierBreakdown.reduce((sum, t) => sum + t.commission, 0);
    const colors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];
    
    return `
      <div class="tier-visual">
        <h4>📊 Tiered Commission Breakdown</h4>
        <div class="tier-bar">
          ${results.tierBreakdown.map((tier, i) => {
            const width = totalCommission > 0 ? (tier.commission / totalCommission * 100) : 0;
            return `
              <div class="tier-segment" style="width: ${width}%; background: ${colors[i % colors.length]};">
                ${tier.rate}%
              </div>
            `;
          }).join('')}
        </div>
        <div class="tier-legend">
          ${results.tierBreakdown.map((tier, i) => `
            <div class="tier-legend-item">
              <div class="tier-legend-color" style="background: ${colors[i % colors.length]};"></div>
              <span>Tier ${tier.tier}: ${formatCurrency(tier.min)} - ${tier.max === Infinity ? '∞' : formatCurrency(tier.max)} @ ${tier.rate}% = ${formatCurrency(tier.commission)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function generateSalesBreakdown(results) {
    return `
      <div class="commission-breakdown">
        <h4>📋 Sales Details</h4>
        <div class="breakdown-table-container">
          <table class="commission-table">
            <thead>
              <tr>
                <th>Customer/Deal</th>
                <th>Product</th>
                <th>Sale Amount</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              ${results.salesBreakdown.map(sale => {
                let commission = 0;
                if (results.commissionType === 'flat') {
                  commission = results.baseRate;
                } else if (results.commissionType === 'percentage') {
                  commission = sale.amount * (results.baseRate / 100);
                } else {
                  // For tiered, calculate proportional commission
                  commission = sale.amount * (results.effectiveRate / 100);
                }
                return `
                  <tr>
                    <td>${sale.name || '-'}</td>
                    <td>${sale.product || '-'}</td>
                    <td>${formatCurrency(sale.amount)}</td>
                    <td>${formatCurrency(commission)}</td>
                  </tr>
                `;
              }).join('')}
              <tr class="total-row">
                <td colspan="2"><strong>Total</strong></td>
                <td><strong>${formatCurrency(results.totalSales)}</strong></td>
                <td><strong>${formatCurrency(results.totalCommission)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function generateInsights(results) {
    const insights = [];
    
    // Effective rate insight
    if (results.effectiveRate > 0) {
      insights.push({
        type: 'info',
        icon: '📊',
        title: 'Effective Commission Rate',
        text: `You're earning ${results.effectiveRate.toFixed(1)}% on average across all sales. ${results.commissionType === 'tiered' ? 'Consider pushing more sales to reach higher tiers.' : ''}`
      });
    }
    
    // Quota achievement
    if (results.salesQuota > 0) {
      if (results.quotaPercentage >= 100) {
        insights.push({
          type: 'success',
          icon: '🎉',
          title: 'Quota Achieved!',
          text: `Congratulations! You've hit ${results.quotaPercentage.toFixed(1)}% of your quota. ${results.acceleratorRate > 0 ? `Additional sales earn at ${results.acceleratorRate}% accelerated rate.` : ''}`
        });
      } else {
        const remaining = results.salesQuota - results.totalSales;
        insights.push({
          type: 'warning',
          icon: '🎯',
          title: 'Quota Progress',
          text: `You need ${formatCurrency(remaining)} more in sales to hit your quota (${(100 - results.quotaPercentage).toFixed(1)}% to go).`
        });
      }
    }
    
    // Income goal
    if (results.incomeGoal > 0) {
      if (results.goalProgress >= 100) {
        insights.push({
          type: 'success',
          icon: '💰',
          title: 'Income Goal Reached!',
          text: `You've achieved ${results.goalProgress.toFixed(1)}% of your income goal for this ${results.periodLabel.toLowerCase()} period.`
        });
      } else if (results.salesNeededForGoal > 0) {
        insights.push({
          type: 'info',
          icon: '📈',
          title: 'Path to Goal',
          text: `To reach your ${formatCurrency(results.incomeGoal)} income goal, you need approximately ${formatCurrency(results.salesNeededForGoal)} in additional sales.`
        });
      }
    }
    
    // Average deal size
    if (results.dealCount > 1 && results.avgDealSize > 0) {
      insights.push({
        type: 'info',
        icon: '💼',
        title: 'Deal Analytics',
        text: `Average deal size: ${formatCurrency(results.avgDealSize)}. Earnings per deal: ${formatCurrency(results.earningsPerDeal)}.`
      });
    }
    
    // Commission type specific insights
    if (results.commissionType === 'tiered' && results.tierBreakdown.length > 0) {
      const highestTier = results.tierBreakdown[results.tierBreakdown.length - 1];
      insights.push({
        type: 'info',
        icon: '📶',
        title: 'Tier Status',
        text: `You're currently earning at the ${highestTier.rate}% tier. ${highestTier.max === Infinity ? 'You\'re in the highest tier!' : `Sell ${formatCurrency(highestTier.max - results.totalSales)} more to reach the next tier.`}`
      });
    }
    
    // Accelerator earnings
    if (results.acceleratorCommission > 0) {
      insights.push({
        type: 'success',
        icon: '🚀',
        title: 'Accelerator Bonus Active',
        text: `You've earned ${formatCurrency(results.acceleratorCommission)} in accelerator commission at ${results.acceleratorRate}% rate on above-quota sales.`
      });
    }
    
    // Bonus impact
    if (results.totalBonuses > 0) {
      const bonusPercent = (results.totalBonuses / results.totalEarnings * 100).toFixed(1);
      insights.push({
        type: 'success',
        icon: '🎁',
        title: 'Bonus Impact',
        text: `Bonuses account for ${bonusPercent}% of your total earnings (${formatCurrency(results.totalBonuses)}).`
      });
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
      title: 'Sales Commission Calculator',
      text: 'Check out my commission calculation',
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