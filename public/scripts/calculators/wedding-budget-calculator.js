// Wedding Budget Calculator
(function() {
  'use strict';

  // Category definitions with allocation percentages by style
  const CATEGORIES = {
    venue: {
      id: 'cat-venue',
      name: 'Venue & Catering',
      icon: '🏛️',
      color: '#E91E63',
      allocation: { budget: 0.45, average: 0.45, upscale: 0.48, luxury: 0.50 }
    },
    photo: {
      id: 'cat-photo',
      name: 'Photography & Videography',
      icon: '📸',
      color: '#9C27B0',
      allocation: { budget: 0.10, average: 0.11, upscale: 0.12, luxury: 0.12 }
    },
    music: {
      id: 'cat-music',
      name: 'Music / DJ / Band',
      icon: '🎵',
      color: '#673AB7',
      allocation: { budget: 0.06, average: 0.07, upscale: 0.07, luxury: 0.08 }
    },
    flowers: {
      id: 'cat-flowers',
      name: 'Flowers & Decorations',
      icon: '💐',
      color: '#4CAF50',
      allocation: { budget: 0.06, average: 0.08, upscale: 0.09, luxury: 0.10 }
    },
    attire: {
      id: 'cat-attire',
      name: 'Wedding Attire',
      icon: '👗',
      color: '#00BCD4',
      allocation: { budget: 0.05, average: 0.06, upscale: 0.07, luxury: 0.08 }
    },
    beauty: {
      id: 'cat-beauty',
      name: 'Hair & Makeup',
      icon: '💄',
      color: '#FF5722',
      allocation: { budget: 0.02, average: 0.025, upscale: 0.03, luxury: 0.03 }
    },
    stationery: {
      id: 'cat-stationery',
      name: 'Invitations & Stationery',
      icon: '✉️',
      color: '#795548',
      allocation: { budget: 0.02, average: 0.025, upscale: 0.03, luxury: 0.03 }
    },
    cake: {
      id: 'cat-cake',
      name: 'Wedding Cake / Desserts',
      icon: '🎂',
      color: '#FF9800',
      allocation: { budget: 0.02, average: 0.025, upscale: 0.03, luxury: 0.03 }
    },
    transport: {
      id: 'cat-transport',
      name: 'Transportation',
      icon: '🚗',
      color: '#607D8B',
      allocation: { budget: 0.02, average: 0.02, upscale: 0.025, luxury: 0.03 }
    },
    officiant: {
      id: 'cat-officiant',
      name: 'Officiant',
      icon: '📿',
      color: '#3F51B5',
      allocation: { budget: 0.01, average: 0.01, upscale: 0.01, luxury: 0.01 }
    },
    planner: {
      id: 'cat-planner',
      name: 'Wedding Planner / Coordinator',
      icon: '📋',
      color: '#009688',
      allocation: { budget: 0.03, average: 0.05, upscale: 0.06, luxury: 0.08 }
    },
    favors: {
      id: 'cat-favors',
      name: 'Favors & Gifts',
      icon: '🎁',
      color: '#CDDC39',
      allocation: { budget: 0.015, average: 0.02, upscale: 0.02, luxury: 0.02 }
    },
    rehearsal: {
      id: 'cat-rehearsal',
      name: 'Rehearsal Dinner',
      icon: '🍽️',
      color: '#FFC107',
      allocation: { budget: 0.04, average: 0.05, upscale: 0.06, luxury: 0.08 }
    },
    honeymoon: {
      id: 'cat-honeymoon',
      name: 'Honeymoon Fund',
      icon: '✈️',
      color: '#2196F3',
      allocation: { budget: 0.05, average: 0.07, upscale: 0.08, luxury: 0.10 }
    }
  };

  // Region multipliers
  const REGION_MULTIPLIERS = {
    '1.7': 'NYC / SF / LA',
    '1.4': 'Boston / DC / Chicago / Miami',
    '1.2': 'Denver / Seattle / Austin',
    '1.0': 'National Average',
    '0.8': 'South / Midwest Smaller Cities',
    '0.6': 'Rural Areas'
  };

  // Priority recommendations by style
  const PRIORITIES = {
    budget: {
      splurge: ['Photography (memories last forever)', 'Venue/Food (guest experience)', 'Music (keeps the party going)'],
      save: ['DIY decorations & flowers', 'Digital invitations', 'Skip the planner (use day-of coordinator)', 'Brunch reception instead of dinner', 'Courthouse ceremony']
    },
    average: {
      splurge: ['Photography & videography', 'Venue & catering quality', 'Entertainment (band or premium DJ)'],
      save: ['Seasonal/local flowers', 'Limit guest list strategically', 'Off-peak day (Friday or Sunday)', 'Simple cake + dessert bar', 'Borrow accessories']
    },
    upscale: {
      splurge: ['Premium venue with ambiance', 'Top-tier photographer + videographer', 'Live band', 'Floral design & decor'],
      save: ['Negotiate package deals', 'Digital save-the-dates (print invites only)', 'Honeymoon registry instead of favors', 'Limit cocktail hour extras']
    },
    luxury: {
      splurge: ['Exclusive venue', 'Full planning team', 'Couture attire', 'Luxury florals & design', 'Live entertainment + after-party'],
      save: ['Even luxury weddings benefit from vendor negotiations', 'Package multiple services with same company', 'Consider destination where dollar goes further']
    }
  };

  // Hidden costs estimates as percentage of total budget
  const HIDDEN_COSTS = [
    { name: 'Vendor gratuities (15-20%)', pct: 0.05 },
    { name: 'Sales tax on services', pct: 0.03 },
    { name: 'Overtime fees', pct: 0.02 },
    { name: 'Dress/suit alterations', pct: 0.01 },
    { name: 'Marriage license & fees', flat: 75 },
    { name: 'Vendor meals', perVendor: 50, count: 4 },
    { name: 'Setup/breakdown fees', pct: 0.01 },
    { name: 'Day-of emergencies', pct: 0.02 }
  ];

  // Payment timeline
  const PAYMENT_TIMELINE = [
    { period: '12+ months out', pct: 0.30, vendors: 'Venue deposit, photographer, band/DJ booking fees' },
    { period: '9-12 months', pct: 0.15, vendors: 'Florist, videographer, planner retainer, caterer deposit' },
    { period: '6-9 months', pct: 0.15, vendors: 'Invitations, officiant, transport, cake tasting & deposit' },
    { period: '3-6 months', pct: 0.15, vendors: 'Attire final payment, hair/makeup trial, rental deposits' },
    { period: '1-3 months', pct: 0.15, vendors: 'Final headcount, catering final, all remaining balances' },
    { period: 'Final week', pct: 0.10, vendors: 'Final balances, vendor tips, last-minute needs' }
  ];

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('budget')) setValue('total-budget', params.get('budget'));
    if (params.has('guests')) setValue('guest-count', params.get('guests'));
    if (params.has('region')) setSelectValue('region', params.get('region'));
    if (params.has('season')) setSelectValue('season', params.get('season'));
    if (params.has('style')) setSelectValue('wedding-style', params.get('style'));
    if (params.has('ceremony')) setSelectValue('ceremony-type', params.get('ceremony'));
    if (params.has('date')) setValue('wedding-date', params.get('date'));
    if (params.has('saved')) setValue('amount-saved', params.get('saved'));

    // Load category toggles
    if (params.has('cats')) {
      const enabledCats = params.get('cats').split(',');
      Object.keys(CATEGORIES).forEach(key => {
        const checkbox = document.getElementById(CATEGORIES[key].id);
        if (checkbox) {
          checkbox.checked = enabledCats.includes(key);
        }
      });
    }

    // Auto-calculate if params present
    if (params.toString()) {
      setTimeout(() => calculateBudget(), 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('budget', getValue('total-budget'));
    params.set('guests', getValue('guest-count'));
    params.set('region', getSelectValue('region'));
    params.set('season', getSelectValue('season'));
    params.set('style', getSelectValue('wedding-style'));
    params.set('ceremony', getSelectValue('ceremony-type'));

    const weddingDate = getValue('wedding-date');
    if (weddingDate) params.set('date', weddingDate);

    const amountSaved = getValue('amount-saved');
    if (amountSaved > 0) params.set('saved', amountSaved);

    // Save category toggles
    const enabledCats = [];
    Object.keys(CATEGORIES).forEach(key => {
      const checkbox = document.getElementById(CATEGORIES[key].id);
      if (checkbox && checkbox.checked) enabledCats.push(key);
    });
    params.set('cats', enabledCats.join(','));

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateBudget);
    }

    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }
  }

  function calculateBudget() {
    const totalBudget = parseFloat(getValue('total-budget'));
    const guestCount = parseInt(getValue('guest-count'));
    const regionMultiplier = parseFloat(getSelectValue('region'));
    const season = getSelectValue('season');
    const style = getSelectValue('wedding-style');
    const ceremonyType = getSelectValue('ceremony-type');
    const weddingDate = getValue('wedding-date');
    const amountSaved = parseFloat(getValue('amount-saved')) || 0;

    // Validation
    if (!totalBudget || totalBudget < 1000) {
      alert('Please enter a valid total budget (minimum $1,000).');
      return;
    }
    if (!guestCount || guestCount < 2) {
      alert('Please enter a valid guest count (minimum 2).');
      return;
    }

    // Season multiplier
    const seasonMultiplier = season === 'peak' ? 1.0 : 0.85;

    // Get enabled categories
    const enabledCategories = {};
    let totalAllocation = 0;

    Object.keys(CATEGORIES).forEach(key => {
      const checkbox = document.getElementById(CATEGORIES[key].id);
      if (checkbox && checkbox.checked) {
        enabledCategories[key] = CATEGORIES[key];
        totalAllocation += CATEGORIES[key].allocation[style];
      }
    });

    // Calculate proportional allocations (redistribute to enabled categories)
    const categoryResults = {};
    Object.keys(enabledCategories).forEach(key => {
      const rawPct = enabledCategories[key].allocation[style];
      const adjustedPct = rawPct / totalAllocation; // Normalize to 100%
      const amount = totalBudget * adjustedPct;

      categoryResults[key] = {
        ...enabledCategories[key],
        percentage: adjustedPct,
        amount: amount,
        low: amount * 0.75,
        mid: amount,
        high: amount * 1.30
      };
    });

    // Adjust for ceremony type
    if (ceremonyType === 'courthouse' && categoryResults.venue) {
      // Courthouse saves on venue, redistribute
      categoryResults.venue.amount *= 0.7;
      categoryResults.venue.low *= 0.7;
      categoryResults.venue.high *= 0.7;
    } else if (ceremonyType === 'destination') {
      // Destination increases transport and venue
      if (categoryResults.transport) {
        categoryResults.transport.amount *= 1.5;
        categoryResults.transport.low *= 1.3;
        categoryResults.transport.high *= 1.8;
      }
    }

    // Per-guest cost
    const perGuestCost = totalBudget / guestCount;

    // Hidden costs calculation
    const hiddenCostsTotal = calculateHiddenCosts(totalBudget);

    // Monthly savings plan
    let savingsPlan = null;
    if (weddingDate) {
      savingsPlan = calculateSavingsPlan(totalBudget, amountSaved, weddingDate);
    }

    // Save to URL
    saveToURL();

    // Render results
    renderResults({
      totalBudget,
      guestCount,
      perGuestCost,
      regionMultiplier,
      seasonMultiplier,
      style,
      ceremonyType,
      categoryResults,
      hiddenCostsTotal,
      savingsPlan,
      weddingDate,
      amountSaved
    });
  }

  function calculateHiddenCosts(totalBudget) {
    let total = 0;
    const items = [];

    HIDDEN_COSTS.forEach(cost => {
      let amount = 0;
      if (cost.pct) {
        amount = totalBudget * cost.pct;
      } else if (cost.flat) {
        amount = cost.flat;
      } else if (cost.perVendor) {
        amount = cost.perVendor * cost.count;
      }
      total += amount;
      items.push({ name: cost.name, amount: amount });
    });

    return { total, items };
  }

  function calculateSavingsPlan(totalBudget, amountSaved, weddingDateStr) {
    const weddingDate = new Date(weddingDateStr);
    const today = new Date();
    const monthsUntilWedding = Math.max(1,
      (weddingDate.getFullYear() - today.getFullYear()) * 12 +
      (weddingDate.getMonth() - today.getMonth())
    );

    const remaining = totalBudget - amountSaved;
    const monthlyNeeded = remaining / monthsUntilWedding;
    const weeklyNeeded = monthlyNeeded / 4.33;

    return {
      monthsUntilWedding,
      remaining,
      monthlyNeeded,
      weeklyNeeded,
      amountSaved,
      percentSaved: (amountSaved / totalBudget) * 100
    };
  }

  function renderResults(data) {
    const resultDiv = document.getElementById('wedding-budget-result');
    if (!resultDiv) return;

    const {
      totalBudget, guestCount, perGuestCost, regionMultiplier,
      style, categoryResults, hiddenCostsTotal, savingsPlan
    } = data;

    let html = '';

    // Hero section
    html += `
      <div class="budget-hero">
        <div class="budget-hero-label">Your Wedding Budget</div>
        <div class="budget-hero-value">${formatCurrency(totalBudget)}</div>
        <div class="budget-hero-sub">
          <strong>${formatCurrency(perGuestCost)}</strong> per guest &bull;
          ${guestCount} guests &bull;
          ${REGION_MULTIPLIERS[regionMultiplier.toString()] || 'Custom'} pricing
        </div>
      </div>
    `;

    // Summary cards
    const enabledCount = Object.keys(categoryResults).length;
    html += `
      <div class="summary-cards">
        <div class="summary-card">
          <div class="summary-card-icon">💰</div>
          <div class="summary-card-value">${formatCurrency(totalBudget)}</div>
          <div class="summary-card-label">Total Budget</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">👤</div>
          <div class="summary-card-value">${formatCurrency(perGuestCost)}</div>
          <div class="summary-card-label">Per Guest</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">📋</div>
          <div class="summary-card-value">${enabledCount}</div>
          <div class="summary-card-label">Categories</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">⚠️</div>
          <div class="summary-card-value">${formatCurrency(hiddenCostsTotal.total)}</div>
          <div class="summary-card-label">Est. Hidden Costs</div>
        </div>
      </div>
    `;

    // Donut chart
    html += renderDonutChart(categoryResults, totalBudget);

    // Category breakdown cards
    html += '<h3 style="margin-bottom: var(--space-lg); color: var(--color-primary-blue);">Category Breakdown</h3>';
    html += '<div class="category-breakdown">';
    Object.keys(categoryResults).forEach(key => {
      const cat = categoryResults[key];
      html += `
        <div class="category-card">
          <div class="category-card-header">
            <span class="category-card-name">${cat.icon} ${cat.name}</span>
            <span class="category-card-amount">${formatCurrency(cat.amount)}</span>
          </div>
          <div class="category-card-pct">${(cat.percentage * 100).toFixed(1)}% of budget</div>
          <div class="category-card-range">
            Range: <strong>${formatCurrency(cat.low)}</strong> - <strong>${formatCurrency(cat.high)}</strong>
          </div>
        </div>
      `;
    });
    html += '</div>';

    // Priority recommendations
    html += renderPriorities(style);

    // Hidden costs
    html += renderHiddenCosts(hiddenCostsTotal);

    // Payment timeline
    html += renderPaymentTimeline(totalBudget);

    // Savings plan (if date provided)
    if (savingsPlan) {
      html += renderSavingsPlan(savingsPlan);
    }

    // Tips section
    html += renderTips(style);

    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderDonutChart(categoryResults, totalBudget) {
    const categories = Object.values(categoryResults);
    let cumulativePercent = 0;
    let gradientParts = [];

    categories.forEach(cat => {
      const startPct = cumulativePercent * 100;
      cumulativePercent += cat.percentage;
      const endPct = cumulativePercent * 100;
      gradientParts.push(`${cat.color} ${startPct.toFixed(1)}% ${endPct.toFixed(1)}%`);
    });

    const gradient = `conic-gradient(${gradientParts.join(', ')})`;

    let legendHtml = '';
    categories.forEach(cat => {
      legendHtml += `
        <div class="legend-item">
          <span class="legend-color" style="background: ${cat.color};"></span>
          <span class="legend-text">${cat.icon} ${cat.name}</span>
          <span class="legend-value">${(cat.percentage * 100).toFixed(1)}%</span>
        </div>
      `;
    });

    return `
      <div class="chart-section">
        <h3 style="margin-bottom: var(--space-lg); color: var(--color-primary-blue);">Budget Allocation</h3>
        <div class="donut-container">
          <div class="donut-chart" style="background: ${gradient};">
            <div class="donut-center">
              <span class="donut-center-label">Total</span>
              <span class="donut-center-value">${formatCurrencyShort(totalBudget)}</span>
            </div>
          </div>
          <div class="chart-legend">
            ${legendHtml}
          </div>
        </div>
      </div>
    `;
  }

  function renderPriorities(style) {
    const priorities = PRIORITIES[style];
    let splurgeList = priorities.splurge.map(item => `<li>✨ ${item}</li>`).join('');
    let saveList = priorities.save.map(item => `<li>💡 ${item}</li>`).join('');

    return `
      <div class="priority-section">
        <h4>Priority Recommendations (${style.charAt(0).toUpperCase() + style.slice(1)} Style)</h4>
        <div class="priority-grid">
          <div class="priority-list">
            <h5 style="color: var(--color-primary-blue);">Where to Splurge</h5>
            <ul>${splurgeList}</ul>
          </div>
          <div class="priority-list">
            <h5 style="color: var(--color-success);">Where to Save</h5>
            <ul>${saveList}</ul>
          </div>
        </div>
      </div>
    `;
  }

  function renderHiddenCosts(hiddenCostsTotal) {
    let itemsHtml = '';
    hiddenCostsTotal.items.forEach(item => {
      itemsHtml += `
        <div class="hidden-cost-item">
          <span>${item.name}</span>
          <span>${formatCurrency(item.amount)}</span>
        </div>
      `;
    });

    return `
      <div class="hidden-costs-section">
        <h4>⚠️ Hidden Costs to Budget For: ${formatCurrency(hiddenCostsTotal.total)}</h4>
        <p style="font-size: var(--text-sm); color: var(--color-gray-dark); margin-bottom: var(--space-lg);">
          These costs are often forgotten and can add 10-15% to your total wedding spend.
        </p>
        <div class="hidden-costs-grid">
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  function renderPaymentTimeline(totalBudget) {
    let timelineHtml = '';
    PAYMENT_TIMELINE.forEach(item => {
      const amount = totalBudget * item.pct;
      timelineHtml += `
        <div class="timeline-item">
          <div class="timeline-period">${item.period}</div>
          <div class="timeline-details">
            ${item.vendors}
            <span class="timeline-amount">~${formatCurrency(amount)} (${(item.pct * 100).toFixed(0)}% of budget)</span>
          </div>
        </div>
      `;
    });

    return `
      <div class="timeline-section">
        <h4>Payment Timeline</h4>
        <p style="font-size: var(--text-sm); color: var(--color-gray-dark); margin-bottom: var(--space-lg);">
          When to expect payments based on typical vendor requirements.
        </p>
        ${timelineHtml}
      </div>
    `;
  }

  function renderSavingsPlan(plan) {
    if (plan.remaining <= 0) {
      return `
        <div class="savings-plan-section">
          <h4>Savings Plan</h4>
          <p style="font-size: var(--text-base); color: var(--color-success); font-weight: 600;">
            You've already saved enough to cover your wedding budget! You have ${formatCurrency(Math.abs(plan.remaining))} extra.
          </p>
        </div>
      `;
    }

    return `
      <div class="savings-plan-section">
        <h4>Monthly Savings Plan</h4>
        <p style="font-size: var(--text-sm); color: var(--color-gray-dark); margin-bottom: var(--space-lg);">
          Based on your wedding date, here's what you need to save to reach your goal.
        </p>
        <div class="savings-plan-grid">
          <div class="savings-plan-card">
            <div class="savings-plan-value">${plan.monthsUntilWedding}</div>
            <div class="savings-plan-label">Months Until Wedding</div>
          </div>
          <div class="savings-plan-card">
            <div class="savings-plan-value">${formatCurrency(plan.remaining)}</div>
            <div class="savings-plan-label">Still Needed</div>
          </div>
          <div class="savings-plan-card">
            <div class="savings-plan-value">${formatCurrency(plan.monthlyNeeded)}</div>
            <div class="savings-plan-label">Per Month</div>
          </div>
          <div class="savings-plan-card">
            <div class="savings-plan-value">${formatCurrency(plan.weeklyNeeded)}</div>
            <div class="savings-plan-label">Per Week</div>
          </div>
          <div class="savings-plan-card">
            <div class="savings-plan-value">${plan.percentSaved.toFixed(1)}%</div>
            <div class="savings-plan-label">Already Saved</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderTips(style) {
    const tips = [
      { tip: 'Negotiate everything', detail: 'Most vendors expect negotiation - ask for package deals or off-peak discounts.' },
      { tip: 'Prioritize what you value', detail: 'Spend more on what matters to you as a couple, cut what doesn\'t.' },
      { tip: 'Keep a buffer', detail: 'Always hold back 5-10% of your budget for unexpected costs.' },
      { tip: 'Book early for discounts', detail: 'Many vendors offer 10-15% off for 12+ month advance bookings.' },
      { tip: 'Consider all-inclusive packages', detail: 'Venue packages often save money vs. sourcing vendors separately.' },
      { tip: 'Track every expense', detail: 'Use a spreadsheet to log all payments, deposits, and due dates.' }
    ];

    let tipsHtml = '';
    tips.forEach(t => {
      tipsHtml += `
        <div class="tip-item">
          <strong>${t.tip}:</strong> ${t.detail}
        </div>
      `;
    });

    return `
      <div class="tips-section">
        <h4>Money-Saving Tips</h4>
        <div class="tips-grid">
          ${tipsHtml}
        </div>
      </div>
    `;
  }

  function shareCalculation() {
    saveToURL();
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showShareFeedback('Link copied to clipboard!');
      }).catch(() => {
        fallbackCopy(url);
      });
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showShareFeedback('Link copied to clipboard!');
    } catch (e) {
      showShareFeedback('Copy the URL from your browser address bar.');
    }
    document.body.removeChild(textArea);
  }

  function showShareFeedback(message) {
    const shareBtn = document.getElementById('share-calculation');
    if (!shareBtn) return;
    const originalText = shareBtn.innerHTML;
    shareBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> ${message}`;
    shareBtn.style.background = 'var(--color-success)';
    shareBtn.style.color = 'white';
    setTimeout(() => {
      shareBtn.innerHTML = originalText;
      shareBtn.style.background = '';
      shareBtn.style.color = '';
    }, 3000);
  }

  // Utility functions
  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
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
    if (el) {
      const option = el.querySelector(`option[value="${value}"]`);
      if (option) el.value = value;
    }
  }

  function formatCurrency(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return '$0';
    return '$' + Math.round(amount).toLocaleString('en-US');
  }

  function formatCurrencyShort(amount) {
    if (amount >= 1000000) {
      return '$' + (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
      return '$' + (amount / 1000).toFixed(1) + 'K';
    }
    return '$' + Math.round(amount).toLocaleString('en-US');
  }

})();
