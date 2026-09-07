// Confidence Interval Calculator
(function () {
  'use strict';

  var elements = {};

  // Two-tailed t critical values by degrees of freedom (rows) and confidence level (columns: 80/90/95/98/99).
  // The last row (Infinity) equals the z critical value, used for proportions and very large samples.
  var T_TABLE = {
    1: { 80: 3.078, 90: 6.314, 95: 12.706, 98: 31.821, 99: 63.657 },
    2: { 80: 1.886, 90: 2.920, 95: 4.303, 98: 6.965, 99: 9.925 },
    3: { 80: 1.638, 90: 2.353, 95: 3.182, 98: 4.541, 99: 5.841 },
    4: { 80: 1.533, 90: 2.132, 95: 2.776, 98: 3.747, 99: 4.604 },
    5: { 80: 1.476, 90: 2.015, 95: 2.571, 98: 3.365, 99: 4.032 },
    6: { 80: 1.440, 90: 1.943, 95: 2.447, 98: 3.143, 99: 3.707 },
    7: { 80: 1.415, 90: 1.895, 95: 2.365, 98: 2.998, 99: 3.499 },
    8: { 80: 1.397, 90: 1.860, 95: 2.306, 98: 2.896, 99: 3.355 },
    9: { 80: 1.383, 90: 1.833, 95: 2.262, 98: 2.821, 99: 3.250 },
    10: { 80: 1.372, 90: 1.812, 95: 2.228, 98: 2.764, 99: 3.169 },
    11: { 80: 1.363, 90: 1.796, 95: 2.201, 98: 2.718, 99: 3.106 },
    12: { 80: 1.356, 90: 1.782, 95: 2.179, 98: 2.681, 99: 3.055 },
    13: { 80: 1.350, 90: 1.771, 95: 2.160, 98: 2.650, 99: 3.012 },
    14: { 80: 1.345, 90: 1.761, 95: 2.145, 98: 2.624, 99: 2.977 },
    15: { 80: 1.341, 90: 1.753, 95: 2.131, 98: 2.602, 99: 2.947 },
    16: { 80: 1.337, 90: 1.746, 95: 2.120, 98: 2.583, 99: 2.921 },
    17: { 80: 1.333, 90: 1.740, 95: 2.110, 98: 2.567, 99: 2.898 },
    18: { 80: 1.330, 90: 1.734, 95: 2.101, 98: 2.552, 99: 2.878 },
    19: { 80: 1.328, 90: 1.729, 95: 2.093, 98: 2.539, 99: 2.861 },
    20: { 80: 1.325, 90: 1.725, 95: 2.086, 98: 2.528, 99: 2.845 },
    21: { 80: 1.323, 90: 1.721, 95: 2.080, 98: 2.518, 99: 2.831 },
    22: { 80: 1.321, 90: 1.717, 95: 2.074, 98: 2.508, 99: 2.819 },
    23: { 80: 1.319, 90: 1.714, 95: 2.069, 98: 2.500, 99: 2.807 },
    24: { 80: 1.318, 90: 1.711, 95: 2.064, 98: 2.492, 99: 2.797 },
    25: { 80: 1.316, 90: 1.708, 95: 2.060, 98: 2.485, 99: 2.787 },
    26: { 80: 1.315, 90: 1.706, 95: 2.056, 98: 2.479, 99: 2.779 },
    27: { 80: 1.314, 90: 1.703, 95: 2.052, 98: 2.473, 99: 2.771 },
    28: { 80: 1.313, 90: 1.701, 95: 2.048, 98: 2.467, 99: 2.763 },
    29: { 80: 1.311, 90: 1.699, 95: 2.045, 98: 2.462, 99: 2.756 },
    30: { 80: 1.310, 90: 1.697, 95: 2.042, 98: 2.457, 99: 2.750 },
    40: { 80: 1.303, 90: 1.684, 95: 2.021, 98: 2.423, 99: 2.704 },
    60: { 80: 1.296, 90: 1.671, 95: 2.000, 98: 2.390, 99: 2.660 },
    80: { 80: 1.292, 90: 1.664, 95: 1.990, 98: 2.374, 99: 2.639 },
    100: { 80: 1.290, 90: 1.660, 95: 1.984, 98: 2.364, 99: 2.626 },
    120: { 80: 1.289, 90: 1.658, 95: 1.980, 98: 2.358, 99: 2.617 },
    Infinity: { 80: 1.282, 90: 1.645, 95: 1.960, 98: 2.326, 99: 2.576 }
  };

  var T_DF_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 60, 80, 100, 120, Infinity];

  document.addEventListener('DOMContentLoaded', function () {
    cacheElements();
    loadFromURL();
    attachEventListeners();
    updateModeVisibility();
  });

  function cacheElements() {
    elements = {
      modeSelect: document.getElementById('ci-mode'),
      meanSection: document.getElementById('mean-section'),
      proportionSection: document.getElementById('proportion-section'),
      meanInput: document.getElementById('mean-input'),
      stddevInput: document.getElementById('stddev-input'),
      meanNInput: document.getElementById('mean-n-input'),
      proportionInput: document.getElementById('proportion-input'),
      propNInput: document.getElementById('prop-n-input'),
      confidenceLevel: document.getElementById('confidence-level'),
      calculateBtn: document.getElementById('calculate-btn'),
      clearBtn: document.getElementById('clear-btn'),
      resultDiv: document.getElementById('confidence-interval-calculator-result')
    };
  }

  function getCriticalT(df, level) {
    if (df >= 120) return T_TABLE[Infinity][level];
    for (var i = 0; i < T_DF_KEYS.length; i++) {
      if (T_DF_KEYS[i] >= df) return T_TABLE[T_DF_KEYS[i]][level];
    }
    return T_TABLE[Infinity][level];
  }

  function formatNum(n, decimals) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    var d = decimals === undefined ? 4 : decimals;
    var rounded = Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
    return String(rounded);
  }

  function updateModeVisibility() {
    var mode = elements.modeSelect ? elements.modeSelect.value : 'mean';
    if (mode === 'proportion') {
      elements.meanSection.classList.add('hidden');
      elements.proportionSection.classList.remove('hidden');
    } else {
      elements.meanSection.classList.remove('hidden');
      elements.proportionSection.classList.add('hidden');
    }
  }

  function calculate() {
    var mode = elements.modeSelect ? elements.modeSelect.value : 'mean';
    var level = parseInt(elements.confidenceLevel.value, 10);

    if (mode === 'mean') {
      calculateMean(level);
    } else {
      calculateProportion(level);
    }
  }

  function calculateMean(level) {
    var xbar = parseFloat(elements.meanInput.value);
    var s = parseFloat(elements.stddevInput.value);
    var n = parseInt(elements.meanNInput.value, 10);

    if (isNaN(xbar) || isNaN(s) || isNaN(n)) {
      showError('Please enter the sample mean, standard deviation, and sample size.');
      return;
    }
    if (s < 0) {
      showError('Standard deviation cannot be negative.');
      return;
    }
    if (n < 2) {
      showError('Sample size must be at least 2 to calculate a confidence interval for a mean.');
      return;
    }

    saveToURL({ mode: 'mean', mean: xbar, sd: s, n: n, level: level });

    var df = n - 1;
    var tCrit = getCriticalT(df, level);
    var se = s / Math.sqrt(n);
    var margin = tCrit * se;
    var lower = xbar - margin;
    var upper = xbar + margin;

    var html =
      '<div class="result-main">' +
        '<div class="result-label">' + level + '% Confidence Interval</div>' +
        '<div class="result-value">' + formatNum(lower, 3) + ' to ' + formatNum(upper, 3) + '</div>' +
      '</div>' +
      '<div class="result-summary">' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Margin of Error</span>' +
          '<span class="result-summary-value">± ' + formatNum(margin, 4) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Sample Mean (x̄)</span>' +
          '<span class="result-summary-value">' + formatNum(xbar, 4) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Standard Error</span>' +
          '<span class="result-summary-value">' + formatNum(se, 4) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Degrees of Freedom (n − 1)</span>' +
          '<span class="result-summary-value">' + df + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">t Critical Value</span>' +
          '<span class="result-summary-value">' + formatNum(tCrit, 3) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Sample Size (n)</span>' +
          '<span class="result-summary-value">' + n + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="result-summary" style="margin-top:0.5rem;">' +
        '<div class="result-summary-item" style="grid-column: 1 / -1;">' +
          '<span class="result-summary-label">Calculation</span>' +
          '<span class="result-summary-value">' + formatNum(xbar, 3) + ' ± ' + formatNum(tCrit, 3) + ' × (' + formatNum(s, 3) + ' ÷ √' + n + ') = ' + formatNum(xbar, 3) + ' ± ' + formatNum(margin, 4) + '</span>' +
        '</div>' +
      '</div>';

    renderResult(html);
  }

  function calculateProportion(level) {
    var pPercent = parseFloat(elements.proportionInput.value);
    var n = parseInt(elements.propNInput.value, 10);

    if (isNaN(pPercent) || isNaN(n)) {
      showError('Please enter the sample proportion and sample size.');
      return;
    }
    if (pPercent < 0 || pPercent > 100) {
      showError('Sample proportion must be between 0 and 100%.');
      return;
    }
    if (n < 1) {
      showError('Sample size must be at least 1.');
      return;
    }

    saveToURL({ mode: 'proportion', p: pPercent, n: n, level: level });

    var phat = pPercent / 100;
    var zCrit = T_TABLE[Infinity][level];
    var se = Math.sqrt((phat * (1 - phat)) / n);
    var margin = zCrit * se;
    var lowerPct = Math.max(0, (phat - margin) * 100);
    var upperPct = Math.min(100, (phat + margin) * 100);

    var warning = '';
    if (n * phat < 5 || n * (1 - phat) < 5) {
      warning =
        '<div class="result-summary" style="margin-top:0.5rem;">' +
          '<div class="result-summary-item" style="grid-column: 1 / -1; color: var(--color-warning);">' +
            '<span class="result-summary-value">⚠️ n × p̂ or n × (1 − p̂) is below 5 — the normal approximation used here is less reliable for such a small or extreme sample. Treat this interval as a rough estimate.</span>' +
          '</div>' +
        '</div>';
    }

    var html =
      '<div class="result-main">' +
        '<div class="result-label">' + level + '% Confidence Interval</div>' +
        '<div class="result-value">' + formatNum(lowerPct, 2) + '% to ' + formatNum(upperPct, 2) + '%</div>' +
      '</div>' +
      '<div class="result-summary">' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Margin of Error</span>' +
          '<span class="result-summary-value">± ' + formatNum(margin * 100, 2) + ' pts</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Sample Proportion (p̂)</span>' +
          '<span class="result-summary-value">' + formatNum(pPercent, 2) + '%</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Standard Error</span>' +
          '<span class="result-summary-value">' + formatNum(se, 4) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">z Critical Value</span>' +
          '<span class="result-summary-value">' + formatNum(zCrit, 3) + '</span>' +
        '</div>' +
        '<div class="result-summary-item">' +
          '<span class="result-summary-label">Sample Size (n)</span>' +
          '<span class="result-summary-value">' + n + '</span>' +
        '</div>' +
      '</div>' +
      warning;

    renderResult(html);
  }

  function renderResult(html) {
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
    if (elements.meanInput) elements.meanInput.value = '';
    if (elements.stddevInput) elements.stddevInput.value = '';
    if (elements.meanNInput) elements.meanNInput.value = '';
    if (elements.proportionInput) elements.proportionInput.value = '';
    if (elements.propNInput) elements.propNInput.value = '';
    if (elements.confidenceLevel) elements.confidenceLevel.value = '95';
    if (elements.modeSelect) elements.modeSelect.value = 'mean';
    updateModeVisibility();
    elements.resultDiv.classList.add('hidden');
    elements.resultDiv.innerHTML = '';
    history.replaceState(null, '', window.location.pathname);
  }

  function saveToURL(data) {
    var params = new URLSearchParams();
    params.set('mode', data.mode);
    if (data.mode === 'mean') {
      params.set('mean', data.mean);
      params.set('sd', data.sd);
      params.set('n', data.n);
    } else {
      params.set('p', data.p);
      params.set('n', data.n);
    }
    params.set('level', data.level);
    var newURL = window.location.pathname + '?' + params.toString();
    history.replaceState(null, '', newURL);
  }

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    if (!params.has('mode')) return;

    var mode = params.get('mode');
    if (elements.modeSelect) elements.modeSelect.value = mode === 'proportion' ? 'proportion' : 'mean';

    if (params.has('level') && elements.confidenceLevel) {
      elements.confidenceLevel.value = params.get('level');
    }

    if (mode === 'proportion') {
      if (params.has('p') && elements.proportionInput) elements.proportionInput.value = params.get('p');
      if (params.has('n') && elements.propNInput) elements.propNInput.value = params.get('n');
    } else {
      if (params.has('mean') && elements.meanInput) elements.meanInput.value = params.get('mean');
      if (params.has('sd') && elements.stddevInput) elements.stddevInput.value = params.get('sd');
      if (params.has('n') && elements.meanNInput) elements.meanNInput.value = params.get('n');
    }

    updateModeVisibility();
    calculate();
  }

  function attachEventListeners() {
    if (elements.modeSelect) {
      elements.modeSelect.addEventListener('change', updateModeVisibility);
    }
    if (elements.calculateBtn) {
      elements.calculateBtn.addEventListener('click', calculate);
    }
    if (elements.clearBtn) {
      elements.clearBtn.addEventListener('click', clearAll);
    }
  }
}());
