import { X, Clock, Home, Settings } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  recentViews: string[];
}

export function Sidebar({ isOpen, onClose, recentViews }: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4">
          <div className="mb-6">
            <div className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2 px-3 py-2 mb-3">
              <Clock className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Recent Views</h3>
            </div>
            <div className="space-y-2">
              {recentViews.length === 0 ? (
                <p className="text-sm text-gray-500 px-3">No recent views</p>
              ) : (
                recentViews.map((view, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                  >
                    {view}
                  </div>
                ))
              )}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
