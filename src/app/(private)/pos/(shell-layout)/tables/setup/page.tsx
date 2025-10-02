'use client';

import TableSetup from '@/components/page/TableSetup';
import { useRouter } from 'next/navigation';

export default function TableSetupPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">테이블 설정</h1>
      <div className="p-8 border rounded-lg shadow-lg bg-white w-full max-w-md">
        <TableSetup onSuccess={() => router.replace('/')} />
      </div>
    </div>
  );
}
