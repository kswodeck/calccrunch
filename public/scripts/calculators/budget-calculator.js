// Budget Calculator with URL State Management
(function() {
  'use strict';

  // Categories
  const INCOME_CATEGORIES = [
    { value: 'salary', label: 'Salary/Wages', icon: '💼' },
    { value: 'freelance', label: 'Freelance/Side Hustle', icon: '💻' },
    { value: 'investments', label: 'Investment Income', icon: '📈' },
    { value: 'rental', label: 'Rental Income', icon: '🏠' },
    { value: 'business', label: 'Business Income', icon: '🏢' },
    { value: 'other-income', label: 'Other Income', icon: '💵' }
  ];

  const NEEDS_CATEGORIES = [
    { value: 'housing', label: 'Housing (Rent/Mortgage)', icon: '🏠' },
    { value: 'utilities', label: 'Utilities', icon: '💡' },
    { value: 'groceries', label: 'Groceries', icon: '🛒' },
    { value: 'transportation', label: 'Transportation', icon: '🚗' },
    { value: 'insurance', label: 'Insurance', icon: '🛡️' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'childcare', label: 'Childcare', icon: '👶' },
    { value: 'min-debt', label: 'Minimum Debt Payments', icon: '💳' },
    { value: 'other-needs', label: 'Other Essentials', icon: '📦' }
  ];

  const WANTS_CATEGORIES = [
    { value: 'dining', label: 'Dining Out', icon: '🍽️' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { value: 'subscriptions', label: 'Subscriptions', icon: '📱' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'hobbies', label: 'Hobbies', icon: '🎨' },
    { value: 'travel', label: 'Travel', icon: '✈️' },
    { value: 'fitness', label: 'Gym/Fitness', icon: '🏋️' },
    { value: 'personal-care', label: 'Personal Care', icon: '💅' },
    { value: 'other-wants', label: 'Other Lifestyle', icon: '✨' }
  ];

  const SAVINGS_CATEGORIES = [
    { value: 'emergency', label: 'Emergency Fund', icon: '🆘' },
    { value: '401k', label: '401(k)/Retirement', icon: '🏦' },
    { value: 'ira', label: 'IRA', icon: '📊' },
    { value: 'investments', label: 'Investments', icon: '📈' },
    { value: 'savings', label: 'General Savings', icon: '🐷' },
    { value: 'extra-debt', label: 'Extra Debt Payments', icon: '💳' },
    { value: 'education', label: 'Education Fund', icon: '🎓' },
    { value: 'other-savings', label: 'Other Savings', icon: '💰' }
  ];

  // Category colors for charts
  const CATEGORY_COLORS = {
    income: '#4CAF50',
    needs: '#2196F3',
    wants: '#FF9800',
    savings: '#9C27B0'
  };

  // State
  let income = [];
  let needs = [];
  let wants = [];
  let savings = [];
  let counters = { income: 0, needs: 0, wants: 0, savings: 0 };

  // DOM Elements
  const incomeContainer = document.getElementById('income-container');
  const needsContainer = document.getElementById('needs-container');
  const wantsContainer = document.getElementById('wants-container');
  const savingsContainer = document.getElementById('savings-container');
  const addIncomeBtn = document.getElementById('add-income-btn');
  const addNeedsBtn = document.getElementById('add-needs-btn');
  const addWantsBtn = document.getElementById('add-wants-btn');
  const addSavingsBtn = document.getElementById('add-savings-btn');
  const calculateBtn = document.getElementById('calculate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const shareBtn = document.getElementById('share-calculation');
  const resultDiv = document.getElementById('budget-result');

  // Display elements
  const totalIncomeDisplay = document.getElementById('total-income-display');
  const totalNeedsDisplay = document.getElementById('total-needs-display');
  const totalWantsDisplay = document.getElementById('total-wants-display');
  const totalSavingsDisplay = document.getElementById('total-savings-display');
  const previewIncome = document.getElementById('preview-income');
  const previewSpending = document.getElementById('preview-spending');
  const previewSavings = document.getElementById('preview-savings');
  const previewBalance = document.getElementById('preview-balance');

  // Initialize
  init();

  function init() {
    loadFromURL();

    // Add default rows if no data loaded
    if (income.length === 0) addItem('income');
    if (needs.length === 0) addItem('needs');
    if (wants.length === 0) addItem('wants');
    if (savings.length === 0) addItem('savings');

    // Event listeners
    addIncomeBtn.addEventListener('click', () => addItem('income'));
    addNeedsBtn.addEventListener('click', () => addItem('needs'));
    addWantsBtn.addEventListener('click', () => addItem('wants'));
    addSavingsBtn.addEventListener('click', () => addItem('savings'));
    
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
            value="${item.name}"
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
            Monthly Amount <span class="required">*</span>
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
          <small class="form-help">Amount per month</small>
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
      case 'needs': return NEEDS_CATEGORIES;
      case 'wants': return WANTS_CATEGORIES;
      case 'savings': return SAVINGS_CATEGORIES;
      default: return [];
    }
  }

  function getArrayForType(type) {
    switch(type) {
      case 'income': return income;
      case 'needs': return needs;
      case 'wants': return wants;
      case 'savings': return savings;
      default: return [];
    }
  }

  function getContainerForType(type) {
    switch(type) {
      case 'income': return incomeContainer;
      case 'needs': return needsContainer;
      case 'wants': return wantsContainer;
      case 'savings': return savingsContainer;
      default: return null;
    }
  }

  function getLabelForType(type) {
    switch(type) {
      case 'income': return 'Income';
      case 'needs': return 'Need';
      case 'wants': return 'Want';
      case 'savings': return 'Savings';
      default: return 'Item';
    }
  }

  function getPlaceholderForType(type) {
    switch(type) {
      case 'income': return 'e.g., Primary Job';
      case 'needs': return 'e.g., Rent';
      case 'wants': return 'e.g., Netflix';
      case 'savings': return 'e.g., 401(k) Contribution';
      default: return '';
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
    
    if (arr.length === 0) {
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
    const totalNeeds = calculateTotal('needs');
    const totalWants = calculateTotal('wants');
    const totalSavings = calculateTotal('savings');
    
    // Spending = Needs + Wants (actual expenses)
    const totalSpending = totalNeeds + totalWants;
    // Unallocated = Income - Spending - Savings
    const unallocated = totalIncome - totalSpending - totalSavings;

    totalIncomeDisplay.textContent = formatCurrency(totalIncome);
    totalNeedsDisplay.textContent = formatCurrency(totalNeeds);
    totalWantsDisplay.textContent = formatCurrency(totalWants);
    totalSavingsDisplay.textContent = formatCurrency(totalSavings);

    previewIncome.textContent = formatCurrency(totalIncome);
    previewSpending.textContent = formatCurrency(totalSpending);
    previewSavings.textContent = formatCurrency(totalSavings);
    previewBalance.textContent = formatCurrency(unallocated);

    // Update balance styling
    previewBalance.classList.remove('positive', 'negative');
    if (unallocated > 0) {
      previewBalance.classList.add('positive');
    } else if (unallocated < 0) {
      previewBalance.classList.add('negative');
    }
  }

  function calculateTotal(type) {
    const items = getArrayForType(type);
    return items.reduce((sum, item) => {
      const amount = parseFloat(document.querySelector(`#${item.id}-amount`)?.value) || 0;
      return sum + amount;
    }, 0);
  }

  function calculateResults() {
    // Get all data
    const incomeData = getItemData('income');
    const needsData = getItemData('needs');
    const wantsData = getItemData('wants');
    const savingsData = getItemData('savings');

    const totalIncome = incomeData.reduce((sum, i) => sum + i.amount, 0);
    const totalNeeds = needsData.reduce((sum, i) => sum + i.amount, 0);
    const totalWants = wantsData.reduce((sum, i) => sum + i.amount, 0);
    const totalSavings = savingsData.reduce((sum, i) => sum + i.amount, 0);
    
    // Spending = money actually spent (needs + wants)
    const totalSpending = totalNeeds + totalWants;
    // Unallocated = income not yet assigned to spending or savings
    const unallocated = totalIncome - totalSpending - totalSavings;

    // Calculate percentages of income
    const needsPercent = totalIncome > 0 ? (totalNeeds / totalIncome) * 100 : 0;
    const wantsPercent = totalIncome > 0 ? (totalWants / totalIncome) * 100 : 0;
    const savingsPercent = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;
    const spendingPercent = totalIncome > 0 ? (totalSpending / totalIncome) * 100 : 0;
    const allocatedPercent = needsPercent + wantsPercent + savingsPercent;

    // Save to URL
    saveToURL();

    // Generate results
    const results = {
      income: { data: incomeData, total: totalIncome },
      needs: { data: needsData, total: totalNeeds, percent: needsPercent },
      wants: { data: wantsData, total: totalWants, percent: wantsPercent },
      savings: { data: savingsData, total: totalSavings, percent: savingsPercent },
      totalSpending,
      spendingPercent,
      unallocated,
      allocatedPercent
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
    const { income, needs, wants, savings, totalSpending, unallocated, allocatedPercent } = results;

    // Determine budget health
    const isOverBudget = unallocated < 0;
    const hasUnallocated = unallocated > 0;
    const statusInfo = getBudgetStatus(needs.percent, wants.percent, savings.percent, unallocated, income.total);

    const html = `
      <div class="result-header-actions">
        <h3>📊 Your Budget Analysis</h3>
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

      <!-- Budget Hero -->
      <div class="budget-hero ${hasUnallocated ? 'surplus' : isOverBudget ? 'deficit' : 'balanced'}">
        <div class="budget-label">${isOverBudget ? 'Over Budget By' : hasUnallocated ? 'Unallocated Funds' : 'Fully Allocated'}</div>
        <div class="budget-value ${hasUnallocated ? 'surplus' : isOverBudget ? 'deficit' : 'balanced'}">${formatCurrency(Math.abs(unallocated))}</div>
        <div class="budget-status ${statusInfo.class}">${statusInfo.label}</div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card income-card">
          <div class="summary-card-icon">💵</div>
          <div class="summary-card-value">${formatCurrency(income.total)}</div>
          <div class="summary-card-label">Total Income</div>
        </div>
        <div class="summary-card needs-card">
          <div class="summary-card-icon">🏠</div>
          <div class="summary-card-value">${formatCurrency(needs.total)}</div>
          <div class="summary-card-label">Needs</div>
          <div class="summary-card-percent">${needs.percent.toFixed(1)}% of income</div>
        </div>
        <div class="summary-card wants-card">
          <div class="summary-card-icon">🎯</div>
          <div class="summary-card-value">${formatCurrency(wants.total)}</div>
          <div class="summary-card-label">Wants</div>
          <div class="summary-card-percent">${wants.percent.toFixed(1)}% of income</div>
        </div>
        <div class="summary-card savings-card">
          <div class="summary-card-icon">💰</div>
          <div class="summary-card-value">${formatCurrency(savings.total)}</div>
          <div class="summary-card-label">Savings</div>
          <div class="summary-card-percent">${savings.percent.toFixed(1)}% of income</div>
        </div>
      </div>

      <!-- 50/30/20 Rule Comparison -->
      <div class="breakdown-section">
        <h4>📐 50/30/20 Budget Rule Comparison</h4>
        <div class="rule-comparison">
          <div class="rule-bar-container">
            <div class="rule-bar-label">
              <span>Your Budget</span>
              <span>${allocatedPercent.toFixed(0)}% allocated</span>
            </div>
            <div class="rule-bar">
              ${generateRuleBar(needs.percent, wants.percent, savings.percent)}
            </div>
          </div>
          <div class="rule-bar-container">
            <div class="rule-bar-label">
              <span>Recommended (50/30/20)</span>
              <span>100% allocated</span>
            </div>
            <div class="rule-bar">
              <div class="rule-segment needs" style="width: 50%">50%</div>
              <div class="rule-segment wants" style="width: 30%">30%</div>
              <div class="rule-segment savings" style="width: 20%">20%</div>
            </div>
          </div>
          <div class="rule-legend">
            <div class="legend-item"><div class="legend-color needs"></div><span>Needs (Target: 50%)</span></div>
            <div class="legend-item"><div class="legend-color wants"></div><span>Wants (Target: 30%)</span></div>
            <div class="legend-item"><div class="legend-color savings"></div><span>Savings (Target: 20%)</span></div>
            ${unallocated > 0 ? '<div class="legend-item"><div class="legend-color unallocated"></div><span>Unallocated</span></div>' : ''}
          </div>
        </div>
      </div>

      <!-- Cash Flow Visualization -->
      <div class="breakdown-section">
        <h4>💸 Monthly Cash Flow</h4>
        <div class="cashflow-chart">
          ${generateCashFlowChart(income.total, totalSpending, savings.total)}
        </div>
      </div>

      <!-- Category Breakdown -->
      <div class="breakdown-section">
        <h4>📋 Detailed Breakdown</h4>
        <div class="category-breakdown">
          ${generateCategoryCard('💵 Income Sources', income.data, income.total, INCOME_CATEGORIES)}
          ${generateCategoryCard('🏠 Needs (Essentials)', needs.data, needs.total, NEEDS_CATEGORIES)}
          ${generateCategoryCard('🎯 Wants (Lifestyle)', wants.data, wants.total, WANTS_CATEGORIES)}
          ${generateCategoryCard('💰 Savings & Investments', savings.data, savings.total, SAVINGS_CATEGORIES)}
        </div>
      </div>

      <!-- Insights Section -->
      <div class="insights-section">
        <h4>💡 Budget Insights & Recommendations</h4>
        <div class="insights-grid">
          ${generateInsights(results)}
        </div>
      </div>

      <!-- Planning Section -->
      <div class="planning-section">
        <h4>🎯 Financial Planning Projections</h4>
        <div class="planning-grid">
          ${generatePlanningCards(results)}
        </div>
      </div>
    `;

    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');

    // Attach event listeners
    document.getElementById('print-results')?.addEventListener('click', () => window.print());
  }

  function generateRuleBar(needsP, wantsP, savingsP) {
    const total = needsP + wantsP + savingsP;
    const remaining = Math.max(0, 100 - total);
    const over = Math.max(0, total - 100);

    let html = '';
    
    if (needsP > 0) {
      html += `<div class="rule-segment needs" style="width: ${Math.min(needsP, 100)}%">${needsP.toFixed(0)}%</div>`;
    }
    if (wantsP > 0) {
      html += `<div class="rule-segment wants" style="width: ${Math.min(wantsP, 100 - needsP)}%">${wantsP.toFixed(0)}%</div>`;
    }
    if (savingsP > 0) {
      html += `<div class="rule-segment savings" style="width: ${Math.min(savingsP, 100 - needsP - wantsP)}%">${savingsP.toFixed(0)}%</div>`;
    }
    if (remaining > 0) {
      html += `<div class="rule-segment unallocated" style="width: ${remaining}%">${remaining.toFixed(0)}%</div>`;
    }

    return html;
  }

  function generateCashFlowChart(income, spending, savings) {
    const maxValue = Math.max(income, spending, savings);
    const incomeWidth = maxValue > 0 ? (income / maxValue) * 100 : 0;
    const spendingWidth = maxValue > 0 ? (spending / maxValue) * 100 : 0;
    const savingsWidth = maxValue > 0 ? (savings / maxValue) * 100 : 0;

    return `
      <div class="cashflow-bar-container">
        <div class="cashflow-label">Income</div>
        <div class="cashflow-track">
          <div class="cashflow-fill income" style="width: ${incomeWidth}%"></div>
        </div>
        <div class="cashflow-value" style="color: #4CAF50">${formatCurrency(income)}</div>
      </div>
      <div class="cashflow-bar-container">
        <div class="cashflow-label">Spending</div>
        <div class="cashflow-track">
          <div class="cashflow-fill expenses" style="width: ${spendingWidth}%"></div>
        </div>
        <div class="cashflow-value" style="color: #F44336">${formatCurrency(spending)}</div>
      </div>
      <div class="cashflow-bar-container">
        <div class="cashflow-label">Savings</div>
        <div class="cashflow-track">
          <div class="cashflow-fill savings" style="width: ${savingsWidth}%"></div>
        </div>
        <div class="cashflow-value" style="color: #9C27B0">${formatCurrency(savings)}</div>
      </div>
    `;
  }

  function generateCategoryCard(title, items, total, categories) {
    if (items.length === 0 || total === 0) {
      return `
        <div class="category-card">
          <h5>${title}</h5>
          <p style="color: var(--color-gray-dark); font-size: var(--text-sm);">No items added</p>
        </div>
      `;
    }

    const categoryMap = {};
    categories.forEach(c => categoryMap[c.value] = c);

    const itemsHtml = items.map(item => {
      const cat = categoryMap[item.category] || { icon: '📦', label: 'Other' };
      return `
        <div class="category-item">
          <span class="category-item-name">${cat.icon} ${item.name || cat.label}</span>
          <span class="category-item-value">${formatCurrency(item.amount)}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="category-card">
        <h5>${title}</h5>
        ${itemsHtml}
        <div class="category-total">
          <span>Total</span>
          <span>${formatCurrency(total)}</span>
        </div>
      </div>
    `;
  }

  function generateInsights(results) {
    const { income, needs, wants, savings, unallocated } = results;
    const insights = [];

    // Over budget insight
    if (unallocated < 0) {
      insights.push({
        type: 'danger',
        icon: '🚨',
        title: 'Over Budget',
        text: `You've allocated ${formatCurrency(Math.abs(unallocated))} more than your income. Review your spending and savings to balance your budget.`
      });
    } else if (unallocated > income.total * 0.05) {
      insights.push({
        type: 'success',
        icon: '✅',
        title: 'Unallocated Funds',
        text: `You have ${formatCurrency(unallocated)} not yet allocated. Consider adding to savings or investments.`
      });
    }

    // Needs insight (target: 50%)
    if (needs.percent > 50) {
      insights.push({
        type: 'warning',
        icon: '⚠️',
        title: 'High Essential Expenses',
        text: `Your needs are ${needs.percent.toFixed(0)}% of income (target: 50%). Look for ways to reduce fixed costs like housing or insurance.`
      });
    } else if (needs.percent <= 50 && needs.percent > 0) {
      insights.push({
        type: 'success',
        icon: '👍',
        title: 'Needs Under Control',
        text: `Your essential expenses are ${needs.percent.toFixed(0)}% of income, within the recommended 50%.`
      });
    }

    // Wants insight (target: 30%)
    if (wants.percent > 30) {
      insights.push({
        type: 'warning',
        icon: '🎯',
        title: 'Lifestyle Spending High',
        text: `Wants are ${wants.percent.toFixed(0)}% of income (target: 30%). Consider reducing dining out or subscriptions.`
      });
    }

    // Savings insight (target: 20%)
    if (savings.percent < 10 && savings.percent >= 0) {
      insights.push({
        type: 'danger',
        icon: '💰',
        title: 'Low Savings Rate',
        text: `You're only saving ${savings.percent.toFixed(0)}% of income. Aim for at least 20% for financial security.`
      });
    } else if (savings.percent >= 20) {
      insights.push({
        type: 'success',
        icon: '🎉',
        title: 'Excellent Savings Rate',
        text: `You're saving ${savings.percent.toFixed(0)}% of your income. Keep it up for long-term wealth building!`
      });
    } else if (savings.percent >= 10) {
      insights.push({
        type: 'info',
        icon: '📈',
        title: 'Good Start on Savings',
        text: `You're saving ${savings.percent.toFixed(0)}% of income. Try to increase to 20% over time.`
      });
    }

    // Emergency fund insight
    const emergencyContribution = savings.data.find(s => s.category === 'emergency');
    if (!emergencyContribution || emergencyContribution.amount === 0) {
      insights.push({
        type: 'info',
        icon: '🆘',
        title: 'Emergency Fund',
        text: 'Consider adding an emergency fund contribution. Aim for 3-6 months of expenses saved.'
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

  function generatePlanningCards(results) {
    const { income, needs, savings, totalSpending } = results;
    
    // Monthly spending for emergency fund calculation (needs + wants)
    const monthlySpending = totalSpending;
    
    // Emergency fund target (6 months of spending)
    const emergencyTarget = monthlySpending * 6;
    const monthlySavingsRate = savings.total;
    const monthsToEmergency = monthlySavingsRate > 0 ? Math.ceil(emergencyTarget / monthlySavingsRate) : 0;

    // Annual savings projection
    const annualSavings = savings.total * 12;

    // Financial independence estimate (25x annual spending)
    const fiTarget = (monthlySpending * 12) * 25;
    const yearsToFI = monthlySavingsRate > 0 ? Math.ceil(fiTarget / (monthlySavingsRate * 12)) : 0;

    return `
      <div class="planning-card">
        <div class="planning-icon">🆘</div>
        <div class="planning-title">Emergency Fund Goal</div>
        <div class="planning-value">${formatCurrency(emergencyTarget)}</div>
        <div class="planning-note">6 months of spending</div>
        ${monthlySavingsRate > 0 ? `<div class="planning-note" style="margin-top: 0.5rem; color: #7B1FA2;">~${monthsToEmergency} months to reach at current rate</div>` : ''}
      </div>
      <div class="planning-card">
        <div class="planning-icon">📅</div>
        <div class="planning-title">Annual Savings</div>
        <div class="planning-value">${formatCurrency(annualSavings)}</div>
        <div class="planning-note">At current monthly rate</div>
      </div>
      <div class="planning-card">
        <div class="planning-icon">🎯</div>
        <div class="planning-title">5-Year Savings</div>
        <div class="planning-value">${formatCurrency(annualSavings * 5)}</div>
        <div class="planning-note">If you maintain this pace</div>
      </div>
      <div class="planning-card">
        <div class="planning-icon">🏖️</div>
        <div class="planning-title">FI Number (25x)</div>
        <div class="planning-value">${formatCompactCurrency(fiTarget)}</div>
        <div class="planning-note">Financial independence target</div>
        ${yearsToFI > 0 && yearsToFI < 100 ? `<div class="planning-note" style="margin-top: 0.5rem; color: #7B1FA2;">~${yearsToFI} years at current savings</div>` : ''}
      </div>
    `;
  }

  function getBudgetStatus(needsP, wantsP, savingsP, unallocated, income) {
    if (unallocated < 0) {
      return { class: 'deficit', label: 'Over Budget - Allocations Exceed Income' };
    }

    const needsOk = needsP <= 55;
    const wantsOk = wantsP <= 35;
    const savingsOk = savingsP >= 15;

    if (needsOk && wantsOk && savingsOk && savingsP >= 20) {
      return { class: 'excellent', label: 'Excellent - Well-Balanced Budget!' };
    } else if (needsOk && wantsOk && savingsOk) {
      return { class: 'good', label: 'Good - Budget is Healthy' };
    } else if (needsOk && savingsP >= 10) {
      return { class: 'fair', label: 'Fair - Room for Improvement' };
    } else {
      return { class: 'poor', label: 'Needs Attention - Review Allocations' };
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();

    // Save income
    const incomeData = getItemData('income').filter(i => i.name || i.amount);
    if (incomeData.length > 0) {
      params.set('income', JSON.stringify(incomeData));
    }

    // Save needs
    const needsData = getItemData('needs').filter(i => i.name || i.amount);
    if (needsData.length > 0) {
      params.set('needs', JSON.stringify(needsData));
    }

    // Save wants
    const wantsData = getItemData('wants').filter(i => i.name || i.amount);
    if (wantsData.length > 0) {
      params.set('wants', JSON.stringify(wantsData));
    }

    // Save savings
    const savingsData = getItemData('savings').filter(i => i.name || i.amount);
    if (savingsData.length > 0) {
      params.set('savings', JSON.stringify(savingsData));
    }

    // Update URL without reloading
    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newURL);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    const types = ['income', 'needs', 'wants', 'savings'];
    
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
    if (!confirm('Clear all budget entries? This cannot be undone.')) return;

    // Clear arrays
    income = [];
    needs = [];
    wants = [];
    savings = [];
    counters = { income: 0, needs: 0, wants: 0, savings: 0 };

    // Clear containers
    incomeContainer.innerHTML = '';
    needsContainer.innerHTML = '';
    wantsContainer.innerHTML = '';
    savingsContainer.innerHTML = '';

    // Add default rows
    addItem('income');
    addItem('needs');
    addItem('wants');
    addItem('savings');

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
      title: 'Budget Calculator',
      text: 'Check out my monthly budget',
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

  // Utility functions
  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  function formatCompactCurrency(value) {
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