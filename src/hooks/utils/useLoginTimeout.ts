import { useAuthStore } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15분

/**
 * 로그인 타임아웃 Hooks
 * 
 * 로그인 후 15분 동안 활동이 없으면 자동으로 로그아웃 되는 Hooks.
 * @returns 로그인 타임아웃 상태
 */
export const useLoginTimeout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.setLogout);
  const [remaining, setRemaining] = useState<number>(SESSION_TIMEOUT);
  const [now, setNow] = useState<number>(Date.now());
  
  const resetTimer = () => {
    setNow(Date.now());
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = SESSION_TIMEOUT - (Date.now() - now);
      setRemaining(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(interval);
        logout();
        alert('15분이 지나 자동 로그아웃 되었습니다.');
        router.push('/login');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [now, logout, router]);

  return {
    resetTimer,
    remainingTimeMs: remaining,
    remainingSeconds: Math.max(0, Math.floor(remaining / 1000)),
  };
};