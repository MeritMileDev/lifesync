import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.data('omnisend', (config: { id: string }) => ({
    formId: config.id,
    formSubmitted: false,
    showTitle: true,

    init() {
      window.addEventListener('omnisendForms', (e: Event) => {
        const event = e as CustomEvent;
        if (
          event.detail.type === 'submit' &&
          event.detail.form.id === this.formId
        ) {
          this.formSubmitted = true;
        }

        if (
          this.formSubmitted &&
          event.detail.name === 'formSubscriberIdentified'
        ) {
          this.showTitle = false;
          this.formSubmitted = false;
        }
      });
    },
  }));
};
