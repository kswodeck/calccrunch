---
layout: ../../layouts/CalculatorLayout.astro
calcType: construction
---

## How to Use This Calculator

1. **Select your project type** - Choose from concrete, decking, fencing, drywall, flooring, roofing, paint, or insulation
2. **Enter dimensions** - Provide measurements specific to your project
3. **Adjust waste factor** - Set a percentage for material waste (defaults vary by project)
4. **Choose quality level** - Economy, standard, or premium affects cost estimates
5. Click **Calculate Materials** to see a detailed shopping list with quantities and cost estimates

<div class="calculator-form" id="construction-calculator-form">
  <div class="form-section">
    <h3>Project Type</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="project-type">
          Project Type <span class="required">*</span>
          <span class="tooltip" title="Select the type of construction project">?</span>
        </label>
        <select id="project-type" class="form-select" required>
          <option value="">-- Select Project --</option>
          <option value="concrete">Concrete (Slab, Footing, Column, Stairs)</option>
          <option value="decking">Decking (Wood or Composite)</option>
          <option value="fencing">Fencing (Wood, Vinyl, Chain Link)</option>
          <option value="drywall">Drywall</option>
          <option value="flooring">Flooring (Tile, Hardwood, LVP, Carpet)</option>
          <option value="roofing">Roofing (Asphalt Shingles, Metal)</option>
          <option value="paint">Paint (Interior Walls/Ceiling)</option>
          <option value="insulation">Insulation (Batt, Blown-In)</option>
        </select>
        <small class="form-help">Each project type has specific material calculations</small>
      </div>
    </div>
  </div>

  <!-- Concrete Section -->
  <div class="form-section project-section" id="concrete-section" style="display: none;">
    <h3>Concrete Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="concrete-shape">
          Shape <span class="required">*</span>
        </label>
        <select id="concrete-shape" class="form-select">
          <option value="rectangular">Rectangular</option>
          <option value="circular">Circular</option>
        </select>
        <small class="form-help">Shape of the concrete pour</small>
      </div>
      <div class="form-group">
        <label for="concrete-type">
          Project Type
        </label>
        <select id="concrete-type" class="form-select">
          <option value="slab">Slab</option>
          <option value="footing">Footing</option>
          <option value="column">Column</option>
          <option value="stairs">Stairs</option>
        </select>
      </div>
    </div>
    <div class="form-row" id="concrete-rect-dims">
      <div class="form-group">
        <label for="concrete-length">
          Length <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="concrete-length" class="form-input" placeholder="10" min="0.1" step="0.1" />
          <span class="input-addon">ft</span>
        </div>
      </div>
      <div class="form-group">
        <label for="concrete-width">
          Width <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="concrete-width" class="form-input" placeholder="10" min="0.1" step="0.1" />
          <span class="input-addon">ft</span>
        </div>
      </div>
    </div>
    <div class="form-row" id="concrete-circ-dims" style="display: none;">
      <div class="form-group">
        <label for="concrete-diameter">
          Diameter <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="concrete-diameter" class="form-input" placeholder="10" min="0.1" step="0.1" />
          <span class="input-addon">ft</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="concrete-depth">
          Thickness / Depth <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="concrete-depth" class="form-input" placeholder="4" min="0.5" step="0.5" />
          <span class="input-addon">inches</span>
        </div>
        <small class="form-help">Standard slab is 4"; footings are typically 8-12"</small>
      </div>
      <div class="form-group">
        <label for="concrete-bag-size">
          Bag Size (if not ordering truck)
        </label>
        <select id="concrete-bag-size" class="form-select">
          <option value="80">80 lb bags (0.6 cu ft each)</option>
          <option value="60">60 lb bags (0.45 cu ft each)</option>
          <option value="truck">Truck delivery (by cubic yard)</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Decking Section -->
  <div class="form-section project-section" id="decking-section" style="display: none;">
    <h3>Decking Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="deck-length">
          Deck Length <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="deck-length" class="form-input" placeholder="16" min="1" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
      <div class="form-group">
        <label for="deck-width">
          Deck Width <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="deck-width" class="form-input" placeholder="12" min="1" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="deck-material">
          Decking Material
        </label>
        <select id="deck-material" class="form-select">
          <option value="pressure-treated">Pressure-Treated Wood</option>
          <option value="cedar">Cedar</option>
          <option value="composite">Composite</option>
        </select>
      </div>
      <div class="form-group">
        <label for="deck-board-width">
          Board Width
        </label>
        <select id="deck-board-width" class="form-select">
          <option value="5.5">5.5" (standard)</option>
          <option value="3.5">3.5" (narrow)</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="deck-joist-spacing">
          Joist Spacing
        </label>
        <select id="deck-joist-spacing" class="form-select">
          <option value="16">16" on center (standard)</option>
          <option value="12">12" on center (composite/heavy load)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="deck-railing">
          Include Railing?
        </label>
        <select id="deck-railing" class="form-select">
          <option value="no">No railing</option>
          <option value="yes">Yes - include railing</option>
        </select>
      </div>
    </div>
    <div class="form-row" id="deck-railing-row" style="display: none;">
      <div class="form-group">
        <label for="deck-railing-length">
          Railing Linear Feet
        </label>
        <div class="input-group">
          <input type="number" id="deck-railing-length" class="form-input" placeholder="40" min="1" step="1" />
          <span class="input-addon">ft</span>
        </div>
        <small class="form-help">Total length of railing needed</small>
      </div>
    </div>
  </div>

  <!-- Fencing Section -->
  <div class="form-section project-section" id="fencing-section" style="display: none;">
    <h3>Fencing Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="fence-length">
          Total Linear Feet <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="fence-length" class="form-input" placeholder="150" min="1" step="1" />
          <span class="input-addon">ft</span>
        </div>
      </div>
      <div class="form-group">
        <label for="fence-material">
          Fence Material
        </label>
        <select id="fence-material" class="form-select">
          <option value="wood">Wood (picket/privacy)</option>
          <option value="vinyl">Vinyl</option>
          <option value="chain-link">Chain Link</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="fence-height">
          Height
        </label>
        <select id="fence-height" class="form-select">
          <option value="4">4 feet</option>
          <option value="6" selected>6 feet</option>
          <option value="8">8 feet</option>
        </select>
      </div>
      <div class="form-group">
        <label for="fence-post-spacing">
          Post Spacing
        </label>
        <select id="fence-post-spacing" class="form-select">
          <option value="6">6 feet (stronger)</option>
          <option value="8" selected>8 feet (standard)</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="fence-gates">
          Number of Gates
        </label>
        <div class="input-group">
          <input type="number" id="fence-gates" class="form-input" placeholder="1" value="1" min="0" max="20" step="1" />
          <span class="input-addon">gates</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Drywall Section -->
  <div class="form-section project-section" id="drywall-section" style="display: none;">
    <h3>Drywall Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="drywall-room-length">
          Room Length <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="drywall-room-length" class="form-input" placeholder="12" min="1" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
      <div class="form-group">
        <label for="drywall-room-width">
          Room Width <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="drywall-room-width" class="form-input" placeholder="12" min="1" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="drywall-height">
          Ceiling Height <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="drywall-height" class="form-input" placeholder="8" value="8" min="7" max="20" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
      <div class="form-group">
        <label for="drywall-sheet-size">
          Sheet Size
        </label>
        <select id="drywall-sheet-size" class="form-select">
          <option value="4x8">4' x 8' (standard)</option>
          <option value="4x12">4' x 12' (fewer seams)</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="drywall-doors">
          Number of Doors
        </label>
        <div class="input-group">
          <input type="number" id="drywall-doors" class="form-input" placeholder="2" value="2" min="0" max="20" step="1" />
          <span class="input-addon">doors</span>
        </div>
      </div>
      <div class="form-group">
        <label for="drywall-windows">
          Number of Windows
        </label>
        <div class="input-group">
          <input type="number" id="drywall-windows" class="form-input" placeholder="2" value="2" min="0" max="20" step="1" />
          <span class="input-addon">windows</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="drywall-include-ceiling">
          Include Ceiling?
        </label>
        <select id="drywall-include-ceiling" class="form-select">
          <option value="yes">Yes</option>
          <option value="no">No - walls only</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Flooring Section -->
  <div class="form-section project-section" id="flooring-section" style="display: none;">
    <h3>Flooring Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="floor-length">
          Room Length <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="floor-length" class="form-input" placeholder="14" min="1" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
      <div class="form-group">
        <label for="floor-width">
          Room Width <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="floor-width" class="form-input" placeholder="12" min="1" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="floor-material">
          Flooring Material
        </label>
        <select id="floor-material" class="form-select">
          <option value="tile">Ceramic/Porcelain Tile</option>
          <option value="hardwood">Hardwood</option>
          <option value="lvp">Luxury Vinyl Plank (LVP)</option>
          <option value="carpet">Carpet</option>
        </select>
      </div>
      <div class="form-group">
        <label for="floor-pattern">
          Installation Pattern
        </label>
        <select id="floor-pattern" class="form-select">
          <option value="straight">Straight lay (less waste)</option>
          <option value="diagonal">Diagonal (adds ~15% waste)</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Roofing Section -->
  <div class="form-section project-section" id="roofing-section" style="display: none;">
    <h3>Roofing Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="roof-length">
          Roof Length <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="roof-length" class="form-input" placeholder="40" min="1" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
      <div class="form-group">
        <label for="roof-width">
          Roof Width <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="roof-width" class="form-input" placeholder="25" min="1" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="roof-pitch">
          Roof Pitch
          <span class="tooltip" title="Rise over 12 inches of run. Common pitches: 4/12 to 8/12">?</span>
        </label>
        <select id="roof-pitch" class="form-select">
          <option value="3">3/12 (low slope)</option>
          <option value="4">4/12</option>
          <option value="5">5/12</option>
          <option value="6" selected>6/12 (standard)</option>
          <option value="8">8/12</option>
          <option value="10">10/12 (steep)</option>
          <option value="12">12/12 (very steep)</option>
        </select>
        <small class="form-help">Steeper pitch = more material needed</small>
      </div>
      <div class="form-group">
        <label for="roof-material">
          Roofing Material
        </label>
        <select id="roof-material" class="form-select">
          <option value="asphalt-3tab">Asphalt - 3-Tab Shingles</option>
          <option value="asphalt-arch">Asphalt - Architectural Shingles</option>
          <option value="metal-standing">Metal - Standing Seam</option>
          <option value="metal-corrugated">Metal - Corrugated Panels</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="roof-layers">
          Existing Layers to Remove
        </label>
        <select id="roof-layers" class="form-select">
          <option value="0">None (new construction)</option>
          <option value="1" selected>1 layer (standard tear-off)</option>
          <option value="2">2 layers</option>
          <option value="3">3 layers</option>
        </select>
        <small class="form-help">More layers = more tear-off labor and disposal</small>
      </div>
    </div>
  </div>

  <!-- Paint Section -->
  <div class="form-section project-section" id="paint-section" style="display: none;">
    <h3>Paint Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="paint-room-length">
          Room Length <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="paint-room-length" class="form-input" placeholder="14" min="1" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
      <div class="form-group">
        <label for="paint-room-width">
          Room Width <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="paint-room-width" class="form-input" placeholder="12" min="1" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="paint-height">
          Ceiling Height
        </label>
        <div class="input-group">
          <input type="number" id="paint-height" class="form-input" placeholder="8" value="8" min="7" max="20" step="0.5" />
          <span class="input-addon">ft</span>
        </div>
      </div>
      <div class="form-group">
        <label for="paint-coats">
          Number of Coats
        </label>
        <select id="paint-coats" class="form-select">
          <option value="1">1 coat (touch-up only)</option>
          <option value="2" selected>2 coats (standard)</option>
          <option value="3">3 coats (dark to light color change)</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="paint-doors">
          Doors to Subtract
        </label>
        <div class="input-group">
          <input type="number" id="paint-doors" class="form-input" placeholder="2" value="2" min="0" max="20" step="1" />
          <span class="input-addon">doors</span>
        </div>
      </div>
      <div class="form-group">
        <label for="paint-windows">
          Windows to Subtract
        </label>
        <div class="input-group">
          <input type="number" id="paint-windows" class="form-input" placeholder="2" value="2" min="0" max="20" step="1" />
          <span class="input-addon">windows</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="paint-include-ceiling">
          Include Ceiling?
        </label>
        <select id="paint-include-ceiling" class="form-select">
          <option value="yes">Yes</option>
          <option value="no">No - walls only</option>
        </select>
      </div>
      <div class="form-group">
        <label for="paint-include-primer">
          Include Primer?
        </label>
        <select id="paint-include-primer" class="form-select">
          <option value="yes" selected>Yes (recommended)</option>
          <option value="no">No (paint only)</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Insulation Section -->
  <div class="form-section project-section" id="insulation-section" style="display: none;">
    <h3>Insulation Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="insulation-area">
          Area to Insulate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="insulation-area" class="form-input" placeholder="500" min="1" step="1" />
          <span class="input-addon">sq ft</span>
        </div>
      </div>
      <div class="form-group">
        <label for="insulation-type">
          Insulation Type
        </label>
        <select id="insulation-type" class="form-select">
          <option value="batt">Fiberglass Batt</option>
          <option value="blown-fiberglass">Blown-In Fiberglass</option>
          <option value="blown-cellulose">Blown-In Cellulose</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="insulation-rvalue">
          R-Value Desired
          <span class="tooltip" title="Higher R-value = better insulation. R-13 for walls, R-38 to R-60 for attics">?</span>
        </label>
        <select id="insulation-rvalue" class="form-select">
          <option value="13">R-13 (2x4 walls)</option>
          <option value="19">R-19 (2x6 walls)</option>
          <option value="30">R-30 (floors/ceilings)</option>
          <option value="38">R-38 (attic minimum)</option>
          <option value="49">R-49 (attic recommended)</option>
          <option value="60">R-60 (cold climate attic)</option>
        </select>
        <small class="form-help">Check local building codes for minimum requirements</small>
      </div>
    </div>
  </div>

  <!-- Shared Options -->
  <div class="form-section" id="shared-options" style="display: none;">
    <h3>Material Options</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="waste-factor">
          Waste Factor
          <span class="tooltip" title="Extra material to account for cuts, mistakes, and future repairs">?</span>
        </label>
        <div class="input-group">
          <input type="number" id="waste-factor" class="form-input" placeholder="10" value="10" min="0" max="50" step="1" />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help" id="waste-help">Recommended: 10% for most projects</small>
      </div>
      <div class="form-group">
        <label for="quality-level">
          Quality / Price Level
        </label>
        <select id="quality-level" class="form-select">
          <option value="economy">Economy (budget materials)</option>
          <option value="standard" selected>Standard (mid-range)</option>
          <option value="premium">Premium (high-end)</option>
        </select>
        <small class="form-help">Affects material cost estimates</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="include-cost">
          Include Cost Estimate?
        </label>
        <select id="include-cost" class="form-select">
          <option value="yes" selected>Yes</option>
          <option value="no">No - quantities only</option>
        </select>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Materials
  </button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear All
    </button>
    <button type="button" id="share-calculation" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share
    </button>
  </div>
