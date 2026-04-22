import { Alpine as AlpineType } from 'alpinejs';
import type { ProductData } from '~/types';
import { Config, ResponseError, fetcher } from '~/utils';

export default (Alpine: AlpineType) => {
  Alpine.data('cart', (productId: string) => ({
    added: false,
    loading: false,
    disabled: false,
    error: false,
    errorMessage: '',
    productId: null as null | string,
    productsData: {} as ProductData,
    is_selling_plan_allocations: false as boolean,
    productAgreement: true as boolean,
    formData: {
      quantity: 1,
      productId: null,
      selling_plan_id: null,
    },

    init() {
      window.addEventListener('update-cart', ({ detail }) => {
        this.updateCartItem(
          detail.cartLine,
          detail.quantity,
          detail.isMinicart
        );
      });

      this.productId = productId;

      if (this.productId !== null && this.productId !== undefined) {
        const productsData = document.querySelector(
          `[x-ref="product-data-${this.productId}"]`
        ) as HTMLScriptElement;

        this.productsData = JSON.parse(productsData.innerText);

        if (this.productsData.selling_plan_allocations.length !== 0) {
          this.is_selling_plan_allocations = true;
        }
      }

      this.setAgreements();

      this.$watch('productAgreement', value => {
        this.cacheProductAgreement(value);
      });
    },

    setHeightMinicart(showMinicart: boolean) {
      const minicartHeaderHeight = this.$refs.minicartHeader.offsetHeight;
      const minicartFooterHeight = this.$refs.minicartFooter.offsetHeight;

      if (showMinicart) {
        this.$refs.minicartItems.style.height = `calc(100dvh - ${minicartHeaderHeight}px - ${minicartFooterHeight}px)`;
      }
    },

    async add(): Promise<void> {
      this.loading = true;
      this.disabled = true;

      try {
        const response = await this._addToCart();

        this.successHandler(response);
      } catch (error) {
        if (error instanceof ResponseError) {
          console.error(
            `${error.response.statusText} (${error.response.status}): ${error.message}`
          );
          this.errorMessage =
            error.message == 'Cart Error'
              ? 'Sorry, something went wrong there'
              : error.message;
        }

        this.$dispatch('set-product-error', this.errorMessage);
        this._errorHandler();
      }
    },

    async _addToCart(): Promise<Response> {
      return await fetcher(Config.routes.cart_add_url, {
        ...Config.fetchConfig(),
        body: JSON.stringify({
          items: [
            {
              id: this.formData.productId,
              quantity: this.formData.quantity,
              ...(this.formData.selling_plan_id
                ? { selling_plan: this.formData.selling_plan_id }
                : {}),
            },
          ],
          sections: `header`,
        }),
      });
    },

    async updateCartItem(
      cartLine: number,
      quantity: number,
      isMinicart: boolean
    ): Promise<void> {
      if (quantity < 1) {
        return;
      }

      try {
        const response = await this._updateCartItem(cartLine, quantity);
        this.successHandler(response, isMinicart);
      } catch (error) {
        if (error instanceof ResponseError) {
          this.$dispatch('notice', {
            type: 'error',
            text: `${error.response.statusText} (${error.response.status}): ${error.message}`,
          });
        }

        this._errorHandler();
      }
    },

    async removeCartItem(cartLine: number, isMinicart: boolean): Promise<void> {
      try {
        const response = await this._updateCartItem(cartLine, 0);
        this.successHandler(response, isMinicart);
        Alpine.store('wishlistData').updateWishlist();
      } catch (error) {
        if (error instanceof ResponseError) {
          this.$dispatch('notice', {
            type: 'error',
            text: `${error.response.statusText} (${error.response.status}): ${error.message}`,
          });
        }

        this._errorHandler();
      }
    },

    getCartSectionId(): string {
      const cartSectionElement = document.querySelector('.section-cart');

      if (cartSectionElement) {
        let cartSectionId = cartSectionElement.getAttribute('id');
        if (cartSectionId) {
          return cartSectionId.replace('shopify-section-', '');
        }
        return '';
      }
    },

    getDrawerCartSectionId(): string {
      const cartSectionElement = document.querySelector('.section-drawer-cart');

      if (cartSectionElement) {
        let cartSectionId = cartSectionElement.getAttribute('id');
        if (cartSectionId) {
          return cartSectionId.replace('shopify-section-', '');
        }
        return '';
      }
    },

    async _updateCartItem(
      cartLine: number,
      quantity: number
    ): Promise<Response> {
      const payload = {
        line: cartLine,
        quantity: quantity,
        sections: `${this.getCartSectionId()},header`,
      };

      return await fetcher(Config.routes.cart_change_url, {
        ...Config.fetchConfig(),
        body: JSON.stringify(payload),
      });
    },

    async changeSubscription(
      selling_plan_id: number,
      cartLine: number,
      quantity: number,
      isMinicart: boolean
    ): Promise<void> {
      try {
        const response = await this._changeSubscription(
          selling_plan_id,
          cartLine,
          quantity
        );
        this.successHandler(response, isMinicart);
      } catch (error) {
        if (error instanceof ResponseError) {
          this.$dispatch('notice', {
            type: 'error',
            text: `${error.response.statusText} (${error.response.status}): ${error.message}`,
          });
        }

        this._errorHandler();
      }
    },

    async _changeSubscription(
      selling_plan_id: number,
      cartLine: number,
      quantity: number
    ): Promise<void> {
      const payload = {
        line: cartLine,
        selling_plan: selling_plan_id,
        quantity: quantity,
        sections: `${this.getCartSectionId()},header`,
      };

      return await fetcher(Config.routes.cart_change_url, {
        ...Config.fetchConfig(),
        body: JSON.stringify(payload),
      });
    },

    async successHandler(
      response: Response,
      isMinicart: boolean
    ): Promise<void> {
      const data = await response.json();
      const selectorCount = '[data-cart-count]';
      const container = document.getElementById(
        `shopify-section-${this.getCartSectionId()}`
      );

      if (container)
        Alpine.morph(container, data.sections[this.getCartSectionId()]);

      const drawer = document.getElementById(
        `shopify-section-${this.getDrawerCartSectionId()}`
      );

      if (drawer)
        Alpine.morph(drawer, data.sections[this.getDrawerCartSectionId()]);

      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(
        data.sections.header,
        'text/html'
      );
      const desiredElement = htmlDocument.querySelector(selectorCount);
      if (desiredElement) {
        document.querySelector(selectorCount).innerHTML =
          desiredElement.innerHTML;
      }

      this.formData.quantity = 1;
      this.added = true;
      this.loading = false;

      setTimeout(() => {
        this.added = false;
        this.disabled = false;

        if (isMinicart) {
          this.setHeightMinicart(true);
        }
      }, 2000);
    },

    _errorHandler(): void {
      this.formData.quantity = 1;
      this.loading = false;
      this.disabled = false;
    },

    setAgreements() {
      const productAgreementData = this.getProductAgreementFromCache();

      if (
        !productAgreementData ||
        productAgreementData?.productId !== this.productId
      ) {
        this.cacheProductAgreement(true);
      } else {
        this.productAgreement = productAgreementData.value;
      }
    },

    cacheProductAgreement(value: boolean) {
      sessionStorage.setItem(
        'productAgreementId',
        JSON.stringify({ productId: this.productId, value: value })
      );
      this.productAgreement = value;
    },

    getProductAgreementFromCache() {
      const productAgreement = sessionStorage.getItem('productAgreementId');
      return productAgreement ? JSON.parse(productAgreement) : null;
    },
  }));
};
