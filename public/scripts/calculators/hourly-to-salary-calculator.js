// Hourly to Salary Calculator — converts an hourly wage into annual/monthly/weekly pay.
(function () {
  'use strict';

  var rateEl, hpwEl, wpyEl, resultEl;

  function usd(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function num(el, def) { var v = parseFloat(el.value); return isNaN(v) ? def : v; }

  function calculate() {
    var rate = parseFloat(rateEl.value);
    var hpw = num(hpwEl, 40);
    var wpy = num(wpyEl, 52);
    if (isNaN(rate) || rate < 0 || hpw <= 0 || wpy <= 0) {
      resultEl.innerHTML = '<p style="text-align:center;color:var(--color-gray-dark);">Enter an hourly wage to see your annual salary.</p>';
      return;
    }
    var annual = rate * hpw * wpy;
    var weekly = rate * hpw;
    var daily = rate * (hpw / 5);
    var biweekly = weekly * 2;
    var monthly = annual / 12;

    resultEl.innerHTML =
      '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">Annual Salary</div>' +
        '<div class="result-value">' + usd(annual) + '</div>' +
      '</div>' +
      '<div class="result-summary">' +
        card('Per Day', usd(daily), '~' + (hpw / 5).toFixed(1) + ' hrs') +
        card('Per Week', usd(weekly), hpw + ' hrs') +
        card('Biweekly', usd(biweekly), 'every 2 wks') +
        card('Per Month', usd(monthly), 'salary ÷ 12') +
      '</div>';
    syncURL(rate, hpw, wpy);
  }

  function card(label, value, detail) {
    return '<div class="result-card"><h4>' + label + '</h4>' +
      '<div class="result-amount">' + value + '</div>' +
      (detail ? '<div class="result-detail"><small>' + detail + '</small></div>' : '') + '</div>';
  }

  function syncURL(rate, hpw, wpy) {
    var params = new URLSearchParams();
    params.set('rate', rate);
    if (hpw !== 40) params.set('hpw', hpw);
    if (wpy !== 52) params.set('wpy', wpy);
    window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
  }

  function init() {
    rateEl = document.getElementById('hourly-rate');
    hpwEl = document.getElementById('hours-per-week');
    wpyEl = document.getElementById('weeks-per-year');
    resultEl = document.getElementById('hourly-to-salary-calculator-result');
    if (!rateEl || !resultEl) return;

    var params = new URLSearchParams(window.location.search);
    if (params.has('rate')) rateEl.value = params.get('rate');
    if (params.has('hpw')) hpwEl.value = params.get('hpw');
    if (params.has('wpy')) wpyEl.value = params.get('wpy');

    [rateEl, hpwEl, wpyEl].forEach(function (el) { el.addEventListener('input', calculate); });
    var clear = document.getElementById('clear-btn');
    if (clear) clear.addEventListener('click', function () {
      rateEl.value = ''; hpwEl.value = '40'; wpyEl.value = '52'; calculate();
    });
    calculate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
