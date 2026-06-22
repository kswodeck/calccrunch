(function () {
  'use strict';

  function parseDateUTC(str) {
    if (!str) return null;
    var parts = str.split('-');
    if (parts.length !== 3) return null;
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10) - 1;
    var d = parseInt(parts[2], 10);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
    return new Date(Date.UTC(y, m, d));
  }

  function toDateString(date) {
    var y = date.getUTCFullYear();
    var m = String(date.getUTCMonth() + 1).padStart(2, '0');
    var d = String(date.getUTCDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function dateDifference(startDate, endDate, inclusive) {
    var msPerDay = 86400000;
    var totalDays = Math.round((endDate - startDate) / msPerDay);
    if (inclusive) totalDays += 1;

    var weeks = Math.floor(totalDays / 7);
    var remainderDays = totalDays % 7;

    var sy = startDate.getUTCFullYear();
    var sm = startDate.getUTCMonth();
    var sd = startDate.getUTCDate();
    var ey = endDate.getUTCFullYear();
    var em = endDate.getUTCMonth();
    var ed = endDate.getUTCDate();

    var years = ey - sy;
    var months = em - sm;
    var days = ed - sd;

    if (days < 0) {
      months -= 1;
      var prevMonth = new Date(Date.UTC(ey, em, 0));
      days += prevMonth.getUTCDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (inclusive) {
      days += 1;
      var daysInCurrentMonth = new Date(Date.UTC(ey, em + 1, 0)).getUTCDate();
      if (days > daysInCurrentMonth) {
        days -= daysInCurrentMonth;
        months += 1;
        if (months >= 12) {
          months -= 12;
          years += 1;
        }
      }
    }

    var totalMonths = years * 12 + months;

    return {
      totalDays: totalDays,
      weeks: weeks,
      remainderDays: remainderDays,
      years: years,
      months: months,
      days: days,
      totalMonths: totalMonths
    };
  }

  function formatNumber(n) {
    return n.toLocaleString();
  }

  function pluralize(n, singular, plural) {
    return n === 1 ? singular : plural;
  }

  function monthName(d) {
    var names = ['January','February','March','April','May','June',
                 'July','August','September','October','November','December'];
    return names[d.getUTCMonth()];
  }

  function formatDisplayDate(d) {
    var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dow = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()).getDay();
    return dayNames[dow] + ', ' + monthName(d) + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var startInput = document.getElementById('start-date');
    var endInput = document.getElementById('end-date');
    var includeEndSelect = document.getElementById('include-end-day');
    var calculateBtn = document.getElementById('calculate-btn');
    var clearBtn = document.getElementById('clear-btn');
    var shareBtn = document.getElementById('share-calculation');
    var resultDiv = document.getElementById('date-difference-calculator-result');
    var shortcutBtns = document.querySelectorAll('.shortcut-btn');

    function readParams() {
      var params = new URLSearchParams(window.location.search);
      if (params.get('start')) startInput.value = params.get('start');
      if (params.get('end')) endInput.value = params.get('end');
      if (params.get('incl')) includeEndSelect.value = params.get('incl');
      if (params.get('start') && params.get('end')) calculate();
    }

    function saveParams() {
      var params = new URLSearchParams();
      if (startInput.value) params.set('start', startInput.value);
      if (endInput.value) params.set('end', endInput.value);
      params.set('incl', includeEndSelect.value);
      history.replaceState(null, '', window.location.pathname + '?' + params.toString());
    }

    function showError(msg) {
      resultDiv.classList.remove('hidden');
      resultDiv.innerHTML = '<div style="color: var(--color-error, #c0392b); padding: 1rem; font-weight: 600;">' + msg + '</div>';
    }

    function calculate() {
      var startVal = startInput.value;
      var endVal = endInput.value;
      if (!startVal || !endVal) {
        showError('Please enter both a start date and an end date.');
        return;
      }
      var startDate = parseDateUTC(startVal);
      var endDate = parseDateUTC(endVal);
      if (!startDate || !endDate) {
        showError('Please enter valid dates.');
        return;
      }
      if (endDate < startDate) {
        var tmp = startDate; startDate = endDate; endDate = tmp;
        var tmpV = startInput.value; startInput.value = endInput.value; endInput.value = tmpV;
      }
      var inclusive = includeEndSelect.value === 'yes';
      var diff = dateDifference(startDate, endDate, inclusive);

      saveParams();
      renderResult(startDate, endDate, diff, inclusive);
    }

    function renderResult(startDate, endDate, diff, inclusive) {
      var weeksLabel = diff.weeks + ' ' + pluralize(diff.weeks, 'week', 'weeks');
      if (diff.remainderDays > 0) {
        weeksLabel += ' + ' + diff.remainderDays + ' ' + pluralize(diff.remainderDays, 'day', 'days');
      }

      var durationParts = [];
      if (diff.years > 0) durationParts.push(diff.years + ' ' + pluralize(diff.years, 'year', 'years'));
      if (diff.months > 0) durationParts.push(diff.months + ' ' + pluralize(diff.months, 'month', 'months'));
      if (diff.days > 0 || durationParts.length === 0) durationParts.push(diff.days + ' ' + pluralize(diff.days, 'day', 'days'));
      var durationStr = durationParts.join(', ');

      var countNote = inclusive ? '(end date included)' : '(end date not counted)';

      resultDiv.classList.remove('hidden');
      resultDiv.innerHTML =
        '<div class="result-main">' +
          '<div class="result-label">Days Between Dates</div>' +
          '<div class="result-value">' + formatNumber(diff.totalDays) + '</div>' +
          '<div class="result-sublabel">' + countNote + '</div>' +
        '</div>' +
        '<div class="result-summary">' +
          '<div class="result-item">' +
            '<span class="result-item-label">From</span>' +
            '<span class="result-item-value">' + formatDisplayDate(startDate) + '</span>' +
          '</div>' +
          '<div class="result-item">' +
            '<span class="result-item-label">To</span>' +
            '<span class="result-item-value">' + formatDisplayDate(endDate) + '</span>' +
          '</div>' +
          '<div class="result-item">' +
            '<span class="result-item-label">Total Days</span>' +
            '<span class="result-item-value">' + formatNumber(diff.totalDays) + ' days</span>' +
          '</div>' +
          '<div class="result-item">' +
            '<span class="result-item-label">In Weeks</span>' +
            '<span class="result-item-value">' + weeksLabel + '</span>' +
          '</div>' +
          '<div class="result-item">' +
            '<span class="result-item-label">In Months</span>' +
            '<span class="result-item-value">' + diff.totalMonths + ' months</span>' +
          '</div>' +
          '<div class="result-item">' +
            '<span class="result-item-label">Years + Months + Days</span>' +
            '<span class="result-item-value">' + durationStr + '</span>' +
          '</div>' +
        '</div>';
    }

    shortcutBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var action = btn.getAttribute('data-action');
        var today = new Date();
        var todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
        var todayStr = toDateString(todayUTC);
        var year = today.getFullYear();
        var futureDate;

        if (action === 'today-plus-30') {
          futureDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 30));
          startInput.value = todayStr;
          endInput.value = toDateString(futureDate);
        } else if (action === 'today-plus-90') {
          futureDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 90));
          startInput.value = todayStr;
          endInput.value = toDateString(futureDate);
        } else if (action === 'year-start') {
          startInput.value = year + '-01-01';
          endInput.value = todayStr;
        } else if (action === 'year-end') {
          startInput.value = todayStr;
          endInput.value = year + '-12-31';
        }
        calculate();
      });
    });

    calculateBtn.addEventListener('click', calculate);

    clearBtn.addEventListener('click', function () {
      startInput.value = '';
      endInput.value = '';
      includeEndSelect.value = 'no';
      resultDiv.classList.add('hidden');
      resultDiv.innerHTML = '';
      history.replaceState(null, '', window.location.pathname);
    });

    if (shareBtn) {
      shareBtn.addEventListener('click', function () {
        var url = window.location.href;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(function () {
            shareBtn.textContent = 'Copied!';
            setTimeout(function () {
              shareBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> Share';
            }, 2000);
          });
        } else {
          window.prompt('Copy this link:', url);
        }
      });
    }

    readParams();
  });
})();
