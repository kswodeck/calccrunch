// Percentile Calculator
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
      dataInput: document.getElementById('data-input'),
      valueInput: document.getElementById('value-input'),
      percentileInput: document.getElementById('percentile-input'),
      calculateBtn: document.getElementById('calculate-btn'),
      clearBtn: document.getElementById('clear-btn'),
      resultDiv: document.getElementById('percentile-calculator-result')
    };
  }

  function parseData(str) {
    if (!str) return [];
    return str
      .split(/[,\s]+/)
      .map(function (s) { return parseFloat(s); })
      .filter(function (n) { return !isNaN(n); });
  }

  function formatNum(n, decimals) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    var d = decimals === undefined ? 2 : decimals;
    var rounded = Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
    return String(rounded);
  }

  // rank = (count below + 0.5 * count equal) / N * 100
  function percentileRankOf(sorted, v) {
    var n = sorted.length;
    var below = 0, equal = 0;
    for (var i = 0; i < n; i++) {
      if (sorted[i] < v) below++;
      else if (sorted[i] === v) equal++;
    }
    return (below + 0.5 * equal) / n * 100;
  }

  // Linear interpolation, matches Excel PERCENTILE.INC / Google Sheets PERCENTILE
  function valueAtPercentile(sorted, p) {
    var n = sorted.length;
    if (n === 1) return sorted[0];
    var idx = (p / 100) * (n - 1);
    var lower = Math.floor(idx);
    var upper = Math.ceil(idx);
    var frac = idx - lower;
    if (upper >= n) upper = n - 1;
    return sorted[lower] + frac * (sorted[upper] - sorted[lower]);
  }

  function calculate() {
    var rawData = elements.dataInput ? elements.dataInput.value : '';
    var data = parseData(rawData);

    if (data.length < 2) {
      showError('Please enter at least 2 numbers in your data set.');
      return;
    }

    var valueStr = elements.valueInput ? elements.valueInput.value : '';
    var percentileStr = elements.percentileInput ? elements.percentileInput.value : '';
    var hasValue = valueStr !== '' && !isNaN(parseFloat(valueStr));
    var hasPercentile = percentileStr !== '' && !isNaN(parseFloat(percentileStr));

    if (!hasValue && !hasPercentile) {
      showError('Enter a value to rank, a percentile to look up, or both.');
      return;
    }

    var p = hasPercentile ? parseFloat(percentileStr) : null;
    if (hasPercentile && (p < 0 || p > 100)) {
      showError('Percentile must be between 0 and 100.');
      return;
    }

    var sorted = data.slice().sort(function (a, b) { return a - b; });
    var n = sorted.length;

    saveToURL(rawData, valueStr, percentileStr);

    var blocks = [];
    var mainLabel, mainValue;

    if (hasValue) {
      var v = parseFloat(valueStr);
      var rank = percentileRankOf(sorted, v);
      mainLabel = 'Percentile Rank of ' + formatNum(v);
      mainValue = formatNum(rank, 2) + 'th percentile';
      blocks.push(
        '<div class="result-summary-item" style="grid-column: 1 / -1;">' +
          '<span class="result-summary-label">' + formatNum(v) + ' is at or above</span>' +
          '<span class="result-summary-value">' + formatNum(rank, 2) + '% of the ' + n + ' values</span>' +
        '</div>'
      );
    }

    if (hasPercentile) {
      var val = valueAtPercentile(sorted, p);
      if (!hasValue) {
        mainLabel = 'Value at the ' + formatNum(p) + 'th Percentile';
        mainValue = formatNum(val, 4);
      } else {
        blocks.push(
          '<div class="result-summary-item" style="grid-column: 1 / -1;">' +
            '<span class="result-summary-label">Value at the ' + formatNum(p) + 'th percentile</span>' +
            '<span class="result-summary-value">' + formatNum(val, 4) + '</span>' +
          '</div>'
        );
      }
    }

    blocks.push(
      '<div class="result-summary-item">' +
        '<span class="result-summary-label">Data set size (N)</span>' +
        '<span class="result-summary-value">' + n + '</span>' +
      '</div>'
    );
    blocks.push(
      '<div class="result-summary-item">' +
        '<span class="result-summary-label">Min — Max</span>' +
        '<span class="result-summary-value">' + formatNum(sorted[0]) + ' — ' + formatNum(sorted[n - 1]) + '</span>' +
      '</div>'
    );

    var html =
      '<div class="result-main">' +
        '<div class="result-label">' + mainLabel + '</div>' +
        '<div class="result-value">' + mainValue + '</div>' +
      '</div>' +
      '<div class="result-summary">' + blocks.join('') + '</div>';

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
    if (elements.dataInput) elements.dataInput.value = '';
    if (elements.valueInput) elements.valueInput.value = '';
    if (elements.percentileInput) elements.percentileInput.value = '';
    elements.resultDiv.classList.add('hidden');
    elements.resultDiv.innerHTML = '';
    history.replaceState(null, '', window.location.pathname);
  }

  function saveToURL(data, value, percentile) {
    var params = new URLSearchParams();
    if (data) params.set('data', data);
    if (value !== '') params.set('value', value);
    if (percentile !== '') params.set('p', percentile);
    var newURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    history.replaceState(null, '', newURL);
  }

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('data')) {
      if (elements.dataInput) elements.dataInput.value = params.get('data');
      if (params.has('value') && elements.valueInput) elements.valueInput.value = params.get('value');
      if (params.has('p') && elements.percentileInput) elements.percentileInput.value = params.get('p');
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
    [elements.valueInput, elements.percentileInput].forEach(function (el) {
      if (el) {
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') calculate();
        });
      }
    });
  }
}());
