import { useState, useEffect } from 'react';
import redBallImage from '../../assets/c577eed51b166c075eaa194408305a5c95bc5f99.png';
import titleImage from '../../assets/914fcc178cd29bedc1e1cef5fbe93757019f6808.png';
import menuButtonsImage from '../../assets/9f48efc70b458730fe4ae8adad1cb9e55c06303f.png';
import { MazeGame } from './MazeGame';

export function GameLanding() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [showCtrlHint, setShowCtrlHint] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'game'>('landing');

  useEffect(() => {
    // Only run audio effects on landing screen
    if (currentScreen !== 'landing') return;

    // Play ambient bouncing ball sound
    const audio = new Audio();
    // You can replace this with your own audio file by placing it in /public folder
    // audio.src = '/ball-bounce-ambient.mp3';
    
    // Create a simple bouncing ball sound effect using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playBounceSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Low frequency for ball bounce
      oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.1);
      
      // Very low volume
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    };

    const playScaryLaugh = () => {
      // Create a realistic human-like creepy laugh
      const now = audioContext.currentTime;
      
      // "Ha Ha Ha Ha" pattern with human-like frequencies
      const laughPattern = [
        { startTime: 0, duration: 0.25, pitch: 220 },      // First "Ha"
        { startTime: 0.3, duration: 0.25, pitch: 200 },    // Second "Ha"
        { startTime: 0.6, duration: 0.3, pitch: 180 },     // Third "Ha" (lower)
        { startTime: 0.95, duration: 0.35, pitch: 160 },   // Fourth "Ha" (even lower/creepier)
      ];

      laughPattern.forEach((laugh) => {
        // Main voice oscillator
        const voice = audioContext.createOscillator();
        const voiceGain = audioContext.createGain();
        
        // Add harmonics for more human-like quality
        const harmonic1 = audioContext.createOscillator();
        const harmonic1Gain = audioContext.createGain();
        
        const harmonic2 = audioContext.createOscillator();
        const harmonic2Gain = audioContext.createGain();
        
        // Create a filter for vocal formant
        const filter = audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200;
        filter.Q.value = 1;
        
        // Connect voice chain
        voice.connect(voiceGain);
        voiceGain.connect(filter);
        
        // Connect harmonics
        harmonic1.connect(harmonic1Gain);
        harmonic1Gain.connect(filter);
        
        harmonic2.connect(harmonic2Gain);
        harmonic2Gain.connect(filter);
        
        filter.connect(audioContext.destination);
        
        // Set voice type and frequencies
        voice.type = 'sawtooth';
        harmonic1.type = 'sine';
        harmonic2.type = 'sine';
        
        const startTime = now + laugh.startTime;
        const endTime = startTime + laugh.duration;
        
        // Main pitch with slight vibrato
        voice.frequency.setValueAtTime(laugh.pitch, startTime);
        voice.frequency.setValueAtTime(laugh.pitch * 1.05, startTime + laugh.duration * 0.3);
        voice.frequency.setValueAtTime(laugh.pitch * 0.95, endTime);
        
        // Harmonics (2x and 3x for richer sound)
        harmonic1.frequency.setValueAtTime(laugh.pitch * 2, startTime);
        harmonic2.frequency.setValueAtTime(laugh.pitch * 3, startTime);
        
        // Volume envelope for "Ha" attack and decay
        voiceGain.gain.setValueAtTime(0, startTime);
        voiceGain.gain.linearRampToValueAtTime(0.25, startTime + 0.05); // Quick attack
        voiceGain.gain.linearRampToValueAtTime(0.15, startTime + laugh.duration * 0.5);
        voiceGain.gain.exponentialRampToValueAtTime(0.01, endTime);
        
        // Harmonic volumes
        harmonic1Gain.gain.setValueAtTime(0, startTime);
        harmonic1Gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
        harmonic1Gain.gain.exponentialRampToValueAtTime(0.01, endTime);
        
        harmonic2Gain.gain.setValueAtTime(0, startTime);
        harmonic2Gain.gain.linearRampToValueAtTime(0.04, startTime + 0.05);
        harmonic2Gain.gain.exponentialRampToValueAtTime(0.01, endTime);
        
        // Start and stop oscillators
        voice.start(startTime);
        voice.stop(endTime);
        harmonic1.start(startTime);
        harmonic1.stop(endTime);
        harmonic2.start(startTime);
        harmonic2.stop(endTime);
      });

      // Add breath/noise component for realism
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 1.5, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }
      
      const noise = audioContext.createBufferSource();
      noise.buffer = noiseBuffer;
      
      const noiseFilter = audioContext.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 2000;
      noiseFilter.Q.value = 0.5;
      
      const noiseGain = audioContext.createGain();
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      
      noiseGain.gain.setValueAtTime(0.02, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);
      
      noise.start(now);
      noise.stop(now + 1.3);
      
      // Add creepy reverb tail with low frequency
      const reverbOsc = audioContext.createOscillator();
      const reverbGain = audioContext.createGain();
      
      reverbOsc.connect(reverbGain);
      reverbGain.connect(audioContext.destination);
      
      reverbOsc.type = 'sine';
      reverbOsc.frequency.setValueAtTime(100, now + 0.8);
      reverbOsc.frequency.exponentialRampToValueAtTime(80, now + 1.5);
      
      reverbGain.gain.setValueAtTime(0, now + 0.8);
      reverbGain.gain.linearRampToValueAtTime(0.06, now + 0.9);
      reverbGain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
      
      reverbOsc.start(now + 0.8);
      reverbOsc.stop(now + 1.5);
    };

    // Play bounce sound every 2-4 seconds randomly
    const bounceInterval = setInterval(() => {
      playBounceSound();
    }, Math.random() * 2000 + 2000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control' && !isCtrlPressed) {
        setShowCtrlHint(true);
        setIsCtrlPressed(true);
        playScaryLaugh();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        setShowCtrlHint(false);
        setIsCtrlPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(bounceInterval);
    };
  }, [isCtrlPressed, currentScreen]);

  const menuItems = [
    { id: 'new-game', label: 'NEW GAME' },
    { id: 'continue', label: 'CONTINUE' },
    { id: 'settings', label: 'SETTINGS' },
    { id: 'credits', label: 'CREDITS' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
  ];

  // Show maze game if on game screen
  if (currentScreen === 'game') {
    return <MazeGame onExit={() => setCurrentScreen('landing')} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
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

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-20">
          
          {/* Left Side - Title and Menu */}
          <div className="flex flex-col items-center space-y-8 md:space-y-10">
            {/* Title Image */}
            <div className="w-full max-w-md">
              <img 
                src={titleImage} 
                alt="Five Nights at Red Ball"
                className="w-full h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255,68,119,0.5))',
                }}
              />
            </div>

            {/* Menu Buttons */}
            <nav className="relative" style={{ width: '100%', maxWidth: '500px' }}>
              {/* Menu Buttons Image */}
              <img 
                src={menuButtonsImage} 
                alt="Menu Buttons"
                className="w-full h-auto object-contain"
                style={{
                  filter: hoveredButton ? 'brightness(1.1)' : 'brightness(1)',
                  transition: 'filter 0.3s ease',
                }}
              />
              
              {/* Invisible Clickable Overlays */}
              <div className="absolute inset-0">
                {menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    className="absolute w-full cursor-pointer transition-all duration-200"
                    style={{
                      top: `${index * 20}%`,
                      height: '20%',
                      background: hoveredButton === item.id 
                        ? 'rgba(255, 68, 119, 0.1)' 
                        : 'transparent',
                      border: 'none',
                    }}
                    onMouseEnter={() => setHoveredButton(item.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => {
                      if (item.id === 'new-game') {
                        setCurrentScreen('game');
                      } else {
                        console.log(`${item.label} clicked`);
                      }
                    }}
                  >
                    <span className="sr-only">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Right Side - Red Ball Character */}
          <div className="relative flex items-center justify-center">
            <div className="relative" style={{ width: '500px', height: '500px' }}>
              
              {/* Main Red Ball Image */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '500px',
                  height: '500px',
                }}
              >
                <img 
                  src={redBallImage} 
                  alt="Red Ball Character"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hint Text */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
          <p 
            className="uppercase tracking-widest transition-all duration-300"
            style={{
              fontSize: '0.75rem',
              color: showCtrlHint ? '#ff4477' : '#ff4477',
              opacity: showCtrlHint ? 1 : 0.7,
              textShadow: showCtrlHint 
                ? '0 0 10px rgba(255,68,119,0.8)' 
                : '0 0 5px rgba(255,68,119,0.3)',
            }}
          >
            HOLD CTRL TO ERASE DATA
          </p>
        </div>
      </div>
    </div>
  );
}