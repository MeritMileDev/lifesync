import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  interface CachedResults {
    [key: string]: string;
  }

  const SECTION_ID = 'predictive-search';

  Alpine.data('quickSearch', () => ({
    cachedResults: {} as CachedResults,
    quickSearchPaddingTop: '',
    isQuickSearchOpen: false,
    searchText: '',
    result: '',
    isLoading: false,

    init() {
      this.abortController = new AbortController();
    },

    setQuickSearchPaddingTop() {
      this.quickSearchPaddingTop =
        window.scrollY < this.$refs.top_header.scrollHeight
          ? `${this.$refs.top_header.scrollHeight - window.scrollY}px`
          : '0px';
    },

    openQuickSearch() {
      this.setQuickSearchPaddingTop();
      this.isQuickSearchOpen = true;
      this.$store?.modal?.openModal?.();
    },

    closeQuickSearch() {
      this.isQuickSearchOpen = false;
      this.searchText = '';
      this.result = '';
      this.$store?.modal?.closeModal?.();
    },

    searchProducts() {
      if (this.searchText.length < 1) {
        this.result = '';
        return;
      }

      this.setIsLoading(true);
      const searchTerm = this.searchText.trim();
      const cacheKey = searchTerm.replace(' ', '-').toLowerCase();

      if (this.cachedResults[cacheKey]) {
        this.result = this.cachedResults[cacheKey];
        this.setIsLoading(false);
        return;
      }

      this.fetchSearchResults(searchTerm, cacheKey);
    },

    setIsLoading(loading: boolean) {
      this.isLoading = loading;
    },

    async fetchSearchResults(searchTerm: string, cacheKey: string) {
      try {
        const response = await fetch(
          `${window.routes.predictive_search_url}?q=${encodeURIComponent(searchTerm)}&section_id=${SECTION_ID}`,
          { signal: this.abortController.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const text = await response.text();
        this.result = text;
        this.cachedResults[cacheKey] = text;
      } catch (error) {
        if (error?.code !== 20) {
          throw error;
        }
      } finally {
        this.setIsLoading(false);
      }
    },
  }));
};
