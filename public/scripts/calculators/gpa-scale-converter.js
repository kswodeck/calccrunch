// GPA Scale Converter
(function () {
  'use strict';

  var elements = {};

  document.addEventListener('DOMContentLoaded', function () {
    cacheElements();
    attachEventListeners();
    loadFromURL();
  });

  function cacheElements() {
    elements = {
      gpaInput: document.getElementById('gpa-input'),
      fromScale: document.getElementById('from-scale'),
      toScale: document.getElementById('to-scale'),
      fromCustomWrap: document.getElementById('from-custom-wrap'),
      toCustomWrap: document.getElementById('to-custom-wrap'),
      fromCustom: document.getElementById('from-custom'),
      toCustom: document.getElementById('to-custom'),
      calculateBtn: document.getElementById('calculate-btn'),
      clearBtn: document.getElementById('clear-btn'),
      resultDiv: document.getElementById('gpa-scale-converter-result')
    };
  }

  function formatNum(n, decimals) {
    if (n === null || n === undefined || isNaN(n)) return 'N/A';
    var d = decimals === undefined ? 3 : decimals;
    var rounded = Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
    return String(rounded);
  }

  function scaleMax(selectEl, customEl) {
    if (selectEl.value === 'custom') {
      var v = parseFloat(customEl.value);
      return isNaN(v) ? null : v;
    }
    return parseFloat(selectEl.value);
  }

  function scaleLabel(selectEl, customEl) {
    if (selectEl.value === 'custom') {
      var v = parseFloat(customEl.value);
      return isNaN(v) ? 'Custom' : formatNum(v, 2);
    }
    var opt = selectEl.options[selectEl.selectedIndex];
    return opt ? opt.value : selectEl.value;
  }

  function toggleCustomWraps() {
    elements.fromCustomWrap.classList.toggle('hidden', elements.fromScale.value !== 'custom');
    elements.toCustomWrap.classList.toggle('hidden', elements.toScale.value !== 'custom');
  }

  function calculate() {
    var gpaStr = elements.gpaInput ? elements.gpaInput.value : '';
    var gpa = parseFloat(gpaStr);

    if (gpaStr === '' || isNaN(gpa) || gpa < 0) {
      showError('Please enter a valid GPA (0 or greater).');
      return;
    }

    var fromMax = scaleMax(elements.fromScale, elements.fromCustom);
    var toMax = scaleMax(elements.toScale, elements.toCustom);

    if (!fromMax || fromMax <= 0) {
      showError('Please enter a valid "From" scale maximum.');
      return;
    }
    if (!toMax || toMax <= 0) {
      showError('Please enter a valid "To" scale maximum.');
      return;
    }

    if (gpa > fromMax) {
      showError('Your GPA (' + formatNum(gpa, 2) + ') can\'t be higher than your "From" scale maximum (' + formatNum(fromMax, 2) + ').');
      return;
    }

    var converted = (gpa / fromMax) * toMax;
    var percent = (gpa / fromMax) * 100;

    saveToURL();

    var fromLabel = scaleLabel(elements.fromScale, elements.fromCustom);
    var toLabel = scaleLabel(elements.toScale, elements.toCustom);

    var blocks = [];
    blocks.push(
      '<div class="result-summary-item">' +
        '<span class="result-summary-label">Original GPA</span>' +
        '<span class="result-summary-value">' + formatNum(gpa, 2) + ' / ' + fromLabel + '</span>' +
      '</div>'
    );
    blocks.push(
      '<div class="result-summary-item">' +
        '<span class="result-summary-label">Equivalent Percentage</span>' +
        '<span class="result-summary-value">' + formatNum(percent, 1) + '%</span>' +
      '</div>'
    );
    blocks.push(
      '<div class="result-summary-item" style="grid-column: 1 / -1;">' +
        '<span class="result-summary-label">Formula Used</span>' +
        '<span class="result-summary-value" style="font-size: 0.95rem;">(' + formatNum(gpa, 2) + ' \u00F7 ' + fromLabel + ') \u00D7 ' + toLabel + ' = ' + formatNum(converted, 3) + '</span>' +
      '</div>'
    );

    var html =
      '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">Converted GPA (on a ' + toLabel + ' scale)</div>' +
        '<div class="result-value">' + formatNum(converted, 3) + '</div>' +
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
    if (elements.gpaInput) elements.gpaInput.value = '';
    if (elements.fromScale) elements.fromScale.value = '4.0';
    if (elements.toScale) elements.toScale.value = '5.0';
    if (elements.fromCustom) elements.fromCustom.value = '';
    if (elements.toCustom) elements.toCustom.value = '';
    toggleCustomWraps();
    elements.resultDiv.classList.add('hidden');
    elements.resultDiv.innerHTML = '';
    history.replaceState(null, '', window.location.pathname);
  }

  function saveToURL() {
    var params = new URLSearchParams();
    params.set('gpa', elements.gpaInput.value);
    params.set('from', elements.fromScale.value);
    params.set('to', elements.toScale.value);
    if (elements.fromScale.value === 'custom') params.set('fromCustom', elements.fromCustom.value);
    if (elements.toScale.value === 'custom') params.set('toCustom', elements.toCustom.value);
    var newURL = window.location.pathname + '?' + params.toString();
    history.replaceState(null, '', newURL);
  }

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    if (!params.has('gpa')) return;
    if (elements.gpaInput) elements.gpaInput.value = params.get('gpa');
    if (params.has('from') && elements.fromScale) elements.fromScale.value = params.get('from');
    if (params.has('to') && elements.toScale) elements.toScale.value = params.get('to');
    if (params.has('fromCustom') && elements.fromCustom) elements.fromCustom.value = params.get('fromCustom');
    if (params.has('toCustom') && elements.toCustom) elements.toCustom.value = params.get('toCustom');
    toggleCustomWraps();
    calculate();
  }

  function attachEventListeners() {
    if (elements.calculateBtn) elements.calculateBtn.addEventListener('click', calculate);
    if (elements.clearBtn) elements.clearBtn.addEventListener('click', clearAll);
    if (elements.fromScale) elements.fromScale.addEventListener('change', toggleCustomWraps);
    if (elements.toScale) elements.toScale.addEventListener('change', toggleCustomWraps);
    [elements.gpaInput, elements.fromCustom, elements.toCustom].forEach(function (el) {
      if (el) {
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') calculate();
        });
      }
    });
  }
}());
