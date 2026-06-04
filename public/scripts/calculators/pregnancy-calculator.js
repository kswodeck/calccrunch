(function() {
  'use strict';

  const WEIGHT_GAIN = {
    underweight: { total: [28, 40], weeklyRate: 1.0, label: 'Underweight' },
    normal:      { total: [25, 35], weeklyRate: 1.0, label: 'Normal' },
    overweight:  { total: [15, 25], weeklyRate: 0.6, label: 'Overweight' },
    obese:       { total: [11, 20], weeklyRate: 0.5, label: 'Obese' }
  };

  const TWINS_EXTRA = [10, 15];

  const WEEK_DESCRIPTIONS = {
    4: 'Implantation complete; pregnancy hormone (hCG) rising',
    5: 'Heart begins to form; neural tube developing',
    6: 'Heartbeat may be detectable on ultrasound',
    7: 'Arms and legs begin forming; brain growing rapidly',
    8: 'Fingers and toes forming; facial features developing',
    9: 'All essential organs have begun forming',
    10: 'Baby is now called a fetus; vital organs functioning',
    11: 'Bones hardening; baby can make fist',
    12: 'End of first trimester; reflexes developing',
    13: 'Second trimester begins; fingerprints forming',
    14: 'Baby can squint, frown; body growing faster than head',
    15: 'Baby is forming taste buds; may sense light',
    16: 'Baby can make sucking motions; gender may be visible',
    17: 'Fat stores beginning to develop; skeleton hardening',
    18: 'Baby may begin to hear; can yawn and hiccup',
    19: 'Vernix coating forming to protect skin',
    20: 'Halfway point! Baby is about 10 inches long',
    21: 'Movements becoming more coordinated',
    22: 'Eyes formed but iris lacks pigment; lungs developing',
    23: 'Baby can hear sounds outside the womb',
    24: 'Viability milestone; lungs producing surfactant',
    25: 'Baby responds to voice; gaining weight steadily',
    26: 'Eyes can open; brain tissue developing rapidly',
    27: 'Baby can recognize your voice; sleep cycles emerging',
    28: 'Third trimester begins; baby can blink and dream',
    29: 'Baby is getting stronger; bones fully developed',
    30: 'Brain growing rapidly; baby practicing breathing',
    31: 'All five senses are working; baby is gaining fat',
    32: 'Baby has toenails and fingernails; may turn head-down',
    33: 'Bones hardening; baby is getting cramped',
    34: 'Lungs and nervous system maturing',
    35: 'Baby is gaining about half a pound per week',
    36: 'Baby dropping lower in preparation for birth',
    37: 'Full term! Baby is ready for life outside the womb',
    38: 'Brain and lungs continue to mature',
    39: 'Baby is full-sized; waiting for labor to start',
    40: 'Due date! Baby is fully developed'
  };

  let currentMethod = 'lmp';

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('method')) {
      currentMethod = params.get('method');
      setMethod(currentMethod);
    }
    if (params.has('lmp')) setValue('lmp-date', params.get('lmp'));
    if (params.has('cycle')) setValue('cycle-length', params.get('cycle'));
    if (params.has('conception')) setValue('conception-date', params.get('conception'));
    if (params.has('ivf')) setValue('ivf-date', params.get('ivf'));
    if (params.has('ivfday')) setValue('ivf-day', params.get('ivfday'));
    if (params.has('usdate')) setValue('ultrasound-date', params.get('usdate'));
    if (params.has('usweeks')) setValue('us-weeks', params.get('usweeks'));
    if (params.has('usdays')) setValue('us-days', params.get('usdays'));
    if (params.has('bmi')) setValue('bmi-category', params.get('bmi'));
    if (params.has('first')) setValue('first-pregnancy', params.get('first'));
    if (params.has('multiples')) setValue('multiples', params.get('multiples'));

    if (params.toString()) setTimeout(() => calculateResults(), 100);
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('method', currentMethod);

    if (currentMethod === 'lmp') {
      const lmpVal = getValue('lmp-date');
      if (lmpVal) params.set('lmp', lmpVal);
      params.set('cycle', getValue('cycle-length'));
    } else if (currentMethod === 'conception') {
      const conVal = getValue('conception-date');
      if (conVal) params.set('conception', conVal);
    } else if (currentMethod === 'ivf') {
      const ivfVal = getValue('ivf-date');
      if (ivfVal) params.set('ivf', ivfVal);
      params.set('ivfday', getValue('ivf-day'));
    } else if (currentMethod === 'ultrasound') {
      const usVal = getValue('ultrasound-date');
      if (usVal) params.set('usdate', usVal);
      params.set('usweeks', getValue('us-weeks'));
      params.set('usdays', getValue('us-days'));
    }

    params.set('bmi', getValue('bmi-category'));
    params.set('first', getValue('first-pregnancy'));
    params.set('multiples', getValue('multiples'));

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', function() {
      calculateResults();
      var result = document.querySelector('.calculator-result');
      if (result) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('#method-toggle .toggle-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setMethod(this.dataset.method);
      });
    });

    document.querySelectorAll('.form-input, .form-select').forEach(function(input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); calculateResults(); }
      });
      input.addEventListener('change', saveToURL);
    });

    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function setMethod(method) {
    currentMethod = method;
    document.querySelectorAll('#method-toggle .toggle-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.method === method);
    });
    document.getElementById('lmp-section').classList.toggle('hidden', method !== 'lmp');
    document.getElementById('conception-section').classList.toggle('hidden', method !== 'conception');
    document.getElementById('ivf-section').classList.toggle('hidden', method !== 'ivf');
    document.getElementById('ultrasound-section').classList.toggle('hidden', method !== 'ultrasound');
  }

  function calculateResults() {
    saveToURL();

    var dueDate = null;
    var lmpDate = null;

    if (currentMethod === 'lmp') {
      var lmpValue = getValue('lmp-date');
      if (!lmpValue) { showError('Please enter the first day of your last menstrual period.'); return; }
      lmpDate = new Date(lmpValue + 'T00:00:00');
      var cycleLength = parseInt(getValue('cycle-length')) || 28;
      var adjustment = cycleLength - 28;
      dueDate = new Date(lmpDate.getTime());
      dueDate.setDate(dueDate.getDate() + 280 + adjustment);
    } else if (currentMethod === 'conception') {
      var conceptionValue = getValue('conception-date');
      if (!conceptionValue) { showError('Please enter the conception date.'); return; }
      var conceptionDate = new Date(conceptionValue + 'T00:00:00');
      dueDate = new Date(conceptionDate.getTime());
      dueDate.setDate(dueDate.getDate() + 266);
      lmpDate = new Date(conceptionDate.getTime());
      lmpDate.setDate(lmpDate.getDate() - 14);
    } else if (currentMethod === 'ivf') {
      var ivfValue = getValue('ivf-date');
      if (!ivfValue) { showError('Please enter the IVF transfer date.'); return; }
      var ivfDate = new Date(ivfValue + 'T00:00:00');
      var ivfDay = parseInt(getValue('ivf-day')) || 5;
      var daysToAdd = ivfDay === 5 ? 261 : 263;
      dueDate = new Date(ivfDate.getTime());
      dueDate.setDate(dueDate.getDate() + daysToAdd);
      lmpDate = new Date(ivfDate.getTime());
      lmpDate.setDate(lmpDate.getDate() - (ivfDay === 5 ? 19 : 17));
    } else if (currentMethod === 'ultrasound') {
      var usValue = getValue('ultrasound-date');
      if (!usValue) { showError('Please enter the ultrasound date.'); return; }
      var usDate = new Date(usValue + 'T00:00:00');
      var usWeeks = parseInt(getValue('us-weeks')) || 8;
      var usDays = parseInt(getValue('us-days')) || 0;
      var gestationalDaysAtUS = usWeeks * 7 + usDays;
      var daysRemaining = 280 - gestationalDaysAtUS;
      dueDate = new Date(usDate.getTime());
      dueDate.setDate(dueDate.getDate() + daysRemaining);
      lmpDate = new Date(usDate.getTime());
      lmpDate.setDate(lmpDate.getDate() - gestationalDaysAtUS);
    }

    if (!dueDate || !lmpDate) { showError('Unable to calculate due date. Please check your inputs.'); return; }

    var multiples = getValue('multiples');
    var adjustedDueDate = new Date(dueDate.getTime());
    if (multiples === 'twins') {
      adjustedDueDate.setDate(adjustedDueDate.getDate() - 21); // ~37 weeks
    } else if (multiples === 'triplets') {
      adjustedDueDate.setDate(adjustedDueDate.getDate() - 42); // ~34 weeks
    }

    displayResults(dueDate, adjustedDueDate, lmpDate, multiples);
  }

  function displayResults(dueDate, adjustedDueDate, lmpDate, multiples) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var totalDays = 280;
    var daysSinceLMP = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
    var currentWeek = Math.floor(daysSinceLMP / 7);
    var currentDay = daysSinceLMP % 7;
    var daysRemaining = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
    var progressPercent = Math.min(100, Math.max(0, (daysSinceLMP / totalDays) * 100));

    var isCurrentlyPregnant = daysSinceLMP >= 0 && daysRemaining >= -14;

    var trimester = currentWeek < 13 ? 1 : currentWeek < 28 ? 2 : 3;
    var trimesterLabel = trimester === 1 ? 'First' : trimester === 2 ? 'Second' : 'Third';

    var bmiCategory = getValue('bmi-category') || 'normal';
    var firstPregnancy = getValue('first-pregnancy') === 'yes';
    var wg = WEIGHT_GAIN[bmiCategory];
    var weightGainMin = wg.total[0];
    var weightGainMax = wg.total[1];
    if (multiples === 'twins') {
      weightGainMin += TWINS_EXTRA[0];
      weightGainMax += TWINS_EXTRA[1];
    } else if (multiples === 'triplets') {
      weightGainMin += TWINS_EXTRA[0] * 2;
      weightGainMax += TWINS_EXTRA[1] * 2;
    }

    // Calculate milestone dates
    var conceptionEst = new Date(lmpDate.getTime());
    conceptionEst.setDate(conceptionEst.getDate() + 14);

    var endFirstTri = new Date(lmpDate.getTime());
    endFirstTri.setDate(endFirstTri.getDate() + 12 * 7);

    var genderRevealStart = new Date(lmpDate.getTime());
    genderRevealStart.setDate(genderRevealStart.getDate() + 16 * 7);

    var anatomyScanStart = new Date(lmpDate.getTime());
    anatomyScanStart.setDate(anatomyScanStart.getDate() + 18 * 7);

    var anatomyScanEnd = new Date(lmpDate.getTime());
    anatomyScanEnd.setDate(anatomyScanEnd.getDate() + 22 * 7);

    var viability = new Date(lmpDate.getTime());
    viability.setDate(viability.getDate() + 24 * 7);

    var thirdTriStart = new Date(lmpDate.getTime());
    thirdTriStart.setDate(thirdTriStart.getDate() + 28 * 7);

    var fullTerm = new Date(lmpDate.getTime());
    fullTerm.setDate(fullTerm.getDate() + 37 * 7);

    var lateTerm = new Date(lmpDate.getTime());
    lateTerm.setDate(lateTerm.getDate() + 42 * 7);

    var glucoseTest = new Date(lmpDate.getTime());
    glucoseTest.setDate(glucoseTest.getDate() + 26 * 7);

    var groupBStrep = new Date(lmpDate.getTime());
    groupBStrep.setDate(groupBStrep.getDate() + 36 * 7);

    var displayDueDate = multiples !== 'singleton' ? adjustedDueDate : dueDate;

    var resultDiv = document.getElementById('pregnancy-result');

    var statusClass = daysRemaining > 0 ? 'status-good' : 'status-excellent';
    var statusIcon = '🤰';
    var statusMessage = '';

    if (!isCurrentlyPregnant && daysSinceLMP < 0) {
      statusMessage = 'The date you entered is in the future. Showing projected timeline.';
      statusIcon = '📅';
    } else if (daysRemaining <= 0) {
      statusMessage = 'Your due date has passed! Every baby comes on their own schedule.';
      statusIcon = '👶';
      statusClass = 'status-excellent';
    } else {
      statusMessage = 'You are ' + currentWeek + ' weeks and ' + currentDay + ' day' + (currentDay !== 1 ? 's' : '') + ' pregnant (' + trimesterLabel + ' trimester)';
    }

    var html = '';
    html += '<h3>🍼 Your Pregnancy Timeline</h3>';

    html += '<div class="profit-status ' + statusClass + '">';
    html += '<div class="status-icon">' + statusIcon + '</div>';
    html += '<div class="status-content">';
    html += '<strong>' + statusMessage + '</strong>';
    html += '<p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Estimated Due Date: <strong>' + formatDateLong(displayDueDate) + '</strong></p>';
    html += '</div>';
    html += '</div>';

    // Due date card
    html += '<div class="margin-cards">';
    html += '<div class="margin-card highlight">';
    html += '<div class="margin-card-icon">📅</div>';
    html += '<div class="margin-card-value">' + formatDateShort(displayDueDate) + '</div>';
    html += '<div class="margin-card-label">' + getDayOfWeek(displayDueDate) + '</div>';
    html += '<small style="color: var(--color-gray-dark)">Estimated Due Date</small>';
    html += '</div>';

    if (isCurrentlyPregnant && daysRemaining > 0) {
      html += '<div class="margin-card">';
      html += '<div class="margin-card-icon">📊</div>';
      html += '<div class="margin-card-value">' + currentWeek + 'w ' + currentDay + 'd</div>';
      html += '<div class="margin-card-label">Current Gestational Age</div>';
      html += '<small style="color: var(--color-gray-dark)">' + trimesterLabel + ' Trimester</small>';
      html += '</div>';

      html += '<div class="margin-card">';
      html += '<div class="margin-card-icon">⏳</div>';
      html += '<div class="margin-card-value">' + daysRemaining + '</div>';
      html += '<div class="margin-card-label">Days Remaining</div>';
      html += '<small style="color: var(--color-gray-dark)">Until due date</small>';
      html += '</div>';

      html += '<div class="margin-card">';
      html += '<div class="margin-card-icon">✅</div>';
      html += '<div class="margin-card-value">' + Math.round(progressPercent) + '%</div>';
      html += '<div class="margin-card-label">Complete</div>';
      html += '<small style="color: var(--color-gray-dark)">' + (280 - daysRemaining) + ' of 280 days</small>';
      html += '</div>';
    }
    html += '</div>';

    // Progress bar
    if (isCurrentlyPregnant && daysRemaining > 0) {
      html += '<div class="profit-breakdown">';
      html += '<h4>📈 Pregnancy Progress</h4>';
      html += '<div style="padding: 1rem;">';
      html += '<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--color-gray-dark);">';
      html += '<span>Week ' + currentWeek + '</span>';
      html += '<span>Week 40</span>';
      html += '</div>';
      html += '<div style="background: var(--color-bg-secondary); border-radius: 10px; height: 24px; overflow: hidden; position: relative;">';

      // Trimester markers
      html += '<div style="position: absolute; left: 30%; top: 0; bottom: 0; width: 1px; background: var(--color-border); z-index: 1;"></div>';
      html += '<div style="position: absolute; left: 67.5%; top: 0; bottom: 0; width: 1px; background: var(--color-border); z-index: 1;"></div>';

      var barColor = trimester === 1 ? 'var(--color-success)' : trimester === 2 ? 'var(--color-primary)' : '#7c3aed';
      html += '<div style="height: 100%; width: ' + progressPercent + '%; background: ' + barColor + '; border-radius: 10px; transition: width 0.5s ease;"></div>';
      html += '</div>';
      html += '<div style="display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.75rem; color: var(--color-gray-dark);">';
      html += '<span>1st Trimester</span>';
      html += '<span>2nd Trimester</span>';
      html += '<span>3rd Trimester</span>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
    }

    // Full term window
    html += '<div class="profit-breakdown">';
    html += '<h4>🏥 Full Term Window</h4>';
    html += '<div style="padding: 1rem;">';
    html += '<p style="margin-bottom: 1rem; color: var(--color-gray-dark); font-size: 0.9rem;">Most babies arrive between 37-42 weeks. Only about 5% arrive on the exact due date.</p>';
    html += '<div class="breakdown-table-container">';
    html += '<table class="profit-table">';
    html += '<thead><tr><th>Term</th><th>Weeks</th><th>Date Range</th></tr></thead>';
    html += '<tbody>';
    html += '<tr><td>Early Term</td><td>37-38 weeks</td><td>' + formatDateShort(fullTerm) + ' - ' + formatDateShort(addDays(fullTerm, 13)) + '</td></tr>';
    html += '<tr class="current-row"><td><strong>Full Term</strong></td><td>39-40 weeks</td><td>' + formatDateShort(addDays(fullTerm, 14)) + ' - ' + formatDateShort(dueDate) + '</td></tr>';
    html += '<tr><td>Late Term</td><td>41 weeks</td><td>' + formatDateShort(addDays(dueDate, 1)) + ' - ' + formatDateShort(addDays(dueDate, 7)) + '</td></tr>';
    html += '<tr><td>Post Term</td><td>42+ weeks</td><td>After ' + formatDateShort(lateTerm) + '</td></tr>';
    html += '</tbody></table></div>';
    html += '</div></div>';

    if (multiples !== 'singleton') {
      html += '<div class="insights-grid">';
      html += '<div class="insight-card insight-info">';
      html += '<div class="insight-icon">👶👶</div>';
      html += '<div class="insight-content">';
      html += '<h5>Multiple Pregnancy Note</h5>';
      html += '<p>';
      if (multiples === 'twins') {
        html += 'Twins are often delivered between 36-37 weeks. Your adjusted target date is <strong>' + formatDateShort(adjustedDueDate) + '</strong>. A singleton due date would be ' + formatDateShort(dueDate) + '.';
      } else {
        html += 'Triplets are often delivered around 34 weeks. Your adjusted target date is <strong>' + formatDateShort(adjustedDueDate) + '</strong>. A singleton due date would be ' + formatDateShort(dueDate) + '.';
      }
      html += '</p></div></div></div>';
    }

    // Key milestones timeline
    html += '<div class="profit-breakdown">';
    html += '<h4>🎯 Key Milestones & Dates</h4>';
    html += '<div class="breakdown-table-container">';
    html += '<table class="profit-table">';
    html += '<thead><tr><th>Milestone</th><th>Week</th><th>Date</th><th>Status</th></tr></thead>';
    html += '<tbody>';

    var milestones = [
      { name: 'Estimated Conception', week: 2, date: conceptionEst },
      { name: 'End of First Trimester', week: 12, date: endFirstTri },
      { name: 'Gender Reveal Window', week: 16, date: genderRevealStart },
      { name: 'Anatomy Scan', week: 18, date: anatomyScanStart, endDate: anatomyScanEnd },
      { name: 'Viability Milestone', week: 24, date: viability },
      { name: 'Glucose Screening', week: 26, date: glucoseTest },
      { name: 'Third Trimester Begins', week: 28, date: thirdTriStart },
      { name: 'Group B Strep Test', week: 36, date: groupBStrep },
      { name: 'Full Term', week: 37, date: fullTerm },
      { name: 'Due Date', week: 40, date: dueDate }
    ];

    milestones.forEach(function(m) {
      var status = '';
      var rowClass = '';
      if (today >= m.date) {
        status = '✅ Passed';
        rowClass = '';
      } else if (currentWeek >= m.week - 1 && currentWeek <= m.week + 1 && isCurrentlyPregnant) {
        status = '🔜 Coming up';
        rowClass = 'current-row';
      } else {
        status = '⏳ Upcoming';
        rowClass = '';
      }
      var dateStr = m.endDate ? formatDateShort(m.date) + ' - ' + formatDateShort(m.endDate) : formatDateShort(m.date);
      html += '<tr class="' + rowClass + '"><td><strong>' + m.name + '</strong></td><td>Week ' + m.week + '</td><td>' + dateStr + '</td><td>' + status + '</td></tr>';
    });

    html += '</tbody></table></div></div>';

    // Weight gain guidance
    html += '<div class="profit-breakdown">';
    html += '<h4>⚖️ Recommended Weight Gain</h4>';
    html += '<div style="padding: 1rem;">';
    html += '<p style="margin-bottom: 1rem; color: var(--color-gray-dark); font-size: 0.9rem;">Based on your ' + wg.label + ' BMI category' + (multiples !== 'singleton' ? ' (adjusted for multiples)' : '') + ':</p>';
    html += '<div class="breakdown-table-container">';
    html += '<table class="profit-table">';
    html += '<thead><tr><th>Period</th><th>Target Gain</th><th>Rate</th></tr></thead>';
    html += '<tbody>';
    html += '<tr><td>First Trimester (Weeks 1-12)</td><td>2-4 lbs total</td><td>Minimal</td></tr>';

    var weeklyMin2nd = (wg.weeklyRate * 0.8).toFixed(1);
    var weeklyMax2nd = wg.weeklyRate.toFixed(1);
    html += '<tr><td>Second Trimester (Weeks 13-27)</td><td>' + Math.round((weightGainMax - weightGainMin) / 3 + weightGainMin * 0.4) + '-' + Math.round(weightGainMax * 0.5) + ' lbs</td><td>~' + weeklyMin2nd + '-' + weeklyMax2nd + ' lb/week</td></tr>';
    html += '<tr><td>Third Trimester (Weeks 28-40)</td><td>' + Math.round(weightGainMax * 0.4) + '-' + Math.round(weightGainMax * 0.55) + ' lbs</td><td>~' + weeklyMin2nd + '-' + weeklyMax2nd + ' lb/week</td></tr>';
    html += '<tr class="current-row"><td><strong>Total Pregnancy</strong></td><td><strong>' + weightGainMin + '-' + weightGainMax + ' lbs</strong></td><td>-</td></tr>';
    html += '</tbody></table></div>';
    html += '</div></div>';

    // Week-by-week reference (show nearby weeks if currently pregnant)
    if (isCurrentlyPregnant && currentWeek >= 4 && currentWeek <= 40) {
      html += '<div class="profit-breakdown">';
      html += '<h4>📖 Week-by-Week Development</h4>';
      html += '<div class="breakdown-table-container">';
      html += '<table class="profit-table">';
      html += '<thead><tr><th>Week</th><th>Date</th><th>What\'s Happening</th></tr></thead>';
      html += '<tbody>';

      var startWeek = Math.max(4, currentWeek - 2);
      var endWeek = Math.min(40, currentWeek + 5);
      for (var w = startWeek; w <= endWeek; w++) {
        var weekDate = new Date(lmpDate.getTime());
        weekDate.setDate(weekDate.getDate() + w * 7);
        var desc = WEEK_DESCRIPTIONS[w] || 'Baby continues to grow and develop';
        var isCurrentWeek = w === currentWeek;
        html += '<tr class="' + (isCurrentWeek ? 'current-row' : '') + '">';
        html += '<td><strong>Week ' + w + (isCurrentWeek ? ' (now)' : '') + '</strong></td>';
        html += '<td>' + formatDateShort(weekDate) + '</td>';
        html += '<td>' + desc + '</td>';
        html += '</tr>';
      }

      html += '</tbody></table></div></div>';
    }

    // Important dates for calendar
    html += '<div class="profit-breakdown">';
    html += '<h4>📋 Important Dates for Your Calendar</h4>';
    html += '<div style="padding: 1rem;">';
    html += '<div class="breakdown-table-container">';
    html += '<table class="profit-table">';
    html += '<thead><tr><th>Appointment/Event</th><th>Suggested Date</th></tr></thead>';
    html += '<tbody>';

    var firstAppt = new Date(lmpDate.getTime());
    firstAppt.setDate(firstAppt.getDate() + 8 * 7);

    var datingScan = new Date(lmpDate.getTime());
    datingScan.setDate(datingScan.getDate() + 10 * 7);

    var ntScan = new Date(lmpDate.getTime());
    ntScan.setDate(ntScan.getDate() + 12 * 7);

    html += '<tr><td>First prenatal appointment</td><td>' + formatDateShort(firstAppt) + ' (around week 8)</td></tr>';
    html += '<tr><td>Dating ultrasound</td><td>' + formatDateShort(datingScan) + ' (week 8-12)</td></tr>';
    html += '<tr><td>NT scan / First trimester screening</td><td>' + formatDateShort(ntScan) + ' (week 11-13)</td></tr>';
    html += '<tr><td>Anatomy scan</td><td>' + formatDateShort(anatomyScanStart) + ' - ' + formatDateShort(anatomyScanEnd) + ' (week 18-22)</td></tr>';
    html += '<tr><td>Glucose tolerance test</td><td>' + formatDateShort(glucoseTest) + ' (week 24-28)</td></tr>';
    html += '<tr><td>Tdap vaccine</td><td>' + formatDateShort(thirdTriStart) + ' (week 27-36)</td></tr>';
    html += '<tr><td>Group B strep test</td><td>' + formatDateShort(groupBStrep) + ' (week 36-37)</td></tr>';

    if (firstPregnancy) {
      var hospitalTour = new Date(lmpDate.getTime());
      hospitalTour.setDate(hospitalTour.getDate() + 32 * 7);
      html += '<tr><td>Hospital tour / Birth plan</td><td>' + formatDateShort(hospitalTour) + ' (around week 32)</td></tr>';
    }

    var packBag = new Date(lmpDate.getTime());
    packBag.setDate(packBag.getDate() + 35 * 7);
    html += '<tr><td>Hospital bag packed</td><td>By ' + formatDateShort(packBag) + ' (by week 35)</td></tr>';
    html += '<tr class="current-row"><td><strong>Due Date</strong></td><td><strong>' + formatDateLong(displayDueDate) + '</strong></td></tr>';
    html += '</tbody></table></div>';
    html += '</div></div>';

    // Insights
    html += '<div class="insights-grid">';
    html += '<div class="insight-card insight-info">';
    html += '<div class="insight-icon">📊</div>';
    html += '<div class="insight-content">';
    html += '<h5>Due Date Accuracy</h5>';
    html += '<p>Only about 5% of babies arrive on their exact due date. About 80% are born within 2 weeks of the EDD (between 38-42 weeks).</p>';
    html += '</div></div>';

    html += '<div class="insight-card insight-success">';
    html += '<div class="insight-icon">💡</div>';
    html += '<div class="insight-content">';
    html += '<h5>' + (firstPregnancy ? 'First-Time Parent Tip' : 'Experienced Parent Tip') + '</h5>';
    if (firstPregnancy) {
      html += '<p>First babies tend to arrive a bit later than the due date on average. Use this extra time to prepare your home and rest!</p>';
    } else {
      html += '<p>Subsequent pregnancies may show earlier and feel different. You may feel movements sooner (around week 16 vs 20 for first pregnancies).</p>';
    }
    html += '</div></div>';
    html += '</div>';

    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    var resultDiv = document.getElementById('pregnancy-result');
    if (resultDiv) {
      resultDiv.innerHTML = '<div class="alert alert-error"><strong>Error:</strong> ' + message + '</div>';
      resultDiv.classList.remove('hidden');
    }
  }

  function shareCalculation() {
    var url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Pregnancy Due Date Calculator', url: url }).catch(function() { copyToClipboard(url); });
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      var btn = document.getElementById('share-calculation');
      if (btn) {
        var orig = btn.innerHTML;
        btn.innerHTML = '✓ Link Copied!';
        setTimeout(function() { btn.innerHTML = orig; }, 2000);
      }
    }).catch(function() {});
  }

  // Utility functions
  function getValue(id) { var el = document.getElementById(id); return el ? el.value : ''; }
  function setValue(id, value) { var el = document.getElementById(id); if (el) el.value = value; }

  function addDays(date, days) {
    var result = new Date(date.getTime());
    result.setDate(result.getDate() + days);
    return result;
  }

  function formatDateShort(date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }

  function formatDateLong(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }

  function getDayOfWeek(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }
})();
