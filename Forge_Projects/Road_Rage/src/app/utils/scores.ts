export interface ScoreEntry {
   score: number;
   date: string;
}

const SCORES_KEY = 'roadrage_scores';
const LAST_KEY   = 'roadrage_last';

export function saveScore(score: number): void {
   const entries = getAllScores();
   entries.push({ score, date: new Date().toLocaleDateString() });
   entries.sort((a, b) => b.score - a.score);
   localStorage.setItem(SCORES_KEY, JSON.stringify(entries.slice(0, 10)));
   localStorage.setItem(LAST_KEY, String(score));
}

export function getAllScores(): ScoreEntry[] {
   const raw = localStorage.getItem(SCORES_KEY);
   return raw ? (JSON.parse(raw) as ScoreEntry[]) : [];
}

export function getBestScore(): number {
   const entries = getAllScores();
   return entries.length > 0 ? entries[0].score : 0;
}

export function getLastScore(): number {
   return Number(localStorage.getItem(LAST_KEY) ?? 0);
}
