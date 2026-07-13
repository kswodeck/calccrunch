// Ratio Calculator
(function () {
  'use strict';

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b === 0) return a || 1;
    while (b) {
      var t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  function fmt(n) {
    if (!isFinite(n)) return '—';
    var r = Math.round(n * 1e6) / 1e6;
    return r.toString();
  }

  function simplifyRatio(a, b) {
    if (a === 0 && b === 0) return { a: 0, b: 0 };
    var g = gcd(a, b);
    if (g === 0) g = 1;
    var sa = a / g;
    var sb = b / g;
    return { a: sa, b: sb };
  }

  function getMode() {
    var active = document.querySelector('.op-btn.active');
    return active ? active.dataset.mode : 'simplify';
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

  function computeSimplify() {
    var a = val('s-a'), b = val('s-b');
    if (a === null || b === null) return { error: 'Enter both A and B.' };
    if (b === 0) return { error: 'B cannot be zero.' };
    if (a === 0) {
      return { html: renderSimple(0, b, a, b) };
    }
    var isInt = Number.isInteger(a) && Number.isInteger(b);
    var s = isInt ? simplifyRatio(a, b) : { a: a / b, b: 1 };
    return { html: renderSimple(s.a, s.b, a, b) };
  }

  function renderSimple(sa, sb, origA, origB) {
    var decimal = fmt(origA / origB);
    var pct = fmt((origA / origB) * 100);
    var isInt = Number.isInteger(origA) && Number.isInteger(origB);
    var g = isInt ? gcd(origA, origB) : 1;
    var steps = '';
    if (isInt && g > 1) {
      steps = '<li>Find the GCF of ' + origA + ' and ' + origB + ': <strong>' + g + '</strong></li>' +
        '<li>Divide both sides by ' + g + ': ' + origA + ' ÷ ' + g + ' : ' + origB + ' ÷ ' + g + ' = <strong>' + fmt(sa) + ':' + fmt(sb) + '</strong></li>';
    } else if (isInt) {
      steps = '<li>' + origA + ' and ' + origB + ' share no common factor greater than 1 — the ratio is already fully simplified.</li>';
    } else {
      steps = '<li>Divide A by B to express the ratio as a single number: ' + origA + ' ÷ ' + origB + ' = <strong>' + decimal + '</strong></li>';
    }
    return '<div class="result-main" style="text-align:center;">' +
      '<div class="result-label">Simplified Ratio</div>' +
      '<div class="result-value">' + fmt(sa) + ' : ' + fmt(sb) + '</div>' +
      '</div>' +
      '<div class="result-summary" style="margin-top:1.5rem;">' +
      '<div class="summary-item"><span class="summary-label">Original</span><span class="summary-value">' + fmt(origA) + ':' + fmt(origB) + '</span></div>' +
      '<div class="summary-item"><span class="summary-label">Decimal</span><span class="summary-value">' + decimal + '</span></div>' +
      '<div class="summary-item"><span class="summary-label">Percentage</span><span class="summary-value">' + pct + '%</span></div>' +
      '</div>' +
      '<div style="margin-top:1.5rem;background:var(--color-highlight-blue);border-radius:var(--border-radius);padding:1rem 1.25rem;border-left:4px solid var(--color-light-blue);">' +
      '<strong>Step-by-step:</strong><ol style="margin:0.5rem 0 0 1.25rem;padding:0;">' + steps + '</ol></div>';
  }

  function computeScale() {
    var a = val('sc-a'), b = val('sc-b'), f = val('sc-factor');
    if (a === null || b === null || f === null) return { error: 'Enter A, B, and a scale factor.' };
    if (b === 0) return { error: 'B cannot be zero.' };
    if (f === 0) return { error: 'Scale factor cannot be zero.' };
    var ra = a * f, rb = b * f;
    return {
      html: '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">Scaled Ratio</div>' +
        '<div class="result-value">' + fmt(ra) + ' : ' + fmt(rb) + '</div>' +
        '</div>' +
        '<div class="result-summary" style="margin-top:1.5rem;">' +
        '<div class="summary-item"><span class="summary-label">Original</span><span class="summary-value">' + fmt(a) + ':' + fmt(b) + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Scale factor</span><span class="summary-value">×' + fmt(f) + '</span></div>' +
        '</div>' +
        '<div style="margin-top:1.5rem;background:var(--color-highlight-blue);border-radius:var(--border-radius);padding:1rem 1.25rem;border-left:4px solid var(--color-light-blue);">' +
        '<strong>Step-by-step:</strong><ol style="margin:0.5rem 0 0 1.25rem;padding:0;">' +
        '<li>Multiply A by the scale factor: ' + fmt(a) + ' × ' + fmt(f) + ' = <strong>' + fmt(ra) + '</strong></li>' +
        '<li>Multiply B by the scale factor: ' + fmt(b) + ' × ' + fmt(f) + ' = <strong>' + fmt(rb) + '</strong></li>' +
        '</ol></div>'
    };
  }

  function computeSolve() {
    var a = val('sv-a'), b = val('sv-b'), c = val('sv-c'), x = val('sv-x');
    var blanks = [a, b, c, x].filter(function (v) { return v === null; }).length;
    if (blanks === 0) return { error: 'Leave exactly one field (A, B, C, or X) blank to solve for it.' };
    if (blanks > 1) return { error: 'Leave exactly one field blank — the other three must be filled in.' };

    var solved, label, formula;
    if (a === null) {
      if (x === 0) return { error: 'Cannot solve — would require dividing by zero.' };
      solved = (b * c) / x;
      label = 'A'; formula = 'A = (B × C) ÷ X = (' + fmt(b) + ' × ' + fmt(c) + ') ÷ ' + fmt(x) + ' = <strong>' + fmt(solved) + '</strong>';
      a = solved;
    } else if (b === null) {
      if (c === 0) return { error: 'Cannot solve — would require dividing by zero (C is 0).' };
      solved = (a * x) / c;
      label = 'B'; formula = 'B = (A × X) ÷ C = (' + fmt(a) + ' × ' + fmt(x) + ') ÷ ' + fmt(c) + ' = <strong>' + fmt(solved) + '</strong>';
      b = solved;
    } else if (c === null) {
      if (b === 0) return { error: 'Cannot solve — would require dividing by zero (B is 0).' };
      solved = (a * x) / b;
      label = 'C'; formula = 'C = (A × X) ÷ B = (' + fmt(a) + ' × ' + fmt(x) + ') ÷ ' + fmt(b) + ' = <strong>' + fmt(solved) + '</strong>';
      c = solved;
    } else {
      if (a === 0) return { error: 'Cannot solve — would require dividing by zero (A is 0).' };
      solved = (b * c) / a;
      label = 'X'; formula = 'X = (B × C) ÷ A = (' + fmt(b) + ' × ' + fmt(c) + ') ÷ ' + fmt(a) + ' = <strong>' + fmt(solved) + '</strong>';
      x = solved;
    }

    return {
      html: '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">' + label + ' =</div>' +
        '<div class="result-value">' + fmt(solved) + '</div>' +
        '</div>' +
        '<div class="result-summary" style="margin-top:1.5rem;">' +
        '<div class="summary-item"><span class="summary-label">Full proportion</span><span class="summary-value">' + fmt(a) + ':' + fmt(b) + ' = ' + fmt(c) + ':' + fmt(x) + '</span></div>' +
        '</div>' +
        '<div style="margin-top:1.5rem;background:var(--color-highlight-blue);border-radius:var(--border-radius);padding:1rem 1.25rem;border-left:4px solid var(--color-light-blue);">' +
        '<strong>Step-by-step (cross-multiplication):</strong><ol style="margin:0.5rem 0 0 1.25rem;padding:0;">' +
        '<li>' + formula + '</li>' +
        '</ol></div>'
    };
  }

  function computeCompare() {
    var a = val('cmp-a'), b = val('cmp-b'), c = val('cmp-c'), d = val('cmp-d');
    if (a === null || b === null || c === null || d === null) return { error: 'Enter all four values.' };
    if (b === 0 || d === 0) return { error: 'B and D cannot be zero.' };
    var dec1 = a / b, dec2 = c / d;
    var verdict;
    var epsilon = Math.abs(a * d - b * c) < 1e-9 ? true : false;
    if (epsilon) {
      verdict = fmt(a) + ':' + fmt(b) + ' = ' + fmt(c) + ':' + fmt(d) + ' — the ratios are equivalent.';
    } else if (dec1 > dec2) {
      verdict = fmt(a) + ':' + fmt(b) + ' is larger than ' + fmt(c) + ':' + fmt(d) + '.';
    } else {
      verdict = fmt(c) + ':' + fmt(d) + ' is larger than ' + fmt(a) + ':' + fmt(b) + '.';
    }
    return {
      html: '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">Result</div>' +
        '<div class="result-value" style="font-size:1.4rem;">' + verdict + '</div>' +
        '</div>' +
        '<div class="result-summary" style="margin-top:1.5rem;">' +
        '<div class="summary-item"><span class="summary-label">' + fmt(a) + ':' + fmt(b) + '</span><span class="summary-value">' + fmt(dec1) + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">' + fmt(c) + ':' + fmt(d) + '</span><span class="summary-value">' + fmt(dec2) + '</span></div>' +
        '</div>' +
        '<div style="margin-top:1.5rem;background:var(--color-highlight-blue);border-radius:var(--border-radius);padding:1rem 1.25rem;border-left:4px solid var(--color-light-blue);">' +
        '<strong>Step-by-step (cross-multiplication check):</strong><ol style="margin:0.5rem 0 0 1.25rem;padding:0;">' +
        '<li>Cross-multiply: ' + fmt(a) + ' × ' + fmt(d) + ' = <strong>' + fmt(a * d) + '</strong>, and ' + fmt(b) + ' × ' + fmt(c) + ' = <strong>' + fmt(b * c) + '</strong></li>' +
        '<li>' + (epsilon ? 'The products are equal, so the ratios are equivalent.' : 'The products differ, so the ratios are not equivalent.') + '</li>' +
        '</ol></div>'
    };
  }

  function persistUrl(mode, state) {
    var params = new URLSearchParams();
    params.set('mode', mode);
    for (var k in state) {
      if (state[k] !== null && state[k] !== '') params.set(k, state[k]);
    }
    history.replaceState(null, '', '?' + params.toString());
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
    simplify: ['s-a', 's-b'],
    scale: ['sc-a', 'sc-b', 'sc-factor'],
    solve: ['sv-a', 'sv-b', 'sv-c', 'sv-x'],
    compare: ['cmp-a', 'cmp-b', 'cmp-c', 'cmp-d']
  };

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
    var resultDiv = document.getElementById('ratio-calculator-result');
    var out;
    if (mode === 'simplify') out = computeSimplify();
    else if (mode === 'scale') out = computeScale();
    else if (mode === 'solve') out = computeSolve();
    else out = computeCompare();

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
    var resultDiv = document.getElementById('ratio-calculator-result');

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
