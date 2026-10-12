(function() {
  'use strict';

  // IRS Publication 590-B, Appendix B, Table III (Uniform Lifetime Table).
  // Unchanged since 2022 — same divisors apply for 2026 and 2027.
  const UNIFORM_LIFETIME_TABLE = {
    72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1,
    80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4,
    88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9,
    96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4, 101: 6.0, 102: 5.6, 103: 5.2,
    104: 4.9, 105: 4.6, 106: 4.3, 107: 4.1, 108: 3.9, 109: 3.7, 110: 3.5, 111: 3.4,
    112: 3.3, 113: 3.1, 114: 3.0, 115: 2.9, 116: 2.8, 117: 2.7, 118: 2.5, 119: 2.3,
    120: 2.0
  };

  const ACCOUNT_LABELS = {
    traditional: 'Traditional IRA / 401(k) / 403(b)',
    'roth-employer': 'Roth 401(k) / Roth 403(b)',
    'roth-ira': 'Roth IRA'
  };

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function getDivisor(age) {
    if (age < 72) return null;
    if (age > 120) return UNIFORM_LIFETIME_TABLE[120];
    return UNIFORM_LIFETIME_TABLE[age];
  }

  function firstRmdAge(birthYear) {
    if (birthYear <= 1950) return 72;
    if (birthYear <= 1959) return 73;
    return 75;
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('birth')) setValue('birth-year', params.get('birth'));
    if (params.has('year')) document.getElementById('calc-year').value = params.get('year');
    if (params.has('type')) document.getElementById('account-type').value = params.get('type');
    if (params.has('balance')) setValue('account-balance', params.get('balance'));
    if (params.has('spouse')) document.getElementById('spouse-exception').checked = params.get('spouse') === '1';

    if (params.toString()) setTimeout(calculateResults, 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('birth', getValue('birth-year'));
    params.set('year', document.getElementById('calc-year').value);
    params.set('type', document.getElementById('account-type').value);
    params.set('balance', getValue('account-balance'));
    params.set('spouse', document.getElementById('spouse-exception').checked ? '1' : '0');
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', function() {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('clear-btn').addEventListener('click', function() {
      document.getElementById('rmd-calculator-form').reset();
      document.getElementById('rmd-calculator-result').classList.add('hidden');
      window.history.replaceState({}, '', window.location.pathname);
    });

    document.querySelectorAll('#rmd-calculator-form .form-input, #rmd-calculator-form .form-select, #rmd-calculator-form input[type="checkbox"]').forEach(function(input) {
      input.addEventListener('keypress', function(e) { if (e.key === 'Enter') { e.preventDefault(); calculateResults(); } });
      input.addEventListener('change', saveToURL);
    });

    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) shareBtn.addEventListener('click', shareCalculation);
  }

  function calculateResults() {
    const birthYear = getValue('birth-year');
    const calcYear = parseInt(document.getElementById('calc-year').value, 10);
    const accountType = document.getElementById('account-type').value;
    const balance = getValue('account-balance');
    const spouseException = document.getElementById('spouse-exception').checked;

    if (!birthYear || birthYear < 1920 || birthYear > calcYear - 18) {
      showError('Please enter a valid birth year.');
      return;
    }

    saveToURL();

    if (accountType !== 'traditional') {
      displayNoRmd(accountType);
      return;
    }

    if (balance <= 0) {
      showError('Please enter your account balance as of December 31 of the prior year.');
      return;
    }

    const age = calcYear - birthYear;
    const startAge = firstRmdAge(birthYear);

    if (age < startAge) {
      displayNotYet(age, startAge, birthYear, calcYear);
      return;
    }

    const divisor = getDivisor(age);
    const rmd = balance / divisor;
    const pctOfBalance = (1 / divisor) * 100;
    const monthly = rmd / 12;
    const isFirstYear = age === startAge;

    displayResults({
      birthYear, calcYear, age, divisor, balance, rmd, pctOfBalance, monthly, isFirstYear, spouseException
    });
  }

  function displayNoRmd(accountType) {
    const resultDiv = document.getElementById('rmd-calculator-result');
    const note = accountType === 'roth-ira'
      ? 'Roth IRAs never require RMDs for the original account owner.'
      : 'Roth 401(k) and Roth 403(b) accounts no longer require RMDs during the original owner\'s lifetime (effective 2024, SECURE 2.0 Act).';
    resultDiv.innerHTML = `
      <h3>✅ No RMD Required</h3>
      <div class="result-main" style="text-align: center; padding: 1.5rem 0;">
        <div class="result-label">${ACCOUNT_LABELS[accountType]}</div>
        <div class="result-value" style="font-size: 1.5rem; margin-top: 0.5rem;">$0 required this year</div>
      </div>
      <p style="text-align: center; color: var(--color-gray-dark);">${note}</p>
    `;
    resultDiv.classList.remove('hidden');
  }

  function displayNotYet(age, startAge, birthYear, calcYear) {
    const resultDiv = document.getElementById('rmd-calculator-result');
    const rmdStartYear = birthYear + startAge;
    resultDiv.innerHTML = `
      <h3>🕐 No RMD Required Yet</h3>
      <div class="result-main" style="text-align: center; padding: 1.5rem 0;">
        <div class="result-label">You'll turn ${age} in ${calcYear}</div>
        <div class="result-value" style="font-size: 1.5rem; margin-top: 0.5rem;">RMDs start at age ${startAge}</div>
      </div>
      <p style="text-align: center; color: var(--color-gray-dark);">
        Based on your birth year (${birthYear}), your first Required Minimum Distribution applies for ${rmdStartYear},
        the year you turn ${startAge}.
      </p>
    `;
    resultDiv.classList.remove('hidden');
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('rmd-calculator-result');
    if (!resultDiv) return;

    const deadline = data.isFirstYear
      ? `April 1, ${data.calcYear + 1} (delaying stacks two RMDs into one tax year) or December 31, ${data.calcYear}`
      : `December 31, ${data.calcYear}`;

    resultDiv.innerHTML = `
      <h3>📉 Your ${data.calcYear} RMD</h3>

      <div class="result-main" style="text-align: center; padding: 1rem 0;">
        <div class="result-label">Required Minimum Distribution</div>
        <div class="result-value" style="font-size: 2.5rem; font-weight: 800; color: var(--color-accent-orange);">${formatCurrency(data.rmd)}</div>
      </div>

      <div class="margin-cards">
        <div class="margin-card">
          <div class="margin-card-icon">🎂</div>
          <div class="margin-card-value">${data.age}</div>
          <div class="margin-card-label">Your Age in ${data.calcYear}</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">➗</div>
          <div class="margin-card-value">${data.divisor}</div>
          <div class="margin-card-label">IRS Distribution Period</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📊</div>
          <div class="margin-card-value">${data.pctOfBalance.toFixed(2)}%</div>
          <div class="margin-card-label">% of Balance</div>
        </div>
        <div class="margin-card highlight">
          <div class="margin-card-icon">📅</div>
          <div class="margin-card-value">${formatCurrency(data.monthly)}</div>
          <div class="margin-card-label">If Spread Monthly</div>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>📋 Calculation Breakdown</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <tbody>
              <tr><td>Account Balance (Dec 31, ${data.calcYear - 1})</td><td><strong>${formatCurrency(data.balance)}</strong></td></tr>
              <tr><td>IRS Distribution Period (age ${data.age})</td><td><strong>÷ ${data.divisor}</strong></td></tr>
              <tr class="total-row"><td><strong>Required Minimum Distribution</strong></td><td><strong>${formatCurrency(data.rmd)}</strong></td></tr>
              <tr><td>Withdrawal Deadline</td><td><strong>${deadline}</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      ${data.isFirstYear ? `
      <div class="alert alert-info" style="margin-top: 1rem;">
        <strong>This is your first RMD year.</strong> You have until April 1, ${data.calcYear + 1} to take it, but if you wait,
        you'll also need to take your ${data.calcYear + 1} RMD by December 31, ${data.calcYear + 1} — two distributions in the same tax year.
      </div>
      ` : ''}

      ${data.spouseException ? `
      <div class="alert alert-info" style="margin-top: 1rem;">
        <strong>Note:</strong> Because your spouse is your sole beneficiary and more than 10 years younger, the IRS Joint Life Table
        would give you a <em>smaller</em> RMD than shown above. This calculator uses the standard Uniform Lifetime Table — check
        IRS Publication 590-B, Table II, or a tax advisor for your exact Joint Life figure.
      </div>
      ` : ''}
    `;

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    const resultDiv = document.getElementById('rmd-calculator-result');
    if (resultDiv) {
      resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`;
      resultDiv.classList.remove('hidden');
    }
  }

  function getValue(id) { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }
  function setValue(id, value) { const el = document.getElementById(id); if (el) el.value = value; }
  function formatCurrency(amount) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount); }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'RMD Calculator', url }).catch(function() { copyToClipboard(url); }); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      const btn = document.getElementById('share-calculation');
      if (btn) { const orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(function() { btn.innerHTML = orig; }, 2000); }
    }).catch(function() {});
  }
})();
