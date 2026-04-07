import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.store('stickyHeader', {
    active: false,
    forceSticky: false,
  });

  Alpine.data('stickyHeader', () => ({
    distanceToHeader: { top: 0, bottom: 0 },
    sticky: false,
    breakpoint: '(max-width: 1279px)',

    trigger: {
      ['@resize.window'](): void {
        const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

        this.init();
      },
    },

    init() {
      if (this.$refs.top_header) {
        this._getDistanceToHeader(this.$refs.top_header);
      }

      if (window.scrollY > this.distanceToHeader.top) {
        this.sticky = true;
      }
    },

    detectScroll(scrollY: number) {
      if (this.$store.modal.isOpen) return;
      if (scrollY <= this.distanceToHeader.top) {
        this.$store.stickyHeader.active = false;
        this.sticky = false;
      } else if (scrollY > this.distanceToHeader.top) {
        this.sticky = true;
        this.$store.stickyHeader.active = true;
      }
    },

    _getDistanceToHeader(element: HTMLElement) {
      this.distanceToHeader.top = element ? element.offsetHeight : 0;
    },
  }));
};
