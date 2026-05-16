// Tip Calculator - Calculate tips, split bills, and compare tipping options
(function() {
  'use strict';

  const DEFAULT_VALUES = {
    billAmount: '',
    tipPercentage: 18,
    numPeople: 1,
    roundOption: 'none',
    serviceQuality: 'great'
  };

  // State
  let state = {
    tipPercentage: DEFAULT_VALUES.tipPercentage,
    serviceQuality: DEFAULT_VALUES.serviceQuality
  };

  // DOM Elements
  let elements = {};

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    cacheElements();
    loadFromURL();
    attachEventListeners();
  });

  function cacheElements() {
    elements = {
      form: document.getElementById('tip-calculator-form'),
      calculateBtn: document.getElementById('calculate-btn'),
      clearBtn: document.getElementById('clear-btn'),
      shareBtn: document.getElementById('share-calculation'),
      resultDiv: document.getElementById('tip-result'),
      billAmount: document.getElementById('bill-amount'),
      tipPercentage: document.getElementById('tip-percentage'),
      tipSlider: document.getElementById('tip-slider'),
      numPeople: document.getElementById('num-people'),
      roundOption: document.getElementById('round-option')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('bill')) setValue('bill-amount', params.get('bill'));
    if (params.has('tip')) {
      const tip = params.get('tip');
      setValue('tip-percentage', tip);
      if (elements.tipSlider) elements.tipSlider.value = tip;
      state.tipPercentage = parseFloat(tip);
      updatePresetButtons(parseFloat(tip));
    }
    if (params.has('people')) setValue('num-people', params.get('people'));
    if (params.has('round')) setValue('round-option', params.get('round'));
    if (params.has('quality')) {
      state.serviceQuality = params.get('quality');
      updateServiceButtons(params.get('quality'));
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    const bill = getValue('bill-amount');
    const tip = getValue('tip-percentage');
    const people = getValue('num-people');
    const round = getValue('round-option');

    if (bill) params.set('bill', bill);
    if (tip) params.set('tip', tip);
    if (people && people !== '1') params.set('people', people);
    if (round && round !== 'none') params.set('round', round);
    if (state.serviceQuality !== 'great') params.set('quality', state.serviceQuality);

    const newURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    // Calculate button
    if (elements.calculateBtn) {
      elements.calculateBtn.addEventListener('click', () => {
        calculateResults();
        saveToURL();
        document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // Tip preset buttons
    document.querySelectorAll('.tip-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tipValue = btn.dataset.tip;
        if (tipValue === 'custom') {
          elements.tipPercentage?.focus();
        } else {
          const tip = parseInt(tipValue);
          state.tipPercentage = tip;
          if (elements.tipPercentage) elements.tipPercentage.value = tip;
          if (elements.tipSlider) elements.tipSlider.value = tip;
        }
        updatePresetButtons(tipValue === 'custom' ? 'custom' : parseInt(tipValue));
        saveToURL();
      });
    });

    // Tip slider
    if (elements.tipSlider) {
      elements.tipSlider.addEventListener('input', () => {
        const val = parseInt(elements.tipSlider.value);
        state.tipPercentage = val;
        if (elements.tipPercentage) elements.tipPercentage.value = val;
        updatePresetButtons(val);
        saveToURL();
      });
    }

    // Tip percentage input
    if (elements.tipPercentage) {
      elements.tipPercentage.addEventListener('input', () => {
        const val = parseInt(elements.tipPercentage.value) || 0;
        state.tipPercentage = val;
        if (elements.tipSlider) elements.tipSlider.value = Math.min(val, 50);
        updatePresetButtons(val);
        saveToURL();
      });
    }

    // Service quality buttons
    document.querySelectorAll('.service-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const quality = btn.dataset.quality;
        const suggest = parseInt(btn.dataset.suggest);
        state.serviceQuality = quality;
        state.tipPercentage = suggest;
        if (elements.tipPercentage) elements.tipPercentage.value = suggest;
        if (elements.tipSlider) elements.tipSlider.value = suggest;
        updateServiceButtons(quality);
        updatePresetButtons(suggest);
        saveToURL();
      });
    });

    // Clear button
    if (elements.clearBtn) {
      elements.clearBtn.addEventListener('click', clearAll);
    }

    // Share button
    if (elements.shareBtn) {
      elements.shareBtn.addEventListener('click', shareCalculation);
    }

    // Auto-save on input changes
    ['bill-amount', 'num-people', 'round-option'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', () => saveToURL());
      }
    });
  }

  function updatePresetButtons(activeTip) {
    document.querySelectorAll('.tip-preset-btn').forEach(btn => {
      const btnTip = btn.dataset.tip;
      if (btnTip === 'custom') {
        btn.classList.toggle('active', ![10, 15, 18, 20, 25].includes(activeTip));
      } else {
        btn.classList.toggle('active', parseInt(btnTip) === activeTip);
      }
    });
  }

  function updateServiceButtons(quality) {
    document.querySelectorAll('.service-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.quality === quality);
    });
  }

  function calculateResults() {
    const billAmount = parseFloat(getValue('bill-amount'));
    const tipPercent = parseFloat(getValue('tip-percentage')) || 0;
    const numPeople = parseInt(getValue('num-people')) || 1;
    const roundOption = getValue('round-option');

    if (!billAmount || billAmount <= 0) {
      displayError('Please enter a valid bill amount.');
      return;
    }

    // Calculate base tip
    const tipAmount = billAmount * (tipPercent / 100);
    let totalBill = billAmount + tipAmount;

    // Apply rounding
    let roundedTotal = totalBill;
    let roundingDiff = 0;
    if (roundOption === 'dollar') {
      roundedTotal = Math.ceil(totalBill);
    } else if (roundOption === 'five') {
      roundedTotal = Math.ceil(totalBill / 5) * 5;
    } else if (roundOption === 'ten') {
      roundedTotal = Math.ceil(totalBill / 10) * 10;
    }
    roundingDiff = roundedTotal - totalBill;
    const effectiveTip = tipAmount + roundingDiff;
    const effectiveTipPercent = (effectiveTip / billAmount) * 100;

    // Per person
    const perPersonTotal = roundedTotal / numPeople;
    const perPersonTip = effectiveTip / numPeople;
    const perPersonBill = billAmount / numPeople;

    // Comparison table data
    const comparisons = [10, 15, 18, 20, 25, 30].map(pct => {
      const tip = billAmount * (pct / 100);
      const total = billAmount + tip;
      return {
        percent: pct,
        tip: tip,
        total: total,
        perPerson: total / numPeople,
        isSelected: pct === Math.round(tipPercent)
      };
    });

    displayResults({
      billAmount,
      tipPercent,
      tipAmount,
      effectiveTip,
      effectiveTipPercent,
      totalBill: roundedTotal,
      roundingDiff,
      roundOption,
      numPeople,
      perPersonTotal,
      perPersonTip,
      perPersonBill,
      comparisons
    });
  }

  function displayResults(results) {
    const html = `
      <div class="result-header">
        <h2>🧾 Tip Calculation Results</h2>
      </div>

      <div class="tip-summary-cards">
        <div class="summary-card primary">
          <div class="summary-icon">💰</div>
          <div class="summary-content">
            <div class="summary-value">${formatCurrency(results.effectiveTip)}</div>
            <div class="summary-label">Tip Amount</div>
          </div>
        </div>
        <div class="summary-card highlight">
          <div class="summary-icon">🧾</div>
          <div class="summary-content">
            <div class="summary-value">${formatCurrency(results.totalBill)}</div>
            <div class="summary-label">Total Bill</div>
          </div>
        </div>
        ${results.numPeople > 1 ? `
        <div class="summary-card">
          <div class="summary-icon">👥</div>
          <div class="summary-content">
            <div class="summary-value">${formatCurrency(results.perPersonTotal)}</div>
            <div class="summary-label">Per Person</div>
          </div>
        </div>
        ` : ''}
        <div class="summary-card">
          <div class="summary-icon">📊</div>
          <div class="summary-content">
            <div class="summary-value">${results.effectiveTipPercent.toFixed(1)}%</div>
            <div class="summary-label">Effective Tip %</div>
          </div>
        </div>
      </div>

      ${results.roundingDiff > 0 ? `
        <div class="rounding-note">
          <span>📌</span> Rounded up by ${formatCurrency(results.roundingDiff)} (to nearest ${results.roundOption === 'dollar' ? 'dollar' : results.roundOption === 'five' ? '$5' : '$10'})
        </div>
      ` : ''}

      <div class="calculation-breakdown">
        <h3>📋 Breakdown</h3>
        <div class="breakdown-table-container">
          <table class="breakdown-table">
            <tbody>
              <tr>
                <td>Bill Amount</td>
                <td class="text-right">${formatCurrency(results.billAmount)}</td>
              </tr>
              <tr>
                <td>Tip (${results.tipPercent}%)</td>
                <td class="text-right text-success">+${formatCurrency(results.tipAmount)}</td>
              </tr>
              ${results.roundingDiff > 0 ? `
              <tr>
                <td>Rounding</td>
                <td class="text-right text-success">+${formatCurrency(results.roundingDiff)}</td>
              </tr>
              ` : ''}
              <tr class="total-row">
                <td><strong>Total</strong></td>
                <td class="text-right"><strong>${formatCurrency(results.totalBill)}</strong></td>
              </tr>
              ${results.numPeople > 1 ? `
              <tr>
                <td>Per Person (${results.numPeople} people)</td>
                <td class="text-right">${formatCurrency(results.perPersonTotal)}</td>
              </tr>
              <tr>
                <td style="padding-left: 2rem;">Bill share</td>
                <td class="text-right">${formatCurrency(results.perPersonBill)}</td>
              </tr>
              <tr>
                <td style="padding-left: 2rem;">Tip share</td>
                <td class="text-right">${formatCurrency(results.perPersonTip)}</td>
              </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      </div>

      <div class="comparison-section">
        <h3>📊 Tip Comparison</h3>
        <div class="comparison-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Tip %</th>
                <th>Tip Amount</th>
                <th>Total</th>
                ${results.numPeople > 1 ? '<th>Per Person</th>' : ''}
              </tr>
            </thead>
            <tbody>
              ${results.comparisons.map(c => `
                <tr class="${c.isSelected ? 'selected-row' : ''}">
                  <td><strong>${c.percent}%</strong></td>
                  <td>${formatCurrency(c.tip)}</td>
                  <td>${formatCurrency(c.total)}</td>
                  ${results.numPeople > 1 ? `<td>${formatCurrency(c.perPerson)}</td>` : ''}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="visual-tip-bar">
        <h3>💡 Visual Breakdown</h3>
        <div class="bar-container">
          <div class="bar-segment bill-segment" style="width: ${(results.billAmount / results.totalBill * 100).toFixed(1)}%">
            <span class="bar-label">Bill: ${formatCurrency(results.billAmount)}</span>
          </div>
          <div class="bar-segment tip-segment" style="width: ${(results.effectiveTip / results.totalBill * 100).toFixed(1)}%">
            <span class="bar-label">Tip: ${formatCurrency(results.effectiveTip)}</span>
          </div>
        </div>
        <div class="bar-legend">
          <span class="legend-item"><span class="legend-dot bill-dot"></span> Bill (${(results.billAmount / results.totalBill * 100).toFixed(0)}%)</span>
          <span class="legend-item"><span class="legend-dot tip-dot"></span> Tip (${(results.effectiveTip / results.totalBill * 100).toFixed(0)}%)</span>
        </div>
      </div>
    `;

    if (elements.resultDiv) {
      elements.resultDiv.innerHTML = html;
      elements.resultDiv.classList.remove('hidden');
    }
  }

  function displayError(message) {
    if (elements.resultDiv) {
      elements.resultDiv.innerHTML = `
        <div class="error-message">
          <span class="error-icon">⚠️</span>
          <span>${message}</span>
        </div>
      `;
      elements.resultDiv.classList.remove('hidden');
    }
  }

  function clearAll() {
    if (elements.billAmount) elements.billAmount.value = '';
    if (elements.tipPercentage) elements.tipPercentage.value = DEFAULT_VALUES.tipPercentage;
    if (elements.tipSlider) elements.tipSlider.value = DEFAULT_VALUES.tipPercentage;
    if (elements.numPeople) elements.numPeople.value = DEFAULT_VALUES.numPeople;
    if (elements.roundOption) elements.roundOption.value = DEFAULT_VALUES.roundOption;
    state.tipPercentage = DEFAULT_VALUES.tipPercentage;
    state.serviceQuality = DEFAULT_VALUES.serviceQuality;
    updatePresetButtons(DEFAULT_VALUES.tipPercentage);
    updateServiceButtons(DEFAULT_VALUES.serviceQuality);
    if (elements.resultDiv) elements.resultDiv.classList.add('hidden');
    window.history.replaceState({}, '', window.location.pathname);
  }

  function shareCalculation() {
    saveToURL();
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => showCopyConfirmation()).catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand('copy'); showCopyConfirmation(); }
    catch (e) { alert('Copy the URL manually: ' + text); }
    document.body.removeChild(textarea);
  }

  function showCopyConfirmation() {
    if (elements.shareBtn) {
      const original = elements.shareBtn.innerHTML;
      elements.shareBtn.innerHTML = '✓ Link Copied!';
      elements.shareBtn.style.background = '#10b981';
      elements.shareBtn.style.borderColor = '#10b981';
      elements.shareBtn.style.color = 'white';
      setTimeout(() => {
        elements.shareBtn.innerHTML = original;
        elements.shareBtn.style.background = '';
        elements.shareBtn.style.borderColor = '';
        elements.shareBtn.style.color = '';
      }, 2000);
    }
  }

  // Helpers
  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

})();

