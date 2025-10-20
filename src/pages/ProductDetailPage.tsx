import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shopifyService } from '../services/shopify';
import { useCart } from '../context/CartContext';
import type { ShopifyProduct, ShopifyVariant } from '../types/shopify';

interface ProductDetailPageProps {
  isDark: boolean;
}

export default function ProductDetailPage({ isDark }: ProductDetailPageProps) {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [handle]);

  const loadProduct = async () => {
    if (!handle) {
      setError('No product handle provided');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fetchedProduct = await shopifyService.getProductByHandle(handle);
      
      if (!fetchedProduct) {
        setError('Product not found');
        setIsLoading(false);
        return;
      }

      setProduct(fetchedProduct);
      // Select first available variant by default
      const firstAvailableVariant = fetchedProduct.variants.find(v => v.availableForSale) || fetchedProduct.variants[0];
      setSelectedVariant(firstAvailableVariant);
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Failed to load product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product || !selectedVariant || isAdding) return;
    
    setIsAdding(true);
    try {
      await addToCart(product, selectedVariant, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleVariantSelect = (variant: ShopifyVariant) => {
    setSelectedVariant(variant);
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    const price = parseFloat(amount);
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen pt-32 pb-20 flex items-center justify-center ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <div className="animate-pulse text-xl">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`min-h-screen pt-32 pb-20 flex items-center justify-center ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">⚠️ {error || 'Product not found'}</h2>
          <button
            onClick={() => navigate('/')}
            className={`px-6 py-3 text-sm font-bold tracking-wide transition-all duration-200 ${
              isDark
                ? 'bg-white text-black hover:bg-yellow-400'
                : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
            }`}
          >
            BACK TO SHOP
          </button>
        </div>
      </div>
    );
  }

  const isNew = product.tags.some(tag => tag.toLowerCase() === 'new');
  const hasMultipleImages = product.images.length > 1;
  
  // Get unique size options if variants have size
  const sizeOptions = product.variants
    .map(v => v.selectedOptions.find(opt => opt.name.toLowerCase() === 'size'))
    .filter(opt => opt !== undefined)
    .map(opt => opt!.value)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className={`min-h-screen pt-32 pb-20 transition-colors duration-500 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className={`text-sm mb-8 flex items-center gap-2 ${
          isDark ? 'text-white/60' : 'text-black/60'
        }`}>
          <button onClick={() => navigate('/')} className="hover:opacity-60 transition-opacity">HOME</button>
          <span>/</span>
          <button onClick={() => navigate('/#shop')} className="hover:opacity-60 transition-opacity">SHOP</button>
          <span>/</span>
          <span className={isDark ? 'text-white' : 'text-black'}>{product.title.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className={`aspect-square overflow-hidden ${
              isDark ? 'bg-white/5' : 'bg-black/5'
            } flex items-center justify-center`}>
              {product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage].src}
                  alt={product.images[selectedImage].altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`text-8xl font-bold ${
                  isDark ? 'text-white/10' : 'text-black/10'
                }`}>
                  AF
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {hasMultipleImages && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square cursor-pointer overflow-hidden transition-all ${
                      selectedImage === index
                        ? isDark 
                          ? 'ring-2 ring-white' 
                          : 'ring-2 ring-black'
                        : isDark 
                          ? 'opacity-60 hover:opacity-100' 
                          : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold tracking-tight">{product.title}</h1>
                {isNew && (
                  <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold">NEW</span>
                )}
              </div>
              {selectedVariant && (
                <p className="text-2xl font-medium mb-4">
                  {formatPrice(selectedVariant.priceV2.amount, selectedVariant.priceV2.currencyCode)}
                </p>
              )}
              <p className={`text-base leading-relaxed ${
                isDark ? 'text-white/70' : 'text-black/70'
              }`}>
                {product.description}
              </p>
            </div>

            {/* Variant Selection (Size/Color/etc) */}
            {product.variants.length > 1 && (
              <div className="space-y-6">
                {/* If there are size options */}
                {sizeOptions.length > 0 && (
                  <div>
                    <label className="text-sm font-medium tracking-wide mb-4 block">SIZE</label>
                    <div className="grid grid-cols-6 gap-3">
                      {sizeOptions.map((size) => {
                        const variant = product.variants.find(v => 
                          v.selectedOptions.some(opt => 
                            opt.name.toLowerCase() === 'size' && opt.value === size
                          )
                        );
                        const isSelected = selectedVariant?.id === variant?.id;
                        const isAvailable = variant?.availableForSale;

                        return (
                          <button
                            key={size}
                            onClick={() => variant && handleVariantSelect(variant)}
                            disabled={!isAvailable}
                            className={`py-3 text-sm font-medium transition-all duration-200 ${
                              isSelected
                                ? isDark
                                  ? 'bg-white text-black'
                                  : 'bg-black text-white'
                                : isDark
                                  ? 'bg-white/5 hover:bg-white/10'
                                  : 'bg-black/5 hover:bg-black/10'
                            } ${!isAvailable ? 'opacity-30 cursor-not-allowed line-through' : ''}`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* If there are other variants without size, show them as a select */}
                {sizeOptions.length === 0 && (
                  <div>
                    <label className="text-sm font-medium tracking-wide mb-4 block">VARIANT</label>
                    <select
                      value={selectedVariant?.id || ''}
                      onChange={(e) => {
                        const variant = product.variants.find(v => v.id === e.target.value);
                        if (variant) handleVariantSelect(variant);
                      }}
                      className={`w-full px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isDark
                          ? 'bg-white/5 hover:bg-white/10 text-white'
                          : 'bg-black/5 hover:bg-black/10 text-black'
                      }`}
                    >
                      {product.variants.map((variant) => (
                        <option 
                          key={variant.id} 
                          value={variant.id}
                          disabled={!variant.availableForSale}
                        >
                          {variant.title} {!variant.availableForSale ? '(Sold Out)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium tracking-wide mb-4 block">QUANTITY</label>
              <div className={`inline-flex items-center border ${
                isDark ? 'border-white/20' : 'border-black/20'
              }`}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`px-4 py-3 ${
                    isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  } transition-colors`}
                >
                  -
                </button>
                <div className="px-6 py-3 min-w-[60px] text-center">{quantity}</div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`px-4 py-3 ${
                    isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  } transition-colors`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button 
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale || isAdding}
              className={`w-full py-4 text-sm font-bold tracking-wide transition-all duration-200 ${
                isDark
                  ? 'bg-white text-black hover:bg-yellow-400'
                  : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {!selectedVariant?.availableForSale 
                ? 'SOLD OUT' 
                : isAdding 
                  ? 'ADDING...' 
                  : 'ADD TO BAG'}
            </button>

            {/* Product Details */}
            <div className={`border-t pt-8 space-y-6 ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium tracking-wide">
                  PRODUCT DETAILS
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={`mt-4 text-sm ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                  {product.productType && <p className="mb-2"><strong>Type:</strong> {product.productType}</p>}
                  {product.vendor && <p className="mb-2"><strong>Vendor:</strong> {product.vendor}</p>}
                  {product.tags.length > 0 && (
                    <div className="mt-3">
                      <strong>Tags:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.tags.map(tag => (
                          <span key={tag} className={`px-2 py-1 text-xs ${
                            isDark ? 'bg-white/10' : 'bg-black/10'
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium tracking-wide">
                  SHIPPING & RETURNS
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={`mt-4 text-sm ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                  <p className="mb-2">Free standard shipping on orders over £100.</p>
                  <p>Free returns within 30 days of purchase.</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

