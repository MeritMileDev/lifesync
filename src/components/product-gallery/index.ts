import { Alpine as AlpineType } from 'alpinejs';
import Swiper from 'swiper';
import { Controller, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types/swiper-options';

export default (Alpine: AlpineType) => {
  Alpine.data('productGallery', () => ({
    slider: null as null | Swiper,
    thumbs: null as null | Swiper,
    activeSlide: null as null | number,
    isVisibleNavigation: false as boolean,
    config: {
      loop: true,
      modules: [Navigation, Thumbs, Controller, FreeMode],
      slidesPerView: 1,
      spaceBetween: 8,
    } as SwiperOptions,

    async init() {
      window.addEventListener('set-slide', (event: { detail: number }) => {
        this.activeSlide = event.detail || null;
        if (this.slider) {
          this.slider?.slideTo(event.detail);
        }
      });
      const { default: Swiper } = await import('swiper');
      this.thumbs = new Swiper(this.$refs.gallerySliderThumbs, {
        ...this.config,
        slidesPerView: 4,
        spaceBetween: 10,
        watchSlidesProgress: true,
        breakpoints: {
          1280: {
            direction: 'vertical',
            slidesPerView: 'auto',
            spaceBetween: 8,
          },
        },
      });
      this.slider = new Swiper(this.$refs.gallerySliderMain, {
        ...this.config,
        thumbs: { swiper: this.thumbs },
        navigation: {
          nextEl: '.swiper-button-next',
        },
        initialSlide: this.activeSlide || 0,
      });

      const slideCount = this.$el.querySelectorAll('.swiper-slide')
        .length as number;
      
      this.initialized = true;

      if (slideCount > 1) {
        this.visibleNavigation();
      }
    },
    
    visibleNavigation() {
      this.isVisibleNavigation = true;
    },
  }));
};
