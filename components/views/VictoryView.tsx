import { User, GameStats } from '@/types/types';
import { Trophy, RotateCcw, ChevronLeft } from 'lucide-react';
import Button from '../ui/Button';

const VictoryView: React.FC<{
  user: User | null;
  stats: GameStats | null;
  onRestart: () => void;
  onDashboard: () => void;
}> = ({ user, stats, onRestart, onDashboard }) => (
  <div className='min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-500'>
    <div className='w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce'>
      <Trophy className='text-emerald-400 w-12 h-12' />
    </div>
    <h1 className='text-4xl font-bold text-white mb-2'>Level Complete!</h1>
    <p className='text-slate-400 mb-2'>Excellent memory work, {user?.name}!</p>
    <div className='text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500 mb-8'>
      Score: {stats?.score || 0}
    </div>

    <div className='grid grid-cols-2 gap-4 w-full max-w-sm mb-8'>
      <div className='bg-slate-800/50 p-4 rounded-2xl border border-slate-700'>
        <div className='text-slate-500 text-xs font-bold uppercase mb-1'>
          Time
        </div>
        <div className='text-2xl font-mono text-white'>{stats?.time}s</div>
      </div>
      <div className='bg-slate-800/50 p-4 rounded-2xl border border-slate-700'>
        <div className='text-slate-500 text-xs font-bold uppercase mb-1'>
          Moves
        </div>
        <div className='text-2xl font-mono text-white'>{stats?.moves}</div>
      </div>
    </div>

    <div className='flex flex-col sm:flex-row gap-4 w-full max-w-xs'>
      <Button onClick={onRestart} variant='primary' icon={RotateCcw}>
        Play Again
      </Button>
      <Button onClick={onDashboard} variant='secondary' icon={ChevronLeft}>
        Dashboard
      </Button>
    </div>
  </div>
);
export default VictoryView;