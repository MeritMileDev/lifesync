import { AttributeType, ElementsType, SelectorType } from '~/types';

const selectors: SelectorType = {
  customerAddresses: '[data-customer-addresses]',
  addressCountrySelect: '[data-address-country-select]',
  addressContainer: '[data-address]',
  toggleAddressButton: 'button[aria-expanded]',
  cancelAddressButton: 'button[type="reset"]',
  deleteAddressButton: 'button[data-confirm-message]',
};

const attributes: AttributeType = {
  expanded: 'aria-expanded',
  confirmMessage: 'data-confirm-message',
};

export class CustomerAddresses {
  private elements: ElementsType;

  constructor() {
    this.elements = this._getElements();
    if (Object.keys(this.elements).length === 0) return;
    this._setupCountries();
    this._setupEventListeners();
  }

  private _getElements(): ElementsType {
    const container = document.querySelector(selectors.customerAddresses) as HTMLElement;
    return container
      ? {
          container,
          addressContainer: container.querySelector(selectors.addressContainer) as HTMLElement,
          toggleButtons: document.querySelectorAll(selectors.toggleAddressButton),
          cancelButtons: container.querySelectorAll(selectors.cancelAddressButton),
          deleteButtons: container.querySelectorAll(selectors.deleteAddressButton),
          countrySelects: container.querySelectorAll(selectors.addressCountrySelect),
        }
      : {};
  }

  private _setupCountries(): void {
    if (Shopify && Shopify.CountryProvinceSelector) {
      new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
        hideElement: 'AddressProvinceContainerNew',
      });
      this.elements.countrySelects.forEach(select => {
        const formId = (select as HTMLSelectElement).dataset.formId;
        new Shopify.CountryProvinceSelector(`AddressCountry_${formId}`, `AddressProvince_${formId}`, {
          hideElement: `AddressProvinceContainer_${formId}`,
        });
      });
    }
  }

  private _setupEventListeners(): void {
    this.elements.toggleButtons.forEach(element => {
      element.addEventListener('click', this._handleAddEditButtonClick);
    });
    this.elements.cancelButtons.forEach(element => {
      element.addEventListener('click', this._handleCancelButtonClick);
    });
    this.elements.deleteButtons.forEach(element => {
      element.addEventListener('click', this._handleDeleteButtonClick);
    });
  }

  private _toggleExpanded(target: HTMLElement): void {
    target.setAttribute(attributes.expanded, (target.getAttribute(attributes.expanded) === 'false').toString());
  }

  private _handleAddEditButtonClick = ({ currentTarget }: { currentTarget: HTMLElement }): void => {
    this._toggleExpanded(currentTarget);
  };

  private _handleCancelButtonClick = ({ currentTarget }: { currentTarget: HTMLElement }): void => {
    this._toggleExpanded(
      currentTarget.closest(selectors.addressContainer)!.querySelector(`[${attributes.expanded}]`) as HTMLElement
    );
  };

  private _handleDeleteButtonClick = ({ currentTarget }: { currentTarget: HTMLElement }): void => {
    if (confirm(currentTarget.getAttribute(attributes.confirmMessage)!)) {
      Shopify.postLink(currentTarget.dataset.target!, {
        parameters: { _method: 'delete' },
      });
    }
  };
}
