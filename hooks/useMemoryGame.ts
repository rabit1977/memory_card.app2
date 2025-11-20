import { CARD_THEMES } from '@/lib/constants';
import { CardItem, GameMode, GameStats, ThemeKey } from '@/types/types';
import { useCallback, useEffect, useState } from 'react';
import useSound from './useSound';

const generateDeck = (mode: GameMode, themeKey: ThemeKey): CardItem[] => {
  const theme = CARD_THEMES[themeKey];
  const totalPairs = mode.pairs;
  const icons = [...theme];
  const selectedEmojis = icons
    .sort(() => 0.5 - Math.random())
    .slice(0, totalPairs);

  return [...selectedEmojis, ...selectedEmojis]
    .sort(() => 0.5 - Math.random())
    .map((emoji, index) => ({
      id: index,
      content: emoji,
    }));
};
export const useMemoryGame = (
  mode: GameMode,
  themeKey: ThemeKey,
  onGameFinish: (stats: GameStats) => void,
  soundEnabled: boolean
) => {
  const [cards, setCards] = useState<CardItem[]>(() =>
    generateDeck(mode, themeKey)
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const { playFlip, playMatch, playWin } = useSound(soundEnabled);

  const resetGame = useCallback(() => {
    setCards(generateDeck(mode, themeKey));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
    setIsActive(true);
    setIsPaused(false);
  }, [mode, themeKey]);

  // Reset game when mode or theme changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    resetGame();
  }, [resetGame]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused]);

  // Logic: Match Checking
  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      const card1 = cards.find((c) => c.id === first);
      const card2 = cards.find((c) => c.id === second);

      if (card1 && card2 && card1.content === card2.content) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
        playMatch();
      } else {
        const timer = setTimeout(() => setFlipped([]), 1000);
        return () => clearTimeout(timer);
      }
      setMoves((m) => m + 1);
    }
  }, [flipped, cards, playMatch]);

  // Logic: Victory Condition
  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      setIsActive(false);
      playWin();

      // Calculate Score
      // Base: 1000 * multiplier
      // Penalty: -10 per second, -5 per move
      const baseScore = 1000 * mode.multiplier;
      const timePenalty = time * 2;
      const movePenalty = moves * 5;
      const finalScore = Math.max(0, baseScore - timePenalty - movePenalty);

      setTimeout(() => {
        onGameFinish({
          moves,
          time,
          completed: true,
          mode: mode.name,
          score: finalScore,
        });
      }, 1000);
    }
  }, [matched, cards, moves, time, onGameFinish, mode, playWin]);

  const handleCardClick = (id: number) => {
    if (
      isPaused ||
      !isActive ||
      matched.includes(id) ||
      flipped.includes(id) ||
      flipped.length === 2
    )
      return;

    playFlip();
    setFlipped((prev) => [...prev, id]);
  };

  return {
    cards,
    flipped,
    matched,
    moves,
    time,
    isPaused,
    setIsPaused,
    handleCardClick,
    isActive,
  };
};

export default useMemoryGame;
