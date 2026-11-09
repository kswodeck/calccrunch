// Tax-Loss Harvesting Calculator
(function () {
  'use strict';

  var ORDINARY_BRACKETS_2026 = {
    single: [
      { min: 0, max: 11925, rate: 10 },
      { min: 11926, max: 48475, rate: 12 },
      { min: 48476, max: 103350, rate: 22 },
      { min: 103351, max: 197300, rate: 24 },
      { min: 197301, max: 250525, rate: 32 },
      { min: 250526, max: 626350, rate: 35 },
      { min: 626351, max: Infinity, rate: 37 }
    ],
    mfj: [
      { min: 0, max: 23850, rate: 10 },
      { min: 23851, max: 96950, rate: 12 },
      { min: 96951, max: 206700, rate: 22 },
      { min: 206701, max: 394600, rate: 24 },
      { min: 394601, max: 501050, rate: 32 },
      { min: 501051, max: 751600, rate: 35 },
      { min: 751601, max: Infinity, rate: 37 }
    ],
    mfs: [
      { min: 0, max: 11925, rate: 10 },
      { min: 11926, max: 48475, rate: 12 },
      { min: 48476, max: 103350, rate: 22 },
      { min: 103351, max: 197300, rate: 24 },
      { min: 197301, max: 250525, rate: 32 },
      { min: 250526, max: 375800, rate: 35 },
      { min: 375801, max: Infinity, rate: 37 }
    ],
    hoh: [
      { min: 0, max: 17000, rate: 10 },
      { min: 17001, max: 64850, rate: 12 },
      { min: 64851, max: 103350, rate: 22 },
      { min: 103351, max: 197300, rate: 24 },
      { min: 197301, max: 250500, rate: 32 },
      { min: 250501, max: 626350, rate: 35 },
      { min: 626351, max: Infinity, rate: 37 }
    ]
  };

  // IRS Revenue Procedure 2025-32 — 2026 long-term capital gains thresholds (taxable income).
  var LTCG_BRACKETS_2026 = {
    single: [ { min: 0, max: 49450, rate: 0 }, { min: 49450, max: 545500, rate: 15 }, { min: 545500, max: Infinity, rate: 20 } ],
    mfj: [ { min: 0, max: 98900, rate: 0 }, { min: 98900, max: 613700, rate: 15 }, { min: 613700, max: Infinity, rate: 20 } ],
    mfs: [ { min: 0, max: 49450, rate: 0 }, { min: 49450, max: 306850, rate: 15 }, { min: 306850, max: Infinity, rate: 20 } ],
    hoh: [ { min: 0, max: 66200, rate: 0 }, { min: 66200, max: 579600, rate: 15 }, { min: 579600, max: Infinity, rate: 20 } ]
  };

  var NIIT_THRESHOLDS = { single: 200000, hoh: 200000, mfj: 250000, mfs: 125000 };
  var NIIT_RATE = 3.8;
  var ORDINARY_OFFSET_CAP = { single: 3000, mfj: 3000, hoh: 3000, mfs: 1500 };

  document.addEventListener('DOMContentLoaded', function () {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('filing')) document.getElementById('filing-status').value = params.get('filing');
    if (params.has('other')) setValue('other-income', params.get('other'));
    if (params.has('st')) setValue('st-gain', params.get('st'));
    if (params.has('lt')) setValue('lt-gain', params.get('lt'));
    if (params.has('loss')) setValue('loss-amount', params.get('loss'));

    if (params.toString()) setTimeout(calculateResults, 100);
  }

  function saveToURL() {
    var params = new URLSearchParams();
    params.set('filing', document.getElementById('filing-status').value);
    params.set('other', getValue('other-income'));
    params.set('st', getValue('st-gain'));
    params.set('lt', getValue('lt-gain'));
    params.set('loss', getValue('loss-amount'));
    var newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', function () {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('clear-btn').addEventListener('click', function () {
      document.getElementById('tax-loss-harvesting-calculator-form').reset();
      document.getElementById('tax-loss-harvesting-calculator-result').classList.add('hidden');
      window.history.replaceState({}, '', window.location.pathname);
    });

    document.querySelectorAll('#tax-loss-harvesting-calculator-form .form-input, #tax-loss-harvesting-calculator-form .form-select').forEach(function (input) {
      input.addEventListener('keypress', function (e) { if (e.key === 'Enter') { e.preventDefault(); calculateResults(); } });
      input.addEventListener('change', saveToURL);
    });

    var shareBtn = document.getElementById('share-calculation');
    if (shareBtn) shareBtn.addEventListener('click', shareCalculation);
  }

  function ordinaryTaxOn(taxableIncome, filing) {
    var remaining = Math.max(0, taxableIncome);
    var tax = 0;
    var brackets = ORDINARY_BRACKETS_2026[filing];
    for (var i = 0; i < brackets.length; i++) {
      var b = brackets[i];
      var size = b.max === Infinity ? Infinity : b.max - b.min + 1;
      var inBracket = Math.min(remaining, size);
      tax += inBracket * (b.rate / 100);
      remaining -= inBracket;
      if (remaining <= 0) break;
    }
    return tax;
  }

  function stackedLtcgBands(filing, start, end) {
    var bands = LTCG_BRACKETS_2026[filing];
    var out = [];
    for (var i = 0; i < bands.length; i++) {
      var b = bands[i];
      var lo = Math.max(start, b.min);
      var hi = Math.min(end, b.max);
      var amount = Math.max(0, hi - lo);
      if (amount > 0) out.push({ rate: b.rate, amount: amount });
    }
    return out;
  }

  function ltcgTaxOn(start, gain, filing) {
    if (gain <= 0) return 0;
    var bands = stackedLtcgBands(filing, start, start + gain);
    var t = 0;
    bands.forEach(function (b) { t += b.amount * (b.rate / 100); });
    return t;
  }

  function niitOn(otherIncome, st, lt, filing) {
    var investmentIncome = st + lt;
    var total = otherIncome + st + lt;
    var threshold = NIIT_THRESHOLDS[filing];
    var base = investmentIncome > 0 ? Math.min(investmentIncome, Math.max(0, total - threshold)) : 0;
    return base * (NIIT_RATE / 100);
  }

  function totalTaxFor(otherIncome, st, lt, filing) {
    return ordinaryTaxOn(otherIncome + st, filing) + ltcgTaxOn(otherIncome + st, lt, filing) + niitOn(otherIncome, st, lt, filing);
  }

  function calculateResults() {
    var filing = document.getElementById('filing-status').value;
    var otherIncome = getValue('other-income');
    var stGain = getValue('st-gain');
    var ltGain = getValue('lt-gain');
    var loss = getValue('loss-amount');

    if (otherIncome < 0 || stGain < 0 || ltGain < 0 || loss < 0) {
      showError('Please enter non-negative amounts.');
      return;
    }

    saveToURL();

    if (loss === 0) {
      var resultDiv0 = document.getElementById('tax-loss-harvesting-calculator-result');
      resultDiv0.innerHTML = '<div class="alert alert-info"><strong>Enter the loss you\'re considering harvesting (your unrealized loss on an underwater position) to see your estimated tax savings.</strong></div>';
      resultDiv0.classList.remove('hidden');
      return;
    }

    var ordinaryCap = ORDINARY_OFFSET_CAP[filing];

    var remaining = loss;
    var offsetST = Math.min(remaining, stGain); remaining -= offsetST;
    var offsetLT = Math.min(remaining, ltGain); remaining -= offsetLT;
    var offsetOrdinary = Math.min(remaining, ordinaryCap); remaining -= offsetOrdinary;
    var carryforward = remaining;

    var newST = stGain - offsetST;
    var newLT = ltGain - offsetLT;
    var newOther = Math.max(0, otherIncome - offsetOrdinary);

    var taxBefore = totalTaxFor(otherIncome, stGain, ltGain, filing);
    var taxAfter = totalTaxFor(newOther, newST, newLT, filing);
    var savings = Math.max(0, taxBefore - taxAfter);

    displayResults({
      filing: filing, otherIncome: otherIncome, stGain: stGain, ltGain: ltGain, loss: loss,
      offsetST: offsetST, offsetLT: offsetLT, offsetOrdinary: offsetOrdinary, carryforward: carryforward,
      ordinaryCap: ordinaryCap, taxBefore: taxBefore, taxAfter: taxAfter, savings: savings
    });
  }

  function displayResults(d) {
    var resultDiv = document.getElementById('tax-loss-harvesting-calculator-result');
    if (!resultDiv) return;

    var totalOffset = d.offsetST + d.offsetLT + d.offsetOrdinary;

    var rows = '';
    if (d.offsetST > 0) rows += '<tr><td>Offsets short-term gains</td><td><strong>' + formatCurrency(d.offsetST) + '</strong></td></tr>';
    if (d.offsetLT > 0) rows += '<tr><td>Offsets long-term gains</td><td><strong>' + formatCurrency(d.offsetLT) + '</strong></td></tr>';
    if (d.offsetOrdinary > 0) rows += '<tr><td>Deducted against ordinary income (' + formatCurrency(d.ordinaryCap) + ' annual limit)</td><td><strong>' + formatCurrency(d.offsetOrdinary) + '</strong></td></tr>';
    rows += '<tr class="subtotal-row"><td><strong>Total loss used this year</strong></td><td><strong>' + formatCurrency(totalOffset) + '</strong></td></tr>';
    rows += '<tr><td>Estimated tax before harvesting</td><td><strong>' + formatCurrency(d.taxBefore) + '</strong></td></tr>';
    rows += '<tr><td>Estimated tax after harvesting</td><td><strong>' + formatCurrency(d.taxAfter) + '</strong></td></tr>';
    rows += '<tr class="total-row"><td><strong>Estimated Tax Savings</strong></td><td><strong>' + formatCurrency(d.savings) + '</strong></td></tr>';

    resultDiv.innerHTML = '' +
      '<h3>📉 Your Tax-Loss Harvesting Results</h3>' +
      '<div class="result-main" style="text-align: center; padding: 1rem 0;">' +
        '<div class="result-label">Estimated 2026 Tax Savings</div>' +
        '<div class="result-value" style="font-size: 2.5rem; font-weight: 800; color: var(--color-accent-orange);">' + formatCurrency(d.savings) + '</div>' +
      '</div>' +
      '<div class="margin-cards">' +
        '<div class="margin-card highlight">' +
          '<div class="margin-card-icon">💵</div>' +
          '<div class="margin-card-value">' + formatCurrency(totalOffset) + '</div>' +
          '<div class="margin-card-label">Loss Used This Year</div>' +
        '</div>' +
        '<div class="margin-card">' +
          '<div class="margin-card-icon">⏭️</div>' +
          '<div class="margin-card-value">' + formatCurrency(d.carryforward) + '</div>' +
          '<div class="margin-card-label">Carries Forward to 2027</div>' +
        '</div>' +
        '<div class="margin-card">' +
          '<div class="margin-card-icon">🏛️</div>' +
          '<div class="margin-card-value">' + formatCurrency(d.ordinaryCap) + '</div>' +
          '<div class="margin-card-label">Ordinary-Income Offset Limit</div>' +
        '</div>' +
      '</div>' +
      '<div class="profit-breakdown">' +
        '<h4>📋 How the Loss Is Applied</h4>' +
        '<div class="breakdown-table-container">' +
          '<table class="profit-table">' +
            '<tbody>' + rows + '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>' +
      (d.carryforward > 0 ? (
      '<div class="alert alert-info" style="margin-top: 1rem;">' +
        '<strong>' + formatCurrency(d.carryforward) + ' carries forward to 2027</strong> (and future years, indefinitely) — you can use it to offset future capital gains or another ' + formatCurrency(d.ordinaryCap) + ' of ordinary income each year until it\'s used up.' +
      '</div>') : '') +
      '<div class="alert alert-warning" style="margin-top: 1rem;">' +
        '<strong>Watch the wash-sale rule:</strong> if you buy a "substantially identical" security within 30 days before or after the sale (a 61-day window), the loss is disallowed for now — it gets added to the replacement shares\' cost basis instead of saving you tax this year.' +
      '</div>';

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    var resultDiv = document.getElementById('tax-loss-harvesting-calculator-result');
    if (resultDiv) {
      resultDiv.innerHTML = '<div class="alert alert-error"><strong>Error:</strong> ' + message + '</div>';
      resultDiv.classList.remove('hidden');
    }
  }

  function getValue(id) { var el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }
  function setValue(id, value) { var el = document.getElementById(id); if (el) el.value = value; }
  function formatCurrency(amount) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount); }

  function shareCalculation() {
    var url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'Tax-Loss Harvesting Calculator', url: url }).catch(function () { copyToClipboard(url); }); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
      var btn = document.getElementById('share-calculation');
      if (btn) { var orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(function () { btn.innerHTML = orig; }, 2000); }
    }).catch(function () {});
  }
})();
