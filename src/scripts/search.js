// CalcCrunch Search Functionality
// Integrates with calculators.json and provides real-time search

import calculatorsData from '../data/calculators.json';
import categoriesData from '../data/categories.json';

/**
 * Initialize search functionality
 */
export function initSearch() {
  // Get search elements
  const searchForms = document.querySelectorAll('.search-form, .search-form-hero');
  const searchInputs = document.querySelectorAll('.search-input, .search-input-hero');
  
  if (!searchForms.length) return;
  
  // Add event listeners to all search forms
  searchForms.forEach(form => {
    form.addEventListener('submit', handleSearchSubmit);
  });
  
  // Add real-time search suggestions (optional)
  searchInputs.forEach(input => {
    input.addEventListener('input', debounce(handleSearchInput, 300));
    input.addEventListener('focus', showSearchSuggestions);
    input.addEventListener('blur', hideSearchSuggestions);
  });
  
  // Handle search on search results page
  if (window.location.pathname.includes('/search')) {
    performPageSearch();
  }
}

/**
 * Handle search form submission
 */
function handleSearchSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const input = form.querySelector('input[name="q"]');
  const query = input.value.trim();
  
  if (!query) {
    showSearchError('Please enter a search term');
    return;
  }
  
  // Redirect to search page with query
  window.location.href = `/search?q=${encodeURIComponent(query)}`;
}

/**
 * Handle real-time search input (for suggestions)
 */
function handleSearchInput(e) {
  const query = e.target.value.trim();
  
  if (query.length < 2) {
    hideSearchSuggestions();
    return;
  }
  
  const results = searchCalculators(query, 5); // Get top 5 suggestions
  displaySearchSuggestions(results, e.target);
}

/**
 * Main search function
 * @param {string} query - Search query
 * @param {number} limit - Maximum number of results (0 = no limit)
 * @returns {Array} - Array of matching calculators
 */
function searchCalculators(query, limit = 0) {
  if (!query) return [];
  
  const lowerQuery = query?.toLowerCase();
  const words = lowerQuery?.split(' ')?.filter(word => word?.length);
  
  // Search through all calculators
  // Search through all calculators (exclude hidden ones)
  const results = calculatorsData?.calculators
    ?.filter(calc => !calc.hidden) // Only show non-hidden calculators
    ?.map(calc => {
      let score = 0;
      
      // Title match (highest weight)
      if (calc?.title?.toLowerCase()?.includes(lowerQuery)) {
        score += 100;
        // Exact match gets bonus
        if (calc?.title?.toLowerCase() === lowerQuery) {
          score += 50;
        }
      }
      
      // Check each word in title
      words?.forEach(word => {
        if (calc?.title?.toLowerCase()?.includes(word)) {
          score += 20;
        }
      });
      
      // Description match
      if (calc?.description?.toLowerCase()?.includes(lowerQuery)) {
        score += 30;
      }
      
      words?.forEach(word => {
        if (calc?.description?.toLowerCase()?.includes(word)) {
          score += 10;
        }
      });
      
      // SEO Description match
      if (calc?.seoDescription?.toLowerCase()?.includes(lowerQuery)) {
        score += 30;
      }
      
      words.forEach(word => {
        if (calc?.seoDescription?.toLowerCase()?.includes(word)) {
          score += 10;
        }
      });
      
      // Tags match
      calc?.tags?.forEach(tag => {
        if (tag?.toLowerCase()?.includes(lowerQuery)) {
          score += 40;
        }
        words?.forEach(word => {
          if (tag?.toLowerCase()?.includes(word)) {
            score += 15;
          }
        });
      });
      
      // Keywords match
      calc?.keywords?.forEach(keyword => {
        if (keyword?.toLowerCase()?.includes(lowerQuery)) {
          score += 35;
        }
        words?.forEach(word => {
          if (keyword?.toLowerCase()?.includes(word)) {
            score += 12;
          }
        });
      });
      
      // Category match
      const categoryName = getCategoryName(calc?.category);
      if (categoryName?.toLowerCase()?.includes(lowerQuery)) {
        score += 20;
      }
      
      // Boost popular calculators slightly
      if (calc?.popular) {
        score += 3;
      }
      
      // Boost featured calculators slightly
      if (calc?.featured) {
        score += 2;
      }
      
      return {
        ...calc,
        searchScore: score
      };
    })
    ?.filter(calc => calc?.searchScore > 5) // Only include matches that have a connections other than just being popular/featured
    ?.sort((a, b) => b.searchScore - a.searchScore);
  
  return limit > 0 ? results.slice(0, limit) : results;
}

