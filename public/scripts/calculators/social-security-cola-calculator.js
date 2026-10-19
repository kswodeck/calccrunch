// Social Security COLA Calculator
(function () {
  'use strict';

  // Officially announced SSA cost-of-living adjustments.
  const COLA_RATES = {
    2024: 3.2,
    2025: 2.5,
    2026: 2.8,
    2027: 3.6
  };

  document.addEventListener('DOMContentLoaded', function () {
    loadFromURL();
    attachEventListeners();
    toggleCustomCola();
  });

  function toggleCustomCola() {
    const yearSelect = document.getElementById('cola-year');
    const customGroup = document.getElementById('custom-cola-group');
    if (!yearSelect || !customGroup) return;
    customGroup.style.display = yearSelect.value === 'custom' ? '' : 'none';
  }

  function getColaRate() {
    const yearSelect = document.getElementById('cola-year');
    if (yearSelect.value === 'custom') {
      return getValue('custom-cola');
    }
    return COLA_RATES[parseInt(yearSelect.value, 10)] || 0;
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('benefit')) setValue('current-benefit', params.get('benefit'));
    if (params.has('type')) document.getElementById('benefit-type').value = params.get('type');
    if (params.has('year')) document.getElementById('cola-year').value = params.get('year');
    if (params.has('custom')) setValue('custom-cola', params.get('custom'));
    if (params.has('partb')) setValue('part-b-increase', params.get('partb'));

    if (params.toString()) setTimeout(calculateResults, 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('benefit', getValue('current-benefit'));
    params.set('type', document.getElementById('benefit-type').value);
    params.set('year', document.getElementById('cola-year').value);
    params.set('custom', getValue('custom-cola'));
    params.set('partb', getValue('part-b-increase'));
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', function () {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('clear-btn').addEventListener('click', function () {
      document.getElementById('social-security-cola-calculator-form').reset();
      document.getElementById('social-security-cola-calculator-result').classList.add('hidden');
      toggleCustomCola();
      window.history.replaceState({}, '', window.location.pathname);
    });

    document.getElementById('cola-year').addEventListener('change', toggleCustomCola);

    document.querySelectorAll('#social-security-cola-calculator-form .form-input, #social-security-cola-calculator-form .form-select').forEach(function (input) {
      input.addEventListener('keypress', function (e) { if (e.key === 'Enter') { e.preventDefault(); calculateResults(); } });
      input.addEventListener('change', saveToURL);
    });

    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) shareBtn.addEventListener('click', shareCalculation);
  }

  function calculateResults() {
    const currentBenefit = getValue('current-benefit');
    const benefitType = document.getElementById('benefit-type').value;
    const colaRate = getColaRate();
    const partBIncrease = getValue('part-b-increase');

    if (!currentBenefit || currentBenefit <= 0) {
      showError('Please enter your current monthly benefit amount.');
      return;
    }

    if (colaRate === null || isNaN(colaRate)) {
      showError('Please enter a valid COLA percentage.');
      return;
    }

    saveToURL();

    const newBenefit = currentBenefit * (1 + colaRate / 100);
    const monthlyIncrease = newBenefit - currentBenefit;
    const annualNew = newBenefit * 12;
    const annualIncrease = (newBenefit - currentBenefit) * 12;
    const netMonthlyIncrease = monthlyIncrease - partBIncrease;
    const netNewBenefit = newBenefit - partBIncrease;

    displayResults({
      currentBenefit, benefitType, colaRate, newBenefit, monthlyIncrease,
      annualNew, annualIncrease, partBIncrease, netMonthlyIncrease, netNewBenefit
    });
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('social-security-cola-calculator-result');
    if (!resultDiv) return;

    const effectiveNote = data.benefitType === 'ssi'
      ? 'Your SSI increase arrives in your December 31, 2026 payment.'
      : 'Your new amount starts with your January 2027 payment.';

    resultDiv.innerHTML = `
      <h3>📈 Your New Benefit with a ${data.colaRate}% COLA</h3>

      <div class="result-main" style="text-align: center; padding: 1rem 0;">
        <div class="result-label">New Monthly Benefit</div>
        <div class="result-value" style="font-size: 2.5rem; font-weight: 800; color: var(--color-accent-orange);">${formatCurrency(data.newBenefit)}</div>
      </div>

      <div class="margin-cards">
        <div class="margin-card highlight">
          <div class="margin-card-icon">💰</div>
          <div class="margin-card-value">${formatSigned(data.monthlyIncrease)}</div>
          <div class="margin-card-label">Monthly Increase</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📅</div>
          <div class="margin-card-value">${formatSigned(data.annualIncrease)}</div>
          <div class="margin-card-label">Annual Increase</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">🗓️</div>
          <div class="margin-card-value">${formatCurrency(data.annualNew)}</div>
          <div class="margin-card-label">New Annual Total</div>
        </div>
        ${data.partBIncrease > 0 ? `
        <div class="margin-card">
          <div class="margin-card-icon">🏥</div>
          <div class="margin-card-value">${formatCurrency(data.netMonthlyIncrease)}</div>
          <div class="margin-card-label">Net Increase After Part B</div>
        </div>
        ` : ''}
      </div>

      <div class="profit-breakdown">
        <h4>📋 Calculation Breakdown</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <tbody>
              <tr><td>Current Monthly Benefit</td><td><strong>${formatCurrency(data.currentBenefit)}</strong></td></tr>
              <tr><td>COLA Applied</td><td><strong>× ${(1 + data.colaRate / 100).toFixed(4)} (${data.colaRate}%)</strong></td></tr>
              <tr class="total-row"><td><strong>New Monthly Benefit</strong></td><td><strong>${formatCurrency(data.newBenefit)}</strong></td></tr>
              ${data.partBIncrease > 0 ? `
              <tr><td>Less: Part B Premium Increase</td><td><strong>− ${formatCurrency(data.partBIncrease)}</strong></td></tr>
              <tr class="total-row"><td><strong>Net New Benefit (after Part B)</strong></td><td><strong>${formatCurrency(data.netNewBenefit)}</strong></td></tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      </div>

      <div class="alert alert-info" style="margin-top: 1rem;">
        <strong>${effectiveNote}</strong> You'll receive a personal notice from the SSA in early December detailing your exact new amount, or you can view it online by creating a "my Social Security" account by November 18, 2026.
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    const resultDiv = document.getElementById('social-security-cola-calculator-result');
    if (resultDiv) {
      resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`;
      resultDiv.classList.remove('hidden');
    }
  }

  function getValue(id) { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }
  function setValue(id, value) { const el = document.getElementById(id); if (el) el.value = value; }
  function formatCurrency(amount) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount); }
  function formatSigned(amount) { return (amount >= 0 ? '+' : '') + formatCurrency(amount); }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'Social Security COLA Calculator', url }).catch(function () { copyToClipboard(url); }); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
      const btn = document.getElementById('share-calculation');
      if (btn) { const orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(function () { btn.innerHTML = orig; }, 2000); }
    }).catch(function () {});
  }
})();
