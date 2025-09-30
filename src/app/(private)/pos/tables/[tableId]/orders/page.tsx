'use client';

import ModalShell from '@/components/ModalShell';

export default function OrderCheckPage() {
  return (
    <div>
      주문 내역 확인 원본 페이지
      {/* ModalShell이 title, size, {children} 을 필수로 받아 임시로 수정해놨습니다. */}
      <ModalShell title="주문 내역 확인" size="lg">
        <div>빌드를 위한 임시 영역</div>
      </ModalShell>
    </div>
  );
}
