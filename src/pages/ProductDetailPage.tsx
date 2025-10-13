import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shopifyService } from '../services/shopify';
import { useCart } from '../context/CartContext';
import type { ShopifyProduct, ShopifyVariant } from '../types/shopify';

interface ProductDetailPageProps {
  isDark: boolean;
}

export default function ProductDetailPage({ isDark }: ProductDetailPageProps) {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (handle) {
      loadProduct(handle);
    }
  }, [handle]);

  const loadProduct = async (productHandle: string) => {
    setIsLoading(true);
    try {
      const fetchedProduct = await shopifyService.getProductByHandle(productHandle);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        // Select first available variant
        const firstAvailable = fetchedProduct.variants.find(v => v.availableForSale) || fetchedProduct.variants[0];
        setSelectedVariant(firstAvailable);
      }
    } catch (error) {
      console.error('Error loading product:', error);
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

  const formatPrice = (amount: string, currencyCode: string) => {
    const price = parseFloat(amount);
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
    }).format(price);
  };

  // Get unique option names (e.g., Size, Color)
  const getOptionNames = () => {
    if (!product) return [];
    const optionNames = new Set<string>();
    product.variants.forEach(variant => {
      variant.selectedOptions.forEach(option => {
        optionNames.add(option.name);
      });
    });
    return Array.from(optionNames);
  };

  // Get unique values for an option (e.g., all sizes)
  const getOptionValues = (optionName: string) => {
    if (!product) return [];
    const values = new Set<string>();
    product.variants.forEach(variant => {
      const option = variant.selectedOptions.find(o => o.name === optionName);
      if (option) {
        values.add(option.value);
      }
    });
    return Array.from(values);
  };

  // Get selected value for an option
  const getSelectedOptionValue = (optionName: string) => {
    if (!selectedVariant) return null;
    const option = selectedVariant.selectedOptions.find(o => o.name === optionName);
    return option?.value || null;
  };

  // Handle option selection
  const handleOptionChange = (optionName: string, value: string) => {
    if (!product || !selectedVariant) return;

    // Create new selected options array
    const newSelectedOptions = selectedVariant.selectedOptions.map(option =>
      option.name === optionName ? { ...option, value } : option
    );

    // Find variant that matches all selected options
    const newVariant = product.variants.find(variant =>
      newSelectedOptions.every(selectedOption =>
        variant.selectedOptions.some(
          variantOption =>
            variantOption.name === selectedOption.name &&
            variantOption.value === selectedOption.value
        )
      )
    );

    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen pt-32 pb-20 flex items-center justify-center ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <div className="animate-pulse text-2xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen pt-32 pb-20 flex items-center justify-center ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link
            to="/shop"
            className={`px-6 py-3 text-sm font-bold tracking-wide transition-all duration-200 inline-block ${
              isDark
                ? 'bg-white text-black hover:bg-yellow-400'
                : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
            }`}
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  const currentImage = product.images[selectedImage] || product.images[0];
  const isNew = product.tags.some(tag => tag.toLowerCase() === 'new');

  return (
    <div className={`min-h-screen pt-32 pb-20 transition-colors duration-500 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className={`text-sm mb-8 flex items-center gap-2 ${
          isDark ? 'text-white/60' : 'text-black/60'
        }`}>
          <Link to="/" className="hover:opacity-60 transition-opacity">HOME</Link>
          <span>/</span>
          <Link to="/shop" className="hover:opacity-60 transition-opacity">SHOP</Link>
          <span>/</span>
          <span className={isDark ? 'text-white' : 'text-black'}>{product.title.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className={`aspect-square overflow-hidden ${
              isDark ? 'bg-white/5' : 'bg-black/5'
            }`}>
              {currentImage ? (
                <img
                  src={currentImage.src}
                  alt={currentImage.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className={`text-8xl font-bold ${
                    isDark ? 'text-white/10' : 'text-black/10'
                  }`}>
                    AF
                  </div>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
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
                <h1 className="text-4xl font-bold tracking-tight">{product.title.toUpperCase()}</h1>
                {isNew && (
                  <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold">NEW</span>
                )}
              </div>
              {selectedVariant && (
                <p className="text-2xl font-medium mb-4">
                  {formatPrice(selectedVariant.priceV2.amount, selectedVariant.priceV2.currencyCode)}
                </p>
              )}
              {product.description && (
                <p className={`text-base leading-relaxed ${
                  isDark ? 'text-white/70' : 'text-black/70'
                }`}>
                  {product.description}
                </p>
              )}
            </div>

            {/* Variant Options (Size, Color, etc.) */}
            {getOptionNames().map((optionName) => {
              const values = getOptionValues(optionName);
              const selectedValue = getSelectedOptionValue(optionName);
              
              if (values.length <= 1) return null;

              return (
                <div key={optionName}>
                  <label className="text-sm font-medium tracking-wide mb-4 block">
                    {optionName.toUpperCase()}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {values.map((value) => (
                      <button
                        key={value}
                        onClick={() => handleOptionChange(optionName, value)}
                        className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                          selectedValue === value
                            ? isDark
                              ? 'bg-white text-black'
                              : 'bg-black text-white'
                            : isDark
                              ? 'bg-white/5 hover:bg-white/10'
                              : 'bg-black/5 hover:bg-black/10'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

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

            {/* Availability Status */}
            {selectedVariant && !selectedVariant.availableForSale && (
              <div className="bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-500 text-sm">
                This variant is currently out of stock
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding || !selectedVariant?.availableForSale}
              className={`w-full py-4 text-sm font-bold tracking-wide transition-all duration-200 ${
                isDark
                  ? 'bg-white text-black hover:bg-yellow-400'
                  : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isAdding ? 'ADDING...' : selectedVariant?.availableForSale ? 'ADD TO BAG' : 'OUT OF STOCK'}
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
                  <ul className="list-disc list-inside space-y-2">
                    {product.productType && <li>Type: {product.productType}</li>}
                    {product.vendor && <li>Brand: {product.vendor}</li>}
                    {product.tags.length > 0 && (
                      <li>Tags: {product.tags.join(', ')}</li>
                    )}
                  </ul>
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

