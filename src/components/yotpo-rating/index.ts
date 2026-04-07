import { Alpine as AlpineType } from 'alpinejs';
type BottomlineResponse = {
  status: {
    code: number;
    message: string;
  };
  response: {
    bottomline: {
      average_score: number;
      total_reviews: number;
    };
  };
};

export default (Alpine: AlpineType) => {
  Alpine.store('ProductRating', {
    totalReviews: 0
  });
  
  Alpine.data('yotpoRating', (productId: string, yotpoApiKey: string) => ({
    yotpoApiKey,
    productId,
    averageScore: 0,
    totalReviews: 0,

    async init() {
      try {
        const data = await this.fetchProductBottomline(
          this.yotpoApiKey,
          this.productId
        );
        this.averageScore = data?.response?.bottomline?.average_score ?? 0;
        this.totalReviews = data?.response?.bottomline?.total_reviews ?? 0;
        this.$store.ProductRating.totalReviews = this.totalReviews;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchProductBottomline(
      key: string,
      productId: string
    ): Promise<BottomlineResponse | null> {
      const url = `https://api-cdn.yotpo.com/products/${key}/${productId}/bottomline`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Fetch error:', error);
        return null;
      }
    }
  }));
};
