(function() {
  'use strict';

  const ACTIVITY_MULTIPLIERS = {
    '1.2': { label: 'Sedentary', description: 'Little or no exercise, desk job' },
    '1.375': { label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
    '1.55': { label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
    '1.725': { label: 'Very Active', description: 'Heavy exercise 6-7 days/week' },
    '1.9': { label: 'Extra Active', description: 'Athlete or very physical job + training' }
  };

  let currentSystem = 'imperial';

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('system')) {
      currentSystem = params.get('system');
      switchSystem(currentSystem);
    }
    if (params.has('weight_lbs')) setValue('weight-lbs', params.get('weight_lbs'));
    if (params.has('weight_kg')) setValue('weight-kg', params.get('weight_kg'));
    if (params.has('height_ft')) setValue('height-feet', params.get('height_ft'));
    if (params.has('height_in')) setValue('height-inches', params.get('height_in'));
    if (params.has('height_cm')) setValue('height-cm', params.get('height_cm'));
    if (params.has('age')) setValue('age', params.get('age'));
    if (params.has('gender')) document.getElementById('gender').value = params.get('gender');
    if (params.has('activity')) document.getElementById('activity-level').value = params.get('activity');
    if (params.has('bodyfat')) setValue('body-fat', params.get('bodyfat'));

    if (params.toString()) {
      setTimeout(() => calculateResults(), 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('system', currentSystem);

    if (currentSystem === 'imperial') {
      params.set('weight_lbs', getValue('weight-lbs'));
      params.set('height_ft', getValue('height-feet'));
      params.set('height_in', getValue('height-inches'));
    } else {
      params.set('weight_kg', getValue('weight-kg'));
      params.set('height_cm', getValue('height-cm'));
    }
    params.set('age', getValue('age'));
    params.set('gender', document.getElementById('gender').value);
    params.set('activity', document.getElementById('activity-level').value);
    const bf = getValue('body-fat');
    if (bf > 0) params.set('bodyfat', bf);

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    const systemBtns = document.querySelectorAll('.unit-btn[data-system]');
    systemBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        switchSystem(this.dataset.system);
        saveToURL();
      });
    });

    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        calculateResults();
        document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    document.querySelectorAll('.form-input, .form-select').forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); calculateResults(); }
      });
      input.addEventListener('change', saveToURL);
    });

    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) shareBtn.addEventListener('click', shareCalculation);
  }

  function switchSystem(system) {
    currentSystem = system;
    document.querySelectorAll('.unit-btn[data-system]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.system === system);
    });
    document.getElementById('imperial-inputs').classList.toggle('hidden', system !== 'imperial');
    document.getElementById('metric-inputs').classList.toggle('hidden', system !== 'metric');
  }

  function calculateResults() {
    let weightKg, heightCm;

    if (currentSystem === 'imperial') {
      const weightLbs = getValue('weight-lbs');
      const heightFt = getValue('height-feet');
      const heightIn = getValue('height-inches');
      weightKg = weightLbs * 0.453592;
      heightCm = (heightFt * 12 + heightIn) * 2.54;
    } else {
      weightKg = getValue('weight-kg');
      heightCm = getValue('height-cm');
    }

    const age = getValue('age');
    const gender = document.getElementById('gender').value;
    const activityMultiplier = parseFloat(document.getElementById('activity-level').value);
    const bodyFat = getValue('body-fat');

    if (weightKg <= 0 || heightCm <= 0 || age <= 0) {
      showError('Please fill in all required fields with valid values.');
      return;
    }

    saveToURL();

    // Mifflin-St Jeor
    let bmrMifflin;
    if (gender === 'male') {
      bmrMifflin = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmrMifflin = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    // Katch-McArdle (if body fat provided)
    let bmrKatch = null;
    if (bodyFat > 0) {
      const leanMass = weightKg * (1 - bodyFat / 100);
      bmrKatch = 370 + (21.6 * leanMass);
    }

    const primaryBMR = bmrKatch || bmrMifflin;
    const tdee = primaryBMR * activityMultiplier;

    // Calorie targets
    const targets = {
      lose2: Math.round(tdee - 1000),
      lose1: Math.round(tdee - 500),
      loseMild: Math.round(tdee - 250),
      maintain: Math.round(tdee),
      gainMild: Math.round(tdee + 250),
      gain1: Math.round(tdee + 500)
    };

    // Activity level comparison
    const activityComparison = Object.entries(ACTIVITY_MULTIPLIERS).map(([mult, info]) => ({
      ...info,
      multiplier: parseFloat(mult),
      tdee: Math.round(primaryBMR * parseFloat(mult)),
      active: parseFloat(mult) === activityMultiplier
    }));

    displayResults({
      bmrMifflin: Math.round(bmrMifflin),
      bmrKatch: bmrKatch ? Math.round(bmrKatch) : null,
      primaryBMR: Math.round(primaryBMR),
      tdee: Math.round(tdee),
      targets,
      activityComparison,
      activityMultiplier,
      weightKg
    });
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('tdee-result');
    if (!resultDiv) return;

    resultDiv.innerHTML = `
      <h3>🔥 Your TDEE Results</h3>

      <div class="age-hero">
        <div class="age-big">${data.tdee.toLocaleString()} <span class="age-unit">calories/day</span></div>
        <div style="color: var(--color-gray-dark); margin-top: 0.5rem;">Total Daily Energy Expenditure</div>
      </div>

      <div class="margin-cards">
        <div class="margin-card">
          <div class="margin-card-icon">💤</div>
          <div class="margin-card-value">${data.primaryBMR.toLocaleString()}</div>
          <div class="margin-card-label">BMR (calories at rest)</div>
        </div>
        <div class="margin-card highlight">
          <div class="margin-card-icon">🔥</div>
          <div class="margin-card-value">${data.tdee.toLocaleString()}</div>
          <div class="margin-card-label">TDEE (daily burn)</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📅</div>
          <div class="margin-card-value">${(data.tdee * 7).toLocaleString()}</div>
          <div class="margin-card-label">Weekly Calorie Budget</div>
        </div>
      </div>

      ${data.bmrKatch ? `
        <div class="formula-comparison">
          <h4>🔬 Formula Comparison</h4>
          <div class="breakdown-table-container">
            <table class="profit-table">
              <thead><tr><th>Formula</th><th>BMR</th><th>Notes</th></tr></thead>
              <tbody>
                <tr>
                  <td>Mifflin-St Jeor</td>
                  <td><strong>${data.bmrMifflin.toLocaleString()} cal</strong></td>
                  <td>Standard formula (age, weight, height)</td>
                </tr>
                <tr class="current-row">
                  <td>Katch-McArdle ✓</td>
                  <td><strong>${data.bmrKatch.toLocaleString()} cal</strong></td>
                  <td>Uses lean body mass (more accurate for you)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      <div class="calorie-targets">
        <h4>🎯 Calorie Targets by Goal</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Goal</th><th>Daily Calories</th><th>Weekly Deficit/Surplus</th></tr></thead>
            <tbody>
              <tr><td>Lose 2 lbs/week</td><td><strong>${data.targets.lose2.toLocaleString()}</strong></td><td class="text-danger">-7,000 cal</td></tr>
              <tr><td>Lose 1 lb/week</td><td><strong>${data.targets.lose1.toLocaleString()}</strong></td><td class="text-danger">-3,500 cal</td></tr>
              <tr><td>Lose 0.5 lb/week</td><td><strong>${data.targets.loseMild.toLocaleString()}</strong></td><td class="text-danger">-1,750 cal</td></tr>
              <tr class="current-row"><td><strong>Maintain Weight</strong></td><td><strong>${data.targets.maintain.toLocaleString()}</strong></td><td>0</td></tr>
              <tr><td>Gain 0.5 lb/week</td><td><strong>${data.targets.gainMild.toLocaleString()}</strong></td><td class="text-success">+1,750 cal</td></tr>
              <tr><td>Gain 1 lb/week</td><td><strong>${data.targets.gain1.toLocaleString()}</strong></td><td class="text-success">+3,500 cal</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="activity-comparison">
        <h4>🏃 TDEE at Each Activity Level</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Activity Level</th><th>Multiplier</th><th>Daily TDEE</th></tr></thead>
            <tbody>
              ${data.activityComparison.map(a => `
                <tr class="${a.active ? 'current-row' : ''}">
                  <td>${a.label} ${a.active ? '✓' : ''}<br><small style="color: var(--color-gray-dark);">${a.description}</small></td>
                  <td>×${a.multiplier}</td>
                  <td><strong>${a.tdee.toLocaleString()} cal</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="insights-grid">
        <div class="insight-card insight-info">
          <div class="insight-icon">💡</div>
          <div class="insight-content">
            <h5>Important Note</h5>
            <p>TDEE is an estimate. Track your intake and weight for 2-3 weeks, then adjust by 100-200 calories based on actual results.</p>
          </div>
        </div>
        <div class="insight-card insight-warning">
          <div class="insight-icon">⚠️</div>
          <div class="insight-content">
            <h5>Minimum Intake</h5>
            <p>Never eat below your BMR (${data.primaryBMR.toLocaleString()} cal) for extended periods. This can slow metabolism and cause nutrient deficiencies.</p>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    const resultDiv = document.getElementById('tdee-result');
    if (resultDiv) {
      resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`;
      resultDiv.classList.remove('hidden');
    }
  }

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? parseFloat(el.value) || 0 : 0;
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'TDEE Calculator', url }).catch(() => copyToClipboard(url));
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const shareBtn = document.getElementById('share-calculation');
      if (shareBtn) {
        const original = shareBtn.innerHTML;
        shareBtn.innerHTML = '✓ Link Copied!';
        setTimeout(() => { shareBtn.innerHTML = original; }, 2000);
      }
    }).catch(() => {});
  }

})();
