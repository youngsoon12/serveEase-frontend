'use client';

import Button from '@/components/Button';
import FilterSection from '@/components/page/payment-history/FilterSection';
import OrderDetailCard from '@/components/page/payment-history/OrderDetailCard';
import PaymentDetailCard from '@/components/page/payment-history/PaymentDetailCard';
import PaymentList from '@/components/page/payment-history/PaymentList';
import SearchBar from '@/components/SearchBar';
import { usePaymentHistory } from '@/hooks/usePaymentHistory';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function PaymentHistory() {
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePaymentHistory();

  // 무한 스크롤을 위한 하단 감지
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // 하단 도달 시 자동으로 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모든 페이지의 content를 하나의 배열로 합치기 -> 왜 필요해?
  const allPayments = data?.pages.flatMap((page) => page.content) ?? [];

  // 위아래 네비게이션
  const handleNavigate = (direction: 'up' | 'down') => {
    if (!selectedPaymentId || allPayments.length === 0) return;

    const currentIndex = allPayments.findIndex(
      (payment) => payment.orderId === selectedPaymentId,
    );

    if (currentIndex === -1) return;

    const newIndex =
      direction === 'up'
        ? Math.max(0, currentIndex - 1)
        : Math.min(allPayments.length - 1, currentIndex + 1);

    setSelectedPaymentId(allPayments[newIndex].orderId);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg">결제 내역을 불러오는 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-red-500">
          결제 내역을 불러오는데 실패했습니다.
        </div>
      </div>
    );
  }

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
        <div className="flex-1 h-[67%]">
          <PaymentList
            payments={allPayments}
            selectedId={selectedPaymentId}
            onSelect={setSelectedPaymentId}
          />
        </div>

        {/* 무한 스크롤 트리거 영역 */}
        <div ref={ref} className="flex h-20 items-center justify-center">
          {isFetchingNextPage && (
            <div className="text-sm text-gray-500">더 불러오는 중...</div>
          )}
          {!hasNextPage && allPayments.length > 0 && (
            <div className="text-sm text-gray-400">
              모든 결제 내역을 불러왔습니다.
            </div>
          )}
        </div>
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

        {selectedPaymentId ? (
          <>
            {/* 결제 상세 카드 */}
            {/* <PaymentDetailCard detail={selectedPaymentDetail} /> */}

            {/* 주문 상세 카드 */}
            {/* <OrderDetailCard detail={selectedOrderDetail} /> */}
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
