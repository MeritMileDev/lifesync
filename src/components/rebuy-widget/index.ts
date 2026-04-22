import { RebuyProduct } from '@/types';
import { Alpine as AlpineType } from 'alpinejs';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types/swiper-options';

type Label = {
  text: string;
  text_color: string;
  background_color: string;
};

type Labels = Record<string | number, Label>;

export default (Alpine: AlpineType) => {
  Alpine.data(
    'rebuyWidget',
    (data: {
      widgetId: string;
      slidesQtyForDesktop: number;
      labels: Labels;
      isSearchPage: boolean;
    }) => ({
      widgetId: data.widgetId as string,
      labels: data.labels,
      slider: null as null | Swiper,
      isSearchPage: data.isSearchPage,
      title: '' as string,
      products: [] as RebuyProduct[],
      isVisibleNavigation: false as boolean,
      isVisiblePagination: false as boolean,
      initialized: false,
      config: {
        loop: false,
        slidesPerView: 1.4,
        spaceBetween: 16,
        navigation: {
          nextEl: `#rebuy-widget-${data.widgetId} .products-slider-next`,
          prevEl: `#rebuy-widget-${data.widgetId} .products-slider-prev`,
        },
        scrollbar: {
          el: `#rebuy-widget-${data.widgetId} .swiper-scrollbar`,
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: data.isSearchPage ? 5 : data.slidesQtyForDesktop,
          },
        },
      } as SwiperOptions,

      async init() {
        if (window?.Rebuy) {
          const currentWidget = window.Rebuy?.widgets?.find(
            widget => widget.id === this.widgetId
          );
          if (currentWidget?.status == 'ready') {
            this.initialized = true;
            this.products = currentWidget?.data.products.map(
              (product: RebuyProduct) => {
                if (product?.metafields?.custom?.product_label) {
                  const metafieldHandle =
                    product.metafields.custom.product_label.split('/').pop();
                  if (metafieldHandle && this.labels[Number(metafieldHandle)]) {
                    product.label = this.labels[Number(metafieldHandle)];
                  }
                }
                return product;
              }
            );

            this.title = currentWidget?.data.config.language.title;
            if (this.products.length > 0) {
              this.initCarousel();
            }
            return;
          }
        }

        document.addEventListener('rebuy.ready', (event: RebuyWidgetEvent) => {
          if (event.detail.widget.id == this.widgetId) {
            this.initialized = true;
            this.products = event.detail.widget.data.products.map(
              (product: RebuyProduct) => {
                if (product?.metafields?.custom?.product_label) {
                  const metafieldHandle =
                    product.metafields.custom.product_label.split('/').pop();
                  if (metafieldHandle && this.labels[Number(metafieldHandle)]) {
                    product.label = this.labels[Number(metafieldHandle)];
                  }
                }
                return product;
              }
            );

            this.title = event.detail.widget.data.config.language.title;
            if (this.products.length > 0) {
              this.initCarousel();
            }
          }
        });
      },

      initCarousel() {
        this.config.modules = [Pagination, Navigation, Autoplay, Scrollbar];
        this.slider = new Swiper(this.$refs.carousel, this.config);
        this.isVisibleNavigation = true;
        this.isVisiblePagination = true;
      },

      formatPrice(value: string | null): string | null {
        return value === null ? '0' : `$${parseFloat(value).toFixed(2)}`;
      },

      getLowestPrice(product: RebuyProduct) {
        const lowestPrice = product.variants.reduce(
          (acc, variant) => {
            if (acc === null || parseFloat(variant.price) < parseFloat(acc)) {
              return variant.price;
            }
            return acc;
          },
          null as string | null
        );

        return `from ${this.formatPrice(lowestPrice)}`;
      },
    })
  );
};
