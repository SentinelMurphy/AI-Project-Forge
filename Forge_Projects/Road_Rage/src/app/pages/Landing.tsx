import { useNavigate } from 'react-router';
import { useMemo } from 'react';
import playerCarImg from '../assets/player_car.png';
import '../../styles/landing.scss';

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

function generateStars(count: number): Star[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
    }));
}

export default function Landing() {
    const navigate = useNavigate();
    const stars = useMemo(() => generateStars(80), []);

    return (
        <div className="landing-page">
            {/* Stars */}
            <div className="stars-layer">
                {stars.map(s => (
                    <div
                        key={s.id}
                        className="star"
                        style={{
                            left: `${s.x}%`,
                            top: `${s.y}%`,
                            width: s.size,
                            height: s.size,
                            animationDuration: `${s.duration}s`,
                            animationDelay: `${s.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Road strip background */}
            <div className="landing-road-bg">
                <div className="landing-dash d1" />
                <div className="landing-dash d2" />
            </div>

            {/* Sidewalks */}
            <div className="landing-sidewalk left" />
            <div className="landing-sidewalk right" />

            {/* Main content */}
            <div className="landing-content">
                {/* Title */}
                <div className="landing-title">
                    <span className="title-line-1">ROAD</span>
                    <span className="title-line-2">RAGE</span>
                    <span className="title-tagline">DODGE OR DIE</span>
                </div>

                {/* Hero car */}
                <div className="landing-car">
                    <img src={playerCarImg} alt="Player Car" />
                </div>

                {/* Menu */}
                <nav className="landing-menu">
                    <button className="menu-btn" onClick={() => navigate('/game')}>
                        <span className="btn-icon">🏁</span>
                        PLAY
                    </button>
                    <button className="menu-btn secondary" onClick={() => navigate('/high-scores')}>
                        <span className="btn-icon">🏆</span>
                        HIGH SCORES
                    </button>
                    <button className="menu-btn secondary" onClick={() => navigate('/instructions')}>
                        <span className="btn-icon">📖</span>
                        INSTRUCTIONS
                    </button>
                </nav>
            </div>

            <div className="landing-footer">ROAD RAGE v1.0 &nbsp;•&nbsp; 2026</div>
        </div>
    );
}