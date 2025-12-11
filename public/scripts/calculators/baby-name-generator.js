// Baby Name Generator with AI-Powered Generation via Netlify Functions
(function() {
  'use strict';

  // Small fallback database in case API fails
  const FALLBACK_NAMES = [
    { name: 'Emma', gender: 'f', origins: ['english', 'german'], meaning: 'Whole, universal', syllables: 2, popularity: 95, style: ['classic', 'gentle'] },
    { name: 'Olivia', gender: 'f', origins: ['latin'], meaning: 'Olive tree', syllables: 4, popularity: 98, style: ['classic', 'gentle'] },
    { name: 'Ava', gender: 'f', origins: ['latin', 'hebrew'], meaning: 'Life, bird', syllables: 2, popularity: 94, style: ['modern', 'gentle'] },
    { name: 'Sophia', gender: 'f', origins: ['greek'], meaning: 'Wisdom', syllables: 3, popularity: 96, style: ['classic', 'royal'] },
    { name: 'Charlotte', gender: 'f', origins: ['french'], meaning: 'Free woman', syllables: 2, popularity: 92, style: ['classic', 'royal'] },
    { name: 'Amelia', gender: 'f', origins: ['german'], meaning: 'Industrious', syllables: 4, popularity: 91, style: ['vintage', 'gentle'] },
    { name: 'Mia', gender: 'f', origins: ['scandinavian'], meaning: 'Mine, beloved', syllables: 2, popularity: 93, style: ['modern', 'gentle'] },
    { name: 'Luna', gender: 'f', origins: ['latin'], meaning: 'Moon', syllables: 2, popularity: 85, style: ['modern', 'nature'] },
    { name: 'Aria', gender: 'f', origins: ['italian'], meaning: 'Air, melody', syllables: 3, popularity: 84, style: ['modern', 'gentle'] },
    { name: 'Lily', gender: 'f', origins: ['english'], meaning: 'Lily flower', syllables: 2, popularity: 77, style: ['classic', 'nature'] },
    { name: 'Zoe', gender: 'f', origins: ['greek'], meaning: 'Life', syllables: 2, popularity: 76, style: ['modern', 'strong'] },
    { name: 'Chloe', gender: 'f', origins: ['greek'], meaning: 'Blooming', syllables: 2, popularity: 79, style: ['modern', 'nature'] },
    { name: 'Liam', gender: 'm', origins: ['irish'], meaning: 'Strong-willed warrior', syllables: 1, popularity: 98, style: ['modern', 'strong'] },
    { name: 'Noah', gender: 'm', origins: ['hebrew'], meaning: 'Rest, comfort', syllables: 2, popularity: 97, style: ['classic', 'gentle'] },
    { name: 'Oliver', gender: 'm', origins: ['latin'], meaning: 'Olive tree', syllables: 3, popularity: 96, style: ['classic', 'gentle'] },
    { name: 'James', gender: 'm', origins: ['hebrew'], meaning: 'Supplanter', syllables: 1, popularity: 95, style: ['classic', 'royal'] },
    { name: 'Elijah', gender: 'm', origins: ['hebrew'], meaning: 'My God is Yahweh', syllables: 3, popularity: 94, style: ['classic', 'strong'] },
    { name: 'William', gender: 'm', origins: ['german'], meaning: 'Resolute protector', syllables: 2, popularity: 93, style: ['classic', 'royal'] },
    { name: 'Henry', gender: 'm', origins: ['german'], meaning: 'Ruler of the home', syllables: 2, popularity: 92, style: ['classic', 'royal'] },
    { name: 'Lucas', gender: 'm', origins: ['greek'], meaning: 'Light', syllables: 2, popularity: 91, style: ['modern', 'gentle'] },
    { name: 'Benjamin', gender: 'm', origins: ['hebrew'], meaning: 'Son of the right hand', syllables: 3, popularity: 90, style: ['classic', 'strong'] },
    { name: 'Theodore', gender: 'm', origins: ['greek'], meaning: 'Gift of God', syllables: 3, popularity: 89, style: ['vintage', 'royal'] },
    { name: 'Jack', gender: 'm', origins: ['english'], meaning: 'God is gracious', syllables: 1, popularity: 88, style: ['classic', 'strong'] },
    { name: 'Leo', gender: 'm', origins: ['latin'], meaning: 'Lion', syllables: 2, popularity: 42, style: ['vintage', 'strong'] },
    { name: 'Jordan', gender: 'n', origins: ['hebrew'], meaning: 'To flow down', syllables: 2, popularity: 85, style: ['modern', 'strong'] },
    { name: 'Taylor', gender: 'n', origins: ['english'], meaning: 'Tailor', syllables: 2, popularity: 80, style: ['modern', 'gentle'] },
    { name: 'Riley', gender: 'n', origins: ['irish'], meaning: 'Courageous', syllables: 2, popularity: 82, style: ['modern', 'gentle'] },
    { name: 'Quinn', gender: 'n', origins: ['irish'], meaning: 'Wise, chief', syllables: 1, popularity: 72, style: ['modern', 'strong'] },
    { name: 'Avery', gender: 'n', origins: ['english'], meaning: 'Elf ruler', syllables: 3, popularity: 78, style: ['modern', 'gentle'] },
    { name: 'River', gender: 'n', origins: ['english'], meaning: 'River', syllables: 2, popularity: 45, style: ['modern', 'nature'] }
  ];

  // Default values
  const DEFAULTS = {
    firstName: '',
    middleName: '',
    lastName: '',
    genFirst: true,
    genMiddle: false,
    gender: 'any',
    origins: [],
    startsWith: '',
    endsWith: '',
    minLength: 0,
    maxLength: 0,
    syllables: 0,
    popularity: 'any',
    style: 'any',
    count: 10,
    sortBy: 'random',
    alliteration: false,
    avoidRhyme: true,
    uniqueInitials: false,
    siblingNames: '',
    excludeNames: '',
    showMeanings: true,
    showStats: true
  };

  // State
  let state = { ...DEFAULTS };
  let generatedNames = [];
  let favorites = [];
  let isLoading = false;

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
      console.error('Baby Name Generator: Generate button not found');
      return;
    }
    
    loadFromURL();
    loadFavorites();
    attachEventListeners();
  }

  function cacheElements() {
    elements = {
      form: document.getElementById('baby-name-form'),
      generateBtn: document.getElementById('generate-btn'),
      shareBtn: document.getElementById('share-btn'),
      resetBtn: document.getElementById('reset-btn'),
      resultDiv: document.getElementById('baby-name-result'),
      // Name inputs
      firstName: document.getElementById('first-name'),
      middleName: document.getElementById('middle-name'),
      lastName: document.getElementById('last-name'),
      genFirst: document.getElementById('gen-first'),
      genMiddle: document.getElementById('gen-middle'),
      // Gender
      genderGirl: document.getElementById('gender-girl'),
      genderBoy: document.getElementById('gender-boy'),
      genderNeutral: document.getElementById('gender-neutral'),
      genderAny: document.getElementById('gender-any'),
      // Preferences
      startsWith: document.getElementById('starts-with'),
      endsWith: document.getElementById('ends-with'),
      minLength: document.getElementById('min-length'),
      maxLength: document.getElementById('max-length'),
      syllables: document.getElementById('syllables'),
      popularity: document.getElementById('popularity'),
      style: document.getElementById('style'),
      // Generation
      count: document.getElementById('count'),
      countMinus: document.getElementById('count-minus'),
      countPlus: document.getElementById('count-plus'),
      sortBy: document.getElementById('sort-by'),
      // Advanced
      toggleAdvanced: document.getElementById('toggle-advanced'),
      advancedOptions: document.getElementById('advanced-options'),
      alliteration: document.getElementById('alliteration'),
      avoidRhyme: document.getElementById('avoid-rhyme'),
      uniqueInitials: document.getElementById('unique-initials'),
      siblingNames: document.getElementById('sibling-names'),
      excludeNames: document.getElementById('exclude-names'),
      showMeanings: document.getElementById('show-meanings'),
      showStats: document.getElementById('show-stats')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('fn')) state.firstName = decodeURIComponent(params.get('fn'));
    if (params.has('mn')) state.middleName = decodeURIComponent(params.get('mn'));
    if (params.has('ln')) state.lastName = decodeURIComponent(params.get('ln'));
    if (params.has('gf')) state.genFirst = params.get('gf') === '1';
    if (params.has('gm')) state.genMiddle = params.get('gm') === '1';
    if (params.has('g')) state.gender = params.get('g');
    if (params.has('o')) state.origins = params.get('o').split(',').filter(o => o);
    if (params.has('sw')) state.startsWith = decodeURIComponent(params.get('sw'));
    if (params.has('ew')) state.endsWith = decodeURIComponent(params.get('ew'));
    if (params.has('minL')) state.minLength = parseInt(params.get('minL')) || 0;
    if (params.has('maxL')) state.maxLength = parseInt(params.get('maxL')) || 0;
    if (params.has('syl')) state.syllables = parseInt(params.get('syl')) || 0;
    if (params.has('pop')) state.popularity = params.get('pop');
    if (params.has('sty')) state.style = params.get('sty');
    if (params.has('cnt')) state.count = parseInt(params.get('cnt')) || DEFAULTS.count;
    if (params.has('sort')) state.sortBy = params.get('sort');
    if (params.has('alit')) state.alliteration = params.get('alit') === '1';
    if (params.has('noRhy')) state.avoidRhyme = params.get('noRhy') === '1';
    if (params.has('uniqI')) state.uniqueInitials = params.get('uniqI') === '1';
    if (params.has('sib')) state.siblingNames = decodeURIComponent(params.get('sib'));
    if (params.has('excl')) state.excludeNames = decodeURIComponent(params.get('excl'));
    if (params.has('mean')) state.showMeanings = params.get('mean') === '1';
    if (params.has('stats')) state.showStats = params.get('stats') === '1';
    
    applyStateToForm();
  }

  function applyStateToForm() {
    if (elements.firstName) elements.firstName.value = state.firstName;
    if (elements.middleName) elements.middleName.value = state.middleName;
    if (elements.lastName) elements.lastName.value = state.lastName;
    if (elements.genFirst) elements.genFirst.checked = state.genFirst;
    if (elements.genMiddle) elements.genMiddle.checked = state.genMiddle;
    
    // Gender radio buttons
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
      radio.checked = radio.value === state.gender;
    });
    
    // Origins checkboxes
    document.querySelectorAll('.origin-checkbox').forEach(checkbox => {
      checkbox.checked = state.origins.includes(checkbox.value);
    });
    
    if (elements.startsWith) elements.startsWith.value = state.startsWith;
    if (elements.endsWith) elements.endsWith.value = state.endsWith;
    if (elements.minLength) elements.minLength.value = state.minLength;
    if (elements.maxLength) elements.maxLength.value = state.maxLength;
    if (elements.syllables) elements.syllables.value = state.syllables;
    if (elements.popularity) elements.popularity.value = state.popularity;
    if (elements.style) elements.style.value = state.style;
    if (elements.count) elements.count.value = state.count;
    if (elements.sortBy) elements.sortBy.value = state.sortBy;
    if (elements.alliteration) elements.alliteration.checked = state.alliteration;
    if (elements.avoidRhyme) elements.avoidRhyme.checked = state.avoidRhyme;
    if (elements.uniqueInitials) elements.uniqueInitials.checked = state.uniqueInitials;
    if (elements.siblingNames) elements.siblingNames.value = state.siblingNames;
    if (elements.excludeNames) elements.excludeNames.value = state.excludeNames;
    if (elements.showMeanings) elements.showMeanings.checked = state.showMeanings;
    if (elements.showStats) elements.showStats.checked = state.showStats;
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    if (state.firstName) params.set('fn', encodeURIComponent(state.firstName));
    if (state.middleName) params.set('mn', encodeURIComponent(state.middleName));
    if (state.lastName) params.set('ln', encodeURIComponent(state.lastName));
    if (state.genFirst !== DEFAULTS.genFirst) params.set('gf', state.genFirst ? '1' : '0');
    if (state.genMiddle !== DEFAULTS.genMiddle) params.set('gm', state.genMiddle ? '1' : '0');
    if (state.gender !== DEFAULTS.gender) params.set('g', state.gender);
    if (state.origins.length > 0) params.set('o', state.origins.join(','));
    if (state.startsWith) params.set('sw', encodeURIComponent(state.startsWith));
    if (state.endsWith) params.set('ew', encodeURIComponent(state.endsWith));
    if (state.minLength !== DEFAULTS.minLength) params.set('minL', state.minLength);
    if (state.maxLength !== DEFAULTS.maxLength) params.set('maxL', state.maxLength);
    if (state.syllables !== DEFAULTS.syllables) params.set('syl', state.syllables);
    if (state.popularity !== DEFAULTS.popularity) params.set('pop', state.popularity);
    if (state.style !== DEFAULTS.style) params.set('sty', state.style);
    if (state.count !== DEFAULTS.count) params.set('cnt', state.count);
    if (state.sortBy !== DEFAULTS.sortBy) params.set('sort', state.sortBy);
    if (state.alliteration) params.set('alit', '1');
    if (state.avoidRhyme !== DEFAULTS.avoidRhyme) params.set('noRhy', state.avoidRhyme ? '1' : '0');
    if (state.uniqueInitials) params.set('uniqI', '1');
    if (state.siblingNames) params.set('sib', encodeURIComponent(state.siblingNames));
    if (state.excludeNames) params.set('excl', encodeURIComponent(state.excludeNames));
    if (state.showMeanings !== DEFAULTS.showMeanings) params.set('mean', state.showMeanings ? '1' : '0');
    if (state.showStats !== DEFAULTS.showStats) params.set('stats', state.showStats ? '1' : '0');
    
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  }

  function loadFavorites() {
    try {
      const saved = localStorage.getItem('babyNameFavorites');
      if (saved) favorites = JSON.parse(saved);
    } catch (e) {
      favorites = [];
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem('babyNameFavorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not save favorites to localStorage');
    }
  }

  function attachEventListeners() {
    // Generate button
    if (elements.generateBtn) {
      elements.generateBtn.addEventListener('click', () => {
        generateNames();
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
    
    // Text inputs
    ['firstName', 'middleName', 'lastName', 'startsWith', 'endsWith', 'siblingNames', 'excludeNames'].forEach(key => {
      if (elements[key]) {
        elements[key].addEventListener('input', (e) => {
          state[key] = e.target.value;
          debouncedSaveToURL();
        });
      }
    });
    
    // Generate checkboxes
    if (elements.genFirst) {
      elements.genFirst.addEventListener('change', (e) => {
        state.genFirst = e.target.checked;
        debouncedSaveToURL();
      });
    }
    
    if (elements.genMiddle) {
      elements.genMiddle.addEventListener('change', (e) => {
        state.genMiddle = e.target.checked;
        debouncedSaveToURL();
      });
    }
    
    // Gender radios
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.gender = e.target.value;
        debouncedSaveToURL();
      });
    });
    
    // Origin checkboxes
    document.querySelectorAll('.origin-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        state.origins = Array.from(document.querySelectorAll('.origin-checkbox:checked'))
          .map(cb => cb.value);
        debouncedSaveToURL();
      });
    });
    
    // Select inputs
    ['minLength', 'maxLength', 'syllables', 'popularity', 'style', 'sortBy'].forEach(key => {
      if (elements[key]) {
        elements[key].addEventListener('change', (e) => {
          state[key] = e.target.value;
          debouncedSaveToURL();
        });
      }
    });
    
    // Count controls
    if (elements.count) {
      elements.count.addEventListener('input', (e) => {
        let val = parseInt(e.target.value) || 1;
        val = Math.max(1, Math.min(50, val));
        state.count = val;
        e.target.value = val;
        debouncedSaveToURL();
      });
    }
    
    if (elements.countMinus) {
      elements.countMinus.addEventListener('click', () => {
        if (state.count > 1) {
          state.count--;
          elements.count.value = state.count;
          saveToURL();
        }
      });
    }
    
    if (elements.countPlus) {
      elements.countPlus.addEventListener('click', () => {
        if (state.count < 50) {
          state.count++;
          elements.count.value = state.count;
          saveToURL();
        }
      });
    }
    
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
    const advancedCheckboxes = ['alliteration', 'avoidRhyme', 'uniqueInitials', 'showMeanings', 'showStats'];
    advancedCheckboxes.forEach(key => {
      if (elements[key]) {
        elements[key].addEventListener('change', (e) => {
          state[key] = e.target.checked;
          debouncedSaveToURL();
        });
      }
    });
  }

  // Debounce utility
  let saveTimeout;
  function debouncedSaveToURL() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveToURL, 300);
  }

  // API call to generate names
  async function fetchNamesFromAPI() {
    const response = await fetch('/.netlify/functions/generate-names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gender: state.gender,
        origins: state.origins,
        startsWith: state.startsWith,
        endsWith: state.endsWith,
        minLength: parseInt(state.minLength) || 0,
        maxLength: parseInt(state.maxLength) || 0,
        syllables: parseInt(state.syllables) || 0,
        popularity: state.popularity,
        style: state.style,
        count: state.count,
        lastName: state.lastName,
        firstName: state.firstName,
        middleName: state.middleName,
        genFirst: state.genFirst,
        genMiddle: state.genMiddle,
        excludeNames: state.excludeNames,
        siblingNames: state.siblingNames
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data?.names || [];
  }

  // Fallback filtering for when API fails
  function filterFallbackNames(names) {
    return names.filter(entry => {
      // Gender filter
      if (state.gender !== 'any') {
        if (state.gender === 'neutral' && entry.gender !== 'n') return false;
        if (state.gender === 'girl' && entry.gender !== 'f' && entry.gender !== 'n') return false;
        if (state.gender === 'boy' && entry.gender !== 'm' && entry.gender !== 'n') return false;
      }
      
      // Origins filter
      if (state.origins.length > 0) {
        if (!entry.origins.some(o => state.origins.includes(o))) return false;
      }
      
      // Starts with
      if (state.startsWith) {
        if (!entry.name.toLowerCase().startsWith(state.startsWith.toLowerCase())) return false;
      }
      
      // Ends with
      if (state.endsWith) {
        if (!entry.name.toLowerCase().endsWith(state.endsWith.toLowerCase())) return false;
      }
      
      // Length filters
      if (state.minLength > 0 && entry.name.length < parseInt(state.minLength)) return false;
      if (state.maxLength > 0 && entry.name.length > parseInt(state.maxLength)) return false;
      
      // Exclude names
      if (state.excludeNames) {
        const excluded = state.excludeNames.toLowerCase().split(',').map(n => n.trim());
        if (excluded.includes(entry.name.toLowerCase())) return false;
      }
      
      return true;
    });
  }

  function calculateFlowScore(firstName, middleName, lastName) {
    let score = 70;
    
    const names = [firstName, middleName, lastName].filter(n => n);
    if (names.length < 2) return score;
    
    const syllableCounts = names.map(n => countSyllables(n));
    const hasSyllableVariation = new Set(syllableCounts).size > 1;
    if (hasSyllableVariation) score += 10;
    
    for (let i = 0; i < names.length - 1; i++) {
      const current = names[i].toLowerCase();
      const next = names[i + 1].toLowerCase();
      
      if (current.slice(-1) === next.slice(0, 1)) score -= 5;
      
      const vowels = 'aeiou';
      const currentEndsVowel = vowels.includes(current.slice(-1));
      const nextStartsVowel = vowels.includes(next.slice(0, 1));
      if (currentEndsVowel !== nextStartsVowel) score += 5;
    }
    
    const totalSyllables = syllableCounts.reduce((a, b) => a + b, 0);
    if (totalSyllables >= 4 && totalSyllables <= 7) score += 10;
    
    return Math.min(100, Math.max(0, score));
  }

  function countSyllables(name) {
    if (!name) return 0;
    const word = name.toLowerCase();
    let count = 0;
    const vowels = 'aeiouy';
    let prevWasVowel = false;
    
    for (let char of word) {
      const isVowel = vowels.includes(char);
      if (isVowel && !prevWasVowel) count++;
      prevWasVowel = isVowel;
    }
    
    if (word.endsWith('e') && count > 1) count--;
    return Math.max(1, count);
  }

  function getFlowLabel(score) {
    if (score >= 85) return { label: 'Excellent', class: 'flow-excellent' };
    if (score >= 70) return { label: 'Good', class: 'flow-good' };
    return { label: 'Fair', class: 'flow-fair' };
  }

  function getSecureRandom() {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] / (0xFFFFFFFF + 1);
  }

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(getSecureRandom() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function updateStateFromForm() {
    state.firstName = elements.firstName?.value || '';
    state.middleName = elements.middleName?.value || '';
    state.lastName = elements.lastName?.value || '';
    state.genFirst = elements.genFirst?.checked ?? true;
    state.genMiddle = elements.genMiddle?.checked ?? false;
    state.gender = document.querySelector('input[name="gender"]:checked')?.value || 'any';
    state.origins = Array.from(document.querySelectorAll('.origin-checkbox:checked')).map(cb => cb.value);
    state.startsWith = elements.startsWith?.value || '';
    state.endsWith = elements.endsWith?.value || '';
    state.minLength = elements.minLength?.value || 0;
    state.maxLength = elements.maxLength?.value || 0;
    state.syllables = elements.syllables?.value || 0;
    state.popularity = elements.popularity?.value || 'any';
    state.style = elements.style?.value || 'any';
    state.count = parseInt(elements.count?.value) || 10;
    state.sortBy = elements.sortBy?.value || 'random';
    state.alliteration = elements.alliteration?.checked ?? false;
    state.avoidRhyme = elements.avoidRhyme?.checked ?? true;
    state.uniqueInitials = elements.uniqueInitials?.checked ?? false;
    state.siblingNames = elements.siblingNames?.value || '';
    state.excludeNames = elements.excludeNames?.value || '';
    state.showMeanings = elements.showMeanings?.checked ?? true;
    state.showStats = elements.showStats?.checked ?? true;
  }

  async function generateNames() {
    if (isLoading) return;
    
    updateStateFromForm();
    saveToURL();
    
    const generateFirst = state.genFirst && !state.firstName;
    const generateMiddle = state.genMiddle && !state.middleName;
    
    if (!generateFirst && !generateMiddle) {
      showError('Please leave at least one name field empty and check the corresponding "Generate" option.');
      return;
    }
    
    isLoading = true;
    showLoading();
    
    let nameDatabase = [];
    let usedAI = false;
    
    try {
      nameDatabase = await fetchNamesFromAPI();
      usedAI = true;
      console.log('Using AI-generated names:', nameDatabase);
    } catch (error) {
      console.warn('API call failed, using fallback:', error);
      nameDatabase = filterFallbackNames([...FALLBACK_NAMES]);
      usedAI = false;
    }
    
    isLoading = false;
    
    if (!nameDatabase?.length) {
      showError('No names match your criteria. Try relaxing some filters.');
      return;
    }
    
    generatedNames = [];
    const usedFirst = new Set();
    const usedMiddle = new Set();
    
    nameDatabase = shuffleArray(nameDatabase);
    
    for (const entry of nameDatabase) {
      if (generatedNames.length >= state.count) break;
      
      let firstName = state.firstName;
      let firstEntry = null;
      let middleName = state.middleName;
      let middleEntry = null;
      let splitName = null;
      
      if (generateFirst) {
        if (usedFirst.has(entry.name)) continue;
        
        if (state.uniqueInitials && middleName && entry.name[0].toLowerCase() === middleName[0].toLowerCase()) {
          continue;
        }
        
        if (state.alliteration && state.lastName && entry.name[0].toLowerCase() !== state.lastName[0].toLowerCase()) {
          continue;
        }
        
        if (state.avoidRhyme && state.lastName && state.lastName.length > 2) {
          const lastSuffix = state.lastName.slice(-2).toLowerCase();
          const nameSuffix = entry.name.slice(-2).toLowerCase();
          if (lastSuffix === nameSuffix) continue;
        }
        
        if (entry.name?.includes(" ")) {
          splitName = entry?.name?.split(" ");
        }
        firstName = splitName?.[0] || entry?.name;
        firstEntry = entry;
        usedFirst.add(firstName);
      } else if (state.firstName) {
        firstEntry = nameDatabase.find(n => n.name.toLowerCase() === state.firstName.toLowerCase()) || null;
      }
      
      if (generateMiddle) {
        const middleCandidate = nameDatabase.find(n => {
          if (usedMiddle.has(splitName?.[1] || n.name)) return false;
          if (n.name === firstName) return false;
          if (state.uniqueInitials && firstName && n.name[0].toLowerCase() === firstName[0].toLowerCase()) return false;
          return true;
        });
        
        if (middleCandidate) {
          middleName = splitName?.[1] || middleCandidate?.name;
          middleEntry = middleCandidate;
          usedMiddle.add(middleName);
        }
      } else if (state.middleName) {
        middleEntry = nameDatabase.find(n => n.name.toLowerCase() === state.middleName.toLowerCase()) || null;
      }
      
      const flowScore = calculateFlowScore(firstName, middleName, state.lastName);
      
      generatedNames.push({
        firstName,
        firstEntry,
        middleName,
        middleEntry,
        lastName: state.lastName,
        flowScore
      });
    }
    
    if (generatedNames.length === 0) {
      showError('Could not generate names with current criteria. Try relaxing some filters.');
      return;
    }
    
    sortGeneratedNames();
    displayResults(usedAI);
  }

  function sortGeneratedNames() {
    switch (state.sortBy) {
      case 'alpha':
        generatedNames.sort((a, b) => {
          const nameA = a.firstName || a.middleName || '';
          const nameB = b.firstName || b.middleName || '';
          return nameA.localeCompare(nameB);
        });
        break;
      case 'popularity':
        generatedNames.sort((a, b) => {
          const popA = (a.firstEntry?.popularity || 0) + (a.middleEntry?.popularity || 0);
          const popB = (b.firstEntry?.popularity || 0) + (b.middleEntry?.popularity || 0);
          return popB - popA;
        });
        break;
      case 'length':
        generatedNames.sort((a, b) => {
          const lenA = (a.firstName?.length || 0) + (a.middleName?.length || 0);
          const lenB = (b.firstName?.length || 0) + (b.middleName?.length || 0);
          return lenA - lenB;
        });
        break;
      case 'flow':
        generatedNames.sort((a, b) => b.flowScore - a.flowScore);
        break;
      default:
        generatedNames = shuffleArray(generatedNames);
    }
  }

  function calculateStats() {
    const stats = {
      totalGenerated: generatedNames.length,
      avgFlowScore: 0,
      avgLength: 0,
      avgSyllables: 0,
      origins: {},
      startingLetters: {}
    };
    
    let totalFlow = 0;
    let totalLength = 0;
    let totalSyllables = 0;
    let nameCount = 0;
    
    generatedNames.forEach(entry => {
      totalFlow += entry.flowScore;
      
      if (entry.firstEntry) {
        const name = entry.firstEntry.name;
        totalLength += name.length;
        totalSyllables += entry.firstEntry.syllables || countSyllables(name);
        nameCount++;
        
        const letter = name[0].toUpperCase();
        stats.startingLetters[letter] = (stats.startingLetters[letter] || 0) + 1;
        
        (entry.firstEntry.origins || []).forEach(origin => {
          stats.origins[origin] = (stats.origins[origin] || 0) + 1;
        });
      }
      
      if (entry.middleEntry) {
        const name = entry.middleEntry.name;
        totalLength += name.length;
        totalSyllables += entry.middleEntry.syllables || countSyllables(name);
        nameCount++;
        
        const letter = name[0].toUpperCase();
        stats.startingLetters[letter] = (stats.startingLetters[letter] || 0) + 1;
        
        (entry.middleEntry.origins || []).forEach(origin => {
          stats.origins[origin] = (stats.origins[origin] || 0) + 1;
        });
      }
    });
    
    stats.avgFlowScore = generatedNames.length > 0 ? Math.round(totalFlow / generatedNames.length) : 0;
    stats.avgLength = nameCount > 0 ? (totalLength / nameCount).toFixed(1) : 0;
    stats.avgSyllables = nameCount > 0 ? (totalSyllables / nameCount).toFixed(1) : 0;
    
    return stats;
  }

  function showLoading() {
    if (!elements.resultDiv) return;
    
    elements.resultDiv.innerHTML = `
      <div class="loading-container" style="text-align: center; padding: 3rem;">
        <div class="loading-spinner" style="
          width: 60px;
          height: 60px;
          border: 4px solid var(--color-gray);
          border-top-color: var(--color-accent-orange);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1.5rem;
        "></div>
        <h4 style="color: var(--color-primary-blue); margin-bottom: 0.5rem;">✨ Generating Names with AI...</h4>
        <p style="color: var(--color-gray-dark); margin: 0;">Finding the perfect names based on your criteria</p>
      </div>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
    elements.resultDiv.classList.remove('hidden');
  }

  function displayResults(usedAI = false) {
    if (!elements.resultDiv) return;
    
    const stats = calculateStats();
    const generateFirst = state.genFirst && !state.firstName;
    const generateMiddle = state.genMiddle && !state.middleName;
    
    let nameCardsHTML = generatedNames.map((entry, index) => {
      const isFavorite = favorites.some(f => 
        f.firstName === entry.firstName && 
        f.middleName === entry.middleName && 
        f.lastName === entry.lastName
      );
      
      const fullNameParts = [];
      if (entry.firstName) {
        fullNameParts.push(generateFirst 
          ? `<span class="generated">${entry.firstName}</span>` 
          : entry.firstName);
      }
      if (entry.middleName) {
        fullNameParts.push(generateMiddle 
          ? `<span class="generated">${entry.middleName}</span>` 
          : entry.middleName);
      }
      if (entry.lastName) {
        fullNameParts.push(entry.lastName);
      }
      
      const originInfo = entry.firstEntry?.origins 
        ? entry.firstEntry.origins.map(o => o.charAt(0).toUpperCase() + o.slice(1)).join(', ')
        : '';
      
      const meaningInfo = state.showMeanings && entry.firstEntry?.meaning 
        ? `<div class="name-meaning">"${entry.firstEntry.meaning}"</div>` 
        : '';
      
      const flowInfo = getFlowLabel(entry.flowScore);
      
      return `
        <div class="name-card ${isFavorite ? 'favorited' : ''}" data-index="${index}">
          <div class="name-card-header">
            <div class="name-display">
              <div class="full-name">${fullNameParts.join(' ')}</div>
              ${originInfo ? `<div class="name-origin">${originInfo} origin</div>` : ''}
            </div>
            <button type="button" class="favorite-btn" onclick="toggleFavorite(${index})" title="Add to favorites">
              ${isFavorite ? '⭐' : '☆'}
            </button>
          </div>
          ${meaningInfo}
          <div class="name-meta">
            ${entry.lastName ? `<span class="meta-badge flow-score ${flowInfo.class}">Flow: ${flowInfo.label}</span>` : ''}
            ${entry.firstEntry?.syllables ? `<span class="meta-badge">${entry.firstEntry.syllables} syllable${entry.firstEntry.syllables !== 1 ? 's' : ''}</span>` : ''}
            ${entry.firstEntry?.style?.[0] ? `<span class="meta-badge">${entry.firstEntry.style[0]}</span>` : ''}
          </div>
        </div>
      `;
    }).join('');
    
    let initialsHTML = '';
    if (generatedNames.length > 0 && state.lastName) {
      const first = generatedNames[0];
      const initials = [first.firstName?.[0], first.middleName?.[0], first.lastName?.[0]]
        .filter(i => i)
        .join('')
        .toUpperCase();
      
      const badInitials = ['ASS', 'FAT', 'PIG', 'DIE', 'SAD', 'SOB', 'DUM', 'PEE', 'POO', 'SEX', 'STD', 'WTF', 'FML'];
      const hasWarning = badInitials.includes(initials);
      
      initialsHTML = `
        <div class="initials-preview">
          <h4>Sample Initials</h4>
          <div class="initials-display">${initials}</div>
          ${hasWarning ? '<div class="initials-warning">⚠️ These initials might spell something unfortunate</div>' : ''}
        </div>
      `;
    }
    
    let statsHTML = '';
    if (state.showStats) {
      const originEntries = Object.entries(stats.origins).sort((a, b) => b[1] - a[1]).slice(0, 6);
      const maxOriginCount = originEntries.length > 0 ? originEntries[0][1] : 1;
      
      const colors = ['#FF6B35', '#2C5F8D', '#4CAF50', '#9C27B0', '#FF9800', '#00BCD4'];
      
      const originBarsHTML = originEntries.map(([origin, count], i) => `
        <div class="origin-bar-row">
          <span class="origin-bar-label">${origin.charAt(0).toUpperCase() + origin.slice(1)}</span>
          <div class="origin-bar-track">
            <div class="origin-bar-fill" style="width: ${(count / maxOriginCount * 100).toFixed(1)}%; background: ${colors[i % colors.length]}"></div>
          </div>
          <span class="origin-bar-count">${count}</span>
        </div>
      `).join('');
      
      const letterEntries = Object.entries(stats.startingLetters).sort((a, b) => b[1] - a[1]);
      const maxLetterCount = letterEntries.length > 0 ? letterEntries[0][1] : 1;
      
      const letterBubblesHTML = letterEntries.map(([letter, count]) => {
        const intensity = Math.floor((count / maxLetterCount) * 255);
        const color = `rgb(${255 - intensity * 0.3}, ${107 - intensity * 0.2}, ${53 + intensity * 0.5})`;
        return `
          <div class="letter-bubble" style="background: ${color}">
            ${letter}
            <span class="count">${count}</span>
          </div>
        `;
      }).join('');
      
      statsHTML = `
        <div class="stats-section">
          <h4>📊 Generation Statistics</h4>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">${stats.totalGenerated}</div>
              <div class="stat-label">Names Generated</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.avgFlowScore}%</div>
              <div class="stat-label">Avg Flow Score</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.avgLength}</div>
              <div class="stat-label">Avg Letters</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.avgSyllables}</div>
              <div class="stat-label">Avg Syllables</div>
            </div>
          </div>
        </div>
        
        ${originEntries.length > 0 ? `
          <div class="origin-chart-section">
            <h4>🌍 Origin Distribution</h4>
            <div class="origin-bars">${originBarsHTML}</div>
          </div>
        ` : ''}
        
        ${letterEntries.length > 0 ? `
          <div class="letter-chart-section">
            <h4>🔤 Starting Letters</h4>
            <div class="letter-bubbles">${letterBubblesHTML}</div>
          </div>
        ` : ''}
      `;
    }
    
    let favoritesHTML = '';
    if (favorites.length > 0) {
      const favTagsHTML = favorites.map((fav, i) => {
        const name = [fav.firstName, fav.middleName, fav.lastName].filter(n => n).join(' ');
        return `
          <span class="favorite-tag">
            ${name}
            <button onclick="removeFavorite(${i})" title="Remove">×</button>
          </span>
        `;
      }).join('');
      
      favoritesHTML = `
        <div class="favorites-section">
          <h4>⭐ Your Favorites (${favorites.length})</h4>
          <div class="favorites-list">${favTagsHTML}</div>
        </div>
      `;
    }
    
    const aiBadge = usedAI 
      ? '<span class="ai-badge" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; margin-left: 0.5rem;">✨ AI Generated</span>'
      : '<span class="ai-badge" style="background: var(--color-gray); color: var(--color-gray-dark); padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; margin-left: 0.5rem;">Fallback Mode</span>';
    
    const html = `
      <div class="result-header">
        <h3>👶 Generated Baby Names ${aiBadge}</h3>
        <p class="result-subtitle">
          ${generatedNames.length} name${generatedNames.length !== 1 ? 's' : ''} generated
          ${state.lastName ? ` for the ${state.lastName} family` : ''}
        </p>
      </div>
      
      ${initialsHTML}
      ${favoritesHTML}
      
      <div class="names-grid">
        ${nameCardsHTML}
      </div>
      
      ${statsHTML}
      
      <div class="result-actions">
        <button type="button" class="action-btn regenerate-btn" onclick="regenerateNames()">
          🔄 Generate More
        </button>
        <button type="button" class="action-btn copy-btn" onclick="copyFavorites()">
          📋 Copy Favorites
        </button>
      </div>
      
      <div class="info-box" style="margin-top: 2rem;">
        <h4>💡 Tip</h4>
        <p>
          Click the ☆ star on any name to save it to your favorites. Your favorites are saved locally 
          and will persist between sessions. Use "Copy Favorites" to share your top picks!
        </p>
      </div>
    `;
    
    elements.resultDiv.innerHTML = html;
    elements.resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    if (!elements.resultDiv) return;
    
    elements.resultDiv.innerHTML = `
      <div class="error-message" style="background: #FEE2E2; border: 2px solid #EF4444; border-radius: 8px; padding: 1.5rem; text-align: center;">
        <h4 style="color: #DC2626; margin-bottom: 0.5rem;">⚠️ Generation Error</h4>
        <p style="color: #7F1D1D; margin: 0;">${message}</p>
      </div>
    `;
    elements.resultDiv.classList.remove('hidden');
  }

  // Global functions
  window.toggleFavorite = function(index) {
    const entry = generatedNames[index];
    if (!entry) return;
    
    const existingIndex = favorites.findIndex(f => 
      f.firstName === entry.firstName && 
      f.middleName === entry.middleName && 
      f.lastName === entry.lastName
    );
    
    if (existingIndex >= 0) {
      favorites.splice(existingIndex, 1);
    } else {
      favorites.push({
        firstName: entry.firstName,
        middleName: entry.middleName,
        lastName: entry.lastName
      });
    }
    
    saveFavorites();
    displayResults();
  };

  window.removeFavorite = function(index) {
    favorites.splice(index, 1);
    saveFavorites();
    displayResults();
  };

  window.regenerateNames = function() {
    generateNames();
  };

  window.copyFavorites = function() {
    if (favorites.length === 0) {
      alert('No favorites to copy! Click the ☆ star on names you like.');
      return;
    }
    
    const text = favorites.map(f => 
      [f.firstName, f.middleName, f.lastName].filter(n => n).join(' ')
    ).join('\n');
    
    copyToClipboard(text, document.querySelector('.copy-btn'));
  };

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
    if (!button) return;
    
    const originalText = button.innerHTML;
    button.innerHTML = '✓ Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('copied');
    }, 2000);
  }

  function shareSettings() {
    const url = window.location.href;
    
    if (navigator.share && navigator.canShare && navigator.canShare({ url })) {
      navigator.share({
        title: 'Baby Name Generator Settings',
        text: 'Check out these baby name settings',
        url: url
      }).catch(() => {
        copyUrlToClipboard(url);
      });
    } else {
      copyUrlToClipboard(url);
    }
  }

  function copyUrlToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showShareSuccess();
      }).catch(() => {
        fallbackCopyUrl(text);
      });
    } else {
      fallbackCopyUrl(text);
    }
  }

  function fallbackCopyUrl(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      showShareSuccess();
    } catch (err) {
      alert('Failed to copy link. URL: ' + text);
    }
    
    document.body.removeChild(textarea);
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
    
    if (elements.resultDiv) {
      elements.resultDiv.classList.add('hidden');
    }
    
    if (elements.advancedOptions && !elements.advancedOptions.classList.contains('hidden')) {
      elements.toggleAdvanced.click();
    }
  }

})();