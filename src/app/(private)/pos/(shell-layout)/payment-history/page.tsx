'use client';

import SearchBar from '@/components/SearchBar';
import FilterSection from '@/components/page/payment-history/FilterSection';
import PaymentList from '@/components/page/payment-history/PaymentList';
import PaymentDetailCard from '@/components/page/payment-history/PaymentDetailCard';
import OrderDetailCard from '@/components/page/payment-history/OrderDetailCard';
import Button from '@/components/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useOrderDetail } from '@/hooks/usePaymentHistory';

interface FilterValues {
  range?: 'TODAY' | 'LAST_7_DAYS' | 'LAST_30_DAYS' | 'CUSTOM';
  from?: string;
  to?: string;
  paymentMethod?: 'CARD' | 'CASH';
  orderType?: 'NORMAL' | 'CANCELED' | 'PARTIAL';
}

export default function PaymentHistory() {
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );
  const [paymentIdList, setPaymentIdList] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});

  const {
    data: orderDetail,
    isLoading,
    error,
  } = useOrderDetail(selectedPaymentId);

  // 위아래 네비게이션
  const handleNavigate = (direction: 'up' | 'down') => {
    if (!selectedPaymentId || paymentIdList.length === 0) return;

    const currentIndex = paymentIdList.indexOf(selectedPaymentId);
    if (currentIndex === -1) return;

    const newIndex =
      direction === 'up'
        ? Math.max(0, currentIndex - 1)
        : Math.min(paymentIdList.length - 1, currentIndex + 1);

    setSelectedPaymentId(paymentIdList[newIndex]);
  };

  // 내역 조회 시 상세 내역 초기화
  const handleFilterApply = (filters: FilterValues) => {
    setAppliedFilters(filters);
    setSelectedPaymentId(null);
  };

  return (
    <div className="flex h-screen min-h-0 overflow-hidden gap-6 p-6">
      {/* 좌측: 필터 + 리스트 */}
      <div className="flex w-[40%] flex-col gap-4 min-h-0">
        <h2 className="text-2xl font-bold">결제내역</h2>

        {/* 검색바 */}
        <SearchBar />

        {/* 필터 영역 + 상세 조회*/}
        <FilterSection
          date={selectedDate}
          onDateChange={setSelectedDate}
          onFilterApply={handleFilterApply}
          appliedFilters={appliedFilters}
        />

        {/* 결제 내역 리스트 */}
        <div className="flex-1 min-h-0">
          <PaymentList
            date={selectedDate}
            filters={appliedFilters}
            selectedId={selectedPaymentId}
            onSelect={setSelectedPaymentId}
            onListChange={setPaymentIdList}
          />
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

        {!selectedPaymentId ? (
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-400">결제 내역을 선택해주세요</p>
          </div>
        ) : isLoading ? (
          <div className="flex h-64 items-center justify-center rounded-lg border bg-white">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        ) : error || !orderDetail ? (
          <div className="flex h-64 items-center justify-center rounded-lg border bg-white">
            <p className="text-red-500">주문 정보를 불러올 수 없습니다</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4">
            {/* 결제 상세 카드 */}
            <PaymentDetailCard detail={orderDetail} />

            {/* 주문 상세 카드 */}
            <OrderDetailCard orderItems={orderDetail.orderItems} />
          </div>
        )}
      </div>
    </div>
  );
}
