---
layout: ../../layouts/CalculatorLayout.astro
calcType: uuid
---

## How to Use This Generator

1. **Select how many UUIDs** to generate using the batch size buttons
2. **Choose your format** - standard, no hyphens, uppercase, braces, or URN
3. Click **Generate UUIDs** to create new identifiers instantly
4. **Copy individual UUIDs** with one click or use **Copy All** for the full list
5. **Download** your UUIDs as a text file for use in projects
6. **Validate** any UUID by pasting it in the validation section

<div class="calculator-form" id="uuid-generator-form">
  <div class="form-section">
    <h3>Batch Size</h3>
    <div class="batch-presets">
      <button type="button" class="batch-btn active" data-count="1">1</button>
      <button type="button" class="batch-btn" data-count="5">5</button>
      <button type="button" class="batch-btn" data-count="10">10</button>
      <button type="button" class="batch-btn" data-count="25">25</button>
      <button type="button" class="batch-btn" data-count="50">50</button>
      <button type="button" class="batch-btn" data-count="100">100</button>
    </div>
  </div>

  <div class="form-section">
    <h3>Format</h3>
    <div class="format-options">
      <label class="radio-card">
        <input type="radio" name="uuid-format" value="standard" checked />
        <span class="radio-content">
          <span class="radio-label">Standard</span>
          <span class="radio-example">550e8400-e29b-41d4-a716-446655440000</span>
        </span>
      </label>
      <label class="radio-card">
        <input type="radio" name="uuid-format" value="no-hyphens" />
        <span class="radio-content">
          <span class="radio-label">No Hyphens</span>
          <span class="radio-example">550e8400e29b41d4a716446655440000</span>
        </span>
      </label>
      <label class="radio-card">
        <input type="radio" name="uuid-format" value="uppercase" />
        <span class="radio-content">
          <span class="radio-label">Uppercase</span>
          <span class="radio-example">550E8400-E29B-41D4-A716-446655440000</span>
        </span>
      </label>
      <label class="radio-card">
        <input type="radio" name="uuid-format" value="braces" />
        <span class="radio-content">
          <span class="radio-label">Braces</span>
          <span class="radio-example">{550e8400-e29b-41d4-a716-446655440000}</span>
        </span>
      </label>
      <label class="radio-card">
        <input type="radio" name="uuid-format" value="urn" />
        <span class="radio-content">
          <span class="radio-label">URN</span>
          <span class="radio-example">urn:uuid:550e8400-e29b-41d4-a716-446655440000</span>
        </span>
      </label>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      Generate UUIDs
    </button>
  </div>
</div>

<div id="uuid-generator-result" class="calculator-result hidden">
</div>

<div class="form-section" style="margin-top: 2rem;">
  <h3>Validate a UUID</h3>
  <div class="form-group">
    <input 
      type="text" 
      id="uuid-validate-input" 
      class="form-input"
      placeholder="Paste a UUID to validate (e.g., 550e8400-e29b-41d4-a716-446655440000)"
      maxlength="80"
    />
    <small class="form-help">Enter any string to check if it is a valid UUID format</small>
  </div>
  <div id="uuid-validate-result" class="validate-result hidden"></div>
</div>

