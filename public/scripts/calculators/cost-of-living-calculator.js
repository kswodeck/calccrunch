(function() {
  'use strict';

  // Cost of living index data for 60+ major US cities
  // National average = 100 for each category
  const CITY_DATA = {
    'new-york': {
      name: 'New York, NY',
      overall: 187,
      housing: 302,
      groceries: 116,
      transportation: 130,
      healthcare: 110,
      utilities: 115,
      stateTaxRate: 6.85,
      salesTaxRate: 8.875,
      propertyTaxRate: 0.88,
      childcare: 2200
    },
    'san-francisco': {
      name: 'San Francisco, CA',
      overall: 179,
      housing: 285,
      groceries: 118,
      transportation: 128,
      healthcare: 115,
      utilities: 108,
      stateTaxRate: 9.3,
      salesTaxRate: 8.625,
      propertyTaxRate: 0.73,
      childcare: 2400
    },
    'honolulu': {
      name: 'Honolulu, HI',
      overall: 170,
      housing: 268,
      groceries: 145,
      transportation: 132,
      healthcare: 108,
      utilities: 158,
      stateTaxRate: 8.25,
      salesTaxRate: 4.5,
      propertyTaxRate: 0.28,
      childcare: 1600
    },
    'los-angeles': {
      name: 'Los Angeles, CA',
      overall: 166,
      housing: 258,
      groceries: 112,
      transportation: 133,
      healthcare: 110,
      utilities: 103,
      stateTaxRate: 9.3,
      salesTaxRate: 9.5,
      propertyTaxRate: 0.73,
      childcare: 1800
    },
    'boston': {
      name: 'Boston, MA',
      overall: 152,
      housing: 228,
      groceries: 110,
      transportation: 115,
      healthcare: 118,
      utilities: 120,
      stateTaxRate: 5.0,
      salesTaxRate: 6.25,
      propertyTaxRate: 1.08,
      childcare: 2100
    },
    'washington-dc': {
      name: 'Washington, DC',
      overall: 152,
      housing: 230,
      groceries: 108,
      transportation: 118,
      healthcare: 107,
      utilities: 110,
      stateTaxRate: 8.5,
      salesTaxRate: 6.0,
      propertyTaxRate: 0.56,
      childcare: 2000
    },
    'seattle': {
      name: 'Seattle, WA',
      overall: 149,
      housing: 225,
      groceries: 112,
      transportation: 122,
      healthcare: 112,
      utilities: 95,
      stateTaxRate: 0,
      salesTaxRate: 10.25,
      propertyTaxRate: 0.93,
      childcare: 1900
    },
    'san-diego': {
      name: 'San Diego, CA',
      overall: 146,
      housing: 220,
      groceries: 108,
      transportation: 118,
      healthcare: 112,
      utilities: 105,
      stateTaxRate: 9.3,
      salesTaxRate: 7.75,
      propertyTaxRate: 0.73,
      childcare: 1700
    },
    'miami': {
      name: 'Miami, FL',
      overall: 137,
      housing: 195,
      groceries: 107,
      transportation: 112,
      healthcare: 105,
      utilities: 102,
      stateTaxRate: 0,
      salesTaxRate: 7.0,
      propertyTaxRate: 0.86,
      childcare: 1400
    },
    'sacramento': {
      name: 'Sacramento, CA',
      overall: 134,
      housing: 192,
      groceries: 106,
      transportation: 115,
      healthcare: 110,
      utilities: 100,
      stateTaxRate: 9.3,
      salesTaxRate: 8.75,
      propertyTaxRate: 0.73,
      childcare: 1500
    },
    'portland': {
      name: 'Portland, OR',
      overall: 130,
      housing: 180,
      groceries: 105,
      transportation: 115,
      healthcare: 108,
      utilities: 92,
      stateTaxRate: 9.0,
      salesTaxRate: 0,
      propertyTaxRate: 0.97,
      childcare: 1500
    },
    'denver': {
      name: 'Denver, CO',
      overall: 128,
      housing: 172,
      groceries: 104,
      transportation: 108,
      healthcare: 106,
      utilities: 95,
      stateTaxRate: 4.4,
      salesTaxRate: 8.81,
      propertyTaxRate: 0.49,
      childcare: 1600
    },
    'anchorage': {
      name: 'Anchorage, AK',
      overall: 125,
      housing: 155,
      groceries: 130,
      transportation: 115,
      healthcare: 142,
      utilities: 120,
      stateTaxRate: 0,
      salesTaxRate: 0,
      propertyTaxRate: 1.04,
      childcare: 1200
    },
    'austin': {
      name: 'Austin, TX',
      overall: 122,
      housing: 158,
      groceries: 98,
      transportation: 105,
      healthcare: 100,
      utilities: 102,
      stateTaxRate: 0,
      salesTaxRate: 8.25,
      propertyTaxRate: 1.68,
      childcare: 1300
    },
    'philadelphia': {
      name: 'Philadelphia, PA',
      overall: 118,
      housing: 148,
      groceries: 108,
      transportation: 112,
      healthcare: 105,
      utilities: 112,
      stateTaxRate: 3.07,
      salesTaxRate: 8.0,
      propertyTaxRate: 1.36,
      childcare: 1400
    },
    'chicago': {
      name: 'Chicago, IL',
      overall: 117,
      housing: 142,
      groceries: 104,
      transportation: 112,
      healthcare: 103,
      utilities: 98,
      stateTaxRate: 4.95,
      salesTaxRate: 10.25,
      propertyTaxRate: 2.07,
      childcare: 1500
    },
    'hartford': {
      name: 'Hartford, CT',
      overall: 115,
      housing: 140,
      groceries: 106,
      transportation: 108,
      healthcare: 112,
      utilities: 125,
      stateTaxRate: 5.0,
      salesTaxRate: 6.35,
      propertyTaxRate: 2.14,
      childcare: 1500
    },
    'burlington': {
      name: 'Burlington, VT',
      overall: 114,
      housing: 142,
      groceries: 108,
      transportation: 102,
      healthcare: 110,
      utilities: 118,
      stateTaxRate: 6.6,
      salesTaxRate: 6.0,
      propertyTaxRate: 1.86,
      childcare: 1300
    },
    'baltimore': {
      name: 'Baltimore, MD',
      overall: 112,
      housing: 135,
      groceries: 105,
      transportation: 110,
      healthcare: 102,
      utilities: 112,
      stateTaxRate: 5.0,
      salesTaxRate: 6.0,
      propertyTaxRate: 1.04,
      childcare: 1500
    },
    'minneapolis': {
      name: 'Minneapolis, MN',
      overall: 108,
      housing: 125,
      groceries: 103,
      transportation: 108,
      healthcare: 105,
      utilities: 98,
      stateTaxRate: 7.05,
      salesTaxRate: 7.88,
      propertyTaxRate: 1.08,
      childcare: 1500
    },
    'charleston': {
      name: 'Charleston, SC',
      overall: 108,
      housing: 130,
      groceries: 102,
      transportation: 98,
      healthcare: 100,
      utilities: 105,
      stateTaxRate: 6.5,
      salesTaxRate: 9.0,
      propertyTaxRate: 0.57,
      childcare: 1100
    },
    'atlanta': {
      name: 'Atlanta, GA',
      overall: 107,
      housing: 122,
      groceries: 101,
      transportation: 108,
      healthcare: 102,
      utilities: 98,
      stateTaxRate: 5.49,
      salesTaxRate: 8.9,
      propertyTaxRate: 0.92,
      childcare: 1200
    },
    'salt-lake-city': {
      name: 'Salt Lake City, UT',
      overall: 106,
      housing: 125,
      groceries: 100,
      transportation: 102,
      healthcare: 98,
      utilities: 88,
      stateTaxRate: 4.65,
      salesTaxRate: 7.75,
      propertyTaxRate: 0.58,
      childcare: 1100
    },
    'nashville': {
      name: 'Nashville, TN',
      overall: 105,
      housing: 122,
      groceries: 98,
      transportation: 100,
      healthcare: 98,
      utilities: 96,
      stateTaxRate: 0,
      salesTaxRate: 9.25,
      propertyTaxRate: 0.66,
      childcare: 1100
    },
    'las-vegas': {
      name: 'Las Vegas, NV',
      overall: 105,
      housing: 120,
      groceries: 102,
      transportation: 108,
      healthcare: 100,
      utilities: 98,
      stateTaxRate: 0,
      salesTaxRate: 8.375,
      propertyTaxRate: 0.55,
      childcare: 1100
    },
    'dallas': {
      name: 'Dallas, TX',
      overall: 104,
      housing: 115,
      groceries: 98,
      transportation: 102,
      healthcare: 100,
      utilities: 105,
      stateTaxRate: 0,
      salesTaxRate: 8.25,
      propertyTaxRate: 1.69,
      childcare: 1200
    },
    'boise': {
      name: 'Boise, ID',
      overall: 104,
      housing: 122,
      groceries: 98,
      transportation: 98,
      healthcare: 96,
      utilities: 88,
      stateTaxRate: 5.8,
      salesTaxRate: 6.0,
      propertyTaxRate: 0.63,
      childcare: 1000
    },
    'phoenix': {
      name: 'Phoenix, AZ',
      overall: 103,
      housing: 115,
      groceries: 100,
      transportation: 102,
      healthcare: 98,
      utilities: 105,
      stateTaxRate: 2.5,
      salesTaxRate: 8.6,
      propertyTaxRate: 0.62,
      childcare: 1100
    },
    'orlando': {
      name: 'Orlando, FL',
      overall: 101,
      housing: 112,
      groceries: 102,
      transportation: 105,
      healthcare: 98,
      utilities: 100,
      stateTaxRate: 0,
      salesTaxRate: 6.5,
      propertyTaxRate: 0.86,
      childcare: 1100
    },
    'tampa': {
      name: 'Tampa, FL',
      overall: 101,
      housing: 112,
      groceries: 101,
      transportation: 102,
      healthcare: 97,
      utilities: 100,
      stateTaxRate: 0,
      salesTaxRate: 7.5,
      propertyTaxRate: 0.86,
      childcare: 1100
    },
    'raleigh': {
      name: 'Raleigh, NC',
      overall: 99,
      housing: 110,
      groceries: 98,
      transportation: 98,
      healthcare: 100,
      utilities: 96,
      stateTaxRate: 4.5,
      salesTaxRate: 7.25,
      propertyTaxRate: 0.78,
      childcare: 1200
    },
    'houston': {
      name: 'Houston, TX',
      overall: 98,
      housing: 102,
      groceries: 96,
      transportation: 102,
      healthcare: 98,
      utilities: 105,
      stateTaxRate: 0,
      salesTaxRate: 8.25,
      propertyTaxRate: 1.68,
      childcare: 1100
    },
    'richmond': {
      name: 'Richmond, VA',
      overall: 98,
      housing: 108,
      groceries: 99,
      transportation: 98,
      healthcare: 98,
      utilities: 98,
      stateTaxRate: 5.75,
      salesTaxRate: 5.3,
      propertyTaxRate: 0.82,
      childcare: 1200
    },
    'new-orleans': {
      name: 'New Orleans, LA',
      overall: 97,
      housing: 105,
      groceries: 101,
      transportation: 100,
      healthcare: 95,
      utilities: 98,
      stateTaxRate: 4.25,
      salesTaxRate: 9.55,
      propertyTaxRate: 0.55,
      childcare: 1000
    },
    'charlotte': {
      name: 'Charlotte, NC',
      overall: 95,
      housing: 100,
      groceries: 97,
      transportation: 96,
      healthcare: 98,
      utilities: 96,
      stateTaxRate: 4.5,
      salesTaxRate: 7.25,
      propertyTaxRate: 0.78,
      childcare: 1100
    },
    'savannah': {
      name: 'Savannah, GA',
      overall: 95,
      housing: 100,
      groceries: 98,
      transportation: 95,
      healthcare: 96,
      utilities: 100,
      stateTaxRate: 5.49,
      salesTaxRate: 7.0,
      propertyTaxRate: 0.92,
      childcare: 1000
    },
    'jacksonville': {
      name: 'Jacksonville, FL',
      overall: 95,
      housing: 100,
      groceries: 99,
      transportation: 100,
      healthcare: 96,
      utilities: 98,
      stateTaxRate: 0,
      salesTaxRate: 7.5,
      propertyTaxRate: 0.86,
      childcare: 1000
    },
    'tucson': {
      name: 'Tucson, AZ',
      overall: 93,
      housing: 95,
      groceries: 98,
      transportation: 98,
      healthcare: 95,
      utilities: 102,
      stateTaxRate: 2.5,
      salesTaxRate: 8.7,
      propertyTaxRate: 0.67,
      childcare: 950
    },
    'milwaukee': {
      name: 'Milwaukee, WI',
      overall: 92,
      housing: 95,
      groceries: 98,
      transportation: 100,
      healthcare: 102,
      utilities: 98,
      stateTaxRate: 5.3,
      salesTaxRate: 5.5,
      propertyTaxRate: 1.76,
      childcare: 1200
    },
    'albuquerque': {
      name: 'Albuquerque, NM',
      overall: 91,
      housing: 92,
      groceries: 97,
      transportation: 96,
      healthcare: 92,
      utilities: 95,
      stateTaxRate: 4.9,
      salesTaxRate: 7.88,
      propertyTaxRate: 0.78,
      childcare: 950
    },
    'columbus': {
      name: 'Columbus, OH',
      overall: 91,
      housing: 90,
      groceries: 98,
      transportation: 98,
      healthcare: 98,
      utilities: 92,
      stateTaxRate: 3.5,
      salesTaxRate: 7.5,
      propertyTaxRate: 1.56,
      childcare: 1100
    },
    'pittsburgh': {
      name: 'Pittsburgh, PA',
      overall: 90,
      housing: 88,
      groceries: 100,
      transportation: 102,
      healthcare: 98,
      utilities: 98,
      stateTaxRate: 3.07,
      salesTaxRate: 7.0,
      propertyTaxRate: 1.36,
      childcare: 1200
    },
    'san-antonio': {
      name: 'San Antonio, TX',
      overall: 90,
      housing: 88,
      groceries: 94,
      transportation: 96,
      healthcare: 95,
      utilities: 102,
      stateTaxRate: 0,
      salesTaxRate: 8.25,
      propertyTaxRate: 1.68,
      childcare: 1000
    },
    'kansas-city': {
      name: 'Kansas City, MO',
      overall: 89,
      housing: 82,
      groceries: 96,
      transportation: 98,
      healthcare: 98,
      utilities: 98,
      stateTaxRate: 4.8,
      salesTaxRate: 9.1,
      propertyTaxRate: 0.99,
      childcare: 1100
    },
    'cincinnati': {
      name: 'Cincinnati, OH',
      overall: 89,
      housing: 82,
      groceries: 97,
      transportation: 96,
      healthcare: 96,
      utilities: 92,
      stateTaxRate: 3.5,
      salesTaxRate: 7.0,
      propertyTaxRate: 1.56,
      childcare: 1100
    },
    'louisville': {
      name: 'Louisville, KY',
      overall: 89,
      housing: 82,
      groceries: 96,
      transportation: 95,
      healthcare: 95,
      utilities: 92,
      stateTaxRate: 4.0,
      salesTaxRate: 6.0,
      propertyTaxRate: 0.83,
      childcare: 1000
    },
    'indianapolis': {
      name: 'Indianapolis, IN',
      overall: 89,
      housing: 82,
      groceries: 96,
      transportation: 98,
      healthcare: 98,
      utilities: 92,
      stateTaxRate: 3.05,
      salesTaxRate: 7.0,
      propertyTaxRate: 0.85,
      childcare: 1100
    },
    'omaha': {
      name: 'Omaha, NE',
      overall: 88,
      housing: 80,
      groceries: 96,
      transportation: 96,
      healthcare: 98,
      utilities: 92,
      stateTaxRate: 5.64,
      salesTaxRate: 7.0,
      propertyTaxRate: 1.61,
      childcare: 1000
    },
    'des-moines': {
      name: 'Des Moines, IA',
      overall: 87,
      housing: 78,
      groceries: 95,
      transportation: 96,
      healthcare: 96,
      utilities: 92,
      stateTaxRate: 5.7,
      salesTaxRate: 7.0,
      propertyTaxRate: 1.52,
      childcare: 1000
    },
    'st-louis': {
      name: 'St. Louis, MO',
      overall: 87,
      housing: 78,
      groceries: 97,
      transportation: 98,
      healthcare: 96,
      utilities: 96,
      stateTaxRate: 4.8,
      salesTaxRate: 9.68,
      propertyTaxRate: 0.99,
      childcare: 1100
    },
    'cleveland': {
      name: 'Cleveland, OH',
      overall: 86,
      housing: 72,
      groceries: 98,
      transportation: 98,
      healthcare: 98,
      utilities: 92,
      stateTaxRate: 3.5,
      salesTaxRate: 8.0,
      propertyTaxRate: 1.56,
      childcare: 1000
    },
    'detroit': {
      name: 'Detroit, MI',
      overall: 85,
      housing: 70,
      groceries: 96,
      transportation: 102,
      healthcare: 98,
      utilities: 98,
      stateTaxRate: 4.25,
      salesTaxRate: 6.0,
      propertyTaxRate: 1.48,
      childcare: 1000
    },
    'oklahoma-city': {
      name: 'Oklahoma City, OK',
      overall: 84,
      housing: 70,
      groceries: 94,
      transportation: 94,
      healthcare: 94,
      utilities: 96,
      stateTaxRate: 4.75,
      salesTaxRate: 8.63,
      propertyTaxRate: 0.87,
      childcare: 900
    },
    'little-rock': {
      name: 'Little Rock, AR',
      overall: 82,
      housing: 66,
      groceries: 94,
      transportation: 92,
      healthcare: 92,
      utilities: 94,
      stateTaxRate: 4.4,
      salesTaxRate: 9.63,
      propertyTaxRate: 0.62,
      childcare: 850
    },
    'memphis': {
      name: 'Memphis, TN',
      overall: 82,
      housing: 65,
      groceries: 94,
      transportation: 92,
      healthcare: 92,
      utilities: 92,
      stateTaxRate: 0,
      salesTaxRate: 9.75,
      propertyTaxRate: 1.35,
      childcare: 850
    }
  };

  // National average monthly costs (for 1 person household)
  const NATIONAL_AVERAGES = {
    housing: 1600,      // rent for 1BR
    groceries: 400,
    transportation: 350,
    healthcare: 450,
    utilities: 200,
    childcare: 1200
  };

  // Household size multipliers
  const HOUSEHOLD_MULTIPLIERS = {
    '1': { housing: 1.0, groceries: 1.0, transportation: 1.0, healthcare: 1.0, utilities: 1.0 },
    '2': { housing: 1.3, groceries: 1.7, transportation: 1.5, healthcare: 2.0, utilities: 1.3 },
    '3': { housing: 1.6, groceries: 2.3, transportation: 1.7, healthcare: 3.0, utilities: 1.5 },
    '4': { housing: 1.8, groceries: 2.8, transportation: 2.0, healthcare: 4.0, utilities: 1.7 }
  };

  // Homeowner vs renter housing cost multiplier
  const HOMEOWNER_MULTIPLIER = 1.4;

  // Federal tax brackets 2026 (single)
  const FEDERAL_BRACKETS_SINGLE = [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 }
  ];

  // Federal tax brackets 2026 (married filing jointly)
  const FEDERAL_BRACKETS_MARRIED = [
    { min: 0, max: 23850, rate: 0.10 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 }
  ];

  // Federal tax brackets 2026 (head of household)
  const FEDERAL_BRACKETS_HOH = [
    { min: 0, max: 17000, rate: 0.10 },
    { min: 17000, max: 64850, rate: 0.12 },
    { min: 64850, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250500, rate: 0.32 },
    { min: 250500, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 }
  ];

  const STANDARD_DEDUCTIONS = {
    'single': 15000,
    'married': 30000,
    'head-of-household': 22500
  };

  // FICA
  const SS_WAGE_BASE = 176100;
  const SS_RATE = 0.062;
  const MEDICARE_RATE = 0.0145;
  const MEDICARE_ADDITIONAL_THRESHOLD = 200000;
  const MEDICARE_ADDITIONAL_RATE = 0.009;

  document.addEventListener('DOMContentLoaded', function() {
    loadFromURL();
    attachEventListeners();
  });

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('from')) setSelect('current-city', params.get('from'));
    if (params.has('to')) setSelect('target-city', params.get('to'));
    if (params.has('salary')) setValue('current-salary', params.get('salary'));
    if (params.has('status')) setSelect('filing-status', params.get('status'));
    if (params.has('housing')) setSelect('housing-status', params.get('housing'));
    if (params.has('size')) setSelect('household-size', params.get('size'));
    if (params.has('children')) setSelect('has-children', params.get('children'));

    if (params.toString()) {
      setTimeout(function() { calculateResults(); }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('from', document.getElementById('current-city').value);
    params.set('to', document.getElementById('target-city').value);
    params.set('salary', getValue('current-salary'));
    params.set('status', document.getElementById('filing-status').value);
    params.set('housing', document.getElementById('housing-status').value);
    params.set('size', document.getElementById('household-size').value);
    params.set('children', document.getElementById('has-children').value);
    var newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({}, '', newURL);
  }

  function setValue(id, val) {
    var el = document.getElementById(id);
    if (el) el.value = val;
  }

  function setSelect(id, val) {
    var el = document.getElementById(id);
    if (el) el.value = val;
  }

  function getValue(id) {
    var el = document.getElementById(id);
    return el ? parseFloat(el.value) || 0 : 0;
  }

  function attachEventListeners() {
    document.getElementById('calculate-btn').addEventListener('click', function() {
      calculateResults();
      var result = document.querySelector('.calculator-result');
      if (result) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
  }

  function shareCalculation() {
    saveToURL();
    var url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function() {
        showToast('Link copied to clipboard!');
      }).catch(function() {
        fallbackCopy(url);
      });
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Link copied to clipboard!');
  }

  function showToast(message) {
    var existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#10b981;color:white;padding:12px 24px;border-radius:8px;font-weight:600;z-index:9999;animation:fadeIn 0.3s ease;';
    document.body.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 3000);
  }

  function formatCurrency(amount) {
    return '$' + Math.round(amount).toLocaleString('en-US');
  }

  function formatPercent(value) {
    return (value >= 0 ? '+' : '') + value.toFixed(1) + '%';
  }

  function calculateFederalTax(income, filingStatus) {
    var deduction = STANDARD_DEDUCTIONS[filingStatus] || 15000;
    var taxableIncome = Math.max(0, income - deduction);
    var brackets;
    if (filingStatus === 'married') {
      brackets = FEDERAL_BRACKETS_MARRIED;
    } else if (filingStatus === 'head-of-household') {
      brackets = FEDERAL_BRACKETS_HOH;
    } else {
      brackets = FEDERAL_BRACKETS_SINGLE;
    }

    var tax = 0;
    for (var i = 0; i < brackets.length; i++) {
      var bracket = brackets[i];
      if (taxableIncome <= bracket.min) break;
      var taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      tax += taxableInBracket * bracket.rate;
    }
    return tax;
  }

  function calculateFICA(income) {
    var ssTax = Math.min(income, SS_WAGE_BASE) * SS_RATE;
    var medicareTax = income * MEDICARE_RATE;
    if (income > MEDICARE_ADDITIONAL_THRESHOLD) {
      medicareTax += (income - MEDICARE_ADDITIONAL_THRESHOLD) * MEDICARE_ADDITIONAL_RATE;
    }
    return ssTax + medicareTax;
  }

  function calculateStateTax(income, rate) {
    // Simplified: flat rate applied to income after standard deduction equivalent
    var taxableIncome = Math.max(0, income * 0.9); // rough approximation of state deductions
    return taxableIncome * (rate / 100);
  }

  function getMonthlyCost(category, cityData, householdSize, isHomeowner) {
    var baseAmount = NATIONAL_AVERAGES[category];
    var multiplier = HOUSEHOLD_MULTIPLIERS[householdSize][category] || 1;
    var cityIndex = cityData[category] / 100;

    var monthlyCost = baseAmount * multiplier * cityIndex;

    if (category === 'housing' && isHomeowner) {
      monthlyCost *= HOMEOWNER_MULTIPLIER;
    }

    return monthlyCost;
  }

  function calculateResults() {
    var currentCityKey = document.getElementById('current-city').value;
    var targetCityKey = document.getElementById('target-city').value;
    var salary = getValue('current-salary');
    var filingStatus = document.getElementById('filing-status').value;
    var housingStatus = document.getElementById('housing-status').value;
    var householdSize = document.getElementById('household-size').value;
    var hasChildren = document.getElementById('has-children').value === 'yes';

    // Validation
    if (!currentCityKey || !targetCityKey) {
      alert('Please select both a current city and a target city.');
      return;
    }
    if (currentCityKey === targetCityKey) {
      alert('Please select two different cities to compare.');
      return;
    }
    if (salary <= 0) {
      alert('Please enter a valid annual salary.');
      return;
    }

    var currentCity = CITY_DATA[currentCityKey];
    var targetCity = CITY_DATA[targetCityKey];
    var isHomeowner = housingStatus === 'homeowner';

    // Calculate equivalent salary
    var overallRatio = targetCity.overall / currentCity.overall;
    var equivalentSalary = salary * overallRatio;
    var salaryDifference = equivalentSalary - salary;
    var percentDifference = ((overallRatio - 1) * 100);

    // Calculate monthly costs by category for both cities
    var categories = ['housing', 'groceries', 'transportation', 'healthcare', 'utilities'];
    var currentMonthlyCosts = {};
    var targetMonthlyCosts = {};
    var currentTotal = 0;
    var targetTotal = 0;

    for (var i = 0; i < categories.length; i++) {
      var cat = categories[i];
      currentMonthlyCosts[cat] = getMonthlyCost(cat, currentCity, householdSize, isHomeowner);
      targetMonthlyCosts[cat] = getMonthlyCost(cat, targetCity, householdSize, isHomeowner);
      currentTotal += currentMonthlyCosts[cat];
      targetTotal += targetMonthlyCosts[cat];
    }

    // Add childcare if applicable
    if (hasChildren) {
      currentMonthlyCosts.childcare = currentCity.childcare;
      targetMonthlyCosts.childcare = targetCity.childcare;
      currentTotal += currentCity.childcare;
      targetTotal += targetCity.childcare;
    }

    // Tax calculations for current city
    var currentFederalTax = calculateFederalTax(salary, filingStatus);
    var currentFICA = calculateFICA(salary);
    var currentStateTax = calculateStateTax(salary, currentCity.stateTaxRate);
    var currentTotalTax = currentFederalTax + currentFICA + currentStateTax;
    var currentTakeHome = salary - currentTotalTax;

    // Tax calculations for target city (using equivalent salary)
    var targetFederalTax = calculateFederalTax(equivalentSalary, filingStatus);
    var targetFICA = calculateFICA(equivalentSalary);
    var targetStateTax = calculateStateTax(equivalentSalary, targetCity.stateTaxRate);
    var targetTotalTax = targetFederalTax + targetFICA + targetStateTax;
    var targetTakeHome = equivalentSalary - targetTotalTax;

    // Tax calculations for target city using SAME salary (for purchasing power)
    var targetFederalTaxSame = calculateFederalTax(salary, filingStatus);
    var targetFICASame = calculateFICA(salary);
    var targetStateTaxSame = calculateStateTax(salary, targetCity.stateTaxRate);
    var targetTotalTaxSame = targetFederalTaxSame + targetFICASame + targetStateTaxSame;
    var targetTakeHomeSame = salary - targetTotalTaxSame;

    // Purchasing power: what your current salary buys in target city
    var purchasingPowerIndex = (currentCity.overall / targetCity.overall) * 100;

    // Save to URL
    saveToURL();

    // Render results
    renderResults({
      currentCity: currentCity,
      targetCity: targetCity,
      salary: salary,
      equivalentSalary: equivalentSalary,
      salaryDifference: salaryDifference,
      percentDifference: percentDifference,
      currentMonthlyCosts: currentMonthlyCosts,
      targetMonthlyCosts: targetMonthlyCosts,
      currentTotal: currentTotal,
      targetTotal: targetTotal,
      hasChildren: hasChildren,
      categories: hasChildren ? categories.concat(['childcare']) : categories,
      currentFederalTax: currentFederalTax,
      currentFICA: currentFICA,
      currentStateTax: currentStateTax,
      currentTotalTax: currentTotalTax,
      currentTakeHome: currentTakeHome,
      targetFederalTax: targetFederalTax,
      targetFICA: targetFICA,
      targetStateTax: targetStateTax,
      targetTotalTax: targetTotalTax,
      targetTakeHome: targetTakeHome,
      targetTakeHomeSame: targetTakeHomeSame,
      purchasingPowerIndex: purchasingPowerIndex,
      currentCityStateTaxRate: currentCity.stateTaxRate,
      targetCityStateTaxRate: targetCity.stateTaxRate,
      currentCitySalesTaxRate: currentCity.salesTaxRate,
      targetCitySalesTaxRate: targetCity.salesTaxRate,
      currentCityPropertyTaxRate: currentCity.propertyTaxRate,
      targetCityPropertyTaxRate: targetCity.propertyTaxRate
    });
  }

  function renderResults(data) {
    var resultDiv = document.getElementById('cost-of-living-result');
    resultDiv.classList.remove('hidden');

    var isHigher = data.percentDifference > 0;
    var badgeClass = isHigher ? 'higher' : 'lower';
    var directionText = isHigher ? 'more expensive' : 'less expensive';

    // Category labels
    var categoryLabels = {
      housing: 'Housing',
      groceries: 'Groceries',
      transportation: 'Transportation',
      healthcare: 'Healthcare',
      utilities: 'Utilities',
      childcare: 'Childcare'
    };

    // Build category comparison bars
    var categoryBarsHTML = '';
    for (var i = 0; i < data.categories.length; i++) {
      var cat = data.categories[i];
      var currentVal = data.currentMonthlyCosts[cat];
      var targetVal = data.targetMonthlyCosts[cat];
      var maxVal = Math.max(currentVal, targetVal);
      var currentWidth = maxVal > 0 ? (currentVal / maxVal) * 50 : 0;
      var targetWidth = maxVal > 0 ? (targetVal / maxVal) * 50 : 0;
      var catDiff = targetVal - currentVal;
      var catDiffText = catDiff >= 0 ? '+' + formatCurrency(catDiff) : '-' + formatCurrency(Math.abs(catDiff));

      categoryBarsHTML += '<div class="category-bar">' +
        '<div class="category-bar-header">' +
          '<span>' + categoryLabels[cat] + '</span>' +
          '<span>' + catDiffText + '/mo</span>' +
        '</div>' +
        '<div class="category-bar-visual">' +
          '<div class="bar-current" style="width:' + currentWidth + '%" title="' + data.currentCity.name + ': ' + formatCurrency(currentVal) + '/mo"></div>' +
          '<div class="bar-target" style="width:' + targetWidth + '%" title="' + data.targetCity.name + ': ' + formatCurrency(targetVal) + '/mo"></div>' +
        '</div>' +
        '<div class="category-bar-legend">' +
          '<span>' + data.currentCity.name + ': ' + formatCurrency(currentVal) + '</span>' +
          '<span>' + data.targetCity.name + ': ' + formatCurrency(targetVal) + '</span>' +
        '</div>' +
      '</div>';
    }

    // Build monthly budget table
    var budgetRowsHTML = '';
    for (var j = 0; j < data.categories.length; j++) {
      var c = data.categories[j];
      var diff = data.targetMonthlyCosts[c] - data.currentMonthlyCosts[c];
      var diffClass = diff > 0 ? 'difference-negative' : 'difference-positive';
      var diffText = diff >= 0 ? '+' + formatCurrency(diff) : '-' + formatCurrency(Math.abs(diff));
      budgetRowsHTML += '<tr>' +
        '<td>' + categoryLabels[c] + '</td>' +
        '<td>' + formatCurrency(data.currentMonthlyCosts[c]) + '</td>' +
        '<td>' + formatCurrency(data.targetMonthlyCosts[c]) + '</td>' +
        '<td class="' + diffClass + '">' + diffText + '</td>' +
      '</tr>';
    }

    var totalDiff = data.targetTotal - data.currentTotal;
    var totalDiffClass = totalDiff > 0 ? 'difference-negative' : 'difference-positive';
    var totalDiffText = totalDiff >= 0 ? '+' + formatCurrency(totalDiff) : '-' + formatCurrency(Math.abs(totalDiff));

    // Quality of life notes
    var qualityNotes = getQualityNotes(data);

    var html = '' +
      '<div class="equivalent-salary">' +
        '<div class="context">To maintain your standard of living...</div>' +
        '<div class="big-number">You\'d need ' + formatCurrency(data.equivalentSalary) + ' in ' + data.targetCity.name + '</div>' +
        '<div class="context">to match ' + formatCurrency(data.salary) + ' in ' + data.currentCity.name + '</div>' +
        '<div class="percentage-badge ' + badgeClass + '">' +
          Math.abs(data.percentDifference).toFixed(1) + '% ' + directionText +
        '</div>' +
      '</div>' +

      '<div class="category-comparison">' +
        '<h3>Category-by-Category Comparison</h3>' +
        '<div class="bar-legend" style="display:flex;gap:1.5rem;margin-bottom:1rem;font-size:0.9rem;">' +
          '<span><span style="display:inline-block;width:12px;height:12px;background:#3b82f6;border-radius:2px;margin-right:4px;"></span>' + data.currentCity.name + '</span>' +
          '<span><span style="display:inline-block;width:12px;height:12px;background:#10b981;border-radius:2px;margin-right:4px;"></span>' + data.targetCity.name + '</span>' +
        '</div>' +
        categoryBarsHTML +
      '</div>' +

      '<div class="budget-comparison">' +
        '<h3>Monthly Budget Comparison</h3>' +
        '<table class="budget-table">' +
          '<thead><tr>' +
            '<th>Category</th>' +
            '<th>' + data.currentCity.name + '</th>' +
            '<th>' + data.targetCity.name + '</th>' +
            '<th>Difference</th>' +
          '</tr></thead>' +
          '<tbody>' +
            budgetRowsHTML +
            '<tr class="total-row">' +
              '<td>Total Monthly Costs</td>' +
              '<td>' + formatCurrency(data.currentTotal) + '</td>' +
              '<td>' + formatCurrency(data.targetTotal) + '</td>' +
              '<td class="' + totalDiffClass + '">' + totalDiffText + '</td>' +
            '</tr>' +
          '</tbody>' +
        '</table>' +
      '</div>' +

      '<div class="tax-comparison">' +
        '<h3>Tax Impact Comparison</h3>' +
        '<div class="tax-grid">' +
          '<div class="tax-card">' +
            '<h4>' + data.currentCity.name + '</h4>' +
            '<div class="tax-item"><span class="tax-item-label">State Income Tax Rate</span><span>' + data.currentCityStateTaxRate.toFixed(2) + '%</span></div>' +
            '<div class="tax-item"><span class="tax-item-label">Sales Tax Rate</span><span>' + data.currentCitySalesTaxRate.toFixed(2) + '%</span></div>' +
            '<div class="tax-item"><span class="tax-item-label">Property Tax Rate</span><span>' + data.currentCityPropertyTaxRate.toFixed(2) + '%</span></div>' +
            '<div class="tax-item"><span class="tax-item-label">Federal Tax</span><span>' + formatCurrency(data.currentFederalTax) + '</span></div>' +
            '<div class="tax-item"><span class="tax-item-label">FICA (SS + Medicare)</span><span>' + formatCurrency(data.currentFICA) + '</span></div>' +
            '<div class="tax-item"><span class="tax-item-label">State Tax</span><span>' + formatCurrency(data.currentStateTax) + '</span></div>' +
            '<div class="tax-item" style="font-weight:bold;border-top:1px solid #e5e7eb;padding-top:0.5rem;margin-top:0.25rem;"><span>Total Tax Burden</span><span>' + formatCurrency(data.currentTotalTax) + '</span></div>' +
            '<div class="tax-item" style="font-weight:bold;color:#16a34a;"><span>Net Take-Home</span><span>' + formatCurrency(data.currentTakeHome) + '</span></div>' +
          '</div>' +
          '<div class="tax-card">' +
            '<h4>' + data.targetCity.name + ' (at equivalent salary)</h4>' +
            '<div class="tax-item"><span class="tax-item-label">State Income Tax Rate</span><span>' + data.targetCityStateTaxRate.toFixed(2) + '%</span></div>' +
            '<div class="tax-item"><span class="tax-item-label">Sales Tax Rate</span><span>' + data.targetCitySalesTaxRate.toFixed(2) + '%</span></div>' +
            '<div class="tax-item"><span class="tax-item-label">Property Tax Rate</span><span>' + data.targetCityPropertyTaxRate.toFixed(2) + '%</span></div>' +
            '<div class="tax-item"><span class="tax-item-label">Federal Tax</span><span>' + formatCurrency(data.targetFederalTax) + '</span></div>' +
            '<div class="tax-item"><span class="tax-item-label">FICA (SS + Medicare)</span><span>' + formatCurrency(data.targetFICA) + '</span></div>' +
            '<div class="tax-item"><span class="tax-item-label">State Tax</span><span>' + formatCurrency(data.targetStateTax) + '</span></div>' +
            '<div class="tax-item" style="font-weight:bold;border-top:1px solid #e5e7eb;padding-top:0.5rem;margin-top:0.25rem;"><span>Total Tax Burden</span><span>' + formatCurrency(data.targetTotalTax) + '</span></div>' +
            '<div class="tax-item" style="font-weight:bold;color:#16a34a;"><span>Net Take-Home</span><span>' + formatCurrency(data.targetTakeHome) + '</span></div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="purchasing-power">' +
        '<h3>Purchasing Power Analysis</h3>' +
        '<p style="margin-bottom:1rem;color:var(--color-text-secondary);">If you keep your current salary of ' + formatCurrency(data.salary) + ' and move to ' + data.targetCity.name + ':</p>' +
        '<div class="power-comparison">' +
          '<div class="power-card">' +
            '<div class="city-name">' + data.currentCity.name + '</div>' +
            '<div class="power-value">100%</div>' +
            '<div class="power-label">Baseline purchasing power</div>' +
          '</div>' +
          '<div class="power-card">' +
            '<div class="city-name">' + data.targetCity.name + '</div>' +
            '<div class="power-value">' + data.purchasingPowerIndex.toFixed(0) + '%</div>' +
            '<div class="power-label">' + (data.purchasingPowerIndex >= 100 ? 'More' : 'Less') + ' purchasing power</div>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top:1.5rem;padding:1rem;background:var(--color-surface-neutral);border-radius:8px;">' +
          '<p style="margin:0;"><strong>Net take-home with same salary in ' + data.targetCity.name + ':</strong> ' + formatCurrency(data.targetTakeHomeSame) + '/year (' + formatCurrency(data.targetTakeHomeSame / 12) + '/month)</p>' +
          '<p style="margin:0.5rem 0 0;font-size:0.9rem;color:var(--color-text-secondary);">' +
            (data.targetCityStateTaxRate < data.currentCityStateTaxRate
              ? 'You\'d save ' + formatCurrency(data.currentStateTax - calculateStateTax(data.salary, data.targetCityStateTaxRate)) + '/year in state income tax alone.'
              : data.targetCityStateTaxRate > data.currentCityStateTaxRate
                ? 'You\'d pay ' + formatCurrency(calculateStateTax(data.salary, data.targetCityStateTaxRate) - data.currentStateTax) + '/year more in state income tax.'
                : 'State income tax would remain the same.') +
          '</p>' +
        '</div>' +
      '</div>' +

      '<div class="quality-notes">' +
        '<h3>Things to Consider</h3>' +
        '<ul>' + qualityNotes + '</ul>' +
      '</div>';

    resultDiv.innerHTML = html;
  }

  function getQualityNotes(data) {
    var notes = [];
    var diff = data.percentDifference;

    if (diff > 30) {
      notes.push('<li><strong>Significant cost increase:</strong> ' + data.targetCity.name + ' is substantially more expensive. Make sure the salary adjustment accounts for the higher cost of living.</li>');
    } else if (diff > 10) {
      notes.push('<li><strong>Moderate cost increase:</strong> ' + data.targetCity.name + ' is somewhat more expensive. Budget adjustments will be needed for daily expenses.</li>');
    } else if (diff < -30) {
      notes.push('<li><strong>Major cost savings:</strong> ' + data.targetCity.name + ' is significantly cheaper. Your current salary would go much further here.</li>');
    } else if (diff < -10) {
      notes.push('<li><strong>Moderate cost savings:</strong> ' + data.targetCity.name + ' is more affordable, giving you extra financial flexibility.</li>');
    } else {
      notes.push('<li><strong>Similar cost of living:</strong> Both cities have comparable overall costs, though individual categories may differ.</li>');
    }

    // Tax notes
    if (data.targetCityStateTaxRate === 0 && data.currentCityStateTaxRate > 0) {
      notes.push('<li><strong>No state income tax:</strong> ' + data.targetCity.name + ' has no state income tax, which provides significant savings on your take-home pay.</li>');
    } else if (data.currentCityStateTaxRate === 0 && data.targetCityStateTaxRate > 0) {
      notes.push('<li><strong>State income tax impact:</strong> ' + data.targetCity.name + ' has a ' + data.targetCityStateTaxRate.toFixed(1) + '% state income tax that will reduce your take-home pay.</li>');
    }

    // Housing notes
    var housingDiff = (data.targetMonthlyCosts.housing - data.currentMonthlyCosts.housing) / data.currentMonthlyCosts.housing * 100;
    if (Math.abs(housingDiff) > 30) {
      if (housingDiff > 0) {
        notes.push('<li><strong>Housing costs:</strong> Housing in ' + data.targetCity.name + ' is ' + Math.abs(housingDiff).toFixed(0) + '% more expensive. Consider different neighborhoods or housing types to reduce costs.</li>');
      } else {
        notes.push('<li><strong>Housing savings:</strong> Housing in ' + data.targetCity.name + ' is ' + Math.abs(housingDiff).toFixed(0) + '% cheaper, which is often the biggest factor in cost-of-living differences.</li>');
      }
    }

    // Property tax note for homeowners
    if (data.targetCityPropertyTaxRate > data.currentCityPropertyTaxRate * 1.5) {
      notes.push('<li><strong>Higher property taxes:</strong> Property tax rates in ' + data.targetCity.name + ' (' + data.targetCityPropertyTaxRate.toFixed(2) + '%) are significantly higher than ' + data.currentCity.name + ' (' + data.currentCityPropertyTaxRate.toFixed(2) + '%).</li>');
    }

    // Remote work note
    if (diff < -15) {
      notes.push('<li><strong>Remote work opportunity:</strong> If you can keep your ' + data.currentCity.name + ' salary while living in ' + data.targetCity.name + ', your purchasing power would increase by ' + (data.purchasingPowerIndex - 100).toFixed(0) + '%.</li>');
    }

    notes.push('<li><strong>Remember:</strong> These are estimates based on average costs. Your actual expenses will depend on your specific lifestyle, neighborhood choices, and spending habits.</li>');

    return notes.join('');
  }
})();
