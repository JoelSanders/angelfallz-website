import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { ShopifyProduct } from '../types/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
  isDark: boolean;
}

export default function ProductCard({ product, isDark }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const image = product.images[0];
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;
  
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);

  // Check if product is new (has "new" tag)
  const isNew = product.tags.some(tag => tag.toLowerCase() === 'new');

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding || !product.availableForSale) return;
    
    setIsAdding(true);
    try {
      // Add first available variant
      const firstVariant = product.variants.find(v => v.availableForSale) || product.variants[0];
      await addToCart(product, firstVariant, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link 
      to={`/product/${product.handle}`}
      className="group relative cursor-pointer block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden mb-4">
        {image ? (
          <img
            src={image.src}
            alt={image.altText || product.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
        ) : (
          <div className={`w-full h-full transition-all duration-500 ${
            isDark ? 'bg-white/5' : 'bg-black/5'
          } ${isHovered ? 'scale-105' : 'scale-100'}`}>
            <div className="w-full h-full flex items-center justify-center">
              <div className={`text-6xl font-bold ${
                isDark ? 'text-white/10' : 'text-black/10'
              }`}>
                AF
              </div>
            </div>
          </div>
        )}
        
        {/* Badge */}
        {isNew && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 text-xs font-bold">
            NEW
          </div>
        )}
        {!product.availableForSale && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-xs font-bold">
            SOLD OUT
          </div>
        )}

        {/* Quick Add Overlay */}
        {product.availableForSale && (
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          } ${isDark ? 'bg-black/60' : 'bg-white/60'}`}>
            <button 
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={`px-6 py-3 text-sm font-bold tracking-wide transition-all duration-200 ${
                isDark 
                  ? 'bg-white text-black hover:bg-yellow-400' 
                  : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isAdding ? 'ADDING...' : 'QUICK ADD'}
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium tracking-wide uppercase">{product.title}</h3>
        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>{formattedPrice}</p>
      </div>
    </Link>
  );
}

