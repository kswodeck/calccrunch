// College Savings Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    childAge: 5,
    collegeStartAge: 18,
    collegeType: 'private',
    customAnnualCost: 40000,
    collegeYears: 4,
    costInflation: 5,
    current529Balance: 10000,
    monthlyContribution: 300,
    expectedReturn: 7,
    stateTaxRate: 5
  };

  const COLLEGE_COSTS = {
    'in-state': 23250,
    'out-of-state': 40550,
    'private': 56190
  };

  // State
  let state = {
    lastCalculationResults: null
  };

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadFromURL();
    attachEventListeners();
  });

  function initializeForm() {
    setValue('child-age', DEFAULT_VALUES.childAge);
    setValue('college-start-age', DEFAULT_VALUES.collegeStartAge);
    setSelectValue('college-type', DEFAULT_VALUES.collegeType);
    setValue('custom-annual-cost', DEFAULT_VALUES.customAnnualCost);
    setValue('college-years', DEFAULT_VALUES.collegeYears);
    setValue('cost-inflation', DEFAULT_VALUES.costInflation);
    setValue('current-529-balance', DEFAULT_VALUES.current529Balance);
    setValue('monthly-contribution', DEFAULT_VALUES.monthlyContribution);
    setValue('expected-return', DEFAULT_VALUES.expectedReturn);
    setValue('state-tax-rate', DEFAULT_VALUES.stateTaxRate);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    const fields = [
      { id: 'child-age', param: 'child_age' },
      { id: 'college-start-age', param: 'college_start_age' },
      { id: 'custom-annual-cost', param: 'custom_cost' },
      { id: 'college-years', param: 'college_years' },
      { id: 'cost-inflation', param: 'cost_inflation' },
      { id: 'current-529-balance', param: 'balance_529' },
      { id: 'monthly-contribution', param: 'monthly_contribution' },
      { id: 'expected-return', param: 'expected_return' },
      { id: 'state-tax-rate', param: 'state_tax_rate' }
    ];

    fields.forEach(field => {
      if (params.has(field.param)) {
        const value = parseFloat(params.get(field.param));
        if (!isNaN(value)) {
          setValue(field.id, value);
        }
      }
    });

    if (params.has('college_type')) {
      setSelectValue('college-type', params.get('college_type'));
      toggleCustomCost();
    }

    if (params.toString()) {
      setTimeout(() => {
        calculateResults();
      }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('child_age', getValue('child-age'));
    params.set('college_start_age', getValue('college-start-age'));
    params.set('college_type', getSelectValue('college-type'));
    params.set('custom_cost', getValue('custom-annual-cost'));
    params.set('college_years', getValue('college-years'));
    params.set('cost_inflation', getValue('cost-inflation'));
    params.set('balance_529', getValue('current-529-balance'));
    params.set('monthly_contribution', getValue('monthly-contribution'));
    params.set('expected_return', getValue('expected-return'));
    params.set('state_tax_rate', getValue('state-tax-rate'));

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        calculateResults();
        document.querySelector(".calculator-result")?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // College type change
    const collegeTypeSelect = document.getElementById('college-type');
    if (collegeTypeSelect) {
      collegeTypeSelect.addEventListener('change', toggleCustomCost);
    }

    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateResults();
        }
      });

      input.addEventListener('change', function() {
        saveToURL();
      });

      if (input.type === 'number') {
        let saveTimeout;
        input.addEventListener('input', function() {
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => {
            saveToURL();
          }, 500);
        });
      }
    });

    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }
  }

  function toggleCustomCost() {
    const collegeType = getSelectValue('college-type');
    const customInput = document.getElementById('custom-annual-cost');
    if (customInput) {
      customInput.disabled = (collegeType !== 'custom');
    }
  }

  function calculateResults() {
    const childAge = getValue('child-age');
    const collegeStartAge = getValue('college-start-age');
    const collegeType = getSelectValue('college-type');
    const customAnnualCost = getValue('custom-annual-cost');
    const collegeYears = getValue('college-years');
    const costInflation = getValue('cost-inflation');
    const current529Balance = getValue('current-529-balance');
    const monthlyContribution = getValue('monthly-contribution');
    const expectedReturn = getValue('expected-return');
    const stateTaxRate = getValue('state-tax-rate');

    if (!validateInputs(childAge, collegeStartAge, collegeYears)) {
      return;
    }

    saveToURL();

    // Years until college
    const yearsUntilCollege = Math.max(0, collegeStartAge - childAge);

    // Current annual cost
    const currentAnnualCost = collegeType === 'custom' ? customAnnualCost : COLLEGE_COSTS[collegeType];

    // Projected annual cost at enrollment (with inflation)
    const projectedAnnualCost = currentAnnualCost * Math.pow(1 + costInflation / 100, yearsUntilCollege);

    // Total projected college cost (4 years with increasing costs)
    let totalProjectedCost = 0;
    for (let y = 0; y < collegeYears; y++) {
      totalProjectedCost += currentAnnualCost * Math.pow(1 + costInflation / 100, yearsUntilCollege + y);
    }

    // Calculate projected savings at enrollment
    const monthlyRate = (expectedReturn / 100) / 12;
    const totalMonths = yearsUntilCollege * 12;
    let projectedSavings = current529Balance;

    // Year-by-year growth data
    const yearlyData = [];
    let runningBalance = current529Balance;
    let totalContributions = current529Balance;

    for (let month = 1; month <= totalMonths; month++) {
      runningBalance = runningBalance * (1 + monthlyRate) + monthlyContribution;
      totalContributions += monthlyContribution;

      if (month % 12 === 0) {
        yearlyData.push({
          year: month / 12,
          age: childAge + (month / 12),
          balance: runningBalance,
          contributions: totalContributions,
          growth: runningBalance - totalContributions
        });
      }
    }

    projectedSavings = runningBalance;
    const totalGrowth = projectedSavings - totalContributions;

    // Funding gap or surplus
    const fundingGap = totalProjectedCost - projectedSavings;

    // Monthly needed to fully fund
    let monthlyNeededToFund = 0;
    if (totalMonths > 0 && fundingGap > 0) {
      if (monthlyRate > 0) {
        const fvCurrent = current529Balance * Math.pow(1 + monthlyRate, totalMonths);
        const remaining = totalProjectedCost - fvCurrent;
        if (remaining > 0) {
          monthlyNeededToFund = remaining / ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
        }
      } else {
        monthlyNeededToFund = (totalProjectedCost - current529Balance) / totalMonths;
      }
    }

    // Tax savings calculation
    const annualContributions = monthlyContribution * 12;
    const annualTaxSavings = stateTaxRate > 0 ? annualContributions * (stateTaxRate / 100) : 0;
    const totalTaxSavings = annualTaxSavings * yearsUntilCollege;

    // What-if scenarios
    const scenarios = calculateWhatIf(current529Balance, monthlyContribution, expectedReturn, yearsUntilCollege, totalProjectedCost, childAge);

    state.lastCalculationResults = {
      childAge,
      collegeStartAge,
      collegeType,
      currentAnnualCost,
      projectedAnnualCost,
      totalProjectedCost,
      collegeYears,
      yearsUntilCollege,
      current529Balance,
      monthlyContribution,
      expectedReturn,
      costInflation,
      stateTaxRate,
      projectedSavings,
      totalContributions,
      totalGrowth,
      fundingGap,
      monthlyNeededToFund,
      annualTaxSavings,
      totalTaxSavings,
      yearlyData,
      scenarios
    };

    displayResults(state.lastCalculationResults);
  }

  function calculateWhatIf(currentBalance, monthlyContrib, returnRate, years, targetCost, childAge) {
    const scenarios = [];
    const monthlyRate = (returnRate / 100) / 12;
    const totalMonths = years * 12;

    // Scenario 1: Started 3 years earlier
    const extraYears = 3;
    const earlierMonths = (years + extraYears) * 12;
    let earlierBalance = currentBalance;
    if (monthlyRate > 0) {
      earlierBalance = currentBalance * Math.pow(1 + monthlyRate, earlierMonths) +
                       monthlyContrib * ((Math.pow(1 + monthlyRate, earlierMonths) - 1) / monthlyRate);
    } else {
      earlierBalance = currentBalance + (monthlyContrib * earlierMonths);
    }
    scenarios.push({
      title: 'Started 3 Years Earlier',
      description: `If you began at age ${Math.max(0, childAge - extraYears)}`,
      projectedSavings: earlierBalance,
      difference: earlierBalance - targetCost,
      detail: `${years + extraYears} years of growth instead of ${years}`
    });

    // Scenario 2: Double the contribution
    let doubleBalance = currentBalance;
    const doubleContrib = monthlyContrib * 2;
    if (monthlyRate > 0) {
      doubleBalance = currentBalance * Math.pow(1 + monthlyRate, totalMonths) +
                      doubleContrib * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    } else {
      doubleBalance = currentBalance + (doubleContrib * totalMonths);
    }
    scenarios.push({
      title: 'Double Monthly Contribution',
      description: `${formatCurrency(doubleContrib)}/month instead of ${formatCurrency(monthlyContrib)}`,
      projectedSavings: doubleBalance,
      difference: doubleBalance - targetCost,
      detail: `Extra ${formatCurrency(monthlyContrib)}/month adds ${formatCurrency(doubleBalance - (currentBalance * Math.pow(1 + monthlyRate, totalMonths) + monthlyContrib * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)))}`
    });

    // Scenario 3: Add $10k lump sum now
    const lumpSum = 10000;
    let lumpSumBalance = (currentBalance + lumpSum);
    if (monthlyRate > 0) {
      lumpSumBalance = lumpSumBalance * Math.pow(1 + monthlyRate, totalMonths) +
                       monthlyContrib * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    } else {
      lumpSumBalance = lumpSumBalance + (monthlyContrib * totalMonths);
    }
    const currentProjected = monthlyRate > 0
      ? currentBalance * Math.pow(1 + monthlyRate, totalMonths) + monthlyContrib * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
      : currentBalance + (monthlyContrib * totalMonths);
    scenarios.push({
      title: 'Add $10,000 Lump Sum Today',
      description: 'One-time additional investment now',
      projectedSavings: lumpSumBalance,
      difference: lumpSumBalance - targetCost,
      detail: `$10k grows to ${formatCurrency(lumpSumBalance - currentProjected)} extra`
    });

    return scenarios;
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('college-savings-result');
    if (!resultDiv) return;

    // Determine funding status
    const fundingPercent = (results.projectedSavings / results.totalProjectedCost) * 100;
    let statusClass, statusIcon, statusTitle, statusMessage;

    if (fundingPercent >= 100) {
      statusClass = 'status-funded';
      statusIcon = '🎉';
      statusTitle = 'Fully Funded!';
      statusMessage = `Your savings plan will cover ${fundingPercent.toFixed(0)}% of projected college costs, with a surplus of ${formatCurrency(Math.abs(results.fundingGap))}.`;
    } else if (fundingPercent >= 70) {
      statusClass = 'status-partial';
      statusIcon = '📈';
      statusTitle = 'Well on Track';
      statusMessage = `You're projected to cover ${fundingPercent.toFixed(0)}% of college costs. A gap of ${formatCurrency(results.fundingGap)} remains.`;
    } else {
      statusClass = 'status-gap';
      statusIcon = '📊';
      statusTitle = 'Funding Gap';
      statusMessage = `At current savings rate, you'll cover ${fundingPercent.toFixed(0)}% of projected costs. Consider increasing contributions.`;
    }

    // Funding bar class
    let barClass = 'low';
    if (fundingPercent >= 100) barClass = 'funded';
    else if (fundingPercent >= 50) barClass = 'partial';

    const collegeTypeLabel = results.collegeType === 'custom' ? 'Custom' :
      results.collegeType === 'in-state' ? 'In-State Public' :
      results.collegeType === 'out-of-state' ? 'Out-of-State Public' : 'Private University';

    resultDiv.innerHTML = `
      <h3>College Savings Projection</h3>

      <div class="funding-status ${statusClass}">
        <div class="status-icon">${statusIcon}</div>
        <div class="status-content">
          <h4>${statusTitle}</h4>
          <p>${statusMessage}</p>
        </div>
      </div>

      <div class="college-summary">
        <div class="summary-card">
          <h5>Projected College Cost</h5>
          <div class="amount">${formatCurrency(results.totalProjectedCost)}</div>
          <div class="detail">${collegeTypeLabel} (${results.collegeYears} years)</div>
        </div>
        <div class="summary-card">
          <h5>Projected Savings</h5>
          <div class="amount text-primary">${formatCurrency(results.projectedSavings)}</div>
          <div class="detail">At enrollment (age ${results.collegeStartAge})</div>
        </div>
        <div class="summary-card">
          <h5>${results.fundingGap > 0 ? 'Funding Gap' : 'Surplus'}</h5>
          <div class="amount ${results.fundingGap > 0 ? 'text-danger' : 'text-success'}">
            ${formatCurrency(Math.abs(results.fundingGap))}
          </div>
          <div class="detail">${results.fundingGap > 0 ? 'Additional funding needed' : 'Extra savings available'}</div>
        </div>
        <div class="summary-card">
          <h5>Investment Growth</h5>
          <div class="amount text-success">${formatCurrency(results.totalGrowth)}</div>
          <div class="detail">${results.expectedReturn}% annual return</div>
        </div>
      </div>

      <div class="funding-progress">
        <h4>Funding Progress</h4>
        <p style="color: var(--color-gray-dark); font-size: 0.9rem;">
          Projected to cover <strong>${Math.min(fundingPercent, 100).toFixed(1)}%</strong> of total college costs
        </p>
        <div class="funding-bar-container">
          <div class="funding-bar-fill ${barClass}" style="width: ${Math.min(fundingPercent, 100)}%">
            ${fundingPercent.toFixed(0)}%
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--color-gray-dark);">
          <span>$0</span>
          <span>Goal: ${formatCurrency(results.totalProjectedCost)}</span>
        </div>
      </div>

      ${results.fundingGap > 0 ? `
      <div class="needed-contribution">
        <h4>Monthly Contribution Needed for Full Funding</h4>
        <div class="big-number">${formatCurrency(results.monthlyNeededToFund)}</div>
        <div class="context">
          That's ${formatCurrency(results.monthlyNeededToFund - results.monthlyContribution)} more than your current ${formatCurrency(results.monthlyContribution)}/month
        </div>
      </div>
      ` : ''}

      ${results.stateTaxRate > 0 ? `
      <div class="tax-savings-box">
        <h4>529 Plan Tax Benefits</h4>
        <div class="tax-grid">
          <div class="tax-item">
            <div class="tax-label">Annual Contribution</div>
            <div class="tax-value">${formatCurrency(results.monthlyContribution * 12)}</div>
          </div>
          <div class="tax-item">
            <div class="tax-label">State Tax Rate</div>
            <div class="tax-value">${results.stateTaxRate}%</div>
          </div>
          <div class="tax-item">
            <div class="tax-label">Annual Tax Savings</div>
            <div class="tax-value">${formatCurrency(results.annualTaxSavings)}</div>
          </div>
          <div class="tax-item">
            <div class="tax-label">Total Tax Savings</div>
            <div class="tax-value">${formatCurrency(results.totalTaxSavings)}</div>
          </div>
        </div>
        <p style="font-size: 0.8rem; color: var(--color-gray-dark); margin-top: 1rem;">
          * Tax savings vary by state. Some states have contribution limits for deductions. Consult a tax advisor.
        </p>
      </div>
      ` : ''}

      <div class="yearly-growth">
        <h4>Year-by-Year Savings Growth</h4>
        <div class="growth-table-container">
          <table class="growth-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Child's Age</th>
                <th>Balance</th>
                <th>Contributions</th>
                <th>Growth</th>
                <th>% of Goal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Now</td>
                <td>${results.childAge}</td>
                <td>${formatCurrency(results.current529Balance)}</td>
                <td>${formatCurrency(results.current529Balance)}</td>
                <td>${formatCurrency(0)}</td>
                <td>${((results.current529Balance / results.totalProjectedCost) * 100).toFixed(1)}%</td>
              </tr>
              ${results.yearlyData.map(year => {
                const pctGoal = (year.balance / results.totalProjectedCost) * 100;
                const isCollegeYear = year.age >= results.collegeStartAge;
                return `
                  <tr class="${isCollegeYear ? 'college-year' : ''}">
                    <td>Year ${year.year}${isCollegeYear ? ' (College)' : ''}</td>
                    <td>${year.age}</td>
                    <td><strong>${formatCurrency(year.balance)}</strong></td>
                    <td>${formatCurrency(year.contributions)}</td>
                    <td style="color: var(--color-success);">${formatCurrency(year.growth)}</td>
                    <td>${pctGoal.toFixed(1)}%</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="what-if-section">
        <h4>What-If Scenarios</h4>
        <p style="color: var(--color-gray-dark); margin: 0.5rem 0 1rem;">See how changes could impact your college savings:</p>
        <div class="what-if-grid">
          ${results.scenarios.map(scenario => `
            <div class="what-if-card">
              <h5>${scenario.title}</h5>
              <div class="scenario-detail">${scenario.description}</div>
              <div class="scenario-result ${scenario.difference >= 0 ? 'positive' : 'negative'}">
                ${formatCurrency(scenario.projectedSavings)}
              </div>
              <div class="scenario-detail">
                ${scenario.difference >= 0
                  ? 'Surplus: +' + formatCurrency(scenario.difference)
                  : 'Gap: ' + formatCurrency(scenario.difference)}
              </div>
              <div class="scenario-detail" style="margin-top: 0.5rem; font-style: italic;">
                ${scenario.detail}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-top: 2rem; padding: 1rem; background: var(--color-surface-neutral); border-radius: 8px; font-size: 0.85rem; color: var(--color-gray-dark);">
        <strong>Assumptions:</strong> Costs today are based on 2024-2025 averages (College Board data).
        College cost inflation of ${results.costInflation}% is applied annually. Investment returns of ${results.expectedReturn}%
        are applied monthly. Actual costs and returns will vary. This is for planning purposes only.
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function validateInputs(childAge, collegeStartAge, collegeYears) {
    if (childAge < 0 || childAge > 17) {
      showError('Please enter a valid child age (0-17).');
      return false;
    }
    if (collegeStartAge < 16 || collegeStartAge > 22) {
      showError('Please enter a valid college start age (16-22).');
      return false;
    }
    if (collegeStartAge <= childAge) {
      showError('College start age must be greater than current age.');
      return false;
    }
    if (collegeYears < 1 || collegeYears > 8) {
      showError('Please enter valid college years (1-8).');
      return false;
    }
    return true;
  }

  function showError(message) {
    const resultDiv = document.getElementById('college-savings-result');
    if (resultDiv) {
      resultDiv.innerHTML = `
        <div class="alert alert-error">
          <strong>Error:</strong> ${message}
        </div>
      `;
      resultDiv.classList.remove('hidden');
    }
  }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'College Savings Calculation',
        text: 'Check out my college savings projection',
        url: url
      }).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      const shareBtn = document.getElementById('share-calculation');
      if (shareBtn) {
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '✓ Link Copied!';
        shareBtn.classList.add('btn-success');
        setTimeout(() => {
          shareBtn.innerHTML = originalText;
          shareBtn.classList.remove('btn-success');
        }, 2000);
      }
    } catch (err) {
      alert('Failed to copy link. Please copy manually: ' + text);
    }

    document.body.removeChild(textarea);
  }

  // Helper functions
  function getValue(id) {
    const element = document.getElementById(id);
    return element ? parseFloat(element.value) || 0 : 0;
  }

  function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.value = value;
    }
  }

  function getSelectValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
  }

  function setSelectValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.value = value;
    }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

})();
