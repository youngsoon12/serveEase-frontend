// app/(private)/layout.tsx
'use client';

import { Suspense } from 'react';

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
      {children}
    </Suspense>
  );
}
