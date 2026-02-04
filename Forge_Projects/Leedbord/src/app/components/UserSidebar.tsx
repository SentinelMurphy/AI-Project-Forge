import { User, Clock, Trophy, Gamepad2 } from "lucide-react";
import { Card } from "./ui/card";

interface UserSidebarProps {
  user: {
    username: string;
    avatar: string;
    lastPlayed: {
      game: string;
      duration: string;
    };
    favoriteGames: string[];
  };
}

export function UserSidebar({ user }: UserSidebarProps) {
  return (
    <div className="w-80 min-h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Leedbord</h1>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-6 space-y-6">
        {/* User Info */}
        <Card className="bg-zinc-800 border-zinc-700 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Logged in as</p>
              <p className="font-semibold text-white">{user.username}</p>
            </div>
          </div>
        </Card>

        {/* Last Played */}
        <Card className="bg-zinc-800 border-zinc-700 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Last Played</h3>
          </div>
          <p className="text-zinc-300 mb-2">{user.lastPlayed.game}</p>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Clock className="w-4 h-4" />
            <span>{user.lastPlayed.duration}</span>
          </div>
        </Card>

        {/* Favorite Games */}
        <Card className="bg-zinc-800 border-zinc-700 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-white">Top 2 Favorites</h3>
          </div>
          <div className="space-y-2">
            {user.favoriteGames.map((game, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-zinc-900 rounded-lg"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </div>
                <span className="text-zinc-300 text-sm">{game}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
