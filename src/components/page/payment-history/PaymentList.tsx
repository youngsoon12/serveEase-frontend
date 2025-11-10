'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePaymentHistory } from '@/hooks/usePaymentHistory';
import { useEffect, useRef, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  getApprovalStatusLabel,
  getApprovalStatusVariant,
  getPaymentMethodLabel,
} from '@/constants/payment-history';
import { FilterValues } from '@/lib/schemas/payment-history';

interface Props {
  date: Date;
  filters: FilterValues;
  selectedId: string | null;
  onSelect: (orderId: string) => void;
  onListChange?: (ids: string[]) => void;
}

export default function PaymentList({
  date,
  filters,
  selectedId,
  onSelect,
  onListChange,
}: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePaymentHistory(date, filters);

  // 모든 페이지의 content를 하나의 배열로 합침
  const payments = useMemo(
    () => data?.pages.flatMap((page) => page.content) ?? [],
    [data],
  );

  console.log(data);
  console.log(payments);

  // 리스트 컨테이너
  const listRef = useRef<HTMLDivElement>(null);

  // 리스트 컨테이너를 root로 지정(페이지 전체 스크롤 X)
  const { ref: sentinelRef, inView } = useInView({
    root: listRef.current ?? undefined,
    rootMargin: '200px',
    threshold: 0,
  });

  // 하단 도달 시 자동으로 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 결제 내역들의 orderId 배열 -> 부모의 네비게이션 기능
  useEffect(() => {
    onListChange?.(payments.map((p) => p.orderId));
  }, [payments, onListChange]);

  if (isLoading) {
    return (
      <div className="flex pt-12 items-center justify-center">
        <div className="text-sm">결제 내역 불러오는 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex pt-12 items-center justify-center">
        <div className="text-md text-red-500">
          결제 내역을 불러오는데 실패했습니다.
        </div>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex pt-12 items-center justify-center">
        <div className="text-sm">결제 내역이 없습니다.</div>
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className="h-full min-h-0 overflow-y-auto overscroll-contain pr-3"
    >
      <div className="space-y-2">
        {payments.map((payment) => (
          <Card
            key={payment.orderId}
            className={`p-4 cursor-pointer transition-colors ${
              selectedId === payment.orderId
                ? 'bg-blue-50 border-blue-200'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelect(payment.orderId)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 mr-4">
                <h3 className="font-semibold mb-1">
                  {getPaymentMethodLabel(payment.representativePaymentMethod) ??
                    '결제수단 없음'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {payment.representativeItemName}
                  {payment.totalItemCount > 1 && (
                    <span className="ml-1 text-xs">
                      외 {payment.totalItemCount - 1}개
                    </span>
                  )}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="flex items-center justify-end gap-2">
                  <p className="font-bold text-lg">
                    {payment.totalPaymentAmount.toLocaleString()}원
                  </p>
                  <Badge
                    variant={getApprovalStatusVariant(
                      getApprovalStatusLabel(
                        payment.representativePaymentStatus,
                      ),
                    )}
                  >
                    {getApprovalStatusLabel(
                      payment.representativePaymentStatus,
                    )}
                  </Badge>
                </div>

                {payment.splitCount > 1 && (
                  <Badge variant="outline" className="mt-1">
                    분할 {payment.splitCount}건
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {payment.representativeApprovedAt
                ? new Date(payment.representativeApprovedAt).toLocaleString(
                    'ko-KR',
                  )
                : '승인시간 없음'}
            </p>
          </Card>
        ))}

        {/* 무한 스크롤 트리거 영역 */}
        {(hasNextPage || isFetchingNextPage) && (
          <div
            ref={sentinelRef}
            className="py-4 text-center text-sm text-muted-foreground"
          >
            {isFetchingNextPage ? '더 불러오는 중...' : '아래로 스크롤'}
          </div>
        )}

        {!hasNextPage && payments.length > 0 && (
          <div className="py-4 text-center text-xs text-gray-400">
            모든 결제 내역을 불러왔습니다.
          </div>
        )}
      </div>
    </div>
  );
}
