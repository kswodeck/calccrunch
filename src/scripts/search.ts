// CalcCrunch Search Functionality
// Scores calculators against a query using the build-time index at
// /search-index.json (see src/pages/search-index.json.ts).
//
// The index is fetched lazily — warmed as soon as a search box is focused or
// hovered, awaited only where results are actually needed — so ordinary page
// loads ship none of the catalog. Form submit still works without it: the
// search box is a real GET form pointing at /search.

/** One entry of /search-index.json. Short keys keep the payload small. */
interface IndexEntry {
  t: string; // title
  s: string; // slug
  d: string; // description
  sd?: string; // shortDescription
  x?: string; // seoDescription
  g?: string[]; // tags
  k?: string[]; // keywords
  c: string; // category id
  p: 0 | 1; // popular
  f: 0 | 1; // featured
  i?: string; // icon
}

interface SearchIndex {
  categories: Record<string, string>;
  calculators: IndexEntry[];
}

/** An index entry annotated with its relevance score for a query. */
interface ScoredEntry extends IndexEntry {
  searchScore: number;
}

let index: SearchIndex | null = null;
let indexPromise: Promise<SearchIndex> | null = null;

/**
 * Fetch the search index once and memoize it. A failed fetch clears the
 * memo so the next interaction retries rather than failing forever.
 */
function loadIndex(): Promise<SearchIndex> {
  if (index) return Promise.resolve(index);
  if (!indexPromise) {
    indexPromise = fetch('/search-index.json')
      .then(res => {
        if (!res.ok) throw new Error(`search index: HTTP ${res.status}`);
        return res.json() as Promise<SearchIndex>;
      })
      .then(data => {
        index = data;
        return data;
      })
      .catch(err => {
        indexPromise = null;
        throw err;
      });
  }
  return indexPromise;
}

/** Warm the index without caring about the outcome. */
function prefetchIndex(): void {
  loadIndex().catch(() => {});
}

/**
 * Initialize search functionality
 */
export function initSearch(): void {
  // Get search elements
  const searchForms = document.querySelectorAll<HTMLFormElement>('.search-form, .search-form-hero');
  const searchInputs = document.querySelectorAll<HTMLInputElement>('.search-input, .search-input-hero');
  const onSearchPage = window.location.pathname.includes('/search');

  if (!searchForms.length && !onSearchPage) return;

  // Add event listeners to all search forms
  searchForms.forEach(form => {
    form.addEventListener('submit', handleSearchSubmit);
  });

  // Add real-time search suggestions (optional)
  searchInputs.forEach(input => {
    input.addEventListener('input', debounce(handleSearchInput, 300));
    input.addEventListener('focus', showSearchSuggestions);
    input.addEventListener('blur', hideSearchSuggestions);
    // Start the download before the first keystroke so suggestions are ready
    // by the time the debounce fires.
    input.addEventListener('pointerenter', prefetchIndex, { once: true });
    input.addEventListener('focus', prefetchIndex, { once: true });
  });

  // Handle search on search results page
  if (onSearchPage) {
    void performPageSearch();
  }
}

/**
 * Handle search form submission
 */
function handleSearchSubmit(e: SubmitEvent): void {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const input = form.querySelector<HTMLInputElement>('input[name="q"]');
  const query = input?.value.trim() ?? '';

  if (!query) {
    showSearchError('Please enter a search term');
    return;
  }

  // Redirect to search page with query
  window.location.href = `/search?q=${encodeURIComponent(query)}`;
}

// Guards against a slow index fetch rendering suggestions for a query the
// user has already typed past.
let suggestionToken = 0;

/**
 * Handle real-time search input (for suggestions)
 */
function handleSearchInput(e: Event): void {
  const target = e.target as HTMLInputElement;
  const query = target.value.trim();

  if (query.length < 2) {
    hideSearchSuggestions();
    return;
  }

  const token = ++suggestionToken;
  loadIndex()
    .then(() => {
      if (token !== suggestionToken) return;
      displaySearchSuggestions(searchCalculators(query, 5), target);
    })
    .catch(() => {});
}

/**
 * Main search function. Requires the index to be loaded; returns nothing
 * until it is.
 */
