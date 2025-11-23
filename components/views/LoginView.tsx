import { User } from '@/types/types';
import { Brain, Play, XCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const LoginView: React.FC<{ onLogin: (user: User) => void }> = ({
  onLogin,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitting login with name:', name);
    if (!name.trim()) {
      setError('Please enter your name to start.');
      return;
    }
    onLogin({
      name: name.trim(),
      id: Date.now().toString(),
      joined: new Date().toISOString(),
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-[radial-(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-[#0B1120] to-black'>
      <div className='w-full max-w-md relative'>
        <div className='absolute -top-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-700' />

        <div className='relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20 transform rotate-3 hover:rotate-0 transition-all duration-500'>
              <Brain className='text-white w-8 h-8' />
            </div>
            <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400 mb-2'>
              MindMatch Pro
            </h1>
            <p className='text-slate-400'>
              Train your brain, track your progress.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <Input
              label='Player Name'
              placeholder='Enter your alias...'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && (
              <p className='text-red-400 text-sm flex items-center gap-1'>
                <XCircle size={14} /> {error}
              </p>
            )}
            <Button type='submit' className='w-full' icon={Play}>
              Start Playing
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginView;