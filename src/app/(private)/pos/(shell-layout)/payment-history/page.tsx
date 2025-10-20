'use client';

import Button from '@/components/Button';
import FilterSection from '@/components/page/payment-history/FilterSection';
import OrderDetailCard from '@/components/page/payment-history/OrderDetailCard';
import PaymentDetailCard from '@/components/page/payment-history/PaymentDetailCard';
import PaymentList from '@/components/page/payment-history/PaymentList';
import SearchBar from '@/components/SearchBar';
import {
  mockOrderDetailData,
  mockPaymentData,
  mockPaymentDetailData,
} from '@/lib/mock/paymentData';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function PaymentHistory() {
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null,
  );

  // 선택된 결제의 상세 정보 찾기
  const selectedPaymentDetail = selectedPaymentId
    ? mockPaymentDetailData.find(
        (detail) => detail.paymentId === selectedPaymentId,
      )
    : null;

  const selectedOrderDetail = selectedPaymentId
    ? mockOrderDetailData.find((order) => order.paymentId === selectedPaymentId)
    : null;

  // 위아래 네비게이션
  const handleNavigate = (direction: 'up' | 'down') => {
    if (!selectedPaymentId || mockPaymentData.length === 0) return;

    const currentIndex = mockPaymentData.findIndex(
      (p) => p.id === selectedPaymentId,
    );
    if (currentIndex === -1) return;

    const newIndex =
      direction === 'up'
        ? Math.max(0, currentIndex - 1)
        : Math.min(mockPaymentData.length - 1, currentIndex + 1);

    setSelectedPaymentId(mockPaymentData[newIndex].id);
  };

  return (
    <div className="flex gap-6 p-6">
      {/* 좌측: 필터 + 리스트 */}
      <div className="flex w-[40%] flex-col gap-4">
        <h2 className="text-2xl font-bold">결제내역</h2>

        {/* 검색바 */}
        <SearchBar />

        {/* 필터 영역 + 상세 조회*/}
        <FilterSection />

        {/* 결제 내역 리스트 */}
        <PaymentList
          payments={mockPaymentData}
          selectedId={selectedPaymentId}
          onSelect={setSelectedPaymentId}
        />
      </div>

      {/* 우측: 상세 카드 */}
      <div className="relative flex flex-1 flex-col gap-4 pt-12">
        {/* 위아래 버튼 */}
        <div className="absolute right-0 top-0 flex gap-1">
          <Button
            variant="outline"
            onClick={() => handleNavigate('up')}
            disabled={!selectedPaymentId}
          >
            <ChevronUp />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNavigate('down')}
            disabled={!selectedPaymentId}
          >
            <ChevronDown />
          </Button>
        </div>

        {selectedPaymentDetail && selectedOrderDetail ? (
          <>
            {/* 결제 상세 카드 */}
            <PaymentDetailCard detail={selectedPaymentDetail} />

            {/* 주문 상세 카드 */}
            <OrderDetailCard detail={selectedOrderDetail} />
          </>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-400">결제 내역을 선택해주세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
