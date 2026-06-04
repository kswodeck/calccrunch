(function() {
  'use strict';

  // MET values for all activities
  const MET_VALUES = {
    // Running
    'jogging': 7.0,
    'running-5mph': 8.3,
    'running-6mph': 9.8,
    'running-7mph': 11.0,
    'running-8mph': 11.8,
    'running-9mph': 12.8,
    'running-10mph': 14.5,
    'trail-running': 9.0,
    'sprints-intervals': 14.0,
    // Walking
    'walking-casual': 2.5,
    'walking-moderate': 3.5,
    'walking-brisk': 4.3,
    'power-walking': 5.0,
    'hiking': 6.0,
    'hiking-with-pack': 7.5,
    'walking-upstairs': 8.0,
    'walking-dog': 3.0,
    // Cycling
    'cycling-leisure': 4.0,
    'cycling-moderate': 8.0,
    'cycling-vigorous': 10.0,
    'cycling-racing': 16.0,
    'mountain-biking': 8.5,
    'spinning-class': 8.5,
    'stationary-moderate': 7.0,
    'stationary-vigorous': 10.5,
    // Swimming
    'swimming-leisure': 6.0,
    'swimming-laps-moderate': 8.0,
    'swimming-laps-vigorous': 10.0,
    'backstroke': 7.0,
    'breaststroke': 10.0,
    'butterfly': 13.8,
    'treading-water': 3.5,
    'water-aerobics': 5.5,
    // Sports
    'basketball-game': 8.0,
    'basketball-shooting': 4.5,
    'soccer': 10.0,
    'tennis-singles': 8.0,
    'tennis-doubles': 6.0,
    'volleyball': 4.0,
    'volleyball-competitive': 8.0,
    'golf-walking': 4.8,
    'golf-cart': 3.5,
    'baseball': 5.0,
    'football': 8.0,
    'hockey': 8.0,
    'racquetball': 7.0,
    'badminton': 5.5,
    'table-tennis': 4.0,
    'martial-arts': 10.3,
    'boxing-sparring': 12.8,
    'wrestling': 6.0,
    'skateboarding': 5.0,
    'rock-climbing': 8.0,
    'skiing-downhill': 6.0,
    'skiing-cross-country': 9.0,
    'snowboarding': 5.3,
    'ice-skating': 7.0,
    'roller-skating': 7.0,
    'surfing': 3.0,
    'kayaking': 5.0,
    'rowing-moderate': 7.0,
    'rowing-vigorous': 12.0,
    // Gym / Weights
    'weight-lifting-light': 3.5,
    'weight-lifting-vigorous': 6.0,
    'circuit-training': 8.0,
    'crossfit': 12.0,
    'hiit': 12.0,
    'yoga': 3.0,
    'hot-yoga': 4.0,
    'pilates': 3.0,
    'elliptical-moderate': 5.0,
    'elliptical-vigorous': 8.0,
    'stair-machine': 9.0,
    'jump-rope-moderate': 10.0,
    'jump-rope-vigorous': 12.3,
    'stretching': 2.3,
    'calisthenics-moderate': 4.0,
    'calisthenics-vigorous': 8.0,
    'kettlebells': 9.8,
    // Home / Daily Activities
    'cleaning-house': 3.5,
    'vacuuming': 3.3,
    'mopping': 3.5,
    'cooking': 2.5,
    'gardening': 3.8,
    'mowing-lawn-push': 5.5,
    'mowing-lawn-riding': 2.5,
    'raking-leaves': 4.0,
    'shoveling-snow': 6.0,
    'moving-furniture': 6.0,
    'playing-with-kids': 5.0,
    'sex-moderate': 1.8,
    'dancing-social': 4.5,
    'dancing-vigorous': 7.8,
    // Outdoor / Recreation
    'frisbee': 3.0,
    'horseback-riding': 5.5,
    'fishing': 3.5,
    'hunting': 5.0,
    'archery': 4.3,
    'bowling': 3.0,
    'billiards': 2.5,
    'darts': 2.5,
    'juggling': 4.0,
    'trampolining': 3.5,
    'paddleboarding': 6.0,
    'snorkeling': 5.0,
    'scuba-diving': 7.0,
    'canoeing': 3.5
  };

  // Food equivalents (calories per item)
  const FOOD_EQUIVALENTS = {
    'Slices of pizza': 285,
    'Cans of soda': 140,
    'Bananas': 105,
    'Chocolate bars': 235,
    'Beers (12 oz)': 153,
    'Donuts': 250
  };

  // URL parameter management
  const URLParams = {
    getAll() {
      const params = new URLSearchParams(window.location.search);
      const result = {};
      for (const [key, value] of params) {
        result[key] = value;
      }
      return result;
    },

    update(values) {
      const params = new URLSearchParams();
      Object.keys(values).forEach(key => {
        if (values[key] !== '' && values[key] !== null && values[key] !== undefined) {
          params.set(key, values[key]);
        }
      });
      const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
      window.history.replaceState({}, '', newURL);
    },

    clear() {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  function init() {
    const calculateBtn = document.getElementById('calculate-btn');
    const shareBtn = document.getElementById('share-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultDiv = document.getElementById('calories-burned-result');

    if (!calculateBtn || !resultDiv) {
      return;
    }

    // Load values from URL on page load
    loadFromURL();

    // Add input change listeners to update URL
    addInputListeners();

    // Calculate on button click
    calculateBtn.addEventListener('click', function() {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Share button
    if (shareBtn) {
      shareBtn.addEventListener('click', shareResults);
    }

    // Clear button
    if (clearBtn) {
      clearBtn.addEventListener('click', clearForm);
    }

    // Calculate on Enter key
    var inputs = document.querySelectorAll('#calories-burned-calculator-form input, #calories-burned-calculator-form select');
    inputs.forEach(function(input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateResults();
        }
      });
    });

    // Auto-calculate if we have URL parameters
    var urlParams = URLParams.getAll();
    if (Object.keys(urlParams).length > 0) {
      setTimeout(function() {
        calculateResults();
      }, 100);
    }
  }

  function loadFromURL() {
    var params = URLParams.getAll();

    if (Object.keys(params).length === 0) {
      return;
    }

    var fieldMap = {
      'weight': 'body-weight',
      'unit': 'weight-unit',
      'activity': 'activity-select',
      'duration': 'duration',
      'intensity': 'intensity'
    };

    Object.keys(fieldMap).forEach(function(paramKey) {
      if (params[paramKey]) {
        var el = document.getElementById(fieldMap[paramKey]);
        if (el) {
          el.value = params[paramKey];
        }
      }
    });
  }

  function saveToURL() {
    var values = {};

    var weight = document.getElementById('body-weight').value;
    var unit = document.getElementById('weight-unit').value;
    var activity = document.getElementById('activity-select').value;
    var duration = document.getElementById('duration').value;
    var intensity = document.getElementById('intensity').value;

    if (weight) values.weight = weight;
    if (unit) values.unit = unit;
    if (activity) values.activity = activity;
    if (duration) values.duration = duration;
    if (intensity) values.intensity = intensity;

    URLParams.update(values);
  }

  function addInputListeners() {
    var inputIds = ['body-weight', 'duration'];
    inputIds.forEach(function(id) {
      var input = document.getElementById(id);
      if (input) {
        var timeout;
        input.addEventListener('input', function() {
          clearTimeout(timeout);
          timeout = setTimeout(function() {
            saveToURL();
          }, 500);
        });
      }
    });

    var selectIds = ['weight-unit', 'activity-select', 'intensity'];
    selectIds.forEach(function(id) {
      var select = document.getElementById(id);
      if (select) {
        select.addEventListener('change', function() {
          saveToURL();
        });
      }
    });
  }

  function calculateResults() {
    var weightValue = parseFloat(document.getElementById('body-weight').value);
    var weightUnit = document.getElementById('weight-unit').value;
    var activity = document.getElementById('activity-select').value;
    var duration = parseFloat(document.getElementById('duration').value);
    var intensity = document.getElementById('intensity').value;

    // Validate inputs
    if (!weightValue || weightValue <= 0) {
      showError('Please enter a valid body weight.');
      return;
    }
    if (!activity) {
      showError('Please select an activity.');
      return;
    }
    if (!duration || duration <= 0) {
      showError('Please enter a valid duration.');
      return;
    }

    // Convert weight to kg
    var weightKg = weightUnit === 'kg' ? weightValue : weightValue * 0.453592;

    // Get base MET value
    var baseMET = MET_VALUES[activity];
    if (!baseMET) {
      showError('Invalid activity selected.');
      return;
    }

    // Adjust MET for intensity
    var adjustedMET = baseMET;
    if (intensity === 'light') {
      adjustedMET = baseMET * 0.85;
    } else if (intensity === 'vigorous') {
      adjustedMET = baseMET * 1.15;
    }

    // Calculate calories: MET x weight(kg) x duration(hours)
    var durationHours = duration / 60;
    var totalCalories = adjustedMET * weightKg * durationHours;
    var caloriesPerMinute = totalCalories / duration;

    // Calculate comparison values (walking moderate and running 6mph)
    var walkingCalories = 3.5 * weightKg * durationHours;
    var runningCalories = 9.8 * weightKg * durationHours;

    // Calculate food equivalents
    var foodEquivs = {};
    Object.keys(FOOD_EQUIVALENTS).forEach(function(food) {
      foodEquivs[food] = (totalCalories / FOOD_EQUIVALENTS[food]).toFixed(1);
    });

    // Weekly and monthly projections (assuming same exercise frequency)
    var weeklyCalories = totalCalories * 3; // 3x per week
    var monthlyCalories = totalCalories * 13; // ~13 sessions per month

    // Save to URL
    saveToURL();

    // Display results
    displayResults({
      totalCalories: Math.round(totalCalories),
      caloriesPerMinute: caloriesPerMinute.toFixed(1),
      adjustedMET: adjustedMET.toFixed(1),
      activity: getActivityLabel(activity),
      duration: duration,
      intensity: intensity,
      foodEquivs: foodEquivs,
      walkingCalories: Math.round(walkingCalories),
      runningCalories: Math.round(runningCalories),
      weeklyCalories: Math.round(weeklyCalories),
      monthlyCalories: Math.round(monthlyCalories),
      weightKg: weightKg
    });

    // Track calculation
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculator_use', {
        calculator_type: 'calories-burned',
        result_value: Math.round(totalCalories)
      });
    }
  }

  function getActivityLabel(value) {
    var select = document.getElementById('activity-select');
    if (select) {
      var option = select.querySelector('option[value="' + value + '"]');
      if (option) {
        return option.textContent;
      }
    }
    return value;
  }

  function displayResults(data) {
    var resultDiv = document.getElementById('calories-burned-result');

    // Calculate bar widths for comparison chart
    var maxCal = Math.max(data.totalCalories, data.runningCalories, data.walkingCalories);
    var selectedWidth = Math.round((data.totalCalories / maxCal) * 100);
    var walkingWidth = Math.round((data.walkingCalories / maxCal) * 100);
    var runningWidth = Math.round((data.runningCalories / maxCal) * 100);

    // Build food equivalents HTML
    var foodHTML = '';
    Object.keys(data.foodEquivs).forEach(function(food) {
      var amount = parseFloat(data.foodEquivs[food]);
      if (amount >= 0.1) {
        foodHTML += '<div class="food-equiv-item">' +
          '<span class="food-name">' + food + '</span>' +
          '<span class="food-amount">' + data.foodEquivs[food] + '</span>' +
          '</div>';
      }
    });

    var intensityLabel = data.intensity.charAt(0).toUpperCase() + data.intensity.slice(1);

    resultDiv.innerHTML =
      '<div class="result-card">' +
        '<div class="result-header-actions" style="justify-content: center;">' +
          '<h3>Calories Burned Results</h3>' +
        '</div>' +

        '<div class="result-summary" style="display: block; text-align: center; margin-bottom: 1.5rem;">' +
          '<div class="calorie-display" style="margin-bottom: 1rem;">' +
            '<div style="font-size: 2.5rem; font-weight: bold; color: var(--color-chart-blue-dark);">' + formatNumber(data.totalCalories) + '</div>' +
            '<div style="font-size: 1.1rem; color: var(--color-gray-dark);">total calories burned</div>' +
          '</div>' +
          '<div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">' +
            '<div style="text-align: center;">' +
              '<div style="font-size: 1.3rem; font-weight: bold; color: var(--color-primary-blue);">' + data.caloriesPerMinute + '</div>' +
              '<div style="font-size: 0.85rem; color: var(--color-gray-dark);">cal/minute</div>' +
            '</div>' +
            '<div style="text-align: center;">' +
              '<div style="font-size: 1.3rem; font-weight: bold; color: var(--color-primary-blue);">' + data.adjustedMET + '</div>' +
              '<div style="font-size: 0.85rem; color: var(--color-gray-dark);">MET value</div>' +
            '</div>' +
            '<div style="text-align: center;">' +
              '<div style="font-size: 1.3rem; font-weight: bold; color: var(--color-primary-blue);">' + data.duration + ' min</div>' +
              '<div style="font-size: 0.85rem; color: var(--color-gray-dark);">duration</div>' +
            '</div>' +
          '</div>' +
          '<div style="margin-top: 0.75rem; padding: 0.5rem 1rem; background: var(--color-surface-neutral); border-radius: var(--border-radius-lg); display: inline-block;">' +
            '<strong>' + data.activity + '</strong> at <strong>' + intensityLabel + '</strong> intensity' +
          '</div>' +
        '</div>' +

        '<div style="margin-bottom: 1.5rem;">' +
          '<h4 style="margin-bottom: 0.75rem;">🍕 Food Equivalents</h4>' +
          '<p style="font-size: 0.85rem; color: var(--color-gray-dark); margin-bottom: 0.75rem;">Your workout burned the equivalent of:</p>' +
          '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.5rem;">' +
            foodHTML +
          '</div>' +
        '</div>' +

        '<div style="margin-bottom: 1.5rem;">' +
          '<h4 style="margin-bottom: 0.75rem;">📊 Activity Comparison</h4>' +
          '<p style="font-size: 0.85rem; color: var(--color-gray-dark); margin-bottom: 0.75rem;">Calories burned in ' + data.duration + ' minutes:</p>' +
          '<div style="display: flex; flex-direction: column; gap: 0.6rem;">' +
            '<div>' +
              '<div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">' +
                '<span style="font-size: 0.85rem; font-weight: 500;">' + data.activity + '</span>' +
                '<span style="font-size: 0.85rem; font-weight: bold;">' + formatNumber(data.totalCalories) + ' cal</span>' +
              '</div>' +
              '<div style="background: var(--color-surface-neutral); border-radius: 4px; height: 24px; overflow: hidden;">' +
                '<div style="background: var(--color-chart-blue-dark); height: 100%; width: ' + selectedWidth + '%; border-radius: 4px; transition: width 0.5s;"></div>' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">' +
                '<span style="font-size: 0.85rem; font-weight: 500;">Walking (moderate, 3 mph)</span>' +
                '<span style="font-size: 0.85rem; font-weight: bold;">' + formatNumber(data.walkingCalories) + ' cal</span>' +
              '</div>' +
              '<div style="background: var(--color-surface-neutral); border-radius: 4px; height: 24px; overflow: hidden;">' +
                '<div style="background: var(--color-success); height: 100%; width: ' + walkingWidth + '%; border-radius: 4px; transition: width 0.5s;"></div>' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">' +
                '<span style="font-size: 0.85rem; font-weight: 500;">Running (6 mph)</span>' +
                '<span style="font-size: 0.85rem; font-weight: bold;">' + formatNumber(data.runningCalories) + ' cal</span>' +
              '</div>' +
              '<div style="background: var(--color-surface-neutral); border-radius: 4px; height: 24px; overflow: hidden;">' +
                '<div style="background: var(--color-accent-orange); height: 100%; width: ' + runningWidth + '%; border-radius: 4px; transition: width 0.5s;"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div style="margin-bottom: 1.5rem;">' +
          '<h4 style="margin-bottom: 0.75rem;">📅 Projections (If Done Regularly)</h4>' +
          '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">' +
            '<div style="background: var(--color-surface-neutral); padding: 1rem; border-radius: var(--border-radius-lg); text-align: center;">' +
              '<div style="font-size: 0.8rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">3x per week</div>' +
              '<div style="font-size: 1.4rem; font-weight: bold; color: var(--color-primary-blue);">' + formatNumber(data.weeklyCalories) + '</div>' +
              '<div style="font-size: 0.8rem; color: var(--color-gray-dark);">cal/week</div>' +
            '</div>' +
            '<div style="background: var(--color-surface-neutral); padding: 1rem; border-radius: var(--border-radius-lg); text-align: center;">' +
              '<div style="font-size: 0.8rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">~13 sessions/month</div>' +
              '<div style="font-size: 1.4rem; font-weight: bold; color: var(--color-primary-blue);">' + formatNumber(data.monthlyCalories) + '</div>' +
              '<div style="font-size: 0.8rem; color: var(--color-gray-dark);">cal/month</div>' +
            '</div>' +
            '<div style="background: var(--color-surface-neutral); padding: 1rem; border-radius: var(--border-radius-lg); text-align: center;">' +
              '<div style="font-size: 0.8rem; color: var(--color-gray-dark); margin-bottom: 0.25rem;">Weight equivalent</div>' +
              '<div style="font-size: 1.4rem; font-weight: bold; color: var(--color-primary-blue);">' + (data.monthlyCalories / 3500).toFixed(1) + '</div>' +
              '<div style="font-size: 0.8rem; color: var(--color-gray-dark);">lbs fat/month</div>' +
            '</div>' +
          '</div>' +
          '<p style="font-size: 0.75rem; color: var(--color-gray-dark); margin-top: 0.5rem; text-align: center;">' +
            '* Based on 3,500 calories per pound of fat. Actual weight loss depends on diet and other factors.' +
          '</p>' +
        '</div>' +

        '<div class="result-actions" style="justify-content: center; margin-top: 1.5rem;">' +
          '<button type="button" onclick="document.getElementById(\'share-btn\').click()" class="btn-action" title="Share Results">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
              '<circle cx="18" cy="5" r="3"></circle>' +
              '<circle cx="6" cy="12" r="3"></circle>' +
              '<circle cx="18" cy="19" r="3"></circle>' +
              '<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>' +
              '<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>' +
            '</svg>' +
            'Share' +
          '</button>' +
          '<button type="button" onclick="document.getElementById(\'clear-btn\').click()" class="btn-action" title="Reset Calculator">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
              '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>' +
              '<path d="M3 3v5h5"></path>' +
            '</svg>' +
            'Clear' +
          '</button>' +
        '</div>' +
      '</div>';

    resultDiv.classList.remove('hidden');
  }

  function showError(message) {
    var resultDiv = document.getElementById('calories-burned-result');
    resultDiv.innerHTML = '<div class="error-message"><strong>⚠️ Error:</strong> ' + message + '</div>';
    resultDiv.classList.remove('hidden');
  }

  function shareResults() {
    saveToURL();
    var shareURL = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: 'Calories Burned Calculator - CalcCrunch',
        text: 'Check out my calorie burn calculation!',
        url: shareURL
      }).catch(function() {
        copyToClipboard(shareURL);
      });
    } else {
      copyToClipboard(shareURL);
    }
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showCopyFeedback();
      }).catch(function() {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopyFeedback();
    } catch (err) {
      alert('Copy this link to share: ' + text);
    }
    document.body.removeChild(textarea);
  }

  function showCopyFeedback() {
    var shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      var originalHTML = shareBtn.innerHTML;
      shareBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Link Copied!';
      shareBtn.style.background = 'var(--color-success)';
      shareBtn.style.color = 'white';
      setTimeout(function() {
        shareBtn.innerHTML = originalHTML;
        shareBtn.style.background = '';
        shareBtn.style.color = '';
      }, 2000);
    }
  }

  function clearForm() {
    document.getElementById('body-weight').value = '160';
    document.getElementById('weight-unit').value = 'lbs';
    document.getElementById('activity-select').value = '';
    document.getElementById('duration').value = '30';
    document.getElementById('intensity').value = 'moderate';

    URLParams.clear();

    var resultDiv = document.getElementById('calories-burned-result');
    if (resultDiv) {
      resultDiv.classList.add('hidden');
    }
  }

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
