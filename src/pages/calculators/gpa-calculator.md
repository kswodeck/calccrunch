---
layout: ../../layouts/CalculatorLayout.astro
title: GPA Calculator
description: Calculate your cumulative GPA with weighted or unweighted grades. Add multiple classes with credit hours and letter grades to see your grade point average.
category: math-conversions
tags: ['GPA', 'grades', 'education', 'grade point average', 'academic']
featured: true
calcType: gpa
seoTitle: Free GPA Calculator - Grade Point Average Calculator
seoDescription: Calculate your GPA with multiple classes and credit hours. Track weighted and unweighted grades with our free calculator.
estimatedTime: 3 minutes
difficulty: Easy
---

## How to Use This Calculator

1. **Select your grading scale** (Standard 4.0, Plus/Minus, etc.)
2. **Add your classes** with class names (optional)
3. **Enter credit hours** for each class
4. **Select the grade** you received
5. **Include previous GPA** if calculating cumulative (optional)
6. Click **Calculate GPA** to see your results

<div class="calculator-form" id="gpa-calculator-form">
  <div class="form-section">
    <h3>Grading Scale</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="grade-scale">
          Select Grade Scale <span class="required">*</span>
        </label>
        <select id="grade-scale" class="form-select" required>
          <option value="standard" selected>Standard (A = 4.0)</option>
          <option value="plusMinus">Plus/Minus with A+ (A+ = 4.3)</option>
          <option value="noMinus">No A+ Scale (A = 4.0 max)</option>
        </select>
        <small class="form-help">Choose your school's grading system</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Your Classes</h3>
    <div class="course-header">
      <span>Class Name</span>
      <span>Credits</span>
      <span>Grade</span>
      <span>Points</span>
      <span></span>
    </div>
    <div id="course-list" class="course-list">
      <!-- Classes will be added dynamically -->
    </div>
    <button type="button" id="add-course" class="btn btn-secondary">
      + Add Another Class
    </button>
  </div>

  <div class="form-section">
    <h3>Previous GPA (Optional)</h3>
    <div class="form-row">
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" id="include-cumulative">
          <span>Include cumulative GPA from previous semesters</span>
        </label>
      </div>
    </div>
    <div id="cumulative-section" class="form-row" style="display: none;">
      <div class="form-group">
        <label for="cumulative-gpa">
          Previous Cumulative GPA
        </label>
        <input 
          type="number" 
          id="cumulative-gpa" 
          class="form-input"
          min="0"
          max="4.3"
          step="0.001"
          placeholder="3.500"
        />
        <small class="form-help">Your GPA before this semester</small>
      </div>
      <div class="form-group">
        <label for="cumulative-credits">
          Previous Total Credits
        </label>
        <input 
          type="number" 
          id="cumulative-credits" 
          class="form-input"
          min="0"
          max="999"
          step="0.5"
          placeholder="45"
        />
        <small class="form-help">Total credits completed</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate GPA →
  </button>
  
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Clear all entries">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear All
    </button>
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this calculation">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share Calculation
    </button>
  </div>
</div>

<div id="gpa-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>📊 What is GPA?</h4>
  <p>
    <strong>Grade Point Average (GPA)</strong> is a standardized way of measuring academic achievement. 
    It's calculated by dividing the total grade points earned by the total credit hours attempted. 
    Most US colleges use a 4.0 scale, where A = 4.0, B = 3.0, C = 2.0, D = 1.0, and F = 0.0.
  </p>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your grades are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>🎯 GPA Calculation Formula</h4>
  <p>
    <strong>GPA = Total Grade Points ÷ Total Credit Hours</strong>
  </p>
  <p style="margin-top: 10px;">
    <strong>Example:</strong> If you have:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Math (A, 4 credits): 4.0 × 4 = 16 points</li>
    <li>English (B+, 3 credits): 3.3 × 3 = 9.9 points</li>
    <li>Science (A-, 3 credits): 3.7 × 3 = 11.1 points</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Total:</strong> 37 points ÷ 10 credits = <strong>3.70 GPA</strong>
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>📈 Understanding GPA Scales</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>4.0 Scale:</strong> Most common in US colleges (A = 4.0)</li>
    <li><strong>Weighted GPA:</strong> Gives extra points for honors/AP classes (up to 5.0)</li>
    <li><strong>Plus/Minus System:</strong> More precise grading (A+ = 4.3, A- = 3.7)</li>
    <li><strong>Percentage Scale:</strong> Some schools use 0-100% instead of letters</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Pro Tip:</strong> Always check with your school about which scale they use 
    and whether they calculate weighted or unweighted GPA for transcripts.
  </p>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 Tips to Improve Your GPA</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Focus on high-credit classes:</strong> They have more impact on your GPA</li>
    <li><strong>Retake failed classes:</strong> Many schools replace the old grade</li>
    <li><strong>Take easier electives:</strong> Balance difficult core classes</li>
    <li><strong>Seek help early:</strong> Don't wait until you're failing to get tutoring</li>
    <li><strong>Attend all classes:</strong> Participation often affects grades</li>
    <li><strong>Build relationships:</strong> Connect with professors for better support</li>
  </ul>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ Important GPA Considerations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Different schools may calculate GPA differently</li>
    <li>Some schools don't count + and - grades</li>
    <li>Pass/Fail classes usually don't affect GPA</li>
    <li>Withdrawn classes (W) typically don't impact GPA</li>
    <li>Transfer credits may be calculated separately</li>
    <li>Graduate schools often look at major GPA separately</li>
  </ul>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }
  
  .course-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr 0.8fr 50px;
    gap: 1rem;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #4b5563;
  }
  
  .course-list {
    margin-bottom: 1rem;
  }
  
  .course-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr 0.8fr 50px;
    gap: 1rem;
    margin-bottom: 1rem;
    align-items: center;
  }
  
  .course-name,
  .course-credits,
  .course-grade {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  .course-name:focus,
  .course-credits:focus,
  .course-grade:focus {
    border-color: #FF6B35;
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
  
  .grade-points {
    text-align: center;
    font-weight: 600;
    color: #2C5F8D;
    padding: 0.5rem;
    background: #E8F4F8;
    border-radius: 6px;
  }
  
  .remove-course {
    width: 40px;
    height: 40px;
    border: 2px solid #ef4444;
    background: white;
    color: #ef4444;
    border-radius: 6px;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .remove-course:hover {
    background: #ef4444;
    color: white;
    transform: scale(1.05);
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .checkbox-label input[type="checkbox"] {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .course-header,
    .course-row {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
    
    .course-header span:not(:first-child) {
      display: none;
    }
    
    .grade-points {
      display: none;
    }
    
    .course-row > * {
      margin-bottom: 0.5rem;
    }
    
    .form-actions {
      flex-direction: column;
    }
    
    .form-actions button {
      width: 100%;
    }
  }
  
  @media print {
    .btn, button {
      display: none !important;
    }
    
    .form-actions {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/gpa-calculator.js"></script>