(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const dateInput = document.getElementById('convert-date');
    if (dateInput) {
      const y = today.getFullYear();
      const m = String(today.getMonth() + 1).padStart(2, '0');
      const d = String(today.getDate()).padStart(2, '0');
      dateInput.value = `${y}-${m}-${d}`;
    }

    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('src')) document.getElementById('source-timezone').value = params.get('src');
    if (params.has('date')) document.getElementById('convert-date').value = params.get('date');
    if (params.has('hour')) document.getElementById('convert-hour').value = params.get('hour');
    if (params.has('min')) document.getElementById('convert-minute').value = params.get('min');
    if (params.has('ampm')) document.getElementById('convert-ampm').value = params.get('ampm');
    if (params.has('tz1')) document.getElementById('target-timezone-1').value = params.get('tz1');
    if (params.has('tz2')) document.getElementById('target-timezone-2').value = params.get('tz2');

    if (params.toString()) {
      setTimeout(() => calculateResults(), 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('src', document.getElementById('source-timezone').value);
    params.set('date', document.getElementById('convert-date').value);
    params.set('hour', document.getElementById('convert-hour').value);
    params.set('min', document.getElementById('convert-minute').value);
    params.set('ampm', document.getElementById('convert-ampm').value);
    params.set('tz1', document.getElementById('target-timezone-1').value);
    const tz2 = document.getElementById('target-timezone-2').value;
    if (tz2) params.set('tz2', tz2);

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        calculateResults();
        document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    const currentTimeBtn = document.getElementById('use-current-time');
    if (currentTimeBtn) {
      currentTimeBtn.addEventListener('click', useCurrentTime);
    }

    document.querySelectorAll('.form-input, .form-select').forEach(input => {
      input.addEventListener('change', saveToURL);
    });

    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) shareBtn.addEventListener('click', shareCalculation);
  }

  function useCurrentTime() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    document.getElementById('convert-date').value = `${y}-${m}-${d}`;

    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    document.getElementById('convert-hour').value = hours;

    const minutes = now.getMinutes();
    const minuteSelect = document.getElementById('convert-minute');
    const closest = [0, 15, 30, 45].reduce((prev, curr) =>
      Math.abs(curr - minutes) < Math.abs(prev - minutes) ? curr : prev
    );
    minuteSelect.value = closest;
    document.getElementById('convert-ampm').value = ampm;

    // Try to detect user timezone offset
    const offset = -(now.getTimezoneOffset() / 60);
    const sourceSelect = document.getElementById('source-timezone');
    const options = sourceSelect.querySelectorAll('option');
    for (const opt of options) {
      if (parseFloat(opt.value) === offset) {
        sourceSelect.value = opt.value;
        break;
      }
    }

    saveToURL();
  }

  function calculateResults() {
    const sourceOffset = parseFloat(document.getElementById('source-timezone').value);
    const date = document.getElementById('convert-date').value;
    let hour = parseInt(document.getElementById('convert-hour').value);
    const minute = parseInt(document.getElementById('convert-minute').value);
    const ampm = document.getElementById('convert-ampm').value;

    if (!date) return;

    // Convert to 24h
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;

    const sourceMinutes = hour * 60 + minute;

    // Get target zones
    const targets = [];
    const tz1El = document.getElementById('target-timezone-1');
    const tz2El = document.getElementById('target-timezone-2');

    if (tz1El.value) {
      targets.push({
        offset: parseFloat(tz1El.value),
        name: tz1El.options[tz1El.selectedIndex].dataset.name || tz1El.options[tz1El.selectedIndex].text
      });
    }
    if (tz2El.value) {
      targets.push({
        offset: parseFloat(tz2El.value),
        name: tz2El.options[tz2El.selectedIndex].dataset.name || tz2El.options[tz2El.selectedIndex].text
      });
    }

    const sourceName = document.getElementById('source-timezone').options[document.getElementById('source-timezone').selectedIndex].text;

    saveToURL();

    // Convert to each target
    const conversions = targets.map(target => {
      const diffHours = target.offset - sourceOffset;
      const targetMinutes = sourceMinutes + (diffHours * 60);

      let dayOffset = 0;
      let adjustedMinutes = targetMinutes;
      if (adjustedMinutes >= 1440) { dayOffset = 1; adjustedMinutes -= 1440; }
      if (adjustedMinutes < 0) { dayOffset = -1; adjustedMinutes += 1440; }

      const targetHour24 = Math.floor(adjustedMinutes / 60);
      const targetMinute = Math.round(adjustedMinutes % 60);
      const targetAmpm = targetHour24 >= 12 ? 'PM' : 'AM';
      const targetHour12 = targetHour24 % 12 || 12;

      return {
        name: target.name,
        offset: target.offset,
        hour12: targetHour12,
        minute: targetMinute,
        ampm: targetAmpm,
        hour24: targetHour24,
        dayOffset,
        diffHours
      };
    });

    displayResults(sourceName, sourceOffset, hour, minute, ampm, date, conversions);
  }

  function displayResults(sourceName, sourceOffset, hour, minute, ampm, date, conversions) {
    const resultDiv = document.getElementById('timezone-result');
    if (!resultDiv) return;

    const sourceTimeStr = `${hour > 12 ? hour - 12 : hour || 12}:${String(minute).padStart(2, '0')} ${ampm}`;

    const dayLabels = { '-1': '(previous day)', '0': '', '1': '(next day)' };

    resultDiv.innerHTML = `
      <h3>🌍 Time Zone Conversion</h3>

      <div class="timezone-results">
        <div class="tz-source">
          <div class="tz-label">Source: ${sourceName}</div>
          <div class="tz-time-big">${sourceTimeStr}</div>
          <div class="tz-date">${formatDate(date)}</div>
        </div>

        <div class="tz-arrow">→</div>

        ${conversions.map(c => `
          <div class="tz-target">
            <div class="tz-label">${c.name}</div>
            <div class="tz-time-big">${c.hour12}:${String(c.minute).padStart(2, '0')} ${c.ampm}</div>
            <div class="tz-date">${c.dayOffset !== 0 ? `<span class="day-change">${dayLabels[c.dayOffset]}</span>` : formatDate(date)}</div>
            <div class="tz-diff">${c.diffHours >= 0 ? '+' : ''}${c.diffHours} hours from source</div>
          </div>
        `).join('')}
      </div>

      <div class="meeting-planner">
        <h4>📅 Meeting Planner — Business Hours Overlap</h4>
        <p style="color: var(--color-gray-dark); font-size: 0.875rem; margin-bottom: 1rem;">Green bars show 9 AM - 5 PM local business hours</p>
        <div class="meeting-timeline">
          <div class="timeline-header">
            <span>12AM</span><span>6AM</span><span>12PM</span><span>6PM</span><span>12AM</span>
          </div>
          ${generateTimelineBar(sourceName, 0, sourceOffset)}
          ${conversions.map(c => generateTimelineBar(c.name, c.diffHours, c.offset)).join('')}
        </div>
      </div>

      <div class="insights-grid">
        <div class="insight-card insight-info">
          <div class="insight-icon">💡</div>
          <div class="insight-content">
            <h5>Quick Reference</h5>
            <p>UTC offset for source: ${sourceOffset >= 0 ? '+' : ''}${sourceOffset} | ${conversions.map(c => `${c.name}: ${c.offset >= 0 ? '+' : ''}${c.offset}`).join(' | ')}</p>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function generateTimelineBar(name, diffHours, offset) {
    // Business hours 9-17 in this zone, shown relative to source timezone
    const startHour = 9 - diffHours;
    const endHour = 17 - diffHours;

    const startPct = Math.max(0, (startHour / 24) * 100);
    const endPct = Math.min(100, (endHour / 24) * 100);
    const width = Math.max(0, endPct - startPct);

    return `
      <div class="timeline-row">
        <div class="timeline-label">${name}</div>
        <div class="timeline-bar">
          <div class="timeline-business" style="left: ${startPct}%; width: ${width}%;"></div>
        </div>
      </div>
    `;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Time Zone Converter', url }).catch(() => copyToClipboard(url));
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
