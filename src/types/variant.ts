export type ProductData = {
  available: boolean;
  compare_at_price: number | null;
  compare_at_price_max: number;
  compare_at_price_min: number;
  compare_at_price_varies: boolean;
  content: string;
  created_at: string;
  description: string;
  featured_image: string;
  handle: string;
  id: number;
  images: string[];
  media: FeaturedMedia[];
  options: string[];
  price: number;
  price_max: number;
  price_min: number;
  price_varies: boolean;
  published_at: string;
  tags: string[];
  title: string;
  type: string;
  variants: VariantData[];
  vendor: string;
};

export type VariantData = {
  inventory_management: string;
  requires_shipping: boolean;
  compare_at_price: number;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  public_title: string;
  options: string[];
  taxable: boolean;
  available: true;
  barcode: string;
  weight: number;
  title: string;
  price: number;
  name: string;
  sku: string;
  id: number;
  featured_image: FeaturedImage;
  featured_media: FeaturedMedia;
  quantity_rule: QuantityRule;
};

export type FeaturedImage = {
  variant_ids: number[];
  alt: null | string;
  created_at: string;
  product_id: number;
  updated_at: string;
  position: number;
  height: number;
  width: number;
  src: string;
  id: number;
};

export type FeaturedMedia = {
  alt: string | null;
  aspect_ratio: number;
  height: number;
  id: number;
  media_type: string;
  position: number;
  preview_image: {
    aspect_ratio: number;
    height: number;
    width: number;
    src: string;
  };
  src: string;
  width: number;
};

export type QuantityRule = {
  max: number | null;
  increment: number;
  min: number;
};
