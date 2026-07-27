// Water Intake Calculator - Estimate daily water needs from weight, exercise, and climate
(function() {
  'use strict';

  const DEFAULT_VALUES = {
    system: 'imperial',
    weightLbs: 154,
    weightKg: 70,
    exerciseMinutes: 0,
    climate: 'normal'
  };

  let state = {
    system: DEFAULT_VALUES.system
  };

  let elements = {};

  document.addEventListener('DOMContentLoaded', function() {
    cacheElements();
    loadFromURL();
    attachEventListeners();
  });

  function cacheElements() {
    elements = {
      form: document.getElementById('water-intake-calculator-form'),
      calculateBtn: document.getElementById('calculate-btn'),
      clearBtn: document.getElementById('clear-btn'),
      shareBtn: document.getElementById('share-calculation'),
      resultDiv: document.getElementById('water-intake-calculator-result'),
      imperialInputs: document.getElementById('imperial-inputs'),
      metricInputs: document.getElementById('metric-inputs'),
      weightLbs: document.getElementById('weight-lbs'),
      weightKg: document.getElementById('weight-kg'),
      exerciseMinutes: document.getElementById('exercise-minutes'),
      climate: document.getElementById('climate')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('system')) {
      const system = params.get('system');
      state.system = system === 'metric' ? 'metric' : 'imperial';
      updateUnitButtons(state.system);
      toggleUnitSections(state.system);
    }
    if (params.has('weight')) {
      const w = params.get('weight');
      if (state.system === 'metric') setValue('weight-kg', w);
      else setValue('weight-lbs', w);
    }
    if (params.has('exercise')) setValue('exercise-minutes', params.get('exercise'));
    if (params.has('climate')) setValue('climate', params.get('climate'));
  }

  function saveToURL() {
    const params = new URLSearchParams();
    const weight = state.system === 'metric' ? getValue('weight-kg') : getValue('weight-lbs');

    params.set('system', state.system);
    if (weight) params.set('weight', weight);
    const exercise = getValue('exercise-minutes');
    if (exercise && exercise !== '0') params.set('exercise', exercise);
    const climate = getValue('climate');
    if (climate && climate !== 'normal') params.set('climate', climate);

    const newURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    if (elements.calculateBtn) {
      elements.calculateBtn.addEventListener('click', () => {
        calculateResults();
        saveToURL();
        document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    document.querySelectorAll('.unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const system = btn.dataset.system;
        state.system = system;
        updateUnitButtons(system);
        toggleUnitSections(system);
        saveToURL();
      });
    });

    if (elements.clearBtn) {
      elements.clearBtn.addEventListener('click', clearAll);
    }

    if (elements.shareBtn) {
      elements.shareBtn.addEventListener('click', shareCalculation);
    }

    ['weight-lbs', 'weight-kg', 'exercise-minutes', 'climate'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', () => saveToURL());
    });
  }

  function updateUnitButtons(system) {
    document.querySelectorAll('.unit-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.system === system);
    });
  }

  function toggleUnitSections(system) {
    if (elements.imperialInputs) elements.imperialInputs.classList.toggle('hidden', system !== 'imperial');
    if (elements.metricInputs) elements.metricInputs.classList.toggle('hidden', system !== 'metric');
  }

  function calculateResults() {
    let weightKg;
    if (state.system === 'metric') {
      weightKg = parseFloat(getValue('weight-kg'));
    } else {
      const lbs = parseFloat(getValue('weight-lbs'));
      weightKg = lbs / 2.20462;
    }
    const exerciseMinutes = Math.max(0, parseFloat(getValue('exercise-minutes')) || 0);
    const climate = getValue('climate');
    const isHot = climate === 'hot';

    if (!weightKg || weightKg <= 0 || isNaN(weightKg)) {
      displayError('Please enter a valid weight.');
      return;
    }

    const baseMl = weightKg * 35;
    const exerciseMl = exerciseMinutes * 12;
    const climateMl = isHot ? 500 : 0;
    const totalMl = baseMl + exerciseMl + climateMl;

    const totalLiters = totalMl / 1000;
    const totalOz = totalMl / 29.5735;
    const totalCups = totalMl / 240;
    const totalBottles = totalMl / 500;

    displayResults({
      weightKg,
      exerciseMinutes,
      isHot,
      baseMl,
      exerciseMl,
      climateMl,
      totalMl,
      totalLiters,
      totalOz,
      totalCups,
      totalBottles
    });
  }

  function displayResults(r) {
    const html = `
      <div class="result-header">
        <h2>💧 Your Daily Water Intake</h2>
      </div>

      <div class="water-summary-cards">
        <div class="summary-card primary">
          <div class="summary-icon">🥤</div>
          <div class="summary-content">
            <div class="summary-value">${formatNum(r.totalOz)} oz</div>
            <div class="summary-label">Total Per Day</div>
          </div>
        </div>
        <div class="summary-card highlight">
          <div class="summary-icon">🧊</div>
          <div class="summary-content">
            <div class="summary-value">${formatNum(r.totalLiters, 2)} L</div>
            <div class="summary-label">Liters</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">☕</div>
          <div class="summary-content">
            <div class="summary-value">${formatNum(r.totalCups)}</div>
            <div class="summary-label">8 oz Cups</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">🍶</div>
          <div class="summary-content">
            <div class="summary-value">${formatNum(r.totalBottles, 1)}</div>
            <div class="summary-label">17 oz Bottles</div>
          </div>
        </div>
      </div>

      <div class="calculation-breakdown">
        <h3>📋 How We Got This Number</h3>
        <div class="breakdown-table-container">
          <table class="breakdown-table">
            <tbody>
              <tr>
                <td>Baseline (35 ml × ${formatNum(r.weightKg, 1)} kg body weight)</td>
                <td class="text-right">${formatNum(r.baseMl)} ml</td>
              </tr>
              <tr>
                <td>Exercise (12 ml × ${r.exerciseMinutes} min)</td>
                <td class="text-right text-success">${r.exerciseMl > 0 ? '+' : ''}${formatNum(r.exerciseMl)} ml</td>
              </tr>
              <tr>
                <td>Climate adjustment${r.isHot ? ' (hot/humid/altitude)' : ''}</td>
                <td class="text-right text-success">${r.climateMl > 0 ? '+' : ''}${formatNum(r.climateMl)} ml</td>
              </tr>
              <tr class="total-row">
                <td><strong>Total</strong></td>
                <td class="text-right"><strong>${formatNum(r.totalMl)} ml (${formatNum(r.totalLiters, 2)} L)</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="info-box" style="margin-top: 1.5rem;">
        <p style="margin: 0;">
          This is a general estimate for a healthy adult and includes fluid from all beverages. Roughly 20% of
          most people's fluid intake also comes from food, so you don't need to hit this number from plain water
          alone. Pregnant or breastfeeding? You'll generally need some extra fluid on top of this baseline —
          talk to your provider for a personalized target.
        </p>
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
    state.system = DEFAULT_VALUES.system;
    updateUnitButtons(state.system);
    toggleUnitSections(state.system);
    if (elements.weightLbs) elements.weightLbs.value = DEFAULT_VALUES.weightLbs;
    if (elements.weightKg) elements.weightKg.value = DEFAULT_VALUES.weightKg;
    if (elements.exerciseMinutes) elements.exerciseMinutes.value = DEFAULT_VALUES.exerciseMinutes;
    if (elements.climate) elements.climate.value = DEFAULT_VALUES.climate;
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

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function formatNum(n, decimals) {
    const d = typeof decimals === 'number' ? decimals : 0;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: d,
      maximumFractionDigits: d
    }).format(n);
  }

})();

// Result styles
const waterIntakeStyle = document.createElement('style');
waterIntakeStyle.textContent = `
  .water-summary-cards {
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
    .water-summary-cards {
      grid-template-columns: repeat(2, 1fr);
    }

    .summary-value {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 480px) {
    .water-summary-cards {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(waterIntakeStyle);
