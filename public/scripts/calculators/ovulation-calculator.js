// Ovulation Calculator
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    loadFromURL();
    attachEventListeners();
  });

  function attachEventListeners() {
    var btn = document.getElementById('calculate-btn');
    var clear = document.getElementById('clear-btn');
    var share = document.getElementById('share-calculation');

    if (btn) {
      btn.addEventListener('click', function () {
        calculateResults();
        var result = document.querySelector('.calculator-result');
        if (result) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    if (clear) {
      clear.addEventListener('click', function () {
        var form = document.getElementById('ovulation-calculator-form');
        if (form && form.reset) form.reset();
        setValue('cycle-length', '28');
        setValue('luteal-length', '14');
        setValue('cycles-ahead', '3');
        var result = document.getElementById('ovulation-calculator-result');
        if (result) { result.classList.add('hidden'); result.innerHTML = ''; }
        window.history.replaceState({}, '', window.location.pathname);
      });
    }

    if (share) share.addEventListener('click', shareCalculation);

    document.querySelectorAll('.form-input, .form-select').forEach(function (input) {
      input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); calculateResults(); }
      });
      input.addEventListener('change', saveToURL);
    });
  }

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('lmp')) setValue('lmp-date', params.get('lmp'));
    if (params.has('cycle')) setValue('cycle-length', params.get('cycle'));
    if (params.has('luteal')) setValue('luteal-length', params.get('luteal'));
    if (params.has('ahead')) setValue('cycles-ahead', params.get('ahead'));
    if (params.toString()) setTimeout(calculateResults, 100);
  }

  function saveToURL() {
    var params = new URLSearchParams();
    var lmp = getValue('lmp-date');
    if (lmp) params.set('lmp', lmp);
    params.set('cycle', getValue('cycle-length') || '28');
    params.set('luteal', getValue('luteal-length') || '14');
    params.set('ahead', getValue('cycles-ahead') || '3');
    var newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function calculateResults() {
    saveToURL();

    var lmpValue = getValue('lmp-date');
    if (!lmpValue) { showError('Please enter the first day of your last period.'); return; }

    var cycleLength = parseInt(getValue('cycle-length'), 10);
    if (!cycleLength || isNaN(cycleLength)) cycleLength = 28;
    cycleLength = Math.min(45, Math.max(20, cycleLength));

    var lutealLength = parseInt(getValue('luteal-length'), 10);
    if (!lutealLength || isNaN(lutealLength)) lutealLength = 14;
    lutealLength = Math.min(17, Math.max(10, lutealLength));

    var cyclesAhead = parseInt(getValue('cycles-ahead'), 10) || 3;

    var lmpDate = new Date(lmpValue + 'T00:00:00');
    if (isNaN(lmpDate.getTime())) { showError('Please enter a valid date.'); return; }

    var cycles = [];
    for (var i = 0; i < cyclesAhead; i++) {
      var periodStart = addDays(lmpDate, cycleLength * i);
      var nextPeriod = addDays(lmpDate, cycleLength * (i + 1));
      var ovulationDay = addDays(nextPeriod, -lutealLength);
      var fertileStart = addDays(ovulationDay, -5);
      var fertileEnd = ovulationDay;
      cycles.push({
        cycleNumber: i + 1,
        periodStart: periodStart,
        nextPeriod: nextPeriod,
        ovulationDay: ovulationDay,
        fertileStart: fertileStart,
        fertileEnd: fertileEnd
      });
    }

    displayResults(cycles, cycleLength, lutealLength);
  }

  function displayResults(cycles, cycleLength, lutealLength) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var current = cycles[0];
    var isInFertileWindow = today >= current.fertileStart && today <= current.fertileEnd;
    var isOvulationDay = sameDay(today, current.ovulationDay);
    var daysToOvulation = Math.round((current.ovulationDay - today) / 86400000);
    var daysToFertileStart = Math.round((current.fertileStart - today) / 86400000);

    var statusIcon = '📅';
    var statusMessage = '';
    var statusClass = 'status-good';

    if (isOvulationDay) {
      statusMessage = 'Today is your estimated ovulation day — peak fertility!';
      statusIcon = '🥚';
      statusClass = 'status-excellent';
    } else if (isInFertileWindow) {
      statusMessage = "You're in your estimated fertile window right now.";
      statusIcon = '✨';
      statusClass = 'status-excellent';
    } else if (daysToFertileStart > 0) {
      statusMessage = 'Your fertile window starts in ' + daysToFertileStart + ' day' + (daysToFertileStart !== 1 ? 's' : '') + '.';
    } else if (daysToOvulation < 0) {
      statusMessage = 'Your estimated fertile window for this cycle has passed. Showing your next predicted cycle below.';
      statusIcon = '⏭️';
    } else {
      statusMessage = 'Estimated ovulation day is ' + Math.abs(daysToOvulation) + ' day' + (Math.abs(daysToOvulation) !== 1 ? 's' : '') + ' away.';
    }

    var html = '';
    html += '<h3>🥚 Your Fertile Window</h3>';

    html += '<div class="profit-status ' + statusClass + '">';
    html += '<div class="status-icon">' + statusIcon + '</div>';
    html += '<div class="status-content">';
    html += '<strong>' + statusMessage + '</strong>';
    html += '<p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Estimated Ovulation Day: <strong>' + formatDateLong(current.ovulationDay) + '</strong></p>';
    html += '</div>';
    html += '</div>';

    html += '<div class="margin-cards">';
    html += '<div class="margin-card highlight">';
    html += '<div class="margin-card-icon">🥚</div>';
    html += '<div class="margin-card-value">' + formatDateShort(current.ovulationDay) + '</div>';
    html += '<div class="margin-card-label">' + getDayOfWeek(current.ovulationDay) + '</div>';
    html += '<small style="color: var(--color-gray-dark)">Estimated Ovulation Day</small>';
    html += '</div>';

    html += '<div class="margin-card">';
    html += '<div class="margin-card-icon">✨</div>';
    html += '<div class="margin-card-value">' + formatDateShort(current.fertileStart) + '</div>';
    html += '<div class="margin-card-label">Fertile Window Starts</div>';
    html += '<small style="color: var(--color-gray-dark)">through ' + formatDateShort(current.fertileEnd) + '</small>';
    html += '</div>';

    html += '<div class="margin-card">';
    html += '<div class="margin-card-icon">🔴</div>';
    html += '<div class="margin-card-value">' + formatDateShort(current.nextPeriod) + '</div>';
    html += '<div class="margin-card-label">Next Period Expected</div>';
    html += '<small style="color: var(--color-gray-dark)">' + cycleLength + '-day cycle</small>';
    html += '</div>';
    html += '</div>';

    // Fertility chance table for current cycle
    html += '<div class="profit-breakdown">';
    html += '<h4>📊 Estimated Fertility by Day (This Cycle)</h4>';
    html += '<div style="padding: 1rem;">';
    html += '<p style="margin-bottom: 1rem; color: var(--color-gray-dark); font-size: 0.9rem;">Conception chances rise through your fertile window and peak on ovulation day, then drop sharply after.</p>';
    html += '<div class="breakdown-table-container">';
    html += '<table class="profit-table">';
    html += '<thead><tr><th>Date</th><th>Day</th><th>Relative Chance</th></tr></thead>';
    html += '<tbody>';

    var chanceLabels = ['Low', 'Low', 'Medium', 'Medium', 'High', 'Peak'];
    for (var d = 0; d < 6; d++) {
      var day = addDays(current.fertileStart, d);
      var isToday = sameDay(day, today);
      var isPeak = d === 5;
      html += '<tr class="' + (isToday ? 'current-row' : '') + '">';
      html += '<td><strong>' + formatDateShort(day) + '</strong>' + (isToday ? ' (today)' : '') + '</td>';
      html += '<td>' + getDayOfWeek(day) + '</td>';
      html += '<td>' + (isPeak ? '🥚 ' : '') + chanceLabels[d] + '</td>';
      html += '</tr>';
    }
    html += '</tbody></table></div>';
    html += '</div></div>';

    // Upcoming cycles table
    if (cycles.length > 1) {
      html += '<div class="profit-breakdown">';
      html += '<h4>🗓️ Predicted Cycles</h4>';
      html += '<div class="breakdown-table-container">';
      html += '<table class="profit-table">';
      html += '<thead><tr><th>Cycle</th><th>Fertile Window</th><th>Ovulation Day</th><th>Next Period</th></tr></thead>';
      html += '<tbody>';
      cycles.forEach(function (c) {
        html += '<tr>';
        html += '<td>Cycle ' + c.cycleNumber + '</td>';
        html += '<td>' + formatDateShort(c.fertileStart) + ' - ' + formatDateShort(c.fertileEnd) + '</td>';
        html += '<td><strong>' + formatDateShort(c.ovulationDay) + '</strong></td>';
        html += '<td>' + formatDateShort(c.nextPeriod) + '</td>';
        html += '</tr>';
      });
      html += '</tbody></table></div></div>';
    }

    // Insights
    html += '<div class="insights-grid">';
    html += '<div class="insight-card insight-info">';
    html += '<div class="insight-icon">🔬</div>';
    html += '<div class="insight-content">';
    html += '<h5>Why 14 Days Before, Not After</h5>';
    html += '<p>The luteal phase (ovulation to next period) is usually a fairly fixed ' + lutealLength + ' days, while the follicular phase (period to ovulation) varies more. Counting back from your <em>next</em> period is more accurate than counting forward from your last one.</p>';
    html += '</div></div>';

    html += '<div class="insight-card insight-success">';
    html += '<div class="insight-icon">💡</div>';
    html += '<div class="insight-content">';
    html += '<h5>Improve Your Accuracy</h5>';
    html += '<p>Track 3+ cycles to confirm your average length, and consider pairing this estimate with an ovulation predictor kit or basal body temperature tracking for confirmation.</p>';
    html += '</div></div>';
    html += '</div>';

    var resultDiv = document.getElementById('ovulation-calculator-result');
    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    var resultDiv = document.getElementById('ovulation-calculator-result');
    if (resultDiv) {
      resultDiv.innerHTML = '<div class="alert alert-error"><strong>Error:</strong> ' + message + '</div>';
      resultDiv.classList.remove('hidden');
    }
  }

  function shareCalculation() {
    var url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Ovulation Calculator', url: url }).catch(function () { copyToClipboard(url); });
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
      var btn = document.getElementById('share-calculation');
      if (btn) {
        var orig = btn.innerHTML;
        btn.innerHTML = '✓ Link Copied!';
        setTimeout(function () { btn.innerHTML = orig; }, 2000);
      }
    }).catch(function () {});
  }

  // Utilities
  function getValue(id) { var el = document.getElementById(id); return el ? el.value : ''; }
  function setValue(id, value) { var el = document.getElementById(id); if (el) el.value = value; }

  function addDays(date, days) {
    var result = new Date(date.getTime());
    result.setDate(result.getDate() + days);
    return result;
  }

  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function formatDateShort(date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }

  function formatDateLong(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }

  function getDayOfWeek(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }
})();
