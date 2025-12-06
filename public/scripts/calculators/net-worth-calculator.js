// Net Worth Calculator with URL State Management
(function() {
  'use strict';

  // Asset and Liability Categories
  const ASSET_CATEGORIES = [
    { value: 'cash', label: 'Cash & Bank Accounts', icon: '🏦' },
    { value: 'investments', label: 'Investments & Retirement', icon: '📈' },
    { value: 'real-estate', label: 'Real Estate', icon: '🏠' },
    { value: 'vehicles', label: 'Vehicles', icon: '🚗' },
    { value: 'personal-property', label: 'Personal Property', icon: '💎' },
    { value: 'business', label: 'Business Interests', icon: '💼' },
    { value: 'other-assets', label: 'Other Assets', icon: '📦' }
  ];

  const LIABILITY_CATEGORIES = [
    { value: 'mortgage', label: 'Mortgage', icon: '🏠' },
    { value: 'auto-loan', label: 'Auto Loans', icon: '🚗' },
    { value: 'student-loan', label: 'Student Loans', icon: '🎓' },
    { value: 'credit-card', label: 'Credit Cards', icon: '💳' },
    { value: 'personal-loan', label: 'Personal Loans', icon: '🤝' },
    { value: 'medical-debt', label: 'Medical Debt', icon: '🏥' },
    { value: 'other-debt', label: 'Other Debt', icon: '📋' }
  ];

  // Category colors for charts
  const ASSET_COLORS = {
    'cash': '#4CAF50',
    'investments': '#2196F3',
    'real-estate': '#9C27B0',
    'vehicles': '#FF9800',
    'personal-property': '#E91E63',
    'business': '#00BCD4',
    'other-assets': '#607D8B'
  };

  const LIABILITY_COLORS = {
    'mortgage': '#F44336',
    'auto-loan': '#E91E63',
    'student-loan': '#9C27B0',
    'credit-card': '#673AB7',
    'personal-loan': '#3F51B5',
    'medical-debt': '#FF5722',
    'other-debt': '#795548'
  };

  // State
  let assets = [];
  let liabilities = [];
  let assetCounter = 0;
  let liabilityCounter = 0;

  // DOM Elements
  const assetsContainer = document.getElementById('assets-container');
  const liabilitiesContainer = document.getElementById('liabilities-container');
  const addAssetBtn = document.getElementById('add-asset-btn');
  const addLiabilityBtn = document.getElementById('add-liability-btn');
  const calculateBtn = document.getElementById('calculate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const shareBtn = document.getElementById('share-calculation');
  const resultDiv = document.getElementById('net-worth-result');
  const totalAssetsDisplay = document.getElementById('total-assets-display');
  const totalLiabilitiesDisplay = document.getElementById('total-liabilities-display');
  const netWorthPreview = document.getElementById('net-worth-preview');

  // Initialize
  init();

  function init() {
    // Load from URL first
    loadFromURL();

    // If no data loaded from URL, add default rows
    if (assets.length === 0) {
      addAsset();
    }
    if (liabilities.length === 0) {
      addLiability();
    }

    // Event listeners
    addAssetBtn.addEventListener('click', () => addAsset());
    addLiabilityBtn.addEventListener('click', () => addLiability());
    calculateBtn.addEventListener('click', () => {
      calculateResults();
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    clearBtn.addEventListener('click', clearForm);
    shareBtn.addEventListener('click', shareCalculation);

    // Update preview on load
    updateTotals();
  }

  function addAsset(data = null) {
    assetCounter++;
    const assetId = data?.id || `asset-${assetCounter}`;

    const asset = {
      id: assetId,
      name: data?.name || '',
      category: data?.category || 'cash',
      value: data?.value || ''
    };

    assets.push(asset);

    const assetRow = document.createElement('div');
    assetRow.className = 'item-row asset-row';
    assetRow.dataset.itemId = assetId;

    assetRow.innerHTML = `
      <div class="item-header">
        <span class="item-number">Asset #${assets.length}</span>
        <button type="button" class="remove-item-btn" data-item-id="${assetId}" data-type="asset">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${assetId}-name">
            Asset Name <span class="required">*</span>
          </label>
          <input 
            type="text" 
            id="${assetId}-name" 
            class="form-input item-name"
            placeholder="e.g., Chase Checking Account"
            value="${asset.name}"
            data-item-id="${assetId}"
            required
          />
          <small class="form-help">Describe this asset</small>
        </div>
        <div class="form-group">
          <label for="${assetId}-category">
            Category <span class="required">*</span>
          </label>
          <select id="${assetId}-category" class="form-select item-category" data-item-id="${assetId}">
            ${ASSET_CATEGORIES.map(cat => `
              <option value="${cat.value}" ${asset.category === cat.value ? 'selected' : ''}>
                ${cat.icon} ${cat.label}
              </option>
            `).join('')}
          </select>
          <small class="form-help">Type of asset</small>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${assetId}-value">
            Current Value <span class="required">*</span>
          </label>
          <div class="input-with-addon">
            <span class="input-addon">$</span>
            <input 
              type="number" 
              id="${assetId}-value" 
              class="form-input item-value"
              placeholder="10000"
              min="0"
              step="100"
              value="${asset.value}"
              data-item-id="${assetId}"
              required
            />
          </div>
          <small class="form-help">Current market value</small>
        </div>
      </div>
    `;

    assetsContainer.appendChild(assetRow);

    // Add event listeners
    const nameInput = assetRow.querySelector('.item-name');
    const categorySelect = assetRow.querySelector('.item-category');
    const valueInput = assetRow.querySelector('.item-value');
    const removeBtn = assetRow.querySelector('.remove-item-btn');

    nameInput.addEventListener('input', debounce(() => {
      updateItemData(assetId, 'asset');
      saveToURL();
    }, 500));

    categorySelect.addEventListener('change', () => {
      updateItemData(assetId, 'asset');
      saveToURL();
    });

    valueInput.addEventListener('input', debounce(() => {
      updateItemData(assetId, 'asset');
      updateTotals();
      saveToURL();
    }, 300));

    removeBtn.addEventListener('click', () => removeItem(assetId, 'asset'));

    updateItemNumbers('asset');
  }

  function addLiability(data = null) {
    liabilityCounter++;
    const liabilityId = data?.id || `liability-${liabilityCounter}`;

    const liability = {
      id: liabilityId,
      name: data?.name || '',
      category: data?.category || 'credit-card',
      value: data?.value || ''
    };

    liabilities.push(liability);

    const liabilityRow = document.createElement('div');
    liabilityRow.className = 'item-row liability-row';
    liabilityRow.dataset.itemId = liabilityId;

    liabilityRow.innerHTML = `
      <div class="item-header">
        <span class="item-number">Liability #${liabilities.length}</span>
        <button type="button" class="remove-item-btn" data-item-id="${liabilityId}" data-type="liability">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${liabilityId}-name">
            Liability Name <span class="required">*</span>
          </label>
          <input 
            type="text" 
            id="${liabilityId}-name" 
            class="form-input item-name"
            placeholder="e.g., Chase Visa Card"
            value="${liability.name}"
            data-item-id="${liabilityId}"
            required
          />
          <small class="form-help">Describe this liability</small>
        </div>
        <div class="form-group">
          <label for="${liabilityId}-category">
            Category <span class="required">*</span>
          </label>
          <select id="${liabilityId}-category" class="form-select item-category" data-item-id="${liabilityId}">
            ${LIABILITY_CATEGORIES.map(cat => `
              <option value="${cat.value}" ${liability.category === cat.value ? 'selected' : ''}>
                ${cat.icon} ${cat.label}
              </option>
            `).join('')}
          </select>
          <small class="form-help">Type of debt</small>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${liabilityId}-value">
            Amount Owed <span class="required">*</span>
          </label>
          <div class="input-with-addon">
            <span class="input-addon">$</span>
            <input 
              type="number" 
              id="${liabilityId}-value" 
              class="form-input item-value"
              placeholder="5000"
              min="0"
              step="100"
              value="${liability.value}"
              data-item-id="${liabilityId}"
              required
            />
          </div>
          <small class="form-help">Current balance owed</small>
        </div>
      </div>
    `;

    liabilitiesContainer.appendChild(liabilityRow);

    // Add event listeners
    const nameInput = liabilityRow.querySelector('.item-name');
    const categorySelect = liabilityRow.querySelector('.item-category');
    const valueInput = liabilityRow.querySelector('.item-value');
    const removeBtn = liabilityRow.querySelector('.remove-item-btn');

    nameInput.addEventListener('input', debounce(() => {
      updateItemData(liabilityId, 'liability');
      saveToURL();
    }, 500));

    categorySelect.addEventListener('change', () => {
      updateItemData(liabilityId, 'liability');
      saveToURL();
    });

    valueInput.addEventListener('input', debounce(() => {
      updateItemData(liabilityId, 'liability');
      updateTotals();
      saveToURL();
    }, 300));

    removeBtn.addEventListener('click', () => removeItem(liabilityId, 'liability'));

    updateItemNumbers('liability');
  }

  function updateItemData(itemId, type) {
    const items = type === 'asset' ? assets : liabilities;
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const nameInput = document.querySelector(`#${itemId}-name`);
    const categorySelect = document.querySelector(`#${itemId}-category`);
    const valueInput = document.querySelector(`#${itemId}-value`);

    if (nameInput) item.name = nameInput.value;
    if (categorySelect) item.category = categorySelect.value;
    if (valueInput) item.value = valueInput.value;
  }

  function removeItem(itemId, type) {
    if (type === 'asset') {
      assets = assets.filter(a => a.id !== itemId);
      if (assets.length === 0) {
        addAsset();
      }
    } else {
      liabilities = liabilities.filter(l => l.id !== itemId);
      if (liabilities.length === 0) {
        addLiability();
      }
    }

    const row = document.querySelector(`[data-item-id="${itemId}"]`);
    if (row) row.remove();

    updateItemNumbers(type);
    updateTotals();
    saveToURL();
  }

  function updateItemNumbers(type) {
    const container = type === 'asset' ? assetsContainer : liabilitiesContainer;
    const label = type === 'asset' ? 'Asset' : 'Liability';
    const rows = container.querySelectorAll('.item-row');

    rows.forEach((row, index) => {
      const numberSpan = row.querySelector('.item-number');
      if (numberSpan) {
        numberSpan.textContent = `${label} #${index + 1}`;
      }
    });
  }

  function updateTotals() {
    const totalAssets = calculateTotalAssets();
    const totalLiabilities = calculateTotalLiabilities();
    const netWorth = totalAssets - totalLiabilities;

    totalAssetsDisplay.textContent = formatCurrency(totalAssets);
    totalLiabilitiesDisplay.textContent = formatCurrency(totalLiabilities);
    netWorthPreview.textContent = formatCurrency(netWorth);

    // Update preview styling based on net worth
    netWorthPreview.classList.remove('positive', 'negative');
    if (netWorth > 0) {
      netWorthPreview.classList.add('positive');
    } else if (netWorth < 0) {
      netWorthPreview.classList.add('negative');
    }
  }

  function calculateTotalAssets() {
    return assets.reduce((sum, asset) => {
      const value = parseFloat(document.querySelector(`#${asset.id}-value`)?.value) || 0;
      return sum + value;
    }, 0);
  }

  function calculateTotalLiabilities() {
    return liabilities.reduce((sum, liability) => {
      const value = parseFloat(document.querySelector(`#${liability.id}-value`)?.value) || 0;
      return sum + value;
    }, 0);
  }

  function calculateResults() {
    // Get current values from form
    const assetData = assets.map(asset => ({
      id: asset.id,
      name: document.querySelector(`#${asset.id}-name`)?.value || 'Unnamed Asset',
      category: document.querySelector(`#${asset.id}-category`)?.value || 'other-assets',
      value: parseFloat(document.querySelector(`#${asset.id}-value`)?.value) || 0
    })).filter(a => a.value > 0 || a.name);

    const liabilityData = liabilities.map(liability => ({
      id: liability.id,
      name: document.querySelector(`#${liability.id}-name`)?.value || 'Unnamed Liability',
      category: document.querySelector(`#${liability.id}-category`)?.value || 'other-debt',
      value: parseFloat(document.querySelector(`#${liability.id}-value`)?.value) || 0
    })).filter(l => l.value > 0 || l.name);

    const totalAssets = assetData.reduce((sum, a) => sum + a.value, 0);
    const totalLiabilities = liabilityData.reduce((sum, l) => sum + l.value, 0);
    const netWorth = totalAssets - totalLiabilities;

    // Calculate category breakdowns
    const assetsByCategory = groupByCategory(assetData, ASSET_CATEGORIES);
    const liabilitiesByCategory = groupByCategory(liabilityData, LIABILITY_CATEGORIES);

    // Calculate ratios and insights
    const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets * 100) : 0;
    const liquidAssets = calculateLiquidAssets(assetData);
    const liquidityRatio = totalLiabilities > 0 ? (liquidAssets / totalLiabilities * 100) : 100;

    // Save to URL
    saveToURL();

    // Render results
    renderResults({
      netWorth,
      totalAssets,
      totalLiabilities,
      assetData,
      liabilityData,
      assetsByCategory,
      liabilitiesByCategory,
      debtToAssetRatio,
      liquidAssets,
      liquidityRatio
    });
  }

  function groupByCategory(items, categories) {
    const grouped = {};
    categories.forEach(cat => {
      grouped[cat.value] = {
        label: cat.label,
        icon: cat.icon,
        items: [],
        total: 0
      };
    });

    items.forEach(item => {
      if (grouped[item.category]) {
        grouped[item.category].items.push(item);
        grouped[item.category].total += item.value;
      }
    });

    return grouped;
  }

  function calculateLiquidAssets(assetData) {
    const liquidCategories = ['cash', 'investments'];
    return assetData
      .filter(a => liquidCategories.includes(a.category))
      .reduce((sum, a) => sum + a.value, 0);
  }

  function renderResults(data) {
    const { 
      netWorth, 
      totalAssets, 
      totalLiabilities, 
      assetsByCategory, 
      liabilitiesByCategory,
      debtToAssetRatio,
      liquidAssets,
      liquidityRatio
    } = data;

    const isPositive = netWorth >= 0;
    const statusInfo = getNetWorthStatus(netWorth, totalAssets, debtToAssetRatio);

    const html = `
      <div class="result-header-actions">
        <h3>💎 Your Net Worth Analysis</h3>
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

      <!-- Net Worth Hero -->
      <div class="net-worth-hero ${isPositive ? 'positive' : 'negative'}">
        <div class="net-worth-label">Your Total Net Worth</div>
        <div class="net-worth-value ${isPositive ? 'positive' : 'negative'}">${formatCurrency(netWorth)}</div>
        <div class="net-worth-status ${statusInfo.class}">${statusInfo.label}</div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card assets-card">
          <div class="summary-card-icon">💰</div>
          <div class="summary-card-value">${formatCurrency(totalAssets)}</div>
          <div class="summary-card-label">Total Assets</div>
        </div>
        <div class="summary-card liabilities-card">
          <div class="summary-card-icon">💳</div>
          <div class="summary-card-value">${formatCurrency(totalLiabilities)}</div>
          <div class="summary-card-label">Total Liabilities</div>
        </div>
        <div class="summary-card ratio-card">
          <div class="summary-card-icon">📊</div>
          <div class="summary-card-value">${debtToAssetRatio.toFixed(1)}%</div>
          <div class="summary-card-label">Debt-to-Asset Ratio</div>
        </div>
        <div class="summary-card ratio-card">
          <div class="summary-card-icon">💧</div>
          <div class="summary-card-value">${formatCurrency(liquidAssets)}</div>
          <div class="summary-card-label">Liquid Assets</div>
        </div>
      </div>

      <!-- Visual Comparison -->
      <div class="breakdown-section">
        <h4>📊 Assets vs Liabilities</h4>
        <div class="bar-chart">
          <div class="bar-chart-row">
            <div class="bar-chart-label">Assets</div>
            <div class="bar-chart-track">
              <div class="bar-chart-fill assets" style="width: ${getBarWidth(totalAssets, totalAssets, totalLiabilities)}%"></div>
            </div>
            <div class="bar-chart-value" style="color: var(--color-success)">${formatCurrency(totalAssets)}</div>
          </div>
          <div class="bar-chart-row">
            <div class="bar-chart-label">Liabilities</div>
            <div class="bar-chart-track">
              <div class="bar-chart-fill liabilities" style="width: ${getBarWidth(totalLiabilities, totalAssets, totalLiabilities)}%"></div>
            </div>
            <div class="bar-chart-value" style="color: var(--color-error)">${formatCurrency(totalLiabilities)}</div>
          </div>
        </div>

        <div class="chart-container">
          ${totalAssets > 0 ? `
            <div class="pie-chart-wrapper">
              ${generatePieChart(assetsByCategory, ASSET_COLORS, totalAssets)}
              <div class="pie-chart-center">
                <div class="pie-chart-center-label">Assets</div>
                <div class="pie-chart-center-value">${formatCompactCurrency(totalAssets)}</div>
              </div>
            </div>
          ` : ''}
          
          ${totalLiabilities > 0 ? `
            <div class="pie-chart-wrapper">
              ${generatePieChart(liabilitiesByCategory, LIABILITY_COLORS, totalLiabilities)}
              <div class="pie-chart-center">
                <div class="pie-chart-center-label">Liabilities</div>
                <div class="pie-chart-center-value">${formatCompactCurrency(totalLiabilities)}</div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Category Breakdown -->
      <div class="breakdown-section">
        <h4>📋 Detailed Breakdown</h4>
        <div class="category-breakdown">
          <div>
            <h5 style="color: var(--color-success); margin-bottom: var(--space-md);">💰 Assets by Category</h5>
            ${generateCategoryBreakdown(assetsByCategory, 'asset')}
          </div>
          <div>
            <h5 style="color: var(--color-error); margin-bottom: var(--space-md);">💳 Liabilities by Category</h5>
            ${generateCategoryBreakdown(liabilitiesByCategory, 'liability')}
          </div>
        </div>
      </div>

      <!-- Insights -->
      <div class="insights-section">
        <h4>💡 Financial Insights</h4>
        <div class="insights-grid">
          ${generateInsights(data)}
        </div>
      </div>
    `;

    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');

    // Add print listener
    document.getElementById('print-results')?.addEventListener('click', () => window.print());
  }

  function getNetWorthStatus(netWorth, totalAssets, debtToAssetRatio) {
    if (netWorth < 0) {
      return { label: '⚠️ Negative Net Worth', class: 'negative' };
    }
    if (debtToAssetRatio > 80) {
      return { label: '⚠️ High Debt Level', class: 'poor' };
    }
    if (debtToAssetRatio > 50) {
      return { label: '📊 Moderate Debt', class: 'fair' };
    }
    if (debtToAssetRatio > 20) {
      return { label: '✅ Good Financial Health', class: 'good' };
    }
    return { label: '🌟 Excellent Financial Health', class: 'excellent' };
  }

  function getBarWidth(value, totalAssets, totalLiabilities) {
    const max = Math.max(totalAssets, totalLiabilities);
    if (max === 0) return 0;
    return Math.min(100, (value / max) * 100);
  }

  function generatePieChart(categoryData, colors, total) {
    if (total === 0) return '';

    let currentAngle = 0;
    const paths = [];

    Object.entries(categoryData).forEach(([category, data]) => {
      if (data.total > 0) {
        const percentage = data.total / total;
        const angle = percentage * 360;
        const largeArc = angle > 180 ? 1 : 0;

        const startX = 100 + 80 * Math.cos((currentAngle - 90) * Math.PI / 180);
        const startY = 100 + 80 * Math.sin((currentAngle - 90) * Math.PI / 180);
        const endX = 100 + 80 * Math.cos((currentAngle + angle - 90) * Math.PI / 180);
        const endY = 100 + 80 * Math.sin((currentAngle + angle - 90) * Math.PI / 180);

        if (angle < 360) {
          paths.push(`
            <path 
              d="M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArc} 1 ${endX} ${endY} Z" 
              fill="${colors[category] || '#999'}"
              stroke="white"
              stroke-width="2"
            >
              <title>${data.label}: ${formatCurrency(data.total)} (${(percentage * 100).toFixed(1)}%)</title>
            </path>
          `);
        } else {
          // Full circle
          paths.push(`
            <circle cx="100" cy="100" r="80" fill="${colors[category] || '#999'}">
              <title>${data.label}: ${formatCurrency(data.total)} (100%)</title>
            </circle>
          `);
        }

        currentAngle += angle;
      }
    });

    return `
      <svg viewBox="0 0 200 200" width="200" height="200">
        ${paths.join('')}
      </svg>
    `;
  }

  function generateCategoryBreakdown(categoryData, type) {
    const categories = Object.entries(categoryData)
      .filter(([_, data]) => data.total > 0 || data.items.length > 0)
      .sort((a, b) => b[1].total - a[1].total);

    if (categories.length === 0) {
      return `<p style="color: var(--color-gray-dark); font-style: italic;">No ${type === 'asset' ? 'assets' : 'liabilities'} entered</p>`;
    }

    return categories.map(([category, data]) => `
      <div class="category-card">
        <h5>${data.icon} ${data.label}</h5>
        ${data.items.map(item => `
          <div class="category-item">
            <span class="category-item-name">${item.name || 'Unnamed'}</span>
            <span class="category-item-value">${formatCurrency(item.value)}</span>
          </div>
        `).join('')}
        <div class="category-total">
          <span>Category Total</span>
          <span style="color: ${type === 'asset' ? 'var(--color-success)' : 'var(--color-error)'}">${formatCurrency(data.total)}</span>
        </div>
      </div>
    `).join('');
  }

  function generateInsights(data) {
    const { 
      netWorth, 
      totalAssets, 
      totalLiabilities, 
      debtToAssetRatio, 
      liquidAssets,
      liquidityRatio,
      assetsByCategory,
      liabilitiesByCategory
    } = data;

    const insights = [];

    // Net worth insight
    if (netWorth > 0) {
      insights.push({
        type: 'success',
        icon: '✅',
        title: 'Positive Net Worth',
        text: `You own ${formatCurrency(netWorth)} more than you owe. Keep building your wealth!`
      });
    } else if (netWorth < 0) {
      insights.push({
        type: 'danger',
        icon: '⚠️',
        title: 'Negative Net Worth',
        text: `You owe ${formatCurrency(Math.abs(netWorth))} more than you own. Focus on paying down debt and building assets.`
      });
    }

    // Debt-to-asset ratio insight
    if (debtToAssetRatio < 20) {
      insights.push({
        type: 'success',
        icon: '🎯',
        title: 'Low Debt Ratio',
        text: `Your debt is only ${debtToAssetRatio.toFixed(1)}% of your assets - excellent financial position!`
      });
    } else if (debtToAssetRatio > 80) {
      insights.push({
        type: 'danger',
        icon: '🚨',
        title: 'High Debt Ratio',
        text: `Your debt is ${debtToAssetRatio.toFixed(1)}% of your assets. Consider a debt reduction strategy.`
      });
    } else if (debtToAssetRatio > 50) {
      insights.push({
        type: 'warning',
        icon: '📊',
        title: 'Moderate Debt',
        text: `Your debt-to-asset ratio of ${debtToAssetRatio.toFixed(1)}% is manageable but could be improved.`
      });
    }

    // Liquid assets insight
    if (liquidAssets > 0) {
      const monthsOfExpenses = liquidAssets / (totalLiabilities / 12 || 1);
      if (liquidAssets >= totalLiabilities * 0.5) {
        insights.push({
          type: 'success',
          icon: '💧',
          title: 'Strong Liquidity',
          text: `Your liquid assets of ${formatCurrency(liquidAssets)} provide a solid financial cushion.`
        });
      } else if (liquidAssets < totalLiabilities * 0.1) {
        insights.push({
          type: 'warning',
          icon: '💧',
          title: 'Low Liquidity',
          text: `Consider building more cash reserves. Aim for 3-6 months of expenses in liquid assets.`
        });
      }
    }

    // Real estate insight
    const realEstateValue = assetsByCategory['real-estate']?.total || 0;
    const mortgageValue = liabilitiesByCategory['mortgage']?.total || 0;
    if (realEstateValue > 0) {
      const homeEquity = realEstateValue - mortgageValue;
      insights.push({
        type: 'info',
        icon: '🏠',
        title: 'Home Equity',
        text: `You have ${formatCurrency(homeEquity)} in home equity (${((homeEquity / realEstateValue) * 100).toFixed(0)}% of property value).`
      });
    }

    // Credit card insight
    const creditCardDebt = liabilitiesByCategory['credit-card']?.total || 0;
    if (creditCardDebt > 0) {
      insights.push({
        type: 'warning',
        icon: '💳',
        title: 'Credit Card Debt',
        text: `You have ${formatCurrency(creditCardDebt)} in credit card debt. Prioritize paying this high-interest debt.`
      });
    } else if (totalLiabilities > 0) {
      insights.push({
        type: 'success',
        icon: '💳',
        title: 'No Credit Card Debt',
        text: 'Great job keeping credit card balances at zero!'
      });
    }

    // Investment insight
    const investmentValue = assetsByCategory['investments']?.total || 0;
    if (investmentValue > 0 && totalAssets > 0) {
      const investmentPercent = (investmentValue / totalAssets) * 100;
      insights.push({
        type: 'info',
        icon: '📈',
        title: 'Investment Allocation',
        text: `${investmentPercent.toFixed(0)}% of your assets (${formatCurrency(investmentValue)}) are in investments.`
      });
    } else if (totalAssets > 10000) {
      insights.push({
        type: 'warning',
        icon: '📈',
        title: 'Consider Investing',
        text: 'You may want to consider investing some of your assets for long-term growth.'
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

  function saveToURL() {
    const params = new URLSearchParams();

    // Save assets
    const assetData = assets.map(asset => ({
      id: asset.id,
      name: document.querySelector(`#${asset.id}-name`)?.value || '',
      category: document.querySelector(`#${asset.id}-category`)?.value || 'cash',
      value: document.querySelector(`#${asset.id}-value`)?.value || ''
    })).filter(a => a.name || a.value);

    if (assetData.length > 0) {
      params.set('assets', JSON.stringify(assetData));
    }

    // Save liabilities
    const liabilityData = liabilities.map(liability => ({
      id: liability.id,
      name: document.querySelector(`#${liability.id}-name`)?.value || '',
      category: document.querySelector(`#${liability.id}-category`)?.value || 'credit-card',
      value: document.querySelector(`#${liability.id}-value`)?.value || ''
    })).filter(l => l.name || l.value);

    if (liabilityData.length > 0) {
      params.set('liabilities', JSON.stringify(liabilityData));
    }

    // Update URL without reloading
    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newURL);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    // Load assets
    if (params.has('assets')) {
      try {
        const assetData = JSON.parse(params.get('assets'));
        assetData.forEach(data => {
          addAsset(data);
        });
      } catch (e) {
        console.error('Error parsing asset data:', e);
      }
    }

    // Load liabilities
    if (params.has('liabilities')) {
      try {
        const liabilityData = JSON.parse(params.get('liabilities'));
        liabilityData.forEach(data => {
          addLiability(data);
        });
      } catch (e) {
        console.error('Error parsing liability data:', e);
      }
    }

    // Auto-calculate if we loaded data
    if (params.toString()) {
      setTimeout(() => {
        updateTotals();
      }, 100);
    }
  }

  function clearForm() {
    if (!confirm('Clear all assets and liabilities? This cannot be undone.')) return;

    // Clear arrays
    assets = [];
    liabilities = [];
    assetCounter = 0;
    liabilityCounter = 0;

    // Clear containers
    assetsContainer.innerHTML = '';
    liabilitiesContainer.innerHTML = '';

    // Add default rows
    addAsset();
    addLiability();

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
      title: 'Net Worth Calculator',
      text: 'Check out my net worth calculation',
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