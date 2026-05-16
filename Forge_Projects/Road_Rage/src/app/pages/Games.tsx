
import { PlayerCar, PLAYER_CAR_W, PLAYER_CAR_H } from '../components/PlayerCar';
import {
    useRef,
    useState,
    useEffect,
    useCallback,
    useReducer,
} from 'react';
import { useNavigate } from 'react-router';
import { EnemyCar } from '../components/EnemyCar';
import type { EnemyType } from '../components/EnemyCar';
import { saveScore, getBestScore, getLastScore } from '../utils/scores';
import '../../styles/game.scss';

// ── Constants ────────────────────────────────────────────────────────────────
const GAME_H      = 640;
const ROAD_X      = 60;
const ROAD_W      = 240;
const LANES       = 3;
const LANE_W      = ROAD_W / LANES; // 80
// Lane centers (absolute x)
const LC          = [ROAD_X + LANE_W * 0.5, ROAD_X + LANE_W * 1.5, ROAD_X + LANE_W * 2.5]; // [100,180,260]
const CAR_W       = 36;
const CAR_H       = 60;
const P_W         = PLAYER_CAR_W;   // 64 – 80 % of lane width
const P_H         = PLAYER_CAR_H;   // 106
const PLAYER_Y    = GAME_H - P_H - 52;   // 482 – near bottom with a small gap
const BASE_SPEED  = 100;  // px/s
const SPEED_GROW  = 10;   // px/s per second survived
const MAX_SPEED   = 620;
const LANE_ANIM   = 500;  // px/s lane-change animation
const DASH_CYCLE  = 80;   // px per dash+gap repeat
const SPAWN_START = 2000; // ms initial spawn interval
const SPAWN_MIN   = 450;  // ms minimum spawn interval
const SPAWN_DECAY = 22;   // ms reduction per second survived

const ENEMY_TYPES: EnemyType[] = ['blue', 'yellow', 'police', 'green', 'orange'];

interface Enemy {
    id: number;
    lane: number;
    y: number;
    type: EnemyType;
}

interface GameData {
    score: number;
    speed: number;
    playerLane: number;
    playerX: number;
    enemies: Enemy[];
    roadOffset: number;
    spawnTimer: number;
    lastTime: number;
    nextId: number;
}

type Phase = 'countdown' | 'playing' | 'paused' | 'gameover';

function makeGameData(): GameData {
    return {
        score: 0,
        speed: BASE_SPEED,
        playerLane: 1,
        playerX: LC[1],
        enemies: [],
        roadOffset: 0,
        spawnTimer: SPAWN_START,
        lastTime: 0,
        nextId: 0,
    };
}

