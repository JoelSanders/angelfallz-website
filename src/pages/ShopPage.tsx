import { useState } from 'react';
import ProductCard from '../components/ProductCard';

interface ShopPageProps {
  isDark: boolean;
}

export default function ShopPage({ isDark }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    'ALL',
    'NEW ARRIVALS',
    'TEES',
    'SWEATS',
    'OUTERWEAR',
    'DENIM',
    'ACCESSORIES'
  ];

  const products = [
    { id: 1, name: 'REVERSIBLE PUFFER JACKET', price: '£175.00 GBP', image: '', badge: 'NEW' },
    { id: 2, name: 'THE WEATHERBOY RAIN JACKET', price: '£145.00 GBP', image: '' },
    { id: 3, name: 'INDIGO BONKERS DENIM', price: '£95.00 GBP', image: '' },
    { id: 4, name: 'CAMO WAFFLE LONG SLEEVE', price: '£65.00 GBP', image: '', badge: 'SALE' },
    { id: 5, name: 'CARGO PANTS - OLIVE', price: '£85.00 GBP', image: '' },
    { id: 6, name: 'PROTECT VARSITY TEE', price: '£45.00 GBP', image: '', badge: 'NEW' },
    { id: 7, name: 'WIDE LEG DENIM - BLACK', price: '£105.00 GBP', image: '' },
    { id: 8, name: 'GRAFFITI GRAPHIC TEE', price: '£40.00 GBP', image: '', badge: 'NEW' },
    { id: 9, name: 'OVERSIZED HOODIE', price: '£85.00 GBP', image: '' },
    { id: 10, name: 'TRACK PANTS - NAVY', price: '£75.00 GBP', image: '' },
    { id: 11, name: 'VARSITY JACKET', price: '£165.00 GBP', image: '', badge: 'SALE' },
    { id: 12, name: 'UTILITY VEST', price: '£95.00 GBP', image: '' },
  ];

  return (
    <div className={`min-h-screen pt-32 pb-20 transition-colors duration-500 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">SHOP ALL</h1>
          <p className={`text-lg ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            {products.length} Products
          </p>
        </div>

        {/* Category Filter */}
        <div className={`mb-12 pb-6 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs font-medium tracking-wider transition-all duration-200 pb-2 ${
                  selectedCategory === category
                    ? `border-b-2 ${isDark ? 'border-white' : 'border-black'}`
                    : `${isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort & Filter Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className={`text-sm font-medium flex items-center gap-2 ${
              isDark ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'
            } transition-colors`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              FILTER
            </button>
          </div>
          
          <select className={`text-sm font-medium bg-transparent border px-4 py-2 ${
            isDark ? 'border-white/20 text-white' : 'border-black/20 text-black'
          }`}>
            <option value="featured">FEATURED</option>
            <option value="low-high">PRICE: LOW TO HIGH</option>
            <option value="high-low">PRICE: HIGH TO LOW</option>
            <option value="new">NEWEST</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

