// Body Roundness Index (BRI) Calculator Logic with URL Query String Support
(function () {
  'use strict';

  let currentSystem = 'imperial';
  let lastResults = null;

  const URLParams = {
    getAll() {
      const params = new URLSearchParams(window.location.search);
      const result = {};
      for (const [key, value] of params) {
        result[key] = value;
      }
      return result;
    },
    update(values) {
      const params = new URLSearchParams();
      Object.keys(values).forEach((key) => {
        if (values[key] !== '' && values[key] !== null && values[key] !== undefined) {
          params.set(key, values[key]);
        }
      });
      const newURL = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      window.history.replaceState({}, '', newURL);
    },
    clear() {
      window.history.replaceState({}, '', window.location.pathname);
    },
  };

  function init() {
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultDiv = document.getElementById('body-roundness-index-calculator-result');

    if (!calculateBtn || !resultDiv) return;

    initUnitToggle();
    loadFromURL();
    addInputListeners();

    calculateBtn.addEventListener('click', () => {
      calculate();
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', clearAll);
    }

    const form = document.getElementById('body-roundness-index-calculator-form');
    if (form) {
      form.querySelectorAll('input').forEach((input) => {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            calculate();
          }
        });
      });
    }

    const urlParams = URLParams.getAll();
    if (Object.keys(urlParams).length > 0) {
      setTimeout(calculate, 100);
    }
  }

  function initUnitToggle() {
    const unitButtons = document.querySelectorAll('.unit-btn');
    const imperialSection = document.getElementById('imperial-inputs');
    const metricSection = document.getElementById('metric-inputs');
    if (!unitButtons.length || !imperialSection || !metricSection) return;

    unitButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const system = this.getAttribute('data-system');
        unitButtons.forEach((btn) => btn.classList.remove('active'));
        this.classList.add('active');

        if (system === 'imperial') {
          currentSystem = 'imperial';
          imperialSection.classList.remove('hidden');
          metricSection.classList.add('hidden');
        } else {
          currentSystem = 'metric';
          imperialSection.classList.add('hidden');
          metricSection.classList.remove('hidden');
        }

        saveToURL();
        const resultDiv = document.getElementById('body-roundness-index-calculator-result');
        if (resultDiv) resultDiv.classList.add('hidden');
      });
    });
  }

  function loadFromURL() {
    const params = URLParams.getAll();
    if (Object.keys(params).length === 0) return;

    if (params.system) {
      const systemButton = document.querySelector(`.unit-btn[data-system="${params.system}"]`);
      if (systemButton) systemButton.click();
    }

    setTimeout(() => {
      if (params.ft) {
        const el = document.getElementById('height-feet');
        if (el) el.value = params.ft;
      }
      if (params.in) {
        const el = document.getElementById('height-inches');
        if (el) el.value = params.in;
      }
      if (params.waistin) {
        const el = document.getElementById('waist-in');
        if (el) el.value = params.waistin;
      }
      if (params.cm) {
        const el = document.getElementById('height-cm');
        if (el) el.value = params.cm;
      }
      if (params.waistcm) {
        const el = document.getElementById('waist-cm');
        if (el) el.value = params.waistcm;
      }
    }, 50);
  }

  function saveToURL() {
    const values = { system: currentSystem };
    if (currentSystem === 'imperial') {
      const ft = document.getElementById('height-feet').value;
      const inch = document.getElementById('height-inches').value;
      const waist = document.getElementById('waist-in').value;
      if (ft) values.ft = ft;
      if (inch) values.in = inch;
      if (waist) values.waistin = waist;
    } else {
      const cm = document.getElementById('height-cm').value;
      const waist = document.getElementById('waist-cm').value;
      if (cm) values.cm = cm;
      if (waist) values.waistcm = waist;
    }
    URLParams.update(values);
  }

  function addInputListeners() {
    const ids = ['height-feet', 'height-inches', 'waist-in', 'height-cm', 'waist-cm'];
    ids.forEach((id) => {
      const input = document.getElementById(id);
      if (!input) return;
      let timeout;
      input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(saveToURL, 500);
      });
    });
  }

  function calculate() {
    let heightCm = 0;
    let waistCm = 0;

    if (currentSystem === 'imperial') {
      const feet = parseFloat(document.getElementById('height-feet').value) || 0;
      const inches = parseFloat(document.getElementById('height-inches').value) || 0;
      const waistIn = parseFloat(document.getElementById('waist-in').value) || 0;

      if (feet <= 0 || waistIn <= 0) {
        showError('Please enter a valid height and waist circumference.');
        return;
      }

      const totalInches = feet * 12 + inches;
      heightCm = totalInches * 2.54;
      waistCm = waistIn * 2.54;
    } else {
      heightCm = parseFloat(document.getElementById('height-cm').value) || 0;
      waistCm = parseFloat(document.getElementById('waist-cm').value) || 0;

      if (heightCm <= 0 || waistCm <= 0) {
        showError('Please enter a valid height and waist circumference.');
        return;
      }
    }

    // BRI = 364.2 - 365.5 * sqrt(1 - (waist / (pi * height))^2)
    const ratio = waistCm / (Math.PI * heightCm);
    const inner = 1 - ratio * ratio;

    if (inner < 0) {
      showError('Your waist measurement looks too large relative to your height — please double-check both values.');
      return;
    }

    const bri = 364.2 - 365.5 * Math.sqrt(inner);
    const category = getBRICategory(bri);
    const waistToHeight = waistCm / heightCm;

    lastResults = { bri, category, heightCm, waistCm, system: currentSystem, waistToHeight };

    saveToURL();
    displayResult(bri, category, waistToHeight);
    trackCalculation('bri', bri);
  }

  function getBRICategory(bri) {
    if (bri < 3.41) {
      return {
        name: 'Low',
        color: '#5A9FD4',
        icon: 'ℹ️',
        description:
          'A low BRI often reflects a lean body type. In one 2024 cohort study, BRI below 3.4 was associated with somewhat higher mortality risk than the middle range — this is usually not a concern on its own, but is worth discussing with a healthcare provider if you have other risk factors.',
      };
    } else if (bri < 4.45) {
      return {
        name: 'Below Reference',
        color: '#4CAF50',
        icon: '✓',
        description: 'Your BRI is just below the reference range associated with the lowest mortality risk in large cohort studies.',
      };
    } else if (bri < 5.46) {
      return {
        name: 'Reference Range',
        color: '#4CAF50',
        icon: '✓',
        description: 'Your BRI falls in the reference range associated with the lowest mortality risk in large cohort studies.',
      };
    } else if (bri < 6.91) {
      return {
        name: 'Elevated',
        color: '#FFB900',
        icon: '⚠️',
        description: 'Your BRI is in an elevated range associated with higher health risk in large cohort studies. Consider discussing waist-focused lifestyle changes with a healthcare provider.',
      };
    } else {
      return {
        name: 'High',
        color: '#EF5350',
        icon: '⚠️',
        description: 'Your BRI is in a high range — associated with up to 49% higher all-cause mortality risk in a 2024 cohort study. We recommend discussing your results with a healthcare provider.',
      };
    }
  }

  function getScalePosition(bri) {
    const minBRI = 0;
    const maxBRI = 12;
    const clamped = Math.max(minBRI, Math.min(maxBRI, bri));
    return ((clamped - minBRI) / (maxBRI - minBRI)) * 100;
  }

  function displayResult(bri, category, waistToHeight) {
    const resultDiv = document.getElementById('body-roundness-index-calculator-result');

    resultDiv.innerHTML = `
      <div class="result-card">
        <div class="result-header-actions">
          <h3>Your BRI Results</h3>
          <div class="result-actions">
            <button type="button" onclick="shareResults()" class="btn-action" title="Share Results">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Share
            </button>
            <button type="button" onclick="resetCalculator()" class="btn-action" title="Reset Calculator">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
              Reset
            </button>
          </div>
        </div>

        <div class="result-summary">
          <div class="result-main">
            <div class="bmi-display">
              <div class="bmi-value">${bri.toFixed(2)}</div>
              <div class="bmi-label">Body Roundness Index</div>
            </div>
            <div class="bmi-category" style="background: ${category.color};">
              <span class="category-icon">${category.icon}</span>
              <span class="category-name">${category.name}</span>
            </div>
          </div>

          <div class="bmi-visual">
            <div class="bmi-scale">
              <div class="scale-bar">
                <div class="scale-segment underweight" style="background: #5A9FD4; flex: 3.41;"></div>
                <div class="scale-segment normal" style="background: #4CAF50; flex: 2.05;"></div>
                <div class="scale-segment overweight" style="background: #FFB900; flex: 1.45;"></div>
                <div class="scale-segment obese" style="background: #EF5350; flex: 5.13;"></div>
              </div>
              <div class="scale-pointer" style="left: ${getScalePosition(bri)}%;">
                <div class="pointer-line"></div>
                <div class="pointer-value">${bri.toFixed(1)}</div>
              </div>
              <div class="scale-labels">
                <span style="left: 0;">0</span>
                <span style="left: 28.4%;">3.4</span>
                <span style="left: 45.5%;">5.5</span>
                <span style="left: 57.6%;">6.9</span>
                <span style="left: 100%;">12</span>
              </div>
            </div>
          </div>
        </div>

        <div class="result-details">
          <div class="detail-card">
            <h4>📊 Your Results</h4>
            <div class="detail-item">
              <span class="detail-label">BRI Score:</span>
              <span class="detail-value">${bri.toFixed(2)}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Category:</span>
              <span class="detail-value">${category.name}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Waist-to-Height Ratio:</span>
              <span class="detail-value">${waistToHeight.toFixed(2)}</span>
            </div>
            <p class="health-message">${category.description}</p>
          </div>
        </div>

        <div class="health-tips">
          <h4>💡 What To Do Next</h4>
          <div class="tips-grid">
            <div class="tip-card">
              <div class="tip-icon">📏</div>
              <div class="tip-content">
                <strong>Re-measure Periodically</strong>
                <p>Waist circumference can shift week to week. Track your BRI monthly rather than reacting to a single reading.</p>
              </div>
            </div>
            <div class="tip-card">
              <div class="tip-icon">🧮</div>
              <div class="tip-content">
                <strong>Pair With Other Metrics</strong>
                <p>Use BRI alongside <a href="/calculators/bmi-calculator">BMI</a> and <a href="/calculators/body-fat-calculator">body fat percentage</a> for a fuller picture.</p>
              </div>
            </div>
            <div class="tip-card">
              <div class="tip-icon">🩺</div>
              <div class="tip-content">
                <strong>Talk To a Professional</strong>
                <p>BRI is a research screening tool, not a diagnosis. A healthcare provider can interpret your results in context.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    const resultDiv = document.getElementById('body-roundness-index-calculator-result');
    resultDiv.innerHTML = `<div class="error-message"><strong>⚠️ Error:</strong> ${message}</div>`;
    resultDiv.classList.remove('hidden');
  }

  function clearAll() {
    const ids = ['height-feet', 'height-inches', 'waist-in', 'height-cm', 'waist-cm'];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    URLParams.clear();
    const resultDiv = document.getElementById('body-roundness-index-calculator-result');
    if (resultDiv) resultDiv.classList.add('hidden');

    document.getElementById('height-feet').value = '5';
    document.getElementById('height-inches').value = '10';
    document.getElementById('height-cm').value = '178';
  }

  window.resetCalculator = clearAll;

  window.shareResults = function () {
    const shareURL = window.location.href;
    if (navigator.share && lastResults) {
      navigator
        .share({
          title: 'My BRI Results - CalcCrunch',
          text: `My Body Roundness Index: ${lastResults.bri.toFixed(2)} (${lastResults.category.name})`,
          url: shareURL,
        })
        .catch(() => copyShareURL());
    } else {
      copyShareURL();
    }
  };

  function copyShareURL() {
    const textarea = document.createElement('textarea');
    textarea.value = window.location.href;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      // no-op
    }
    document.body.removeChild(textarea);
  }

  function trackCalculation(type, result) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculator_use', {
        calculator_type: type,
        result_value: result,
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
