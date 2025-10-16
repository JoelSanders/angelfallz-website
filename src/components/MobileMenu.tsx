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

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default function MobileMenu({ isDark, isOpen, onClose, onCartOpen }: MobileMenuProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleShopClick = () => {
    // Navigate to home and scroll to shop section
    navigate('/');
    onClose();
    // Wait for navigation and menu close animation
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 300);
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
          {/* Shop Button */}
          <button
            onClick={handleShopClick}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg text-base font-medium tracking-wide transition-all duration-200 ${
              isDark 
                ? 'hover:bg-white/5 active:bg-white/10' 
                : 'hover:bg-black/5 active:bg-black/10'
            }`}
          >
            <StoreIcon />
            <span>SHOP</span>
          </button>

          {/* Bag Button */}
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

          {/* About/Contact Button */}
          <button
            onClick={() => handleNavigation('/about')}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg text-base font-medium tracking-wide transition-all duration-200 ${
              isDark 
                ? 'hover:bg-white/5 active:bg-white/10' 
                : 'hover:bg-black/5 active:bg-black/10'
            }`}
          >
            <InfoIcon />
            <span>ABOUT/CONTACT</span>
          </button>

          {/* Terms & Conditions Button */}
          <button
            onClick={() => handleNavigation('/terms')}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg text-base font-medium tracking-wide transition-all duration-200 ${
              isDark 
                ? 'hover:bg-white/5 active:bg-white/10' 
                : 'hover:bg-black/5 active:bg-black/10'
            }`}
          >
            <DocumentIcon />
            <span>T&Cs</span>
          </button>
        </div>

        {/* Footer - Social Links */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 border-t ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
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
        </div>
      </div>
    </>
  );
}

