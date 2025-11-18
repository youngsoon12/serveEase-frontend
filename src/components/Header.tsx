'use client';

import Link from 'next/link';
import Logo from './Logo';
import LiveTime from './LiveTime';
import { useEffect, useState } from 'react';
import { getCookie } from '@/lib/cookies';
import Dropdown from './Dropdown';

export default function Header() {
  const [storeName, setStoreName] = useState('');

  useEffect(() => {
    const name = getCookie('storeName');

    if (name) {
      setStoreName(name);
    }
  }, []);

  return (
    <header className="h-20 bg-header text-white select-none">
      <div className="mx-auto  h-full flex items-center justify-between px-16">
        <Link href={'/pos'} aria-label="메인 홈으로 이동">
          <Logo />
        </Link>
        <div className="flex items-center gap-5">
          <div className="flex gap-2">
            <p>{`${storeName}님 안녕하세요.`}</p>
            <Dropdown />
          </div>
          <p className="font-light text-gray-300">
            <LiveTime />
          </p>
        </div>
      </div>
    </header>
  );
}
