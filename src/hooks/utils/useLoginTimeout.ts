import { useAuthStore } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15분


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
        alert('1분이 지나 자동 로그아웃 되었습니다.');
        router.push('/login');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [now]);

  return {
    resetTimer,
    remainingTimeMs: remaining,
    remainingSeconds: Math.max(0, Math.floor(remaining / 1000)),
  };
};