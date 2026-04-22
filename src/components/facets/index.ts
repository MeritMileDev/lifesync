import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.data('facets', initialSearchParam => ({
    searchParamsPrev: '',
    initialSearchParam: initialSearchParam as string,
    isClearingFilter: false,
    filterData: [] as { html: string; url: string }[],
    isOpen: false,
    openFilter: '1',
    expandedFilter: '',
    isSubcategoriesOpen: true,
    loading: false,
    isMobile: false,

    init() {
      this.checkIsMobile();
      const currentSearchParams = new URLSearchParams(window.location.search);
      [...currentSearchParams.keys()].forEach(key => {
        if (key !== 'q') {
          currentSearchParams.delete(key);
        }
      });

      this.initialSearchParam = currentSearchParams.toString();
      this.searchParamsPrev = window.location.search.slice(1);
    },

    checkIsMobile() {
      const setIsMobile = () => {
        this.isMobile = window.matchMedia('(max-width: 1023px)').matches;
      };

      window.addEventListener('resize', setIsMobile);
      setIsMobile();
    },

    openFacets() {
      this.$store.stickyHeader.forceSticky = this.$store.stickyHeader.active;
      this.$store.modal.openModal();
      this.isOpen = true;
    },

    closeFacets() {
      this.$store.stickyHeader.forceSticky = this.$store.stickyHeader.active;
      this.$store.modal.closeModal();
      this.isOpen = false;
    },

    updateFacets(event: Event | null, force = false) {
      if (this.isMobile && !force) {
        return;
      }
      this.loading = true;
      this.onSubmitHandler(event);
    },

    onSubmitHandler(event: Event | null) {
      const sortFilterForms = document.querySelectorAll('.facet-form');

      const forms = Array.from(sortFilterForms).map(form =>
        this.createSearchParams(form)
      );

      if (this.initialSearchParam) {
        forms.push(this.initialSearchParam);
      }

      this.onSubmitForm(forms.join('&'), event);
    },

    createSearchParams(form: HTMLFormElement) {
      const formData = new FormData(form);

      return new URLSearchParams(formData as any).toString();
    },

    onSubmitForm(searchParams: string, event: Event | null) {
      window.scrollTo(0, 0);
      this.renderPage(searchParams, event);
    },

    renderPage(
      searchParams: string,
      event: Event | null,
      updateURLHash = true
    ) {
      const sections = this.getSections();

      this.searchParamsPrev = searchParams;
      sections.forEach(section => {
        const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
        const filterDataUrl = (element: { html: string; url: string }) =>
          element.url === url;

        this.filterData.some(filterDataUrl)
          ? this.renderSectionFromCache(filterDataUrl, event)
          : this.renderSectionFromFetch(url, event);
      });

      if (updateURLHash) this.updateURLHash(searchParams);
    },

    renderSectionFromCache(
      filterDataUrl: { html: string; url: string },
      event: Event
    ) {
      const html = this.filterData.find(filterDataUrl)?.html;

      if (!html) return;

      this.renderFilters(html, event);
      this.renderProductCount(html);
      this.renderProductGridContainer(html);
      this.renderActiveFilters(html);
      this.$nextTick(() => {
        this.loading = false;
      });
    },

    renderSectionFromFetch(url: string, event: Event | null) {
      fetch(url)
        .then(response => response.text())
        .then(responseText => {
          const html = responseText;
          this.filterData = [...this.filterData, { html, url }];
          this.renderFilters(html, event);
          this.renderProductCount(html);
          this.renderProductGridContainer(html);
          this.renderActiveFilters(html);
          this.$nextTick(() => {
            this.loading = false;
          });
        });
    },

    renderProductGridContainer(html: string) {
      const productGridContainer = document.getElementById(
        'ProductGridContainer'
      );
      const updatedProductGridContainer = new DOMParser()
        .parseFromString(html, 'text/html')
        .getElementById('ProductGridContainer');

      if (productGridContainer && updatedProductGridContainer) {
        productGridContainer.innerHTML = updatedProductGridContainer.innerHTML;
      }
    },

    renderProductCount(html: string) {
      const parsedHTML = new DOMParser().parseFromString(html, 'text/html');
      const count = parsedHTML.getElementById('ProductCount')?.innerHTML;
      const container = document.getElementById('ProductCount');

      if (container && count) {
        container.innerHTML = count;
      }
    },

    renderFilters(html: string, event: Event | null) {
      const facetsContainer = document.getElementById('Facets');
      const updatedFacetsContainer = new DOMParser()
        .parseFromString(html, 'text/html')
        .getElementById('Facets');

      if (facetsContainer && updatedFacetsContainer) {
        Alpine.morph(facetsContainer, updatedFacetsContainer, {});
      }
    },

    renderActiveFilters(html: string) {
      const activeFiltersContainer = document.getElementById('active-filters');
      const updatedFiltersContainer = new DOMParser()
        .parseFromString(html, 'text/html')
        .getElementById('active-filters');
      if (activeFiltersContainer && updatedFiltersContainer) {
        Alpine.morph(activeFiltersContainer, updatedFiltersContainer, {});
      }
    },

    getSections() {
      const productGrid = document.getElementById('product-grid');

      return [
        {
          section: productGrid?.dataset.id,
        },
      ];
    },

    updateURLHash(searchParams: string) {
      history.pushState(
        { searchParams },
        '',
        `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`
      );
    },
  }));
};
