// Business Name Generator
(function() {
  'use strict';

  // Word banks
  const PREFIXES = {
    tech: ['Cyber', 'Quantum', 'Nexus', 'Pixel', 'Byte', 'Cloud', 'Data', 'Net', 'Code', 'Logic', 'Sync', 'Digi', 'Tech', 'Nova', 'Core', 'Flux', 'Volt', 'Arc', 'Nano', 'Meta'],
    food: ['Fresh', 'Golden', 'Savory', 'Sweet', 'Spice', 'Harvest', 'Farm', 'Green', 'Tasty', 'Crisp', 'Maple', 'Honey', 'Rustic', 'Fire', 'Stone', 'Wild', 'Pure', 'Bloom', 'Sun', 'Sage'],
    fashion: ['Luxe', 'Vogue', 'Chic', 'Glam', 'Silk', 'Velvet', 'Rouge', 'Noir', 'Aura', 'Iris', 'Pearl', 'Jade', 'Optic', 'Prism', 'Bloom', 'Rose', 'Lux', 'Diva', 'Reign', 'Plush'],
    health: ['Vital', 'Pure', 'Zen', 'Glow', 'Thrive', 'Pulse', 'Core', 'Peak', 'Bloom', 'Aura', 'Life', 'Well', 'True', 'Clear', 'Fresh', 'Calm', 'Flow', 'Balance', 'Radiant', 'Haven'],
    finance: ['Apex', 'Summit', 'Capital', 'Prime', 'Trust', 'Vault', 'Crown', 'Fortress', 'Peak', 'Pinnacle', 'Sterling', 'Noble', 'Shield', 'Anchor', 'Iron', 'Gold', 'Sage', 'Atlas', 'Maven', 'Bastion'],
    creative: ['Spark', 'Muse', 'Canvas', 'Prism', 'Vivid', 'Echo', 'Dream', 'Vision', 'Craft', 'Ink', 'Pixel', 'Frame', 'Studio', 'Palette', 'Quill', 'Hue', 'Bold', 'Mosaic', 'Fable', 'Ember'],
    education: ['Bright', 'Scholar', 'Mind', 'Learn', 'Quest', 'Path', 'Sage', 'Beacon', 'Mentor', 'Atlas', 'Summit', 'Horizon', 'Bridge', 'Compass', 'Pioneer', 'Academy', 'Lumen', 'Orbit', 'Spark', 'Key'],
    retail: ['Market', 'Shop', 'Haul', 'Cart', 'Deal', 'Pick', 'Choice', 'Find', 'Trade', 'Store', 'Bazaar', 'Depot', 'Emporium', 'Mart', 'Hub', 'Corner', 'Nook', 'Gallery', 'Crate', 'Stock'],
    services: ['Pro', 'Elite', 'Premier', 'Swift', 'Prime', 'Ace', 'Apex', 'Star', 'Peak', 'First', 'Trust', 'Sure', 'Right', 'Point', 'Mark', 'Edge', 'Key', 'Bridge', 'Link', 'Path']
  };

  const SUFFIXES = {
    tech: ['ify', 'ly', 'hub', 'ware', 'stack', 'base', 'lab', 'bit', 'link', 'flow', 'verse', 'sphere', 'net', 'works', 'grid', 'sys', 'io', 'tech', 'soft', 'mind'],
    food: ['bites', 'table', 'plate', 'bowl', 'kitchen', 'pantry', 'feast', 'grill', 'house', 'works', 'co', 'craft', 'roots', 'press', 'mill', 'oven', 'cellar', 'garden', 'spot', 'nest'],
    fashion: ['wear', 'style', 'thread', 'stitch', 'couture', 'atelier', 'line', 'label', 'studio', 'house', 'co', 'edit', 'form', 'mode', 'trend', 'look', 'fit', 'drape', 'luxe', 'glow'],
    health: ['well', 'fit', 'life', 'care', 'med', 'health', 'body', 'mind', 'co', 'hub', 'lab', 'path', 'way', 'zone', 'space', 'point', 'works', 'source', 'spring', 'nest'],
    finance: ['vest', 'fund', 'wealth', 'pay', 'fin', 'capital', 'group', 'partners', 'advisors', 'holdings', 'ventures', 'assets', 'bridge', 'harbor', 'gate', 'point', 'mark', 'forge', 'path', 'port'],
    creative: ['studio', 'works', 'lab', 'co', 'house', 'forge', 'press', 'media', 'craft', 'space', 'hive', 'den', 'yard', 'shop', 'collective', 'guild', 'atelier', 'hub', 'nest', 'room'],
    education: ['learn', 'edu', 'academy', 'school', 'course', 'class', 'mind', 'path', 'way', 'lab', 'hub', 'space', 'point', 'works', 'prep', 'forge', 'quest', 'bridge', 'level', 'track'],
    retail: ['shop', 'store', 'mart', 'market', 'co', 'hub', 'box', 'haul', 'bay', 'spot', 'depot', 'zone', 'place', 'goods', 'supply', 'outlet', 'rack', 'shelf', 'pick', 'finds'],
    services: ['works', 'hub', 'point', 'group', 'co', 'pro', 'force', 'team', 'crew', 'squad', 'partners', 'solutions', 'services', 'connect', 'bridge', 'link', 'source', 'base', 'core', 'way']
  };

  const POWER_WORDS = ['Swift', 'Bold', 'True', 'Ever', 'One', 'All', 'Next', 'Rise', 'Sky', 'Blue', 'Red', 'Alpha', 'Omega', 'Echo', 'Zeal', 'Apex', 'Nova', 'Vibe', 'Sage', 'Nimble', 'Agile', 'Fusion', 'Venture', 'Quest', 'Spark', 'Blaze', 'Catalyst', 'Pioneer', 'Maverick', 'Titan'];

  const ABSTRACT_PARTS = ['Zo', 'Xi', 'Ka', 'Ve', 'Lu', 'Ax', 'Or', 'Fi', 'Mo', 'Ty', 'Ra', 'Ne', 'Qu', 'Sy', 'Vo', 'Zy', 'Eo', 'Ix', 'Um', 'Ov'];
  const ABSTRACT_ENDS = ['ra', 'lix', 'ven', 'tis', 'nar', 'pex', 'lon', 'rix', 'mus', 'fer', 'tor', 'vex', 'lux', 'ion', 'ius', 'eon', 'ara', 'ova', 'ius', 'tek'];

  const MODIFIERS = ['Global', 'Digital', 'Smart', 'Open', 'Fast', 'Live', 'Max', 'Ultra', 'Super', 'Mega', 'Mini', 'Micro', 'Grand', 'Great', 'True', 'Real', 'Clear', 'Bright', 'Sharp', 'Deep'];

  const COMPOUND_WORDS_A = ['Cloud', 'Star', 'Moon', 'Sun', 'Fire', 'Ice', 'Wind', 'Storm', 'Iron', 'Silver', 'Gold', 'Thunder', 'Shadow', 'Light', 'Dark', 'Stone', 'River', 'Sky', 'Sea', 'Mountain'];
  const COMPOUND_WORDS_B = ['forge', 'craft', 'spark', 'peak', 'bridge', 'gate', 'path', 'ridge', 'field', 'creek', 'haven', 'dale', 'brook', 'wood', 'spring', 'vale', 'crest', 'point', 'haven', 'ward'];

  // Default values
  const DEFAULTS = {
    keywords: '',
    industry: 'any',
    style: 'any',
    nameLength: 'any',
    count: 10,
    includeWords: '',
    excludeWords: ''
  };

  // State
  let state = { ...DEFAULTS };
  let generatedNames = [];
  let favorites = [];

  // DOM Elements cache
  let elements = {};

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    cacheElements();
    if (!elements.generateBtn) {
      console.error('Business Name Generator: Generate button not found');
      return;
    }
    loadFromURL();
    loadFavorites();
    attachEventListeners();
  }

  function cacheElements() {
    elements = {
      generateBtn: document.getElementById('generate-btn'),
      shareBtn: document.getElementById('share-btn'),
      resetBtn: document.getElementById('reset-btn'),
      resultDiv: document.getElementById('business-name-result'),
      keywords: document.getElementById('keywords'),
      industry: document.getElementById('industry'),
      style: document.getElementById('style'),
      nameLength: document.getElementById('name-length'),
      count: document.getElementById('count'),
      includeWords: document.getElementById('include-words'),
      excludeWords: document.getElementById('exclude-words')
    };
  }

  function attachEventListeners() {
    elements.generateBtn.addEventListener('click', generateResults);
    elements.shareBtn.addEventListener('click', shareSettings);
    elements.resetBtn.addEventListener('click', resetForm);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('keywords')) state.keywords = params.get('keywords');
    if (params.has('industry')) state.industry = params.get('industry');
    if (params.has('style')) state.style = params.get('style');
    if (params.has('length')) state.nameLength = params.get('length');
    if (params.has('count')) state.count = parseInt(params.get('count')) || 10;
    if (params.has('include')) state.includeWords = params.get('include');
    if (params.has('exclude')) state.excludeWords = params.get('exclude');

    // Apply state to form
    elements.keywords.value = state.keywords;
    elements.industry.value = state.industry;
    elements.style.value = state.style;
    elements.nameLength.value = state.nameLength;
    elements.count.value = state.count;
    elements.includeWords.value = state.includeWords;
    elements.excludeWords.value = state.excludeWords;
  }

  function saveToURL() {
    const params = new URLSearchParams();
    if (state.keywords) params.set('keywords', state.keywords);
    if (state.industry !== 'any') params.set('industry', state.industry);
    if (state.style !== 'any') params.set('style', state.style);
    if (state.nameLength !== 'any') params.set('length', state.nameLength);
    if (state.count !== 10) params.set('count', state.count);
    if (state.includeWords) params.set('include', state.includeWords);
    if (state.excludeWords) params.set('exclude', state.excludeWords);

    const url = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState(null, '', url);
  }

  function readFormState() {
    state.keywords = elements.keywords.value.trim();
    state.industry = elements.industry.value;
    state.style = elements.style.value;
    state.nameLength = elements.nameLength.value;
    state.count = parseInt(elements.count.value) || 10;
    state.includeWords = elements.includeWords.value.trim();
    state.excludeWords = elements.excludeWords.value.trim();
  }

  function loadFavorites() {
    try {
      const stored = localStorage.getItem('businessNameFavorites');
      if (stored) favorites = JSON.parse(stored);
    } catch(e) { favorites = []; }
  }

  function saveFavorites() {
    try {
      localStorage.setItem('businessNameFavorites', JSON.stringify(favorites));
    } catch(e) {}
  }

  function shareSettings() {
    readFormState();
    saveToURL();
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      elements.shareBtn.textContent = 'Copied!';
      setTimeout(() => {
        elements.shareBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> Share Settings';
      }, 2000);
    });
  }

  function resetForm() {
    state = { ...DEFAULTS };
    elements.keywords.value = '';
    elements.industry.value = 'any';
    elements.style.value = 'any';
    elements.nameLength.value = 'any';
    elements.count.value = '10';
    elements.includeWords.value = '';
    elements.excludeWords.value = '';
    elements.resultDiv.classList.add('hidden');
    elements.resultDiv.innerHTML = '';
    saveToURL();
  }

  // --- Name generation algorithms ---

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function getIndustryKey() {
    return state.industry === 'any' ? pick(Object.keys(PREFIXES)) : state.industry;
  }

  function generateModernName(industry) {
    const strategies = [
      () => pick(PREFIXES[industry]) + pick(SUFFIXES[industry]),
      () => pick(POWER_WORDS) + pick(SUFFIXES[industry]),
      () => pick(PREFIXES[industry]) + '.' + pick(SUFFIXES[industry]),
      () => pick(MODIFIERS) + pick(PREFIXES[industry]),
    ];
    return pick(strategies)();
  }

  function generateClassicName(industry) {
    const strategies = [
      () => pick(PREFIXES[industry]) + ' & ' + pick(PREFIXES[industry]),
      () => pick(PREFIXES[industry]) + ' ' + capitalize(pick(SUFFIXES[industry])),
      () => 'The ' + pick(PREFIXES[industry]) + ' ' + capitalize(pick(SUFFIXES[industry])),
    ];
    return pick(strategies)();
  }

  function generatePlayfulName(industry) {
    const funSuffixes = ['ster', 'oo', 'ly', 'ie', 'pop', 'buzz', 'zip', 'bop', 'ola', 'ling'];
    const strategies = [
      () => pick(PREFIXES[industry]) + pick(funSuffixes),
      () => pick(POWER_WORDS).toLowerCase() + pick(funSuffixes),
      () => capitalize(pick(ABSTRACT_PARTS)) + pick(funSuffixes),
      () => pick(PREFIXES[industry]) + ' ' + pick(['Pals', 'Crew', 'Squad', 'Gang', 'Bunch', 'Pack']),
    ];
    return pick(strategies)();
  }

  function generateProfessionalName(industry) {
    const strategies = [
      () => pick(PREFIXES[industry]) + ' ' + pick(['Group', 'Partners', 'Associates', 'Advisors', 'Solutions', 'Consulting']),
      () => pick(PREFIXES[industry]) + pick(PREFIXES[industry]) + ' ' + pick(['Inc', 'Co', 'Corp', 'LLC']),
      () => pick(MODIFIERS) + ' ' + pick(PREFIXES[industry]) + ' ' + capitalize(pick(SUFFIXES[industry])),
    ];
    return pick(strategies)();
  }

  function generateAbstractName() {
    const strategies = [
      () => pick(ABSTRACT_PARTS) + pick(ABSTRACT_ENDS),
      () => pick(ABSTRACT_PARTS) + pick(ABSTRACT_PARTS).toLowerCase() + pick(ABSTRACT_ENDS),
      () => capitalize(pick(ABSTRACT_PARTS).toLowerCase() + pick(ABSTRACT_ENDS)),
    ];
    return pick(strategies)();
  }

  function generateCompoundName() {
    return pick(COMPOUND_WORDS_A) + pick(COMPOUND_WORDS_B);
  }

  function generateAcronymName(industry) {
    const words = [...PREFIXES[industry], ...POWER_WORDS, ...MODIFIERS];
    const count = Math.random() > 0.5 ? 3 : 4;
    let acronym = '';
    let expanded = [];
    for (let i = 0; i < count; i++) {
      const word = pick(words);
      acronym += word.charAt(0).toUpperCase();
      expanded.push(word);
    }
    return acronym;
  }

  function generateWithKeywords(keywords, industry) {
    const kw = pick(keywords);
    const strategies = [
      () => capitalize(kw) + pick(SUFFIXES[industry]),
      () => pick(PREFIXES[industry]) + capitalize(kw),
      () => capitalize(kw) + ' ' + capitalize(pick(SUFFIXES[industry])),
      () => pick(MODIFIERS) + ' ' + capitalize(kw),
      () => capitalize(kw) + pick(COMPOUND_WORDS_B),
    ];
    return pick(strategies)();
  }

  function generateName() {
    const industry = getIndustryKey();
    const keywords = state.keywords ? state.keywords.split(',').map(k => k.trim()).filter(k => k) : [];
    const includeWords = state.includeWords ? state.includeWords.split(',').map(k => k.trim()).filter(k => k) : [];

    let style = state.style;
    if (style === 'any') {
      style = pick(['modern', 'classic', 'playful', 'professional', 'abstract', 'compound', 'acronym']);
    }

    let name;

    // If we have keywords, use them ~50% of the time
    if (keywords.length > 0 && Math.random() > 0.5) {
      name = generateWithKeywords(keywords, industry);
    } else if (includeWords.length > 0 && Math.random() > 0.6) {
      name = generateWithKeywords(includeWords, industry);
    } else {
      switch (style) {
        case 'modern': name = generateModernName(industry); break;
        case 'classic': name = generateClassicName(industry); break;
        case 'playful': name = generatePlayfulName(industry); break;
        case 'professional': name = generateProfessionalName(industry); break;
        case 'abstract': name = generateAbstractName(); break;
        case 'compound': name = generateCompoundName(); break;
        case 'acronym': name = generateAcronymName(industry); break;
        default: name = generateModernName(industry);
      }
    }

    return { name, style, industry };
  }

  function toDomain(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
  }

  function meetsLengthPref(name) {
    const wordCount = name.split(/[\s&]+/).filter(w => w).length;
    switch (state.nameLength) {
      case 'short': return wordCount <= 2;
      case 'medium': return wordCount >= 2 && wordCount <= 3;
      case 'long': return wordCount >= 3;
      default: return true;
    }
  }

  function isExcluded(name) {
    if (!state.excludeWords) return false;
    const excludes = state.excludeWords.split(',').map(w => w.trim().toLowerCase()).filter(w => w);
    const lower = name.toLowerCase();
    return excludes.some(ex => lower.includes(ex));
  }

  function generateResults() {
    readFormState();
    saveToURL();

    const names = new Set();
    let attempts = 0;
    const maxAttempts = state.count * 20;

    while (names.size < state.count && attempts < maxAttempts) {
      attempts++;
      const result = generateName();
      if (!isExcluded(result.name) && meetsLengthPref(result.name) && !names.has(result.name)) {
        names.add(JSON.stringify(result));
      }
    }

    generatedNames = Array.from(names).map(n => JSON.parse(n));
    renderResults();
  }

  function renderResults() {
    if (generatedNames.length === 0) {
      elements.resultDiv.innerHTML = '<p style="text-align:center;color:var(--color-gray-dark);">No names generated. Try adjusting your filters.</p>';
      elements.resultDiv.classList.remove('hidden');
      return;
    }

    const styleLabels = {
      modern: 'Modern', classic: 'Classic', playful: 'Playful',
      professional: 'Professional', abstract: 'Abstract', compound: 'Compound', acronym: 'Acronym'
    };
    const industryLabels = {
      tech: 'Tech', food: 'Food', fashion: 'Fashion', health: 'Health',
      finance: 'Finance', creative: 'Creative', education: 'Education', retail: 'Retail', services: 'Services'
    };

    let html = '<div class="results-header"><h3>Generated Business Names</h3>';
    html += '<p class="results-subtitle">' + generatedNames.length + ' unique name suggestions</p></div>';

    // Favorites section
    if (favorites.length > 0) {
      html += '<div class="favorites-section"><h4>Saved Favorites (' + favorites.length + ')</h4><div class="favorites-list">';
      favorites.forEach((fav, i) => {
        html += '<span class="favorite-tag">' + fav + '<button onclick="window._bizRemoveFav(' + i + ')">x</button></span>';
      });
      html += '</div></div>';
    }

    html += '<div class="names-grid">';
    generatedNames.forEach((item, idx) => {
      const isFav = favorites.includes(item.name);
      html += '<div class="name-card' + (isFav ? ' favorited' : '') + '">';
      html += '<div class="name-card-header">';
      html += '<span class="business-name">' + item.name + '</span>';
      html += '<div class="name-card-actions">';
      html += '<button class="icon-btn' + (isFav ? ' active' : '') + '" onclick="window._bizToggleFav(' + idx + ')" title="Favorite">' + (isFav ? '★' : '☆') + '</button>';
      html += '<button class="icon-btn" onclick="window._bizCopy(' + idx + ', this)" title="Copy">\u{1F4CB}</button>';
      html += '</div></div>';
      html += '<div class="name-domain">' + toDomain(item.name) + '</div>';
      html += '<div class="name-meta">';
      html += '<span class="meta-badge style-tag">' + (styleLabels[item.style] || item.style) + '</span>';
      html += '<span class="meta-badge industry-tag">' + (industryLabels[item.industry] || item.industry) + '</span>';
      html += '</div></div>';
    });
    html += '</div>';

    html += '<div class="result-actions">';
    html += '<button class="action-btn regenerate-btn" onclick="document.getElementById(\'generate-btn\').click()">Generate More</button>';
    html += '</div>';

    elements.resultDiv.innerHTML = html;
    elements.resultDiv.classList.remove('hidden');
    elements.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Global functions for onclick handlers
  window._bizToggleFav = function(idx) {
    const name = generatedNames[idx].name;
    const i = favorites.indexOf(name);
    if (i >= 0) {
      favorites.splice(i, 1);
    } else {
      favorites.push(name);
    }
    saveFavorites();
    renderResults();
  };

  window._bizRemoveFav = function(idx) {
    favorites.splice(idx, 1);
    saveFavorites();
    renderResults();
  };

  window._bizCopy = function(idx, btn) {
    const name = generatedNames[idx].name;
    navigator.clipboard.writeText(name).then(() => {
      btn.textContent = '✓';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '\u{1F4CB}';
        btn.classList.remove('copied');
      }, 1500);
    });
  };

})();
