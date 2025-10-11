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
  const [ready, setReady] = useState(false);

  // useEffect(() => {
  //   const gotoLogin = (msg: string) => {
  //     if (typeof window !== 'undefined') {
  //       alert(msg); // 임시 알림
  //     }
  //     const next = encodeURIComponent(
  //       `${pathname}${sp?.toString() ? `?${sp}` : ''}`,
  //     );
  //     router.replace(`/?next=${next}`);
  //   };

  //   const token =
  //     typeof window !== 'undefined'
  //       ? localStorage.getItem('accessToken')
  //       : null;

  //   if (!token) {
  //     gotoLogin('로그인이 필요합니다.');
  //     return;
  //   }

  //   try {
  //     const [, payloadB64] = token.split('.');
  //     if (payloadB64) {
  //       const payload = JSON.parse(atob(payloadB64));
  //       if (payload.exp && Date.now() >= payload.exp * 1000) {
  //         localStorage.removeItem('accessToken');
  //         gotoLogin('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
  //         return;
  //       }
  //     } else {
  //       localStorage.removeItem('accessToken');
  //       gotoLogin('인증 정보가 유효하지 않습니다. 다시 로그인해주세요.');
  //       return;
  //     }
  //   } catch {
  //     localStorage.removeItem('accessToken');
  //     gotoLogin('인증 정보가 손상되었습니다. 다시 로그인해주세요.');
  //     return;
  //   }

  //   setReady(true);
  // }, [router, pathname, sp]);

  // if (!ready) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center text-gray-500">
  //       인증 확인 중…
  //     </div>
  //   );
  // }

  return <>{children}</>;
}
