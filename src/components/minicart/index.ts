import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.data('miniCart', () => ({
    itemsCount: 0 as number,
    init() {
      this.listenSmartCartEvents();
      this.openMiniCart();
      this.setCount();
    },

    setCount() {
      const cart = window?.Rebuy?.SmartCart;
      this.itemsCount = cart?.cart?.item_count ?? 0;
    },
    
    listenSmartCartEvents() {
      document.addEventListener('rebuy:smartcart.show', event => {
        this.$store.modal.openModal();
        const crrossSellWidgetId = event.detail.smartcart.getAllCrossSellWidgetIds()[0];
        const crossSellWidget = window.Rebuy.widgets.find(widget => widget.id == crrossSellWidgetId);
        crossSellWidget.View.carousel.options.rewind = false
      });
      document.addEventListener('rebuy:smartcart.hide', event => {
        this.$store.modal.closeModal();
      });
      document.addEventListener('rebuy:cart.change', event => {
        this.itemsCount = event?.detail?.cart?.cart?.item_count ?? 0;
      });
    },

    openMiniCart() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('viewCart')) {
        if (window?.Rebuy?.SmartCart?.show) {
          window.Rebuy.SmartCart.show();
        } else {
          document.addEventListener('rebuy:smartcart.ready', event => {
            const viewCartValue = urlParams.get('viewCart');

            if (viewCartValue === 'true') {
              event.detail.smartcart.show();
            }
          });
        }
      }
    },
  }));
};
