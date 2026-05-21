---
layout: ../../layouts/CalculatorLayout.astro
calcType: qr-code
---

## How to Use This Generator

1. Select the **content type** (URL, Text, WiFi, etc.)
2. Enter your **content** in the appropriate fields
3. Optionally adjust **size** and **error correction**
4. Click **Generate QR Code** to create your code
5. **Download** the QR code as a PNG image

<div class="calculator-form" id="qr-code-generator-form">
  <div class="form-section">
    <h3>Content Type</h3>
    <div class="unit-toggle">
      <button type="button" class="unit-btn active" data-type="url">URL</button>
      <button type="button" class="unit-btn" data-type="text">Text</button>
      <button type="button" class="unit-btn" data-type="wifi">WiFi</button>
      <button type="button" class="unit-btn" data-type="email">Email</button>
      <button type="button" class="unit-btn" data-type="phone">Phone</button>
      <button type="button" class="unit-btn" data-type="sms">SMS</button>
    </div>
  </div>

  <div class="form-section" id="input-url">
    <h3>URL</h3>
    <div class="form-row">
      <div class="form-group" style="flex: 1;">
        <label for="qr-url">Website URL <span class="required">*</span></label>
        <input type="url" id="qr-url" class="form-input" placeholder="https://example.com" value="https://calccrunch.com" />
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="input-text">
    <h3>Text Content</h3>
    <div class="form-row">
      <div class="form-group" style="flex: 1;">
        <label for="qr-text">Text <span class="required">*</span></label>
        <textarea id="qr-text" class="form-input" rows="4" placeholder="Enter your text here..."></textarea>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="input-wifi">
    <h3>WiFi Network</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="wifi-ssid">Network Name (SSID) <span class="required">*</span></label>
        <input type="text" id="wifi-ssid" class="form-input" placeholder="MyWiFiNetwork" />
      </div>
      <div class="form-group">
        <label for="wifi-password">Password</label>
        <input type="text" id="wifi-password" class="form-input" placeholder="password123" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="wifi-encryption">Encryption</label>
        <select id="wifi-encryption" class="form-select">
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="">None (Open)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="wifi-hidden">Hidden Network</label>
        <select id="wifi-hidden" class="form-select">
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="input-email">
    <h3>Email</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="email-to">To Address <span class="required">*</span></label>
        <input type="email" id="email-to" class="form-input" placeholder="hello@example.com" />
      </div>
      <div class="form-group">
        <label for="email-subject">Subject</label>
        <input type="text" id="email-subject" class="form-input" placeholder="Hello!" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex: 1;">
        <label for="email-body">Body</label>
        <textarea id="email-body" class="form-input" rows="3" placeholder="Message body..."></textarea>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="input-phone">
    <h3>Phone Number</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="phone-number">Phone Number <span class="required">*</span></label>
        <input type="tel" id="phone-number" class="form-input" placeholder="+1234567890" />
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="input-sms">
    <h3>SMS Message</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="sms-number">Phone Number <span class="required">*</span></label>
        <input type="tel" id="sms-number" class="form-input" placeholder="+1234567890" />
      </div>
      <div class="form-group">
        <label for="sms-message">Message</label>
        <input type="text" id="sms-message" class="form-input" placeholder="Hello!" />
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>QR Code Options</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="qr-size">Size</label>
        <select id="qr-size" class="form-select">
          <option value="200">Small (200px)</option>
          <option value="300" selected>Medium (300px)</option>
          <option value="400">Large (400px)</option>
          <option value="600">Extra Large (600px)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="qr-ecl">Error Correction</label>
        <select id="qr-ecl" class="form-select">
          <option value="L">Low (7%)</option>
          <option value="M" selected>Medium (15%)</option>
          <option value="Q">Quartile (25%)</option>
          <option value="H">High (30%)</option>
        </select>
        <small class="form-help">Higher = more damage resistance, larger QR code</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Generate QR Code →
  </button>

  <div class="form-actions">
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this generator">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share
    </button>
  </div>
</div>

<div id="qr-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>📱 About QR Codes</h4>
  <p>
    <strong>QR (Quick Response) codes</strong> are 2D barcodes that can store URLs, text, contact info, WiFi credentials, 
    and more. They were invented in 1994 by Denso Wave and can be scanned by any smartphone camera.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>🛡️ Error Correction Levels</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Low (L):</strong> 7% damage recovery — smallest QR code</li>
    <li><strong>Medium (M):</strong> 15% damage recovery — recommended default</li>
    <li><strong>Quartile (Q):</strong> 25% damage recovery — good for printed materials</li>
    <li><strong>High (H):</strong> 30% damage recovery — best for logos/designs overlaid</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share</h4>
  <p>
    Your QR code settings are saved in the URL. Bookmark or share the link to regenerate the same QR code later.
  </p>
</div>

<script src="/scripts/calculators/qr-code-generator.js"></script>
