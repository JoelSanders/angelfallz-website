import Client from 'shopify-buy';
import { shopifyConfig } from '../config/shopify';
import type { ShopifyProduct, ShopifyCollection, ShopifyVariant } from '../types/shopify';

// Initialize Shopify Client
const client = Client.buildClient({
  domain: shopifyConfig.storeDomain,
  storefrontAccessToken: shopifyConfig.storefrontAccessToken,
});

export class ShopifyService {
  private client: any;

  constructor() {
    this.client = client;
  }

  // Fetch all products
  async getAllProducts(limit: number = 20): Promise<ShopifyProduct[]> {
    try {
      const products = await this.client.product.fetchAll(limit);
      return this.transformProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  // Fetch a single product by handle
  async getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
    try {
      const product = await this.client.product.fetchByHandle(handle);
      if (!product) return null;
      return this.transformProduct(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  // Fetch products by collection
  async getProductsByCollection(collectionId: string): Promise<ShopifyProduct[]> {
    try {
      const collection = await this.client.collection.fetchWithProducts(collectionId);
      return this.transformProducts(collection.products);
    } catch (error) {
      console.error('Error fetching collection products:', error);
      return [];
    }
  }

  // Fetch all collections
  async getAllCollections(): Promise<ShopifyCollection[]> {
    try {
      const collections = await this.client.collection.fetchAllWithProducts();
      return this.transformCollections(collections);
    } catch (error) {
      console.error('Error fetching collections:', error);
      return [];
    }
  }

  // Create a checkout
  async createCheckout() {
    try {
      return await this.client.checkout.create();
    } catch (error) {
      console.error('Error creating checkout:', error);
      return null;
    }
  }

  // Add item to checkout
  async addItemToCheckout(checkoutId: string, lineItems: Array<{ variantId: string; quantity: number }>) {
    try {
      return await this.client.checkout.addLineItems(checkoutId, lineItems);
    } catch (error) {
      console.error('Error adding items to checkout:', error);
      return null;
    }
  }

  // Update item quantity in checkout
  async updateLineItem(checkoutId: string, lineItems: Array<{ id: string; quantity: number }>) {
    try {
      return await this.client.checkout.updateLineItems(checkoutId, lineItems);
    } catch (error) {
      console.error('Error updating line items:', error);
      return null;
    }
  }

  // Remove item from checkout
  async removeLineItem(checkoutId: string, lineItemIds: string[]) {
    try {
      return await this.client.checkout.removeLineItems(checkoutId, lineItemIds);
    } catch (error) {
      console.error('Error removing line items:', error);
      return null;
    }
  }

  // Fetch checkout
  async fetchCheckout(checkoutId: string) {
    try {
      return await this.client.checkout.fetch(checkoutId);
    } catch (error) {
      console.error('Error fetching checkout:', error);
      return null;
    }
  }

  // Transform product data to our format
  private transformProduct(product: any): ShopifyProduct {
    return {
      id: product.id,
      title: product.title,
      description: product.description || '',
      handle: product.handle,
      images: product.images?.map((img: any) => ({
        id: img.id,
        src: img.src,
        altText: img.altText,
      })) || [],
      variants: product.variants?.map((variant: any) => ({
        id: variant.id,
        title: variant.title,
        priceV2: {
          amount: variant.price?.amount || variant.price || '0',
          currencyCode: variant.price?.currencyCode || 'GBP',
        },
        availableForSale: variant.available,
        selectedOptions: variant.selectedOptions || [],
        image: variant.image ? {
          id: variant.image.id,
          src: variant.image.src,
          altText: variant.image.altText,
        } : undefined,
      })) || [],
      priceRange: {
        minVariantPrice: {
          amount: product.variants?.[0]?.price?.amount || product.variants?.[0]?.price || '0',
          currencyCode: product.variants?.[0]?.price?.currencyCode || 'GBP',
        },
        maxVariantPrice: {
          amount: product.variants?.[product.variants.length - 1]?.price?.amount || 
                  product.variants?.[product.variants.length - 1]?.price || '0',
          currencyCode: product.variants?.[0]?.price?.currencyCode || 'GBP',
        },
      },
      availableForSale: product.availableForSale,
      tags: product.tags || [],
      productType: product.productType || '',
      vendor: product.vendor || '',
    };
  }

  private transformProducts(products: any[]): ShopifyProduct[] {
    return products.map(product => this.transformProduct(product));
  }

  private transformCollections(collections: any[]): ShopifyCollection[] {
    return collections.map(collection => ({
      id: collection.id,
      title: collection.title,
      description: collection.description || '',
      handle: collection.handle,
      image: collection.image ? {
        id: collection.image.id,
        src: collection.image.src,
        altText: collection.image.altText,
      } : null,
      products: this.transformProducts(collection.products || []),
    }));
  }
}

export const shopifyService = new ShopifyService();

