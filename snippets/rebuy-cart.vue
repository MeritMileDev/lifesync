<div id="rebuy-cart" class="rebuy-cart" v-cloak="" :class="[
    visible ? 'is-visible' : '',
    'currency-' + currency(),
    hasItems() ? 'has-items' : 'no-items'
  ]" role="dialog" aria-modal="true" aria-labelledby="rebuy-cart-title" :aria-hidden="!visible ? 'true' : 'false'">
<div class="rebuy-cart__flyout">
  <div data-rebuy-cart-anchor="header">
    <div data-rebuy-cart-header-top="">
      <div data-rebuy-cart-header-top-inner="">
        <component :is="getCartTitleHeadingTag()" id="rebuy-cart-title" data-rebuy-component-id="title_bar"
                   data-rebuy-component="title-bar" :class="['rebuy-cart__title', getCartTitleClassName()]"
                   v-html="getCartTitle()"></component>
      </div>

      <button id="rebuy-cart-close" class="rebuy-cart__flyout-close" type="button" v-on:click="hide()"
              aria-label="Close Cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M7.26911 8L3.5 4.23089L4.23089 3.5L8 7.26911L11.7691 3.5L12.5 4.23089L8.73089 8L12.5 11.7691L11.7691 12.5L8 8.73089L4.23089 12.5L3.5 11.7691L7.26911 8Z"
                fill="currentColor" />
        </svg>
        <span class="sr-only">Close Cart</span>
      </button>

    </div>
  </div>
  <div data-rebuy-cart-anchor="goalBox" style="display: none;"></div>
  <div data-rebuy-cart-scroll-area="">
    <div data-rebuy-cart-anchor="body">
      <div data-rebuy-component="cart-items" data-rebuy-component-id="cart_items">
        <ul v-if="hasItems()" data-smartcart-items="" tabindex="0" role="group">
          <li class="rebuy-cart__flyout-item" v-for="item in items()" v-if="!isHiddenItem(item)" :key="item.key"
              v-bind:class="[ 'product-' + item.handle, itemProductTagsClasses(item), itemPropertyClasses(item) ]"
              aria-label="product">
            <!-- Image -->
            <div class="rebuy-cart__flyout-item-media">
              <a v-bind:href="itemURL(item)" tabindex="-1">
                <img v-bind:src="item.image ? sizeImage(item.image, '240x240') : '/cdn/shop/files/placeholder.jpg?v=1738238492'" v-bind:alt="item.featured_image?.alt">
              </a>
            </div>

            <!-- Item Info -->
            <div class="rebuy-cart__flyout-item-info">
              <!-- Product Title -->
              <a role="heading" aria-level="5" class="rebuy-cart__flyout-item-product-title" v-bind:href="itemURL(item)"
                 v-html="item.product_title" v-bind:alt="'View ' + item.product_title"></a>

              <!-- Variant Title -->
              <div class="rebuy-cart__flyout-item-variant-title"
                   v-if="item.variant_title">Options: <span v-html="item.variant_title"></span></div>

              <!-- Discount Message -->
              <div class="rebuy-cart__flyout-item-discount-message" v-if="hasLineItemDiscount(item)"
                   v-html="lineItemDiscountMessage(item)"></div>

              <!-- Item Properties -->
              <div class="rebuy-cart__flyout-item-properties" v-if="hasItemProperties(item)">
                <div class="rebuy-cart__flyout-item-property rebuy-cart__flyout-item-property--delivery-frequency"
                     v-if="itemDeliveryFrequency(item)" v-html="itemDeliveryFrequency(item)"></div>
                <div class="rebuy-cart__flyout-item-property" v-for="property in itemProperties(item)"
                     v-bind:class="[ itemPropertyKeyClass(property), itemPropertyValueClass(property) ]">
                  <span class="rebuy-cart__flyout-item-property-name" v-html="property.key"></span>
                  <span class="rebuy-cart__flyout-item-property-separator">
              :
            </span>
                  <span class="rebuy-cart__flyout-item-property-value" v-html="property.value"></span>
                </div>
              </div>

              <!-- Remove Item -->
              <button class="rebuy-cart__flyout-item-remove" type="button" v-bind:alt="'Remove ' + item.product_title"
                      v-bind:aria-label="'Remove ' + item.product_title" v-on:click="removeItem(item)">
                <i class="far" v-bind:class="[(item.status == 'removing') ? 'fa-sync-alt fa-fast-spin' : 'fa-trash']"
                   aria-hidden="true"></i>
              </button>

              <!-- Quantity -->
              <div class="rebuy-cart__flyout-item-quantity">
                <div class="rebuy-cart__flyout-item-quantity-widget"
                     v-if="hideQuantitySelectors && !hideQuantitySelectors(item)">
                  <button class="rebuy-cart__flyout-item-quantity-widget-button"
                          v-bind:disabled="item.quantity <= 1"
                          v-bind:alt="'Decrease quantity of ' + item.product_title"
                          v-bind:aria-label="'Decrease quantity of ' + item.product_title"
                          v-on:click="decreaseItem(item)" type="button">
                    <i class="far"
                       v-bind:class="[(item.status == 'decreasing') ? 'fa-sync-alt fa-fast-spin' : 'fa-minus']"
                       aria-hidden="true"></i>
                  </button>

                  <span class="rebuy-cart__flyout-item-quantity-widget-label">
              <span class="sr-only">Quantity of {{ item.product_title }}</span>
              {{ item.quantity }}
            </span>

                  <button class="rebuy-cart__flyout-item-quantity-widget-button"
                          v-bind:alt="'Increase quantity of ' + item.product_title"
                          v-bind:aria-label="'Increase quantity of ' + item.product_title"
                          v-on:click="increaseItem(item)" type="button">
                    <i class="far"
                       v-bind:class="[(item.status == 'increasing') ? 'fa-sync-alt fa-fast-spin' : 'fa-plus']"
                       aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <!-- Pricing -->
              <div class="rebuy-cart__flyout-item-price">
                <div v-if="itemHasDiscount(item)">
            <span class="rebuy-money sale">
              <span class="sr-only">Sale price</span>
              <span v-html="formatMoney(itemPrice(item))"></span>
            </span>
                  <span class="rebuy-money compare-at">
              <span class="sr-only">Original price</span>
              <span v-html="formatMoney(compareAtPrice(item))"></span>
            </span>
                </div>
                <div v-if="!itemHasDiscount(item)">
            <span class="rebuy-money">
              <span class="sr-only">Price</span>
              <span v-html="formatMoney(itemPrice(item))"></span>
            </span>
                </div>
              </div>

              <!-- Bundle Details -->
              <div class="rebuy-cart__flyout-item-bundle" v-if="itemIsBundle(item) && !hideBundleOptions(item)">

                <!-- Expand / Collapse Bundle Details -->
                <button v-if="itemBundleLength(item) > 0" class="rebuy-cart__flyout-item-bundle-toggle-button"
                        v-on:click="toggleActiveBundle(item)" type="button"
                        v-bind:alt="(isBundleVisible(item) ? 'Collapse' : 'Expand') + ' bundle of ' + item.product_title"
                        v-bind:aria-label="(isBundleVisible(item) ? 'Collapse' : 'Expand') + ' bundle of ' + item.product_title">
                  {{ isBundleVisible(item) ? 'Hide' : 'Show' }}
                  <span v-html="itemBundleLength(item)"></span>
                  items
                  <span class="rebuy-cart__flyout-bundle-chev-icon">
              <i v-bind:class="['fas', isBundleVisible(item) ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
            </span>
                </button>

                <ul class="rebuy-cart__flyout-item-bundle-children"
                    v-if="itemBundleLength(item) > 0 && isBundleVisible(item)" tabindex="0">
                  <li class="rebuy-cart__flyout-item-bundle-child" v-for="(option, index) in item.options_with_values">
                    <div class="rebuy-cart__flyout-item-bundle-child-left">
                      <div class="rebuy-cart__flyout-item-bundle-image-container">
                        <img v-bind:src="getBundleOptionImage(item.product, option, index)"
                             v-bind:alt="childBundleTitle(option)" class="rebuy-cart__flyout-item-bundle-image">
                      </div>
                    </div>

                    <div class="rebuy-cart__flyout-item-bundle-child-right">
                      <h5 v-html="childBundleTitle(option)" class="rebuy-cart__flyout-item-bundle-title"></h5>
                      <p v-html="option.value" class="rebuy-cart__flyout-item-bundle-value"></p>
                    </div>
                  </li>
                  <ul>
                  </ul>
                </ul>
              </div>
              <!-- End Bundle Details -->

            </div>
            <!-- End Info -->

            <!-- Buy More Save More -->
            <div v-if="itemHasBMSM(item) && bMSMFinalTierNotReached(item)"
                 class="rebuy-cart__flyout-item-buy-more-save-more">
              <div v-if="hasBMSMButtons()" class="rebuy-cart__flyout-item-buy-more-save-more-container">
                <div v-for="tier in getBMSMTiers()" class="rebuy-cart__flyout-item-buy-more-save-more-button-container"
                     v-if="tier.quantity > item.quantity">
                  <button v-on:click="adjustBMSMQuantity(item, tier)"
                          class="rebuy-button rebuy-cart__flyout-item-buy-more-save-more-button"
                          v-bind:alt="getBMSMButtonText(tier)">
                    <span v-html="getBMSMButtonText(tier)"></span>
                  </button>
                </div>
              </div>

              <span v-if="!hasBMSMButtons()" class="rebuy-cart__flyout-buy-more-save-more-dynamic-message-text"
                    v-html="buyMoreSaveMoreDynamicText(item)"></span>
            </div>
            <!-- End Buy More Save More -->

            <!-- Switch to Subscription -->
            <div class="rebuy-cart__flyout-item-subscription" v-if="hasSwitchToSubscription(item)">
              <button class="rebuy-button outline"
                      v-if="!item.product.subscription || item.status == 'downgrading' || item.status == 'upgrading'"
                      v-bind:alt="'Switch ' + item.product_title + ' to a Subscription'"
                      v-bind:disabled="(item.status == 'downgrading' || item.status == 'upgrading')"
                      v-on:click="updateItemDeliveryFrequency(item, selectedSubscriptionFrequency(item, 0), 'onetime')"
                      type="button">
                <span v-html="switchToSubscriptionLabel(item)"></span>
              </button>

              <select class="rebuy-select muted" aria-label="Subscription delivery frequency"
                      v-if="item.product.subscription && item.status != 'downgrading'"
                      v-model="item.product.subscription_frequency" v-on:change="updateItemDeliveryFrequency(item)">
                <optgroup v-if="!item.product.is_subscription_only && !subscriptionDowngradeDisabled()"
                          v-bind:label="getSwitchToSubscriptionLabel('onetime_option_group_label')">
                  <option v-bind:value="'onetime'"
                          v-html="getSwitchToSubscriptionLabel('onetime_option_label')"></option>
                </optgroup>
                <optgroup v-bind:label="subscriptionOptionGroupLabel(item)">
                  <option v-for="frequency in subscriptionFrequencies(item)" v-bind:value="frequency"
                          v-html="subscriptionOptionLabel(item, frequency, item.product.subscription_interval)"></option>
                </optgroup>
              </select>
            </div>
            <!-- End Switch to Subscription -->

          </li>
        </ul>

        <!-- Empty Cart -->
        <div class="rebuy-empty-cart" v-if="!hasItems()">
          <div class="rebuy-empty-cart__image">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0453 0.829019L14.6667 0H49.3333L50.9547 0.829019L59.6214 12.829L60 14V62L58 64H6L4 62V14L4.37864 12.829L13.0453 0.829019ZM15.6893 4L9.91151 12H54.0885L48.3107 4H15.6893ZM56 16H8V60H56V16ZM22.4444 24V36H41.5556V24H45.5556V38L43.5556 40H20.4444L18.4444 38V24H22.4444Z" fill="#3C4C5F" fill-opacity="0.2"/>
            </svg>
          </div>
          <div class="rebuy-empty-cart__title">Your cart is empty</div>
          <div class="rebuy-empty-cart__description">
            <p>You don't have any items in your cart.</p>
            <p>Start shopping or sign in to see your saved items.</p>
          </div>
          <div class="rebuy-empty-cart__actions">
            <a href="/collections/all" class="rebuy-empty-cart__button">Shop all</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div data-rebuy-cart-anchor="footer">
    <div data-rebuy-component="cross-sell-widget" data-rebuy-component-id="147a5781-d001-4831-89d8-d808a791c1ae">
      <div :data-rebuy-id="getWidgetIdByComponentId('147a5781-d001-4831-89d8-d808a791c1ae')"></div>
    </div>
    <div v-if="hasItems()" data-rebuy-component="cart-subtotal" data-rebuy-component-id="cart_subtotal"
         class="rebuy-cart__flyout-subtotal">
      <div class="rebuy-cart__flyout-subtotal-label">
        <span v-html="subtotalLabel()"></span>
      </div>
      <div class="rebuy-cart__flyout-subtotal-amount" v-html="subtotal()"></div>
    </div>

    <div v-show="hasItems()" data-rebuy-component="checkout-area" data-rebuy-component-id="checkout">


      <div class="rebuy-cart__flyout-terms" v-if="hasTermsEnabled()">
        <input class="rebuy-cart__flyout-terms-checkbox rebuy-checkbox" id="rebuy-terms-checkbox"
               name="rebuy-terms-checkbox" type="checkbox" v-model="termsAccepted" v-on:click="updateTermsCheck()">
        <label class="rebuy-cart__flyout-terms-label" for="rebuy-terms-checkbox"
               v-html="getCheckoutSettings().language.terms_and_conditions_label"></label>
      </div>


      <button v-show="hasCheckoutButton()" class="rebuy-button rebuy-cart__checkout-button block" type="button"
              v-on:click="checkout()" v-bind:disabled="hasTermsEnabled() && !hasAcceptedTerms()">
        <span v-html="checkoutLabel()"></span>
      </button>


      <button v-if="hasViewCartButton()" class="rebuy-button rebuy-cart__view-cart-button block"
              v-bind:class="{'outline': hasCheckoutButton()}" type="button" v-on:click="viewCart()">
        <span v-html="viewCartLabel()"></span>
      </button>


      <button v-if="hasContinueShoppingButton()" class="rebuy-button rebuy-cart__continue-shopping-button block outline"
              type="button" v-on:click="hide()">
        <span v-html="continueShoppingLabel()"></span>
      </button>


      <button v-if="hasShopPayButton()" class="rebuy-button rebuy-cart__shop-pay-button block"
              v-on:click="shopPayCheckout()" aria-label="Checkout with Shop Pay" v-html="shopPaySvg">
      </button>

      <div data-rebuy-cart-additional-checkout-buttons=""></div>

      <div class="rebuy-cart__flyout-installments" v-html="installmentsMessage()"></div>

      <div v-if="hasPrePurchase()" :data-rebuy-id="prePurchaseWidgetId()"></div>

    </div>
  </div>
</div>


<div class="rebuy-cart__background" v-on:click="hide()"></div>
<div id="rebuy-cart-live-region" class="sr-only" aria-live="polite"></div>
</div>
<script setup lang="ts">
</script>
