import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  highlight = false,
}) => (
  <div
    className={`flex flex-col items-center p-3 rounded-xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm ${
      highlight ? 'ring-1 ring-indigo-500/50 bg-indigo-500/10' : ''
    }`}
  >
    <div className='text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1'>
      <Icon size={12} /> {label}
    </div>
    <div className='text-xl font-bold text-slate-100'>{value}</div>
  </div>
);
