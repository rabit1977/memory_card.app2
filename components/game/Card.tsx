import { CardItem } from '@/types/types';
import { Brain, CheckCircle2 } from 'lucide-react';

interface CardProps {
  item: CardItem;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({
  item,
  isFlipped,
  isMatched,
  onClick,
  disabled,
}) => {
  return (
    <div
      className={`relative cursor-pointer group select-none ${
        disabled ? 'cursor-default' : ''
      }`}
      onClick={!disabled ? onClick : undefined}
      style={{ perspective: '1000px', WebkitPerspective: '1000px' }}
    >
      <div
        className={`
          w-full aspect-square duration-500 transition-all shadow-xl relative
          ${isMatched ? 'scale-95' : 'hover:-translate-y-1'}
        `}
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Face */}
        <div
          className='absolute inset-0 w-full h-full rounded-xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden'
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity' />
          <Brain className='text-slate-600 w-1/3 h-1/3' strokeWidth={1.5} />
        </div>

        {/* Back Face */}
        <div
          className={`
            absolute inset-0 w-full h-full rounded-xl 
            flex items-center justify-center text-4xl border-2 shadow-lg
            ${
              isMatched
                ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-slate-900 border-indigo-500/50 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]'
            }
          `}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <span className='select-none transform transition-transform animate-in zoom-in duration-300'>
            {item.content}
          </span>
          {isMatched && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <CheckCircle2 className='w-full h-full text-emerald-500 opacity-20 animate-ping' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Card;
