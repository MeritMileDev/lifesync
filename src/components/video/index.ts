import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.data('videoInitialization', (videoId, isEmbedded = true) => ({
    isPlaying: false,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    iframeParam: '?autoplay=1',
    get videoUrl() {
      return isEmbedded ? `${this.embedUrl}${this.iframeParam}` : videoId;
    },
    play() {
      this.isPlaying = true;

      this.$nextTick(() => {
        this.$refs.videoElement.setAttribute('src', this.videoUrl);
      });
    },
    stop() {
      this.isPlaying = false;

      this.$nextTick(() => {
        this.$refs.videoElement.setAttribute('src', '');
      });
    }
  }));
};