function searchCalculators(query: string, limit = 0): ScoredEntry[] {
  if (!query || !index) return [];

  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(' ').filter(word => word.length);

  const results = index.calculators
    .map((calc): ScoredEntry => {
      let score = 0;

      // Title match (highest weight)
      const title = calc.t?.toLowerCase();
      if (title?.includes(lowerQuery)) {
        score += 100;
        // Exact match gets bonus
        if (title === lowerQuery) {
          score += 50;
        }
      }

      // Check each word in title
      words.forEach(word => {
        if (title?.includes(word)) {
          score += 20;
        }
      });

      // Description match
      const description = calc.d?.toLowerCase();
      if (description?.includes(lowerQuery)) {
        score += 30;
      }

      words.forEach(word => {
        if (description?.includes(word)) {
          score += 10;
        }
      });

      // SEO Description match
      const seoDescription = calc.x?.toLowerCase();
      if (seoDescription?.includes(lowerQuery)) {
        score += 30;
      }

      words.forEach(word => {
        if (seoDescription?.includes(word)) {
          score += 10;
        }
      });

      // Tags match
      calc.g?.forEach(tag => {
        const lowerTag = tag?.toLowerCase();
        if (lowerTag?.includes(lowerQuery)) {
          score += 40;
        }
        words.forEach(word => {
          if (lowerTag?.includes(word)) {
            score += 15;
          }
        });
      });

      // Keywords match
      calc.k?.forEach(keyword => {
        const lowerKeyword = keyword?.toLowerCase();
        if (lowerKeyword?.includes(lowerQuery)) {
          score += 35;
        }
        words.forEach(word => {
          if (lowerKeyword?.includes(word)) {
            score += 12;
          }
        });
      });

      // Category match
      const categoryName = getCategoryName(calc.c);
      if (categoryName?.toLowerCase()?.includes(lowerQuery)) {
        score += 20;
      }

      // Boost popular calculators slightly
      if (calc.p) {
        score += 3;
      }

      // Boost featured calculators slightly
      if (calc.f) {
        score += 2;
      }

      return {
        ...calc,
        searchScore: score
      };
    })
    .filter(calc => calc.searchScore > 5) // Only include matches that have a connections other than just being popular/featured
    .sort((a, b) => b.searchScore - a.searchScore);

  return limit > 0 ? results.slice(0, limit) : results;
}

/**
 * Perform search on the search results page
 */
async function performPageSearch(): Promise<void> {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') || '';

  // Update search input with query
  const searchInputs = document.querySelectorAll<HTMLInputElement>('input[name="q"]');
  searchInputs.forEach(input => {
    input.value = query;
  });

  if (!query) {
    displayNoQuery();
    return;
  }

  // Reflect the query in the tab/history entry, which the prerendered title
  // can't do.
  document.title = `Search Results for "${query}" | CalcCrunch`;

  try {
    await loadIndex();
  } catch {
    displayIndexError(query);
    return;
  }

  // Perform search
  const results = searchCalculators(query);

  // Display results
  displaySearchResults(results, query);

  // Track search (for analytics)
  trackSearch(query, results.length);
}

const RESULTS_PER_PAGE = 10;
let allSearchResults: ScoredEntry[] = [];
let visibleResults = RESULTS_PER_PAGE;

/**
 * Display search results on the page
 */
function displaySearchResults(results: ScoredEntry[], query: string): void {
  const resultsContainer = document.getElementById('search-results');
  const resultsCount = document.getElementById('results-count');
  const searchQuery = document.getElementById('search-query');
  const queryWrapper = document.getElementById('results-query');

  if (!resultsContainer) return;

  allSearchResults = results;
  visibleResults = RESULTS_PER_PAGE;

  // Update query display
  if (searchQuery) {
    searchQuery.textContent = query;
  }
  if (queryWrapper) {
    queryWrapper.hidden = false;
  }

  // Clear previous results
  resultsContainer.innerHTML = '';

  if (!results.length) {
    displayNoResults(query);
    if (resultsCount) {
      resultsCount.textContent = '0 results';
    }
    return;
  }

  renderVisibleResults(resultsContainer, resultsCount);
}

/**
 * Render the currently visible subset of results
 */
