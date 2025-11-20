import { ThemeKey, GameMode } from '@/types/types';

export const CARD_THEMES: Record<ThemeKey, string[]> = {
  classic: [
    '🎨',
    '🎭',
    '🎪',
    '🎫',
    '🎬',
    '🎧',
    '🎤',
    '🎹',
    '🎷',
    '🎸',
    '🎺',
    '🎻',
  ],
  nature: [
    '🌲',
    '🌳',
    '🌴',
    '🌵',
    '🌷',
    '🌸',
    '🌹',
    '🌺',
    '🌻',
    '🌼',
    '🌽',
    '🌾',
  ],
  space: [
    '🚀',
    '🛸',
    '🌍',
    '🌕',
    '⭐',
    '☄️',
    '👨‍🚀',
    '📡',
    '🪐',
    '🌑',
    '🔭',
    '🌌',
  ],
};

export const MODES: Record<string, GameMode> = {
  easy: { rows: 4, cols: 4, pairs: 8, name: 'Easy', multiplier: 1 },
  medium: { rows: 6, cols: 4, pairs: 12, name: 'Medium', multiplier: 2 },
  hard: { rows: 6, cols: 6, pairs: 18, name: 'Hard', multiplier: 3 },
};

export const STORAGE_KEYS = {
  SCORES: 'memory_pro_scores_v2',
  USER: 'memory_pro_user_v2',
  THEME: 'memory_pro_theme',
};
