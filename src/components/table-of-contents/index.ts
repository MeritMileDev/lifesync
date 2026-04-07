import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.data('tableOfContents', () => ({
    tocItems: [] as { id: string; text: string }[],
    headerHeight: 0,
    tocTopOffset: 0,
    isFixed: false,
    titleHeight: 0,
    isOpen: false,

    init() {
      this.headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const tocTitle = document.querySelector('[data-sidebar-title]');
      if (tocTitle) {
        this.tocTopOffset = tocTitle.getBoundingClientRect().top + window.scrollY;
        this.titleHeight = tocTitle.offsetHeight;
        this.$refs.blur.style.top = `${this.tocTopOffset + this.titleHeight - window.scrollY}px`;
      }
    },

    generateTOC() {
      this.$nextTick(() => {
        const headings = document.querySelectorAll<HTMLHeadingElement>('.page-content h2, .page-content h3, .page-content h4, .page-content h5, .page-content h6');
        let index = 1;

        headings.forEach((el) => {
          if (!el.id) {
            const id = `heading${index++}`;
            el.id = id;
            this.tocItems.push({ id, text: el.textContent || '' });
          }
        });

        this.$nextTick(() => {


          window.addEventListener('scroll', this.handleScroll.bind(this));
        });
      });
    },

    handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      this.$refs.blur.style.top = `${this.tocTopOffset + this.titleHeight - window.scrollY}px`
      if (scrollTop > this.tocTopOffset - this.headerHeight) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },

    scrollToHeading(id: string) {
      const target = document.getElementById(id);
      if (target) {
        const offsetPosition = target.offsetTop - this.headerHeight - this.titleHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    },

    hasItems() {
      return this.tocItems.length > 0;
    }
  }));
};
