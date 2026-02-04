import { useState, useEffect, useMemo } from "react";
import { UserSidebar } from "./UserSidebar";
import { GameCard } from "./GameCard";
import { Input } from "./ui/input";
import { Search, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  playersOnline: number;
}

interface HomePageProps {
  currentUser: {
    username: string;
    avatar: string;
    lastPlayed: {
      game: string;
      duration: string;
    };
    favoriteGames: string[];
  };
  games: Game[];
  onGamesUpdate: (games: Game[]) => void;
}

export function HomePage({ currentUser, games, onGamesUpdate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"players-desc" | "players-asc" | "name-asc" | "name-desc">("players-desc");

  // Simulate real-time player count updates
  useEffect(() => {
    const interval = setInterval(() => {
      onGamesUpdate(
        games.map((game) => ({
          ...game,
          playersOnline:
            game.playersOnline + Math.floor(Math.random() * 2000) - 1000,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [games, onGamesUpdate]);

  // Filter and sort games
  const filteredAndSortedGames = useMemo(() => {
    let result = [...games];

    // Filter by search query
    if (searchQuery) {
      result = result.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort games
    result.sort((a, b) => {
      switch (sortBy) {
        case "players-desc":
          return b.playersOnline - a.playersOnline;
        case "players-asc":
          return a.playersOnline - b.playersOnline;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [games, searchQuery, sortBy]);

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <UserSidebar user={currentUser} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Stream Rankings
            </h2>
            <p className="text-zinc-400">
              Track the most popular games and their active player counts in real-time
            </p>
          </div>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search for a game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
              />
            </div>
            <div className="flex items-center gap-2 sm:w-64">
              <ArrowUpDown className="w-5 h-5 text-zinc-400" />
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:border-purple-500">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectItem value="players-desc">Players: High to Low</SelectItem>
                  <SelectItem value="players-asc">Players: Low to High</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedGames.length > 0 ? (
              filteredAndSortedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-zinc-400 text-lg">No games found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
