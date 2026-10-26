// Charitable Giving Deduction Calculator
(function () {
  'use strict';

  var NONITEMIZER_CAP = { single: 1000, hoh: 1000, mfs: 1000, mfj: 2000 };

  document.addEventListener('DOMContentLoaded', function () {
    loadFromURL();
    attachEventListeners();
    toggleNonCashField();
  });

  function toggleNonCashField() {
    var deductionType = document.getElementById('deduction-type').value;
    var noncashGroup = document.getElementById('noncash-group');
    var noncashInput = document.getElementById('noncash-donations');
    if (!noncashGroup) return;
    if (deductionType === 'standard') {
      noncashGroup.style.opacity = '0.5';
      if (noncashInput) noncashInput.title = 'Non-cash gifts are not deductible if you take the standard deduction.';
    } else {
      noncashGroup.style.opacity = '1';
      if (noncashInput) noncashInput.title = '';
    }
  }

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('filing')) document.getElementById('filing-status').value = params.get('filing');
    if (params.has('type')) document.getElementById('deduction-type').value = params.get('type');
    if (params.has('agi')) setValue('agi', params.get('agi'));
    if (params.has('rate')) document.getElementById('marginal-rate').value = params.get('rate');
    if (params.has('cash')) setValue('cash-donations', params.get('cash'));
    if (params.has('noncash')) setValue('noncash-donations', params.get('noncash'));

    if (params.toString()) setTimeout(calculateResults, 100);
  }

  function saveToURL() {
    var params = new URLSearchParams();
    params.set('filing', document.getElementById('filing-status').value);
    params.set('type', document.getElementById('deduction-type').value);
    params.set('agi', getValue('agi'));
    params.set('rate', document.getElementById('marginal-rate').value);
    params.set('cash', getValue('cash-donations'));
    params.set('noncash', getValue('noncash-donations'));
    var newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', function () {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('clear-btn').addEventListener('click', function () {
      document.getElementById('charitable-giving-deduction-calculator-form').reset();
      document.getElementById('charitable-giving-deduction-calculator-result').classList.add('hidden');
      toggleNonCashField();
      window.history.replaceState({}, '', window.location.pathname);
    });

    document.getElementById('deduction-type').addEventListener('change', toggleNonCashField);

    document.querySelectorAll('#charitable-giving-deduction-calculator-form .form-input, #charitable-giving-deduction-calculator-form .form-select').forEach(function (input) {
      input.addEventListener('keypress', function (e) { if (e.key === 'Enter') { e.preventDefault(); calculateResults(); } });
      input.addEventListener('change', saveToURL);
    });

    var shareBtn = document.getElementById('share-calculation');
    if (shareBtn) shareBtn.addEventListener('click', shareCalculation);
  }

  function calculateResults() {
    var filing = document.getElementById('filing-status').value;
    var deductionType = document.getElementById('deduction-type').value;
    var agi = getValue('agi');
    var rate = parseFloat(document.getElementById('marginal-rate').value) || 0;
    var cash = getValue('cash-donations');
    var nonCash = getValue('noncash-donations');

    if (agi < 0 || cash < 0 || nonCash < 0) {
      showError('Please enter non-negative amounts.');
      return;
    }

    saveToURL();

    var data = { filing: filing, deductionType: deductionType, agi: agi, rate: rate, cash: cash, nonCash: nonCash };

    if (deductionType === 'standard') {
      var cap = NONITEMIZER_CAP[filing] || 1000;
      var deductibleCash = Math.min(cash, cap);
      var excess = Math.max(0, cash - cap);
      var savings = deductibleCash * rate / 100;
      displayStandardResults(Object.assign(data, { cap: cap, deductibleCash: deductibleCash, excess: excess, savings: savings }));
    } else {
      var floor = agi * 0.005;
      var total = cash + nonCash;
      var deductible = Math.max(0, total - floor);
      var cashCap = agi * 0.6;
      var nonCashCap = agi * 0.3;
      var exceedsCashCap = cash > cashCap;
      var exceedsNonCashCap = nonCash > nonCashCap;
      var savings2 = deductible * rate / 100;
      displayItemizedResults(Object.assign(data, {
        floor: floor, total: total, deductible: deductible,
        exceedsCashCap: exceedsCashCap, exceedsNonCashCap: exceedsNonCashCap, savings: savings2
      }));
    }
  }

  function displayStandardResults(d) {
    var resultDiv = document.getElementById('charitable-giving-deduction-calculator-result');
    if (!resultDiv) return;

    var capLabel = d.filing === 'mfj' ? '$2,000 (married filing jointly)' : '$1,000 (' + filingLabel(d.filing) + ')';

    resultDiv.innerHTML = '' +
      '<h3>🎁 Your Standard-Deduction Charitable Benefit</h3>' +
      '<div class="result-main" style="text-align: center; padding: 1rem 0;">' +
        '<div class="result-label">Above-the-Line Deduction</div>' +
        '<div class="result-value" style="font-size: 2.5rem; font-weight: 800; color: var(--color-accent-orange);">' + formatCurrency(d.deductibleCash) + '</div>' +
      '</div>' +
      '<div class="margin-cards">' +
        '<div class="margin-card highlight">' +
          '<div class="margin-card-icon">💵</div>' +
          '<div class="margin-card-value">' + formatCurrency(d.savings) + '</div>' +
          '<div class="margin-card-label">Estimated Tax Savings</div>' +
        '</div>' +
        '<div class="margin-card">' +
          '<div class="margin-card-icon">🧾</div>' +
          '<div class="margin-card-value">' + formatCurrency(d.cap) + '</div>' +
          '<div class="margin-card-label">Your Annual Cap</div>' +
        '</div>' +
        (d.excess > 0 ? (
        '<div class="margin-card">' +
          '<div class="margin-card-icon">🚫</div>' +
          '<div class="margin-card-value">' + formatCurrency(d.excess) + '</div>' +
          '<div class="margin-card-label">Not Deductible (over cap)</div>' +
        '</div>') : '') +
      '</div>' +
      '<div class="profit-breakdown">' +
        '<h4>📋 Calculation Breakdown</h4>' +
        '<div class="breakdown-table-container">' +
          '<table class="profit-table">' +
            '<tbody>' +
              '<tr><td>Cash Donations</td><td><strong>' + formatCurrency(d.cash) + '</strong></td></tr>' +
              '<tr><td>Your Non-Itemizer Cap (' + capLabel + ')</td><td><strong>' + formatCurrency(d.cap) + '</strong></td></tr>' +
              '<tr class="total-row"><td><strong>Deductible Amount</strong></td><td><strong>' + formatCurrency(d.deductibleCash) + '</strong></td></tr>' +
              '<tr><td>× Your Marginal Tax Rate</td><td><strong>' + d.rate + '%</strong></td></tr>' +
              '<tr class="total-row"><td><strong>Estimated Tax Savings</strong></td><td><strong>' + formatCurrency(d.savings) + '</strong></td></tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>' +
      (d.nonCash > 0 ? (
      '<div class="alert alert-warning" style="margin-top: 1rem;">' +
        '<strong>Heads up:</strong> you entered ' + formatCurrency(d.nonCash) + ' in non-cash donations, but non-cash gifts are not eligible for the standard-deduction above-the-line benefit — only cash counts. Switch to "Itemized Deductions" above to include them.' +
      '</div>') : '') +
      (d.excess > 0 ? (
      '<div class="alert alert-info" style="margin-top: 1rem;">' +
        '<strong>' + formatCurrency(d.excess) + ' of your cash giving exceeds the ' + formatCurrency(d.cap) + ' cap</strong> and is not deductible this year — the non-itemizer deduction does not carry forward.' +
      '</div>') : '');

    resultDiv.classList.remove('hidden');
  }

  function displayItemizedResults(d) {
    var resultDiv = document.getElementById('charitable-giving-deduction-calculator-result');
    if (!resultDiv) return;

    resultDiv.innerHTML = '' +
      '<h3>🎁 Your Itemized Charitable Deduction</h3>' +
      '<div class="result-main" style="text-align: center; padding: 1rem 0;">' +
        '<div class="result-label">Deductible Amount</div>' +
        '<div class="result-value" style="font-size: 2.5rem; font-weight: 800; color: var(--color-accent-orange);">' + formatCurrency(d.deductible) + '</div>' +
      '</div>' +
      '<div class="margin-cards">' +
        '<div class="margin-card highlight">' +
          '<div class="margin-card-icon">💵</div>' +
          '<div class="margin-card-value">' + formatCurrency(d.savings) + '</div>' +
          '<div class="margin-card-label">Estimated Tax Savings</div>' +
        '</div>' +
        '<div class="margin-card">' +
          '<div class="margin-card-icon">📉</div>' +
          '<div class="margin-card-value">' + formatCurrency(d.floor) + '</div>' +
          '<div class="margin-card-label">0.5% AGI Floor</div>' +
        '</div>' +
        '<div class="margin-card">' +
          '<div class="margin-card-icon">🧾</div>' +
          '<div class="margin-card-value">' + formatCurrency(d.total) + '</div>' +
          '<div class="margin-card-label">Total Contributions</div>' +
        '</div>' +
      '</div>' +
      '<div class="profit-breakdown">' +
        '<h4>📋 Calculation Breakdown</h4>' +
        '<div class="breakdown-table-container">' +
          '<table class="profit-table">' +
            '<tbody>' +
              '<tr><td>Cash Donations</td><td><strong>' + formatCurrency(d.cash) + '</strong></td></tr>' +
              '<tr><td>Non-Cash Donations</td><td><strong>' + formatCurrency(d.nonCash) + '</strong></td></tr>' +
              '<tr><td>Total Contributions</td><td><strong>' + formatCurrency(d.total) + '</strong></td></tr>' +
              '<tr><td>Less: 0.5% of AGI (' + formatCurrency(d.agi) + ') Floor</td><td><strong>− ' + formatCurrency(d.floor) + '</strong></td></tr>' +
              '<tr class="total-row"><td><strong>Deductible Amount</strong></td><td><strong>' + formatCurrency(d.deductible) + '</strong></td></tr>' +
              '<tr><td>× Your Marginal Tax Rate</td><td><strong>' + d.rate + '%</strong></td></tr>' +
              '<tr class="total-row"><td><strong>Estimated Tax Savings</strong></td><td><strong>' + formatCurrency(d.savings) + '</strong></td></tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>' +
      (d.deductible === 0 && d.total > 0 ? (
      '<div class="alert alert-warning" style="margin-top: 1rem;">' +
        '<strong>Your giving didn\'t clear the new 0.5% AGI floor</strong> (' + formatCurrency(d.floor) + ') this year, so none of it is deductible on Schedule A. Consider bunching multiple years of giving into one year to clear the floor.' +
      '</div>') : '') +
      ((d.exceedsCashCap || d.exceedsNonCashCap) ? (
      '<div class="alert alert-info" style="margin-top: 1rem;">' +
        '<strong>Note:</strong> your giving may exceed the 60%-of-AGI (cash) or 30%-of-AGI (property) annual ceiling — any amount above that caps out this year but carries forward up to 5 years. Consult a tax professional.' +
      '</div>') : '');

    resultDiv.classList.remove('hidden');
  }

  function filingLabel(filing) {
    if (filing === 'hoh') return 'head of household';
    if (filing === 'mfs') return 'married filing separately';
    return 'single';
  }

  function showError(message) {
    var resultDiv = document.getElementById('charitable-giving-deduction-calculator-result');
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
    if (navigator.share) { navigator.share({ title: 'Charitable Giving Deduction Calculator', url: url }).catch(function () { copyToClipboard(url); }); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
      var btn = document.getElementById('share-calculation');
      if (btn) { var orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(function () { btn.innerHTML = orig; }, 2000); }
    }).catch(function () {});
  }
})();
