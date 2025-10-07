'use client';

import {
  loadTossPayments,
  TossPaymentsPayment,
} from '@tosspayments/tosspayments-sdk';
import { useOrder } from '@/hooks/useOrder';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

// 임시 orderID 생성 함수
const makePgOrderId = (base: number | string) =>
  `SN-${base}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

export default function OrderCheck() {
  // 주문 내역
  const param = useSearchParams();

  const orderIdParam = param.get('orderId');
  const orderId = orderIdParam ? Number(orderIdParam) : undefined;

  const { data } = useOrder(orderId);

  const tableId = data?.restaurantTableId;

  // 토스페이먼츠 결제 api
  const [paymentInstance, setPaymentInstance] =
    useState<TossPaymentsPayment | null>(null);

  useEffect(() => {
    if (!clientKey || !data) return;

    // 회원 식별 값
    const customerKey = String(data?.id);

    // SDK 초기화
    const initializeTossPayments = async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({ customerKey: customerKey });

        setPaymentInstance(payment);
      } catch (error) {
        console.error('토스 SDK 초기화 실패:', error);
      }
    };

    initializeTossPayments();
  }, [data]);

  // 결제창 띄우기
  const handlePayClick = async () => {
    if (!orderId || !data || !paymentInstance) return;

    // orderName 생성
    const firstItemName = data.orderItems[0].menuName;
    const otherItemsCount = data.orderItems.length - 1;
    const orderName =
      otherItemsCount > 0
        ? `${firstItemName} 외 ${otherItemsCount}건`
        : firstItemName;

    console.log(orderName); // 콤비네이션 피자 외 3건

    const pgOrderId = makePgOrderId(orderId);
    const origin = window.location.origin;

    await paymentInstance.requestPayment({
      method: 'CARD',
      amount: {
        currency: 'KRW',
        value: data.totalPrice,
      },
      orderId: pgOrderId, // 결제용 orderId
      orderName: orderName,
      successUrl: `${origin}/pos/payment/success`,
      failUrl: `${origin}/pos/payment/fail?tableId=${tableId}&orderId=${orderIdParam}`,
    });
  };

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
            <Button className="w-full h-12" onClick={handlePayClick}>
              결제하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
