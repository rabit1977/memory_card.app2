'use client';

import LoginView from '@/components/views/LoginView';
import { useGame } from '@/context/GameContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, login } = useGame();
  const router = useRouter();

  useEffect(() => {
    console.log('Login Page: user state changed:', user);
    if (user) {
      console.log('Login Page: Redirecting to dashboard...');
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = (userData: any) => {
    console.log('Login Page: handleLogin called with:', userData);
    login(userData);
  };

  return <LoginView onLogin={handleLogin} />;
}
