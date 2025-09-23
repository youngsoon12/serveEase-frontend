'use client';

import { useState, useEffect } from 'react';

// 오전 3:45 → 오전 3시 45분 포맷
function formatTime(d: Date) {
  return (
    d
      .toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .replace(':', '시 ') + '분'
  );
}

export default function LiveTime() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => setTime(formatTime(new Date()));
    update();

    const id = setInterval(update, 60_000);

    return () => clearInterval(id);
  }, []);

  return (
    <time suppressHydrationWarning dateTime={new Date().toISOString()}>
      {time}
    </time>
  );
}
