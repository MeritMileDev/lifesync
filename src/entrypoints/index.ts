import { CustomerAddresses } from '~/components/customer';
import { UserInteractionEvents } from '../types';

const init = async () => {
  const { default: Alpine } = await import('alpinejs');
  const { default: Menu } = await import('~/components/menu');
  const { default: StickyHeader } = await import('~/components/sticky-header');
  const { default: ModalPopup } = await import('~/components/modal');
  const { default: Modal } = await import('~/components/stores/modal');
  const { default: QuickSearch } = await import('~/components/quick-search');
  const { default: YotpoRating } = await import('~/components/yotpo-rating');
  const { default: Swiper } = await import('~/components/swiper');
  const { default: VideoInitialization } = await import(
    '~/components/video/index'
  );
  const { default: morph } = await import('@alpinejs/morph');
  const { default: Wishlist } = await import('~/components/wishlist');
  const { default: tableOfContents } = await import(
    '~/components/table-of-contents'
  );
  const { default: miniCart } = await import('~/components/minicart');
  const { default: Difference } = await import('~/components/difference');
  const { default: RebuyWidget } = await import('~/components/rebuy-widget');

  if (document.querySelector('[x-data*="facets"]')) {
    const { default: Facets } = await import('~/components/facets/index');

    Alpine.plugin(Facets);
  }

  if (document.querySelector('[x-data*="productGallery"]')) {
    const { default: ProductGallery } = await import(
      '~/components/product-gallery'
    );

    Alpine.plugin(ProductGallery);
  }

  if (document.querySelector('[x-data*="productGallery"]')) {
    const { default: ProductGallery } = await import(
      '~/components/product-gallery'
    );

    Alpine.plugin(ProductGallery);
  }

  if (document.querySelector('[x-data*="cart"]')) {
    const { default: Cart } = await import('~/components/cart');

    Alpine.plugin(Cart);
  }

  if (document.querySelector('[x-data*="counter"]')) {
    const { default: Counter } = await import('~/components/counter');

    Alpine.plugin(Counter);
  }

  if (document.querySelector('[x-data*="variants"]')) {
    const { default: Variants } = await import('~/components/variants');

    Alpine.plugin(Variants);
  }

  if (document.querySelector('[x-data*="omnisend"]')) {
    const { default: Omnisend } = await import('~/components/omnisend-form');

    Alpine.plugin(Omnisend);
  }

  Alpine.plugin(Menu);
  Alpine.plugin(StickyHeader);
  Alpine.plugin(ModalPopup);
  Alpine.plugin(Modal);
  Alpine.plugin(QuickSearch);
  Alpine.plugin(YotpoRating);
  Alpine.plugin(Swiper);
  Alpine.plugin(VideoInitialization);
  Alpine.plugin(morph);
  Alpine.plugin(Wishlist);
  Alpine.plugin(tableOfContents);
  Alpine.plugin(miniCart);
  Alpine.plugin(Difference);
  Alpine.plugin(RebuyWidget);

  if (window.template === 'customers/addresses') {
    new CustomerAddresses();
  }

  Alpine.start();
  window.Alpine = Alpine;
};

const timeout = setTimeout(() => {
  _eventHandler();
}, 800);

const _eventHandler = () => {
  clearTimeout(timeout);

  Object.values(UserInteractionEvents).forEach(event =>
    document.removeEventListener(event, _eventHandler, {
      capture: true,
    })
  );

  init();
};

const _addEventListeners = (event: UserInteractionEvents) => {
  document.addEventListener(event, _eventHandler, {
    capture: true,
  });
};

Object.values(UserInteractionEvents).forEach(event => {
  _addEventListeners(event);
});
