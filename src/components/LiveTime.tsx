'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState, useEffect } from 'react';

export default function LiveTime() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const formattedTime = format(new Date(), 'a h시 mm분', { locale: ko });

      setTime(formattedTime);
    };

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
