import { useState, useEffect, useCallback } from 'react';
import redBallImage from '../../assets/c577eed51b166c075eaa194408305a5c95bc5f99.png';

interface Position {
  x: number;
  y: number;
}

interface MazeGameProps {
  onExit: () => void;
}

// Generate a random maze using recursive backtracking
function generateMaze(width: number, height: number): number[][] {
  const maze: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));
  
  // Start with all walls (0)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      maze[y][x] = 0;
    }
  }
  
  // Create path from start to end
  const visited = new Set<string>();
  const stack: Position[] = [];
  
  // Start position
  const start = { x: 0, y: 0 };
  maze[start.y][start.x] = 1;
  visited.add(`${start.x},${start.y}`);
  stack.push(start);
  
  const directions = [
    { x: 0, y: -1 }, // up
    { x: 1, y: 0 },  // right
    { x: 0, y: 1 },  // down
    { x: -1, y: 0 }, // left
  ];
  
  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const unvisitedNeighbors: Position[] = [];
    
    // Check all neighbors
    for (const dir of directions) {
      const next = { x: current.x + dir.x, y: current.y + dir.y };
      
      if (next.x >= 0 && next.x < width && next.y >= 0 && next.y < height) {
        if (!visited.has(`${next.x},${next.y}`)) {
          unvisitedNeighbors.push(next);
        }
      }
    }
    
    if (unvisitedNeighbors.length > 0) {
      // Choose random unvisited neighbor
      const next = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
      maze[next.y][next.x] = 1;
      visited.add(`${next.x},${next.y}`);
      stack.push(next);
    } else {
      stack.pop();
    }
  }
  
  // Ensure end position is reachable
  maze[height - 1][width - 1] = 1;
  
  // Add some extra paths for variety
  for (let i = 0; i < width * height * 0.15; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    maze[y][x] = 1;
  }
  
  return maze;
}

