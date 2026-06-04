(function() {
  'use strict';

  let currentMode = 'weighted';

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('mode')) { currentMode = params.get('mode'); switchMode(currentMode); }
    if (params.has('current')) setValue('current-grade', params.get('current'));
    if (params.has('cweight')) setValue('current-weight', params.get('cweight'));
    if (params.has('desired')) setValue('desired-grade', params.get('desired'));
    if (params.has('fweight')) setValue('final-weight', params.get('fweight'));

    if (params.toString()) setTimeout(() => calculateResults(), 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('mode', currentMode);
    if (currentMode === 'final') {
      params.set('current', getValue('current-grade'));
      params.set('cweight', getValue('current-weight'));
      params.set('desired', getValue('desired-grade'));
      params.set('fweight', getValue('final-weight'));
    }
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.querySelectorAll('.unit-btn[data-mode]').forEach(btn => {
      btn.addEventListener('click', function() { switchMode(this.dataset.mode); saveToURL(); });
    });

    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('add-assignment').addEventListener('click', addAssignment);

    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-assignment')) {
        const rows = document.querySelectorAll('.assignment-row');
        if (rows.length > 1) e.target.closest('.assignment-row').remove();
      }
    });

    document.querySelectorAll('.form-input, .form-select').forEach(input => {
      input.addEventListener('keypress', function(e) { if (e.key === 'Enter') { e.preventDefault(); calculateResults(); } });
    });

    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function switchMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.unit-btn[data-mode]').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
    document.getElementById('mode-weighted').classList.toggle('hidden', mode !== 'weighted');
    document.getElementById('mode-final').classList.toggle('hidden', mode !== 'final');
  }

  function addAssignment() {
    const container = document.getElementById('assignments-container');
    const row = document.createElement('div');
    row.className = 'assignment-row form-row';
    row.innerHTML = `
      <div class="form-group" style="flex: 2;">
        <input type="text" class="form-input assignment-name" placeholder="Assignment name" />
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="number" class="form-input assignment-score" placeholder="0" min="0" max="200" step="0.1" />
          <span class="input-addon">%</span>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="number" class="form-input assignment-weight" placeholder="0" min="0" max="100" step="0.5" />
          <span class="input-addon">%</span>
        </div>
      </div>
      <div class="form-group" style="flex: 0; padding-top: 0;">
        <button type="button" class="btn btn-secondary remove-assignment" style="padding: 0.4rem 0.8rem; color: #ef4444;">✕</button>
      </div>
    `;
    container.appendChild(row);
  }

  function calculateResults() {
    saveToURL();
    if (currentMode === 'weighted') calculateWeighted();
    else calculateFinalNeeded();
  }

  function calculateWeighted() {
    const rows = document.querySelectorAll('.assignment-row');
    const assignments = [];

    rows.forEach(row => {
      const name = row.querySelector('.assignment-name')?.value || 'Unnamed';
      const score = parseFloat(row.querySelector('.assignment-score')?.value) || 0;
      const weight = parseFloat(row.querySelector('.assignment-weight')?.value) || 0;
      if (weight > 0) assignments.push({ name, score, weight });
    });

    if (assignments.length === 0) { showError('Please add at least one assignment with a weight.'); return; }

    const totalWeight = assignments.reduce((sum, a) => sum + a.weight, 0);
    const weightedSum = assignments.reduce((sum, a) => sum + (a.score * a.weight), 0);
    const currentGrade = weightedSum / totalWeight;
    const letterGrade = getLetterGrade(currentGrade);

    const remainingWeight = 100 - totalWeight;

    // What's needed for each letter grade on remaining work
    const gradeTargets = [
      { letter: 'A', min: 90 },
      { letter: 'B', min: 80 },
      { letter: 'C', min: 70 },
      { letter: 'D', min: 60 }
    ].map(target => {
      const needed = remainingWeight > 0 ? ((target.min * 100) - weightedSum) / remainingWeight : null;
      return { ...target, needed, achievable: needed !== null && needed <= 100 };
    });

    displayWeightedResults({ assignments, currentGrade, letterGrade, totalWeight, remainingWeight, gradeTargets });
  }

  function calculateFinalNeeded() {
    const currentGrade = getValue('current-grade');
    const currentWeight = getValue('current-weight');
    const desiredGrade = getValue('desired-grade');
    const finalWeight = getValue('final-weight');

    if (currentWeight <= 0 || finalWeight <= 0) { showError('Please fill in all fields.'); return; }

    const neededOnFinal = (desiredGrade * (currentWeight + finalWeight) - currentGrade * currentWeight) / finalWeight;

    // Scenarios for each letter grade
    const scenarios = [
      { letter: 'A', target: 90 },
      { letter: 'B', target: 80 },
      { letter: 'C', target: 70 },
      { letter: 'D', target: 60 }
    ].map(s => {
      const needed = (s.target * (currentWeight + finalWeight) - currentGrade * currentWeight) / finalWeight;
      return { ...s, needed, achievable: needed <= 100 };
    });

    displayFinalResults({ currentGrade, currentWeight, desiredGrade, finalWeight, neededOnFinal, scenarios });
  }

  function displayWeightedResults(data) {
    const resultDiv = document.getElementById('grade-result');
    if (!resultDiv) return;

    resultDiv.innerHTML = `
      <h3>📚 Your Grade</h3>

      <div class="age-hero">
        <div class="age-big">${data.currentGrade.toFixed(1)}% <span class="age-unit">(${data.letterGrade})</span></div>
        <div style="color: var(--color-gray-dark); margin-top: 0.5rem;">Weighted average across ${data.assignments.length} assignments (${data.totalWeight}% of course completed)</div>
      </div>

      <div class="visual-bar-section">
        <div class="visual-bar-container">
          <div class="visual-bar-fill" style="width: ${Math.min(data.currentGrade, 100)}%; background: ${getGradeColor(data.currentGrade)};"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--color-gray-dark);">
          <span>0%</span><span>60% (D)</span><span>70% (C)</span><span>80% (B)</span><span>90% (A)</span><span>100%</span>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>📋 Assignment Breakdown</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Assignment</th><th>Score</th><th>Weight</th><th>Contribution</th></tr></thead>
            <tbody>
              ${data.assignments.map(a => `
                <tr>
                  <td>${a.name}</td>
                  <td>${a.score}%</td>
                  <td>${a.weight}%</td>
                  <td><strong>${((a.score * a.weight) / data.totalWeight).toFixed(1)} pts</strong></td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td><strong>Total</strong></td>
                <td><strong>${data.currentGrade.toFixed(1)}%</strong></td>
                <td><strong>${data.totalWeight}%</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      ${data.remainingWeight > 0 ? `
        <div class="pricing-scenarios">
          <h4>🎯 What You Need on Remaining Work (${data.remainingWeight}% of course)</h4>
          <div class="breakdown-table-container">
            <table class="profit-table">
              <thead><tr><th>Target Grade</th><th>Score Needed</th><th>Achievable?</th></tr></thead>
              <tbody>
                ${data.gradeTargets.map(t => `
                  <tr>
                    <td><strong>${t.letter} (${t.min}%+)</strong></td>
                    <td>${t.needed !== null ? t.needed.toFixed(1) + '%' : 'N/A'}</td>
                    <td>${t.achievable ? '✅ Yes' : (t.needed > 100 ? '❌ Not possible' : '—')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    `;

    resultDiv.classList.remove('hidden');
  }

  function displayFinalResults(data) {
    const resultDiv = document.getElementById('grade-result');
    if (!resultDiv) return;

    const achievable = data.neededOnFinal <= 100;
    const letterNeeded = getLetterGrade(data.neededOnFinal);

    resultDiv.innerHTML = `
      <h3>📝 Final Exam Score Needed</h3>

      <div class="age-hero">
        <div class="age-big">${data.neededOnFinal.toFixed(1)}% <span class="age-unit">needed on final</span></div>
        <div style="color: var(--color-gray-dark); margin-top: 0.5rem;">
          ${achievable ? `You need a ${letterNeeded} on your final to achieve ${data.desiredGrade}% overall` : '⚠️ This target is not mathematically achievable'}
        </div>
      </div>

      <div class="profit-status ${achievable ? (data.neededOnFinal <= 70 ? 'status-excellent' : 'status-good') : 'status-loss'}">
        <div class="status-icon">${achievable ? (data.neededOnFinal <= 70 ? '🎉' : '📊') : '⚠️'}</div>
        <div class="status-content">
          <strong>${achievable ? (data.neededOnFinal <= 70 ? 'Very achievable!' : 'Achievable with solid preparation') : 'Not achievable — aim for a lower target'}</strong>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Current: ${data.currentGrade}% (${data.currentWeight}% completed) | Final exam: ${data.finalWeight}% of grade</p>
        </div>
      </div>

      <div class="pricing-scenarios">
        <h4>🎯 Scores Needed for Each Letter Grade</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Final Grade</th><th>Score Needed on Final</th><th>Achievable?</th></tr></thead>
            <tbody>
              ${data.scenarios.map(s => `
                <tr class="${s.target === data.desiredGrade ? 'current-row' : ''}">
                  <td><strong>${s.letter} (${s.target}%)</strong></td>
                  <td>${s.needed.toFixed(1)}%</td>
                  <td>${s.achievable ? '✅ Yes' : '❌ No (>100%)'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="insights-grid">
        <div class="insight-card insight-info">
          <div class="insight-icon">📐</div>
          <div class="insight-content">
            <h5>The Formula</h5>
            <p>Needed = (Desired × Total Weight - Current × Current Weight) ÷ Final Weight</p>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function getLetterGrade(score) {
    if (score >= 97) return 'A+';
    if (score >= 93) return 'A';
    if (score >= 90) return 'A-';
    if (score >= 87) return 'B+';
    if (score >= 83) return 'B';
    if (score >= 80) return 'B-';
    if (score >= 77) return 'C+';
    if (score >= 73) return 'C';
    if (score >= 70) return 'C-';
    if (score >= 67) return 'D+';
    if (score >= 63) return 'D';
    if (score >= 60) return 'D-';
    return 'F';
  }

  function getGradeColor(score) {
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#3b82f6';
    if (score >= 70) return '#f59e0b';
    if (score >= 60) return '#f97316';
    return '#ef4444';
  }

  function showError(message) {
    const resultDiv = document.getElementById('grade-result');
    if (resultDiv) { resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`; resultDiv.classList.remove('hidden'); }
  }

  function getValue(id) { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }
  function setValue(id, value) { const el = document.getElementById(id); if (el) el.value = value; }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'Grade Calculator', url }).catch(() => copyToClipboard(url)); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-calculation');
      if (btn) { const orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(() => { btn.innerHTML = orig; }, 2000); }
    }).catch(() => {});
  }
})();
