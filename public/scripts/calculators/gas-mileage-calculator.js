// Gas Mileage Calculator - Calculate MPG, trip costs, and compare vehicles
(function() {
  'use strict';

  const DEFAULT_VALUES = {
    mode: 'basic',
    unitSystem: 'us',
    distanceMethod: 'total',
    annualMiles: 12000,
    gasPrice: 3.50,
    compareDistance: 12000
  };

  const CO2_PER_GALLON = 19.6; // lbs of CO2 per gallon of gasoline

  // State
  let state = {
    mode: DEFAULT_VALUES.mode,
    vehicles: [],
    vehicleCounter: 0,
    fuelLog: [],
    fuelLogCounter: 0
  };

  let elements = {};

  document.addEventListener('DOMContentLoaded', function() {
    cacheElements();
    loadFromURL();
    attachEventListeners();
    addDefaultVehicles();
  });

  function cacheElements() {
    elements = {
      calculateBtn: document.getElementById('calculate-btn'),
      clearBtn: document.getElementById('clear-btn'),
      shareBtn: document.getElementById('share-calculation'),
      resultDiv: document.getElementById('gas-mileage-result'),
      distanceMethod: document.getElementById('distance-method'),
      unitSystem: document.getElementById('unit-system'),
      totalDistanceRow: document.getElementById('total-distance-row'),
      odometerRow: document.getElementById('odometer-row'),
      vehicleList: document.getElementById('vehicle-list'),
      addVehicleBtn: document.getElementById('add-vehicle-btn'),
      fuelLogContainer: document.getElementById('fuel-log-container'),
      addFillupBtn: document.getElementById('add-fillup-btn')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('mode')) {
      state.mode = params.get('mode');
      setMode(state.mode);
    }
    if (params.has('unit')) setValue('unit-system', params.get('unit'));
    if (params.has('method')) setValue('distance-method', params.get('method'));
    if (params.has('dist')) setValue('total-distance', params.get('dist'));
    if (params.has('odo1')) setValue('odometer-start', params.get('odo1'));
    if (params.has('odo2')) setValue('odometer-end', params.get('odo2'));
    if (params.has('fuel')) setValue('fuel-used', params.get('fuel'));
    if (params.has('price')) setValue('gas-price', params.get('price'));
    if (params.has('annual')) setValue('annual-miles', params.get('annual'));
    if (params.has('tdist')) setValue('trip-distance', params.get('tdist'));
    if (params.has('trt')) setValue('trip-roundtrip', params.get('trt'));
    if (params.has('tmpg')) setValue('trip-mpg', params.get('tmpg'));
    if (params.has('tprice')) setValue('trip-gas-price', params.get('tprice'));
    if (params.has('cdist')) setValue('compare-distance', params.get('cdist'));
    if (params.has('cprice')) setValue('compare-gas-price', params.get('cprice'));

    updateDistanceMethod();
    updateUnits();
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('mode', state.mode);

    const fields = [
      { id: 'unit-system', param: 'unit' },
      { id: 'distance-method', param: 'method' },
      { id: 'total-distance', param: 'dist' },
      { id: 'odometer-start', param: 'odo1' },
      { id: 'odometer-end', param: 'odo2' },
      { id: 'fuel-used', param: 'fuel' },
      { id: 'gas-price', param: 'price' },
      { id: 'annual-miles', param: 'annual' },
      { id: 'trip-distance', param: 'tdist' },
      { id: 'trip-roundtrip', param: 'trt' },
      { id: 'trip-mpg', param: 'tmpg' },
      { id: 'trip-gas-price', param: 'tprice' },
      { id: 'compare-distance', param: 'cdist' },
      { id: 'compare-gas-price', param: 'cprice' }
    ];

    fields.forEach(f => {
      const val = getValue(f.id);
      if (val) params.set(f.param, val);
    });

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    if (elements.calculateBtn) {
      elements.calculateBtn.addEventListener('click', () => {
        calculateResults();
        saveToURL();
        document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // Mode toggle
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setMode(btn.dataset.mode);
        saveToURL();
      });
    });

    // Distance method toggle
    if (elements.distanceMethod) {
      elements.distanceMethod.addEventListener('change', () => {
        updateDistanceMethod();
        saveToURL();
      });
    }

    // Unit system change
    if (elements.unitSystem) {
      elements.unitSystem.addEventListener('change', () => {
        updateUnits();
        saveToURL();
      });
    }

    // Add vehicle button
    if (elements.addVehicleBtn) {
      elements.addVehicleBtn.addEventListener('click', () => {
        addVehicle();
      });
    }

    // Add fill-up button
    if (elements.addFillupBtn) {
      elements.addFillupBtn.addEventListener('click', () => {
        addFuelLogEntry();
      });
    }

    if (elements.clearBtn) {
      elements.clearBtn.addEventListener('click', clearAll);
    }

    if (elements.shareBtn) {
      elements.shareBtn.addEventListener('click', shareCalculation);
    }
  }

  function setMode(mode) {
    state.mode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    document.querySelectorAll('.mode-section').forEach(section => {
      section.style.display = 'none';
    });

    document.querySelectorAll(`.${mode}-section`).forEach(section => {
      section.style.display = 'block';
    });
  }

  function updateDistanceMethod() {
    const method = getValue('distance-method');
    if (elements.totalDistanceRow) {
      elements.totalDistanceRow.style.display = method === 'total' ? 'grid' : 'none';
    }
    if (elements.odometerRow) {
      elements.odometerRow.style.display = method === 'odometer' ? 'grid' : 'none';
    }
  }

  function updateUnits() {
    const system = getValue('unit-system');
    const isUS = system === 'us';
    const distLabel = isUS ? 'miles' : 'km';
    const fuelLabel = isUS ? 'gallons' : 'liters';
    const priceLabel = isUS ? '/gal' : '/L';
    const annualLabel = isUS ? 'miles/yr' : 'km/yr';

    updateAddon('distance-addon', distLabel);
    updateAddon('odo-start-addon', distLabel);
    updateAddon('odo-end-addon', distLabel);
    updateAddon('fuel-addon', fuelLabel);
    updateAddon('price-addon', priceLabel);
    updateAddon('annual-addon', annualLabel);
    updateAddon('trip-distance-addon', distLabel);
    updateAddon('trip-price-addon', priceLabel);
    updateAddon('compare-distance-addon', annualLabel);

    const mpgAddon = document.getElementById('trip-mpg-addon');
    if (mpgAddon) {
      if (system === 'us') mpgAddon.textContent = 'MPG';
      else if (system === 'metric-l100') mpgAddon.textContent = 'L/100km';
      else mpgAddon.textContent = 'km/L';
    }
  }

  function updateAddon(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function addDefaultVehicles() {
    if (state.vehicles.length === 0) {
      addVehicle({ name: 'Vehicle 1', mpg: '' });
      addVehicle({ name: 'Vehicle 2', mpg: '' });
    }
  }

  function addVehicle(data = {}) {
    state.vehicleCounter++;
    const id = state.vehicleCounter;
    state.vehicles.push({ id });

    const row = document.createElement('div');
    row.className = 'vehicle-entry';
    row.dataset.vehicleId = id;
    row.innerHTML = `
      <div class="form-group">
        <label>Vehicle Name</label>
        <input type="text" class="form-input vehicle-name" placeholder="e.g., Honda Civic" value="${data.name || ''}">
      </div>
      <div class="form-group">
        <label>MPG</label>
        <input type="number" class="form-input vehicle-mpg" placeholder="28" min="1" max="200" step="0.1" value="${data.mpg || ''}">
      </div>
      <button type="button" class="remove-entry-btn" title="Remove">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    row.querySelector('.remove-entry-btn').addEventListener('click', () => {
      state.vehicles = state.vehicles.filter(v => v.id !== id);
      row.remove();
    });

    if (elements.vehicleList) elements.vehicleList.appendChild(row);
  }

  function addFuelLogEntry(data = {}) {
    state.fuelLogCounter++;
    const id = state.fuelLogCounter;
    state.fuelLog.push({ id });

    const row = document.createElement('div');
    row.className = 'fuel-log-entry';
    row.dataset.logId = id;
    row.innerHTML = `
      <div class="form-group">
        <label>Date</label>
        <input type="date" class="form-input log-date" value="${data.date || ''}">
      </div>
      <div class="form-group">
        <label>Miles Driven</label>
        <input type="number" class="form-input log-miles" placeholder="300" min="0" step="0.1" value="${data.miles || ''}">
      </div>
      <div class="form-group">
        <label>Gallons</label>
        <input type="number" class="form-input log-gallons" placeholder="10" min="0" step="0.01" value="${data.gallons || ''}">
      </div>
      <button type="button" class="remove-entry-btn" title="Remove">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    row.querySelector('.remove-entry-btn').addEventListener('click', () => {
      state.fuelLog = state.fuelLog.filter(l => l.id !== id);
      row.remove();
    });

    if (elements.fuelLogContainer) elements.fuelLogContainer.appendChild(row);
  }

  function calculateResults() {
    switch (state.mode) {
      case 'basic': calculateBasic(); break;
      case 'trip': calculateTrip(); break;
      case 'compare': calculateCompare(); break;
    }
  }

  function calculateBasic() {
    const unitSystem = getValue('unit-system');
    const method = getValue('distance-method');
    let distance;

    if (method === 'total') {
      distance = parseFloat(getValue('total-distance'));
    } else {
      const start = parseFloat(getValue('odometer-start'));
      const end = parseFloat(getValue('odometer-end'));
      if (!start || !end || end <= start) {
        displayError('Odometer end must be greater than start.');
        return;
      }
      distance = end - start;
    }

    const fuelUsed = parseFloat(getValue('fuel-used'));
    const gasPrice = parseFloat(getValue('gas-price')) || 0;
    const annualMiles = parseFloat(getValue('annual-miles')) || 12000;

    if (!distance || distance <= 0) {
      displayError('Please enter a valid distance.');
      return;
    }
    if (!fuelUsed || fuelUsed <= 0) {
      displayError('Please enter a valid fuel amount.');
      return;
    }

    let mpg, l100km, kml;
    if (unitSystem === 'us') {
      mpg = distance / fuelUsed;
      l100km = 235.215 / mpg;
      kml = mpg * 0.425144;
    } else if (unitSystem === 'metric-l100') {
      l100km = (fuelUsed / distance) * 100;
      mpg = 235.215 / l100km;
      kml = distance / fuelUsed;
    } else {
      kml = distance / fuelUsed;
      mpg = kml / 0.425144;
      l100km = 235.215 / mpg;
    }

    const costPerMile = gasPrice > 0 ? gasPrice / mpg : 0;
    const costPerKm = costPerMile * 0.621371;
    const tripCost = gasPrice > 0 ? fuelUsed * gasPrice : 0;
    const annualFuelGallons = annualMiles / mpg;
    const annualFuelCost = annualFuelGallons * gasPrice;
    const annualCO2 = annualFuelGallons * CO2_PER_GALLON;

    // Fuel log averages
    let fuelLogResults = null;
    const logEntries = getFuelLogData();
    if (logEntries.length > 0) {
      const totalLogMiles = logEntries.reduce((sum, e) => sum + e.miles, 0);
      const totalLogGallons = logEntries.reduce((sum, e) => sum + e.gallons, 0);
      const avgMpg = totalLogMiles / totalLogGallons;
      fuelLogResults = {
        entries: logEntries.length,
        totalMiles: totalLogMiles,
        totalGallons: totalLogGallons,
        avgMpg: avgMpg,
        bestMpg: Math.max(...logEntries.map(e => e.miles / e.gallons)),
        worstMpg: Math.min(...logEntries.map(e => e.miles / e.gallons))
      };
    }

    displayBasicResults({
      distance, fuelUsed, gasPrice, unitSystem,
      mpg, l100km, kml,
      costPerMile, costPerKm, tripCost,
      annualMiles, annualFuelGallons, annualFuelCost, annualCO2,
      fuelLogResults
    });
  }

  function calculateTrip() {
    let tripDistance = parseFloat(getValue('trip-distance'));
    const roundTrip = getValue('trip-roundtrip') === 'yes';
    const tripMpg = parseFloat(getValue('trip-mpg'));
    const tripGasPrice = parseFloat(getValue('trip-gas-price'));

    if (!tripDistance || tripDistance <= 0) {
      displayError('Please enter a valid trip distance.');
      return;
    }
    if (!tripMpg || tripMpg <= 0) {
      displayError('Please enter your vehicle MPG.');
      return;
    }
    if (!tripGasPrice || tripGasPrice <= 0) {
      displayError('Please enter the fuel price.');
      return;
    }

    if (roundTrip) tripDistance *= 2;

    const gallonsNeeded = tripDistance / tripMpg;
    const tripCost = gallonsNeeded * tripGasPrice;
    const co2Produced = gallonsNeeded * CO2_PER_GALLON;
    const costPerMile = tripGasPrice / tripMpg;

    // Driving time estimate (average 55 mph)
    const drivingHours = tripDistance / 55;

    displayTripResults({
      tripDistance, roundTrip, tripMpg, tripGasPrice,
      gallonsNeeded, tripCost, co2Produced, costPerMile, drivingHours
    });
  }

  function calculateCompare() {
    const annualDist = parseFloat(getValue('compare-distance')) || 12000;
    const gasPrice = parseFloat(getValue('compare-gas-price')) || 3.50;

    const vehicles = [];
    document.querySelectorAll('.vehicle-entry').forEach(row => {
      const name = row.querySelector('.vehicle-name')?.value || 'Unnamed';
      const mpg = parseFloat(row.querySelector('.vehicle-mpg')?.value);
      if (mpg && mpg > 0) {
        const annualGallons = annualDist / mpg;
        const annualCost = annualGallons * gasPrice;
        const costPerMile = gasPrice / mpg;
        const annualCO2 = annualGallons * CO2_PER_GALLON;
        vehicles.push({ name, mpg, annualGallons, annualCost, costPerMile, annualCO2 });
      }
    });

    if (vehicles.length < 2) {
      displayError('Please enter MPG for at least 2 vehicles to compare.');
      return;
    }

    vehicles.sort((a, b) => a.annualCost - b.annualCost);
    const cheapest = vehicles[0];

    displayCompareResults({ vehicles, annualDist, gasPrice, cheapest });
  }

  function getFuelLogData() {
    const entries = [];
    document.querySelectorAll('.fuel-log-entry').forEach(row => {
      const miles = parseFloat(row.querySelector('.log-miles')?.value);
      const gallons = parseFloat(row.querySelector('.log-gallons')?.value);
      const date = row.querySelector('.log-date')?.value || '';
      if (miles > 0 && gallons > 0) {
        entries.push({ miles, gallons, date });
      }
    });
    return entries;
  }

  function displayBasicResults(r) {
    const effLabel = r.unitSystem === 'us' ? `${r.mpg.toFixed(1)} MPG` :
      r.unitSystem === 'metric-l100' ? `${r.l100km.toFixed(1)} L/100km` :
      `${r.kml.toFixed(1)} km/L`;

    const ratingInfo = getMpgRating(r.mpg);

    let html = `
      <div class="result-header">
        <h2>⛽ Fuel Economy Results</h2>
      </div>

      <div class="tip-summary-cards">
        <div class="summary-card primary">
          <div class="summary-icon">⛽</div>
          <div class="summary-content">
            <div class="summary-value">${effLabel}</div>
            <div class="summary-label">Fuel Economy</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">💰</div>
          <div class="summary-content">
            <div class="summary-value">${r.gasPrice > 0 ? formatCurrency(r.costPerMile) : 'N/A'}</div>
            <div class="summary-label">Cost Per Mile</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">📅</div>
          <div class="summary-content">
            <div class="summary-value">${r.gasPrice > 0 ? formatCurrency(r.annualFuelCost) : 'N/A'}</div>
            <div class="summary-label">Annual Fuel Cost</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">🌍</div>
          <div class="summary-content">
            <div class="summary-value">${(r.annualCO2 / 2000).toFixed(1)}</div>
            <div class="summary-label">Tons CO2/Year</div>
          </div>
        </div>
      </div>

      <div class="efficiency-rating">
        <h3>📊 Efficiency Rating</h3>
        <div class="rating-bar-container">
          <div class="rating-bar">
            <div class="rating-fill" style="width: ${Math.min(r.mpg / 50 * 100, 100)}%; background: ${ratingInfo.color};"></div>
            <div class="rating-marker" style="left: ${Math.min(r.mpg / 50 * 100, 100)}%;">
              <span class="marker-label">${r.mpg.toFixed(1)}</span>
            </div>
          </div>
          <div class="rating-labels">
            <span>0 MPG</span>
            <span>25 MPG</span>
            <span>50+ MPG</span>
          </div>
        </div>
        <div class="rating-badge" style="background: ${ratingInfo.bgColor}; border-color: ${ratingInfo.color};">
          <span class="rating-emoji">${ratingInfo.emoji}</span>
          <span class="rating-text">${ratingInfo.label}</span>
        </div>
      </div>

      <div class="calculation-breakdown">
        <h3>📋 Detailed Breakdown</h3>
        <div class="breakdown-table-container">
          <table class="breakdown-table">
            <tbody>
              <tr><td>Distance Driven</td><td class="text-right">${r.distance.toFixed(1)} ${r.unitSystem === 'us' ? 'miles' : 'km'}</td></tr>
              <tr><td>Fuel Used</td><td class="text-right">${r.fuelUsed.toFixed(2)} ${r.unitSystem === 'us' ? 'gallons' : 'liters'}</td></tr>
              <tr><td>Miles Per Gallon (MPG)</td><td class="text-right"><strong>${r.mpg.toFixed(1)}</strong></td></tr>
              <tr><td>Liters per 100km</td><td class="text-right">${r.l100km.toFixed(1)}</td></tr>
              <tr><td>Kilometers per Liter</td><td class="text-right">${r.kml.toFixed(1)}</td></tr>
              ${r.gasPrice > 0 ? `
              <tr><td>Trip Fuel Cost</td><td class="text-right">${formatCurrency(r.tripCost)}</td></tr>
              <tr><td>Cost Per Mile</td><td class="text-right">${formatCurrency(r.costPerMile)}</td></tr>
              <tr><td>Annual Fuel (${r.annualMiles.toLocaleString()} mi/yr)</td><td class="text-right">${r.annualFuelGallons.toFixed(0)} gallons</td></tr>
              <tr class="total-row"><td><strong>Annual Fuel Cost</strong></td><td class="text-right"><strong>${formatCurrency(r.annualFuelCost)}</strong></td></tr>
              ` : ''}
              <tr><td>Annual CO2 Emissions</td><td class="text-right">${(r.annualCO2).toFixed(0)} lbs (${(r.annualCO2 / 2.205).toFixed(0)} kg)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      ${r.fuelLogResults ? `
      <div class="fuel-log-results">
        <h3>📈 Fuel Log Summary</h3>
        <div class="log-stats">
          <div class="log-stat">
            <div class="log-stat-value">${r.fuelLogResults.avgMpg.toFixed(1)}</div>
            <div class="log-stat-label">Average MPG</div>
          </div>
          <div class="log-stat">
            <div class="log-stat-value">${r.fuelLogResults.bestMpg.toFixed(1)}</div>
            <div class="log-stat-label">Best MPG</div>
          </div>
          <div class="log-stat">
            <div class="log-stat-value">${r.fuelLogResults.worstMpg.toFixed(1)}</div>
            <div class="log-stat-label">Worst MPG</div>
          </div>
          <div class="log-stat">
            <div class="log-stat-value">${r.fuelLogResults.entries}</div>
            <div class="log-stat-label">Fill-ups Logged</div>
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--color-gray-dark); margin-top: 1rem;">
          Total: ${r.fuelLogResults.totalMiles.toFixed(0)} miles driven, ${r.fuelLogResults.totalGallons.toFixed(1)} gallons used
        </p>
      </div>
      ` : ''}
    `;

    showResults(html);
  }

  function displayTripResults(r) {
    const html = `
      <div class="result-header">
        <h2>🗺️ Trip Cost Estimate</h2>
        <p>${r.tripDistance.toFixed(0)} miles ${r.roundTrip ? '(round trip)' : '(one way)'}</p>
      </div>

      <div class="tip-summary-cards">
        <div class="summary-card primary">
          <div class="summary-icon">💰</div>
          <div class="summary-content">
            <div class="summary-value">${formatCurrency(r.tripCost)}</div>
            <div class="summary-label">Estimated Fuel Cost</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">⛽</div>
          <div class="summary-content">
            <div class="summary-value">${r.gallonsNeeded.toFixed(1)}</div>
            <div class="summary-label">Gallons Needed</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">🕐</div>
          <div class="summary-content">
            <div class="summary-value">${formatDrivingTime(r.drivingHours)}</div>
            <div class="summary-label">Est. Drive Time</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">🌍</div>
          <div class="summary-content">
            <div class="summary-value">${r.co2Produced.toFixed(0)}</div>
            <div class="summary-label">Lbs CO2</div>
          </div>
        </div>
      </div>

      <div class="calculation-breakdown">
        <h3>📋 Trip Details</h3>
        <div class="breakdown-table-container">
          <table class="breakdown-table">
            <tbody>
              <tr><td>Total Distance</td><td class="text-right">${r.tripDistance.toFixed(0)} miles</td></tr>
              <tr><td>Vehicle Efficiency</td><td class="text-right">${r.tripMpg} MPG</td></tr>
              <tr><td>Fuel Price</td><td class="text-right">${formatCurrency(r.tripGasPrice)}/gallon</td></tr>
              <tr><td>Fuel Required</td><td class="text-right">${r.gallonsNeeded.toFixed(1)} gallons</td></tr>
              <tr><td>Cost Per Mile</td><td class="text-right">${formatCurrency(r.costPerMile)}</td></tr>
              <tr><td>Estimated Drive Time</td><td class="text-right">${formatDrivingTime(r.drivingHours)}</td></tr>
              <tr><td>Fuel Stops (15 gal tank)</td><td class="text-right">${Math.ceil(r.gallonsNeeded / 15)}</td></tr>
              <tr class="total-row"><td><strong>Total Fuel Cost</strong></td><td class="text-right"><strong>${formatCurrency(r.tripCost)}</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="trip-comparison">
        <h3>💡 Cost at Different MPG</h3>
        <div class="breakdown-table-container">
          <table class="comparison-table">
            <thead>
              <tr><th>MPG</th><th>Gallons</th><th>Cost</th><th>Savings</th></tr>
            </thead>
            <tbody>
              ${[20, 25, 30, 35, 40, 45, 50].map(mpg => {
                const gal = r.tripDistance / mpg;
                const cost = gal * r.tripGasPrice;
                const savings = r.tripCost - cost;
                const isYours = mpg === Math.round(r.tripMpg);
                return `<tr class="${isYours ? 'selected-row' : ''}">
                  <td><strong>${mpg}</strong>${isYours ? ' (yours)' : ''}</td>
                  <td>${gal.toFixed(1)}</td>
                  <td>${formatCurrency(cost)}</td>
                  <td class="${savings > 0 ? 'text-success' : savings < 0 ? 'text-danger' : ''}">${savings > 0 ? '-' : '+'}${formatCurrency(Math.abs(savings))}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    showResults(html);
  }

  function displayCompareResults(r) {
    const maxCost = Math.max(...r.vehicles.map(v => v.annualCost));

    const html = `
      <div class="result-header">
        <h2>🚗 Vehicle Comparison</h2>
        <p>Annual costs based on ${r.annualDist.toLocaleString()} miles/year at ${formatCurrency(r.gasPrice)}/gallon</p>
      </div>

      <div class="comparison-chart">
        ${r.vehicles.map((v, i) => `
          <div class="compare-bar-row">
            <div class="compare-label">
              <strong>${v.name}</strong>
              <span>${v.mpg} MPG</span>
            </div>
            <div class="compare-bar-wrap">
              <div class="compare-bar" style="width: ${(v.annualCost / maxCost * 100).toFixed(0)}%; background: ${i === 0 ? '#10b981' : i === r.vehicles.length - 1 ? '#ef4444' : '#3b82f6'};">
                <span class="compare-bar-value">${formatCurrency(v.annualCost)}/yr</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="calculation-breakdown">
        <h3>📊 Detailed Comparison</h3>
        <div class="breakdown-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>MPG</th>
                <th>Annual Gallons</th>
                <th>Annual Cost</th>
                <th>Cost/Mile</th>
                <th>CO2 (tons/yr)</th>
                <th>vs. Best</th>
              </tr>
            </thead>
            <tbody>
              ${r.vehicles.map((v, i) => `
                <tr class="${i === 0 ? 'selected-row' : ''}">
                  <td><strong>${v.name}</strong></td>
                  <td>${v.mpg.toFixed(1)}</td>
                  <td>${v.annualGallons.toFixed(0)}</td>
                  <td>${formatCurrency(v.annualCost)}</td>
                  <td>${formatCurrency(v.costPerMile)}</td>
                  <td>${(v.annualCO2 / 2000).toFixed(1)}</td>
                  <td class="${i > 0 ? 'text-danger' : 'text-success'}">${i === 0 ? 'Best' : '+' + formatCurrency(v.annualCost - r.cheapest.annualCost)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="savings-highlight">
        <h3>💡 Potential Savings</h3>
        <p>Choosing <strong>${r.cheapest.name}</strong> (${r.cheapest.mpg} MPG) over the least efficient vehicle saves you
        <strong>${formatCurrency(r.vehicles[r.vehicles.length - 1].annualCost - r.cheapest.annualCost)}/year</strong> in fuel costs
        and reduces CO2 emissions by <strong>${((r.vehicles[r.vehicles.length - 1].annualCO2 - r.cheapest.annualCO2) / 2000).toFixed(1)} tons/year</strong>.</p>
        <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--color-gray-dark);">
          Over 5 years: ${formatCurrency((r.vehicles[r.vehicles.length - 1].annualCost - r.cheapest.annualCost) * 5)} saved
        </p>
      </div>
    `;

    showResults(html);
  }

  function getMpgRating(mpg) {
    if (mpg >= 40) return { label: 'Excellent', emoji: '🌟', color: '#10b981', bgColor: '#f0fdf4' };
    if (mpg >= 30) return { label: 'Good', emoji: '👍', color: '#3b82f6', bgColor: '#eff6ff' };
    if (mpg >= 22) return { label: 'Average', emoji: '➡️', color: '#f59e0b', bgColor: '#fef3c7' };
    if (mpg >= 15) return { label: 'Below Average', emoji: '⚠️', color: '#f97316', bgColor: '#fff7ed' };
    return { label: 'Poor', emoji: '❌', color: '#ef4444', bgColor: '#fee2e2' };
  }

  function formatDrivingTime(hours) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    if (h === 0) return `${m}m`;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  function showResults(html) {
    if (elements.resultDiv) {
      elements.resultDiv.innerHTML = html;
      elements.resultDiv.classList.remove('hidden');
    }
  }

  function displayError(message) {
    if (elements.resultDiv) {
      elements.resultDiv.innerHTML = `
        <div class="error-message">
          <span class="error-icon">⚠️</span>
          <span>${message}</span>
        </div>
      `;
      elements.resultDiv.classList.remove('hidden');
    }
  }

  function clearAll() {
    ['total-distance', 'odometer-start', 'odometer-end', 'fuel-used', 'gas-price',
     'trip-distance', 'trip-mpg', 'trip-gas-price'].forEach(id => setValue(id, ''));
    setValue('annual-miles', '12000');
    setValue('compare-distance', '12000');
    setValue('compare-gas-price', '3.50');
    setValue('distance-method', 'total');
    setValue('unit-system', 'us');
    setValue('trip-roundtrip', 'no');
    state.vehicles = [];
    state.vehicleCounter = 0;
    state.fuelLog = [];
    state.fuelLogCounter = 0;
    if (elements.vehicleList) elements.vehicleList.innerHTML = '';
    if (elements.fuelLogContainer) elements.fuelLogContainer.innerHTML = '';
    addDefaultVehicles();
    updateDistanceMethod();
    updateUnits();
    if (elements.resultDiv) elements.resultDiv.classList.add('hidden');
    window.history.replaceState({}, '', window.location.pathname);
  }

  function shareCalculation() {
    saveToURL();
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => showCopyConfirmation()).catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showCopyConfirmation(); }
    catch (e) { alert('Copy URL: ' + text); }
    document.body.removeChild(ta);
  }

  function showCopyConfirmation() {
    if (elements.shareBtn) {
      const original = elements.shareBtn.innerHTML;
      elements.shareBtn.innerHTML = '✓ Copied!';
      elements.shareBtn.style.background = '#10b981';
      elements.shareBtn.style.borderColor = '#10b981';
      elements.shareBtn.style.color = 'white';
      setTimeout(() => {
        elements.shareBtn.innerHTML = original;
        elements.shareBtn.style.background = '';
        elements.shareBtn.style.borderColor = '';
        elements.shareBtn.style.color = '';
      }, 2000);
    }
  }

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD',
      minimumFractionDigits: 2, maximumFractionDigits: 2
    }).format(amount);
  }

})();

