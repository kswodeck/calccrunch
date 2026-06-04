// Subscription Cost Calculator
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Constants
  const NATIONAL_AVERAGE_MONTHLY = 219;
  const INVESTMENT_RATE = 0.07;
  const INVESTMENT_YEARS = 10;

  // Category display names
  const CATEGORY_LABELS = {
    streaming: 'Streaming & Entertainment',
    software: 'Software & Productivity',
    gaming: 'Gaming',
    fitness: 'Health & Fitness',
    news: 'News & Learning',
    food: 'Food & Delivery',
    other: 'Other Services',
    custom: 'Custom'
  };

  const CATEGORY_ICONS = {
    streaming: '📺',
    software: '💻',
    gaming: '🎮',
    fitness: '🏋️',
    news: '📰',
    food: '🍔',
    other: '🔧',
    custom: '➕'
  };

  const CATEGORY_COLORS = {
    streaming: '#E91E63',
    software: '#2196F3',
    gaming: '#9C27B0',
    fitness: '#4CAF50',
    news: '#FF9800',
    food: '#F44336',
    other: '#607D8B',
    custom: '#795548'
  };

  // Overlap detection groups
  const OVERLAP_GROUPS = {
    'Video Streaming': ['Netflix', 'Hulu', 'Disney+', 'HBO Max', 'Amazon Prime', 'Apple TV+', 'Paramount+', 'YouTube Premium', 'Peacock'],
    'Music Streaming': ['Spotify', 'Apple Music'],
    'Cloud Storage': ['Google One', 'iCloud+', 'Dropbox', 'Cloud Backup'],
    'Food Delivery': ['DoorDash DashPass', 'Uber One', 'Instacart+'],
    'Learning Platforms': ['Masterclass', 'Skillshare', 'Duolingo'],
    'Gaming Services': ['Xbox Game Pass', 'PS Plus', 'Nintendo Online', 'EA Play']
  };

  // DOM Elements
  const calculateBtn = document.getElementById('calculate-btn');
  const shareBtn = document.getElementById('share-calculation');
  const resultDiv = document.getElementById('subscription-result');
  const addCustomBtn = document.getElementById('add-custom-btn');
  const customContainer = document.getElementById('custom-subscriptions-container');

  let customCounter = 0;

  // Initialize
  init();

  function init() {
    calculateBtn.addEventListener('click', calculate);
    shareBtn.addEventListener('click', shareResults);
    addCustomBtn.addEventListener('click', addCustomSubscription);

    // Sync checkbox data-price with input value changes
    document.querySelectorAll('.sub-item').forEach(function(item) {
      const priceInput = item.querySelector('.sub-price');
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (priceInput && checkbox) {
        priceInput.addEventListener('change', function() {
          checkbox.dataset.price = priceInput.value;
        });
      }
    });

    loadFromURL();
  }

  function addCustomSubscription(name, price, cycle, usage, category) {
    customCounter++;
    const row = document.createElement('div');
    row.className = 'custom-sub-row';
    row.dataset.customId = customCounter;

    const nameVal = (typeof name === 'string') ? name : '';
    const priceVal = (typeof price === 'number') ? price : '';
    const cycleVal = (typeof cycle === 'string') ? cycle : 'monthly';
    const usageVal = (typeof usage === 'string') ? usage : 'weekly';
    const categoryVal = (typeof category === 'string') ? category : 'custom';

    row.innerHTML = `
      <input type="text" class="form-input sub-custom-name" placeholder="Service name" value="${nameVal}" />
      <div class="input-group compact">
        <span class="input-addon">$</span>
        <input type="number" class="form-input sub-price" placeholder="0.00" value="${priceVal}" min="0" step="0.01" />
      </div>
      <select class="form-select sub-cycle">
        <option value="monthly"${cycleVal === 'monthly' ? ' selected' : ''}>Monthly</option>
        <option value="annual"${cycleVal === 'annual' ? ' selected' : ''}>Annual</option>
        <option value="quarterly"${cycleVal === 'quarterly' ? ' selected' : ''}>Quarterly</option>
      </select>
      <select class="form-select sub-usage">
        <option value="daily"${usageVal === 'daily' ? ' selected' : ''}>Daily</option>
        <option value="weekly"${usageVal === 'weekly' ? ' selected' : ''}>Weekly</option>
        <option value="monthly"${usageVal === 'monthly' ? ' selected' : ''}>Monthly</option>
        <option value="rarely"${usageVal === 'rarely' ? ' selected' : ''}>Rarely</option>
      </select>
      <select class="form-select sub-category-select">
        <option value="custom"${categoryVal === 'custom' ? ' selected' : ''}>Custom</option>
        <option value="streaming"${categoryVal === 'streaming' ? ' selected' : ''}>Streaming</option>
        <option value="software"${categoryVal === 'software' ? ' selected' : ''}>Software</option>
        <option value="gaming"${categoryVal === 'gaming' ? ' selected' : ''}>Gaming</option>
        <option value="fitness"${categoryVal === 'fitness' ? ' selected' : ''}>Fitness</option>
        <option value="news"${categoryVal === 'news' ? ' selected' : ''}>News/Learning</option>
        <option value="food"${categoryVal === 'food' ? ' selected' : ''}>Food/Delivery</option>
        <option value="other"${categoryVal === 'other' ? ' selected' : ''}>Other</option>
      </select>
      <button type="button" class="remove-custom-btn" title="Remove">&times;</button>
    `;

    row.querySelector('.remove-custom-btn').addEventListener('click', function() {
      row.remove();
    });

    customContainer.appendChild(row);
    return row;
  }

  function getActiveSubscriptions() {
    const subs = [];

    // Get checked preset subscriptions
    document.querySelectorAll('.sub-item').forEach(function(item) {
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        const name = checkbox.dataset.name;
        const category = checkbox.dataset.category;
        const price = parseFloat(item.querySelector('.sub-price').value) || 0;
        const cycle = item.querySelector('.sub-cycle').value;
        const usage = item.querySelector('.sub-usage').value;

        subs.push({ name, category, price, cycle, usage });
      }
    });

    // Get custom subscriptions
    document.querySelectorAll('.custom-sub-row').forEach(function(row) {
      const name = row.querySelector('.sub-custom-name').value.trim();
      const price = parseFloat(row.querySelector('.sub-price').value) || 0;
      const cycle = row.querySelector('.sub-cycle').value;
      const usage = row.querySelector('.sub-usage').value;
      const category = row.querySelector('.sub-category-select').value;

      if (name && price > 0) {
        subs.push({ name, category, price, cycle, usage, isCustom: true });
      }
    });

    return subs;
  }

  function normalizeToMonthly(price, cycle) {
    switch (cycle) {
      case 'annual': return price / 12;
      case 'quarterly': return price / 3;
      default: return price;
    }
  }

  function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function formatCurrencyWhole(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function calculate() {
    const subs = getActiveSubscriptions();

    if (subs.length === 0) {
      resultDiv.innerHTML = '<div class="no-results"><p>Please check at least one subscription or add a custom one to see your analysis.</p></div>';
      resultDiv.classList.remove('hidden');
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Calculate monthly costs
    const analyzed = subs.map(function(sub) {
      const monthlyCost = normalizeToMonthly(sub.price, sub.cycle);
      let costPerUse;
      switch (sub.usage) {
        case 'daily': costPerUse = monthlyCost / 30; break;
        case 'weekly': costPerUse = monthlyCost / 4; break;
        case 'monthly': costPerUse = monthlyCost / 1; break;
        case 'rarely': costPerUse = monthlyCost; break;
        default: costPerUse = monthlyCost;
      }
      return { ...sub, monthlyCost, costPerUse };
    });

    const totalMonthly = analyzed.reduce(function(sum, s) { return sum + s.monthlyCost; }, 0);
    const totalAnnual = totalMonthly * 12;
    const costPerDay = totalMonthly / 30;

    // Category breakdown
    const categories = {};
    analyzed.forEach(function(sub) {
      if (!categories[sub.category]) {
        categories[sub.category] = { total: 0, subs: [] };
      }
      categories[sub.category].total += sub.monthlyCost;
      categories[sub.category].subs.push(sub);
    });

    // Rarely used subs
    const rarelyUsed = analyzed.filter(function(s) { return s.usage === 'rarely'; });
    const rarelyUsedAnnual = rarelyUsed.reduce(function(sum, s) { return sum + s.monthlyCost * 12; }, 0);

    // Overlap detection
    const overlaps = [];
    Object.keys(OVERLAP_GROUPS).forEach(function(groupName) {
      const groupServices = OVERLAP_GROUPS[groupName];
      const activeInGroup = analyzed.filter(function(s) {
        return groupServices.includes(s.name);
      });
      if (activeInGroup.length >= 2) {
        overlaps.push({
          group: groupName,
          count: activeInGroup.length,
          services: activeInGroup.map(function(s) { return s.name; }),
          totalMonthly: activeInGroup.reduce(function(sum, s) { return sum + s.monthlyCost; }, 0)
        });
      }
    });

    // 5-year projection
    const fiveYearTotal = totalMonthly * 12 * 5;

    // Investment alternative (monthly contributions at 7% over 10 years)
    const monthlyRate = INVESTMENT_RATE / 12;
    const months = INVESTMENT_YEARS * 12;
    const investmentValue = totalMonthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    // Comparison to national average
    const vsAverage = totalMonthly - NATIONAL_AVERAGE_MONTHLY;
    const vsAveragePercent = ((totalMonthly / NATIONAL_AVERAGE_MONTHLY) * 100).toFixed(0);

    // Sort by cost
    const sortedByCost = analyzed.slice().sort(function(a, b) { return b.monthlyCost - a.monthlyCost; });

    // Build results HTML
    let html = '';

    // Hero section
    html += `
      <div class="sub-hero">
        <div class="sub-hero-label">Your Total Subscription Spending</div>
        <div class="sub-hero-monthly">${formatCurrency(totalMonthly)}<span class="sub-hero-period">/month</span></div>
        <div class="sub-hero-annual">${formatCurrencyWhole(totalAnnual)} per year &bull; ${formatCurrency(costPerDay)}/day</div>
        <div class="sub-hero-comparison ${vsAverage > 0 ? 'above' : 'below'}">
          ${vsAverage > 0 ? '⬆️' : '⬇️'} ${Math.abs(vsAveragePercent)}% ${vsAverage > 0 ? 'above' : 'below'} the national average of $${NATIONAL_AVERAGE_MONTHLY}/mo
        </div>
      </div>
    `;

    // Category breakdown
    html += '<div class="sub-breakdown-section"><h4>📊 Spending by Category</h4>';
    const sortedCategories = Object.keys(categories).sort(function(a, b) {
      return categories[b].total - categories[a].total;
    });

    sortedCategories.forEach(function(cat) {
      const catData = categories[cat];
      const percent = ((catData.total / totalMonthly) * 100).toFixed(1);
      const color = CATEGORY_COLORS[cat] || '#607D8B';
      const icon = CATEGORY_ICONS[cat] || '📦';
      const label = CATEGORY_LABELS[cat] || cat;

      html += `
        <div class="cat-bar-row">
          <div class="cat-bar-label">${icon} ${label}</div>
          <div class="cat-bar-track">
            <div class="cat-bar-fill" style="width: ${percent}%; background: ${color};"></div>
          </div>
          <div class="cat-bar-value">${formatCurrency(catData.total)}/mo <span class="cat-bar-percent">(${percent}%)</span></div>
        </div>
      `;
    });
    html += '</div>';

    // All subscriptions sorted by cost
    html += '<div class="sub-breakdown-section"><h4>💳 All Subscriptions (Highest Cost First)</h4>';
    html += '<div class="sub-list">';
    sortedByCost.forEach(function(sub) {
      const isRarely = sub.usage === 'rarely';
      const flagClass = isRarely ? ' sub-list-item-flagged' : '';
      const icon = CATEGORY_ICONS[sub.category] || '📦';
      html += `
        <div class="sub-list-item${flagClass}">
          <div class="sub-list-info">
            <span class="sub-list-icon">${icon}</span>
            <span class="sub-list-name">${sub.name}</span>
            ${isRarely ? '<span class="sub-flag">⚠️ Rarely Used</span>' : ''}
          </div>
          <div class="sub-list-cost">
            <span class="sub-list-monthly">${formatCurrency(sub.monthlyCost)}/mo</span>
            <span class="sub-list-peruse">${formatCurrency(sub.costPerUse)}/use</span>
          </div>
        </div>
      `;
    });
    html += '</div></div>';

    // Overlap alerts
    if (overlaps.length > 0) {
      html += '<div class="sub-breakdown-section sub-overlap-section"><h4>⚠️ Overlap Alerts</h4>';
      overlaps.forEach(function(overlap) {
        const suggestion = overlap.group === 'Video Streaming' ?
          'Average household uses 2-3 streaming services.' :
          'Consider whether you need multiple services in this category.';
        html += `
          <div class="sub-overlap-alert">
            <div class="sub-overlap-title">You have <strong>${overlap.count}</strong> ${overlap.group} services</div>
            <div class="sub-overlap-services">${overlap.services.join(', ')}</div>
            <div class="sub-overlap-cost">Combined: ${formatCurrency(overlap.totalMonthly)}/month</div>
            <div class="sub-overlap-tip">${suggestion}</div>
          </div>
        `;
      });
      html += '</div>';
    }

    // Rarely used / potential savings
    if (rarelyUsed.length > 0) {
      html += '<div class="sub-breakdown-section sub-savings-section"><h4>💡 Potential Savings</h4>';
      html += `<p class="sub-savings-intro">These subscriptions are marked as <strong>"Rarely Used"</strong> — canceling them would save you <strong>${formatCurrencyWhole(rarelyUsedAnnual)}/year</strong>:</p>`;
      html += '<div class="sub-savings-list">';
      rarelyUsed.forEach(function(sub) {
        html += `
          <div class="sub-savings-item">
            <span class="sub-savings-name">${sub.name}</span>
            <span class="sub-savings-cost">${formatCurrency(sub.monthlyCost)}/mo (${formatCurrencyWhole(sub.monthlyCost * 12)}/yr)</span>
          </div>
        `;
      });
      html += '</div></div>';
    }

    // Projections section
    html += `
      <div class="sub-breakdown-section sub-projections">
        <h4>📈 Long-Term Projections</h4>
        <div class="sub-projection-grid">
          <div class="sub-projection-card">
            <div class="sub-projection-icon">📅</div>
            <div class="sub-projection-value">${formatCurrencyWhole(fiveYearTotal)}</div>
            <div class="sub-projection-label">5-Year Subscription Cost</div>
          </div>
          <div class="sub-projection-card">
            <div class="sub-projection-icon">📈</div>
            <div class="sub-projection-value">${formatCurrencyWhole(investmentValue)}</div>
            <div class="sub-projection-label">If invested at 7% for 10 years</div>
          </div>
          <div class="sub-projection-card">
            <div class="sub-projection-icon">💰</div>
            <div class="sub-projection-value">${formatCurrencyWhole(investmentValue - totalAnnual * INVESTMENT_YEARS)}</div>
            <div class="sub-projection-label">Growth beyond principal</div>
          </div>
        </div>
      </div>
    `;

    // What else could this money do
    html += `
      <div class="sub-breakdown-section sub-alternatives">
        <h4>🤔 What Else Could ${formatCurrency(totalMonthly)}/Month Buy?</h4>
        <div class="sub-alt-grid">
          <div class="sub-alt-item">🏖️ ${Math.floor(totalAnnual / 1500)} weekend getaways/year</div>
          <div class="sub-alt-item">🍽️ ${Math.floor(totalMonthly / 50)} nice dinners out/month</div>
          <div class="sub-alt-item">⛽ ${Math.floor(totalMonthly / 3.50)} gallons of gas/month</div>
          <div class="sub-alt-item">☕ ${Math.floor(totalMonthly / 6)} coffees/month</div>
          <div class="sub-alt-item">📚 ${Math.floor(totalMonthly / 15)} books/month</div>
          <div class="sub-alt-item">🎯 ${formatCurrencyWhole(investmentValue)} invested over 10 years</div>
        </div>
      </div>
    `;

    // Recommendations
    html += '<div class="sub-breakdown-section sub-recommendations"><h4>✅ Recommendations</h4><ul>';

    if (rarelyUsed.length > 0) {
      html += `<li><strong>Cancel rarely used services:</strong> You have ${rarelyUsed.length} subscription${rarelyUsed.length > 1 ? 's' : ''} you rarely use. Canceling could save ${formatCurrencyWhole(rarelyUsedAnnual)}/year.</li>`;
    }

    if (overlaps.length > 0) {
      overlaps.forEach(function(overlap) {
        if (overlap.group === 'Video Streaming' && overlap.count > 3) {
          html += `<li><strong>Reduce streaming services:</strong> You have ${overlap.count} video streaming services. Consider rotating — subscribe to 1-2 at a time and switch when you run out of content.</li>`;
        } else if (overlap.group === 'Cloud Storage' && overlap.count > 1) {
          html += `<li><strong>Consolidate cloud storage:</strong> You have ${overlap.count} cloud storage services. Pick one and migrate your files.</li>`;
        } else if (overlap.group === 'Music Streaming' && overlap.count > 1) {
          html += `<li><strong>Pick one music service:</strong> Spotify and Apple Music are nearly identical. Choose one and cancel the other.</li>`;
        } else if (overlap.count > 2) {
          html += `<li><strong>Review ${overlap.group}:</strong> You have ${overlap.count} services in this category — consider if you need all of them.</li>`;
        }
      });
    }

    if (totalMonthly > NATIONAL_AVERAGE_MONTHLY) {
      html += `<li><strong>Above average spending:</strong> At ${formatCurrency(totalMonthly)}/month, you're spending more than the national average ($${NATIONAL_AVERAGE_MONTHLY}/mo). Review each service's value.</li>`;
    }

    const highCostSubs = analyzed.filter(function(s) { return s.monthlyCost >= 30; });
    if (highCostSubs.length > 0) {
      html += `<li><strong>Review premium subscriptions:</strong> You have ${highCostSubs.length} service${highCostSubs.length > 1 ? 's' : ''} costing $30+/month. Check if cheaper tiers are available.</li>`;
    }

    html += '<li><strong>Set a calendar reminder:</strong> Review your subscriptions quarterly to catch price increases and unused services.</li>';
    html += '</ul></div>';

    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function shareResults() {
    const params = new URLSearchParams();

    // Encode checked presets
    const checked = [];
    document.querySelectorAll('.sub-item').forEach(function(item) {
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        const name = checkbox.dataset.name;
        const price = item.querySelector('.sub-price').value;
        const cycle = item.querySelector('.sub-cycle').value;
        const usage = item.querySelector('.sub-usage').value;
        checked.push(name + '|' + price + '|' + cycle + '|' + usage);
      }
    });

    if (checked.length > 0) {
      params.set('subs', checked.join(';;'));
    }

    // Encode custom subscriptions
    const customs = [];
    document.querySelectorAll('.custom-sub-row').forEach(function(row) {
      const name = row.querySelector('.sub-custom-name').value.trim();
      const price = row.querySelector('.sub-price').value;
      const cycle = row.querySelector('.sub-cycle').value;
      const usage = row.querySelector('.sub-usage').value;
      const category = row.querySelector('.sub-category-select').value;
      if (name && price) {
        customs.push(name + '|' + price + '|' + cycle + '|' + usage + '|' + category);
      }
    });

    if (customs.length > 0) {
      params.set('custom', customs.join(';;'));
    }

    const url = window.location.origin + window.location.pathname + '?' + params.toString();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function() {
        showShareFeedback('Link copied to clipboard!');
      }).catch(function() {
        fallbackShare(url);
      });
    } else {
      fallbackShare(url);
    }
  }

  function fallbackShare(url) {
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showShareFeedback('Link copied to clipboard!');
  }

  function showShareFeedback(message) {
    const btn = shareBtn;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> ' + message;
    btn.classList.add('btn-success');
    setTimeout(function() {
      btn.innerHTML = originalHTML;
      btn.classList.remove('btn-success');
    }, 2500);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    // Load presets
    const subsParam = params.get('subs');
    if (subsParam) {
      const entries = subsParam.split(';;');
      entries.forEach(function(entry) {
        const parts = entry.split('|');
        if (parts.length >= 4) {
          const name = parts[0];
          const price = parts[1];
          const cycle = parts[2];
          const usage = parts[3];

          // Find and check the matching preset
          document.querySelectorAll('.sub-item').forEach(function(item) {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.dataset.name === name) {
              checkbox.checked = true;
              item.querySelector('.sub-price').value = price;
              item.querySelector('.sub-cycle').value = cycle;
              item.querySelector('.sub-usage').value = usage;
            }
          });
        }
      });
    }

    // Load custom
    const customParam = params.get('custom');
    if (customParam) {
      const entries = customParam.split(';;');
      entries.forEach(function(entry) {
        const parts = entry.split('|');
        if (parts.length >= 5) {
          addCustomSubscription(parts[0], parseFloat(parts[1]), parts[2], parts[3], parts[4]);
        }
      });
    }

    // Auto-calculate if URL has params
    if (subsParam || customParam) {
      setTimeout(function() { calculate(); }, 100);
    }
  }
});
