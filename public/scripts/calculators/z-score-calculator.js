// Z-Score Calculator
(function () {
  'use strict';

  var elements = {};

  document.addEventListener('DOMContentLoaded', function () {
    cacheElements();
    loadFromURL();
    attachEventListeners();
  });

  function cacheElements() {
    elements = {
      valueInput: document.getElementById('value-input'),
      meanInput: document.getElementById('mean-input'),
      stddevInput: document.getElementById('stddev-input'),
      calculateBtn: document.getElementById('calculate-btn'),
      clearBtn: document.getElementById('clear-btn'),
      resultDiv: document.getElementById('z-score-calculator-result')
    };
  }

  function erf(x) {
    var sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741,
        a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    var t = 1 / (1 + p * x);
    var y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }

  function normalCdf(z) {
    return 0.5 * (1 + erf(z / Math.SQRT2));
  }

  function formatNum(n, decimals) {
    if (n === null || isNaN(n)) return 'N/A';
    var d = decimals === undefined ? 4 : decimals;
    var rounded = Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
    var str = String(rounded);
    return str;
  }

  function calculate() {
    var x = parseFloat(elements.valueInput ? elements.valueInput.value : '');
    var mean = parseFloat(elements.meanInput ? elements.meanInput.value : '');
    var sd = parseFloat(elements.stddevInput ? elements.stddevInput.value : '');

    if (isNaN(x) || isNaN(mean) || isNaN(sd)) {
      showError('Please enter a value, mean, and standard deviation.');
      return;
    }

    if (sd < 0) {
      showError('Standard deviation cannot be negative.');
      return;
    }

    if (sd === 0) {
      showError('Standard deviation is 0, so a z-score is undefined (every value in the data set is identical to the mean).');
      return;
    }

    saveToURL(x, mean, sd);

    var z = (x - mean) / sd;
    var cdf = normalCdf(z);
    var percentile = cdf * 100;
    var percentileAbove = 100 - percentile;
    var zLabel = z >= 0 ? '+' + formatNum(z) : formatNum(z);
    var position = z === 0 ? 'exactly at the mean' : (z > 0 ? 'above the mean' : 'below the mean');
    var absZ = Math.abs(z);
    var outlierNote = absZ > 3
      ? 'This is a statistical outlier (|z| > 3) — a very unusual value for this distribution.'
      : (absZ > 2
        ? 'This is a fairly unusual value (|z| > 2) for this distribution.'
        : 'This is within a typical range for this distribution.');

    var html =
      '<div class="result-main">' +
        '<div class="result-label">Z-Score</div>' +
        '<div class="result-value">' + zLabel + '</div>' +
      '</div>' +
      '<div class="result-summary">' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Percentile</span>' +
          '<span class="result-summary-value">' + formatNum(percentile, 2) + 'th</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Probability below (CDF)</span>' +
          '<span class="result-summary-value">' + formatNum(cdf, 4) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">% of data above this value</span>' +
          '<span class="result-summary-value">' + formatNum(percentileAbove, 2) + '%</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Position</span>' +
          '<span class="result-summary-value">' + position + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="result-summary" style="margin-top:0.5rem;">' +
        '<div class="result-summary-item" style="grid-column: 1 / -1;">' +
          '<span class="result-summary-label">z = (x − μ) ÷ σ</span>' +
          '<span class="result-summary-value">(' + formatNum(x, 4) + ' − ' + formatNum(mean, 4) + ') ÷ ' + formatNum(sd, 4) + ' = ' + zLabel + '</span>' +
        '</div>' +
        '<div class="result-summary-item" style="grid-column: 1 / -1;">' +
          '<span class="result-summary-label">Interpretation</span>' +
          '<span class="result-summary-value">' + outlierNote + '</span>' +
        '</div>' +
      '</div>';

    elements.resultDiv.innerHTML = html;
    elements.resultDiv.classList.remove('hidden');
    elements.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function showError(msg) {
    elements.resultDiv.innerHTML =
      '<div class="result-main"><div class="result-label" style="color:var(--color-error)">' + msg + '</div></div>';
    elements.resultDiv.classList.remove('hidden');
  }

  function clearAll() {
    if (elements.valueInput) elements.valueInput.value = '';
    if (elements.meanInput) elements.meanInput.value = '';
    if (elements.stddevInput) elements.stddevInput.value = '';
    elements.resultDiv.classList.add('hidden');
    elements.resultDiv.innerHTML = '';
    history.replaceState(null, '', window.location.pathname);
  }

  function saveToURL(x, mean, sd) {
    var params = new URLSearchParams();
    params.set('x', x);
    params.set('mean', mean);
    params.set('sd', sd);
    var newURL = window.location.pathname + '?' + params.toString();
    history.replaceState(null, '', newURL);
  }

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    var hasAll = params.has('x') && params.has('mean') && params.has('sd');
    if (hasAll) {
      if (elements.valueInput) elements.valueInput.value = params.get('x');
      if (elements.meanInput) elements.meanInput.value = params.get('mean');
      if (elements.stddevInput) elements.stddevInput.value = params.get('sd');
      calculate();
    }
  }

  function attachEventListeners() {
    if (elements.calculateBtn) {
      elements.calculateBtn.addEventListener('click', calculate);
    }
    if (elements.clearBtn) {
      elements.clearBtn.addEventListener('click', clearAll);
    }
    [elements.valueInput, elements.meanInput, elements.stddevInput].forEach(function (el) {
      if (el) {
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') calculate();
        });
      }
    });
  }
}());