export function MazeGame({ onExit }: MazeGameProps) {
  const mazeWidth = 25;
  const mazeHeight = 18;
  
  // Generate initial maze
  const [maze, setMaze] = useState(() => generateMaze(mazeWidth, mazeHeight));
  
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [redBalls, setRedBalls] = useState<Position[]>([{ x: 14, y: 0 }]); // Track multiple red balls
  const [exitPos, setExitPos] = useState<Position>({ x: mazeWidth - 1, y: mazeHeight - 1 });
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [exploredCells, setExploredCells] = useState<Set<string>>(new Set(['0-0']));
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [finalTime, setFinalTime] = useState<number>(0);
  const [canMove, setCanMove] = useState<boolean>(true);

  const cellSize = 40;
  const visibilityRadius = 3; // How far the player can see

  // Calculate minimum distance to any red ball
  const distanceToBall = Math.min(...redBalls.map(ball => 
    Math.sqrt(Math.pow(ball.x - playerPos.x, 2) + Math.pow(ball.y - playerPos.y, 2))
  ));

  // Calculate if a cell is visible to the player
  const isCellVisible = useCallback((x: number, y: number): boolean => {
    const distance = Math.sqrt(Math.pow(x - playerPos.x, 2) + Math.pow(y - playerPos.y, 2));
    return distance <= visibilityRadius;
  }, [playerPos, visibilityRadius]);

  // Calculate if a specific ball is visible
  const isSpecificBallVisible = useCallback((ball: Position): boolean => {
    const distance = Math.sqrt(Math.pow(ball.x - playerPos.x, 2) + Math.pow(ball.y - playerPos.y, 2));
    return distance <= visibilityRadius;
  }, [playerPos, visibilityRadius]);

  // Check if position is valid (not a wall)
  const isValidMove = useCallback((pos: Position): boolean => {
    if (pos.y < 0 || pos.y >= maze.length || pos.x < 0 || pos.x >= maze[0].length) {
      return false;
    }
    return maze[pos.y][pos.x] === 1;
  }, [maze]);

  // Handle player movement with arrow keys
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!canMove) return; // Prevent movement if on cooldown

      let newPos = { ...playerPos };

      switch (e.key) {
        case 'ArrowUp':
          newPos.y -= 1;
          e.preventDefault();
          break;
        case 'ArrowDown':
          newPos.y += 1;
          e.preventDefault();
          break;
        case 'ArrowLeft':
          newPos.x -= 1;
          e.preventDefault();
          break;
        case 'ArrowRight':
          newPos.x += 1;
          e.preventDefault();
          break;
        default:
          return;
      }

      if (isValidMove(newPos)) {
        setPlayerPos(newPos);
        setExploredCells(prev => new Set([...prev, `${newPos.x}-${newPos.y}`]));
        
        // Add movement cooldown
        setCanMove(false);
        setTimeout(() => setCanMove(true), 300); // 300ms cooldown between moves
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, gameStatus, isValidMove, canMove]);

  // Move ball towards player
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const moveBalls = setInterval(() => {
      setRedBalls((prevBalls) => {
        return prevBalls.map((ball) => {
          let newBallPos = { ...ball };
          
          // Calculate direction to player
          const dx = playerPos.x - ball.x;
          const dy = playerPos.y - ball.y;
          
          // Try to move towards player (prioritize larger difference)
          if (Math.abs(dx) > Math.abs(dy)) {
            // Move horizontally
            newBallPos.x += dx > 0 ? 1 : -1;
            
            // If blocked, try vertical
            if (!isValidMove(newBallPos)) {
              newBallPos = { ...ball };
              newBallPos.y += dy > 0 ? 1 : -1;
              
              // If still blocked, stay in place
              if (!isValidMove(newBallPos)) {
                return ball;
              }
            }
          } else {
            // Move vertically
            newBallPos.y += dy > 0 ? 1 : -1;
            
            // If blocked, try horizontal
            if (!isValidMove(newBallPos)) {
              newBallPos = { ...ball };
              newBallPos.x += dx > 0 ? 1 : -1;
              
              // If still blocked, stay in place
              if (!isValidMove(newBallPos)) {
                return ball;
              }
            }
          }
          
          return newBallPos;
        });
      });
    }, 400); // Balls move every 400ms - slower than player!

    return () => clearInterval(moveBalls);
  }, [playerPos, gameStatus, isValidMove]);

  // Spawn new red balls every 20 seconds
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const spawnBall = setInterval(() => {
      setRedBalls((prevBalls) => {
        // Get current player position from state
        setPlayerPos((currentPlayerPos) => {
          // Find all valid spawn positions (not near player)
          const validSpawns: Position[] = [];
          for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[0].length; x++) {
              if (maze[y][x] === 1) {
                const distance = Math.sqrt(Math.pow(x - currentPlayerPos.x, 2) + Math.pow(y - currentPlayerPos.y, 2));
                // Spawn only if far from player (at least 5 cells away)
                if (distance >= 5) {
                  validSpawns.push({ x, y });
                }
              }
            }
          }

          if (validSpawns.length > 0) {
            const newBallPos = validSpawns[Math.floor(Math.random() * validSpawns.length)];
            setRedBalls([...prevBalls, newBallPos]);
            console.log('New red ball spawned at:', newBallPos, 'Total balls:', prevBalls.length + 1);
          } else {
            console.log('No valid spawn positions found. Player at:', currentPlayerPos);
          }
          
          return currentPlayerPos; // Return unchanged
        });
        
        return prevBalls; // This will be updated by the inner setRedBalls
      });
    }, 20000); // Spawn new ball every 20 seconds

    return () => clearInterval(spawnBall);
  }, [gameStatus, maze]);

  // Check win/lose conditions
  useEffect(() => {
    // Check if player reached the goal (bottom-right corner)
    if (playerPos.x === exitPos.x && playerPos.y === exitPos.y) {
      setGameStatus('won');
      setFinalTime(Date.now() - startTime);
    }

    // Check if ball caught the player
    if (redBalls.some(ball => ball.x === playerPos.x && ball.y === playerPos.y)) {
      setGameStatus('lost');
    }
  }, [playerPos, redBalls, exitPos]);

  // Update elapsed time
  useEffect(() => {
    if (gameStatus === 'playing') {
      const interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameStatus, startTime]);

  // Move exit position every 5 seconds
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const moveExit = setInterval(() => {
      setPlayerPos((currentPlayerPos) => {
        // Find all valid path positions
        const validPositions: Position[] = [];
        for (let y = 0; y < maze.length; y++) {
          for (let x = 0; x < maze[0].length; x++) {
            // Must be a path cell and not at player position
            if (maze[y][x] === 1 && !(x === currentPlayerPos.x && y === currentPlayerPos.y)) {
              validPositions.push({ x, y });
            }
          }
        }

        // Choose random valid position
        if (validPositions.length > 0) {
          const newExit = validPositions[Math.floor(Math.random() * validPositions.length)];
          setExitPos(newExit);
        }
        
        return currentPlayerPos; // Return unchanged player position
      });
    }, 3000); // Every 3 seconds

    return () => clearInterval(moveExit);
  }, [gameStatus, maze]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Title */}
        <div className="text-center mb-4">
          <h1 
            className="uppercase tracking-widest mb-2"
            style={{
              fontSize: '2rem',
              color: '#ff4477',
              textShadow: '0 0 20px rgba(255,68,119,0.8)',
            }}
          >
            Escape the Red Ball
          </h1>
          <div className="flex items-center justify-center gap-6 mb-2">
            <p className="text-white/70 text-sm">Use arrow keys to navigate • Reach the exit on the right</p>
            <div 
              className="px-4 py-1 border border-white/30 rounded"
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              <span className="text-white/50 text-xs uppercase tracking-wider mr-2">Time:</span>
              <span 
                className="text-white font-mono"
                style={{
                  fontSize: '1rem',
                  textShadow: '0 0 10px rgba(68,119,255,0.5)',
                }}
              >
                {Math.floor(elapsedTime / 1000)}.{Math.floor((elapsedTime % 1000) / 100)}s
              </span>
            </div>
            <div 
              className="px-4 py-1 border border-red-500/30 rounded"
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              <span className="text-white/50 text-xs uppercase tracking-wider mr-2">Red Balls:</span>
              <span 
                className="text-red-400 font-mono"
                style={{
                  fontSize: '1rem',
                  textShadow: '0 0 10px rgba(255,68,119,0.5)',
                }}
              >
                {redBalls.length}
              </span>
            </div>
          </div>
        </div>

        {/* Maze Container */}
        <div 
          className="relative border-2 rounded-lg p-4 bg-black/50 transition-all duration-300"
          style={{
            width: maze[0].length * cellSize + 32,
            height: maze.length * cellSize + 32,
            borderColor: distanceToBall < 5 ? 'rgba(255, 68, 119, 0.5)' : 'rgba(255, 255, 255, 0.2)',
            boxShadow: distanceToBall < 5 ? '0 0 30px rgba(255, 68, 119, 0.3)' : 'none',
          }}
        >
          {/* Maze Grid */}
          <div className="relative">
            {maze.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((cell, colIndex) => {
                  const isVisible = isCellVisible(colIndex, rowIndex);
                  const isExplored = exploredCells.has(`${colIndex}-${rowIndex}`);
                  const cellKey = `${rowIndex}-${colIndex}`;
                  
                  return (
                    <div
                      key={cellKey}
                      className="border relative"
                      style={{
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: cell === 0 ? '#666666' : '#000', // Brighter grey for walls
                        borderColor: cell === 0 ? 'rgba(200,200,200,0.9)' : 'rgba(255,255,255,0.05)',
                        borderWidth: cell === 0 ? '2px' : '1px',
                        boxShadow: cell === 0 
                          ? 'inset 0 0 15px rgba(255,255,255,0.4), 0 0 10px rgba(200,200,200,0.6)' 
                          : 'none',
                      }}
                    >
                      {/* Wall pattern overlay - ALWAYS VISIBLE */}
                      {cell === 0 && (
                        <div 
                          className="absolute inset-0 z-50"
                          style={{
                            background: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.2) 4px, rgba(255,255,255,0.2) 8px)',
                            pointerEvents: 'none',
                          }}
                        />
                      )}
                      
                      {/* Fog of War Overlay - ONLY on path cells, NEVER on walls */}
                      {!isVisible && cell === 1 && (
                        <div 
                          className="absolute inset-0 transition-opacity duration-300"
                          style={{
                            backgroundColor: '#000',
                            opacity: isExplored ? 0.7 : 0.95,
                            zIndex: 10,
                          }}
                        />
                      )}
                      
                      {/* Visibility gradient around player */}
                      {isVisible && (
                        <div 
                          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle at ${playerPos.x * cellSize + cellSize / 2 - colIndex * cellSize}px ${playerPos.y * cellSize + cellSize / 2 - rowIndex * cellSize}px, rgba(68,119,255,0.15) 0%, transparent ${visibilityRadius * cellSize}px)`,
                          }}
                        />
                      )}
                      
                      {/* Start marker - only visible when close */}
                      {rowIndex === 0 && colIndex === 0 && isVisible && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        </div>
                      )}
                      {/* Exit marker - only visible when close */}
                      {rowIndex === exitPos.y && colIndex === exitPos.x && isVisible && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Player */}
            <div
              className="absolute transition-all duration-150"
              style={{
                left: playerPos.x * cellSize + cellSize / 2,
                top: playerPos.y * cellSize + cellSize / 2,
                transform: 'translate(-50%, -50%)',
                width: cellSize * 0.6,
                height: cellSize * 0.6,
              }}
            >
              <div 
                className="w-full h-full rounded-full"
                style={{
                  backgroundColor: '#4477ff',
                  boxShadow: '0 0 20px rgba(68,119,255,0.8)',
                }}
              />
            </div>

            {/* Red Ball Enemy */}
            {redBalls.map((ball, index) => (
              isSpecificBallVisible(ball) && (
                <div
                  key={index}
                  className="absolute transition-all duration-500"
                  style={{
                    left: ball.x * cellSize + cellSize / 2,
                    top: ball.y * cellSize + cellSize / 2,
                    transform: 'translate(-50%, -50%)',
                    width: cellSize * 0.7,
                    height: cellSize * 0.7,
                  }}
                >
                  <img 
                    src={redBallImage}
                    alt="Red Ball"
                    className="w-full h-full object-contain animate-pulse"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(255,68,119,0.9))',
                    }}
                  />
                </div>
              )
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onExit}
          className="px-6 py-2 uppercase tracking-wider text-white border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all"
          style={{
            fontSize: '0.875rem',
          }}
        >
          Back to Menu
        </button>
      </div>

      {/* Game Over Modal */}
      {gameStatus !== 'playing' && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black border-2 border-white/30 rounded-lg p-8 text-center max-w-md">
            <h2 
              className="uppercase tracking-widest mb-4"
              style={{
                fontSize: '2.5rem',
                color: gameStatus === 'won' ? '#44ff77' : '#ff4477',
                textShadow: gameStatus === 'won' 
                  ? '0 0 20px rgba(68,255,119,0.8)' 
                  : '0 0 20px rgba(255,68,119,0.8)',
              }}
            >
              {gameStatus === 'won' ? 'You Escaped!' : 'Caught!'}
            </h2>
            <p className="text-white/70 mb-6">
              {gameStatus === 'won' 
                ? 'You successfully escaped the red ball!' 
                : 'The red ball caught you. Try again?'}
            </p>
            {gameStatus === 'won' && (
              <div 
                className="mb-6 px-6 py-3 border border-green-500/30 rounded inline-block"
                style={{
                  backgroundColor: 'rgba(68,255,119,0.1)',
                }}
              >
                <span className="text-white/50 text-sm uppercase tracking-wider mr-3">Completion Time:</span>
                <span 
                  className="text-green-400 font-mono"
                  style={{
                    fontSize: '1.5rem',
                    textShadow: '0 0 15px rgba(68,255,119,0.8)',
                  }}
                >
                  {Math.floor(finalTime / 1000)}.{Math.floor((finalTime % 1000) / 100)}s
                </span>
              </div>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setMaze(generateMaze(mazeWidth, mazeHeight));
                  setPlayerPos({ x: 0, y: 0 });
                  setRedBalls([{ x: mazeWidth - 1, y: 0 }]);
                  setExitPos({ x: mazeWidth - 1, y: mazeHeight - 1 });
                  setExploredCells(new Set(['0-0']));
                  setGameStatus('playing');
                  setStartTime(Date.now());
                }}
                className="px-6 py-2 uppercase tracking-wider text-white border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all"
              >
                Play Again
              </button>
              <button
                onClick={onExit}
                className="px-6 py-2 uppercase tracking-wider text-white border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all"
              >
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}