/**
 * Perform search on the search results page
 */
function performPageSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') || '';
  
  // Update search input with query
  const searchInputs = document.querySelectorAll('input[name="q"]');
  searchInputs.forEach(input => {
    input.value = query;
  });
  
  if (!query) {
    displayNoQuery();
    return;
  }
  
  // Perform search
  const results = searchCalculators(query);
  
  // Display results
  displaySearchResults(results, query);
  
  // Track search (for analytics)
  trackSearch(query, results.length);
}

/**
 * Display search results on the page
 */
function displaySearchResults(results, query) {
  const resultsContainer = document.getElementById('search-results');
  const resultsCount = document.getElementById('results-count');
  const searchQuery = document.getElementById('search-query');
  
  if (!resultsContainer) return;
  
  // Update query display
  if (searchQuery) {
    searchQuery.textContent = query;
  }
  
  // Update count
  if (resultsCount) {
    resultsCount.textContent = `${results?.length} result${results?.length != 1 ? 's' : ''}`;
  }
  
  // Clear previous results
  resultsContainer.innerHTML = '';
  
  if (!results?.length) {
    displayNoResults(query);
    return;
  }
  
  // Group results by category
  const resultsByCategory = groupByCategory(results);
  
  // Display results
  Object.entries(resultsByCategory).forEach(([category, calcs]) => {
    const categoryName = getCategoryName(category);
    const categorySection = createCategorySection(categoryName, calcs);
    resultsContainer.appendChild(categorySection);
  });
}

/**
 * Group calculators by category
 */
function groupByCategory(calculators) {
  return calculators.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {});
}

/**
 * Create category section HTML
 */
function createCategorySection(categoryName, calculators) {
  const section = document.createElement('div');
  section.className = 'search-category-section';
  
  const header = document.createElement('h3');
  header.className = 'category-header';
  header.textContent = `${categoryName} (${calculators.length})`;
  
  const grid = document.createElement('div');
  grid.className = 'search-results-grid';
  
  calculators.forEach(calc => {
    const card = createCalculatorCard(calc);
    grid.appendChild(card);
  });
  
  section.appendChild(header);
  section.appendChild(grid);
  
  return section;
}

/**
 * Create calculator card HTML
 */
function createCalculatorCard(calc) {
  const card = document.createElement('a');
  card.href = `/calculators/${calc.slug}`;
  card.className = 'calc-card';
  
  // Add popular badge if applicable
  if (calc.popular) {
    const badge = document.createElement('div');
    badge.className = 'calc-card-badge';
    badge.textContent = '🔥 Popular';
    card.appendChild(badge);
  }
  
  // Card icon
  const icon = document.createElement('div');
  icon.className = 'calc-card-icon';
  icon.textContent = calc.icon || '🔢';
  
  // Card content container
  const content = document.createElement('div');
  content.className = 'calc-card-content';
  
  // Title
  const title = document.createElement('h4');
  title.className = 'calc-card-title';
  title.textContent = calc.title;
  
  // Description
  const description = document.createElement('p');
  description.className = 'calc-card-description';
  description.textContent = calc.shortDescription || calc.description;
  
  // Category tag
  const categoryTag = document.createElement('span');
  categoryTag.className = 'calc-card-category';
  categoryTag.textContent = getCategoryName(calc.category);
  
  // Append to content
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(categoryTag);
  
  // Card arrow
  const arrow = document.createElement('div');
  arrow.className = 'calc-card-arrow';
  arrow.textContent = '→';
  
  // Append all to card
  card.appendChild(icon);
  card.appendChild(content);
  card.appendChild(arrow);
  
  return card;
}

/**
 * Display search suggestions dropdown
 */
