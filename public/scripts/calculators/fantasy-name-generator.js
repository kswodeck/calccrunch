// Fantasy Name Generator
(function() {
  'use strict';

  // Phoneme tables for each race
  const PHONEMES = {
    elven: {
      onset: ['l', 'r', 'n', 'th', 'f', 'v', 's', 'sh', 'g', 'gl', 'el', 'ar', 'al', 'an', 'il', 'ir', 'ae', 'cel', 'gal', 'tal', 'fin', 'sil', 'mir', 'lor', 'ael'],
      vowels: ['a', 'e', 'i', 'ae', 'ie', 'ei', 'ia', 'ea', 'ai', 'o', 'u', 'ue', 'io'],
      coda: ['l', 'r', 'n', 'th', 's', 'nd', 'wen', 'iel', 'iel', 'ael', 'ril', 'las', 'ras', 'lyn', 'wen', 'mir', 'nor', 'dor', 'rin', 'thin'],
      surnames: ['Silverleaf', 'Starweaver', 'Moonwhisper', 'Windwalker', 'Dawnbringer', 'Nightbloom', 'Stormlight', 'Sunsinger', 'Shadowmere', 'Greenvale', 'Brightwater', 'Thornwood', 'Goldenleaf', 'Crystalbrook', 'Mistwalker']
    },
    dwarven: {
      onset: ['k', 'g', 'd', 'b', 'th', 'dr', 'gr', 'br', 'kr', 'tr', 'st', 'sk', 'dw', 'gn', 'n', 'r', 'f', 'h', 'bor', 'tor', 'gor', 'dur', 'mur', 'bal', 'thr'],
      vowels: ['a', 'o', 'u', 'i', 'e', 'a', 'o', 'u', 'a', 'o', 'or', 'ur', 'ar'],
      coda: ['k', 'g', 'n', 'r', 'in', 'din', 'rin', 'grim', 'dur', 'gar', 'rak', 'dak', 'mak', 'dum', 'bur', 'nir', 'mir', 'rek', 'rok', 'vik'],
      surnames: ['Ironforge', 'Stonehammer', 'Deepdelve', 'Goldvein', 'Anvilstrike', 'Copperpick', 'Steelbeard', 'Rockfist', 'Coalheart', 'Mithrilaxe', 'Greystone', 'Boulderback', 'Forgefire', 'Darkmine', 'Thunderhewn']
    },
    orcish: {
      onset: ['gr', 'kr', 'zg', 'gh', 'dr', 'br', 'g', 'k', 'z', 'r', 'th', 'sk', 'sn', 'tr', 'ug', 'ur', 'org', 'mog', 'gul', 'gor', 'mur', 'bul', 'zar', 'nak', 'rag'],
      vowels: ['u', 'a', 'o', 'ug', 'ok', 'a', 'u', 'o', 'ar', 'ur', 'og', 'uk', 'agh'],
      coda: ['g', 'k', 'sh', 'gh', 'rk', 'gul', 'mak', 'gor', 'ash', 'ugh', 'rok', 'zug', 'nak', 'mog', 'duk', 'bash', 'thok', 'gash', 'mar', 'tar'],
      surnames: ['Skullcrusher', 'Bonegnaw', 'Bloodfist', 'Ironclaw', 'Goretusk', 'Doomhammer', 'Warstomp', 'Darkblade', 'Deathgrip', 'Hellscream', 'Thundermaw', 'Blacktooth', 'Ragefist', 'Steeljaw', 'Grimtooth']
    },
    human: {
      onset: ['r', 'w', 'th', 'br', 'gr', 'tr', 'st', 'al', 'ed', 'gar', 'rod', 'will', 'geof', 'hen', 'rich', 'rob', 'god', 'leon', 'ber', 'ald', 'ar', 'bal', 'ced', 'dun', 'el'],
      vowels: ['a', 'e', 'i', 'o', 'u', 'ay', 'ey', 'ar', 'er', 'or', 'an', 'en', 'on'],
      coda: ['d', 'n', 'r', 'th', 'ric', 'mund', 'ard', 'win', 'fred', 'bert', 'ald', 'ric', 'ward', 'wick', 'mund', 'stan', 'gar', 'ley', 'ton', 'wyn'],
      surnames: ['Blackwood', 'Stormwind', 'Ironhold', 'Kingsward', 'Whitehall', 'Ravenscar', 'Ashford', 'Thornwall', 'Goldcrest', 'Wolfsbane', 'Dragonmere', 'Lionheart', 'Oakenshield', 'Firebrand', 'Frostborn']
    },
    dragon: {
      onset: ['dr', 'thr', 'zy', 'xar', 'vr', 'kr', 'sz', 'rh', 'yr', 'az', 'ig', 'or', 'val', 'sar', 'myr', 'ath', 'syn', 'zy', 'nex', 'vor', 'bal', 'kal', 'dra', 'gol', 'tor'],
      vowels: ['a', 'ae', 'y', 'o', 'u', 'i', 'ey', 'ax', 'yx', 'or', 'ar', 'ir', 'yr'],
      coda: ['x', 'th', 'rax', 'gon', 'zar', 'myr', 'thyx', 'rion', 'xes', 'nor', 'zul', 'khar', 'maul', 'dros', 'vex', 'thos', 'roth', 'xion', 'zoth', 'rath'],
      surnames: ['the Ancient', 'Worldburner', 'Flamecrown', 'Darkwing', 'Shadowscale', 'Stormbreath', 'Doomfire', 'Ashbringer', 'the Eternal', 'Skyterror', 'the Undying', 'Nightflame', 'Deathwing', 'the Dread', 'Emberclaw']
    },
    fairy: {
      onset: ['l', 'f', 'fl', 'tw', 'sp', 'sh', 'gl', 'br', 'bl', 'cr', 'pr', 'dr', 'wh', 'th', 'syl', 'pip', 'tin', 'dew', 'lum', 'iri', 'ros', 'fae', 'mea', 'sun', 'pix'],
      vowels: ['i', 'a', 'e', 'ia', 'ie', 'ee', 'ai', 'ay', 'ea', 'ey', 'y', 'ou', 'oo'],
      coda: ['le', 'la', 'na', 'bell', 'wing', 'dust', 'dew', 'petal', 'bloom', 'song', 'light', 'shine', 'spark', 'drop', 'kiss', 'breeze', 'mist', 'dawn', 'berry', 'bud'],
      surnames: ['Dewdrop', 'Moonbeam', 'Starlight', 'Petalwing', 'Sunsparkle', 'Honeydew', 'Glitterdust', 'Rosepetal', 'Morningdew', 'Rainbowmist', 'Crystalbell', 'Willowwhisp', 'Fernshade', 'Blossomheart', 'Dawnglimmer']
    },
    demon: {
      onset: ['z', 'x', 'v', 'kr', 'dr', 'th', 'sh', 'bel', 'mal', 'az', 'bal', 'meph', 'dis', 'baa', 'zar', 'gor', 'mor', 'nef', 'abr', 'sam', 'lil', 'asmo', 'beel', 'aba', 'mam'],
      vowels: ['a', 'e', 'i', 'o', 'u', 'ae', 'ai', 'oi', 'ou', 'aa', 'ee', 'ii', 'uu'],
      coda: ['th', 'x', 'zul', 'gor', 'mon', 'roth', 'phon', 'nus', 'thos', 'xis', 'zar', 'baal', 'deus', 'fist', 'mael', 'riel', 'xiel', 'dak', 'rak', 'zek'],
      surnames: ['the Tormentor', 'Soulrender', 'Hellborn', 'Doomcaller', 'Shadowbane', 'Bloodthirst', 'Nightterror', 'Voidwalker', 'the Corruptor', 'Sineater', 'Fleshripper', 'Darkpact', 'the Accursed', 'Deathlord', 'the Forsaken']
    },
    scifi: {
      onset: ['zr', 'xn', 'q', 'vr', 'kr', 'th', 'zy', 'px', 'nv', 'kz', 'ax', 'el', 'or', 'ix', 'uz', 'vy', 'zx', 'ny', 'qr', 'tx', 'sy', 'rz', 'jx', 'mv', 'bz'],
      vowels: ['a', 'e', 'i', 'o', 'u', 'ai', 'ei', 'oa', 'uu', 'ae', 'yi', 'ou', 'io'],
      coda: ['x', 'z', 'on', 'ix', 'us', 'ar', 'os', 'ax', 'en', 'is', 'or', 'um', 'az', 'ex', 'il', 'yr', 'ok', 'an', 'ek', 'oz'],
      surnames: ['Vex-9', 'Prime', 'Null', 'Zero', 'Alpha', 'Omega', 'Nexus', 'Void', 'Flux', 'Core', 'Matrix', 'Cipher', 'Vector', 'Binary', 'Quantum']
    },
    steampunk: {
      onset: ['cl', 'gr', 'br', 'wr', 'cr', 'pr', 'st', 'fl', 'th', 'ch', 'per', 'vin', 'aug', 'cor', 'ged', 'ber', 'wil', 'har', 'mar', 'nic', 'vic', 'isa', 'eli', 'ada', 'hux'],
      vowels: ['a', 'e', 'i', 'o', 'u', 'ai', 'ou', 'ey', 'ar', 'er', 'or', 'ia', 'ea'],
      coda: ['wick', 'ford', 'ton', 'ley', 'well', 'worth', 'stone', 'brass', 'gear', 'cog', 'spring', 'bolt', 'smith', 'wright', 'steam', 'iron', 'clock', 'vent', 'pipe', 'valve'],
      surnames: ['Brasswright', 'Gearsmith', 'Copperfield', 'Steamford', 'Clockworth', 'Ironspring', 'Cogsworth', 'Valverton', 'Pistonby', 'Boilerwick', 'Springheel', 'Tinkerbell', 'Wrenchwick', 'Bolthaven', 'Steamwick']
    },
    pirate: {
      onset: ['bl', 'cr', 'dr', 'gr', 'sc', 'sl', 'sw', 'tr', 'wr', 'sh', 'cap', 'bar', 'red', 'black', 'iron', 'storm', 'dead', 'gold', 'silver', 'skull', 'cross', 'peg', 'hook', 'scar', 'one'],
      vowels: ['a', 'e', 'i', 'o', 'u', 'ar', 'ey', 'oo', 'ea', 'ou', 'ai', 'ie', 'y'],
      coda: ['beard', 'bone', 'hook', 'eye', 'leg', 'tooth', 'skull', 'jack', 'dog', 'rat', 'fin', 'mast', 'sail', 'tide', 'storm', 'wave', 'grog', 'rum', 'boot', 'scar'],
      surnames: ['Blackbeard', 'Stormtide', 'Redfin', 'Ironhook', 'Saltblood', 'Deadwater', 'Goldfang', 'Seadog', 'Bonecrusher', 'Cutlass', 'Crossbones', 'Darkwater', 'Dreadnought', 'Bloodsail', 'Skullcap']
    },
    viking: {
      onset: ['th', 'r', 'h', 'br', 'gr', 'fr', 'tr', 'sk', 'st', 'sv', 'kj', 'hj', 'bj', 'ulf', 'sig', 'rag', 'tor', 'ing', 'gun', 'har', 'eir', 'fen', 'bal', 'frey', 'leif'],
      vowels: ['a', 'e', 'i', 'o', 'u', 'ei', 'au', 'y', 'ae', 'oe', 'ar', 'or', 'ir'],
      coda: ['r', 'n', 'nd', 'rn', 'rik', 'ulf', 'mund', 'stein', 'gard', 'bjorn', 'nar', 'vald', 'geir', 'mar', 'thr', 'var', 'vin', 'din', 'heim', 'hall'],
      surnames: ['Ironside', 'Bloodaxe', 'Stormborn', 'Thunderson', 'Wolfbane', 'Ravensword', 'Shieldbreaker', 'Frostbeard', 'Stonefist', 'Dragonslayer', 'Oathkeeper', 'Skullsplitter', 'Bonecrusher', 'Warborn', 'Allfather']
    }
  };

  // Gender modifiers
  const GENDER_MODS = {
    male: { elven: ['iel', 'or', 'on', 'ar', 'rin'], dwarven: ['in', 'ur', 'ek', 'ok', 'ar'], orcish: ['ug', 'ok', 'ash', 'ar', 'uk'] },
    female: { elven: ['iel', 'wen', 'eth', 'ia', 'ra'], dwarven: ['a', 'is', 'id', 'ra', 'li'], orcish: ['ra', 'sha', 'ka', 'na', 'ga'] },
    neutral: { elven: ['el', 'an', 'is', 'yn', 'al'], dwarven: ['i', 'ax', 'un', 'em', 'or'], orcish: ['z', 'x', 'th', 'rg', 'zk'] }
  };

  const DEFAULTS = {
    race: 'elven',
    gender: 'neutral',
    nameParts: 'full',
    complexity: 'moderate',
    count: 10
  };

  let state = { ...DEFAULTS };
  let generatedNames = [];
  let favorites = [];
  let elements = {};

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    cacheElements();
    if (!elements.generateBtn) {
      console.error('Fantasy Name Generator: Generate button not found');
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
      resultDiv: document.getElementById('fantasy-name-result'),
      gender: document.getElementById('gender'),
      nameParts: document.getElementById('name-parts'),
      complexity: document.getElementById('complexity'),
      count: document.getElementById('count')
    };
  }

  function attachEventListeners() {
    elements.generateBtn.addEventListener('click', generateResults);
    elements.shareBtn.addEventListener('click', shareSettings);
    elements.resetBtn.addEventListener('click', resetForm);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('race')) state.race = params.get('race');
    if (params.has('gender')) state.gender = params.get('gender');
    if (params.has('parts')) state.nameParts = params.get('parts');
    if (params.has('complexity')) state.complexity = params.get('complexity');
    if (params.has('count')) state.count = parseInt(params.get('count')) || 10;

    const raceRadio = document.querySelector('input[name="race"][value="' + state.race + '"]');
    if (raceRadio) raceRadio.checked = true;
    elements.gender.value = state.gender;
    elements.nameParts.value = state.nameParts;
    elements.complexity.value = state.complexity;
    elements.count.value = state.count;
  }

  function saveToURL() {
    const params = new URLSearchParams();
    if (state.race !== 'elven') params.set('race', state.race);
    if (state.gender !== 'neutral') params.set('gender', state.gender);
    if (state.nameParts !== 'full') params.set('parts', state.nameParts);
    if (state.complexity !== 'moderate') params.set('complexity', state.complexity);
    if (state.count !== 10) params.set('count', state.count);
    const url = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState(null, '', url);
  }

  function readFormState() {
    const raceRadio = document.querySelector('input[name="race"]:checked');
    state.race = raceRadio ? raceRadio.value : 'elven';
    state.gender = elements.gender.value;
    state.nameParts = elements.nameParts.value;
    state.complexity = elements.complexity.value;
    state.count = parseInt(elements.count.value) || 10;
  }

  function loadFavorites() {
    try {
      const stored = localStorage.getItem('fantasyNameFavorites');
      if (stored) favorites = JSON.parse(stored);
    } catch(e) { favorites = []; }
  }

  function saveFavorites() {
    try {
      localStorage.setItem('fantasyNameFavorites', JSON.stringify(favorites));
    } catch(e) {}
  }

  function shareSettings() {
    readFormState();
    saveToURL();
    navigator.clipboard.writeText(window.location.href).then(() => {
      elements.shareBtn.textContent = 'Copied!';
      setTimeout(() => {
        elements.shareBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> Share Settings';
      }, 2000);
    });
  }

  function resetForm() {
    state = { ...DEFAULTS };
    const elvenRadio = document.querySelector('input[name="race"][value="elven"]');
    if (elvenRadio) elvenRadio.checked = true;
    elements.gender.value = 'neutral';
    elements.nameParts.value = 'full';
    elements.complexity.value = 'moderate';
    elements.count.value = '10';
    elements.resultDiv.classList.add('hidden');
    elements.resultDiv.innerHTML = '';
    saveToURL();
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getSyllableCount() {
    switch (state.complexity) {
      case 'simple': return 2 + Math.floor(Math.random() * 2); // 2-3
      case 'moderate': return 3 + Math.floor(Math.random() * 3); // 3-5
      case 'complex': return 5 + Math.floor(Math.random() * 3); // 5-7
      default: return 3;
    }
  }

  function generateFirstName() {
    const phonemes = PHONEMES[state.race];
    if (!phonemes) return 'Unknown';

    const syllables = getSyllableCount();
    let name = '';

    // Start with onset
    name += pick(phonemes.onset);

    // Add middle syllables
    for (let i = 1; i < syllables - 1; i++) {
      if (Math.random() > 0.4) {
        name += pick(phonemes.vowels);
      } else {
        name += pick(phonemes.onset).slice(0, 2) + pick(phonemes.vowels).charAt(0);
      }
    }

    // End with gender-appropriate coda or generic coda
    const genderMods = GENDER_MODS[state.gender];
    if (genderMods && genderMods[state.race] && Math.random() > 0.4) {
      name += pick(genderMods[state.race]);
    } else {
      name += pick(phonemes.coda);
    }

    // Clean up: remove double consonants at boundaries, capitalize
    name = name.replace(/(.)\1{2,}/g, '$1$1');
    return capitalize(name);
  }

  function generateSurname() {
    const phonemes = PHONEMES[state.race];
    if (!phonemes || !phonemes.surnames) return '';
    return pick(phonemes.surnames);
  }

  function generateFullName() {
    const firstName = generateFirstName();
    const surname = generateSurname();

    switch (state.nameParts) {
      case 'first': return { display: firstName, first: firstName, surname: '' };
      case 'surname': return { display: surname, first: '', surname: surname };
      default: return { display: firstName + ' ' + surname, first: firstName, surname: surname };
    }
  }

  function generatePronunciation(name) {
    // Simple phonetic guide
    let pron = name.toLowerCase();
    // Common replacements
    pron = pron.replace(/th/g, 'th');
    pron = pron.replace(/ae/g, 'ay');
    pron = pron.replace(/ie/g, 'ee');
    pron = pron.replace(/ei/g, 'ay');
    pron = pron.replace(/iel/g, 'ee-el');
    pron = pron.replace(/wen/g, 'wen');
    pron = pron.replace(/ugh/g, 'oo');
    pron = pron.replace(/gh/g, 'g');

    // Add hyphens between syllables (approximate)
    let result = '';
    let vowelCount = 0;
    const vowels = 'aeiou';
    let prevVowel = false;
    for (let i = 0; i < pron.length; i++) {
      const isVowel = vowels.includes(pron[i]);
      if (isVowel && !prevVowel) {
        vowelCount++;
        if (vowelCount > 1 && i > 1) {
          result += '-';
        }
      }
      result += pron[i];
      prevVowel = isVowel;
    }
    return result;
  }

  function generateResults() {
    readFormState();
    saveToURL();

    const names = new Set();
    const results = [];
    let attempts = 0;
    const maxAttempts = state.count * 20;

    while (results.length < state.count && attempts < maxAttempts) {
      attempts++;
      const nameObj = generateFullName();
      if (!names.has(nameObj.display)) {
        names.add(nameObj.display);
        results.push({
          ...nameObj,
          pronunciation: generatePronunciation(nameObj.display.split(' ')[0]),
          race: state.race,
          gender: state.gender
        });
      }
    }

    generatedNames = results;
    renderResults();
  }

  function renderResults() {
    if (generatedNames.length === 0) {
      elements.resultDiv.innerHTML = '<p style="text-align:center;color:var(--color-gray-dark);">No names generated. Try again.</p>';
      elements.resultDiv.classList.remove('hidden');
      return;
    }

    const raceLabels = {
      elven: 'Elven', dwarven: 'Dwarven', orcish: 'Orcish', human: 'Medieval',
      dragon: 'Dragon', fairy: 'Fairy', demon: 'Demon', scifi: 'Sci-Fi',
      steampunk: 'Steampunk', pirate: 'Pirate', viking: 'Viking'
    };
    const genderLabels = { male: 'Male', female: 'Female', neutral: 'Neutral' };

    let html = '<div class="results-header"><h3>Fantasy Names</h3>';
    html += '<p class="results-subtitle">' + generatedNames.length + ' ' + raceLabels[state.race] + ' names generated</p></div>';

    if (favorites.length > 0) {
      html += '<div class="favorites-section"><h4>Saved Favorites (' + favorites.length + ')</h4><div class="favorites-list">';
      favorites.forEach((fav, i) => {
        html += '<span class="favorite-tag">' + fav + '<button onclick="window._fantRemoveFav(' + i + ')">x</button></span>';
      });
      html += '</div></div>';
    }

    html += '<div class="names-grid">';
    generatedNames.forEach((item, idx) => {
      const isFav = favorites.includes(item.display);
      html += '<div class="name-card' + (isFav ? ' favorited' : '') + '">';
      html += '<div class="name-card-header">';
      html += '<span class="fantasy-name-display">' + item.display + '</span>';
      html += '<div class="name-card-actions">';
      html += '<button class="icon-btn' + (isFav ? ' active' : '') + '" onclick="window._fantToggleFav(' + idx + ')" title="Favorite">' + (isFav ? '★' : '☆') + '</button>';
      html += '<button class="icon-btn" onclick="window._fantCopy(' + idx + ', this)" title="Copy">\u{1F4CB}</button>';
      html += '</div></div>';
      html += '<div class="name-pronunciation">/' + item.pronunciation + '/</div>';
      html += '<div class="name-meta">';
      html += '<span class="meta-badge race-tag">' + raceLabels[item.race] + '</span>';
      html += '<span class="meta-badge gender-tag">' + genderLabels[item.gender] + '</span>';
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

  window._fantToggleFav = function(idx) {
    const name = generatedNames[idx].display;
    const i = favorites.indexOf(name);
    if (i >= 0) favorites.splice(i, 1);
    else favorites.push(name);
    saveFavorites();
    renderResults();
  };

  window._fantRemoveFav = function(idx) {
    favorites.splice(idx, 1);
    saveFavorites();
    renderResults();
  };

  window._fantCopy = function(idx, btn) {
    navigator.clipboard.writeText(generatedNames[idx].display).then(() => {
      btn.textContent = '✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '\u{1F4CB}'; btn.classList.remove('copied'); }, 1500);
    });
  };

})();
