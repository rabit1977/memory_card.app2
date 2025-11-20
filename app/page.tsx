'use client';

import DashboardView from '@/components/views/DashboardView';
import GameView from '@/components/views/GameView';
import LoginView from '@/components/views/LoginView';
import VictoryView from '@/components/views/VictoryView';
import { MODES, STORAGE_KEYS } from '@/lib/constants';
import { GameMode, GameStats, ThemeKey, User, ViewState } from '@/types/types';
import { useCallback, useState } from 'react';

const App: React.FC = () => {
  // Global State
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      return null;
    }
  });
  const [history, setHistory] = useState<GameStats[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const storedScores = localStorage.getItem(STORAGE_KEYS.SCORES);
      return storedScores ? JSON.parse(storedScores) : [];
    } catch (error) {
      console.error('Failed to parse scores from localStorage', error);
      return [];
    }
  });
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    if (typeof window === 'undefined') return 'login';
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      return storedUser ? 'dashboard' : 'login';
    } catch (error) {
      console.error('Failed to determine view from localStorage', error);
      return 'login';
    }
  });
  const [gameMode, setGameMode] = useState<GameMode>(MODES.easy);
  const [theme, setTheme] = useState<ThemeKey>(() => {
    if (typeof window === 'undefined') return 'classic';
    try {
      const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      return storedTheme ? (storedTheme as ThemeKey) : 'classic';
    } catch (error) {
      console.error('Failed to parse theme from localStorage', error);
      return 'classic';
    }
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [lastGameStats, setLastGameStats] = useState<GameStats | null>(null);

  // Handlers
  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  const handleThemeToggle = (newTheme: ThemeKey) => {
    setTheme(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  };

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setCurrentView('game');
  };

  const handleGameFinish = useCallback(
    (stats: GameStats) => {
      const newHistory = [
        ...history,
        { ...stats, date: new Date().toISOString() },
      ];
      setHistory(newHistory);
      localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(newHistory));
      setLastGameStats(stats);
      setCurrentView('win');
    },
    [history]
  );

  return (
    <div className='min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-indigo-500/30'>
      {/* Background Decorations */}
      <div className='fixed inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl' />
      </div>

      {/* Main Layout */}
      <div className='relative z-10 min-h-screen flex flex-col'>
        {currentView === 'login' && <LoginView onLogin={handleLogin} />}

        {currentView === 'dashboard' && user && (
          <div className='flex-1 py-8 px-4'>
            <DashboardView
              user={user}
              history={history}
              currentTheme={theme}
              soundEnabled={soundEnabled}
              onLogout={handleLogout}
              onStartGame={startGame}
              onToggleTheme={handleThemeToggle}
              onToggleSound={() => setSoundEnabled(!soundEnabled)}
            />
          </div>
        )}

        {currentView === 'game' && (
          <div className='flex-1 p-4 flex items-center justify-center'>
            <GameView
              mode={gameMode}
              theme={theme}
              soundEnabled={soundEnabled}
              onFinish={handleGameFinish}
              onExit={() => setCurrentView('dashboard')}
            />
          </div>
        )}

        {currentView === 'win' && (
          <VictoryView
            user={user}
            stats={lastGameStats}
            onRestart={() => setCurrentView('game')}
            onDashboard={() => setCurrentView('dashboard')}
          />
        )}
      </div>
    </div>
  );
};

export default App;
