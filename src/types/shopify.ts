// Shopify Types
export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  availableForSale: boolean;
  tags: string[];
  productType: string;
  vendor: string;
}

export interface ShopifyImage {
  id: string;
  src: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image?: ShopifyImage;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image: ShopifyImage | null;
  products: ShopifyProduct[];
}

export interface CartItem {
  variantId: string;
  quantity: number;
  product: ShopifyProduct;
  variant: ShopifyVariant;
}

export interface ShopifyCart {
  id: string;
  lines: CartItem[];
  checkoutUrl: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
}


