// Hours Calculator — time card: hours worked between start and end, minus breaks.
(function () {
  'use strict';

  var startEl, endEl, breakEl, rateEl, resultEl;

  function num(el, def) { var v = parseFloat(el.value); return isNaN(v) ? def : v; }
  function usd(n) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  function toMinutes(t) {
    if (!t || t.indexOf(':') === -1) return null;
    var parts = t.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  function hhmm(totalMinutes) {
    var h = Math.floor(totalMinutes / 60);
    var m = Math.round(totalMinutes % 60);
    return h + 'h ' + (m < 10 ? '0' + m : m) + 'm';
  }

  function calculate() {
    var start = toMinutes(startEl.value);
    var end = toMinutes(endEl.value);
    if (start === null || end === null) {
      resultEl.innerHTML = '<p style="text-align:center;color:var(--color-gray-dark);">Enter a start and end time to calculate hours worked.</p>';
      return;
    }
    var brk = Math.max(num(breakEl, 0), 0);
    var overnight = end <= start;
    var span = end - start;
    if (span < 0) span += 24 * 60; // overnight shift
    var worked = Math.max(span - brk, 0);
    var decimal = worked / 60;
    var rate = Math.max(num(rateEl, 0), 0);

    var cards =
      card('Decimal Hours', decimal.toFixed(2) + ' hrs', 'for payroll') +
      card('Hours:Minutes', hhmm(worked), '') +
      card('Break Deducted', brk + ' min', '');
    if (rate > 0) cards += card('Total Pay', usd(decimal * rate), '@ ' + usd(rate) + '/hr');

    resultEl.innerHTML =
      '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">Hours Worked' + (overnight ? ' (overnight)' : '') + '</div>' +
        '<div class="result-value">' + decimal.toFixed(2) + ' hrs</div>' +
      '</div>' +
      '<div class="result-summary">' + cards + '</div>';
    syncURL();
  }

  function card(label, value, detail) {
    return '<div class="result-card"><h4>' + label + '</h4>' +
      '<div class="result-amount">' + value + '</div>' +
      (detail ? '<div class="result-detail"><small>' + detail + '</small></div>' : '') + '</div>';
  }

  function syncURL() {
    var params = new URLSearchParams();
    params.set('start', startEl.value);
    params.set('end', endEl.value);
    if (num(breakEl, 0) !== 30) params.set('break', num(breakEl, 0));
    if (num(rateEl, 0) > 0) params.set('rate', num(rateEl, 0));
    window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
  }

  function init() {
    startEl = document.getElementById('start-time');
    endEl = document.getElementById('end-time');
    breakEl = document.getElementById('break-minutes');
    rateEl = document.getElementById('hourly-rate');
    resultEl = document.getElementById('hours-calculator-result');
    if (!startEl || !resultEl) return;

    var params = new URLSearchParams(window.location.search);
    if (params.has('start')) startEl.value = params.get('start');
    if (params.has('end')) endEl.value = params.get('end');
    if (params.has('break')) breakEl.value = params.get('break');
    if (params.has('rate')) rateEl.value = params.get('rate');

    [startEl, endEl, breakEl, rateEl].forEach(function (el) { el.addEventListener('input', calculate); });
    var clear = document.getElementById('clear-btn');
    if (clear) clear.addEventListener('click', function () {
      startEl.value = '09:00'; endEl.value = '17:00'; breakEl.value = '30'; rateEl.value = '0'; calculate();
    });
    calculate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
