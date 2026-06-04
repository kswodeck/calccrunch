---
layout: ../../layouts/CalculatorLayout.astro
calcType: subscription
---

## How to Use This Calculator

1. **Check the subscriptions you have** - Browse through common services organized by category
2. **Adjust prices** if your plan differs from the default shown
3. **Set your usage frequency** - How often you actually use each service
4. **Add custom subscriptions** for any services not listed
5. Click **Calculate** to see your total spending, potential savings, and insights

<div class="calculator-form" id="subscription-calculator-form">
  <div class="form-section">
    <h3>📺 Streaming & Entertainment</h3>
    <p class="form-help">Check the services you currently subscribe to and adjust prices to match your plan.</p>
    <div id="streaming-category">
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Netflix" data-category="streaming" data-price="15.49" /><span class="sub-name">Netflix</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="15.49" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Hulu" data-category="streaming" data-price="7.99" /><span class="sub-name">Hulu</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="7.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Disney+" data-category="streaming" data-price="7.99" /><span class="sub-name">Disney+</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="7.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="HBO Max" data-category="streaming" data-price="15.99" /><span class="sub-name">HBO Max</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="15.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Amazon Prime" data-category="streaming" data-price="14.99" /><span class="sub-name">Amazon Prime</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="14.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Apple TV+" data-category="streaming" data-price="9.99" /><span class="sub-name">Apple TV+</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="9.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Paramount+" data-category="streaming" data-price="5.99" /><span class="sub-name">Paramount+</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="5.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="YouTube Premium" data-category="streaming" data-price="13.99" /><span class="sub-name">YouTube Premium</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="13.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Peacock" data-category="streaming" data-price="5.99" /><span class="sub-name">Peacock</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="5.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Spotify" data-category="streaming" data-price="11.99" /><span class="sub-name">Spotify</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="11.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Apple Music" data-category="streaming" data-price="10.99" /><span class="sub-name">Apple Music</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="10.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>💻 Software & Productivity</h3>
    <div id="software-category">
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Microsoft 365" data-category="software" data-price="9.99" /><span class="sub-name">Microsoft 365</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="9.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Adobe Creative Cloud" data-category="software" data-price="54.99" /><span class="sub-name">Adobe Creative Cloud</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="54.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Google One" data-category="software" data-price="2.99" /><span class="sub-name">Google One</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="2.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="iCloud+" data-category="software" data-price="2.99" /><span class="sub-name">iCloud+</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="2.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Dropbox" data-category="software" data-price="11.99" /><span class="sub-name">Dropbox</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="11.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Notion" data-category="software" data-price="10.00" /><span class="sub-name">Notion</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="10.00" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="ChatGPT Plus" data-category="software" data-price="20.00" /><span class="sub-name">ChatGPT Plus</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="20.00" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Grammarly" data-category="software" data-price="12.00" /><span class="sub-name">Grammarly</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="12.00" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>🎮 Gaming</h3>
    <div id="gaming-category">
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Xbox Game Pass" data-category="gaming" data-price="16.99" /><span class="sub-name">Xbox Game Pass</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="16.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="PS Plus" data-category="gaming" data-price="14.99" /><span class="sub-name">PS Plus</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="14.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Nintendo Online" data-category="gaming" data-price="3.99" /><span class="sub-name">Nintendo Online</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="3.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="EA Play" data-category="gaming" data-price="4.99" /><span class="sub-name">EA Play</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="4.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>🏋️ Health & Fitness</h3>
    <div id="fitness-category">
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Gym Membership" data-category="fitness" data-price="40.00" /><span class="sub-name">Gym Membership</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="40.00" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Peloton" data-category="fitness" data-price="12.99" /><span class="sub-name">Peloton</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="12.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Headspace" data-category="fitness" data-price="12.99" /><span class="sub-name">Headspace</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="12.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="MyFitnessPal" data-category="fitness" data-price="19.99" /><span class="sub-name">MyFitnessPal</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="19.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>📰 News & Learning</h3>
    <div id="news-category">
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="NYT" data-category="news" data-price="17.00" /><span class="sub-name">New York Times</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="17.00" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="WSJ" data-category="news" data-price="12.00" /><span class="sub-name">Wall Street Journal</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="12.00" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Audible" data-category="news" data-price="14.95" /><span class="sub-name">Audible</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="14.95" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Masterclass" data-category="news" data-price="10.00" /><span class="sub-name">Masterclass</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="10.00" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly" selected>Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Skillshare" data-category="news" data-price="13.99" /><span class="sub-name">Skillshare</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="13.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly" selected>Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Duolingo" data-category="news" data-price="6.99" /><span class="sub-name">Duolingo</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="6.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>🍔 Food & Delivery</h3>
    <div id="food-category">
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="DoorDash DashPass" data-category="food" data-price="9.99" /><span class="sub-name">DoorDash DashPass</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="9.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Uber One" data-category="food" data-price="9.99" /><span class="sub-name">Uber One</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="9.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="HelloFresh / Meal Kit" data-category="food" data-price="60.00" /><span class="sub-name">HelloFresh / Meal Kit</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="60.00" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Instacart+" data-category="food" data-price="9.99" /><span class="sub-name">Instacart+</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="9.99" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>🔧 Other Services</h3>
    <div id="other-category">
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="VPN Service" data-category="other" data-price="10.00" /><span class="sub-name">VPN Service</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="10.00" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Password Manager" data-category="other" data-price="3.00" /><span class="sub-name">Password Manager</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="3.00" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div class="sub-item">
        <label class="sub-checkbox"><input type="checkbox" data-name="Cloud Backup" data-category="other" data-price="6.00" /><span class="sub-name">Cloud Backup</span></label>
        <div class="sub-controls">
          <div class="input-group compact">
            <span class="input-addon">$</span>
            <input type="number" class="form-input sub-price" value="6.00" min="0" step="0.01" />
          </div>
          <select class="form-select sub-cycle">
            <option value="monthly" selected>Monthly</option>
            <option value="annual">Annual</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <select class="form-select sub-usage">
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>➕ Custom Subscriptions</h3>
    <p class="form-help">Add any subscriptions not listed above.</p>
    <div id="custom-subscriptions-container">
      <!-- Custom entries added here -->
    </div>
    <button type="button" id="add-custom-btn" class="btn btn-secondary add-item-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Custom Subscription
    </button>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Subscription Costs →
  </button>

  <div class="form-actions">
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this calculation">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share Results
    </button>
  </div>
