import { ProductData } from '@/types';
import { formatPrice } from '@/utils';
import { Alpine as AlpineType } from 'alpinejs';

type WishlistItem = {
  productData?: ProductData;
  du: string;
  epi: string;
  empi: string;
  lid: string;
  vi: string;
  removed?: boolean;
};

declare global {
  interface Window {
    SwymCallbacks: any[];
    _swat: any;
  }
}

export default (Alpine: AlpineType) => {
  Alpine.data('wishlist', () => ({
    wishListData: [] as WishlistItem[],
    products: [] as WishlistItem[],
    addingToCart: '',
    productsPerPage: 10,
    isLoading: false,
    isLoadingPage: false,
    isEmpty: false,
    init() {
      if (!window.SwymCallbacks) {
        window.SwymCallbacks = [];
      }
      window.SwymCallbacks.push(this.getWishlistData.bind(this));

      this.$watch('wishListData', () => {
        this.isEmpty = this.wishListData.length === 0;
      });
    },

    observeIntersection() {
      const paginationEl = this.$refs.wishlistPagination as Element;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.loadMoreProducts();
        }
      });

      observer.observe(paginationEl);
    },

    async getWishlistData() {
      this.isLoading = true;
      window._swat.fetch(async (wishlist: WishlistItem[]) => {
        const productList = wishlist.slice(0, this.productsPerPage);
        const products = await this.fetchProductData(productList);
        const removedProducts = products
          .filter(product => product.removed)
          .map(product => product.epi);
        this.wishListData = wishlist.filter(
          product => !removedProducts.includes(product.epi)
        );

        this.products = products.filter(product => !product.removed);
        this.isLoading = false;
        this.observeIntersection();
      });
    },

    async fetchProductData(wishlist: WishlistItem[]) {
      let fetchedProducts: WishlistItem[] = await Promise.all(
        wishlist.map(async listItem => {
          try {
            let response = await fetch(listItem.du.split('?')[0] + '.js');
            if (!response.ok) {
              console.error(
                `Failed to fetch product data for ${listItem.du}: ${response.statusText}`
              );
              listItem.removed = true;
              return listItem;
            }
            listItem.productData = await response.json();
          } catch (error) {
            console.error(
              `Error fetching product data for ${listItem.du}:`,
              error
            );
          }
          return listItem;
        })
      );
      return fetchedProducts.filter(product => product !== null);
    },

    async loadMoreProducts() {
      this.isLoading = true;
      const currentLength = this.products.length;
      const nextBatch = this.wishListData.slice(
        currentLength,
        currentLength + this.productsPerPage
      );
      const newProducts = await this.fetchProductData(nextBatch);
      this.products = [...this.products, ...newProducts];
      this.isLoading = false;
    },

    handleRemoveFromWishlist(product: WishlistItem) {
      this.isLoadingPage = true;
      let productData = {
        epi: product.epi,
        empi: product.empi,
        du: product.du,
      };

      let onSuccess = (deletedProduct: WishlistItem) => {
        this.wishListData = this.wishListData.filter(
          product => product.epi !== deletedProduct.epi
        );
        this.products = this.products.filter(
          product => product.epi !== deletedProduct.epi
        );
        this.isLoadingPage = false;
      };

      let onError = (error: XMLHttpRequest) => {
        console.log('Error while deleting the Product', error);
        this.isLoadingPage = false;
      };

      window._swat.deleteFromList(product.lid, productData, onSuccess, onError);
    },

    handleAddToCart(product: WishlistItem) {
      this.addingToCart = product.epi;
      window._swat.replayAddToCart(
        product,
        product.epi,
        () => {
          this.addingToCart = '';
        },
        () => {
          this.addingToCart = '';
        }
      );
    },

    getPrice(product: WishlistItem) {
      let price = null;
      if (product.vi) {
        price = product?.productData?.variants.find(
          variant => variant.title === product.vi
        )?.price;
      } else {
        price = product?.productData?.price;
      }
      return formatPrice(price || null);
    },

    getCompareAtPrice(product: WishlistItem) {
      let price = null;
      if (product.vi) {
        const variant = product?.productData?.variants.find(
          variant => variant.title === product.vi
        );
        price =
          variant?.compare_at_price &&
          variant.price === variant.compare_at_price
            ? null
            : variant?.compare_at_price;
      } else {
        price =
          product?.productData?.compare_at_price &&
          product.productData.price === product.productData.compare_at_price
            ? null
            : product?.productData?.compare_at_price;
      }

      return price ? formatPrice(price) : null;
    },
  }));
};
