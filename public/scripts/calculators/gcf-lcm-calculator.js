// GCF and LCM Calculator
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
    return a;
  }

  function lcmPair(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
  }

  function factorize(n) {
    var factors = {};
    var x = n;
    var d = 2;
    while (d * d <= x) {
      while (x % d === 0) {
        factors[d] = (factors[d] || 0) + 1;
        x /= d;
      }
      d++;
    }
    if (x > 1) factors[x] = (factors[x] || 0) + 1;
    return factors;
  }

  function factorsToStr(factors) {
    var primes = Object.keys(factors).map(Number).sort(function (a, b) { return a - b; });
    if (primes.length === 0) return '1 (no prime factors)';
    return primes.map(function (p) {
      return factors[p] > 1 ? p + '<sup>' + factors[p] + '</sup>' : String(p);
    }).join(' × ');
  }

  function parseNumbers(raw) {
    var parts = raw.split(/[,\s]+/).map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });
    var nums = [];
    for (var i = 0; i < parts.length; i++) {
      var n = Number(parts[i]);
      if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0 || n > 1000000000) {
        return null;
      }
      nums.push(n);
    }
    return nums;
  }

  function persistUrl(raw) {
    var params = new URLSearchParams();
    params.set('numbers', raw);
    history.replaceState(null, '', '?' + params.toString());
  }

  function loadUrl() {
    var params = new URLSearchParams(window.location.search);
    var raw = params.get('numbers');
    if (raw) {
      var el = document.getElementById('numbers-input');
      if (el) el.value = raw;
    }
    return raw;
  }

  function showError(msg) {
    var div = document.getElementById('gcf-lcm-calculator-result');
    div.innerHTML = '<div class="result-main" style="text-align:center;"><p style="color:var(--color-error);font-weight:600;">' + msg + '</p></div>';
    div.classList.remove('hidden');
  }

  function render(nums) {
    var div = document.getElementById('gcf-lcm-calculator-result');

    var gcfResult = nums.reduce(gcd);
    var lcmResult = nums.reduce(lcmPair);

    var perNumberFactors = nums.map(factorize);
    var factorRows = nums.map(function (n, i) {
      return '<div class="summary-item"><span class="summary-label">' + n + '</span><span class="summary-value">' + factorsToStr(perNumberFactors[i]) + '</span></div>';
    }).join('');

    var allPrimes = {};
    perNumberFactors.forEach(function (f) {
      Object.keys(f).forEach(function (p) { allPrimes[p] = true; });
    });
    var primeList = Object.keys(allPrimes).map(Number).sort(function (a, b) { return a - b; });

    var gcfPrimeParts = [];
    var lcmPrimeParts = [];
    primeList.forEach(function (p) {
      var exps = perNumberFactors.map(function (f) { return f[p] || 0; });
      var minExp = Math.min.apply(null, exps);
      var maxExp = Math.max.apply(null, exps);
      if (minExp > 0) {
        gcfPrimeParts.push(minExp > 1 ? p + '<sup>' + minExp + '</sup>' : String(p));
      }
      lcmPrimeParts.push(maxExp > 1 ? p + '<sup>' + maxExp + '</sup>' : String(p));
    });

    var gcfSteps = gcfPrimeParts.length > 0
      ? 'Shared primes at their lowest power: ' + gcfPrimeParts.join(' × ') + ' = <strong>' + gcfResult + '</strong>'
      : 'No shared prime factors, so the GCF is <strong>' + gcfResult + '</strong>';
    var lcmSteps = 'Every prime factor at its highest power: ' + lcmPrimeParts.join(' × ') + ' = <strong>' + lcmResult + '</strong>';

    div.innerHTML =
      '<div class="result-main" style="text-align:center;">' +
      '<div class="result-summary" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">' +
      '<div><div class="result-label">GCF</div><div class="result-value">' + gcfResult + '</div></div>' +
      '<div><div class="result-label">LCM</div><div class="result-value">' + lcmResult.toLocaleString() + '</div></div>' +
      '</div>' +
      '</div>' +
      '<div class="result-summary" style="margin-top:1.5rem;">' +
      '<div class="summary-item" style="grid-column:1/-1;"><strong>Prime Factorization</strong></div>' +
      factorRows +
      '</div>' +
      '<div style="margin-top:1.5rem;background:var(--color-highlight-blue);border-radius:var(--border-radius);padding:1rem 1.25rem;border-left:4px solid var(--color-light-blue);">' +
      '<strong>Step-by-step:</strong>' +
      '<ol style="margin:0.5rem 0 0 1.25rem;padding:0;">' +
      '<li>Numbers: ' + nums.join(', ') + '</li>' +
      '<li>' + gcfSteps + '</li>' +
      '<li>' + lcmSteps + '</li>' +
      '</ol></div>';

    div.classList.remove('hidden');
  }

  function calculate() {
    var input = document.getElementById('numbers-input');
    var raw = input.value;
    var nums = parseNumbers(raw);

    if (!nums || nums.length < 2) {
      showError('Please enter 2 or more positive whole numbers, separated by commas.');
      return;
    }
    if (nums.length > 10) {
      showError('Please enter 10 numbers or fewer.');
      return;
    }

    render(nums);
    persistUrl(raw);
  }

  function init() {
    var btn = document.getElementById('calculate-btn');
    var clear = document.getElementById('clear-btn');
    var resultDiv = document.getElementById('gcf-lcm-calculator-result');

    if (btn) btn.addEventListener('click', calculate);

    var input = document.getElementById('numbers-input');
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') calculate();
      });
    }

    if (clear) clear.addEventListener('click', function () {
      if (input) input.value = '';
      resultDiv.classList.add('hidden');
      resultDiv.innerHTML = '';
      history.replaceState(null, '', window.location.pathname);
    });

    var raw = loadUrl();
    if (raw) calculate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
