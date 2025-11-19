// GPA Calculator - Calculate Grade Point Average
document.addEventListener('DOMContentLoaded', function() {
    // Grade point values for different grading scales
    const gradeScales = {
        standard: {
            'A+': 4.0, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'D-': 0.7,
            'F': 0.0
        },
        plusMinus: {
            'A+': 4.3, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'D-': 0.7,
            'F': 0.0
        },
        noMinus: {
            'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0,
            'F': 0.0
        }
    };
    
    let courses = [];
    let currentScale = 'standard';
    let debounceTimer = null;
    
    // Get DOM elements
    const addCourseBtn = document.getElementById('add-course');
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const shareBtn = document.getElementById('share-calculation');
    const scaleSelect = document.getElementById('grade-scale');
    const courseList = document.getElementById('course-list');
    const resultDiv = document.getElementById('gpa-result');
    const includeCumulative = document.getElementById('include-cumulative');
    const cumulativeSection = document.getElementById('cumulative-section');
    const cumulativeGPA = document.getElementById('cumulative-gpa');
    const cumulativeCredits = document.getElementById('cumulative-credits');
    
    // Initialize
    init();
    
    function init() {
        loadFromURL();
        setupEventListeners();
        
        // Add default courses if none loaded
        if (courses.length === 0) {
            for (let i = 0; i < 4; i++) {
                addCourse(courses[0], i);
            }
        }
        
        // Initial calculation if data exists
        if (hasValidData()) {
            calculateResults();
        }
    }
    
    function setupEventListeners() {
        if (addCourseBtn) addCourseBtn.addEventListener('click', () => addCourse());
        if (calculateBtn) calculateBtn.addEventListener('click', () => {
          calculateResults();
          document.querySelector(".calculator-result")?.scrollIntoView({behavior: 'smooth', block: 'start'});
        });
        if (clearBtn) clearBtn.addEventListener('click', clearAll);
        if (shareBtn) shareBtn.addEventListener('click', shareResults);
        
        if (scaleSelect) {
            scaleSelect.addEventListener('change', function() {
                currentScale = this.value;
                updateGradeOptions();
                saveToURL();
                if (hasValidData()) calculateResults();
            });
        }
        
        if (includeCumulative) {
            includeCumulative.addEventListener('change', function() {
                cumulativeSection.style.display = this.checked ? 'grid' : 'none';
                if (!this.checked) {
                    cumulativeGPA.value = '';
                    cumulativeCredits.value = '';
                }
                saveToURL();
                if (hasValidData()) calculateResults();
            });
        }
        
        if (cumulativeGPA) {
            cumulativeGPA.addEventListener('input', () => {
                saveToURL();
                if (hasValidData()) calculateResults();
            });
        }
        
        if (cumulativeCredits) {
            cumulativeCredits.addEventListener('input', () => {
                saveToURL();
                if (hasValidData()) calculateResults();
            });
        }
    }
    
    function addCourse(courseData = null, index) {
        const courseIndex = courses?.length || index;
        const courseRow = document.createElement('div');
        courseRow.className = 'course-row';
        courseRow.dataset.index = courseIndex;
        
        const gradeOptions = Object.keys(gradeScales[currentScale])
            .map(grade => `<option value="${grade}">${grade}</option>`)
            .join('');
        
        courseRow.innerHTML = `
            <input type="text" 
                   class="course-name" 
                   placeholder="Class Name (Optional)" 
                   data-index="${courseIndex}"
                   value="${courseData?.name || ''}"
                   id="course-name-${courseIndex}">
            
            <input type="number" 
                   class="course-credits" 
                   placeholder="Credits" 
                   min="0" 
                   max="10" 
                   step="0.5" 
                   data-index="${courseIndex}"
                   value="${courseData?.credits >= 0 ? courseData?.credits : 3}"
                   id="course-credits-${courseIndex}"
                   required>
            
            <select class="course-grade" data-index="${courseIndex}" id="course-grade-${courseIndex}" required>
                <option value="">Select Grade</option>
                ${gradeOptions}
            </select>
            
            <span class="grade-points" data-index="${courseIndex}" id="grade-points-${courseIndex}">0.00</span>
            
            <button type="button" class="remove-course" data-index="${courseIndex}" title="Remove Class" id="remove-course-${courseIndex}">
                ×
            </button>
        `;
        
        courseList.appendChild(courseRow);
        
        // Set selected grade if provided
        if (courseData?.grade) {
            courseRow.querySelector('.course-grade').value = courseData.grade;
        }
        
        // Add course to array
        courses.push({
            name: courseData?.name || '',
            credits: courseData?.credits >= 0 ? courseData?.credits : 3,
            grade: courseData?.grade || ''
        });
        
        // Add event listeners
        const nameInput = courseRow.querySelector('.course-name');
        const creditsInput = courseRow.querySelector('.course-credits');
        const gradeSelect = courseRow.querySelector('.course-grade');
        const removeBtn = courseRow.querySelector('.remove-course');
        
        nameInput.addEventListener('input', function() {
            courses[courseIndex].name = this.value;
            saveToURL();
        });
        
        creditsInput.addEventListener('input', function() {
            courses[courseIndex].credits = parseFloat(this.value) || 0;
            updateGradePoints(courseIndex);
            saveToURL();
        });
        
        gradeSelect.addEventListener('change', function() {
            courses[courseIndex].grade = this.value;
            updateGradePoints(courseIndex);
            saveToURL();
            if (hasValidData()) calculateResults();
        });
        
        removeBtn.addEventListener('click', function() {
            removeCourse(courseIndex);
        });
        
        // Update grade points if data exists
        if (courseData?.credits >= 0 && courseData?.grade) {
            updateGradePoints(courseIndex);
        }
    }
    
    function removeCourse(index) {
        const courseRow = courseList.querySelector(`[data-index="${index}"]`);
        
        if (courseRow) {
            courseRow.remove();
            courses.splice(index, 1);
            
            // Re-index remaining courses
            const remainingRows = courseList.querySelectorAll('.course-row');
            remainingRows.forEach((row, newIndex) => {
                row.dataset.index = newIndex;
                row.querySelectorAll('[data-index]').forEach(element => {
                    element.dataset.index = newIndex;
                });
            });
            
            saveToURL();
            if (hasValidData()) calculateResults();
        }
    }
    
    function updateGradePoints(index) {
        const course = courses[index];
        const gradePointsSpan = document.querySelector(`.grade-points[data-index="${index}"]`);
        
        if (gradePointsSpan && course.grade && course.credits) {
            const gradeValue = gradeScales[currentScale][course.grade] || 0;
            const points = (gradeValue * course.credits).toFixed(2);
            gradePointsSpan.textContent = points;
        } else if (gradePointsSpan) {
            gradePointsSpan.textContent = '0.00';
        }
    }
    
    function updateGradeOptions() {
        const gradeSelects = document.querySelectorAll('.course-grade');
        
        gradeSelects.forEach((select, index) => {
            const currentValue = select.value;
            const gradeOptions = Object.keys(gradeScales[currentScale])
                .map(grade => `<option value="${grade}">${grade}</option>`)
                .join('');
            
            select.innerHTML = `
                <option value="">Select Grade</option>
                ${gradeOptions}
            `;
            
            if (currentValue && gradeScales[currentScale][currentValue] !== undefined) {
                select.value = currentValue;
            } else {
                courses[index].grade = '';
            }
            
            updateGradePoints(index);
        });
    }
    
    function hasValidData() {
        return courses.some(c => c.grade && c.credits > 0);
    }
    
    function calculateResults() {
        let totalPoints = 0;
        let totalCredits = 0;
        let coursesCalculated = 0;
        
        // Calculate from courses
        courses.forEach((course) => {
            if (course.grade && course.credits > 0) {
                const gradeValue = gradeScales[currentScale][course.grade] || 0;
                totalPoints += gradeValue * course.credits;
                totalCredits += course.credits;
                coursesCalculated++;
            }
        });
        
        // Include cumulative GPA if enabled
        if (includeCumulative?.checked) {
            const cumGPA = parseFloat(cumulativeGPA.value) || 0;
            const cumCredits = parseFloat(cumulativeCredits.value) || 0;
            
            if (cumGPA > 0 && cumCredits > 0) {
                totalPoints += cumGPA * cumCredits;
                totalCredits += cumCredits;
            }
        }
        
        // Calculate GPA
        const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
        
        // Display results
        displayResults(gpa, totalCredits, coursesCalculated, totalPoints);
    }
    
    function displayResults(gpa, totalCredits, coursesCalculated, totalPoints) {
        if (coursesCalculated === 0 && totalCredits === 0) {
            resultDiv.classList.add('hidden');
            return;
        }
        
        const letterGrade = getLetterGrade(gpa);
        const performanceLevel = getPerformanceLevel(gpa);
        
        // Generate statistics
        const stats = generateStatistics();
        
        // Generate grade distribution chart
        const chartHTML = generateGradeChart();
        
        // Generate tips based on GPA
        const tips = generateTips(gpa);
        
        resultDiv.innerHTML = `
            <div class="result-header">
                <h2>Your GPA Results</h2>
            </div>
            
            <div class="result-summary">
                <div class="result-main">
                    <div class="result-value-container">
                        <div class="result-label">Your GPA</div>
                        <div class="result-value ${getGPAClass(gpa)}">${gpa.toFixed(3)}</div>
                        <div class="result-sublabel">out of ${currentScale === 'plusMinus' ? '4.3' : '4.0'}</div>
                    </div>
                    <div class="result-grade">
                        <span class="grade-letter">${letterGrade}</span>
                        <span class="grade-performance">${performanceLevel}</span>
                    </div>
                </div>
                
                <div class="result-details">
                    <div class="detail-item">
                        <span class="detail-label">Total Credits</span>
                        <span class="detail-value">${totalCredits.toFixed(1)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Total Points</span>
                        <span class="detail-value">${totalPoints.toFixed(2)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Classes Calculated</span>
                        <span class="detail-value">${coursesCalculated}</span>
                    </div>
                </div>
            </div>
            
            ${chartHTML}
            
            <div class="gpa-insights">
                <h3>📊 Grade Statistics</h3>
                <div class="insights-grid">
                    ${stats}
                </div>
            </div>
            
            <div class="gpa-tips">
                <h3>💡 ${gpa >= 3.5 ? 'Keep Up the Great Work!' : 'Tips to Improve Your GPA'}</h3>
                <ul>
                    ${tips}
                </ul>
            </div>
        `;
        
        resultDiv.classList.remove('hidden');
    }
    
    function getGPAClass(gpa) {
        if (gpa >= 3.7) return 'text-success';
        if (gpa >= 3.0) return 'text-info';
        if (gpa >= 2.0) return 'text-warning';
        return 'text-danger';
    }
    
    function getLetterGrade(gpa) {
        if (gpa >= 4.0) return 'A';
        if (gpa >= 3.7) return 'A-';
        if (gpa >= 3.3) return 'B+';
        if (gpa >= 3.0) return 'B';
        if (gpa >= 2.7) return 'B-';
        if (gpa >= 2.3) return 'C+';
        if (gpa >= 2.0) return 'C';
        if (gpa >= 1.7) return 'C-';
        if (gpa >= 1.3) return 'D+';
        if (gpa >= 1.0) return 'D';
        if (gpa >= 0.7) return 'D-';
        return 'F';
    }
    
    function getPerformanceLevel(gpa) {
        if (gpa >= 4.0) return 'Outstanding';
        if (gpa >= 3.7) return 'Excellent';
        if (gpa >= 3.3) return 'Very Good';
        if (gpa >= 3.0) return 'Good - Above Average';
        if (gpa >= 2.7) return 'Satisfactory';
        if (gpa >= 2.3) return 'Average';
        if (gpa >= 2.0) return 'Below Average';
        if (gpa >= 1.0) return 'Poor - Academic Warning';
        if (gpa > 0) return 'Very Poor - Academic Probation';
        return 'No Grades Entered';
    }
    
    function generateStatistics() {
        const gradedCourses = courses.filter(c => c.grade && c.credits > 0);
        
        if (gradedCourses.length === 0) {
            return '<div class="insight-card">No statistics available</div>';
        }
        
        const avgCredits = gradedCourses.reduce((sum, c) => sum + c.credits, 0) / gradedCourses.length;
        
        let highestGrade = null;
        let lowestGrade = null;
        let highestValue = -1;
        let lowestValue = 5;
        
        gradedCourses.forEach(course => {
            const value = gradeScales[currentScale][course.grade] || 0;
            if (value > highestValue) {
                highestValue = value;
                highestGrade = course.grade;
            }
            if (value < lowestValue) {
                lowestValue = value;
                lowestGrade = course.grade;
            }
        });
        
        return `
            <div class="insight-card insight-info">
                <div class="insight-icon">📚</div>
                <div class="insight-content">
                    <h5>Avg Credits/Class</h5>
                    <p>${avgCredits.toFixed(1)} credits</p>
                </div>
            </div>
            <div class="insight-card insight-success">
                <div class="insight-icon">⬆️</div>
                <div class="insight-content">
                    <h5>Highest Grade</h5>
                    <p>${highestGrade || 'N/A'}</p>
                </div>
            </div>
            <div class="insight-card insight-warning">
                <div class="insight-icon">⬇️</div>
                <div class="insight-content">
                    <h5>Lowest Grade</h5>
                    <p>${lowestGrade || 'N/A'}</p>
                </div>
            </div>
        `;
    }
    
    function generateGradeChart() {
        const gradeCounts = {};
        const gradedCourses = courses.filter(c => c.grade && c.credits > 0);
        
        if (gradedCourses.length === 0) {
            return '';
        }
        
        gradedCourses.forEach(course => {
            gradeCounts[course.grade] = (gradeCounts[course.grade] || 0) + 1;
        });
        
        const total = Object.values(gradeCounts).reduce((sum, count) => sum + count, 0);
        
        const bars = Object.entries(gradeCounts)
            .sort((a, b) => {
                const aValue = gradeScales[currentScale][a[0]] || 0;
                const bValue = gradeScales[currentScale][b[0]] || 0;
                return bValue - aValue;
            })
            .map(([grade, count]) => {
                const percentage = (count / total * 100).toFixed(1);
                const barWidth = (count / total * 100);
                
                return `
                    <div class="chart-bar" style="width: ${barWidth}%">
                        <div class="bar-label">${grade}</div>
                        <div class="bar-count">${count}</div>
                        <div class="bar-percentage">${percentage}%</div>
                    </div>
                `;
            })
            .join('');
        
        return `
            <div class="grade-distribution">
                <h3>Grade Distribution</h3>
                <div class="grade-chart">
                    ${bars}
                </div>
            </div>
        `;
    }
    
    function generateTips(gpa) {
        let tips = [];
        
        if (gpa < 2.0) {
            tips = [
                'Consider seeking academic advising or tutoring immediately',
                'Review study habits and time management strategies',
                'Meet with professors or teachers during office hours regularly',
                'Consider reducing class load if overwhelmed'
            ];
        } else if (gpa < 3.0) {
            tips = [
                'Focus on improving grades in major classes',
                'Seek help early when struggling with material',
                'Join study groups for difficult classes',
                'Consider retaking classes with low grades if allowed'
            ];
        } else if (gpa < 3.5) {
            tips = [
                'Maintain consistency across all classes',
                'Take advantage of extra credit opportunities',
                'Consider honors or advanced classes to boost GPA',
                'Develop stronger relationships with professors or teachers',
            ];
        } else {
            tips = [
                'Excellent work! Keep up the great performance',
                'Consider applying for academic honors and awards',
                'Maintain balance between academics and well-being',
                'Look into research opportunities with professors or teachers',
                'Consider applying for prestigious academatic programs or universities'
            ];
        }
        
        return tips.map(tip => `<li>${tip}</li>`).join('');
    }
    
    function clearAll() {
        courseList.innerHTML = '';
        courses = [];
        
        if (cumulativeGPA) cumulativeGPA.value = '';
        if (cumulativeCredits) cumulativeCredits.value = '';
        if (includeCumulative) {
            includeCumulative.checked = false;
            cumulativeSection.style.display = 'none';
        }
        
        resultDiv.classList.add('hidden');
        
        // Clear URL
        const url = new URL(window.location);
        url.search = '';
        window.history.replaceState({}, '', url);
        
        // Add default courses
        for (let i = 0; i < 4; i++) {
            addCourse();
        }
    }
    
    function shareResults() {
        const url = window.location.href;
        const gpa = document.querySelector('.result-value')?.textContent || '0.000';
        const text = `My GPA is ${gpa}! Calculate yours with this free GPA calculator:`;
        
        if (navigator.share) {
            navigator.share({
                title: 'GPA Calculator Results',
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
        
        // Show notification
        const originalText = shareBtn.textContent;
        shareBtn.textContent = 'Link Copied!';
        shareBtn.style.background = '#10b981';
        
        setTimeout(() => {
            shareBtn.textContent = originalText;
            shareBtn.style.background = '';
        }, 2000);
    }
    
    function saveToURL() {
        if (debounceTimer) clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(() => {
            const params = new URLSearchParams();
            
            params.set('scale', currentScale);
            
            courses.forEach((course, index) => {
                if (course.name || course.credits || course.grade) {
                    params.set(`c${index}_name`, course.name);
                    params.set(`c${index}_credits`, course.credits.toString());
                    params.set(`c${index}_grade`, course.grade);
                }
            });
            
            if (includeCumulative?.checked) {
                params.set('cumulative', 'true');
                if (cumulativeGPA.value) params.set('cum_gpa', cumulativeGPA.value);
                if (cumulativeCredits.value) params.set('cum_credits', cumulativeCredits.value);
            }
            
            const url = new URL(window.location);
            url.search = params.toString();
            window.history.replaceState({}, '', url);
        }, 500);
    }
    
    function loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        // Load scale
        if (params.has('scale')) {
            currentScale = params.get('scale');
            if (scaleSelect) scaleSelect.value = currentScale;
        }
        
        // Load courses
        let courseIndex = 0;
        while (params.has(`c${courseIndex}_name`) || 
               params.has(`c${courseIndex}_credits`) || 
               params.has(`c${courseIndex}_grade`)) {
            addCourse({
                name: params.get(`c${courseIndex}_name`) || '',
                credits: parseFloat(params.get(`c${courseIndex}_credits`)) || 0,
                grade: params.get(`c${courseIndex}_grade`) || ''
            }, courseIndex);
            courseIndex++;
        }
        
        // Load cumulative
        if (params.get('cumulative') === 'true') {
            if (includeCumulative) {
                includeCumulative.checked = true;
                cumulativeSection.style.display = 'grid';
            }
            if (params.has('cum_gpa') && cumulativeGPA) {
                cumulativeGPA.value = params.get('cum_gpa');
            }
            if (params.has('cum_credits') && cumulativeCredits) {
                cumulativeCredits.value = params.get('cum_credits');
            }
        }
    }
});

// Add result styling
const style = document.createElement('style');
style.textContent = `
    .result-header h2 {
        color: #2C5F8D;
        margin-bottom: 1.5rem;
        font-size: 2rem;
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
    
    .result-grade {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .grade-letter {
        display: inline-block;
        padding: 0.5rem 1.5rem;
        background: #FF6B35;
        color: white;
        border-radius: 50px;
        font-size: 1.5rem;
        font-weight: 600;
    }
    
    .grade-performance {
        display: flex;
        align-items: center;
        color: #6b7280;
        font-weight: 500;
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
    .text-info { color: #3b82f6; }
    .text-warning { color: #f59e0b; }
    .text-danger { color: #ef4444; }
    
    .grade-distribution {
        margin: 2rem 0;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
    }
    
    .grade-distribution h3 {
        margin-bottom: 1rem;
        color: #2C5F8D;
    }
    
    .grade-chart {
        display: flex;
        gap: 0.5rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        min-height: 120px;
    }
    
    .chart-bar {
        background: linear-gradient(to top, #FF6B35, #FFB900);
        border-radius: 4px 4px 0 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        padding: 0.5rem;
        color: white;
        min-width: 40px;
        position: relative;
    }
    
    .bar-label {
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    
    .bar-count {
        font-size: 1.2rem;
        font-weight: bold;
    }
    
    .bar-percentage {
        font-size: 0.8rem;
        opacity: 0.9;
    }
    
    .gpa-insights,
    .gpa-tips {
        margin: 2rem 0;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
    }
    
    .gpa-insights h3,
    .gpa-tips h3 {
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
    
    .gpa-tips ul {
        list-style: none;
        padding: 0;
    }
    
    .gpa-tips li {
        padding: 0.75rem 0;
        padding-left: 2rem;
        position: relative;
        color: #4b5563;
        border-bottom: 1px solid #f3f4f6;
    }
    
    .gpa-tips li:last-child {
        border-bottom: none;
    }
    
    .gpa-tips li:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #10b981;
        font-weight: bold;
        font-size: 1.2rem;
    }
    
    @media (max-width: 768px) {
        .result-summary {
            grid-template-columns: 1fr;
        }
        
        .result-value {
            font-size: 2.5rem;
        }
        
        .grade-chart {
            flex-direction: column;
        }
        
        .chart-bar {
            width: 100%;
            min-width: auto;
            flex-direction: row;
            justify-content: space-between;
            border-radius: 4px;
        }
    }
`;
document.head.appendChild(style);