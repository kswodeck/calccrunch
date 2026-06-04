// Lorem Ipsum Generator with URL State Management
(function() {
  'use strict';

  // Text libraries for different styles
  const TEXT_LIBRARIES = {
    classic: {
      words: [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
        'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
        'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
        'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'vitae', 'elementum',
        'curabitur', 'sollicitudin', 'mauris', 'placerat', 'suspendisse', 'potenti',
        'nullam', 'porttitor', 'lacus', 'luctus', 'accumsan', 'tortor', 'posuere',
        'ac', 'blandit', 'massa', 'eget', 'integer', 'feugiat', 'scelerisque', 'varius',
        'morbi', 'eros', 'vivamus', 'arcu', 'felis', 'bibendum', 'dignissim', 'diam',
        'quis', 'enim', 'lobortis', 'pellentesque', 'habitant', 'senectus', 'netus',
        'fames', 'turpis', 'egestas', 'proin', 'sagittis', 'nisl', 'rhoncus', 'mattis',
        'pharetra', 'odio', 'euismod', 'lacinia', 'at', 'tellus', 'risus', 'viverra',
        'maecenas', 'fermentum', 'faucibus', 'ornare', 'lectus', 'leo', 'ultrices',
        'gravida', 'dictum', 'cursus', 'metus', 'aliquam', 'eleifend', 'donec',
        'pretium', 'vulputate', 'sapien', 'nec', 'dui', 'nunc', 'mattis', 'pulvinar',
        'hendrerit', 'augue', 'interdum', 'velit', 'laoreet', 'sem', 'fringilla',
        'venenatis', 'facilisis', 'purus', 'semper', 'quam', 'amet', 'ullamcorper',
        'justo', 'convallis', 'aenean', 'pharetra', 'condimentum', 'imperdiet'
      ],
      opener: 'Lorem ipsum dolor sit amet'
    },
    hipster: {
      words: [
        'artisan', 'authentic', 'avocado', 'aesthetic', 'beard', 'biodiesel', 'bitters',
        'blog', 'brooklyn', 'brunch', 'bushwick', 'cardigan', 'chambray', 'chia',
        'chillwave', 'cold-pressed', 'craft', 'cronut', 'crucifix', 'DIY', 'distillery',
        'dreamcatcher', 'drinking', 'echo', 'ethical', 'everyday', 'farm-to-table',
        'fashion', 'fixie', 'flannel', 'flexitarian', 'forage', 'freegan', 'gastropub',
        'gentrify', 'gluten-free', 'godard', 'green', 'hashtag', 'helvetica', 'hoodie',
        'humblebrag', 'intelligentsia', 'iPhone', 'irony', 'jean', 'kale', 'keffiyeh',
        'keytar', 'kickstarter', 'kinfolk', 'knausgaard', 'kombucha', 'letterpress',
        'literally', 'locavore', 'lomo', 'marfa', 'master', 'meditation', 'messenger',
        'microdosing', 'migas', 'mixtape', 'moon', 'mustache', 'narwhal', 'neutra',
        'normcore', 'occupy', 'offal', 'organic', 'paleo', 'park', 'PBR', 'pabst',
        'photo', 'pickled', 'pinterest', 'pitchfork', 'plaid', 'polaroid', 'pop-up',
        'portland', 'post-ironic', 'pour-over', 'poutine', 'quinoa', 'raclette',
        'raw', 'readymade', 'ramps', 'retro', 'salvia', 'scenester', 'schlitz',
        'seitan', 'selvage', 'semiotics', 'shabby', 'shoreditch', 'skateboard',
        'slow-carb', 'small-batch', 'snackwave', 'squid', 'sriracha', 'stumptown',
        'subway', 'succulents', 'sustainable', 'swag', 'synth', 'tacos', 'tattooed',
        'taxidermy', 'thundercats', 'tofu', 'tote', 'truffaut', 'tumblr', 'twee',
        'typewriter', 'umami', 'unicorn', 'vaporware', 'vegan', 'venmo', 'VHS',
        'vice', 'viral', 'vinyl', 'waistcoat', 'wayfarers', 'woke', 'wolf', 'XOXO',
        'yolo', 'yuccie', 'franzen', 'austin', 'banjo', 'bicycle', 'rights', 'cleanse'
      ],
      opener: 'Artisan authentic craft beer'
    },
    corporate: {
      words: [
        'actionable', 'agenda', 'agile', 'alignment', 'analytics', 'bandwidth',
        'baseline', 'benchmark', 'best-practice', 'bleeding-edge', 'blue-sky',
        'boil-the-ocean', 'bottom-line', 'brainstorm', 'brand', 'cadence', 'capacity',
        'champion', 'circle-back', 'client-centric', 'close-the-loop', 'collaborate',
        'competency', 'core', 'cross-functional', 'customer-focused', 'dashboard',
        'data-driven', 'deep-dive', 'deliverable', 'disrupt', 'drill-down', 'dynamic',
        'ecosystem', 'empower', 'end-to-end', 'engage', 'enterprise', 'execute',
        'fast-track', 'framework', 'front-end', 'gain-traction', 'game-changer',
        'go-forward', 'granular', 'growth', 'guru', 'holistic', 'ideate', 'impact',
        'implement', 'incentivize', 'incubate', 'industry-leading', 'initiative',
        'innovation', 'insights', 'integrate', 'iterate', 'journey', 'key',
        'KPI', 'laser-focused', 'lean', 'learnings', 'leverage', 'lifecycle',
        'low-hanging-fruit', 'market-leading', 'metric', 'milestone', 'mindshare',
        'mission-critical', 'move-the-needle', 'next-gen', 'north-star', 'objective',
        'omnichannel', 'onboard', 'optimize', 'organic', 'outcome', 'outside-the-box',
        'paradigm', 'parallel-path', 'partner', 'performance', 'pipeline', 'pivot',
        'platform', 'playbook', 'proactive', 'productize', 'push-the-envelope',
        'quick-win', 'ramp-up', 'reach-out', 'realign', 'results-driven', 'roadmap',
        'robust', 'ROI', 'runway', 'scalable', 'scope', 'seamless', 'shift',
        'silo', 'solution', 'stakeholder', 'strategic', 'streamline', 'surface',
        'sustainability', 'synergy', 'take-offline', 'target', 'team-player',
        'thought-leadership', 'touch-base', 'touchpoint', 'transform', 'transparency',
        'value-add', 'vertical', 'visibility', 'vision', 'wheelhouse', 'win-win',
        'workflow', 'world-class', 'alignment', 'deliverables', 'optimize', 'leverage'
      ],
      opener: 'Leveraging synergistic solutions to drive'
    },
    tech: {
      words: [
        'algorithm', 'API', 'agile', 'analytics', 'android', 'app', 'architecture',
        'automation', 'backend', 'bandwidth', 'beta', 'big-data', 'binary', 'bitcoin',
        'blockchain', 'bootstrap', 'bot', 'browser', 'bug', 'cache', 'cloud',
        'cluster', 'codebase', 'commit', 'compile', 'container', 'crypto', 'CSS',
        'cybersecurity', 'data', 'database', 'debug', 'deploy', 'developer', 'devops',
        'digital', 'disrupt', 'docker', 'domain', 'download', 'ecosystem', 'encrypt',
        'endpoint', 'engineer', 'ethernet', 'firewall', 'firmware', 'framework',
        'frontend', 'fullstack', 'function', 'git', 'GPU', 'hack', 'hardware',
        'HTML', 'HTTP', 'hybrid', 'hypervisor', 'IDE', 'infrastructure', 'innovation',
        'integration', 'interface', 'internet', 'iOS', 'iteration', 'javascript',
        'kernel', 'kubernetes', 'lambda', 'latency', 'library', 'linux', 'load-balancer',
        'localhost', 'machine-learning', 'malware', 'memory', 'merge', 'metadata',
        'microservices', 'middleware', 'migration', 'mobile', 'module', 'neural-network',
        'node', 'npm', 'object', 'open-source', 'optimize', 'orchestration', 'OS',
        'packet', 'parallel', 'parse', 'patch', 'performance', 'pipeline', 'pixel',
        'platform', 'plugin', 'port', 'production', 'programmer', 'protocol', 'proxy',
        'python', 'query', 'queue', 'react', 'recursive', 'redis', 'refactor',
        'repository', 'responsive', 'REST', 'runtime', 'SaaS', 'sandbox', 'scalable',
        'schema', 'script', 'SDK', 'server', 'serverless', 'sprint', 'SQL', 'SSH',
        'stack', 'staging', 'startup', 'storage', 'stream', 'sync', 'syntax',
        'tech', 'terminal', 'terraform', 'thread', 'token', 'typescript', 'UI',
        'unicorn', 'upload', 'URL', 'UX', 'variable', 'version', 'virtual', 'VM',
        'VPN', 'web', 'webhook', 'widget', 'wifi', 'workflow', 'XML', 'zero-day'
      ],
      opener: 'Disruptive cloud-native solutions leverage'
    },
    pirate: {
      words: [
        'ahoy', 'anchor', 'aye', 'barnacle', 'bilge', 'black-spot', 'blimey',
        'booty', 'bow', 'broadside', 'buccaneer', 'cabin', 'cannon', 'capn',
        'captain', 'cargo', 'chase', 'chest', 'compass', 'corsair', 'crew',
        'crow-nest', 'cutlass', 'dagger', 'davy-jones', 'deck', 'doubloon',
        'drink', 'flag', 'fleet', 'flotsam', 'freebooter', 'galleon', 'gally',
        'gangplank', 'gold', 'grog', 'gunner', 'harbor', 'hoist', 'horizon',
        'hull', 'island', 'jetsam', 'jolly-roger', 'keelhaul', 'knot', 'kraken',
        'landlubber', 'lash', 'loot', 'map', 'marauder', 'maroon', 'mast',
        'matey', 'mutiny', 'nautical', 'navigate', 'ocean', 'parley', 'parrot',
        'pegleg', 'pillage', 'pirate', 'plank', 'plunder', 'port', 'powder',
        'privateer', 'quartermaster', 'raid', 'ransom', 'reef', 'rigging', 'rope',
        'rum', 'sail', 'sailor', 'salt', 'scallywag', 'schooner', 'scurvy',
        'sea', 'seadog', 'seafarer', 'shark', 'ship', 'shipmate', 'shore',
        'shiver', 'skull', 'sloop', 'smuggler', 'spanish-main', 'spyglass',
        'squall', 'starboard', 'stern', 'storm', 'stowaway', 'swab', 'swashbuckle',
        'sword', 'tide', 'timber', 'treasure', 'vessel', 'voyage', 'walk-the-plank',
        'wave', 'weatherdeck', 'wind', 'wench', 'whirlpool', 'yacht', 'yardarm',
        'yarr', 'yo-ho-ho', 'surrender', 'seven-seas', 'bounty', 'adventure'
      ],
      opener: 'Ahoy matey shiver me timbers'
    },
    legal: {
      words: [
        'adjudicate', 'affidavit', 'allegation', 'amendment', 'appeal', 'appellant',
        'arbitration', 'attorney', 'bail', 'bailiff', 'bankruptcy', 'bar', 'bench',
        'brief', 'burden', 'case', 'cause', 'certiorari', 'chambers', 'civil',
        'claim', 'class-action', 'clause', 'client', 'closing', 'code', 'common-law',
        'complaint', 'compliance', 'contempt', 'contract', 'copyright', 'counsel',
        'court', 'covenant', 'criminal', 'cross-examine', 'damages', 'decree',
        'defamation', 'defendant', 'defense', 'deliberation', 'deposition', 'discovery',
        'dismissal', 'dispute', 'docket', 'doctrine', 'due-process', 'duty',
        'enforcement', 'equity', 'estate', 'evidence', 'executor', 'exhibit',
        'expert', 'felony', 'fiduciary', 'filing', 'fraud', 'good-faith', 'grievance',
        'guardian', 'habeas-corpus', 'hearing', 'hearsay', 'heir', 'immunity',
        'indemnity', 'indictment', 'injunction', 'instruction', 'intellectual-property',
        'interrogatory', 'judge', 'judgment', 'judicial', 'jurisdiction', 'juror',
        'jury', 'justice', 'lawsuit', 'lawyer', 'legal', 'legislation', 'liability',
        'lien', 'litigation', 'magistrate', 'malpractice', 'mandate', 'mediation',
        'misdemeanor', 'mistrial', 'motion', 'negligence', 'notary', 'oath',
        'objection', 'obligation', 'ordinance', 'overrule', 'paralegal', 'party',
        'patent', 'perjury', 'petition', 'plaintiff', 'plea', 'pleading', 'precedent',
        'probate', 'proceeding', 'prosecution', 'provision', 'proxy', 'remedy',
        'restitution', 'ruling', 'sanction', 'settlement', 'statute', 'stipulation',
        'subpoena', 'sue', 'summons', 'testimony', 'tort', 'trademark', 'tribunal',
        'trust', 'verdict', 'violation', 'warrant', 'will', 'witness', 'writ'
      ],
      opener: 'Pursuant to the aforementioned provisions'
    },
    medical: {
      words: [
        'acute', 'admission', 'adverse', 'ambulatory', 'anatomy', 'anesthesia',
        'antibiotic', 'antibody', 'antigen', 'assessment', 'asymptomatic', 'bacteria',
        'benign', 'biopsy', 'cardiac', 'carcinoma', 'chronic', 'clinical', 'complication',
        'condition', 'congenital', 'contraindication', 'diagnosis', 'dialysis',
        'discharge', 'disease', 'disorder', 'dosage', 'dysfunction', 'edema',
        'efficacy', 'emergency', 'endemic', 'enzyme', 'epidemic', 'etiology',
        'examination', 'fever', 'fracture', 'gastric', 'genetic', 'glucose',
        'hemorrhage', 'hepatic', 'hereditary', 'hormone', 'hypertension', 'immune',
        'immunization', 'incision', 'indication', 'infection', 'inflammation',
        'injection', 'inpatient', 'intervention', 'intravenous', 'lesion', 'malignant',
        'membrane', 'metabolism', 'metastasis', 'microbial', 'morbidity', 'mortality',
        'muscle', 'necrosis', 'nerve', 'neurology', 'nursing', 'oncology', 'organ',
        'orthopedic', 'outpatient', 'palliative', 'pandemic', 'pathogen', 'pathology',
        'patient', 'pediatric', 'pharmaceutical', 'physician', 'plasma', 'pneumonia',
        'prognosis', 'prophylaxis', 'prosthesis', 'protocol', 'pulmonary', 'radiology',
        'receptor', 'recovery', 'renal', 'respiratory', 'screening', 'sepsis',
        'serum', 'specimen', 'sterilization', 'surgical', 'symptom', 'syndrome',
        'therapy', 'tissue', 'toxicity', 'transfusion', 'transplant', 'trauma',
        'treatment', 'tumor', 'ulcer', 'vaccine', 'vascular', 'viral', 'vital'
      ],
      opener: 'Clinical assessment indicates comprehensive'
    },
    space: {
      words: [
        'asteroid', 'astronaut', 'astronomy', 'atmosphere', 'aurora', 'axis',
        'black-hole', 'celestial', 'comet', 'constellation', 'corona', 'cosmic',
        'cosmos', 'crater', 'dark-matter', 'dwarf', 'eclipse', 'equinox', 'event-horizon',
        'exoplanet', 'extragalactic', 'extraterrestrial', 'fusion', 'galactic',
        'galaxy', 'gamma-ray', 'giant', 'gravity', 'habitable', 'heliosphere',
        'hydrogen', 'interstellar', 'ionosphere', 'jupiter', 'launchpad', 'light-year',
        'lunar', 'magnetosphere', 'mars', 'mercury', 'meteor', 'meteorite',
        'milky-way', 'mission', 'module', 'moon', 'nasa', 'nebula', 'neptune',
        'neutrino', 'neutron-star', 'nova', 'observatory', 'orbit', 'orbital',
        'oxygen', 'payload', 'photon', 'planet', 'planetary', 'plasma', 'pluto',
        'probe', 'propulsion', 'pulsar', 'quasar', 'radiation', 'radio-telescope',
        'red-dwarf', 'reentry', 'rocket', 'rover', 'satellite', 'saturn', 'singularity',
        'solar', 'solstice', 'space', 'spacecraft', 'spacetime', 'spacewalk',
        'spectrum', 'star', 'starship', 'stellar', 'sun', 'sunspot', 'supernova',
        'telescope', 'terrestrial', 'thrust', 'trajectory', 'universe', 'uranus',
        'vacuum', 'venus', 'void', 'warp', 'wormhole', 'x-ray', 'zero-gravity',
        'zodiac', 'zone', 'exploration', 'discovery', 'frontier', 'infinity'
      ],
      opener: 'Exploring the cosmic frontier reveals'
    }
  };

  // Default values
  const DEFAULTS = {
    textStyle: 'classic',
    outputType: 'paragraphs',
    amount: 3,
    startLorem: true,
    includeHtml: false,
    randomBold: false,
    randomItalic: false,
    randomLinks: false,
    showStats: true,
    textCase: 'normal',
    customTag: '',
    sentencesPerPara: 'random',
    wordsPerSentence: 'random',
    listType: 'ul',
    includeListWrapper: true,
    customClass: '',
    customId: ''
  };

  // State
  let state = { ...DEFAULTS };
  let generatedText = '';
  let generatedHtml = '';
  let currentView = 'preview';

  // DOM Elements cache
  let elements = {};

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('Lorem Ipsum Generator initializing...');
    cacheElements();
    
    if (!elements.generateBtn) {
      console.error('Lorem Ipsum Generator: Generate button not found');
      return;
    }
    
    console.log('Lorem Ipsum Generator: Elements cached successfully');
    loadFromURL();
    attachEventListeners();
    console.log('Lorem Ipsum Generator initialized successfully');
  }

  function cacheElements() {
    elements = {
      form: document.getElementById('lorem-form'),
      generateBtn: document.getElementById('generate-btn'),
      shareBtn: document.getElementById('share-btn'),
      resetBtn: document.getElementById('reset-btn'),
      resultDiv: document.getElementById('lorem-result'),
      // Output settings
      outputType: document.getElementById('output-type'),
      amount: document.getElementById('amount'),
      amountMinus: document.getElementById('amount-minus'),
      amountPlus: document.getElementById('amount-plus'),
      amountHelp: document.getElementById('amount-help'),
      // Options
      startLorem: document.getElementById('start-lorem'),
      includeHtml: document.getElementById('include-html'),
      randomBold: document.getElementById('random-bold'),
      randomItalic: document.getElementById('random-italic'),
      randomLinks: document.getElementById('random-links'),
      showStats: document.getElementById('show-stats'),
      // Advanced
      toggleAdvanced: document.getElementById('toggle-advanced'),
      advancedOptions: document.getElementById('advanced-options'),
      textCase: document.getElementById('text-case'),
      customTag: document.getElementById('custom-tag'),
      sentencesPerPara: document.getElementById('sentences-per-para'),
      wordsPerSentence: document.getElementById('words-per-sentence'),
      listType: document.getElementById('list-type'),
      includeListWrapper: document.getElementById('include-list-wrapper'),
      customClass: document.getElementById('custom-class'),
      customId: document.getElementById('custom-id')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('style')) state.textStyle = params.get('style');
    if (params.has('type')) state.outputType = params.get('type');
    if (params.has('amt')) state.amount = parseInt(params.get('amt')) || DEFAULTS.amount;
    if (params.has('lorem')) state.startLorem = params.get('lorem') === '1';
    if (params.has('html')) state.includeHtml = params.get('html') === '1';
    if (params.has('bold')) state.randomBold = params.get('bold') === '1';
    if (params.has('italic')) state.randomItalic = params.get('italic') === '1';
    if (params.has('links')) state.randomLinks = params.get('links') === '1';
    if (params.has('stats')) state.showStats = params.get('stats') === '1';
    if (params.has('case')) state.textCase = params.get('case');
    if (params.has('tag')) state.customTag = decodeURIComponent(params.get('tag'));
    if (params.has('spp')) state.sentencesPerPara = params.get('spp');
    if (params.has('wps')) state.wordsPerSentence = params.get('wps');
    if (params.has('lt')) state.listType = params.get('lt');
    if (params.has('wrap')) state.includeListWrapper = params.get('wrap') === '1';
    if (params.has('class')) state.customClass = decodeURIComponent(params.get('class'));
    if (params.has('id')) state.customId = decodeURIComponent(params.get('id'));
    
    applyStateToForm();
    
    // If URL has parameters, generate automatically
    if (params.toString().length > 0) {
      setTimeout(() => generateText(false), 100);
    }
  }

  function applyStateToForm() {
    // Style radio buttons
    document.querySelectorAll('input[name="textStyle"]').forEach(radio => {
      radio.checked = radio.value === state.textStyle;
    });
    
    if (elements.outputType) elements.outputType.value = state.outputType;
    if (elements.amount) elements.amount.value = state.amount;
    if (elements.startLorem) elements.startLorem.checked = state.startLorem;
    if (elements.includeHtml) elements.includeHtml.checked = state.includeHtml;
    if (elements.randomBold) elements.randomBold.checked = state.randomBold;
    if (elements.randomItalic) elements.randomItalic.checked = state.randomItalic;
    if (elements.randomLinks) elements.randomLinks.checked = state.randomLinks;
    if (elements.showStats) elements.showStats.checked = state.showStats;
    if (elements.textCase) elements.textCase.value = state.textCase;
    if (elements.customTag) elements.customTag.value = state.customTag;
    if (elements.sentencesPerPara) elements.sentencesPerPara.value = state.sentencesPerPara;
    if (elements.wordsPerSentence) elements.wordsPerSentence.value = state.wordsPerSentence;
    if (elements.listType) elements.listType.value = state.listType;
    if (elements.includeListWrapper) elements.includeListWrapper.checked = state.includeListWrapper;
    if (elements.customClass) elements.customClass.value = state.customClass;
    if (elements.customId) elements.customId.value = state.customId;
    
    updateAmountHelp();
    updatePresetButtons();
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    if (state.textStyle !== DEFAULTS.textStyle) params.set('style', state.textStyle);
    if (state.outputType !== DEFAULTS.outputType) params.set('type', state.outputType);
    if (state.amount !== DEFAULTS.amount) params.set('amt', state.amount);
    if (state.startLorem !== DEFAULTS.startLorem) params.set('lorem', state.startLorem ? '1' : '0');
    if (state.includeHtml !== DEFAULTS.includeHtml) params.set('html', state.includeHtml ? '1' : '0');
    if (state.randomBold !== DEFAULTS.randomBold) params.set('bold', state.randomBold ? '1' : '0');
    if (state.randomItalic !== DEFAULTS.randomItalic) params.set('italic', state.randomItalic ? '1' : '0');
    if (state.randomLinks !== DEFAULTS.randomLinks) params.set('links', state.randomLinks ? '1' : '0');
    if (state.showStats !== DEFAULTS.showStats) params.set('stats', state.showStats ? '1' : '0');
    if (state.textCase !== DEFAULTS.textCase) params.set('case', state.textCase);
    if (state.customTag) params.set('tag', encodeURIComponent(state.customTag));
    if (state.sentencesPerPara !== DEFAULTS.sentencesPerPara) params.set('spp', state.sentencesPerPara);
    if (state.wordsPerSentence !== DEFAULTS.wordsPerSentence) params.set('wps', state.wordsPerSentence);
    if (state.listType !== DEFAULTS.listType) params.set('lt', state.listType);
    if (state.includeListWrapper !== DEFAULTS.includeListWrapper) params.set('wrap', state.includeListWrapper ? '1' : '0');
    if (state.customClass) params.set('class', encodeURIComponent(state.customClass));
    if (state.customId) params.set('id', encodeURIComponent(state.customId));
    
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  }

  // Debounce helper
  let saveTimeout;
  function debouncedSaveToURL() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveToURL, 300);
  }

  function attachEventListeners() {
    // Generate button
    if (elements.generateBtn) {
      elements.generateBtn.addEventListener('click', () => {
        generateText(true);
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
    
    // Style radio buttons
    document.querySelectorAll('input[name="textStyle"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.textStyle = e.target.value;
        debouncedSaveToURL();
      });
    });
    
    // Output type
    if (elements.outputType) {
      elements.outputType.addEventListener('change', (e) => {
        state.outputType = e.target.value;
        updateAmountHelp();
        debouncedSaveToURL();
      });
    }
    
    // Amount controls
    if (elements.amount) {
      elements.amount.addEventListener('input', (e) => {
        let val = parseInt(e.target.value) || 1;
        val = Math.max(1, Math.min(100, val));
        state.amount = val;
        e.target.value = val;
        updatePresetButtons();
        debouncedSaveToURL();
      });
    }
    
    if (elements.amountMinus) {
      elements.amountMinus.addEventListener('click', () => {
        if (state.amount > 1) {
          state.amount--;
          elements.amount.value = state.amount;
          updatePresetButtons();
          saveToURL();
        }
      });
    }
    
    if (elements.amountPlus) {
      elements.amountPlus.addEventListener('click', () => {
        if (state.amount < 100) {
          state.amount++;
          elements.amount.value = state.amount;
          updatePresetButtons();
          saveToURL();
        }
      });
    }
    
    // Amount presets
    document.querySelectorAll('.amount-presets .preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const amount = parseInt(btn.dataset.amount);
        if (amount) {
          state.amount = amount;
          elements.amount.value = amount;
          updatePresetButtons();
          saveToURL();
        }
      });
    });
    
    // Options checkboxes
    const checkboxMappings = [
      { el: elements.startLorem, key: 'startLorem' },
      { el: elements.includeHtml, key: 'includeHtml' },
      { el: elements.randomBold, key: 'randomBold' },
      { el: elements.randomItalic, key: 'randomItalic' },
      { el: elements.randomLinks, key: 'randomLinks' },
      { el: elements.showStats, key: 'showStats' },
      { el: elements.includeListWrapper, key: 'includeListWrapper' }
    ];
    
    checkboxMappings.forEach(({ el, key }) => {
      if (el) {
        el.addEventListener('change', (e) => {
          state[key] = e.target.checked;
          debouncedSaveToURL();
        });
      }
    });
    
    // Advanced options selects
    const selectMappings = [
      { el: elements.textCase, key: 'textCase' },
      { el: elements.sentencesPerPara, key: 'sentencesPerPara' },
      { el: elements.wordsPerSentence, key: 'wordsPerSentence' },
      { el: elements.listType, key: 'listType' }
    ];
    
    selectMappings.forEach(({ el, key }) => {
      if (el) {
        el.addEventListener('change', (e) => {
          state[key] = e.target.value;
          debouncedSaveToURL();
        });
      }
    });
    
    // Text inputs
    const inputMappings = [
      { el: elements.customTag, key: 'customTag' },
      { el: elements.customClass, key: 'customClass' },
      { el: elements.customId, key: 'customId' }
    ];
    
    inputMappings.forEach(({ el, key }) => {
      if (el) {
        el.addEventListener('input', (e) => {
          state[key] = e.target.value;
          debouncedSaveToURL();
        });
      }
    });
    
    // Advanced toggle
    if (elements.toggleAdvanced) {
      elements.toggleAdvanced.addEventListener('click', toggleAdvanced);
    }
  }

  function toggleAdvanced() {
    const isHidden = elements.advancedOptions.classList.contains('hidden');
    elements.advancedOptions.classList.toggle('hidden');
    elements.toggleAdvanced.classList.toggle('active');
    
    const toggleText = elements.toggleAdvanced.querySelector('.toggle-text');
    if (toggleText) {
      toggleText.textContent = isHidden ? 'Hide Advanced Options' : 'Show Advanced Options';
    }
  }

  function updateAmountHelp() {
    if (!elements.amountHelp) return;
    
    const typeLabels = {
      paragraphs: 'paragraphs',
      sentences: 'sentences',
      words: 'words',
      list: 'list items'
    };
    
    elements.amountHelp.textContent = `Generate 1 to 100 ${typeLabels[state.outputType] || 'paragraphs'}`;
  }

  function updatePresetButtons() {
    document.querySelectorAll('.amount-presets .preset-btn').forEach(btn => {
      const amount = parseInt(btn.dataset.amount);
      btn.classList.toggle('active', amount === state.amount);
    });
  }

  // Text generation functions
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomWord(library) {
    const words = TEXT_LIBRARIES[library]?.words || TEXT_LIBRARIES.classic.words;
    return words[getRandomInt(0, words.length - 1)];
  }

  function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function applyCase(text, caseType) {
    switch (caseType) {
      case 'lowercase':
        return text.toLowerCase();
      case 'uppercase':
        return text.toUpperCase();
      case 'titlecase':
        return text.split(' ').map(word => capitalizeFirst(word.toLowerCase())).join(' ');
      default:
        return text;
    }
  }

  function getSentenceLength() {
    switch (state.wordsPerSentence) {
      case 'short':
        return getRandomInt(5, 8);
      case 'medium':
        return getRandomInt(8, 12);
      case 'long':
        return getRandomInt(12, 18);
      default:
        return getRandomInt(5, 15);
    }
  }

  function getParagraphLength() {
    if (state.sentencesPerPara === 'random') {
      return getRandomInt(3, 8);
    }
    return parseInt(state.sentencesPerPara);
  }

  function generateSentence(isFirst) {
    const library = TEXT_LIBRARIES[state.textStyle] || TEXT_LIBRARIES.classic;
    let words = [];
    const wordCount = getSentenceLength();
    
    // Use opener for first sentence if requested
    if (isFirst && state.startLorem) {
      words = library.opener.split(' ');
      // Add more words to reach desired length
      while (words.length < wordCount) {
        words.push(getRandomWord(state.textStyle));
      }
    } else {
      for (let i = 0; i < wordCount; i++) {
        words.push(getRandomWord(state.textStyle));
      }
    }
    
    // Apply random formatting
    if (state.randomBold || state.randomItalic || state.randomLinks) {
      words = words.map((word, index) => {
        // Skip first word (will be capitalized)
        if (index === 0) return word;
        
        const rand = Math.random();
        if (state.randomBold && rand < 0.08) {
          return `<strong>${word}</strong>`;
        } else if (state.randomItalic && rand < 0.16 && rand >= 0.08) {
          return `<em>${word}</em>`;
        } else if (state.randomLinks && rand < 0.24 && rand >= 0.16) {
          return `<a href="#">${word}</a>`;
        }
        return word;
      });
    }
    
    // Capitalize first word and add period
    words[0] = capitalizeFirst(words[0]);
    let sentence = words.join(' ') + '.';
    
    return sentence;
  }

  function generateParagraph(isFirst) {
    const sentenceCount = getParagraphLength();
    const sentences = [];
    
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence(isFirst && i === 0));
    }
    
    return sentences.join(' ');
  }

  function generateWords(count, isFirst) {
    const library = TEXT_LIBRARIES[state.textStyle] || TEXT_LIBRARIES.classic;
    let words = [];
    
    if (isFirst && state.startLorem) {
      words = library.opener.split(' ').slice(0, count);
      while (words.length < count) {
        words.push(getRandomWord(state.textStyle));
      }
    } else {
      for (let i = 0; i < count; i++) {
        words.push(getRandomWord(state.textStyle));
      }
    }
    
    // Apply random formatting
    if (state.randomBold || state.randomItalic || state.randomLinks) {
      words = words.map(word => {
        const rand = Math.random();
        if (state.randomBold && rand < 0.08) {
          return `<strong>${word}</strong>`;
        } else if (state.randomItalic && rand < 0.16 && rand >= 0.08) {
          return `<em>${word}</em>`;
        } else if (state.randomLinks && rand < 0.24 && rand >= 0.16) {
          return `<a href="#">${word}</a>`;
        }
        return word;
      });
    }
    
    return words.join(' ');
  }

  function generateListItem(isFirst) {
    return generateSentence(isFirst);
  }

  function getTagName() {
    if (state.customTag) {
      return state.customTag.replace(/[^a-zA-Z0-9-]/g, '');
    }
    
    if (state.outputType === 'list') {
      return 'li';
    }
    
    return 'p';
  }

  function getAttributes(index) {
    let attrs = [];
    
    if (state.customClass) {
      attrs.push(`class="${state.customClass}"`);
    }
    
    if (state.customId && index === 0) {
      attrs.push(`id="${state.customId}"`);
    }
    
    return attrs.length > 0 ? ' ' + attrs.join(' ') : '';
  }

  function generateText(shouldScroll) {
    const items = [];
    let plainText = '';
    let htmlOutput = '';
    
    const tag = getTagName();
    
    switch (state.outputType) {
      case 'paragraphs':
        for (let i = 0; i < state.amount; i++) {
          const para = generateParagraph(i === 0);
          items.push(para);
          
          if (state.includeHtml) {
            htmlOutput += `<${tag}${getAttributes(i)}>${para}</${tag}>\n`;
          }
        }
        plainText = items.join('\n\n');
        break;
        
      case 'sentences':
        for (let i = 0; i < state.amount; i++) {
          const sentence = generateSentence(i === 0);
          items.push(sentence);
        }
        plainText = items.join(' ');
        
        if (state.includeHtml) {
          htmlOutput = `<${tag}${getAttributes(0)}>${plainText}</${tag}>`;
        }
        break;
        
      case 'words':
        plainText = generateWords(state.amount, true);
        
        if (state.includeHtml) {
          htmlOutput = `<${tag}${getAttributes(0)}>${plainText}</${tag}>`;
        }
        break;
        
      case 'list':
        for (let i = 0; i < state.amount; i++) {
          const item = generateListItem(i === 0);
          items.push(item);
          
          if (state.includeHtml) {
            htmlOutput += `  <li${getAttributes(i)}>${item}</li>\n`;
          }
        }
        plainText = items.map((item, i) => `${i + 1}. ${item}`).join('\n');
        
        if (state.includeHtml && state.includeListWrapper) {
          const listTag = state.listType;
          htmlOutput = `<${listTag}>\n${htmlOutput}</${listTag}>`;
        }
        break;
    }
    
    // Apply text case to plain text (not HTML tags)
    if (state.textCase !== 'normal') {
      plainText = applyCase(plainText, state.textCase);
      // For HTML, we need to be careful not to change tag names
      if (state.includeHtml) {
        // Apply case only to text content, not tags
        htmlOutput = htmlOutput.replace(/>([^<]+)</g, (match, content) => {
          return '>' + applyCase(content, state.textCase) + '<';
        });
      }
    }
    
    generatedText = plainText;
    generatedHtml = state.includeHtml ? htmlOutput : plainText;
    
    displayResults();
    saveToURL();
    
    if (shouldScroll && elements.resultDiv) {
      elements.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function calculateStats() {
    // Strip HTML tags for accurate counting
    const plainText = generatedText.replace(/<[^>]+>/g, '');
    
    const words = plainText.split(/\s+/).filter(w => w.length > 0);
    const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = generatedText.split(/\n\n+/).filter(p => p.trim().length > 0);
    const characters = plainText.length;
    const charactersNoSpaces = plainText.replace(/\s/g, '').length;
    
    // Word length distribution
    const wordLengths = {};
    words.forEach(word => {
      // Remove punctuation for accurate length
      const cleanWord = word.replace(/[^a-zA-Z]/g, '');
      const len = cleanWord.length;
      if (len > 0) {
        const bucket = len <= 3 ? '1-3' : len <= 5 ? '4-5' : len <= 7 ? '6-7' : len <= 9 ? '8-9' : '10+';
        wordLengths[bucket] = (wordLengths[bucket] || 0) + 1;
      }
    });
    
    // Character frequency (top letters)
    const charFreq = {};
    plainText.toLowerCase().replace(/[^a-z]/g, '').split('').forEach(char => {
      charFreq[char] = (charFreq[char] || 0) + 1;
    });
    
    // Sort and get top 10 letters
    const topChars = Object.entries(charFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    // Average word length
    const totalWordLength = words.reduce((sum, word) => {
      return sum + word.replace(/[^a-zA-Z]/g, '').length;
    }, 0);
    const avgWordLength = words.length > 0 ? (totalWordLength / words.length).toFixed(1) : 0;
    
    // Reading time (average 200-250 words per minute)
    const readingTimeMinutes = words.length / 225;
    const readingTimeSeconds = Math.round(readingTimeMinutes * 60);
    
    // Speaking time (average 130-150 words per minute)
    const speakingTimeMinutes = words.length / 140;
    const speakingTimeSeconds = Math.round(speakingTimeMinutes * 60);
    
    return {
      words: words.length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      characters,
      charactersNoSpaces,
      avgWordLength,
      wordLengths,
      topChars,
      readingTimeSeconds,
      speakingTimeSeconds
    };
  }

  function formatTime(seconds) {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  }

  function getStyleLabel(style) {
    const labels = {
      classic: '📜 Classic Lorem Ipsum',
      hipster: '🧔 Hipster Ipsum',
      corporate: '💼 Corporate Ipsum',
      tech: '💻 Tech Ipsum',
      pirate: '🏴‍☠️ Pirate Ipsum',
      legal: '⚖️ Legal Ipsum',
      medical: '🏥 Medical Ipsum',
      space: '🚀 Space Ipsum'
    };
    return labels[style] || labels.classic;
  }

  function displayResults() {
    if (!elements.resultDiv) return;
    
    const stats = calculateStats();
    
    // Create stats HTML if enabled
    let statsHTML = '';
    if (state.showStats) {
      // Word length distribution chart
      const lengths = ['1-3', '4-5', '6-7', '8-9', '10+'];
      const maxCount = Math.max(...lengths.map(l => stats.wordLengths[l] || 0), 1);
      
      const distributionBars = lengths.map(len => {
        const count = stats.wordLengths[len] || 0;
        const height = Math.round((count / maxCount) * 80);
        return `
          <div class="chart-bar">
            <div class="chart-bar-fill" style="height: ${height}px;"></div>
            <div class="chart-bar-label">${len}</div>
            <div class="chart-bar-count">${count}</div>
          </div>
        `;
      }).join('');
      
      // Character frequency bubbles
      const colors = ['#FF6B35', '#E55A28', '#2C5F8D', '#5A9FD4', '#4CAF50', '#66BB6A', '#FFA726', '#FFB74D', '#8B5CF6', '#A78BFA'];
      const charBubbles = stats.topChars.map(([char, count], i) => {
        return `
          <div class="char-bubble" style="background: ${colors[i % colors.length]};" title="${char.toUpperCase()}: ${count} occurrences">
            ${char.toUpperCase()}
            <span class="freq">${count}</span>
          </div>
        `;
      }).join('');
      
      statsHTML = `
        <div class="stats-section">
          <h4>📊 Text Statistics</h4>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">${stats.words.toLocaleString()}</div>
              <div class="stat-label">Words</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.sentences.toLocaleString()}</div>
              <div class="stat-label">Sentences</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.paragraphs.toLocaleString()}</div>
              <div class="stat-label">Paragraphs</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.characters.toLocaleString()}</div>
              <div class="stat-label">Characters</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.charactersNoSpaces.toLocaleString()}</div>
              <div class="stat-label">No Spaces</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.avgWordLength}</div>
              <div class="stat-label">Avg Word Len</div>
            </div>
          </div>
          
          <div class="distribution-section">
            <h5>Word Length Distribution</h5>
            <div class="distribution-chart">
              ${distributionBars}
            </div>
          </div>
          
          <div class="distribution-section">
            <h5>Most Common Letters</h5>
            <div class="char-frequency">
              ${charBubbles}
            </div>
          </div>
          
          <div class="reading-info">
            <div class="reading-item">
              <div class="reading-icon">📖</div>
              <div class="reading-value">${formatTime(stats.readingTimeSeconds)}</div>
              <div class="reading-label">Reading Time</div>
            </div>
            <div class="reading-item">
              <div class="reading-icon">🎤</div>
              <div class="reading-value">${formatTime(stats.speakingTimeSeconds)}</div>
              <div class="reading-label">Speaking Time</div>
            </div>
          </div>
        </div>
      `;
    }
    
    // Format display text based on output type
    let displayHTML = '';
    if (state.outputType === 'list') {
      const items = generatedText.split('\n').map(item => {
        // Remove the number prefix for display
        return item.replace(/^\d+\.\s*/, '');
      });
      displayHTML = `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    } else if (state.outputType === 'paragraphs') {
      const paras = generatedText.split('\n\n');
      displayHTML = paras.map(p => `<p>${p}</p>`).join('');
    } else {
      displayHTML = `<p>${generatedText}</p>`;
    }
    
    // Escape HTML for raw view
    const escapedHtml = generatedHtml
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    const html = `
      <div class="result-header">
        <span class="style-badge">${getStyleLabel(state.textStyle)}</span>
        <h3>📝 Generated Text</h3>
      </div>
      
      <div class="text-view-toggle">
        <button type="button" class="view-toggle-btn ${currentView === 'preview' ? 'active' : ''}" onclick="setView('preview')">
          Preview
        </button>
        <button type="button" class="view-toggle-btn ${currentView === 'raw' ? 'active' : ''}" onclick="setView('raw')">
          ${state.includeHtml ? 'HTML Code' : 'Plain Text'}
        </button>
      </div>
      
      <div class="generated-text-container">
        <div class="generated-text" id="preview-view" style="${currentView !== 'preview' ? 'display: none;' : ''}">
          ${displayHTML}
        </div>
        <div class="raw-html-view" id="raw-view" style="${currentView !== 'raw' ? 'display: none;' : ''}">
          <pre>${escapedHtml}</pre>
        </div>
      </div>
      
      <div class="result-actions">
        <button type="button" class="action-btn copy-btn" onclick="copyText()">
          📋 Copy ${state.includeHtml ? 'HTML' : 'Text'}
        </button>
        <button type="button" class="action-btn regenerate-btn" onclick="regenerateText()">
          🔄 Regenerate
        </button>
      </div>
      
      ${statsHTML}
      
      <div class="info-box" style="margin-top: 2rem;">
        <h4>💡 Quick Copy Tip</h4>
        <p>
          The copied text ${state.includeHtml ? 'includes HTML markup' : 'is plain text'}. 
          Toggle "${state.includeHtml ? 'Include HTML Tags' : 'Include HTML Tags'}" option to change output format.
          All your settings are saved in the URL for easy sharing!
        </p>
      </div>
    `;
    
    elements.resultDiv.innerHTML = html;
    elements.resultDiv.classList.remove('hidden');
  }

  // Global functions for onclick handlers
  window.setView = function(view) {
    currentView = view;
    const previewEl = document.getElementById('preview-view');
    const rawEl = document.getElementById('raw-view');
    
    if (previewEl && rawEl) {
      previewEl.style.display = view === 'preview' ? '' : 'none';
      rawEl.style.display = view === 'raw' ? '' : 'none';
    }
    
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.toLowerCase().includes(view) || 
        (view === 'preview' && btn.textContent === 'Preview') ||
        (view === 'raw' && (btn.textContent.includes('HTML') || btn.textContent.includes('Plain'))));
    });
    
    // Re-apply active state properly
    document.querySelectorAll('.view-toggle-btn').forEach((btn, index) => {
      btn.classList.toggle('active', (index === 0 && view === 'preview') || (index === 1 && view === 'raw'));
    });
  };

  window.copyText = function() {
    const textToCopy = state.includeHtml ? generatedHtml : generatedText;
    copyToClipboard(textToCopy, document.querySelector('.copy-btn'));
  };

  window.regenerateText = function() {
    generateText(false);
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
    }, 1500);
  }

  function shareSettings() {
    const url = window.location.href;
    
    if (navigator.share && navigator.canShare && navigator.canShare({ url })) {
      navigator.share({
        title: 'Lorem Ipsum Generator Settings',
        text: 'Check out my Lorem Ipsum generator settings',
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
    currentView = 'preview';
    applyStateToForm();
    saveToURL();
    
    // Hide results
    if (elements.resultDiv) {
      elements.resultDiv.classList.add('hidden');
    }
    
    // Close advanced options if open
    if (elements.advancedOptions && !elements.advancedOptions.classList.contains('hidden')) {
      toggleAdvanced();
    }
  }

})();