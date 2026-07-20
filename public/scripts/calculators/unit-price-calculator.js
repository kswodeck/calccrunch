// Unit Price Calculator - compare price per unit across two products
(function () {
  'use strict';

  var UNITS = {
    oz: { family: 'weight', toBase: 1, label: 'oz' },
    lb: { family: 'weight', toBase: 16, label: 'lb' },
    g: { family: 'weight', toBase: 0.0352739619, label: 'g' },
    kg: { family: 'weight', toBase: 35.2739619, label: 'kg' },
    floz: { family: 'volume', toBase: 1, label: 'fl oz' },
    cup: { family: 'volume', toBase: 8, label: 'cup' },
    ml: { family: 'volume', toBase: 0.033814, label: 'ml' },
    l: { family: 'volume', toBase: 33.814, label: 'L' },
    item: { family: 'count', toBase: 1, label: 'item' }
  };

  var BASE_LABEL = { weight: 'oz', volume: 'fl oz', count: 'item' };
  var LARGE_UNIT = { weight: { label: 'lb', factor: 16 }, volume: { label: 'L', factor: 33.814 }, count: { label: '10 items', factor: 10 } };

  var elements = {};

  function init() {
    elements = {
      aPrice: document.getElementById('a-price'),
      aQuantity: document.getElementById('a-quantity'),
      aUnit: document.getElementById('a-unit'),
      bPrice: document.getElementById('b-price'),
      bQuantity: document.getElementById('b-quantity'),
      bUnit: document.getElementById('b-unit'),
      calculateBtn: document.getElementById('calculate-btn'),
      clearBtn: document.getElementById('clear-btn'),
      resultDiv: document.getElementById('unit-price-calculator-result')
    };

    loadFromURL();
    attachEventListeners();

    var params = new URLSearchParams(window.location.search);
    if (params.has('ap') && params.has('bp')) {
      calculate();
    }
  }

  function attachEventListeners() {
    if (elements.calculateBtn) {
      elements.calculateBtn.addEventListener('click', function () {
        calculate();
        elements.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    if (elements.clearBtn) {
      elements.clearBtn.addEventListener('click', clearAll);
    }
  }

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('ap')) elements.aPrice.value = params.get('ap');
    if (params.has('aq')) elements.aQuantity.value = params.get('aq');
    if (params.has('au') && UNITS[params.get('au')]) elements.aUnit.value = params.get('au');
    if (params.has('bp')) elements.bPrice.value = params.get('bp');
    if (params.has('bq')) elements.bQuantity.value = params.get('bq');
    if (params.has('bu') && UNITS[params.get('bu')]) elements.bUnit.value = params.get('bu');
  }

  function saveToURL(a, b) {
    var params = new URLSearchParams();
    params.set('ap', a.price);
    params.set('aq', a.quantity);
    params.set('au', a.unit);
    params.set('bp', b.price);
    params.set('bq', b.quantity);
    params.set('bu', b.unit);
    var newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function fmt(n, decimals) {
    if (!isFinite(n)) return '—';
    return n.toFixed(decimals == null ? 2 : decimals);
  }

  function currency(n) {
    return '$' + fmt(n, n < 1 ? 4 : 2);
  }

  function calculate() {
    var a = {
      price: parseFloat(elements.aPrice.value),
      quantity: parseFloat(elements.aQuantity.value),
      unit: elements.aUnit.value
    };
    var b = {
      price: parseFloat(elements.bPrice.value),
      quantity: parseFloat(elements.bQuantity.value),
      unit: elements.bUnit.value
    };

    if (!a.price || a.price <= 0 || !b.price || b.price <= 0) {
      return displayError('Enter a valid price greater than 0 for both products.');
    }
    if (!a.quantity || a.quantity <= 0 || !b.quantity || b.quantity <= 0) {
      return displayError('Enter a valid quantity greater than 0 for both products.');
    }
    if (UNITS[a.unit].family !== UNITS[b.unit].family) {
      return displayError('Product A and Product B use incompatible unit types (e.g. weight vs. volume). Pick units from the same group for both.');
    }

    var family = UNITS[a.unit].family;
    var baseLabel = BASE_LABEL[family];
    var aBaseQty = a.quantity * UNITS[a.unit].toBase;
    var bBaseQty = b.quantity * UNITS[b.unit].toBase;
    var aUnitPrice = a.price / aBaseQty;
    var bUnitPrice = b.price / bBaseQty;

    var large = LARGE_UNIT[family];
    var aLargePrice = aUnitPrice * large.factor;
    var bLargePrice = bUnitPrice * large.factor;

    var winner, diffPct, sameLabel;
    if (Math.abs(aUnitPrice - bUnitPrice) < 1e-9) {
      sameLabel = true;
    } else if (aUnitPrice < bUnitPrice) {
      winner = 'A';
      diffPct = ((bUnitPrice - aUnitPrice) / bUnitPrice) * 100;
    } else {
      winner = 'B';
      diffPct = ((aUnitPrice - bUnitPrice) / aUnitPrice) * 100;
    }

    displayResults({
      a: a, b: b, family: family, baseLabel: baseLabel,
      aUnitPrice: aUnitPrice, bUnitPrice: bUnitPrice,
      aLargePrice: aLargePrice, bLargePrice: bLargePrice, largeLabel: large.label,
      winner: winner, diffPct: diffPct, sameLabel: sameLabel
    });

    saveToURL(a, b);
  }

  function displayResults(r) {
    var winnerText, winnerNote;
    if (r.sameLabel) {
      winnerText = 'Tie — same unit price';
      winnerNote = 'Both products cost exactly the same per ' + r.baseLabel + '. Pick whichever size fits your needs.';
    } else {
      var winnerPrice = r.winner === 'A' ? r.aUnitPrice : r.bUnitPrice;
      winnerText = 'Product ' + r.winner + ' is the better deal';
      winnerNote = 'Product ' + r.winner + ' is ' + fmt(r.diffPct, 1) + '% cheaper per ' + r.baseLabel + ' (' + currency(winnerPrice) + '/' + r.baseLabel + ').';
    }

    var html =
      '<div class="result-header"><h2>🏷️ Unit Price Comparison</h2></div>' +
      '<div class="result-main" style="text-align:center;">' +
      '<div class="result-label">' + winnerText + '</div>' +
      '<div class="result-value" style="font-size:1.4rem;">' + winnerNote + '</div>' +
      '</div>' +
      '<div class="calculation-breakdown" style="margin-top:1.5rem;">' +
      '<h3>📋 Breakdown</h3>' +
      '<div class="breakdown-table-container">' +
      '<table class="breakdown-table">' +
      '<thead><tr><th></th><th>Product A</th><th>Product B</th></tr></thead>' +
      '<tbody>' +
      '<tr><td>Price</td><td class="text-right">' + currency(r.a.price) + '</td><td class="text-right">' + currency(r.b.price) + '</td></tr>' +
      '<tr><td>Quantity</td><td class="text-right">' + fmt(r.a.quantity, 2).replace(/\.00$/, '') + ' ' + UNITS[r.a.unit].label + '</td><td class="text-right">' + fmt(r.b.quantity, 2).replace(/\.00$/, '') + ' ' + UNITS[r.b.unit].label + '</td></tr>' +
      '<tr class="total-row"><td><strong>Price per ' + r.baseLabel + '</strong></td><td class="text-right"><strong>' + currency(r.aUnitPrice) + '</strong></td><td class="text-right"><strong>' + currency(r.bUnitPrice) + '</strong></td></tr>' +
      '<tr><td>Price per ' + r.largeLabel + '</td><td class="text-right">' + currency(r.aLargePrice) + '</td><td class="text-right">' + currency(r.bLargePrice) + '</td></tr>' +
      '</tbody></table></div></div>';

    elements.resultDiv.innerHTML = html;
    elements.resultDiv.classList.remove('hidden');
  }

  function displayError(message) {
    elements.resultDiv.innerHTML =
      '<div class="error-message"><span class="error-icon">⚠️</span><span>' + message + '</span></div>';
    elements.resultDiv.classList.remove('hidden');
  }

  function clearAll() {
    elements.aPrice.value = '';
    elements.aQuantity.value = '';
    elements.aUnit.value = 'oz';
    elements.bPrice.value = '';
    elements.bQuantity.value = '';
    elements.bUnit.value = 'oz';
    elements.resultDiv.classList.add('hidden');
    elements.resultDiv.innerHTML = '';
    window.history.replaceState({}, '', window.location.pathname);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
