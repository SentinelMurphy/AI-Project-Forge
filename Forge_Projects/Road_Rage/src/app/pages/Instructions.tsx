import { useNavigate } from 'react-router';
import { EnemyCar } from '../components/EnemyCar';
import type { EnemyType } from '../components/EnemyCar';
import '../../styles/instructions.scss';

const ENEMIES: { type: EnemyType; label: string }[] = [
    { type: 'blue',   label: 'Blue Sedan' },
    { type: 'yellow', label: 'Yellow Taxi' },
    { type: 'police', label: 'Police Car' },
    { type: 'green',  label: 'Green SUV' },
    { type: 'orange', label: 'Orange Muscle' },
];

export default function Instructions() {
    const navigate = useNavigate();

    return (
        <div className="ins-page">
            <div className="ins-panel">
                <button className="ins-back" onClick={() => navigate('/')}>
                    BACK
                </button>

                <h1 className="ins-title">HOW TO PLAY</h1>

                <div className="ins-section">
                    <h3>CONTROLS</h3>
                    <div className="ins-keys">
                        <div className="key-row">
                            <div className="key-combo">
                                <span className="key">◀</span>
                                <span className="key">▶</span>
                            </div>
                            <span className="key-label">Switch lanes left / right</span>
                        </div>
                        <div className="key-row">
                            <div className="key-combo">
                                <span className="key">A</span>
                                <span className="key">D</span>
                            </div>
                            <span className="key-label">Switch lanes left / right</span>
                        </div>
                        <div className="key-row">
                            <div className="key-combo">
                                <span className="key">P</span>
                            </div>
                            <span className="key-label">Pause / Resume the game</span>
                        </div>
                        <div className="key-row">
                            <div className="key-combo">
                                <span className="key">ESC</span>
                            </div>
                            <span className="key-label">Pause / Resume the game</span>
                        </div>
                    </div>
                </div>

                <div className="ins-section">
                    <h3>TIPS</h3>
                    <div className="ins-tips">
                        <div className="tip">
                            <span className="tip-icon">⏱️</span>
                            <span className="tip-text">Your score is how long you survive.<br />Beat your best time!</span>
                        </div>
                        <div className="tip">
                            <span className="tip-icon">🚗</span>
                            <span className="tip-text">Traffic gets faster the longer<br />you stay on the road.</span>
                        </div>
                        <div className="tip">
                            <span className="tip-icon">🚦</span>
                            <span className="tip-text">Use all 3 lanes — never stay<br />in one lane too long.</span>
                        </div>
                        <div className="tip">
                            <span className="tip-icon">💥</span>
                            <span className="tip-text">One hit and it's GAME OVER.<br />No second chances!</span>
                        </div>
                    </div>
                </div>

                <div className="ins-section">
                    <h3>ENEMY VEHICLES</h3>
                    <div className="ins-enemies">
                        {ENEMIES.map(e => (
                            <div key={e.type} className="enemy-info">
                                <EnemyCar type={e.type} />
                                <span className="enemy-name">{e.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
