// Salary to Hourly Calculator — converts an annual salary into hourly/daily/weekly/monthly pay.
(function () {
  'use strict';

  var salaryEl, hpwEl, wpyEl, resultEl;

  function usd(n, d) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: d == null ? 2 : d, maximumFractionDigits: d == null ? 2 : d });
  }
  function num(el, def) { var v = parseFloat(el.value); return isNaN(v) ? def : v; }

  function calculate() {
    var salary = parseFloat(salaryEl.value);
    var hpw = num(hpwEl, 40);
    var wpy = num(wpyEl, 52);
    if (isNaN(salary) || salary < 0 || hpw <= 0 || wpy <= 0) {
      resultEl.innerHTML = '<p style="text-align:center;color:var(--color-gray-dark);">Enter an annual salary to see your hourly rate.</p>';
      return;
    }
    var annualHours = hpw * wpy;
    var hourly = salary / annualHours;
    var weekly = salary / wpy;
    var daily = weekly / 5;
    var biweekly = weekly * 2;
    var monthly = salary / 12;

    resultEl.innerHTML =
      '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">Hourly Rate</div>' +
        '<div class="result-value">' + usd(hourly) + '/hr</div>' +
      '</div>' +
      '<div class="result-summary">' +
        card('Per Day', usd(daily), '~8 hr day') +
        card('Per Week', usd(weekly), hpw + ' hrs') +
        card('Biweekly', usd(biweekly), 'every 2 wks') +
        card('Per Month', usd(monthly), 'salary ÷ 12') +
      '</div>';
    syncURL(salary, hpw, wpy);
  }

  function card(label, value, detail) {
    return '<div class="result-card"><h4>' + label + '</h4>' +
      '<div class="result-amount">' + value + '</div>' +
      (detail ? '<div class="result-detail"><small>' + detail + '</small></div>' : '') + '</div>';
  }

  function syncURL(salary, hpw, wpy) {
    var params = new URLSearchParams();
    params.set('salary', salary);
    if (hpw !== 40) params.set('hpw', hpw);
    if (wpy !== 52) params.set('wpy', wpy);
    window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
  }

  function init() {
    salaryEl = document.getElementById('annual-salary');
    hpwEl = document.getElementById('hours-per-week');
    wpyEl = document.getElementById('weeks-per-year');
    resultEl = document.getElementById('salary-to-hourly-calculator-result');
    if (!salaryEl || !resultEl) return;

    var params = new URLSearchParams(window.location.search);
    if (params.has('salary')) salaryEl.value = params.get('salary');
    if (params.has('hpw')) hpwEl.value = params.get('hpw');
    if (params.has('wpy')) wpyEl.value = params.get('wpy');

    [salaryEl, hpwEl, wpyEl].forEach(function (el) { el.addEventListener('input', calculate); });
    var clear = document.getElementById('clear-btn');
    if (clear) clear.addEventListener('click', function () {
      salaryEl.value = ''; hpwEl.value = '40'; wpyEl.value = '52'; calculate();
    });
    calculate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
