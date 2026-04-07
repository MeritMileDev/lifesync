import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.data('counter', () => ({
    isActivated: false,

    init() {
      const counter = this.$el as Element;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.isActivated = true;
        } else if (this.isActivated) {
          this.isActivated = false;
        }
      });

      observer.observe(counter);
    },
  }));
};
