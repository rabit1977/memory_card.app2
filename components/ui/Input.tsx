import { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => (
  <div className='flex flex-col gap-1.5 w-full'>
    <label className='text-xs font-medium text-slate-400 uppercase tracking-wider ml-1'>
      {label}
    </label>
    <input
      type='text'
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className='w-full bg-slate-900/50 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:ring-2 focus:ring-indigo-500/20'
    />
  </div>
);
export default Input;