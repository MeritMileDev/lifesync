import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.store('modal', {
    isOpen: false,
    disableEvents: false,

    init() {
      window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty(
          '--scroll-y',
          `${window.scrollY}px`
        );
      });

      window.addEventListener('beforeunload', () => {
        this.disableEvents = true;
      });
    },

    openModal() {
      this.isOpen = true;
      const scrollY =
        document.documentElement.style.getPropertyValue('--scroll-y');
      const body = document.body;
      body.style.position = 'fixed';
      body.style.width = '100%';
      body.style.top = `-${scrollY}`;
    },

    closeModal() {
      if (this.disableEvents) return;
      this.isOpen = false;
      const body = document.body;
      const scrollY = body.style.top;
      body.style.position = '';
      body.style.width = '';
      body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    },
  });
};
