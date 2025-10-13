import { useState } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  badge?: string;
  isDark: boolean;
}

export default function ProductCard({ name, price, image, badge, isDark }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden mb-4">
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
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 text-xs font-bold">
            {badge}
          </div>
        )}

        {/* Quick Add Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } ${isDark ? 'bg-black/60' : 'bg-white/60'}`}>
          <button className={`px-6 py-3 text-sm font-bold tracking-wide transition-all duration-200 ${
            isDark 
              ? 'bg-white text-black hover:bg-yellow-400' 
              : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
          }`}>
            QUICK ADD
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium tracking-wide uppercase">{name}</h3>
        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>{price}</p>
      </div>
    </div>
  );
}