<div class="info-box">
  <h4>What is a UUID v4?</h4>
  <p>
    A UUID (Universally Unique Identifier) version 4 is a 128-bit identifier generated using random or pseudo-random numbers. 
    The format consists of 32 hexadecimal digits displayed in 5 groups separated by hyphens: 
    <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>, where <code>4</code> indicates version 4 and 
    <code>y</code> is one of 8, 9, A, or B.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>UUID v4 Structure</h4>
  <div class="uuid-structure">
    <div class="structure-diagram">
      <span class="seg seg-time">time_low</span><span class="seg-sep">-</span><span class="seg seg-time">time_mid</span><span class="seg-sep">-</span><span class="seg seg-version">4xxx</span><span class="seg-sep">-</span><span class="seg seg-variant">yxxx</span><span class="seg-sep">-</span><span class="seg seg-node">node</span>
    </div>
    <div class="structure-legend">
      <span class="legend-item"><span class="dot dot-time"></span> Random bits (time fields repurposed)</span>
      <span class="legend-item"><span class="dot dot-version"></span> Version (always 4)</span>
      <span class="legend-item"><span class="dot dot-variant"></span> Variant (8, 9, A, or B)</span>
      <span class="legend-item"><span class="dot dot-node"></span> Random bits (node field repurposed)</span>
    </div>
  </div>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>When to Use UUIDs</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Database primary keys:</strong> When you need IDs that won't collide across distributed systems</li>
    <li><strong>API identifiers:</strong> For resource identification in RESTful APIs</li>
    <li><strong>Session tokens:</strong> Unique session identifiers for web applications</li>
    <li><strong>File naming:</strong> Guaranteed unique filenames for uploads and temp files</li>
    <li><strong>Message queues:</strong> Correlation IDs for distributed messaging systems</li>
  </ul>
</div>

