import { Coffee, LogOut, User } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function Header({ 
  currentPage, 
  onNavigate, 
  isAuthenticated, 
  user, 
  onLoginClick, 
  onLogout 
}: HeaderProps) {
  return (
    <header className={`${isAuthenticated ? 'bg-[#0066CC]' : 'bg-[#EE0000]'} text-white shadow-lg transition-colors duration-300`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Coffee className="size-8" />
            <h1 className="text-xl">Coffee Machine Up or Down</h1>
          </div>
          <div className="flex items-center gap-6"></div>
          <nav className="flex gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'home'
                  ? `bg-white ${isAuthenticated ? 'text-[#0066CC]' : 'text-[#EE0000]'}`
                  : `${isAuthenticated ? 'hover:bg-[#0052A3]' : 'hover:bg-[#CC0000]'}`
            }`}
          >
              Home
            </button>
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'home'
                  ? `bg-white ${isAuthenticated ? 'text-[#0066CC]' : 'text-[#EE0000]'}`
                  : `${isAuthenticated ? 'hover:bg-[#0052A3]' : 'hover:bg-[#CC0000]'}`
            }`}
          >
              repairs
            </button>
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'home'
                  ? `bg-white ${isAuthenticated ? 'text-[#0066CC]' : 'text-[#EE0000]'}`
                  : `${isAuthenticated ? 'hover:bg-[#0052A3]' : 'hover:bg-[#CC0000]'}`
            }`}
          >
              status of machine
            </button>
          </nav>
        
          {isAuthenticated && user ? (
              <div className="flex items-center gap-4 border-l border-white/30 pl-6">
              <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-full">
              <User className="size-4" />
                  </div>
                  <span className="text-sm">{user.name}</span>
              </div>
              <button
              onClick={onLogout}
              className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                  isAuthenticated ? 'hover:bg-[#0052A3]' : 'hover:bg-[#CC0000]'
              }`}
          >
              <LogOut className="size-4" />
                  Logout
                  </button>
                  </div>
          ) : (
                  <div className="border-l border-white/30 pl-6">
                  <button
                      onClick={onLoginClick}
            className="px-6 py-2 bg-white text-[#EE0000] rounded transition-colors hover:bg-gray-100"
                >
                Login / Sign Up
            </button>
            </div>
          )}