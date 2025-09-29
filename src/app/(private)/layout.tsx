// app/(private)/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [ready, setReady] = useState(false); // FOUC 방지용

  useEffect(() => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    if (!token) {
      const next = encodeURIComponent(
        `${pathname}${sp?.toString() ? `?${sp}` : ''}`,
      );
      router.replace(`/?next=${next}`);
      return;
    }

    try {
      const [, payloadB64] = token.split('.');
      if (payloadB64) {
        const payload = JSON.parse(atob(payloadB64));
        if (payload.exp && Date.now() >= payload.exp * 1000) {
          // 만료 시 토큰 삭제 + 리다이렉트
          localStorage.removeItem('accessToken');
          const next = encodeURIComponent(
            `${pathname}${sp?.toString() ? `?${sp}` : ''}`,
          );
          router.replace(`/?next=${next}`);
          return;
        }
      }
    } catch {
      localStorage.removeItem('accessToken');
      const next = encodeURIComponent(
        `${pathname}${sp?.toString() ? `?${sp}` : ''}`,
      );
      router.replace(`/?next=${next}`);
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
