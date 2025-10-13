import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
  onCartOpen: () => void;
}

export default function Navigation({ isDark, toggleTheme, onCartOpen }: NavigationProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { cartCount } = useCart();

  const menuItems = [
    { label: 'SHOP', path: '/shop' },
    { label: 'COLLECTIONS', path: '/collections' },
    { label: 'ABOUT', path: '/about' }
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
              <Link 
                to="/"
                className="text-2xl font-bold tracking-wider animate-fade-in cursor-pointer hover:opacity-60 transition-opacity"
              >
                ANGELFALLZ
              </Link>
            </div>

            {/* Center Menu */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onMouseEnter={() => setActiveMenu(item.label)}
                  className={`text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-60 ${
                    activeMenu === item.label ? 'opacity-60' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
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
                className="relative text-sm font-medium tracking-wide transition-opacity hover:opacity-60"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dropdown Menu (if needed) */}
      {activeMenu && (
        <div
          onMouseLeave={() => setActiveMenu(null)}
          className={`fixed top-[80px] left-0 right-0 z-40 transition-all duration-300 ${
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

