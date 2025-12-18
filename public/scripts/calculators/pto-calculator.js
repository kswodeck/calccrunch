// PTO Calculator - Plan, Estimate, and Analyze Paid Time Off
(function() {
  'use strict';

  // Constants
  const PAY_PERIODS_PER_YEAR = {
    'weekly': 52,
    'biweekly': 26,
    'semi-monthly': 24,
    'monthly': 12
  };

  const MODE_DESCRIPTIONS = {
    'future-balance': 'Calculate your PTO balance on a specific future date',
    'time-to-accrue': 'Find out how long it takes to accrue a target amount of PTO',
    'pto-value': 'Calculate the monetary value of your PTO hours'
  };

  // State
  let state = {
    mode: 'future-balance',
    plannedPTO: [],
    ptoCounter: 0
  };

  // DOM Elements
  let elements = {};

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    cacheElements();
    setDefaultDates();
    loadFromURL();
    attachEventListeners();
    updateUI();
  });

  function cacheElements() {
    elements = {
      form: document.getElementById('pto-calculator-form'),
      calculateBtn: document.getElementById('calculate-btn'),
      shareBtn: document.getElementById('share-calculation'),
      clearBtn: document.getElementById('clear-btn'),
      resultDiv: document.getElementById('pto-result'),
      modeDescription: document.getElementById('mode-description'),
      
      // Accrual settings
      accrualType: document.getElementById('accrual-type'),
      payPeriodFrequency: document.getElementById('pay-period-frequency'),
      accrualRate: document.getElementById('accrual-rate'),
      accrualRateAddon: document.getElementById('accrual-rate-addon'),
      accrualRateHelp: document.getElementById('accrual-rate-help'),
      accrualRateGroup: document.getElementById('accrual-rate-group'),
      annualPTOHours: document.getElementById('annual-pto-hours'),
      annualPTOGroup: document.getElementById('annual-pto-group'),
      hourlyAccrualRow: document.getElementById('hourly-accrual-row'),
      hoursPerPTO: document.getElementById('hours-per-pto'),
      hoursWorkedPerPeriod: document.getElementById('hours-worked-per-period'),
      
      // Current status
      currentBalance: document.getElementById('current-balance'),
      asOfDate: document.getElementById('as-of-date'),
      maxBalance: document.getElementById('max-balance'),
      maxCarryover: document.getElementById('max-carryover'),
      
      // Mode-specific
      targetDate: document.getElementById('target-date'),
      targetHours: document.getElementById('target-hours'),
      compensationType: document.getElementById('compensation-type'),
      hourlyRate: document.getElementById('hourly-rate'),
      hourlyRateGroup: document.getElementById('hourly-rate-group'),
      annualSalary: document.getElementById('annual-salary'),
      salaryGroup: document.getElementById('salary-group'),
      
      // Planned PTO
      plannedPTOContainer: document.getElementById('planned-pto-container'),
      addPlannedPTOBtn: document.getElementById('add-planned-pto-btn'),
      plannedPTOSummary: document.getElementById('planned-pto-summary'),
      totalPlannedPreview: document.getElementById('total-planned-preview')
    };
  }

  function setDefaultDates() {
    const today = new Date();
    const threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    
    if (elements.asOfDate && !elements.asOfDate.value) {
      elements.asOfDate.value = formatDateForInput(today);
    }
    if (elements.targetDate && !elements.targetDate.value) {
      elements.targetDate.value = formatDateForInput(threeMonthsLater);
    }
  }

  function formatDateForInput(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function parseLocalDate(dateStr) {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 12, 0, 0);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load mode
    if (params.has('mode')) {
      const mode = params.get('mode');
      if (['future-balance', 'time-to-accrue', 'pto-value'].includes(mode)) {
        state.mode = mode;
        setMode(mode);
      }
    }
    
    // Load basic fields
    const fields = [
      { id: 'accrual-type', param: 'atype' },
      { id: 'pay-period-frequency', param: 'ppf' },
      { id: 'accrual-rate', param: 'arate' },
      { id: 'annual-pto-hours', param: 'annual' },
      { id: 'hours-per-pto', param: 'hppto' },
      { id: 'hours-worked-per-period', param: 'hwpp' },
      { id: 'current-balance', param: 'bal' },
      { id: 'as-of-date', param: 'asof' },
      { id: 'max-balance', param: 'maxbal' },
      { id: 'max-carryover', param: 'carry' },
      { id: 'target-date', param: 'tdate' },
      { id: 'target-hours', param: 'thrs' },
      { id: 'compensation-type', param: 'ctype' },
      { id: 'hourly-rate', param: 'hrate' },
      { id: 'annual-salary', param: 'salary' }
    ];
    
    fields.forEach(field => {
      if (params.has(field.param)) {
        setValue(field.id, params.get(field.param));
      }
    });
    
    // Load planned PTO
    if (params.has('planned')) {
      try {
        const plannedData = JSON.parse(decodeURIComponent(params.get('planned')));
        plannedData.forEach(pto => {
          addPlannedPTO(pto);
        });
      } catch (e) {
        console.error('Error parsing planned PTO:', e);
      }
    }
    
    // Update UI based on loaded values
    updateAccrualTypeUI();
    updateCompensationTypeUI();
    updatePlannedPTOSummary();
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    // Save mode
    params.set('mode', state.mode);
    
    // Save all fields with values
    const fields = [
      { id: 'accrual-type', param: 'atype' },
      { id: 'pay-period-frequency', param: 'ppf' },
      { id: 'accrual-rate', param: 'arate' },
      { id: 'annual-pto-hours', param: 'annual' },
      { id: 'hours-per-pto', param: 'hppto' },
      { id: 'hours-worked-per-period', param: 'hwpp' },
      { id: 'current-balance', param: 'bal' },
      { id: 'as-of-date', param: 'asof' },
      { id: 'max-balance', param: 'maxbal' },
      { id: 'max-carryover', param: 'carry' },
      { id: 'target-date', param: 'tdate' },
      { id: 'target-hours', param: 'thrs' },
      { id: 'compensation-type', param: 'ctype' },
      { id: 'hourly-rate', param: 'hrate' },
      { id: 'annual-salary', param: 'salary' }
    ];
    
    fields.forEach(field => {
      const value = getValue(field.id);
      if (value) params.set(field.param, value);
    });
    
    // Save planned PTO
    const plannedData = state.plannedPTO.map(pto => {
      const row = document.querySelector(`[data-pto-id="${pto.id}"]`);
      if (!row) return null;
      return {
        description: row.querySelector('.pto-description')?.value || '',
        date: row.querySelector('.pto-date')?.value || '',
        hours: row.querySelector('.pto-hours')?.value || ''
      };
    }).filter(p => p && (p.description || p.date || p.hours));
    
    if (plannedData.length > 0) {
      params.set('planned', encodeURIComponent(JSON.stringify(plannedData)));
    }
    
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    // Calculate button
    if (elements.calculateBtn) {
      elements.calculateBtn.addEventListener('click', () => {
        calculateResults();
        document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    
    // Mode toggle
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        setMode(mode);
        saveToURL();
      });
    });
    
    // Accrual type change
    if (elements.accrualType) {
      elements.accrualType.addEventListener('change', () => {
        updateAccrualTypeUI();
        updateAccrualRateFromAnnual();
        saveToURL();
      });
    }
    
    // Pay period frequency change
    if (elements.payPeriodFrequency) {
      elements.payPeriodFrequency.addEventListener('change', () => {
        updateAccrualRateFromAnnual();
        saveToURL();
      });
    }

    // Accrual rate change - update annual hours
    if (elements.accrualRate) {
      elements.accrualRate.addEventListener('input', debounce(() => {
        updateAnnualFromAccrualRate();
        saveToURL();
      }, 300));
    }
    
    // Annual PTO hours change - update accrual rate
    if (elements.annualPTOHours) {
      elements.annualPTOHours.addEventListener('input', debounce(() => {
        updateAccrualRateFromAnnual();
        saveToURL();
      }, 300));
    }
    
    // Compensation type change
    if (elements.compensationType) {
      elements.compensationType.addEventListener('change', () => {
        updateCompensationTypeUI();
        saveToURL();
      });
    }
    
    // Quick date buttons
    document.querySelectorAll('.quick-date-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const days = parseInt(btn.dataset.days);
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + days);
        if (elements.targetDate) {
          elements.targetDate.value = formatDateForInput(targetDate);
        }
        // Update active state
        document.querySelectorAll('.quick-date-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveToURL();
      });
    });
    
    // Quick hours buttons
    document.querySelectorAll('.quick-hours-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const hours = parseInt(btn.dataset.hours);
        if (elements.targetHours) {
          elements.targetHours.value = hours;
        }
        // Update active state
        document.querySelectorAll('.quick-hours-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveToURL();
      });
    });
    
    // Add planned PTO button
    if (elements.addPlannedPTOBtn) {
      elements.addPlannedPTOBtn.addEventListener('click', () => {
        addPlannedPTO();
        saveToURL();
      });
    }
    
    // Share and clear buttons
    if (elements.shareBtn) {
      elements.shareBtn.addEventListener('click', shareCalculation);
    }
    if (elements.clearBtn) {
      elements.clearBtn.addEventListener('click', clearAll);
    }
    
    // Input change listeners for URL saving
    const inputsToWatch = [
      'accrual-rate', 'current-balance', 'max-balance', 'max-carryover',
      'target-date', 'target-hours', 'hourly-rate', 'annual-salary',
      'as-of-date', 'hours-per-pto', 'hours-worked-per-period'
    ];
    
    inputsToWatch.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', () => saveToURL());
        el.addEventListener('input', debounce(() => saveToURL(), 500));
      }
    });
  }

  function setMode(mode) {
    state.mode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Update description
    if (elements.modeDescription) {
      elements.modeDescription.textContent = MODE_DESCRIPTIONS[mode];
    }
    
    // Show/hide mode sections
    document.querySelectorAll('.mode-section').forEach(section => {
      section.style.display = 'none';
    });
    
    const activeSection = document.querySelector(`.${mode}-section`);
    if (activeSection) {
      activeSection.style.display = 'block';
    }
  }

  function updateUI() {
    setMode(state.mode);
    updateAccrualTypeUI();
    updateCompensationTypeUI();
    updatePlannedPTOSummary();
  }

  function updateAccrualTypeUI() {
    const accrualType = getValue('accrual-type');
    
    // Show/hide appropriate fields based on accrual type
    const showAccrualRate = ['per-pay-period', 'monthly', 'custom'].includes(accrualType);
    const showAnnualPTO = ['per-pay-period', 'monthly', 'annually-frontloaded'].includes(accrualType);
    const showHourlyAccrual = accrualType === 'hourly';
    
    if (elements.accrualRateGroup) {
      elements.accrualRateGroup.style.display = showAccrualRate ? 'flex' : 'none';
    }
    if (elements.annualPTOGroup) {
      elements.annualPTOGroup.style.display = showAnnualPTO ? 'flex' : 'none';
    }
    if (elements.hourlyAccrualRow) {
      elements.hourlyAccrualRow.style.display = showHourlyAccrual ? 'grid' : 'none';
    }
    
    // Update accrual rate labels
    if (elements.accrualRateAddon && elements.accrualRateHelp) {
      if (accrualType === 'monthly') {
        elements.accrualRateAddon.textContent = 'hrs/month';
        elements.accrualRateHelp.textContent = 'Hours earned each month';
      } else {
        elements.accrualRateAddon.textContent = 'hrs/period';
        elements.accrualRateHelp.textContent = 'Hours earned per pay period';
      }
    }
  }

  function updateAccrualRateFromAnnual() {
    const accrualType = getValue('accrual-type');
    const annualHours = parseFloat(getValue('annual-pto-hours')) || 0;
    const frequency = getValue('pay-period-frequency');
    
    if (accrualType === 'per-pay-period' && annualHours > 0) {
      const periodsPerYear = PAY_PERIODS_PER_YEAR[frequency] || 26;
      const ratePerPeriod = (annualHours / periodsPerYear).toFixed(2);
      if (elements.accrualRate) {
        elements.accrualRate.value = ratePerPeriod;
      }
    } else if (accrualType === 'monthly' && annualHours > 0) {
      const ratePerMonth = (annualHours / 12).toFixed(2);
      if (elements.accrualRate) {
        elements.accrualRate.value = ratePerMonth;
      }
    }
  }

  function updateAnnualFromAccrualRate() {
    const accrualType = getValue('accrual-type');
    const accrualRate = parseFloat(getValue('accrual-rate')) || 0;
    const frequency = getValue('pay-period-frequency');
    
    if (accrualType === 'per-pay-period' && accrualRate > 0) {
      const periodsPerYear = PAY_PERIODS_PER_YEAR[frequency] || 26;
      const annualHours = (accrualRate * periodsPerYear).toFixed(0);
      if (elements.annualPTOHours) {
        elements.annualPTOHours.value = annualHours;
      }
    } else if (accrualType === 'monthly' && accrualRate > 0) {
      const annualHours = (accrualRate * 12).toFixed(0);
      if (elements.annualPTOHours) {
        elements.annualPTOHours.value = annualHours;
      }
    }
  }

  function updateCompensationTypeUI() {
    const compType = getValue('compensation-type');
    const showHourly = compType === 'hourly';
    
    if (elements.hourlyRateGroup) {
      elements.hourlyRateGroup.style.display = showHourly ? 'flex' : 'none';
    }
    if (elements.salaryGroup) {
      elements.salaryGroup.style.display = showHourly ? 'none' : 'flex';
    }
  }

  function addPlannedPTO(data = {}) {
    state.ptoCounter++;
    const ptoId = state.ptoCounter;
    
    state.plannedPTO.push({ id: ptoId });
    
    const row = document.createElement('div');
    row.className = 'planned-pto-entry';
    row.dataset.ptoId = ptoId;
    
    row.innerHTML = `
      <div class="form-group">
        <label>Description</label>
        <input type="text" class="form-input pto-description" placeholder="e.g., Vacation" value="${data.description || ''}">
      </div>
      <div class="form-group">
        <label>Date</label>
        <input type="date" class="form-input pto-date" value="${data.date || ''}">
      </div>
      <div class="form-group">
        <label>Hours</label>
        <input type="number" class="form-input pto-hours" placeholder="8" min="0" max="500" step="0.5" value="${data.hours || ''}">
      </div>
      <button type="button" class="remove-planned-btn" title="Remove">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;
    
    // Add event listeners
    row.querySelector('.remove-planned-btn').addEventListener('click', () => {
      removePlannedPTO(ptoId);
    });
    
    row.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        updatePlannedPTOSummary();
        saveToURL();
      });
      input.addEventListener('input', debounce(() => {
        updatePlannedPTOSummary();
        saveToURL();
      }, 300));
    });
    
    if (elements.plannedPTOContainer) {
      elements.plannedPTOContainer.appendChild(row);
    }
    
    updatePlannedPTOSummary();
  }

  function removePlannedPTO(ptoId) {
    state.plannedPTO = state.plannedPTO.filter(p => p.id !== ptoId);
    const row = document.querySelector(`[data-pto-id="${ptoId}"]`);
    if (row) row.remove();
    updatePlannedPTOSummary();
    saveToURL();
  }

  function updatePlannedPTOSummary() {
    let totalHours = 0;
    
    state.plannedPTO.forEach(pto => {
      const row = document.querySelector(`[data-pto-id="${pto.id}"]`);
      if (row) {
        const hours = parseFloat(row.querySelector('.pto-hours')?.value) || 0;
        totalHours += hours;
      }
    });
    
    if (elements.plannedPTOSummary && elements.totalPlannedPreview) {
      if (totalHours > 0) {
        elements.plannedPTOSummary.style.display = 'block';
        elements.totalPlannedPreview.textContent = `${totalHours} hours`;
      } else {
        elements.plannedPTOSummary.style.display = 'none';
      }
    }
  }

  function calculateResults() {
    // Gather all inputs
    const inputs = gatherInputs();
    
    // Validate inputs
    const validation = validateInputs(inputs);
    if (!validation.valid) {
      displayError(validation.message);
      return;
    }
    
    // Calculate based on mode
    let results;
    switch (state.mode) {
      case 'future-balance':
        results = calculateFutureBalance(inputs);
        break;
      case 'time-to-accrue':
        results = calculateTimeToAccrue(inputs);
        break;
      case 'pto-value':
        results = calculatePTOValue(inputs);
        break;
    }
    
    displayResults(results);
  }

  function gatherInputs() {
    const inputs = {
      mode: state.mode,
      accrualType: getValue('accrual-type'),
      payPeriodFrequency: getValue('pay-period-frequency'),
      accrualRate: parseFloat(getValue('accrual-rate')) || 0,
      annualPTOHours: parseFloat(getValue('annual-pto-hours')) || 0,
      hoursPerPTO: parseFloat(getValue('hours-per-pto')) || 30,
      hoursWorkedPerPeriod: parseFloat(getValue('hours-worked-per-period')) || 80,
      currentBalance: parseFloat(getValue('current-balance')) || 0,
      asOfDate: parseLocalDate(getValue('as-of-date')),
      maxBalance: parseFloat(getValue('max-balance')) || Infinity,
      maxCarryover: parseFloat(getValue('max-carryover')) || Infinity,
      targetDate: parseLocalDate(getValue('target-date')),
      targetHours: parseFloat(getValue('target-hours')) || 0,
      compensationType: getValue('compensation-type'),
      hourlyRate: parseFloat(getValue('hourly-rate')) || 0,
      annualSalary: parseFloat(getValue('annual-salary')) || 0,
      plannedPTO: getPlannedPTOData()
    };
    
    // Calculate effective hourly rate
    if (inputs.compensationType === 'salary' && inputs.annualSalary > 0) {
      inputs.hourlyRate = inputs.annualSalary / 2080; // Standard work hours per year
    }
    
    return inputs;
  }

  function getPlannedPTOData() {
    const planned = [];
    state.plannedPTO.forEach(pto => {
      const row = document.querySelector(`[data-pto-id="${pto.id}"]`);
      if (row) {
        const date = row.querySelector('.pto-date')?.value;
        const hours = parseFloat(row.querySelector('.pto-hours')?.value) || 0;
        const description = row.querySelector('.pto-description')?.value || '';
        if (date && hours > 0) {
          planned.push({
            date: parseLocalDate(date),
            hours: hours,
            description: description
          });
        }
      }
    });
    // Sort by date
    planned.sort((a, b) => a.date - b.date);
    return planned;
  }

  function validateInputs(inputs) {
    if (!inputs.asOfDate) {
      return { valid: false, message: 'Please enter the date of your current PTO balance' };
    }
    
    if (inputs.mode === 'future-balance') {
      if (!inputs.targetDate) {
        return { valid: false, message: 'Please enter a target date' };
      }
      if (inputs.targetDate <= inputs.asOfDate) {
        return { valid: false, message: 'Target date must be after the balance date' };
      }
    }
    
    if (inputs.mode === 'time-to-accrue') {
      if (inputs.targetHours <= 0) {
        return { valid: false, message: 'Please enter target PTO hours greater than 0' };
      }
    }
    
    if (inputs.mode === 'pto-value') {
      if (inputs.hourlyRate <= 0) {
        return { valid: false, message: 'Please enter your hourly rate or salary' };
      }
    }
    
    // Calculate accrual rate for validation
    const accrualPerPeriod = getAccrualPerPeriod(inputs);
    if (accrualPerPeriod <= 0 && inputs.accrualType !== 'annually-frontloaded') {
      return { valid: false, message: 'Please enter a valid accrual rate' };
    }
    
    return { valid: true };
  }

  function getAccrualPerPeriod(inputs) {
    switch (inputs.accrualType) {
      case 'per-pay-period':
        return inputs.accrualRate;
      case 'monthly':
        // Convert monthly to per-pay-period
        const periodsPerMonth = PAY_PERIODS_PER_YEAR[inputs.payPeriodFrequency] / 12;
        return inputs.accrualRate / periodsPerMonth;
      case 'annually-frontloaded':
        return 0; // All given at once
      case 'hourly':
        return inputs.hoursWorkedPerPeriod / inputs.hoursPerPTO;
      case 'custom':
        return inputs.accrualRate;
      default:
        return 0;
    }
  }

  function calculateFutureBalance(inputs) {
    const accrualPerPeriod = getAccrualPerPeriod(inputs);
    const periodsPerYear = PAY_PERIODS_PER_YEAR[inputs.payPeriodFrequency];
    const daysPerPeriod = 365 / periodsPerYear;
    
    // Calculate days between dates
    const daysDiff = Math.ceil((inputs.targetDate - inputs.asOfDate) / (1000 * 60 * 60 * 24));
    const periods = daysDiff / daysPerPeriod;
    
    // Calculate total accrued (considering frontloaded)
    let totalAccrued;
    if (inputs.accrualType === 'annually-frontloaded') {
      // Check if anniversary date falls within range
      totalAccrued = 0; // Frontloaded already included in current balance
    } else {
      totalAccrued = periods * accrualPerPeriod;
    }
    
    // Calculate planned PTO usage
    let plannedUsage = 0;
    const plannedInRange = [];
    inputs.plannedPTO.forEach(pto => {
      if (pto.date >= inputs.asOfDate && pto.date <= inputs.targetDate) {
        plannedUsage += pto.hours;
        plannedInRange.push(pto);
      }
    });
    
    // Calculate final balance
    let projectedBalance = inputs.currentBalance + totalAccrued - plannedUsage;
    
    // Apply max balance cap
    const cappedBalance = Math.min(projectedBalance, inputs.maxBalance);
    const hoursLostToCap = Math.max(0, projectedBalance - cappedBalance);
    
    // Generate timeline data
    const timeline = generateTimeline(inputs, accrualPerPeriod, periodsPerYear);
    
    return {
      mode: 'future-balance',
      currentBalance: inputs.currentBalance,
      totalAccrued: totalAccrued,
      plannedUsage: plannedUsage,
      plannedInRange: plannedInRange,
      projectedBalance: cappedBalance,
      uncappedBalance: projectedBalance,
      hoursLostToCap: hoursLostToCap,
      daysDiff: daysDiff,
      periods: periods,
      accrualPerPeriod: accrualPerPeriod,
      maxBalance: inputs.maxBalance,
      targetDate: inputs.targetDate,
      asOfDate: inputs.asOfDate,
      timeline: timeline,
      annualAccrual: accrualPerPeriod * periodsPerYear,
      daysWorthOfPTO: (cappedBalance / 8).toFixed(1),
      weeksWorthOfPTO: (cappedBalance / 40).toFixed(2)
    };
  }

  function calculateTimeToAccrue(inputs) {
    const accrualPerPeriod = getAccrualPerPeriod(inputs);
    const periodsPerYear = PAY_PERIODS_PER_YEAR[inputs.payPeriodFrequency];
    const daysPerPeriod = 365 / periodsPerYear;
    
    const hoursNeeded = inputs.targetHours - inputs.currentBalance;
    
    if (hoursNeeded <= 0) {
      return {
        mode: 'time-to-accrue',
        alreadyMet: true,
        currentBalance: inputs.currentBalance,
        targetHours: inputs.targetHours,
        surplus: Math.abs(hoursNeeded)
      };
    }
    
    // Consider max balance cap
    const effectiveTarget = Math.min(inputs.targetHours, inputs.maxBalance);
    const adjustedHoursNeeded = effectiveTarget - inputs.currentBalance;
    
    if (inputs.accrualType === 'annually-frontloaded') {
      return {
        mode: 'time-to-accrue',
        frontloaded: true,
        currentBalance: inputs.currentBalance,
        targetHours: inputs.targetHours,
        hoursNeeded: hoursNeeded,
        annualPTOHours: inputs.annualPTOHours,
        message: 'PTO is frontloaded annually. You\'ll receive your full allocation at your anniversary date.'
      };
    }
    
    const periodsNeeded = adjustedHoursNeeded / accrualPerPeriod;
    const daysNeeded = periodsNeeded * daysPerPeriod;
    const weeksNeeded = daysNeeded / 7;
    const monthsNeeded = daysNeeded / 30.44;
    
    const targetDate = new Date(inputs.asOfDate);
    targetDate.setDate(targetDate.getDate() + Math.ceil(daysNeeded));
    
    return {
      mode: 'time-to-accrue',
      alreadyMet: false,
      currentBalance: inputs.currentBalance,
      targetHours: inputs.targetHours,
      hoursNeeded: hoursNeeded,
      effectiveTarget: effectiveTarget,
      adjustedHoursNeeded: adjustedHoursNeeded,
      periodsNeeded: periodsNeeded,
      daysNeeded: Math.ceil(daysNeeded),
      weeksNeeded: weeksNeeded,
      monthsNeeded: monthsNeeded,
      targetDate: targetDate,
      accrualPerPeriod: accrualPerPeriod,
      payPeriodFrequency: inputs.payPeriodFrequency,
      willHitCap: effectiveTarget < inputs.targetHours
    };
  }

  function calculatePTOValue(inputs) {
    const currentValue = inputs.currentBalance * inputs.hourlyRate;
    
    // Calculate future value at target date (if provided)
    let futureResults = null;
    if (inputs.targetDate && inputs.targetDate > inputs.asOfDate) {
      futureResults = calculateFutureBalance(inputs);
    }
    
    // Annual PTO value
    const accrualPerPeriod = getAccrualPerPeriod(inputs);
    const periodsPerYear = PAY_PERIODS_PER_YEAR[inputs.payPeriodFrequency];
    const annualAccrual = inputs.accrualType === 'annually-frontloaded' 
      ? inputs.annualPTOHours 
      : accrualPerPeriod * periodsPerYear;
    const annualValue = annualAccrual * inputs.hourlyRate;
    
    // Value per day/week
    const valuePerDay = inputs.hourlyRate * 8;
    const valuePerWeek = inputs.hourlyRate * 40;
    
    return {
      mode: 'pto-value',
      currentBalance: inputs.currentBalance,
      hourlyRate: inputs.hourlyRate,
      currentValue: currentValue,
      futureResults: futureResults,
      futureValue: futureResults ? futureResults.projectedBalance * inputs.hourlyRate : null,
      annualAccrual: annualAccrual,
      annualValue: annualValue,
      valuePerDay: valuePerDay,
      valuePerWeek: valuePerWeek,
      daysWorth: inputs.currentBalance / 8,
      weeksWorth: inputs.currentBalance / 40
    };
  }

  function generateTimeline(inputs, accrualPerPeriod, periodsPerYear) {
    const timeline = [];
    const daysPerPeriod = 365 / periodsPerYear;
    const totalDays = Math.ceil((inputs.targetDate - inputs.asOfDate) / (1000 * 60 * 60 * 24));
    
    // Generate monthly data points
    let currentDate = new Date(inputs.asOfDate);
    let currentBalance = inputs.currentBalance;
    const endDate = new Date(inputs.targetDate);
    
    // Sort planned PTO by date
    const sortedPlanned = [...inputs.plannedPTO].sort((a, b) => a.date - b.date);
    
    timeline.push({
      date: new Date(currentDate),
      balance: currentBalance,
      label: formatDateShort(currentDate),
      event: 'Start'
    });
    
    // Generate monthly snapshots
    while (currentDate < endDate) {
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      if (nextMonth > endDate) {
        nextMonth.setTime(endDate.getTime());
      }
      
      const daysPassed = (nextMonth - currentDate) / (1000 * 60 * 60 * 24);
      const periodsPassed = daysPassed / daysPerPeriod;
      const accrued = inputs.accrualType === 'annually-frontloaded' ? 0 : periodsPassed * accrualPerPeriod;
      
      // Check for planned PTO in this period
      let usedPTO = 0;
      sortedPlanned.forEach(pto => {
        if (pto.date >= currentDate && pto.date < nextMonth) {
          usedPTO += pto.hours;
        }
      });
      
      currentBalance = currentBalance + accrued - usedPTO;
      currentBalance = Math.min(currentBalance, inputs.maxBalance);
      currentBalance = Math.max(currentBalance, 0);
      
      currentDate = nextMonth;
      
      if (currentDate <= endDate) {
        timeline.push({
          date: new Date(currentDate),
          balance: currentBalance,
          label: formatDateShort(currentDate),
          accrued: accrued,
          used: usedPTO
        });
      }
    }
    
    return timeline;
  }

  function displayResults(results) {
    let html = '';
    
    switch (results.mode) {
      case 'future-balance':
        html = generateFutureBalanceHTML(results);
        break;
      case 'time-to-accrue':
        html = generateTimeToAccrueHTML(results);
        break;
      case 'pto-value':
        html = generatePTOValueHTML(results);
        break;
    }
    
    if (elements.resultDiv) {
      elements.resultDiv.innerHTML = html;
      elements.resultDiv.classList.remove('hidden');
    }
  }

  function generateFutureBalanceHTML(results) {
    const balanceColor = results.hoursLostToCap > 0 ? '#f59e0b' : '#10b981';
    
    return `
      <div class="result-header">
        <h2>📊 PTO Projection Results</h2>
        <p>Balance projection from ${formatDateDisplay(results.asOfDate)} to ${formatDateDisplay(results.targetDate)}</p>
      </div>
      
      <div class="pto-summary-cards">
        <div class="summary-card primary">
          <div class="summary-icon">🏖️</div>
          <div class="summary-content">
            <div class="summary-value" style="color: ${balanceColor}">${results.projectedBalance.toFixed(1)}</div>
            <div class="summary-label">Projected Balance (hours)</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">📅</div>
          <div class="summary-content">
            <div class="summary-value">${results.daysWorthOfPTO}</div>
            <div class="summary-label">Days of PTO</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">📈</div>
          <div class="summary-content">
            <div class="summary-value">+${results.totalAccrued.toFixed(1)}</div>
            <div class="summary-label">Hours Accrued</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">✈️</div>
          <div class="summary-content">
            <div class="summary-value">${results.plannedUsage > 0 ? '-' + results.plannedUsage.toFixed(1) : '0'}</div>
            <div class="summary-label">Planned Usage</div>
          </div>
        </div>
      </div>
      
      ${results.hoursLostToCap > 0 ? `
        <div class="cap-warning">
          <span class="warning-icon">⚠️</span>
          <div class="warning-content">
            <strong>Balance Cap Warning</strong>
            <p>You will hit your ${results.maxBalance} hour cap and lose approximately ${results.hoursLostToCap.toFixed(1)} hours. Consider using PTO before reaching the cap.</p>
          </div>
        </div>
      ` : ''}
      
      <div class="calculation-breakdown">
        <h3>📋 Calculation Breakdown</h3>
        <div class="breakdown-table-container">
          <table class="breakdown-table">
            <tbody>
              <tr>
                <td>Starting Balance</td>
                <td class="text-right">${results.currentBalance.toFixed(1)} hours</td>
              </tr>
              <tr>
                <td>Time Period</td>
                <td class="text-right">${results.daysDiff} days (${results.periods.toFixed(1)} pay periods)</td>
              </tr>
              <tr>
                <td>Accrual Rate</td>
                <td class="text-right">${results.accrualPerPeriod.toFixed(2)} hours/period</td>
              </tr>
              <tr>
                <td>Total Accrued</td>
                <td class="text-right text-success">+${results.totalAccrued.toFixed(1)} hours</td>
              </tr>
              ${results.plannedUsage > 0 ? `
                <tr>
                  <td>Planned PTO Usage</td>
                  <td class="text-right text-danger">-${results.plannedUsage.toFixed(1)} hours</td>
                </tr>
              ` : ''}
              ${results.hoursLostToCap > 0 ? `
                <tr>
                  <td>Lost to Cap</td>
                  <td class="text-right text-warning">-${results.hoursLostToCap.toFixed(1)} hours</td>
                </tr>
              ` : ''}
              <tr class="total-row">
                <td><strong>Projected Balance</strong></td>
                <td class="text-right"><strong>${results.projectedBalance.toFixed(1)} hours</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      ${results.plannedInRange.length > 0 ? `
        <div class="planned-pto-breakdown">
          <h3>✈️ Planned Time Off</h3>
          <div class="planned-list">
            ${results.plannedInRange.map(pto => `
              <div class="planned-item">
                <span class="planned-desc">${pto.description || 'Time Off'}</span>
                <span class="planned-date">${formatDateDisplay(pto.date)}</span>
                <span class="planned-hours">${pto.hours} hours</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      ${generateTimelineChart(results.timeline)}
      
      <div class="insights-section">
        <h3>💡 Insights</h3>
        <div class="insights-grid">
          <div class="insight-card insight-info">
            <div class="insight-icon">📊</div>
            <div class="insight-content">
              <h5>Annual Accrual Rate</h5>
              <p>You earn approximately ${Math.round(results.annualAccrual)} hours (${(Math.round(results.annualAccrual / 8))} days) of PTO per year.</p>
            </div>
          </div>
          <div class="insight-card insight-success">
            <div class="insight-icon">🗓️</div>
            <div class="insight-content">
              <h5>Vacation Potential</h5>
              <p>Your projected balance equals ${results.weeksWorthOfPTO} weeks of time off.</p>
            </div>
          </div>
          ${results.hoursLostToCap > 0 ? `
            <div class="insight-card insight-warning">
              <div class="insight-icon">⏰</div>
              <div class="insight-content">
                <h5>Use It or Lose It</h5>
                <p>Plan to use at least ${results.hoursLostToCap.toFixed(0)} hours before ${formatDateShort(results.targetDate)} to avoid losing time.</p>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function generateTimeToAccrueHTML(results) {
    if (results.alreadyMet) {
      return `
        <div class="result-header">
          <h2>🎉 Goal Already Achieved!</h2>
          <p>You already have enough PTO hours</p>
        </div>
        
        <div class="pto-summary-cards">
          <div class="summary-card primary">
            <div class="summary-icon">✅</div>
            <div class="summary-content">
              <div class="summary-value text-success">${results.currentBalance.toFixed(1)}</div>
              <div class="summary-label">Current Balance (hours)</div>
            </div>
          </div>
          <div class="summary-card">
            <div class="summary-icon">🎯</div>
            <div class="summary-content">
              <div class="summary-value">${results.targetHours}</div>
              <div class="summary-label">Target Hours</div>
            </div>
          </div>
          <div class="summary-card">
            <div class="summary-icon">➕</div>
            <div class="summary-content">
              <div class="summary-value text-success">+${results.surplus.toFixed(1)}</div>
              <div class="summary-label">Surplus Hours</div>
            </div>
          </div>
        </div>
        
        <div class="success-message">
          <span class="success-icon">🏖️</span>
          <p>Great news! You have ${results.surplus.toFixed(1)} more hours than your target. You're ready to book that time off!</p>
        </div>
      `;
    }
    
    if (results.frontloaded) {
      return `
        <div class="result-header">
          <h2>📅 Frontloaded PTO</h2>
          <p>${results.message}</p>
        </div>
        
        <div class="pto-summary-cards">
          <div class="summary-card">
            <div class="summary-icon">🏖️</div>
            <div class="summary-content">
              <div class="summary-value">${results.currentBalance.toFixed(1)}</div>
              <div class="summary-label">Current Balance</div>
            </div>
          </div>
          <div class="summary-card">
            <div class="summary-icon">🎯</div>
            <div class="summary-content">
              <div class="summary-value">${results.targetHours}</div>
              <div class="summary-label">Target Hours</div>
            </div>
          </div>
          <div class="summary-card">
            <div class="summary-icon">📆</div>
            <div class="summary-content">
              <div class="summary-value">${results.annualPTOHours}</div>
              <div class="summary-label">Annual Allocation</div>
            </div>
          </div>
        </div>
        
        <div class="info-message">
          <span class="info-icon">ℹ️</span>
          <p>With frontloaded PTO, you receive your entire annual allocation at once (typically on your anniversary date or January 1st). You need ${results.hoursNeeded.toFixed(1)} more hours to reach your goal.</p>
        </div>
      `;
    }
    
    return `
      <div class="result-header">
        <h2>⏱️ Time to Accrue Results</h2>
        <p>Here's how long it will take to reach ${results.targetHours} hours of PTO</p>
      </div>
      
      <div class="pto-summary-cards">
        <div class="summary-card primary">
          <div class="summary-icon">📅</div>
          <div class="summary-content">
            <div class="summary-value">${formatDateShort(results.targetDate)}</div>
            <div class="summary-label">Target Date</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">⏳</div>
          <div class="summary-content">
            <div class="summary-value">${results.daysNeeded}</div>
            <div class="summary-label">Days Needed</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">📊</div>
          <div class="summary-content">
            <div class="summary-value">${Math.ceil(results.periodsNeeded)}</div>
            <div class="summary-label">Pay Periods</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">🎯</div>
          <div class="summary-content">
            <div class="summary-value">${results.hoursNeeded.toFixed(1)}</div>
            <div class="summary-label">Hours to Accrue</div>
          </div>
        </div>
      </div>
      
      ${results.willHitCap ? `
        <div class="cap-warning">
          <span class="warning-icon">⚠️</span>
          <div class="warning-content">
            <strong>Balance Cap Notice</strong>
            <p>Your target of ${results.targetHours} hours exceeds your maximum balance cap. The calculation uses your cap of ${results.effectiveTarget.toFixed(1)} hours instead.</p>
          </div>
        </div>
      ` : ''}
      
      <div class="time-breakdown">
        <h3>📋 Time Breakdown</h3>
        <div class="time-cards">
          <div class="time-card">
            <div class="time-value">${results.daysNeeded}</div>
            <div class="time-label">Days</div>
          </div>
          <div class="time-card">
            <div class="time-value">${results.weeksNeeded.toFixed(1)}</div>
            <div class="time-label">Weeks</div>
          </div>
          <div class="time-card">
            <div class="time-value">${results.monthsNeeded.toFixed(1)}</div>
            <div class="time-label">Months</div>
          </div>
        </div>
      </div>
      
      <div class="calculation-breakdown">
        <h3>📊 Calculation Details</h3>
        <div class="breakdown-table-container">
          <table class="breakdown-table">
            <tbody>
              <tr>
                <td>Current Balance</td>
                <td class="text-right">${results.currentBalance.toFixed(1)} hours</td>
              </tr>
              <tr>
                <td>Target Balance</td>
                <td class="text-right">${results.targetHours.toFixed(1)} hours</td>
              </tr>
              <tr>
                <td>Hours Needed</td>
                <td class="text-right">${results.hoursNeeded.toFixed(1)} hours</td>
              </tr>
              <tr>
                <td>Accrual Rate</td>
                <td class="text-right">${results.accrualPerPeriod.toFixed(2)} hours/${getPayPeriodLabel(results.payPeriodFrequency)}</td>
              </tr>
              <tr class="total-row">
                <td><strong>You'll Reach Your Goal</strong></td>
                <td class="text-right"><strong>${formatDateDisplay(results.targetDate)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="insights-section">
        <h3>💡 Tips</h3>
        <div class="insights-grid">
          <div class="insight-card insight-info">
            <div class="insight-icon">📆</div>
            <div class="insight-content">
              <h5>Plan Ahead</h5>
              <p>Mark ${formatDateShort(results.targetDate)} on your calendar - that's when you'll have enough PTO!</p>
            </div>
          </div>
          <div class="insight-card insight-success">
            <div class="insight-icon">💰</div>
            <div class="insight-content">
              <h5>Consider Timing</h5>
              <p>Book time off shortly after ${formatDateShort(results.targetDate)} to maximize your PTO usage.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function generatePTOValueHTML(results) {
    return `
      <div class="result-header">
        <h2>💰 PTO Value Analysis</h2>
        <p>Understanding the monetary value of your paid time off</p>
      </div>
      
      <div class="pto-summary-cards">
        <div class="summary-card primary">
          <div class="summary-icon">💵</div>
          <div class="summary-content">
            <div class="summary-value">${formatCurrency(results.currentValue)}</div>
            <div class="summary-label">Current PTO Value</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">🏖️</div>
          <div class="summary-content">
            <div class="summary-value">${results.currentBalance.toFixed(1)}</div>
            <div class="summary-label">Hours Banked</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">📅</div>
          <div class="summary-content">
            <div class="summary-value">${results.daysWorth.toFixed(1)}</div>
            <div class="summary-label">Days Worth</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">💲</div>
          <div class="summary-content">
            <div class="summary-value">${formatCurrency(results.hourlyRate)}</div>
            <div class="summary-label">Hourly Rate</div>
          </div>
        </div>
      </div>
      
      ${results.futureResults ? `
        <div class="future-value-section">
          <h3>📈 Future Value Projection</h3>
          <div class="future-value-card">
            <div class="future-value-row">
              <span>Projected Balance on ${formatDateShort(results.futureResults.targetDate)}:</span>
              <strong>${results.futureResults.projectedBalance.toFixed(1)} hours</strong>
            </div>
            <div class="future-value-row primary">
              <span>Projected Value:</span>
              <strong>${formatCurrency(results.futureValue)}</strong>
            </div>
            <div class="future-value-row">
              <span>Value Increase:</span>
              <strong class="text-success">+${formatCurrency(results.futureValue - results.currentValue)}</strong>
            </div>
          </div>
        </div>
      ` : ''}
      
      <div class="value-breakdown">
        <h3>📊 Value Breakdown</h3>
        <div class="value-cards">
          <div class="value-card">
            <div class="value-label">Per Hour</div>
            <div class="value-amount">${formatCurrency(results.hourlyRate)}</div>
          </div>
          <div class="value-card">
            <div class="value-label">Per Day (8 hrs)</div>
            <div class="value-amount">${formatCurrency(results.valuePerDay)}</div>
          </div>
          <div class="value-card">
            <div class="value-label">Per Week (40 hrs)</div>
            <div class="value-amount">${formatCurrency(results.valuePerWeek)}</div>
          </div>
          <div class="value-card highlight">
            <div class="value-label">Annual PTO Value</div>
            <div class="value-amount">${formatCurrency(results.annualValue)}</div>
            <div class="value-detail">${results.annualAccrual.toFixed(0)} hours/year</div>
          </div>
        </div>
      </div>
      
      <div class="insights-section">
        <h3>💡 Insights</h3>
        <div class="insights-grid">
          <div class="insight-card insight-info">
            <div class="insight-icon">💼</div>
            <div class="insight-content">
              <h5>Total Compensation</h5>
              <p>Your annual PTO benefit adds ${formatCurrency(results.annualValue)} to your total compensation package.</p>
            </div>
          </div>
          <div class="insight-card insight-success">
            <div class="insight-icon">📈</div>
            <div class="insight-content">
              <h5>Current Savings</h5>
              <p>Your banked PTO represents ${results.weeksWorth.toFixed(1)} weeks of paid time off worth ${formatCurrency(results.currentValue)}.</p>
            </div>
          </div>
          <div class="insight-card insight-warning">
            <div class="insight-icon">⚠️</div>
            <div class="insight-content">
              <h5>Payout Consideration</h5>
              <p>Many companies pay out unused PTO upon separation. Check your company's policy on PTO payout.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function generateTimelineChart(timeline) {
    if (!timeline || timeline.length < 2) return '';
    
    const maxBalance = Math.max(...timeline.map(t => t.balance));
    const minBalance = Math.min(...timeline.map(t => t.balance));
    const range = maxBalance - minBalance || 1;
    
    const chartHeight = 200;
    
    return `
      <div class="timeline-chart">
        <h3>📈 Balance Timeline</h3>
        <div class="chart-container">
          <div class="chart-y-axis">
            <span>${maxBalance.toFixed(0)}h</span>
            <span>${((maxBalance + minBalance) / 2).toFixed(0)}h</span>
            <span>${minBalance.toFixed(0)}h</span>
          </div>
          <div class="chart-area">
            <div class="chart-bars">
              ${timeline.map((point, index) => {
                const height = ((point.balance - minBalance) / range) * 100;
                return `
                  <div class="chart-bar-wrapper" style="flex: 1;">
                    <div class="chart-bar" style="height: ${Math.max(height, 5)}%;" 
                         title="${point.label}: ${point.balance.toFixed(1)} hours">
                      <span class="chart-bar-value">${point.balance.toFixed(0)}</span>
                    </div>
                    <span class="chart-bar-label">${point.label}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
        <div class="chart-legend">
          <span class="legend-item"><span class="legend-dot"></span> PTO Balance</span>
        </div>
      </div>
    `;
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
    // Reset form values
    if (elements.accrualType) elements.accrualType.value = 'per-pay-period';
    if (elements.payPeriodFrequency) elements.payPeriodFrequency.value = 'biweekly';
    if (elements.accrualRate) elements.accrualRate.value = '4.62';
    if (elements.annualPTOHours) elements.annualPTOHours.value = '120';
    if (elements.currentBalance) elements.currentBalance.value = '';
    if (elements.maxBalance) elements.maxBalance.value = '';
    if (elements.maxCarryover) elements.maxCarryover.value = '';
    if (elements.targetHours) elements.targetHours.value = '';
    if (elements.hourlyRate) elements.hourlyRate.value = '';
    if (elements.annualSalary) elements.annualSalary.value = '';
    if (elements.hoursPerPTO) elements.hoursPerPTO.value = '30';
    if (elements.hoursWorkedPerPeriod) elements.hoursWorkedPerPeriod.value = '80';
    
    // Clear planned PTO
    state.plannedPTO = [];
    state.ptoCounter = 0;
    if (elements.plannedPTOContainer) {
      elements.plannedPTOContainer.innerHTML = '';
    }
    
    // Reset dates
    setDefaultDates();
    
    // Reset mode
    setMode('future-balance');
    
    // Update UI
    updateUI();
    
    // Hide results
    if (elements.resultDiv) {
      elements.resultDiv.classList.add('hidden');
    }
    
    // Clear URL params
    const newURL = window.location.pathname;
    window.history.replaceState({}, '', newURL);
  }

  function shareCalculation() {
    const url = window.location.href;
    
    const shareData = {
      title: 'PTO Calculator',
      text: 'Check out my PTO calculation',
      url: url
    };
    
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showCopyConfirmation();
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      showCopyConfirmation();
    } catch (err) {
      alert('Failed to copy link. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textarea);
  }

  function showCopyConfirmation() {
    if (elements.shareBtn) {
      const originalHTML = elements.shareBtn.innerHTML;
      elements.shareBtn.innerHTML = '✓ Link Copied!';
      elements.shareBtn.style.background = '#10b981';
      elements.shareBtn.style.borderColor = '#10b981';
      elements.shareBtn.style.color = 'white';
      
      setTimeout(() => {
        elements.shareBtn.innerHTML = originalHTML;
        elements.shareBtn.style.background = '';
        elements.shareBtn.style.borderColor = '';
        elements.shareBtn.style.color = '';
      }, 2000);
    }
  }

  // Helper functions
  function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
  }

  function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) element.value = value;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  function formatDateShort(date) {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  function formatDateDisplay(date) {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  function getPayPeriodLabel(frequency) {
    const labels = {
      'weekly': 'week',
      'biweekly': 'pay period',
      'semi-monthly': 'pay period',
      'monthly': 'month'
    };
    return labels[frequency] || 'period';
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

// Add result styling
const ptoStyle = document.createElement('style');
ptoStyle.textContent = `
  /* PTO Summary Cards */
  .pto-summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .summary-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 1px solid #e5e7eb;
  }
  
  .summary-card.primary {
    background: linear-gradient(135deg, #E8F4F8 0%, white 100%);
    border: 2px solid var(--color-light-blue);
  }
  
  .summary-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .summary-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-primary-blue);
    font-family: var(--font-primary);
  }
  
  .summary-label {
    font-size: 0.85rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }
  
  /* Warning/Success Messages */
  .cap-warning, .info-message {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    margin: 1.5rem 0;
  }
  
  .cap-warning {
    background: #fef3c7;
    border: 1px solid #fcd34d;
  }
  
  .info-message {
    background: #eff6ff;
    border: 1px solid #93c5fd;
  }
  
  .success-message {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: #f0fdf4;
    border: 1px solid #86efac;
    border-radius: 12px;
    margin: 1.5rem 0;
  }
  
  .warning-icon, .info-icon, .success-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  .warning-content strong, .success-message p {
    display: block;
    margin-bottom: 0.25rem;
    color: #92400e;
  }
  
  .success-message p {
    color: #166534;
    margin: 0;
  }
  
  .warning-content p {
    margin: 0;
    font-size: 0.9rem;
    color: #78350f;
  }
  
  /* Calculation Breakdown */
  .calculation-breakdown {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }
  
  .calculation-breakdown h3 {
    margin: 0 0 1rem 0;
    color: var(--color-primary-blue);
  }
  
  .breakdown-table-container {
    overflow-x: auto;
  }
  
  .breakdown-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .breakdown-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .breakdown-table .text-right {
    text-align: right;
  }
  
  .breakdown-table .text-success {
    color: #10b981;
  }
  
  .breakdown-table .text-danger {
    color: #ef4444;
  }
  
  .breakdown-table .text-warning {
    color: #f59e0b;
  }
  
  .breakdown-table .total-row {
    background: #f8f9fa;
  }
  
  .breakdown-table .total-row td {
    border-bottom: none;
    padding: 1rem;
  }
  
  /* Planned PTO Breakdown */
  .planned-pto-breakdown {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }
  
  .planned-pto-breakdown h3 {
    margin: 0 0 1rem 0;
    color: var(--color-primary-blue);
  }
  
  .planned-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .planned-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 3px solid var(--color-accent-orange);
  }
  
  .planned-desc {
    font-weight: 600;
    color: #374151;
  }
  
  .planned-date {
    color: #6b7280;
    font-size: 0.9rem;
  }
  
  .planned-hours {
    font-weight: 600;
    color: #ef4444;
  }
  
  /* Timeline Chart */
  .timeline-chart {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }
  
  .timeline-chart h3 {
    margin: 0 0 1.5rem 0;
    color: var(--color-primary-blue);
  }
  
  .chart-container {
    display: flex;
    gap: 1rem;
    height: 200px;
  }
  
  .chart-y-axis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #6b7280;
    text-align: right;
    padding: 0 0.5rem;
    min-width: 50px;
  }
  
  .chart-area {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .chart-bars {
    flex: 1;
    display: flex;
    align-items: flex-end;
    gap: 4px;
    padding-bottom: 24px;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .chart-bar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  
  .chart-bar {
    width: 100%;
    max-width: 60px;
    background: linear-gradient(180deg, var(--color-accent-orange) 0%, #ff9f6b 100%);
    border-radius: 4px 4px 0 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 4px;
    transition: all 0.3s;
    cursor: pointer;
    min-height: 20px;
  }
  
  .chart-bar:hover {
    filter: brightness(1.1);
    transform: scaleY(1.02);
    transform-origin: bottom;
  }
  
  .chart-bar-value {
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
  
  .chart-bar-label {
    position: absolute;
    bottom: 0;
    font-size: 0.65rem;
    color: #6b7280;
    margin-top: 4px;
    white-space: nowrap;
  }
  
  .chart-legend {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: #6b7280;
  }
  
  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    background: var(--color-accent-orange);
  }
  
  /* Time Breakdown */
  .time-breakdown {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }
  
  .time-breakdown h3 {
    margin: 0 0 1.5rem 0;
    color: var(--color-primary-blue);
  }
  
  .time-cards {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  .time-card {
    text-align: center;
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #E8F4F8 0%, white 100%);
    border-radius: 12px;
    border: 2px solid var(--color-light-blue);
    min-width: 120px;
  }
  
  .time-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-primary-blue);
    font-family: var(--font-primary);
  }
  
  .time-label {
    font-size: 0.9rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }
  
  /* Value Cards */
  .value-breakdown {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }
  
  .value-breakdown h3 {
    margin: 0 0 1.5rem 0;
    color: var(--color-primary-blue);
  }
  
  .value-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
  }
  
  .value-card {
    text-align: center;
    padding: 1.5rem 1rem;
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }
  
  .value-card.highlight {
    background: linear-gradient(135deg, #E8F4F8 0%, white 100%);
    border: 2px solid var(--color-light-blue);
  }
  
  .value-label {
    font-size: 0.85rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  .value-amount {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-accent-orange);
    font-family: var(--font-primary);
  }
  
  .value-detail {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 0.25rem;
  }
  
  /* Future Value Section */
  .future-value-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }
  
  .future-value-section h3 {
    margin: 0 0 1rem 0;
    color: var(--color-primary-blue);
  }
  
  .future-value-card {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1rem;
  }
  
  .future-value-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .future-value-row:last-child {
    border-bottom: none;
  }
  
  .future-value-row.primary {
    background: linear-gradient(135deg, #E8F4F8 0%, white 100%);
    margin: 0.5rem -1rem;
    padding: 1rem;
    border-radius: 8px;
    border: none;
  }
  
  .future-value-row.primary strong {
    font-size: 1.25rem;
    color: var(--color-accent-orange);
  }
  
  /* Insights Section */
  .insights-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }
  
  .insights-section h3 {
    margin: 0 0 1rem 0;
    color: var(--color-primary-blue);
  }
  
  .insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .insight-card {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }
  
  .insight-card.insight-success {
    background: #f0fdf4;
    border-color: #86efac;
  }
  
  .insight-card.insight-info {
    background: #eff6ff;
    border-color: #93c5fd;
  }
  
  .insight-card.insight-warning {
    background: #fef3c7;
    border-color: #fcd34d;
  }
  
  .insight-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .insight-content h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: #111827;
  }
  
  .insight-content p {
    margin: 0;
    font-size: 0.9rem;
    color: #4b5563;
  }
  
  /* Error Message */
  .error-message {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    color: #991b1b;
  }
  
  .error-icon {
    font-size: 1.5rem;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .pto-summary-cards {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .summary-value {
      font-size: 1.5rem;
    }
    
    .time-cards {
      gap: 1rem;
    }
    
    .time-card {
      padding: 1rem;
      min-width: 100px;
    }
    
    .time-value {
      font-size: 2rem;
    }
    
    .chart-container {
      height: 180px;
    }
    
    .chart-y-axis {
      min-width: 40px;
      font-size: 0.65rem;
    }
    
    .planned-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
  }
  
  @media (max-width: 480px) {
    .pto-summary-cards {
      grid-template-columns: 1fr;
    }
    
    .value-cards {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .insights-grid {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(ptoStyle);