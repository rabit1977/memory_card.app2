'use client';

import DashboardView from '@/components/views/DashboardView';
import { useGame } from '@/context/GameContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const {
    user,
    history,
    theme,
    setTheme,
    soundEnabled,
    toggleSound,
    logout,
    setGameMode,
  } = useGame();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleStartGame = (mode: any) => {
    setGameMode(mode);
    router.push('/game');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className='min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-indigo-500/30'>
      {/* Background Decorations */}
      <div className='fixed inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl' />
      </div>

      <div className='relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8'>
        <DashboardView
          user={user}
          history={history}
          currentTheme={theme}
          soundEnabled={soundEnabled}
          onLogout={handleLogout}
          onStartGame={handleStartGame}
          onToggleTheme={setTheme}
          onToggleSound={toggleSound}
        />
      </div>
    </div>
  );
}