// Result styles
const tipStyle = document.createElement('style');
tipStyle.textContent = `
  .tip-summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }

  .summary-card {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 1px solid var(--color-surface-table-border);
  }

  .summary-card.primary {
    background: linear-gradient(135deg, #E8F4F8 0%, white 100%);
    border: 2px solid var(--color-light-blue);
  }

  .summary-card.highlight {
    background: linear-gradient(135deg, #fff8f5 0%, white 100%);
    border: 2px solid var(--color-accent-orange);
  }

  .summary-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .summary-value {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--color-primary-blue);
    font-family: var(--font-primary);
  }

  .summary-card.highlight .summary-value {
    color: var(--color-accent-orange);
  }

  .summary-label {
    font-size: 0.85rem;
    color: var(--color-gray-dark);
    margin-top: 0.25rem;
  }

  .rounding-note {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: var(--color-highlight-yellow);
    border: 1px solid #fcd34d;
    border-radius: 8px;
    font-size: 0.9rem;
    color: var(--color-warning);
    margin: 1rem 0;
  }

  .calculation-breakdown {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid var(--color-surface-table-border);
  }

  .calculation-breakdown h3 {
    margin: 0 0 1rem 0;
    color: var(--color-primary-blue);
  }

  .breakdown-table-container {
    overflow-x: auto;
  }

  .breakdown-table {
    width: 100%;
    border-collapse: collapse;
  }

  .breakdown-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .breakdown-table .text-right {
    text-align: right;
  }

  .breakdown-table .text-success {
    color: var(--color-success);
  }

  .breakdown-table .total-row {
    background: var(--color-surface-neutral);
  }

  .breakdown-table .total-row td {
    border-bottom: none;
    padding: 1rem;
  }

  .comparison-section {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid var(--color-surface-table-border);
  }

  .comparison-section h3 {
    margin: 0 0 1rem 0;
    color: var(--color-primary-blue);
  }

  .comparison-table-container {
    overflow-x: auto;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.75rem 1rem;
    text-align: center;
    border-bottom: 1px solid #e5e7eb;
  }

  .comparison-table th {
    background: var(--color-surface-neutral);
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    color: var(--color-gray-dark);
  }

  .comparison-table .selected-row {
    background: linear-gradient(135deg, #fff8f5 0%, #ffe8d6 100%);
    font-weight: 700;
  }

  .comparison-table .selected-row td {
    border-color: var(--color-accent-orange);
  }

  .visual-tip-bar {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid var(--color-surface-table-border);
  }

  .visual-tip-bar h3 {
    margin: 0 0 1rem 0;
    color: var(--color-primary-blue);
  }

  .bar-container {
    display: flex;
    height: 48px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  }

  .bar-segment {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    transition: width 0.3s ease;
  }

  .bill-segment {
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
  }

  .tip-segment {
    background: linear-gradient(135deg, var(--color-accent-orange), #ff9f6b);
  }

  .bar-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    white-space: nowrap;
  }

  .bar-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--color-gray-dark);
  }

  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 3px;
  }

  .bill-dot {
    background: #3b82f6;
  }

  .tip-dot {
    background: var(--color-accent-orange);
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: var(--color-highlight-red);
    border: 1px solid #fecaca;
    border-radius: 8px;
    color: var(--color-error);
  }

  .error-icon {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    .tip-summary-cards {
      grid-template-columns: repeat(2, 1fr);
    }

    .summary-value {
      font-size: 1.4rem;
    }

    .bar-label {
      font-size: 0.65rem;
    }
  }

  @media (max-width: 480px) {
    .tip-summary-cards {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(tipStyle);
