// Holiday Gift Budget Calculator
(function () {
  'use strict';

  var recipients = [];
  var debounceTimer = null;

  var deadlineInput, alreadySavedInput, totalBudgetInput, annualIncomeInput, reservePercentInput;
  var recipientList, addRecipientBtn, calculateBtn, clearBtn, shareBtn, resultDiv, formEl;

  function init() {
    deadlineInput = document.getElementById('deadline-date');
    alreadySavedInput = document.getElementById('already-saved');
    totalBudgetInput = document.getElementById('total-budget');
    annualIncomeInput = document.getElementById('annual-income');
    reservePercentInput = document.getElementById('reserve-percent');
    recipientList = document.getElementById('recipient-list');
    addRecipientBtn = document.getElementById('add-recipient');
    calculateBtn = document.getElementById('calculate-btn');
    clearBtn = document.getElementById('clear-btn');
    shareBtn = document.getElementById('share-calculation');
    resultDiv = document.getElementById('holiday-gift-budget-calculator-result');
    formEl = document.getElementById('holiday-gift-budget-calculator-form');

    setDefaultDeadline();
    loadFromURL();
    setupEventListeners();

    if (recipients.length === 0) {
      addRecipient({ name: '', amount: 50 });
      addRecipient({ name: '', amount: 50 });
      addRecipient({ name: '', amount: 50 });
    }

    if (hasValidData()) calculateResults();
  }

  function setDefaultDeadline() {
    if (!deadlineInput || deadlineInput.value) return;
    var now = new Date();
    var year = now.getMonth() === 11 && now.getDate() > 20 ? now.getFullYear() + 1 : now.getFullYear();
    var defaultDate = new Date(year, 11, 20); // Dec 20
    if (defaultDate < now) defaultDate = new Date(now.getTime() + 14 * 86400000);
    deadlineInput.value = toInputDate(defaultDate);
  }

  function toInputDate(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function setupEventListeners() {
    if (addRecipientBtn) addRecipientBtn.addEventListener('click', function () {
      addRecipient();
      saveToURL();
    });
    if (calculateBtn) calculateBtn.addEventListener('click', function () {
      calculateResults();
      saveToURL();
      var r = document.querySelector('.calculator-result');
      if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    if (clearBtn) clearBtn.addEventListener('click', clearAll);
    if (shareBtn) shareBtn.addEventListener('click', shareResults);

    [deadlineInput, alreadySavedInput, totalBudgetInput, annualIncomeInput, reservePercentInput].forEach(function (el) {
      if (!el) return;
      el.addEventListener('input', function () {
        saveToURL();
        if (hasValidData()) calculateResults();
      });
    });
  }

  function addRecipient(data, index) {
    var idx = typeof index === 'number' ? index : recipients.length;
    var row = document.createElement('div');
    row.className = 'recipient-row';
    row.dataset.index = idx;
    row.innerHTML =
      '<input type="text" class="recipient-name" placeholder="Recipient name (optional)" value="' +
      escapeHtml(data && data.name ? data.name : '') + '" data-index="' + idx + '">' +
      '<input type="number" class="recipient-amount" placeholder="Budget" min="0" step="5" value="' +
      (data && data.amount >= 0 ? data.amount : 50) + '" data-index="' + idx + '">' +
      '<button type="button" class="remove-recipient" data-index="' + idx + '" title="Remove">&times;</button>';

    recipientList.appendChild(row);

    recipients.push({
      name: data && data.name ? data.name : '',
      amount: data && data.amount >= 0 ? parseFloat(data.amount) : 50,
    });

    var nameInput = row.querySelector('.recipient-name');
    var amountInput = row.querySelector('.recipient-amount');
    var removeBtn = row.querySelector('.remove-recipient');

    nameInput.addEventListener('input', function () {
      recipients[idx].name = this.value;
      saveToURL();
    });
    amountInput.addEventListener('input', function () {
      recipients[idx].amount = Math.max(0, parseFloat(this.value) || 0);
      saveToURL();
      if (hasValidData()) calculateResults();
    });
    removeBtn.addEventListener('click', function () {
      removeRecipient(idx);
    });
  }

  function removeRecipient(index) {
    var row = recipientList.querySelector('[data-index="' + index + '"]');
    if (!row) return;
    row.remove();
    recipients.splice(index, 1);

    var remaining = recipientList.querySelectorAll('.recipient-row');
    remaining.forEach(function (r, newIndex) {
      r.dataset.index = newIndex;
      r.querySelectorAll('[data-index]').forEach(function (el) {
        el.dataset.index = newIndex;
      });
    });

    saveToURL();
    if (hasValidData()) calculateResults();
    else { resultDiv.classList.add('hidden'); }
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function hasValidData() {
    return recipients.some(function (r) { return r.amount > 0; }) || (parseFloat(totalBudgetInput && totalBudgetInput.value) > 0);
  }

  function weeksUntil(dateStr) {
    if (!dateStr) return { weeks: 0, days: 0, isPast: false };
    var target = new Date(dateStr + 'T00:00:00');
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var diffMs = target.getTime() - today.getTime();
    var diffDays = Math.round(diffMs / 86400000);
    if (diffDays <= 0) return { weeks: 0, days: 0, isPast: true };
    return { weeks: Math.max(1, Math.ceil(diffDays / 7)), days: diffDays, isPast: false };
  }

  function calculateResults() {
    var recipientsTotal = recipients.reduce(function (sum, r) { return sum + (parseFloat(r.amount) || 0); }, 0);
    var reservePercent = Math.max(0, parseFloat(reservePercentInput && reservePercentInput.value) || 0);
    var reserveAmount = recipientsTotal * (reservePercent / 100);
    var totalNeeded = recipientsTotal + reserveAmount;

    var alreadySaved = Math.max(0, parseFloat(alreadySavedInput && alreadySavedInput.value) || 0);
    var remaining = Math.max(0, totalNeeded - alreadySaved);
    var isFullyFunded = totalNeeded > 0 && alreadySaved >= totalNeeded;

    var totalBudgetRaw = totalBudgetInput && totalBudgetInput.value;
    var totalBudget = totalBudgetRaw ? Math.max(0, parseFloat(totalBudgetRaw) || 0) : null;

    var annualIncomeRaw = annualIncomeInput && annualIncomeInput.value;
    var annualIncome = annualIncomeRaw ? Math.max(0, parseFloat(annualIncomeRaw) || 0) : null;

    var dateInfo = weeksUntil(deadlineInput && deadlineInput.value);
    var weeklySavingsNeeded = dateInfo.isPast || dateInfo.weeks === 0 ? remaining : remaining / dateInfo.weeks;

    displayResults({
      recipientsTotal: recipientsTotal,
      reservePercent: reservePercent,
      reserveAmount: reserveAmount,
      totalNeeded: totalNeeded,
      alreadySaved: alreadySaved,
      remaining: remaining,
      isFullyFunded: isFullyFunded,
      totalBudget: totalBudget,
      annualIncome: annualIncome,
      dateInfo: dateInfo,
      weeklySavingsNeeded: weeklySavingsNeeded,
    });
  }

  function money(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function displayResults(d) {
    if (d.recipientsTotal === 0 && !d.totalBudget) {
      resultDiv.classList.add('hidden');
      return;
    }

    var gapHTML = '';
    if (d.totalBudget !== null) {
      var diff = d.totalBudget - d.totalNeeded;
      if (Math.abs(diff) < 1) {
        gapHTML =
          '<div class="budget-gap-indicator on-track"><span style="font-size:1.5rem;">✅</span>' +
          '<div>Your recipient list plus reserve lines up almost exactly with your ' + money(d.totalBudget) + ' budget.</div></div>';
      } else if (diff > 0) {
        gapHTML =
          '<div class="budget-gap-indicator on-track"><span style="font-size:1.5rem;">✅</span>' +
          '<div>You\'re <strong>' + money(diff) + ' under</strong> your ' + money(d.totalBudget) + ' budget — nice cushion for extras or stocking stuffers.</div></div>';
      } else {
        gapHTML =
          '<div class="budget-gap-indicator over"><span style="font-size:1.5rem;">⚠️</span>' +
          '<div>Your recipient list plus reserve is <strong>' + money(Math.abs(diff)) + ' over</strong> your ' + money(d.totalBudget) + ' budget. Trim a few recipient amounts or raise your budget.</div></div>';
      }
    }

    var incomeHTML = '';
    if (d.annualIncome !== null && d.annualIncome > 0) {
      var low = d.annualIncome * 0.01;
      var high = d.annualIncome * 0.02;
      incomeHTML =
        '<div class="info-box" style="margin-top:1.5rem;">' +
        '<h4>📊 Income Guideline Comparison</h4>' +
        '<p>The common "1-2% of annual income" guideline suggests <strong>' + money(low) + ' - ' + money(high) +
        '</strong> for total holiday gift spending on a ' + money(d.annualIncome) + ' income. Your planned total is <strong>' +
        money(d.totalNeeded) + '</strong>.</p></div>';
    }

    var weeklyBoxHTML;
    if (d.isFullyFunded) {
      weeklyBoxHTML =
        '<div class="weekly-savings-box" style="border-color:#10b981; background:linear-gradient(135deg,#ecfdf5 0%,#d1fae5 100%);">' +
        '<h4 style="color:#059669;">🎉 You\'re Fully Funded!</h4>' +
        '<div class="big-number" style="color:#059669;">' + money(0) + '/week</div>' +
        '<div class="context">Your saved amount already covers your planned gift spending plus reserve.</div></div>';
    } else if (d.dateInfo.isPast) {
      weeklyBoxHTML =
        '<div class="weekly-savings-box">' +
        '<h4>🛒 Time to Shop Now</h4>' +
        '<div class="big-number">' + money(d.remaining) + '</div>' +
        '<div class="context">Your shopping deadline has passed (or is today) — this is the amount still needed.</div></div>';
    } else {
      weeklyBoxHTML =
        '<div class="weekly-savings-box">' +
        '<h4>💰 Weekly Savings Needed</h4>' +
        '<div class="big-number">' + money(d.weeklySavingsNeeded) + '/week</div>' +
        '<div class="context">Over the next ' + d.dateInfo.weeks + ' week' + (d.dateInfo.weeks === 1 ? '' : 's') +
        ' (' + d.dateInfo.days + ' day' + (d.dateInfo.days === 1 ? '' : 's') + ') to reach your shopping deadline.</div></div>';
    }

    var breakdownRows = recipients
      .filter(function (r) { return r.amount > 0; })
      .map(function (r, i) {
        return '<tr><td>' + escapeHtml(r.name || 'Recipient ' + (i + 1)) + '</td><td>' + money(r.amount) + '</td></tr>';
      })
      .join('');

    resultDiv.innerHTML =
      '<div class="result-header"><h2>Your Holiday Gift Budget</h2></div>' +
      '<div class="gift-summary">' +
      '<div class="summary-card"><h4>Gift Total</h4><div class="amount">' + money(d.recipientsTotal) + '</div></div>' +
      '<div class="summary-card"><h4>Reserve (' + d.reservePercent + '%)</h4><div class="amount text-warning">' + money(d.reserveAmount) + '</div></div>' +
      '<div class="summary-card"><h4>Total Needed</h4><div class="amount text-primary">' + money(d.totalNeeded) + '</div></div>' +
      '<div class="summary-card"><h4>Still Needed</h4><div class="amount ' + (d.isFullyFunded ? 'text-success' : '') + '">' + money(d.remaining) + '</div></div>' +
      '</div>' +
      weeklyBoxHTML +
      gapHTML +
      incomeHTML +
      (breakdownRows
        ? '<div class="recipient-breakdown"><h3>📋 Recipient Breakdown</h3><table><thead><tr><th>Recipient</th><th>Budget</th></tr></thead><tbody>' +
          breakdownRows + '</tbody></table></div>'
        : '');

    resultDiv.classList.remove('hidden');
  }

  function clearAll() {
    recipientList.innerHTML = '';
    recipients = [];
    if (alreadySavedInput) alreadySavedInput.value = '0';
    if (totalBudgetInput) totalBudgetInput.value = '';
    if (annualIncomeInput) annualIncomeInput.value = '';
    if (reservePercentInput) reservePercentInput.value = '10';
    resultDiv.classList.add('hidden');

    var url = new URL(window.location);
    url.search = '';
    window.history.replaceState({}, '', url);

    setDefaultDeadline();
    addRecipient({ name: '', amount: 50 });
    addRecipient({ name: '', amount: 50 });
    addRecipient({ name: '', amount: 50 });
  }

  function shareResults() {
    var url = window.location.href;
    var totalEl = document.querySelector('.summary-card .amount.text-primary');
    var text = totalEl
      ? 'My holiday gift budget plan totals ' + totalEl.textContent + '! Plan yours free:'
      : 'Plan your holiday gift budget for free:';

    if (navigator.share) {
      navigator.share({ title: 'Holiday Gift Budget Calculator', text: text, url: url }).catch(function () {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    if (shareBtn) {
      var original = shareBtn.textContent;
      shareBtn.textContent = 'Link Copied!';
      setTimeout(function () { shareBtn.textContent = original; }, 2000);
    }
  }

  function saveToURL() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      var params = new URLSearchParams();
      if (deadlineInput && deadlineInput.value) params.set('deadline', deadlineInput.value);
      if (alreadySavedInput && alreadySavedInput.value) params.set('saved', alreadySavedInput.value);
      if (totalBudgetInput && totalBudgetInput.value) params.set('budget', totalBudgetInput.value);
      if (annualIncomeInput && annualIncomeInput.value) params.set('income', annualIncomeInput.value);
      if (reservePercentInput && reservePercentInput.value) params.set('reserve', reservePercentInput.value);

      recipients.forEach(function (r, i) {
        if (r.name || r.amount) {
          params.set('r' + i + '_name', r.name);
          params.set('r' + i + '_amount', r.amount);
        }
      });

      var url = new URL(window.location);
      url.search = params.toString();
      window.history.replaceState({}, '', url);
    }, 400);
  }

  function loadFromURL() {
    var params = new URLSearchParams(window.location.search);
    if (params.has('deadline') && deadlineInput) deadlineInput.value = params.get('deadline');
    if (params.has('saved') && alreadySavedInput) alreadySavedInput.value = params.get('saved');
    if (params.has('budget') && totalBudgetInput) totalBudgetInput.value = params.get('budget');
    if (params.has('income') && annualIncomeInput) annualIncomeInput.value = params.get('income');
    if (params.has('reserve') && reservePercentInput) reservePercentInput.value = params.get('reserve');

    var i = 0;
    while (params.has('r' + i + '_name') || params.has('r' + i + '_amount')) {
      addRecipient({
        name: params.get('r' + i + '_name') || '',
        amount: parseFloat(params.get('r' + i + '_amount')) || 0,
      }, i);
      i++;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
