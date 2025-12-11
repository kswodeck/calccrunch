// Random Number Generator with URL State Management
(function() {
  'use strict';

  // Default values
  const DEFAULTS = {
    min: 1,
    max: 100,
    count: 1,
    numberType: 'any',
    divisibleBy: 5,
    allowDuplicates: true,
    sortResults: false,
    sortDescending: false,
    showStats: true,
    decimalPlaces: 0,
    excludeNumbers: '',
    useStep: false,
    stepValue: 1,
    separator: 'comma',
    prefix: ''
  };

  // State
  let state = { ...DEFAULTS };
  let generatedNumbers = [];

  // DOM Elements cache
  let elements = {};

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('Random Number Generator initializing...');
    cacheElements();
    
    if (!elements.generateBtn) {
      console.error('Random Number Generator: Generate button not found');
      return;
    }
    
    console.log('Random Number Generator: Elements cached successfully');
    loadFromURL();
    attachEventListeners();
    console.log('Random Number Generator initialized successfully');
  }

  function cacheElements() {
    elements = {
      form: document.getElementById('rng-form'),
      generateBtn: document.getElementById('generate-btn'),
      shareBtn: document.getElementById('share-btn'),
      resetBtn: document.getElementById('reset-btn'),
      resultDiv: document.getElementById('rng-result'),
      // Range inputs
      minValue: document.getElementById('min-value'),
      maxValue: document.getElementById('max-value'),
      // Generation settings
      count: document.getElementById('count'),
      countMinus: document.getElementById('count-minus'),
      countPlus: document.getElementById('count-plus'),
      numberType: document.getElementById('number-type'),
      divisibleRow: document.getElementById('divisible-row'),
      divisibleBy: document.getElementById('divisible-by'),
      // Options
      allowDuplicates: document.getElementById('allow-duplicates'),
      sortResults: document.getElementById('sort-results'),
      sortDescending: document.getElementById('sort-descending'),
      showStats: document.getElementById('show-stats'),
      // Advanced
      toggleAdvanced: document.getElementById('toggle-advanced'),
      advancedOptions: document.getElementById('advanced-options'),
      decimalPlaces: document.getElementById('decimal-places'),
      excludeNumbers: document.getElementById('exclude-numbers'),
      useStep: document.getElementById('use-step'),
      stepGroup: document.getElementById('step-group'),
      stepValue: document.getElementById('step-value'),
      separator: document.getElementById('separator'),
      prefix: document.getElementById('prefix')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('min')) state.min = parseFloat(params.get('min'));
    if (params.has('max')) state.max = parseFloat(params.get('max'));
    if (params.has('cnt')) state.count = parseInt(params.get('cnt')) || DEFAULTS.count;
    if (params.has('type')) state.numberType = params.get('type');
    if (params.has('divBy')) state.divisibleBy = parseInt(params.get('divBy')) || DEFAULTS.divisibleBy;
    if (params.has('dup')) state.allowDuplicates = params.get('dup') === '1';
    if (params.has('sort')) state.sortResults = params.get('sort') === '1';
    if (params.has('desc')) state.sortDescending = params.get('desc') === '1';
    if (params.has('stats')) state.showStats = params.get('stats') === '1';
    if (params.has('dec')) state.decimalPlaces = parseInt(params.get('dec')) || 0;
    if (params.has('excl')) state.excludeNumbers = decodeURIComponent(params.get('excl'));
    if (params.has('step')) state.useStep = params.get('step') === '1';
    if (params.has('stepVal')) state.stepValue = parseFloat(params.get('stepVal')) || DEFAULTS.stepValue;
    if (params.has('sep')) state.separator = params.get('sep');
    if (params.has('pre')) state.prefix = decodeURIComponent(params.get('pre'));
    
    applyStateToForm();
    
    // If URL has parameters, generate automatically
    if (params.toString().length > 0) {
      setTimeout(() => generateNumbers(), 100);
    }
  }

  function applyStateToForm() {
    if (elements.minValue) elements.minValue.value = state.min;
    if (elements.maxValue) elements.maxValue.value = state.max;
    if (elements.count) elements.count.value = state.count;
    if (elements.numberType) elements.numberType.value = state.numberType;
    if (elements.divisibleBy) elements.divisibleBy.value = state.divisibleBy;
    if (elements.allowDuplicates) elements.allowDuplicates.checked = state.allowDuplicates;
    if (elements.sortResults) elements.sortResults.checked = state.sortResults;
    if (elements.sortDescending) elements.sortDescending.checked = state.sortDescending;
    if (elements.showStats) elements.showStats.checked = state.showStats;
    if (elements.decimalPlaces) elements.decimalPlaces.value = state.decimalPlaces;
    if (elements.excludeNumbers) elements.excludeNumbers.value = state.excludeNumbers;
    if (elements.useStep) elements.useStep.checked = state.useStep;
    if (elements.stepValue) elements.stepValue.value = state.stepValue;
    if (elements.separator) elements.separator.value = state.separator;
    if (elements.prefix) elements.prefix.value = state.prefix;
    
    // Show/hide divisible row
    updateDivisibleVisibility();
    // Show/hide step input
    updateStepVisibility();
    // Update preset buttons
    updatePresetButtons();
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    if (state.min !== DEFAULTS.min) params.set('min', state.min);
    if (state.max !== DEFAULTS.max) params.set('max', state.max);
    if (state.count !== DEFAULTS.count) params.set('cnt', state.count);
    if (state.numberType !== DEFAULTS.numberType) params.set('type', state.numberType);
    if (state.numberType === 'divisible' && state.divisibleBy !== DEFAULTS.divisibleBy) {
      params.set('divBy', state.divisibleBy);
    }
    if (state.allowDuplicates !== DEFAULTS.allowDuplicates) params.set('dup', state.allowDuplicates ? '1' : '0');
    if (state.sortResults !== DEFAULTS.sortResults) params.set('sort', state.sortResults ? '1' : '0');
    if (state.sortDescending !== DEFAULTS.sortDescending) params.set('desc', state.sortDescending ? '1' : '0');
    if (state.showStats !== DEFAULTS.showStats) params.set('stats', state.showStats ? '1' : '0');
    if (state.decimalPlaces !== DEFAULTS.decimalPlaces) params.set('dec', state.decimalPlaces);
    if (state.excludeNumbers) params.set('excl', encodeURIComponent(state.excludeNumbers));
    if (state.useStep) params.set('step', '1');
    if (state.useStep && state.stepValue !== DEFAULTS.stepValue) params.set('stepVal', state.stepValue);
    if (state.separator !== DEFAULTS.separator) params.set('sep', state.separator);
    if (state.prefix) params.set('pre', encodeURIComponent(state.prefix));
    
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  }

  function attachEventListeners() {
    // Generate button
    if (elements.generateBtn) {
      elements.generateBtn.addEventListener('click', () => {
        generateNumbers();
        elements.resultDiv?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    
    // Share button
    if (elements.shareBtn) {
      elements.shareBtn.addEventListener('click', shareSettings);
    }
    
    // Reset button
    if (elements.resetBtn) {
      elements.resetBtn.addEventListener('click', resetToDefaults);
    }
    
    // Range inputs
    if (elements.minValue) {
      elements.minValue.addEventListener('input', (e) => {
        state.min = parseFloat(e.target.value) || 0;
        updatePresetButtons();
        debouncedSaveToURL();
      });
    }
    
    if (elements.maxValue) {
      elements.maxValue.addEventListener('input', (e) => {
        state.max = parseFloat(e.target.value) || 0;
        updatePresetButtons();
        debouncedSaveToURL();
      });
    }
    
    // Count controls
    if (elements.count) {
      elements.count.addEventListener('input', (e) => {
        let val = parseInt(e.target.value) || 1;
        val = Math.max(1, Math.min(1000, val));
        state.count = val;
        e.target.value = val;
        debouncedSaveToURL();
      });
    }
    
    if (elements.countMinus) {
      elements.countMinus.addEventListener('click', () => {
        if (state.count > 1) {
          state.count--;
          elements.count.value = state.count;
          saveToURL();
        }
      });
    }
    
    if (elements.countPlus) {
      elements.countPlus.addEventListener('click', () => {
        if (state.count < 1000) {
          state.count++;
          elements.count.value = state.count;
          saveToURL();
        }
      });
    }
    
    // Number type
    if (elements.numberType) {
      elements.numberType.addEventListener('change', (e) => {
        state.numberType = e.target.value;
        updateDivisibleVisibility();
        saveToURL();
      });
    }
    
    // Divisible by
    if (elements.divisibleBy) {
      elements.divisibleBy.addEventListener('input', (e) => {
        state.divisibleBy = parseInt(e.target.value) || 1;
        debouncedSaveToURL();
      });
    }
    
    // Range preset buttons
    document.querySelectorAll('.preset-btn[data-min]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const min = parseFloat(e.target.dataset.min);
        const max = parseFloat(e.target.dataset.max);
        state.min = min;
        state.max = max;
        elements.minValue.value = min;
        elements.maxValue.value = max;
        updatePresetButtons();
        saveToURL();
      });
    });
    
    // Option checkboxes
    const optionCheckboxes = [
      { el: 'allowDuplicates', key: 'allowDuplicates' },
      { el: 'sortResults', key: 'sortResults' },
      { el: 'sortDescending', key: 'sortDescending' },
      { el: 'showStats', key: 'showStats' }
    ];
    
    optionCheckboxes.forEach(({ el, key }) => {
      if (elements[el]) {
        elements[el].addEventListener('change', (e) => {
          state[key] = e.target.checked;
          debouncedSaveToURL();
        });
      }
    });
    
    // Toggle advanced options
    if (elements.toggleAdvanced) {
      elements.toggleAdvanced.addEventListener('click', () => {
        elements.toggleAdvanced.classList.toggle('active');
        elements.advancedOptions.classList.toggle('hidden');
        const isOpen = !elements.advancedOptions.classList.contains('hidden');
        elements.toggleAdvanced.querySelector('.toggle-text').textContent = 
          isOpen ? 'Hide Advanced Options' : 'Show Advanced Options';
      });
    }
    
    // Advanced options
    if (elements.decimalPlaces) {
      elements.decimalPlaces.addEventListener('change', (e) => {
        state.decimalPlaces = parseInt(e.target.value) || 0;
        debouncedSaveToURL();
      });
    }
    
    if (elements.excludeNumbers) {
      elements.excludeNumbers.addEventListener('input', (e) => {
        state.excludeNumbers = e.target.value;
        debouncedSaveToURL();
      });
    }
    
    if (elements.useStep) {
      elements.useStep.addEventListener('change', (e) => {
        state.useStep = e.target.checked;
        updateStepVisibility();
        debouncedSaveToURL();
      });
    }
    
    if (elements.stepValue) {
      elements.stepValue.addEventListener('input', (e) => {
        state.stepValue = parseFloat(e.target.value) || 1;
        debouncedSaveToURL();
      });
    }
    
    if (elements.separator) {
      elements.separator.addEventListener('change', (e) => {
        state.separator = e.target.value;
        debouncedSaveToURL();
      });
    }
    
    if (elements.prefix) {
      elements.prefix.addEventListener('input', (e) => {
        state.prefix = e.target.value;
        debouncedSaveToURL();
      });
    }
    
    // Enter key to generate
    document.querySelectorAll('#rng-form input, #rng-form select').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          generateNumbers();
        }
      });
    });
  }

  function updateDivisibleVisibility() {
    if (elements.divisibleRow) {
      elements.divisibleRow.classList.toggle('hidden', state.numberType !== 'divisible');
    }
  }

  function updateStepVisibility() {
    if (elements.stepGroup) {
      elements.stepGroup.classList.toggle('hidden', !state.useStep);
    }
  }

  function updatePresetButtons() {
    document.querySelectorAll('.preset-btn[data-min]').forEach(btn => {
      const min = parseFloat(btn.dataset.min);
      const max = parseFloat(btn.dataset.max);
      btn.classList.toggle('active', state.min === min && state.max === max);
    });
  }

  // Debounce utility
  let saveTimeout;
  function debouncedSaveToURL() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveToURL, 300);
  }

  // Number generation utilities
  function getSecureRandom() {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] / (0xFFFFFFFF + 1);
  }

  function getRandomInRange(min, max, decimals = 0) {
    const random = getSecureRandom();
    const value = min + random * (max - min);
    return decimals === 0 ? Math.floor(value) : parseFloat(value.toFixed(decimals));
  }

  function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }

  function getPrimesInRange(min, max) {
    const primes = [];
    for (let i = Math.ceil(min); i <= max; i++) {
      if (isPrime(i)) primes.push(i);
    }
    return primes;
  }

  function isPerfectSquare(n) {
    if (n < 0) return false;
    const sqrt = Math.sqrt(n);
    return sqrt === Math.floor(sqrt);
  }

  function getSquaresInRange(min, max) {
    const squares = [];
    const start = Math.ceil(Math.sqrt(Math.max(0, min)));
    for (let i = start; i * i <= max; i++) {
      if (i * i >= min) squares.push(i * i);
    }
    return squares;
  }

  function isPerfectCube(n) {
    const cbrt = Math.cbrt(n);
    return Math.round(cbrt) ** 3 === n;
  }

  function getCubesInRange(min, max) {
    const cubes = [];
    const start = Math.ceil(Math.cbrt(min));
    for (let i = start; i ** 3 <= max; i++) {
      if (i ** 3 >= min) cubes.push(i ** 3);
    }
    return cubes;
  }

  function getFibonacciInRange(min, max) {
    const fibs = [];
    let a = 0, b = 1;
    while (b <= max) {
      if (b >= min) fibs.push(b);
      [a, b] = [b, a + b];
    }
    return fibs;
  }

  function getNumberPool() {
    const min = state.min;
    const max = state.max;
    let pool = [];
    
    // Parse excluded numbers
    const excluded = new Set(
      state.excludeNumbers
        .split(',')
        .map(s => parseFloat(s.trim()))
        .filter(n => !isNaN(n))
    );
    
    switch (state.numberType) {
      case 'integer':
        for (let i = Math.ceil(min); i <= Math.floor(max); i++) {
          if (!excluded.has(i)) pool.push(i);
        }
        break;
        
      case 'odd':
        for (let i = Math.ceil(min); i <= Math.floor(max); i++) {
          if (i % 2 !== 0 && !excluded.has(i)) pool.push(i);
        }
        break;
        
      case 'even':
        for (let i = Math.ceil(min); i <= Math.floor(max); i++) {
          if (i % 2 === 0 && !excluded.has(i)) pool.push(i);
        }
        break;
        
      case 'prime':
        pool = getPrimesInRange(min, max).filter(n => !excluded.has(n));
        break;
        
      case 'square':
        pool = getSquaresInRange(min, max).filter(n => !excluded.has(n));
        break;
        
      case 'cube':
        pool = getCubesInRange(min, max).filter(n => !excluded.has(n));
        break;
        
      case 'fibonacci':
        pool = getFibonacciInRange(min, max).filter(n => !excluded.has(n));
        break;
        
      case 'divisible':
        const divisor = state.divisibleBy || 1;
        for (let i = Math.ceil(min / divisor) * divisor; i <= max; i += divisor) {
          if (i >= min && !excluded.has(i)) pool.push(i);
        }
        break;
        
      default: // 'any'
        if (state.useStep && state.stepValue > 0) {
          for (let i = min; i <= max; i += state.stepValue) {
            const rounded = parseFloat(i.toFixed(10));
            if (!excluded.has(rounded)) pool.push(rounded);
          }
        } else {
          // For 'any' type, we generate on the fly
          return null;
        }
    }
    
    return pool;
  }

  function generateNumbers() {
    updateStateFromForm();
    saveToURL();
    
    // Validation
    if (state.min > state.max) {
      showError('Minimum value must be less than or equal to maximum value.');
      return;
    }
    
    if (state.count < 1 || state.count > 1000) {
      showError('Number count must be between 1 and 1000.');
      return;
    }
    
    const pool = getNumberPool();
    
    // Check if we have enough numbers for unique generation
    if (!state.allowDuplicates && pool !== null && pool.length < state.count) {
      showError(`Cannot generate ${state.count} unique numbers. Only ${pool.length} numbers match your criteria.`);
      return;
    }
    
    if (pool !== null && pool.length === 0) {
      showError('No numbers match your criteria. Try adjusting the range or number type.');
      return;
    }
    
    generatedNumbers = [];
    const usedNumbers = new Set();
    
    for (let i = 0; i < state.count; i++) {
      let num;
      let attempts = 0;
      const maxAttempts = 10000;
      
      do {
        if (pool !== null) {
          // Pick from pool
          const index = Math.floor(getSecureRandom() * pool.length);
          num = pool[index];
        } else {
          // Generate 'any' number
          num = getRandomInRange(state.min, state.max, state.decimalPlaces);
          
          // Check exclusions
          const excluded = state.excludeNumbers
            .split(',')
            .map(s => parseFloat(s.trim()))
            .filter(n => !isNaN(n));
          
          if (excluded.includes(num)) {
            attempts++;
            continue;
          }
        }
        
        attempts++;
        
        if (state.allowDuplicates || !usedNumbers.has(num)) {
          break;
        }
      } while (attempts < maxAttempts);
      
      if (attempts >= maxAttempts) {
        showError('Could not generate enough unique numbers. Try allowing duplicates or adjusting your range.');
        return;
      }
      
      generatedNumbers.push(num);
      usedNumbers.add(num);
    }
    
    // Sort if needed
    if (state.sortResults) {
      generatedNumbers.sort((a, b) => state.sortDescending ? b - a : a - b);
    }
    
    displayResults();
  }

  function updateStateFromForm() {
    state.min = parseFloat(elements.minValue?.value) || 0;
    state.max = parseFloat(elements.maxValue?.value) || 100;
    state.count = parseInt(elements.count?.value) || 1;
    state.numberType = elements.numberType?.value || 'any';
    state.divisibleBy = parseInt(elements.divisibleBy?.value) || 5;
    state.allowDuplicates = elements.allowDuplicates?.checked ?? true;
    state.sortResults = elements.sortResults?.checked ?? false;
    state.sortDescending = elements.sortDescending?.checked ?? false;
    state.showStats = elements.showStats?.checked ?? true;
    state.decimalPlaces = parseInt(elements.decimalPlaces?.value) || 0;
    state.excludeNumbers = elements.excludeNumbers?.value || '';
    state.useStep = elements.useStep?.checked ?? false;
    state.stepValue = parseFloat(elements.stepValue?.value) || 1;
    state.separator = elements.separator?.value || 'comma';
    state.prefix = elements.prefix?.value || '';
  }

  function calculateStats(numbers) {
    if (numbers.length === 0) return null;
    
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / numbers.length;
    
    // Median
    let median;
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }
    
    // Mode
    const frequency = {};
    let maxFreq = 0;
    let mode = [];
    numbers.forEach(n => {
      frequency[n] = (frequency[n] || 0) + 1;
      if (frequency[n] > maxFreq) {
        maxFreq = frequency[n];
        mode = [n];
      } else if (frequency[n] === maxFreq && !mode.includes(n)) {
        mode.push(n);
      }
    });
    
    // Range
    const range = sorted[sorted.length - 1] - sorted[0];
    
    // Standard deviation
    const squaredDiffs = numbers.map(n => Math.pow(n - mean, 2));
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length;
    const stdDev = Math.sqrt(variance);
    
    // Odd/Even count
    const oddCount = numbers.filter(n => n % 2 !== 0).length;
    const evenCount = numbers.length - oddCount;
    
    return {
      sum,
      mean,
      median,
      mode: mode.length === numbers.length ? 'None' : mode.join(', '),
      min: sorted[0],
      max: sorted[sorted.length - 1],
      range,
      stdDev,
      oddCount,
      evenCount,
      count: numbers.length
    };
  }

  function formatNumber(num) {
    const prefix = state.prefix || '';
    if (state.decimalPlaces > 0 && state.numberType === 'any') {
      return prefix + num.toFixed(state.decimalPlaces);
    }
    return prefix + num.toString();
  }

  function getFormattedOutput() {
    const separators = {
      'comma': ', ',
      'space': ' ',
      'newline': '\n',
      'tab': '\t',
      'pipe': ' | '
    };
    const sep = separators[state.separator] || ', ';
    return generatedNumbers.map(formatNumber).join(sep);
  }

  function getNumberTypeLabel() {
    const labels = {
      'any': 'Any Number',
      'integer': 'Integers',
      'odd': 'Odd Numbers',
      'even': 'Even Numbers',
      'prime': 'Prime Numbers',
      'square': 'Perfect Squares',
      'cube': 'Perfect Cubes',
      'fibonacci': 'Fibonacci Numbers',
      'divisible': `Divisible by ${state.divisibleBy}`
    };
    return labels[state.numberType] || 'Numbers';
  }

  function createDistributionChart(numbers) {
    if (numbers.length < 2) return '';
    
    // Create buckets
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const range = max - min;
    
    if (range === 0) return '';
    
    const bucketCount = Math.min(10, Math.ceil(Math.sqrt(numbers.length)));
    const bucketSize = range / bucketCount;
    const buckets = new Array(bucketCount).fill(0);
    
    numbers.forEach(n => {
      let bucket = Math.floor((n - min) / bucketSize);
      if (bucket >= bucketCount) bucket = bucketCount - 1;
      buckets[bucket]++;
    });
    
    const maxCount = Math.max(...buckets);
    
    let barsHTML = '';
    buckets.forEach((count, i) => {
      const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
      const bucketMin = (min + i * bucketSize).toFixed(1);
      const bucketMax = (min + (i + 1) * bucketSize).toFixed(1);
      barsHTML += `
        <div class="chart-bar-container">
          <div class="chart-bar" style="height: ${height}%"></div>
          <span class="chart-bar-label">${bucketMin}</span>
          <span class="chart-bar-count">(${count})</span>
        </div>
      `;
    });
    
    return `
      <div class="distribution-section">
        <h4>📊 Distribution</h4>
        <div class="distribution-chart">${barsHTML}</div>
      </div>
    `;
  }

  function createOddEvenChart(stats) {
    if (stats.count === 0) return '';
    
    const oddPercent = ((stats.oddCount / stats.count) * 100).toFixed(1);
    const evenPercent = ((stats.evenCount / stats.count) * 100).toFixed(1);
    
    return `
      <div class="odd-even-section">
        <h4>🔢 Odd vs Even</h4>
        <div class="odd-even-bar">
          <div class="odd-segment" style="flex: ${stats.oddCount || 0.1}">${oddPercent}%</div>
          <div class="even-segment" style="flex: ${stats.evenCount || 0.1}">${evenPercent}%</div>
        </div>
        <div class="odd-even-legend">
          <div class="legend-item">
            <span class="legend-dot odd"></span>
            <span>Odd (${stats.oddCount})</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot even"></span>
            <span>Even (${stats.evenCount})</span>
          </div>
        </div>
      </div>
    `;
  }

  function createRangeVisual(stats) {
    const rangeStart = state.min;
    const rangeEnd = state.max;
    const totalRange = rangeEnd - rangeStart;
    
    if (totalRange <= 0) return '';
    
    const minPos = ((stats.min - rangeStart) / totalRange * 100).toFixed(1);
    const maxPos = ((stats.max - rangeStart) / totalRange * 100).toFixed(1);
    const width = (maxPos - minPos) || 1;
    
    return `
      <div class="range-visual">
        <h4>📏 Range Coverage</h4>
        <div class="range-line">
          <div class="range-fill" style="left: ${minPos}%; width: ${width}%"></div>
          <div class="range-marker" style="left: ${minPos}%">Min: ${formatNumber(stats.min)}</div>
          <div class="range-marker" style="left: ${maxPos}%">Max: ${formatNumber(stats.max)}</div>
        </div>
        <div class="range-labels">
          <span>${formatNumber(rangeStart)}</span>
          <span>${formatNumber(rangeEnd)}</span>
        </div>
      </div>
    `;
  }

  function displayResults() {
    if (!elements.resultDiv) return;
    
    const stats = calculateStats(generatedNumbers);
    const isSingleNumber = generatedNumbers.length === 1;
    
    // Numbers display
    let numbersHTML;
    if (isSingleNumber) {
      numbersHTML = `
        <div class="single-number-display">
          <div class="single-number">${formatNumber(generatedNumbers[0])}</div>
        </div>
      `;
    } else if (generatedNumbers.length <= 50) {
      numbersHTML = `
        <div class="numbers-grid">
          ${generatedNumbers.map((n, i) => `
            <span class="number-bubble" style="animation-delay: ${i * 0.02}s" onclick="copyNumber('${formatNumber(n)}', this)">
              ${formatNumber(n)}
            </span>
          `).join('')}
        </div>
      `;
    } else {
      numbersHTML = `
        <div class="numbers-text">${getFormattedOutput()}</div>
      `;
    }
    
    // Stats section
    let statsHTML = '';
    if (state.showStats && stats && generatedNumbers.length > 1) {
      statsHTML = `
        <div class="stats-section">
          <h4>📈 Statistics</h4>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">${formatNumber(stats.sum)}</div>
              <div class="stat-label">Sum</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.mean.toFixed(2)}</div>
              <div class="stat-label">Mean</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.median.toFixed(2)}</div>
              <div class="stat-label">Median</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.mode}</div>
              <div class="stat-label">Mode</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${formatNumber(stats.range)}</div>
              <div class="stat-label">Range</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.stdDev.toFixed(2)}</div>
              <div class="stat-label">Std Dev</div>
            </div>
          </div>
        </div>
        
        ${createOddEvenChart(stats)}
        ${createDistributionChart(generatedNumbers)}
        ${createRangeVisual(stats)}
      `;
    }
    
    const html = `
      <div class="result-header">
        <span class="type-badge">${getNumberTypeLabel()}</span>
        <h3>🎲 Generated ${generatedNumbers.length === 1 ? 'Number' : `${generatedNumbers.length} Numbers`}</h3>
      </div>
      
      <div class="numbers-display-container">
        <div class="numbers-display">
          ${numbersHTML}
        </div>
        <div class="result-actions">
          <button type="button" class="action-btn copy-btn" onclick="copyAllNumbers()">
            📋 Copy ${generatedNumbers.length === 1 ? 'Number' : 'All'}
          </button>
          <button type="button" class="action-btn regenerate-btn" onclick="regenerateNumbers()">
            🔄 Regenerate
          </button>
        </div>
      </div>
      
      ${statsHTML}
      
      <div class="calculations-grid">
        <div class="calc-card">
          <div class="calc-label">Range Used</div>
          <div class="calc-value">${formatNumber(state.min)} to ${formatNumber(state.max)}</div>
        </div>
        <div class="calc-card">
          <div class="calc-label">Duplicates</div>
          <div class="calc-value">${state.allowDuplicates ? 'Allowed' : 'Not Allowed'}</div>
        </div>
        ${generatedNumbers.length > 1 ? `
          <div class="calc-card">
            <div class="calc-label">Product</div>
            <div class="calc-value">${generatedNumbers.reduce((a, b) => a * b, 1).toExponential(2)}</div>
          </div>
        ` : ''}
      </div>
      
      <div class="info-box" style="margin-top: 2rem;">
        <h4>🔒 Security Note</h4>
        <p>
          These numbers are generated entirely in your browser using cryptographically secure 
          random number generation. No numbers are transmitted or stored anywhere.
        </p>
      </div>
    `;
    
    elements.resultDiv.innerHTML = html;
    elements.resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    if (!elements.resultDiv) return;
    
    elements.resultDiv.innerHTML = `
      <div class="error-message" style="background: #FEE2E2; border: 2px solid #EF4444; border-radius: 8px; padding: 1.5rem; text-align: center;">
        <h4 style="color: #DC2626; margin-bottom: 0.5rem;">⚠️ Generation Error</h4>
        <p style="color: #7F1D1D; margin: 0;">${message}</p>
      </div>
    `;
    elements.resultDiv.classList.remove('hidden');
  }

  // Global functions for onclick handlers
  window.copyAllNumbers = function() {
    const text = getFormattedOutput();
    copyToClipboard(text, document.querySelector('.copy-btn'));
  };

  window.copyNumber = function(number, element) {
    copyToClipboard(number, element);
  };

  function copyToClipboard(text, button) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showCopySuccess(button);
      }).catch(() => {
        fallbackCopy(text, button);
      });
    } else {
      fallbackCopy(text, button);
    }
  }

  function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      showCopySuccess(button);
    } catch (err) {
      alert('Failed to copy. Please copy manually.');
    }
    
    document.body.removeChild(textarea);
  }

  function showCopySuccess(button) {
    if (!button) return;
    
    const originalText = button.innerHTML;
    button.innerHTML = '✓ Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('copied');
    }, 1500);
  }

  window.regenerateNumbers = function() {
    generateNumbers();
  };

  function shareSettings() {
    const url = window.location.href;
    
    if (navigator.share && navigator.canShare && navigator.canShare({ url })) {
      navigator.share({
        title: 'Random Number Generator Settings',
        text: 'Check out my random number generator settings',
        url: url
      }).catch(() => {
        copyUrlToClipboard(url);
      });
    } else {
      copyUrlToClipboard(url);
    }
  }

  function copyUrlToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showShareSuccess();
      }).catch(() => {
        fallbackCopyUrl(text);
      });
    } else {
      fallbackCopyUrl(text);
    }
  }

  function fallbackCopyUrl(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      showShareSuccess();
    } catch (err) {
      alert('Failed to copy link. URL: ' + text);
    }
    
    document.body.removeChild(textarea);
  }

  function showShareSuccess() {
    const btn = elements.shareBtn;
    if (btn) {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '✓ Link Copied!';
      btn.style.background = 'var(--color-success)';
      btn.style.borderColor = 'var(--color-success)';
      btn.style.color = 'white';
      
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 2000);
    }
  }

  function resetToDefaults() {
    state = { ...DEFAULTS };
    applyStateToForm();
    saveToURL();
    
    // Hide results
    if (elements.resultDiv) {
      elements.resultDiv.classList.add('hidden');
    }
    
    // Close advanced options if open
    if (elements.advancedOptions && !elements.advancedOptions.classList.contains('hidden')) {
      elements.toggleAdvanced.click();
    }
  }

})();