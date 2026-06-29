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
      calculateBtn: document.getElementById('calculate-btn'),
      clearBtn: document.getElementById('clear-btn'),
      resultDiv: document.getElementById('average-calculator-result')
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

  function median(nums) {
    var sorted = nums.slice().sort(function (a, b) { return a - b; });
    var mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 1) {
      return sorted[mid];
    }
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }

  function mode(nums) {
    var freq = {};
    nums.forEach(function (n) {
      freq[n] = (freq[n] || 0) + 1;
    });
    var maxFreq = 0;
    Object.keys(freq).forEach(function (k) {
      if (freq[k] > maxFreq) maxFreq = freq[k];
    });
    if (maxFreq === 1) return null;
    return Object.keys(freq)
      .filter(function (k) { return freq[k] === maxFreq; })
      .map(Number)
      .sort(function (a, b) { return a - b; });
  }

  function formatNum(n) {
    var rounded = Math.round(n * 1e10) / 1e10;
    var str = String(rounded);
    if (str.indexOf('.') !== -1 && str.split('.')[1].length > 6) {
      return rounded.toFixed(6).replace(/\.?0+$/, '');
    }
    return str;
  }

  function calculate() {
    var raw = elements.numbersInput ? elements.numbersInput.value : '';
    var nums = parseNumbers(raw);

    if (nums.length === 0) {
      showError('Please enter at least one number.');
      return;
    }

    saveToURL(raw);

    var avg = mean(nums);
    var med = median(nums);
    var modes = mode(nums);
    var sorted = nums.slice().sort(function (a, b) { return a - b; });
    var minVal = sorted[0];
    var maxVal = sorted[sorted.length - 1];
    var rangeVal = maxVal - minVal;
    var sumVal = nums.reduce(function (a, b) { return a + b; }, 0);

    var modeStr;
    if (modes === null) {
      modeStr = 'None';
    } else {
      modeStr = modes.map(formatNum).join(', ');
    }

    var html =
      '<div class="result-main">' +
        '<div class="result-label">Mean (Average)</div>' +
        '<div class="result-value">' + formatNum(avg) + '</div>' +
      '</div>' +
      '<div class="result-summary">' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Median</span>' +
          '<span class="result-summary-value">' + formatNum(med) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Mode</span>' +
          '<span class="result-summary-value">' + modeStr + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Range</span>' +
          '<span class="result-summary-value">' + formatNum(rangeVal) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Sum</span>' +
          '<span class="result-summary-value">' + formatNum(sumVal) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Count</span>' +
          '<span class="result-summary-value">' + nums.length + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Min</span>' +
          '<span class="result-summary-value">' + formatNum(minVal) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Max</span>' +
          '<span class="result-summary-value">' + formatNum(maxVal) + '</span>' +
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
    elements.resultDiv.classList.add('hidden');
    elements.resultDiv.innerHTML = '';
    history.replaceState(null, '', window.location.pathname);
  }

  function saveToURL(raw) {
    var params = new URLSearchParams();
    if (raw && raw.trim()) params.set('n', raw.trim());
    var newURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    history.replaceState(null, '', newURL);
  }

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('n') && elements.numbersInput) {
      elements.numbersInput.value = params.get('n');
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
    if (elements.numbersInput) {
      elements.numbersInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.ctrlKey) calculate();
      });
    }
  }
}());
