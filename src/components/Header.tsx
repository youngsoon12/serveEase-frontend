'use client';

import Link from 'next/link';
import Logo from './Logo';
import LiveTime from './LiveTime';
import { useEffect, useState } from 'react';

export default function Header() {
  const [storeName, setStoreName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('storeName');

    if (name) {
      setStoreName(name);
    }
  }, []);

  return (
    <header className="h-20 bg-header text-white">
      <div className="mx-auto  h-full flex items-center justify-between px-16">
        <Link href={'/pos'} aria-label="메인 홈으로 이동">
          <Logo />
        </Link>
        <div className="flex items-center gap-5">
          <p>{`${storeName}님 안녕하세요.`}</p>
          <p className="font-light text-gray-300">
            <LiveTime />
          </p>
        </div>
      </div>
    </header>
  );
}
