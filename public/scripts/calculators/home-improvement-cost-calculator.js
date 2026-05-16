// Home Improvement Cost Calculator - Estimate renovation costs with ROI and timeline
(function() {
  'use strict';

  // Project cost data per square foot (mid-range, professional)
  const PROJECT_DATA = {
    kitchen: {
      label: 'Kitchen Remodel',
      baseCostPerSqFt: { budget: 75, 'mid-range': 150, 'high-end': 300 },
      laborPct: 0.35,
      materialPct: 0.50,
      permitPct: 0.03,
      otherPct: 0.12,
      roi: { budget: 0.60, 'mid-range': 0.72, 'high-end': 0.54 },
      timelineWeeks: { budget: 4, 'mid-range': 8, 'high-end': 14 },
      diyDifficulty: 'Hard',
      diySavings: 0.25,
      subOptions: [
        { id: 'kitchen-scope', label: 'Scope of Work', type: 'select', options: [
          { value: 'cosmetic', label: 'Cosmetic (paint, hardware, backsplash)', multiplier: 0.4 },
          { value: 'minor', label: 'Minor (new counters, appliances, refaced cabinets)', multiplier: 0.7 },
          { value: 'major', label: 'Major (new cabinets, layout changes)', multiplier: 1.0 },
          { value: 'full-gut', label: 'Full Gut (down to studs)', multiplier: 1.4 }
        ]},
        { id: 'kitchen-counters', label: 'Countertop Material', type: 'select', options: [
          { value: 'laminate', label: 'Laminate', multiplier: 0.85 },
          { value: 'butcher-block', label: 'Butcher Block', multiplier: 0.90 },
          { value: 'quartz', label: 'Quartz', multiplier: 1.0 },
          { value: 'granite', label: 'Granite', multiplier: 1.05 },
          { value: 'marble', label: 'Marble', multiplier: 1.20 }
        ]}
      ]
    },
    bathroom: {
      label: 'Bathroom Remodel',
      baseCostPerSqFt: { budget: 100, 'mid-range': 200, 'high-end': 450 },
      laborPct: 0.40,
      materialPct: 0.45,
      permitPct: 0.03,
      otherPct: 0.12,
      roi: { budget: 0.55, 'mid-range': 0.60, 'high-end': 0.45 },
      timelineWeeks: { budget: 2, 'mid-range': 4, 'high-end': 8 },
      diyDifficulty: 'Hard',
      diySavings: 0.30,
      subOptions: [
        { id: 'bath-scope', label: 'Scope', type: 'select', options: [
          { value: 'cosmetic', label: 'Cosmetic (paint, fixtures, accessories)', multiplier: 0.35 },
          { value: 'partial', label: 'Partial (new vanity, toilet, tub/shower)', multiplier: 0.7 },
          { value: 'full', label: 'Full Remodel (complete renovation)', multiplier: 1.0 },
          { value: 'addition', label: 'New Bathroom Addition', multiplier: 1.6 }
        ]},
        { id: 'bath-fixtures', label: 'Fixture Quality', type: 'select', options: [
          { value: 'basic', label: 'Basic (builder grade)', multiplier: 0.85 },
          { value: 'standard', label: 'Standard', multiplier: 1.0 },
          { value: 'premium', label: 'Premium (designer brands)', multiplier: 1.3 }
        ]}
      ]
    },
    flooring: {
      label: 'Flooring',
      baseCostPerSqFt: { budget: 5, 'mid-range': 12, 'high-end': 25 },
      laborPct: 0.40,
      materialPct: 0.50,
      permitPct: 0.0,
      otherPct: 0.10,
      roi: { budget: 0.55, 'mid-range': 0.70, 'high-end': 0.55 },
      timelineWeeks: { budget: 1, 'mid-range': 1, 'high-end': 2 },
      diyDifficulty: 'Medium',
      diySavings: 0.40,
      subOptions: [
        { id: 'floor-material', label: 'Flooring Material', type: 'select', options: [
          { value: 'vinyl-plank', label: 'Luxury Vinyl Plank (LVP)', multiplier: 0.7 },
          { value: 'laminate', label: 'Laminate', multiplier: 0.6 },
          { value: 'hardwood-engineered', label: 'Engineered Hardwood', multiplier: 1.0 },
          { value: 'hardwood-solid', label: 'Solid Hardwood', multiplier: 1.3 },
          { value: 'tile', label: 'Tile (ceramic/porcelain)', multiplier: 1.1 },
          { value: 'stone', label: 'Natural Stone', multiplier: 1.8 }
        ]},
        { id: 'floor-subfloor', label: 'Subfloor Condition', type: 'select', options: [
          { value: 'good', label: 'Good (no prep needed)', multiplier: 1.0 },
          { value: 'needs-leveling', label: 'Needs Leveling', multiplier: 1.15 },
          { value: 'needs-replacement', label: 'Needs Replacement', multiplier: 1.35 }
        ]}
      ]
    },
    roofing: {
      label: 'Roofing',
      baseCostPerSqFt: { budget: 4, 'mid-range': 8, 'high-end': 18 },
      laborPct: 0.45,
      materialPct: 0.40,
      permitPct: 0.03,
      otherPct: 0.12,
      roi: { budget: 0.55, 'mid-range': 0.60, 'high-end': 0.50 },
      timelineWeeks: { budget: 1, 'mid-range': 1, 'high-end': 2 },
      diyDifficulty: 'Very Hard',
      diySavings: 0.35,
      subOptions: [
        { id: 'roof-material', label: 'Roofing Material', type: 'select', options: [
          { value: '3-tab', label: '3-Tab Asphalt Shingles', multiplier: 0.7 },
          { value: 'architectural', label: 'Architectural Shingles', multiplier: 1.0 },
          { value: 'metal', label: 'Metal Roofing', multiplier: 1.5 },
          { value: 'tile', label: 'Clay/Concrete Tile', multiplier: 2.0 },
          { value: 'slate', label: 'Slate', multiplier: 3.0 }
        ]},
        { id: 'roof-layers', label: 'Existing Layers', type: 'select', options: [
          { value: '0', label: 'New roof deck (no tearoff)', multiplier: 0.9 },
          { value: '1', label: '1 layer to remove', multiplier: 1.0 },
          { value: '2', label: '2+ layers to remove', multiplier: 1.15 }
        ]}
      ]
    },
    painting: {
      label: 'Painting',
      baseCostPerSqFt: { budget: 2, 'mid-range': 4, 'high-end': 7 },
      laborPct: 0.60,
      materialPct: 0.25,
      permitPct: 0.0,
      otherPct: 0.15,
      roi: { budget: 0.50, 'mid-range': 0.60, 'high-end': 0.50 },
      timelineWeeks: { budget: 0.5, 'mid-range': 1, 'high-end': 2 },
      diyDifficulty: 'Easy',
      diySavings: 0.55,
      subOptions: [
        { id: 'paint-scope', label: 'Scope', type: 'select', options: [
          { value: 'interior', label: 'Interior Only', multiplier: 1.0 },
          { value: 'exterior', label: 'Exterior Only', multiplier: 1.3 },
          { value: 'both', label: 'Interior + Exterior', multiplier: 2.0 }
        ]},
        { id: 'paint-prep', label: 'Prep Work Needed', type: 'select', options: [
          { value: 'minimal', label: 'Minimal (clean walls)', multiplier: 0.9 },
          { value: 'standard', label: 'Standard (patch & prime)', multiplier: 1.0 },
          { value: 'extensive', label: 'Extensive (scraping, repair, prime)', multiplier: 1.4 }
        ]}
      ]
    },
    deck: {
      label: 'Deck / Patio',
      baseCostPerSqFt: { budget: 20, 'mid-range': 40, 'high-end': 75 },
      laborPct: 0.45,
      materialPct: 0.40,
      permitPct: 0.05,
      otherPct: 0.10,
      roi: { budget: 0.55, 'mid-range': 0.65, 'high-end': 0.50 },
      timelineWeeks: { budget: 2, 'mid-range': 3, 'high-end': 6 },
      diyDifficulty: 'Medium',
      diySavings: 0.40,
      subOptions: [
        { id: 'deck-material', label: 'Decking Material', type: 'select', options: [
          { value: 'pressure-treated', label: 'Pressure-Treated Wood', multiplier: 0.7 },
          { value: 'cedar', label: 'Cedar / Redwood', multiplier: 1.0 },
          { value: 'composite', label: 'Composite', multiplier: 1.3 },
          { value: 'pvc', label: 'PVC / Cellular', multiplier: 1.5 },
          { value: 'ipe', label: 'Ipe / Tropical Hardwood', multiplier: 2.0 }
        ]},
        { id: 'deck-features', label: 'Features', type: 'select', options: [
          { value: 'basic', label: 'Basic (flat, simple railing)', multiplier: 1.0 },
          { value: 'multi-level', label: 'Multi-Level', multiplier: 1.3 },
          { value: 'covered', label: 'Covered / Pergola', multiplier: 1.5 },
          { value: 'outdoor-kitchen', label: 'With Outdoor Kitchen', multiplier: 2.0 }
        ]}
      ]
    },
    windows: {
      label: 'Windows Replacement',
      baseCostPerSqFt: { budget: 30, 'mid-range': 55, 'high-end': 100 },
      laborPct: 0.35,
      materialPct: 0.50,
      permitPct: 0.03,
      otherPct: 0.12,
      roi: { budget: 0.60, 'mid-range': 0.68, 'high-end': 0.55 },
      timelineWeeks: { budget: 1, 'mid-range': 1, 'high-end': 2 },
      diyDifficulty: 'Hard',
      diySavings: 0.25,
      subOptions: [
        { id: 'window-type', label: 'Window Type', type: 'select', options: [
          { value: 'vinyl-dh', label: 'Vinyl Double-Hung', multiplier: 0.8 },
          { value: 'vinyl-casement', label: 'Vinyl Casement', multiplier: 0.9 },
          { value: 'wood', label: 'Wood Frame', multiplier: 1.2 },
          { value: 'fiberglass', label: 'Fiberglass', multiplier: 1.3 },
          { value: 'clad-wood', label: 'Clad Wood (Andersen/Pella)', multiplier: 1.5 }
        ]},
        { id: 'window-glass', label: 'Glass Type', type: 'select', options: [
          { value: 'double', label: 'Double Pane', multiplier: 1.0 },
          { value: 'triple', label: 'Triple Pane', multiplier: 1.25 },
          { value: 'low-e', label: 'Low-E Coated', multiplier: 1.1 }
        ]}
      ]
    },
    hvac: {
      label: 'HVAC System',
      baseCostPerSqFt: { budget: 8, 'mid-range': 14, 'high-end': 25 },
      laborPct: 0.45,
      materialPct: 0.40,
      permitPct: 0.05,
      otherPct: 0.10,
      roi: { budget: 0.50, 'mid-range': 0.55, 'high-end': 0.45 },
      timelineWeeks: { budget: 1, 'mid-range': 1, 'high-end': 2 },
      diyDifficulty: 'Very Hard',
      diySavings: 0.15,
      subOptions: [
        { id: 'hvac-type', label: 'System Type', type: 'select', options: [
          { value: 'central-ac', label: 'Central AC Only', multiplier: 0.6 },
          { value: 'furnace-only', label: 'Furnace Only', multiplier: 0.5 },
          { value: 'full-system', label: 'Full System (AC + Furnace)', multiplier: 1.0 },
          { value: 'heat-pump', label: 'Heat Pump', multiplier: 1.1 },
          { value: 'geothermal', label: 'Geothermal', multiplier: 2.5 },
          { value: 'mini-split', label: 'Ductless Mini-Split', multiplier: 0.7 }
        ]},
        { id: 'hvac-ductwork', label: 'Ductwork', type: 'select', options: [
          { value: 'existing', label: 'Use Existing Ductwork', multiplier: 1.0 },
          { value: 'modify', label: 'Modify/Extend Ductwork', multiplier: 1.2 },
          { value: 'new', label: 'All New Ductwork', multiplier: 1.5 }
        ]}
      ]
    },
    landscaping: {
      label: 'Landscaping',
      baseCostPerSqFt: { budget: 5, 'mid-range': 15, 'high-end': 35 },
      laborPct: 0.50,
      materialPct: 0.35,
      permitPct: 0.02,
      otherPct: 0.13,
      roi: { budget: 0.50, 'mid-range': 0.60, 'high-end': 0.45 },
      timelineWeeks: { budget: 1, 'mid-range': 3, 'high-end': 6 },
      diyDifficulty: 'Medium',
      diySavings: 0.45,
      subOptions: [
        { id: 'landscape-scope', label: 'Scope', type: 'select', options: [
          { value: 'softscape', label: 'Softscape Only (plants, lawn, mulch)', multiplier: 0.7 },
          { value: 'mixed', label: 'Mixed (plants + hardscape paths)', multiplier: 1.0 },
          { value: 'hardscape', label: 'Major Hardscape (patio, retaining walls)', multiplier: 1.5 },
          { value: 'full', label: 'Full Landscape Design', multiplier: 1.8 }
        ]},
        { id: 'landscape-features', label: 'Special Features', type: 'select', options: [
          { value: 'none', label: 'None', multiplier: 1.0 },
          { value: 'irrigation', label: 'Irrigation System', multiplier: 1.15 },
          { value: 'lighting', label: 'Landscape Lighting', multiplier: 1.1 },
          { value: 'water-feature', label: 'Water Feature / Pool', multiplier: 1.6 }
        ]}
      ]
    }
  };

  let state = {
    quality: 'mid-range',
    projectType: ''
  };

  let elements = {};

  document.addEventListener('DOMContentLoaded', function() {
    cacheElements();
    loadFromURL();
    attachEventListeners();
  });

  function cacheElements() {
    elements = {
      calculateBtn: document.getElementById('calculate-btn'),
      clearBtn: document.getElementById('clear-btn'),
      shareBtn: document.getElementById('share-calculation'),
      resultDiv: document.getElementById('home-improvement-result'),
      projectType: document.getElementById('project-type'),
      sqFootage: document.getElementById('square-footage'),
      roomCount: document.getElementById('room-count'),
      roomCountGroup: document.getElementById('room-count-group'),
      regionMultiplier: document.getElementById('region-multiplier'),
      diyToggle: document.getElementById('diy-toggle'),
      contingencyPct: document.getElementById('contingency-pct'),
      permitNeeded: document.getElementById('permit-needed'),
      subOptionsSection: document.getElementById('sub-options-section'),
      subOptionsContainer: document.getElementById('sub-options-container'),
      sqftHelp: document.getElementById('sqft-help')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('project')) setValue('project-type', params.get('project'));
    if (params.has('sqft')) setValue('square-footage', params.get('sqft'));
    if (params.has('rooms')) setValue('room-count', params.get('rooms'));
    if (params.has('quality')) {
      state.quality = params.get('quality');
      updateQualityButtons();
    }
    if (params.has('region')) setValue('region-multiplier', params.get('region'));
    if (params.has('diy')) setValue('diy-toggle', params.get('diy'));
    if (params.has('contingency')) setValue('contingency-pct', params.get('contingency'));
    if (params.has('permit')) setValue('permit-needed', params.get('permit'));

    const projectType = getValue('project-type');
    if (projectType) {
      state.projectType = projectType;
      renderSubOptions(projectType);
      // Load sub-option values from URL
      if (PROJECT_DATA[projectType]) {
        PROJECT_DATA[projectType].subOptions.forEach(opt => {
          if (params.has(opt.id)) setValue(opt.id, params.get(opt.id));
        });
      }
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    const fields = [
      { id: 'project-type', param: 'project' },
      { id: 'square-footage', param: 'sqft' },
      { id: 'room-count', param: 'rooms' },
      { id: 'region-multiplier', param: 'region' },
      { id: 'diy-toggle', param: 'diy' },
      { id: 'contingency-pct', param: 'contingency' },
      { id: 'permit-needed', param: 'permit' }
    ];

    fields.forEach(f => {
      const val = getValue(f.id);
      if (val) params.set(f.param, val);
    });

    params.set('quality', state.quality);

    // Save sub-options
    const projectType = getValue('project-type');
    if (projectType && PROJECT_DATA[projectType]) {
      PROJECT_DATA[projectType].subOptions.forEach(opt => {
        const val = getValue(opt.id);
        if (val) params.set(opt.id, val);
      });
    }

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    if (elements.calculateBtn) {
      elements.calculateBtn.addEventListener('click', () => {
        calculateResults();
        saveToURL();
        document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // Project type change
    if (elements.projectType) {
      elements.projectType.addEventListener('change', () => {
        const type = elements.projectType.value;
        state.projectType = type;
        renderSubOptions(type);
        updateProjectUI(type);
        saveToURL();
      });
    }

    // Quality buttons
    document.querySelectorAll('.quality-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.quality = btn.dataset.quality;
        updateQualityButtons();
        saveToURL();
      });
    });

    if (elements.clearBtn) elements.clearBtn.addEventListener('click', clearAll);
    if (elements.shareBtn) elements.shareBtn.addEventListener('click', shareCalculation);

    // Auto-save on changes
    ['square-footage', 'room-count', 'region-multiplier', 'diy-toggle', 'contingency-pct', 'permit-needed'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', () => saveToURL());
    });
  }

  function updateQualityButtons() {
    document.querySelectorAll('.quality-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.quality === state.quality);
    });
  }

  function renderSubOptions(projectType) {
    if (!projectType || !PROJECT_DATA[projectType]) {
      if (elements.subOptionsSection) elements.subOptionsSection.style.display = 'none';
      return;
    }

    const project = PROJECT_DATA[projectType];
    if (elements.subOptionsSection) elements.subOptionsSection.style.display = 'block';

    let html = '<div class="form-row">';
    project.subOptions.forEach(opt => {
      html += `
        <div class="form-group sub-option-row">
          <label for="${opt.id}">${opt.label}</label>
          <select id="${opt.id}" class="form-select">
            ${opt.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
        </div>
      `;
    });
    html += '</div>';

    if (elements.subOptionsContainer) {
      elements.subOptionsContainer.innerHTML = html;
      // Add change listeners
      project.subOptions.forEach(opt => {
        const el = document.getElementById(opt.id);
        if (el) el.addEventListener('change', () => saveToURL());
      });
    }
  }

  function updateProjectUI(type) {
    // Show/hide room count and adjust labels based on project type
    const showRooms = ['windows', 'bathroom'].includes(type);
    if (elements.roomCountGroup) {
      elements.roomCountGroup.style.display = showRooms ? 'flex' : 'none';
    }
    const roomAddon = document.getElementById('room-addon');
    if (roomAddon) {
      roomAddon.textContent = type === 'windows' ? 'windows' : 'rooms';
    }

    // Update sq ft help text
    if (elements.sqftHelp) {
      const helpTexts = {
        kitchen: 'Kitchen floor area',
        bathroom: 'Bathroom floor area (typically 40-100 sq ft)',
        flooring: 'Total floor area to cover',
        roofing: 'Total roof area (typically 1.5x floor area)',
        painting: 'Total wall area to paint',
        deck: 'Deck/patio surface area',
        windows: 'Per window area (typically 12-15 sq ft each)',
        hvac: 'Total home square footage',
        landscaping: 'Total yard/landscape area'
      };
      elements.sqftHelp.textContent = helpTexts[type] || 'Total project area';
    }
  }

  function calculateResults() {
    const projectType = getValue('project-type');
    const sqFootage = parseFloat(getValue('square-footage'));
    const quality = state.quality;
    const regionMult = parseFloat(getValue('region-multiplier')) || 1.0;
    const diyMode = getValue('diy-toggle');
    const contingencyPct = parseFloat(getValue('contingency-pct')) || 15;
    const permitNeeded = getValue('permit-needed');

    if (!projectType) {
      displayError('Please select a project type.');
      return;
    }
    if (!sqFootage || sqFootage <= 0) {
      displayError('Please enter a valid square footage.');
      return;
    }

    const project = PROJECT_DATA[projectType];
    if (!project) {
      displayError('Invalid project type selected.');
      return;
    }

    // Get sub-option multipliers
    let subOptionMultiplier = 1.0;
    project.subOptions.forEach(opt => {
      const selectedValue = getValue(opt.id);
      const selectedOption = opt.options.find(o => o.value === selectedValue);
      if (selectedOption) {
        subOptionMultiplier *= selectedOption.multiplier;
      }
    });

    // Calculate base cost
    const baseCostPerSqFt = project.baseCostPerSqFt[quality];
    const rawCost = baseCostPerSqFt * sqFootage * subOptionMultiplier * regionMult;

    // Room count multiplier for windows
    let roomMultiplier = 1;
    if (['windows'].includes(projectType)) {
      const roomCount = parseInt(getValue('room-count')) || 1;
      roomMultiplier = roomCount;
    }

    const adjustedCost = rawCost * roomMultiplier;

    // Cost breakdown
    const materialsCost = adjustedCost * project.materialPct;
    const laborCost = adjustedCost * project.laborPct;
    const permitCost = (permitNeeded === 'yes' || permitNeeded === 'unsure') ? adjustedCost * project.permitPct : 0;
    const otherCost = adjustedCost * project.otherPct;
    const contingencyCost = adjustedCost * (contingencyPct / 100);

    // DIY calculations
    let diySavingsAmount = 0;
    let diyLaborCost = 0;
    if (diyMode === 'diy') {
      diySavingsAmount = laborCost * project.diySavings * 2;
      diyLaborCost = laborCost * 0.1; // tool rental, etc.
    } else if (diyMode === 'hybrid') {
      diySavingsAmount = laborCost * project.diySavings;
      diyLaborCost = laborCost * 0.5;
    }

    const totalProfessional = materialsCost + laborCost + permitCost + otherCost + contingencyCost;
    const totalWithDIY = materialsCost + diyLaborCost + permitCost + otherCost + contingencyCost - (diyMode !== 'professional' ? diySavingsAmount * 0.3 : 0);
    const totalEstimate = diyMode === 'professional' ? totalProfessional : totalWithDIY;

    // ROI calculation
    const roiPct = project.roi[quality];
    const valueAdded = totalProfessional * roiPct;

    // Timeline
    const baseWeeks = project.timelineWeeks[quality];
    const diyTimeMultiplier = diyMode === 'diy' ? 3.5 : diyMode === 'hybrid' ? 2 : 1;
    const timelineWeeks = Math.ceil(baseWeeks * diyTimeMultiplier * (sqFootage > 300 ? 1.3 : 1));

    // Cost per sq ft
    const costPerSqFt = totalEstimate / sqFootage;

    displayResults({
      projectType, projectLabel: project.label, quality, sqFootage,
      totalEstimate, totalProfessional, costPerSqFt,
      materialsCost, laborCost, permitCost, otherCost, contingencyCost, contingencyPct,
      diyMode, diySavingsAmount, diyLaborCost, diyDifficulty: project.diyDifficulty,
      roiPct, valueAdded,
      timelineWeeks, baseWeeks,
      regionMult
    });
  }

  function displayResults(r) {
    const qualityLabel = r.quality === 'budget' ? 'Budget' : r.quality === 'mid-range' ? 'Mid-Range' : 'High-End';

    const html = `
      <div class="result-header">
        <h2>🏠 ${r.projectLabel} Estimate</h2>
        <p>${qualityLabel} quality | ${r.sqFootage.toLocaleString()} sq ft | ${r.diyMode === 'professional' ? 'Professional' : r.diyMode === 'diy' ? 'DIY' : 'Hybrid'}</p>
      </div>

      <div class="hi-summary-cards">
        <div class="summary-card primary">
          <div class="summary-icon">💰</div>
          <div class="summary-content">
            <div class="summary-value">${formatCurrency(r.totalEstimate)}</div>
            <div class="summary-label">Total Estimated Cost</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">📐</div>
          <div class="summary-content">
            <div class="summary-value">${formatCurrency(r.costPerSqFt)}</div>
            <div class="summary-label">Cost Per Sq Ft</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">📈</div>
          <div class="summary-content">
            <div class="summary-value">${(r.roiPct * 100).toFixed(0)}%</div>
            <div class="summary-label">Expected ROI</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">📅</div>
          <div class="summary-content">
            <div class="summary-value">${r.timelineWeeks}</div>
            <div class="summary-label">Weeks to Complete</div>
          </div>
        </div>
      </div>

      ${r.diyMode !== 'professional' ? `
      <div class="diy-savings-box">
        <div class="diy-savings-header">
          <span class="diy-icon">🔧</span>
          <div>
            <strong>DIY Savings Estimate</strong>
            <p>Difficulty: ${r.diyDifficulty}</p>
          </div>
          <div class="diy-amount">${formatCurrency(r.diySavingsAmount)}</div>
        </div>
        <div class="diy-comparison">
          <div class="diy-col">
            <span class="diy-label">Professional Cost</span>
            <span class="diy-value">${formatCurrency(r.totalProfessional)}</span>
          </div>
          <div class="diy-arrow">→</div>
          <div class="diy-col">
            <span class="diy-label">${r.diyMode === 'diy' ? 'DIY' : 'Hybrid'} Cost</span>
            <span class="diy-value highlight">${formatCurrency(r.totalEstimate)}</span>
          </div>
        </div>
      </div>
      ` : ''}

      <div class="cost-breakdown-section">
        <h3>📋 Itemized Cost Breakdown</h3>
        <div class="breakdown-table-container">
          <table class="breakdown-table">
            <tbody>
              <tr>
                <td>Materials</td>
                <td class="text-right">${formatCurrency(r.materialsCost)}</td>
                <td class="text-right pct-col">${(r.materialsCost / r.totalEstimate * 100).toFixed(0)}%</td>
              </tr>
              <tr>
                <td>Labor</td>
                <td class="text-right">${formatCurrency(r.diyMode === 'professional' ? r.laborCost : r.diyLaborCost)}</td>
                <td class="text-right pct-col">${((r.diyMode === 'professional' ? r.laborCost : r.diyLaborCost) / r.totalEstimate * 100).toFixed(0)}%</td>
              </tr>
              ${r.permitCost > 0 ? `
              <tr>
                <td>Permits & Inspections</td>
                <td class="text-right">${formatCurrency(r.permitCost)}</td>
                <td class="text-right pct-col">${(r.permitCost / r.totalEstimate * 100).toFixed(0)}%</td>
              </tr>
              ` : ''}
              <tr>
                <td>Other (disposal, delivery, misc)</td>
                <td class="text-right">${formatCurrency(r.otherCost)}</td>
                <td class="text-right pct-col">${(r.otherCost / r.totalEstimate * 100).toFixed(0)}%</td>
              </tr>
              <tr>
                <td>Contingency (${r.contingencyPct}%)</td>
                <td class="text-right">${formatCurrency(r.contingencyCost)}</td>
                <td class="text-right pct-col">${(r.contingencyCost / r.totalEstimate * 100).toFixed(0)}%</td>
              </tr>
              <tr class="total-row">
                <td><strong>Total Estimate</strong></td>
                <td class="text-right"><strong>${formatCurrency(r.totalEstimate)}</strong></td>
                <td class="text-right pct-col">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="budget-pie-section">
        <h3>📊 Budget Allocation</h3>
        <div class="pie-chart">
          ${generatePieChart(r)}
        </div>
        <div class="pie-legend">
          <span class="pie-legend-item"><span class="pie-dot" style="background: #3b82f6;"></span> Materials</span>
          <span class="pie-legend-item"><span class="pie-dot" style="background: #f59e0b;"></span> Labor</span>
          <span class="pie-legend-item"><span class="pie-dot" style="background: #10b981;"></span> Other & Permits</span>
          <span class="pie-legend-item"><span class="pie-dot" style="background: #8b5cf6;"></span> Contingency</span>
        </div>
      </div>

      <div class="roi-section">
        <h3>📈 Return on Investment (ROI)</h3>
        <div class="roi-cards">
          <div class="roi-card">
            <div class="roi-label">Project Cost</div>
            <div class="roi-value">${formatCurrency(r.totalProfessional)}</div>
          </div>
          <div class="roi-card">
            <div class="roi-label">Expected Value Added</div>
            <div class="roi-value highlight">${formatCurrency(r.valueAdded)}</div>
          </div>
          <div class="roi-card">
            <div class="roi-label">Net Cost (after ROI)</div>
            <div class="roi-value ${r.totalProfessional - r.valueAdded > 0 ? 'text-danger' : 'text-success'}">
              ${formatCurrency(r.totalProfessional - r.valueAdded)}
            </div>
          </div>
        </div>
        <div class="roi-bar-container">
          <div class="roi-bar">
            <div class="roi-fill" style="width: ${Math.min(r.roiPct * 100, 100)}%;">
              ${(r.roiPct * 100).toFixed(0)}% ROI
            </div>
          </div>
          <div class="roi-bar-labels">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--color-gray-dark); margin-top: 0.5rem;">
          Based on national averages from the Remodeling Cost vs. Value Report. Actual ROI varies by market.
        </p>
      </div>

      <div class="timeline-section">
        <h3>📅 Estimated Timeline</h3>
        <div class="timeline-bar-visual">
          <div class="timeline-phases">
            <div class="phase" style="width: 15%;">
              <div class="phase-bar phase-planning"></div>
              <span class="phase-label">Planning</span>
            </div>
            <div class="phase" style="width: 10%;">
              <div class="phase-bar phase-demo"></div>
              <span class="phase-label">Demo</span>
            </div>
            <div class="phase" style="width: 45%;">
              <div class="phase-bar phase-construction"></div>
              <span class="phase-label">Construction</span>
            </div>
            <div class="phase" style="width: 20%;">
              <div class="phase-bar phase-finishing"></div>
              <span class="phase-label">Finishing</span>
            </div>
            <div class="phase" style="width: 10%;">
              <div class="phase-bar phase-cleanup"></div>
              <span class="phase-label">Cleanup</span>
            </div>
          </div>
        </div>
        <div class="timeline-details">
          <div class="timeline-stat">
            <strong>${r.timelineWeeks} weeks</strong>
            <span>Total Duration (${r.diyMode !== 'professional' ? r.diyMode.toUpperCase() : 'Professional'})</span>
          </div>
          ${r.diyMode !== 'professional' ? `
          <div class="timeline-stat">
            <strong>${r.baseWeeks} weeks</strong>
            <span>Professional Duration</span>
          </div>
          ` : ''}
        </div>
      </div>

      <div class="cost-range-section">
        <h3>💡 Cost Range Comparison</h3>
        <div class="breakdown-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Quality Level</th>
                <th>Cost/Sq Ft</th>
                <th>Total (${r.sqFootage} sq ft)</th>
                <th>ROI</th>
              </tr>
            </thead>
            <tbody>
              ${['budget', 'mid-range', 'high-end'].map(q => {
                const data = PROJECT_DATA[r.projectType];
                const cost = data.baseCostPerSqFt[q] * r.sqFootage * r.regionMult;
                const isSelected = q === r.quality;
                return `<tr class="${isSelected ? 'selected-row' : ''}">
                  <td><strong>${q === 'budget' ? 'Budget' : q === 'mid-range' ? 'Mid-Range' : 'High-End'}</strong>${isSelected ? ' (selected)' : ''}</td>
                  <td>${formatCurrency(data.baseCostPerSqFt[q] * r.regionMult)}</td>
                  <td>${formatCurrency(cost)}</td>
                  <td>${(data.roi[q] * 100).toFixed(0)}%</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    showResults(html);
  }

  function generatePieChart(r) {
    const materialPct = r.materialsCost / r.totalEstimate;
    const laborPct = (r.diyMode === 'professional' ? r.laborCost : r.diyLaborCost) / r.totalEstimate;
    const otherPct = (r.otherCost + r.permitCost) / r.totalEstimate;
    const contingencyPctVal = r.contingencyCost / r.totalEstimate;

    // Create CSS conic gradient pie chart
    const segments = [
      { pct: materialPct, color: '#3b82f6', label: 'Materials' },
      { pct: laborPct, color: '#f59e0b', label: 'Labor' },
      { pct: otherPct, color: '#10b981', label: 'Other' },
      { pct: contingencyPctVal, color: '#8b5cf6', label: 'Contingency' }
    ];

    let gradientStops = [];
    let cumulative = 0;
    segments.forEach(seg => {
      const start = cumulative * 360;
      cumulative += seg.pct;
      const end = cumulative * 360;
      gradientStops.push(`${seg.color} ${start.toFixed(1)}deg ${end.toFixed(1)}deg`);
    });

    return `<div class="pie-visual" style="background: conic-gradient(${gradientStops.join(', ')});"></div>`;
  }

  function showResults(html) {
    if (elements.resultDiv) {
      elements.resultDiv.innerHTML = html;
      elements.resultDiv.classList.remove('hidden');
    }
  }

  function displayError(message) {
    if (elements.resultDiv) {
      elements.resultDiv.innerHTML = `
        <div class="error-message">
          <span class="error-icon">⚠️</span>
          <span>${message}</span>
        </div>
      `;
      elements.resultDiv.classList.remove('hidden');
    }
  }

  function clearAll() {
    setValue('project-type', '');
    setValue('square-footage', '');
    setValue('room-count', '1');
    setValue('region-multiplier', '1.00');
    setValue('diy-toggle', 'professional');
    setValue('contingency-pct', '15');
    setValue('permit-needed', 'yes');
    state.quality = 'mid-range';
    state.projectType = '';
    updateQualityButtons();
    if (elements.subOptionsSection) elements.subOptionsSection.style.display = 'none';
    if (elements.subOptionsContainer) elements.subOptionsContainer.innerHTML = '';
    if (elements.roomCountGroup) elements.roomCountGroup.style.display = 'none';
    if (elements.resultDiv) elements.resultDiv.classList.add('hidden');
    window.history.replaceState({}, '', window.location.pathname);
  }

  function shareCalculation() {
    saveToURL();
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => showCopyConfirmation()).catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showCopyConfirmation(); }
    catch (e) { alert('Copy URL: ' + text); }
    document.body.removeChild(ta);
  }

  function showCopyConfirmation() {
    if (elements.shareBtn) {
      const original = elements.shareBtn.innerHTML;
      elements.shareBtn.innerHTML = '✓ Copied!';
      elements.shareBtn.style.background = '#10b981';
      elements.shareBtn.style.borderColor = '#10b981';
      elements.shareBtn.style.color = 'white';
      setTimeout(() => {
        elements.shareBtn.innerHTML = original;
        elements.shareBtn.style.background = '';
        elements.shareBtn.style.borderColor = '';
        elements.shareBtn.style.color = '';
      }, 2000);
    }
  }

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD',
      minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(amount);
  }

})();

