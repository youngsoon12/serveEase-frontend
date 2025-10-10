'use client';

import { useOrder } from '@/hooks/useOrder';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import useTossPayments from '@/hooks/payment/useTossPayments';
import { useState } from 'react';

export default function OrderCheck() {
  // 주문 내역
  const param = useSearchParams();

  const orderIdParam = param.get('orderId');
  const orderId = orderIdParam ? Number(orderIdParam) : undefined;

  const { data, isFetching, isError } = useOrder(orderId);

  const tableId = data?.restaurantTableId;
  const paymentOrderId = data?.orderId;

  // 토스페이먼츠 결제 api
  const [isPaymentPending, setIsPaymentPending] = useState(false);

  const { requestPayment } = useTossPayments(
    data?.id ? String(data.id) : undefined,
  );

  // 결제창 띄우기
  const handlePayClick = async () => {
    if (!orderId || !data || !orderIdParam || !paymentOrderId) return;

    setIsPaymentPending(true);

    try {
      await requestPayment({
        paymentOrderId,
        orderIdParam: orderIdParam,
        tableId: tableId,
        orderData: data,
      });
    } finally {
      setIsPaymentPending(false);
    }
  };

  if (isFetching) {
    return (
      <p role="status" aria-live="polite" className="py-8 text-gray-500">
        주문 내역 불러오는 중…
      </p>
    );
  } else if (isError) {
    return (
      <p role="alert" className="py-8 text-red-600">
        주문 내역을 불러올 수 없습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col w-[21rem] max-w-full">
      {!orderId || !data ? (
        <div className="flex items-center justify-center py-8 text-gray-500">
          주문 내역이 없습니다.
        </div>
      ) : (
        <>
          {/* 주문 리스트 (스크롤 영역) */}
          <div className="max-h-[250px] overflow-y-auto scrollbar-hide">
            {data?.orderItems?.map((item) => (
              <div
                key={item.orderItemId}
                className="flex items-center justify-between py-3"
              >
                <span>
                  {item.menuName} × {item.quantity}
                </span>
                <span className="text-gray-500">
                  {item.totalItemPrice.toLocaleString()}원
                </span>
              </div>
            ))}
          </div>

          {/* 합계 + 버튼 (고정 영역) */}
          <div className="mt-4 border-t pt-4 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>총 결제 금액</span>
              <span>{data?.totalPrice.toLocaleString()}원</span>
            </div>
            <Button
              className="w-full h-12"
              onClick={handlePayClick}
              disabled={isPaymentPending || isFetching || !data}
            >
              {isPaymentPending ? '결제 진행 중…' : '결제하기'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
