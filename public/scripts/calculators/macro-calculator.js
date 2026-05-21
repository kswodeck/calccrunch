(function() {
  'use strict';

  let currentSystem = 'imperial';

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('system')) { currentSystem = params.get('system'); switchSystem(currentSystem); }
    if (params.has('weight_lbs')) setValue('weight-lbs', params.get('weight_lbs'));
    if (params.has('weight_kg')) setValue('weight-kg', params.get('weight_kg'));
    if (params.has('height_ft')) setValue('height-feet', params.get('height_ft'));
    if (params.has('height_in')) setValue('height-inches', params.get('height_in'));
    if (params.has('height_cm')) setValue('height-cm', params.get('height_cm'));
    if (params.has('age')) setValue('age', params.get('age'));
    if (params.has('gender')) document.getElementById('gender').value = params.get('gender');
    if (params.has('activity')) document.getElementById('activity-level').value = params.get('activity');
    if (params.has('goal')) document.getElementById('goal').value = params.get('goal');
    if (params.has('intensity')) document.getElementById('intensity').value = params.get('intensity');
    if (params.has('meals')) document.getElementById('meals-per-day').value = params.get('meals');

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
    params.set('goal', document.getElementById('goal').value);
    params.set('intensity', document.getElementById('intensity').value);
    params.set('meals', document.getElementById('meals-per-day').value);

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
    let weightKg, heightCm, weightLbs;

    if (currentSystem === 'imperial') {
      weightLbs = getValue('weight-lbs');
      const heightFt = getValue('height-feet');
      const heightIn = getValue('height-inches');
      weightKg = weightLbs * 0.453592;
      heightCm = (heightFt * 12 + heightIn) * 2.54;
    } else {
      weightKg = getValue('weight-kg');
      heightCm = getValue('height-cm');
      weightLbs = weightKg / 0.453592;
    }

    const age = getValue('age');
    const gender = document.getElementById('gender').value;
    const activityMultiplier = parseFloat(document.getElementById('activity-level').value);
    const goal = document.getElementById('goal').value;
    const intensity = document.getElementById('intensity').value;
    const mealsPerDay = parseInt(document.getElementById('meals-per-day').value);

    if (weightKg <= 0 || heightCm <= 0 || age <= 0) {
      showError('Please fill in all required fields.');
      return;
    }

    saveToURL();

    // BMR (Mifflin-St Jeor)
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    const tdee = bmr * activityMultiplier;

    // Adjust calories for goal
    let targetCalories;
    if (goal === 'lose') {
      targetCalories = intensity === 'aggressive' ? tdee - 750 : tdee - 500;
    } else if (goal === 'gain') {
      targetCalories = intensity === 'aggressive' ? tdee + 500 : tdee + 300;
    } else {
      targetCalories = tdee;
    }
    targetCalories = Math.round(Math.max(targetCalories, bmr * 0.8));

    // Macro calculations
    let proteinPerLb;
    if (goal === 'lose') proteinPerLb = intensity === 'aggressive' ? 1.2 : 1.0;
    else if (goal === 'gain') proteinPerLb = 1.1;
    else proteinPerLb = 0.9;

    const proteinGrams = Math.round(weightLbs * proteinPerLb);
    const proteinCalories = proteinGrams * 4;

    const fatPercent = goal === 'lose' ? 0.25 : 0.30;
    const fatCalories = Math.round(targetCalories * fatPercent);
    const fatGrams = Math.round(fatCalories / 9);

    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = Math.round(carbCalories / 4);

    const proteinPct = Math.round((proteinCalories / targetCalories) * 100);
    const fatPct = Math.round((fatCalories / targetCalories) * 100);
    const carbPct = 100 - proteinPct - fatPct;

    // Preset splits
    const presets = [
      { name: 'High Protein', protein: Math.round(weightLbs * 1.2), fatPct: 25 },
      { name: 'Balanced', protein: Math.round(weightLbs * 0.8), fatPct: 30 },
      { name: 'Low Carb', protein: Math.round(weightLbs * 1.0), fatPct: 45 },
      { name: 'High Carb (Athlete)', protein: Math.round(weightLbs * 0.8), fatPct: 20 }
    ];

    const presetData = presets.map(p => {
      const pCal = p.protein * 4;
      const fCal = Math.round(targetCalories * (p.fatPct / 100));
      const cCal = targetCalories - pCal - fCal;
      return {
        name: p.name,
        protein: p.protein,
        fat: Math.round(fCal / 9),
        carbs: Math.round(cCal / 4),
        proteinPct: Math.round((pCal / targetCalories) * 100),
        fatPct: p.fatPct,
        carbPct: Math.round((cCal / targetCalories) * 100)
      };
    });

    displayResults({
      tdee: Math.round(tdee),
      bmr: Math.round(bmr),
      targetCalories: Math.round(targetCalories),
      goal, intensity,
      proteinGrams, fatGrams, carbGrams,
      proteinPct, fatPct, carbPct,
      proteinCalories, fatCalories, carbCalories,
      mealsPerDay, presetData, weightLbs
    });
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('macro-result');
    if (!resultDiv) return;

    const goalLabels = { lose: 'Fat Loss', maintain: 'Maintenance', gain: 'Muscle Gain' };

    const mealBreakdown = data.mealsPerDay > 0 ? `
      <div class="meal-breakdown">
        <h4>🍽️ Per Meal Breakdown (${data.mealsPerDay} meals/day)</h4>
        <div class="margin-cards">
          <div class="margin-card">
            <div class="margin-card-icon">🔥</div>
            <div class="margin-card-value">${Math.round(data.targetCalories / data.mealsPerDay)}</div>
            <div class="margin-card-label">Calories/meal</div>
          </div>
          <div class="margin-card">
            <div class="margin-card-icon">🥩</div>
            <div class="margin-card-value">${Math.round(data.proteinGrams / data.mealsPerDay)}g</div>
            <div class="margin-card-label">Protein/meal</div>
          </div>
          <div class="margin-card">
            <div class="margin-card-icon">🍞</div>
            <div class="margin-card-value">${Math.round(data.carbGrams / data.mealsPerDay)}g</div>
            <div class="margin-card-label">Carbs/meal</div>
          </div>
          <div class="margin-card">
            <div class="margin-card-icon">🥑</div>
            <div class="margin-card-value">${Math.round(data.fatGrams / data.mealsPerDay)}g</div>
            <div class="margin-card-label">Fat/meal</div>
          </div>
        </div>
      </div>
    ` : '';

    resultDiv.innerHTML = `
      <h3>🎯 Your Macro Targets</h3>
      <div style="text-align: center; margin-bottom: 1rem; color: var(--color-gray-dark);">
        Goal: <strong>${goalLabels[data.goal]}</strong> | TDEE: ${data.tdee.toLocaleString()} cal | Target: ${data.targetCalories.toLocaleString()} cal
      </div>

      <div class="macro-ring-container">
        <div class="macro-ring">
          <svg viewBox="0 0 200 200" width="200" height="200">
            ${generateDonutChart(data.proteinPct, data.carbPct, data.fatPct)}
          </svg>
          <div class="macro-ring-center">
            <strong>${data.targetCalories}</strong>
            <small>cal/day</small>
          </div>
        </div>
      </div>

      <div class="margin-cards">
        <div class="margin-card" style="border-top: 4px solid #ef4444;">
          <div class="margin-card-icon">🥩</div>
          <div class="margin-card-value">${data.proteinGrams}g</div>
          <div class="margin-card-label">Protein (${data.proteinPct}%)</div>
          <div class="margin-card-amount">${data.proteinCalories} cal</div>
        </div>
        <div class="margin-card" style="border-top: 4px solid #3b82f6;">
          <div class="margin-card-icon">🍞</div>
          <div class="margin-card-value">${data.carbGrams}g</div>
          <div class="margin-card-label">Carbs (${data.carbPct}%)</div>
          <div class="margin-card-amount">${data.carbCalories} cal</div>
        </div>
        <div class="margin-card" style="border-top: 4px solid #f59e0b;">
          <div class="margin-card-icon">🥑</div>
          <div class="margin-card-value">${data.fatGrams}g</div>
          <div class="margin-card-label">Fat (${data.fatPct}%)</div>
          <div class="margin-card-amount">${data.fatCalories} cal</div>
        </div>
      </div>

      ${mealBreakdown}

      <div class="preset-splits">
        <h4>🔄 Alternative Macro Splits (same calories)</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Split</th><th>Protein</th><th>Carbs</th><th>Fat</th></tr></thead>
            <tbody>
              ${data.presetData.map(p => `
                <tr>
                  <td><strong>${p.name}</strong></td>
                  <td>${p.protein}g (${p.proteinPct}%)</td>
                  <td>${p.carbs}g (${p.carbPct}%)</td>
                  <td>${p.fat}g (${p.fatPct}%)</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="food-examples">
        <h4>🍖 Hitting Your Protein (${data.proteinGrams}g) — Example Foods</h4>
        <div class="insights-grid">
          <div class="insight-card insight-info">
            <div class="insight-icon">🐔</div>
            <div class="insight-content"><h5>Chicken Breast</h5><p>${Math.round(data.proteinGrams / 31 * 100)}g (~${(data.proteinGrams / 31).toFixed(1)} servings)</p></div>
          </div>
          <div class="insight-card insight-info">
            <div class="insight-icon">🥚</div>
            <div class="insight-content"><h5>Eggs</h5><p>${Math.round(data.proteinGrams / 6)} eggs (6g protein each)</p></div>
          </div>
          <div class="insight-card insight-info">
            <div class="insight-icon">🥛</div>
            <div class="insight-content"><h5>Greek Yogurt</h5><p>${(data.proteinGrams / 17).toFixed(1)} cups (17g per cup)</p></div>
          </div>
          <div class="insight-card insight-info">
            <div class="insight-icon">🥤</div>
            <div class="insight-content"><h5>Protein Shake</h5><p>${Math.round(data.proteinGrams / 25)} scoops (25g per scoop)</p></div>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function generateDonutChart(proteinPct, carbPct, fatPct) {
    const radius = 80;
    const cx = 100, cy = 100;
    const circumference = 2 * Math.PI * radius;

    const proteinLen = (proteinPct / 100) * circumference;
    const carbLen = (carbPct / 100) * circumference;
    const fatLen = (fatPct / 100) * circumference;

    let offset = 0;
    const proteinOffset = offset;
    offset += proteinLen;
    const carbOffset = offset;
    offset += carbLen;
    const fatOffset = offset;

    return `
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#ef4444" stroke-width="24"
        stroke-dasharray="${proteinLen} ${circumference - proteinLen}"
        stroke-dashoffset="${-proteinOffset}" transform="rotate(-90 ${cx} ${cy})" />
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#3b82f6" stroke-width="24"
        stroke-dasharray="${carbLen} ${circumference - carbLen}"
        stroke-dashoffset="${-carbOffset}" transform="rotate(-90 ${cx} ${cy})" />
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#f59e0b" stroke-width="24"
        stroke-dasharray="${fatLen} ${circumference - fatLen}"
        stroke-dashoffset="${-fatOffset}" transform="rotate(-90 ${cx} ${cy})" />
    `;
  }

  function showError(message) {
    const resultDiv = document.getElementById('macro-result');
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
      navigator.share({ title: 'Macro Calculator', url }).catch(() => copyToClipboard(url));
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