function renderVisibleResults(container?: HTMLElement | null, countEl?: HTMLElement | null): void {
  if (!container) {
    container = document.getElementById('search-results');
  }
  if (!countEl) {
    countEl = document.getElementById('results-count');
  }

  if (!container) return;
  container.innerHTML = '';

  const showing = Math.min(visibleResults, allSearchResults.length);
  const visibleSlice = allSearchResults.slice(0, showing);

  // Update count
  if (countEl) {
    if (allSearchResults.length <= RESULTS_PER_PAGE) {
      countEl.textContent = `${allSearchResults.length} result${allSearchResults.length != 1 ? 's' : ''}`;
    } else {
      countEl.textContent = `Showing ${showing} of ${allSearchResults.length} results`;
    }
  }

  // Group visible results by category
  const resultsByCategory = groupByCategory(visibleSlice);

  // Display results
  Object.entries(resultsByCategory).forEach(([category, calcs]) => {
    const categoryName = getCategoryName(category);
    const categorySection = createCategorySection(categoryName, calcs);
    container!.appendChild(categorySection);
  });

  // Add "Show More" button if there are more results
  if (showing < allSearchResults.length) {
    const showMoreWrapper = document.createElement('div');
    showMoreWrapper.className = 'show-more-search-wrapper';
    showMoreWrapper.innerHTML = `
      <button class="btn btn-primary" id="search-show-more">
        Show More Results (${allSearchResults.length - showing} remaining)
      </button>
    `;
    container.appendChild(showMoreWrapper);

    document.getElementById('search-show-more')?.addEventListener('click', () => {
      visibleResults += RESULTS_PER_PAGE;
      renderVisibleResults();
    });
  }
}

/**
 * Group calculators by category
 */
function groupByCategory(calculators: ScoredEntry[]): Record<string, ScoredEntry[]> {
  return calculators.reduce<Record<string, ScoredEntry[]>>((acc, calc) => {
    if (!acc[calc.c]) {
      acc[calc.c] = [];
    }
    acc[calc.c].push(calc);
    return acc;
  }, {});
}

/**
 * Create category section HTML
 */
