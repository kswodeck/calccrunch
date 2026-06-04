// Debt-to-Income Ratio Calculator with URL State Management
(function() {
  'use strict';

  // Categories
  const INCOME_CATEGORIES = [
    { value: 'salary', label: 'Salary/Wages', icon: '💼' },
    { value: 'bonus', label: 'Bonus/Commission', icon: '🎯' },
    { value: 'freelance', label: 'Freelance/Side Hustle', icon: '💻' },
    { value: 'self-employment', label: 'Self-Employment', icon: '🏢' },
    { value: 'rental', label: 'Rental Income', icon: '🏠' },
    { value: 'investments', label: 'Investment Income', icon: '📈' },
    { value: 'dividends', label: 'Dividends', icon: '💰' },
    { value: 'social-security', label: 'Social Security', icon: '🏛️' },
    { value: 'pension', label: 'Pension', icon: '👴' },
    { value: 'alimony-received', label: 'Alimony/Child Support Received', icon: '📜' },
    { value: 'disability', label: 'Disability Income', icon: '♿' },
    { value: 'other-income', label: 'Other Income', icon: '💵' }
  ];

  const HOUSING_CATEGORIES = [
    { value: 'mortgage', label: 'Mortgage Principal & Interest', icon: '🏠' },
    { value: 'rent', label: 'Rent', icon: '🔑' },
    { value: 'property-tax', label: 'Property Tax', icon: '📋' },
    { value: 'home-insurance', label: 'Homeowners Insurance', icon: '🛡️' },
    { value: 'hoa', label: 'HOA Fees', icon: '🏘️' },
    { value: 'pmi', label: 'PMI (Private Mortgage Insurance)', icon: '📊' },
    { value: 'mip', label: 'MIP (FHA Mortgage Insurance)', icon: '📊' },
    { value: 'second-mortgage', label: 'Second Mortgage/HELOC', icon: '🏦' },
    { value: 'other-housing', label: 'Other Housing Costs', icon: '🏡' }
  ];

  const DEBT_CATEGORIES = [
    { value: 'auto-loan', label: 'Auto Loan', icon: '🚗' },
    { value: 'auto-lease', label: 'Auto Lease', icon: '🚙' },
    { value: 'student-loan', label: 'Student Loan', icon: '🎓' },
    { value: 'credit-card', label: 'Credit Card (Min Payment)', icon: '💳' },
    { value: 'personal-loan', label: 'Personal Loan', icon: '💵' },
    { value: 'medical-debt', label: 'Medical Debt', icon: '🏥' },
    { value: 'child-support', label: 'Child Support Payment', icon: '👶' },
    { value: 'alimony-paid', label: 'Alimony Payment', icon: '📜' },
    { value: 'installment-loan', label: 'Installment Loan', icon: '📆' },
    { value: 'timeshare', label: 'Timeshare', icon: '🏖️' },
    { value: '401k-loan', label: '401(k) Loan', icon: '🏦' },
    { value: 'tax-debt', label: 'Tax Debt Payment', icon: '📋' },
    { value: 'other-debt', label: 'Other Debt', icon: '📝' }
  ];

  const ASSET_CATEGORIES = [
    { value: 'checking', label: 'Checking Account', icon: '🏦' },
    { value: 'savings', label: 'Savings Account', icon: '💰' },
    { value: 'money-market', label: 'Money Market', icon: '📊' },
    { value: 'cd', label: 'Certificates of Deposit', icon: '📜' },
    { value: '401k', label: '401(k)/403(b)', icon: '🏛️' },
    { value: 'ira', label: 'IRA', icon: '📈' },
    { value: 'roth-ira', label: 'Roth IRA', icon: '📈' },
    { value: 'brokerage', label: 'Brokerage Account', icon: '📊' },
    { value: 'stocks', label: 'Individual Stocks', icon: '📈' },
    { value: 'bonds', label: 'Bonds', icon: '📜' },
    { value: 'real-estate', label: 'Real Estate Equity', icon: '🏠' },
    { value: 'business', label: 'Business Value', icon: '🏢' },
    { value: 'vehicle', label: 'Vehicle Value', icon: '🚗' },
    { value: 'crypto', label: 'Cryptocurrency', icon: '🪙' },
    { value: 'other-asset', label: 'Other Assets', icon: '💎' }
  ];

  const PROPOSED_CATEGORIES = [
    { value: 'new-mortgage', label: 'New Mortgage Payment', icon: '🏠' },
    { value: 'new-auto', label: 'New Auto Loan', icon: '🚗' },
    { value: 'new-student', label: 'New Student Loan', icon: '🎓' },
    { value: 'new-personal', label: 'New Personal Loan', icon: '💵' },
    { value: 'new-credit', label: 'New Credit Card', icon: '💳' },
    { value: 'new-heloc', label: 'New HELOC', icon: '🏦' },
    { value: 'new-other', label: 'Other New Debt', icon: '📝' }
  ];

  // Category colors for visual representation
  const CATEGORY_COLORS = {
    income: '#4CAF50',
    housing: '#2196F3',
    debt: '#F44336',
    assets: '#9C27B0',
    proposed: '#FF9800'
  };

  // State
  let income = [];
  let housing = [];
  let debt = [];
  let assets = [];
  let proposed = [];
  let counters = { income: 0, housing: 0, debt: 0, assets: 0, proposed: 0 };

  // DOM Elements
  const incomeContainer = document.getElementById('income-container');
  const housingContainer = document.getElementById('housing-container');
  const debtContainer = document.getElementById('debt-container');
  const assetsContainer = document.getElementById('assets-container');
  const proposedContainer = document.getElementById('proposed-container');
  const addIncomeBtn = document.getElementById('add-income-btn');
  const addHousingBtn = document.getElementById('add-housing-btn');
  const addDebtBtn = document.getElementById('add-debt-btn');
  const addAssetsBtn = document.getElementById('add-assets-btn');
  const addProposedBtn = document.getElementById('add-proposed-btn');
  const calculateBtn = document.getElementById('calculate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const shareBtn = document.getElementById('share-calculation');
  const resultDiv = document.getElementById('dti-result');

  // Display elements
  const totalIncomeDisplay = document.getElementById('total-income-display');
  const totalHousingDisplay = document.getElementById('total-housing-display');
  const totalDebtDisplay = document.getElementById('total-debt-display');
  const totalAssetsDisplay = document.getElementById('total-assets-display');
  const totalProposedDisplay = document.getElementById('total-proposed-display');
  const previewIncome = document.getElementById('preview-income');
  const previewHousing = document.getElementById('preview-housing');
  const previewTotalDebt = document.getElementById('preview-total-debt');
  const previewDti = document.getElementById('preview-dti');

  // Initialize
  init();

  function init() {
    loadFromURL();

    // Add default rows if no data loaded
    if (income.length === 0) addItem('income');
    if (housing.length === 0) addItem('housing');
    if (debt.length === 0) addItem('debt');

    // Event listeners
    addIncomeBtn.addEventListener('click', () => addItem('income'));
    addHousingBtn.addEventListener('click', () => addItem('housing'));
    addDebtBtn.addEventListener('click', () => addItem('debt'));
    addAssetsBtn.addEventListener('click', () => addItem('assets'));
    addProposedBtn.addEventListener('click', () => addItem('proposed'));
    
    calculateBtn.addEventListener('click', () => {
      calculateResults();
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    clearBtn.addEventListener('click', clearForm);
    shareBtn.addEventListener('click', shareCalculation);

    updateTotals();
  }

  function addItem(type, data = null) {
    counters[type]++;
    const itemId = data?.id || `${type}-${counters[type]}`;
    
    const categories = getCategoriesForType(type);
    const defaultCategory = categories[0].value;
    
    const item = {
      id: itemId,
      name: data?.name || '',
      category: data?.category || defaultCategory,
      amount: data?.amount || ''
    };

    getArrayForType(type).push(item);

    const container = getContainerForType(type);
    const itemRow = document.createElement('div');
    itemRow.className = `item-row ${type}-row`;
    itemRow.dataset.itemId = itemId;

    const labelText = getLabelForType(type);
    const placeholder = getPlaceholderForType(type);
    const amountLabel = getAmountLabelForType(type);

    itemRow.innerHTML = `
      <div class="item-header">
        <span class="item-number">${labelText} #${getArrayForType(type).length}</span>
        <button type="button" class="remove-item-btn" data-item-id="${itemId}" data-type="${type}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${itemId}-name">
            Description <span class="required">*</span>
          </label>
          <input 
            type="text" 
            id="${itemId}-name" 
            class="form-input item-name"
            placeholder="${placeholder}"
            value="${escapeHtml(item.name)}"
            data-item-id="${itemId}"
            required
          />
          <small class="form-help">Name or description</small>
        </div>
        <div class="form-group">
          <label for="${itemId}-category">
            Category <span class="required">*</span>
          </label>
          <select id="${itemId}-category" class="form-select item-category" data-item-id="${itemId}">
            ${categories.map(cat => `
              <option value="${cat.value}" ${item.category === cat.value ? 'selected' : ''}>
                ${cat.icon} ${cat.label}
              </option>
            `).join('')}
          </select>
          <small class="form-help">Select category</small>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${itemId}-amount">
            ${amountLabel} <span class="required">*</span>
          </label>
          <div class="input-with-addon">
            <span class="input-addon">$</span>
            <input 
              type="number" 
              id="${itemId}-amount" 
              class="form-input item-amount"
              placeholder="0"
              min="0"
              step="10"
              value="${item.amount}"
              data-item-id="${itemId}"
              required
            />
          </div>
          <small class="form-help">${type === 'assets' ? 'Current value' : 'Amount per month'}</small>
        </div>
      </div>
    `;

    container.appendChild(itemRow);

    // Add event listeners
    const nameInput = itemRow.querySelector('.item-name');
    const categorySelect = itemRow.querySelector('.item-category');
    const amountInput = itemRow.querySelector('.item-amount');
    const removeBtn = itemRow.querySelector('.remove-item-btn');

    nameInput.addEventListener('input', debounce(() => {
      updateItemData(itemId, type);
      saveToURL();
    }, 500));

    categorySelect.addEventListener('change', () => {
      updateItemData(itemId, type);
      saveToURL();
    });

    amountInput.addEventListener('input', debounce(() => {
      updateItemData(itemId, type);
      updateTotals();
      saveToURL();
    }, 300));

    removeBtn.addEventListener('click', () => removeItem(itemId, type));

    updateItemNumbers(type);
  }

  function getCategoriesForType(type) {
    switch(type) {
      case 'income': return INCOME_CATEGORIES;
      case 'housing': return HOUSING_CATEGORIES;
      case 'debt': return DEBT_CATEGORIES;
      case 'assets': return ASSET_CATEGORIES;
      case 'proposed': return PROPOSED_CATEGORIES;
      default: return [];
    }
  }

  function getArrayForType(type) {
    switch(type) {
      case 'income': return income;
      case 'housing': return housing;
      case 'debt': return debt;
      case 'assets': return assets;
      case 'proposed': return proposed;
      default: return [];
    }
  }

  function getContainerForType(type) {
    switch(type) {
      case 'income': return incomeContainer;
      case 'housing': return housingContainer;
      case 'debt': return debtContainer;
      case 'assets': return assetsContainer;
      case 'proposed': return proposedContainer;
      default: return null;
    }
  }

  function getLabelForType(type) {
    switch(type) {
      case 'income': return 'Income';
      case 'housing': return 'Housing';
      case 'debt': return 'Debt';
      case 'assets': return 'Asset';
      case 'proposed': return 'Proposed';
      default: return 'Item';
    }
  }

  function getPlaceholderForType(type) {
    switch(type) {
      case 'income': return 'e.g., Primary Job';
      case 'housing': return 'e.g., Monthly Mortgage';
      case 'debt': return 'e.g., Car Payment';
      case 'assets': return 'e.g., Savings Account';
      case 'proposed': return 'e.g., New Car Loan';
      default: return '';
    }
  }

  function getAmountLabelForType(type) {
    switch(type) {
      case 'income': return 'Monthly Gross Income';
      case 'housing': return 'Monthly Payment';
      case 'debt': return 'Monthly Payment';
      case 'assets': return 'Total Value';
      case 'proposed': return 'Proposed Monthly Payment';
      default: return 'Amount';
    }
  }

  function updateItemData(itemId, type) {
    const items = getArrayForType(type);
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const nameInput = document.querySelector(`#${itemId}-name`);
    const categorySelect = document.querySelector(`#${itemId}-category`);
    const amountInput = document.querySelector(`#${itemId}-amount`);

    if (nameInput) item.name = nameInput.value;
    if (categorySelect) item.category = categorySelect.value;
    if (amountInput) item.amount = amountInput.value;
  }

  function removeItem(itemId, type) {
    const arr = getArrayForType(type);
    const index = arr.findIndex(i => i.id === itemId);
    if (index > -1) {
      arr.splice(index, 1);
    }
    
    // Only auto-add for required sections
    if (arr.length === 0 && ['income', 'housing', 'debt'].includes(type)) {
      addItem(type);
    }

    const row = document.querySelector(`[data-item-id="${itemId}"]`);
    if (row) row.remove();

    updateItemNumbers(type);
    updateTotals();
    saveToURL();
  }

  function updateItemNumbers(type) {
    const container = getContainerForType(type);
    const label = getLabelForType(type);
    const rows = container.querySelectorAll('.item-row');

    rows.forEach((row, index) => {
      const numberSpan = row.querySelector('.item-number');
      if (numberSpan) {
        numberSpan.textContent = `${label} #${index + 1}`;
      }
    });
  }

  function updateTotals() {
    const totalIncome = calculateTotal('income');
    const totalHousing = calculateTotal('housing');
    const totalDebt = calculateTotal('debt');
    const totalAssets = calculateTotal('assets');
    const totalProposed = calculateTotal('proposed');
    
    // Total monthly debt (housing + other debts)
    const totalMonthlyDebt = totalHousing + totalDebt;

    // Calculate DTI
    const backEndDti = totalIncome > 0 ? (totalMonthlyDebt / totalIncome) * 100 : 0;

    totalIncomeDisplay.textContent = formatCurrency(totalIncome);
    totalHousingDisplay.textContent = formatCurrency(totalHousing);
    totalDebtDisplay.textContent = formatCurrency(totalDebt);
    totalAssetsDisplay.textContent = formatCurrency(totalAssets);
    totalProposedDisplay.textContent = formatCurrency(totalProposed);

    previewIncome.textContent = formatCurrency(totalIncome);
    previewHousing.textContent = formatCurrency(totalHousing);
    previewTotalDebt.textContent = formatCurrency(totalMonthlyDebt);
    previewDti.textContent = backEndDti.toFixed(1) + '%';

    // Update DTI color class
    previewDti.classList.remove('excellent', 'good', 'fair', 'poor', 'danger');
    previewDti.classList.add(getDtiClass(backEndDti));
  }

  function calculateTotal(type) {
    const items = getArrayForType(type);
    return items.reduce((sum, item) => {
      const amount = parseFloat(document.querySelector(`#${item.id}-amount`)?.value) || 0;
      return sum + amount;
    }, 0);
  }

  function getDtiClass(dti) {
    if (dti <= 28) return 'excellent';
    if (dti <= 36) return 'good';
    if (dti <= 43) return 'fair';
    if (dti <= 50) return 'poor';
    return 'danger';
  }

  function getDtiStatus(dti) {
    if (dti <= 28) return { class: 'excellent', label: 'Excellent - Strong Position' };
    if (dti <= 36) return { class: 'good', label: 'Good - Meets Most Lender Requirements' };
    if (dti <= 43) return { class: 'fair', label: 'Fair - May Qualify with Strong Credit' };
    if (dti <= 50) return { class: 'poor', label: 'High - Limited Loan Options' };
    return { class: 'danger', label: 'Very High - Difficult to Qualify' };
  }

  function calculateResults() {
    // Get all data
    const incomeData = getItemData('income');
    const housingData = getItemData('housing');
    const debtData = getItemData('debt');
    const assetsData = getItemData('assets');
    const proposedData = getItemData('proposed');

    const totalIncome = incomeData.reduce((sum, i) => sum + i.amount, 0);
    const totalHousing = housingData.reduce((sum, i) => sum + i.amount, 0);
    const totalDebt = debtData.reduce((sum, i) => sum + i.amount, 0);
    const totalAssets = assetsData.reduce((sum, i) => sum + i.amount, 0);
    const totalProposed = proposedData.reduce((sum, i) => sum + i.amount, 0);
    
    // Total monthly obligations
    const totalMonthlyDebt = totalHousing + totalDebt;
    const totalWithProposed = totalMonthlyDebt + totalProposed;

    // Calculate DTI ratios
    const frontEndDti = totalIncome > 0 ? (totalHousing / totalIncome) * 100 : 0;
    const backEndDti = totalIncome > 0 ? (totalMonthlyDebt / totalIncome) * 100 : 0;
    const projectedDti = totalIncome > 0 ? (totalWithProposed / totalIncome) * 100 : 0;

    // Calculate remaining income
    const remainingIncome = totalIncome - totalMonthlyDebt;
    const remainingPercent = totalIncome > 0 ? (remainingIncome / totalIncome) * 100 : 0;

    // Save to URL
    saveToURL();

    // Generate results
    const results = {
      income: { data: incomeData, total: totalIncome },
      housing: { data: housingData, total: totalHousing },
      debt: { data: debtData, total: totalDebt },
      assets: { data: assetsData, total: totalAssets },
      proposed: { data: proposedData, total: totalProposed },
      totalMonthlyDebt,
      totalWithProposed,
      frontEndDti,
      backEndDti,
      projectedDti,
      remainingIncome,
      remainingPercent
    };

    renderResults(results);
  }

  function getItemData(type) {
    const items = getArrayForType(type);
    return items.map(item => ({
      id: item.id,
      name: document.querySelector(`#${item.id}-name`)?.value || 'Unnamed',
      category: document.querySelector(`#${item.id}-category`)?.value || '',
      amount: parseFloat(document.querySelector(`#${item.id}-amount`)?.value) || 0
    })).filter(i => i.amount > 0 || i.name);
  }

  function renderResults(results) {
    const { income, housing, debt, assets, proposed, totalMonthlyDebt, totalWithProposed, 
            frontEndDti, backEndDti, projectedDti, remainingIncome, remainingPercent } = results;

    // Get status information
    const frontEndStatus = getDtiStatus(frontEndDti);
    const backEndStatus = getDtiStatus(backEndDti);
    const projectedStatus = getDtiStatus(projectedDti);

    // Calculate percentages for breakdown bar
    const housingPercent = income.total > 0 ? (housing.total / income.total) * 100 : 0;
    const debtPercent = income.total > 0 ? (debt.total / income.total) * 100 : 0;
    const proposedPercent = income.total > 0 ? (proposed.total / income.total) * 100 : 0;

    // Generate insights
    const insights = generateInsights(results);

    const html = `
      <div class="result-header-actions">
        <h3>📊 Your DTI Analysis</h3>
        <div class="result-actions">
          <button type="button" id="print-results" class="btn-action">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9V2h12v7"/>
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print
          </button>
        </div>
      </div>

      <!-- DTI Hero -->
      <div class="dti-hero ${backEndStatus.class}">
        <div class="dti-label">Back-End Debt-to-Income Ratio</div>
        <div class="dti-value ${backEndStatus.class}">${backEndDti.toFixed(1)}%</div>
        <div class="dti-status ${backEndStatus.class}">${backEndStatus.label}</div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card income-card">
          <div class="summary-card-icon">💵</div>
          <div class="summary-card-value">${formatCurrency(income.total)}</div>
          <div class="summary-card-label">Monthly Income</div>
        </div>
        <div class="summary-card housing-card">
          <div class="summary-card-icon">🏠</div>
          <div class="summary-card-value">${formatCurrency(housing.total)}</div>
          <div class="summary-card-label">Housing Costs</div>
          <div class="summary-card-percent">${frontEndDti.toFixed(1)}% of income</div>
        </div>
        <div class="summary-card debt-card">
          <div class="summary-card-icon">💳</div>
          <div class="summary-card-value">${formatCurrency(debt.total)}</div>
          <div class="summary-card-label">Other Debts</div>
          <div class="summary-card-percent">${debtPercent.toFixed(1)}% of income</div>
        </div>
        <div class="summary-card total-card">
          <div class="summary-card-icon">📊</div>
          <div class="summary-card-value">${formatCurrency(totalMonthlyDebt)}</div>
          <div class="summary-card-label">Total Monthly Debt</div>
          <div class="summary-card-percent">${backEndDti.toFixed(1)}% DTI</div>
        </div>
      </div>

      <!-- DTI Meters -->
      <div class="dti-analysis">
        <h4>📈 DTI Ratio Analysis</h4>
        <div class="dti-meters">
          <div class="dti-meter">
            <h5>Front-End DTI (Housing Only)</h5>
            <div class="meter-container">
              <div class="meter-bar">
                <div class="meter-fill ${frontEndStatus.class}" style="width: ${Math.min(frontEndDti, 100)}%">
                  <span class="meter-value">${frontEndDti.toFixed(1)}%</span>
                </div>
              </div>
              <div class="meter-markers">
                <span class="marker">0%</span>
                <span class="marker">28%</span>
                <span class="marker">36%</span>
                <span class="marker">50%+</span>
              </div>
            </div>
            <div class="meter-status ${frontEndDti <= 28 ? 'text-success' : frontEndDti <= 36 ? 'text-warning' : 'text-danger'}">
              ${frontEndDti <= 28 ? '✓ Within recommended 28% limit' : frontEndDti <= 36 ? '⚠ Above recommended 28%' : '⚠ High housing costs'}
            </div>
          </div>
          <div class="dti-meter">
            <h5>Back-End DTI (All Debts)</h5>
            <div class="meter-container">
              <div class="meter-bar">
                <div class="meter-fill ${backEndStatus.class}" style="width: ${Math.min(backEndDti, 100)}%">
                  <span class="meter-value">${backEndDti.toFixed(1)}%</span>
                </div>
              </div>
              <div class="meter-markers">
                <span class="marker">0%</span>
                <span class="marker">36%</span>
                <span class="marker">43%</span>
                <span class="marker">50%+</span>
              </div>
            </div>
            <div class="meter-status ${backEndDti <= 36 ? 'text-success' : backEndDti <= 43 ? 'text-warning' : 'text-danger'}">
              ${backEndDti <= 36 ? '✓ Within recommended 36% limit' : backEndDti <= 43 ? '⚠ Above recommended, may qualify' : '⚠ May have difficulty qualifying'}
            </div>
          </div>
        </div>
      </div>

      <!-- Income Breakdown Visual -->
      <div class="breakdown-section">
        <h4>📊 Income Allocation Breakdown</h4>
        <div class="breakdown-bar">
          <div class="breakdown-bar-header">
            <span>How your income is allocated</span>
            <span>${formatCurrency(income.total)}/month</span>
          </div>
          <div class="breakdown-bar-track">
            ${housingPercent > 0 ? `<div class="breakdown-bar-segment housing" style="width: ${Math.min(housingPercent, 100)}%">${housingPercent >= 8 ? housingPercent.toFixed(0) + '%' : ''}</div>` : ''}
            ${debtPercent > 0 ? `<div class="breakdown-bar-segment debts" style="width: ${Math.min(debtPercent, 100)}%">${debtPercent >= 8 ? debtPercent.toFixed(0) + '%' : ''}</div>` : ''}
            ${proposed.total > 0 ? `<div class="breakdown-bar-segment proposed" style="width: ${Math.min(proposedPercent, 100)}%">${proposedPercent >= 8 ? proposedPercent.toFixed(0) + '%' : ''}</div>` : ''}
            ${remainingPercent > 0 ? `<div class="breakdown-bar-segment remaining" style="width: ${Math.min(remainingPercent - (proposed.total > 0 ? proposedPercent : 0), 100)}%">${remainingPercent >= 8 ? (remainingPercent - (proposed.total > 0 ? proposedPercent : 0)).toFixed(0) + '%' : ''}</div>` : ''}
          </div>
        </div>
        <div class="breakdown-legend">
          <div class="legend-item">
            <span class="legend-color housing"></span>
            <span>Housing (${formatCurrency(housing.total)})</span>
          </div>
          <div class="legend-item">
            <span class="legend-color debts"></span>
            <span>Other Debts (${formatCurrency(debt.total)})</span>
          </div>
          ${proposed.total > 0 ? `
            <div class="legend-item">
              <span class="legend-color proposed"></span>
              <span>Proposed (${formatCurrency(proposed.total)})</span>
            </div>
          ` : ''}
          <div class="legend-item">
            <span class="legend-color remaining"></span>
            <span>Remaining (${formatCurrency(Math.max(0, remainingIncome - proposed.total))})</span>
          </div>
        </div>

        <!-- Category Breakdown -->
        <div class="category-breakdown">
          ${renderCategoryBreakdown(income.data, 'Income Sources', '💵')}
          ${renderCategoryBreakdown(housing.data, 'Housing Costs', '🏠')}
          ${renderCategoryBreakdown(debt.data, 'Other Debts', '💳')}
        </div>
      </div>

      <!-- Insights Section -->
      <div class="insights-section">
        <h4>💡 Key Insights & Recommendations</h4>
        <div class="insights-grid">
          ${insights.map(insight => `
            <div class="insight-card ${insight.type}">
              <div class="insight-icon">${insight.icon}</div>
              <div class="insight-content">
                <h5>${insight.title}</h5>
                <p>${insight.message}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      ${proposed.total > 0 ? renderPlanningSection(results) : ''}
      ${assets.total > 0 ? renderNetWorthSection(results) : ''}
    `;

    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
    
    // Re-attach print button listener
    const printBtn = document.getElementById('print-results');
    if (printBtn) {
      printBtn.addEventListener('click', printResults);
    }
  }

  function renderCategoryBreakdown(items, title, icon) {
    if (!items || items.length === 0 || items.every(i => i.amount === 0)) return '';
    
    const total = items.reduce((sum, i) => sum + i.amount, 0);
    
    return `
      <div class="category-group">
        <h5>${icon} ${title}</h5>
        <div class="category-items">
          ${items.filter(i => i.amount > 0).map(item => `
            <div class="category-item">
              <span>${item.name || getCategoryLabel(item.category)}</span>
              <strong>${formatCurrency(item.amount)}</strong>
            </div>
          `).join('')}
          <div class="category-total">
            <span>Total</span>
            <span>${formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    `;
  }

  function getCategoryLabel(categoryValue) {
    const allCategories = [...INCOME_CATEGORIES, ...HOUSING_CATEGORIES, ...DEBT_CATEGORIES, ...ASSET_CATEGORIES, ...PROPOSED_CATEGORIES];
    const found = allCategories.find(c => c.value === categoryValue);
    return found ? found.label : categoryValue;
  }

  function generateInsights(results) {
    const insights = [];
    const { income, housing, debt, frontEndDti, backEndDti, remainingIncome, totalMonthlyDebt } = results;

    // Front-end DTI insight
    if (frontEndDti <= 28) {
      insights.push({
        type: 'insight-success',
        icon: '✅',
        title: 'Housing Costs in Check',
        message: `Your housing costs are ${frontEndDti.toFixed(1)}% of income, within the recommended 28% limit. This is favorable for mortgage applications.`
      });
    } else if (frontEndDti <= 36) {
      insights.push({
        type: 'insight-warning',
        icon: '⚠️',
        title: 'Housing Costs Slightly High',
        message: `At ${frontEndDti.toFixed(1)}%, your housing costs exceed the ideal 28%. Consider this when shopping for homes or refinancing.`
      });
    } else {
      insights.push({
        type: 'insight-danger',
        icon: '🚨',
        title: 'High Housing Costs',
        message: `Housing costs of ${frontEndDti.toFixed(1)}% significantly exceed guidelines. This may limit mortgage options or require a co-signer.`
      });
    }

    // Back-end DTI insight
    if (backEndDti <= 36) {
      insights.push({
        type: 'insight-success',
        icon: '🎯',
        title: 'Strong DTI Position',
        message: `Your total DTI of ${backEndDti.toFixed(1)}% qualifies you for most conventional loan programs with favorable terms.`
      });
    } else if (backEndDti <= 43) {
      insights.push({
        type: 'insight-info',
        icon: '💡',
        title: 'Moderate DTI',
        message: `At ${backEndDti.toFixed(1)}%, you may qualify for FHA loans or conventional loans with strong credit. Some lenders allow up to 43%.`
      });
    } else if (backEndDti <= 50) {
      insights.push({
        type: 'insight-warning',
        icon: '⚠️',
        title: 'High DTI Ratio',
        message: `A ${backEndDti.toFixed(1)}% DTI limits options. Focus on paying down existing debt before taking on new obligations.`
      });
    } else {
      insights.push({
        type: 'insight-danger',
        icon: '🚨',
        title: 'Critical DTI Level',
        message: `At ${backEndDti.toFixed(1)}%, qualifying for new credit will be very difficult. Prioritize debt reduction strategies.`
      });
    }

    // Cash flow insight
    if (remainingIncome > 0) {
      const remainingPercent = (remainingIncome / income.total) * 100;
      if (remainingPercent >= 30) {
        insights.push({
          type: 'insight-success',
          icon: '💰',
          title: 'Healthy Cash Flow',
          message: `You have ${formatCurrency(remainingIncome)} (${remainingPercent.toFixed(0)}%) remaining after debt payments for savings, emergencies, and lifestyle.`
        });
      } else if (remainingPercent >= 15) {
        insights.push({
          type: 'insight-info',
          icon: '📊',
          title: 'Manageable Cash Flow',
          message: `After debts, ${formatCurrency(remainingIncome)} (${remainingPercent.toFixed(0)}%) remains. Consider building an emergency fund if you haven't already.`
        });
      } else {
        insights.push({
          type: 'insight-warning',
          icon: '⚠️',
          title: 'Tight Cash Flow',
          message: `Only ${formatCurrency(remainingIncome)} (${remainingPercent.toFixed(0)}%) remains after debts. This leaves little room for unexpected expenses.`
        });
      }
    } else {
      insights.push({
        type: 'insight-danger',
        icon: '🚨',
        title: 'Negative Cash Flow',
        message: `Your debts exceed your income by ${formatCurrency(Math.abs(remainingIncome))}. Immediate action is needed to reduce expenses or increase income.`
      });
    }

    // Debt reduction tip
    if (debt.total > 0 && backEndDti > 36) {
      const targetDebtReduction = totalMonthlyDebt - (income.total * 0.36);
      if (targetDebtReduction > 0) {
        insights.push({
          type: 'insight-info',
          icon: '📉',
          title: 'DTI Improvement Target',
          message: `Reducing monthly debt payments by ${formatCurrency(targetDebtReduction)} would bring your DTI to the recommended 36% level.`
        });
      }
    }

    return insights;
  }

  function renderPlanningSection(results) {
    const { backEndDti, projectedDti, proposed } = results;
    const projectedStatus = getDtiStatus(projectedDti);
    
    return `
      <div class="planning-results">
        <h4>🎯 Planning: Impact of Proposed Debt</h4>
        <div class="planning-comparison">
          <div class="planning-card">
            <div class="planning-card-label">Current DTI</div>
            <div class="planning-card-value" style="color: ${getDtiColor(backEndDti)}">${backEndDti.toFixed(1)}%</div>
          </div>
          <div class="planning-arrow">→</div>
          <div class="planning-card">
            <div class="planning-card-label">Projected DTI</div>
            <div class="planning-card-value" style="color: ${getDtiColor(projectedDti)}">${projectedDti.toFixed(1)}%</div>
          </div>
        </div>
        <div style="text-align: center; margin-top: var(--space-lg);">
          <span class="dti-status ${projectedStatus.class}">${projectedStatus.label}</span>
        </div>
        <p style="text-align: center; margin-top: var(--space-md); font-size: var(--text-sm); color: var(--color-gray-dark);">
          Adding ${formatCurrency(proposed.total)}/month in new debt would increase your DTI by ${(projectedDti - backEndDti).toFixed(1)} percentage points.
        </p>
      </div>
    `;
  }

  function renderNetWorthSection(results) {
    const { assets, housing, debt, totalMonthlyDebt } = results;
    
    // Estimate total debt balance (rough estimate: monthly payment * 12 * average loan term)
    // This is a simplified estimate; real calculation would need actual balances
    const estimatedDebtBalance = totalMonthlyDebt * 12 * 5; // Rough 5-year average
    const netWorth = assets.total - estimatedDebtBalance;
    const debtToAssetRatio = assets.total > 0 ? (estimatedDebtBalance / assets.total) * 100 : 0;
    
    return `
      <div class="networth-section">
        <h4>📈 Net Worth & Asset Analysis</h4>
        <div class="networth-grid">
          <div class="networth-card">
            <div class="networth-icon">💰</div>
            <div class="networth-label">Total Assets</div>
            <div class="networth-value">${formatCurrency(assets.total)}</div>
          </div>
          <div class="networth-card">
            <div class="networth-icon">📊</div>
            <div class="networth-label">Debt-to-Asset Ratio</div>
            <div class="networth-value ${debtToAssetRatio <= 50 ? 'positive' : 'negative'}">
              ${debtToAssetRatio.toFixed(1)}%
            </div>
          </div>
          <div class="networth-card">
            <div class="networth-icon">🏦</div>
            <div class="networth-label">Monthly Debt Service</div>
            <div class="networth-value">${formatCurrency(totalMonthlyDebt)}</div>
          </div>
          <div class="networth-card">
            <div class="networth-icon">📋</div>
            <div class="networth-label">Asset Categories</div>
            <div class="networth-value">${assets.data.filter(a => a.amount > 0).length}</div>
          </div>
        </div>
        <p style="text-align: center; margin-top: var(--space-lg); font-size: var(--text-sm); color: var(--color-gray-dark);">
          Note: Assets don't affect DTI calculations, but are important for overall financial health and loan reserves.
        </p>
      </div>
    `;
  }

  function getDtiColor(dti) {
    if (dti <= 28) return '#4CAF50';
    if (dti <= 36) return '#8BC34A';
    if (dti <= 43) return '#FFC107';
    if (dti <= 50) return '#FF9800';
    return '#F44336';
  }

  function saveToURL() {
    const params = new URLSearchParams();

    // Save income
    const incomeData = getItemData('income').filter(i => i.name || i.amount);
    if (incomeData.length > 0) {
      params.set('income', JSON.stringify(incomeData));
    }

    // Save housing
    const housingData = getItemData('housing').filter(i => i.name || i.amount);
    if (housingData.length > 0) {
      params.set('housing', JSON.stringify(housingData));
    }

    // Save debt
    const debtData = getItemData('debt').filter(i => i.name || i.amount);
    if (debtData.length > 0) {
      params.set('debt', JSON.stringify(debtData));
    }

    // Save assets
    const assetsData = getItemData('assets').filter(i => i.name || i.amount);
    if (assetsData.length > 0) {
      params.set('assets', JSON.stringify(assetsData));
    }

    // Save proposed
    const proposedData = getItemData('proposed').filter(i => i.name || i.amount);
    if (proposedData.length > 0) {
      params.set('proposed', JSON.stringify(proposedData));
    }

    // Update URL without reloading
    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newURL);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    const types = ['income', 'housing', 'debt', 'assets', 'proposed'];
    
    types.forEach(type => {
      if (params.has(type)) {
        try {
          const data = JSON.parse(params.get(type));
          data.forEach(item => {
            addItem(type, {
              id: item.id,
              name: item.name,
              category: item.category,
              amount: item.amount
            });
          });
        } catch (e) {
          console.error(`Error parsing ${type} data:`, e);
        }
      }
    });

    // Auto-calculate if we loaded data
    if (params.toString()) {
      setTimeout(() => {
        updateTotals();
      }, 100);
    }
  }

  function clearForm() {
    if (!confirm('Clear all DTI entries? This cannot be undone.')) return;

    // Clear arrays
    income = [];
    housing = [];
    debt = [];
    assets = [];
    proposed = [];
    counters = { income: 0, housing: 0, debt: 0, assets: 0, proposed: 0 };

    // Clear containers
    incomeContainer.innerHTML = '';
    housingContainer.innerHTML = '';
    debtContainer.innerHTML = '';
    assetsContainer.innerHTML = '';
    proposedContainer.innerHTML = '';

    // Add default rows
    addItem('income');
    addItem('housing');
    addItem('debt');

    // Reset totals
    updateTotals();

    // Hide results
    resultDiv.classList.add('hidden');

    // Clear URL
    window.history.replaceState({}, '', window.location.pathname);
  }

  async function shareCalculation() {
    const url = window.location.href;

    const shareData = {
      title: 'Debt-to-Income Calculator',
      text: 'Check out my DTI calculation',
      url: url
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        showNotification('Shared successfully!');
      } else {
        await navigator.clipboard.writeText(url);
        showNotification('Link copied to clipboard!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err);
        fallbackCopyToClipboard(url);
      }
    }
  }

  function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      showNotification('Link copied to clipboard!');
    } catch (err) {
      console.error('Fallback copy failed:', err);
      alert('Unable to copy link. Please copy the URL manually.');
    }

    document.body.removeChild(textArea);
  }

  function showNotification(message) {
    const existing = document.querySelector('.copy-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--color-success, #4CAF50);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 10000;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  function printResults() {
    window.print();
  }

  // Utility functions
  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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