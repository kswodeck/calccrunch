// Overtime Calculator — regular pay, overtime pay, and total earnings.
(function () {
  'use strict';

  var rateEl, regEl, otEl, multEl, resultEl;

  function usd(n) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function num(el, def) { var v = parseFloat(el.value); return isNaN(v) ? def : v; }

  function calculate() {
    var rate = parseFloat(rateEl.value);
    if (isNaN(rate) || rate < 0) {
      resultEl.innerHTML = '<p style="text-align:center;color:var(--color-gray-dark);">Enter your hourly rate to calculate overtime pay.</p>';
      return;
    }
    var reg = Math.max(num(regEl, 0), 0);
    var ot = Math.max(num(otEl, 0), 0);
    var mult = num(multEl, 1.5);

    var regularPay = reg * rate;
    var otRate = rate * mult;
    var otPay = ot * otRate;
    var total = regularPay + otPay;
    var totalHours = reg + ot;

    resultEl.innerHTML =
      '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">Total Pay</div>' +
        '<div class="result-value">' + usd(total) + '</div>' +
      '</div>' +
      '<div class="result-summary">' +
        card('Regular Pay', usd(regularPay), reg + ' hrs @ ' + usd(rate)) +
        card('Overtime Pay', usd(otPay), ot + ' hrs @ ' + usd(otRate)) +
        card('Overtime Rate', usd(otRate) + '/hr', mult + '× rate') +
        card('Total Hours', totalHours + ' hrs', '') +
      '</div>';
    syncURL(rate, reg, ot, mult);
  }

  function card(label, value, detail) {
    return '<div class="result-card"><h4>' + label + '</h4>' +
      '<div class="result-amount">' + value + '</div>' +
      (detail ? '<div class="result-detail"><small>' + detail + '</small></div>' : '') + '</div>';
  }

  function syncURL(rate, reg, ot, mult) {
    var params = new URLSearchParams();
    params.set('rate', rate);
    params.set('reg', reg);
    params.set('ot', ot);
    if (mult !== 1.5) params.set('mult', mult);
    window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
  }

  function init() {
    rateEl = document.getElementById('hourly-rate');
    regEl = document.getElementById('regular-hours');
    otEl = document.getElementById('overtime-hours');
    multEl = document.getElementById('ot-multiplier');
    resultEl = document.getElementById('overtime-calculator-result');
    if (!rateEl || !resultEl) return;

    var params = new URLSearchParams(window.location.search);
    if (params.has('rate')) rateEl.value = params.get('rate');
    if (params.has('reg')) regEl.value = params.get('reg');
    if (params.has('ot')) otEl.value = params.get('ot');
    if (params.has('mult')) multEl.value = params.get('mult');

    [rateEl, regEl, otEl, multEl].forEach(function (el) {
      el.addEventListener('input', calculate);
      el.addEventListener('change', calculate);
    });
    var clear = document.getElementById('clear-btn');
    if (clear) clear.addEventListener('click', function () {
      rateEl.value = ''; regEl.value = '40'; otEl.value = '5'; multEl.value = '1.5'; calculate();
    });
    calculate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
