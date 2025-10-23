import type { RouteObject } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SettingsPage from '../pages/SettingsPage';
import WordPage from '@pages/WordPage.tsx';
import RepetitionPage from '@pages/RepetitionPage.tsx';
import LearningPage from '../pages/LearningPage';
import WordDetailPage from '@pages/WordDetailPage.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/words',
    element: <WordPage />,
  },
  {
    path: '/repetition',
    element: <RepetitionPage />,
  },
  {
    path: '/learn',
    element: <LearningPage />,
  },
  {
    path: '*',
    element: <HomePage />,
  },
  {
    path: "/words/:wordId",
    element: <WordDetailPage />,
  }
];

export default routes;