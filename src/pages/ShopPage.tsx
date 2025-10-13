import { useState, useEffect } from 'react';
import { shopifyService } from '../services/shopify';
import { isShopifyConfigured } from '../config/shopify';
import ProductCard from '../components/ProductCard';
import type { ShopifyProduct, ShopifyCollection } from '../types/shopify';

interface ShopPageProps {
  isDark: boolean;
}

export default function ShopPage({ isDark }: ShopPageProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    if (!isShopifyConfigured()) {
      setError('Shopify is not configured. Please check your environment variables.');
      setIsLoading(false);
      return;
    }

    try {
      const [fetchedProducts, fetchedCollections] = await Promise.all([
        shopifyService.getAllProducts(50),
        shopifyService.getAllCollections(),
      ]);

      setProducts(fetchedProducts);
      setCollections(fetchedCollections);
    } catch (err) {
      console.error('Error loading shop data:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = selectedCollection
    ? products.filter(product => 
        collections.find(c => c.id === selectedCollection)?.products.some(p => p.id === product.id)
      )
    : products;

  if (error) {
    return (
      <div className={`min-h-screen pt-32 pb-20 flex items-center justify-center ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">⚠️ {error}</h2>
          <button
            onClick={loadData}
            className={`px-6 py-3 text-sm font-bold tracking-wide transition-all duration-200 ${
              isDark
                ? 'bg-white text-black hover:bg-yellow-400'
                : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
            }`}
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 pb-20 transition-colors duration-500 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">SHOP ALL</h1>
          <p className={`text-lg ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </p>
        </div>

        {/* Collections Filter */}
        {collections.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCollection(null)}
                className={`px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 ${
                  selectedCollection === null
                    ? isDark
                      ? 'bg-white text-black'
                      : 'bg-black text-white'
                    : isDark
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-black/5 hover:bg-black/10'
                }`}
              >
                ALL
              </button>
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection.id)}
                  className={`px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 ${
                    selectedCollection === collection.id
                      ? isDark
                        ? 'bg-white text-black'
                        : 'bg-black text-white'
                      : isDark
                        ? 'bg-white/5 hover:bg-white/10'
                        : 'bg-black/5 hover:bg-black/10'
                  }`}
                >
                  {collection.title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`animate-pulse ${
                  isDark ? 'bg-white/5' : 'bg-black/5'
                }`}
              >
                <div className="aspect-square mb-4" />
                <div className={`h-4 mb-2 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                <div className={`h-4 w-20 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className={`text-xl ${isDark ? 'text-white/60' : 'text-black/60'}`}>
              No products found in this collection.
            </p>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isDark={isDark}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
