'use client';
import { useEffect, useState } from 'react';

export default function Countdown({ closingDate }: { closingDate: string }) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const end = new Date(closingDate).getTime();
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('(Closed)');
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`(${d}d ${h}h ${m}m ${s}s)`);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [closingDate]);

  return (
    <span className={`countdown ${timeLeft === '(Closed)' ? 'closed' : ''}`}>
      {timeLeft}
    </span>
  );
}
