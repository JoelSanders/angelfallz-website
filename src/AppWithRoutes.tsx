import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ModelViewer from './components/ModelViewer';
import LiquidEther from './components/LiquidEther';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';

type Page = 'home' | 'shop' | 'product' | 'collections' | 'about';

function AppWithRoutes() {
  const [isDark, setIsDark] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');

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

  // Render different pages based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopPage isDark={isDark} />;
      case 'product':
        return <ProductDetailPage isDark={isDark} />;
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="relative h-screen overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 z-0">
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
              <div className="absolute inset-0 z-10 flex items-center justify-center pt-24">
                <div className="w-full h-full max-w-4xl">
                  <ModelViewer isDark={isDark} />
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <svg 
                  className={`w-6 h-6 ${isDark ? 'text-white/50' : 'text-black/50'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </section>

            {/* Featured Collections Section */}
            <section className={`relative py-20 transition-colors duration-500 ${
              isDark ? 'bg-black' : 'bg-white'
            }`}>
              <div className="max-w-screen-2xl mx-auto px-6">
                <h3 className="text-4xl font-bold tracking-tight mb-12 animate-slide-up">
                  FEATURED COLLECTIONS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      onClick={() => setCurrentPage('shop')}
                      className={`group relative aspect-square overflow-hidden cursor-pointer transition-all duration-300 ${
                        isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <h4 className="text-2xl font-bold mb-2">COLLECTION {item}</h4>
                          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                            Explore Now
                          </p>
                        </div>
                      </div>
                      <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                        isDark ? 'bg-white/5' : 'bg-black/5'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className={`relative py-12 border-t transition-colors duration-500 ${
              isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'
            }`}>
              <div className="max-w-screen-2xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold mb-2">ANGELFALLZ</h4>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                      Modern streetwear for the next generation
                    </p>
                  </div>
                  <div className="flex gap-6">
                    <a href="https://www.instagram.com/angelfallz/" className="text-sm hover:opacity-60 transition-opacity">Instagram</a>
                    <a href="#" className="text-sm hover:opacity-60 transition-opacity">Twitter</a>
                    <a href="#" className="text-sm hover:opacity-60 transition-opacity">TikTok</a>
                  </div>
                </div>
              </div>
            </footer>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      {/* Navigation with page navigation callbacks */}
      <Navigation 
        isDark={isDark} 
        toggleTheme={toggleTheme}
        onNavigate={setCurrentPage}
      />

      {renderPage()}
    </div>
  );
}

export default AppWithRoutes;

