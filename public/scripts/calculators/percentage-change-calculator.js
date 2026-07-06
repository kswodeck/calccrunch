// Percentage Change Calculator
(function () {
  'use strict';

  function fmt(n, decimals) {
    return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  function syncUrl(params) {
    var qs = new URLSearchParams(params).toString();
    history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
  }

  function loadFromUrl() {
    var p = new URLSearchParams(window.location.search);
    return {
      original: p.get('orig') || '',
      newVal: p.get('new') || '',
      revOriginal: p.get('rorig') || '',
      revPct: p.get('rpct') || ''
    };
  }

  function calculate(origStr, newStr) {
    var orig = parseFloat(origStr);
    var newVal = parseFloat(newStr);
    if (isNaN(orig) || isNaN(newVal)) return { error: 'Please enter both an original and a new value.' };
    if (orig === 0) return { error: 'The original value cannot be zero (division by zero).' };
    var diff = newVal - orig;
    var pct = (diff / Math.abs(orig)) * 100;
    return { orig: orig, newVal: newVal, diff: diff, pct: pct };
  }

  function renderResult(resultEl, calc) {
    if (calc.error) {
      resultEl.classList.remove('hidden');
      resultEl.innerHTML = '<div class="result-main" style="text-align:center;"><div class="result-label" style="color:#dc2626;">' + calc.error + '</div></div>';
      return;
    }
    var isIncrease = calc.pct >= 0;
    var sign = isIncrease ? '+' : '';
    var color = isIncrease ? 'var(--color-success)' : '#dc2626';
    var dirWord = isIncrease ? 'increase' : 'decrease';
    var absSign = calc.diff >= 0 ? '+' : '';
    resultEl.classList.remove('hidden');
    resultEl.innerHTML =
      '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">Percentage Change</div>' +
        '<div class="result-value" style="color:' + color + ';">' + sign + fmt(calc.pct, 2) + '%</div>' +
        '<div class="result-label" style="margin-top:0.5rem;">' + (isIncrease ? '▲' : '▼') + ' ' + Math.abs(calc.pct).toFixed(2) + '% ' + dirWord + '</div>' +
      '</div>' +
      '<div class="result-summary" style="margin-top:1.5rem;">' +
        '<div class="result-row"><span class="result-row-label">Original value</span><span class="result-row-value">' + fmt(calc.orig, 2) + '</span></div>' +
        '<div class="result-row"><span class="result-row-label">New value</span><span class="result-row-value">' + fmt(calc.newVal, 2) + '</span></div>' +
        '<div class="result-row"><span class="result-row-label">Absolute difference</span><span class="result-row-value" style="color:' + color + ';">' + absSign + fmt(calc.diff, 2) + '</span></div>' +
        '<div class="result-row"><span class="result-row-label">Multiplier</span><span class="result-row-value">' + fmt(calc.newVal / calc.orig, 4) + 'x</span></div>' +
      '</div>';
  }

  function init() {
    var resultEl = document.getElementById('percentage-change-calculator-result');
    var revResultEl = document.getElementById('percentage-change-reverse-result');
    var btn = document.getElementById('calculate-btn');
    var clearBtn = document.getElementById('clear-btn');
    var revBtn = document.getElementById('reverse-btn');
    var origInput = document.getElementById('original-value');
    var newInput = document.getElementById('new-value');
    var revOrigInput = document.getElementById('rev-original');
    var revPctInput = document.getElementById('rev-pct');

    var saved = loadFromUrl();
    if (origInput && saved.original) origInput.value = saved.original;
    if (newInput && saved.newVal) newInput.value = saved.newVal;
    if (revOrigInput && saved.revOriginal) revOrigInput.value = saved.revOriginal;
    if (revPctInput && saved.revPct) revPctInput.value = saved.revPct;

    if (saved.original && saved.newVal) {
      renderResult(resultEl, calculate(saved.original, saved.newVal));
    }

    if (btn) {
      btn.addEventListener('click', function () {
        var orig = origInput ? origInput.value : '';
        var nv = newInput ? newInput.value : '';
        var calc = calculate(orig, nv);
        renderResult(resultEl, calc);
        syncUrl({ orig: orig, new: nv, rorig: revOrigInput ? revOrigInput.value : '', rpct: revPctInput ? revPctInput.value : '' });
      });
    }

    if (revBtn) {
      revBtn.addEventListener('click', function () {
        var rorig = parseFloat(revOrigInput ? revOrigInput.value : '');
        var rpct = parseFloat(revPctInput ? revPctInput.value : '');
        if (isNaN(rorig) || isNaN(rpct)) {
          revResultEl.classList.remove('hidden');
          revResultEl.innerHTML = '<div class="result-main" style="text-align:center;"><div class="result-label" style="color:#dc2626;">Please enter both a starting value and a percentage change.</div></div>';
          return;
        }
        var newVal = rorig * (1 + rpct / 100);
        var isIncrease = rpct >= 0;
        var color = isIncrease ? 'var(--color-success)' : '#dc2626';
        revResultEl.classList.remove('hidden');
        revResultEl.innerHTML =
          '<div class="result-main" style="text-align:center;">' +
            '<div class="result-label">New Value</div>' +
            '<div class="result-value" style="color:' + color + ';">' + fmt(newVal, 2) + '</div>' +
          '</div>' +
          '<div class="result-summary" style="margin-top:1.5rem;">' +
            '<div class="result-row"><span class="result-row-label">Starting value</span><span class="result-row-value">' + fmt(rorig, 2) + '</span></div>' +
            '<div class="result-row"><span class="result-row-label">Change applied</span><span class="result-row-value">' + (rpct >= 0 ? '+' : '') + fmt(rpct, 2) + '%</span></div>' +
            '<div class="result-row"><span class="result-row-label">Difference</span><span class="result-row-value" style="color:' + color + ';">' + (newVal - rorig >= 0 ? '+' : '') + fmt(newVal - rorig, 2) + '</span></div>' +
          '</div>';
        syncUrl({ orig: origInput ? origInput.value : '', new: newInput ? newInput.value : '', rorig: rorig, rpct: rpct });
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (origInput) origInput.value = '';
        if (newInput) newInput.value = '';
        if (resultEl) { resultEl.classList.add('hidden'); resultEl.innerHTML = ''; }
        history.replaceState(null, '', window.location.pathname);
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
