'use client';

import ModalShell from '@/components/ModalShell';
import OrderCheck from '@/components/page/OrderCheck';

export default function OrderCheckModal() {
  return (
    <ModalShell title={'주문 내역'} size="default">
      <OrderCheck />
    </ModalShell>
  );
}
