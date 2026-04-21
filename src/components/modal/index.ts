import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {

  Alpine.data('modalPopup', () => ({
    isOpen: false,
    popupId: null as null | string,

    openPopup(id: string) {
      this.$store.stickyHeader.forceSticky = this.$store.stickyHeader.active;
      this.$store.modal.openModal();

      this.popupId = id;
      this.isOpen = true;
    },

    closePopup() {
      this.$store.stickyHeader.forceSticky = this.$store.stickyHeader.active;
      this.$store.modal.closeModal();

      this.popupId = null;
      this.isOpen = false;
    },

    isPopupOpen(id: string) {
      return this.isOpen && this.popupId === id;
    },
  }));
};