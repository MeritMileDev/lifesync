import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.data('Difference', (defaultState?: string) => ({
    state: '',
    stateMobile: defaultState || 'before',

    setState(event: MouseEvent) {
      const element = event.target as HTMLElement;
      const rect = element.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;

      this.state = mouseX < rect.width / 2 ? 'before' : 'after';
    },

    resetState() {
      this.state = '';
    },
  }));
};
