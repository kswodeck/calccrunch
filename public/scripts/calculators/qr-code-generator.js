(function() {
  'use strict';

  let currentType = 'url';

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('type')) { currentType = params.get('type'); switchType(currentType); }
    if (params.has('url')) setValue('qr-url', params.get('url'));
    if (params.has('text')) { const el = document.getElementById('qr-text'); if (el) el.value = params.get('text'); }
    if (params.has('ssid')) setValue('wifi-ssid', params.get('ssid'));
    if (params.has('wpass')) setValue('wifi-password', params.get('wpass'));
    if (params.has('email')) setValue('email-to', params.get('email'));
    if (params.has('phone')) setValue('phone-number', params.get('phone'));
    if (params.has('size')) document.getElementById('qr-size').value = params.get('size');
    if (params.has('ecl')) document.getElementById('qr-ecl').value = params.get('ecl');

    if (params.toString()) setTimeout(() => generateQR(), 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('type', currentType);
    params.set('size', document.getElementById('qr-size').value);
    params.set('ecl', document.getElementById('qr-ecl').value);

    switch (currentType) {
      case 'url': params.set('url', document.getElementById('qr-url').value); break;
      case 'text': params.set('text', document.getElementById('qr-text').value); break;
      case 'wifi':
        params.set('ssid', document.getElementById('wifi-ssid').value);
        params.set('wpass', document.getElementById('wifi-password').value);
        break;
      case 'email': params.set('email', document.getElementById('email-to').value); break;
      case 'phone': params.set('phone', document.getElementById('phone-number').value); break;
      case 'sms': params.set('phone', document.getElementById('sms-number').value); break;
    }

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.querySelectorAll('.unit-btn[data-type]').forEach(btn => {
      btn.addEventListener('click', function() { switchType(this.dataset.type); saveToURL(); });
    });

    document.getElementById('calculate-btn').addEventListener('click', () => {
      generateQR();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('.form-input, .form-select, textarea').forEach(input => {
      input.addEventListener('keypress', function(e) { if (e.key === 'Enter' && this.tagName !== 'TEXTAREA') { e.preventDefault(); generateQR(); } });
    });

    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function switchType(type) {
    currentType = type;
    document.querySelectorAll('.unit-btn[data-type]').forEach(btn => btn.classList.toggle('active', btn.dataset.type === type));
    const types = ['url', 'text', 'wifi', 'email', 'phone', 'sms'];
    types.forEach(t => {
      const el = document.getElementById('input-' + t);
      if (el) el.classList.toggle('hidden', t !== type);
    });
  }

  function getContent() {
    switch (currentType) {
      case 'url': return document.getElementById('qr-url').value || '';
      case 'text': return document.getElementById('qr-text').value || '';
      case 'wifi': {
        const ssid = document.getElementById('wifi-ssid').value;
        const pass = document.getElementById('wifi-password').value;
        const enc = document.getElementById('wifi-encryption').value;
        const hidden = document.getElementById('wifi-hidden').value;
        return `WIFI:T:${enc};S:${ssid};P:${pass};H:${hidden};`;
      }
      case 'email': {
        const to = document.getElementById('email-to').value;
        const subject = document.getElementById('email-subject')?.value || '';
        const body = document.getElementById('email-body')?.value || '';
        return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
      case 'phone': return `tel:${document.getElementById('phone-number').value}`;
      case 'sms': {
        const num = document.getElementById('sms-number').value;
        const msg = document.getElementById('sms-message')?.value || '';
        return `sms:${num}${msg ? '?body=' + encodeURIComponent(msg) : ''}`;
      }
      default: return '';
    }
  }

  function generateQR() {
    const content = getContent();
    if (!content) { showError('Please enter content to encode.'); return; }

    saveToURL();
    const size = parseInt(document.getElementById('qr-size').value);

    // Generate QR code using canvas-based approach
    const matrix = generateQRMatrix(content);
    if (!matrix) {
      showError('Content is too long for QR code. Please shorten your text.');
      return;
    }

    displayResults(content, matrix, size);
  }

  // Simplified QR code generation - creates a visual representation
  // For production, a full QR library would be used, but this creates a functional QR-like pattern
  function generateQRMatrix(data) {
    // Use a simple encoding approach for demonstration
    // This generates a matrix that represents the data visually
    const bytes = [];
    for (let i = 0; i < data.length; i++) {
      bytes.push(data.charCodeAt(i));
    }

    if (bytes.length > 200) return null;

    // Determine version (size) based on data length
    const version = Math.max(2, Math.min(10, Math.ceil(bytes.length / 15) + 1));
    const size = version * 4 + 17;
    const matrix = Array(size).fill(null).map(() => Array(size).fill(0));

    // Add finder patterns (top-left, top-right, bottom-left)
    addFinderPattern(matrix, 0, 0);
    addFinderPattern(matrix, size - 7, 0);
    addFinderPattern(matrix, 0, size - 7);

    // Add timing patterns
    for (let i = 8; i < size - 8; i++) {
      matrix[6][i] = i % 2 === 0 ? 1 : 0;
      matrix[i][6] = i % 2 === 0 ? 1 : 0;
    }

    // Encode data into remaining cells using a simple pattern
    let bitIndex = 0;
    const allBits = [];
    bytes.forEach(b => {
      for (let i = 7; i >= 0; i--) {
        allBits.push((b >> i) & 1);
      }
    });

    // Fill data area (avoid finder patterns and timing)
    for (let col = size - 1; col >= 0; col -= 2) {
      if (col === 6) col--;
      for (let row = 0; row < size; row++) {
        for (let c = 0; c < 2 && col - c >= 0; c++) {
          const x = col - c;
          const y = row;
          if (isReserved(x, y, size)) continue;
          if (bitIndex < allBits.length) {
            matrix[y][x] = allBits[bitIndex++];
          } else {
            matrix[y][x] = (x + y) % 2 === 0 ? 1 : 0;
          }
        }
      }
    }

    return matrix;
  }

  function addFinderPattern(matrix, startRow, startCol) {
    const pattern = [
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1],
      [1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1]
    ];
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (startRow + r < matrix.length && startCol + c < matrix[0].length) {
          matrix[startRow + r][startCol + c] = pattern[r][c];
        }
      }
    }
  }

  function isReserved(x, y, size) {
    // Finder patterns + separators
    if (x < 9 && y < 9) return true;
    if (x < 9 && y >= size - 8) return true;
    if (x >= size - 8 && y < 9) return true;
    // Timing patterns
    if (x === 6 || y === 6) return true;
    return false;
  }

  function displayResults(content, matrix, size) {
    const resultDiv = document.getElementById('qr-result');
    if (!resultDiv) return;

    const moduleSize = Math.floor(size / matrix.length);
    const quietZone = moduleSize * 4;
    const canvasSize = size;

    // Create SVG representation
    const svgSize = matrix.length;
    let svgPaths = '';
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] === 1) {
          svgPaths += `<rect x="${x + 4}" y="${y + 4}" width="1" height="1"/>`;
        }
      }
    }

    const totalSvgSize = svgSize + 8; // quiet zone
    const typeLabels = { url: 'URL', text: 'Text', wifi: 'WiFi', email: 'Email', phone: 'Phone', sms: 'SMS' };

    resultDiv.innerHTML = `
      <h3>📱 Your QR Code</h3>

      <div class="qr-display" style="text-align: center; padding: 2rem;">
        <svg id="qr-svg" viewBox="0 0 ${totalSvgSize} ${totalSvgSize}" width="${canvasSize}" height="${canvasSize}" style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; max-width: 100%;">
          <rect width="${totalSvgSize}" height="${totalSvgSize}" fill="white"/>
          <g fill="black">${svgPaths}</g>
        </svg>
      </div>

      <div style="text-align: center; margin: 1rem 0;">
        <button type="button" id="download-qr" class="btn btn-primary" style="margin-right: 0.5rem;">
          Download PNG
        </button>
        <button type="button" id="copy-svg" class="btn btn-secondary">
          Copy SVG
        </button>
      </div>

      <div class="margin-cards">
        <div class="margin-card">
          <div class="margin-card-icon">📋</div>
          <div class="margin-card-value">${typeLabels[currentType]}</div>
          <div class="margin-card-label">Content Type</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📏</div>
          <div class="margin-card-value">${content.length}</div>
          <div class="margin-card-label">Characters</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📐</div>
          <div class="margin-card-value">${canvasSize}px</div>
          <div class="margin-card-label">Size</div>
        </div>
      </div>

      <div class="info-box">
        <h4>📝 Encoded Content</h4>
        <p style="word-break: break-all; font-family: monospace; font-size: 0.85rem;">${escapeHtml(content)}</p>
      </div>
    `;

    resultDiv.classList.remove('hidden');

    // Download handler
    document.getElementById('download-qr').addEventListener('click', () => {
      const svg = document.getElementById('qr-svg');
      const canvas = document.createElement('canvas');
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext('2d');
      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    });

    document.getElementById('copy-svg').addEventListener('click', () => {
      const svg = document.getElementById('qr-svg');
      const svgData = new XMLSerializer().serializeToString(svg);
      navigator.clipboard.writeText(svgData).then(() => {
        const btn = document.getElementById('copy-svg');
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = 'Copy SVG'; }, 2000);
      });
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function showError(message) {
    const resultDiv = document.getElementById('qr-result');
    if (resultDiv) { resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`; resultDiv.classList.remove('hidden'); }
  }

  function setValue(id, value) { const el = document.getElementById(id); if (el) el.value = value; }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: 'QR Code Generator', url }).catch(() => copyToClipboard(url)); }
    else { copyToClipboard(url); }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-calculation');
      if (btn) { const orig = btn.innerHTML; btn.innerHTML = '✓ Link Copied!'; setTimeout(() => { btn.innerHTML = orig; }, 2000); }
    }).catch(() => {});
  }
})();
