(function() {
  'use strict';

  // Default debts
  const DEFAULT_DEBTS = [
    { name: 'Credit Card', balance: 5000, rate: 22.99, minPayment: 150 },
    { name: 'Car Loan', balance: 12000, rate: 6.5, minPayment: 350 },
    { name: 'Student Loan', balance: 25000, rate: 5.5, minPayment: 280 }
  ];

  const MAX_DEBTS = 15;
  const MAX_MONTHS = 600; // 50 year safety cap

  let state = {
    debts: [],
    extraPayment: 100
  };

  const DEBT_COLORS = [
    '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#10b981',
    '#06b6d4', '#ec4899', '#6366f1', '#14b8a6', '#f97316',
    '#84cc16', '#a855f7', '#e11d48', '#0891b2', '#65a30d'
  ];

  document.addEventListener('DOMContentLoaded', initializeCalculator);

  function initializeCalculator() {
    if (!loadStateFromURL()) {
      state.debts = DEFAULT_DEBTS.map(d => ({ ...d }));
      state.extraPayment = 100;
    }
    renderDebtRows();
    syncSliderAndInput();
    attachEventListeners();
  }

  function attachEventListeners() {
    // Calculate button
    document.getElementById('calculate-btn').addEventListener('click', function() {
      if (validateInputs()) {
        calculateResults();
        var resultEl = document.querySelector('.calculator-result');
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });

    // Extra payment input
    var extraInput = document.getElementById('extra-payment');
    var extraSlider = document.getElementById('extra-payment-slider');

    extraInput.addEventListener('input', function() {
      var val = parseFloat(this.value) || 0;
      state.extraPayment = val;
      if (val <= 2000) {
        extraSlider.value = val;
      }
      updateImpactPreview();
      saveStateToURL();
    });

    extraSlider.addEventListener('input', function() {
      var val = parseFloat(this.value) || 0;
      state.extraPayment = val;
      extraInput.value = val;
      updateImpactPreview();
      saveStateToURL();
    });

    // Add debt button
    document.getElementById('add-debt-btn').addEventListener('click', function() {
      if (state.debts.length < MAX_DEBTS) {
        state.debts.push({ name: '', balance: 0, rate: 0, minPayment: 0 });
        renderDebtRows();
        saveStateToURL();
      }
    });

    // Share button
    document.getElementById('share-calculation').addEventListener('click', shareCalculation);

    // Clear button
    document.getElementById('clear-calculation').addEventListener('click', clearAll);
  }

  function renderDebtRows() {
    var container = document.getElementById('debt-rows-container');
    container.innerHTML = '';

    state.debts.forEach(function(debt, index) {
      var row = document.createElement('div');
      row.className = 'debt-row';
      row.dataset.index = index;

      row.innerHTML =
        '<input type="text" class="debt-name-input" placeholder="e.g., Chase Visa" value="' + escapeAttr(debt.name) + '" data-field="name" />' +
        '<input type="number" placeholder="5000" value="' + (debt.balance || '') + '" min="0" step="100" data-field="balance" />' +
        '<input type="number" placeholder="22.99" value="' + (debt.rate || '') + '" min="0" max="100" step="0.01" data-field="rate" />' +
        '<input type="number" placeholder="150" value="' + (debt.minPayment || '') + '" min="0" step="5" data-field="minPayment" />' +
        '<button type="button" class="remove-debt-btn" title="Remove this debt">&times;</button>';

      // Attach input listeners
      var inputs = row.querySelectorAll('input');
      inputs.forEach(function(input) {
        input.addEventListener('input', function() {
          var field = this.dataset.field;
          var val = field === 'name' ? this.value : (parseFloat(this.value) || 0);
          state.debts[index][field] = val;
          saveStateToURL();
          updateImpactPreview();
        });
      });

      // Remove button
      var removeBtn = row.querySelector('.remove-debt-btn');
      removeBtn.addEventListener('click', function() {
        if (state.debts.length > 1) {
          state.debts.splice(index, 1);
          renderDebtRows();
          saveStateToURL();
          updateImpactPreview();
        }
      });

      container.appendChild(row);
    });

    // Hide/show add button
    var addBtn = document.getElementById('add-debt-btn');
    if (state.debts.length >= MAX_DEBTS) {
      addBtn.style.display = 'none';
    } else {
      addBtn.style.display = '';
    }

    // Hide remove buttons if only 1 debt
    if (state.debts.length <= 1) {
      var removeBtns = container.querySelectorAll('.remove-debt-btn');
      removeBtns.forEach(function(btn) { btn.style.visibility = 'hidden'; });
    }
  }

  function syncSliderAndInput() {
    var extraInput = document.getElementById('extra-payment');
    var extraSlider = document.getElementById('extra-payment-slider');
    extraInput.value = state.extraPayment;
    extraSlider.value = Math.min(state.extraPayment, 2000);
    updateImpactPreview();
  }

  function updateImpactPreview() {
    var impactEl = document.getElementById('extra-payment-impact');
    var validDebts = state.debts.filter(function(d) {
      return d.balance > 0 && d.minPayment > 0;
    });

    if (validDebts.length === 0) {
      impactEl.textContent = 'Enter your debts above to see the impact of extra payments.';
      return;
    }

    if (state.extraPayment <= 0) {
      impactEl.textContent = 'Add extra monthly payments to accelerate your debt payoff!';
      return;
    }

    // Quick calculation for preview
    var noExtra = runPayoff(validDebts, 0, 'avalanche');
    var withExtra = runPayoff(validDebts, state.extraPayment, 'avalanche');

    if (noExtra && withExtra) {
      var monthsSaved = noExtra.totalMonths - withExtra.totalMonths;
      var interestSaved = noExtra.totalInterest - withExtra.totalInterest;
      if (monthsSaved > 0 || interestSaved > 0) {
        impactEl.innerHTML = 'Adding <strong>' + formatCurrency(state.extraPayment) + '/month</strong> extra could save you <strong>' + formatCurrency(interestSaved) + '</strong> in interest and pay off debt <strong>' + monthsSaved + ' months sooner</strong>!';
      } else {
        impactEl.textContent = 'Your minimum payments already cover the debt efficiently at this level.';
      }
    } else {
      impactEl.textContent = 'Adjust the slider to see how extra payments impact your debt payoff.';
    }
  }

  function validateInputs() {
    var validDebts = state.debts.filter(function(d) {
      return d.balance > 0;
    });

    if (validDebts.length === 0) {
      alert('Please enter at least one debt with a balance greater than $0.');
      return false;
    }

    // Check that minimums are set
    for (var i = 0; i < validDebts.length; i++) {
      if (validDebts[i].minPayment <= 0) {
        alert('Please enter a minimum payment for "' + (validDebts[i].name || 'Debt ' + (i + 1)) + '".');
        return false;
      }
      // Check minimum covers monthly interest at minimum
      var monthlyInterest = validDebts[i].balance * (validDebts[i].rate / 100 / 12);
      if (validDebts[i].minPayment <= monthlyInterest && validDebts[i].rate > 0) {
        alert('The minimum payment for "' + (validDebts[i].name || 'Debt ' + (i + 1)) + '" ($' + validDebts[i].minPayment + ') does not cover the monthly interest ($' + monthlyInterest.toFixed(2) + '). Please increase it.');
        return false;
      }
    }

    return true;
  }

  function calculateResults() {
    var validDebts = state.debts.filter(function(d) {
      return d.balance > 0 && d.minPayment > 0;
    });

    var snowball = runPayoff(validDebts, state.extraPayment, 'snowball');
    var avalanche = runPayoff(validDebts, state.extraPayment, 'avalanche');

    if (!snowball || !avalanche) {
      alert('Unable to calculate payoff. Please check your inputs.');
      return;
    }

    displayResults(snowball, avalanche, validDebts);
    saveStateToURL();
  }

  function runPayoff(debts, extraPayment, method) {
    // Deep copy debts
    var remaining = debts.map(function(d, i) {
      return {
        index: i,
        name: d.name || ('Debt ' + (i + 1)),
        balance: d.balance,
        rate: d.rate,
        minPayment: d.minPayment,
        originalBalance: d.balance,
        paidOff: false,
        paidOffMonth: 0
      };
    });

    var totalInterest = 0;
    var month = 0;
    var schedule = [];
    var milestones = [];

    while (remaining.some(function(d) { return !d.paidOff; }) && month < MAX_MONTHS) {
      month++;
      var monthData = {
        month: month,
        payments: {},
        totalPaid: 0,
        remainingBalance: 0,
        targetDebt: ''
      };

      // Apply interest to all debts
      remaining.forEach(function(d) {
        if (!d.paidOff) {
          var interest = d.balance * (d.rate / 100 / 12);
          d.balance += interest;
          totalInterest += interest;
        }
      });

      // Pay minimums on all debts
      var extraAvailable = extraPayment;
      remaining.forEach(function(d) {
        if (!d.paidOff) {
          var payment = Math.min(d.minPayment, d.balance);
          d.balance -= payment;
          monthData.payments[d.name] = payment;
          monthData.totalPaid += payment;

          if (d.balance <= 0.01) {
            d.balance = 0;
            d.paidOff = true;
            d.paidOffMonth = month;
            milestones.push({ month: month, name: d.name });
            // Roll freed minimum into extra
            extraAvailable += d.minPayment - payment;
          }
        }
      });

      // Determine target for extra payment
      var target = getTarget(remaining, method);
      if (target && extraAvailable > 0) {
        monthData.targetDebt = target.name;
        var extraPay = Math.min(extraAvailable, target.balance);
        target.balance -= extraPay;
        monthData.payments[target.name] = (monthData.payments[target.name] || 0) + extraPay;
        monthData.totalPaid += extraPay;

        if (target.balance <= 0.01) {
          target.balance = 0;
          target.paidOff = true;
          target.paidOffMonth = month;
          milestones.push({ month: month, name: target.name });
          // If there's still extra left from overpayment, apply to next target
          var leftover = extraAvailable - extraPay;
          if (leftover > 0) {
            var nextTarget = getTarget(remaining, method);
            if (nextTarget) {
              var nextPay = Math.min(leftover, nextTarget.balance);
              nextTarget.balance -= nextPay;
              monthData.payments[nextTarget.name] = (monthData.payments[nextTarget.name] || 0) + nextPay;
              monthData.totalPaid += nextPay;
              if (nextTarget.balance <= 0.01) {
                nextTarget.balance = 0;
                nextTarget.paidOff = true;
                nextTarget.paidOffMonth = month;
                milestones.push({ month: month, name: nextTarget.name });
              }
            }
          }
        }
      }

      // Calculate remaining balance
      monthData.remainingBalance = remaining.reduce(function(sum, d) {
        return sum + d.balance;
      }, 0);

      schedule.push(monthData);
    }

    if (month >= MAX_MONTHS) {
      return null; // Unable to pay off
    }

    // Deduplicate milestones (same debt could be added twice)
    var seen = {};
    milestones = milestones.filter(function(m) {
      if (seen[m.name]) return false;
      seen[m.name] = true;
      return true;
    });

    return {
      totalMonths: month,
      totalInterest: totalInterest,
      totalPaid: debts.reduce(function(s, d) { return s + d.balance; }, 0) + totalInterest,
      schedule: schedule,
      milestones: milestones,
      payoffOrder: milestones.map(function(m) { return m.name; })
    };
  }

  function getTarget(remaining, method) {
    var candidates = remaining.filter(function(d) { return !d.paidOff && d.balance > 0; });
    if (candidates.length === 0) return null;

    if (method === 'snowball') {
      // Smallest balance first
      candidates.sort(function(a, b) { return a.balance - b.balance; });
    } else {
      // Highest interest rate first
      candidates.sort(function(a, b) { return b.rate - a.rate; });
    }
    return candidates[0];
  }

  function displayResults(snowball, avalanche, debts) {
    var resultDiv = document.getElementById('debt-payoff-result');

    // Determine winner
    var winner = avalanche.totalInterest <= snowball.totalInterest ? 'avalanche' : 'snowball';
    var interestDiff = Math.abs(snowball.totalInterest - avalanche.totalInterest);
    var monthDiff = Math.abs(snowball.totalMonths - avalanche.totalMonths);

    var totalDebt = debts.reduce(function(s, d) { return s + d.balance; }, 0);

    // Build timeline bars
    var maxMonths = Math.max(snowball.totalMonths, avalanche.totalMonths);

    var snowballTimeline = buildTimelineBars(snowball, debts, maxMonths);
    var avalancheTimeline = buildTimelineBars(avalanche, debts, maxMonths);

    // Build milestones for the winning method
    var winnerData = winner === 'avalanche' ? avalanche : snowball;
    var milestonesHTML = winnerData.milestones.map(function(m) {
      return '<div class="milestone-item">' +
        '<span class="milestone-month">Month ' + m.month + '</span>' +
        '<span class="milestone-text"><strong>' + escapeHTML(m.name) + '</strong> paid off!</span>' +
        '</div>';
    }).join('');

    // Build schedule table for both methods
    var snowballScheduleHTML = buildScheduleTable(snowball);
    var avalancheScheduleHTML = buildScheduleTable(avalanche);

    resultDiv.innerHTML =
      '<div class="result-container">' +
        // Savings highlight
        '<div class="savings-highlight">' +
          '<div class="amount">' + formatCurrency(interestDiff) + '</div>' +
          '<div class="label">' +
            (interestDiff > 0
              ? 'Interest saved by choosing ' + (winner === 'avalanche' ? 'Avalanche' : 'Snowball') + ' over ' + (winner === 'avalanche' ? 'Snowball' : 'Avalanche')
              : 'Both methods cost the same in interest!') +
            (monthDiff > 0 ? ' (' + monthDiff + ' month' + (monthDiff > 1 ? 's' : '') + ' faster)' : '') +
          '</div>' +
        '</div>' +

        // Comparison cards
        '<div class="comparison-cards">' +
          '<div class="strategy-card snowball">' +
            (winner === 'snowball' ? '<span class="winner-badge snowball-winner">Winner</span>' : '') +
            '<div class="card-title"><span>&#9731;</span> Debt Snowball</div>' +
            '<div class="card-metric"><span class="card-metric-label">Debt-Free In</span><span class="card-metric-value">' + formatMonths(snowball.totalMonths) + '</span></div>' +
            '<div class="card-metric"><span class="card-metric-label">Total Interest Paid</span><span class="card-metric-value">' + formatCurrency(snowball.totalInterest) + '</span></div>' +
            '<div class="card-metric"><span class="card-metric-label">Total Amount Paid</span><span class="card-metric-value">' + formatCurrency(totalDebt + snowball.totalInterest) + '</span></div>' +
            '<div class="card-metric"><span class="card-metric-label">First Debt Eliminated</span><span class="card-metric-value">Month ' + (snowball.milestones[0] ? snowball.milestones[0].month : '-') + '</span></div>' +
          '</div>' +
          '<div class="strategy-card avalanche">' +
            (winner === 'avalanche' ? '<span class="winner-badge avalanche-winner">Winner</span>' : '') +
            '<div class="card-title"><span>&#9650;</span> Debt Avalanche</div>' +
            '<div class="card-metric"><span class="card-metric-label">Debt-Free In</span><span class="card-metric-value">' + formatMonths(avalanche.totalMonths) + '</span></div>' +
            '<div class="card-metric"><span class="card-metric-label">Total Interest Paid</span><span class="card-metric-value">' + formatCurrency(avalanche.totalInterest) + '</span></div>' +
            '<div class="card-metric"><span class="card-metric-label">Total Amount Paid</span><span class="card-metric-value">' + formatCurrency(totalDebt + avalanche.totalInterest) + '</span></div>' +
            '<div class="card-metric"><span class="card-metric-label">First Debt Eliminated</span><span class="card-metric-value">Month ' + (avalanche.milestones[0] ? avalanche.milestones[0].month : '-') + '</span></div>' +
          '</div>' +
        '</div>' +

        // Timeline visualization
        '<div class="timeline-section">' +
          '<div class="timeline-title">Payoff Timeline Comparison</div>' +
          '<div class="timeline-bars">' +
            '<div class="timeline-method-label" style="color: #7c3aed;">Snowball Method (smallest balance first)</div>' +
            snowballTimeline +
            '<div class="timeline-method-label" style="color: #059669; margin-top: 1.5rem;">Avalanche Method (highest rate first)</div>' +
            avalancheTimeline +
          '</div>' +
        '</div>' +

        // Milestones
        '<div class="milestones-section">' +
          '<div class="timeline-title">Milestone Moments (' + (winner === 'avalanche' ? 'Avalanche' : 'Snowball') + ' Strategy)</div>' +
          milestonesHTML +
        '</div>' +

        // Detailed schedule (collapsible)
        '<button type="button" class="schedule-toggle" id="schedule-toggle">' +
          '<span>Detailed Monthly Payoff Schedule</span>' +
          '<span class="arrow">&#9660;</span>' +
        '</button>' +
        '<div class="schedule-content" id="schedule-content">' +
          '<div class="schedule-tabs">' +
            '<button type="button" class="schedule-tab active" data-method="avalanche">Avalanche Schedule</button>' +
            '<button type="button" class="schedule-tab" data-method="snowball">Snowball Schedule</button>' +
          '</div>' +
          '<div id="schedule-table-container">' +
            avalancheScheduleHTML +
          '</div>' +
        '</div>' +
      '</div>';

    resultDiv.classList.remove('hidden');

    // Attach toggle and tab listeners
    var toggleBtn = document.getElementById('schedule-toggle');
    var scheduleContent = document.getElementById('schedule-content');
    toggleBtn.addEventListener('click', function() {
      toggleBtn.classList.toggle('open');
      scheduleContent.classList.toggle('show');
    });

    var tabs = scheduleContent.querySelectorAll('.schedule-tab');
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        var method = this.dataset.method;
        var container = document.getElementById('schedule-table-container');
        container.innerHTML = method === 'snowball' ? snowballScheduleHTML : avalancheScheduleHTML;
      });
    });
  }

  function buildTimelineBars(result, debts, maxMonths) {
    var html = '';
    // For each debt, show when it gets paid off
    result.milestones.forEach(function(milestone, i) {
      var pct = (milestone.month / maxMonths * 100).toFixed(1);
      var color = DEBT_COLORS[i % DEBT_COLORS.length];
      html +=
        '<div class="timeline-bar-row">' +
          '<span class="timeline-bar-label">' + escapeHTML(milestone.name) + '</span>' +
          '<div class="timeline-bar-track">' +
            '<div class="timeline-bar-fill" style="width: ' + pct + '%; background: ' + color + ';">' +
              (parseFloat(pct) > 15 ? 'Mo ' + milestone.month : '') +
            '</div>' +
          '</div>' +
        '</div>';
    });
    return html;
  }

  function buildScheduleTable(result) {
    // Show every month but limit to showing meaningful data
    // For large schedules, show every Nth month plus payoff months
    var schedule = result.schedule;
    var rows = [];
    var payoffMonths = {};
    result.milestones.forEach(function(m) {
      payoffMonths[m.month] = m.name;
    });

    var showEvery = schedule.length > 60 ? 3 : (schedule.length > 36 ? 2 : 1);

    for (var i = 0; i < schedule.length; i++) {
      var entry = schedule[i];
      var isPayoff = payoffMonths[entry.month];
      var showRow = (i % showEvery === 0) || isPayoff || i === 0 || i === schedule.length - 1;

      if (showRow) {
        var rowClass = isPayoff ? ' class="payoff-row"' : '';
        rows.push(
          '<tr' + rowClass + '>' +
            '<td>Month ' + entry.month + '</td>' +
            '<td>' + (entry.targetDebt ? escapeHTML(entry.targetDebt) : '-') + '</td>' +
            '<td>' + formatCurrency(entry.totalPaid) + '</td>' +
            '<td>' + formatCurrency(entry.remainingBalance) + '</td>' +
            (isPayoff ? '<td style="color: #059669; font-weight: 600;">' + escapeHTML(isPayoff) + ' paid off!</td>' : '<td></td>') +
          '</tr>'
        );
      }
    }

    return '<table class="schedule-table">' +
      '<thead><tr>' +
        '<th>Month</th>' +
        '<th>Extra Payment Target</th>' +
        '<th>Total Paid</th>' +
        '<th>Remaining Balance</th>' +
        '<th>Event</th>' +
      '</tr></thead>' +
      '<tbody>' + rows.join('') + '</tbody>' +
    '</table>';
  }

  function formatMonths(months) {
    var years = Math.floor(months / 12);
    var mo = months % 12;
    if (years === 0) return mo + ' month' + (mo !== 1 ? 's' : '');
    if (mo === 0) return years + ' year' + (years !== 1 ? 's' : '');
    return years + ' yr' + (years !== 1 ? 's' : '') + ' ' + mo + ' mo';
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.round(amount));
  }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // URL State Management
  function saveStateToURL() {
    try {
      var data = {
        d: state.debts.map(function(d) {
          return {
            n: d.name,
            b: d.balance,
            r: d.rate,
            m: d.minPayment
          };
        }),
        e: state.extraPayment
      };
      var json = JSON.stringify(data);
      var encoded = btoa(encodeURIComponent(json));
      var newURL = window.location.pathname + '?s=' + encoded;
      window.history.replaceState({}, '', newURL);
    } catch (err) {
      // Silently fail if URL gets too long
    }
  }

  function loadStateFromURL() {
    try {
      var params = new URLSearchParams(window.location.search);
      var encoded = params.get('s');
      if (!encoded) return false;

      var json = decodeURIComponent(atob(encoded));
      var data = JSON.parse(json);

      if (data.d && Array.isArray(data.d) && data.d.length > 0) {
        state.debts = data.d.map(function(d) {
          return {
            name: d.n || '',
            balance: parseFloat(d.b) || 0,
            rate: parseFloat(d.r) || 0,
            minPayment: parseFloat(d.m) || 0
          };
        });
        state.extraPayment = parseFloat(data.e) || 0;
        return true;
      }
    } catch (err) {
      // Fall back to defaults
    }
    return false;
  }

  function shareCalculation() {
    saveStateToURL();

    var shareData = {
      title: 'Debt Payoff Calculator - Snowball vs Avalanche',
      text: 'Check out my debt payoff plan!',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(function() {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(function() {
        var button = document.getElementById('share-calculation');
        var originalText = button.innerHTML;
        button.innerHTML = '&#10003; Link Copied!';
        button.style.background = '#10b981';
        button.style.color = 'white';

        setTimeout(function() {
          button.innerHTML = originalText;
          button.style.background = '';
          button.style.color = '';
        }, 2000);
      }).catch(function() {});
    }
  }

  function clearAll() {
    state.debts = DEFAULT_DEBTS.map(function(d) { return { ...d }; });
    state.extraPayment = 100;
    renderDebtRows();
    syncSliderAndInput();

    // Hide results
    var resultDiv = document.getElementById('debt-payoff-result');
    resultDiv.classList.add('hidden');
    resultDiv.innerHTML = '';

    // Clear URL
    window.history.replaceState({}, '', window.location.pathname);
  }

})();
