import { useParams, useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Users, Clock, Trophy, Medal, Flag } from "lucide-react";
import { Button } from "./ui/button";

interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  playersOnline: number;
}

interface Player {
  rank: number;
  name: string;
  country: string;
  timePlayed: string;
  score: number;
}

interface GameDetailPageProps {
  games: Game[];
  currentUser: {
    username: string;
    lastPlayed?: { game: string; duration: string };
  };
}

// Mock top players data
const generateTopPlayers = (gameName: string): Player[] => {
  const countries = ["🇺🇸 USA", "🇬🇧 UK", "🇯🇵 Japan", "🇰🇷 Korea", "🇩🇪 Germany", "🇫🇷 France", "🇧🇷 Brazil", "🇨🇦 Canada", "🇸🇪 Sweden", "🇦🇺 Australia"];
  const prefixes = ["Pro", "Elite", "Master", "Legend", "Ace", "Titan", "Shadow", "Swift", "Dark", "Phoenix"];
  const suffixes = ["Slayer", "Hunter", "King", "Queen", "Warrior", "Ninja", "Sniper", "Beast", "Storm", "Ghost"];
  
  return Array.from({ length: 10 }, (_, i) => ({
    rank: i + 1,
    name: `${prefixes[i]}${suffixes[9 - i]}`,
    country: countries[i],
    timePlayed: `${Math.floor(Math.random() * 500) + 100}h ${Math.floor(Math.random() * 60)}m`,
    score: 10000 - (i * 500) + Math.floor(Math.random() * 400),
  }));
};

// Mock user achievements
const userAchievements = [
  { name: "First Victory", description: "Win your first match", unlocked: true },
  { name: "Veteran Player", description: "Play 100 matches", unlocked: true },
  { name: "Streak Master", description: "Win 5 matches in a row", unlocked: true },
  { name: "Top 10 Finisher", description: "Finish in top 10", unlocked: true },
  { name: "Legendary", description: "Reach legendary rank", unlocked: false },
  { name: "Team Player", description: "Win 50 team matches", unlocked: false },
];

export function GameDetailPage({ games, currentUser }: GameDetailPageProps) {
  const { gameId } = useParams();
  const navigate = useNavigate();
  
  const game = games.find(g => g.id === gameId);
  
  if (!game) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Game not found</h2>
          <Button onClick={() => navigate("/")} className="bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </div>
    );
  }
  
  const topPlayers = generateTopPlayers(game.name);
  const isCurrentGameLastPlayed = currentUser.lastPlayed?.game === game.name;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-6">
        <div className="max-w-7xl mx-auto">
          <Button 
            onClick={() => navigate("/")} 
            variant="ghost" 
            className="text-zinc-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Game Header with Artwork */}
        <div className="mb-8">
          <div className="relative h-96 w-full overflow-hidden rounded-none">
            <img
              src={game.imageUrl}
              alt={game.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-3">{game.name}</h1>
              <p className="text-zinc-300 text-lg mb-4">{game.description}</p>
              <Badge className="bg-green-500 text-white border-0 text-lg px-4 py-2">
                <Users className="w-5 h-5 mr-2" />
                {game.playersOnline.toLocaleString()} players online
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top 10 Players */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-800 border-zinc-700 p-6 rounded-none">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Top 10 Players</h2>
              </div>
              
              <div className="space-y-3">
                {topPlayers.map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center gap-4 p-4 bg-zinc-900 hover:bg-zinc-850 transition-colors"
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      player.rank === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" :
                      player.rank === 2 ? "bg-gradient-to-br from-gray-300 to-gray-500" :
                      player.rank === 3 ? "bg-gradient-to-br from-orange-400 to-orange-600" :
                      "bg-zinc-700"
                    }`}>
                      <span className="font-bold text-white">#{player.rank}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-white">{player.name}</p>
                        <span className="text-sm">{player.country}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{player.timePlayed}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4" />
                          <span>{player.score.toLocaleString()} pts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Current User Stats */}
          <div className="space-y-6">
            {/* User Game Stats */}
            <Card className="bg-zinc-800 border-zinc-700 p-6 rounded-none">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Your Stats</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Player</p>
                  <p className="text-lg font-semibold text-white">{currentUser.username}</p>
                </div>
                
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Last Played</p>
                  <p className="text-lg font-semibold text-white">
                    {isCurrentGameLastPlayed ? currentUser.lastPlayed?.duration : "Not played yet"}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Total Time</p>
                  <p className="text-lg font-semibold text-white">
                    {isCurrentGameLastPlayed 
                      ? `${Math.floor(Math.random() * 300) + 50}h ${Math.floor(Math.random() * 60)}m`
                      : "0h 0m"}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Your Rank</p>
                  <p className="text-lg font-semibold text-white">
                    #{Math.floor(Math.random() * 5000) + 100}
                  </p>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="bg-zinc-800 border-zinc-700 p-6 rounded-none">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">Achievements</h2>
              </div>
              
              <div className="space-y-3">
                {userAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded ${
                      achievement.unlocked 
                        ? "bg-purple-900/30 border border-purple-700/50" 
                        : "bg-zinc-900 border border-zinc-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 ${achievement.unlocked ? "text-yellow-400" : "text-zinc-600"}`}>
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-sm ${
                          achievement.unlocked ? "text-white" : "text-zinc-500"
                        }`}>
                          {achievement.name}
                        </p>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-purple-600 text-white border-0 text-xs">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
