// Business Days Calculator - Calculate workdays between dates
document.addEventListener('DOMContentLoaded', function() {
    // Holiday definitions will be loaded from external JSON
    let holidays = {};
    let customHolidays = [];
    let debounceTimer = null;
    let currentHolidays = [];
    let holidaysLoaded = false;
    
    // Load holidays from JSON file
    async function loadHolidays() {
        try {
            const response = await fetch('/data/holidays.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            holidays = data;
            holidaysLoaded = true;
            
            // Initialize the calculator after holidays are loaded
            init();
        } catch (error) {
            console.error('Error loading holidays:', error);
        }

    }
    
    // Parse date string as local date without timezone conversion
    function parseLocalDate(dateStr) {
        if (!dateStr) return null;
        // Parse YYYY-MM-DD format
        const parts = dateStr.split('-');
        if (parts.length !== 3) return null;
        // Month is 0-indexed in JavaScript Date, set time to noon to avoid timezone issues
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 12, 0, 0);
    }
    
    // Get DOM elements
    const calcTypeRadios = document.getElementsByName('calc-type');
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    const baseDate = document.getElementById('base-date');
    const businessDaysCount = document.getElementById('business-days-count');
    const countrySelect = document.getElementById('country-select');
    const excludeHolidays = document.getElementById('exclude-holidays');
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const shareBtn = document.getElementById('share-calculation');
    const resultDiv = document.getElementById('business-days-result');
    const betweenDatesRow = document.getElementById('between-dates-row');
    const addSubtractRow = document.getElementById('add-subtract-row');
    
    // Load holidays on page load
    loadHolidays();
    
    function init() {
        if (!holidaysLoaded) {
            console.warn('Holidays not yet loaded, waiting...');
            return;
        }
        
        loadFromURL();
        setupEventListeners();
        setDefaultDates();
        updateHolidayToggles();
        
        // Initial calculation if data exists
        if (hasValidInput()) {
            calculateResults();
        }
    }
    
    function setupEventListeners() {
        // Calculation type change
        calcTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                updateFormDisplay();
                saveToURL();
            });
        });
        
        // Date inputs
        if (startDate) {
            startDate.addEventListener('change', () => {
                updateHolidayToggles(); // Update holiday dates when start date changes
                saveToURL();
                if (hasValidInput()) calculateResults();
            });
        }
        
        if (endDate) {
            endDate.addEventListener('change', () => {
                saveToURL();
                if (hasValidInput()) calculateResults();
            });
        }
        
        if (baseDate) {
            baseDate.addEventListener('change', () => {
                updateHolidayToggles(); // Update holiday dates when base date changes
                saveToURL();
                if (hasValidInput()) calculateResults();
            });
        }
        
        // Business days count
        if (businessDaysCount) {
            businessDaysCount.addEventListener('input', () => {
                saveToURL();
                if (hasValidInput()) calculateResults();
            });
        }
        
        // Country and holiday settings
        if (countrySelect) {
            countrySelect.addEventListener('change', () => {
                updateHolidayToggles();
                saveToURL();
                if (hasValidInput()) calculateResults();
            });
        }
        
        if (excludeHolidays) {
            excludeHolidays.addEventListener('change', () => {
                updateHolidayToggles();
                saveToURL();
                if (hasValidInput()) calculateResults();
            });
        }
        
        // Action buttons
        if (calculateBtn) calculateBtn.addEventListener('click', () => {
          calculateResults();
          document.querySelector(".calculator-result")?.scrollIntoView({behavior: 'smooth', block: 'start'});
        });
        if (clearBtn) clearBtn.addEventListener('click', clearAll);
        if (shareBtn) shareBtn.addEventListener('click', shareResults);
    }
    
    function setDefaultDates() {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        if (startDate && !startDate.value) {
            startDate.value = formatDateForInput(today);
        }
        if (endDate && !endDate.value) {
            endDate.value = formatDateForInput(nextMonth);
        }
        if (baseDate && !baseDate.value) {
            baseDate.value = formatDateForInput(today);
        }
    }
    
    function updateFormDisplay() {
        const calcType = getSelectedCalcType();
        
        if (betweenDatesRow && addSubtractRow) {
            if (calcType === 'between') {
                betweenDatesRow.style.display = 'grid';
                addSubtractRow.style.display = 'none';
            } else {
                betweenDatesRow.style.display = 'none';
                addSubtractRow.style.display = 'grid';
            }
        }
    }
    
    function updateHolidayToggles() {
        let container = document.getElementById('holiday-toggles-container');
        
        // Create container if it doesn't exist
        if (!container) {
            const holidaySection = document.querySelector('#business-days-calculator-form > .form-section:nth-of-type(3)');
            if (!holidaySection) return;
            
            container = document.createElement('div');
            container.id = 'holiday-toggles-container';
            container.className = 'holiday-toggles-container';
            holidaySection.appendChild(container);
        }
        
        const country = countrySelect ? countrySelect.value : 'US';
        const shouldExclude = excludeHolidays ? excludeHolidays.checked : true;
        
        // Hide container if holidays are not excluded
        if (!shouldExclude) {
            container.style.display = 'none';
            return;
        }
        
        // Get the year from the relevant date input
        let year = new Date().getFullYear();
        const calcType = getSelectedCalcType();
        if (calcType === 'between' && startDate && startDate.value) {
            const date = parseLocalDate(startDate.value);
            if (date) year = date.getFullYear();
        } else if (baseDate && baseDate.value) {
            const date = parseLocalDate(baseDate.value);
            if (date) year = date.getFullYear();
        }
        
        // Sort custom holidays by date
        sortCustomHolidaysByDate();
        
        // Show container
        container.style.display = 'block';
        
        // Build the HTML based on country selection
        if (country === 'custom') {
            // Custom holidays only mode
            container.innerHTML = `
                <h4 style="margin-top: 1rem; margin-bottom: 0.75rem; color: #2C5F8D;">Custom Holidays</h4>
                
                <div class="add-holiday-section" style="margin-bottom: 1rem; padding: 1rem; background: white; border-radius: 8px; border: 2px dashed #93c5fd;">
                    <h5 style="margin: 0 0 0.75rem 0; color: #2C5F8D;">Add Custom Holiday</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 0.5rem; align-items: end;">
                        <div>
                            <label style="display: block; font-size: 0.9rem; margin-bottom: 0.25rem; color: #6b7280;">Holiday Name</label>
                            <input type="text" 
                                   id="custom-holiday-name" 
                                   placeholder="e.g., Company Holiday"
                                   style="width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.9rem; margin-bottom: 0.25rem; color: #6b7280;">Date</label>
                            <input type="date" 
                                   id="custom-holiday-date"
                                   style="width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px;">
                        </div>
                        <button type="button" 
                                onclick="addCustomHoliday()"
                                style="padding: 0.5rem 1rem; background: #FF6B35; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
                            Add Holiday
                        </button>
                    </div>
                </div>
                
                <div class="holiday-toggles" style="display: grid; gap: 0.5rem;">
                    ${customHolidays.map((holiday, index) => `
                        <div class="holiday-toggle custom-holiday" style="display: flex; align-items: center; padding: 0.5rem; background: white; border-radius: 4px; border: 1px solid #e5e7eb;">
                            <input type="checkbox" 
                                   data-custom-holiday-index="${index}" 
                                   ${holiday.enabled !== false ? 'checked' : ''}
                                   style="margin-right: 0.75rem; cursor: pointer;">
                            <input type="text" 
                                   value="${holiday.name}"
                                   onchange="updateCustomHolidayName(${index}, this.value)"
                                   style="flex: 1; padding: 0.25rem 0.5rem; border: 1px solid transparent; background: transparent; font-weight: 500; cursor: pointer;"
                                   onfocus="this.style.borderColor='#93c5fd'; this.style.background='#f0f9ff';"
                                   onblur="this.style.borderColor='transparent'; this.style.background='transparent';">
                            <input type="date" 
                                   value="${holiday.date}"
                                   onchange="updateCustomHolidayDate(${index}, this.value)"
                                   style="padding: 0.25rem 0.5rem; border: 1px solid transparent; background: transparent; color: #6b7280; font-size: 0.9rem; margin-right: 0.5rem; cursor: pointer;"
                                   onfocus="this.style.borderColor='#93c5fd'; this.style.background='#f0f9ff';"
                                   onblur="this.style.borderColor='transparent'; this.style.background='transparent';">
                            <button type="button"
                                    onclick="removeCustomHoliday(${index})"
                                    style="padding: 0.25rem 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">
                                Remove
                            </button>
                        </div>
                    `).join('')}
                    ${customHolidays.length === 0 ? '<p style="color: #9ca3af; text-align: center; padding: 1rem;">No custom holidays added yet</p>' : ''}
                </div>
            `;
        } else {
            // Country holidays with option to add custom
            const countryHolidays = holidays[country];
            if (!countryHolidays) {
                container.style.display = 'none';
                return;
            }
            
            container.innerHTML = `
                <h4 style="margin-top: 1rem; margin-bottom: 0.75rem; color: #2C5F8D;">Select Holidays to Exclude</h4>
                
                <div class="holiday-toggles" style="display: grid; gap: 0.5rem;">
                    ${countryHolidays.holidays.map((holiday, index) => {
                        const holidayDate = getHolidayDate(holiday, year);
                        const dateStr = holidayDate ? formatDateShort(holidayDate) : '';
                        return `
                            <label class="holiday-toggle" style="display: flex; align-items: center; padding: 0.5rem; background: white; border-radius: 4px; cursor: pointer; border: 1px solid #e5e7eb;">
                                <input type="checkbox" 
                                       data-holiday-index="${index}" 
                                       ${holiday.enabled ? 'checked' : ''}
                                       style="margin-right: 0.75rem;">
                                <span class="holiday-name" style="flex: 1; font-weight: 500;">${holiday.name}</span>
                                <span class="holiday-date" style="color: #6b7280; font-size: 0.9rem;">${dateStr}</span>
                            </label>
                        `;
                    }).join('')}
                </div>
                
                <div class="add-holiday-section" style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; border: 2px dashed #93c5fd;">
                    <h5 style="margin: 0 0 0.75rem 0; color: #2C5F8D;">Add Custom Holiday</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 0.5rem; align-items: end;">
                        <div>
                            <label style="display: block; font-size: 0.9rem; margin-bottom: 0.25rem; color: #6b7280;">Holiday Name</label>
                            <input type="text" 
                                   id="custom-holiday-name" 
                                   placeholder="e.g., Office Closed"
                                   style="width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.9rem; margin-bottom: 0.25rem; color: #6b7280;">Date</label>
                            <input type="date" 
                                   id="custom-holiday-date"
                                   style="width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px;">
                        </div>
                        <button type="button" 
                                onclick="addCustomHoliday()"
                                style="padding: 0.5rem 1rem; background: #FF6B35; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
                            Add Holiday
                        </button>
                    </div>
                </div>
                
                ${customHolidays.length > 0 ? `
                    <h5 style="margin-top: 1rem; margin-bottom: 0.5rem; color: #2C5F8D;">Custom Holidays</h5>
                    <div class="custom-holiday-toggles" style="display: grid; gap: 0.5rem;">
                        ${customHolidays.map((holiday, index) => `
                            <div class="holiday-toggle custom-holiday" style="display: flex; align-items: center; padding: 0.5rem; background: #f0f9ff; border-radius: 4px; border: 1px solid #93c5fd;">
                                <input type="checkbox" 
                                       data-custom-holiday-index="${index}" 
                                       ${holiday.enabled !== false ? 'checked' : ''}
                                       style="margin-right: 0.75rem; cursor: pointer;">
                                <input type="text" 
                                       value="${holiday.name}"
                                       onchange="updateCustomHolidayName(${index}, this.value)"
                                       style="flex: 1; padding: 0.25rem 0.5rem; border: 1px solid transparent; background: transparent; font-weight: 500; cursor: pointer;"
                                       onfocus="this.style.borderColor='#2563eb'; this.style.background='white';"
                                       onblur="this.style.borderColor='transparent'; this.style.background='transparent';">
                                <input type="date" 
                                       value="${holiday.date}"
                                       onchange="updateCustomHolidayDate(${index}, this.value)"
                                       style="padding: 0.25rem 0.5rem; border: 1px solid transparent; background: transparent; color: #6b7280; font-size: 0.9rem; margin-right: 0.5rem; cursor: pointer;"
                                       onfocus="this.style.borderColor='#2563eb'; this.style.background='white';"
                                       onblur="this.style.borderColor='transparent'; this.style.background='transparent';">
                                <button type="button"
                                        onclick="removeCustomHoliday(${index})"
                                        style="padding: 0.25rem 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">
                                    Remove
                                </button>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            `;
        }
        
        // Add styles for hover effect
        const style = document.createElement('style');
        if (!document.getElementById('holiday-toggle-styles')) {
            style.id = 'holiday-toggle-styles';
            style.textContent = `
                .holiday-toggles-container {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 8px;
                }
                .holiday-toggle:hover {
                    border-color: #FF6B35 !important;
                    background: #fff8f5 !important;
                }
                .holiday-toggle input[type="checkbox"] {
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                }
                .add-holiday-section input:focus {
                    outline: none;
                    border-color: #FF6B35;
                }
                .add-holiday-section button:hover {
                    background: #E5521F !important;
                }
                .custom-holiday input[type="text"],
                .custom-holiday input[type="date"] {
                    transition: all 0.2s;
                    border-radius: 4px;
                    font-family: var(--font-body);
                    font-size: 16px;
                }
                .custom-holiday input[type="date"] {
                    color: #6b7280;
                    font-size: 0.9rem;
                }
                .custom-holiday input[type="text"]:hover,
                .custom-holiday input[type="date"]:hover {
                    background: #f0f9ff !important;
                }
                .custom-holiday button:hover {
                    background: #dc2626 !important;
                }
                @media (max-width: 768px) {
                    .add-holiday-section > div {
                        grid-template-columns: 1fr !important;
                    }
                    .custom-holiday {
                        flex-direction: column;
                        align-items: stretch !important;
                    }
                    .custom-holiday input[type="checkbox"] {
                        margin-bottom: 0.5rem;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add event listeners to country holiday toggles
        if (country !== 'custom') {
            container.querySelectorAll('input[data-holiday-index]').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const index = parseInt(this.dataset.holidayIndex);
                    const countryHolidays = holidays[country];
                    if (countryHolidays && countryHolidays.holidays[index]) {
                        countryHolidays.holidays[index].enabled = this.checked;
                        saveToURL();
                        if (hasValidInput()) calculateResults();
                    }
                });
            });
        }
        
        // Add event listeners to custom holiday toggles
        container.querySelectorAll('input[data-custom-holiday-index]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const index = parseInt(this.dataset.customHolidayIndex);
                if (customHolidays[index]) {
                    customHolidays[index].enabled = this.checked;
                    saveToURL();
                    if (hasValidInput()) calculateResults();
                }
            });
        });
    }
    
    // Sort custom holidays by date
    function sortCustomHolidaysByDate() {
        customHolidays.sort((a, b) => {
            const dateA = parseLocalDate(a.date);
            const dateB = parseLocalDate(b.date);
            if (!dateA || !dateB) return 0;
            
            // First sort by month and day (ignoring year for logical ordering)
            const monthDayA = dateA.getMonth() * 100 + dateA.getDate();
            const monthDayB = dateB.getMonth() * 100 + dateB.getDate();
            
            if (monthDayA !== monthDayB) {
                return monthDayA - monthDayB;
            }
            
            // If same month and day, sort by year
            return dateA.getFullYear() - dateB.getFullYear();
        });
    }
    
    // Add custom holiday functions
    window.addCustomHoliday = function() {
        const nameInput = document.getElementById('custom-holiday-name');
        const dateInput = document.getElementById('custom-holiday-date');
        
        if (!nameInput || !dateInput) return;
        
        const name = nameInput.value.trim();
        const date = dateInput.value;
        
        if (!name || !date) {
            alert('Please enter both a holiday name and date');
            return;
        }
        
        // Add the custom holiday
        customHolidays.push({
            name: name,
            date: date,
            enabled: true
        });
        
        // Clear inputs
        nameInput.value = '';
        dateInput.value = '';
        
        // Sort holidays by date
        sortCustomHolidaysByDate();
        
        // Update UI and save
        updateHolidayToggles();
        saveToURL();
        if (hasValidInput()) calculateResults();
    };
    
    window.removeCustomHoliday = function(index) {
        if (index >= 0 && index < customHolidays.length) {
            customHolidays.splice(index, 1);
            updateHolidayToggles();
            saveToURL();
            if (hasValidInput()) calculateResults();
        }
    };
    
    window.updateCustomHolidayName = function(index, newName) {
        if (index >= 0 && index < customHolidays.length && newName.trim()) {
            customHolidays[index].name = newName.trim();
            saveToURL();
            if (hasValidInput()) calculateResults();
        }
    };
    
    window.updateCustomHolidayDate = function(index, newDate) {
        if (index >= 0 && index < customHolidays.length && newDate) {
            customHolidays[index].date = newDate;
            
            // Resort holidays after date change
            sortCustomHolidaysByDate();
            
            // Update UI to reflect new sort order
            updateHolidayToggles();
            saveToURL();
            if (hasValidInput()) calculateResults();
        }
    };
    
    function getHolidayDate(holiday, year) {
        let date = null;
        
        try {
            if (holiday.fixed) {
                const [month, day] = holiday.date.split('-');
                // Create date at noon to avoid timezone issues
                date = new Date(year, parseInt(month) - 1, parseInt(day), 12, 0, 0);
            } else if (holiday.easter !== undefined) {
                date = calculateEasterBasedHoliday(year, holiday.easter);
            } else if (holiday.month !== undefined) {
                date = getNthWeekdayOfMonth(year, holiday.month, holiday.weekday, holiday.week, holiday.before);
            }
        } catch (e) {
            console.error('Error getting holiday date:', e);
        }
        
        return date;
    }
    
    function formatDateShort(date) {
        if (!date) return '';
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    function getSelectedCalcType() {
        const selected = Array.from(calcTypeRadios).find(r => r.checked);
        return selected ? selected.value : 'between';
    }
    
    function isWeekend(date) {
        const day = date.getDay();
        return day === 0 || day === 6;
    }
    
    function isHoliday(date, holidayDates) {
        if (!holidayDates || holidayDates.length === 0) return false;
        
        // Use date comparison that ignores time component
        const checkYear = date.getFullYear();
        const checkMonth = date.getMonth();
        const checkDay = date.getDate();
        
        return holidayDates.some(holiday => {
            if (!holiday || !holiday.date) return false;
            const holidayYear = holiday.date.getFullYear();
            const holidayMonth = holiday.date.getMonth();
            const holidayDay = holiday.date.getDate();
            
            return checkYear === holidayYear && 
                   checkMonth === holidayMonth && 
                   checkDay === holidayDay;
        });
    }
    
    function formatDateForComparison(date) {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    
    function formatDateForInput(date) {
        return formatDateForComparison(date);
    }
    
    function formatDateDisplay(date) {
        if (!date) return '';
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    function getHolidaysForYear(year, country, onlyEnabled = true) {
        const holidayDates = [];
        
        // Handle predefined country holidays (not for custom mode)
        if (country !== 'custom') {
            const countryHolidays = holidays[country];
            
            if (countryHolidays && countryHolidays.holidays) {
                countryHolidays.holidays.forEach(holiday => {
                    if (onlyEnabled && !holiday.enabled) return;
                    
                    let date = null;
                    
                    try {
                        if (holiday.fixed) {
                            const [month, day] = holiday.date.split('-');
                            // Create date at noon to avoid timezone issues
                            date = new Date(year, parseInt(month) - 1, parseInt(day), 12, 0, 0);
                        } else if (holiday.easter !== undefined) {
                            date = calculateEasterBasedHoliday(year, holiday.easter);
                        } else if (holiday.month !== undefined) {
                            date = getNthWeekdayOfMonth(year, holiday.month, holiday.weekday, holiday.week, holiday.before);
                        }
                        
                        if (date && !isNaN(date.getTime())) {
                            holidayDates.push({
                                date: date,
                                name: holiday.name
                            });
                        }
                    } catch (e) {
                        console.error('Error calculating holiday:', holiday.name, e);
                    }
                });
            }
        }
        
        // Always add custom holidays (for all countries including 'custom')
        customHolidays.forEach(holiday => {
            // Skip if disabled and we're filtering
            if (onlyEnabled && holiday.enabled === false) return;
            
            try {
                const date = parseLocalDate(holiday.date);
                if (date && !isNaN(date.getTime()) && date.getFullYear() === year) {
                    holidayDates.push({
                        date: date,
                        name: holiday.name
                    });
                }
            } catch (e) {
                console.error('Error adding custom holiday:', e);
            }
        });
        
        return holidayDates;
    }
    
    function calculateEasterBasedHoliday(year, offset) {
        const easter = calculateEaster(year);
        const holiday = new Date(easter);
        holiday.setDate(holiday.getDate() + offset);
        return holiday;
    }
    
    function calculateEaster(year) {
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        
        return new Date(year, month, day, 12, 0, 0);
    }
    
    function getNthWeekdayOfMonth(year, month, weekday, week, before) {
        let date;
        
        if (week > 0) {
            // Nth occurrence from start
            date = new Date(year, month, 1, 12, 0, 0);
            while (date.getDay() !== weekday) {
                date.setDate(date.getDate() + 1);
            }
            date.setDate(date.getDate() + (week - 1) * 7);
        } else {
            // Last occurrence of weekday in month
            if (before) {
                date = new Date(year, month, before - 1, 12, 0, 0);
            } else {
                date = new Date(year, month + 1, 0, 12, 0, 0);
            }
            
            while (date.getDay() !== weekday) {
                date.setDate(date.getDate() - 1);
            }
            
            if (week < -1) {
                date.setDate(date.getDate() + (week + 1) * 7);
            }
        }
        
        return date;
    }
    
    function generateCalendarView(startDate, endDate, holidayDates) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // Start from the beginning of the month
        const calendarStart = new Date(start.getFullYear(), start.getMonth(), 1, 12, 0, 0);
        // End at the end of the month
        const calendarEnd = new Date(end.getFullYear(), end.getMonth() + 1, 0, 12, 0, 0);
        
        const months = [];
        let currentMonth = new Date(calendarStart);
        
        while (currentMonth <= calendarEnd) {
            const month = currentMonth.getMonth();
            const year = currentMonth.getFullYear();
            const firstDay = new Date(year, month, 1, 12, 0, 0);
            const lastDay = new Date(year, month + 1, 0, 12, 0, 0);
            const startingDayOfWeek = firstDay.getDay();
            
            const monthData = {
                name: firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                days: []
            };
            
            // Add empty cells for days before month starts
            for (let i = 0; i < startingDayOfWeek; i++) {
                monthData.days.push({ empty: true });
            }
            
            // Add each day of the month
            for (let day = 1; day <= lastDay.getDate(); day++) {
                const date = new Date(year, month, day, 12, 0, 0);
                const isInRange = date >= start && date <= end;
                const isWeekendDay = isWeekend(date);
                const isHolidayDay = isHoliday(date, holidayDates);
                
                let className = 'calendar-day';
                let type = '';
                
                if (!isInRange) {
                    className += ' out-of-range';
                } else if (isWeekendDay) {
                    className += ' weekend';
                    type = 'Weekend';
                } else if (isHolidayDay) {
                    className += ' holiday';
                    const holiday = holidayDates.find(h => 
                        formatDateForComparison(h.date) === formatDateForComparison(date)
                    );
                    type = holiday ? holiday.name : 'Holiday';
                } else {
                    className += ' business';
                    type = 'Business Day';
                }
                
                monthData.days.push({
                    day: day,
                    className: className,
                    type: type,
                    date: date
                });
            }
            
            months.push(monthData);
            currentMonth.setMonth(currentMonth.getMonth() + 1);
        }
        
        return months;
    }
    
    function hasValidInput() {
        const calcType = getSelectedCalcType();
        
        if (calcType === 'between') {
            return startDate && startDate.value && endDate && endDate.value;
        } else {
            return baseDate && baseDate.value && businessDaysCount && businessDaysCount.value;
        }
    }
    
    function calculateResults() {
        const calcType = getSelectedCalcType();
        
        try {
            if (calcType === 'between') {
                calculateDaysBetween();
            } else if (calcType === 'add') {
                calculateAddDays();
            } else {
                calculateSubtractDays();
            }
            saveToURL();
        } catch (e) {
            console.error('Calculation error:', e);
            displayError('An error occurred during calculation. Please check your inputs.');
        }
    }
    
    function calculateDaysBetween() {
        if (!startDate.value || !endDate.value) {
            displayError('Please enter both start and end dates');
            return;
        }
        
        // Parse dates as local dates to avoid timezone shifts
        const start = parseLocalDate(startDate.value);
        const end = parseLocalDate(endDate.value);
        
        if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
            displayError('Invalid date format');
            return;
        }
        
        if (start > end) {
            displayError('Start date must be before end date');
            return;
        }
        
        const shouldExcludeHolidays = excludeHolidays ? excludeHolidays.checked : true;
        const country = countrySelect ? countrySelect.value : 'US';
        
        let businessDays = 0;
        let weekends = 0;
        let holidayCount = 0;
        const allHolidayDates = [];  // For display in calendar (includes all holidays)
        const countedHolidayDates = [];  // For counting (excludes weekend holidays)
        const holidayList = [];
        
        // Get all holidays in the date range
        if (shouldExcludeHolidays) {
            const startYear = start.getFullYear();
            const endYear = end.getFullYear();
            
            for (let year = startYear; year <= endYear; year++) {
                const yearHolidays = getHolidaysForYear(year, country, true);
                yearHolidays.forEach(h => {
                    // Compare dates properly - ensure we're comparing date objects
                    const holidayTime = h.date.getTime();
                    const startTime = start.getTime();
                    const endTime = end.getTime();
                    
                    // Include holidays that fall on or between start and end dates (inclusive)
                    if (holidayTime >= startTime && holidayTime <= endTime) {
                        // Always add to display list
                        allHolidayDates.push(h);
                        
                        // Only add to counted list and display list if not on weekend
                        if (!isWeekend(h.date)) {
                            countedHolidayDates.push(h);
                            holidayList.push({
                                name: h.name,
                                date: formatDateDisplay(h.date)
                            });
                        }
                    }
                });
            }
        }
        
        // Count days
        const current = new Date(start);
        
        // Process all days from start to end (inclusive)
        while (current <= end) {
            const isWeekendDay = isWeekend(current);
            const isHolidayDay = shouldExcludeHolidays && isHoliday(current, countedHolidayDates);
            
            if (isWeekendDay) {
                weekends++;
            } else if (isHolidayDay) {
                holidayCount++;
            } else {
                businessDays++;
            }
            
            current.setDate(current.getDate() + 1);
        }
        
        const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        
        displayResults({
            type: 'between',
            startDate: start,
            endDate: end,
            businessDays: businessDays,
            totalDays: totalDays,
            weekends: weekends,
            holidays: holidayCount,
            holidayList: holidayList,
            holidayDates: allHolidayDates
        });
    }
    
    function calculateAddDays() {
        if (!baseDate.value || !businessDaysCount.value) {
            displayError('Please enter a date and number of business days');
            return;
        }
        
        // Parse date as local date to avoid timezone shifts
        const start = parseLocalDate(baseDate.value);
        const daysToAdd = parseInt(businessDaysCount.value);
        
        if (!start || isNaN(start.getTime())) {
            displayError('Invalid date format');
            return;
        }
        
        if (isNaN(daysToAdd) || daysToAdd <= 0) {
            displayError('Please enter a positive number of days');
            return;
        }
        
        const result = addBusinessDays(start, daysToAdd);
        
        displayResults({
            type: 'add',
            startDate: start,
            endDate: result.endDate,
            businessDays: daysToAdd,
            totalDays: result.totalDays,
            weekends: result.weekends,
            holidays: result.holidays,
            holidayList: result.holidayList,
            holidayDates: result.holidayDates
        });
    }
    
    function calculateSubtractDays() {
        if (!baseDate.value || !businessDaysCount.value) {
            displayError('Please enter a date and number of business days');
            return;
        }
        
        // Parse date as local date to avoid timezone shifts
        const start = parseLocalDate(baseDate.value);
        const daysToSubtract = parseInt(businessDaysCount.value);
        
        if (!start || isNaN(start.getTime())) {
            displayError('Invalid date format');
            return;
        }
        
        if (isNaN(daysToSubtract) || daysToSubtract <= 0) {
            displayError('Please enter a positive number of days');
            return;
        }
        
        const result = addBusinessDays(start, -daysToSubtract);
        
        displayResults({
            type: 'subtract',
            startDate: start,
            endDate: result.endDate,
            businessDays: daysToSubtract,
            totalDays: result.totalDays,
            weekends: result.weekends,
            holidays: result.holidays,
            holidayList: result.holidayList,
            holidayDates: result.holidayDates
        });
    }
    
    function addBusinessDays(startDate, days) {
        const shouldExcludeHolidays = excludeHolidays ? excludeHolidays.checked : true;
        const country = countrySelect ? countrySelect.value : 'US';
        
        let current = new Date(startDate);
        let businessDaysCount = 0;
        let weekends = 0;
        let holidayCount = 0;
        let totalDays = 0;
        const direction = days > 0 ? 1 : -1;
        const targetDays = Math.abs(days);
        const holidayList = [];
        const allHolidayDates = [];
        
        while (businessDaysCount < targetDays) {
            current.setDate(current.getDate() + direction);
            totalDays++;
            
            const isWeekendDay = isWeekend(current);
            let isHolidayDay = false;
            
            if (shouldExcludeHolidays && !isWeekendDay) {
                const holidayDates = getHolidaysForYear(current.getFullYear(), country, true);
                const holiday = holidayDates.find(h => 
                    formatDateForComparison(h.date) === formatDateForComparison(current)
                );
                
                if (holiday) {
                    isHolidayDay = true;
                    allHolidayDates.push(holiday);
                    
                    // Check if we already added this holiday
                    const exists = holidayList.some(h => 
                        h.name === holiday.name && h.date === formatDateDisplay(holiday.date)
                    );
                    
                    if (!exists) {
                        holidayList.push({
                            name: holiday.name,
                            date: formatDateDisplay(holiday.date)
                        });
                    }
                }
            }
            
            if (isWeekendDay) {
                weekends++;
            } else if (isHolidayDay) {
                holidayCount++;
            } else {
                businessDaysCount++;
            }
        }
        
        // Get all holidays in range for calendar display
        const finalStart = days > 0 ? startDate : current;
        const finalEnd = days > 0 ? current : startDate;
        const displayHolidayDates = [];
        
        if (shouldExcludeHolidays) {
            const startYear = finalStart.getFullYear();
            const endYear = finalEnd.getFullYear();
            
            for (let year = startYear; year <= endYear; year++) {
                const yearHolidays = getHolidaysForYear(year, country, true);
                yearHolidays.forEach(h => {
                    if (h.date >= finalStart && h.date <= finalEnd) {
                        displayHolidayDates.push(h);
                    }
                });
            }
        }
        
        return {
            endDate: current,
            totalDays: totalDays,
            weekends: weekends,
            holidays: holidayCount,
            holidayList: holidayList,
            holidayDates: displayHolidayDates
        };
    }
    
    function displayResults(data) {
        const { type, startDate, endDate, businessDays, totalDays, weekends, holidays, holidayList, holidayDates } = data;
        
        let title, description;
        
        if (type === 'between') {
            title = 'Business Days Calculation';
            description = `Between ${formatDateDisplay(startDate)} and ${formatDateDisplay(endDate)}`;
        } else if (type === 'add') {
            title = 'Add Business Days Result';
            description = `Adding ${businessDays} business days to ${formatDateDisplay(startDate)}`;
        } else {
            title = 'Subtract Business Days Result';
            description = `Subtracting ${businessDays} business days from ${formatDateDisplay(startDate)}`;
        }
        
        // Calculate percentages safely
        const businessPercent = totalDays > 0 ? (businessDays / totalDays * 100).toFixed(1) : 0;
        const weekendPercent = totalDays > 0 ? (weekends / totalDays * 100).toFixed(1) : 0;
        const holidayPercent = totalDays > 0 ? (holidays / totalDays * 100).toFixed(1) : 0;
        
        // Calculate insights
        const workWeekAvg = totalDays >= 7 ? (businessDays / (totalDays / 7)).toFixed(1) : businessDays;
        const efficiencyRate = totalDays > 0 ? ((businessDays / totalDays) * 100).toFixed(1) : 0;
        
        // Generate calendar view
        const calendarHTML = generateCalendarView(
            startDate,
            endDate,
            holidayDates || []
        );
        
        resultDiv.innerHTML = `
            <div class="result-header">
                <h2>${title}</h2>
                <p>${description}</p>
            </div>
            
            <div class="result-summary">
                <div class="result-main">
                    <div class="result-value-container">
                        <div class="result-label">Business Days</div>
                        <div class="result-value text-success">${businessDays}</div>
                        <div class="result-sublabel">working days</div>
                    </div>
                    ${type !== 'between' ? `
                        <div class="result-date">
                            <span class="date-label">Result Date:</span>
                            <span class="date-value">${formatDateDisplay(endDate)}</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="result-details">
                    <div class="detail-item">
                        <span class="detail-label">Total Calendar Days</span>
                        <span class="detail-value">${totalDays}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Weekend Days</span>
                        <span class="detail-value">${weekends}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Holidays</span>
                        <span class="detail-value">${holidays || 0}</span>
                    </div>
                </div>
            </div>
            
            ${totalDays > 0 ? `
                <div class="calculation-breakdown">
                    <h3>📊 Day Breakdown</h3>
                    <div class="breakdown-chart">
                        ${businessDays > 0 ? `
                            <div class="chart-bar business" style="width: ${Math.max(businessPercent, 10)}%" title="${businessDays} days">
                                <span class="bar-label">Business</span>
                            </div>
                        ` : ''}
                        ${weekends > 0 ? `
                            <div class="chart-bar weekend" style="width: ${Math.max(weekendPercent, 10)}%" title="${weekends} days">
                                <span class="bar-label">Weekend</span>
                            </div>
                        ` : ''}
                        ${holidays > 0 ? `
                            <div class="chart-bar holiday" style="width: ${Math.max(holidayPercent, 10)}%" title="${holidays} days">
                                <span class="bar-label">Holiday</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            ` : ''}
            
            ${calendarHTML.length > 0 ? `
                <div class="calendar-view">
                    <h3>📅 Calendar View</h3>
                    <div class="calendar-legend">
                        <span class="legend-item"><span class="legend-dot business"></span> Business Day</span>
                        <span class="legend-item"><span class="legend-dot weekend"></span> Weekend</span>
                        <span class="legend-item"><span class="legend-dot holiday"></span> Holiday</span>
                        <span class="legend-item"><span class="legend-dot out-of-range"></span> Out of Range</span>
                    </div>
                    <div class="calendar-months">
                        ${calendarHTML.map(month => `
                            <div class="calendar-month">
                                <h4>${month.name}</h4>
                                <div class="calendar-grid">
                                    <div class="calendar-header">Sun</div>
                                    <div class="calendar-header">Mon</div>
                                    <div class="calendar-header">Tue</div>
                                    <div class="calendar-header">Wed</div>
                                    <div class="calendar-header">Thu</div>
                                    <div class="calendar-header">Fri</div>
                                    <div class="calendar-header">Sat</div>
                                    ${month.days.map(day => 
                                        day.empty ? '<div class="calendar-day empty"></div>' : 
                                        `<div class="${day.className}" title="${day.type}">${day.day}</div>`
                                    ).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${holidayList && holidayList.length > 0 ? `
                <div class="holiday-list-result">
                    <h3>🎉 Holidays Excluded</h3>
                    <div class="holiday-table">
                        ${holidayList.map(holiday => `
                            <div class="holiday-row">
                                <span class="holiday-name">${holiday.name}</span>
                                <span class="holiday-date">${holiday.date}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="date-insights">
                <h3>💡 Quick Facts</h3>
                <div class="insights-grid">
                    <div class="insight-card insight-info">
                        <div class="insight-icon">📅</div>
                        <div class="insight-content">
                            <h5>Average Work Week</h5>
                            <p>${workWeekAvg} days/week</p>
                        </div>
                    </div>
                    <div class="insight-card insight-success">
                        <div class="insight-icon">⚡</div>
                        <div class="insight-content">
                            <h5>Efficiency Rate</h5>
                            <p>${efficiencyRate}% working days</p>
                        </div>
                    </div>
                    <div class="insight-card insight-warning">
                        <div class="insight-icon">📊</div>
                        <div class="insight-content">
                            <h5>Non-Working Days</h5>
                            <p>${totalDays - businessDays} days off</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        resultDiv.classList.remove('hidden');
    }
    
    function displayError(message) {
        resultDiv.innerHTML = `
            <div class="error-message">
                <span>⚠️ ${message}</span>
            </div>
        `;
        resultDiv.classList.remove('hidden');
    }
    
    function clearAll() {
        if (calcTypeRadios && calcTypeRadios.length > 0) {
            calcTypeRadios[0].checked = true;
        }
        
        if (startDate) startDate.value = '';
        if (endDate) endDate.value = '';
        if (baseDate) baseDate.value = '';
        if (businessDaysCount) businessDaysCount.value = '';
        if (countrySelect) countrySelect.value = 'US';
        if (excludeHolidays) excludeHolidays.checked = true;
        
        // Reset holiday toggles
        Object.values(holidays).forEach(country => {
            if (country.holidays) {
                country.holidays.forEach(holiday => {
                    holiday.enabled = true;
                });
            }
        });
        
        // Clear custom holidays
        customHolidays = [];
        
        setDefaultDates();
        updateFormDisplay();
        updateHolidayToggles();
        
        if (resultDiv) resultDiv.classList.add('hidden');
        
        const url = new URL(window.location);
        url.search = '';
        window.history.replaceState({}, '', url);
    }
    
    function shareResults() {
        const url = window.location.href;
        const text = 'Check out this business days calculation:';
        
        if (navigator.share) {
            navigator.share({
                title: 'Business Days Calculator',
                text: text,
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
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        if (shareBtn) {
            const originalText = shareBtn.textContent;
            shareBtn.textContent = 'Link Copied!';
            shareBtn.style.background = '#10b981';
            
            setTimeout(() => {
                shareBtn.textContent = originalText;
                shareBtn.style.background = '';
            }, 2000);
        }
    }
    
    function saveToURL() {
        if (debounceTimer) clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(() => {
            const params = new URLSearchParams();
            
            const calcType = getSelectedCalcType();
            params.set('type', calcType);
            
            if (calcType === 'between') {
                if (startDate && startDate.value) params.set('start', startDate.value);
                if (endDate && endDate.value) params.set('end', endDate.value);
            } else {
                if (baseDate && baseDate.value) params.set('base', baseDate.value);
                if (businessDaysCount && businessDaysCount.value) params.set('days', businessDaysCount.value);
            }
            
            if (countrySelect) params.set('country', countrySelect.value);
            if (excludeHolidays && !excludeHolidays.checked) params.set('holidays', 'include');
            
            // Save holiday toggles
            const country = countrySelect ? countrySelect.value : 'US';
            const countryHolidays = holidays[country];
            if (countryHolidays && countryHolidays.holidays) {
                const disabledHolidays = [];
                countryHolidays.holidays.forEach((holiday, index) => {
                    if (!holiday.enabled) {
                        disabledHolidays.push(index);
                    }
                });
                if (disabledHolidays.length > 0) {
                    params.set('disabled', disabledHolidays.join(','));
                }
            }
            
            if (customHolidays.length > 0) {
                params.set('custom', JSON.stringify(customHolidays));
            }
            
            const url = new URL(window.location);
            url.search = params.toString();
            window.history.replaceState({}, '', url);
        }, 500);
    }
    
    function loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        const type = params.get('type');
        if (type && calcTypeRadios) {
            const radio = Array.from(calcTypeRadios).find(r => r.value === type);
            if (radio) {
                radio.checked = true;
                updateFormDisplay();
            }
        }
        
        if (params.has('start') && startDate) startDate.value = params.get('start');
        if (params.has('end') && endDate) endDate.value = params.get('end');
        if (params.has('base') && baseDate) baseDate.value = params.get('base');
        if (params.has('days') && businessDaysCount) businessDaysCount.value = params.get('days');
        
        if (params.has('country') && countrySelect) countrySelect.value = params.get('country');
        if (params.has('holidays') && excludeHolidays) {
            excludeHolidays.checked = params.get('holidays') !== 'include';
        }
        
        // Load disabled holidays
        if (params.has('disabled')) {
            const country = countrySelect ? countrySelect.value : 'US';
            const countryHolidays = holidays[country];
            if (countryHolidays && countryHolidays.holidays) {
                const disabledIndices = params.get('disabled').split(',').map(i => parseInt(i));
                countryHolidays?.holidays?.forEach((holiday, index) => {
                    if (disabledIndices?.includes(index)) {
                        countryHolidays.holidays[index].enabled = false;
                    } else countryHolidays.holidays[index].enabled = true;
                });
            }
        }
        
        if (params.has('custom')) {
            try {
                customHolidays = JSON.parse(params.get('custom'));
                // Sort custom holidays after loading
                sortCustomHolidaysByDate();
            } catch (e) {
                console.error('Error parsing custom holidays:', e);
                customHolidays = [];
            }
        }
    }
});

// Add result and calendar styling
const style = document.createElement('style');
style.textContent = `
    .result-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .result-header h2 {
        color: #2C5F8D;
        margin-bottom: 0.5rem;
    }
    
    .result-header p {
        color: #6b7280;
        font-size: 1.1rem;
    }
    
    .result-summary {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
        padding: 2rem;
        background: linear-gradient(135deg, #E8F4F8 0%, white 100%);
        border-radius: 12px;
    }
    
    .result-main {
        text-align: center;
    }
    
    .result-value-container {
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .result-label {
        font-size: 1.1rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
    }
    
    .result-value {
        font-size: 3.5rem;
        font-weight: 800;
        margin: 0.5rem 0;
    }
    
    .result-sublabel {
        font-size: 0.9rem;
        color: #9ca3af;
    }
    
    .result-date {
        margin-top: 1.5rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .date-label {
        display: block;
        font-size: 0.9rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
    }
    
    .date-value {
        display: block;
        font-size: 1.2rem;
        font-weight: 600;
        color: #2C5F8D;
    }
    
    .result-details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
    }
    
    .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
    }
    
    .detail-label {
        color: #6b7280;
    }
    
    .detail-value {
        font-weight: 700;
        color: #2C5F8D;
        font-size: 1.2rem;
    }
    
    .text-success { color: #10b981; }
    
    .calculation-breakdown {
        margin: 2rem 0;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
    }
    
    .calculation-breakdown h3 {
        margin-bottom: 1rem;
        color: #2C5F8D;
    }
    
    .breakdown-chart {
        display: flex;
        height: 80px;
        border-radius: 8px;
        overflow: hidden;
        background: #e5e7eb;
    }
    
    .chart-bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        transition: all 0.3s;
        min-width: 60px;
    }
    
    .chart-bar.business {
        background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
    }
    
    .chart-bar.weekend {
        background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
    }
    
    .chart-bar.holiday {
        background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
    }
    
    .bar-label {
        font-size: 0.8rem;
        opacity: 0.9;
        color: black;
    }
    
    /* Calendar view */
    .calendar-view {
        margin: 2rem 0;
        padding: var(--space-lg) var(--space-md);
        background: white;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
    }
    
    .calendar-view h3 {
        margin-bottom: 1rem;
        color: #2C5F8D;
    }
    
    .calendar-legend {
        display: flex;
        gap: 2rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
    }
    
    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .legend-dot {
        width: 12px;
        height: 12px;
        border-radius: 3px;
        display: inline-block;
    }
    
    .legend-dot.business {
        background: #10b981;
    }
    
    .legend-dot.weekend {
        background: #6b7280;
    }
    
    .legend-dot.holiday {
        background: #f59e0b;
    }
    
    .legend-dot.out-of-range {
        background: #e5e7eb;
    }
    
    .calendar-months {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        overflow: scroll;
    }
    
    .calendar-month h4 {
        margin-bottom: 1rem;
        color: #374151;
        font-size: 1.1rem;
    }
    
    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
        background: #f3f4f6;
        padding: 2px;
        border-radius: 8px;
    }
    
    .calendar-header {
        padding: 0.5rem;
        text-align: center;
        font-weight: 600;
        font-size: 0.8rem;
        background: #374151;
        color: white;
    }
    
    .calendar-day {
        padding: 0.5rem;
        text-align: center;
        background: white;
        cursor: pointer;
        transition: all 0.2s;
        min-height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
    }
    
    .calendar-day.empty {
        background: transparent;
        cursor: default;
    }
    
    .calendar-day.business {
        background: #f0fdf4;
        color: #166534;
        font-weight: 500;
    }
    
    .calendar-day.weekend {
        background: #f9fafb;
        color: #6b7280;
    }
    
    .calendar-day.holiday {
        background: #fef3c7;
        color: #92400e;
        font-weight: 600;
    }
    
    .calendar-day.out-of-range {
        background: #f9fafb;
        color: #d1d5db;
    }
    
    .calendar-day:hover:not(.empty):not(.out-of-range) {
        transform: scale(1.1);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 1;
        position: relative;
    }
    
    /* Holiday list */
    .holiday-list-result {
        margin: 2rem 0;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
    }
    
    .holiday-list-result h3 {
        margin-bottom: 1rem;
        color: #2C5F8D;
    }
    
    .holiday-table {
        display: grid;
        gap: 0.5rem;
    }
    
    .holiday-row {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 6px;
        border-left: 3px solid #f59e0b;
    }
    
    .holiday-row .holiday-name {
        font-weight: 500;
        color: #374151;
    }
    
    .holiday-row .holiday-date {
        color: #6b7280;
        font-size: 0.9rem;
    }
    
    .date-insights {
        margin: 2rem 0;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
    }
    
    .date-insights h3 {
        margin-bottom: 1rem;
        color: #2C5F8D;
    }
    
    .insights-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .insight-card {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
    }
    
    .insight-card.insight-info {
        background: #eff6ff;
        border-color: #93c5fd;
    }
    
    .insight-card.insight-success {
        background: #f0fdf4;
        border-color: #86efac;
    }
    
    .insight-card.insight-warning {
        background: #fef3c7;
        border-color: #fcd34d;
    }
    
    .insight-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
    }
    
    .insight-content h5 {
        margin: 0 0 0.25rem 0;
        color: #374151;
        font-size: 0.9rem;
    }
    
    .insight-content p {
        margin: 0;
        color: #6b7280;
        font-weight: 600;
    }
    
    .error-message {
        padding: 1rem;
        background: #fee2e2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        color: #991b1b;
        text-align: center;
    }
    
    @media (max-width: 768px) {
        .result-summary {
            grid-template-columns: 1fr;
        }
        
        .result-value {
            font-size: 2.5rem;
        }
        
        .breakdown-chart {
            flex-direction: column;
            height: auto;
        }
        
        .chart-bar {
            padding: 1rem;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            min-width: auto;
        }
        
        .calendar-legend {
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .calendar-months {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);