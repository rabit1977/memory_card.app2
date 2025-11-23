'use client';

import { MODES, STORAGE_KEYS } from '@/lib/constants';
import { GameMode, GameStats, ThemeKey, User } from '@/types/types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface GameContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  history: GameStats[];
  addGameResult: (stats: GameStats) => void;
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  lastGameStats: GameStats | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  // User State
  const [user, setUser] = useState<User | null>(null);
  
  // History State
  const [history, setHistory] = useState<GameStats[]>([]);

  // Settings State
  const [theme, setThemeState] = useState<ThemeKey>('classic');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Game State
  const [gameMode, setGameMode] = useState<GameMode>(MODES.easy);
  const [lastGameStats, setLastGameStats] = useState<GameStats | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedScores = localStorage.getItem(STORAGE_KEYS.SCORES);
      if (storedScores) setHistory(JSON.parse(storedScores));

      const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (storedTheme) setThemeState(storedTheme as ThemeKey);
    } catch (error) {
      console.error('Failed to load from localStorage', error);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  const addGameResult = (stats: GameStats) => {
    const newHistory = [...history, { ...stats, date: new Date().toISOString() }];
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(newHistory));
    setLastGameStats(stats);
  };

  const setTheme = (newTheme: ThemeKey) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <GameContext.Provider
      value={{
        user,
        login,
        logout,
        history,
        addGameResult,
        theme,
        setTheme,
        soundEnabled,
        toggleSound,
        gameMode,
        setGameMode,
        lastGameStats,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
