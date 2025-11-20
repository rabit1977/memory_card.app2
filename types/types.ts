export interface GameMode {
  rows: number;
  cols: number;
  pairs: number;
  name: string;
  multiplier: number; // Added for scoring
}

export interface User {
  name: string;
  id: string;
  joined: string;
}

export interface GameStats {
  moves: number;
  time: number;
  completed: boolean;
  mode: string;
  score: number; // Added score
  date?: string;
}

export interface CardItem {
  id: number;
  content: string;
}

export type ThemeKey = 'classic' | 'nature' | 'space';
export type ViewState = 'login' | 'dashboard' | 'game' | 'win';