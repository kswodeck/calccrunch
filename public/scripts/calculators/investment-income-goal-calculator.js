// Investment Income Goal Calculator
// Calculates investment income, ROI, breakeven, and time to financial goals

(function() {
  'use strict';

  // DOM Elements
  const form = document.getElementById('investment-income-calculator-form');
  const calculateBtn = document.getElementById('calculate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const shareBtn = document.getElementById('share-calculation');
  const resultDiv = document.getElementById('investment-result');
  
  // Form inputs
  const annualIncomeGoalInput = document.getElementById('annual-income-goal');
  const investmentYearsInput = document.getElementById('investment-years');
  const contributionFrequencySelect = document.getElementById('contribution-frequency');
  const contributionAmountInput = document.getElementById('contribution-amount');
  const investmentsContainer = document.getElementById('investments-container');
  const addInvestmentBtn = document.getElementById('add-investment-btn');
  const monthlyEquivalentDiv = document.getElementById('monthly-equivalent');
  const monthlyAmountSpan = document.getElementById('monthly-amount');
  const contributionAmountGroup = document.getElementById('contribution-amount-group');
  const contributionHelp = document.getElementById('contribution-help');

  // State
  let investments = [];
  let investmentCounter = 0;

  // Initialize
  init();

  function init() {
    // Load from URL parameters first
    loadFromURL();
    
    // If no investments loaded from URL, add one default investment
    if (investments.length === 0) {
      addInvestment();
    }

    // Event listeners
    calculateBtn.addEventListener('click', () => {
      calculateResults();
      document.querySelector(".calculator-result")?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
    clearBtn.addEventListener('click', clearForm);
    shareBtn.addEventListener('click', shareCalculation);
    addInvestmentBtn.addEventListener('click', () => addInvestment());
    
    // Real-time updates
    annualIncomeGoalInput.addEventListener('input', debounce(updateMonthlyEquivalent, 300));
    annualIncomeGoalInput.addEventListener('input', debounce(saveToURL, 500));
    investmentYearsInput.addEventListener('input', debounce(saveToURL, 500));
    contributionFrequencySelect.addEventListener('change', handleContributionFrequencyChange);
    contributionFrequencySelect.addEventListener('change', debounce(saveToURL, 500));
    contributionAmountInput.addEventListener('input', debounce(saveToURL, 500));

    // Update monthly equivalent on load if value exists
    if (annualIncomeGoalInput.value) {
      updateMonthlyEquivalent();
    }

    // Update contribution field visibility on load
    handleContributionFrequencyChange();
  }

  function addInvestment(data = null) {
    investmentCounter++;
    const investmentId = data?.id || `investment-${investmentCounter}`;
    
    const investment = {
      id: investmentId,
      name: data?.name || '',
      amount: data?.amount || '',
      returnRate: data?.returnRate || '',
      quantity: data?.quantity || '1',
      isCompounding: data?.isCompounding !== undefined ? data.isCompounding : true
    };

    investments.push(investment);

    const investmentRow = document.createElement('div');
    investmentRow.className = 'investment-row';
    investmentRow.dataset.investmentId = investmentId;
    
    investmentRow.innerHTML = `
      <div class="investment-header">
        <span class="investment-number">Investment #${investments.length}</span>
        <button type="button" class="remove-investment-btn" data-investment-id="${investmentId}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${investmentId}-name">
            Investment Name <span class="required">*</span>
          </label>
          <input 
            type="text" 
            id="${investmentId}-name" 
            class="form-input investment-name"
            placeholder="e.g., S&P 500 Index Fund"
            value="${investment.name}"
            data-investment-id="${investmentId}"
            required
          />
          <small class="form-help">Describe this investment</small>
        </div>
        <div class="form-group">
          <label for="${investmentId}-quantity">
            Quantity <span class="required">*</span>
          </label>
          <input 
            type="number" 
            id="${investmentId}-quantity" 
            class="form-input investment-quantity"
            placeholder="1"
            min="1"
            max="1000"
            value="${investment.quantity}"
            data-investment-id="${investmentId}"
            required
          />
          <small class="form-help">Number of these investments</small>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${investmentId}-amount">
            Initial Investment (Each) <span class="required">*</span>
          </label>
          <div class="input-with-addon">
            <span class="input-addon">$</span>
            <input 
              type="number" 
              id="${investmentId}-amount" 
              class="form-input investment-amount"
              placeholder="10000"
              min="0"
              step="1000"
              value="${investment.amount}"
              data-investment-id="${investmentId}"
              required
            />
          </div>
          <small class="form-help">Amount per investment</small>
        </div>
        <div class="form-group">
          <label for="${investmentId}-return">
            Expected Annual Return <span class="required">*</span>
          </label>
          <div class="input-with-addon">
            <input 
              type="number" 
              id="${investmentId}-return" 
              class="form-input investment-return"
              placeholder="8"
              min="0"
              max="100"
              step="0.1"
              value="${investment.returnRate}"
              data-investment-id="${investmentId}"
              required
            />
            <span class="input-addon">%</span>
          </div>
          <small class="form-help">Average annual return rate</small>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label style="display: flex; align-items: center; cursor: pointer; user-select: none;">
            <input 
              type="checkbox" 
              id="${investmentId}-compound" 
              class="investment-compound"
              ${investment.isCompounding ? 'checked' : ''}
              data-investment-id="${investmentId}"
              style="margin-right: 0.5rem; width: 18px; height: 18px; cursor: pointer;"
            />
            <span style="font-weight: 600;">Compounding Asset</span>
          </label>
          <small class="form-help">Check if returns are reinvested (stocks, funds). Uncheck for fixed income (rental property, bonds with no reinvestment)</small>
        </div>
      </div>
    `;

    investmentsContainer.appendChild(investmentRow);

    // Add event listeners for this investment
    const nameInput = investmentRow.querySelector('.investment-name');
    const quantityInput = investmentRow.querySelector('.investment-quantity');
    const amountInput = investmentRow.querySelector('.investment-amount');
    const returnInput = investmentRow.querySelector('.investment-return');
    const compoundCheckbox = investmentRow.querySelector('.investment-compound');
    const removeBtn = investmentRow.querySelector('.remove-investment-btn');

    nameInput.addEventListener('input', debounce(() => updateInvestmentData(investmentId), 500));
    quantityInput.addEventListener('input', debounce(() => updateInvestmentData(investmentId), 500));
    amountInput.addEventListener('input', debounce(() => updateInvestmentData(investmentId), 500));
    returnInput.addEventListener('input', debounce(() => updateInvestmentData(investmentId), 500));
    compoundCheckbox.addEventListener('change', () => updateInvestmentData(investmentId));
    removeBtn.addEventListener('click', () => removeInvestment(investmentId));

    // Update investment numbers
    updateInvestmentNumbers();
  }

  function removeInvestment(investmentId) {
    // Don't allow removing the last investment
    if (investments.length <= 1) {
      alert('You must have at least one investment.');
      return;
    }

    // Remove from DOM
    const investmentRow = document.querySelector(`[data-investment-id="${investmentId}"]`);
    if (investmentRow) {
      investmentRow.remove();
    }

    // Remove from state
    investments = investments.filter(inv => inv.id !== investmentId);

    // Update numbering
    updateInvestmentNumbers();

    // Save to URL
    saveToURL();
  }

  function updateInvestmentNumbers() {
    const investmentRows = investmentsContainer.querySelectorAll('.investment-row');
    investmentRows.forEach((row, index) => {
      const numberSpan = row.querySelector('.investment-number');
      if (numberSpan) {
        numberSpan.textContent = `Investment #${index + 1}`;
      }
    });
  }

  function updateInvestmentData(investmentId) {
    const investment = investments.find(inv => inv.id === investmentId);
    if (!investment) return;

    const nameInput = document.querySelector(`#${investmentId}-name`);
    const quantityInput = document.querySelector(`#${investmentId}-quantity`);
    const amountInput = document.querySelector(`#${investmentId}-amount`);
    const returnInput = document.querySelector(`#${investmentId}-return`);
    const compoundCheckbox = document.querySelector(`#${investmentId}-compound`);

    investment.name = nameInput.value;
    investment.quantity = quantityInput.value;
    investment.amount = amountInput.value;
    investment.returnRate = returnInput.value;
    investment.isCompounding = compoundCheckbox.checked;

    saveToURL();
  }

  function updateMonthlyEquivalent() {
    const annualGoal = parseFloat(annualIncomeGoalInput.value) || 0;
    
    if (annualGoal > 0) {
      const monthlyGoal = annualGoal / 12;
      monthlyAmountSpan.textContent = formatCurrency(monthlyGoal);
      monthlyEquivalentDiv.style.display = 'block';
    } else {
      monthlyEquivalentDiv.style.display = 'none';
    }
  }

  function handleContributionFrequencyChange() {
    const frequency = contributionFrequencySelect.value;
    
    if (!frequency) {
      contributionAmountGroup.style.display = 'none';
      contributionAmountInput.value = '';
    } else {
      contributionAmountGroup.style.display = 'block';
      contributionHelp.textContent = frequency === 'daily' ? 
        'Amount to contribute each day' :
        frequency === 'weekly' ? 
        'Amount to contribute each week' :
        frequency === 'biweekly' ? 
        'Amount to contribute every other week' :
        frequency === 'monthly' ? 
        'Amount to contribute each month' : 
        frequency === 'quarterly' ? 
        'Amount to contribute each quarter' : 
        'Amount to contribute each year';
    }
    
    saveToURL();
  }

  function calculateResults() {
    // Validate inputs
    const annualGoal = parseFloat(annualIncomeGoalInput.value);
    const years = parseInt(investmentYearsInput.value);

    if (!annualGoal || annualGoal <= 0) {
      alert('Please enter a valid annual income goal.');
      return;
    }

    if (!years || years <= 0) {
      alert('Please enter a valid investment timeframe.');
      return;
    }

    // Validate investments
    const validInvestments = [];
    for (const investment of investments) {
      const name = document.querySelector(`#${investment.id}-name`).value.trim();
      const quantity = parseInt(document.querySelector(`#${investment.id}-quantity`).value);
      const amount = parseFloat(document.querySelector(`#${investment.id}-amount`).value);
      const returnRate = parseFloat(document.querySelector(`#${investment.id}-return`).value);
      const isCompounding = document.querySelector(`#${investment.id}-compound`).checked;

      if (!name || !quantity || quantity <= 0 || !amount || amount <= 0 || !returnRate || returnRate < 0) {
        alert('Please fill in all investment fields with valid values.');
        return;
      }

      validInvestments.push({
        id: investment.id,
        name: name,
        quantity: quantity,
        amount: amount,
        returnRate: returnRate / 100, // Convert to decimal
        isCompounding: isCompounding
      });
    }

    // Get contribution details
    const contributionFreq = contributionFrequencySelect.value;
    const contributionAmount = parseFloat(contributionAmountInput.value) || 0;

    // Perform calculations
    const results = calculateInvestmentResults(validInvestments, annualGoal, years, contributionFreq, contributionAmount);

    // Display results
    displayResults(results, annualGoal, years);
  }

  function calculateInvestmentResults(investments, annualGoal, years, contributionFreq, contributionAmount) {
    const results = {
      investments: [],
      totalInitialInvestment: 0,
      totalContributions: 0,
      totalFinalValue: 0,
      totalAnnualIncome: 0,
      totalMonthlyIncome: 0,
      overallROI: 0,
      breakevenYear: null,
      goalReachedYear: null
    };

    // Calculate each investment
    investments.forEach(inv => {
      const investmentResult = calculateSingleInvestment(
        inv.amount,
        inv.returnRate,
        years,
        contributionFreq,
        contributionAmount,
        investments.length,
        inv.isCompounding
      );

      // Multiply by quantity
      const totalInitialForInvestment = inv.amount * inv.quantity;
      const totalFinalForInvestment = investmentResult.finalValue * inv.quantity;
      const totalAnnualIncomeForInvestment = investmentResult.annualIncome * inv.quantity;
      const totalContributionsForInvestment = investmentResult.totalContributions * inv.quantity;
      const totalGainForInvestment = investmentResult.totalGain * inv.quantity;

      results.investments.push({
        name: inv.name,
        quantity: inv.quantity,
        initialAmount: inv.amount,
        totalInitialAmount: totalInitialForInvestment,
        returnRate: inv.returnRate,
        isCompounding: inv.isCompounding,
        finalValue: investmentResult.finalValue,
        totalFinalValue: totalFinalForInvestment,
        annualIncome: investmentResult.annualIncome,
        totalAnnualIncome: totalAnnualIncomeForInvestment,
        monthlyIncome: investmentResult.monthlyIncome,
        totalMonthlyIncome: investmentResult.monthlyIncome * inv.quantity,
        totalContributions: totalContributionsForInvestment,
        totalGain: totalGainForInvestment,
        roi: investmentResult.roi
      });

      results.totalInitialInvestment += totalInitialForInvestment;
      results.totalContributions += totalContributionsForInvestment;
      results.totalFinalValue += totalFinalForInvestment;
      results.totalAnnualIncome += totalAnnualIncomeForInvestment;
    });

    results.totalMonthlyIncome = results.totalAnnualIncome / 12;
    
    // Calculate overall ROI
    const totalInvested = results.totalInitialInvestment + results.totalContributions;
    const totalGain = results.totalFinalValue - totalInvested;
    results.overallROI = (totalGain / totalInvested) * 100;
    if (totalGain <= 0) results.overallROI = (results.totalAnnualIncome / totalInvested) * 100;

    // Find breakeven and goal reached years
    results.breakevenYear = findBreakevenYear(investments, contributionFreq, contributionAmount);
    results.goalReachedYear = findGoalReachedYear(investments, annualGoal, contributionFreq, contributionAmount);

    return results;
  }

  function calculateSingleInvestment(principal, rate, years, contributionFreq, contributionAmount, numInvestments, isCompounding) {
    // Divide contributions equally among investments
    const contributionPerInvestment = contributionAmount / numInvestments;
    
    let balance = principal;
    let totalContributions = 0;
    
    if (isCompounding) {
      // Compounding asset - returns are reinvested
      for (let year = 1; year <= years; year++) {
        if (contributionFreq) {
          for (let compound = 0; compound < contributionFreq; compound++) {
            balance += contributionPerInvestment;
            totalContributions += contributionPerInvestment;
            // Compound
            balance *= (1 + rate / contributionFreq);
          }
        } else {
          // No contributions, just annual compounding
          balance *= (1 + rate);
        }
      }
    } else {
      // Non-compounding asset - simple interest, returns not reinvested
      for (let year = 1; year <= years; year++) {
        if (contributionFreq) {
          for (let compound = 0; compound < contributionFreq; compound++) {
            balance += contributionPerInvestment;
            totalContributions += contributionPerInvestment;
          }
        }
      }
      // For non-compounding, balance stays as principal + contributions
    }

    const finalValue = balance;
    // Annual income is always the rate applied to final value for income generation
    const annualIncome = finalValue * rate;
    const monthlyIncome = annualIncome / 12;
    const totalGain = finalValue - principal - totalContributions;
    const roi = (totalGain / (principal + totalContributions)) * 100;

    return {
      finalValue,
      annualIncome,
      monthlyIncome,
      totalContributions,
      totalGain,
      roi
    };
  }

  function findBreakevenYear(investments, contributionFreq, contributionAmount) {
    const totalInitial = investments.reduce((sum, inv) => sum + (inv.amount * inv.quantity), 0);
    
    for (let year = 1; year <= 50; year++) {
      let totalValue = 0;
      
      investments.forEach(inv => {
        const result = calculateSingleInvestment(
          inv.amount,
          inv.returnRate,
          year,
          contributionFreq,
          contributionAmount,
          investments.length,
          inv.isCompounding
        );
        totalValue += result.finalValue * inv.quantity;
      });

      const totalContribYear = calculateTotalContributions(contributionFreq, contributionAmount, year);
      const totalInvested = totalInitial + totalContribYear;
      const gain = totalValue - totalInvested;

      if (gain >= totalInvested) {
        return year;
      }
    }

    return null; // Breakeven not reached within 50 years
  }

  function findGoalReachedYear(investments, annualGoal, contributionFreq, contributionAmount) {
    for (let year = 1; year <= 50; year++) {
      let totalAnnualIncome = 0;
      
      investments.forEach(inv => {
        const result = calculateSingleInvestment(
          inv.amount,
          inv.returnRate,
          year,
          contributionFreq,
          contributionAmount,
          investments.length,
          inv.isCompounding
        );
        totalAnnualIncome += result.annualIncome * inv.quantity;
      });

      if (totalAnnualIncome >= annualGoal) {
        return year;
      }
    }

    return null; // Goal not reached within 50 years
  }

  function calculateTotalContributions(frequency, amount, years) {
    if (frequency) {
      return amount * frequency * years;
    }
    return 0;
  }

  function displayResults(results, annualGoal, years) {
    const monthlyGoal = annualGoal / 12;
    const goalMet = results.totalAnnualIncome >= annualGoal;
    const incomeGap = annualGoal - results.totalAnnualIncome;

    let html = `
      <div class="result-header">
        <h3>📊 Investment Income Analysis</h3>
        <p style="margin: 0; font-size: 0.95rem; color: var(--color-gray-dark);">Results after ${years} year${years !== 1 ? 's' : ''} of investing</p>
      </div>

      <div class="compound-summary-cards">
        <div class="summary-card balance">
          <div class="card-icon">💼</div>
          <h5>Total Portfolio Value</h5>
          <div class="card-value">${formatCurrency(results.totalFinalValue)}</div>
          <p style="margin: 0.5rem 0 0; font-size: 0.875rem; color: var(--color-gray-dark);">Combined value of all investments</p>
        </div>
        
        <div class="summary-card ${goalMet ? 'income' : 'growth'}">
          <div class="card-icon">${goalMet ? '✅' : '⚠️'}</div>
          <h5>Annual Income Generated</h5>
          <div class="card-value">${formatCurrency(results.totalAnnualIncome)}</div>
          <p style="margin: 0.5rem 0 0; font-size: 0.875rem; ${goalMet ? 'color: var(--color-chart-green);' : 'color: var(--color-warning);'} font-weight: 600;">
            ${goalMet ? 
              `Exceeds goal by ${formatCurrency(results.totalAnnualIncome - annualGoal)}` : 
              `Short of goal by ${formatCurrency(Math.abs(incomeGap))}`
            }
          </p>
        </div>

        <div class="summary-card income">
          <div class="card-icon">📅</div>
          <h5>Monthly Income</h5>
          <div class="card-value">${formatCurrency(results.totalMonthlyIncome)}</div>
          <p style="margin: 0.5rem 0 0; font-size: 0.875rem; color: var(--color-gray-dark);">Goal: ${formatCurrency(monthlyGoal)}/month</p>
        </div>

        <div class="summary-card years">
          <div class="card-icon">📈</div>
          <h5>Total ROI</h5>
          <div class="card-value">${results.overallROI.toFixed(1)}%</div>
          <p style="margin: 0.5rem 0 0; font-size: 0.875rem; color: var(--color-gray-dark);">Return on investment</p>
        </div>

        <div class="summary-card contributions">
          <div class="card-icon">💵</div>
          <h5>Total Invested</h5>
          <div class="card-value">${formatCurrency(results.totalInitialInvestment + results.totalContributions)}</div>
          <p style="margin: 0.5rem 0 0; font-size: 0.875rem; color: var(--color-gray-dark);">
            Initial: ${formatCurrency(results.totalInitialInvestment)}${results.totalContributions > 0 ? `<br>+ Contributions: ${formatCurrency(results.totalContributions)}` : ''}
          </p>
        </div>

        <div class="summary-card growth">
          <div class="card-icon">💰</div>
          <h5>Total Gains</h5>
          <div class="card-value" style="color: var(--color-chart-green);">${formatCurrency(results.totalFinalValue - results.totalInitialInvestment - results.totalContributions)}</div>
          <p style="margin: 0.5rem 0 0; font-size: 0.875rem; color: var(--color-gray-dark);">Investment growth</p>
        </div>
      </div>

      <div class="result-breakdown" style="margin-top: var(--space-2xl);">
        <h4 style="color: var(--color-primary-blue); margin-bottom: var(--space-lg);">⏱️ Timeline Analysis</h4>
        <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
          ${results.breakevenYear ? `
            <div style="padding: var(--space-lg); background: linear-gradient(135deg, #E8F8E8 0%, #fff 100%); border-radius: var(--border-radius); border-left: 4px solid var(--color-chart-green);">
              <div style="display: flex; align-items: center; gap: var(--space-md);">
                <div style="font-size: 2rem;">🎯</div>
                <div>
                  <strong style="color: var(--color-primary-blue); font-size: 1.1rem;">Breakeven Point</strong>
                  <p style="margin: 0.25rem 0 0; color: var(--color-gray-dark);">Year ${results.breakevenYear} - When investment returns equal total invested amount</p>
                </div>
              </div>
            </div>
          ` : `${results.totalFinalValue > results.totalInitialInvestment + results.totalContributions ? `
            <div style="padding: var(--space-lg); background: #FFF8DC; border-radius: var(--border-radius); border-left: 4px solid var(--color-warning);">
              <div style="display: flex; align-items: center; gap: var(--space-md);">
                <div style="font-size: 2rem;">⚠️</div>
                <div>
                  <strong style="color: var(--color-primary-blue); font-size: 1.1rem;">Breakeven Not Reached</strong>
                  <p style="margin: 0.25rem 0 0; color: var(--color-gray-dark);">Based on these return rates, breakeven would take more than 50 years</p>
                </div>
              </div>
            </div>` : ``}
          `}
          
          ${results.goalReachedYear ? `
            <div style="padding: var(--space-lg); background: ${results.goalReachedYear <= years ? 'linear-gradient(135deg, #E8F8E8 0%, #fff 100%)' : 'linear-gradient(135deg, #E3F2FD 0%, #fff 100%)'}; border-radius: var(--border-radius); border-left: 4px solid ${results.goalReachedYear <= years ? 'var(--color-chart-green)' : 'var(--color-chart-blue)'};">
              <div style="display: flex; align-items: center; gap: var(--space-md);">
                <div style="font-size: 2rem;">${results.goalReachedYear <= years ? '✅' : '⏳'}</div>
                <div>
                  <strong style="color: var(--color-primary-blue); font-size: 1.1rem;">Income Goal ${results.goalReachedYear <= years ? 'Reached' : 'Timeline'}</strong>
                  <p style="margin: 0.25rem 0 0; color: var(--color-gray-dark);">Year ${results.goalReachedYear} - When annual income reaches ${formatCurrency(annualGoal)}</p>
                </div>
              </div>
            </div>
          ` : `
            <div style="padding: var(--space-lg); background: #FFE5E5; border-radius: var(--border-radius); border-left: 4px solid var(--color-error);">
              <div style="display: flex; align-items: center; gap: var(--space-md);">
                <div style="font-size: 2rem;">📈</div>
                <div>
                  <strong style="color: var(--color-primary-blue); font-size: 1.1rem;">Goal Not Reached in 50 Years</strong>
                  <p style="margin: 0.25rem 0 0; color: var(--color-gray-dark);">Consider increasing investment amounts or expected returns</p>
                </div>
              </div>
            </div>
          `}
        </div>
      </div>

      <div class="result-breakdown" style="margin-top: var(--space-2xl);">
        <h4 style="color: var(--color-primary-blue); margin-bottom: var(--space-lg);">💼 Individual Investment Performance</h4>
        ${results.investments.map((inv, index) => `
          <div style="background: var(--color-gray-light); padding: var(--space-md); border-radius: var(--border-radius-lg); margin-bottom: var(--space-lg); border: 2px solid var(--color-gray);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg); padding-bottom: var(--space-md); border-bottom: 2px solid var(--color-gray); flex-flow: wrap;">
              <div>
                <h5 style="margin: 0 0 0.25rem 0; color: var(--color-primary-blue); font-size: 1.25rem;">${inv.name}${inv.quantity > 1 ? ` (×${inv.quantity})` : ''}</h5>
                <span style="background: ${inv.isCompounding ? 'linear-gradient(135deg, #E8F8E8 0%, #C8E6C9 100%)' : 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)'}; color: ${inv.isCompounding ? 'var(--color-chart-green-dark)' : 'var(--color-chart-blue-dark)'}; padding: 0.25rem 0.75rem; border-radius: 12px; font-weight: 600; font-size: 0.75rem; display: inline-block;">
                  ${inv.isCompounding ? '📈 Compounding' : '📊 Non-Compounding'}
                </span>
              </div>
              <span style="background: var(--color-lighter-blue); color: var(--color-primary-blue); padding: 0.25rem 0.75rem; border-radius: 4px; font-weight: 600; font-size: 0.875rem;">Investment #${index + 1}</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-lg);">
              ${inv.quantity > 1 ? `
                <div style="background: #FFF8DC; padding: var(--space-md); border-radius: var(--border-radius); border-left: 3px solid var(--color-accent-orange);">
                  <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">Quantity</div>
                  <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-accent-orange);">${inv.quantity} investments</div>
                </div>
              ` : ''}
              <div style="background: var(--color-white); padding: var(--space-md); border-radius: var(--border-radius);">
                <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">${inv.quantity > 1 ? 'Initial Investment (Each)' : 'Initial Investment'}</div>
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-blue);">${formatCurrency(inv.initialAmount)}</div>
              </div>
              ${inv.quantity > 1 ? `
                <div style="background: #FFF8DC; padding: var(--space-md); border-radius: var(--border-radius); border-left: 3px solid var(--color-accent-orange);">
                  <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">Total Initial Investment</div>
                  <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-accent-orange);">${formatCurrency(inv.totalInitialAmount)}</div>
                </div>
              ` : ''}
              <div style="background: var(--color-white); padding: var(--space-md); border-radius: var(--border-radius);">
                <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">Expected Return</div>
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-blue);">${(inv.returnRate * 100).toFixed(2)}%/year</div>
              </div>
              ${inv.isCompounding ? `<div style="background: var(--color-white); padding: var(--space-md); border-radius: var(--border-radius);">
                <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">${inv.quantity > 1 ? 'Final Value (Each)' : 'Final Value'}</div>
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-blue);">${formatCurrency(inv.finalValue)}</div>
              </div>` : ''}
              ${inv.quantity > 1 && inv.isCompounding ? `
                <div style="background: #FFF8DC; padding: var(--space-md); border-radius: var(--border-radius); border-left: 3px solid var(--color-accent-orange);">
                  <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">Total Final Value</div>
                  <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-accent-orange);">${formatCurrency(inv.totalFinalValue)}</div>
                </div>
              ` : ''}
              ${inv.isCompounding ? `<div style="background: var(--color-white); padding: var(--space-md); border-radius: var(--border-radius);">
                <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">Total Gain</div>
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-chart-green);">${formatCurrency(inv.totalGain)}</div>
              </div>` : ''}
              <div style="background: var(--color-white); padding: var(--space-md); border-radius: var(--border-radius);">
                <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">${inv.quantity > 1 ? 'Annual Income (Each)' : 'Annual Income'}</div>
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-blue);">${formatCurrency(inv.annualIncome)}</div>
              </div>
              ${inv.quantity > 1 ? `
                <div style="background: #FFF8DC; padding: var(--space-md); border-radius: var(--border-radius); border-left: 3px solid var(--color-accent-orange);">
                  <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">Total Annual Income</div>
                  <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-accent-orange);">${formatCurrency(inv.totalAnnualIncome)}</div>
                </div>
              ` : ''}
              <div style="background: var(--color-white); padding: var(--space-md); border-radius: var(--border-radius);">
                <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">${inv.quantity > 1 ? 'Monthly Income (Each)' : 'Monthly Income'}</div>
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-blue);">${formatCurrency(inv.monthlyIncome)}</div>
              </div>
              ${inv.quantity > 1 ? `
                <div style="background: #FFF8DC; padding: var(--space-md); border-radius: var(--border-radius); border-left: 3px solid var(--color-accent-orange);">
                  <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">Total Monthly Income</div>
                  <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-accent-orange);">${formatCurrency(inv.totalMonthlyIncome)}</div>
                </div>
              ` : ''}
              ${inv.isCompounding ? `<div style="background: var(--color-white); padding: var(--space-md); border-radius: var(--border-radius);">
                <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">ROI</div>
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-blue);">${inv.roi.toFixed(2)}%</div>
              </div>` : ''}
              ${inv.totalContributions > 0 ? `
                <div style="background: var(--color-white); padding: var(--space-md); border-radius: var(--border-radius);">
                  <div style="font-size: 0.875rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">Contributions</div>
                  <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-blue);">${formatCurrency(inv.totalContributions)}</div>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="result-breakdown" style="margin-top: var(--space-2xl); background: linear-gradient(135deg, #E8F4F8 0%, #fff 100%); border-left: 4px solid var(--color-light-blue);">
        <h4 style="color: var(--color-primary-blue); margin-bottom: var(--space-lg);">💡 Key Insights & Recommendations</h4>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-md);">
          ${goalMet ? 
            `<li style="padding: var(--space-md); background: linear-gradient(135deg, #E8F8E8 0%, #fff 100%); border-radius: var(--border-radius); border-left: 3px solid var(--color-chart-green);">
              <strong style="color: var(--color-chart-green);">✓</strong> Your investment plan will generate <strong>${formatCurrency(results.totalAnnualIncome)}</strong> annually after ${years} years, exceeding your goal of ${formatCurrency(annualGoal)}.
            </li>` :
            `<li style="padding: var(--space-md); background: #FFF8DC; border-radius: var(--border-radius); border-left: 3px solid var(--color-warning);">
              <strong style="color: var(--color-warning);">⚠</strong> Your current plan generates <strong>${formatCurrency(results.totalAnnualIncome)}</strong> annually, which is <strong>${formatCurrency(Math.abs(incomeGap))}</strong> short of your ${formatCurrency(annualGoal)} goal.
            </li>`
          }
          ${results.totalFinalValue > results.totalInitialInvestment ? `<li style="padding: var(--space-md); background: var(--color-white); border-radius: var(--border-radius);">
            Your portfolio will grow from <strong>${formatCurrency(results.totalInitialInvestment)}</strong> to <strong>${formatCurrency(results.totalFinalValue)}</strong>, a gain of <strong>${formatCurrency(results.totalFinalValue - results.totalInitialInvestment - results.totalContributions)}</strong>.
          </li>` : ``}
          ${results.totalContributions > 0 ? 
            `<li style="padding: var(--space-md); background: var(--color-white); border-radius: var(--border-radius);">
              Regular contributions of <strong>${formatCurrency(results.totalContributions)}</strong> over ${years} years will significantly accelerate your portfolio growth.
            </li>` : 
            `<li style="padding: var(--space-md); background: linear-gradient(135deg, #E3F2FD 0%, #fff 100%); border-radius: var(--border-radius); border-left: 3px solid var(--color-chart-blue);">
              <strong style="color: var(--color-chart-blue);">💡</strong> Consider adding regular, weekly, monthly or annual contributions to reach your goal faster.
            </li>`
          }
          ${results.breakevenYear && results.breakevenYear <= years ?
            `<li style="padding: var(--space-md); background: var(--color-white); border-radius: var(--border-radius);">
              You'll reach breakeven (100% ROI) in year ${results.breakevenYear}, after which all gains are pure profit.
            </li>` :
            `<li style="padding: var(--space-md); background: #FFF8DC; border-radius: var(--border-radius); border-left: 3px solid var(--color-warning);">
              Consider increasing your expected returns or extending your timeframe to reach breakeven sooner.
            </li>`
          }
          ${!goalMet && results.goalReachedYear ?
            `<li style="padding: var(--space-md); background: linear-gradient(135deg, #E3F2FD 0%, #fff 100%); border-radius: var(--border-radius); border-left: 3px solid var(--color-chart-blue);">
              <strong style="color: var(--color-chart-blue);">💡</strong> Your income goal will be reached in year ${results.goalReachedYear}. Consider extending your timeline to ${results.goalReachedYear} years.
            </li>` :
            ''
          }
          ${!goalMet && !results.goalReachedYear ?
            `<li style="padding: var(--space-md); background: #FFE5E5; border-radius: var(--border-radius); border-left: 3px solid var(--color-error);">
              <strong style="color: var(--color-error);">⚠</strong> To reach your goal, consider: increasing initial investments, boosting expected returns, adding regular contributions, or extending the timeframe.
            </li>` :
            ''
          }
        </ul>
      </div>
    `;

    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
  }

  function saveToURL() {
    const params = new URLSearchParams();

    // Save basic inputs
    if (annualIncomeGoalInput.value) params.set('goal', annualIncomeGoalInput.value);
    if (investmentYearsInput.value) params.set('years', investmentYearsInput.value);
    if (contributionFrequencySelect.value) {
      params.set('contribFreq', contributionFrequencySelect.value);
      if (contributionAmountInput.value) params.set('contribAmt', contributionAmountInput.value);
    }

    // Save investments
    const investmentData = investments.map(inv => {
      const nameInput = document.querySelector(`#${inv.id}-name`);
      const quantityInput = document.querySelector(`#${inv.id}-quantity`);
      const amountInput = document.querySelector(`#${inv.id}-amount`);
      const returnInput = document.querySelector(`#${inv.id}-return`);
      const compoundCheckbox = document.querySelector(`#${inv.id}-compound`);

      return {
        id: inv.id,
        name: nameInput?.value || '',
        quantity: quantityInput?.value || '1',
        amount: amountInput?.value || '',
        returnRate: returnInput?.value || '',
        isCompounding: compoundCheckbox?.checked !== undefined ? compoundCheckbox.checked : true
      };
    }).filter(inv => inv.name || inv.amount || inv.returnRate);

    if (investmentData.length > 0) {
      params.set('investments', JSON.stringify(investmentData));
    }

    // Update URL without reloading
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newURL);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    // Load basic inputs
    if (params.has('goal')) annualIncomeGoalInput.value = params.get('goal');
    if (params.has('years')) investmentYearsInput.value = params.get('years');
    if (params.has('contribFreq')) {
      contributionFrequencySelect.value = params.get('contribFreq');
      if (params.has('contribAmt')) contributionAmountInput.value = params.get('contribAmt');
    }

    // Load investments
    if (params.has('investments')) {
      try {
        const investmentData = JSON.parse(params.get('investments'));
        investmentData.forEach(data => {
          addInvestment(data);
        });
      } catch (e) {
        console.error('Error parsing investment data:', e);
      }
    }
  }

  function clearForm() {
    if (!confirm('Clear all inputs and start over?')) return;

    // Clear inputs
    annualIncomeGoalInput.value = '';
    investmentYearsInput.value = '';
    contributionFrequencySelect.value = 0;
    contributionAmountInput.value = '';
    monthlyEquivalentDiv.style.display = 'none';
    contributionAmountGroup.style.display = 'none';

    // Clear investments
    investments = [];
    investmentCounter = 0;
    investmentsContainer.innerHTML = '';

    // Add one default investment
    addInvestment();

    // Hide results
    resultDiv.classList.add('hidden');

    // Clear URL
    window.history.replaceState({}, '', window.location.pathname);
  }

  async function shareCalculation() {
    const url = window.location.href;
    
    const shareData = {
      title: 'Investment Income Goal Calculator',
      text: 'Check out my investment income plan',
      url: url
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        showCopyConfirmation('Shared successfully!');
      } else {
        await navigator.clipboard.writeText(url);
        showCopyConfirmation('Link copied to clipboard!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err);
        fallbackCopyToClipboard(url);
      }
    }
  }

  function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      showCopyConfirmation('Link copied to clipboard!');
    } catch (err) {
      console.error('Fallback copy failed:', err);
      alert('Unable to copy link. Please copy the URL manually.');
    }
    
    document.body.removeChild(textArea);
  }

  function showCopyConfirmation(message) {
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
})();