function displaySearchSuggestions(results, inputElement) {
  // Remove any existing suggestions
  hideSearchSuggestions();
  
  if (results.length === 0) return;
  
  const dropdown = document.createElement('div');
  dropdown.className = 'search-suggestions';
  dropdown.id = 'search-suggestions';
  
  results.forEach(calc => {
    const suggestion = document.createElement('a');
    suggestion.href = `/calculators/${calc.slug}`;
    suggestion.className = 'suggestion-item';
    
    const icon = document.createElement('span');
    icon.className = 'suggestion-icon';
    icon.textContent = calc.icon || '🔢';
    
    const content = document.createElement('div');
    content.className = 'suggestion-content';
    
    const title = document.createElement('div');
    title.className = 'suggestion-title';
    title.textContent = calc.title + (calc.popular ? " 🔥" : '');

    const categoryRow = document.createElement('div');
    categoryRow.className = 'suggestion-category-div';
    
    const category = document.createElement('div');
    category.className = 'suggestion-category';
    category.textContent = getCategoryName(calc.category);
    categoryRow.appendChild(category);

    content.appendChild(title);
    content.appendChild(categoryRow);
    
    suggestion.appendChild(icon);
    suggestion.appendChild(content);
    
    // Prevent blur event from hiding suggestions before click
    suggestion.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });
    
    dropdown.appendChild(suggestion);
  });
  
  // Position dropdown below input
  const inputRect = inputElement.getBoundingClientRect();
  dropdown.style.position = 'absolute';
  dropdown.style.top = `${inputRect.bottom + window.scrollY}px`;
  dropdown.style.left = `${inputRect.left + window.scrollX}px`;
  dropdown.style.width = `${inputRect.width}px`;
  
  document.body.appendChild(dropdown);
}

/**
 * Show search suggestions
 */
function showSearchSuggestions(e) {
  const query = e.target.value.trim();
  if (query.length >= 2) {
    const results = searchCalculators(query, 5);
    displaySearchSuggestions(results, e.target);
  }
}

/**
 * Hide search suggestions
 */
function hideSearchSuggestions() {
  const existingSuggestions = document.getElementById('search-suggestions');
  if (existingSuggestions) {
    existingSuggestions.remove();
  }
}

/**
 * Display no results message
 */
function displayNoResults(query) {
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;
  
  resultsContainer.innerHTML = `
    <div class="no-results">
      <div class="no-results-icon">🔍</div>
      <h2>No calculators found for "${escapeHtml(query)}"</h2>
      <p>Try different keywords or browse our categories below:</p>
      <div class="suggestions">
        <h3>Popular Searches:</h3>
        <div class="suggestion-tags">
          <a href="/search?q=mortgage" class="suggestion-tag">Mortgage</a>
          <a href="/search?q=bmi" class="suggestion-tag">BMI</a>
          <a href="/search?q=loan" class="suggestion-tag">Loan</a>
          <a href="/search?q=calorie" class="suggestion-tag">Calorie</a>
          <a href="/search?q=interest" class="suggestion-tag">Interest</a>
          <a href="/search?q=budget" class="suggestion-tag">Budget</a>
        </div>
      </div>
      <a href="/calculators" class="btn btn-primary">Browse All Calculators</a>
    </div>
  `;
}

/**
 * Display no query message
 */
function displayNoQuery() {
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;
  
  resultsContainer.innerHTML = `
    <div class="no-results">
      <div class="no-results-icon">🔎</div>
      <h2>Start Your Search</h2>
      <p>Enter a search term to find the calculator you need.</p>
      <div class="suggestions">
        <h3>Try searching for:</h3>
        <div class="suggestion-tags">
          <a href="/search?q=mortgage" class="suggestion-tag">Mortgage</a>
          <a href="/search?q=bmi" class="suggestion-tag">BMI</a>
          <a href="/search?q=loan" class="suggestion-tag">Loan</a>
          <a href="/search?q=retirement" class="suggestion-tag">Retirement</a>
          <a href="/search?q=weight" class="suggestion-tag">Weight</a>
          <a href="/search?q=investment" class="suggestion-tag">Investment</a>
        </div>
      </div>
      <a href="/calculators" class="btn btn-primary">Browse All Calculators</a>
    </div>
  `;
}

/**
 * Show search error
 */
function showSearchError(message) {
  // Create a simple toast notification
  const toast = document.createElement('div');
  toast.className = 'search-toast error';
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Hide and remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

/**
 * Get category name from category ID
 */
function getCategoryName(categoryId) {
  const category = categoriesData.categories.find(cat => cat.id === categoryId);
  return category ? category.name : categoryId;
}

/**
 * Debounce function for performance
 */
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

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Track search for analytics
 */
function trackSearch(query, resultsCount) {
  // Google Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'search', {
      search_term: query,
      results_count: resultsCount
    });
  }
  
  // You can add other analytics here (Plausible, etc.)
  if (typeof plausible !== 'undefined') {
    plausible('Search', {
      props: {
        query: query,
        results: resultsCount
      }
    });
  }
}

// Initialize search when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearch);
} else {
  initSearch();
}

// Export for use in other modules
export { searchCalculators, getCategoryName };