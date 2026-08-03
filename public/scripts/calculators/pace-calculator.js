// Pace Calculator
(function () {
  'use strict';

  var KM_PER_MI = 1.609344;
  var HALF_MARATHON_MI = 13.1094;
  var MARATHON_MI = 26.2188;

  var currentMode = 'pace';

  var URLParams = {
    getAll: function () {
      var params = new URLSearchParams(window.location.search);
      var result = {};
      for (var pair of params) {
        result[pair[0]] = pair[1];
      }
      return result;
    },
    update: function (values) {
      var params = new URLSearchParams();
      Object.keys(values).forEach(function (key) {
        if (values[key] !== '' && values[key] !== null && values[key] !== undefined) {
          params.set(key, values[key]);
        }
      });
      var newURL = params.toString() ? window.location.pathname + '?' + params.toString() : window.location.pathname;
      window.history.replaceState({}, '', newURL);
    },
    clear: function () {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  function init() {
    var calculateBtn = document.getElementById('calculate-btn');
    var resultDiv = document.getElementById('pace-calculator-result');
    if (!calculateBtn || !resultDiv) return;

    var modeButtons = document.querySelectorAll('.pace-mode-btn');
    modeButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        modeButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentMode = btn.getAttribute('data-mode');
        updateFieldStates();
      });
    });

    var quickButtons = document.querySelectorAll('.pace-quick-btn');
    quickButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.getElementById('pace-distance').value = btn.getAttribute('data-distance');
        document.getElementById('distance-unit').value = btn.getAttribute('data-unit');
        updatePaceUnitLabel();
      });
    });

    var distanceUnitSelect = document.getElementById('distance-unit');
    if (distanceUnitSelect) {
      distanceUnitSelect.addEventListener('change', updatePaceUnitLabel);
    }

    updateFieldStates();
    updatePaceUnitLabel();
    loadFromURL();

    calculateBtn.addEventListener('click', function () {
      calculateResults();
      var el = document.querySelector('.calculator-result');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    var shareBtn = document.getElementById('share-btn');
    if (shareBtn) shareBtn.addEventListener('click', shareResults);

    var clearBtn = document.getElementById('clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', clearForm);

    var inputs = document.querySelectorAll('#pace-calculator-form input');
    inputs.forEach(function (input) {
      input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateResults();
        }
      });
    });

    var urlParams = URLParams.getAll();
    if (Object.keys(urlParams).length > 0) {
      setTimeout(calculateResults, 100);
    }
  }

  function updateFieldStates() {
    var distanceGroup = document.getElementById('distance-group');
    var timeGroup = document.getElementById('time-group');
    var paceGroup = document.getElementById('pace-group');

    [distanceGroup, timeGroup, paceGroup].forEach(function (g) {
      if (g) g.classList.remove('field-disabled');
    });

    if (currentMode === 'pace' && paceGroup) {
      paceGroup.classList.add('field-disabled');
    } else if (currentMode === 'time' && timeGroup) {
      timeGroup.classList.add('field-disabled');
    } else if (currentMode === 'distance' && distanceGroup) {
      distanceGroup.classList.add('field-disabled');
    }
  }

  function updatePaceUnitLabel() {
    var unit = document.getElementById('distance-unit').value;
    var label = document.getElementById('pace-unit-label');
    if (label) {
      label.textContent = unit === 'km' ? 'per km' : 'per mile';
    }
  }

  function loadFromURL() {
    var params = URLParams.getAll();
    if (Object.keys(params).length === 0) return;

    if (params.mode) {
      currentMode = params.mode;
      document.querySelectorAll('.pace-mode-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-mode') === params.mode);
      });
      updateFieldStates();
    }
    if (params.distance) document.getElementById('pace-distance').value = params.distance;
    if (params.unit) {
      document.getElementById('distance-unit').value = params.unit;
      updatePaceUnitLabel();
    }
    if (params.h) document.getElementById('pace-hours').value = params.h;
    if (params.m) document.getElementById('pace-minutes').value = params.m;
    if (params.s) document.getElementById('pace-seconds').value = params.s;
    if (params.pmin) document.getElementById('pace-min').value = params.pmin;
    if (params.psec) document.getElementById('pace-sec').value = params.psec;
  }

  function saveToURL() {
    var values = {
      mode: currentMode,
      distance: document.getElementById('pace-distance').value,
      unit: document.getElementById('distance-unit').value,
      h: document.getElementById('pace-hours').value,
      m: document.getElementById('pace-minutes').value,
      s: document.getElementById('pace-seconds').value,
      pmin: document.getElementById('pace-min').value,
      psec: document.getElementById('pace-sec').value
    };
    URLParams.update(values);
  }

  function calculateResults() {
    var distanceUnit = document.getElementById('distance-unit').value;
    var distanceVal = parseFloat(document.getElementById('pace-distance').value);
    var hours = parseFloat(document.getElementById('pace-hours').value) || 0;
    var minutes = parseFloat(document.getElementById('pace-minutes').value) || 0;
    var seconds = parseFloat(document.getElementById('pace-seconds').value) || 0;
    var totalTimeSeconds = hours * 3600 + minutes * 60 + seconds;
    var paceMin = parseFloat(document.getElementById('pace-min').value) || 0;
    var paceSec = parseFloat(document.getElementById('pace-sec').value) || 0;
    var paceSecondsPerUnit = paceMin * 60 + paceSec;

    if (currentMode === 'pace') {
      if (!distanceVal || distanceVal <= 0) {
        showError('Please enter a valid distance.');
        return;
      }
      if (!totalTimeSeconds || totalTimeSeconds <= 0) {
        showError('Please enter a valid finish time.');
        return;
      }
      paceSecondsPerUnit = totalTimeSeconds / distanceVal;
      document.getElementById('pace-min').value = Math.floor(paceSecondsPerUnit / 60);
      document.getElementById('pace-sec').value = Math.round(paceSecondsPerUnit % 60);
    } else if (currentMode === 'time') {
      if (!distanceVal || distanceVal <= 0) {
        showError('Please enter a valid distance.');
        return;
      }
      if (!paceSecondsPerUnit || paceSecondsPerUnit <= 0) {
        showError('Please enter a valid pace.');
        return;
      }
      totalTimeSeconds = distanceVal * paceSecondsPerUnit;
      var th = Math.floor(totalTimeSeconds / 3600);
      var tm = Math.floor((totalTimeSeconds % 3600) / 60);
      var ts = Math.round(totalTimeSeconds % 60);
      document.getElementById('pace-hours').value = th;
      document.getElementById('pace-minutes').value = tm;
      document.getElementById('pace-seconds').value = ts;
    } else if (currentMode === 'distance') {
      if (!totalTimeSeconds || totalTimeSeconds <= 0) {
        showError('Please enter a valid finish time.');
        return;
      }
      if (!paceSecondsPerUnit || paceSecondsPerUnit <= 0) {
        showError('Please enter a valid pace.');
        return;
      }
      distanceVal = totalTimeSeconds / paceSecondsPerUnit;
      document.getElementById('pace-distance').value = round2(distanceVal);
    }

    var paceSecondsPerMile, paceSecondsPerKm;
    if (distanceUnit === 'mi') {
      paceSecondsPerMile = paceSecondsPerUnit;
      paceSecondsPerKm = paceSecondsPerUnit / KM_PER_MI;
    } else {
      paceSecondsPerKm = paceSecondsPerUnit;
      paceSecondsPerMile = paceSecondsPerUnit * KM_PER_MI;
    }

    var speedMph = 3600 / paceSecondsPerMile;
    var speedKmh = 3600 / paceSecondsPerKm;

    var predictions = {
      '5K': 5 * paceSecondsPerKm,
      '10K': 10 * paceSecondsPerKm,
      'Half Marathon': HALF_MARATHON_MI * paceSecondsPerMile,
      'Marathon': MARATHON_MI * paceSecondsPerMile
    };

    saveToURL();

    displayResults({
      mode: currentMode,
      distanceVal: distanceVal,
      distanceUnit: distanceUnit,
      totalTimeSeconds: totalTimeSeconds,
      paceSecondsPerUnit: paceSecondsPerUnit,
      speedMph: speedMph,
      speedKmh: speedKmh,
      predictions: predictions
    });

    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculator_use', {
        calculator_type: 'pace',
        result_value: Math.round(paceSecondsPerUnit)
      });
    }
  }

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function formatMinSec(totalSeconds) {
    var m = Math.floor(totalSeconds / 60);
    var s = Math.round(totalSeconds % 60);
    if (s === 60) { m += 1; s = 0; }
    return m + ':' + (s < 10 ? '0' + s : s);
  }

  function formatHMS(totalSeconds) {
    var h = Math.floor(totalSeconds / 3600);
    var m = Math.floor((totalSeconds % 3600) / 60);
    var s = Math.round(totalSeconds % 60);
    if (s === 60) { s = 0; m += 1; }
    if (m === 60) { m = 0; h += 1; }
    if (h > 0) {
      return h + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    }
    return m + ':' + (s < 10 ? '0' + s : s);
  }

  function displayResults(data) {
    var resultDiv = document.getElementById('pace-calculator-result');
    var unitLabel = data.distanceUnit === 'km' ? 'km' : 'mi';
    var unitWord = data.distanceUnit === 'km' ? 'kilometer' : 'mile';

    var headline, headlineLabel;
    if (data.mode === 'pace') {
      headline = formatMinSec(data.paceSecondsPerUnit);
      headlineLabel = 'minutes per ' + unitWord;
    } else if (data.mode === 'time') {
      headline = formatHMS(data.totalTimeSeconds);
      headlineLabel = 'total finish time';
    } else {
      headline = round2(data.distanceVal) + ' ' + unitLabel;
      headlineLabel = 'distance covered';
    }

    var predRows = '';
    Object.keys(data.predictions).forEach(function (name) {
      predRows +=
        '<div class="pace-pred-row">' +
          '<span class="pace-pred-name">' + name + '</span>' +
          '<span class="pace-pred-time">' + formatHMS(data.predictions[name]) + '</span>' +
        '</div>';
    });

    resultDiv.innerHTML =
      '<div class="result-card">' +
        '<div class="result-header-actions" style="justify-content: center;">' +
          '<h3>Pace Results</h3>' +
        '</div>' +
        '<div class="result-summary" style="display: block; text-align: center; margin-bottom: 1.5rem;">' +
          '<div style="margin-bottom: 1rem;">' +
            '<div style="font-size: 2.5rem; font-weight: bold; color: var(--color-chart-blue-dark);">' + headline + '</div>' +
            '<div style="font-size: 1.1rem; color: var(--color-gray-dark);">' + headlineLabel + '</div>' +
          '</div>' +
          '<div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">' +
            '<div style="text-align: center;">' +
              '<div style="font-size: 1.3rem; font-weight: bold; color: var(--color-primary-blue);">' + formatMinSec(data.paceSecondsPerUnit) + '</div>' +
              '<div style="font-size: 0.85rem; color: var(--color-gray-dark);">pace / ' + unitWord + '</div>' +
            '</div>' +
            '<div style="text-align: center;">' +
              '<div style="font-size: 1.3rem; font-weight: bold; color: var(--color-primary-blue);">' + data.speedMph.toFixed(1) + '</div>' +
              '<div style="font-size: 0.85rem; color: var(--color-gray-dark);">mph</div>' +
            '</div>' +
            '<div style="text-align: center;">' +
              '<div style="font-size: 1.3rem; font-weight: bold; color: var(--color-primary-blue);">' + data.speedKmh.toFixed(1) + '</div>' +
              '<div style="font-size: 0.85rem; color: var(--color-gray-dark);">km/h</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div style="margin-bottom: 1rem;">' +
          '<h4 style="margin-bottom: 0.75rem;">🏁 Race Time Predictions at This Pace</h4>' +
          '<div class="pace-pred-table">' + predRows + '</div>' +
          '<p style="font-size: 0.75rem; color: var(--color-gray-dark); margin-top: 0.5rem;">Assumes you hold this exact pace for the entire distance.</p>' +
        '</div>' +
        '<div class="result-actions" style="justify-content: center; margin-top: 1.5rem;">' +
          '<button type="button" onclick="document.getElementById(\'share-btn\').click()" class="btn-action" title="Share Results">Share</button>' +
          '<button type="button" onclick="document.getElementById(\'clear-btn\').click()" class="btn-action" title="Reset Calculator">Clear</button>' +
        '</div>' +
      '</div>' +
      '<style>' +
        '.pace-pred-table { display: flex; flex-direction: column; gap: 0.4rem; }' +
        '.pace-pred-row { display: flex; justify-content: space-between; padding: 0.6rem 1rem; background: var(--color-surface-neutral); border-radius: var(--border-radius); }' +
        '.pace-pred-name { font-weight: 600; }' +
        '.pace-pred-time { font-weight: bold; color: var(--color-primary-blue); }' +
      '</style>';

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    var resultDiv = document.getElementById('pace-calculator-result');
    resultDiv.innerHTML = '<div class="error-message"><strong>⚠️ Error:</strong> ' + message + '</div>';
    resultDiv.classList.remove('hidden');
  }

  function shareResults() {
    saveToURL();
    var shareURL = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Pace Calculator - CalcCrunch',
        text: 'Check out my running pace calculation!',
        url: shareURL
      }).catch(function () { copyToClipboard(shareURL); });
    } else {
      copyToClipboard(shareURL);
    }
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showCopyFeedback).catch(function () { fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopyFeedback();
    } catch (err) {
      alert('Copy this link to share: ' + text);
    }
    document.body.removeChild(textarea);
  }

  function showCopyFeedback() {
    var shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      var originalHTML = shareBtn.innerHTML;
      shareBtn.innerHTML = 'Link Copied!';
      shareBtn.style.background = 'var(--color-success)';
      shareBtn.style.color = 'white';
      setTimeout(function () {
        shareBtn.innerHTML = originalHTML;
        shareBtn.style.background = '';
        shareBtn.style.color = '';
      }, 2000);
    }
  }

  function clearForm() {
    document.getElementById('pace-distance').value = '5';
    document.getElementById('distance-unit').value = 'mi';
    document.getElementById('pace-hours').value = '0';
    document.getElementById('pace-minutes').value = '25';
    document.getElementById('pace-seconds').value = '0';
    document.getElementById('pace-min').value = '8';
    document.getElementById('pace-sec').value = '2';
    updatePaceUnitLabel();

    URLParams.clear();

    var resultDiv = document.getElementById('pace-calculator-result');
    if (resultDiv) resultDiv.classList.add('hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
