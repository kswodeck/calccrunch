(function() {
  'use strict';

  let currentMode = 'percent-of';

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('mode')) {
      const mode = params.get('mode');
      if (['percent-of', 'is-what-percent', 'percent-change', 'increase-decrease'].includes(mode)) {
        switchMode(mode);
      }
    }

    if (params.has('pct_of_p')) setValue('pct-of-percent', params.get('pct_of_p'));
    if (params.has('pct_of_n')) setValue('pct-of-number', params.get('pct_of_n'));
    if (params.has('iwp_n')) setValue('iwp-number', params.get('iwp_n'));
    if (params.has('iwp_t')) setValue('iwp-total', params.get('iwp_t'));
    if (params.has('pc_from')) setValue('pc-from', params.get('pc_from'));
    if (params.has('pc_to')) setValue('pc-to', params.get('pc_to'));
    if (params.has('id_n')) setValue('id-number', params.get('id_n'));
    if (params.has('id_p')) setValue('id-percent', params.get('id_p'));
    if (params.has('id_d')) {
      const el = document.getElementById('id-direction');
      if (el) el.value = params.get('id_d');
    }

    if (params.toString()) {
      setTimeout(() => calculateResults(), 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('mode', currentMode);

    switch (currentMode) {
      case 'percent-of':
        params.set('pct_of_p', getValue('pct-of-percent'));
        params.set('pct_of_n', getValue('pct-of-number'));
        break;
      case 'is-what-percent':
        params.set('iwp_n', getValue('iwp-number'));
        params.set('iwp_t', getValue('iwp-total'));
        break;
      case 'percent-change':
        params.set('pc_from', getValue('pc-from'));
        params.set('pc_to', getValue('pc-to'));
        break;
      case 'increase-decrease':
        params.set('id_n', getValue('id-number'));
        params.set('id_p', getValue('id-percent'));
        params.set('id_d', document.getElementById('id-direction').value);
        break;
    }

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    const modeBtns = document.querySelectorAll('.unit-btn[data-mode]');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        switchMode(this.dataset.mode);
        saveToURL();
      });
    });

    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        calculateResults();
        document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    document.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('input', debounce(() => {
        calculateResults();
        saveToURL();
      }, 300));
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateResults();
        }
      });
    });

    document.querySelectorAll('.form-select').forEach(select => {
      select.addEventListener('change', () => {
        calculateResults();
        saveToURL();
      });
    });

    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }
  }

  function switchMode(mode) {
    currentMode = mode;

    document.querySelectorAll('.unit-btn[data-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    const modes = ['percent-of', 'is-what-percent', 'percent-change', 'increase-decrease'];
    modes.forEach(m => {
      const section = document.getElementById('mode-' + m);
      if (section) section.classList.toggle('hidden', m !== mode);
    });
  }

  function calculateResults() {
    let result, formula, visual;

    switch (currentMode) {
      case 'percent-of': {
        const pct = getValue('pct-of-percent');
        const num = getValue('pct-of-number');
        if (!num && num !== 0) return;
        result = (pct / 100) * num;
        formula = `${pct}% × ${num} = ${formatNumber(result)}`;
        visual = { pct: Math.min(Math.abs(pct), 100), label: `${pct}% of ${num}` };
        break;
      }
      case 'is-what-percent': {
        const num = getValue('iwp-number');
        const total = getValue('iwp-total');
        if (!total) return;
        result = (num / total) * 100;
        formula = `(${num} ÷ ${total}) × 100 = ${formatNumber(result)}%`;
        visual = { pct: Math.min(Math.abs(result), 100), label: `${num} is ${formatNumber(result)}% of ${total}` };
        break;
      }
      case 'percent-change': {
        const from = getValue('pc-from');
        const to = getValue('pc-to');
        if (!from) return;
        result = ((to - from) / Math.abs(from)) * 100;
        formula = `((${to} - ${from}) ÷ |${from}|) × 100 = ${formatNumber(result)}%`;
        visual = { pct: Math.min(Math.abs(result), 100), label: `${result >= 0 ? 'Increase' : 'Decrease'} of ${formatNumber(Math.abs(result))}%` };
        break;
      }
      case 'increase-decrease': {
        const num = getValue('id-number');
        const pct = getValue('id-percent');
        const direction = document.getElementById('id-direction').value;
        const multiplier = direction === 'increase' ? (1 + pct / 100) : (1 - pct / 100);
        result = num * multiplier;
        const diff = result - num;
        formula = `${num} × ${multiplier.toFixed(4)} = ${formatNumber(result)}`;
        visual = { pct: Math.min(pct, 100), label: `${direction === 'increase' ? '+' : '-'}${formatNumber(Math.abs(diff))}` };
        break;
      }
    }

    saveToURL();
    displayResults(result, formula, visual);
  }

  function displayResults(result, formula, visual) {
    const resultDiv = document.getElementById('percentage-result');
    if (!resultDiv) return;

    const isPercentResult = currentMode === 'is-what-percent' || currentMode === 'percent-change';
    const displayResult = isPercentResult ? formatNumber(result) + '%' : formatNumber(result);

    const quickRef = generateQuickReference();

    resultDiv.innerHTML = `
      <h3>📊 Result</h3>

      <div class="age-hero">
        <div class="age-big">${displayResult}</div>
      </div>

      <div class="formula-display">
        <strong>Formula:</strong> ${formula}
      </div>

      <div class="visual-bar-section">
        <div class="visual-bar-container">
          <div class="visual-bar-fill" style="width: ${visual.pct}%"></div>
        </div>
        <small>${visual.label}</small>
      </div>

      ${quickRef}
    `;

    resultDiv.classList.remove('hidden');
  }

  function generateQuickReference() {
    if (currentMode === 'percent-of') {
      const num = getValue('pct-of-number');
      if (!num) return '';

      const percents = [5, 10, 15, 20, 25, 33.33, 50, 75, 100];
      return `
        <div class="quick-reference">
          <h4>📋 Quick Reference for ${num}</h4>
          <div class="breakdown-table-container">
            <table class="profit-table">
              <thead><tr><th>Percentage</th><th>Value</th></tr></thead>
              <tbody>
                ${percents.map(p => `<tr><td>${p}%</td><td><strong>${formatNumber((p / 100) * num)}</strong></td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (currentMode === 'percent-change') {
      const from = getValue('pc-from');
      if (!from) return '';

      const changes = [-50, -25, -10, -5, 5, 10, 25, 50, 100];
      return `
        <div class="quick-reference">
          <h4>📋 Change Scenarios from ${from}</h4>
          <div class="breakdown-table-container">
            <table class="profit-table">
              <thead><tr><th>Change</th><th>New Value</th></tr></thead>
              <tbody>
                ${changes.map(c => {
                  const newVal = from * (1 + c / 100);
                  return `<tr><td>${c > 0 ? '+' : ''}${c}%</td><td><strong>${formatNumber(newVal)}</strong></td></tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    return '';
  }

  function showError(message) {
    const resultDiv = document.getElementById('percentage-result');
    if (resultDiv) {
      resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`;
      resultDiv.classList.remove('hidden');
    }
  }

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? parseFloat(el.value) || 0 : 0;
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function formatNumber(num) {
    if (Math.abs(num) >= 1000000) return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (Number.isInteger(num)) return num.toLocaleString('en-US');
    return parseFloat(num.toFixed(4)).toLocaleString('en-US');
  }

  function debounce(fn, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Percentage Calculator', url: url }).catch(() => copyToClipboard(url));
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const shareBtn = document.getElementById('share-calculation');
      if (shareBtn) {
        const original = shareBtn.innerHTML;
        shareBtn.innerHTML = '✓ Link Copied!';
        setTimeout(() => { shareBtn.innerHTML = original; }, 2000);
      }
    }).catch(() => {});
  }

})();
