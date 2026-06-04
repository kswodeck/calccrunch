(function() {
  'use strict';

  // 2024 bend points for PIA calculation
  const BEND_POINT_1 = 1174;
  const BEND_POINT_2 = 7078;

  // 2024 earnings test limits
  const EARNINGS_LIMIT_BEFORE_FRA = 22320;
  const EARNINGS_LIMIT_FRA_YEAR = 59520;

  // 2024 maximum taxable earnings
  const MAX_TAXABLE_EARNINGS = 168600;

  // Full Retirement Age by birth year
  function getFullRetirementAge(birthYear) {
    if (birthYear <= 1942) return { years: 65, months: 0 };
    if (birthYear <= 1954) return { years: 66, months: 0 };
    if (birthYear === 1955) return { years: 66, months: 2 };
    if (birthYear === 1956) return { years: 66, months: 4 };
    if (birthYear === 1957) return { years: 66, months: 6 };
    if (birthYear === 1958) return { years: 66, months: 8 };
    if (birthYear === 1959) return { years: 66, months: 10 };
    return { years: 67, months: 0 }; // 1960 and later
  }

  function getFRAInMonths(birthYear) {
    const fra = getFullRetirementAge(birthYear);
    return fra.years * 12 + fra.months;
  }

  function getFRADecimal(birthYear) {
    const fra = getFullRetirementAge(birthYear);
    return fra.years + fra.months / 12;
  }

  // Calculate AIME (Average Indexed Monthly Earnings)
  function calculateAIME(averageAnnualEarnings, yearsWorked) {
    // Cap earnings at maximum taxable amount
    const cappedEarnings = Math.min(averageAnnualEarnings, MAX_TAXABLE_EARNINGS);
    // Use top 35 years - if fewer years, zeros fill in
    const computationYears = 35;
    const totalEarnings = cappedEarnings * Math.min(yearsWorked, computationYears);
    const aime = totalEarnings / (computationYears * 12);
    return aime;
  }

  // Calculate PIA using bend point formula
  function calculatePIA(aime) {
    let pia = 0;
    if (aime <= BEND_POINT_1) {
      pia = aime * 0.90;
    } else if (aime <= BEND_POINT_2) {
      pia = BEND_POINT_1 * 0.90 + (aime - BEND_POINT_1) * 0.32;
    } else {
      pia = BEND_POINT_1 * 0.90 + (BEND_POINT_2 - BEND_POINT_1) * 0.32 + (aime - BEND_POINT_2) * 0.15;
    }
    return Math.round(pia * 10) / 10; // Round to nearest dime (SSA rule)
  }

  // Calculate benefit adjustment for early or delayed claiming
  function calculateBenefitAdjustment(claimingAge, birthYear) {
    const fraMonths = getFRAInMonths(birthYear);
    const claimingMonths = claimingAge * 12;
    const monthsDifference = claimingMonths - fraMonths;

    if (monthsDifference === 0) {
      return 1.0; // Full benefit at FRA
    } else if (monthsDifference < 0) {
      // Early claiming reduction
      const monthsEarly = Math.abs(monthsDifference);
      let reduction = 0;
      if (monthsEarly <= 36) {
        // 5/9 of 1% per month for first 36 months
        reduction = monthsEarly * (5 / 9 / 100);
      } else {
        // 5/9 of 1% for first 36 months + 5/12 of 1% for additional months
        reduction = 36 * (5 / 9 / 100) + (monthsEarly - 36) * (5 / 12 / 100);
      }
      return 1.0 - reduction;
    } else {
      // Delayed retirement credits: 8% per year (2/3% per month)
      const monthsDelayed = Math.min(monthsDifference, (70 * 12) - fraMonths);
      const increase = monthsDelayed * (2 / 3 / 100);
      return 1.0 + increase;
    }
  }

  // Calculate spousal benefit
  function calculateSpousalBenefit(spousePIA, ownPIA, claimingAge, birthYear) {
    // Spousal benefit is up to 50% of higher earner's PIA
    const maxSpousal = spousePIA * 0.5;

    // If own benefit is higher, no spousal benefit applies
    if (ownPIA >= maxSpousal) {
      return 0;
    }

    const spousalAmount = maxSpousal - ownPIA;

    // Apply early claiming reduction if claiming before FRA
    const fraDecimal = getFRADecimal(birthYear);
    if (claimingAge < fraDecimal) {
      const monthsEarly = Math.round((fraDecimal - claimingAge) * 12);
      let reduction = 0;
      if (monthsEarly <= 36) {
        reduction = monthsEarly * (25 / 36 / 100);
      } else {
        reduction = 36 * (25 / 36 / 100) + (monthsEarly - 36) * (5 / 12 / 100);
      }
      return Math.max(0, spousalAmount * (1 - reduction));
    }

    return spousalAmount;
  }

  // Calculate earnings test withholding
  function calculateEarningsTest(earnings, claimingAge, birthYear, monthlyBenefit) {
    const fraDecimal = getFRADecimal(birthYear);

    // No earnings test at or after FRA
    if (claimingAge >= fraDecimal) {
      return { withheld: 0, effectiveMonthly: monthlyBenefit, monthsWithheld: 0 };
    }

    const annualBenefit = monthlyBenefit * 12;
    let withheld = 0;

    // Determine if this is the year reaching FRA
    const isYearOfFRA = Math.floor(claimingAge) === Math.floor(fraDecimal);

    if (isYearOfFRA) {
      // $1 per $3 above higher limit
      const excess = Math.max(0, earnings - EARNINGS_LIMIT_FRA_YEAR);
      withheld = Math.floor(excess / 3);
    } else {
      // $1 per $2 above lower limit
      const excess = Math.max(0, earnings - EARNINGS_LIMIT_BEFORE_FRA);
      withheld = Math.floor(excess / 2);
    }

    // Cannot withhold more than annual benefit
    withheld = Math.min(withheld, annualBenefit);
    const monthsWithheld = Math.ceil(withheld / monthlyBenefit);
    const effectiveAnnual = annualBenefit - withheld;

    return {
      withheld: withheld,
      effectiveMonthly: effectiveAnnual / 12,
      monthsWithheld: monthsWithheld
    };
  }

  // Calculate breakeven age comparing two claiming ages
  function calculateBreakevenAge(pia, birthYear, earlyAge, lateAge, colaRate) {
    const earlyFactor = calculateBenefitAdjustment(earlyAge, birthYear);
    const lateFactor = calculateBenefitAdjustment(lateAge, birthYear);

    const earlyMonthly = pia * earlyFactor;
    const lateMonthly = pia * lateFactor;

    let earlyCumulative = 0;
    let lateCumulative = 0;
    const monthlyColaRate = Math.pow(1 + colaRate / 100, 1 / 12) - 1;

    // Simulate month by month from age 62
    const startMonth = 62 * 12;
    const endMonth = 110 * 12; // search up to age 110

    let earlyMonthlyAdj = earlyMonthly;
    let lateMonthlyAdj = lateMonthly;
    let breakeven = null;

    for (let month = startMonth; month < endMonth; month++) {
      const age = month / 12;

      if (age >= earlyAge) {
        earlyCumulative += earlyMonthlyAdj;
        earlyMonthlyAdj *= (1 + monthlyColaRate);
      }

      if (age >= lateAge) {
        lateCumulative += lateMonthlyAdj;
        lateMonthlyAdj *= (1 + monthlyColaRate);
      }

      if (lateCumulative > earlyCumulative && !breakeven) {
        breakeven = age;
      }
    }

    return breakeven;
  }

  // Calculate cumulative benefits over time
  function calculateCumulativeBenefits(pia, birthYear, claimingAge, colaRate, toAge) {
    const factor = calculateBenefitAdjustment(claimingAge, birthYear);
    let monthlyBenefit = pia * factor;
    let cumulative = 0;
    const monthlyColaRate = Math.pow(1 + colaRate / 100, 1 / 12) - 1;
    const data = [];

    for (let age = 62; age <= toAge; age++) {
      if (age >= claimingAge) {
        for (let m = 0; m < 12; m++) {
          cumulative += monthlyBenefit;
          monthlyBenefit *= (1 + monthlyColaRate);
        }
      }
      data.push({ age: age, cumulative: cumulative });
    }

    return data;
  }

  // Format currency
  function formatCurrency(amount) {
    return '$' + Math.round(amount).toLocaleString('en-US');
  }

  function formatCurrencyDecimal(amount) {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // DOM helpers
  function getValue(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    return parseFloat(el.value) || 0;
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function showError(message) {
    const resultDiv = document.getElementById('social-security-result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = '<div class="error-message" style="color: var(--color-error); padding: 1rem; background: var(--color-highlight-red); border-radius: 8px;">' + message + '</div>';
  }

  // Load values from URL
  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('age')) setValue('current-age', params.get('age'));
    if (params.has('birth_year')) setValue('birth-year', params.get('birth_year'));
    if (params.has('earnings')) setValue('average-earnings', params.get('earnings'));
    if (params.has('years')) setValue('years-worked', params.get('years'));
    if (params.has('retire_age')) setValue('expected-retirement-age', params.get('retire_age'));
    if (params.has('claim_age')) setValue('claiming-age', params.get('claim_age'));
    if (params.has('marital')) {
      const el = document.getElementById('marital-status');
      if (el) { el.value = params.get('marital'); toggleSpouseFields(); }
    }
    if (params.has('spouse_benefit')) setValue('spouse-benefit', params.get('spouse_benefit'));
    if (params.has('spouse_age')) setValue('spouse-claiming-age', params.get('spouse_age'));
    if (params.has('cola')) setValue('cola-rate', params.get('cola'));
    if (params.has('life')) setValue('life-expectancy', params.get('life'));
    if (params.has('working')) {
      const el = document.getElementById('working-while-claiming');
      if (el) { el.value = params.get('working'); toggleEarningsField(); }
    }
    if (params.has('work_earnings')) setValue('earnings-while-claiming', params.get('work_earnings'));

    if (params.toString()) setTimeout(function() { calculateResults(); }, 100);
  }

  // Save values to URL
  function saveToURL() {
    const params = new URLSearchParams();
    params.set('age', getValue('current-age'));
    params.set('birth_year', getValue('birth-year'));
    params.set('earnings', getValue('average-earnings'));
    params.set('years', getValue('years-worked'));
    params.set('retire_age', getValue('expected-retirement-age'));
    params.set('claim_age', getValue('claiming-age'));
    params.set('marital', document.getElementById('marital-status').value);
    params.set('spouse_benefit', getValue('spouse-benefit'));
    params.set('spouse_age', getValue('spouse-claiming-age'));
    params.set('cola', getValue('cola-rate'));
    params.set('life', getValue('life-expectancy'));
    params.set('working', document.getElementById('working-while-claiming').value);
    params.set('work_earnings', getValue('earnings-while-claiming'));
    var newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  // Toggle spouse fields visibility
  function toggleSpouseFields() {
    var status = document.getElementById('marital-status').value;
    var fields = document.getElementById('spouse-fields');
    if (fields) {
      fields.style.display = (status === 'married' || status === 'divorced' || status === 'widowed') ? '' : 'none';
    }
  }

  // Toggle earnings field visibility
  function toggleEarningsField() {
    var working = document.getElementById('working-while-claiming').value;
    var field = document.getElementById('earnings-field');
    if (field) {
      field.style.display = working === 'yes' ? '' : 'none';
    }
  }

  // Share calculation
  function shareCalculation() {
    saveToURL();
    var url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function() {
        var btn = document.getElementById('share-calculation');
        var originalText = btn.innerHTML;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Link Copied!';
        setTimeout(function() { btn.innerHTML = originalText; }, 2000);
      });
    } else {
      // Fallback
      var input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('Link copied to clipboard!');
    }
  }

  // Attach event listeners
  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', function() {
      calculateResults();
      var result = document.querySelector('.calculator-result');
      if (result) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('.form-input, .form-select').forEach(function(input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); calculateResults(); }
      });
      input.addEventListener('change', saveToURL);
    });

    document.getElementById('marital-status').addEventListener('change', toggleSpouseFields);
    document.getElementById('working-while-claiming').addEventListener('change', toggleEarningsField);
    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  // Main calculation
  function calculateResults() {
    var currentAge = getValue('current-age');
    var birthYear = getValue('birth-year');
    var averageEarnings = getValue('average-earnings');
    var yearsWorked = getValue('years-worked');
    var expectedRetirementAge = getValue('expected-retirement-age');
    var claimingAge = getValue('claiming-age');
    var maritalStatus = document.getElementById('marital-status').value;
    var spouseBenefit = getValue('spouse-benefit');
    var spouseClaimingAge = getValue('spouse-claiming-age');
    var colaRate = getValue('cola-rate');
    var lifeExpectancy = getValue('life-expectancy');
    var workingWhileClaiming = document.getElementById('working-while-claiming').value;
    var earningsWhileClaiming = getValue('earnings-while-claiming');

    // Validation
    if (birthYear < 1930 || birthYear > 2010) {
      showError('Please enter a valid birth year between 1930 and 2010.');
      return;
    }
    if (claimingAge < 62 || claimingAge > 70) {
      showError('Claiming age must be between 62 and 70.');
      return;
    }
    if (averageEarnings <= 0) {
      showError('Please enter a valid average annual earnings amount.');
      return;
    }
    if (yearsWorked < 10) {
      showError('You need at least 10 years of work (40 credits) to qualify for Social Security benefits.');
      return;
    }

    saveToURL();

    // Core calculations
    var fra = getFullRetirementAge(birthYear);
    var fraDecimal = getFRADecimal(birthYear);
    var aime = calculateAIME(averageEarnings, yearsWorked);
    var pia = calculatePIA(aime);

    // Benefit at chosen claiming age
    var adjustmentFactor = calculateBenefitAdjustment(claimingAge, birthYear);
    var monthlyBenefit = pia * adjustmentFactor;

    // Benefits at key ages
    var benefitAt62 = pia * calculateBenefitAdjustment(62, birthYear);
    var benefitAtFRA = pia; // 100% at FRA
    var benefitAt70 = pia * calculateBenefitAdjustment(70, birthYear);

    // Spousal benefit calculation
    var spousalBenefitAmount = 0;
    var spousalRecommendation = '';
    if (maritalStatus === 'married' || maritalStatus === 'divorced') {
      spousalBenefitAmount = calculateSpousalBenefit(spouseBenefit, pia, claimingAge, birthYear);
      if (spousalBenefitAmount > 0) {
        spousalRecommendation = 'You may be eligible for a spousal benefit of ' + formatCurrency(spousalBenefitAmount) + '/month in addition to your own benefit.';
      } else {
        spousalRecommendation = 'Your own benefit is higher than the spousal benefit. You will receive your full own benefit.';
      }
    } else if (maritalStatus === 'widowed') {
      // Survivor benefit: up to 100% of deceased spouse's benefit
      var survivorBenefit = spouseBenefit;
      if (claimingAge < fraDecimal && claimingAge >= 60) {
        var monthsEarly = Math.round((fraDecimal - claimingAge) * 12);
        var reduction = monthsEarly * (0.285 / (fraDecimal - 60) / 12);
        survivorBenefit = spouseBenefit * (1 - Math.min(reduction, 0.285));
      }
      if (survivorBenefit > monthlyBenefit) {
        spousalBenefitAmount = survivorBenefit - monthlyBenefit;
        spousalRecommendation = 'As a survivor, you may receive up to ' + formatCurrency(survivorBenefit) + '/month (the higher of your own or survivor benefit).';
      }
    }

    var totalMonthlyBenefit = monthlyBenefit + spousalBenefitAmount;

    // Earnings test
    var earningsTestResult = null;
    if (workingWhileClaiming === 'yes' && claimingAge < fraDecimal) {
      earningsTestResult = calculateEarningsTest(earningsWhileClaiming, claimingAge, birthYear, totalMonthlyBenefit);
    }

    // Breakeven analysis
    var breakeven62vsFRA = calculateBreakevenAge(pia, birthYear, 62, Math.ceil(fraDecimal), colaRate);
    var breakeven62vs70 = calculateBreakevenAge(pia, birthYear, 62, 70, colaRate);
    var breakevenFRAvs70 = calculateBreakevenAge(pia, birthYear, Math.ceil(fraDecimal), 70, colaRate);

    // COLA projection (15 years from claiming age)
    var colaProjection = [];
    var projectedBenefit = totalMonthlyBenefit;
    for (var y = 0; y <= 20; y++) {
      colaProjection.push({
        year: y,
        age: claimingAge + y,
        monthly: projectedBenefit,
        annual: projectedBenefit * 12
      });
      projectedBenefit *= (1 + colaRate / 100);
    }

    // Cumulative benefits for chart
    var cumulative62 = calculateCumulativeBenefits(pia, birthYear, 62, colaRate, lifeExpectancy);
    var cumulativeFRA = calculateCumulativeBenefits(pia, birthYear, Math.ceil(fraDecimal), colaRate, lifeExpectancy);
    var cumulative70 = calculateCumulativeBenefits(pia, birthYear, 70, colaRate, lifeExpectancy);

    // Optimal claiming age recommendation
    var optimalAge = determineOptimalAge(pia, birthYear, colaRate, lifeExpectancy);

    // Render results
    renderResults({
      fra: fra,
      fraDecimal: fraDecimal,
      aime: aime,
      pia: pia,
      claimingAge: claimingAge,
      monthlyBenefit: monthlyBenefit,
      totalMonthlyBenefit: totalMonthlyBenefit,
      benefitAt62: benefitAt62,
      benefitAtFRA: benefitAtFRA,
      benefitAt70: benefitAt70,
      adjustmentFactor: adjustmentFactor,
      spousalBenefitAmount: spousalBenefitAmount,
      spousalRecommendation: spousalRecommendation,
      maritalStatus: maritalStatus,
      earningsTestResult: earningsTestResult,
      breakeven62vsFRA: breakeven62vsFRA,
      breakeven62vs70: breakeven62vs70,
      breakevenFRAvs70: breakevenFRAvs70,
      colaProjection: colaProjection,
      colaRate: colaRate,
      cumulative62: cumulative62,
      cumulativeFRA: cumulativeFRA,
      cumulative70: cumulative70,
      lifeExpectancy: lifeExpectancy,
      optimalAge: optimalAge
    });
  }

  // Determine optimal claiming age based on life expectancy
  function determineOptimalAge(pia, birthYear, colaRate, lifeExpectancy) {
    var maxCumulative = 0;
    var optimalAge = 62;
    var fraDecimal = getFRADecimal(birthYear);

    for (var age = 62; age <= 70; age++) {
      var data = calculateCumulativeBenefits(pia, birthYear, age, colaRate, lifeExpectancy);
      var lastEntry = data[data.length - 1];
      if (lastEntry && lastEntry.cumulative > maxCumulative) {
        maxCumulative = lastEntry.cumulative;
        optimalAge = age;
      }
    }

    return optimalAge;
  }

  // Render all results
  function renderResults(data) {
    var resultDiv = document.getElementById('social-security-result');
    resultDiv.classList.remove('hidden');

    var fraDisplay = data.fra.months > 0 ? data.fra.years + ' years, ' + data.fra.months + ' months' : data.fra.years + ' years';
    var adjustmentPercent = ((data.adjustmentFactor - 1) * 100).toFixed(1);
    var adjustmentLabel = data.adjustmentFactor >= 1 ? '+' + adjustmentPercent + '%' : adjustmentPercent + '%';

    var html = '';

    // Summary cards
    html += '<h3>Your Social Security Benefit Estimate</h3>';
    html += '<div class="ss-benefit-summary">';
    html += '<div class="ss-benefit-card">';
    html += '<h4>At Age 62</h4>';
    html += '<div class="amount">' + formatCurrency(data.benefitAt62) + '</div>';
    html += '<div class="detail">per month (reduced)</div>';
    html += '</div>';
    html += '<div class="ss-benefit-card' + (data.claimingAge === Math.ceil(data.fraDecimal) ? ' highlight' : '') + '">';
    html += '<h4>At FRA (' + fraDisplay + ')</h4>';
    html += '<div class="amount">' + formatCurrency(data.benefitAtFRA) + '</div>';
    html += '<div class="detail">per month (full PIA)</div>';
    html += '</div>';
    html += '<div class="ss-benefit-card">';
    html += '<h4>At Age 70</h4>';
    html += '<div class="amount">' + formatCurrency(data.benefitAt70) + '</div>';
    html += '<div class="detail">per month (maximum)</div>';
    html += '</div>';
    html += '<div class="ss-benefit-card highlight">';
    html += '<h4>Your Plan (Age ' + data.claimingAge + ')</h4>';
    html += '<div class="amount">' + formatCurrency(data.totalMonthlyBenefit) + '</div>';
    html += '<div class="detail">' + adjustmentLabel + ' from FRA' + (data.spousalBenefitAmount > 0 ? ' (incl. spousal)' : '') + '</div>';
    html += '</div>';
    html += '</div>';

    // Annual benefit
    html += '<div style="text-align: center; margin: 1rem 0; padding: 1rem; background: var(--color-surface-neutral); border-radius: 8px;">';
    html += '<strong>Estimated Annual Benefit at Age ' + data.claimingAge + ':</strong> ' + formatCurrency(data.totalMonthlyBenefit * 12) + '/year';
    html += '</div>';

    // Comparison table
    html += '<div class="breakeven-section">';
    html += '<h4>Benefit Comparison by Claiming Age</h4>';
    html += '<div class="table-container">';
    html += '<table class="ss-comparison-table">';
    html += '<thead><tr><th>Claiming Age</th><th>Monthly Benefit</th><th>Annual Benefit</th><th>Adjustment</th><th>Cumulative by Age ' + data.lifeExpectancy + '</th></tr></thead>';
    html += '<tbody>';

    for (var age = 62; age <= 70; age++) {
      var factor = calculateBenefitAdjustment(age, getValue('birth-year'));
      var monthly = data.pia * factor;
      var annual = monthly * 12;
      var cumData = calculateCumulativeBenefits(data.pia, getValue('birth-year'), age, data.colaRate, data.lifeExpectancy);
      var cumTotal = cumData.length > 0 ? cumData[cumData.length - 1].cumulative : 0;
      var adjPercent = ((factor - 1) * 100).toFixed(1);
      var adjLabel = factor >= 1 ? '+' + adjPercent + '%' : adjPercent + '%';
      var isSelected = age === data.claimingAge;
      var isOptimal = age === data.optimalAge;
      var rowClass = '';
      if (isSelected) rowClass = ' class="selected-row"';
      else if (isOptimal) rowClass = ' class="optimal-row"';

      html += '<tr' + rowClass + '>';
      html += '<td>Age ' + age + (isSelected ? ' (Your Plan)' : '') + (isOptimal && !isSelected ? ' (Optimal)' : '') + '</td>';
      html += '<td>' + formatCurrency(monthly) + '</td>';
      html += '<td>' + formatCurrency(annual) + '</td>';
      html += '<td>' + adjLabel + '</td>';
      html += '<td>' + formatCurrency(cumTotal) + '</td>';
      html += '</tr>';
    }

    html += '</tbody></table>';
    html += '</div></div>';

    // Breakeven analysis
    html += '<div class="breakeven-section">';
    html += '<h4>Breakeven Age Analysis</h4>';
    html += '<p>This shows when waiting to claim "pays off" compared to claiming earlier:</p>';
    html += '<table class="ss-comparison-table">';
    html += '<thead><tr><th>Comparison</th><th>Breakeven Age</th><th>Interpretation</th></tr></thead>';
    html += '<tbody>';

    if (data.breakeven62vsFRA) {
      html += '<tr><td>Age 62 vs. FRA</td><td>Age ' + data.breakeven62vsFRA.toFixed(1) + '</td>';
      html += '<td>' + (data.lifeExpectancy > data.breakeven62vsFRA ? 'Waiting to FRA pays off by your life expectancy' : 'Claiming at 62 may be better given your life expectancy') + '</td></tr>';
    }
    if (data.breakeven62vs70) {
      html += '<tr><td>Age 62 vs. Age 70</td><td>Age ' + data.breakeven62vs70.toFixed(1) + '</td>';
      html += '<td>' + (data.lifeExpectancy > data.breakeven62vs70 ? 'Waiting to 70 pays off by your life expectancy' : 'Claiming at 62 may be better given your life expectancy') + '</td></tr>';
    }
    if (data.breakevenFRAvs70) {
      html += '<tr><td>FRA vs. Age 70</td><td>Age ' + data.breakevenFRAvs70.toFixed(1) + '</td>';
      html += '<td>' + (data.lifeExpectancy > data.breakevenFRAvs70 ? 'Waiting to 70 pays off by your life expectancy' : 'Claiming at FRA may be better given your life expectancy') + '</td></tr>';
    }

    html += '</tbody></table>';
    html += '</div>';

    // Cumulative benefits chart (SVG)
    html += '<div class="breakeven-section">';
    html += '<h4>Cumulative Lifetime Benefits Comparison</h4>';
    html += '<div class="cumulative-chart">';
    html += renderCumulativeChart(data.cumulative62, data.cumulativeFRA, data.cumulative70, data.lifeExpectancy, data.fraDecimal);
    html += '</div>';
    html += '<div class="chart-legend">';
    html += '<div class="legend-item"><span class="legend-swatch" style="background: #ef4444;"></span> Claim at 62</div>';
    html += '<div class="legend-item"><span class="legend-swatch" style="background: #3b82f6;"></span> Claim at FRA</div>';
    html += '<div class="legend-item"><span class="legend-swatch" style="background: #10b981;"></span> Claim at 70</div>';
    html += '</div>';
    html += '</div>';

    // COLA projection table
    html += '<div class="breakeven-section">';
    html += '<h4>Benefit Projection with ' + data.colaRate + '% Annual COLA</h4>';
    html += '<div class="table-container">';
    html += '<table class="cola-projection-table">';
    html += '<thead><tr><th>Year</th><th>Age</th><th>Monthly Benefit</th><th>Annual Benefit</th></tr></thead>';
    html += '<tbody>';

    var projectionYears = Math.min(data.colaProjection.length, 20);
    for (var i = 0; i < projectionYears; i++) {
      var row = data.colaProjection[i];
      if (row.age <= data.lifeExpectancy) {
        html += '<tr>';
        html += '<td>Year ' + row.year + '</td>';
        html += '<td>' + row.age + '</td>';
        html += '<td>' + formatCurrency(row.monthly) + '</td>';
        html += '<td>' + formatCurrency(row.annual) + '</td>';
        html += '</tr>';
      }
    }

    html += '</tbody></table>';
    html += '</div></div>';

    // Spousal strategy
    if (data.maritalStatus !== 'single' && data.spousalRecommendation) {
      html += '<div class="spousal-section">';
      html += '<h4>Spousal Benefit Analysis</h4>';
      html += '<p>' + data.spousalRecommendation + '</p>';
      if (data.spousalBenefitAmount > 0) {
        html += '<p><strong>Additional spousal benefit:</strong> ' + formatCurrency(data.spousalBenefitAmount) + '/month (' + formatCurrency(data.spousalBenefitAmount * 12) + '/year)</p>';
      }
      if (data.maritalStatus === 'married') {
        html += '<p style="margin-top: 0.75rem; font-size: 0.9rem; color: var(--color-gray-dark);"><strong>Tip:</strong> Coordinating claiming ages between spouses can maximize household benefits. Often the higher earner should delay to 70 while the lower earner claims earlier.</p>';
      }
      html += '</div>';
    }

    // Earnings test impact
    if (data.earningsTestResult) {
      html += '<div class="earnings-test-result">';
      html += '<h4>Earnings Test Impact</h4>';
      if (data.earningsTestResult.withheld > 0) {
        html += '<p><strong>Annual withholding:</strong> ' + formatCurrency(data.earningsTestResult.withheld) + ' will be withheld from your benefits.</p>';
        html += '<p><strong>Months of benefits withheld:</strong> approximately ' + data.earningsTestResult.monthsWithheld + ' months per year.</p>';
        html += '<p><strong>Effective monthly benefit:</strong> ' + formatCurrency(data.earningsTestResult.effectiveMonthly) + '</p>';
        html += '<p style="margin-top: 0.75rem; font-size: 0.9rem;"><strong>Note:</strong> Benefits withheld due to the earnings test are not permanently lost. After you reach FRA, your benefit will be recalculated to credit you for months when benefits were withheld.</p>';
      } else {
        html += '<p>No benefits will be withheld. Your earnings do not exceed the annual limit.</p>';
      }
      html += '</div>';
    }

    // Optimal claiming recommendation
    html += '<div class="recommendation-box">';
    html += '<h4>Optimal Claiming Age Recommendation</h4>';
    html += '<p>Based on your life expectancy of <strong>' + data.lifeExpectancy + '</strong> and a <strong>' + data.colaRate + '%</strong> annual COLA:</p>';
    html += '<p style="font-size: 1.2rem; margin: 1rem 0;"><strong>Recommended claiming age: ' + data.optimalAge + '</strong></p>';

    if (data.optimalAge === data.claimingAge) {
      html += '<p>Your planned claiming age of ' + data.claimingAge + ' aligns with the optimal strategy for maximizing lifetime benefits.</p>';
    } else if (data.optimalAge > data.claimingAge) {
      var additionalMonthly = (data.pia * calculateBenefitAdjustment(data.optimalAge, getValue('birth-year'))) - data.monthlyBenefit;
      html += '<p>Waiting until age ' + data.optimalAge + ' would increase your monthly benefit by approximately ' + formatCurrency(additionalMonthly) + '/month compared to claiming at age ' + data.claimingAge + '.</p>';
    } else {
      html += '<p>Given your life expectancy, claiming at age ' + data.optimalAge + ' would maximize your total lifetime benefits compared to waiting until age ' + data.claimingAge + '.</p>';
    }

    html += '<p style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--color-gray-dark);">Note: This recommendation is based purely on maximizing cumulative benefits. Other factors (health, financial need, spousal strategies, taxes) should also be considered.</p>';
    html += '</div>';

    // Summary stats
    html += '<div style="margin-top: 2rem; padding: 1.5rem; background: var(--color-surface-neutral); border-radius: 12px;">';
    html += '<h4>Calculation Details</h4>';
    html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">';
    html += '<div><strong>AIME:</strong> ' + formatCurrencyDecimal(data.aime) + '</div>';
    html += '<div><strong>PIA (at FRA):</strong> ' + formatCurrencyDecimal(data.pia) + '</div>';
    html += '<div><strong>Full Retirement Age:</strong> ' + fraDisplay + '</div>';
    html += '<div><strong>Adjustment Factor:</strong> ' + (data.adjustmentFactor * 100).toFixed(1) + '%</div>';
    html += '</div>';
    html += '</div>';

    resultDiv.innerHTML = html;
  }

  // Render SVG cumulative chart
  function renderCumulativeChart(data62, dataFRA, data70, lifeExpectancy, fraDecimal) {
    var width = 700;
    var height = 300;
    var padding = { top: 20, right: 20, bottom: 40, left: 70 };
    var chartWidth = width - padding.left - padding.right;
    var chartHeight = height - padding.top - padding.bottom;

    // Find max cumulative value
    var maxVal = 0;
    var allData = [data62, dataFRA, data70];
    allData.forEach(function(dataset) {
      dataset.forEach(function(d) {
        if (d.cumulative > maxVal) maxVal = d.cumulative;
      });
    });

    var minAge = 62;
    var maxAge = lifeExpectancy;
    var ageRange = maxAge - minAge;

    function xScale(age) {
      return padding.left + ((age - minAge) / ageRange) * chartWidth;
    }

    function yScale(val) {
      return padding.top + chartHeight - (val / maxVal) * chartHeight;
    }

    function buildPath(dataset) {
      var pathParts = [];
      dataset.forEach(function(d, i) {
        if (d.age >= minAge && d.age <= maxAge) {
          var x = xScale(d.age);
          var y = yScale(d.cumulative);
          pathParts.push((pathParts.length === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1));
        }
      });
      return pathParts.join(' ');
    }

    var svg = '<svg viewBox="0 0 ' + width + ' ' + height + '" xmlns="http://www.w3.org/2000/svg">';

    // Grid lines
    var gridLines = 5;
    for (var i = 0; i <= gridLines; i++) {
      var yPos = padding.top + (i / gridLines) * chartHeight;
      var val = maxVal * (1 - i / gridLines);
      svg += '<line x1="' + padding.left + '" y1="' + yPos + '" x2="' + (width - padding.right) + '" y2="' + yPos + '" stroke="#e5e7eb" stroke-width="1"/>';
      svg += '<text x="' + (padding.left - 5) + '" y="' + (yPos + 4) + '" text-anchor="end" font-size="10" fill="#6b7280">' + formatCurrency(val) + '</text>';
    }

    // X-axis labels
    for (var age = minAge; age <= maxAge; age += 5) {
      var xPos = xScale(age);
      svg += '<text x="' + xPos + '" y="' + (height - 10) + '" text-anchor="middle" font-size="10" fill="#6b7280">' + age + '</text>';
    }

    // Axis labels
    svg += '<text x="' + (width / 2) + '" y="' + (height - 0) + '" text-anchor="middle" font-size="11" fill="#374151">Age</text>';

    // Data lines
    svg += '<path d="' + buildPath(data62) + '" fill="none" stroke="#ef4444" stroke-width="2.5"/>';
    svg += '<path d="' + buildPath(dataFRA) + '" fill="none" stroke="#3b82f6" stroke-width="2.5"/>';
    svg += '<path d="' + buildPath(data70) + '" fill="none" stroke="#10b981" stroke-width="2.5"/>';

    svg += '</svg>';
    return svg;
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    toggleSpouseFields();
    toggleEarningsField();
    loadFromURL();
    attachEventListeners();
  });

})();
