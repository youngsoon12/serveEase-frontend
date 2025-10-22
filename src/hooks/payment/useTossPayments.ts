'use client';

import {
  loadTossPayments,
  TossPaymentsPayment,
} from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import { createOrderName } from '../../lib/paymentUtils';
import { getNextPartOrderId } from '@/lib/paymentPartCounter.ts'; // 분할결제 회수 임시 카운터 유틸
import { toast } from 'sonner';

export interface OrderDataForPayment {
  totalPrice: number;
  orderItems: { menuName: string; quantity: number }[];
  restaurantTableId?: number;
}

export interface PaymentParams {
  paymentOrderId: string;
  orderIdParam: string;
  tableId?: number;
  orderData: OrderDataForPayment;
}

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

export default function useTossPayments(customerKey?: string) {
  const [paymentInstance, setPaymentInstance] =
    useState<TossPaymentsPayment | null>(null);

  useEffect(() => {
    if (!clientKey || !customerKey) {
      toast.error('결제 모듈 초기화에 필요한 키 정보가 없습니다.');
      return;
    }

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
  }, [customerKey]);

  const requestPayment = async ({
    paymentOrderId,
    orderIdParam,
    tableId,
    orderData,
  }: PaymentParams) => {
    if (!paymentOrderId || !orderData || !paymentInstance) {
      toast.error('결제 요청에 필요한 주문 정보가 없습니다.');
      return;
    }

    const origin = window.location.origin;

    const externalOrderId = getNextPartOrderId(paymentOrderId);

    await paymentInstance.requestPayment({
      method: 'CARD',
      amount: {
        currency: 'KRW',
        // value: orderData.totalPrice,
        value: 1000,
      },
      orderId: externalOrderId,
      orderName: createOrderName(orderData.orderItems),
      successUrl: `${origin}/pos/payment/success`,
      failUrl: `${origin}/pos/payment/fail?tableId=${tableId}&orderId=${orderIdParam}`,
    });
  };

  return { requestPayment };
}