function createCategorySection(categoryName: string, calculators: ScoredEntry[]): HTMLDivElement {
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
function createCalculatorCard(calc: IndexEntry): HTMLAnchorElement {
  const card = document.createElement('a');
  card.href = `/calculators/${calc.s}`;
  card.className = 'calc-card';

  // Add popular badge if applicable
  if (calc.p) {
    const badge = document.createElement('div');
    badge.className = 'calc-card-badge';
    badge.textContent = '🔥 Popular';
    card.appendChild(badge);
  }

  // Card icon
  const icon = document.createElement('div');
  icon.className = 'calc-card-icon';
  icon.textContent = calc.i || '🔢';

  // Card content container
  const content = document.createElement('div');
  content.className = 'calc-card-content';

  // Title
  const title = document.createElement('h4');
  title.className = 'calc-card-title';
  title.textContent = calc.t;

  // Description
  const description = document.createElement('p');
  description.className = 'calc-card-description';
  description.textContent = calc.sd || calc.d;

  // Category tag
  const categoryTag = document.createElement('span');
  categoryTag.className = 'calc-card-category';
  categoryTag.textContent = getCategoryName(calc.c);

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

/** The input the visible suggestion dropdown belongs to, for repositioning. */
let suggestionAnchor: HTMLInputElement | null = null;

/**
 * Display search suggestions dropdown
 */
function displaySearchSuggestions(results: ScoredEntry[], inputElement: HTMLInputElement): void {
  // Remove any existing suggestions
  hideSearchSuggestions();

  if (results.length === 0) return;

  const dropdown = document.createElement('div');
  dropdown.className = 'search-suggestions';
  dropdown.id = 'search-suggestions';

  results.forEach(calc => {
    const suggestion = document.createElement('a');
    suggestion.href = `/calculators/${calc.s}`;
    suggestion.className = 'suggestion-item';

    const icon = document.createElement('span');
    icon.className = 'suggestion-icon';
    icon.textContent = calc.i || '🔢';

    const content = document.createElement('div');
    content.className = 'suggestion-content';

    const title = document.createElement('div');
    title.className = 'suggestion-title';
    title.textContent = calc.t + (calc.p ? " 🔥" : '');

    const categoryRow = document.createElement('div');
    categoryRow.className = 'suggestion-category-div';

    const category = document.createElement('div');
    category.className = 'suggestion-category';
    category.textContent = getCategoryName(calc.c);
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

  document.body.appendChild(dropdown);

  // The dropdown is positioned against the document, so it has to follow the
  // input when the page scrolls or reflows instead of being left behind.
  suggestionAnchor = inputElement;
  positionSuggestions();
  window.addEventListener('scroll', positionSuggestions, { passive: true });
  window.addEventListener('resize', positionSuggestions, { passive: true });
}

function positionSuggestions(): void {
  const dropdown = document.getElementById('search-suggestions');
  if (!dropdown || !suggestionAnchor) return;
  const inputRect = suggestionAnchor.getBoundingClientRect();
  dropdown.style.position = 'absolute';
  dropdown.style.top = `${inputRect.bottom + window.scrollY}px`;
  dropdown.style.left = `${inputRect.left + window.scrollX}px`;
  dropdown.style.width = `${inputRect.width}px`;
}

/**
 * Show search suggestions
 */
function showSearchSuggestions(e: FocusEvent): void {
  const target = e.target as HTMLInputElement;
  const query = target.value.trim();
  if (query.length < 2) return;

  const token = ++suggestionToken;
  loadIndex()
    .then(() => {
      if (token !== suggestionToken) return;
      displaySearchSuggestions(searchCalculators(query, 5), target);
    })
    .catch(() => {});
}

/**
 * Hide search suggestions
 */
function hideSearchSuggestions(): void {
  // Invalidate any in-flight suggestion render so a late index fetch can't
  // re-open the dropdown after it was dismissed.
  suggestionToken++;
  const existingSuggestions = document.getElementById('search-suggestions');
  if (existingSuggestions) {
    existingSuggestions.remove();
  }
  suggestionAnchor = null;
  window.removeEventListener('scroll', positionSuggestions);
  window.removeEventListener('resize', positionSuggestions);
}

/** Shared markup for the "nothing to show" states on the search page. */
function renderSearchPlaceholder(
  icon: string,
  heading: string,
  body: string,
  tagsHeading: string,
  tags: string[],
): void {
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;

  resultsContainer.innerHTML = `
    <div class="no-results">
      <div class="no-results-icon">${icon}</div>
      <h2>${heading}</h2>
      <p>${body}</p>
      <div class="suggestions">
        <h3>${tagsHeading}</h3>
        <div class="suggestion-tags">
          ${tags
            .map(
              tag =>
                `<a href="/search?q=${encodeURIComponent(tag.toLowerCase())}" class="suggestion-tag">${tag}</a>`,
            )
            .join('')}
        </div>
      </div>
      <a href="/calculators" class="btn btn-primary">Browse All Calculators</a>
    </div>
  `;
}

/**
 * Display no results message
 */
function displayNoResults(query: string): void {
  renderSearchPlaceholder(
    '🔍',
    `No calculators found for "${escapeHtml(query)}"`,
    'Try different keywords or browse our categories below:',
    'Popular Searches:',
    ['Mortgage', 'BMI', 'Loan', 'Calorie', 'Interest', 'Budget'],
  );
}

/**
 * Display no query message
 */
function displayNoQuery(): void {
  const resultsCount = document.getElementById('results-count');
  if (resultsCount) resultsCount.textContent = '';
  renderSearchPlaceholder(
    '🔎',
    'Start Your Search',
    'Enter a search term to find the calculator you need.',
    'Try searching for:',
    ['Mortgage', 'BMI', 'Loan', 'Retirement', 'Weight', 'Investment'],
  );
}

/**
 * Shown when the search index can't be fetched (offline, deploy in flight).
 * Browsing still works, so point at the directory rather than dead-ending.
 */
function displayIndexError(query: string): void {
  const resultsCount = document.getElementById('results-count');
  if (resultsCount) resultsCount.textContent = '';
  renderSearchPlaceholder(
    '⚠️',
    "Search is unavailable right now",
    `We couldn't load the calculator list to search for "${escapeHtml(query)}". Check your connection and try again, or browse by category.`,
    'Browse instead:',
    ['Mortgage', 'BMI', 'Loan', 'Budget'],
  );
}

/**
 * Show search error
 */
function showSearchError(message: string): void {
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
function getCategoryName(categoryId: string): string {
  return index?.categories[categoryId] || categoryId;
}

/**
 * Debounce function for performance
 */
function debounce<Args extends unknown[]>(func: (...args: Args) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Args) {
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
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
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
function trackSearch(query: string, resultsCount: number): void {
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
export { searchCalculators, getCategoryName, loadIndex };
