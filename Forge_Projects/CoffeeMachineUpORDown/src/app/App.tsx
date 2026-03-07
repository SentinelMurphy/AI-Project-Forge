import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { RepairsPage } from './components/RepairsPage';
import { StatusPage } from './components/StatusPage';
import { LoginSignup } from './components/LoginSignup';
import { getMe } from './utils/api';


export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleAuthenticate = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (!token) return;

  getMe(token)
    .then((me) => {
      setUser({ name: me.email, email: me.email });
      setIsAuthenticated(true);
    })
    .catch(() => {
      setUser(null);
      setIsAuthenticated(false);
    });
}, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard />;
      case 'repairs':
        return <RepairsPage />;
      case 'status':
        return <StatusPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isAuthenticated={isAuthenticated}
        user={user}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />
      {renderPage()}
      <LoginSignup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onAuthenticate={handleAuthenticate}
      />
  </div>
  );
}
