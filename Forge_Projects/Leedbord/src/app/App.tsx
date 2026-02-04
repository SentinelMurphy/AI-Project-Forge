import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { GameDetailPage } from "./components/GameDetailPage";

// Mock user data
const currentUser = {
  username: "StreamPro_2024",
  avatar: "",
  lastPlayed: {
    game: "Fortnite",
    duration: "3 hours 24 minutes",
  },
  favoriteGames: ["League of Legends", "Apex Legends"],
};

// Mock games data with images
const initialGames = [
  {
    id: "1",
    name: "Counter-Strike 2",
    description: "Tactical FPS featuring competitive 5v5 gameplay with strategic depth and precise gunplay mechanics.",
    imageUrl: "https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBlc3BvcnRzJTIwZnBzfGVufDF8fHx8MTc3MDIwNDU5OHww&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 1247893,
  },
  {
    id: "2",
    name: "Fortnite",
    description: "Battle royale sensation with building mechanics, creative modes, and regular content updates keeping gameplay fresh.",
    imageUrl: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3J0bml0ZSUyMGdhbWluZ3xlbnwxfHx8fDE3NzAxMjU2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 2156432,
  },
  {
    id: "3",
    name: "Apex Legends",
    description: "Fast-paced hero-based battle royale with unique character abilities and fluid movement mechanics.",
    imageUrl: "https://images.unsplash.com/photo-1690233662564-f599cc764cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGV4JTIwbGVnZW5kcyUyMGdhbWV8ZW58MXx8fHwxNzcwMjA0NTk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 897234,
  },
  {
    id: "4",
    name: "League of Legends",
    description: "Iconic MOBA with strategic team battles, diverse champions, and a thriving competitive esports scene.",
    imageUrl: "https://images.unsplash.com/photo-1619017120498-872bb10a14a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFndWUlMjBsZWdlbmRzJTIwZ2FtZXxlbnwxfHx8fDE3NzAxOTMzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 1789456,
  },
  {
    id: "5",
    name: "Minecraft",
    description: "Creative sandbox adventure with limitless building possibilities, exploration, and multiplayer communities.",
    imageUrl: "https://images.unsplash.com/photo-1656639969815-1194ca7273bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lY3JhZnQlMjBnYW1pbmd8ZW58MXx8fHwxNzcwMjA0NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 3245789,
  },
  {
    id: "6",
    name: "Call of Duty: Warzone",
    description: "Intense battle royale experience with realistic graphics, loadout customization, and cross-platform play.",
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxsJTIwZHV0eSUyMHdhcnpvbmV8ZW58MXx8fHwxNzcwMTI1NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 1567892,
  },
  {
    id: "7",
    name: "Valorant",
    description: "Tactical 5v5 character-based shooter combining precise gunplay with unique agent abilities and strategic gameplay.",
    imageUrl: "https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWxvcmFudCUyMGVzcG9ydHMlMjBnYW1lfGVufDF8fHx8MTc3MDIwNDg4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 1432567,
  },
  {
    id: "8",
    name: "Overwatch 2",
    description: "Team-based hero shooter with diverse characters, dynamic abilities, and objective-focused competitive matches.",
    imageUrl: "https://images.unsplash.com/photo-1636617920878-b780053fef18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyd2F0Y2glMjBnYW1lcGxheXxlbnwxfHx8fDE3NzAyMDQ4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 956321,
  },
  {
    id: "9",
    name: "Dota 2",
    description: "Complex multiplayer battle arena with deep strategy, massive hero pool, and high-stakes competitive tournaments.",
    imageUrl: "https://images.unsplash.com/photo-1767455471543-055dbc6c6700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3RhJTIwZ2FtaW5nJTIwZXNwb3J0c3xlbnwxfHx8fDE3NzAyMDQ4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 672145,
  },
  {
    id: "10",
    name: "Rocket League",
    description: "High-octane vehicular soccer game blending sports and racing with physics-based competitive gameplay.",
    imageUrl: "https://images.unsplash.com/photo-1572425914445-addf19106140?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsZWFndWUlMjBnYW1lfGVufDF8fHx8MTc3MDE5MzM4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 534890,
  },
  {
    id: "11",
    name: "Rainbow Six Siege",
    description: "Tactical shooter emphasizing environmental destruction, team coordination, and operator-specific abilities.",
    imageUrl: "https://images.unsplash.com/photo-1599399056366-e318f572dbba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWN0aWNhbCUyMHNob290ZXIlMjBmcHN8ZW58MXx8fHwxNzcwMjA0ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 445678,
  },
  {
    id: "12",
    name: "PUBG: Battlegrounds",
    description: "Original battle royale experience with realistic gunplay, tactical survival mechanics, and intense firefights.",
    imageUrl: "https://images.unsplash.com/photo-1610993645506-62310119735e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJnJTIwYmF0dGxlZ3JvdW5kcyUyMGdhbWluZ3xlbnwxfHx8fDE3NzAyMDQ4ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    playersOnline: 823456,
  },
];

export default function App() {
  const [games, setGames] = useState(initialGames);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              currentUser={currentUser} 
              games={games} 
              onGamesUpdate={setGames}
            />
          } 
        />
        <Route 
          path="/game/:gameId" 
          element={
            <GameDetailPage 
              games={games} 
              currentUser={currentUser}
            />
          } 
        />
      </Routes>
    </Router>
  );
}
