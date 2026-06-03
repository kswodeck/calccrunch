// Sales Tax Calculator — add or remove sales tax, with state base rates.
(function () {
  'use strict';

  // State base sales-tax rates (%). Source: state statutory rates; local taxes extra.
  var STATE_RATES = {
    Alabama: 4, Alaska: 0, Arizona: 5.6, Arkansas: 6.5, California: 7.25,
    Colorado: 2.9, Connecticut: 6.35, Delaware: 0, Florida: 6, Georgia: 4,
    Hawaii: 4, Idaho: 6, Illinois: 6.25, Indiana: 7, Iowa: 6, Kansas: 6.5,
    Kentucky: 6, Louisiana: 4.45, Maine: 5.5, Maryland: 6, Massachusetts: 6.25,
    Michigan: 6, Minnesota: 6.875, Mississippi: 7, Missouri: 4.225, Montana: 0,
    Nebraska: 5.5, Nevada: 6.85, 'New Hampshire': 0, 'New Jersey': 6.625,
    'New Mexico': 4.875, 'New York': 4, 'North Carolina': 4.75, 'North Dakota': 5,
    Ohio: 5.75, Oklahoma: 4.5, Oregon: 0, Pennsylvania: 6, 'Rhode Island': 7,
    'South Carolina': 6, 'South Dakota': 4.2, Tennessee: 7, Texas: 6.25,
    Utah: 6.1, Vermont: 6, Virginia: 5.3, Washington: 6.5, 'West Virginia': 6,
    Wisconsin: 5, Wyoming: 4
  };

  var amountEl, rateEl, stateEl, modeEl, resultEl;

  var usd = function (n) {
    return '$' + (n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  function calculate() {
    var amount = parseFloat(amountEl.value);
    var rate = parseFloat(rateEl.value);
    if (isNaN(amount) || amount < 0 || isNaN(rate) || rate < 0) {
      resultEl.innerHTML = '<p style="text-align:center;color:var(--color-gray-dark);">Enter an amount and a tax rate to see the breakdown.</p>';
      return;
    }
    var mode = modeEl.value;
    var preTax, tax, total;
    if (mode === 'remove') {
      total = amount;
      preTax = amount / (1 + rate / 100);
      tax = total - preTax;
    } else {
      preTax = amount;
      tax = amount * (rate / 100);
      total = amount + tax;
    }
    resultEl.innerHTML =
      '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">' + (mode === 'remove' ? 'Total (incl. tax)' : 'Total Price') + '</div>' +
        '<div class="result-value">' + usd(total) + '</div>' +
      '</div>' +
      '<div class="result-summary">' +
        card('Pre-Tax Price', usd(preTax)) +
        card('Sales Tax (' + rate + '%)', usd(tax)) +
        card('Total', usd(total)) +
      '</div>';
    syncURL(amount, rate, mode);
  }

  function card(label, value) {
    return '<div class="result-card"><h4>' + label + '</h4>' +
      '<div class="result-amount">' + value + '</div></div>';
  }

  function syncURL(amount, rate, mode) {
    var params = new URLSearchParams();
    params.set('amount', amount);
    params.set('rate', rate);
    if (mode !== 'add') params.set('mode', mode);
    window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
  }

  function populateStates() {
    var names = Object.keys(STATE_RATES).sort();
    var frag = document.createDocumentFragment();
    names.forEach(function (name) {
      var o = document.createElement('option');
      o.value = name;
      o.textContent = name + ' (' + STATE_RATES[name] + '%)';
      frag.appendChild(o);
    });
    stateEl.appendChild(frag);
  }

  function init() {
    amountEl = document.getElementById('amount');
    rateEl = document.getElementById('tax-rate');
    stateEl = document.getElementById('state-select');
    modeEl = document.getElementById('mode');
    resultEl = document.getElementById('sales-tax-calculator-result');
    if (!amountEl || !resultEl) return;

    populateStates();

    var params = new URLSearchParams(window.location.search);
    if (params.has('amount')) amountEl.value = params.get('amount');
    if (params.has('rate')) rateEl.value = params.get('rate');
    if (params.has('mode')) modeEl.value = params.get('mode');

    [amountEl, rateEl, modeEl].forEach(function (el) {
      el.addEventListener('input', calculate);
      el.addEventListener('change', calculate);
    });
    stateEl.addEventListener('change', function () {
      if (stateEl.value && STATE_RATES[stateEl.value] != null) {
        rateEl.value = STATE_RATES[stateEl.value];
        calculate();
      }
    });
    var clear = document.getElementById('clear-btn');
    if (clear) clear.addEventListener('click', function () {
      amountEl.value = ''; rateEl.value = ''; stateEl.value = ''; modeEl.value = 'add';
      calculate();
    });

    calculate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
