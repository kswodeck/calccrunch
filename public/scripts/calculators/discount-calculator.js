// Discount Calculator — sale price, savings, stacked discounts, optional tax.
(function () {
  'use strict';

  var priceEl, d1El, d2El, taxEl, resultEl;

  var usd = function (n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  var pct = function (n) {
    return (Math.round(n * 100) / 100).toLocaleString('en-US', { maximumFractionDigits: 2 }) + '%';
  };

  function num(el, def) {
    var v = parseFloat(el.value);
    return isNaN(v) ? def : v;
  }

  function calculate() {
    var price = parseFloat(priceEl.value);
    if (isNaN(price) || price < 0) {
      resultEl.innerHTML = '<p style="text-align:center;color:var(--color-gray-dark);">Enter an original price to see your savings.</p>';
      return;
    }
    var d1 = Math.min(Math.max(num(d1El, 0), 0), 100);
    var d2 = Math.min(Math.max(num(d2El, 0), 0), 100);
    var tax = Math.max(num(taxEl, 0), 0);

    var afterD1 = price * (1 - d1 / 100);
    var afterD2 = afterD1 * (1 - d2 / 100);
    var savings = price - afterD2;
    var effective = price > 0 ? (savings / price) * 100 : 0;
    var taxAmount = afterD2 * (tax / 100);
    var finalPrice = afterD2 + taxAmount;

    var cards =
      card('You Pay' + (tax > 0 ? ' (incl. tax)' : ''), usd(finalPrice)) +
      card('You Save', usd(savings)) +
      card('Effective Discount', pct(effective));
    if (d2 > 0) cards = card('After 1st discount', usd(afterD1)) + cards;
    if (tax > 0) cards += card('Sales Tax (' + pct(tax).replace('%','') + '%)', usd(taxAmount));

    resultEl.innerHTML =
      '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">Sale Price</div>' +
        '<div class="result-value">' + usd(afterD2) + '</div>' +
      '</div>' +
      '<div class="result-summary">' + cards + '</div>';
    syncURL(price, d1, d2, tax);
  }

  function card(label, value) {
    return '<div class="result-card"><h4>' + label + '</h4>' +
      '<div class="result-amount">' + value + '</div></div>';
  }

  function syncURL(price, d1, d2, tax) {
    var params = new URLSearchParams();
    params.set('price', price);
    params.set('discount', d1);
    if (d2 > 0) params.set('discount2', d2);
    if (tax > 0) params.set('tax', tax);
    window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
  }

  function init() {
    priceEl = document.getElementById('original-price');
    d1El = document.getElementById('discount-1');
    d2El = document.getElementById('discount-2');
    taxEl = document.getElementById('tax-rate');
    resultEl = document.getElementById('discount-calculator-result');
    if (!priceEl || !resultEl) return;

    var params = new URLSearchParams(window.location.search);
    if (params.has('price')) priceEl.value = params.get('price');
    if (params.has('discount')) d1El.value = params.get('discount');
    if (params.has('discount2')) d2El.value = params.get('discount2');
    if (params.has('tax')) taxEl.value = params.get('tax');

    [priceEl, d1El, d2El, taxEl].forEach(function (el) {
      el.addEventListener('input', calculate);
    });
    var clear = document.getElementById('clear-btn');
    if (clear) clear.addEventListener('click', function () {
      priceEl.value = ''; d1El.value = ''; d2El.value = '0'; taxEl.value = '0';
      calculate();
    });

    calculate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
