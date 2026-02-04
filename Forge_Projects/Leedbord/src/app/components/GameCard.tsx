import { Users } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  game: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    playersOnline: number;
  };
}

export function GameCard({ game }: GameCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="bg-zinc-800 border-zinc-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 rounded-none cursor-pointer"
      onClick={() => navigate(`/game/${game.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.imageUrl}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-green-500 text-white border-0 shadow-lg">
            <Users className="w-3 h-3 mr-1" />
            {game.playersOnline.toLocaleString()} playing
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white mb-2">{game.name}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          {game.description}
        </p>
      </div>
    </Card>
  );
}