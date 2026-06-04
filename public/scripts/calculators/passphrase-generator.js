// Passphrase Generator with URL State Management
(function() {
  'use strict';

  // Word lists (2000+ words each for common/extended, 500+ for themed)
  const WORD_LISTS = {
    common: [
      'able','acid','aged','also','area','army','away','baby','back','ball','band','bank','base','bath','bear','beat','been','beer','bell','belt','bend','best','bill','bird','bite','blow','blue','boat','body','bomb','bond','bone','book','born','boss','both','bowl','burn','bush','busy','call','calm','came','camp','card','care','case','cash','cast','cell','chat','chip','city','claim','class','clean','clear','climb','clock','close','cloth','cloud','club','coach','coast','code','cold','come','cook','cool','copy','core','cost','could','count','court','cover','crash','cream','crew','crime','cross','crowd','crown','curve','cycle','daily','dance','dark','data','date','dawn','dead','deal','dear','death','debt','deep','deer','demand','depth','desert','design','desire','desk','detail','device','devil','diet','dirt','dish','disk','dock','doctor','dog','door','doubt','down','draft','drain','drama','drawn','dream','dress','drink','drive','drop','drug','drum','dry','duck','dust','duty','each','earn','earth','east','easy','edge','eight','elder','elect','else','empty','enemy','enjoy','enter','entry','equal','error','even','event','every','exact','exam','exist','extra','face','fact','fail','fair','fall','false','fame','fan','farm','fast','fate','fault','fear','feast','feel','fence','fever','few','field','fight','file','fill','film','final','find','fine','fire','firm','fish','five','fix','flag','flame','flash','flat','flesh','flew','flies','flight','float','flood','floor','flow','flower','fly','fold','folk','follow','food','foot','force','forest','forget','fork','form','forth','found','four','frame','free','fresh','friend','front','frost','fruit','fuel','full','fun','fund','funny','gain','game','gang','garden','gas','gate','gave','gear','gene','ghost','giant','gift','girl','give','glad','glass','global','glove','goal','goes','gold','golf','gone','good','grab','grade','grain','grand','grant','grass','grave','great','green','grew','grey','grip','gross','ground','group','grow','grown','guard','guess','guest','guide','guilt','gun','habit','hair','half','hall','hand','hang','happen','happy','hard','harm','hat','hate','have','head','health','hear','heart','heat','heavy','heel','hello','help','here','hero','hide','high','hill','hire','hold','hole','holy','home','honey','hook','hope','horse','host','hotel','hour','house','huge','human','humor','hung','hunt','hurt','ice','idea','image','impact','income','indeed','index','indian','indicate','industry','inform','initial','injury','inner','input','insert','inside','intend','interest','iron','island','issue','item','itself','jacket','james','job','join','joint','joke','journey','joy','judge','juice','jump','junior','jury','just','justice','keen','keep','key','kick','kid','kill','kind','king','knee','knew','knife','knock','know','labor','lack','lady','lake','land','lane','large','last','late','latter','laugh','launch','lawn','layer','lead','leader','leaf','lean','learn','least','leave','left','legal','lemon','length','lesson','let','letter','level','library','lid','life','lift','light','like','limit','line','link','lip','list','listen','little','live','loan','local','lock','long','look','lord','lose','loss','lost','loud','love','lovely','lover','low','luck','lunch','lung','machine','magic','mail','main','major','make','male','mall','manage','manner','many','map','march','mark','market','marry','mask','mass','master','match','mate','matter','mayor','meal','mean','measure','meat','media','medium','meet','member','memory','mental','mention','mere','message','metal','method','middle','might','mile','milk','million','mind','mine','minor','minute','mirror','miss','mistake','mix','model','modern','mom','moment','money','month','mood','moon','moral','more','morning','most','mother','motion','motor','mount','mouse','mouth','move','movie','much','murder','muscle','museum','music','must','mutual','myself','nail','name','narrow','nation','native','natural','nature','near','neat','neck','need','nerve','network','never','news','next','nice','night','nine','noble','noise','none','nor','normal','north','nose','note','nothing','notice','novel','number','nurse','object','obtain','obvious','occur','ocean','odd','off','offend','offer','office','often','oil','okay','old','once','one','only','onto','open','operate','opinion','option','orange','order','organ','other','ought','outcome','output','outside','over','overall','owe','owner','pace','pack','page','paid','pain','paint','pair','palace','pale','palm','pan','panel','panic','paper','parent','park','part','partly','party','pass','past','path','patient','pattern','pause','pay','peace','peak','pen','penny','people','percent','perfect','perhaps','period','permit','person','phase','phone','photo','phrase','pick','picture','piece','pilot','pin','pink','pipe','pitch','place','plain','plan','plane','plant','plate','play','player','please','plenty','plus','pocket','poem','poet','point','pole','police','policy','pool','poor','pop','popular','port','pose','position','post','pot','potato','pound','pour','poverty','powder','power','prayer','present','press','pretty','prevent','price','pride','priest','primary','prince','print','prior','prison','private','prize','problem','proceed','process','produce','product','program','project','promise','proper','protect','prove','provide','public','pull','punch','pupil','pure','purple','purpose','push','queen','question','quick','quiet','quite','quote','race','radio','rain','raise','range','rank','rapid','rare','rate','rather','reach','react','read','ready','real','reality','realize','really','reason','recall','receive','record','red','reduce','reflect','reform','regard','region','regular','reject','relate','release','relief','rely','remain','remember','remind','remote','remove','repeat','replace','reply','report','request','require','reserve','resolve','resource','respond','rest','restore','result','retain','retire','return','reveal','review','rich','ride','right','ring','rise','risk','river','road','rock','role','roll','roof','room','root','rope','rose','rough','round','route','row','royal','rule','run','rush','safe','sail','sake','salary','sale','salt','same','sand','save','scale','scene','school','science','score','screen','sea','search','season','seat','second','secret','section','secure','seed','seek','seem','select','self','sell','send','senior','sense','sentence','separate','serious','servant','serve','session','set','settle','seven','severe','shade','shadow','shake','shall','shame','shape','share','sharp','shed','sheer','sheet','shelf','shell','shelter','shift','shine','ship','shirt','shock','shoe','shoot','shop','shore','short','shot','should','shoulder','shout','show','shut','sick','side','sight','sign','signal','silence','silly','silver','similar','simple','since','sing','single','sister','site','size','skill','skin','sky','slave','sleep','slide','slight','slip','slow','small','smart','smell','smile','smoke','smooth','snow','social','soft','soil','solar','soldier','solid','solution','some','son','song','soon','sorry','sort','soul','sound','source','south','space','spare','speak','special','speech','speed','spend','spin','spirit','split','sport','spot','spread','spring','square','stable','staff','stage','stair','stake','stand','standard','star','start','state','station','status','stay','steal','steam','steel','stem','step','stick','still','stock','stomach','stone','stop','store','storm','story','straight','strange','strategy','stream','street','strength','stress','stretch','strike','string','strip','stroke','strong','struggle','student','studio','study','stuff','stupid','subject','succeed','such','sudden','suffer','sugar','suggest','suit','summer','sun','supply','support','sure','surface','surprise','survive','suspect','sweet','swim','swing','switch','symbol','sympathy','system','table','tail','take','tale','talk','tall','tank','tape','target','task','taste','tax','teach','team','tear','technical','tell','temperature','ten','tend','tennis','term','terrible','test','text','thank','theme','theory','there','thick','thin','thing','think','third','thirty','this','though','thought','threat','three','throat','through','throw','thus','ticket','tide','tie','tight','till','time','tiny','title','today','toe','together','tomorrow','tone','tongue','tonight','tool','tooth','top','topic','total','touch','tough','tour','toward','tower','town','track','trade','tradition','traffic','train','transfer','travel','treat','tree','trend','trial','trick','trip','troop','trouble','truck','true','truly','trust','truth','turn','twice','twin','type','typical','ugly','ultimate','uncle','under','union','unique','unit','unite','universe','until','upper','upon','urban','urge','used','useful','user','usual','valley','value','variety','vast','version','very','victim','victory','video','view','village','violence','virtue','vision','visit','vital','voice','volume','vote','wage','wait','wake','walk','wall','want','ward','warm','warn','wash','waste','watch','water','wave','way','weak','wealth','weapon','wear','weather','week','weight','welcome','well','west','western','what','wheel','when','where','which','while','whisper','white','whole','whom','wide','wife','wild','will','win','wind','window','wine','wing','winner','winter','wire','wise','wish','with','woman','wonder','wood','word','work','worker','world','worry','worth','would','wound','wrap','write','writer','wrong','yard','yeah','year','yellow','yesterday','yet','yield','young','yours','youth','zone'
    ],
    extended: [
      'abandon','ability','absorb','abstract','absurd','abuse','access','accident','account','accuse','achieve','acquire','across','action','active','actor','actual','adapt','address','adjust','admit','adopt','adult','advance','advice','aerobic','affair','afford','afraid','again','agent','agree','ahead','aim','airport','aisle','alarm','album','alcohol','alert','alien','alley','allow','almost','alone','alpha','already','alter','always','amateur','amazing','among','amount','amused','analyst','anchor','ancient','anger','angle','angry','animal','ankle','announce','annual','another','answer','antenna','antique','anxiety','apart','apology','appear','apple','approve','april','arch','arctic','arena','argue','armed','armor','arrange','arrest','arrive','arrow','arson','art','artist','artwork','aspect','assault','asset','assist','assume','asthma','athlete','atom','attack','attend','attract','auction','audit','august','aunt','author','auto','autumn','avocado','avoid','awake','aware','awesome','awful','awkward','axis','bacon','badge','bag','balance','balcony','banana','banner','bar','barely','bargain','barrel','basic','basket','battle','beach','bean','beauty','become','beef','before','begin','behave','believe','bell','below','bench','benefit','berry','between','beyond','bicycle','bid','billion','biopsy','blanket','blast','bleak','bless','blind','blood','blossom','board','boil','bonus','border','bottom','bounce','box','boy','bracket','brain','brand','brass','brave','bread','breeze','brick','bridge','brief','bright','bring','broad','broken','bronze','broom','brother','brown','brush','bubble','buddy','budget','buffalo','build','bulb','bulk','bullet','bundle','bunny','burden','burger','burst','butter','buyer','cabin','cable','cactus','cage','cake','camera','campus','canal','cancel','candle','cannon','canvas','canyon','capable','capital','captain','carbon','cargo','carpet','carry','cartoon','casual','catalog','catch','category','cattle','caught','cause','caution','cave','ceiling','celery','cement','census','century','cereal','certain','chain','chair','chalk','champion','change','chaos','chapter','charge','charity','charm','chart','chase','cheap','check','cheese','chef','cherry','chest','chicken','chief','child','chimney','choice','choose','chunk','churn','cigar','cinnamon','circle','citizen','civil','claim','clap','clarify','claw','clay','clerk','clever','cliff','clinic','clip','cloak','closet','cluster','clutch','coal','cobra','coconut','coffee','coil','collect','color','column','combine','comfort','comic','common','company','concert','conduct','confirm','congress','connect','consider','control','convince','copper','coral','corner','correct','cotton','couch','country','couple','courage','cousin','coyote','cradle','craft','crane','crater','crawl','crazy','credit','creek','cricket','cruel','crumble','crush','crystal','cube','culture','cup','cupboard','curious','current','curtain','cushion','custom','cute','damage','damp','danger','daring','dash','daughter','dawn','debate','decade','december','decide','decline','decorate','decrease','defense','define','defy','degree','delay','deliver','deny','depart','depend','deposit','derive','describe','destroy','develop','devote','diagram','dial','diamond','diary','dice','diesel','differ','digital','dignity','dilemma','dinner','dinosaur','direct','disease','dismiss','disorder','display','distance','divert','divide','divorce','dizzy','dolphin','domain','donate','donkey','donor','dose','double','dove','dragon','drastic','draw','drift','drill','dune','during','dwarf','dynamic','eager','eagle','early','easily','echo','ecology','economy','educate','effort','either','elbow','elegant','element','elephant','elevator','elite','embrace','emerge','emotion','employ','empower','enable','endless','endorse','enforce','engage','engine','enhance','enough','enrich','enroll','ensure','entire','envelope','episode','equip','erase','erode','erosion','escape','essay','essence','estate','eternal','evidence','evil','evolve','example','excess','exchange','excite','exclude','excuse','execute','exercise','exhaust','exhibit','exile','expect','expense','expire','explain','expose','express','extend','eyebrow','fabric','faculty','fading','faint','faith','family','famous','fancy','fantasy','fashion','father','fatigue','favorite','feature','february','federal','fee','female','festival','fetch','fiction','figure','filter','finger','finish','fiscal','fitness','fixed','flag','flavor','flip','float','flock','floor','fluid','flush','foam','focus','follow','forbid','fortune','forum','forward','fossil','foster','found','fox','fragile','frame','frequent','friday','fringe','frog','frozen','frozen','frown','fruit','fry','function','furnace','fury','future','gadget','galaxy','gallery','garage','garbage','garlic','garment','gather','gauge','gaze','general','genius','genre','gentle','genuine','gesture','giggle','ginger','giraffe','glad','glance','glare','glimpse','globe','gloom','glory','glue','goat','goddess','going','golden','gorilla','gospel','gossip','govern','gown','grace','gradient','graduate','grape','gravity','great','grid','grief','grit','grocery','group','guitar','guru','gym','gypsy','half','hammer','hamster','harbor','harvest','hawk','hazard','health','heavy','hedgehog','height','helmet','hence','hero','hidden','highway','hint','hobby','hollow','homework','honest','hood','hope','horror','hospital','hotel','hover','humble','hundred','hungry','hurdle','hybrid','identify','ignore','illegal','illness','image','imitate','immune','improve','impulse','inch','include','income','increase','indicate','indoor','infant','inflict','initial','inmate','innocent','input','inquiry','insane','insect','install','intact','invite','involve','island','isolate','ivory','jacket','jaguar','january','jazz','jeans','jelly','jewel','joint','joke','journey','judge','juice','jungle','junior','junk','justify','kangaroo','keen','kernel','kettle','kidney','kingdom','kitchen','kitten','knee','knife','label','ladder','lamp','language','laptop','large','later','latin','lawn','leader','legend','leisure','lemon','length','lens','leopard','lesson','letter','level','liberty','library','license','life','light','likely','limb','limit','linen','lion','liquid','little','lizard','lobster','local','logic','lonely','lottery','louder','loyal','lumber','lunar','luxury','lyrics','magnet','maid','mammal','manage','mandate','mango','mansion','manual','maple','marble','marine','master','material','math','matrix','maximum','meadow','mechanic','media','melody','member','memory','mention','mentor','mercy','merge','merit','merry','mesh','method','midnight','million','mimic','minimum','miracle','mirror','misery','mission','mistake','mixture','mobile','model','modify','moisture','moment','monitor','monkey','monster','month','moral','mosquito','motion','mountain','mouse','muffin','mule','multiply','mundane','mutual','mystery','myth','naive','napkin','narrow','nasty','nature','nearby','negative','neglect','neither','nephew','nerve','nest','network','neutral','never','noble','noise','nominee','noodle','notable','nothing','novel','nuclear','number','nurse','obtain','obvious','october','odor','often','olive','olympic','omit','online','opinion','oppose','option','orbit','orchard','order','ordinary','orient','original','orphan','ostrich','outdoor','outer','output','outside','oval','oxygen','oyster','ozone','pact','paddle','page','palace','panda','panel','pant','panther','paper','parade','parent','patch','path','patient','patrol','pattern','pause','pave','payment','peace','peanut','peasant','pelican','penalty','pencil','pepper','perfect','permit','person','pet','phone','phrase','physical','piano','picnic','picture','piece','pig','pigeon','pilot','pioneer','pistol','pizza','planet','plaster','plate','play','pledge','pluck','plug','plunge','poem','poet','polar','poncho','popular','portion','position','possible','potato','pottery','poverty','powder','practice','praise','predict','prefer','prepare','present','pretty','prevent','primary','priority','prison','problem','process','produce','profit','program','promote','proof','property','prosper','protect','proud','provide','public','pudding','pulse','pumpkin','punch','pupil','puppy','purchase','purity','purpose','puzzle','pyramid','quality','quantum','quarter','question','quick','quote','rabbit','raccoon','radar','radio','ramp','ranch','random','rapid','rather','raven','razor','ready','reason','rebel','rebuild','recall','receive','recipe','recycle','reduce','reflect','reform','region','regret','regular','reject','relax','release','relief','rely','remain','remember','remind','remove','render','renew','repair','repeat','replace','report','require','rescue','resemble','resist','resource','response','result','retire','retreat','return','reunion','reveal','review','reward','rhythm','ribbon','rifle','rigid','ring','riot','ripple','ritual','rival','river','road','robust','rocket','romance','rotate','rough','round','route','royal','rubber','rude','runway','rural','saddle','sadness','safari','salad','salmon','salon','sample','satisfy','sausage','scale','scatter','scheme','school','scissors','scorpion','scout','scrap','screen','script','search','season','second','secret','security','segment','select','seminar','senior','sentence','series','session','settle','setup','seven','shadow','shaft','shallow','sheriff','shield','shift','ship','shoulder','shrimp','sibling','siege','sight','silent','silly','silver','similar','simple','since','siren','sister','situate','skill','slender','slice','slogan','slot','slush','small','smart','smile','smooth','snack','snake','snap','sniff','soldier','solution','someone','somewhat','soon','sorry','sound','south','space','spatial','spawn','special','sphere','spice','spider','spike','spiral','spirit','sponsor','spoon','sport','spray','spread','spring','squeeze','squirrel','stable','stadium','staff','stagger','stair','stamp','stand','start','state','steak','steel','stem','step','stereo','stick','still','sting','stock','stone','story','strategy','street','strike','strong','struggle','student','stuff','stumble','style','subject','submit','subway','success','such','sudden','sugar','suggest','summer','sunday','sunset','super','supply','supreme','sure','surface','surge','surprise','surround','survey','suspect','sustain','swallow','swamp','swap','swear','sweet','swift','swim','switch','sword','symbol','symptom','syrup','system','table','tackle','talent','tank','target','teach','team','tell','tenant','tennis','tent','term','test','text','thank','that','theme','theory','therapy','there','thigh','thing','this','thought','three','thrive','throw','thumb','thunder','ticket','tidy','tiger','timber','time','tiny','tired','tissue','title','toast','tobacco','today','toddler','together','toilet','token','tomato','tomorrow','tongue','topic','topple','torch','tornado','tortoise','total','tourist','toward','tower','town','trade','traffic','tragic','train','transfer','trap','trash','travel','tray','treat','trend','trial','tribe','trick','trigger','trim','trophy','trouble','truck','truly','trumpet','trust','tumble','tunnel','turkey','turn','turtle','twelve','twenty','typical','ugly','umbrella','unable','unaware','uncle','uncover','under','unfair','unfold','unhappy','uniform','unique','unit','universe','unknown','unlock','until','unusual','unveil','update','upgrade','uphold','upon','upper','upset','urban','usage','useful','useless','usual','utility','vacant','vacuum','vague','valid','valley','valve','vanish','vapor','various','vault','vehicle','velvet','vendor','venture','verify','version','vessel','veteran','viable','vibrant','vicious','victory','video','village','vintage','violin','virtual','virus','visa','visit','visual','vital','vivid','vocal','voice','volcano','volume','voyage','waist','wallet','walnut','wander','warfare','warrior','wash','wasp','waste','water','weapon','weather','web','wedding','weekend','welcome','west','whale','wheat','wheel','whisper','width','wife','window','wine','wing','winter','wire','wisdom','within','witness','wolf','woman','wonder','wood','wool','world','worry','worth','wrap','wrestle','wrist','wrong','yarn','yellow','yoga','young','youth','zebra','zero','zombie','zone'
    ],
    nature: [
      'acorn','alder','algae','alpine','amber','ant','antler','apex','ash','aspen','aurora','autumn','avalanche','badger','bamboo','bark','basalt','basin','bass','bay','beach','bear','beaver','beech','beetle','berry','birch','bison','bloom','blossom','bluff','boar','bog','boulder','branch','breeze','brook','brush','buffalo','bulb','bunny','burrow','bush','butterfly','buzzard','cactus','canyon','caribou','cascade','cave','cedar','chameleon','cheetah','cherry','chestnut','chipmunk','clay','cliff','cloud','coast','cobra','cocoon','condor','cone','coral','cougar','coyote','crab','crane','crater','creek','cricket','crystal','current','cypress','daisy','dam','dawn','deer','delta','desert','dew','dingo','dolphin','dove','dragon','dragonfly','drift','dune','eagle','earth','ebb','echo','eclipse','eel','egret','elk','elm','ember','emerald','estuary','falcon','fawn','fern','field','finch','fir','firefly','fjord','flame','flamingo','flint','flood','flora','flower','fog','forest','fossil','fox','frog','frost','gale','garden','garnet','gecko','geode','geyser','glacier','glen','gorge','granite','grass','gravel','grove','gull','hail','harbor','hare','harvest','hawk','hazel','heath','hedge','heron','hill','hollow','honey','horizon','hornet','hound','hurricane','hyena','ibis','iceberg','iguana','inlet','iris','island','ivy','jackal','jade','jaguar','jasmine','jay','jungle','juniper','kelp','kestrel','kingfisher','knoll','koala','lagoon','lake','lark','lava','leaf','leopard','lichen','lily','limestone','lion','lizard','llama','lobster','locust','lotus','lunar','lynx','magpie','mangrove','mantis','maple','marsh','meadow','mesa','meteor','mink','mist','monsoon','moose','moss','moth','mountain','mouse','mushroom','muskrat','narwhal','nectar','nettle','newt','nightingale','north','oak','oasis','ocean','octopus','olive','opal','orbit','orchid','osprey','otter','owl','oyster','palm','panther','parrot','pasture','path','pebble','pelican','petal','phoenix','pine','plain','planet','plankton','plateau','plum','polar','pond','poplar','porcupine','prairie','prism','puma','quail','quartz','rabbit','rain','rainbow','rapid','raven','ravine','reef','ridge','river','robin','rock','root','rose','sage','salmon','sand','sandstone','savanna','sea','seal','sequoia','shark','shell','shore','shrew','shrub','sierra','silver','slate','sloth','snail','snake','snow','soil','solar','sparrow','spider','sprout','spruce','squid','squirrel','stag','star','starfish','steam','stone','stork','storm','stream','summit','sun','sunflower','sunset','surf','swallow','swamp','swan','swift','sycamore','talon','tamarack','teal','tempest','tern','thicket','thistle','thorn','thrush','thunder','tide','tiger','timber','toad','topaz','tornado','tortoise','trail','trout','tulip','tundra','turtle','tusk','valley','vapor','vine','violet','viper','volcano','vulture','walnut','walrus','wander','warbler','waterfall','wave','weasel','whale','wheat','whirl','wildcat','willow','wind','wolf','wombat','wood','wren','yak','yarrow','yew','zebra','zephyr','zinnia'
    ],
    tech: [
      'algorithm','analog','anchor','android','animate','antivirus','apache','api','app','archive','array','ascii','async','atom','audio','automate','avatar','backup','bandwidth','bash','batch','beacon','binary','bitcoin','bit','blade','blockchain','blog','bluetooth','boot','bot','branch','breadcrumb','bridge','browser','buffer','bug','build','bundle','bus','byte','cache','callback','canvas','captcha','cascade','channel','chat','chip','cipher','circuit','class','click','client','clone','cloud','cluster','cobol','code','codec','coder','compile','compress','compute','config','connect','console','container','cookie','core','crash','crawl','crypto','cursor','cyber','daemon','dashboard','data','database','debug','decode','decrypt','default','deploy','desktop','device','devops','digital','disk','display','docker','domain','download','driver','drone','dump','dynamic','edge','email','embed','emoji','emit','emulate','encode','encrypt','endpoint','engine','entity','enum','epoch','error','ethernet','event','execute','export','extract','factory','fetch','fiber','field','file','filter','firewall','firmware','flag','flash','flask','float','folder','font','fork','format','forum','frame','frontend','fullstack','function','gateway','generate','ghost','gigabyte','git','glitch','global','gpu','graph','grid','group','gui','hack','handle','hardware','hash','header','heap','host','html','http','hub','hybrid','icon','import','index','infra','inject','input','install','instance','integer','intel','interface','internet','invoke','iterate','java','javascript','join','json','kernel','key','keyboard','keyword','lambda','laptop','laser','latency','launch','layer','layout','legacy','library','link','linux','listen','load','local','lock','log','logic','login','loop','macro','malware','map','markup','matrix','megabyte','memory','merge','mesh','message','meta','method','micro','migrate','mobile','mock','modem','module','monitor','mouse','mutex','nano','navigate','nest','network','neural','nginx','node','null','object','offline','online','opcode','open','optimize','oracle','orbit','output','overflow','package','packet','page','panel','parse','pascal','password','paste','patch','path','payload','peer','perl','permit','php','ping','pipeline','pixel','platform','plugin','pointer','poll','port','portal','post','prefix','print','private','process','profile','program','prompt','property','protocol','proxy','public','pull','push','python','quantum','query','queue','radio','rails','random','react','readme','reboot','record','recurse','redis','reduce','refactor','regex','register','relay','release','reload','remote','render','repo','request','resolve','respond','restore','return','reverse','robot','rollback','root','rotate','router','ruby','runtime','rust','sass','scalar','scale','scan','schema','scope','screen','script','scroll','sdk','search','secure','seed','select','sensor','sequel','serial','server','session','shader','shell','signal','silicon','site','slack','sleep','slice','slot','smart','snippet','socket','software','solid','sort','source','spark','spawn','split','sprint','sql','stack','startup','state','static','status','storage','store','stream','string','struct','style','submit','subnet','sudo','support','surge','suspend','swap','switch','symbol','sync','syntax','system','table','tablet','tag','target','task','tcp','template','tensor','terminal','terraform','test','text','thread','throttle','timer','token','toolbar','topic','trace','track','traffic','transfer','transit','tree','trigger','trojan','trunk','tunnel','turbo','type','ubuntu','undo','unicode','unit','unix','update','upgrade','upload','uptime','usb','user','utility','vagrant','validate','vanilla','variable','vector','vendor','verify','version','vertex','virtual','virus','visual','volume','vpn','vulcan','wasm','watch','web','webhook','webpack','widget','wifi','wiki','window','wire','wizard','workflow','worm','wrapper','write','xml','yaml','zero','zip','zombie','zone'
    ]
  };

  const SYMBOLS = '!@#$%^&*';

  // Default values
  const DEFAULTS = {
    wordCount: 4,
    wordlist: 'common',
    separator: '-',
    capitalize: 'first',
    wordLength: 'medium',
    addNumber: 'none',
    addSymbol: 'none',
    count: 1
  };

  // State
  let state = { ...DEFAULTS };
  let generatedPassphrases = [];

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
      console.error('Passphrase Generator: Generate button not found');
      return;
    }

    loadFromURL();
    attachEventListeners();
    updateWordCountDisplay();
  }

  function cacheElements() {
    elements = {
      form: document.getElementById('passphrase-generator-form'),
      generateBtn: document.getElementById('generate-btn'),
      resultDiv: document.getElementById('passphrase-generator-result'),
      wordCountSlider: document.getElementById('word-count-slider'),
      wordCountDisplay: document.getElementById('word-count-display'),
      capitalizeOption: document.getElementById('capitalize-option'),
      wordLengthFilter: document.getElementById('word-length-filter'),
      addNumber: document.getElementById('add-number'),
      addSymbol: document.getElementById('add-symbol'),
      passphraseCount: document.getElementById('passphrase-count'),
      customSepGroup: document.getElementById('custom-sep-group'),
      customSeparator: document.getElementById('custom-separator')
    };
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('words')) {
      const w = parseInt(params.get('words'));
      if (w >= 3 && w <= 8) state.wordCount = w;
    }
    if (params.has('list')) {
      const list = params.get('list');
      if (['common', 'extended', 'nature', 'tech'].includes(list)) state.wordlist = list;
    }
    if (params.has('sep')) state.separator = decodeURIComponent(params.get('sep'));
    if (params.has('cap')) {
      const cap = params.get('cap');
      if (['none', 'first', 'random', 'all'].includes(cap)) state.capitalize = cap;
    }
    if (params.has('wlen')) {
      const wlen = params.get('wlen');
      if (['any', 'short', 'medium', 'long'].includes(wlen)) state.wordLength = wlen;
    }
    if (params.has('num')) {
      const num = params.get('num');
      if (['none', 'end', 'between', 'random'].includes(num)) state.addNumber = num;
    }
    if (params.has('sym')) {
      const sym = params.get('sym');
      if (['none', 'end', 'between', 'random'].includes(sym)) state.addSymbol = sym;
    }
    if (params.has('count')) {
      const c = parseInt(params.get('count'));
      if ([1, 3, 5, 10].includes(c)) state.count = c;
    }

    applyStateToForm();
  }

  function applyStateToForm() {
    if (elements.wordCountSlider) elements.wordCountSlider.value = state.wordCount;
    if (elements.capitalizeOption) elements.capitalizeOption.value = state.capitalize;
    if (elements.wordLengthFilter) elements.wordLengthFilter.value = state.wordLength;
    if (elements.addNumber) elements.addNumber.value = state.addNumber;
    if (elements.addSymbol) elements.addSymbol.value = state.addSymbol;
    if (elements.passphraseCount) elements.passphraseCount.value = state.count;

    // Wordlist radio
    const wlRadio = document.querySelector(`input[name="wordlist"][value="${state.wordlist}"]`);
    if (wlRadio) wlRadio.checked = true;

    // Separator buttons
    const standardSeps = [' ', '-', '.', '_', ''];
    const isStandard = standardSeps.includes(state.separator);
    document.querySelectorAll('.sep-btn').forEach(btn => {
      const sep = btn.dataset.sep;
      if (sep === 'custom') {
        btn.classList.toggle('active', !isStandard);
      } else {
        btn.classList.toggle('active', sep === state.separator && isStandard);
      }
    });

    if (!isStandard && elements.customSepGroup) {
      elements.customSepGroup.classList.remove('hidden');
      if (elements.customSeparator) elements.customSeparator.value = state.separator;
    }

    updateWordCountDisplay();
  }

  function saveToURL() {
    const params = new URLSearchParams();

    if (state.wordCount !== DEFAULTS.wordCount) params.set('words', state.wordCount);
    if (state.wordlist !== DEFAULTS.wordlist) params.set('list', state.wordlist);
    if (state.separator !== DEFAULTS.separator) params.set('sep', encodeURIComponent(state.separator));
    if (state.capitalize !== DEFAULTS.capitalize) params.set('cap', state.capitalize);
    if (state.wordLength !== DEFAULTS.wordLength) params.set('wlen', state.wordLength);
    if (state.addNumber !== DEFAULTS.addNumber) params.set('num', state.addNumber);
    if (state.addSymbol !== DEFAULTS.addSymbol) params.set('sym', state.addSymbol);
    if (state.count !== DEFAULTS.count) params.set('count', state.count);

    const newURL = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  }

  function attachEventListeners() {
    // Generate button
    elements.generateBtn.addEventListener('click', () => {
      generatePassphrases();
      if (elements.resultDiv) {
        elements.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Word count slider
    if (elements.wordCountSlider) {
      elements.wordCountSlider.addEventListener('input', (e) => {
        state.wordCount = parseInt(e.target.value);
        updateWordCountDisplay();
        saveToURL();
      });
    }

    // Wordlist radio
    document.querySelectorAll('input[name="wordlist"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.wordlist = e.target.value;
        saveToURL();
      });
    });

    // Separator buttons
    document.querySelectorAll('.sep-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sep = e.target.dataset.sep;
        document.querySelectorAll('.sep-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        if (sep === 'custom') {
          elements.customSepGroup.classList.remove('hidden');
          state.separator = elements.customSeparator?.value || '~';
        } else {
          elements.customSepGroup.classList.add('hidden');
          state.separator = sep;
        }
        saveToURL();
      });
    });

    // Custom separator input
    if (elements.customSeparator) {
      elements.customSeparator.addEventListener('input', (e) => {
        state.separator = e.target.value;
        saveToURL();
      });
    }

    // Select inputs
    const selects = [
      { el: elements.capitalizeOption, key: 'capitalize' },
      { el: elements.wordLengthFilter, key: 'wordLength' },
      { el: elements.addNumber, key: 'addNumber' },
      { el: elements.addSymbol, key: 'addSymbol' }
    ];

    selects.forEach(({ el, key }) => {
      if (el) {
        el.addEventListener('change', (e) => {
          state[key] = e.target.value;
          saveToURL();
        });
      }
    });

    // Passphrase count
    if (elements.passphraseCount) {
      elements.passphraseCount.addEventListener('change', (e) => {
        state.count = parseInt(e.target.value);
        saveToURL();
      });
    }

    // Enter key
    document.querySelectorAll('#passphrase-generator-form input, #passphrase-generator-form select').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          generatePassphrases();
        }
      });
    });
  }

  function updateWordCountDisplay() {
    if (elements.wordCountDisplay) {
      elements.wordCountDisplay.textContent = state.wordCount;
    }
  }

  function getSecureRandom(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }

  function getFilteredWordList() {
    let words = WORD_LISTS[state.wordlist] || WORD_LISTS.common;

    // Apply word length filter
    switch (state.wordLength) {
      case 'short':
        words = words.filter(w => w.length >= 3 && w.length <= 5);
        break;
      case 'medium':
        words = words.filter(w => w.length >= 4 && w.length <= 7);
        break;
      case 'long':
        words = words.filter(w => w.length >= 6 && w.length <= 10);
        break;
      // 'any' = no filter
    }

    // Ensure we have enough words
    if (words.length < 100) {
      words = WORD_LISTS[state.wordlist] || WORD_LISTS.common;
    }

    return words;
  }

  function generateSinglePassphrase() {
    const words = getFilteredWordList();
    let selectedWords = [];

    for (let i = 0; i < state.wordCount; i++) {
      const index = getSecureRandom(words.length);
      selectedWords.push(words[index]);
    }

    // Apply capitalization
    switch (state.capitalize) {
      case 'first':
        selectedWords = selectedWords.map(w => w.charAt(0).toUpperCase() + w.slice(1));
        break;
      case 'random':
        const randomIdx = getSecureRandom(selectedWords.length);
        selectedWords[randomIdx] = selectedWords[randomIdx].toUpperCase();
        break;
      case 'all':
        selectedWords = selectedWords.map(w => w.toUpperCase());
        break;
      // 'none' = keep lowercase
    }

    // Build passphrase with separator
    let parts = [...selectedWords];

    // Add number
    if (state.addNumber !== 'none') {
      const num = getSecureRandom(100).toString();
      switch (state.addNumber) {
        case 'end':
          parts.push(num);
          break;
        case 'between':
          const numPos = getSecureRandom(parts.length - 1) + 1;
          parts.splice(numPos, 0, num);
          break;
        case 'random':
          const rPos = getSecureRandom(parts.length + 1);
          parts.splice(rPos, 0, num);
          break;
      }
    }

    // Add symbol
    if (state.addSymbol !== 'none') {
      const sym = SYMBOLS[getSecureRandom(SYMBOLS.length)];
      switch (state.addSymbol) {
        case 'end':
          parts.push(sym);
          break;
        case 'between':
          const symPos = getSecureRandom(parts.length - 1) + 1;
          parts.splice(symPos, 0, sym);
          break;
        case 'random':
          const rPos = getSecureRandom(parts.length + 1);
          parts.splice(rPos, 0, sym);
          break;
      }
    }

    return parts.join(state.separator);
  }

  function generatePassphrases() {
    generatedPassphrases = [];

    for (let i = 0; i < state.count; i++) {
      generatedPassphrases.push(generateSinglePassphrase());
    }

    displayResults();
    saveToURL();
  }

  function calculateEntropy() {
    const words = getFilteredWordList();
    const wordListSize = words.length;

    // Base entropy from word selection
    let entropy = state.wordCount * Math.log2(wordListSize);

    // Additional entropy from number
    if (state.addNumber !== 'none') {
      entropy += Math.log2(100); // 0-99
      if (state.addNumber === 'between' || state.addNumber === 'random') {
        entropy += Math.log2(state.wordCount + 1); // position
      }
    }

    // Additional entropy from symbol
    if (state.addSymbol !== 'none') {
      entropy += Math.log2(SYMBOLS.length);
      if (state.addSymbol === 'between' || state.addSymbol === 'random') {
        entropy += Math.log2(state.wordCount + 1); // position
      }
    }

    return entropy;
  }

  function estimateCrackTime(entropy) {
    // 10 billion guesses/sec
    const guessesPerSecond = 10e9;
    const totalCombinations = Math.pow(2, entropy);
    const seconds = totalCombinations / guessesPerSecond / 2;

    if (seconds < 1) return 'Instantly';
    if (seconds < 60) return Math.round(seconds) + ' seconds';
    if (seconds < 3600) return Math.round(seconds / 60) + ' minutes';
    if (seconds < 86400) return Math.round(seconds / 3600) + ' hours';
    if (seconds < 31536000) return Math.round(seconds / 86400) + ' days';
    if (seconds < 31536000 * 1000) return Math.round(seconds / 31536000).toLocaleString() + ' years';
    if (seconds < 31536000 * 1e6) return Math.round(seconds / 31536000 / 1000).toLocaleString() + ' thousand years';
    if (seconds < 31536000 * 1e9) return Math.round(seconds / 31536000 / 1e6).toLocaleString() + ' million years';
    if (seconds < 31536000 * 1e12) return Math.round(seconds / 31536000 / 1e9).toLocaleString() + ' billion years';
    return 'Longer than the universe';
  }

  function getStrengthInfo(entropy) {
    if (entropy < 30) return { label: 'Weak', color: '#EF4444', percentage: 20 };
    if (entropy < 45) return { label: 'Fair', color: '#F59E0B', percentage: 35 };
    if (entropy < 60) return { label: 'Good', color: '#EAB308', percentage: 55 };
    if (entropy < 80) return { label: 'Strong', color: '#22C55E', percentage: 75 };
    if (entropy < 100) return { label: 'Very Strong', color: '#16A34A', percentage: 90 };
    return { label: 'Excellent', color: '#059669', percentage: 100 };
  }

  function generateEquivalentPassword(entropy) {
    // Generate a random password with similar entropy
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const charEntropy = Math.log2(chars.length); // ~6.1 bits per char
    const length = Math.ceil(entropy / charEntropy);

    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars[getSecureRandom(chars.length)];
    }
    return password;
  }

  function displayResults() {
    if (!elements.resultDiv || generatedPassphrases.length === 0) return;

    const primary = generatedPassphrases[0];
    const entropy = calculateEntropy();
    const strength = getStrengthInfo(entropy);
    const crackTime = estimateCrackTime(entropy);
    const equivalentPwd = generateEquivalentPassword(entropy);
    const words = getFilteredWordList();

    const html = `
      <div class="passphrase-terminal">
        <div class="passphrase-primary" id="primary-passphrase">${escapeHtml(primary)}</div>
        <div class="passphrase-actions">
          <button type="button" class="passphrase-action-btn copy" id="copy-passphrase-btn">
            Copy Passphrase
          </button>
          <button type="button" class="passphrase-action-btn regenerate" id="regenerate-btn">
            Regenerate
          </button>
        </div>
      </div>

      <div class="passphrase-strength">
        <h4>Strength Analysis</h4>
        <div class="entropy-display">
          <div class="entropy-bar-bg">
            <div class="entropy-bar-fill" style="width: ${strength.percentage}%; background: ${strength.color};"></div>
          </div>
          <span class="entropy-label" style="color: ${strength.color};">${strength.label}</span>
        </div>
        <div class="strength-stats">
          <div class="strength-stat">
            <span class="strength-stat-value">${entropy.toFixed(1)}</span>
            <span class="strength-stat-label">Bits of Entropy</span>
          </div>
          <div class="strength-stat">
            <span class="strength-stat-value">${primary.length}</span>
            <span class="strength-stat-label">Characters</span>
          </div>
          <div class="strength-stat">
            <span class="strength-stat-value">${words.length.toLocaleString()}</span>
            <span class="strength-stat-label">Word List Size</span>
          </div>
          <div class="strength-stat">
            <span class="strength-stat-value">${state.wordCount}</span>
            <span class="strength-stat-label">Words Used</span>
          </div>
        </div>
      </div>

      <div class="crack-time-display">
        <h4>Estimated Time to Crack</h4>
        <div class="crack-time-value">${crackTime}</div>
        <div class="crack-time-note">Based on 10 billion guesses per second (offline attack)</div>
      </div>

      <div class="comparison-section">
        <h4>Passphrase vs Equivalent Random Password</h4>
        <div class="comparison-items">
          <div class="comparison-item">
            <span class="comparison-item-label">Your Passphrase</span>
            <span class="comparison-item-value">${escapeHtml(primary)}</span>
            <span class="comparison-item-entropy">${entropy.toFixed(1)} bits entropy | ${primary.length} chars</span>
          </div>
          <div class="comparison-item">
            <span class="comparison-item-label">Equivalent Password</span>
            <span class="comparison-item-value">${escapeHtml(equivalentPwd)}</span>
            <span class="comparison-item-entropy">~${entropy.toFixed(0)} bits entropy | ${equivalentPwd.length} chars</span>
          </div>
        </div>
      </div>

      ${generatedPassphrases.length > 1 ? `
        <div class="passphrase-list">
          <h4>All Generated Passphrases (${generatedPassphrases.length})</h4>
          ${generatedPassphrases.map((pp, i) => `
            <div class="passphrase-list-item">
              <span class="passphrase-list-text">${escapeHtml(pp)}</span>
              <button type="button" class="passphrase-list-copy" data-passphrase="${escapeAttr(pp)}">Copy</button>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;

    elements.resultDiv.innerHTML = html;
    elements.resultDiv.classList.remove('hidden');

    // Attach result event listeners
    attachResultListeners();
  }

  function attachResultListeners() {
    // Copy primary
    const copyBtn = document.getElementById('copy-passphrase-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        copyToClipboard(generatedPassphrases[0], copyBtn);
      });
    }

    // Regenerate
    const regenBtn = document.getElementById('regenerate-btn');
    if (regenBtn) {
      regenBtn.addEventListener('click', () => {
        generatePassphrases();
      });
    }

    // List copy buttons
    document.querySelectorAll('.passphrase-list-copy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pp = e.target.dataset.passphrase;
        copyToClipboard(pp, e.target);
      });
    });
  }

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
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function escapeAttr(text) {
    return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

})();