</div>

<div id="subscription-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>📊 What Is Subscription Creep?</h4>
  <p>
    <strong>Subscription creep</strong> is the gradual accumulation of recurring charges that individually seem small but collectively add up to hundreds per month. The average American spends <strong>$219/month</strong> on subscriptions — often underestimating their total by 2-3x.
  </p>
  <p style="margin-top: 10px;">
    Common signs of subscription creep: forgotten free trials that converted to paid, services you signed up for one show/project, duplicate services (multiple cloud storage or streaming), and price increases you never noticed.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>💡 Subscription Audit Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Check bank statements:</strong> Search for recurring charges over the past 3 months</li>
    <li><strong>Review app store subscriptions:</strong> Check Apple/Google subscription management</li>
    <li><strong>Look for annual charges:</strong> These are easy to forget since they only hit once a year</li>
    <li><strong>Ask: "Did I use this in the last 30 days?"</strong> If not, consider canceling</li>
    <li><strong>Rotate services:</strong> Subscribe to one streaming service at a time, binge content, then switch</li>
    <li><strong>Negotiate or downgrade:</strong> Many services offer cheaper tiers or retention discounts</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>💰 The True Cost of Subscriptions</h4>
  <p>
    A $15/month subscription doesn't just cost $180/year — it costs you the <strong>opportunity</strong> of what that money could become. Invested at 7% annual return:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>$15/month over 10 years:</strong> $2,600 (vs $1,800 spent)</li>
    <li><strong>$50/month over 10 years:</strong> $8,700 (vs $6,000 spent)</li>
    <li><strong>$100/month over 10 years:</strong> $17,400 (vs $12,000 spent)</li>
    <li><strong>$200/month over 10 years:</strong> $34,800 (vs $24,000 spent)</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>📈 Average Subscription Spending by Category</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Streaming video:</strong> $55/month (avg household has 4+ services)</li>
    <li><strong>Music:</strong> $11/month</li>
    <li><strong>Gaming:</strong> $18/month</li>
    <li><strong>News/Magazines:</strong> $15/month</li>
    <li><strong>Cloud storage:</strong> $10/month</li>
    <li><strong>Fitness:</strong> $40/month</li>
    <li><strong>Food delivery memberships:</strong> $15/month</li>
    <li><strong>Software/productivity:</strong> $25/month</li>
  </ul>
</div>

<style>
  .sub-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--color-gray);
    flex-wrap: wrap;
  }

  .sub-item:last-child {
    border-bottom: none;
  }

  .sub-item:hover {
    background: var(--color-gray-light);
  }

  .sub-checkbox {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    cursor: pointer;
    min-width: 180px;
    font-weight: 500;
  }

  .sub-checkbox input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .sub-name {
    font-size: var(--text-sm);
  }

  .sub-controls {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex: 1;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .sub-controls .input-group.compact {
    max-width: 120px;
    display: flex;
    align-items: center;
  }

  .sub-controls .input-group.compact .input-addon {
    padding: 0.4rem 0.5rem;
    font-size: var(--text-sm);
  }

  .sub-controls .input-group.compact .form-input {
    padding: 0.4rem 0.5rem;
    font-size: var(--text-sm);
    width: 80px;
  }

  .sub-controls .form-select {
    padding: 0.4rem 0.5rem;
    font-size: var(--text-sm);
    min-width: auto;
    width: auto;
  }

  .sub-controls .sub-cycle {
    width: 100px;
  }

  .sub-controls .sub-usage {
    width: 95px;
  }

  .custom-sub-row {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    margin-bottom: var(--space-md);
    flex-wrap: wrap;
    background: var(--color-white);
  }

  .custom-sub-row .form-input.sub-custom-name {
    min-width: 150px;
    flex: 1;
    padding: 0.4rem 0.5rem;
    font-size: var(--text-sm);
  }

  .custom-sub-row .remove-custom-btn {
    background: transparent;
    border: none;
    color: var(--color-error);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: var(--text-lg);
    line-height: 1;
  }

  .custom-sub-row .remove-custom-btn:hover {
    background: var(--color-highlight-red);
    border-radius: 4px;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  .add-item-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: var(--space-md);
  }

  @media (max-width: 768px) {
    .sub-item {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-sm);
      padding: var(--space-md);
    }

    .sub-controls {
      width: 100%;
      justify-content: flex-start;
    }

    .sub-checkbox {
      min-width: auto;
    }

    .form-actions {
      flex-direction: column;
    }

    .form-actions button {
      width: 100%;
    }

    .custom-sub-row {
      flex-direction: column;
      align-items: stretch;
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

<script src="/scripts/calculators/subscription-calculator.js"></script>