// Styles
const gasStyle = document.createElement('style');
gasStyle.textContent = `
  .tip-summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }

  .summary-card {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 1px solid var(--color-surface-table-border);
  }

  .summary-card.primary {
    background: linear-gradient(135deg, #E8F4F8 0%, white 100%);
    border: 2px solid var(--color-light-blue);
  }

  .summary-icon { font-size: 2rem; margin-bottom: 0.5rem; }
  .summary-value { font-size: 1.6rem; font-weight: 800; color: var(--color-primary-blue); font-family: var(--font-primary); }
  .summary-label { font-size: 0.85rem; color: var(--color-gray-dark); margin-top: 0.25rem; }

  .efficiency-rating {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid var(--color-surface-table-border);
  }

  .efficiency-rating h3 { margin: 0 0 1.5rem 0; color: var(--color-primary-blue); }

  .rating-bar-container { margin-bottom: 1.5rem; }

  .rating-bar {
    height: 24px;
    background: linear-gradient(to right, #ef4444, #f59e0b, #10b981);
    border-radius: 12px;
    position: relative;
    overflow: visible;
  }

  .rating-fill {
    height: 100%;
    border-radius: 12px;
    opacity: 0.3;
  }

  .rating-marker {
    position: absolute;
    top: -8px;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .marker-label {
    background: var(--color-primary-blue);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .rating-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: var(--color-gray-dark);
  }

  .rating-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    border: 2px solid;
    font-weight: 600;
  }

  .rating-emoji { font-size: 1.25rem; }

  .calculation-breakdown, .trip-comparison, .fuel-log-results, .savings-highlight {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid var(--color-surface-table-border);
  }

  .calculation-breakdown h3, .trip-comparison h3, .fuel-log-results h3, .savings-highlight h3 {
    margin: 0 0 1rem 0;
    color: var(--color-primary-blue);
  }

  .breakdown-table-container { overflow-x: auto; }

  .breakdown-table, .comparison-table {
    width: 100%;
    border-collapse: collapse;
  }

  .breakdown-table td, .comparison-table th, .comparison-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .comparison-table th {
    background: var(--color-surface-neutral);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: var(--color-gray-dark);
    text-align: center;
  }

  .comparison-table td { text-align: center; }
  .breakdown-table .text-right { text-align: right; }
  .text-success { color: var(--color-success); }
  .text-danger { color: var(--color-error); }

  .breakdown-table .total-row { background: var(--color-surface-neutral); }
  .breakdown-table .total-row td { border-bottom: none; padding: 1rem; }
  .selected-row { background: linear-gradient(135deg, #fff8f5 0%, #ffe8d6 100%); font-weight: 600; }

  .log-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }

  .log-stat {
    text-align: center;
    padding: 1rem;
    background: var(--color-surface-neutral);
    border-radius: 8px;
  }

  .log-stat-value { font-size: 1.5rem; font-weight: 800; color: var(--color-primary-blue); }
  .log-stat-label { font-size: 0.8rem; color: var(--color-gray-dark); margin-top: 0.25rem; }

  .comparison-chart {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid var(--color-surface-table-border);
  }

  .compare-bar-row {
    margin-bottom: 1rem;
  }

  .compare-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
  }

  .compare-label span { color: var(--color-gray-dark); }

  .compare-bar-wrap {
    height: 36px;
    background: var(--color-surface-neutral);
    border-radius: 8px;
    overflow: hidden;
  }

  .compare-bar {
    height: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    min-width: 100px;
    transition: width 0.5s ease;
  }

  .compare-bar-value {
    font-size: 0.8rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    white-space: nowrap;
  }

  .savings-highlight {
    background: var(--color-highlight-green);
    border-color: var(--color-success);
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: var(--color-highlight-red);
    border: 1px solid #fecaca;
    border-radius: 8px;
    color: var(--color-error);
  }

  .error-icon { font-size: 1.5rem; }

  @media (max-width: 768px) {
    .tip-summary-cards { grid-template-columns: repeat(2, 1fr); }
    .summary-value { font-size: 1.3rem; }
    .log-stats { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 480px) {
    .tip-summary-cards { grid-template-columns: 1fr; }
  }
`;
document.head.appendChild(gasStyle);
