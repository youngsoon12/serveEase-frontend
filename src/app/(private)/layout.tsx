// app/(private)/layout.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getCookie } from '@/lib/cookies';

function PrivateInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const gotoLogin = (msg: string) => {
      if (typeof window !== 'undefined') {
        alert(msg); // 임시 알림
      }
      const next = encodeURIComponent(
        `${pathname}${sp?.toString() ? `?${sp}` : ''}`,
      );
      router.replace(`/?next=${next}`);
    };

    const isLoggedIn = getCookie('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      gotoLogin('로그인이 필요합니다.');
      return;
    }

    setReady(true);
  }, [router, pathname, sp]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        인증 확인 중…
      </div>
    );
  }

  return <>{children}</>;
}

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          인증 확인 중…
        </div>
      }
    >
      <PrivateInner>{children}</PrivateInner>
    </Suspense>
  );
}
