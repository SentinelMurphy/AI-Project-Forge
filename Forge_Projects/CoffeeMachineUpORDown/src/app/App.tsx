import { useState } from 'react';
import { Header } from '@/app/components/Header';
import { Dashboard } from '@/app/components/Dashboard';
import { RepairsPage } from '@/app/components/RepairsPage';
import { StatusPage } from '@/app/components/StatusPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

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
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}
