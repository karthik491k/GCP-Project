import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center bg-[#121212] text-white px-2.5 py-1 min-w-[36px]">
        <span className="text-sm font-bold tracking-tight">{pad(timeLeft.hours)}</span>
        <span className="text-[9px] uppercase tracking-wider text-neutral-400">HRS</span>
      </div>
      <span className="font-bold text-neutral-400">:</span>
      <div className="flex flex-col items-center bg-[#121212] text-white px-2.5 py-1 min-w-[36px]">
        <span className="text-sm font-bold tracking-tight">{pad(timeLeft.minutes)}</span>
        <span className="text-[9px] uppercase tracking-wider text-neutral-400">MIN</span>
      </div>
      <span className="font-bold text-neutral-400">:</span>
      <div className="flex flex-col items-center bg-[#121212] text-white px-2.5 py-1 min-w-[36px]">
        <span className="text-sm font-bold tracking-tight">{pad(timeLeft.seconds)}</span>
        <span className="text-[9px] uppercase tracking-wider text-neutral-400">SEC</span>
      </div>
    </div>
  );
};