export default function Game() {
    const navigate    = useNavigate();
    const rafRef      = useRef(0);
    const phaseRef    = useRef<Phase>('countdown');
    const gameRef     = useRef<GameData>(makeGameData());
    const crashRef    = useRef(false);
    const [phase, setPhaseState] = useState<Phase>('countdown');
    const [countdown, setCountdown] = useState(3);
    const [showGo, setShowGo] = useState(false);
    const [bestScore] = useState(getBestScore);
    const [lastScore] = useState(getLastScore);
    const [finalScore, setFinalScore] = useState(0);
    const [newBest, setNewBest] = useState(false);
    const [, render] = useReducer(n => n + 1, 0);

    // ── Scale game frame to fill the full viewport ──────────────────────────
    const [gameScale, setGameScale] = useState(1);
    useEffect(() => {
        const GAME_W = 360;
        const update = () => {
            const sx = window.innerWidth  / GAME_W;
            const sy = window.innerHeight / GAME_H;
            setGameScale(Math.min(sx, sy));
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const setPhase = useCallback((p: Phase) => {
        phaseRef.current = p;
        setPhaseState(p);
    }, []);

    // ── Game loop ───────────────────────────────────────────────────────────
    const startLoop = useCallback(() => {
        const s = gameRef.current;
        s.lastTime = performance.now();

        const loop = (ts: number) => {
            const g = gameRef.current;
            const dt = Math.min((ts - g.lastTime) / 1000, 0.05);
            g.lastTime = ts;

            // Score (time-based)
            g.score += dt;

            // Speed
            g.speed = Math.min(BASE_SPEED + g.score * SPEED_GROW, MAX_SPEED);

            // Smooth lane animation
            const tx = LC[g.playerLane];
            const dx = tx - g.playerX;
            const step = LANE_ANIM * dt;
            g.playerX = Math.abs(dx) <= step ? tx : g.playerX + Math.sign(dx) * step;

            // Road scroll (background-position-y driven by JS)
            g.roadOffset = (g.roadOffset + g.speed * dt) % DASH_CYCLE;

            // Spawn
            g.spawnTimer -= dt * 1000;
            if (g.spawnTimer <= 0) {
                const interval = Math.max(SPAWN_MIN, SPAWN_START - g.score * SPAWN_DECAY);
                g.spawnTimer = interval;

                const occupied = g.enemies.filter(e => e.y < CAR_H + 30).map(e => e.lane);
                const avail = [0, 1, 2].filter(l => !occupied.includes(l));

                if (avail.length > 0) {
                    const lane = avail[Math.floor(Math.random() * avail.length)];
                    const type = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
                    g.enemies.push({ id: g.nextId++, lane, y: -CAR_H - 10, type });
                }
            }

            // Move enemies
            for (let i = 0; i < g.enemies.length; i++) {
                g.enemies[i] = { ...g.enemies[i], y: g.enemies[i].y + g.speed * dt };
            }
            g.enemies = g.enemies.filter(e => e.y < GAME_H + CAR_H);

            // Collision – inset 8 px each side so bumps feel fair
            const pL = g.playerX - P_W / 2 + 8;
            const pR = g.playerX + P_W / 2 - 8;
            const pT = PLAYER_Y + 14;
            const pB = PLAYER_Y + P_H - 14;

            let hit = false;
            for (const e of g.enemies) {
                const ex = LC[e.lane];
                const eL = ex - CAR_W / 2 + 5;
                const eR = ex + CAR_W / 2 - 5;
                const eT = e.y + 8;
                const eB = e.y + CAR_H - 8;
                if (pR > eL && pL < eR && pB > eT && pT < eB) { hit = true; break; }
            }

            if (hit) {
                const score = Math.floor(g.score);
                saveScore(score);
                const prev = getBestScore();
                setFinalScore(score);
                setNewBest(score >= prev);
                crashRef.current = true;
                setPhase('gameover');
                render();
                return; // don't reschedule
            }

            render();
            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
    }, [setPhase]);

    // ── Countdown ────────────────────────────────────────────────────────────
    const runCountdown = useCallback(() => {
        let c = 3;
        setCountdown(c);
        setShowGo(false);
        setPhase('countdown');

        const id = setInterval(() => {
            c--;
            if (c > 0) {
                setCountdown(c);
            } else {
                clearInterval(id);
                setShowGo(true);
                setTimeout(() => {
                    setShowGo(false);
                    setPhase('playing');
                    startLoop();
                }, 700);
            }
        }, 1000);

        return id;
    }, [setPhase, startLoop]);

    // ── Mount: start countdown ────────────────────────────────────────────────
    useEffect(() => {
        const id = runCountdown();
        return () => {
            clearInterval(id);
            cancelAnimationFrame(rafRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Keyboard ──────────────────────────────────────────────────────────────
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.repeat) return;
            const p = phaseRef.current;
            const g = gameRef.current;

            if (p === 'playing') {
                if (e.code === 'ArrowLeft'  || e.code === 'KeyA') {
                    g.playerLane = Math.max(0, g.playerLane - 1);
                }
                if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                    g.playerLane = Math.min(LANES - 1, g.playerLane + 1);
                }
                if (e.code === 'KeyP' || e.code === 'Escape') {
                    cancelAnimationFrame(rafRef.current);
                    setPhase('paused');
                }
            } else if (p === 'paused') {
                if (e.code === 'KeyP' || e.code === 'Escape') {
                    gameRef.current.lastTime = performance.now();
                    startLoop();
                    setPhase('playing');
                }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [setPhase, startLoop]);

    // ── Pause on tab hide ─────────────────────────────────────────────────────
    useEffect(() => {
        const onHide = () => {
            if (phaseRef.current === 'playing') {
                cancelAnimationFrame(rafRef.current);
                setPhase('paused');
            }
        };
        document.addEventListener('visibilitychange', onHide);
        return () => document.removeEventListener('visibilitychange', onHide);
    }, [setPhase]);

    // ── Restart ───────────────────────────────────────────────────────────────
    const handleRestart = useCallback(() => {
        cancelAnimationFrame(rafRef.current);
        crashRef.current = false;
        Object.assign(gameRef.current, makeGameData());
        runCountdown();
    }, [runCountdown]);

    // ── Pause/Resume buttons ──────────────────────────────────────────────────
    const handlePause = useCallback(() => {
        if (phaseRef.current === 'playing') {
            cancelAnimationFrame(rafRef.current);
            setPhase('paused');
        }
    }, [setPhase]);

    const handleResume = useCallback(() => {
        if (phaseRef.current === 'paused') {
            gameRef.current.lastTime = performance.now();
            startLoop();
            setPhase('playing');
        }
    }, [setPhase, startLoop]);

    // ── Render ────────────────────────────────────────────────────────────────
    const g = gameRef.current;
    const liveScore = Math.floor(g.score);
    const lean = g.playerX < LC[g.playerLane] - 2 ? -7 : g.playerX > LC[g.playerLane] + 2 ? 7 : 0;

    return (
        <div className="game-page">
            <div
                className="game-frame"
                style={{ transform: `scale(${gameScale})` }}
            >

                <div
                    className={`game-inner${crashRef.current && phase === 'gameover' ? ' crash-flash' : ''}`}
                    style={{ position: 'absolute', inset: 0 }}
                >
                    {/* ── Road layer ─────────────────────────────────────────────── */}
                    <div className="road-layer">
                        <div className="sidewalk left" />
                        <div className="road-surface" />
                        <div className="sidewalk right" />
                    </div>

                    {/* ── Scrolling dashes ───────────────────────────────────────── */}
                    <div className="dash-layer">
                        <div
                            className="dash-line d1"
                            style={{ backgroundPositionY: `${g.roadOffset}px` }}
                        />
                        <div
                            className="dash-line d2"
                            style={{ backgroundPositionY: `${g.roadOffset}px` }}
                        />
                    </div>

                    {/* ── Large faint score in road center ───────────────────────── */}
                    {phase === 'playing' && (
                        <div className="live-score-center">{liveScore}</div>
                    )}

                    {/* ── Enemy cars ─────────────────────────────────────────────── */}
                    {g.enemies.map(enemy => (
                        <div
                            key={enemy.id}
                            className="car-wrap"
                            style={{
                                left: LC[enemy.lane] - CAR_W / 2,
                                top: enemy.y,
                            }}
                        >
                            <EnemyCar type={enemy.type} />
                        </div>
                    ))}

                    {/* ── Player car ─────────────────────────────────────────────── */}
                    <div
                        className="car-wrap"
                        style={{
                            left: g.playerX - P_W / 2,
                            top: PLAYER_Y,
                        }}
                    >
                        <PlayerCar lean={lean} />
                    </div>

                    {/* ── HUD ────────────────────────────────────────────────────── */}
                    <div className="hud">
                        {phase === 'playing' && (
                            <button className="pause-btn" onClick={handlePause} title="Pause (P)">
                                ⏸
                            </button>
                        )}
                        {phase !== 'playing' && <div style={{ width: 38 }} />}

                        <div className="score-hud">
                            <div className="score-live">{liveScore}s</div>
                            <div className="score-sub">BEST&nbsp;<span>{bestScore}s</span></div>
                            <div className="score-sub">LAST&nbsp;<span>{lastScore}s</span></div>
                        </div>
                    </div>

                    {/* ── Countdown overlay ──────────────────────────────────────── */}
                    {phase === 'countdown' && (
                        <div className="overlay-countdown">
                            {showGo
                                ? <div key="go"    className="countdown-go">GO!</div>
                                : <div key={countdown} className="countdown-num">{countdown}</div>
                            }
                        </div>
                    )}

                    {/* ── Pause overlay ──────────────────────────────────────────── */}
                    {phase === 'paused' && (
                        <div className="overlay-pause">
                            <div className="pause-title">PAUSED</div>
                            <div className="pause-hint">
                                PRESS P or ESC TO RESUME<br />
                                ◀ ▶ / A D TO SWITCH LANES
                            </div>
                            <button className="pause-resume-btn" onClick={handleResume}>
                                ▶ RESUME
                            </button>
                        </div>
                    )}

                    {/* ── Game Over overlay ───────────────────────────────────────── */}
                    {phase === 'gameover' && (
                        <div className="overlay-gameover">
                            <div className="go-title">GAME OVER</div>

                            {newBest && (
                                <div className="go-new-record">★ NEW RECORD ★</div>
                            )}

                            <div className="go-scores">
                                <div className="go-score-row">
                                    <span className="go-label">TIME SURVIVED</span>
                                    <span className={`go-value${newBest ? ' new-best' : ''}`}>{finalScore}s</span>
                                </div>
                                <div className="go-score-row" style={{ width: '100%' }}>
                                    <div className="go-divider" style={{ width: '100%', height: 1, background: '#333', marginTop: 4, marginBottom: 4 }} />
                                </div>
                                <div className="go-score-row">
                                    <span className="go-label">BEST</span>
                                    <span className="go-value">{getBestScore()}s</span>
                                </div>
                                <div className="go-score-row">
                                    <span className="go-label">LAST</span>
                                    <span className="go-value">{getLastScore()}s</span>
                                </div>
                            </div>

                            <div className="go-buttons">
                                <button className="go-btn" onClick={() => navigate('/')}>
                                    <span className="go-btn-icon">🏠</span>
                                    HOME
                                </button>
                                <button className="go-btn" onClick={handleRestart}>
                                    <span className="go-btn-icon">🔄</span>
                                    REPLAY
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
