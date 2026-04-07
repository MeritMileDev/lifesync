import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.store('menuState', {
    isMenuOpened: false,
  });

  Alpine.data('menu', () => ({
    selected: null as null | string,
    breakpoint: 1279,
    showAccount: false,
    timeout: null as ReturnType<typeof setTimeout> | null,
    activeSubcategory: 1,
    

    debounce(func: (...args: any[]) => void, wait: number, event: Event): void {
      if ((event.type === 'mouseenter' || event.type === 'mouseover') && window.innerWidth < this.breakpoint) return;
      const later = () => {
        this.timeout = null;
        func.call(this, event);
      };

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(later, wait);
    },

    toggleSelected(event: Event, index: string) {
      if (event.type === 'mouseover' && window.innerWidth < this.breakpoint)
        return;
      if (event.type === 'click' && window.innerWidth > this.breakpoint) return;

      this.selected = this.selected !== index ? index : null;
    },

    menuOut(event: Event) {
      if (event.type === 'mouseleave' && window.innerWidth < this.breakpoint)
        return;

      this.selected = null;
      this.activeSubcategory = 1;
    },

    resetMenu() {
      this.returnScroll();
      this.selected = null;
      this.$store.menuState.isMenuOpened = false;
    },

    removeScroll() {
      this.$store.modal.openModal();
    },

    returnScroll() {
      this.$store.modal.closeModal();
      this.selected = null;
    },
  }));
};
