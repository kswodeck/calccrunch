// Color Generator with URL State Management
(function() {
  'use strict';

  // Color name database (common colors)
  const COLOR_NAMES = {
    '#FF0000': 'Red', '#FF4500': 'Orange Red', '#FFA500': 'Orange', '#FFD700': 'Gold',
    '#FFFF00': 'Yellow', '#9ACD32': 'Yellow Green', '#00FF00': 'Lime', '#32CD32': 'Lime Green',
    '#00FA9A': 'Medium Spring Green', '#00FFFF': 'Cyan', '#00CED1': 'Dark Turquoise',
    '#1E90FF': 'Dodger Blue', '#0000FF': 'Blue', '#8A2BE2': 'Blue Violet', '#9400D3': 'Dark Violet',
    '#FF00FF': 'Magenta', '#FF1493': 'Deep Pink', '#FF69B4': 'Hot Pink', '#FFB6C1': 'Light Pink',
    '#FFC0CB': 'Pink', '#DC143C': 'Crimson', '#B22222': 'Fire Brick', '#8B0000': 'Dark Red',
    '#FFFFFF': 'White', '#F5F5F5': 'White Smoke', '#DCDCDC': 'Gainsboro', '#C0C0C0': 'Silver',
    '#A9A9A9': 'Dark Gray', '#808080': 'Gray', '#696969': 'Dim Gray', '#000000': 'Black',
    '#F0E68C': 'Khaki', '#BDB76B': 'Dark Khaki', '#DAA520': 'Goldenrod', '#B8860B': 'Dark Goldenrod',
    '#CD853F': 'Peru', '#D2691E': 'Chocolate', '#8B4513': 'Saddle Brown', '#A0522D': 'Sienna',
    '#2E8B57': 'Sea Green', '#3CB371': 'Medium Sea Green', '#20B2AA': 'Light Sea Green',
    '#008B8B': 'Dark Cyan', '#008080': 'Teal', '#4682B4': 'Steel Blue', '#5F9EA0': 'Cadet Blue',
    '#6495ED': 'Cornflower Blue', '#00BFFF': 'Deep Sky Blue', '#87CEEB': 'Sky Blue',
    '#ADD8E6': 'Light Blue', '#B0E0E6': 'Powder Blue', '#AFEEEE': 'Pale Turquoise',
    '#7B68EE': 'Medium Slate Blue', '#6A5ACD': 'Slate Blue', '#483D8B': 'Dark Slate Blue',
    '#9370DB': 'Medium Purple', '#8B008B': 'Dark Magenta', '#800080': 'Purple', '#4B0082': 'Indigo',
    '#FF6347': 'Tomato', '#FF7F50': 'Coral', '#FA8072': 'Salmon', '#E9967A': 'Dark Salmon',
    '#F08080': 'Light Coral', '#CD5C5C': 'Indian Red', '#BC8F8F': 'Rosy Brown'
  };

  // Preset configurations
  const PRESETS = {
    vibrant: { satMin: 70, satMax: 100, lightMin: 45, lightMax: 65 },
    pastel: { satMin: 25, satMax: 50, lightMin: 75, lightMax: 90 },
    muted: { satMin: 15, satMax: 40, lightMin: 35, lightMax: 55 },
    warm: { hueMin: 0, hueMax: 60, satMin: 50, satMax: 100, lightMin: 40, lightMax: 70 },
    cool: { hueMin: 180, hueMax: 270, satMin: 50, satMax: 100, lightMin: 40, lightMax: 70 },
    dark: { satMin: 30, satMax: 70, lightMin: 10, lightMax: 30 },
    light: { satMin: 10, satMax: 30, lightMin: 85, lightMax: 98 },
    neon: { satMin: 90, satMax: 100, lightMin: 50, lightMax: 60 }
  };

  // Default values
  const DEFAULTS = {
    mode: 'random',
    harmony: 'complementary',
    preset: 'vibrant',
    count: 5,
    format: 'hex',
    hueMin: 0,
    hueMax: 360,
    satMin: 0,
    satMax: 100,
    lightMin: 0,
    lightMax: 100,
    ensureContrast: false,
    colorblindSafe: false,
    excludeGray: false,
    excludeSimilar: false,
    useBaseColor: false,
    baseColor: '#3B82F6'
  };

  // State
  let state = { ...DEFAULTS };
  let generatedColors = [];

  // DOM Elements cache
  let elements = {};

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('Color Generator initializing...');
    cacheElements();
    
    if (!elements.generateBtn) {
      console.error('Color Generator: Generate button not found');
      return;
    }
    
    console.log('Color Generator: Elements cached successfully');
    loadFromURL();
    attachEventListeners();
    updateRangeDisplays();
    console.log('Color Generator initialized successfully');
  }

  function cacheElements() {
    elements = {
      form: document.getElementById('color-generator-form'),
      generateBtn: document.getElementById('generate-btn'),
      shareBtn: document.getElementById('share-btn'),
      resetBtn: document.getElementById('reset-btn'),
      resultDiv: document.getElementById('color-result'),
      toggleAdvanced: document.getElementById('toggle-advanced'),
      advancedOptions: document.getElementById('advanced-options'),
      // Mode sections
      harmonyOptions: document.getElementById('harmony-options'),
      presetOptions: document.getElementById('preset-options'),
      customOptions: document.getElementById('custom-options'),
      // Settings
      colorCount: document.getElementById('color-count'),
      outputFormat: document.getElementById('output-format'),
      // Range inputs
      hueMin: document.getElementById('hue-min'),
      hueMax: document.getElementById('hue-max'),
      satMin: document.getElementById('sat-min'),
      satMax: document.getElementById('sat-max'),
      lightMin: document.getElementById('light-min'),
      lightMax: document.getElementById('light-max'),
      // Range displays
      hueMinVal: document.getElementById('hue-min-val'),
      hueMaxVal: document.getElementById('hue-max-val'),
      satMinVal: document.getElementById('sat-min-val'),
      satMaxVal: document.getElementById('sat-max-val'),
      lightMinVal: document.getElementById('light-min-val'),
      lightMaxVal: document.getElementById('light-max-val'),
      // Advanced options
      ensureContrast: document.getElementById('ensure-contrast'),
      colorblindSafe: document.getElementById('colorblind-safe'),
      excludeGray: document.getElementById('exclude-gray'),
      excludeSimilar: document.getElementById('exclude-similar'),
      useBaseColor: document.getElementById('use-base-color'),
      baseColor: document.getElementById('base-color'),
      baseColorPicker: document.getElementById('base-color-picker')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('mode')) state.mode = params.get('mode');
    if (params.has('harmony')) state.harmony = params.get('harmony');
    if (params.has('preset')) state.preset = params.get('preset');
    if (params.has('count')) state.count = parseInt(params.get('count')) || DEFAULTS.count;
    if (params.has('format')) state.format = params.get('format');
    if (params.has('hMin')) state.hueMin = parseInt(params.get('hMin')) || 0;
    if (params.has('hMax')) state.hueMax = parseInt(params.get('hMax')) || 360;
    if (params.has('sMin')) state.satMin = parseInt(params.get('sMin')) || 0;
    if (params.has('sMax')) state.satMax = parseInt(params.get('sMax')) || 100;
    if (params.has('lMin')) state.lightMin = parseInt(params.get('lMin')) || 0;
    if (params.has('lMax')) state.lightMax = parseInt(params.get('lMax')) || 100;
    if (params.has('contrast')) state.ensureContrast = params.get('contrast') === '1';
    if (params.has('cbSafe')) state.colorblindSafe = params.get('cbSafe') === '1';
    if (params.has('noGray')) state.excludeGray = params.get('noGray') === '1';
    if (params.has('noSim')) state.excludeSimilar = params.get('noSim') === '1';
    if (params.has('useBase')) state.useBaseColor = params.get('useBase') === '1';
    if (params.has('base')) state.baseColor = '#' + params.get('base');
    
    applyStateToForm();
    
    if (params.toString().length > 0) {
      setTimeout(() => generateColors(), 100);
    }
  }

  function applyStateToForm() {
    // Set mode
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === state.mode);
    });
    updateModeVisibility();
    
    // Set harmony
    const harmonyInput = document.querySelector(`input[name="harmony"][value="${state.harmony}"]`);
    if (harmonyInput) harmonyInput.checked = true;
    
    // Set preset
    const presetInput = document.querySelector(`input[name="preset"][value="${state.preset}"]`);
    if (presetInput) presetInput.checked = true;
    
    // Set count and format
    if (elements.colorCount) elements.colorCount.value = state.count;
    if (elements.outputFormat) elements.outputFormat.value = state.format;
    
    // Set range values
    if (elements.hueMin) elements.hueMin.value = state.hueMin;
    if (elements.hueMax) elements.hueMax.value = state.hueMax;
    if (elements.satMin) elements.satMin.value = state.satMin;
    if (elements.satMax) elements.satMax.value = state.satMax;
    if (elements.lightMin) elements.lightMin.value = state.lightMin;
    if (elements.lightMax) elements.lightMax.value = state.lightMax;
    
    // Set advanced options
    if (elements.ensureContrast) elements.ensureContrast.checked = state.ensureContrast;
    if (elements.colorblindSafe) elements.colorblindSafe.checked = state.colorblindSafe;
    if (elements.excludeGray) elements.excludeGray.checked = state.excludeGray;
    if (elements.excludeSimilar) elements.excludeSimilar.checked = state.excludeSimilar;
    if (elements.useBaseColor) elements.useBaseColor.checked = state.useBaseColor;
    if (elements.baseColor) elements.baseColor.value = state.baseColor;
    if (elements.baseColorPicker) elements.baseColorPicker.value = state.baseColor;
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    if (state.mode !== DEFAULTS.mode) params.set('mode', state.mode);
    if (state.harmony !== DEFAULTS.harmony) params.set('harmony', state.harmony);
    if (state.preset !== DEFAULTS.preset) params.set('preset', state.preset);
    if (state.count !== DEFAULTS.count) params.set('count', state.count);
    if (state.format !== DEFAULTS.format) params.set('format', state.format);
    if (state.hueMin !== DEFAULTS.hueMin) params.set('hMin', state.hueMin);
    if (state.hueMax !== DEFAULTS.hueMax) params.set('hMax', state.hueMax);
    if (state.satMin !== DEFAULTS.satMin) params.set('sMin', state.satMin);
    if (state.satMax !== DEFAULTS.satMax) params.set('sMax', state.satMax);
    if (state.lightMin !== DEFAULTS.lightMin) params.set('lMin', state.lightMin);
    if (state.lightMax !== DEFAULTS.lightMax) params.set('lMax', state.lightMax);
    if (state.ensureContrast) params.set('contrast', '1');
    if (state.colorblindSafe) params.set('cbSafe', '1');
    if (state.excludeGray) params.set('noGray', '1');
    if (state.excludeSimilar) params.set('noSim', '1');
    if (state.useBaseColor) params.set('useBase', '1');
    if (state.useBaseColor && state.baseColor) params.set('base', state.baseColor.replace('#', ''));
    
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  }

  function attachEventListeners() {
    // Generate button
    if (elements.generateBtn) {
      elements.generateBtn.addEventListener('click', () => {
        generateColors();
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
    
    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.mode = btn.dataset.mode;
        updateModeVisibility();
        debouncedSaveToURL();
      });
    });
    
    // Harmony radio buttons
    document.querySelectorAll('input[name="harmony"]').forEach(input => {
      input.addEventListener('change', () => {
        state.harmony = input.value;
        debouncedSaveToURL();
      });
    });
    
    // Preset radio buttons
    document.querySelectorAll('input[name="preset"]').forEach(input => {
      input.addEventListener('change', () => {
        state.preset = input.value;
        debouncedSaveToURL();
      });
    });
    
    // Count and format selects
    if (elements.colorCount) {
      elements.colorCount.addEventListener('change', () => {
        state.count = parseInt(elements.colorCount.value);
        debouncedSaveToURL();
      });
    }
    
    if (elements.outputFormat) {
      elements.outputFormat.addEventListener('change', () => {
        state.format = elements.outputFormat.value;
        debouncedSaveToURL();
      });
    }
    
    // Range inputs
    const rangeInputs = [
      { min: 'hueMin', max: 'hueMax', stateMin: 'hueMin', stateMax: 'hueMax', displayMin: 'hueMinVal', displayMax: 'hueMaxVal' },
      { min: 'satMin', max: 'satMax', stateMin: 'satMin', stateMax: 'satMax', displayMin: 'satMinVal', displayMax: 'satMaxVal' },
      { min: 'lightMin', max: 'lightMax', stateMin: 'lightMin', stateMax: 'lightMax', displayMin: 'lightMinVal', displayMax: 'lightMaxVal' }
    ];
    
    rangeInputs.forEach(config => {
      const minEl = elements[config.min];
      const maxEl = elements[config.max];
      
      if (minEl) {
        minEl.addEventListener('input', () => {
          let minVal = parseInt(minEl.value);
          let maxVal = parseInt(maxEl.value);
          if (minVal > maxVal) {
            minEl.value = maxVal;
            minVal = maxVal;
          }
          state[config.stateMin] = minVal;
          updateRangeDisplays();
          debouncedSaveToURL();
        });
      }
      
      if (maxEl) {
        maxEl.addEventListener('input', () => {
          let minVal = parseInt(minEl.value);
          let maxVal = parseInt(maxEl.value);
          if (maxVal < minVal) {
            maxEl.value = minVal;
            maxVal = minVal;
          }
          state[config.stateMax] = maxVal;
          updateRangeDisplays();
          debouncedSaveToURL();
        });
      }
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
    
    // Advanced checkboxes
    const advancedCheckboxes = [
      { el: 'ensureContrast', key: 'ensureContrast' },
      { el: 'colorblindSafe', key: 'colorblindSafe' },
      { el: 'excludeGray', key: 'excludeGray' },
      { el: 'excludeSimilar', key: 'excludeSimilar' },
      { el: 'useBaseColor', key: 'useBaseColor' }
    ];
    
    advancedCheckboxes.forEach(({ el, key }) => {
      if (elements[el]) {
        elements[el].addEventListener('change', () => {
          state[key] = elements[el].checked;
          debouncedSaveToURL();
        });
      }
    });
    
    // Base color inputs
    if (elements.baseColor) {
      elements.baseColor.addEventListener('input', (e) => {
        let val = e.target.value;
        if (!val.startsWith('#')) val = '#' + val;
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
          state.baseColor = val;
          if (elements.baseColorPicker) elements.baseColorPicker.value = val;
          debouncedSaveToURL();
        }
      });
    }
    
    if (elements.baseColorPicker) {
      elements.baseColorPicker.addEventListener('input', (e) => {
        state.baseColor = e.target.value;
        if (elements.baseColor) elements.baseColor.value = e.target.value;
        debouncedSaveToURL();
      });
    }
  }

  function updateModeVisibility() {
    elements.harmonyOptions?.classList.toggle('hidden', state.mode !== 'harmony');
    elements.presetOptions?.classList.toggle('hidden', state.mode !== 'preset');
    elements.customOptions?.classList.toggle('hidden', state.mode !== 'custom');
  }

  function updateRangeDisplays() {
    if (elements.hueMinVal) elements.hueMinVal.textContent = state.hueMin;
    if (elements.hueMaxVal) elements.hueMaxVal.textContent = state.hueMax;
    if (elements.satMinVal) elements.satMinVal.textContent = state.satMin;
    if (elements.satMaxVal) elements.satMaxVal.textContent = state.satMax;
    if (elements.lightMinVal) elements.lightMinVal.textContent = state.lightMin;
    if (elements.lightMaxVal) elements.lightMaxVal.textContent = state.lightMax;
  }

  // Debounce utility
  let saveTimeout;
  function debouncedSaveToURL() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveToURL, 300);
  }

  // Color generation functions
  function generateColors() {
    updateStateFromForm();
    saveToURL();
    
    generatedColors = [];
    
    switch (state.mode) {
      case 'random':
        generatedColors = generateRandomColors();
        break;
      case 'harmony':
        generatedColors = generateHarmonyColors();
        break;
      case 'preset':
        generatedColors = generatePresetColors();
        break;
      case 'custom':
        generatedColors = generateCustomColors();
        break;
    }
    
    if (state.excludeSimilar && generatedColors.length > 1) {
      generatedColors = ensureDistinctColors(generatedColors);
    }
    
    displayResults();
  }

  function updateStateFromForm() {
    state.count = parseInt(elements.colorCount?.value) || DEFAULTS.count;
    state.format = elements.outputFormat?.value || DEFAULTS.format;
    state.hueMin = parseInt(elements.hueMin?.value) || 0;
    state.hueMax = parseInt(elements.hueMax?.value) || 360;
    state.satMin = parseInt(elements.satMin?.value) || 0;
    state.satMax = parseInt(elements.satMax?.value) || 100;
    state.lightMin = parseInt(elements.lightMin?.value) || 0;
    state.lightMax = parseInt(elements.lightMax?.value) || 100;
    state.ensureContrast = elements.ensureContrast?.checked || false;
    state.colorblindSafe = elements.colorblindSafe?.checked || false;
    state.excludeGray = elements.excludeGray?.checked || false;
    state.excludeSimilar = elements.excludeSimilar?.checked || false;
    state.useBaseColor = elements.useBaseColor?.checked || false;
    state.baseColor = elements.baseColor?.value || DEFAULTS.baseColor;
  }

  function generateRandomColors() {
    const colors = [];
    for (let i = 0; i < state.count; i++) {
      colors.push(generateSingleRandomColor());
    }
    return colors;
  }

  function generateSingleRandomColor() {
    let h, s, l;
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
      h = randomInRange(0, 360);
      s = randomInRange(20, 90);
      l = randomInRange(25, 75);
      attempts++;
    } while (attempts < maxAttempts && !isValidColor(h, s, l));
    
    return hslToColor(h, s, l);
  }

  function generateHarmonyColors() {
    let baseHue;
    
    if (state.useBaseColor) {
      const baseHSL = hexToHSL(state.baseColor);
      baseHue = baseHSL.h;
    } else {
      baseHue = randomInRange(0, 360);
    }
    
    const baseSat = randomInRange(50, 80);
    const baseLight = randomInRange(40, 60);
    
    const colors = [];
    const hues = getHarmonyHues(baseHue, state.harmony, state.count);
    
    hues.forEach((hue, i) => {
      let sat = baseSat + randomInRange(-10, 10);
      let light = baseLight + randomInRange(-10, 10);
      
      // Vary saturation and lightness for monochromatic
      if (state.harmony === 'monochromatic') {
        sat = 30 + (i * 15);
        light = 25 + (i * 12);
      }
      
      sat = Math.max(20, Math.min(100, sat));
      light = Math.max(15, Math.min(85, light));
      
      colors.push(hslToColor(hue, sat, light));
    });
    
    return colors;
  }

  function getHarmonyHues(baseHue, harmonyType, count) {
    const hues = [];
    
    switch (harmonyType) {
      case 'complementary':
        hues.push(baseHue);
        hues.push((baseHue + 180) % 360);
        // Fill remaining with variations
        for (let i = 2; i < count; i++) {
          hues.push((baseHue + (i % 2 === 0 ? 15 : 195)) % 360);
        }
        break;
        
      case 'analogous':
        const analogousStep = 30;
        const startOffset = -Math.floor(count / 2) * analogousStep;
        for (let i = 0; i < count; i++) {
          hues.push((baseHue + startOffset + (i * analogousStep) + 360) % 360);
        }
        break;
        
      case 'triadic':
        hues.push(baseHue);
        hues.push((baseHue + 120) % 360);
        hues.push((baseHue + 240) % 360);
        for (let i = 3; i < count; i++) {
          hues.push((baseHue + (i * 40)) % 360);
        }
        break;
        
      case 'tetradic':
        hues.push(baseHue);
        hues.push((baseHue + 90) % 360);
        hues.push((baseHue + 180) % 360);
        hues.push((baseHue + 270) % 360);
        for (let i = 4; i < count; i++) {
          hues.push((baseHue + (i * 45)) % 360);
        }
        break;
        
      case 'split-complementary':
        hues.push(baseHue);
        hues.push((baseHue + 150) % 360);
        hues.push((baseHue + 210) % 360);
        for (let i = 3; i < count; i++) {
          hues.push((baseHue + (i * 50)) % 360);
        }
        break;
        
      case 'monochromatic':
        for (let i = 0; i < count; i++) {
          hues.push(baseHue);
        }
        break;
        
      default:
        for (let i = 0; i < count; i++) {
          hues.push((baseHue + (i * (360 / count))) % 360);
        }
    }
    
    return hues.slice(0, count);
  }

  function generatePresetColors() {
    const preset = PRESETS[state.preset] || PRESETS.vibrant;
    const colors = [];
    
    for (let i = 0; i < state.count; i++) {
      const h = randomInRange(preset.hueMin || 0, preset.hueMax || 360);
      const s = randomInRange(preset.satMin, preset.satMax);
      const l = randomInRange(preset.lightMin, preset.lightMax);
      
      colors.push(hslToColor(h, s, l));
    }
    
    return colors;
  }

  function generateCustomColors() {
    const colors = [];
    
    for (let i = 0; i < state.count; i++) {
      let h, s, l;
      let attempts = 0;
      const maxAttempts = 100;
      
      do {
        h = randomInRange(state.hueMin, state.hueMax);
        s = randomInRange(state.satMin, state.satMax);
        l = randomInRange(state.lightMin, state.lightMax);
        attempts++;
      } while (attempts < maxAttempts && !isValidColor(h, s, l));
      
      colors.push(hslToColor(h, s, l));
    }
    
    return colors;
  }

  function isValidColor(h, s, l) {
    if (state.excludeGray && s < 10) return false;
    if (state.ensureContrast) {
      const contrastWhite = getContrastRatio(hslToHex(h, s, l), '#FFFFFF');
      const contrastBlack = getContrastRatio(hslToHex(h, s, l), '#000000');
      if (Math.max(contrastWhite, contrastBlack) < 4.5) return false;
    }
    return true;
  }

  function ensureDistinctColors(colors) {
    const minDistance = 30;
    const result = [colors[0]];
    
    for (let i = 1; i < colors.length; i++) {
      let color = colors[i];
      let attempts = 0;
      
      while (attempts < 50) {
        let tooClose = false;
        for (const existing of result) {
          if (getColorDistance(color, existing) < minDistance) {
            tooClose = true;
            break;
          }
        }
        
        if (!tooClose) break;
        
        // Generate a new color
        color = generateSingleRandomColor();
        attempts++;
      }
      
      result.push(color);
    }
    
    return result;
  }

  function getColorDistance(color1, color2) {
    const hsl1 = hexToHSL(color1.hex);
    const hsl2 = hexToHSL(color2.hex);
    
    const hueDiff = Math.min(Math.abs(hsl1.h - hsl2.h), 360 - Math.abs(hsl1.h - hsl2.h));
    const satDiff = Math.abs(hsl1.s - hsl2.s);
    const lightDiff = Math.abs(hsl1.l - hsl2.l);
    
    return hueDiff + satDiff + lightDiff;
  }

  // Color conversion utilities
  function hslToColor(h, s, l) {
    const hex = hslToHex(h, s, l);
    const rgb = hexToRGB(hex);
    return {
      hex: hex,
      rgb: rgb,
      hsl: { h: Math.round(h), s: Math.round(s), l: Math.round(l) },
      name: getColorName(hex)
    };
  }

  function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r, g, b;
    
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  function hexToRGB(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  function hexToHSL(hex) {
    const rgb = hexToRGB(hex);
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  function getContrastRatio(hex1, hex2) {
    const lum1 = getLuminance(hexToRGB(hex1));
    const lum2 = getLuminance(hexToRGB(hex2));
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  function getLuminance(rgb) {
    const a = [rgb.r, rgb.g, rgb.b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function getColorName(hex) {
    // Check exact match
    if (COLOR_NAMES[hex.toUpperCase()]) {
      return COLOR_NAMES[hex.toUpperCase()];
    }
    
    // Find closest color
    let closestName = 'Custom';
    let closestDistance = Infinity;
    
    const targetRGB = hexToRGB(hex);
    
    for (const [colorHex, name] of Object.entries(COLOR_NAMES)) {
      const rgb = hexToRGB(colorHex);
      const distance = Math.sqrt(
        Math.pow(targetRGB.r - rgb.r, 2) +
        Math.pow(targetRGB.g - rgb.g, 2) +
        Math.pow(targetRGB.b - rgb.b, 2)
      );
      
      if (distance < closestDistance && distance < 50) {
        closestDistance = distance;
        closestName = name;
      }
    }
    
    return closestName;
  }

  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Display results
  function displayResults() {
    if (!elements.resultDiv || generatedColors.length === 0) return;
    
    const primaryColor = generatedColors[0];
    const contrastWhite = getContrastRatio(primaryColor.hex, '#FFFFFF');
    const contrastBlack = getContrastRatio(primaryColor.hex, '#000000');
    
    const html = `
      <div class="result-header">
        <h3>🎨 Generated Color Palette</h3>
      </div>
      
      <div class="color-palette-display">
        ${generatedColors.map((color, i) => `
          <div class="palette-color" style="background: ${color.hex};" onclick="window.copyColorCode('${color.hex}', this)">
            <div class="palette-color-info">
              <div class="palette-color-hex">${color.hex}</div>
              <div class="palette-color-name">${color.name}</div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="color-details-grid">
        ${generatedColors.map((color, i) => `
          <div class="color-detail-card">
            <div class="color-detail-preview" style="background: ${color.hex};"></div>
            <div class="color-detail-body">
              <div class="color-formats">
                <div class="color-format-row">
                  <span class="format-label">HEX</span>
                  <span class="format-value" onclick="window.copyColorCode('${color.hex}', this)">${color.hex}</span>
                </div>
                <div class="color-format-row">
                  <span class="format-label">RGB</span>
                  <span class="format-value" onclick="window.copyColorCode('rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})', this)">rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})</span>
                </div>
                <div class="color-format-row">
                  <span class="format-label">HSL</span>
                  <span class="format-value" onclick="window.copyColorCode('hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)', this)">hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)</span>
                </div>
              </div>
              <div class="color-detail-actions">
                <button class="copy-color-btn" onclick="window.copyColorCode('${color.hex}', this)">📋 Copy HEX</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="color-wheel-section">
        <h4>Color Wheel Position</h4>
        <div class="color-wheel-container">
          <div class="color-wheel">
            ${generatedColors.map((color, i) => {
              const angle = color.hsl.h;
              const radius = 100;
              const x = 125 + radius * Math.cos((angle - 90) * Math.PI / 180);
              const y = 125 + radius * Math.sin((angle - 90) * Math.PI / 180);
              return `<div class="wheel-marker" style="left: ${x}px; top: ${y}px; background: ${color.hex};"></div>`;
            }).join('')}
          </div>
        </div>
      </div>
      
      <div class="contrast-section">
        <h4>Contrast Analysis (First Color)</h4>
        <div class="contrast-grid">
          <div class="contrast-item" style="background: ${primaryColor.hex}; color: white;">
            <div class="contrast-ratio">${contrastWhite.toFixed(2)}:1</div>
            <div class="contrast-label">vs White Text</div>
            <span class="contrast-badge ${contrastWhite >= 4.5 ? 'pass' : 'fail'}">${contrastWhite >= 4.5 ? 'AA Pass' : 'Fail'}</span>
          </div>
          <div class="contrast-item" style="background: ${primaryColor.hex}; color: black;">
            <div class="contrast-ratio">${contrastBlack.toFixed(2)}:1</div>
            <div class="contrast-label">vs Black Text</div>
            <span class="contrast-badge ${contrastBlack >= 4.5 ? 'pass' : 'fail'}">${contrastBlack >= 4.5 ? 'AA Pass' : 'Fail'}</span>
          </div>
        </div>
      </div>
      
      <div class="export-section">
        <h4>Export Palette</h4>
        <div class="export-tabs">
          <button class="export-tab active" onclick="window.switchExportTab('css', this)">CSS</button>
          <button class="export-tab" onclick="window.switchExportTab('scss', this)">SCSS</button>
          <button class="export-tab" onclick="window.switchExportTab('tailwind', this)">Tailwind</button>
          <button class="export-tab" onclick="window.switchExportTab('json', this)">JSON</button>
        </div>
        <div class="export-code" id="export-code">
          <pre>${generateExportCode('css')}</pre>
        </div>
        <button class="export-copy-btn" onclick="window.copyExportCode()">📋 Copy Code</button>
      </div>
      
      <div class="secondary-actions" style="margin-top: 1.5rem;">
        <button type="button" class="btn btn-primary" onclick="window.regenerateColors()" style="padding: 0.75rem 2rem;">
          🔄 Generate New Colors
        </button>
      </div>
    `;
    
    elements.resultDiv.innerHTML = html;
    elements.resultDiv.classList.remove('hidden');
  }

  function generateExportCode(format) {
    switch (format) {
      case 'css':
        return `:root {\n${generatedColors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`;
      case 'scss':
        return generatedColors.map((c, i) => `$color-${i + 1}: ${c.hex};`).join('\n');
      case 'tailwind':
        return `// tailwind.config.js\ncolors: {\n${generatedColors.map((c, i) => `  'custom-${i + 1}': '${c.hex}',`).join('\n')}\n}`;
      case 'json':
        return JSON.stringify(generatedColors.map((c, i) => ({
          name: `color-${i + 1}`,
          hex: c.hex,
          rgb: c.rgb,
          hsl: c.hsl
        })), null, 2);
      default:
        return '';
    }
  }

  // Global functions
  window.copyColorCode = function(code, element) {
    copyToClipboard(code);
    
    const originalText = element.textContent;
    element.textContent = '✓ Copied!';
    if (element.classList.contains('copy-color-btn')) {
      element.classList.add('copied');
    }
    
    setTimeout(() => {
      element.textContent = originalText;
      element.classList.remove('copied');
    }, 1500);
  };

  window.switchExportTab = function(format, button) {
    document.querySelectorAll('.export-tab').forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');
    document.getElementById('export-code').querySelector('pre').textContent = generateExportCode(format);
  };

  window.copyExportCode = function() {
    const code = document.getElementById('export-code').querySelector('pre').textContent;
    copyToClipboard(code);
    
    const btn = document.querySelector('.export-copy-btn');
    const originalText = btn.textContent;
    btn.textContent = '✓ Copied!';
    
    setTimeout(() => {
      btn.textContent = originalText;
    }, 1500);
  };

  window.regenerateColors = function() {
    generateColors();
  };

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Copy failed:', err);
    }
    document.body.removeChild(textarea);
  }

  function shareSettings() {
    const url = window.location.href;
    
    if (navigator.share && navigator.canShare && navigator.canShare({ url })) {
      navigator.share({
        title: 'Color Palette',
        text: 'Check out my generated color palette',
        url: url
      }).catch(() => {
        copyToClipboard(url);
        showShareSuccess();
      });
    } else {
      copyToClipboard(url);
      showShareSuccess();
    }
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
    updateRangeDisplays();
    
    if (elements.resultDiv) {
      elements.resultDiv.classList.add('hidden');
    }
    
    if (elements.advancedOptions && !elements.advancedOptions.classList.contains('hidden')) {
      elements.toggleAdvanced.click();
    }
  }

})();