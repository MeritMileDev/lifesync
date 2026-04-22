type FeaturedImage = {
  aspect_ratio: number;
  alt: string | null;
  height: number;
  url: string;
  width: number;
};

type ProductImage = {
  admin_graphql_api_id: string;
  alt: string | null;
  created_at: string;
  height: number;
  id: number;
  metafields: any[];
  position: number;
  product_id: number;
  src: string;
  updated_at: string;
  variant_ids: any[];
  width: number;
};

type ProductOption = {
  id: number;
  name: string;
  position: number;
  product_id: number;
  values: string[];
};

type ProductVariant = {
  admin_graphql_api_id: string;
  barcode: string | null;
  compare_at_price: string;
  created_at: string;
  fulfillment_service: string;
  grams: number;
  id: number;
  image_id: number | null;
  inventory_item_id: number;
  inventory_management: string;
  inventory_policy: string;
  inventory_quantity: number;
  old_inventory_quantity: number;
  option1: string;
  option2: string | null;
  option3: string | null;
  position: number;
  price: string;
  product_id: number;
  requires_shipping: boolean;
  sku: string | null;
  taxable: boolean;
  title: string;
  updated_at: string;
  weight: number;
  weight_unit: string;
  link: string;
};

type CacheInfo = {
  loaded_options: {
    metafields: boolean;
    variant_metafields: boolean;
    selling_plans: boolean;
    shopify_selling_plans_loaded: boolean;
    presentment_prices: boolean;
  };
  cached_at_time: number;
  cache_key: string;
  cache_key_readable: string;
  shopify_selling_plans_loaded_at: number;
};

type Product = {
  admin_graphql_api_id: string;
  body_html: string;
  created_at: string;
  description: string;
  handle: string;
  id: number;
  image: ProductImage;
  images: ProductImage[];
  options: ProductOption[];
  product_type: string;
  published_at: string;
  published_scope: string;
  status: string;
  tags: string;
  template_suffix: string | null;
  title: string;
  updated_at: string;
  variant_gids: {
    admin_graphql_api_id: string;
    updated_at: string;
  }[];
  vendor: string;
  variants: ProductVariant[];
  collection_ids: any[];
  cache_info: CacheInfo;
  link: string;
  owner: number;
  selling_plan_groups: any[];
  subscription: boolean;
  selected_variant: ProductVariant;
  selected_variant_id: number;
  selected_product_id: number;
  option1: string;
  option2: string | null;
  option3: string | null;
  quantity: number;
  properties: Record<string, any>;
  reviews: Record<string, any>;
  timestamp: number;
  has_components: boolean;
};

export type CartItem = {
  id: number;
  properties: Record<string, any>;
  quantity: number;
  variant_id: number;
  key: string;
  title: string;
  price: number;
  original_price: number;
  presentment_price: number;
  discounted_price: number;
  line_price: number;
  original_line_price: number;
  total_discount: number;
  discounts: any[];
  sku: string | null;
  grams: number;
  vendor: string;
  taxable: boolean;
  product_id: number;
  product_has_only_default_variant: boolean;
  gift_card: boolean;
  final_price: number;
  final_line_price: number;
  url: string;
  featured_image: FeaturedImage;
  image: string;
  handle: string;
  requires_shipping: boolean;
  product_type: string;
  product_title: string;
  product_description: string;
  variant_title: string | null;
  variant_options: string[];
  options_with_values: {
    name: string;
    value: string;
  }[];
  line_level_discount_allocations: any[];
  line_level_total_discount: number;
  has_components: boolean;
  selling_plan_allocation?: {};
  isSellingPlanEnabled?: boolean;
  product: EnrichedProduct[];
};

export type RebuyCart = {
  increaseItem: () => void;
  decreaseItem: () => void;
  removeItem: () => void;
  enrichCart: () => void;
  subtotal: () => number;
  items: () => RebuyProduct[];
  changeItem: (
    { id, quantity }: { id: CartItem['key']; quantity: string },
    { success, error }?: { success?: (response: unknown) => void; error?: (error: unknown) => void }
  ) => void;
  switchToOneTime: (product: RebuyProduct, callBack: Function) => void;
  switchToSubscription: (product: RebuyProduct, frequency: string, callBack: Function) => void;
};

export type RebuyEvent = {
  detail: {
    cart: RebuyCart;
  };
};

export type CustomAttribute = {
  group: string;
  name: string;
  type: string;
  value: string | number | boolean;
  ownerId: string;
};

export type Image = {
  alt: string;
  url: string;
};

export type Option = {
  option: string;
  values: string[];
  position: number;
};

