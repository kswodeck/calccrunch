// Standard Deviation Calculator
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
      numbersInput: document.getElementById('numbers-input'),
      dataType: document.getElementById('data-type'),
      calculateBtn: document.getElementById('calculate-btn'),
      clearBtn: document.getElementById('clear-btn'),
      resultDiv: document.getElementById('standard-deviation-calculator-result')
    };
  }

  function parseNumbers(raw) {
    return raw
      .split(/[\s,;\n]+/)
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s !== ''; })
      .map(function (s) { return parseFloat(s); })
      .filter(function (n) { return !isNaN(n); });
  }

  function mean(nums) {
    return nums.reduce(function (a, b) { return a + b; }, 0) / nums.length;
  }

  function sumSquaredDiffs(nums, avg) {
    return nums.reduce(function (acc, x) { return acc + (x - avg) * (x - avg); }, 0);
  }

  function formatNum(n) {
    if (n === null || isNaN(n)) return 'N/A';
    var rounded = Math.round(n * 1e6) / 1e6;
    var str = String(rounded);
    if (str.indexOf('.') !== -1 && str.split('.')[1].length > 4) {
      return rounded.toFixed(4).replace(/\.?0+$/, '');
    }
    return str;
  }

  function calculate() {
    var raw = elements.numbersInput ? elements.numbersInput.value : '';
    var dataType = elements.dataType ? elements.dataType.value : 'sample';
    var nums = parseNumbers(raw);

    if (nums.length === 0) {
      showError('Please enter at least one number.');
      return;
    }

    if (dataType === 'sample' && nums.length < 2) {
      showError('Sample standard deviation needs at least 2 numbers. Switch to "Population" for a single value, or add more numbers.');
      return;
    }

    saveToURL(raw, dataType);

    var n = nums.length;
    var avg = mean(nums);
    var sumSq = sumSquaredDiffs(nums, avg);
    var divisor = dataType === 'population' ? n : (n - 1);
    var variance = sumSq / divisor;
    var stdDev = Math.sqrt(variance);
    var sum = nums.reduce(function (a, b) { return a + b; }, 0);
    var sorted = nums.slice().sort(function (a, b) { return a - b; });
    var minVal = sorted[0];
    var maxVal = sorted[sorted.length - 1];
    var typeLabel = dataType === 'population' ? 'Population' : 'Sample';

    var html =
      '<div class="result-main">' +
        '<div class="result-label">' + typeLabel + ' Standard Deviation</div>' +
        '<div class="result-value">' + formatNum(stdDev) + '</div>' +
      '</div>' +
      '<div class="result-summary">' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Variance</span>' +
          '<span class="result-summary-value">' + formatNum(variance) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Mean</span>' +
          '<span class="result-summary-value">' + formatNum(avg) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Sum</span>' +
          '<span class="result-summary-value">' + formatNum(sum) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Count (n)</span>' +
          '<span class="result-summary-value">' + n + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Min</span>' +
          '<span class="result-summary-value">' + formatNum(minVal) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Max</span>' +
          '<span class="result-summary-value">' + formatNum(maxVal) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="result-summary" style="margin-top:0.5rem;">' +
        '<div class="result-summary-item" style="grid-column: 1 / -1;">' +
          '<span class="result-summary-label">Sum of squared differences Σ(x − x̄)²</span>' +
          '<span class="result-summary-value">' + formatNum(sumSq) + ' ÷ ' + divisor + ' = ' + formatNum(variance) + '</span>' +
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
    if (elements.numbersInput) elements.numbersInput.value = '';
    if (elements.dataType) elements.dataType.value = 'sample';
    elements.resultDiv.classList.add('hidden');
    elements.resultDiv.innerHTML = '';
    history.replaceState(null, '', window.location.pathname);
  }

  function saveToURL(raw, dataType) {
    var params = new URLSearchParams();
    if (raw && raw.trim()) params.set('n', raw.trim());
    if (dataType) params.set('type', dataType);
    var newURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    history.replaceState(null, '', newURL);
  }

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    var hasNumbers = params.has('n') && elements.numbersInput;
    if (hasNumbers) {
      elements.numbersInput.value = params.get('n');
    }
    if (params.has('type') && elements.dataType) {
      elements.dataType.value = params.get('type');
    }
    if (hasNumbers) calculate();
  }

  function attachEventListeners() {
    if (elements.calculateBtn) {
      elements.calculateBtn.addEventListener('click', calculate);
    }
    if (elements.clearBtn) {
      elements.clearBtn.addEventListener('click', clearAll);
    }
    if (elements.numbersInput) {
      elements.numbersInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.ctrlKey) calculate();
      });
    }
  }
}());
