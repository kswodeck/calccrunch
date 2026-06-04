(function() {
  'use strict';

  const ZODIAC_SIGNS = [
    { sign: 'Capricorn', start: [1, 1], end: [1, 19], symbol: '♑' },
    { sign: 'Aquarius', start: [1, 20], end: [2, 18], symbol: '♒' },
    { sign: 'Pisces', start: [2, 19], end: [3, 20], symbol: '♓' },
    { sign: 'Aries', start: [3, 21], end: [4, 19], symbol: '♈' },
    { sign: 'Taurus', start: [4, 20], end: [5, 20], symbol: '♉' },
    { sign: 'Gemini', start: [5, 21], end: [6, 20], symbol: '♊' },
    { sign: 'Cancer', start: [6, 21], end: [7, 22], symbol: '♋' },
    { sign: 'Leo', start: [7, 23], end: [8, 22], symbol: '♌' },
    { sign: 'Virgo', start: [8, 23], end: [9, 22], symbol: '♍' },
    { sign: 'Libra', start: [9, 23], end: [10, 22], symbol: '♎' },
    { sign: 'Scorpio', start: [10, 23], end: [11, 21], symbol: '♏' },
    { sign: 'Sagittarius', start: [11, 22], end: [12, 21], symbol: '♐' },
    { sign: 'Capricorn', start: [12, 22], end: [12, 31], symbol: '♑' }
  ];

  const CHINESE_ZODIAC = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];

  const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const asOfInput = document.getElementById('as-of-date');
    if (asOfInput) {
      asOfInput.value = formatDateForInput(today);
    }

    loadFromURL();
    attachEventListeners();
  });

  function formatDateForInput(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('dob')) {
      const dobEl = document.getElementById('birth-date');
      if (dobEl) dobEl.value = params.get('dob');
    }
    if (params.has('asof')) {
      const asOfEl = document.getElementById('as-of-date');
      if (asOfEl) asOfEl.value = params.get('asof');
    }

    if (params.has('dob')) {
      setTimeout(() => calculateResults(), 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    const dob = document.getElementById('birth-date').value;
    const asOf = document.getElementById('as-of-date').value;

    if (dob) params.set('dob', dob);
    if (asOf) params.set('asof', asOf);

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        calculateResults();
        document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    document.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateResults();
        }
      });
    });

    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }
  }

  function calculateResults() {
    const dobStr = document.getElementById('birth-date').value;
    const asOfStr = document.getElementById('as-of-date').value;

    if (!dobStr) {
      showError('Please enter your date of birth.');
      return;
    }

    const dob = new Date(dobStr + 'T00:00:00');
    const asOf = asOfStr ? new Date(asOfStr + 'T00:00:00') : new Date();

    if (dob >= asOf) {
      showError('Date of birth must be before the "as of" date.');
      return;
    }

    saveToURL();

    const age = calculateExactAge(dob, asOf);
    const totalDays = Math.floor((asOf - dob) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = age.years * 12 + age.months;
    const totalHours = totalDays * 24;

    const dayOfWeek = DAYS_OF_WEEK[dob.getDay()];
    const zodiac = getZodiacSign(dob.getMonth() + 1, dob.getDate());
    const chineseZodiac = CHINESE_ZODIAC[dob.getFullYear() % 12];
    const generation = getGeneration(dob.getFullYear());

    const nextBirthday = getNextBirthday(dob, asOf);
    const daysUntilBirthday = Math.ceil((nextBirthday - asOf) / (1000 * 60 * 60 * 24));
    const dayOfYear = getDayOfYear(asOf);
    const yearProgress = ((dayOfYear / (isLeapYear(asOf.getFullYear()) ? 366 : 365)) * 100).toFixed(1);

    const heartbeats = totalDays * 100000;
    const breaths = totalDays * 23000;
    const sleepHours = totalDays * 8;

    displayResults({
      age, totalDays, totalWeeks, totalMonths, totalHours,
      dayOfWeek, zodiac, chineseZodiac, generation,
      daysUntilBirthday, nextBirthday, yearProgress,
      heartbeats, breaths, sleepHours, dob, asOf
    });
  }

  function calculateExactAge(dob, asOf) {
    let years = asOf.getFullYear() - dob.getFullYear();
    let months = asOf.getMonth() - dob.getMonth();
    let days = asOf.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  function getZodiacSign(month, day) {
    for (const z of ZODIAC_SIGNS) {
      const [sm, sd] = z.start;
      const [em, ed] = z.end;
      if ((month === sm && day >= sd) || (month === em && day <= ed)) {
        return z;
      }
    }
    return ZODIAC_SIGNS[0];
  }

  function getGeneration(year) {
    if (year >= 2013) return { name: 'Gen Alpha', emoji: '💒' };
    if (year >= 1997) return { name: 'Gen Z', emoji: '📱' };
    if (year >= 1981) return { name: 'Millennial', emoji: '💻' };
    if (year >= 1965) return { name: 'Gen X', emoji: '🎸' };
    if (year >= 1946) return { name: 'Baby Boomer', emoji: '🌸' };
    if (year >= 1928) return { name: 'Silent Generation', emoji: '📻' };
    return { name: 'Greatest Generation', emoji: '⭐' };
  }

  function getNextBirthday(dob, asOf) {
    let next = new Date(asOf.getFullYear(), dob.getMonth(), dob.getDate());
    if (next <= asOf) {
      next = new Date(asOf.getFullYear() + 1, dob.getMonth(), dob.getDate());
    }
    return next;
  }

  function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  function displayResults(data) {
    const resultDiv = document.getElementById('age-result');
    if (!resultDiv) return;

    const milestones = getMilestones(data.dob, data.asOf);

    resultDiv.innerHTML = `
      <h3>🎂 Your Age</h3>

      <div class="age-hero">
        <div class="age-big">${data.age.years} <span class="age-unit">years</span> ${data.age.months} <span class="age-unit">months</span> ${data.age.days} <span class="age-unit">days</span></div>
      </div>

      <div class="age-badges">
        <span class="age-badge">📅 Born on a ${data.dayOfWeek}</span>
        <span class="age-badge">${data.zodiac.symbol} ${data.zodiac.sign}</span>
        <span class="age-badge">🐉 ${data.chineseZodiac} (Chinese)</span>
        <span class="age-badge">${data.generation.emoji} ${data.generation.name}</span>
      </div>

      <div class="margin-cards">
        <div class="margin-card">
          <div class="margin-card-icon">📆</div>
          <div class="margin-card-value">${data.totalDays.toLocaleString()}</div>
          <div class="margin-card-label">Days Lived</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">📅</div>
          <div class="margin-card-value">${data.totalWeeks.toLocaleString()}</div>
          <div class="margin-card-label">Weeks Lived</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">🗓️</div>
          <div class="margin-card-value">${data.totalMonths.toLocaleString()}</div>
          <div class="margin-card-label">Months Lived</div>
        </div>
        <div class="margin-card">
          <div class="margin-card-icon">⏰</div>
          <div class="margin-card-value">${data.totalHours.toLocaleString()}</div>
          <div class="margin-card-label">Hours Lived</div>
        </div>
      </div>

      <div class="birthday-countdown">
        <h4>🎉 Next Birthday Countdown</h4>
        <div class="countdown-display">
          <span class="countdown-number">${data.daysUntilBirthday}</span> days until you turn <strong>${data.age.years + 1}</strong>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${data.yearProgress}%"></div>
        </div>
        <small>${data.yearProgress}% through the current year</small>
      </div>

      <div class="milestones-section">
        <h4>🏆 Life Milestones</h4>
        <div class="milestones-timeline">
          ${milestones.map(m => `
            <div class="milestone-item ${m.passed ? 'passed' : 'upcoming'}">
              <div class="milestone-dot"></div>
              <div class="milestone-content">
                <strong>${m.label}</strong>
                <span>${m.date} ${m.passed ? '✓' : '(upcoming)'}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="fun-stats">
        <h4>🤩 Fun Statistics (Approximate)</h4>
        <div class="insights-grid">
          <div class="insight-card insight-info">
            <div class="insight-icon">💓</div>
            <div class="insight-content">
              <h5>Heartbeats</h5>
              <p>~${(data.heartbeats / 1000000000).toFixed(2)} billion</p>
            </div>
          </div>
          <div class="insight-card insight-success">
            <div class="insight-icon">🌬️</div>
            <div class="insight-content">
              <h5>Breaths Taken</h5>
              <p>~${(data.breaths / 1000000).toFixed(0)} million</p>
            </div>
          </div>
          <div class="insight-card insight-warning">
            <div class="insight-icon">😴</div>
            <div class="insight-content">
              <h5>Hours Slept</h5>
              <p>~${data.sleepHours.toLocaleString()} hours (${(data.sleepHours / 8760).toFixed(1)} years!)</p>
            </div>
          </div>
          <div class="insight-card insight-info">
            <div class="insight-icon">🍽️</div>
            <div class="insight-content">
              <h5>Meals Eaten</h5>
              <p>~${(data.totalDays * 3).toLocaleString()} meals</p>
            </div>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function getMilestones(dob, asOf) {
    const milestones = [
      { age: 13, label: 'Became a Teenager' },
      { age: 16, label: 'Driving Age' },
      { age: 18, label: 'Voting Age / Adult' },
      { age: 21, label: 'Drinking Age (US)' },
      { age: 25, label: 'Car Rental Age' },
      { age: 30, label: 'Turned 30' },
      { age: 40, label: 'Turned 40' },
      { age: 50, label: 'Half Century' },
      { age: 59.5, label: '401(k) Withdrawal Age' },
      { age: 62, label: 'Early Social Security' },
      { age: 65, label: 'Medicare Eligible' },
      { age: 67, label: 'Full Retirement Age' }
    ];

    return milestones.map(m => {
      const milestoneDate = new Date(dob.getFullYear() + Math.floor(m.age), dob.getMonth() + (m.age % 1 === 0.5 ? 6 : 0), dob.getDate());
      const passed = milestoneDate <= asOf;
      const dateStr = milestoneDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return { ...m, date: dateStr, passed };
    });
  }

  function showError(message) {
    const resultDiv = document.getElementById('age-result');
    if (resultDiv) {
      resultDiv.innerHTML = `<div class="alert alert-error"><strong>Error:</strong> ${message}</div>`;
      resultDiv.classList.remove('hidden');
    }
  }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Age Calculator', text: 'Check out my age calculation', url: url }).catch(() => copyToClipboard(url));
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const shareBtn = document.getElementById('share-calculation');
      if (shareBtn) {
        const original = shareBtn.innerHTML;
        shareBtn.innerHTML = '✓ Link Copied!';
        setTimeout(() => { shareBtn.innerHTML = original; }, 2000);
      }
    }).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
  }

})();
