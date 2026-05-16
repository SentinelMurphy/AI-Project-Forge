
import playerCarImg from '../assets/player_car.png';

interface PlayerCarProps {
    lean?: number;
}

export const PLAYER_CAR_W = 64;
export const PLAYER_CAR_H = 106;

export function PlayerCar({ lean = 0 }: PlayerCarProps) {
    return (
        <img
            src={playerCarImg}
            alt="player car"
            draggable={false}
            style={{
                display:        'block',
                width:          PLAYER_CAR_W,
                height:         PLAYER_CAR_H,
                objectFit:      'cover',
                objectPosition: 'center center',
                transform:      `rotate(${180 + lean}deg)`,
                transformOrigin:'center center',
                transition:     'transform 0.1s ease',
                filter:
                    'drop-shadow(0 0 14px rgba(220,30,30,0.95)) drop-shadow(0 0 6px rgba(220,30,30,0.6))',
                pointerEvents:  'none',
                userSelect:     'none',
            }}
        />
    );
}
