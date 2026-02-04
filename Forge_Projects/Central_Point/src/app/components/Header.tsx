import { Menu, X } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 py-4 flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Central Point</h1>
      </div>
    </header>
  );
}
