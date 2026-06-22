// Fraction Calculator
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

  function simplify(num, den) {
    if (den === 0) return null;
    var g = gcd(Math.abs(num), Math.abs(den));
    var sn = num / g;
    var sd = den / g;
    if (sd < 0) { sn = -sn; sd = -sd; }
    return { num: sn, den: sd };
  }

  function fractionStr(num, den) {
    if (den === 1) return String(num);
    return num + '/' + den;
  }

  function toMixed(num, den) {
    if (Math.abs(num) < den) return null;
    var whole = Math.trunc(num / den);
    var rem = Math.abs(num % den);
    if (rem === 0) return { whole: whole, num: 0, den: den };
    return { whole: whole, num: rem, den: den };
  }

  function parseInputs() {
    var w1 = parseInt(document.getElementById('whole1').value, 10) || 0;
    var n1 = parseInt(document.getElementById('num1').value, 10);
    var d1 = parseInt(document.getElementById('den1').value, 10);
    var w2 = parseInt(document.getElementById('whole2').value, 10) || 0;
    var n2 = parseInt(document.getElementById('num2').value, 10);
    var d2 = parseInt(document.getElementById('den2').value, 10);
    return { w1: w1, n1: n1, d1: d1, w2: w2, n2: n2, d2: d2 };
  }

  function toImproper(whole, num, den) {
    var sign = (whole < 0 || num < 0) ? -1 : 1;
    return { num: sign * (Math.abs(whole) * den + Math.abs(num)), den: den };
  }

  function persistUrl(state) {
    var params = new URLSearchParams();
    for (var k in state) params.set(k, state[k]);
    history.replaceState(null, '', '?' + params.toString());
  }

  function loadUrl() {
    var params = new URLSearchParams(window.location.search);
    var fields = ['whole1','num1','den1','whole2','num2','den2','op'];
    fields.forEach(function (id) {
      var val = params.get(id);
      if (val === null) return;
      if (id === 'op') {
        document.querySelectorAll('.op-btn').forEach(function (btn) {
          btn.classList.toggle('active', btn.dataset.op === val);
        });
      } else {
        var el = document.getElementById(id);
        if (el) el.value = val;
      }
    });
  }

  function getOp() {
    var active = document.querySelector('.op-btn.active');
    return active ? active.dataset.op : 'add';
  }

  function opSymbol(op) {
    return { add: '+', subtract: '−', multiply: '×', divide: '÷' }[op] || '+';
  }

  function compute(f1, f2, op) {
    var rn, rd;
    if (op === 'add') {
      rn = f1.num * f2.den + f2.num * f1.den;
      rd = f1.den * f2.den;
    } else if (op === 'subtract') {
      rn = f1.num * f2.den - f2.num * f1.den;
      rd = f1.den * f2.den;
    } else if (op === 'multiply') {
      rn = f1.num * f2.num;
      rd = f1.den * f2.den;
    } else {
      if (f2.num === 0) return null;
      rn = f1.num * f2.den;
      rd = f1.den * f2.num;
    }
    return simplify(rn, rd);
  }

  function buildSteps(f1raw, f2raw, f1, f2, op, raw, result) {
    var sym = opSymbol(op);
    var lines = [];
    if (f1raw.whole !== 0 || f2raw.whole !== 0) {
      lines.push('<li>Convert mixed numbers to improper fractions: <strong>' +
        (f1raw.whole !== 0 ? f1raw.whole + ' ' + f1raw.num + '/' + f1raw.den + ' = ' + f1.num + '/' + f1.den : f1.num + '/' + f1.den) +
        '</strong>, <strong>' +
        (f2raw.whole !== 0 ? f2raw.whole + ' ' + f2raw.num + '/' + f2raw.den + ' = ' + f2.num + '/' + f2.den : f2.num + '/' + f2.den) +
        '</strong></li>');
    }

    if (op === 'add' || op === 'subtract') {
      if (f1.den !== f2.den) {
        lines.push('<li>Find a common denominator: ' + f1.den + ' × ' + f2.den + ' = <strong>' + (f1.den * f2.den) + '</strong></li>');
        lines.push('<li>Convert: ' + f1.num + '/' + f1.den + ' = <strong>' + (f1.num * f2.den) + '/' + (f1.den * f2.den) + '</strong>, ' +
          f2.num + '/' + f2.den + ' = <strong>' + (f2.num * f1.den) + '/' + (f1.den * f2.den) + '</strong></li>');
        lines.push('<li>' + (op === 'add' ? 'Add' : 'Subtract') + ' numerators: <strong>' + (f1.num * f2.den) + ' ' + sym + ' ' + (f2.num * f1.den) + ' = ' + raw.num + '</strong> (keep denominator ' + raw.den + ')</li>');
      } else {
        lines.push('<li>Same denominator, ' + (op === 'add' ? 'add' : 'subtract') + ' numerators: <strong>' + f1.num + ' ' + sym + ' ' + f2.num + ' = ' + raw.num + '</strong>/' + raw.den + '</li>');
      }
    } else if (op === 'multiply') {
      lines.push('<li>Multiply numerators: ' + f1.num + ' × ' + f2.num + ' = <strong>' + raw.num + '</strong></li>');
      lines.push('<li>Multiply denominators: ' + f1.den + ' × ' + f2.den + ' = <strong>' + raw.den + '</strong></li>');
    } else {
      lines.push('<li>Flip the second fraction (reciprocal): ' + f2.num + '/' + f2.den + ' → <strong>' + f2.den + '/' + f2.num + '</strong></li>');
      lines.push('<li>Multiply: ' + f1.num + '/' + f1.den + ' × ' + f2.den + '/' + f2.num + ' = <strong>' + raw.num + '/' + raw.den + '</strong></li>');
    }

    var g = gcd(Math.abs(raw.num), raw.den);
    if (g > 1) {
      lines.push('<li>Simplify by dividing by GCF (' + g + '): <strong>' + result.num + '/' + result.den + '</strong></li>');
    }
    return lines;
  }

  function render(result, f1raw, f2raw, f1, f2, op) {
    var div = document.getElementById('fraction-calculator-result');
    if (!result) {
      div.innerHTML = '<div class="result-main" style="text-align:center;"><p style="color:var(--color-error);font-weight:600;">Cannot divide by zero.</p></div>';
      div.classList.remove('hidden');
      return;
    }

    var sym = opSymbol(op);
    var mixedStr = '';
    var m = toMixed(result.num, result.den);
    if (m && m.num !== 0) {
      mixedStr = ' = <strong>' + m.whole + ' ' + m.num + '/' + m.den + '</strong> (mixed number)';
    } else if (m && m.num === 0) {
      mixedStr = '';
    }
    var decimal = (result.num / result.den).toFixed(6).replace(/\.?0+$/, '');

    var rawNum = 0, rawDen = 1;
    if (op === 'add') { rawNum = f1.num * f2.den + f2.num * f1.den; rawDen = f1.den * f2.den; }
    else if (op === 'subtract') { rawNum = f1.num * f2.den - f2.num * f1.den; rawDen = f1.den * f2.den; }
    else if (op === 'multiply') { rawNum = f1.num * f2.num; rawDen = f1.den * f2.den; }
    else { rawNum = f1.num * f2.den; rawDen = f1.den * f2.num; }

    var steps = buildSteps(f1raw, f2raw, f1, f2, op, { num: rawNum, den: rawDen }, result);

    var label1 = f1raw.whole !== 0 ? f1raw.whole + ' ' + f1raw.num + '/' + f1raw.den : f1raw.num + '/' + f1raw.den;
    var label2 = f2raw.whole !== 0 ? f2raw.whole + ' ' + f2raw.num + '/' + f2raw.den : f2raw.num + '/' + f2raw.den;

    div.innerHTML =
      '<div class="result-main" style="text-align:center;">' +
      '<div class="result-label">Result</div>' +
      '<div class="result-value">' + fractionStr(result.num, result.den) + '</div>' +
      (mixedStr ? '<div style="margin-top:0.5rem;font-size:1.1rem;">' + mixedStr + '</div>' : '') +
      '</div>' +
      '<div class="result-summary" style="margin-top:1.5rem;">' +
      '<div class="summary-item"><span class="summary-label">Expression</span><span class="summary-value">' + label1 + ' ' + sym + ' ' + label2 + '</span></div>' +
      '<div class="summary-item"><span class="summary-label">Simplified</span><span class="summary-value">' + fractionStr(result.num, result.den) + '</span></div>' +
      '<div class="summary-item"><span class="summary-label">Decimal</span><span class="summary-value">' + decimal + '</span></div>' +
      '</div>' +
      '<div style="margin-top:1.5rem;background:var(--color-highlight-blue);border-radius:var(--border-radius);padding:1rem 1.25rem;border-left:4px solid var(--color-light-blue);">' +
      '<strong>Step-by-step:</strong><ol style="margin:0.5rem 0 0 1.25rem;padding:0;">' +
      steps.join('') +
      '</ol></div>';

    div.classList.remove('hidden');
  }

  function init() {
    var resultDiv = document.getElementById('fraction-calculator-result');
    var btn = document.getElementById('calculate-btn');
    var clearBtn = document.getElementById('clear-btn');

    document.querySelectorAll('.op-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('.op-btn').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
      });
    });

    if (btn) {
      btn.addEventListener('click', function () {
        var v = parseInputs();
        if (isNaN(v.n1) || isNaN(v.d1) || isNaN(v.n2) || isNaN(v.d2)) {
          resultDiv.innerHTML = '<div class="result-main" style="text-align:center;"><p style="color:var(--color-error);font-weight:600;">Please fill in all numerator and denominator fields.</p></div>';
          resultDiv.classList.remove('hidden');
          return;
        }
        if (v.d1 === 0 || v.d2 === 0) {
          resultDiv.innerHTML = '<div class="result-main" style="text-align:center;"><p style="color:var(--color-error);font-weight:600;">Denominator cannot be zero.</p></div>';
          resultDiv.classList.remove('hidden');
          return;
        }
        var op = getOp();
        var f1 = toImproper(v.w1, v.n1, v.d1);
        var f2 = toImproper(v.w2, v.n2, v.d2);
        var f1raw = { whole: v.w1, num: v.n1, den: v.d1 };
        var f2raw = { whole: v.w2, num: v.n2, den: v.d2 };
        var result = compute(f1, f2, op);
        render(result, f1raw, f2raw, f1, f2, op);
        persistUrl({ whole1: v.w1, num1: v.n1, den1: v.d1, whole2: v.w2, num2: v.n2, den2: v.d2, op: op });
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        ['whole1','num1','den1','whole2','num2','den2'].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.value = '';
        });
        resultDiv.classList.add('hidden');
        resultDiv.innerHTML = '';
        history.replaceState(null, '', window.location.pathname);
      });
    }

    loadUrl();
    var params = new URLSearchParams(window.location.search);
    if (params.get('num1') && params.get('den1') && params.get('num2') && params.get('den2')) {
      if (btn) btn.click();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
