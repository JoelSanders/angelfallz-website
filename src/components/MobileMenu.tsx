import { useNavigate } from 'react-router-dom';

interface MobileMenuProps {
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
  onCartOpen: () => void;
}

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const StoreIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v6l-3 3v9H6v-9l-3-3V3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9v0a3 3 0 003 3v0a3 3 0 003-3v0a3 3 0 003 3v0a3 3 0 003-3" />
  </svg>
);

const CollectionIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    <rect x="2" y="4" width="20" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636" />
  </svg>
);

const TShirtIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 6L3 10v11h18V10l-4-4M7 6l2-3h6l2 3M7 6h10" />
  </svg>
);

const HoodieIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6L3 10v11h4V14h10v7h4V10l-3-4M6 6l3-3h6l3 3M6 6h12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6v5M16 6v5" />
  </svg>
);

export default function MobileMenu({ isDark, isOpen, onClose, onCartOpen }: MobileMenuProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleCartClick = () => {
    onClose();
    onCartOpen();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Side Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 z-[101] transition-transform duration-300 ease-out md:hidden ${
          isDark ? 'bg-black text-white' : 'bg-white text-black'
        } ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <h2 className="text-xl font-bold tracking-wider">MENU</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <XIcon />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col p-6 space-y-1">
          {/* Cart Button */}
          <button
            onClick={handleCartClick}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg text-base font-medium tracking-wide transition-all duration-200 ${
              isDark 
                ? 'hover:bg-white/5 active:bg-white/10' 
                : 'hover:bg-black/5 active:bg-black/10'
            }`}
          >
            <ShoppingBagIcon />
            <span>BAG</span>
          </button>

          {/* Shop Button */}
          <button
            onClick={() => handleNavigation('/shop')}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg text-base font-medium tracking-wide transition-all duration-200 ${
              isDark 
                ? 'hover:bg-white/5 active:bg-white/10' 
                : 'hover:bg-black/5 active:bg-black/10'
            }`}
          >
            <StoreIcon />
            <span>SHOP</span>
          </button>

          {/* Collections Button */}
          <button
            onClick={() => handleNavigation('/collections')}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg text-base font-medium tracking-wide transition-all duration-200 ${
              isDark 
                ? 'hover:bg-white/5 active:bg-white/10' 
                : 'hover:bg-black/5 active:bg-black/10'
            }`}
          >
            <CollectionIcon />
            <span>COLLECTIONS</span>
          </button>

          {/* About Button */}
          <button
            onClick={() => handleNavigation('/about')}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg text-base font-medium tracking-wide transition-all duration-200 ${
              isDark 
                ? 'hover:bg-white/5 active:bg-white/10' 
                : 'hover:bg-black/5 active:bg-black/10'
            }`}
          >
            <InfoIcon />
            <span>ABOUT</span>
          </button>

          {/* Divider */}
          <div className={`my-4 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`} />

          {/* Categories */}
          <div className="px-4 py-2">
            <h3 className={`text-xs font-semibold tracking-wider mb-3 ${
              isDark ? 'text-white/50' : 'text-black/50'
            }`}>
              CATEGORIES
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => handleNavigation('/shop')}
                className={`w-full flex items-center gap-3 px-2 py-3 rounded-lg text-sm tracking-wide transition-all duration-200 ${
                  isDark 
                    ? 'hover:bg-white/5 active:bg-white/10' 
                    : 'hover:bg-black/5 active:bg-black/10'
                }`}
              >
                <SparkleIcon />
                <span>NEW ARRIVALS</span>
              </button>
              <button
                onClick={() => handleNavigation('/shop')}
                className={`w-full flex items-center gap-3 px-2 py-3 rounded-lg text-sm tracking-wide transition-all duration-200 ${
                  isDark 
                    ? 'hover:bg-white/5 active:bg-white/10' 
                    : 'hover:bg-black/5 active:bg-black/10'
                }`}
              >
                <TShirtIcon />
                <span>TEES</span>
              </button>
              <button
                onClick={() => handleNavigation('/shop')}
                className={`w-full flex items-center gap-3 px-2 py-3 rounded-lg text-sm tracking-wide transition-all duration-200 ${
                  isDark 
                    ? 'hover:bg-white/5 active:bg-white/10' 
                    : 'hover:bg-black/5 active:bg-black/10'
                }`}
              >
                <HoodieIcon />
                <span>SWEATS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer - Social Links */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 border-t ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/angelfallz/" 
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm hover:opacity-60 transition-opacity ${
                isDark ? 'text-white/90' : 'text-black/90'
              }`}
            >
              Instagram
            </a>
            <a 
              href="#" 
              className={`text-sm hover:opacity-60 transition-opacity ${
                isDark ? 'text-white/90' : 'text-black/90'
              }`}
            >
              Twitter
            </a>
            <a 
              href="#" 
              className={`text-sm hover:opacity-60 transition-opacity ${
                isDark ? 'text-white/90' : 'text-black/90'
              }`}
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

