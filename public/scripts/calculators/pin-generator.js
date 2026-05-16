// PIN Generator with URL State Management
(function() {
  'use strict';

  // Common PINs to avoid (top 50 most used)
  const COMMON_PINS = [
    '1234', '1111', '0000', '1212', '7777', '1004', '2000', '4444',
    '2222', '6969', '9999', '3333', '5555', '6666', '1122', '1313',
    '8888', '4321', '2001', '1010', '0101', '1123', '1231', '1988',
    '1987', '1986', '1985', '1984', '1983', '2580', '0852', '1980',
    '1990', '1989', '1979', '1978', '2468', '1975', '1977', '1976',
    '1974', '1973', '1970', '1972', '1971', '0007', '1969', '6666',
    '1991', '2345'
  ];

  // Default values
  const DEFAULTS = {
    length: 4,
    count: 1,
    avoidSequential: true,
    avoidRepeated: true,
    avoidCommon: true,
    avoidBirthYear: false
  };

  // State
  let state = { ...DEFAULTS };
  let generatedPINs = [];

  // DOM Elements cache
  let elements = {};

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    cacheElements();

    if (!elements.generateBtn) {
      console.error('PIN Generator: Generate button not found');
      return;
    }

    loadFromURL();
    attachEventListeners();
  }

  function cacheElements() {
    elements = {
      form: document.getElementById('pin-generator-form'),
      generateBtn: document.getElementById('generate-btn'),
      resultDiv: document.getElementById('pin-generator-result'),
      customLengthGroup: document.getElementById('custom-length-group'),
      customPinLength: document.getElementById('custom-pin-length'),
      countDisplay: document.getElementById('pin-count-display'),
      countMinus: document.getElementById('count-minus'),
      countPlus: document.getElementById('count-plus'),
      avoidSequential: document.getElementById('avoid-sequential'),
      avoidRepeated: document.getElementById('avoid-repeated'),
      avoidCommon: document.getElementById('avoid-common'),
      avoidBirthYear: document.getElementById('avoid-birthyear')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('len')) {
      const len = parseInt(params.get('len'));
      if (len >= 3 && len <= 12) state.length = len;
    }
    if (params.has('count')) {
      const count = parseInt(params.get('count'));
      if (count >= 1 && count <= 20) state.count = count;
    }
    if (params.has('seq')) state.avoidSequential = params.get('seq') === '1';
    if (params.has('rep')) state.avoidRepeated = params.get('rep') === '1';
    if (params.has('com')) state.avoidCommon = params.get('com') === '1';
    if (params.has('byr')) state.avoidBirthYear = params.get('byr') === '1';

    applyStateToForm();
  }

  function applyStateToForm() {
    // Update length buttons
    const isStandardLength = [4, 6, 8].includes(state.length);
    document.querySelectorAll('.pin-length-btn').forEach(btn => {
      const len = btn.dataset.length;
      if (len === 'custom') {
        btn.classList.toggle('active', !isStandardLength);
      } else {
        btn.classList.toggle('active', parseInt(len) === state.length && isStandardLength);
      }
    });

    // Show custom input if needed
    if (!isStandardLength && elements.customLengthGroup) {
      elements.customLengthGroup.classList.remove('hidden');
      if (elements.customPinLength) elements.customPinLength.value = state.length;
    }

    // Update count display
    if (elements.countDisplay) elements.countDisplay.textContent = state.count;

    // Update checkboxes
    if (elements.avoidSequential) elements.avoidSequential.checked = state.avoidSequential;
    if (elements.avoidRepeated) elements.avoidRepeated.checked = state.avoidRepeated;
    if (elements.avoidCommon) elements.avoidCommon.checked = state.avoidCommon;
    if (elements.avoidBirthYear) elements.avoidBirthYear.checked = state.avoidBirthYear;
  }

  function saveToURL() {
    const params = new URLSearchParams();

    if (state.length !== DEFAULTS.length) params.set('len', state.length);
    if (state.count !== DEFAULTS.count) params.set('count', state.count);
    if (state.avoidSequential !== DEFAULTS.avoidSequential) params.set('seq', state.avoidSequential ? '1' : '0');
    if (state.avoidRepeated !== DEFAULTS.avoidRepeated) params.set('rep', state.avoidRepeated ? '1' : '0');
    if (state.avoidCommon !== DEFAULTS.avoidCommon) params.set('com', state.avoidCommon ? '1' : '0');
    if (state.avoidBirthYear !== DEFAULTS.avoidBirthYear) params.set('byr', state.avoidBirthYear ? '1' : '0');

    const newURL = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  }

  function attachEventListeners() {
    // Generate button
    elements.generateBtn.addEventListener('click', () => {
      generatePINs();
      if (elements.resultDiv) {
        elements.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Length buttons
    document.querySelectorAll('.pin-length-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const len = e.target.dataset.length;

        document.querySelectorAll('.pin-length-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        if (len === 'custom') {
          elements.customLengthGroup.classList.remove('hidden');
          state.length = parseInt(elements.customPinLength?.value) || 5;
        } else {
          elements.customLengthGroup.classList.add('hidden');
          state.length = parseInt(len);
        }
        saveToURL();
      });
    });

    // Custom length input
    if (elements.customPinLength) {
      elements.customPinLength.addEventListener('change', (e) => {
        let val = parseInt(e.target.value);
        if (val < 3) val = 3;
        if (val > 12) val = 12;
        e.target.value = val;
        state.length = val;
        saveToURL();
      });
    }

    // Count controls
    if (elements.countMinus) {
      elements.countMinus.addEventListener('click', () => {
        if (state.count > 1) {
          state.count--;
          elements.countDisplay.textContent = state.count;
          saveToURL();
        }
      });
    }

    if (elements.countPlus) {
      elements.countPlus.addEventListener('click', () => {
        if (state.count < 20) {
          state.count++;
          elements.countDisplay.textContent = state.count;
          saveToURL();
        }
      });
    }

    // Count presets
    document.querySelectorAll('.count-preset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.count = parseInt(e.target.dataset.count);
        elements.countDisplay.textContent = state.count;
        saveToURL();
      });
    });

    // Security checkboxes
    const checkboxMap = [
      { el: elements.avoidSequential, key: 'avoidSequential' },
      { el: elements.avoidRepeated, key: 'avoidRepeated' },
      { el: elements.avoidCommon, key: 'avoidCommon' },
      { el: elements.avoidBirthYear, key: 'avoidBirthYear' }
    ];

    checkboxMap.forEach(({ el, key }) => {
      if (el) {
        el.addEventListener('change', (e) => {
          state[key] = e.target.checked;
          saveToURL();
        });
      }
    });

    // Enter key to generate
    document.querySelectorAll('#pin-generator-form input').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          generatePINs();
        }
      });
    });
  }

  function getSecureRandom(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }

  function generateSinglePIN() {
    const maxAttempts = 500;
    let attempts = 0;

    while (attempts < maxAttempts) {
      let pin = '';
      for (let i = 0; i < state.length; i++) {
        pin += getSecureRandom(10).toString();
      }

      // Check constraints
      if (state.avoidSequential && hasSequentialDigits(pin)) {
        attempts++;
        continue;
      }

      if (state.avoidRepeated && hasAllRepeatedDigits(pin)) {
        attempts++;
        continue;
      }

      if (state.avoidCommon && isCommonPIN(pin)) {
        attempts++;
        continue;
      }

      if (state.avoidBirthYear && hasBirthYearPattern(pin)) {
        attempts++;
        continue;
      }

      return pin;
    }

    // Fallback: just generate random digits
    let pin = '';
    for (let i = 0; i < state.length; i++) {
      pin += getSecureRandom(10).toString();
    }
    return pin;
  }

  function hasSequentialDigits(pin) {
    // Check for 3+ ascending or descending sequential digits
    for (let i = 0; i < pin.length - 2; i++) {
      const a = parseInt(pin[i]);
      const b = parseInt(pin[i + 1]);
      const c = parseInt(pin[i + 2]);

      // Ascending: 1,2,3
      if (b === a + 1 && c === b + 1) return true;
      // Descending: 3,2,1
      if (b === a - 1 && c === b - 1) return true;
    }
    return false;
  }

  function hasAllRepeatedDigits(pin) {
    // All digits are the same
    return pin.split('').every(d => d === pin[0]);
  }

  function isCommonPIN(pin) {
    return COMMON_PINS.includes(pin);
  }

  function hasBirthYearPattern(pin) {
    if (pin.length < 4) return false;

    // Check all 4-digit substrings for birth year patterns
    for (let i = 0; i <= pin.length - 4; i++) {
      const sub = pin.slice(i, i + 4);
      const num = parseInt(sub);
      // Years from 1940 to 2025
      if (num >= 1940 && num <= 2025) return true;
    }
    return false;
  }

  function generatePINs() {
    generatedPINs = [];

    for (let i = 0; i < state.count; i++) {
      generatedPINs.push(generateSinglePIN());
    }

    displayResults();
    saveToURL();
  }

  function calculateStrength(pinLength) {
    const totalCombinations = Math.pow(10, pinLength);
    let effectiveCombinations = totalCombinations;

    // Reduce for filtered PINs
    if (state.avoidSequential) effectiveCombinations *= 0.95;
    if (state.avoidRepeated) effectiveCombinations *= 0.99;
    if (state.avoidCommon) effectiveCombinations *= 0.995;

    const entropy = Math.log2(effectiveCombinations);

    let level, label, color, percentage;

    if (pinLength <= 3) {
      level = 'weak';
      label = 'Weak';
      color = '#EF4444';
      percentage = 15;
    } else if (pinLength === 4) {
      level = 'fair';
      label = 'Fair';
      color = '#F59E0B';
      percentage = 35;
    } else if (pinLength === 5) {
      level = 'moderate';
      label = 'Moderate';
      color = '#EAB308';
      percentage = 50;
    } else if (pinLength === 6) {
      level = 'good';
      label = 'Good';
      color = '#22C55E';
      percentage = 70;
    } else if (pinLength <= 8) {
      level = 'strong';
      label = 'Strong';
      color = '#16A34A';
      percentage = 85;
    } else {
      level = 'very-strong';
      label = 'Very Strong';
      color = '#059669';
      percentage = 100;
    }

    // Time to crack at different speeds
    const bruteForceSpeed = 100; // ATM: ~100 tries before lockout
    const onlineSpeed = 1000; // Online: ~1000/sec
    const offlineSpeed = 1000000000; // Offline: ~1 billion/sec

    return {
      level,
      label,
      color,
      percentage,
      totalCombinations,
      entropy: entropy.toFixed(1),
      crackTimeATM: formatTime(totalCombinations / bruteForceSpeed / 2),
      crackTimeOnline: formatTime(totalCombinations / onlineSpeed / 2),
      crackTimeOffline: formatTime(totalCombinations / offlineSpeed / 2)
    };
  }

  function formatTime(seconds) {
    if (seconds < 0.001) return 'Instant';
    if (seconds < 1) return Math.round(seconds * 1000) + ' ms';
    if (seconds < 60) return Math.round(seconds) + ' sec';
    if (seconds < 3600) return Math.round(seconds / 60) + ' min';
    if (seconds < 86400) return Math.round(seconds / 3600) + ' hours';
    if (seconds < 31536000) return Math.round(seconds / 86400) + ' days';
    return Math.round(seconds / 31536000) + ' years';
  }

  function displayResults() {
    if (!elements.resultDiv || generatedPINs.length === 0) return;

    const strength = calculateStrength(state.length);

    const html = `
      <div class="pin-strength">
        <h4>PIN Strength Analysis</h4>
        <div class="strength-meter">
          <div class="strength-bar-bg">
            <div class="strength-bar-fill" style="width: ${strength.percentage}%; background: ${strength.color};"></div>
          </div>
          <span class="strength-text" style="color: ${strength.color};">${strength.label}</span>
        </div>
        <div class="strength-details">
          <div class="strength-detail-item">
            <span class="strength-detail-value">${strength.totalCombinations.toLocaleString()}</span>
            <span class="strength-detail-label">Possible Combinations</span>
          </div>
          <div class="strength-detail-item">
            <span class="strength-detail-value">${strength.entropy} bits</span>
            <span class="strength-detail-label">Entropy</span>
          </div>
          <div class="strength-detail-item">
            <span class="strength-detail-value">${strength.crackTimeATM}</span>
            <span class="strength-detail-label">ATM Brute Force</span>
          </div>
          <div class="strength-detail-item">
            <span class="strength-detail-value">${strength.crackTimeOffline}</span>
            <span class="strength-detail-label">Offline Attack</span>
          </div>
        </div>
      </div>

      <div class="pin-terminal">
        <div class="pin-terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">pin-generator -- ${generatedPINs.length} result${generatedPINs.length > 1 ? 's' : ''} (${state.length} digits)</span>
        </div>
        <div class="pin-grid">
          ${generatedPINs.map((pin, i) => `
            <div class="pin-item">
              <span class="pin-item-text">${escapeHtml(pin)}</span>
              <button type="button" class="pin-item-copy" data-pin="${escapeAttr(pin)}">Copy</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    elements.resultDiv.innerHTML = html;
    elements.resultDiv.classList.remove('hidden');

    // Attach copy event listeners
    document.querySelectorAll('.pin-item-copy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pin = e.target.dataset.pin;
        copyToClipboard(pin, e.target);
      });
    });
  }

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
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function escapeAttr(text) {
    return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

})();
