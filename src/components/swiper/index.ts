import { Alpine as AlpineType } from 'alpinejs';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, Scrollbar, Grid } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types/swiper-options';

export default (Alpine: AlpineType) => {
  Alpine.data('swiper', config => ({
    config: config as SwiperOptions,
    slider: null as null | Swiper,
    isVisibleNavigation: false as boolean,
    isVisiblePagination: false as boolean,

    async init() {
      const { default: Swiper } = await import('swiper');

      this.config.modules = [Pagination, Navigation, Autoplay, Scrollbar, Grid];
      this.slider = new Swiper(this.$el, this.config);
    },
  }));
};
