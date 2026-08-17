// Aspect Ratio Calculator
(function () {
  'use strict';

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      var t = b;
      b = a % b;
      a = t;
    }
    return a || 1;
  }

  function fmt(n) {
    if (!isFinite(n)) return '—';
    var r = Math.round(n * 1e6) / 1e6;
    return r.toString();
  }

  function val(id) {
    var el = document.getElementById(id);
    if (!el || el.value === '') return null;
    var n = parseFloat(el.value);
    return isNaN(n) ? null : n;
  }

  function errorHtml(msg) {
    return '<div class="result-main" style="text-align:center;"><p style="color:var(--color-error);font-weight:600;">' + msg + '</p></div>';
  }

  var STANDARD_RATIOS = [
    { label: '1:1', value: 1 / 1 },
    { label: '5:4', value: 5 / 4 },
    { label: '4:3', value: 4 / 3 },
    { label: '3:2', value: 3 / 2 },
    { label: '16:10', value: 16 / 10 },
    { label: '16:9', value: 16 / 9 },
    { label: '1.85:1', value: 1.85 },
    { label: '21:9', value: 21 / 9 },
    { label: '2.39:1', value: 2.39 },
    { label: '3:4', value: 3 / 4 },
    { label: '2:3', value: 2 / 3 },
    { label: '9:16', value: 9 / 16 },
    { label: '4:5', value: 4 / 5 }
  ];

  function closestStandard(decimal) {
    var best = null;
    var bestDiff = Infinity;
    STANDARD_RATIOS.forEach(function (r) {
      var diff = Math.abs(r.value - decimal);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = r;
      }
    });
    if (!best) return null;
    var pctDiff = (bestDiff / best.value) * 100;
    return { label: best.label, close: pctDiff < 1 };
  }

  function getMode() {
    var active = document.querySelector('.op-btn.active');
    return active ? active.dataset.mode : 'ratio';
  }

  function computeRatio() {
    var w = val('r-width'), h = val('r-height');
    if (w === null || h === null) return { error: 'Enter both a width and a height.' };
    if (w <= 0 || h <= 0) return { error: 'Width and height must be greater than zero.' };

    var decimal = w / h;
    var isInt = Number.isInteger(w) && Number.isInteger(h);
    var sw, sh;
    var steps;

    if (isInt) {
      var g = gcd(w, h);
      sw = w / g;
      sh = h / g;
      steps = '<li>Find the GCD of ' + fmt(w) + ' and ' + fmt(h) + ': <strong>' + g + '</strong></li>' +
        '<li>Divide both sides by ' + g + ': ' + fmt(w) + ' ÷ ' + g + ' : ' + fmt(h) + ' ÷ ' + g + ' = <strong>' + fmt(sw) + ':' + fmt(sh) + '</strong></li>';
    } else {
      sw = decimal;
      sh = 1;
      steps = '<li>Divide width by height to express the ratio as a single number: ' + fmt(w) + ' ÷ ' + fmt(h) + ' = <strong>' + fmt(decimal) + '</strong></li>';
    }

    var match = closestStandard(decimal);
    var matchLine = match
      ? (match.close
          ? 'This matches the standard <strong>' + match.label + '</strong> ratio.'
          : 'Closest standard ratio: <strong>' + match.label + '</strong> (not an exact match).')
      : '';

    return {
      html: '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">Aspect Ratio</div>' +
        '<div class="result-value">' + fmt(sw) + ' : ' + fmt(sh) + '</div>' +
        '</div>' +
        '<div class="result-summary" style="margin-top:1.5rem;">' +
        '<div class="summary-item"><span class="summary-label">Original</span><span class="summary-value">' + fmt(w) + ' × ' + fmt(h) + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Decimal</span><span class="summary-value">' + fmt(decimal) + ':1</span></div>' +
        '<div class="summary-item"><span class="summary-label">Closest standard</span><span class="summary-value">' + (match ? match.label : '—') + '</span></div>' +
        '</div>' +
        '<div style="margin-top:1.5rem;background:var(--color-highlight-blue);border-radius:var(--border-radius);padding:1rem 1.25rem;border-left:4px solid var(--color-light-blue);">' +
        '<strong>Step-by-step:</strong><ol style="margin:0.5rem 0 0 1.25rem;padding:0;">' + steps + '</ol>' +
        '<p style="margin:0.75rem 0 0;">' + matchLine + '</p>' +
        '</div>'
    };
  }

  function computeDimension() {
    var w = val('d-width'), h = val('d-height');
    var tw = val('d-target-width'), th = val('d-target-height');

    if (w === null || h === null) return { error: 'Enter the original width and height.' };
    if (w <= 0 || h <= 0) return { error: 'Original width and height must be greater than zero.' };
    if (tw === null && th === null) return { error: 'Enter a target width or a target height.' };
    if (tw !== null && th !== null) return { error: 'Enter only one target value (width OR height), not both.' };
    if (tw !== null && tw <= 0) return { error: 'Target width must be greater than zero.' };
    if (th !== null && th <= 0) return { error: 'Target height must be greater than zero.' };

    var ratio = w / h;
    var resultLabel, resultValue, steps;

    if (tw !== null) {
      var scale = tw / w;
      var newH = h * scale;
      resultLabel = 'Matching Height';
      resultValue = fmt(newH);
      steps = '<li>Scale factor: ' + fmt(tw) + ' ÷ ' + fmt(w) + ' = <strong>' + fmt(scale) + '</strong></li>' +
        '<li>New height: ' + fmt(h) + ' × ' + fmt(scale) + ' = <strong>' + fmt(newH) + '</strong></li>';
    } else {
      var scaleH = th / h;
      var newW = w * scaleH;
      resultLabel = 'Matching Width';
      resultValue = fmt(newW);
      steps = '<li>Scale factor: ' + fmt(th) + ' ÷ ' + fmt(h) + ' = <strong>' + fmt(scaleH) + '</strong></li>' +
        '<li>New width: ' + fmt(w) + ' × ' + fmt(scaleH) + ' = <strong>' + fmt(newW) + '</strong></li>';
    }

    return {
      html: '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">' + resultLabel + '</div>' +
        '<div class="result-value">' + resultValue + '</div>' +
        '</div>' +
        '<div class="result-summary" style="margin-top:1.5rem;">' +
        '<div class="summary-item"><span class="summary-label">Original</span><span class="summary-value">' + fmt(w) + ' × ' + fmt(h) + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Ratio</span><span class="summary-value">' + fmt(ratio) + ':1</span></div>' +
        '<div class="summary-item"><span class="summary-label">New size</span><span class="summary-value">' + (tw !== null ? fmt(tw) + ' × ' + resultValue : resultValue + ' × ' + fmt(th)) + '</span></div>' +
        '</div>' +
        '<div style="margin-top:1.5rem;background:var(--color-highlight-blue);border-radius:var(--border-radius);padding:1rem 1.25rem;border-left:4px solid var(--color-light-blue);">' +
        '<strong>Step-by-step:</strong><ol style="margin:0.5rem 0 0 1.25rem;padding:0;">' + steps + '</ol></div>'
    };
  }

  function setMode(mode) {
    document.querySelectorAll('.op-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    document.querySelectorAll('.mode-section').forEach(function (sec) {
      sec.classList.toggle('hidden', sec.dataset.modeSection !== mode);
    });
  }

  var fieldsByMode = {
    ratio: ['r-width', 'r-height'],
    dimension: ['d-width', 'd-height', 'd-target-width', 'd-target-height']
  };

  function persistUrl(mode, state) {
    var params = new URLSearchParams();
    params.set('mode', mode);
    for (var k in state) {
      if (state[k] !== null && state[k] !== '') params.set(k, state[k]);
    }
    history.replaceState(null, '', '?' + params.toString());
  }

  function loadUrl() {
    var params = new URLSearchParams(window.location.search);
    var mode = params.get('mode');
    if (mode && fieldsByMode[mode]) setMode(mode);
    Object.keys(fieldsByMode).forEach(function (m) {
      fieldsByMode[m].forEach(function (id) {
        var pv = params.get(id);
        if (pv === null) return;
        var el = document.getElementById(id);
        if (el) el.value = pv;
      });
    });
    return mode;
  }

  function calculate() {
    var mode = getMode();
    var resultDiv = document.getElementById('aspect-ratio-calculator-result');
    var out = mode === 'dimension' ? computeDimension() : computeRatio();

    resultDiv.classList.remove('hidden');
    if (out.error) {
      resultDiv.innerHTML = errorHtml(out.error);
      return;
    }
    resultDiv.innerHTML = out.html;

    var state = {};
    fieldsByMode[mode].forEach(function (id) {
      var el = document.getElementById(id);
      state[id] = el ? el.value : '';
    });
    persistUrl(mode, state);
  }

  function init() {
    var btn = document.getElementById('calculate-btn');
    var clearBtn = document.getElementById('clear-btn');
    var resultDiv = document.getElementById('aspect-ratio-calculator-result');

    document.querySelectorAll('.op-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        setMode(b.dataset.mode);
        resultDiv.classList.add('hidden');
        resultDiv.innerHTML = '';
      });
    });

    if (btn) btn.addEventListener('click', calculate);

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        Object.keys(fieldsByMode).forEach(function (m) {
          fieldsByMode[m].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.value = '';
          });
        });
        resultDiv.classList.add('hidden');
        resultDiv.innerHTML = '';
        history.replaceState(null, '', window.location.pathname);
      });
    }

    var mode = loadUrl();
    var params = new URLSearchParams(window.location.search);
    if (mode && fieldsByMode[mode]) {
      var hasAny = fieldsByMode[mode].some(function (id) { return params.get(id) !== null; });
      if (hasAny && btn) btn.click();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
