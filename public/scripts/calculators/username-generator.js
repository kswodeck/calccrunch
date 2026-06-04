// Username Generator
(function() {
  'use strict';

  // Word banks by style (200+ words per category)
  const WORD_BANKS = {
    cool: {
      adjectives: ['Shadow', 'Frost', 'Blaze', 'Storm', 'Phantom', 'Rogue', 'Cyber', 'Neon', 'Stealth', 'Chrome', 'Venom', 'Onyx', 'Apex', 'Zero', 'Drift', 'Razor', 'Ghost', 'Steel', 'Nova', 'Flux', 'Vortex', 'Eclipse', 'Omega', 'Sonic', 'Turbo', 'Nitro', 'Bolt', 'Ace', 'Titan', 'Pulse', 'Cipher', 'Spark', 'Hex', 'Raven', 'Cobalt', 'Ember', 'Sable', 'Jet', 'Prism', 'Arc', 'Nexus', 'Volt', 'Blade', 'Warp', 'Orion', 'Zenith', 'Rift', 'Surge', 'Flint', 'Shade'],
      nouns: ['Wolf', 'Hawk', 'Phoenix', 'Viper', 'Raptor', 'Dragon', 'Panther', 'Falcon', 'Tiger', 'Cobra', 'Jaguar', 'Eagle', 'Shark', 'Fox', 'Lynx', 'Raven', 'Blade', 'Knight', 'Rider', 'Hunter', 'Striker', 'Runner', 'Drifter', 'Sniper', 'Racer', 'Warrior', 'Outlaw', 'Ninja', 'Pilot', 'Voyager', 'Slayer', 'Trooper', 'Prowler', 'Maverick', 'Legend', 'Specter', 'Wraith', 'Reaper', 'Ronin', 'Samurai', 'Guardian', 'Sentinel', 'Nomad', 'Ranger', 'Marshal', 'Warden', 'Crusader', 'Enforcer', 'Bandit', 'Rebel']
    },
    funny: {
      adjectives: ['Chunky', 'Soggy', 'Spicy', 'Crispy', 'Wobbly', 'Funky', 'Grumpy', 'Sneaky', 'Clumsy', 'Nerdy', 'Sassy', 'Wacky', 'Dizzy', 'Fluffy', 'Goofy', 'Loopy', 'Quirky', 'Zany', 'Dorky', 'Bubbly', 'Bouncy', 'Nutty', 'Cheesy', 'Toasty', 'Mushy', 'Squishy', 'Jiggly', 'Wiggly', 'Crunchy', 'Tangy', 'Peppy', 'Fizzy', 'Snazzy', 'Perky', 'Puffy', 'Lumpy', 'Bumpy', 'Jumpy', 'Lazy', 'Crazy', 'Hasty', 'Rusty', 'Dusty', 'Misty', 'Frosty', 'Toothy', 'Pointy', 'Salty', 'Breezy', 'Chewy'],
      nouns: ['Pickle', 'Nugget', 'Noodle', 'Waffle', 'Potato', 'Banana', 'Taco', 'Muffin', 'Donut', 'Pretzel', 'Pancake', 'Burrito', 'Nacho', 'Cookie', 'Biscuit', 'Turnip', 'Cabbage', 'Walrus', 'Penguin', 'Llama', 'Platypus', 'Hamster', 'Raccoon', 'Moose', 'Goose', 'Yeti', 'Goblin', 'Wizard', 'Pirate', 'Unicorn', 'Zombie', 'Robot', 'Ninja', 'Viking', 'Gnome', 'Troll', 'Dragon', 'Toast', 'Chaos', 'Pants', 'Socks', 'Beans', 'Mango', 'Dumpling', 'Nerd', 'Dork', 'Squirrel', 'Badger', 'Otter', 'Wombat']
    },
    professional: {
      adjectives: ['Global', 'Prime', 'Core', 'True', 'Real', 'Clear', 'Smart', 'Pro', 'Digital', 'Modern', 'Clean', 'Sharp', 'Bold', 'First', 'Next', 'Lead', 'Key', 'Top', 'Best', 'Chief', 'Senior', 'Master', 'Expert', 'Elite', 'Premier', 'Superior', 'Optimal', 'Strategic', 'Dynamic', 'Reliable', 'Trusted', 'Verified', 'Certified', 'Official', 'Genuine', 'Authentic', 'Premium', 'Select', 'Classic', 'Standard', 'Direct', 'Central', 'Principal', 'Essential', 'Vital', 'Active', 'Focused', 'Driven', 'Skilled', 'Proven'],
      nouns: ['Dev', 'Tech', 'Code', 'Design', 'Build', 'Create', 'Craft', 'Mark', 'Point', 'Edge', 'Path', 'Link', 'Hub', 'Lab', 'Works', 'Mind', 'Logic', 'Stack', 'Base', 'Flow', 'Sync', 'Data', 'Pixel', 'Vector', 'Scale', 'Forge', 'Studio', 'Agency', 'Metric', 'Signal', 'Bridge', 'Scope', 'Pulse', 'Node', 'Grid', 'Spark', 'Arc', 'Ray', 'Lens', 'Maven', 'Ace', 'Sage', 'Guru', 'Exec', 'Lead', 'Chief', 'Alpha', 'Apex', 'Summit', 'Peak']
    },
    aesthetic: {
      adjectives: ['Soft', 'Misty', 'Dreamy', 'Lunar', 'Velvet', 'Pastel', 'Golden', 'Silver', 'Crystal', 'Ivory', 'Pearl', 'Silk', 'Cloud', 'Dusk', 'Dawn', 'Fawn', 'Honey', 'Lilac', 'Peach', 'Rose', 'Sage', 'Mint', 'Lavender', 'Amber', 'Coral', 'Azure', 'Blush', 'Crimson', 'Jade', 'Violet', 'Indigo', 'Scarlet', 'Emerald', 'Ruby', 'Sapphire', 'Opal', 'Jasmine', 'Serene', 'Ethereal', 'Celestial', 'Mystic', 'Divine', 'Gentle', 'Tender', 'Delicate', 'Graceful', 'Elegant', 'Pristine', 'Radiant', 'Luminous'],
      nouns: ['Moon', 'Star', 'Sky', 'Rain', 'Snow', 'Petal', 'Bloom', 'Leaf', 'Fern', 'Iris', 'Flora', 'Fauna', 'Breeze', 'Wave', 'Tide', 'Brook', 'Meadow', 'Garden', 'Forest', 'Willow', 'Lotus', 'Orchid', 'Daisy', 'Lily', 'Poppy', 'Clover', 'Dove', 'Swan', 'Deer', 'Butterfly', 'Feather', 'Shadow', 'Echo', 'Mist', 'Haze', 'Glow', 'Shine', 'Gleam', 'Spark', 'Aura', 'Spirit', 'Soul', 'Dream', 'Vision', 'Wish', 'Grace', 'Charm', 'Haven', 'Realm', 'Vale']
    },
    gamer: {
      adjectives: ['Elite', 'Pro', 'Epic', 'Mega', 'Ultra', 'Hyper', 'Super', 'Dark', 'Fatal', 'Lethal', 'Savage', 'Toxic', 'Chaos', 'Fury', 'Rage', 'Wicked', 'Brutal', 'Insane', 'Godly', 'Clutch', 'Cracked', 'Goated', 'Sweaty', 'Tryhard', 'Noob', 'Based', 'Sigma', 'Alpha', 'Chad', 'Dank', 'Sus', 'Glitch', 'Lag', 'Pixel', 'Retro', 'Arcade', 'Combo', 'Crit', 'Buff', 'Nerf', 'Boss', 'Final', 'Prime', 'Max', 'OP', 'GG', 'Ace', 'MVP', 'Top', 'First'],
      nouns: ['Slayer', 'Crusher', 'Destroyer', 'Sniper', 'Hacker', 'Gamer', 'Player', 'Killer', 'Master', 'Lord', 'King', 'Queen', 'Boss', 'Chief', 'God', 'Demon', 'Angel', 'Ghost', 'Shadow', 'Phantom', 'Wraith', 'Reaper', 'Hunter', 'Stalker', 'Assassin', 'Warrior', 'Knight', 'Mage', 'Tank', 'Healer', 'DPS', 'Carry', 'Support', 'Jungler', 'Laner', 'Camper', 'Rusher', 'Flanker', 'Bot', 'NPC', 'Spawn', 'Noob', 'Tryhard', 'Sweat', 'Legend', 'Champion', 'Victor', 'Winner', 'Clutch', 'Ace']
    },
    edgy: {
      adjectives: ['Dark', 'Shadow', 'Blood', 'Death', 'Void', 'Grim', 'Fallen', 'Cursed', 'Wicked', 'Sinister', 'Twisted', 'Broken', 'Lost', 'Hollow', 'Bleak', 'Dread', 'Doom', 'Feral', 'Savage', 'Goth', 'Nocturnal', 'Infernal', 'Abyssal', 'Cryptic', 'Obscure', 'Morbid', 'Gloomy', 'Somber', 'Tragic', 'Bitter', 'Cold', 'Frozen', 'Silent', 'Lone', 'Forsaken', 'Shattered', 'Tormented', 'Haunted', 'Damned', 'Corrupt', 'Malice', 'Venom', 'Toxic', 'Lethal', 'Fatal', 'Mortal', 'Eternal', 'Ancient', 'Unholy', 'Profane'],
      nouns: ['Abyss', 'Void', 'Nightmare', 'Reaper', 'Phantom', 'Wraith', 'Specter', 'Shade', 'Demon', 'Devil', 'Fiend', 'Beast', 'Serpent', 'Spider', 'Crow', 'Raven', 'Skull', 'Bone', 'Grave', 'Crypt', 'Thorn', 'Blade', 'Edge', 'Fang', 'Claw', 'Scar', 'Wound', 'Pain', 'Chaos', 'Ruin', 'Decay', 'Ash', 'Ember', 'Flame', 'Inferno', 'Eclipse', 'Omen', 'Curse', 'Hex', 'Blight', 'Plague', 'Rot', 'Wolf', 'Bat', 'Scorpion', 'Viper', 'Cobra', 'Worm', 'Leech', 'Parasite']
    },
    cute: {
      adjectives: ['Tiny', 'Little', 'Sweet', 'Baby', 'Soft', 'Fluffy', 'Fuzzy', 'Cuddly', 'Snugly', 'Cozy', 'Lovely', 'Pretty', 'Cute', 'Adorable', 'Precious', 'Darling', 'Sunny', 'Happy', 'Jolly', 'Merry', 'Cheerful', 'Bubbly', 'Sparkly', 'Glittery', 'Twinkly', 'Rosy', 'Peachy', 'Honey', 'Sugar', 'Cotton', 'Velvet', 'Silky', 'Dreamy', 'Magical', 'Fairy', 'Angel', 'Cloud', 'Rainbow', 'Pastel', 'Blossom', 'Petal', 'Dewdrop', 'Starry', 'Moonlit', 'Gentle', 'Kind', 'Warm', 'Bright', 'Lucky', 'Golden'],
      nouns: ['Bunny', 'Kitten', 'Puppy', 'Bear', 'Panda', 'Duckling', 'Lamb', 'Fawn', 'Chick', 'Dove', 'Robin', 'Finch', 'Wren', 'Butterfly', 'Ladybug', 'Bee', 'Daisy', 'Poppy', 'Lily', 'Rose', 'Tulip', 'Clover', 'Berry', 'Cherry', 'Peach', 'Plum', 'Mochi', 'Cookie', 'Cupcake', 'Candy', 'Sprinkle', 'Marshmallow', 'Pudding', 'Cream', 'Boba', 'Pixel', 'Button', 'Dimple', 'Freckle', 'Giggle', 'Wiggle', 'Noodle', 'Pebble', 'Bubble', 'Sparkle', 'Twinkle', 'Star', 'Heart', 'Cloud', 'Snow']
    }
  };

  const VERBS = ['Play', 'Run', 'Fly', 'Jump', 'Dash', 'Kick', 'Spin', 'Roll', 'Slam', 'Zap', 'Pop', 'Snap', 'Flip', 'Twist', 'Whip', 'Crash', 'Blast', 'Smash', 'Rush', 'Zoom'];

  // Default values
  const DEFAULTS = {
    baseWord: '',
    style: 'cool',
    platform: 'any',
    maxLength: 20,
    includeNumbers: true,
    includeSpecials: false,
    numberPosition: 'end',
    count: 10
  };

  const PLATFORM_LIMITS = {
    any: 30,
    instagram: 30,
    twitter: 15,
    tiktok: 24,
    gaming: 16
  };

  // State
  let state = { ...DEFAULTS };
  let generatedUsernames = [];
  let favorites = [];

  // DOM Elements
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
      console.error('Username Generator: Generate button not found');
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
      resultDiv: document.getElementById('username-generator-result'),
      baseWord: document.getElementById('base-word'),
      style: document.getElementById('style'),
      platform: document.getElementById('platform'),
      maxLength: document.getElementById('max-length'),
      includeNumbers: document.getElementById('include-numbers'),
      includeSpecials: document.getElementById('include-specials'),
      numberPosition: document.getElementById('number-position'),
      count: document.getElementById('count')
    };
  }

  function attachEventListeners() {
    elements.generateBtn.addEventListener('click', generateResults);
    elements.shareBtn.addEventListener('click', shareSettings);
    elements.resetBtn.addEventListener('click', resetForm);
    elements.platform.addEventListener('change', function() {
      const limit = PLATFORM_LIMITS[this.value] || 30;
      elements.maxLength.value = limit;
    });
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('base')) state.baseWord = params.get('base');
    if (params.has('style')) state.style = params.get('style');
    if (params.has('platform')) state.platform = params.get('platform');
    if (params.has('maxlen')) state.maxLength = parseInt(params.get('maxlen')) || 20;
    if (params.has('numbers')) state.includeNumbers = params.get('numbers') === '1';
    if (params.has('specials')) state.includeSpecials = params.get('specials') === '1';
    if (params.has('numpos')) state.numberPosition = params.get('numpos');
    if (params.has('count')) state.count = parseInt(params.get('count')) || 10;

    elements.baseWord.value = state.baseWord;
    elements.style.value = state.style;
    elements.platform.value = state.platform;
    elements.maxLength.value = state.maxLength;
    elements.includeNumbers.checked = state.includeNumbers;
    elements.includeSpecials.checked = state.includeSpecials;
    elements.numberPosition.value = state.numberPosition;
    elements.count.value = state.count;
  }

  function saveToURL() {
    const params = new URLSearchParams();
    if (state.baseWord) params.set('base', state.baseWord);
    if (state.style !== 'cool') params.set('style', state.style);
    if (state.platform !== 'any') params.set('platform', state.platform);
    if (state.maxLength !== 20) params.set('maxlen', state.maxLength);
    if (!state.includeNumbers) params.set('numbers', '0');
    if (state.includeSpecials) params.set('specials', '1');
    if (state.numberPosition !== 'end') params.set('numpos', state.numberPosition);
    if (state.count !== 10) params.set('count', state.count);

    const url = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState(null, '', url);
  }

  function readFormState() {
    state.baseWord = elements.baseWord.value.trim();
    state.style = elements.style.value;
    state.platform = elements.platform.value;
    state.maxLength = parseInt(elements.maxLength.value) || 20;
    state.includeNumbers = elements.includeNumbers.checked;
    state.includeSpecials = elements.includeSpecials.checked;
    state.numberPosition = elements.numberPosition.value;
    state.count = parseInt(elements.count.value) || 10;
  }

  function loadFavorites() {
    try {
      const stored = localStorage.getItem('usernameFavorites');
      if (stored) favorites = JSON.parse(stored);
    } catch(e) { favorites = []; }
  }

  function saveFavorites() {
    try {
      localStorage.setItem('usernameFavorites', JSON.stringify(favorites));
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
    elements.baseWord.value = '';
    elements.style.value = 'cool';
    elements.platform.value = 'any';
    elements.maxLength.value = '20';
    elements.includeNumbers.checked = true;
    elements.includeSpecials.checked = false;
    elements.numberPosition.value = 'end';
    elements.count.value = '10';
    elements.resultDiv.classList.add('hidden');
    elements.resultDiv.innerHTML = '';
    saveToURL();
  }

  // --- Username generation ---

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateUsername() {
    const bank = WORD_BANKS[state.style] || WORD_BANKS.cool;
    const adj = pick(bank.adjectives);
    const noun = pick(bank.nouns);
    const base = state.baseWord ? capitalize(state.baseWord) : '';

    const strategies = [
      // adj + noun
      () => adj + noun,
      // noun + adj
      () => noun + adj,
      // adj + base or noun
      () => adj + (base || noun),
      // base + noun
      () => (base || pick(bank.adjectives)) + noun,
      // the + noun
      () => 'The' + (base || noun),
      // just adj + noun lowercase concat
      () => adj.toLowerCase() + noun.toLowerCase(),
      // noun with x replacement
      () => noun.replace(/[aeiou]/i, 'x') + adj.slice(0, 3),
      // verb style
      () => pick(VERBS) + noun,
      // double word
      () => adj + adj.slice(0, 2) + noun.slice(0, 4),
      // base + random
      () => (base || noun) + pick(bank.adjectives).slice(0, 4),
    ];

    let username = pick(strategies)();

    // Remove spaces
    username = username.replace(/\s+/g, '');

    // Add special characters
    if (state.includeSpecials) {
      const specials = ['_', '.'];
      const special = pick(specials);
      const pos = Math.floor(username.length / 2);
      if (Math.random() > 0.5) {
        username = username.slice(0, pos) + special + username.slice(pos);
      } else {
        username = special + username;
      }
    }

    // Add numbers
    if (state.includeNumbers && Math.random() > 0.3) {
      const num = String(randomNum(0, 999));
      switch (state.numberPosition) {
        case 'end':
          username = username + num;
          break;
        case 'middle':
          const mid = Math.floor(username.length / 2);
          username = username.slice(0, mid) + num + username.slice(mid);
          break;
        case 'random':
          const rpos = randomNum(1, username.length - 1);
          username = username.slice(0, rpos) + num + username.slice(rpos);
          break;
      }
    }

    // Enforce max length
    const maxLen = Math.min(state.maxLength, PLATFORM_LIMITS[state.platform] || 30);
    if (username.length > maxLen) {
      username = username.slice(0, maxLen);
    }

    // Remove invalid trailing characters
    username = username.replace(/[._]$/, '');

    return username;
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function generateResults() {
    readFormState();
    saveToURL();

    const usernames = new Set();
    let attempts = 0;
    const maxAttempts = state.count * 30;

    while (usernames.size < state.count && attempts < maxAttempts) {
      attempts++;
      const u = generateUsername();
      if (u.length >= 3) {
        usernames.add(u);
      }
    }

    generatedUsernames = Array.from(usernames);
    renderResults();
  }

  function renderResults() {
    if (generatedUsernames.length === 0) {
      elements.resultDiv.innerHTML = '<p style="text-align:center;color:var(--color-gray-dark);">No usernames generated. Try different settings.</p>';
      elements.resultDiv.classList.remove('hidden');
      return;
    }

    let html = '<div class="results-header"><h3>Generated Usernames</h3>';
    html += '<p class="results-subtitle">' + generatedUsernames.length + ' unique suggestions - ' + state.style + ' style</p></div>';

    // Favorites
    if (favorites.length > 0) {
      html += '<div class="favorites-section"><h4>Saved Favorites (' + favorites.length + ')</h4><div class="favorites-list">';
      favorites.forEach((fav, i) => {
        html += '<span class="favorite-tag">' + fav + '<button onclick="window._userRemoveFav(' + i + ')">x</button></span>';
      });
      html += '</div></div>';
    }

    html += '<div class="usernames-grid">';
    generatedUsernames.forEach((username, idx) => {
      const isFav = favorites.includes(username);
      html += '<div class="username-card' + (isFav ? ' favorited' : '') + '">';
      html += '<div class="username-info">';
      html += '<span class="username-text">' + username + '</span>';
      html += '<span class="username-meta">' + username.length + ' characters</span>';
      html += '</div>';
      html += '<div class="username-actions">';
      html += '<button class="icon-btn' + (isFav ? ' active' : '') + '" onclick="window._userToggleFav(' + idx + ')" title="Favorite">' + (isFav ? '★' : '☆') + '</button>';
      html += '<button class="icon-btn" onclick="window._userCopy(' + idx + ', this)" title="Copy">\u{1F4CB}</button>';
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

  // Global handlers
  window._userToggleFav = function(idx) {
    const name = generatedUsernames[idx];
    const i = favorites.indexOf(name);
    if (i >= 0) favorites.splice(i, 1);
    else favorites.push(name);
    saveFavorites();
    renderResults();
  };

  window._userRemoveFav = function(idx) {
    favorites.splice(idx, 1);
    saveFavorites();
    renderResults();
  };

  window._userCopy = function(idx, btn) {
    navigator.clipboard.writeText(generatedUsernames[idx]).then(() => {
      btn.textContent = '✓';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '\u{1F4CB}';
        btn.classList.remove('copied');
      }, 1500);
    });
  };

})();
