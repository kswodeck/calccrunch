// Password Generator with URL State Management
(function() {
  'use strict';

  // Character sets
  const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  const AMBIGUOUS_CHARS = '0O1lI';
  const SIMILAR_CHARS = 'il1Lo0O';
  const BRACKET_CHARS = '(){}[]<>';

  // Default values
  const DEFAULTS = {
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
    excludeSimilar: false,
    excludeBrackets: false,
    customExclude: '',
    startWithLetter: false,
    noSequential: false,
    noRepeated: false,
    minUppercase: 0,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    count: 5,
    customSymbols: ''
  };

  // State
  let state = { ...DEFAULTS };
  let generatedPasswords = [];

  // DOM Elements cache
  let elements = {};

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('Password Generator initializing...');
    cacheElements();
    
    if (!elements.generateBtn) {
      console.error('Password Generator: Generate button not found');
      return;
    }
    
    console.log('Password Generator: Elements cached successfully');
    loadFromURL();
    attachEventListeners();
    updateLengthDisplay();
    console.log('Password Generator initialized successfully');
  }

  function cacheElements() {
    elements = {
      form: document.getElementById('password-generator-form'),
      generateBtn: document.getElementById('generate-btn'),
      shareBtn: document.getElementById('share-btn'),
      resetBtn: document.getElementById('reset-btn'),
      resultDiv: document.getElementById('password-result'),
      lengthSlider: document.getElementById('password-length'),
      lengthDisplay: document.getElementById('length-display'),
      toggleAdvanced: document.getElementById('toggle-advanced'),
      advancedOptions: document.getElementById('advanced-options'),
      // Character type checkboxes
      includeUppercase: document.getElementById('include-uppercase'),
      includeLowercase: document.getElementById('include-lowercase'),
      includeNumbers: document.getElementById('include-numbers'),
      includeSymbols: document.getElementById('include-symbols'),
      // Advanced options
      excludeAmbiguous: document.getElementById('exclude-ambiguous'),
      excludeSimilar: document.getElementById('exclude-similar'),
      excludeBrackets: document.getElementById('exclude-brackets'),
      customExclude: document.getElementById('custom-exclude'),
      startWithLetter: document.getElementById('start-with-letter'),
      noSequential: document.getElementById('no-sequential'),
      noRepeated: document.getElementById('no-repeated'),
      minUppercase: document.getElementById('min-uppercase'),
      minLowercase: document.getElementById('min-lowercase'),
      minNumbers: document.getElementById('min-numbers'),
      minSymbols: document.getElementById('min-symbols'),
      passwordCount: document.getElementById('password-count'),
      customSymbols: document.getElementById('custom-symbols')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load all parameters
    if (params.has('len')) state.length = parseInt(params.get('len')) || DEFAULTS.length;
    if (params.has('uc')) state.uppercase = params.get('uc') === '1';
    if (params.has('lc')) state.lowercase = params.get('lc') === '1';
    if (params.has('num')) state.numbers = params.get('num') === '1';
    if (params.has('sym')) state.symbols = params.get('sym') === '1';
    if (params.has('exAmb')) state.excludeAmbiguous = params.get('exAmb') === '1';
    if (params.has('exSim')) state.excludeSimilar = params.get('exSim') === '1';
    if (params.has('exBra')) state.excludeBrackets = params.get('exBra') === '1';
    if (params.has('exCust')) state.customExclude = decodeURIComponent(params.get('exCust'));
    if (params.has('startLtr')) state.startWithLetter = params.get('startLtr') === '1';
    if (params.has('noSeq')) state.noSequential = params.get('noSeq') === '1';
    if (params.has('noRep')) state.noRepeated = params.get('noRep') === '1';
    if (params.has('minUc')) state.minUppercase = parseInt(params.get('minUc')) || 0;
    if (params.has('minLc')) state.minLowercase = parseInt(params.get('minLc')) || 0;
    if (params.has('minNum')) state.minNumbers = parseInt(params.get('minNum')) || 0;
    if (params.has('minSym')) state.minSymbols = parseInt(params.get('minSym')) || 0;
    if (params.has('cnt')) state.count = parseInt(params.get('cnt')) || DEFAULTS.count;
    if (params.has('custSym')) state.customSymbols = decodeURIComponent(params.get('custSym'));
    
    // Apply state to form
    applyStateToForm();
    
    // If URL has parameters, generate passwords automatically
    if (params.toString().length > 0) {
      setTimeout(() => generatePasswords(), 100);
    }
  }

  function applyStateToForm() {
    if (elements.lengthSlider) elements.lengthSlider.value = state.length;
    if (elements.includeUppercase) elements.includeUppercase.checked = state.uppercase;
    if (elements.includeLowercase) elements.includeLowercase.checked = state.lowercase;
    if (elements.includeNumbers) elements.includeNumbers.checked = state.numbers;
    if (elements.includeSymbols) elements.includeSymbols.checked = state.symbols;
    if (elements.excludeAmbiguous) elements.excludeAmbiguous.checked = state.excludeAmbiguous;
    if (elements.excludeSimilar) elements.excludeSimilar.checked = state.excludeSimilar;
    if (elements.excludeBrackets) elements.excludeBrackets.checked = state.excludeBrackets;
    if (elements.customExclude) elements.customExclude.value = state.customExclude;
    if (elements.startWithLetter) elements.startWithLetter.checked = state.startWithLetter;
    if (elements.noSequential) elements.noSequential.checked = state.noSequential;
    if (elements.noRepeated) elements.noRepeated.checked = state.noRepeated;
    if (elements.minUppercase) elements.minUppercase.value = state.minUppercase;
    if (elements.minLowercase) elements.minLowercase.value = state.minLowercase;
    if (elements.minNumbers) elements.minNumbers.value = state.minNumbers;
    if (elements.minSymbols) elements.minSymbols.value = state.minSymbols;
    if (elements.passwordCount) elements.passwordCount.value = state.count;
    if (elements.customSymbols) elements.customSymbols.value = state.customSymbols;
    
    // Update preset buttons
    updatePresetButtons();
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    // Only save non-default values
    if (state.length !== DEFAULTS.length) params.set('len', state.length);
    if (state.uppercase !== DEFAULTS.uppercase) params.set('uc', state.uppercase ? '1' : '0');
    if (state.lowercase !== DEFAULTS.lowercase) params.set('lc', state.lowercase ? '1' : '0');
    if (state.numbers !== DEFAULTS.numbers) params.set('num', state.numbers ? '1' : '0');
    if (state.symbols !== DEFAULTS.symbols) params.set('sym', state.symbols ? '1' : '0');
    if (state.excludeAmbiguous) params.set('exAmb', '1');
    if (state.excludeSimilar) params.set('exSim', '1');
    if (state.excludeBrackets) params.set('exBra', '1');
    if (state.customExclude) params.set('exCust', encodeURIComponent(state.customExclude));
    if (state.startWithLetter) params.set('startLtr', '1');
    if (state.noSequential) params.set('noSeq', '1');
    if (state.noRepeated) params.set('noRep', '1');
    if (state.minUppercase > 0) params.set('minUc', state.minUppercase);
    if (state.minLowercase > 0) params.set('minLc', state.minLowercase);
    if (state.minNumbers > 0) params.set('minNum', state.minNumbers);
    if (state.minSymbols > 0) params.set('minSym', state.minSymbols);
    if (state.count !== DEFAULTS.count) params.set('cnt', state.count);
    if (state.customSymbols) params.set('custSym', encodeURIComponent(state.customSymbols));
    
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  }

  function attachEventListeners() {
    // Generate button
    if (elements.generateBtn) {
      elements.generateBtn.addEventListener('click', () => {
        generatePasswords();
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
    
    // Length slider
    if (elements.lengthSlider) {
      elements.lengthSlider.addEventListener('input', (e) => {
        state.length = parseInt(e.target.value);
        updateLengthDisplay();
        updatePresetButtons();
        debouncedSaveToURL();
      });
    }
    
    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const length = parseInt(e.target.dataset.length);
        state.length = length;
        elements.lengthSlider.value = length;
        updateLengthDisplay();
        updatePresetButtons();
        saveToURL();
      });
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
    
    // Character type checkboxes
    ['includeUppercase', 'includeLowercase', 'includeNumbers', 'includeSymbols'].forEach(id => {
      if (elements[id]) {
        elements[id].addEventListener('change', (e) => {
          const key = id.replace('include', '').toLowerCase();
          state[key] = e.target.checked;
          validateCharacterTypes();
          debouncedSaveToURL();
        });
      }
    });
    
    // Advanced option checkboxes
    const advancedCheckboxes = [
      { el: 'excludeAmbiguous', key: 'excludeAmbiguous' },
      { el: 'excludeSimilar', key: 'excludeSimilar' },
      { el: 'excludeBrackets', key: 'excludeBrackets' },
      { el: 'startWithLetter', key: 'startWithLetter' },
      { el: 'noSequential', key: 'noSequential' },
      { el: 'noRepeated', key: 'noRepeated' }
    ];
    
    advancedCheckboxes.forEach(({ el, key }) => {
      if (elements[el]) {
        elements[el].addEventListener('change', (e) => {
          state[key] = e.target.checked;
          debouncedSaveToURL();
        });
      }
    });
    
    // Text inputs
    if (elements.customExclude) {
      elements.customExclude.addEventListener('input', (e) => {
        state.customExclude = e.target.value;
        debouncedSaveToURL();
      });
    }
    
    if (elements.customSymbols) {
      elements.customSymbols.addEventListener('input', (e) => {
        state.customSymbols = e.target.value;
        debouncedSaveToURL();
      });
    }
    
    // Number inputs for minimums
    ['minUppercase', 'minLowercase', 'minNumbers', 'minSymbols'].forEach(id => {
      if (elements[id]) {
        elements[id].addEventListener('change', (e) => {
          state[id] = parseInt(e.target.value) || 0;
          debouncedSaveToURL();
        });
      }
    });
    
    // Password count
    if (elements.passwordCount) {
      elements.passwordCount.addEventListener('change', (e) => {
        state.count = parseInt(e.target.value);
        debouncedSaveToURL();
      });
    }
    
    // Enter key to generate
    document.querySelectorAll('#password-generator-form input').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          generatePasswords();
        }
      });
    });
  }

  function validateCharacterTypes() {
    // Ensure at least one character type is selected
    const types = [state.uppercase, state.lowercase, state.numbers, state.symbols];
    if (!types.some(t => t)) {
      // If none selected, re-enable lowercase
      state.lowercase = true;
      elements.includeLowercase.checked = true;
    }
  }

  function updateLengthDisplay() {
    if (elements.lengthDisplay) {
      elements.lengthDisplay.textContent = state.length;
    }
  }

  function updatePresetButtons() {
    document.querySelectorAll('.preset-btn').forEach(btn => {
      const length = parseInt(btn.dataset.length);
      btn.classList.toggle('active', length === state.length);
    });
  }

  // Debounce utility
  let saveTimeout;
  function debouncedSaveToURL() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveToURL, 300);
  }

  function buildCharacterPool() {
    let pool = '';
    
    if (state.uppercase) pool += CHAR_SETS.uppercase;
    if (state.lowercase) pool += CHAR_SETS.lowercase;
    if (state.numbers) pool += CHAR_SETS.numbers;
    if (state.symbols) {
      pool += state.customSymbols || CHAR_SETS.symbols;
    }
    
    // Apply exclusions
    if (state.excludeAmbiguous) {
      pool = pool.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    }
    if (state.excludeSimilar) {
      pool = pool.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
    }
    if (state.excludeBrackets) {
      pool = pool.split('').filter(c => !BRACKET_CHARS.includes(c)).join('');
    }
    if (state.customExclude) {
      const excludeChars = state.customExclude.split('');
      pool = pool.split('').filter(c => !excludeChars.includes(c)).join('');
    }
    
    return pool;
  }

  function getSecureRandom(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }

  function generateSinglePassword() {
    const pool = buildCharacterPool();
    
    if (pool.length === 0) {
      return { error: 'No characters available with current settings' };
    }
    
    // Check if no-repeated is possible
    if (state.noRepeated && state.length > pool.length) {
      return { error: `Cannot generate ${state.length} unique characters from pool of ${pool.length}` };
    }
    
    let password = '';
    let attempts = 0;
    const maxAttempts = 1000;
    
    while (attempts < maxAttempts) {
      password = '';
      const usedChars = new Set();
      
      // Build character pools for each type (for minimum requirements)
      const pools = {
        uppercase: state.uppercase ? buildFilteredPool(CHAR_SETS.uppercase) : '',
        lowercase: state.lowercase ? buildFilteredPool(CHAR_SETS.lowercase) : '',
        numbers: state.numbers ? buildFilteredPool(CHAR_SETS.numbers) : '',
        symbols: state.symbols ? buildFilteredPool(state.customSymbols || CHAR_SETS.symbols) : ''
      };
      
      // First, fulfill minimum requirements
      let requiredChars = [];
      
      for (let i = 0; i < state.minUppercase && pools.uppercase; i++) {
        const char = getRandomFromPool(pools.uppercase, usedChars);
        if (char) requiredChars.push(char);
      }
      for (let i = 0; i < state.minLowercase && pools.lowercase; i++) {
        const char = getRandomFromPool(pools.lowercase, usedChars);
        if (char) requiredChars.push(char);
      }
      for (let i = 0; i < state.minNumbers && pools.numbers; i++) {
        const char = getRandomFromPool(pools.numbers, usedChars);
        if (char) requiredChars.push(char);
      }
      for (let i = 0; i < state.minSymbols && pools.symbols; i++) {
        const char = getRandomFromPool(pools.symbols, usedChars);
        if (char) requiredChars.push(char);
      }
      
      // Fill remaining length with random characters
      const remainingLength = state.length - requiredChars.length;
      
      if (remainingLength < 0) {
        return { error: 'Minimum requirements exceed password length' };
      }
      
      for (let i = 0; i < remainingLength; i++) {
        const char = getRandomFromPool(pool, usedChars);
        if (char) {
          requiredChars.push(char);
        } else if (state.noRepeated) {
          break; // No more unique chars available
        } else {
          requiredChars.push(pool[getSecureRandom(pool.length)]);
        }
      }
      
      // Shuffle the characters
      password = shuffleArray(requiredChars).join('');
      
      // Apply start with letter if needed
      if (state.startWithLetter && password.length > 0) {
        const letters = (pools.uppercase + pools.lowercase).split('').filter(c => 
          !state.noRepeated || !usedChars.has(c) || password.includes(c)
        );
        if (letters.length > 0) {
          const firstLetter = letters[getSecureRandom(letters.length)];
          const firstIndex = password.indexOf(firstLetter);
          if (firstIndex !== -1 && /[a-zA-Z]/.test(password[firstIndex])) {
            // Swap first character with a letter in the password
            const chars = password.split('');
            [chars[0], chars[firstIndex]] = [chars[firstIndex], chars[0]];
            password = chars.join('');
          } else if (/[a-zA-Z]/.test(firstLetter)) {
            password = firstLetter + password.slice(1);
          }
        }
      }
      
      // Check for sequential characters
      if (state.noSequential && hasSequential(password)) {
        attempts++;
        continue;
      }
      
      // Verify minimum requirements are met
      if (!meetsMinimumRequirements(password)) {
        attempts++;
        continue;
      }
      
      return { password };
    }
    
    return { error: 'Could not generate password meeting all requirements' };
  }

  function buildFilteredPool(basePool) {
    let pool = basePool;
    if (state.excludeAmbiguous) {
      pool = pool.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    }
    if (state.excludeSimilar) {
      pool = pool.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
    }
    if (state.excludeBrackets) {
      pool = pool.split('').filter(c => !BRACKET_CHARS.includes(c)).join('');
    }
    if (state.customExclude) {
      const excludeChars = state.customExclude.split('');
      pool = pool.split('').filter(c => !excludeChars.includes(c)).join('');
    }
    return pool;
  }

  function getRandomFromPool(pool, usedChars) {
    if (!pool || pool.length === 0) return null;
    
    if (state.noRepeated) {
      const available = pool.split('').filter(c => !usedChars.has(c));
      if (available.length === 0) return null;
      const char = available[getSecureRandom(available.length)];
      usedChars.add(char);
      return char;
    }
    
    return pool[getSecureRandom(pool.length)];
  }

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = getSecureRandom(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function hasSequential(password) {
    const sequences = [
      'abcdefghijklmnopqrstuvwxyz',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      '0123456789',
      'qwertyuiop',
      'asdfghjkl',
      'zxcvbnm',
      'QWERTYUIOP',
      'ASDFGHJKL',
      'ZXCVBNM'
    ];
    
    for (let i = 0; i < password.length - 2; i++) {
      const triple = password.slice(i, i + 3).toLowerCase();
      for (const seq of sequences) {
        if (seq.toLowerCase().includes(triple)) {
          return true;
        }
      }
      // Check reverse
      const reverseTriple = triple.split('').reverse().join('');
      for (const seq of sequences) {
        if (seq.toLowerCase().includes(reverseTriple)) {
          return true;
        }
      }
    }
    return false;
  }

  function meetsMinimumRequirements(password) {
    const counts = analyzePassword(password);
    return (
      counts.uppercase >= state.minUppercase &&
      counts.lowercase >= state.minLowercase &&
      counts.numbers >= state.minNumbers &&
      counts.symbols >= state.minSymbols
    );
  }

  function analyzePassword(password) {
    let uppercase = 0, lowercase = 0, numbers = 0, symbols = 0;
    
    for (const char of password) {
      if (/[A-Z]/.test(char)) uppercase++;
      else if (/[a-z]/.test(char)) lowercase++;
      else if (/[0-9]/.test(char)) numbers++;
      else symbols++;
    }
    
    return { uppercase, lowercase, numbers, symbols, total: password.length };
  }

  function calculateEntropy(password) {
    const pool = buildCharacterPool();
    const poolSize = pool.length;
    if (poolSize <= 1) return 0;
    
    // Entropy = length * log2(poolSize)
    return password.length * Math.log2(poolSize);
  }

  function calculateStrength(password) {
    const entropy = calculateEntropy(password);
    const analysis = analyzePassword(password);
    const length = password.length;
    
    let score = 0;
    
    // Length scoring
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (length >= 20) score += 1;
    if (length >= 24) score += 1;
    
    // Character variety scoring
    const typesUsed = [
      analysis.uppercase > 0,
      analysis.lowercase > 0,
      analysis.numbers > 0,
      analysis.symbols > 0
    ].filter(Boolean).length;
    
    score += typesUsed;
    
    // Entropy bonus
    if (entropy >= 60) score += 1;
    if (entropy >= 80) score += 1;
    if (entropy >= 100) score += 1;
    if (entropy >= 128) score += 1;
    
    // Determine strength level
    if (score <= 3) return { level: 'weak', label: 'Weak', color: '#EF4444' };
    if (score <= 5) return { level: 'fair', label: 'Fair', color: '#F59E0B' };
    if (score <= 7) return { level: 'good', label: 'Good', color: '#EAB308' };
    if (score <= 9) return { level: 'strong', label: 'Strong', color: '#22C55E' };
    return { level: 'very-strong', label: 'Very Strong', color: '#16A34A' };
  }

  function estimateCrackTime(password) {
    const entropy = calculateEntropy(password);
    
    // Assume 10 billion guesses per second (modern GPU cluster)
    const guessesPerSecond = 10e9;
    const totalCombinations = Math.pow(2, entropy);
    const seconds = totalCombinations / guessesPerSecond / 2; // Average case
    
    if (seconds < 1) return 'Instantly';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 31536000 * 1000000) return `${(seconds / 31536000 / 1000).toFixed(0)} thousand years`;
    if (seconds < 31536000 * 1000000000) return `${(seconds / 31536000 / 1000000).toFixed(0)} million years`;
    if (seconds < 31536000 * 1e12) return `${(seconds / 31536000 / 1e9).toFixed(0)} billion years`;
    if (seconds < 31536000 * 1e15) return `${(seconds / 31536000 / 1e12).toFixed(0)} trillion years`;
    return 'Longer than the universe';
  }

  function generatePasswords() {
    updateStateFromForm();
    saveToURL();
    
    generatedPasswords = [];
    const errors = [];
    
    for (let i = 0; i < state.count; i++) {
      const result = generateSinglePassword();
      if (result.error) {
        errors.push(result.error);
      } else {
        generatedPasswords.push(result.password);
      }
    }
    
    if (generatedPasswords.length === 0) {
      showError(errors[0] || 'Could not generate passwords');
      return;
    }
    
    displayResults();
  }

  function updateStateFromForm() {
    state.length = parseInt(elements.lengthSlider?.value) || DEFAULTS.length;
    state.uppercase = elements.includeUppercase?.checked ?? DEFAULTS.uppercase;
    state.lowercase = elements.includeLowercase?.checked ?? DEFAULTS.lowercase;
    state.numbers = elements.includeNumbers?.checked ?? DEFAULTS.numbers;
    state.symbols = elements.includeSymbols?.checked ?? DEFAULTS.symbols;
    state.excludeAmbiguous = elements.excludeAmbiguous?.checked ?? false;
    state.excludeSimilar = elements.excludeSimilar?.checked ?? false;
    state.excludeBrackets = elements.excludeBrackets?.checked ?? false;
    state.customExclude = elements.customExclude?.value ?? '';
    state.startWithLetter = elements.startWithLetter?.checked ?? false;
    state.noSequential = elements.noSequential?.checked ?? false;
    state.noRepeated = elements.noRepeated?.checked ?? false;
    state.minUppercase = parseInt(elements.minUppercase?.value) || 0;
    state.minLowercase = parseInt(elements.minLowercase?.value) || 0;
    state.minNumbers = parseInt(elements.minNumbers?.value) || 0;
    state.minSymbols = parseInt(elements.minSymbols?.value) || 0;
    state.count = parseInt(elements.passwordCount?.value) || DEFAULTS.count;
    state.customSymbols = elements.customSymbols?.value ?? '';
  }

  function displayResults() {
    if (!elements.resultDiv || generatedPasswords.length === 0) return;
    
    const primaryPassword = generatedPasswords[0];
    const analysis = analyzePassword(primaryPassword);
    const strength = calculateStrength(primaryPassword);
    const entropy = calculateEntropy(primaryPassword);
    const crackTime = estimateCrackTime(primaryPassword);
    const pool = buildCharacterPool();
    
    const html = `
      <div class="result-header">
        <h3>🔐 Your Generated Password${generatedPasswords.length > 1 ? 's' : ''}</h3>
      </div>
      
      <div class="password-display-container">
        <div class="password-display">
          <div class="password-text" id="primary-password">${escapeHtml(primaryPassword)}</div>
        </div>
        <div class="password-actions">
          <button type="button" class="copy-btn" onclick="copyPassword('${escapeJs(primaryPassword)}', this)">
            📋 Copy Password
          </button>
          <button type="button" class="regenerate-btn" onclick="window.regeneratePasswords()">
            🔄 Regenerate
          </button>
        </div>
      </div>
      
      <div class="strength-section">
        <div class="strength-header">
          <h4>Password Strength</h4>
          <span class="strength-label ${strength.level}">${strength.label}</span>
        </div>
        <div class="strength-bar-container">
          <div class="strength-bar ${strength.level}"></div>
        </div>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">${primaryPassword.length}</span>
            <span class="stat-label">Characters</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${entropy.toFixed(0)}</span>
            <span class="stat-label">Bits of Entropy</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${pool.length}</span>
            <span class="stat-label">Pool Size</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${[analysis.uppercase > 0, analysis.lowercase > 0, analysis.numbers > 0, analysis.symbols > 0].filter(Boolean).length}</span>
            <span class="stat-label">Character Types</span>
          </div>
        </div>
      </div>
      
      <div class="crack-time-section">
        <h4>⏱️ Estimated Time to Crack</h4>
        <div class="crack-time-value">${crackTime}</div>
        <div class="crack-time-note">Based on 10 billion guesses per second</div>
      </div>
      
      <div class="breakdown-section">
        <h4>Character Breakdown</h4>
        <div class="breakdown-bars">
          <div class="breakdown-item">
            <span class="breakdown-label">Uppercase</span>
            <div class="breakdown-bar-bg">
              <div class="breakdown-bar-fill uppercase" style="width: ${(analysis.uppercase / analysis.total * 100).toFixed(1)}%"></div>
            </div>
            <span class="breakdown-count">${analysis.uppercase}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">Lowercase</span>
            <div class="breakdown-bar-bg">
              <div class="breakdown-bar-fill lowercase" style="width: ${(analysis.lowercase / analysis.total * 100).toFixed(1)}%"></div>
            </div>
            <span class="breakdown-count">${analysis.lowercase}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">Numbers</span>
            <div class="breakdown-bar-bg">
              <div class="breakdown-bar-fill numbers" style="width: ${(analysis.numbers / analysis.total * 100).toFixed(1)}%"></div>
            </div>
            <span class="breakdown-count">${analysis.numbers}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">Symbols</span>
            <div class="breakdown-bar-bg">
              <div class="breakdown-bar-fill symbols" style="width: ${(analysis.symbols / analysis.total * 100).toFixed(1)}%"></div>
            </div>
            <span class="breakdown-count">${analysis.symbols}</span>
          </div>
        </div>
      </div>
      
      <div class="entropy-visual">
        <h4>Entropy Composition</h4>
        <div class="entropy-meter">
          ${analysis.uppercase > 0 ? `<div class="entropy-segment uppercase" style="flex: ${analysis.uppercase}">A-Z</div>` : ''}
          ${analysis.lowercase > 0 ? `<div class="entropy-segment lowercase" style="flex: ${analysis.lowercase}">a-z</div>` : ''}
          ${analysis.numbers > 0 ? `<div class="entropy-segment numbers" style="flex: ${analysis.numbers}">0-9</div>` : ''}
          ${analysis.symbols > 0 ? `<div class="entropy-segment symbols" style="flex: ${analysis.symbols}">!@#</div>` : ''}
        </div>
        <div class="entropy-legend">
          <div class="legend-item"><span class="legend-dot uppercase"></span> Uppercase (${analysis.uppercase})</div>
          <div class="legend-item"><span class="legend-dot lowercase"></span> Lowercase (${analysis.lowercase})</div>
          <div class="legend-item"><span class="legend-dot numbers"></span> Numbers (${analysis.numbers})</div>
          <div class="legend-item"><span class="legend-dot symbols"></span> Symbols (${analysis.symbols})</div>
        </div>
      </div>
      
      ${generatedPasswords.length > 1 ? `
        <div class="passwords-list">
          <h4>All Generated Passwords (${generatedPasswords.length})</h4>
          ${generatedPasswords.map((pwd, i) => `
            <div class="password-item">
              <span class="password-item-text">${escapeHtml(pwd)}</span>
              <button type="button" class="password-item-copy" onclick="copyPassword('${escapeJs(pwd)}', this)">
                Copy
              </button>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      <div class="info-box" style="margin-top: 2rem;">
        <h4>🔒 Security Note</h4>
        <p>
          These passwords are generated entirely in your browser using cryptographically secure 
          random number generation. No passwords are transmitted or stored anywhere. For maximum 
          security, use a unique password for each account and consider using a password manager.
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

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function escapeJs(text) {
    return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }

  // Global functions for onclick handlers
  window.copyPassword = function(password, button) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(password).then(() => {
        showCopySuccess(button);
      }).catch(() => {
        fallbackCopy(password, button);
      });
    } else {
      fallbackCopy(password, button);
    }
  };

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
    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }

  window.regeneratePasswords = function() {
    generatePasswords();
  };

  function shareSettings() {
    const url = window.location.href;
    
    if (navigator.share && navigator.canShare && navigator.canShare({ url })) {
      navigator.share({
        title: 'Password Generator Settings',
        text: 'Check out my password generator settings',
        url: url
      }).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
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
    updateLengthDisplay();
    
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