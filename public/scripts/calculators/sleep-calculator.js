(function() {
  'use strict';

  const CYCLE_DURATION = 90; // minutes
  const SLEEP_RECOMMENDATIONS = {
    'newborn': { min: 14, max: 17, label: 'Newborn (0-3 months)' },
    'infant': { min: 12, max: 15, label: 'Infant (4-11 months)' },
    'toddler': { min: 11, max: 14, label: 'Toddler (1-2 years)' },
    'preschool': { min: 10, max: 13, label: 'Preschool (3-5 years)' },
    'school': { min: 9, max: 12, label: 'School Age (6-12 years)' },
    'teen': { min: 8, max: 10, label: 'Teenager (13-17 years)' },
    'young-adult': { min: 7, max: 9, label: 'Young Adult (18-25 years)' },
    'adult': { min: 7, max: 9, label: 'Adult (26-64 years)' },
    'senior': { min: 7, max: 8, label: 'Senior (65+ years)' }
  };

  let currentMode = 'wake';

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('mode')) {
      currentMode = params.get('mode');
      setMode(currentMode);
    }
    if (params.has('wake')) setValue('wake-time', params.get('wake'));
    if (params.has('bed')) setValue('bed-time', params.get('bed'));
    if (params.has('nap')) setValue('nap-start-time', params.get('nap'));
    if (params.has('fall')) {
      setValue('fall-asleep-time', params.get('fall'));
      setValue('fall-asleep-time-2', params.get('fall'));
      setValue('nap-fall-asleep', params.get('fall'));
    }
    if (params.has('age')) setValue('user-age', params.get('age'));

    if (params.toString()) setTimeout(() => calculateResults(), 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('mode', currentMode);
    if (currentMode === 'wake') {
      params.set('wake', getValue('wake-time'));
      params.set('fall', getValue('fall-asleep-time'));
    } else if (currentMode === 'sleep') {
      params.set('bed', getValue('bed-time'));
      params.set('fall', getValue('fall-asleep-time-2'));
    } else {
      params.set('nap', getValue('nap-start-time'));
      params.set('fall', getValue('nap-fall-asleep'));
    }
    params.set('age', getValue('user-age'));
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        setMode(this.dataset.mode);
      });
    });

    document.querySelectorAll('.form-input, .form-select').forEach(input => {
      input.addEventListener('keypress', function(e) { if (e.key === 'Enter') { e.preventDefault(); calculateResults(); } });
      input.addEventListener('change', saveToURL);
    });

    document.getElementById('use-current-time').addEventListener('click', useCurrentTime);
    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    document.getElementById('wake-mode-section').classList.toggle('hidden', mode !== 'wake');
    document.getElementById('sleep-mode-section').classList.toggle('hidden', mode !== 'sleep');
    document.getElementById('nap-mode-section').classList.toggle('hidden', mode !== 'nap');
  }

  function useCurrentTime() {
    const now = new Date();
    const timeStr = padZero(now.getHours()) + ':' + padZero(now.getMinutes());
    if (currentMode === 'wake') {
      setValue('wake-time', timeStr);
    } else if (currentMode === 'sleep') {
      setValue('bed-time', timeStr);
    } else {
      setValue('nap-start-time', timeStr);
    }
  }

  function calculateResults() {
    saveToURL();

    if (currentMode === 'wake') {
      calculateWakeMode();
    } else if (currentMode === 'sleep') {
      calculateSleepMode();
    } else {
      calculateNapMode();
    }
  }

  function calculateWakeMode() {
    const wakeTime = getValue('wake-time');
    const fallAsleep = parseInt(getValue('fall-asleep-time')) || 15;

    if (!wakeTime) { showError('Please enter a wake-up time.'); return; }

    const [wakeHour, wakeMin] = wakeTime.split(':').map(Number);
    const wakeMinutes = wakeHour * 60 + wakeMin;

    const bedtimes = [];
    for (let cycles = 6; cycles >= 3; cycles--) {
      const sleepNeeded = cycles * CYCLE_DURATION;
      const bedMinutes = ((wakeMinutes - sleepNeeded - fallAsleep) + 1440) % 1440;
      const totalSleep = cycles * CYCLE_DURATION;
      const hours = Math.floor(totalSleep / 60);
      const mins = totalSleep % 60;
      bedtimes.push({
        cycles,
        time: minutesToTime(bedMinutes),
        timeFormatted: formatTime(bedMinutes),
        totalSleep: `${hours}h ${mins > 0 ? mins + 'm' : ''}`.trim(),
        totalMinutes: totalSleep,
        quality: getQualityRating(totalSleep)
      });
    }

    displayWakeResults(bedtimes, formatTime(wakeMinutes), fallAsleep);
  }

  function calculateSleepMode() {
    const bedTime = getValue('bed-time');
    const fallAsleep = parseInt(getValue('fall-asleep-time-2')) || 15;

    if (!bedTime) { showError('Please enter a bedtime.'); return; }

    const [bedHour, bedMin] = bedTime.split(':').map(Number);
    const bedMinutes = bedHour * 60 + bedMin;
    const sleepStart = bedMinutes + fallAsleep;

    const wakeTimes = [];
    for (let cycles = 3; cycles <= 6; cycles++) {
      const sleepDuration = cycles * CYCLE_DURATION;
      const wakeMinutes = (sleepStart + sleepDuration) % 1440;
      const hours = Math.floor(sleepDuration / 60);
      const mins = sleepDuration % 60;
      wakeTimes.push({
        cycles,
        time: minutesToTime(wakeMinutes),
        timeFormatted: formatTime(wakeMinutes),
        totalSleep: `${hours}h ${mins > 0 ? mins + 'm' : ''}`.trim(),
        totalMinutes: sleepDuration,
        quality: getQualityRating(sleepDuration)
      });
    }

    displaySleepResults(wakeTimes, formatTime(bedMinutes), fallAsleep);
  }

  function calculateNapMode() {
    const napStart = getValue('nap-start-time');
    const fallAsleep = parseInt(getValue('nap-fall-asleep')) || 10;

    if (!napStart) { showError('Please enter a nap start time.'); return; }

    const [napHour, napMin] = napStart.split(':').map(Number);
    const napMinutes = napHour * 60 + napMin;
    const sleepStart = napMinutes + fallAsleep;

    const napOptions = [
      { name: 'Power Nap', duration: 20, desc: 'Light sleep only — boosts alertness', icon: '⚡' },
      { name: 'Short Nap', duration: 30, desc: 'Light + some deep sleep — moderate boost', icon: '😴' },
      { name: 'Full Cycle', duration: 90, desc: 'Complete sleep cycle — full restoration', icon: '🌙' },
      { name: 'Double Cycle', duration: 120, desc: 'Two cycles — extended recovery', icon: '💤' }
    ];

    napOptions.forEach(opt => {
      const wakeMinutes = (sleepStart + opt.duration) % 1440;
      opt.wakeTime = formatTime(wakeMinutes);
      opt.setAlarm = minutesToTime(wakeMinutes);
    });

    displayNapResults(napOptions, formatTime(napMinutes), fallAsleep);
  }

  function getQualityRating(totalMinutes) {
    const ageGroup = getValue('user-age') || 'adult';
    const rec = SLEEP_RECOMMENDATIONS[ageGroup];
    const hours = totalMinutes / 60;

    if (hours >= rec.min && hours <= rec.max) return { label: 'Optimal', class: 'status-excellent', icon: '🟢' };
    if (hours >= rec.min - 0.5 && hours <= rec.max + 0.5) return { label: 'Good', class: 'status-good', icon: '🟡' };
    if (hours < rec.min - 0.5) return { label: 'Too Short', class: 'status-poor', icon: '🔴' };
    return { label: 'Longer than needed', class: 'status-moderate', icon: '🟡' };
  }

  function displayWakeResults(bedtimes, wakeFormatted, fallAsleep) {
    const ageGroup = getValue('user-age') || 'adult';
    const rec = SLEEP_RECOMMENDATIONS[ageGroup];
    const resultDiv = document.getElementById('sleep-result');

    resultDiv.innerHTML = `
      <h3>🌙 Recommended Bedtimes</h3>

      <div class="profit-status status-good">
        <div class="status-icon">⏰</div>
        <div class="status-content">
          <strong>To wake up at ${wakeFormatted}, go to bed at one of these times:</strong>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Includes ${fallAsleep} minutes to fall asleep. Each time aligns with the end of a sleep cycle.</p>
        </div>
      </div>

      <div class="margin-cards">
        ${bedtimes.map(b => `
          <div class="margin-card ${b.quality.class === 'status-excellent' ? 'highlight' : ''}">
            <div class="margin-card-icon">${b.quality.icon}</div>
            <div class="margin-card-value">${b.timeFormatted}</div>
            <div class="margin-card-label">${b.cycles} cycles · ${b.totalSleep}</div>
            <small style="color: var(--color-gray-dark)">${b.quality.label}</small>
          </div>
        `).join('')}
      </div>

      <div class="profit-breakdown">
        <h4>📊 Sleep Cycle Breakdown</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Bedtime</th><th>Cycles</th><th>Total Sleep</th><th>Rating</th></tr></thead>
            <tbody>
              ${bedtimes.map(b => `
                <tr class="${b.quality.class === 'status-excellent' ? 'current-row' : ''}">
                  <td><strong>${b.timeFormatted}</strong></td>
                  <td>${b.cycles} cycles</td>
                  <td>${b.totalSleep}</td>
                  <td>${b.quality.icon} ${b.quality.label}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      ${getSleepStagesVisualization(bedtimes.find(b => b.quality.class === 'status-excellent') || bedtimes[0])}

      <div class="insights-grid">
        <div class="insight-card insight-info">
          <div class="insight-icon">📋</div>
          <div class="insight-content">
            <h5>Recommended for ${rec.label}</h5>
            <p>${rec.min}-${rec.max} hours per night (${Math.round(rec.min * 60 / CYCLE_DURATION)}-${Math.round(rec.max * 60 / CYCLE_DURATION)} complete cycles)</p>
          </div>
        </div>
        <div class="insight-card insight-success">
          <div class="insight-icon">💡</div>
          <div class="insight-content">
            <h5>Sleep Hygiene Tip</h5>
            <p>Keep a consistent sleep schedule — even on weekends. Your circadian rhythm benefits from regularity.</p>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function displaySleepResults(wakeTimes, bedFormatted, fallAsleep) {
    const ageGroup = getValue('user-age') || 'adult';
    const rec = SLEEP_RECOMMENDATIONS[ageGroup];
    const resultDiv = document.getElementById('sleep-result');

    resultDiv.innerHTML = `
      <h3>☀️ Recommended Wake Times</h3>

      <div class="profit-status status-good">
        <div class="status-icon">🛏️</div>
        <div class="status-content">
          <strong>Going to bed at ${bedFormatted}? Wake up at one of these times:</strong>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Includes ${fallAsleep} minutes to fall asleep. Each time aligns with the end of a sleep cycle.</p>
        </div>
      </div>

      <div class="margin-cards">
        ${wakeTimes.map(w => `
          <div class="margin-card ${w.quality.class === 'status-excellent' ? 'highlight' : ''}">
            <div class="margin-card-icon">${w.quality.icon}</div>
            <div class="margin-card-value">${w.timeFormatted}</div>
            <div class="margin-card-label">${w.cycles} cycles · ${w.totalSleep}</div>
            <small style="color: var(--color-gray-dark)">${w.quality.label}</small>
          </div>
        `).join('')}
      </div>

      <div class="profit-breakdown">
        <h4>📊 Sleep Cycle Breakdown</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Wake Time</th><th>Cycles</th><th>Total Sleep</th><th>Rating</th></tr></thead>
            <tbody>
              ${wakeTimes.map(w => `
                <tr class="${w.quality.class === 'status-excellent' ? 'current-row' : ''}">
                  <td><strong>${w.timeFormatted}</strong></td>
                  <td>${w.cycles} cycles</td>
                  <td>${w.totalSleep}</td>
                  <td>${w.quality.icon} ${w.quality.label}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      ${getSleepStagesVisualization(wakeTimes.find(w => w.quality.class === 'status-excellent') || wakeTimes[wakeTimes.length - 1])}

      <div class="insights-grid">
        <div class="insight-card insight-info">
          <div class="insight-icon">📋</div>
          <div class="insight-content">
            <h5>Recommended for ${rec.label}</h5>
            <p>${rec.min}-${rec.max} hours per night (${Math.round(rec.min * 60 / CYCLE_DURATION)}-${Math.round(rec.max * 60 / CYCLE_DURATION)} complete cycles)</p>
          </div>
        </div>
        <div class="insight-card insight-success">
          <div class="insight-icon">💡</div>
          <div class="insight-content">
            <h5>Sleep Hygiene Tip</h5>
            <p>Avoid screens 30-60 minutes before bed. Blue light suppresses melatonin and delays sleep onset.</p>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function displayNapResults(napOptions, napFormatted, fallAsleep) {
    const resultDiv = document.getElementById('sleep-result');

    resultDiv.innerHTML = `
      <h3>😴 Nap Schedule</h3>

      <div class="profit-status status-good">
        <div class="status-icon">💤</div>
        <div class="status-content">
          <strong>Starting your nap at ${napFormatted}</strong>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Includes ${fallAsleep} minutes to fall asleep. Set your alarm for one of these times:</p>
        </div>
      </div>

      <div class="margin-cards">
        ${napOptions.map(n => `
          <div class="margin-card ${n.name === 'Power Nap' ? 'highlight' : ''}">
            <div class="margin-card-icon">${n.icon}</div>
            <div class="margin-card-value">${n.wakeTime}</div>
            <div class="margin-card-label">${n.name} · ${n.duration} min</div>
            <small style="color: var(--color-gray-dark)">${n.desc}</small>
          </div>
        `).join('')}
      </div>

      <div class="profit-breakdown">
        <h4>📊 Nap Options Explained</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Type</th><th>Duration</th><th>Set Alarm</th><th>Best For</th></tr></thead>
            <tbody>
              <tr class="current-row">
                <td><strong>⚡ Power Nap</strong></td>
                <td>20 min</td>
                <td><strong>${napOptions[0].wakeTime}</strong></td>
                <td>Quick energy boost, staying sharp</td>
              </tr>
              <tr>
                <td><strong>😴 Short Nap</strong></td>
                <td>30 min</td>
                <td><strong>${napOptions[1].wakeTime}</strong></td>
                <td>Moderate recovery (may feel groggy briefly)</td>
              </tr>
              <tr>
                <td><strong>🌙 Full Cycle</strong></td>
                <td>90 min</td>
                <td><strong>${napOptions[2].wakeTime}</strong></td>
                <td>Full restoration, memory consolidation</td>
              </tr>
              <tr>
                <td><strong>💤 Double Cycle</strong></td>
                <td>120 min</td>
                <td><strong>${napOptions[3].wakeTime}</strong></td>
                <td>Sleep debt recovery, shift workers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="insights-grid">
        <div class="insight-card insight-success">
          <div class="insight-icon">⚡</div>
          <div class="insight-content">
            <h5>Best Nap Choice</h5>
            <p>A <strong>20-minute power nap</strong> is ideal for most people — you get alertness benefits without sleep inertia (grogginess).</p>
          </div>
        </div>
        <div class="insight-card insight-info">
          <div class="insight-icon">⏰</div>
          <div class="insight-content">
            <h5>Timing Matters</h5>
            <p>Nap before 3:00 PM to avoid disrupting nighttime sleep. The post-lunch dip (1-3 PM) is the natural nap window.</p>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function getSleepStagesVisualization(selected) {
    if (!selected) return '';
    const stages = [];
    for (let c = 1; c <= selected.cycles; c++) {
      stages.push({ cycle: c, stages: ['Light', 'Deep', 'REM'] });
    }

    return `
      <div class="profit-breakdown">
        <h4>🧠 Sleep Stage Map (${selected.cycles} cycles)</h4>
        <div style="overflow-x: auto; padding: 1rem 0;">
          <div style="display: flex; gap: 2px; min-width: fit-content;">
            ${stages.map(s => `
              <div style="display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 60px;">
                <div style="text-align: center; font-size: 0.7rem; color: var(--color-gray-dark); margin-bottom: 4px;">Cycle ${s.cycle}</div>
                <div style="background: var(--color-light-blue); padding: 8px 4px; text-align: center; border-radius: 4px 4px 0 0; font-size: 0.7rem; color: var(--color-primary);">Light</div>
                <div style="background: var(--color-primary); padding: 12px 4px; text-align: center; font-size: 0.7rem; color: white;">Deep</div>
                <div style="background: #7c3aed; padding: 8px 4px; text-align: center; border-radius: 0 0 4px 4px; font-size: 0.7rem; color: white;">REM</div>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 0.75rem; color: var(--color-gray-dark);">
            <span>Fall asleep</span>
            <span>Wake up ☀️</span>
          </div>
        </div>
      </div>
    `;
  }

  function showError(message) {
    const resultDiv = document.getElementById('sleep-result');
    if (resultDiv) { resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`; resultDiv.classList.remove('hidden'); }
  }

  function getValue(id) { const el = document.getElementById(id); return el ? el.value : ''; }
  function setValue(id, value) { const el = document.getElementById(id); if (el) el.value = value; }
  function padZero(n) { return n.toString().padStart(2, '0'); }

  function minutesToTime(minutes) {
    const h = Math.floor(((minutes % 1440) + 1440) % 1440 / 60);
    const m = ((minutes % 1440) + 1440) % 1440 % 60;
    return padZero(h) + ':' + padZero(m);
  }

  function formatTime(minutes) {
    const normalized = ((minutes % 1440) + 1440) % 1440;
    const h = Math.floor(normalized / 60);
    const m = normalized % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return displayH + ':' + padZero(m) + ' ' + period;
  }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'Sleep Cycle Calculator', url }).catch(() => copyToClipboard(url)); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-calculation');
      if (btn) { const orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(() => { btn.innerHTML = orig; }, 2000); }
    }).catch(() => {});
  }
})();
