// Capital Gains Tax Calculator
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

  var FILING_LABELS = { single: 'Single', mfj: 'Married Filing Jointly', mfs: 'Married Filing Separately', hoh: 'Head of Household' };

  document.addEventListener('DOMContentLoaded', function () {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('filing')) document.getElementById('filing-status').value = params.get('filing');
    if (params.has('other')) setValue('other-income', params.get('other'));
    if (params.has('gain')) setValue('gain-amount', params.get('gain'));
    if (params.has('period')) document.getElementById('holding-period').value = params.get('period');

    if (params.toString()) setTimeout(calculateResults, 100);
  }

  function saveToURL() {
    var params = new URLSearchParams();
    params.set('filing', document.getElementById('filing-status').value);
    params.set('other', getValue('other-income'));
    params.set('gain', getValue('gain-amount'));
    params.set('period', document.getElementById('holding-period').value);
    var newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', function () {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('clear-btn').addEventListener('click', function () {
      document.getElementById('capital-gains-tax-calculator-form').reset();
      document.getElementById('capital-gains-tax-calculator-result').classList.add('hidden');
      window.history.replaceState({}, '', window.location.pathname);
    });

    document.querySelectorAll('#capital-gains-tax-calculator-form .form-input, #capital-gains-tax-calculator-form .form-select').forEach(function (input) {
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

  function calculateResults() {
    var filing = document.getElementById('filing-status').value;
    var otherIncome = getValue('other-income');
    var gain = getValue('gain-amount');
    var period = document.getElementById('holding-period').value;

    if (otherIncome < 0 || gain < 0) {
      showError('Please enter non-negative amounts.');
      return;
    }

    saveToURL();

    var total = otherIncome + gain;
    var bandBreakdown = [];
    var taxOnGain;

    if (period === 'long') {
      var bands = stackedLtcgBands(filing, otherIncome, total);
      taxOnGain = 0;
      bands.forEach(function (b) {
        var t = b.amount * (b.rate / 100);
        taxOnGain += t;
        bandBreakdown.push({ rate: b.rate, amount: b.amount, tax: t });
      });
    } else {
      var taxOnOtherAlone = ordinaryTaxOn(otherIncome, filing);
      var taxOnTotal = ordinaryTaxOn(total, filing);
      taxOnGain = taxOnTotal - taxOnOtherAlone;
      bandBreakdown.push({ rate: null, amount: gain, tax: taxOnGain });
    }

    var niitThreshold = NIIT_THRESHOLDS[filing];
    var niitBase = gain > 0 ? Math.min(gain, Math.max(0, total - niitThreshold)) : 0;
    var niit = niitBase * (NIIT_RATE / 100);

    var totalTax = taxOnGain + niit;
    var afterTax = gain - totalTax;
    var effectiveRate = gain > 0 ? (totalTax / gain) * 100 : 0;

    displayResults({
      filing: filing, otherIncome: otherIncome, gain: gain, period: period, total: total,
      bandBreakdown: bandBreakdown, taxOnGain: taxOnGain, niitThreshold: niitThreshold,
      niitBase: niitBase, niit: niit, totalTax: totalTax, afterTax: afterTax, effectiveRate: effectiveRate
    });
  }

  function displayResults(d) {
    var resultDiv = document.getElementById('capital-gains-tax-calculator-result');
    if (!resultDiv) return;

    if (d.gain === 0) {
      resultDiv.innerHTML = '<div class="alert alert-info"><strong>Enter a capital gain amount above zero to see your estimated tax.</strong></div>';
      resultDiv.classList.remove('hidden');
      return;
    }

    var periodLabel = d.period === 'long' ? 'Long-Term' : 'Short-Term';

    var bandRows = d.bandBreakdown.map(function (b) {
      var rateLabel = b.rate === null ? 'Ordinary income rate(s)' : b.rate + '%';
      return '<tr><td>' + rateLabel + ' on ' + formatCurrency(b.amount) + '</td><td><strong>' + formatCurrency(b.tax) + '</strong></td></tr>';
    }).join('');

    resultDiv.innerHTML = '' +
      '<h3>📈 Your ' + periodLabel + ' Capital Gains Tax</h3>' +
      '<div class="result-main" style="text-align: center; padding: 1rem 0;">' +
        '<div class="result-label">Total Federal Tax on This Gain</div>' +
        '<div class="result-value" style="font-size: 2.5rem; font-weight: 800; color: var(--color-accent-orange);">' + formatCurrency(d.totalTax) + '</div>' +
      '</div>' +
      '<div class="margin-cards">' +
        '<div class="margin-card highlight">' +
          '<div class="margin-card-icon">💰</div>' +
          '<div class="margin-card-value">' + formatCurrency(d.afterTax) + '</div>' +
          '<div class="margin-card-label">After-Tax Proceeds</div>' +
        '</div>' +
        '<div class="margin-card">' +
          '<div class="margin-card-icon">📊</div>' +
          '<div class="margin-card-value">' + d.effectiveRate.toFixed(1) + '%</div>' +
          '<div class="margin-card-label">Effective Rate on Gain</div>' +
        '</div>' +
        '<div class="margin-card">' +
          '<div class="margin-card-icon">🏛️</div>' +
          '<div class="margin-card-value">' + formatCurrency(d.niit) + '</div>' +
          '<div class="margin-card-label">Includes NIIT (3.8%)</div>' +
        '</div>' +
      '</div>' +
      '<div class="profit-breakdown">' +
        '<h4>📋 Calculation Breakdown</h4>' +
        '<div class="breakdown-table-container">' +
          '<table class="profit-table">' +
            '<tbody>' +
              '<tr><td>Other Taxable Income</td><td><strong>' + formatCurrency(d.otherIncome) + '</strong></td></tr>' +
              '<tr><td>' + periodLabel + ' Capital Gain</td><td><strong>' + formatCurrency(d.gain) + '</strong></td></tr>' +
              '<tr class="subtotal-row"><td><strong>Total Taxable Income</strong></td><td><strong>' + formatCurrency(d.total) + '</strong></td></tr>' +
              bandRows +
              (d.niit > 0 ? '<tr><td>3.8% NIIT on ' + formatCurrency(d.niitBase) + '</td><td><strong>' + formatCurrency(d.niit) + '</strong></td></tr>' : '') +
              '<tr class="total-row"><td><strong>Total Tax on Gain</strong></td><td><strong>' + formatCurrency(d.totalTax) + '</strong></td></tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>' +
      (d.niit > 0 ? (
      '<div class="alert alert-info" style="margin-top: 1rem;">' +
        '<strong>NIIT applies:</strong> your total taxable income (' + formatCurrency(d.total) + ') exceeds the ' + formatCurrency(d.niitThreshold) + ' threshold for ' + FILING_LABELS[d.filing] + ', so an extra 3.8% Net Investment Income Tax applies to ' + formatCurrency(d.niitBase) + ' of this gain.' +
      '</div>') : '') +
      (d.period === 'short' ? (
      '<div class="alert alert-warning" style="margin-top: 1rem;">' +
        '<strong>Short-term gains are taxed as ordinary income</strong> — holding the asset past the 1-year mark would likely qualify it for the lower long-term rates shown above.' +
      '</div>') : '');

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    var resultDiv = document.getElementById('capital-gains-tax-calculator-result');
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
    if (navigator.share) { navigator.share({ title: 'Capital Gains Tax Calculator', url: url }).catch(function () { copyToClipboard(url); }); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
      var btn = document.getElementById('share-calculation');
      if (btn) { var orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(function () { btn.innerHTML = orig; }, 2000); }
    }).catch(function () {});
  }
})();
