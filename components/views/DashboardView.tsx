import { MODES } from '@/lib/constants';
import { GameMode, GameStats, ThemeKey, User } from '@/types/types';
import {
  CheckCircle2,
  ChevronLeft,
  Gamepad2,
  History,
  LogOut,
  Palette,
  Play,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useMemo } from 'react';
import Button from '../ui/Button';
import { StatCard } from '../ui/StatCard';

interface DashboardProps {
  user: User;
  history: GameStats[];
  currentTheme: ThemeKey;
  soundEnabled: boolean;
  onLogout: () => void;
  onStartGame: (mode: GameMode) => void;
  onToggleTheme: (theme: ThemeKey) => void;
  onToggleSound: () => void;
}

const DashboardView: React.FC<DashboardProps> = ({
  user,
  history,
  currentTheme,
  soundEnabled,
  onLogout,
  onStartGame,
  onToggleTheme,
  onToggleSound,
}) => {
  const stats = useMemo(() => {
    const wins = history.filter((h) => h.completed);
    const bestScore = wins.length
      ? Math.max(...wins.map((w) => w.score || 0))
      : 0;
    return { games: history.length, bestScore, totalWins: wins.length };
  }, [history]);

  return (
    <div className='max-w-5xl mx-auto w-full p-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <header className='flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-md'>
        <div className='flex items-center gap-4'>
          <div className='w-12 h-12 rounded-full bg-linear-to-r from-pink-500 to-rose-500 flex items-center justify-center text-lg font-bold text-white shadow-lg'>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className='text-xl font-bold text-white'>
              Welcome back, {user.name}
            </h2>
            <div className='flex items-center gap-2 text-sm text-slate-400'>
              <Trophy size={14} className='text-yellow-500' />
              <span>Rank: {stats.totalWins > 10 ? 'Master' : 'Novice'}</span>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' onClick={onToggleSound} className='p-2'>
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </Button>
          <Button
            variant='outline'
            onClick={onLogout}
            icon={LogOut}
            className='shrink-0'
          >
            Sign Out
          </Button>
        </div>
      </header>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <StatCard icon={Gamepad2} label='Games Played' value={stats.games} />
        <StatCard
          icon={CheckCircle2}
          label='Total Wins'
          value={stats.totalWins}
        />
        <StatCard
          icon={Trophy}
          label='High Score'
          value={stats.bestScore}
          highlight
        />
        <StatCard
          icon={Sparkles}
          label='Total XP'
          value={stats.totalWins * 100}
        />
      </div>

      <div className='grid md:grid-cols-3 gap-8'>
        <div className='md:col-span-2 space-y-6'>
          {/* Theme Selector */}
          <div className='bg-slate-900/50 rounded-2xl border border-slate-800 p-4 flex items-center justify-between'>
            <div className='flex items-center gap-2 text-slate-300 font-medium'>
              <Palette size={18} /> Theme:
            </div>
            <div className='flex gap-2'>
              {(['classic', 'nature', 'space'] as ThemeKey[]).map((t) => (
                <button
                  key={t}
                  onClick={() => onToggleTheme(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                    currentTheme === t
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <h3 className='text-lg font-semibold text-slate-300 flex items-center gap-2'>
            <Play className='text-indigo-400' size={20} /> Select Difficulty
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {Object.entries(MODES).map(([key, mode]) => (
              <button
                key={key}
                onClick={() => onStartGame(mode)}
                className='group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-6 text-left transition-all hover:border-indigo-500 hover:bg-slate-800'
              >
                <div className='absolute inset-0 bg-linear-to-br from-indigo-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
                <div className='relative z-10'>
                  <h4 className='text-lg font-bold text-slate-100 mb-1'>
                    {mode.name}
                  </h4>
                  <p className='text-sm text-slate-400'>
                    {mode.rows}x{mode.cols} Grid
                  </p>
                  <div className='mt-4 flex items-center gap-2 text-xs font-medium text-indigo-400 group-hover:text-indigo-300'>
                    Start Game <ChevronLeft className='rotate-180' size={14} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className='bg-slate-900/50 rounded-2xl border border-slate-800 p-6'>
            <h3 className='text-lg font-semibold text-slate-300 flex items-center gap-2 mb-4'>
              <History className='text-indigo-400' size={20} /> Recent Matches
            </h3>
            {history.length === 0 ? (
              <p className='text-slate-500 text-sm italic'>
                No games played yet.
              </p>
            ) : (
              <div className='space-y-3'>
                {history
                  .slice()
                  .reverse()
                  .slice(0, 3)
                  .map((game, idx) => (
                    <div
                      key={game.date || idx}
                      className='flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50'
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            game.completed ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                        />
                        <span className='text-slate-300 text-sm font-medium'>
                          {game.mode} Mode
                        </span>
                      </div>
                      <div className='flex flex-col items-end'>
                        <span className='text-emerald-400 text-xs font-bold'>
                          +{game.score || 0} pts
                        </span>
                        <span className='text-slate-500 text-[10px] font-mono'>
                          {game.moves} moves • {game.time}s
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className='bg-slate-900/50 rounded-2xl border border-slate-800 p-6'>
          <h3 className='text-lg font-semibold text-slate-300 flex items-center gap-2 mb-4'>
            <Trophy className='text-yellow-500' size={20} /> Local Leaders
          </h3>
          <div className='space-y-4'>
            {[
              { name: 'CyberNinja', score: 2400 },
              { name: user.name || 'You', score: stats.bestScore }, // Show actual high score
              { name: 'PixelMage', score: 1500 },
              { name: 'RetroKing', score: 800 },
            ]
              .sort((a, b) => b.score - a.score)
              .map((player, idx) => (
                <div key={idx} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                        idx === 0
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        player.name === user.name
                          ? 'text-indigo-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {player.name}
                    </span>
                  </div>
                  <span className='text-xs font-mono text-slate-500'>
                    {player.score} pts
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
