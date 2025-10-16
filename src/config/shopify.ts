// Shopify Configuration
export const shopifyConfig = {
  storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'your-store.myshopify.com',
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2024-01',
};

// Validate configuration
export const isShopifyConfigured = (): boolean => {
  return !!(shopifyConfig.storeDomain && 
            shopifyConfig.storefrontAccessToken &&
            shopifyConfig.storeDomain !== 'your-store.myshopify.com');
};


