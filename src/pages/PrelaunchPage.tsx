import { useState } from 'react';
import LiquidEther from '../components/LiquidEther';

interface PrelaunchPageProps {
  isDark: boolean;
}

const PrelaunchPage = ({ isDark }: PrelaunchPageProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const lightColors = ['#FF6B9D', '#C44569', '#FFC312'];
  const darkColors = ['#6B5FFF', '#B388FF', '#E040FB', '#7C4DFF'];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    // Store email in localStorage for now
    const existingEmails = JSON.parse(localStorage.getItem('prelaunchEmails') || '[]');
    existingEmails.push({
      email,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('prelaunchEmails', JSON.stringify(existingEmails));

    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
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
          className="opacity-40 w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center justify-center space-y-12">
        {/* Logo */}
        <div className="w-48 md:w-64 transition-all duration-300">
          <img 
            src={isDark ? '/1A MASTER LOGOS 4 DEV-17 WHITE.png' : '/1A MASTER LOGOS 4 DEV-17 TRANSPARENT.png'}
            alt="AngelFallz"
            className="w-full h-auto"
          />
        </div>

        {/* Tagline */}
        <h1 className={`text-2xl md:text-3xl font-light tracking-wide ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Sign up to see new garms coming soon!
        </h1>

        {/* Email Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full px-6 py-4 text-center text-lg rounded-none border-2 transition-all ${
                isDark
                  ? 'bg-transparent border-white text-white placeholder-gray-400 focus:bg-white/5'
                  : 'bg-transparent border-black text-black placeholder-gray-500 focus:bg-black/5'
              } focus:outline-none`}
            />
            
            {error && (
              <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className={`w-full px-6 py-4 text-lg font-light tracking-wide rounded-none border-2 transition-all ${
                isDark
                  ? 'bg-white text-black border-white hover:bg-transparent hover:text-white'
                  : 'bg-black text-white border-black hover:bg-transparent hover:text-black'
              }`}
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="w-full max-w-md">
            <p className={`text-xl font-light ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              ✓ You're on the list
            </p>
          </div>
        )}

        {/* Instagram Link */}
        <div className="absolute bottom-8 left-0 right-0">
          <a 
            href="https://www.instagram.com/angelfallz/" 
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm tracking-wider hover:opacity-60 transition-opacity ${
              isDark ? 'text-white/80' : 'text-black/80'
            }`}
          >
            
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrelaunchPage;

