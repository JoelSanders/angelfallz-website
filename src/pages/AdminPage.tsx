import { useState, useEffect } from 'react';

interface AdminPageProps {
  isDark: boolean;
}

const AdminPage = ({ isDark }: AdminPageProps) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [prelaunchEnabled, setPrelaunchEnabled] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchPrelaunchStatus();
    }
  }, []);

  const fetchPrelaunchStatus = async () => {
    try {
      const response = await fetch('/api/prelaunch/status');
      const data = await response.json();
      setPrelaunchEnabled(data.enabled);
    } catch (e) {
      console.error('Failed to fetch prelaunch status', e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Temporary hardcoded password - will be replaced with Supabase later
    const TEMP_PASSWORD = 'admin123';
    
    if (password === TEMP_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
      fetchPrelaunchStatus();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const togglePrelaunch = async () => {
    const newStatus = !prelaunchEnabled;
    
    try {
      const response = await fetch('/api/prelaunch/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          enabled: newStatus,
          password: 'admin123' 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPrelaunchEnabled(newStatus);
        // Reload to apply changes across the site
        setTimeout(() => window.location.href = '/', 500);
      } else {
        alert('Failed to toggle prelaunch mode');
      }
    } catch (e) {
      alert('Error toggling prelaunch mode');
      console.error(e);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}>
        <div className={`w-full max-w-md p-8 rounded-lg border ${
          isDark 
            ? 'bg-zinc-900 border-zinc-800' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <h1 className={`text-2xl font-bold mb-6 text-center ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Admin Access
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded border ${
                  isDark
                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-black placeholder-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter password"
                autoFocus
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded font-medium transition-colors ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Login
            </button>
          </form>
          
          <p className={`mt-4 text-xs text-center ${
            isDark ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Temporary password: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 pb-20 px-4 ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              isDark
                ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-black'
            }`}
          >
            Logout
          </button>
        </div>

        <div className={`p-6 rounded-lg border ${
          isDark 
            ? 'bg-zinc-900 border-zinc-800' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Prelaunch Settings
          </h2>
          
          <p className={`mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Control the prelaunch email signup page. When enabled, visitors will see an email 
            signup form instead of the main website.
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className={`font-medium ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              Prelaunch Mode: {prelaunchEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              prelaunchEnabled
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
            }`}>
              {prelaunchEnabled ? 'Active' : 'Inactive'}
            </span>
          </div>

          <button
            onClick={togglePrelaunch}
            className={`w-full py-3 px-4 rounded font-medium transition-colors ${
              prelaunchEnabled
                ? isDark
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
                : isDark
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {prelaunchEnabled ? 'Disable Prelaunch Mode' : 'Enable Prelaunch Mode'}
          </button>
        </div>

        <div className={`mt-6 p-4 rounded border ${
          isDark
            ? 'bg-blue-900/20 border-blue-800'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <p className={`text-sm ${
            isDark ? 'text-blue-200' : 'text-blue-800'
          }`}>
            <strong>Note:</strong> Password authentication will be connected to Supabase in a future update.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

