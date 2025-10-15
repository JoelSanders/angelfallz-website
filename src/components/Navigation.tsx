import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
  onCartOpen: () => void;
  onMobileMenuOpen: () => void;
}

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default function Navigation({ isDark, toggleTheme, onCartOpen, onMobileMenuOpen }: NavigationProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const menuItems = ['SHOP', 'COLLECTIONS', 'ABOUT'];
  const categories = [
    'NEW ARRIVALS',
    'TEES',
    'SWEATS'
  ];

  return (
    <>
      {/* Top Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isDark ? 'bg-black/80 text-white' : 'bg-white/80 text-black'
      } backdrop-blur-md`}>
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 
                onClick={() => navigate('/')}
                className="text-2xl font-bold tracking-wider animate-fade-in cursor-pointer hover:opacity-60 transition-opacity"
              >
                ANGELFALLZ
              </h1>
            </div>

            {/* Center Menu */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onMouseEnter={() => setActiveMenu(item)}
                  onClick={() => {
                    if (item === 'SHOP') navigate('/shop');
                    if (item === 'COLLECTIONS') navigate('/collections');
                    if (item === 'ABOUT') navigate('/about');
                  }}
                  className={`text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-60 ${
                    activeMenu === item ? 'opacity-60' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full transition-all duration-200 hover:opacity-60"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <button 
                onClick={onCartOpen}
                className="hidden md:block text-sm font-medium tracking-wide transition-opacity hover:opacity-60"
              >
                BAG
              </button>
              {/* Mobile Menu Button */}
              <button 
                onClick={onMobileMenuOpen}
                className="md:hidden p-2 rounded-full transition-all duration-200 hover:opacity-60"
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Navigation - Desktop Only */}
        <div className={`hidden md:block border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className="max-w-screen-2xl mx-auto px-6">
            <div className="flex items-center justify-center gap-8 overflow-x-auto scrollbar-hide py-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className="text-xs font-medium tracking-wider whitespace-nowrap transition-opacity hover:opacity-60"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Dropdown Menu (if needed) */}
      {activeMenu && (
        <div
          onMouseLeave={() => setActiveMenu(null)}
          className={`fixed top-[120px] left-0 right-0 z-40 transition-all duration-300 ${
            isDark ? 'bg-black/90 text-white' : 'bg-white/90 text-black'
          } backdrop-blur-md animate-slide-down`}
        >
          <div className="max-w-screen-2xl mx-auto px-6 py-8">
            <div className="grid grid-cols-4 gap-8">
              {/* Add dropdown content here */}
              <div className="text-sm">Menu content for {activeMenu}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

