import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import MobileMenu from './components/MobileMenu';
import ModelViewer from './components/ModelViewer';
import LiquidEther from './components/LiquidEther';
import Cart from './components/Cart';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  const [isDark, setIsDark] = useState(false); // Default to light mode
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const lightColors = ['#FF6B9D', '#C44569', '#FFC312'];
  const darkColors = ['#6B5FFF', '#B388FF', '#E040FB', '#7C4DFF'];

  const HomePage = () => (
    <>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Animated Background - pointer-events-none to allow scrolling on mobile */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LiquidEther
            colors={isDark ? darkColors : lightColors}
            mouseForce={28}
            cursorSize={120}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.6}
            autoIntensity={2.8}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            className="opacity-40"
          />
        </div>

        {/* 3D Model */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full max-w-4xl pointer-events-auto">
            <ModelViewer isDark={isDark} />
          </div>
        </div>

        {/* Bottom Content - Branding and Social Links */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-12 pointer-events-none">
          <div className="max-w-screen-2xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-2xl md:text-3xl font-bold mb-2 tracking-wider">ANGELFALLZ</h4>
                <p className={`text-sm md:text-base ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                  Modern streetwear for the next generation
                </p>
              </div>
              <div className="flex gap-6 pointer-events-auto">
                <a 
                  href="https://www.instagram.com/angelfallz/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm md:text-base hover:opacity-60 transition-opacity ${
                    isDark ? 'text-white/90' : 'text-black/90'
                  }`}
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <ShopPage isDark={isDark} />
    </>
  );

  return (
    <Router>
      <CartProvider>
        <div className={`min-h-screen transition-colors duration-500 ${
          isDark ? 'bg-black text-white' : 'bg-white text-black'
        }`}>
          {/* Navigation */}
          <Navigation 
            isDark={isDark} 
            toggleTheme={toggleTheme}
            onCartOpen={() => setIsCartOpen(true)}
            onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          />

          {/* Mobile Menu */}
          <MobileMenu
            isDark={isDark}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onCartOpen={() => setIsCartOpen(true)}
          />

          {/* Cart Sidebar */}
          <Cart 
            isDark={isDark} 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
          />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:handle" element={<ProductDetailPage isDark={isDark} />} />
            <Route path="/about" element={<div className="pt-32 pb-20 text-center">About/Contact page coming soon</div>} />
            <Route path="/terms" element={<div className="pt-32 pb-20 text-center">Terms & Conditions page coming soon</div>} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;