<style>
  .batch-presets {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .batch-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    min-width: 60px;
  }

  .batch-btn:hover {
    border-color: var(--color-accent-orange);
    color: var(--color-accent-orange);
  }

  .batch-btn.active {
    background: var(--color-accent-orange);
    border-color: var(--color-accent-orange);
    color: #FFFFFF;
  }

  .format-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .radio-card {
    cursor: pointer;
    display: block;
  }

  .radio-card input {
    display: none;
  }

  .radio-content {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.25rem;
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
  }

  .radio-card input:checked + .radio-content {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #FFF5F0 0%, var(--color-white) 100%);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  .radio-card:hover .radio-content {
    border-color: var(--color-light-blue);
  }

  .radio-label {
    font-weight: 700;
    color: var(--color-gray-dark);
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }

  .radio-example {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    opacity: 0.7;
  }

  /* UUID Output Terminal */
  .uuid-terminal {
    background: #1a1a2e;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .uuid-terminal-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .terminal-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .terminal-dot.red { background: #ff5f56; }
  .terminal-dot.yellow { background: #ffbd2e; }
  .terminal-dot.green { background: #27c93f; }

  .terminal-title {
    color: var(--color-gray);
    font-size: 0.8rem;
    margin-left: 0.5rem;
    font-family: var(--font-mono);
  }

  .uuid-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 400px;
    overflow-y: auto;
  }

  .uuid-list::-webkit-scrollbar {
    width: 6px;
  }

  .uuid-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .uuid-list::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 3px;
  }

  .uuid-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0.75rem;
    border-radius: 6px;
    margin-bottom: 0.25rem;
    transition: background var(--transition-fast);
  }

  .uuid-item:hover {
    background: rgba(255,255,255,0.05);
  }

  .uuid-item-index {
    color: #64748B;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    min-width: 30px;
  }

  .uuid-item-text {
    flex: 1;
    font-family: var(--font-mono);
    color: #00ff88;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    word-break: break-all;
  }

  .uuid-item-copy {
    padding: 0.35rem 0.75rem;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.2);
    color: var(--color-gray);
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.75rem;
    font-family: var(--font-body);
    transition: all var(--transition-fast);
    margin-left: 0.75rem;
    white-space: nowrap;
  }

  .uuid-item-copy:hover {
    border-color: #00ff88;
    color: #00ff88;
  }

  .uuid-item-copy.copied {
    border-color: #00ff88;
    background: rgba(0, 255, 136, 0.15);
    color: #00ff88;
  }

  /* UUID Actions */
  .uuid-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .uuid-action-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-body);
    font-size: 0.9rem;
  }

  .uuid-action-btn.copy-all {
    background: var(--color-accent-orange);
    color: white;
  }

  .uuid-action-btn.copy-all:hover {
    background: var(--color-accent-orange-dark);
    transform: translateY(-2px);
  }

  .uuid-action-btn.download {
    background: var(--color-primary-blue);
    color: white;
  }

  .uuid-action-btn.download:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
  }

  .uuid-action-btn.regenerate {
    background: #16213e;
    color: var(--color-gray);
    border: 1px solid rgba(255,255,255,0.2);
  }

  .uuid-action-btn.regenerate:hover {
    color: white;
    border-color: rgba(255,255,255,0.4);
    transform: translateY(-2px);
  }

  .uuid-action-btn.copied {
    background: var(--color-success) !important;
  }

  /* Stats Bar */
  .uuid-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 1rem;
    background: var(--color-white);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-gray);
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .uuid-stat {
    text-align: center;
  }

  .uuid-stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    display: block;
  }

  .uuid-stat-label {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
  }

  /* History */
  .uuid-history {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid var(--color-gray);
    margin-top: 1.5rem;
  }

  .uuid-history h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .clear-history-btn {
    font-size: 0.75rem;
    padding: 0.35rem 0.75rem;
    background: transparent;
    border: 1px solid var(--color-gray);
    border-radius: 4px;
    cursor: pointer;
    color: var(--color-gray-dark);
    font-family: var(--font-body);
  }

  .clear-history-btn:hover {
    border-color: #EF4444;
    color: #EF4444;
  }

  .history-list {
    max-height: 200px;
    overflow-y: auto;
  }

  .history-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-gray-light);
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }

  .history-item:last-child {
    border-bottom: none;
  }

  .history-item-text {
    color: var(--color-gray-dark);
    word-break: break-all;
  }

  .history-item-time {
    color: var(--color-gray-dark);
    opacity: 0.6;
    font-size: 0.7rem;
    white-space: nowrap;
    margin-left: 1rem;
  }

  /* Validation */
  .validate-result {
    margin-top: 1rem;
    padding: 1rem 1.25rem;
    border-radius: var(--border-radius);
    font-weight: 600;
  }

  .validate-result.valid {
    background: var(--color-highlight-green);
    color: var(--color-success);
    border: 1px solid #6EE7B7;
  }

  .validate-result.invalid {
    background: var(--color-highlight-red);
    color: #991B1B;
    border: 1px solid #FCA5A5;
  }

  .validate-details {
    font-weight: 400;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    opacity: 0.8;
  }

  /* UUID Structure Diagram */
  .uuid-structure {
    margin-top: 1rem;
  }

  .structure-diagram {
    font-family: var(--font-mono);
    font-size: 1rem;
    text-align: center;
    padding: 1rem;
    background: var(--color-white);
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }

  .seg {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
  }

  .seg-sep {
    color: var(--color-gray-dark);
  }

  .seg-time { background: var(--color-highlight-blue); color: #1D4ED8; }
  .seg-version { background: var(--color-highlight-yellow); color: #D97706; }
  .seg-variant { background: #FCE7F3; color: #BE185D; }
  .seg-node { background: var(--color-highlight-green); color: var(--color-success); }

  .structure-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .structure-legend .legend-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .dot-time { background: #3B82F6; }
  .dot-version { background: #F59E0B; }
  .dot-variant { background: #EC4899; }
  .dot-node { background: #10B981; }

  .form-actions {
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .batch-presets {
      gap: 0.5rem;
    }

    .batch-btn {
      padding: 0.6rem 1rem;
      font-size: 1rem;
      min-width: 50px;
    }

    .uuid-item {
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .uuid-item-text {
      font-size: 0.75rem;
    }

    .uuid-actions {
      flex-direction: column;
      align-items: stretch;
    }

    .uuid-action-btn {
      justify-content: center;
    }

    .uuid-stats {
      gap: 1rem;
    }

    .structure-diagram {
      font-size: 0.75rem;
    }
  }
</style>

<script src="/scripts/calculators/uuid-generator.js"></script>
