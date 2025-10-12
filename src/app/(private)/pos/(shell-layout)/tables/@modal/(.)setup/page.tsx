'use client';

import ModalShell from '@/components/ModalShell';
import TableSetup from '@/components/page/TableSetup';
import { useRouter } from 'next/navigation';

export default function TableSetupModal() {
  const router = useRouter();

  return (
    <ModalShell title={'테이블 설정'} size="sm">
      <TableSetup onSuccess={() => router.back()} />
    </ModalShell>
  );
}
