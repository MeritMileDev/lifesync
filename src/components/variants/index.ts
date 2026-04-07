import { Alpine as AlpineType } from 'alpinejs';
import type { VariantData } from '~/types';
import { formatPrice } from '~/utils/format-price';

export default (Alpine: AlpineType) => {
  Alpine.data(
    'variants',
    (productId, optionsCount, productUrl, selectedVariantId = null) => ({
      isValid: true,
      allImages: [] as string[],
      nonVariantImages: [] as string[],
      productId: productId as string,
      optionsCount: optionsCount as number,
      productUrl: productUrl as string,
      options: {} as { [index: string]: string },
      variantData: [] as VariantData[],
      hoverImage: '',
      variantsImages: [] as { [index: string]: string }[],
      currentImages: [] as string[],
      currentVariant: {} as VariantData | {},
      availableVariants: [] as string[],
      initedSingleOptions: [] as string[],
      selectedVariantId: selectedVariantId as number | null,
      priceRange: false,
      selectedPlan: {},

      init() {
        const variantsData = document.querySelector(
          `[x-ref="variants-data-${this.productId}"]`
        ) as HTMLScriptElement;
        const variantsImages = document.querySelector(
          `[x-ref="variants-images-${this.productId}"]`
        ) as HTMLScriptElement;

        if (variantsData) {
          this.variantData = JSON.parse(variantsData.innerText);
        }

        if (variantsImages) {
          this.variantsImages = JSON.parse(variantsImages.innerText);
        }

        this.addAvailableVariants();
        // this.preselectOptions();
        this.setDefaultVariant();

        // if (this.productUrl) {
        //   this.updateURL();
        // }
      },

      preselectOptions() {
        const defaultVariant = this.variantData.find(
          variant => variant.available
        );

        if (defaultVariant?.options?.length && defaultVariant.options.length > 0) {
          defaultVariant.options.forEach((option, index) => {
            this.options[`option${index + 1}`] = option;
          });

          this.setCurrentSlide();
          this.setCurrentVariant(this.variantData);
          this.updateVariantStatuses(this.variantData);
        }
      },

      setDefaultVariant() {
        const defaultVariant = this.variantData.find(
          variant => variant.id === this.selectedVariantId
        );
        if (defaultVariant?.options?.length && defaultVariant.options.length > 0) {
          defaultVariant.options.forEach((option, index) => {
            this.options[`option${index + 1}`] = option;
          });

          this.setCurrentVariant(this.variantData);
          this.setCurrentSlide();
          this.updateVariantStatuses(this.variantData);
        }
      },

      addAvailableVariants() {
        let allOptions: string[] = [];
        const availableOptions: string[] = [];

        this.variantData.forEach(variant =>
          allOptions.push(...variant.options)
        );

        allOptions = [...new Set(allOptions)];

        allOptions.forEach((option, i) => {
          const isContains = this.variantData.filter(
            variant => variant.options.includes(option) && variant.available
          ).length;

          if (isContains) availableOptions.push(option);
        });

        this.availableVariants.push(...availableOptions);
      },

      setCurrentSlide() {
        const currentImage = this.variantsImages.find(image => {
          if (image.featured_image) {
            return !!image.featured_image[this.currentVariant?.title];
          }
        })?.featured_image[this.currentVariant?.title];
        
        if (this.allImages.length === 0) {
          this.$watch('allImages', newValue => {
            const imageIndex = newValue.findIndex(image => image === currentImage);
            this.$dispatch('set-slide', imageIndex);
          });
        }
        else {
          const imageIndex = this.allImages.findIndex(
            image => image === currentImage
          );
          this.$dispatch('set-slide', imageIndex);
        }
      },

      onVariantChange(key: string, value: string, optionName: string) {
        if (value === 'default_value') {
          this.currentVariant = {};
          return;
        }
        if (this.isDisabled(value) || this.options[key] === value) {
          return;
        }

        if (this.options[key] && this.options[key] === value) {
          delete this.options[key];
        } else {
          this.options[key] = value;
        }

        const selectedOptionsLength = Object.keys(this.options).length;

        this.options = Object.fromEntries(Object.entries(this.options).sort());
        this.setCurrentVariant(this.variantData);

        if (selectedOptionsLength) {
          this.updateVariantStatuses(this.variantData);
        } else {
          this.addAvailableVariants();
        }
        this.setCurrentSlide();

        if (this.productUrl) {
          this.updateURL();
        }
      },

      setCurrentVariant(data: VariantData[]) {
        this.currentVariant = data.find(variant => {
          return !variant.options
            .map((option, index) => {
              return this.options[`option${index + 1}`] === option;
            })
            .includes(false);
        }) as VariantData;
      },

      updateVariantStatuses(data: VariantData[]) {
        const selectedOptions = Object.values(this.options);
        const availableOptionInputsValue: string[] = [];

        availableOptionInputsValue.push(...selectedOptions);

        data.forEach(variant => {
          for (const selectedOptionKey in this.options) {
            const variantSelectedOptionKeyValue = variant[selectedOptionKey];
            let tmpOptions = JSON.parse(JSON.stringify(this.options));

            tmpOptions[selectedOptionKey] = variantSelectedOptionKeyValue;
            tmpOptions = Object.values(tmpOptions);

            const isTmpOptionsContains = tmpOptions.every(
              (variantOption: string) => variant.options.includes(variantOption)
            );

            if (isTmpOptionsContains) {
              if (
                !availableOptionInputsValue.includes(
                  variantSelectedOptionKeyValue
                ) &&
                variant.available
              ) {
                availableOptionInputsValue.push(variantSelectedOptionKeyValue);
              }
            }
          }

          const isVariantContainsSelectedOptions = selectedOptions.every(
            selectedOption => variant.options.includes(selectedOption)
          );

          if (isVariantContainsSelectedOptions && variant.available) {
            variant.options.forEach(variantOption => {
              if (!availableOptionInputsValue.includes(variantOption)) {
                availableOptionInputsValue.push(variantOption);
              }
            });
          }
        });

        this.availableVariants = [];
        this.availableVariants.push(...availableOptionInputsValue);
      },

      updateURL() {
        const url =
          this.currentVariant && this.currentVariant.id
            ? `${this.productUrl}?variant=${this.currentVariant.id}`
            : this.productUrl;

        window.history.replaceState({}, '', url);
      },

      getLowestPrice() {
        const availableVariants = this.variantData.filter(
          variant => variant.available
        );
        if (!availableVariants || availableVariants.length === 0) {
          return 0;
        }

        let lowestPrice = availableVariants[0].price;

        availableVariants.forEach(variant => {
          if (variant.price < lowestPrice) {
            lowestPrice = variant.price;
          }
        });

        return formatPrice(lowestPrice);
      },

      getHighestPrice() {
        const availableVariants = this.variantData.filter(
          variant => variant.available
        );
        if (!availableVariants || availableVariants.length === 0) {
          return 0;
        }
        let highestPrice = availableVariants[0].price;
        availableVariants.forEach(variant => {
          if (variant.price > highestPrice) {
            highestPrice = variant.price;
          }
        });
        return formatPrice(highestPrice);
      },

      isSelected(
        productId: string,
        position: string,
        value: string,
        optionName: string
      ) {
        const optionId = `${productId}-${position}-${value}`;

        return this.options[`option${position}`] === value;
      },

      getPrice(value: number | null): string {
        if (!value) return '';

        return formatPrice(value);
      },

      isDisabled(value: string): boolean {
        return !this.availableVariants.filter(option => option === value)
          .length;
      }
    })
  );
};
