// UUID Generator with URL State Management
(function() {
  'use strict';

  // Configuration
  const DEFAULTS = {
    count: 1,
    format: 'standard'
  };

  // State
  let state = { ...DEFAULTS };
  let generatedUUIDs = [];
  let history = [];
  let totalGenerated = 0;

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
      console.error('UUID Generator: Generate button not found');
      return;
    }

    loadFromURL();
    attachEventListeners();
    // Auto-generate on page load
    generateUUIDs();
  }

  function cacheElements() {
    elements = {
      form: document.getElementById('uuid-generator-form'),
      generateBtn: document.getElementById('generate-btn'),
      resultDiv: document.getElementById('uuid-generator-result'),
      validateInput: document.getElementById('uuid-validate-input'),
      validateResult: document.getElementById('uuid-validate-result')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('count')) {
      const count = parseInt(params.get('count'));
      if ([1, 5, 10, 25, 50, 100].includes(count)) {
        state.count = count;
      }
    }
    if (params.has('format')) {
      const format = params.get('format');
      if (['standard', 'no-hyphens', 'uppercase', 'braces', 'urn'].includes(format)) {
        state.format = format;
      }
    }

    applyStateToForm();
  }

  function applyStateToForm() {
    // Update batch buttons
    document.querySelectorAll('.batch-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.count) === state.count);
    });

    // Update format radio
    const formatRadio = document.querySelector(`input[name="uuid-format"][value="${state.format}"]`);
    if (formatRadio) formatRadio.checked = true;
  }

  function saveToURL() {
    const params = new URLSearchParams();

    if (state.count !== DEFAULTS.count) params.set('count', state.count);
    if (state.format !== DEFAULTS.format) params.set('format', state.format);

    const newURL = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  }

  function attachEventListeners() {
    // Generate button
    elements.generateBtn.addEventListener('click', () => {
      generateUUIDs();
      if (elements.resultDiv) {
        elements.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Batch size buttons
    document.querySelectorAll('.batch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.count = parseInt(e.target.dataset.count);
        document.querySelectorAll('.batch-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        saveToURL();
      });
    });

    // Format radio buttons
    document.querySelectorAll('input[name="uuid-format"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.format = e.target.value;
        saveToURL();
        // Re-display if we already have results
        if (generatedUUIDs.length > 0) {
          displayResults();
        }
      });
    });

    // Validation input
    if (elements.validateInput) {
      elements.validateInput.addEventListener('input', debounce(validateUUID, 300));
      elements.validateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          validateUUID();
        }
      });
    }

    // Enter key to generate
    document.querySelectorAll('#uuid-generator-form input').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          generateUUIDs();
        }
      });
    });
  }

  function generateUUIDv4() {
    // Generate cryptographically secure UUID v4
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    // Set version (4) in the 7th byte
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    // Set variant (10xx) in the 9th byte
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');

    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20, 32)
    ].join('-');
  }

  function formatUUID(uuid, format) {
    switch (format) {
      case 'standard':
        return uuid;
      case 'no-hyphens':
        return uuid.replace(/-/g, '');
      case 'uppercase':
        return uuid.toUpperCase();
      case 'braces':
        return '{' + uuid + '}';
      case 'urn':
        return 'urn:uuid:' + uuid;
      default:
        return uuid;
    }
  }

  function generateUUIDs() {
    generatedUUIDs = [];

    for (let i = 0; i < state.count; i++) {
      const uuid = generateUUIDv4();
      generatedUUIDs.push(uuid);
    }

    // Add to history
    const timestamp = new Date().toLocaleTimeString();
    generatedUUIDs.forEach(uuid => {
      history.unshift({ uuid: uuid, time: timestamp });
    });
    // Keep history limited
    if (history.length > 50) {
      history = history.slice(0, 50);
    }

    totalGenerated += state.count;

    displayResults();
    saveToURL();
  }

  function displayResults() {
    if (!elements.resultDiv) return;

    const formattedUUIDs = generatedUUIDs.map(uuid => formatUUID(uuid, state.format));

    const html = `
      <div class="uuid-stats">
        <div class="uuid-stat">
          <span class="uuid-stat-value">${formattedUUIDs.length}</span>
          <span class="uuid-stat-label">Generated Now</span>
        </div>
        <div class="uuid-stat">
          <span class="uuid-stat-value">${totalGenerated}</span>
          <span class="uuid-stat-label">Total This Session</span>
        </div>
        <div class="uuid-stat">
          <span class="uuid-stat-value">${state.format}</span>
          <span class="uuid-stat-label">Format</span>
        </div>
      </div>

      <div class="uuid-terminal">
        <div class="uuid-terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">uuid-generator v4 -- ${formattedUUIDs.length} result${formattedUUIDs.length > 1 ? 's' : ''}</span>
        </div>
        <ul class="uuid-list">
          ${formattedUUIDs.map((uuid, i) => `
            <li class="uuid-item">
              <span class="uuid-item-index">${(i + 1).toString().padStart(2, '0')}</span>
              <span class="uuid-item-text">${escapeHtml(uuid)}</span>
              <button type="button" class="uuid-item-copy" data-uuid="${escapeAttr(uuid)}">Copy</button>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="uuid-actions">
        <button type="button" class="uuid-action-btn copy-all" id="copy-all-btn">
          Copy All
        </button>
        <button type="button" class="uuid-action-btn download" id="download-btn">
          Download .txt
        </button>
        <button type="button" class="uuid-action-btn regenerate" id="regenerate-btn">
          Regenerate
        </button>
      </div>

      ${history.length > 0 ? `
        <div class="uuid-history">
          <h4>
            Recent History
            <button type="button" class="clear-history-btn" id="clear-history-btn">Clear</button>
          </h4>
          <div class="history-list">
            ${history.slice(0, 20).map(item => `
              <div class="history-item">
                <span class="history-item-text">${escapeHtml(formatUUID(item.uuid, state.format))}</span>
                <span class="history-item-time">${item.time}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    elements.resultDiv.innerHTML = html;
    elements.resultDiv.classList.remove('hidden');

    // Attach result event listeners
    attachResultListeners(formattedUUIDs);
  }

  function attachResultListeners(formattedUUIDs) {
    // Individual copy buttons
    document.querySelectorAll('.uuid-item-copy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const uuid = e.target.dataset.uuid;
        copyToClipboard(uuid, e.target);
      });
    });

    // Copy all button
    const copyAllBtn = document.getElementById('copy-all-btn');
    if (copyAllBtn) {
      copyAllBtn.addEventListener('click', () => {
        const text = formattedUUIDs.join('\n');
        copyToClipboard(text, copyAllBtn);
      });
    }

    // Download button
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        downloadAsFile(formattedUUIDs);
      });
    }

    // Regenerate button
    const regenerateBtn = document.getElementById('regenerate-btn');
    if (regenerateBtn) {
      regenerateBtn.addEventListener('click', () => {
        generateUUIDs();
      });
    }

    // Clear history button
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => {
        history = [];
        displayResults();
      });
    }
  }

  function validateUUID() {
    const input = elements.validateInput?.value.trim();
    const resultDiv = elements.validateResult;

    if (!resultDiv) return;

    if (!input) {
      resultDiv.classList.add('hidden');
      return;
    }

    // Strip braces and urn prefix for validation
    let cleanInput = input;
    if (cleanInput.startsWith('{') && cleanInput.endsWith('}')) {
      cleanInput = cleanInput.slice(1, -1);
    }
    if (cleanInput.toLowerCase().startsWith('urn:uuid:')) {
      cleanInput = cleanInput.slice(9);
    }

    // UUID regex (with or without hyphens)
    const uuidWithHyphens = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const uuidWithoutHyphens = /^[0-9a-f]{32}$/i;

    let isValid = false;
    let version = null;
    let variant = null;

    if (uuidWithHyphens.test(cleanInput)) {
      isValid = true;
      // Extract version and variant
      version = parseInt(cleanInput.charAt(14), 16);
      const variantChar = parseInt(cleanInput.charAt(19), 16);
      if ((variantChar & 0x8) === 0) variant = 'NCS';
      else if ((variantChar & 0xC) === 0x8) variant = 'RFC 4122';
      else if ((variantChar & 0xE) === 0xC) variant = 'Microsoft';
      else variant = 'Future';
    } else if (uuidWithoutHyphens.test(cleanInput)) {
      isValid = true;
      version = parseInt(cleanInput.charAt(12), 16);
      const variantChar = parseInt(cleanInput.charAt(16), 16);
      if ((variantChar & 0x8) === 0) variant = 'NCS';
      else if ((variantChar & 0xC) === 0x8) variant = 'RFC 4122';
      else if ((variantChar & 0xE) === 0xC) variant = 'Microsoft';
      else variant = 'Future';
    }

    if (isValid) {
      resultDiv.className = 'validate-result valid';
      resultDiv.innerHTML = `
        Valid UUID
        <div class="validate-details">
          Version: ${version} | Variant: ${variant} |
          ${version === 4 ? 'Random (v4)' : version === 1 ? 'Time-based (v1)' : version === 5 ? 'SHA-1 Name-based (v5)' : version === 3 ? 'MD5 Name-based (v3)' : 'Version ' + version}
        </div>
      `;
    } else {
      resultDiv.className = 'validate-result invalid';
      resultDiv.innerHTML = `
        Invalid UUID format
        <div class="validate-details">
          Expected format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (32 hex digits with or without hyphens)
        </div>
      `;
    }

    resultDiv.classList.remove('hidden');
  }

  function downloadAsFile(uuids) {
    const text = uuids.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${state.count}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  function debounce(fn, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

})();
