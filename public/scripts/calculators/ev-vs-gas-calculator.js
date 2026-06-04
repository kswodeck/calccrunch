(() => {
  // State management
  let calculatorState = {
    // EV inputs
    evPurchasePrice: 45000,
    evFederalCredit: 7500,
    evStateIncentive: 2000,
    evBatterySize: 75,
    evEfficiency: 3.5,
    evHomeElectricRate: 0.14,
    evHomeChargingPct: 80,
    evPublicChargingRate: 0.35,

    // Gas car inputs
    gasPurchasePrice: 35000,
    gasMpg: 30,
    gasPrice: 3.50,
    gasPriceIncrease: 3,

    // Shared inputs
    annualMiles: 12000,
    ownershipYears: 7,
    electricityRateIncrease: 2,

    // Insurance & maintenance
    evInsurance: 1800,
    gasInsurance: 1500,
    evMaintenance: 500,
    gasMaintenance: 1200,

    // Depreciation
    evDepreciation: 15,
    gasDepreciation: 15,

    // Financing
    evDownPayment: 20,
    gasDownPayment: 20,
    evLoanTerm: 60,
    gasLoanTerm: 60,
    evInterestRate: 5.5,
    gasInterestRate: 6.5
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', initializeCalculator);

  function initializeCalculator() {
    loadStateFromURL();
    attachEventListeners();

    // Check if we have valid state from URL
    if (hasValidInputs()) {
      calculateResults();
    }
  }

  function attachEventListeners() {
    // EV inputs
    document.getElementById('ev-purchase-price').addEventListener('input', (e) => updateState('evPurchasePrice', parseFloat(e.target.value) || 0));
    document.getElementById('ev-federal-credit').addEventListener('input', (e) => updateState('evFederalCredit', parseFloat(e.target.value) || 0));
    document.getElementById('ev-state-incentive').addEventListener('input', (e) => updateState('evStateIncentive', parseFloat(e.target.value) || 0));
    document.getElementById('ev-battery-size').addEventListener('input', (e) => updateState('evBatterySize', parseFloat(e.target.value) || 0));
    document.getElementById('ev-efficiency').addEventListener('input', (e) => updateState('evEfficiency', parseFloat(e.target.value) || 0));
    document.getElementById('ev-home-electric-rate').addEventListener('input', (e) => updateState('evHomeElectricRate', parseFloat(e.target.value) || 0));
    document.getElementById('ev-home-charging-pct').addEventListener('input', (e) => updateState('evHomeChargingPct', parseFloat(e.target.value) || 0));
    document.getElementById('ev-public-charging-rate').addEventListener('input', (e) => updateState('evPublicChargingRate', parseFloat(e.target.value) || 0));

    // Gas car inputs
    document.getElementById('gas-purchase-price').addEventListener('input', (e) => updateState('gasPurchasePrice', parseFloat(e.target.value) || 0));
    document.getElementById('gas-mpg').addEventListener('input', (e) => updateState('gasMpg', parseFloat(e.target.value) || 0));
    document.getElementById('gas-price').addEventListener('input', (e) => updateState('gasPrice', parseFloat(e.target.value) || 0));
    document.getElementById('gas-price-increase').addEventListener('input', (e) => updateState('gasPriceIncrease', parseFloat(e.target.value) || 0));

    // Shared inputs
    document.getElementById('annual-miles').addEventListener('input', (e) => updateState('annualMiles', parseFloat(e.target.value) || 0));
    document.getElementById('ownership-years').addEventListener('input', (e) => updateState('ownershipYears', parseInt(e.target.value) || 7));
    document.getElementById('electricity-rate-increase').addEventListener('input', (e) => updateState('electricityRateIncrease', parseFloat(e.target.value) || 0));

    // Insurance & maintenance
    document.getElementById('ev-insurance').addEventListener('input', (e) => updateState('evInsurance', parseFloat(e.target.value) || 0));
    document.getElementById('gas-insurance').addEventListener('input', (e) => updateState('gasInsurance', parseFloat(e.target.value) || 0));
    document.getElementById('ev-maintenance').addEventListener('input', (e) => updateState('evMaintenance', parseFloat(e.target.value) || 0));
    document.getElementById('gas-maintenance').addEventListener('input', (e) => updateState('gasMaintenance', parseFloat(e.target.value) || 0));

    // Depreciation
    document.getElementById('ev-depreciation').addEventListener('input', (e) => updateState('evDepreciation', parseFloat(e.target.value) || 0));
    document.getElementById('gas-depreciation').addEventListener('input', (e) => updateState('gasDepreciation', parseFloat(e.target.value) || 0));

    // Financing
    document.getElementById('ev-down-payment').addEventListener('input', (e) => updateState('evDownPayment', parseFloat(e.target.value) || 0));
    document.getElementById('gas-down-payment').addEventListener('input', (e) => updateState('gasDownPayment', parseFloat(e.target.value) || 0));
    document.getElementById('ev-loan-term').addEventListener('change', (e) => updateState('evLoanTerm', parseInt(e.target.value)));
    document.getElementById('gas-loan-term').addEventListener('change', (e) => updateState('gasLoanTerm', parseInt(e.target.value)));
    document.getElementById('ev-interest-rate').addEventListener('input', (e) => updateState('evInterestRate', parseFloat(e.target.value) || 0));
    document.getElementById('gas-interest-rate').addEventListener('input', (e) => updateState('gasInterestRate', parseFloat(e.target.value) || 0));

    // Calculate button
    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Share button
    document.getElementById('share-calculation').addEventListener('click', shareCalculation);

    // Auto-calculate on input with debouncing
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      input.addEventListener('input', debounce(() => {
        if (hasValidInputs()) {
          calculateResults();
        }
      }, 500));
    });
  }

  function updateState(key, value) {
    calculatorState[key] = value;
    saveStateToURL();
  }

  function hasValidInputs() {
    return calculatorState.evPurchasePrice > 0 &&
           calculatorState.gasPurchasePrice > 0 &&
           calculatorState.evEfficiency > 0 &&
           calculatorState.gasMpg > 0 &&
           calculatorState.gasPrice > 0 &&
           calculatorState.annualMiles > 0 &&
           calculatorState.ownershipYears > 0;
  }

  function calculateResults() {
    if (!hasValidInputs()) {
      alert('Please fill in all required fields');
      return;
    }

    const results = performCalculations();
    displayResults(results);
  }

  function performCalculations() {
    const {
      evPurchasePrice, evFederalCredit, evStateIncentive, evBatterySize,
      evEfficiency, evHomeElectricRate, evHomeChargingPct, evPublicChargingRate,
      gasPurchasePrice, gasMpg, gasPrice, gasPriceIncrease,
      annualMiles, ownershipYears, electricityRateIncrease,
      evInsurance, gasInsurance, evMaintenance, gasMaintenance,
      evDepreciation, gasDepreciation,
      evDownPayment, gasDownPayment, evLoanTerm, gasLoanTerm,
      evInterestRate, gasInterestRate
    } = calculatorState;

    // Effective EV purchase price after incentives
    const evEffectivePrice = evPurchasePrice - evFederalCredit - evStateIncentive;

    // Financing calculations
    const evDownPaymentAmount = evPurchasePrice * (evDownPayment / 100);
    const evLoanAmount = evPurchasePrice - evDownPaymentAmount;
    const evMonthlyRate = evInterestRate / 100 / 12;
    const evNumPayments = evLoanTerm;
    const evMonthlyPayment = evLoanAmount > 0 && evMonthlyRate > 0
      ? evLoanAmount * (evMonthlyRate * Math.pow(1 + evMonthlyRate, evNumPayments)) / (Math.pow(1 + evMonthlyRate, evNumPayments) - 1)
      : evLoanAmount / evNumPayments;

    const gasDownPaymentAmount = gasPurchasePrice * (gasDownPayment / 100);
    const gasLoanAmount = gasPurchasePrice - gasDownPaymentAmount;
    const gasMonthlyRate = gasInterestRate / 100 / 12;
    const gasNumPayments = gasLoanTerm;
    const gasMonthlyPayment = gasLoanAmount > 0 && gasMonthlyRate > 0
      ? gasLoanAmount * (gasMonthlyRate * Math.pow(1 + gasMonthlyRate, gasNumPayments)) / (Math.pow(1 + gasMonthlyRate, gasNumPayments) - 1)
      : gasLoanAmount / gasNumPayments;

    // Total financing costs
    const evTotalFinancingCost = evMonthlyPayment * evNumPayments;
    const evTotalInterest = evTotalFinancingCost - evLoanAmount;
    const gasTotalFinancingCost = gasMonthlyPayment * gasNumPayments;
    const gasTotalInterest = gasTotalFinancingCost - gasLoanAmount;

    // Year-by-year calculations
    const yearlyData = [];
    let evCumulativeCost = 0;
    let gasCumulativeCost = 0;
    let currentGasPrice = gasPrice;
    let currentElectricRate = evHomeElectricRate;
    let currentPublicRate = evPublicChargingRate;
    let evRemainingValue = evPurchasePrice;
    let gasRemainingValue = gasPurchasePrice;
    let breakevenYear = null;
    let prevDifference = null;

    // Upfront costs
    // EV effective cost accounts for credits applied against purchase
    const evUpfrontCost = evEffectivePrice;
    const gasUpfrontCost = gasPurchasePrice;

    let totalEvFuel = 0;
    let totalGasFuel = 0;
    let totalEvInsurance = 0;
    let totalGasInsurance = 0;
    let totalEvMaintenance = 0;
    let totalGasMaintenance = 0;
    let totalEvInterestPaid = 0;
    let totalGasInterestPaid = 0;

    for (let year = 1; year <= ownershipYears; year++) {
      // Energy/fuel costs for this year
      const kWhNeeded = annualMiles / evEfficiency;
      const homeChargingFraction = evHomeChargingPct / 100;
      const publicChargingFraction = 1 - homeChargingFraction;
      const evYearlyFuel = (kWhNeeded * homeChargingFraction * currentElectricRate) +
                           (kWhNeeded * publicChargingFraction * currentPublicRate);

      const gallonsNeeded = annualMiles / gasMpg;
      const gasYearlyFuel = gallonsNeeded * currentGasPrice;

      totalEvFuel += evYearlyFuel;
      totalGasFuel += gasYearlyFuel;
      totalEvInsurance += evInsurance;
      totalGasInsurance += gasInsurance;
      totalEvMaintenance += evMaintenance;
      totalGasMaintenance += gasMaintenance;

      // Financing interest for this year (simplified: spread total interest evenly over loan term in years)
      const evLoanYears = evLoanTerm / 12;
      const gasLoanYears = gasLoanTerm / 12;
      const evYearInterest = year <= evLoanYears ? evTotalInterest / evLoanYears : 0;
      const gasYearInterest = year <= gasLoanYears ? gasTotalInterest / gasLoanYears : 0;
      totalEvInterestPaid += evYearInterest;
      totalGasInterestPaid += gasYearInterest;

      // Cumulative costs (purchase + fuel + insurance + maintenance + interest)
      evCumulativeCost = evUpfrontCost + totalEvFuel + totalEvInsurance + totalEvMaintenance + totalEvInterestPaid;
      gasCumulativeCost = gasUpfrontCost + totalGasFuel + totalGasInsurance + totalGasMaintenance + totalGasInterestPaid;

      // Depreciation (declining balance method)
      evRemainingValue = evPurchasePrice * Math.pow(1 - evDepreciation / 100, year);
      gasRemainingValue = gasPurchasePrice * Math.pow(1 - gasDepreciation / 100, year);

      // Net cost = cumulative costs - residual value
      const evNetCost = evCumulativeCost - evRemainingValue;
      const gasNetCost = gasCumulativeCost - gasRemainingValue;

      const difference = evNetCost - gasNetCost;

      // Detect breakeven (crossover point)
      if (prevDifference !== null && breakevenYear === null) {
        if ((prevDifference > 0 && difference <= 0) || (prevDifference < 0 && difference >= 0)) {
          breakevenYear = year;
        }
      }
      prevDifference = difference;

      yearlyData.push({
        year,
        evCumulativeCost,
        gasCumulativeCost,
        evNetCost,
        gasNetCost,
        evFuelCost: evYearlyFuel,
        gasFuelCost: gasYearlyFuel,
        evResidualValue: evRemainingValue,
        gasResidualValue: gasRemainingValue,
        difference
      });

      // Increase rates for next year
      currentGasPrice *= (1 + gasPriceIncrease / 100);
      currentElectricRate *= (1 + electricityRateIncrease / 100);
      currentPublicRate *= (1 + electricityRateIncrease / 100);
    }

    // Final results
    const finalYear = yearlyData[ownershipYears - 1];
    const evTotalCost = finalYear.evNetCost;
    const gasTotalCost = finalYear.gasNetCost;
    const winner = evTotalCost < gasTotalCost ? 'ev' : 'gas';
    const totalSavings = Math.abs(evTotalCost - gasTotalCost);

    // Cost per mile
    const totalMiles = annualMiles * ownershipYears;
    const evCostPerMile = evTotalCost / totalMiles;
    const gasCostPerMile = gasTotalCost / totalMiles;

    // Monthly cost comparison (average over ownership period)
    const totalMonths = ownershipYears * 12;
    const evMonthlyTotal = evTotalCost / totalMonths;
    const gasMonthlyTotal = gasTotalCost / totalMonths;

    // First year fuel costs (for display)
    const firstYearEvFuel = yearlyData[0].evFuelCost;
    const firstYearGasFuel = yearlyData[0].gasFuelCost;

    // CO2 emissions comparison
    // Average gas car: ~8,887 grams CO2 per gallon burned
    // Average grid electricity: ~0.855 lbs CO2 per kWh (US average)
    const gasAnnualCO2Lbs = (annualMiles / gasMpg) * 19.6; // 19.6 lbs CO2 per gallon
    const evAnnualCO2Lbs = (annualMiles / evEfficiency) * 0.855; // lbs CO2 per kWh (US average grid)
    const co2SavingsPerYear = gasAnnualCO2Lbs - evAnnualCO2Lbs;
    const co2SavingsTotal = co2SavingsPerYear * ownershipYears;

    return {
      winner,
      totalSavings,
      evTotalCost,
      gasTotalCost,
      evUpfrontCost,
      gasUpfrontCost,
      totalEvFuel,
      totalGasFuel,
      totalEvInsurance,
      totalGasInsurance,
      totalEvMaintenance,
      totalGasMaintenance,
      totalEvInterestPaid: totalEvInterestPaid,
      totalGasInterestPaid: totalGasInterestPaid,
      evResidualValue: finalYear.evResidualValue,
      gasResidualValue: finalYear.gasResidualValue,
      evCostPerMile,
      gasCostPerMile,
      evMonthlyTotal,
      gasMonthlyTotal,
      evMonthlyPayment,
      gasMonthlyPayment,
      firstYearEvFuel,
      firstYearGasFuel,
      breakevenYear,
      yearlyData,
      gasAnnualCO2Lbs,
      evAnnualCO2Lbs,
      co2SavingsPerYear,
      co2SavingsTotal,
      evFederalCredit,
      evStateIncentive
    };
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('ev-vs-gas-result');

    const winnerColor = results.winner === 'ev' ? '#10b981' : '#ea580c';
    const winnerText = results.winner === 'ev' ? 'Electric Vehicle' : 'Gas Car';
    const loserText = results.winner === 'ev' ? 'gas car' : 'EV';

    let breakevenText = '';
    if (results.breakevenYear) {
      breakevenText = `<p style="margin-top: 1rem; font-size: 1.1rem;">
        <strong>Break-Even Point:</strong> Year ${results.breakevenYear} — this is when the ${winnerText.toLowerCase()} becomes the cheaper option.
      </p>`;
    }

    // Find max cumulative cost for chart scaling
    const maxCost = Math.max(
      ...results.yearlyData.map(d => Math.max(d.evNetCost, d.gasNetCost))
    );

    resultDiv.innerHTML = `
      <div class="result-container">
        <div class="result-summary" style="background: linear-gradient(135deg, ${winnerColor}22 0%, ${winnerColor}11 100%); border-left: 4px solid ${winnerColor};">
          <h2 class="result-title">
            The ${winnerText} Saves ${formatCurrency(results.totalSavings)} Over ${calculatorState.ownershipYears} Years
          </h2>
          <p class="result-subtitle" style="margin-top: 1rem;">
            Over ${calculatorState.ownershipYears} years and ${formatNumber(calculatorState.annualMiles * calculatorState.ownershipYears)} miles,
            the ${winnerText.toLowerCase()} costs ${formatCurrency(results.totalSavings)} less than the ${loserText}.
          </p>
          ${breakevenText}
        </div>

        <div class="monthly-comparison">
          <div class="monthly-card ev-card">
            <div class="monthly-label">EV Average Monthly Cost</div>
            <div class="monthly-amount">${formatCurrency(results.evMonthlyTotal)}</div>
            <div class="monthly-label">${formatCurrency(results.evCostPerMile, 2)}/mile</div>
          </div>
          <div class="monthly-card gas-card">
            <div class="monthly-label">Gas Car Average Monthly Cost</div>
            <div class="monthly-amount">${formatCurrency(results.gasMonthlyTotal)}</div>
            <div class="monthly-label">${formatCurrency(results.gasCostPerMile, 2)}/mile</div>
          </div>
        </div>

        <div class="comparison-visualization">
          <h3 style="text-align: center; margin-bottom: 1.5rem;">Total Cost of Ownership Comparison</h3>
          <div class="comparison-bars">
            <div class="comparison-bar">
              <div class="bar-label">Electric Vehicle</div>
              <div class="bar-container">
                <div class="bar-fill ev" style="height: ${results.evTotalCost > results.gasTotalCost ? '100%' : (results.evTotalCost / results.gasTotalCost * 100) + '%'}">
                  <div class="bar-value">${formatCurrency(results.evTotalCost)}</div>
                </div>
              </div>
              ${results.winner === 'ev' ? '<div class="winner-badge">Better Value</div>' : ''}
            </div>
            <div class="comparison-bar">
              <div class="bar-label">Gas Car</div>
              <div class="bar-container">
                <div class="bar-fill gas" style="height: ${results.gasTotalCost > results.evTotalCost ? '100%' : (results.gasTotalCost / results.evTotalCost * 100) + '%'}">
                  <div class="bar-value">${formatCurrency(results.gasTotalCost)}</div>
                </div>
              </div>
              ${results.winner === 'gas' ? '<div class="winner-badge">Better Value</div>' : ''}
            </div>
          </div>
        </div>

        <div class="cost-breakdown-grid">
          <div class="breakdown-section">
            <div class="breakdown-title">EV Cost Breakdown</div>
            <div class="breakdown-item">
              <span>Purchase Price:</span>
              <span>${formatCurrency(calculatorState.evPurchasePrice)}</span>
            </div>
            ${results.evFederalCredit > 0 ? `
            <div class="breakdown-item">
              <span>Federal Tax Credit:</span>
              <span style="color: var(--color-success);">-${formatCurrency(results.evFederalCredit)}</span>
            </div>` : ''}
            ${results.evStateIncentive > 0 ? `
            <div class="breakdown-item">
              <span>State/Local Incentive:</span>
              <span style="color: var(--color-success);">-${formatCurrency(results.evStateIncentive)}</span>
            </div>` : ''}
            <div class="breakdown-item">
              <span>Effective Price:</span>
              <span><strong>${formatCurrency(results.evUpfrontCost)}</strong></span>
            </div>
            <div class="breakdown-item">
              <span>Total Energy Cost:</span>
              <span>${formatCurrency(results.totalEvFuel)}</span>
            </div>
            <div class="breakdown-item">
              <span>Total Insurance:</span>
              <span>${formatCurrency(results.totalEvInsurance)}</span>
            </div>
            <div class="breakdown-item">
              <span>Total Maintenance:</span>
              <span>${formatCurrency(results.totalEvMaintenance)}</span>
            </div>
            ${results.totalEvInterestPaid > 0 ? `
            <div class="breakdown-item">
              <span>Loan Interest:</span>
              <span>${formatCurrency(results.totalEvInterestPaid)}</span>
            </div>` : ''}
            <div class="breakdown-item">
              <span>Residual Value:</span>
              <span style="color: var(--color-success);">-${formatCurrency(results.evResidualValue)}</span>
            </div>
            <div class="breakdown-total breakdown-item">
              <span>Net Total Cost:</span>
              <span>${formatCurrency(results.evTotalCost)}</span>
            </div>
          </div>

          <div class="breakdown-section">
            <div class="breakdown-title">Gas Car Cost Breakdown</div>
            <div class="breakdown-item">
              <span>Purchase Price:</span>
              <span>${formatCurrency(calculatorState.gasPurchasePrice)}</span>
            </div>
            <div class="breakdown-item">
              <span>Total Fuel Cost:</span>
              <span>${formatCurrency(results.totalGasFuel)}</span>
            </div>
            <div class="breakdown-item">
              <span>Total Insurance:</span>
              <span>${formatCurrency(results.totalGasInsurance)}</span>
            </div>
            <div class="breakdown-item">
              <span>Total Maintenance:</span>
              <span>${formatCurrency(results.totalGasMaintenance)}</span>
            </div>
            ${results.totalGasInterestPaid > 0 ? `
            <div class="breakdown-item">
              <span>Loan Interest:</span>
              <span>${formatCurrency(results.totalGasInterestPaid)}</span>
            </div>` : ''}
            <div class="breakdown-item">
              <span>Residual Value:</span>
              <span style="color: var(--color-success);">-${formatCurrency(results.gasResidualValue)}</span>
            </div>
            <div class="breakdown-total breakdown-item">
              <span>Net Total Cost:</span>
              <span>${formatCurrency(results.gasTotalCost)}</span>
            </div>
          </div>
        </div>

        <div class="cumulative-chart">
          <div class="chart-title">Cumulative Cost Over Time</div>
          <div class="chart-bars">
            ${results.yearlyData.map(data => `
              <div class="chart-bar-group">
                <div class="chart-bar ev-bar" style="height: ${Math.max(5, (data.evNetCost / maxCost) * 100)}%" title="EV Year ${data.year}: ${formatCurrency(data.evNetCost)}"></div>
                <div class="chart-bar gas-bar" style="height: ${Math.max(5, (data.gasNetCost / maxCost) * 100)}%" title="Gas Year ${data.year}: ${formatCurrency(data.gasNetCost)}"></div>
              </div>
            `).join('')}
          </div>
          <div class="chart-labels">
            ${results.yearlyData.map(data => `
              <div class="chart-label">Yr ${data.year}</div>
            `).join('')}
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-swatch ev"></div>
              <span>Electric Vehicle</span>
            </div>
            <div class="legend-item">
              <div class="legend-swatch gas"></div>
              <span>Gas Car</span>
            </div>
          </div>
        </div>

        <div class="timeline-chart">
          <div class="chart-title">Year-by-Year Cost Comparison</div>
          <div class="scrollable-container" style="overflow-x: auto;">
            <table class="year-comparison-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>EV Net Cost</th>
                  <th>Gas Net Cost</th>
                  <th>Annual EV Fuel</th>
                  <th>Annual Gas Fuel</th>
                  <th>Savings (EV vs Gas)</th>
                </tr>
              </thead>
              <tbody>
                ${results.yearlyData.map(data => `
                  <tr>
                    <td><strong>Year ${data.year}</strong></td>
                    <td class="${data.evNetCost < data.gasNetCost ? 'better-option' : ''}">${formatCurrency(data.evNetCost)}</td>
                    <td class="${data.gasNetCost < data.evNetCost ? 'better-option' : ''}">${formatCurrency(data.gasNetCost)}</td>
                    <td>${formatCurrency(data.evFuelCost)}</td>
                    <td>${formatCurrency(data.gasFuelCost)}</td>
                    <td class="${data.difference < 0 ? 'better-option' : 'worse-option'}">${data.difference < 0 ? '+' : '-'}${formatCurrency(Math.abs(data.difference))}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="environmental-section">
          <div class="chart-title">Environmental Impact Comparison</div>
          <div class="emissions-comparison">
            <div class="emissions-item">
              <div style="font-size: 0.875rem; color: var(--color-text-secondary);">EV Annual CO2</div>
              <div class="emissions-value" style="color: #059669;">${formatNumber(Math.round(results.evAnnualCO2Lbs))} lbs</div>
              <div style="font-size: 0.75rem; color: var(--color-text-secondary);">From grid electricity</div>
            </div>
            <div class="emissions-item">
              <div style="font-size: 0.875rem; color: var(--color-text-secondary);">Gas Car Annual CO2</div>
              <div class="emissions-value" style="color: #ea580c;">${formatNumber(Math.round(results.gasAnnualCO2Lbs))} lbs</div>
              <div style="font-size: 0.75rem; color: var(--color-text-secondary);">From tailpipe emissions</div>
            </div>
          </div>
          <div style="text-align: center; margin-top: 1rem; padding: 1rem; background: white; border-radius: 8px;">
            <strong>EV saves ${formatNumber(Math.round(results.co2SavingsTotal))} lbs of CO2</strong> over ${calculatorState.ownershipYears} years
            <br><small style="color: var(--color-text-secondary);">(${formatNumber(Math.round(results.co2SavingsPerYear))} lbs/year — equivalent to planting ~${Math.round(results.co2SavingsPerYear / 48)} trees)</small>
          </div>
        </div>

        <div class="info-box" style="margin-top: 2rem;">
          <h4>Key Insights</h4>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Annual fuel savings with EV: <strong>${formatCurrency(results.firstYearGasFuel - results.firstYearEvFuel)}/year</strong> (first year)</li>
            <li>EV cost per mile: <strong>${formatCurrency(results.evCostPerMile, 2)}</strong> vs Gas: <strong>${formatCurrency(results.gasCostPerMile, 2)}</strong></li>
            <li>EV maintenance savings: <strong>${formatCurrency(results.totalGasMaintenance - results.totalEvMaintenance)}</strong> over ${calculatorState.ownershipYears} years</li>
            <li>EV residual value: <strong>${formatCurrency(results.evResidualValue)}</strong> (${((results.evResidualValue / calculatorState.evPurchasePrice) * 100).toFixed(1)}% of purchase price)</li>
            <li>Gas car residual value: <strong>${formatCurrency(results.gasResidualValue)}</strong> (${((results.gasResidualValue / calculatorState.gasPurchasePrice) * 100).toFixed(1)}% of purchase price)</li>
            ${results.breakevenYear ? `<li>The EV breaks even with the gas car at <strong>year ${results.breakevenYear}</strong></li>` : `<li>The ${results.winner === 'ev' ? 'EV is cheaper from day one' : 'gas car remains cheaper throughout the ownership period'}</li>`}
          </ul>
        </div>

        <div class="action-cards" style="display: flex; gap: 1rem; margin-top: 2rem;">
          <button onclick="window.print()" class="btn btn-secondary">
            Print Report
          </button>
          <button onclick="location.reload()" class="btn btn-secondary">
            Reset Calculator
          </button>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function formatCurrency(amount, decimals) {
    const options = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals !== undefined ? decimals : 0,
      maximumFractionDigits: decimals !== undefined ? decimals : 0
    };
    return new Intl.NumberFormat('en-US', options).format(amount);
  }

  function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
  }

  function saveStateToURL() {
    const params = new URLSearchParams();

    Object.keys(calculatorState).forEach(key => {
      if (calculatorState[key] !== null && calculatorState[key] !== '') {
        params.set(key, calculatorState[key]);
      }
    });

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({}, '', newURL);
  }

  function loadStateFromURL() {
    const params = new URLSearchParams(window.location.search);

    params.forEach((value, key) => {
      if (key in calculatorState) {
        if (key === 'ownershipYears' || key === 'evLoanTerm' || key === 'gasLoanTerm') {
          calculatorState[key] = parseInt(value) || calculatorState[key];
        } else {
          calculatorState[key] = parseFloat(value) || calculatorState[key];
        }
      }
    });

    // Update form inputs from state
    const fieldMap = {
      evPurchasePrice: 'ev-purchase-price',
      evFederalCredit: 'ev-federal-credit',
      evStateIncentive: 'ev-state-incentive',
      evBatterySize: 'ev-battery-size',
      evEfficiency: 'ev-efficiency',
      evHomeElectricRate: 'ev-home-electric-rate',
      evHomeChargingPct: 'ev-home-charging-pct',
      evPublicChargingRate: 'ev-public-charging-rate',
      gasPurchasePrice: 'gas-purchase-price',
      gasMpg: 'gas-mpg',
      gasPrice: 'gas-price',
      gasPriceIncrease: 'gas-price-increase',
      annualMiles: 'annual-miles',
      ownershipYears: 'ownership-years',
      electricityRateIncrease: 'electricity-rate-increase',
      evInsurance: 'ev-insurance',
      gasInsurance: 'gas-insurance',
      evMaintenance: 'ev-maintenance',
      gasMaintenance: 'gas-maintenance',
      evDepreciation: 'ev-depreciation',
      gasDepreciation: 'gas-depreciation',
      evDownPayment: 'ev-down-payment',
      gasDownPayment: 'gas-down-payment',
      evLoanTerm: 'ev-loan-term',
      gasLoanTerm: 'gas-loan-term',
      evInterestRate: 'ev-interest-rate',
      gasInterestRate: 'gas-interest-rate'
    };

    Object.keys(fieldMap).forEach(stateKey => {
      const element = document.getElementById(fieldMap[stateKey]);
      if (element) {
        element.value = calculatorState[stateKey];
      }
    });
  }

  async function shareCalculation() {
    const shareData = {
      title: 'EV vs Gas Car Cost Calculator',
      text: `EV vs Gas comparison: The ${calculatorState.winner === 'ev' ? 'EV' : 'gas car'} saves money over ${calculatorState.ownershipYears} years.`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);

        // Show success message
        const button = document.getElementById('share-calculation');
        const originalText = button.innerHTML;
        button.innerHTML = '&#10003; Link Copied!';
        button.style.background = '#10b981';
        button.style.color = 'white';

        setTimeout(() => {
          button.innerHTML = originalText;
          button.style.background = '';
          button.style.color = '';
        }, 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
})();
