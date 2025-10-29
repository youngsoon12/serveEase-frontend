// app/(private)/pos/(shell-layout)/reports/layout.tsx
'use client';

import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/pos/reports/sales/chart', label: '매출 현황' },
  { href: '/pos/reports/sales/calendar', label: '매출 달력' },
];

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-default">
      <Header />

      {/* 사이드바 */}
      <div className="flex min-h-screen overflow-hidden">
        <aside
          className="w-56 shrink-0 bg-[#3E4B57] text-white p-4
                 flex flex-col items-center"
        >
          <BackButton
            buttonStyle="w-10 h-10 rounded-md hover:bg-white/10"
            iconStyle="size-5"
          />
          <nav className="mt-4 w-full space-y-2">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    'block w-full rounded-md px-3 py-2 text-lg font-medium text-center',
                    active ? 'bg-[#1D6FF2]' : 'hover:bg-white/10',
                  ].join(' ')}
                  aria-current={active ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-h-0 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
