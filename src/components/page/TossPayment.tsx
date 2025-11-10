'use client';

import useTossPayments from '@/hooks/payment/useTossPayments';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OrderResponse } from '@/lib/schemas/order';

type TossPaymentProps = {
  data: OrderResponse;
  orderIdParam: string;
  paymentOrderId: string;
};

export default function TossPayment({
  data,
  orderIdParam,
  paymentOrderId,
}: TossPaymentProps) {
  const [isPaymentPending, setIsPaymentPending] = useState(false);

  const { requestPayment } = useTossPayments(
    data?.id ? String(data.id) : undefined,
  );

  // 결제창 띄우기
  const handlePayClick = async () => {
    if (!paymentOrderId || !data || !orderIdParam || !paymentOrderId) return;

    setIsPaymentPending(true);

    try {
      await requestPayment({
        parentOrderId: paymentOrderId,
        tableId: data?.restaurantTableId,
        orderData: data,
      });
    } finally {
      setIsPaymentPending(false);
    }
  };

  return (
    <div className="mt-4 border-t pt-4 space-y-4">
      <div className="flex items-center justify-between text-lg font-semibold">
        <span>총 결제 금액</span>
        <span>{data?.totalPrice.toLocaleString()}원</span>
      </div>
      <Button
        className="w-full h-12"
        onClick={handlePayClick}
        disabled={isPaymentPending || !data}
      >
        {isPaymentPending ? '결제 진행 중…' : '결제하기'}
      </Button>
    </div>
  );
}
