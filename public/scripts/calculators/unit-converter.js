(function() {
  'use strict';

  const UNITS = {
    length: {
      name: 'Length',
      units: {
        mm: { name: 'Millimeters', toBase: 0.001 },
        cm: { name: 'Centimeters', toBase: 0.01 },
        m: { name: 'Meters', toBase: 1 },
        km: { name: 'Kilometers', toBase: 1000 },
        in: { name: 'Inches', toBase: 0.0254 },
        ft: { name: 'Feet', toBase: 0.3048 },
        yd: { name: 'Yards', toBase: 0.9144 },
        mi: { name: 'Miles', toBase: 1609.344 },
        nmi: { name: 'Nautical Miles', toBase: 1852 }
      },
      baseUnit: 'm'
    },
    weight: {
      name: 'Weight / Mass',
      units: {
        mg: { name: 'Milligrams', toBase: 0.000001 },
        g: { name: 'Grams', toBase: 0.001 },
        kg: { name: 'Kilograms', toBase: 1 },
        tonne: { name: 'Metric Tons', toBase: 1000 },
        oz: { name: 'Ounces', toBase: 0.0283495 },
        lb: { name: 'Pounds', toBase: 0.453592 },
        st: { name: 'Stone', toBase: 6.35029 },
        ton: { name: 'US Tons', toBase: 907.185 }
      },
      baseUnit: 'kg'
    },
    temperature: {
      name: 'Temperature',
      units: {
        c: { name: 'Celsius' },
        f: { name: 'Fahrenheit' },
        k: { name: 'Kelvin' }
      },
      special: true
    },
    volume: {
      name: 'Volume',
      units: {
        ml: { name: 'Milliliters', toBase: 0.001 },
        l: { name: 'Liters', toBase: 1 },
        gal: { name: 'Gallons (US)', toBase: 3.78541 },
        qt: { name: 'Quarts', toBase: 0.946353 },
        pt: { name: 'Pints', toBase: 0.473176 },
        cup: { name: 'Cups', toBase: 0.236588 },
        floz: { name: 'Fluid Ounces', toBase: 0.0295735 },
        tbsp: { name: 'Tablespoons', toBase: 0.0147868 },
        tsp: { name: 'Teaspoons', toBase: 0.00492892 }
      },
      baseUnit: 'l'
    },
    area: {
      name: 'Area',
      units: {
        sqmm: { name: 'Square Millimeters', toBase: 0.000001 },
        sqcm: { name: 'Square Centimeters', toBase: 0.0001 },
        sqm: { name: 'Square Meters', toBase: 1 },
        sqkm: { name: 'Square Kilometers', toBase: 1000000 },
        sqin: { name: 'Square Inches', toBase: 0.00064516 },
        sqft: { name: 'Square Feet', toBase: 0.092903 },
        sqyd: { name: 'Square Yards', toBase: 0.836127 },
        acre: { name: 'Acres', toBase: 4046.86 },
        ha: { name: 'Hectares', toBase: 10000 },
        sqmi: { name: 'Square Miles', toBase: 2589988 }
      },
      baseUnit: 'sqm'
    },
    speed: {
      name: 'Speed',
      units: {
        ms: { name: 'Meters/second', toBase: 1 },
        kmh: { name: 'Kilometers/hour', toBase: 0.277778 },
        mph: { name: 'Miles/hour', toBase: 0.44704 },
        knot: { name: 'Knots', toBase: 0.514444 },
        fts: { name: 'Feet/second', toBase: 0.3048 }
      },
      baseUnit: 'ms'
    },
    digital: {
      name: 'Digital Storage',
      units: {
        bit: { name: 'Bits', toBase: 0.000000125 },
        byte: { name: 'Bytes', toBase: 0.000001 },
        kb: { name: 'Kilobytes', toBase: 0.001 },
        mb: { name: 'Megabytes', toBase: 1 },
        gb: { name: 'Gigabytes', toBase: 1000 },
        tb: { name: 'Terabytes', toBase: 1000000 },
        pb: { name: 'Petabytes', toBase: 1000000000 }
      },
      baseUnit: 'mb'
    },
    time: {
      name: 'Time',
      units: {
        sec: { name: 'Seconds', toBase: 1 },
        min: { name: 'Minutes', toBase: 60 },
        hr: { name: 'Hours', toBase: 3600 },
        day: { name: 'Days', toBase: 86400 },
        wk: { name: 'Weeks', toBase: 604800 },
        mo: { name: 'Months (avg)', toBase: 2629746 },
        yr: { name: 'Years', toBase: 31556952 }
      },
      baseUnit: 'sec'
    }
  };

  let currentCategory = 'length';

  document.addEventListener('DOMContentLoaded', function() {
    populateDropdowns('length');
    loadFromURL();
    attachEventListeners();
  });

  function populateDropdowns(category) {
    const fromSelect = document.getElementById('from-unit');
    const toSelect = document.getElementById('to-unit');
    const units = UNITS[category].units;

    const fromVal = fromSelect.value;
    const toVal = toSelect.value;

    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    const keys = Object.keys(units);
    keys.forEach((key, i) => {
      fromSelect.add(new Option(units[key].name, key));
      toSelect.add(new Option(units[key].name, key));
    });

    if (keys.includes(fromVal)) fromSelect.value = fromVal;
    else fromSelect.selectedIndex = 0;

    if (keys.includes(toVal)) toSelect.value = toVal;
    else toSelect.selectedIndex = Math.min(1, keys.length - 1);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('cat')) {
      currentCategory = params.get('cat');
      switchCategory(currentCategory);
    }
    if (params.has('val')) setValue('convert-value', params.get('val'));
    if (params.has('from')) {
      const el = document.getElementById('from-unit');
      if (el) el.value = params.get('from');
    }
    if (params.has('to')) {
      const el = document.getElementById('to-unit');
      if (el) el.value = params.get('to');
    }

    if (params.toString()) {
      setTimeout(() => calculateResults(), 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('cat', currentCategory);
    params.set('val', document.getElementById('convert-value').value);
    params.set('from', document.getElementById('from-unit').value);
    params.set('to', document.getElementById('to-unit').value);

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    document.querySelectorAll('#category-toggle .unit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        switchCategory(this.dataset.category);
        calculateResults();
        saveToURL();
      });
    });

    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        calculateResults();
        document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    const valueInput = document.getElementById('convert-value');
    if (valueInput) {
      valueInput.addEventListener('input', debounce(() => { calculateResults(); saveToURL(); }, 200));
      valueInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); calculateResults(); }
      });
    }

    document.getElementById('from-unit').addEventListener('change', () => { calculateResults(); saveToURL(); });
    document.getElementById('to-unit').addEventListener('change', () => { calculateResults(); saveToURL(); });

    const swapBtn = document.getElementById('swap-units');
    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        const from = document.getElementById('from-unit');
        const to = document.getElementById('to-unit');
        const temp = from.value;
        from.value = to.value;
        to.value = temp;
        calculateResults();
        saveToURL();
      });
    }

    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) shareBtn.addEventListener('click', shareCalculation);
  }

  function switchCategory(category) {
    currentCategory = category;
    document.querySelectorAll('#category-toggle .unit-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });
    populateDropdowns(category);
  }

  function convert(value, fromUnit, toUnit, category) {
    if (category === 'temperature') {
      return convertTemperature(value, fromUnit, toUnit);
    }
    const units = UNITS[category].units;
    const baseValue = value * units[fromUnit].toBase;
    return baseValue / units[toUnit].toBase;
  }

  function convertTemperature(value, from, to) {
    if (from === to) return value;
    // Convert to Celsius first
    let celsius;
    if (from === 'c') celsius = value;
    else if (from === 'f') celsius = (value - 32) * 5 / 9;
    else celsius = value - 273.15;

    // Convert from Celsius to target
    if (to === 'c') return celsius;
    if (to === 'f') return (celsius * 9 / 5) + 32;
    return celsius + 273.15;
  }

  function calculateResults() {
    const value = parseFloat(document.getElementById('convert-value').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;

    if (isNaN(value)) return;

    const result = convert(value, fromUnit, toUnit, currentCategory);
    const units = UNITS[currentCategory].units;

    // Get all conversions
    const allConversions = Object.entries(units).map(([key, unit]) => ({
      key,
      name: unit.name,
      value: convert(value, fromUnit, key, currentCategory),
      isTarget: key === toUnit
    }));

    displayResults(value, fromUnit, toUnit, result, allConversions, units);
  }

  function displayResults(value, fromUnit, toUnit, result, allConversions, units) {
    const resultDiv = document.getElementById('unit-result');
    if (!resultDiv) return;

    const formattedResult = formatValue(result);
    const fromName = units[fromUnit].name;
    const toName = units[toUnit].name;

    resultDiv.innerHTML = `
      <h3>📏 Conversion Result</h3>

      <div class="age-hero">
        <div class="age-big">${formatValue(value)} <span class="age-unit">${fromName}</span></div>
        <div style="font-size: 1.5rem; margin: 0.5rem 0; color: var(--color-gray-dark);">=</div>
        <div class="age-big">${formattedResult} <span class="age-unit">${toName}</span></div>
      </div>

      <div class="all-conversions">
        <h4>📋 All ${UNITS[currentCategory].name} Conversions</h4>
        <div class="breakdown-table-container">
          <table class="profit-table">
            <thead><tr><th>Unit</th><th>Value</th></tr></thead>
            <tbody>
              ${allConversions.map(c => `
                <tr class="${c.isTarget ? 'current-row' : ''}">
                  <td>${c.name}</td>
                  <td><strong>${formatValue(c.value)}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function formatValue(num) {
    if (num === 0) return '0';
    if (Math.abs(num) >= 1000000) return num.toExponential(4);
    if (Math.abs(num) < 0.001) return num.toExponential(4);
    if (Number.isInteger(num)) return num.toLocaleString('en-US');
    const decimals = Math.abs(num) < 1 ? 6 : Math.abs(num) < 100 ? 4 : 2;
    return parseFloat(num.toFixed(decimals)).toLocaleString('en-US', { maximumFractionDigits: decimals });
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  function debounce(fn, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Unit Converter', url }).catch(() => copyToClipboard(url));
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
    }).catch(() => {});
  }

})();
