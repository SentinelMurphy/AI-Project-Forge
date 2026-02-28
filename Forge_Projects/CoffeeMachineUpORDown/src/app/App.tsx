import { useState } from 'react';
import { Header } from '@/app/components/Header';
import { Dashboard } from '@/app/components/Dashboard';
import { RepairsPage } from '@/app/components/RepairsPage';
import { StatusPage } from '@/app/components/StatusPage';
import { LoginSignup } from '@/app/components/LoginSignup';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const renderPage = () => {
    const handleAuthenticate = (userData: { name: string; email: string }) => {
  setUser(userData);
  setIsAuthenticated(true);
};

const handleLogout = () => {
  setUser(null);
  setIsAuthenticated(false);
};
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
