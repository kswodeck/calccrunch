(function() {
  'use strict';

  const CPI_DATA = {
    1960: 29.6, 1961: 29.9, 1962: 30.2, 1963: 30.6, 1964: 31.0, 1965: 31.5,
    1966: 32.4, 1967: 33.4, 1968: 34.8, 1969: 36.7, 1970: 38.8, 1971: 40.5,
    1972: 41.8, 1973: 44.4, 1974: 49.3, 1975: 53.8, 1976: 56.9, 1977: 60.6,
    1978: 65.2, 1979: 72.6, 1980: 82.4, 1981: 90.9, 1982: 96.5, 1983: 99.6,
    1984: 103.9, 1985: 107.6, 1986: 109.6, 1987: 113.6, 1988: 118.3, 1989: 124.0,
    1990: 130.7, 1991: 136.2, 1992: 140.3, 1993: 144.5, 1994: 148.2, 1995: 152.4,
    1996: 156.9, 1997: 160.5, 1998: 163.0, 1999: 166.6, 2000: 172.2, 2001: 177.1,
    2002: 179.9, 2003: 184.0, 2004: 188.9, 2005: 195.3, 2006: 201.6, 2007: 207.3,
    2008: 215.3, 2009: 214.5, 2010: 218.1, 2011: 224.9, 2012: 229.6, 2013: 233.0,
    2014: 236.7, 2015: 237.0, 2016: 240.0, 2017: 245.1, 2018: 251.1, 2019: 255.7,
    2020: 258.8, 2021: 271.0, 2022: 292.7, 2023: 304.7, 2024: 313.0, 2025: 320.8
  };

  let currentMode = 'historical';

  document.addEventListener('DOMContentLoaded', function() {
    populateYearDropdowns();
    loadFromURL();
    attachEventListeners();
  });

  function populateYearDropdowns() {
    const years = Object.keys(CPI_DATA).map(Number).sort((a, b) => a - b);
    const startSelect = document.getElementById('start-year');
    const endSelect = document.getElementById('end-year');

    years.forEach(year => {
      startSelect.add(new Option(year, year));
      endSelect.add(new Option(year, year));
    });

    startSelect.value = '2000';
    endSelect.value = '2025';
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('mode')) { currentMode = params.get('mode'); switchMode(currentMode); }
    if (params.has('amount')) setValue('amount', params.get('amount'));
    if (params.has('start')) document.getElementById('start-year').value = params.get('start');
    if (params.has('end')) document.getElementById('end-year').value = params.get('end');
    if (params.has('rate')) setValue('inflation-rate', params.get('rate'));
    if (params.has('years')) setValue('projection-years', params.get('years'));

    if (params.toString()) setTimeout(() => calculateResults(), 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('mode', currentMode);
    params.set('amount', getValue('amount'));
    if (currentMode === 'historical') {
      params.set('start', document.getElementById('start-year').value);
      params.set('end', document.getElementById('end-year').value);
    } else {
      params.set('rate', getValue('inflation-rate'));
      params.set('years', getValue('projection-years'));
    }
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.querySelectorAll('.unit-btn[data-mode]').forEach(btn => {
      btn.addEventListener('click', function() { switchMode(this.dataset.mode); saveToURL(); });
    });

    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('.form-input, .form-select').forEach(input => {
      input.addEventListener('keypress', function(e) { if (e.key === 'Enter') { e.preventDefault(); calculateResults(); } });
      input.addEventListener('change', saveToURL);
    });

    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function switchMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.unit-btn[data-mode]').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
    document.getElementById('historical-inputs').classList.toggle('hidden', mode !== 'historical');
    document.getElementById('projection-inputs').classList.toggle('hidden', mode !== 'projection');
  }

  function calculateResults() {
    const amount = getValue('amount');
    if (amount <= 0) { showError('Please enter a valid dollar amount.'); return; }

    saveToURL();

    if (currentMode === 'historical') {
      calculateHistorical(amount);
    } else {
      calculateProjection(amount);
    }
  }

  function calculateHistorical(amount) {
    const startYear = parseInt(document.getElementById('start-year').value);
    const endYear = parseInt(document.getElementById('end-year').value);

    if (!CPI_DATA[startYear] || !CPI_DATA[endYear]) { showError('Invalid year selection.'); return; }

    const startCPI = CPI_DATA[startYear];
    const endCPI = CPI_DATA[endYear];
    const inflationFactor = endCPI / startCPI;
    const equivalentAmount = amount * inflationFactor;
    const totalInflation = ((inflationFactor - 1) * 100);
    const years = Math.abs(endYear - startYear);
    const avgAnnualRate = years > 0 ? (Math.pow(inflationFactor, 1 / years) - 1) * 100 : 0;
    const purchasingPowerLost = ((1 - (1 / inflationFactor)) * 100);

    displayHistoricalResults({
      amount, equivalentAmount, startYear, endYear, totalInflation, avgAnnualRate, purchasingPowerLost, years, inflationFactor
    });
  }

  function calculateProjection(amount) {
    const rate = getValue('inflation-rate');
    const years = getValue('projection-years');

    if (years <= 0) { showError('Please enter a valid number of years.'); return; }

    const yearlyData = [];
    let current = amount;
    for (let i = 1; i <= years; i++) {
      current = current * (1 + rate / 100);
      yearlyData.push({ year: i, amount: current, purchasingPower: amount / Math.pow(1 + rate / 100, i) });
    }

    const finalAmount = amount * Math.pow(1 + rate / 100, years);
    const totalInflation = ((finalAmount / amount) - 1) * 100;
    const purchasingPowerLost = ((1 - (amount / finalAmount)) * 100);

    displayProjectionResults({
      amount, finalAmount, rate, years, totalInflation, purchasingPowerLost, yearlyData
    });
  }

  function displayHistoricalResults(data) {
    const resultDiv = document.getElementById('inflation-result');
    if (!resultDiv) return;

    const direction = data.endYear > data.startYear ? 'equivalent to' : 'was equivalent to';

    resultDiv.innerHTML = `
      <h3>📈 Inflation Results</h3>

      <div class="age-hero">
        <div style="font-size: 1.2rem; color: var(--color-gray-dark);">${formatCurrency(data.amount)} in ${data.startYear}</div>
        <div style="font-size: 1.5rem; margin: 0.5rem 0;">=</div>
        <div class="age-big">${formatCurrency(data.equivalentAmount)} <span class="age-unit">in ${data.endYear}</span></div>
      </div>

      <div class="margin-cards">
        <div class="margin-card">
          <div class="margin-card-icon">📈</div>
          <div class="margin-card-value">${data.totalInflation.toFixed(1)}%</div>
          <div class="margin-card-label">Total Inflation</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📅</div>
          <div class="margin-card-value">${data.avgAnnualRate.toFixed(2)}%</div>
          <div class="margin-card-label">Avg Annual Rate</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">💸</div>
          <div class="margin-card-value">${data.purchasingPowerLost.toFixed(1)}%</div>
          <div class="margin-card-label">Purchasing Power Lost</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">⏱️</div>
          <div class="margin-card-value">${data.years}</div>
          <div class="margin-card-label">Years</div>
        </div>
      </div>

      <div class="visual-bar-section">
        <h4>💵 Purchasing Power Erosion</h4>
        <p style="color: var(--color-gray-dark); font-size: 0.875rem;">What ${formatCurrency(data.amount)} from ${data.startYear} buys today</p>
        <div class="visual-bar-container">
          <div class="visual-bar-fill" style="width: ${Math.max(5, 100 - data.purchasingPowerLost)}%; background: linear-gradient(90deg, #10b981, #34d399);"></div>
        </div>
        <small>${formatCurrency(data.amount)} in ${data.startYear} only buys ${formatCurrency(data.amount / data.inflationFactor)} worth of goods in ${data.endYear} terms</small>
      </div>

      <div class="insights-grid">
        <div class="insight-card insight-info">
          <div class="insight-icon">💡</div>
          <div class="insight-content">
            <h5>What This Means</h5>
            <p>To maintain the same purchasing power as ${formatCurrency(data.amount)} in ${data.startYear}, you'd need ${formatCurrency(data.equivalentAmount)} in ${data.endYear}.</p>
          </div>
        </div>
        <div class="insight-card insight-warning">
          <div class="insight-icon">⚠️</div>
          <div class="insight-content">
            <h5>Investment Implication</h5>
            <p>Your investments need to return at least ${data.avgAnnualRate.toFixed(1)}% per year just to keep up with inflation.</p>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function displayProjectionResults(data) {
    const resultDiv = document.getElementById('inflation-result');
    if (!resultDiv) return;

    const displayYears = data.yearlyData.filter((_, i) => {
      if (data.years <= 10) return true;
      if (data.years <= 30) return (i + 1) % 5 === 0 || i === 0;
      return (i + 1) % 10 === 0 || i === 0;
    });

    resultDiv.innerHTML = `
      <h3>🔮 Inflation Projection</h3>

      <div class="age-hero">
        <div style="font-size: 1.2rem; color: var(--color-gray-dark);">${formatCurrency(data.amount)} today will need to be</div>
        <div class="age-big">${formatCurrency(data.finalAmount)} <span class="age-unit">in ${data.years} years</span></div>
        <div style="color: var(--color-gray-dark); margin-top: 0.5rem;">at ${data.rate}% annual inflation</div>
      </div>

      <div class="margin-cards">
        <div class="margin-card">
          <div class="margin-card-icon">📈</div>
          <div class="margin-card-value">${data.totalInflation.toFixed(1)}%</div>
          <div class="margin-card-label">Total Inflation</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">💸</div>
          <div class="margin-card-value">${data.purchasingPowerLost.toFixed(1)}%</div>
          <div class="margin-card-label">Purchasing Power Lost</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📊</div>
          <div class="margin-card-value">${data.rate}%</div>
          <div class="margin-card-label">Annual Rate</div>
        </div>
      </div>

      <div class="profit-breakdown">
        <h4>📅 Year-by-Year Projection</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Year</th><th>Equivalent Amount Needed</th><th>Today's ${formatCurrency(data.amount)} Buys</th></tr></thead>
            <tbody>
              ${displayYears.map(d => `
                <tr>
                  <td>Year ${d.year}</td>
                  <td><strong>${formatCurrency(d.amount)}</strong></td>
                  <td>${formatCurrency(d.purchasingPower)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    const resultDiv = document.getElementById('inflation-result');
    if (resultDiv) { resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`; resultDiv.classList.remove('hidden'); }
  }

  function getValue(id) { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }
  function setValue(id, value) { const el = document.getElementById(id); if (el) el.value = value; }
  function formatCurrency(amount) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount); }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'Inflation Calculator', url }).catch(() => copyToClipboard(url)); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-calculation');
      if (btn) { const orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(() => { btn.innerHTML = orig; }, 2000); }
    }).catch(() => {});
  }
})();
