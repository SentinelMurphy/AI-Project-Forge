import { createBrowserRouter } from 'react-router';
import Landing      from './pages/Landing';
import Game         from './pages/Games';
import HighScores   from './pages/HighScores';
import Instructions from './pages/Instructions';

export const router = createBrowserRouter([
    { path: '/',             Component: Landing      },
    { path: '/game',         Component: Game         },
    { path: '/high-scores',  Component: HighScores   },
    { path: '/instructions', Component: Instructions },
]);
