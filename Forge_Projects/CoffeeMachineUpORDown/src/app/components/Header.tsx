import { Coffee } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#EE0000] text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Coffee className="size-8" />
            <h1 className="text-xl">Coffee Machine Up or Down</h1>
          </div>
          <nav className="flex gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'home'
                  ? 'bg-white text-[#EE0000]'
                  : 'hover:bg-[#CC0000]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('repairs')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'repairs'
                  ? 'bg-white text-[#EE0000]'
                  : 'hover:bg-[#CC0000]'
              }`}
            >
              Repairs
            </button>
            <button
              onClick={() => onNavigate('status')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'status'
                  ? 'bg-white text-[#EE0000]'
                  : 'hover:bg-[#CC0000]'
              }`}
            >
              Status Page of Machine
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}