export type Variant = {
  productId: string;
  id: string;
  position: number;
  sku: string;
  name: string;
  description: string;
  price: string;
  compareAtPrice: number;
  visible: boolean;
  canPurchase: boolean;
  createdAt: number;
  images: Image[];
  customAttributes: CustomAttribute[];
  metafields: any[];
  rebuyMetadata: any[];
  ratings: Ratings;
  url: string;
};

export type Ratings = {
  average: number;
  count: number;
};

export type ProductMetafields = {
  [key: string]: string | number | string[] | number[]; // Adjust types as needed
};

type Variantgid = {
  admin_graphql_api_id: string;
  updated_at: string;
};

type Loadedoptions = {
  metafields: boolean;
  variant_metafields: boolean;
  selling_plans: boolean;
  shopify_selling_plans_loaded: boolean;
  presentment_prices: boolean;
};

type Cacheinfo = {
  loaded_options: Loadedoptions;
  shopify_selling_plans_loaded_at: number;
  cached_at_time: number;
  cache_key: string;
  cache_key_readable: string;
};

type Sellingplangroup = {
  id: string;
  description: string;
  name: string;
  appId: string;
  variants: number[];
  options: Option3[];
  selling_plans: Sellingplan[];
};

type Option2 = {
  name: string;
  position: number;
  value: string;
};

type Option3 = {
  id: number;
  name: string;
  position: number;
  product_id: number;
  values: string[];
};

type Priceadjustment2 = {
  order_count?: any;
  position: number;
  value_type: string;
  value: string;
};

type Sellingplan = {
  id: number;
  name: string;
  description: string;
  position: number;
  options: Option2[];
  price_adjustments: Priceadjustment2[];
};

type Sellingplanallocation = {
  price_adjustments: Priceadjustment[];
  price: number;
  compare_at_price: number;
  per_delivery_price: number;
  selling_plan_id: number;
  selling_plan_group_id: string;
};

type Priceadjustment = {
  position: number;
  price: number;
};

type Selectedvariant = {
  admin_graphql_api_id: string;
  barcode: string;
  compare_at_price: number;
  created_at: string;
  fulfillment_service: string;
  grams: number;
  id: number;
  image_id: number;
  inventory_item_id: number;
  inventory_management: string;
  inventory_policy: string;
  inventory_quantity: number;
  old_inventory_quantity: number;
  option1: string;
  option2: string;
  option3?: any;
  position: number;
  price: string;
  product_id: number;
  requires_shipping: boolean;
  sku: string;
  taxable: boolean;
  title: string;
  updated_at: string;
  weight: number;
  weight_unit: string;
  selling_plan_allocations: Sellingplanallocation[];
  link: string;
  selling_plans: Sellingplan[];
  subscription_frequencies: string[];
};

export type RebuyProduct = {
  canPurchase: boolean;
  categories: string[];
  collectionIds: any;
  compareAtPrice: number;
  createdAt: number;
  customAttributes: string[];
  description: string;
  handle: string;
  id: string;
  images: Image[];
  metafields: any;
  name: string;
  options: Option[];
  price: number;
  productType: string;
  ratings: Ratings;
  rebuyMetadata: string[];
  similarProductIds: any;
  sku: string;
  tags: any;
  updatedAt: number;
  url: string;
  variants: Variant[];
  vendor: string;
  visible: boolean;
  productMetafields: ProductMetafields;
  selling_plan_allocation?: [];
  isSellingPlanEnabled?: boolean;
  product?: EnrichedProduct;
  key: string;
  label?: any;
  currentProduct: {
    finalPrice: string | number;
  };
};

export type EnrichedProduct = {
  admin_graphql_api_id: string;
  body_html: string;
  created_at: string;
  description: string;
  handle: string;
  id: number;
  image: Image;
  images: Image[];
  options: Option[];
  product_type: string;
  published_at: string;
  published_scope: string;
  status: string;
  tags: string;
  template_suffix: string;
  title: string;
  updated_at: string;
  variant_gids: Variantgid[];
  vendor: string;
  variants: Variant[];
  collection_ids: number[];
  ratings: Ratings;
  cache_info: Cacheinfo;
  selling_plan_groups: Sellingplangroup[];
  link: string;
  owner: number;
  subscription: boolean;
  selected_variant: Selectedvariant;
  selected_variant_id: number;
  selected_product_id: number;
  option1: string;
  option2: string;
  option3?: any;
  quantity: number;
  has_subscription: boolean;
  is_subscription_only: boolean;
  subscription_discount_type: string;
  subscription_discount_amount: string;
  subscription_frequencies: string[];
  subscription_frequency: string;
  subscription_id: number;
  timestamp: number;
  has_components: boolean;
};

export type RebuyWidgetEvent = {
  detail: {
    widget: {
      id: string;
      data: {
        products: RebuyProduct[];
        config: {
          language: {
            title: string;
          };
        };
      };
    };
  };
};
