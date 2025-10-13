import { useState } from 'react';

interface ProductDetailPageProps {
  isDark: boolean;
}

export default function ProductDetailPage({ isDark }: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className={`min-h-screen pt-32 pb-20 transition-colors duration-500 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className={`text-sm mb-8 flex items-center gap-2 ${
          isDark ? 'text-white/60' : 'text-black/60'
        }`}>
          <a href="#" className="hover:opacity-60 transition-opacity">HOME</a>
          <span>/</span>
          <a href="#" className="hover:opacity-60 transition-opacity">SHOP</a>
          <span>/</span>
          <span className={isDark ? 'text-white' : 'text-black'}>REVERSIBLE PUFFER JACKET</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className={`aspect-square ${
              isDark ? 'bg-white/5' : 'bg-black/5'
            } flex items-center justify-center`}>
              <div className={`text-8xl font-bold ${
                isDark ? 'text-white/10' : 'text-black/10'
              }`}>
                AF
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`aspect-square cursor-pointer ${
                    isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
                  } transition-colors`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold tracking-tight">REVERSIBLE PUFFER JACKET</h1>
                <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold">NEW</span>
              </div>
              <p className="text-2xl font-medium mb-4">£175.00 GBP</p>
              <p className={`text-base leading-relaxed ${
                isDark ? 'text-white/70' : 'text-black/70'
              }`}>
                Stay warm and stylish with our reversible puffer jacket. Features two looks in one with contrasting colors. Premium insulation keeps you cozy in any weather. Modern fit with adjustable hood.
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium tracking-wide">SIZE</label>
                <button className={`text-xs underline ${
                  isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
                } transition-colors`}>
                  SIZE GUIDE
                </button>
              </div>
              <div className="grid grid-cols-6 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? isDark
                          ? 'bg-white text-black'
                          : 'bg-black text-white'
                        : isDark
                          ? 'bg-white/5 hover:bg-white/10'
                          : 'bg-black/5 hover:bg-black/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

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
            <button className={`w-full py-4 text-sm font-bold tracking-wide transition-all duration-200 ${
              isDark
                ? 'bg-white text-black hover:bg-yellow-400'
                : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
            }`}>
              ADD TO BAG
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
                    <li>Reversible design with two color options</li>
                    <li>Premium synthetic insulation</li>
                    <li>Water-resistant outer shell</li>
                    <li>Adjustable drawstring hood</li>
                    <li>Multiple zip pockets</li>
                    <li>Regular fit</li>
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

