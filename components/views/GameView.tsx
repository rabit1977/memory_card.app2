import useMemoryGame from '@/hooks/useMemoryGame';
import { GameMode, ThemeKey, GameStats } from '@/types/types';
import { ChevronLeft, Play } from 'lucide-react';
import Card from '../game/Card';
import Button from '../ui/Button';

interface GameViewProps {
  mode: GameMode;
  theme: ThemeKey;
  soundEnabled: boolean;
  onFinish: (stats: GameStats) => void;
  onExit: () => void;
  isActive: boolean;
}

const GameView: React.FC<GameViewProps> = ({
  mode,
  theme,
  soundEnabled,
  onFinish,
  onExit,
}) => {
  // Using our custom hook logic here
  const {
    cards,
    flipped,
    matched,
    moves,
    time,
    isPaused,
    setIsPaused,
    handleCardClick,
  } = useMemoryGame(mode, theme, onFinish, soundEnabled);

  return (
    <div className='flex flex-col h-full w-full max-w-4xl mx-auto animate-in zoom-in-95 duration-300'>
      <div className='flex items-center justify-between mb-6 p-4 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800 sticky top-4 z-20 shadow-xl'>
        <Button
          variant='ghost'
          onClick={onExit}
          icon={ChevronLeft}
          className='text-sm py-2 px-3'
        >
          Give Up
        </Button>

        <div className='flex items-center gap-6'>
          <div className='flex flex-col items-center'>
            <span className='text-[10px] uppercase tracking-widest text-slate-500 font-bold'>
              Time
            </span>
            <span className='text-xl font-mono font-bold text-indigo-400 w-16 text-center'>
              {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className='w-px h-8 bg-slate-700' />
          <div className='flex flex-col items-center'>
            <span className='text-[10px] uppercase tracking-widest text-slate-500 font-bold'>
              Moves
            </span>
            <span className='text-xl font-mono font-bold text-emerald-400'>
              {moves}
            </span>
          </div>
        </div>

        <Button
          variant='outline'
          onClick={() => setIsPaused(!isPaused)}
          className='text-sm py-2 px-3'
        >
          {isPaused ? (
            <Play size={16} />
          ) : (
            <span className='text-xs font-bold tracking-widest'>PAUSE</span>
          )}
        </Button>
      </div>

      <div className='flex-1 flex items-center justify-center p-2'>
        {isPaused ? (
          <div className='text-center p-12 bg-slate-900/50 rounded-3xl border border-slate-800 backdrop-blur'>
            <h2 className='text-3xl font-bold text-white mb-4'>Game Paused</h2>
            <Button
              onClick={() => setIsPaused(false)}
              variant='primary'
              icon={Play}
            >
              Resume
            </Button>
          </div>
        ) : (
          <div
            className='grid gap-3 w-full max-w-lg mx-auto'
            style={{
              gridTemplateColumns: `repeat(${mode.cols}, minmax(0, 1fr))`,
            }}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                item={card}
                isFlipped={
                  flipped.includes(card.id) || matched.includes(card.id)
                }
                isMatched={matched.includes(card.id)}
                onClick={() => handleCardClick(card.id)}
                disabled={isPaused || !isActive}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default GameView;