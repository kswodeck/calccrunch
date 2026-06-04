// Construction Material Calculator
(function() {
  'use strict';

  // Cost data per quality level
  const COSTS = {
    concrete: {
      perCuYard: { economy: 125, standard: 150, premium: 175 },
      perBag80: { economy: 5, standard: 6, premium: 7 },
      perBag60: { economy: 4, standard: 4.5, premium: 5.5 },
      rebar: { economy: 0.75, standard: 1.0, premium: 1.25 }
    },
    decking: {
      boardPerLF: { 'pressure-treated': { economy: 1.5, standard: 2.0, premium: 2.5 }, cedar: { economy: 3, standard: 4, premium: 5.5 }, composite: { economy: 4, standard: 6, premium: 9 } },
      joist: { economy: 8, standard: 12, premium: 16 },
      post: { economy: 15, standard: 22, premium: 30 },
      hardware: { economy: 0.5, standard: 0.75, premium: 1.0 },
      railing: { economy: 15, standard: 30, premium: 55 }
    },
    fencing: {
      perLF: { wood: { economy: 12, standard: 18, premium: 28 }, vinyl: { economy: 20, standard: 30, premium: 45 }, 'chain-link': { economy: 8, standard: 13, premium: 20 } },
      post: { wood: { economy: 8, standard: 12, premium: 18 }, vinyl: { economy: 25, standard: 35, premium: 50 }, 'chain-link': { economy: 12, standard: 18, premium: 25 } },
      gate: { economy: 75, standard: 150, premium: 300 },
      concrete: { economy: 4, standard: 5, premium: 6 }
    },
    drywall: {
      sheetPer4x8: { economy: 10, standard: 14, premium: 20 },
      sheetPer4x12: { economy: 15, standard: 20, premium: 28 },
      compound: { economy: 0.15, standard: 0.2, premium: 0.25 },
      tape: { economy: 0.03, standard: 0.05, premium: 0.07 },
      screws: { economy: 0.02, standard: 0.03, premium: 0.04 },
      cornerBead: { economy: 1.5, standard: 2.5, premium: 4 }
    },
    flooring: {
      perSqFt: { tile: { economy: 3, standard: 6, premium: 12 }, hardwood: { economy: 5, standard: 8, premium: 14 }, lvp: { economy: 2.5, standard: 4, premium: 7 }, carpet: { economy: 2, standard: 4, premium: 8 } },
      underlayment: { economy: 0.3, standard: 0.5, premium: 0.8 },
      transition: { economy: 8, standard: 15, premium: 30 },
      adhesive: { economy: 0.25, standard: 0.4, premium: 0.6 }
    },
    roofing: {
      perSquare: { 'asphalt-3tab': { economy: 90, standard: 120, premium: 160 }, 'asphalt-arch': { economy: 120, standard: 170, premium: 240 }, 'metal-standing': { economy: 350, standard: 500, premium: 700 }, 'metal-corrugated': { economy: 200, standard: 300, premium: 450 } },
      underlayment: { economy: 20, standard: 35, premium: 55 },
      ridgeCap: { economy: 3, standard: 5, premium: 8 },
      nails: { economy: 8, standard: 10, premium: 12 },
      dripEdge: { economy: 2, standard: 3.5, premium: 5 },
      tearOff: { economy: 50, standard: 75, premium: 100 }
    },
    paint: {
      perGallon: { economy: 25, standard: 40, premium: 65 },
      primer: { economy: 20, standard: 30, premium: 45 },
      supplies: { economy: 20, standard: 35, premium: 50 }
    },
    insulation: {
      batt: { economy: 0.5, standard: 0.8, premium: 1.2 },
      'blown-fiberglass': { economy: 0.8, standard: 1.2, premium: 1.8 },
      'blown-cellulose': { economy: 0.6, standard: 1.0, premium: 1.5 }
    }
  };

  // Pitch multipliers for roofing
  const PITCH_MULTIPLIERS = { 3: 1.03, 4: 1.06, 5: 1.08, 6: 1.12, 8: 1.20, 10: 1.30, 12: 1.41 };

  // Waste defaults per project
  const WASTE_DEFAULTS = { concrete: 10, decking: 12, fencing: 7, drywall: 12, flooring: 10, roofing: 12, paint: 7, insulation: 8 };

  // Pro tips per project type
  const PRO_TIPS = {
    concrete: { title: 'Pro Tip: Concrete Work', tips: ['Order 5-10% extra concrete for truck deliveries - running short mid-pour is costly', 'Concrete sets quickly in hot weather; plan pours for cooler parts of the day', 'Rebar should be placed at 1/3 depth from the bottom for slabs', 'Keep the surface moist for 7 days after pouring for maximum strength'] },
    decking: { title: 'Pro Tip: Deck Building', tips: ['Let pressure-treated lumber acclimate for 2-3 weeks before staining/sealing', 'Pre-drill ends of boards to prevent splitting', 'Leave 1/8" gap between deck boards for drainage and expansion', 'Use hidden fastener systems for a cleaner look (adds ~20% to hardware cost)'] },
    fencing: { title: 'Pro Tip: Fence Installation', tips: ['Set posts in concrete at least 1/3 of total post length deep', 'Crown the concrete around posts so water drains away', 'Install fence with the "good side" facing your neighbor (often code-required)', 'Check property lines with a survey before building - fence disputes are costly'] },
    drywall: { title: 'Pro Tip: Drywall Installation', tips: ['Hang ceiling sheets first, then walls - gravity helps hold joints tight', 'Stagger seams between rows to prevent cracking', 'Use setting-type compound for first coat (more crack-resistant)', 'Sand between coats with 120-grit, then finish with 220-grit'] },
    flooring: { title: 'Pro Tip: Flooring Installation', tips: ['Acclimate flooring material in the room for 48-72 hours before installation', 'Start from the longest, most visible wall and work toward closets/less visible areas', 'Check subfloor for flatness - more than 3/16" variation per 10ft needs leveling', 'Save leftover material (same lot) for future repairs'] },
    roofing: { title: 'Pro Tip: Roofing', tips: ['Never roof over more than 2 layers - tear off down to sheathing', 'Install ice and water shield in valleys and along eaves (code in cold climates)', 'Shingles need 40-70F temps to seal properly; avoid winter installation', 'Proper attic ventilation extends roof life by 5-10 years'] },
    paint: { title: 'Pro Tip: Painting', tips: ['Clean walls with TSP before painting for better adhesion', 'Cut in edges first, then roll the large areas while the cut-in is still wet', 'Use a quality roller cover: 3/8" nap for smooth walls, 1/2" for textured', 'Two thin coats always look better than one thick coat'] },
    insulation: { title: 'Pro Tip: Insulation', tips: ['Never compress batt insulation - it reduces R-value significantly', 'Seal air leaks BEFORE insulating (foam around pipes, wires, gaps)', 'Vapor barrier goes on the warm side (interior in cold climates)', 'Blown-in settles 10-20% over time - overfill slightly to compensate'] }
  };

  function init() {
    const projectType = document.getElementById('project-type');
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const shareBtn = document.getElementById('share-calculation');

    if (!projectType || !calculateBtn) return;

    projectType.addEventListener('change', handleProjectChange);
    calculateBtn.addEventListener('click', calculate);
    if (clearBtn) clearBtn.addEventListener('click', clearForm);
    if (shareBtn) shareBtn.addEventListener('click', shareCalculation);

    // Concrete shape toggle
    const concreteShape = document.getElementById('concrete-shape');
    if (concreteShape) {
      concreteShape.addEventListener('change', function() {
        document.getElementById('concrete-rect-dims').style.display = this.value === 'rectangular' ? '' : 'none';
        document.getElementById('concrete-circ-dims').style.display = this.value === 'circular' ? '' : 'none';
      });
    }

    // Deck railing toggle
    const deckRailing = document.getElementById('deck-railing');
    if (deckRailing) {
      deckRailing.addEventListener('change', function() {
        document.getElementById('deck-railing-row').style.display = this.value === 'yes' ? '' : 'none';
      });
    }

    // Load from URL params
    loadFromURL();
  }

  function handleProjectChange() {
    const type = document.getElementById('project-type').value;
    // Hide all sections
    document.querySelectorAll('.project-section').forEach(function(s) { s.style.display = 'none'; });
    // Show relevant section
    if (type) {
      var section = document.getElementById(type + '-section');
      if (section) section.style.display = '';
      document.getElementById('shared-options').style.display = '';
      // Update waste factor default
      var wasteInput = document.getElementById('waste-factor');
      if (wasteInput && WASTE_DEFAULTS[type]) {
        wasteInput.value = WASTE_DEFAULTS[type];
        var help = document.getElementById('waste-help');
        if (help) help.textContent = 'Recommended: ' + WASTE_DEFAULTS[type] + '% for ' + type;
      }
    } else {
      document.getElementById('shared-options').style.display = 'none';
    }
    // Hide result
    var result = document.getElementById('construction-result');
    if (result) result.classList.add('hidden');
  }

  function calculate() {
    var type = document.getElementById('project-type').value;
    if (!type) { alert('Please select a project type.'); return; }

    var waste = (parseFloat(document.getElementById('waste-factor').value) || 10) / 100;
    var quality = document.getElementById('quality-level').value;
    var includeCost = document.getElementById('include-cost').value === 'yes';

    var result;
    switch (type) {
      case 'concrete': result = calcConcrete(waste, quality, includeCost); break;
      case 'decking': result = calcDecking(waste, quality, includeCost); break;
      case 'fencing': result = calcFencing(waste, quality, includeCost); break;
      case 'drywall': result = calcDrywall(waste, quality, includeCost); break;
      case 'flooring': result = calcFlooring(waste, quality, includeCost); break;
      case 'roofing': result = calcRoofing(waste, quality, includeCost); break;
      case 'paint': result = calcPaint(waste, quality, includeCost); break;
      case 'insulation': result = calcInsulation(waste, quality, includeCost); break;
      default: return;
    }

    if (result) displayResult(result, type, includeCost);
  }

  function calcConcrete(waste, quality, includeCost) {
    var shape = document.getElementById('concrete-shape').value;
    var depth = parseFloat(document.getElementById('concrete-depth').value);
    var bagSize = document.getElementById('concrete-bag-size').value;
    if (!depth) { alert('Please enter thickness/depth.'); return null; }

    var depthFt = depth / 12;
    var area, volume;

    if (shape === 'rectangular') {
      var l = parseFloat(document.getElementById('concrete-length').value);
      var w = parseFloat(document.getElementById('concrete-width').value);
      if (!l || !w) { alert('Please enter length and width.'); return null; }
      area = l * w;
      volume = l * w * depthFt; // cubic feet
    } else {
      var d = parseFloat(document.getElementById('concrete-diameter').value);
      if (!d) { alert('Please enter diameter.'); return null; }
      var r = d / 2;
      area = Math.PI * r * r;
      volume = area * depthFt;
    }

    var cuYards = volume / 27;
    var cuYardsWithWaste = cuYards * (1 + waste);
    var cuFtWithWaste = volume * (1 + waste);

    var materials = [];
    materials.push({ item: 'Concrete Volume (net)', qty: cuYards.toFixed(2), unit: 'cu yards' });
    materials.push({ item: 'Concrete Volume (with waste)', qty: cuYardsWithWaste.toFixed(2), unit: 'cu yards' });

    var totalCost = 0;
    if (bagSize === 'truck') {
      var yards = Math.ceil(cuYardsWithWaste * 4) / 4; // round to nearest 0.25 yard
      materials.push({ item: 'Truck Delivery', qty: yards.toFixed(2), unit: 'cu yards' });
      if (includeCost) totalCost = yards * COSTS.concrete.perCuYard[quality];
    } else {
      var cuFtPerBag = bagSize === '80' ? 0.6 : 0.45;
      var bags = Math.ceil(cuFtWithWaste / cuFtPerBag);
      materials.push({ item: bagSize + ' lb Bags', qty: bags, unit: 'bags' });
      if (includeCost) totalCost = bags * (bagSize === '80' ? COSTS.concrete.perBag80[quality] : COSTS.concrete.perBag60[quality]);
    }

    // Rebar estimate (for slabs/footings)
    var concreteType = document.getElementById('concrete-type').value;
    if (concreteType === 'slab' || concreteType === 'footing') {
      var rebarLF = Math.ceil(area / 1.5) * 2; // grid at 18" spacing both directions
      var rebarSticks = Math.ceil(rebarLF / 20); // 20ft sticks
      materials.push({ item: '#4 Rebar (20ft sticks)', qty: rebarSticks, unit: 'sticks' });
      materials.push({ item: 'Rebar Ties', qty: Math.ceil(rebarSticks * 8), unit: 'ties' });
      if (includeCost) totalCost += rebarSticks * 20 * COSTS.concrete.rebar[quality];
    }

    return { materials: materials, totalCost: totalCost, area: area };
  }

  function calcDecking(waste, quality, includeCost) {
    var l = parseFloat(document.getElementById('deck-length').value);
    var w = parseFloat(document.getElementById('deck-width').value);
    if (!l || !w) { alert('Please enter deck length and width.'); return null; }

    var material = document.getElementById('deck-material').value;
    var boardWidth = parseFloat(document.getElementById('deck-board-width').value);
    var joistSpacing = parseInt(document.getElementById('deck-joist-spacing').value);
    var hasRailing = document.getElementById('deck-railing').value === 'yes';

    var sqFt = l * w;
    var boardWidthFt = boardWidth / 12;
    var gapFt = 0.125 / 12; // 1/8" gap

    // Decking boards
    var boardsAcross = Math.ceil(l / (boardWidthFt + gapFt));
    var totalBoardLF = boardsAcross * w * (1 + waste);
    // Boards come in standard lengths
    var boardLength = w <= 8 ? 8 : w <= 10 ? 10 : w <= 12 ? 12 : 16;
    var numBoards = Math.ceil(totalBoardLF / boardLength);

    // Joists
    var numJoists = Math.ceil((l * 12) / joistSpacing) + 1;
    // Rim joists (2 along the length)
    var rimJoists = 2;

    // Posts (every 6ft along beam, 2 beams for typical deck)
    var beamCount = w > 8 ? 2 : 1;
    var postsPerBeam = Math.ceil(l / 6) + 1;
    var totalPosts = postsPerBeam * beamCount;

    // Hardware
    var screwsPerBoard = Math.ceil(boardLength * 2 / boardWidthFt);
    var totalScrews = numBoards * screwsPerBoard;
    var screwBoxes = Math.ceil(totalScrews / 350); // ~350 screws per 5lb box
    var joistHangers = numJoists;
    var bolts = totalPosts * 2;

    var materials = [];
    materials.push({ item: 'Deck Area', qty: sqFt.toFixed(0), unit: 'sq ft' });
    materials.push({ item: 'Decking Boards (' + boardLength + 'ft)', qty: numBoards, unit: 'boards' });
    materials.push({ item: 'Joists (2x' + (joistSpacing <= 12 ? '10' : '8') + ', ' + w + 'ft)', qty: numJoists, unit: 'joists' });
    materials.push({ item: 'Rim Joists (2x' + (joistSpacing <= 12 ? '10' : '8') + ', ' + l + 'ft)', qty: rimJoists, unit: 'boards' });
    materials.push({ item: 'Support Posts (4x4 or 6x6)', qty: totalPosts, unit: 'posts' });
    materials.push({ item: 'Deck Screws (5lb box)', qty: screwBoxes, unit: 'boxes' });
    materials.push({ item: 'Joist Hangers', qty: joistHangers, unit: 'hangers' });
    materials.push({ item: 'Carriage Bolts', qty: bolts, unit: 'bolts' });
    materials.push({ item: 'Post Concrete (50lb bags)', qty: totalPosts * 2, unit: 'bags' });

    var totalCost = 0;
    if (includeCost) {
      var costData = COSTS.decking;
      totalCost += numBoards * boardLength * costData.boardPerLF[material][quality];
      totalCost += numJoists * costData.joist[quality];
      totalCost += totalPosts * costData.post[quality];
      totalCost += (screwBoxes * 35) + (joistHangers * costData.hardware[quality] * 4) + (bolts * 1.5);
      totalCost += totalPosts * 2 * 5; // concrete bags
    }

    // Railing
    if (hasRailing) {
      var railingLF = parseFloat(document.getElementById('deck-railing-length').value) || (l * 2 + w);
      var railPosts = Math.ceil(railingLF / 6) + 1;
      var balusters = Math.ceil(railingLF / 0.33); // every 4 inches
      materials.push({ item: 'Railing - Top/Bottom Rails', qty: Math.ceil(railingLF / 8) * 2, unit: 'pieces (8ft)' });
      materials.push({ item: 'Railing - Posts', qty: railPosts, unit: 'posts' });
      materials.push({ item: 'Railing - Balusters', qty: balusters, unit: 'balusters' });
      if (includeCost) totalCost += railingLF * costData.railing[quality];
    }

    return { materials: materials, totalCost: totalCost, area: sqFt };
  }

  function calcFencing(waste, quality, includeCost) {
    var linearFt = parseFloat(document.getElementById('fence-length').value);
    if (!linearFt) { alert('Please enter total linear feet.'); return null; }

    var material = document.getElementById('fence-material').value;
    var height = parseInt(document.getElementById('fence-height').value);
    var postSpacing = parseInt(document.getElementById('fence-post-spacing').value);
    var gates = parseInt(document.getElementById('fence-gates').value) || 0;

    // Subtract gate widths from fence length (assume 4ft gates)
    var fenceLinearFt = linearFt - (gates * 4);

    // Posts
    var numPosts = Math.ceil(fenceLinearFt / postSpacing) + 1 + (gates * 2); // extra posts for gate frames

    // Rails (2 for 4ft, 3 for 6ft+)
    var railsPerSection = height <= 4 ? 2 : 3;
    var sections = Math.ceil(fenceLinearFt / postSpacing);
    var totalRails = sections * railsPerSection;

    // Pickets/panels
    var pickets = 0;
    var panels = 0;
    if (material === 'wood') {
      // 3.5" pickets with 0.25" gap = ~3.2 per foot
      pickets = Math.ceil(fenceLinearFt * 3.2 * (1 + waste));
    } else if (material === 'vinyl') {
      // 6ft or 8ft panels
      panels = Math.ceil(fenceLinearFt / postSpacing);
    } else {
      // Chain link - sold by the roll (50ft rolls)
      var rolls = Math.ceil(fenceLinearFt / 50);
      panels = rolls; // using panels var for rolls
    }

    // Concrete for posts (2 bags per post for 6ft fence, 1 for 4ft)
    var bagsPerPost = height <= 4 ? 1 : 2;
    var concreteBags = numPosts * bagsPerPost;

    var materials = [];
    materials.push({ item: 'Total Fence Length', qty: linearFt, unit: 'linear ft' });
    materials.push({ item: 'Posts (' + (height + 2) + 'ft, buried 2ft)', qty: numPosts, unit: 'posts' });
    materials.push({ item: 'Rails (2x4 or equiv., ' + postSpacing + 'ft)', qty: Math.ceil(totalRails * (1 + waste)), unit: 'rails' });

    if (material === 'wood') {
      materials.push({ item: 'Pickets (1x4x' + height + 'ft)', qty: pickets, unit: 'pickets' });
    } else if (material === 'vinyl') {
      materials.push({ item: 'Vinyl Panels (' + postSpacing + 'ft x ' + height + 'ft)', qty: panels, unit: 'panels' });
    } else {
      materials.push({ item: 'Chain Link Fabric (50ft rolls, ' + height + 'ft tall)', qty: panels, unit: 'rolls' });
      materials.push({ item: 'Tension Bars', qty: Math.ceil(fenceLinearFt / 50) * 2, unit: 'bars' });
      materials.push({ item: 'Tie Wires', qty: numPosts * 3, unit: 'wires' });
    }

    materials.push({ item: 'Post Concrete (50lb bags)', qty: concreteBags, unit: 'bags' });
    materials.push({ item: 'Post Caps', qty: numPosts, unit: 'caps' });
    if (gates > 0) {
      materials.push({ item: 'Gates (4ft wide)', qty: gates, unit: 'gates' });
      materials.push({ item: 'Gate Hardware (hinges + latch)', qty: gates, unit: 'sets' });
    }
    if (material === 'wood') {
      var nailBoxes = Math.ceil(pickets * 8 / 1000); // 8 nails per picket, 1000 per box
      materials.push({ item: 'Galvanized Nails/Screws (1lb box)', qty: nailBoxes, unit: 'boxes' });
    }

    var totalCost = 0;
    if (includeCost) {
      var costData = COSTS.fencing;
      totalCost += fenceLinearFt * costData.perLF[material][quality] * (height / 6); // adjust for height
      totalCost += numPosts * costData.post[material][quality];
      totalCost += concreteBags * costData.concrete[quality];
      totalCost += gates * costData.gate[quality];
    }

    return { materials: materials, totalCost: totalCost, area: linearFt * height };
  }

  function calcDrywall(waste, quality, includeCost) {
    var l = parseFloat(document.getElementById('drywall-room-length').value);
    var w = parseFloat(document.getElementById('drywall-room-width').value);
    var h = parseFloat(document.getElementById('drywall-height').value);
    if (!l || !w || !h) { alert('Please enter room dimensions.'); return null; }

    var sheetSize = document.getElementById('drywall-sheet-size').value;
    var doors = parseInt(document.getElementById('drywall-doors').value) || 0;
    var windows = parseInt(document.getElementById('drywall-windows').value) || 0;
    var includeCeiling = document.getElementById('drywall-include-ceiling').value === 'yes';

    // Wall area
    var perimeter = 2 * (l + w);
    var wallArea = perimeter * h;
    // Subtract openings (door ~21 sq ft, window ~15 sq ft)
    wallArea -= (doors * 21) + (windows * 15);

    // Ceiling area
    var ceilingArea = includeCeiling ? l * w : 0;
    var totalArea = wallArea + ceilingArea;
    var totalWithWaste = totalArea * (1 + waste);

    // Sheets
    var sheetArea = sheetSize === '4x8' ? 32 : 48;
    var sheets = Math.ceil(totalWithWaste / sheetArea);

    // Joint compound: ~0.05 lbs per sq ft per coat (3 coats)
    var compound = Math.ceil(totalArea * 0.05 * 3);
    var compoundBuckets = Math.ceil(compound / 60); // 60lb buckets

    // Tape: linear feet of seams (sheets x perimeter / 2 roughly)
    var tapeLF = Math.ceil(sheets * (sheetSize === '4x8' ? 20 : 28));
    var tapeRolls = Math.ceil(tapeLF / 250); // 250ft rolls

    // Screws: ~32 per 4x8 sheet, ~48 per 4x12 sheet
    var screwsPerSheet = sheetSize === '4x8' ? 32 : 48;
    var totalScrews = sheets * screwsPerSheet;
    var screwBoxes = Math.ceil(totalScrews / 200); // 200 per box

    // Corner bead (inside + outside corners)
    var corners = 4 + (doors * 2); // rough estimate
    var cornerBeadLF = corners * h;
    var cornerBeadPieces = Math.ceil(cornerBeadLF / 8); // 8ft pieces

    var materials = [];
    materials.push({ item: 'Total Drywall Area', qty: totalArea.toFixed(0), unit: 'sq ft' });
    materials.push({ item: 'Drywall Sheets (' + sheetSize.replace('x', '\' x ') + '\')', qty: sheets, unit: 'sheets' });
    materials.push({ item: 'Joint Compound (4.5 gal buckets)', qty: compoundBuckets, unit: 'buckets' });
    materials.push({ item: 'Paper Tape (250ft rolls)', qty: tapeRolls, unit: 'rolls' });
    materials.push({ item: 'Drywall Screws (1-5/8", 200ct box)', qty: screwBoxes, unit: 'boxes' });
    materials.push({ item: 'Corner Bead (8ft pieces)', qty: cornerBeadPieces, unit: 'pieces' });

    var totalCostVal = 0;
    if (includeCost) {
      var costData = COSTS.drywall;
      var sheetCost = sheetSize === '4x8' ? costData.sheetPer4x8[quality] : costData.sheetPer4x12[quality];
      totalCostVal += sheets * sheetCost;
      totalCostVal += compoundBuckets * 18;
      totalCostVal += tapeRolls * 8;
      totalCostVal += screwBoxes * 12;
      totalCostVal += cornerBeadPieces * costData.cornerBead[quality];
    }

    return { materials: materials, totalCost: totalCostVal, area: totalArea };
  }

  function calcFlooring(waste, quality, includeCost) {
    var l = parseFloat(document.getElementById('floor-length').value);
    var w = parseFloat(document.getElementById('floor-width').value);
    if (!l || !w) { alert('Please enter room dimensions.'); return null; }

    var material = document.getElementById('floor-material').value;
    var pattern = document.getElementById('floor-pattern').value;

    var sqFt = l * w;
    var patternWaste = pattern === 'diagonal' ? 0.15 : 0;
    var totalWaste = waste + patternWaste;
    var sqFtWithWaste = sqFt * (1 + totalWaste);

    // Coverage per box varies by material
    var coveragePerBox = { tile: 10, hardwood: 20, lvp: 24, carpet: 12 }; // sq ft per box/bundle
    var boxes = Math.ceil(sqFtWithWaste / coveragePerBox[material]);

    // Underlayment
    var underlaymentSqFt = Math.ceil(sqFt * 1.1); // 10% overlap
    var underlaymentRolls = Math.ceil(underlaymentSqFt / 100); // 100 sq ft per roll

    // Transitions (assume 1 per doorway, roughly perimeter/20)
    var transitions = Math.max(1, Math.ceil((2 * (l + w)) / 20));

    var materials = [];
    materials.push({ item: 'Room Area', qty: sqFt.toFixed(0), unit: 'sq ft' });
    materials.push({ item: 'Total with Waste (' + (totalWaste * 100).toFixed(0) + '%)', qty: sqFtWithWaste.toFixed(0), unit: 'sq ft' });

    if (material === 'tile') {
      materials.push({ item: 'Tile Boxes (~10 sq ft/box)', qty: boxes, unit: 'boxes' });
      materials.push({ item: 'Thinset Mortar (50lb bags)', qty: Math.ceil(sqFtWithWaste / 80), unit: 'bags' });
      materials.push({ item: 'Grout (25lb bags)', qty: Math.ceil(sqFtWithWaste / 100), unit: 'bags' });
      materials.push({ item: 'Tile Spacers (bag)', qty: Math.ceil(sqFtWithWaste / 200), unit: 'bags' });
    } else if (material === 'hardwood') {
      materials.push({ item: 'Hardwood Bundles (~20 sq ft/bundle)', qty: boxes, unit: 'bundles' });
      materials.push({ item: 'Underlayment (100 sq ft rolls)', qty: underlaymentRolls, unit: 'rolls' });
      materials.push({ item: 'Flooring Nails/Staples (box)', qty: Math.ceil(sqFtWithWaste / 200), unit: 'boxes' });
    } else if (material === 'lvp') {
      materials.push({ item: 'LVP Boxes (~24 sq ft/box)', qty: boxes, unit: 'boxes' });
      materials.push({ item: 'Underlayment (100 sq ft rolls)', qty: underlaymentRolls, unit: 'rolls' });
    } else {
      materials.push({ item: 'Carpet (12ft wide rolls)', qty: Math.ceil(sqFtWithWaste / 12), unit: 'linear ft' });
      materials.push({ item: 'Carpet Pad (sq ft)', qty: underlaymentSqFt, unit: 'sq ft' });
      materials.push({ item: 'Tack Strips (4ft pieces)', qty: Math.ceil((2 * (l + w)) / 4), unit: 'pieces' });
    }

    materials.push({ item: 'Transition Strips', qty: transitions, unit: 'pieces' });

    var totalCost = 0;
    if (includeCost) {
      totalCost += sqFtWithWaste * COSTS.flooring.perSqFt[material][quality];
      totalCost += underlaymentRolls * (COSTS.flooring.underlayment[quality] * 100);
      totalCost += transitions * COSTS.flooring.transition[quality];
      if (material === 'tile') totalCost += Math.ceil(sqFtWithWaste / 80) * 25 + Math.ceil(sqFtWithWaste / 100) * 20;
    }

    return { materials: materials, totalCost: totalCost, area: sqFt };
  }

  function calcRoofing(waste, quality, includeCost) {
    var l = parseFloat(document.getElementById('roof-length').value);
    var w = parseFloat(document.getElementById('roof-width').value);
    if (!l || !w) { alert('Please enter roof length and width.'); return null; }

    var pitch = parseInt(document.getElementById('roof-pitch').value);
    var material = document.getElementById('roof-material').value;
    var layers = parseInt(document.getElementById('roof-layers').value);

    var pitchMult = PITCH_MULTIPLIERS[pitch] || 1.12;
    var flatArea = l * w;
    var actualArea = flatArea * pitchMult;
    var areaWithWaste = actualArea * (1 + waste);

    // Squares (100 sq ft)
    var squares = areaWithWaste / 100;
    var squaresRounded = Math.ceil(squares);

    // Bundles (3 per square for asphalt, varies for metal)
    var isAsphalt = material.startsWith('asphalt');
    var bundles = isAsphalt ? Math.ceil(squares * 3) : 0;
    var metalPanels = !isAsphalt ? Math.ceil(areaWithWaste / (material === 'metal-standing' ? 16 : 24)) : 0; // panel coverage

    // Underlayment (15lb felt: 4 sq per roll, synthetic: 10 sq per roll)
    var underlaymentRolls = Math.ceil(squares / (quality === 'economy' ? 4 : 10));

    // Ridge cap (ridge length roughly = building length)
    var ridgeLF = l;
    var ridgeCapBundles = isAsphalt ? Math.ceil(ridgeLF / 25) : 0; // 25 lf per bundle
    var ridgeCapMetal = !isAsphalt ? Math.ceil(ridgeLF / 10) : 0; // 10ft pieces

    // Nails
    var nailsLbs = Math.ceil(squares * 2.5);

    // Drip edge (perimeter)
    var perimeter = 2 * (l + w);
    var dripEdgePieces = Math.ceil(perimeter / 10); // 10ft pieces

    // Flashing
    var flashingPieces = Math.ceil(perimeter / 20) + 4; // valleys, vents, chimney

    var materials = [];
    materials.push({ item: 'Roof Area (flat)', qty: flatArea.toFixed(0), unit: 'sq ft' });
    materials.push({ item: 'Actual Area (pitch-adjusted)', qty: actualArea.toFixed(0), unit: 'sq ft' });
    materials.push({ item: 'Squares Needed', qty: squaresRounded, unit: 'squares' });

    if (isAsphalt) {
      materials.push({ item: 'Shingle Bundles (3/square)', qty: bundles, unit: 'bundles' });
      materials.push({ item: 'Ridge Cap Bundles', qty: ridgeCapBundles, unit: 'bundles' });
    } else {
      materials.push({ item: 'Metal Panels', qty: metalPanels, unit: 'panels' });
      materials.push({ item: 'Ridge Cap (10ft pieces)', qty: ridgeCapMetal, unit: 'pieces' });
    }

    materials.push({ item: 'Underlayment Rolls', qty: underlaymentRolls, unit: 'rolls' });
    materials.push({ item: 'Roofing Nails', qty: nailsLbs, unit: 'lbs' });
    materials.push({ item: 'Drip Edge (10ft pieces)', qty: dripEdgePieces, unit: 'pieces' });
    materials.push({ item: 'Flashing Pieces', qty: flashingPieces, unit: 'pieces' });
    materials.push({ item: 'Starter Strip', qty: Math.ceil(perimeter / 30), unit: 'rolls' });

    if (layers > 0) {
      materials.push({ item: 'Tear-Off Dumpster', qty: Math.ceil(squares / 15), unit: 'dumpsters (20yd)' });
    }

    var totalCost = 0;
    if (includeCost) {
      totalCost += squaresRounded * COSTS.roofing.perSquare[material][quality];
      totalCost += underlaymentRolls * COSTS.roofing.underlayment[quality];
      totalCost += (ridgeCapBundles || ridgeCapMetal) * COSTS.roofing.ridgeCap[quality] * 10;
      totalCost += nailsLbs * COSTS.roofing.nails[quality];
      totalCost += dripEdgePieces * COSTS.roofing.dripEdge[quality] * 10;
      totalCost += flashingPieces * 8;
      if (layers > 0) totalCost += squaresRounded * COSTS.roofing.tearOff[quality] * layers * 0.5;
    }

    return { materials: materials, totalCost: totalCost, area: actualArea };
  }

  function calcPaint(waste, quality, includeCost) {
    var l = parseFloat(document.getElementById('paint-room-length').value);
    var w = parseFloat(document.getElementById('paint-room-width').value);
    var h = parseFloat(document.getElementById('paint-height').value);
    if (!l || !w || !h) { alert('Please enter room dimensions.'); return null; }

    var coats = parseInt(document.getElementById('paint-coats').value);
    var doors = parseInt(document.getElementById('paint-doors').value) || 0;
    var windows = parseInt(document.getElementById('paint-windows').value) || 0;
    var includeCeiling = document.getElementById('paint-include-ceiling').value === 'yes';
    var includePrimer = document.getElementById('paint-include-primer').value === 'yes';

    // Wall area
    var perimeter = 2 * (l + w);
    var wallArea = perimeter * h;
    wallArea -= (doors * 21) + (windows * 15); // subtract openings

    // Ceiling
    var ceilingArea = includeCeiling ? l * w : 0;
    var totalPaintable = wallArea + ceilingArea;
    var totalWithWaste = totalPaintable * (1 + waste);

    // Coverage: 350-400 sq ft per gallon
    var coverage = quality === 'premium' ? 400 : quality === 'standard' ? 375 : 350;
    var gallonsPerCoat = totalWithWaste / coverage;
    var totalGallons = Math.ceil(gallonsPerCoat * coats);
    var primerGallons = includePrimer ? Math.ceil(gallonsPerCoat) : 0;

    var materials = [];
    materials.push({ item: 'Paintable Wall Area', qty: wallArea.toFixed(0), unit: 'sq ft' });
    if (includeCeiling) materials.push({ item: 'Ceiling Area', qty: ceilingArea.toFixed(0), unit: 'sq ft' });
    materials.push({ item: 'Total Paintable Area', qty: totalPaintable.toFixed(0), unit: 'sq ft' });
    materials.push({ item: 'Paint (' + coats + ' coat' + (coats > 1 ? 's' : '') + ')', qty: totalGallons, unit: 'gallons' });
    if (includePrimer) materials.push({ item: 'Primer (1 coat)', qty: primerGallons, unit: 'gallons' });
    materials.push({ item: 'Painter\'s Tape (60yd rolls)', qty: Math.ceil(perimeter / 50), unit: 'rolls' });
    materials.push({ item: 'Drop Cloths (9x12)', qty: Math.ceil((l * w) / 108), unit: 'cloths' });
    materials.push({ item: 'Roller Covers', qty: Math.ceil((totalGallons + primerGallons) / 3), unit: 'covers' });

    var totalCost = 0;
    if (includeCost) {
      totalCost += totalGallons * COSTS.paint.perGallon[quality];
      if (includePrimer) totalCost += primerGallons * COSTS.paint.primer[quality];
      totalCost += COSTS.paint.supplies[quality]; // brushes, tape, cloths, etc.
    }

    return { materials: materials, totalCost: totalCost, area: totalPaintable };
  }

  function calcInsulation(waste, quality, includeCost) {
    var area = parseFloat(document.getElementById('insulation-area').value);
    if (!area) { alert('Please enter area to insulate.'); return null; }

    var type = document.getElementById('insulation-type').value;
    var rvalue = parseInt(document.getElementById('insulation-rvalue').value);

    var areaWithWaste = area * (1 + waste);

    var materials = [];
    materials.push({ item: 'Area to Insulate', qty: area.toFixed(0), unit: 'sq ft' });
    materials.push({ item: 'Total with Waste', qty: areaWithWaste.toFixed(0), unit: 'sq ft' });
    materials.push({ item: 'Target R-Value', qty: 'R-' + rvalue, unit: '' });

    var totalCost = 0;

    if (type === 'batt') {
      // Batt coverage: R-13 = 40 sq ft per bag, R-19 = 48 sq ft, R-30 = 32 sq ft, R-38 = 24 sq ft
      var coveragePerBag = { 13: 40, 19: 48.96, 30: 32, 38: 24, 49: 18, 60: 14 };
      var coverage = coveragePerBag[rvalue] || 32;
      var bags = Math.ceil(areaWithWaste / coverage);

      // Thickness needed
      var thicknessMap = { 13: 3.5, 19: 6.25, 30: 9.5, 38: 12, 49: 15, 60: 19 };
      var thickness = thicknessMap[rvalue] || 9.5;

      materials.push({ item: 'Insulation Thickness', qty: thickness.toFixed(1), unit: 'inches' });
      materials.push({ item: 'Fiberglass Batt Bags', qty: bags, unit: 'bags' });
      materials.push({ item: 'Vapor Barrier (rolls, 100 sq ft)', qty: Math.ceil(area / 100), unit: 'rolls' });
      materials.push({ item: 'Staples (T50 box)', qty: Math.ceil(bags / 5), unit: 'boxes' });

      if (includeCost) {
        totalCost += areaWithWaste * COSTS.insulation.batt[quality] * (rvalue / 13);
        totalCost += Math.ceil(area / 100) * 25; // vapor barrier
      }
    } else {
      // Blown-in: depth depends on R-value
      var depthPerR = type === 'blown-fiberglass' ? 0.36 : 0.27; // inches per R
      var depth = rvalue * depthPerR;
      // Bags: fiberglass ~27 sq ft at R-30 per bag; cellulose ~35 sq ft at R-30 per bag
      var bagsPerSqFt = type === 'blown-fiberglass' ? (rvalue / 30) / 27 : (rvalue / 30) / 35;
      var totalBags = Math.ceil(areaWithWaste * bagsPerSqFt);

      materials.push({ item: 'Blown Depth Needed', qty: depth.toFixed(1), unit: 'inches' });
      materials.push({ item: (type === 'blown-fiberglass' ? 'Fiberglass' : 'Cellulose') + ' Bags', qty: totalBags, unit: 'bags' });
      materials.push({ item: 'Blower Machine Rental', qty: 1, unit: 'day (often free w/ purchase)' });

      if (includeCost) {
        totalCost += areaWithWaste * COSTS.insulation[type][quality] * (rvalue / 30);
      }
    }

    return { materials: materials, totalCost: totalCost, area: area };
  }

  function displayResult(result, type, includeCost) {
    var container = document.getElementById('construction-result');
    if (!container) return;

    var html = '<h3>Material Estimate</h3>';

    // Material table
    html += '<table class="material-list">';
    html += '<thead><tr><th>Material</th><th>Quantity</th></tr></thead>';
    html += '<tbody>';
    result.materials.forEach(function(m) {
      html += '<tr><td>' + m.item + '</td><td style="text-align:right;white-space:nowrap;">' + m.qty + ' ' + m.unit + '</td></tr>';
    });
    html += '</tbody></table>';

    // Cost estimate
    if (includeCost && result.totalCost > 0) {
      var low = result.totalCost * 0.85;
      var high = result.totalCost * 1.2;
      html += '<div class="cost-summary">';
      html += '<h4>Cost Estimate</h4>';
      html += '<div class="cost-row"><span>Low estimate:</span><span>' + formatCurrency(low) + '</span></div>';
      html += '<div class="cost-row"><span>Mid estimate:</span><span>' + formatCurrency(result.totalCost) + '</span></div>';
      html += '<div class="cost-row"><span>High estimate:</span><span>' + formatCurrency(high) + '</span></div>';
      html += '<div class="cost-row total"><span>Expected Range:</span><span>' + formatCurrency(low) + ' - ' + formatCurrency(high) + '</span></div>';
      html += '<p style="font-size:0.8rem;color:var(--color-gray-dark);margin-top:0.5rem;">* Material costs only. Does not include labor, delivery, or tool rental unless noted.</p>';
      html += '</div>';
    }

    // Waste note
    var wastePct = document.getElementById('waste-factor').value;
    html += '<p style="margin-top:1rem;font-size:0.9rem;color:var(--color-gray-dark);"><strong>Note:</strong> Quantities include ' + wastePct + '% waste factor.</p>';

    // Pro tip
    var tips = PRO_TIPS[type];
    if (tips) {
      html += '<div class="pro-tip">';
      html += '<h4>' + tips.title + '</h4>';
      html += '<ul style="margin:0.5rem 0;padding-left:1.25rem;">';
      tips.tips.forEach(function(t) {
        html += '<li style="margin-bottom:0.35rem;">' + t + '</li>';
      });
      html += '</ul></div>';
    }

    container.innerHTML = html;
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function formatCurrency(amount) {
    return '$' + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function clearForm() {
    document.querySelectorAll('.project-section').forEach(function(s) { s.style.display = 'none'; });
    document.getElementById('shared-options').style.display = 'none';
    document.getElementById('project-type').value = '';
    document.getElementById('construction-result').classList.add('hidden');
    // Reset all inputs
    document.querySelectorAll('#construction-calculator-form input[type="number"]').forEach(function(input) {
      input.value = input.defaultValue || '';
    });
    document.querySelectorAll('#construction-calculator-form select').forEach(function(sel) {
      sel.selectedIndex = 0;
    });
    // Clear URL params
    if (window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }

  function shareCalculation() {
    var params = new URLSearchParams();
    var type = document.getElementById('project-type').value;
    if (!type) { alert('Please select a project type and calculate first.'); return; }

    params.set('type', type);
    params.set('quality', document.getElementById('quality-level').value);
    params.set('waste', document.getElementById('waste-factor').value);
    params.set('cost', document.getElementById('include-cost').value);

    // Save project-specific inputs
    var section = document.getElementById(type + '-section');
    if (section) {
      section.querySelectorAll('input, select').forEach(function(el) {
        if (el.id && el.value) params.set(el.id, el.value);
      });
    }

    var url = window.location.origin + window.location.pathname + '?' + params.toString();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function() {
        var btn = document.getElementById('share-calculation');
        var orig = btn.innerHTML;
        btn.innerHTML = 'Copied!';
        setTimeout(function() { btn.innerHTML = orig; }, 2000);
      });
    } else {
      prompt('Copy this URL to share your calculation:', url);
    }

    if (window.history.replaceState) {
      window.history.replaceState(null, '', '?' + params.toString());
    }
  }

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    var type = params.get('type');
    if (!type) return;

    var projectSelect = document.getElementById('project-type');
    projectSelect.value = type;
    handleProjectChange();

    // Restore shared options
    if (params.get('quality')) document.getElementById('quality-level').value = params.get('quality');
    if (params.get('waste')) document.getElementById('waste-factor').value = params.get('waste');
    if (params.get('cost')) document.getElementById('include-cost').value = params.get('cost');

    // Restore project-specific inputs
    var section = document.getElementById(type + '-section');
    if (section) {
      section.querySelectorAll('input, select').forEach(function(el) {
        if (el.id && params.get(el.id)) {
          el.value = params.get(el.id);
          el.dispatchEvent(new Event('change'));
        }
      });
    }

    // Auto-calculate
    setTimeout(calculate, 100);
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
