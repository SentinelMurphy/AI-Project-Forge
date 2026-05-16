import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getAllScores } from '../utils/scores';
import '../../styles/highscores.scss';

export default function HighScores() {
    const navigate = useNavigate();
    const [scores, setScores] = useState(() => getAllScores());

    const rankClass = (i: number) => {
        if (i === 0) return 'gold';
        if (i === 1) return 'silver';
        if (i === 2) return 'bronze';
        return '';
    };

    const rankLabel = (i: number) => {
        if (i === 0) return '🥇';
        if (i === 1) return '🥈';
        if (i === 2) return '🥉';
        return `#${i + 1}`;
    };

    const handleClear = () => {
        localStorage.removeItem('roadrage_scores');
        localStorage.removeItem('roadrage_last');
        setScores([]);
    };

    return (
        <div className="hs-page">
            <div className="hs-panel">
                <button className="hs-back" onClick={() => navigate('/')}>
                    BACK
                </button>

                <h1 className="hs-title">HIGH SCORES</h1>

                {scores.length === 0 ? (
                    <div className="hs-empty">
                        NO SCORES YET<br />
                        GET IN THE CAR<br />
                        AND DRIVE!
                    </div>
                ) : (
                    <table className="hs-table">
                        <thead>
                        <tr>
                            <th>RANK</th>
                            <th>DATE</th>
                            <th style={{ textAlign: 'right' }}>TIME</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scores.map((entry, i) => (
                            <tr
                                key={i}
                                className="hs-row"
                                style={{ animationDelay: `${i * 0.06}s` }}
                            >
                                <td className={`hs-rank ${rankClass(i)}`}>{rankLabel(i)}</td>
                                <td className="hs-date">{entry.date}</td>
                                <td className="hs-score">
                                    <span>{entry.score}</span>s
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {scores.length > 0 && (
                    <button className="hs-clear-btn" onClick={handleClear}>
                        CLEAR SCORES
                    </button>
                )}
            </div>
        </div>
    );
}