// Styles
const hiStyle = document.createElement('style');
hiStyle.textContent = `
  .hi-summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }

  .summary-card {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 1px solid var(--color-surface-table-border);
  }

  .summary-card.primary {
    background: linear-gradient(135deg, #E8F4F8 0%, white 100%);
    border: 2px solid var(--color-light-blue);
  }

  .summary-icon { font-size: 2rem; margin-bottom: 0.5rem; }
  .summary-value { font-size: 1.6rem; font-weight: 800; color: var(--color-primary-blue); font-family: var(--font-primary); }
  .summary-label { font-size: 0.85rem; color: var(--color-gray-dark); margin-top: 0.25rem; }

  .diy-savings-box {
    background: var(--color-highlight-green);
    border: 2px solid #86efac;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
  }

  .diy-savings-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .diy-icon { font-size: 2rem; }
  .diy-savings-header p { margin: 0; font-size: 0.85rem; color: var(--color-gray-dark); }
  .diy-amount { margin-left: auto; font-size: 1.5rem; font-weight: 800; color: var(--color-success); }

  .diy-comparison {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 1rem;
    background: var(--color-white);
    border-radius: 8px;
  }

  .diy-col { text-align: center; }
  .diy-label { display: block; font-size: 0.8rem; color: var(--color-gray-dark); }
  .diy-value { display: block; font-size: 1.25rem; font-weight: 700; color: var(--color-black); margin-top: 0.25rem; }
  .diy-value.highlight { color: var(--color-success); }
  .diy-arrow { font-size: 1.5rem; color: var(--color-gray-dark); }

  .cost-breakdown-section, .roi-section, .timeline-section, .budget-pie-section, .cost-range-section {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid var(--color-surface-table-border);
  }

  .cost-breakdown-section h3, .roi-section h3, .timeline-section h3, .budget-pie-section h3, .cost-range-section h3 {
    margin: 0 0 1rem 0;
    color: var(--color-primary-blue);
  }

  .breakdown-table-container { overflow-x: auto; }

  .breakdown-table, .comparison-table {
    width: 100%;
    border-collapse: collapse;
  }

  .breakdown-table td, .comparison-table th, .comparison-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .comparison-table th {
    background: var(--color-surface-neutral);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: var(--color-gray-dark);
    text-align: center;
  }

  .comparison-table td { text-align: center; }
  .breakdown-table .text-right { text-align: right; }
  .pct-col { width: 60px; color: var(--color-gray-dark); font-size: 0.85rem; }
  .text-success { color: var(--color-success); }
  .text-danger { color: var(--color-error); }

  .breakdown-table .total-row { background: var(--color-surface-neutral); }
  .breakdown-table .total-row td { border-bottom: none; padding: 1rem; }
  .selected-row { background: linear-gradient(135deg, #fff8f5 0%, #ffe8d6 100%); font-weight: 600; }

  .pie-chart {
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
  }

  .pie-visual {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .pie-legend {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .pie-legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--color-gray-dark);
  }

  .pie-dot {
    width: 12px;
    height: 12px;
    border-radius: 3px;
  }

  .roi-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .roi-card {
    text-align: center;
    padding: 1rem;
    background: var(--color-surface-neutral);
    border-radius: 8px;
  }

  .roi-label { font-size: 0.8rem; color: var(--color-gray-dark); }
  .roi-value { font-size: 1.25rem; font-weight: 800; color: var(--color-black); margin-top: 0.25rem; }
  .roi-value.highlight { color: var(--color-accent-orange); }

  .roi-bar-container { margin-top: 1rem; }

  .roi-bar {
    height: 32px;
    background: var(--color-surface-neutral);
    border-radius: 8px;
    overflow: hidden;
  }

  .roi-fill {
    height: 100%;
    background: linear-gradient(90deg, #10b981, #34d399);
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    font-size: 0.8rem;
    font-weight: 700;
    color: white;
    min-width: 80px;
    transition: width 0.5s ease;
  }

  .roi-bar-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    margin-top: 0.25rem;
  }

  .timeline-bar-visual { margin: 1.5rem 0; }

  .timeline-phases {
    display: flex;
    height: 32px;
    border-radius: 8px;
    overflow: hidden;
  }

  .phase { display: flex; flex-direction: column; align-items: center; }
  .phase-bar { width: 100%; height: 32px; }
  .phase-label { font-size: 0.7rem; color: var(--color-gray-dark); margin-top: 0.25rem; }
  .phase-planning { background: #93c5fd; }
  .phase-demo { background: #f87171; }
  .phase-construction { background: #f59e0b; }
  .phase-finishing { background: #34d399; }
  .phase-cleanup { background: #a78bfa; }

  .timeline-details {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }

  .timeline-stat { text-align: center; }
  .timeline-stat strong { display: block; font-size: 1.25rem; color: var(--color-primary-blue); }
  .timeline-stat span { font-size: 0.85rem; color: var(--color-gray-dark); }

  .error-message {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: var(--color-highlight-red);
    border: 1px solid #fecaca;
    border-radius: 8px;
    color: var(--color-error);
  }

  .error-icon { font-size: 1.5rem; }

  @media (max-width: 768px) {
    .hi-summary-cards { grid-template-columns: repeat(2, 1fr); }
    .summary-value { font-size: 1.3rem; }
    .roi-cards { grid-template-columns: 1fr; }
    .diy-comparison { flex-direction: column; }
    .pie-visual { width: 160px; height: 160px; }
  }

  @media (max-width: 480px) {
    .hi-summary-cards { grid-template-columns: 1fr; }
    .timeline-details { flex-direction: column; gap: 0.5rem; }
  }
`;
document.head.appendChild(hiStyle);