</div>

<div id="construction-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>Material Estimation Tips</h4>
  <p>Accurate material estimation saves money and reduces waste:</p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Always round up:</strong> You can't buy half a sheet of drywall or 3/4 of a bag of concrete</li>
    <li><strong>Waste factor matters:</strong> Complex cuts and patterns increase waste significantly</li>
    <li><strong>Buy extra:</strong> Having 10-15% extra means fewer trips to the store mid-project</li>
    <li><strong>Check lot numbers:</strong> Buy all material at once to ensure color/lot consistency</li>
    <li><strong>Return policies:</strong> Most stores accept unused, undamaged materials back within 90 days</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>Waste Factor Guide</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Concrete:</strong> 5-10% (forms may vary, spillage)</li>
    <li><strong>Decking:</strong> 10-15% (cuts at ends, angled boards)</li>
    <li><strong>Fencing:</strong> 5-10% (minimal waste with planning)</li>
    <li><strong>Drywall:</strong> 10-15% (cutouts for outlets, odd shapes)</li>
    <li><strong>Flooring (straight):</strong> 10% (end cuts, damaged pieces)</li>
    <li><strong>Flooring (diagonal):</strong> 15-20% (more angled cuts)</li>
    <li><strong>Roofing:</strong> 10-15% (hips, valleys, starter strips)</li>
    <li><strong>Paint:</strong> 5-10% (touch-ups, texture absorption)</li>
    <li><strong>Insulation:</strong> 5-10% (trimming around obstacles)</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>Project Planning Checklist</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Measure twice:</strong> Double-check all dimensions before ordering materials</li>
    <li><strong>Check codes:</strong> Local building codes may dictate minimum specs (R-value, concrete thickness, fence height)</li>
    <li><strong>Permits:</strong> Many projects over a certain size require building permits</li>
    <li><strong>Utilities:</strong> Call 811 before digging for fence posts or footings</li>
    <li><strong>Weather:</strong> Plan concrete pours and paint jobs around weather forecasts</li>
    <li><strong>Delivery:</strong> Schedule material delivery when you'll be ready to start</li>
    <li><strong>Storage:</strong> Keep materials dry and off the ground until installation</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-red); border-left-color: var(--color-error);">
  <h4>Important Disclaimers</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>These are estimates only - actual quantities may vary based on site conditions</li>
    <li>Prices are approximate and vary by region, season, and supplier</li>
    <li>Always consult local building codes before starting construction</li>
    <li>Complex projects may require professional engineering or design</li>
    <li>Material prices fluctuate - verify current pricing with your supplier</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>Save & Share</h4>
  <p>
    Your material estimate is saved in the URL. <strong>Bookmark this page</strong> or use the <strong>Share button</strong> to revisit or share your calculation with your contractor or team.
  </p>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  .material-list {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  .material-list th,
  .material-list td {
    padding: 0.5rem 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--color-gray);
  }

  .material-list th {
    background: var(--color-gray-light, #f5f5f5);
    font-weight: 700;
    font-size: var(--text-sm);
  }

  .material-list td:last-child {
    text-align: right;
  }

  .cost-summary {
    margin-top: 1.5rem;
    padding: 1rem;
    background: var(--color-gray-light, #f5f5f5);
    border-radius: var(--border-radius);
  }

  .cost-row {
    display: flex;
    justify-content: space-between;
    padding: 0.35rem 0;
  }

  .cost-row.total {
    border-top: 2px solid var(--color-gray-dark, #333);
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .pro-tip {
    margin-top: 1.5rem;
    padding: 1rem;
    background: linear-gradient(135deg, #fff8f5, #ffe8d6);
    border-left: 4px solid var(--color-accent-orange, #ff6b35);
    border-radius: var(--border-radius);
  }

  .pro-tip h4 {
    margin: 0 0 0.5rem 0;
    color: var(--color-accent-orange, #ff6b35);
  }

  @media (max-width: 768px) {
    .form-actions {
      flex-direction: column;
    }

    .form-actions button {
      width: 100%;
    }

    .material-list {
      font-size: var(--text-sm);
    }

    .material-list th,
    .material-list td {
      padding: 0.35rem 0.5rem;
    }
  }
</style>

<script src="/scripts/calculators/construction-calculator.js"></script>
