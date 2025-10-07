'use client';

import {
  loadTossPayments,
  TossPaymentsPayment,
} from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import { createOrderName, makePgOrderId } from './paymentUtils';

export interface OrderDataForPayment {
  totalPrice: number;
  orderItems: { menuName: string; quantity: number }[];
  restaurantTableId?: number;
}

export interface PaymentParams {
  orderId: number;
  orderIdParam: string;
  tableId?: number;
  orderData: OrderDataForPayment;
}

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

export default function useTossPayments(customerKey?: string) {
  const [paymentInstance, setPaymentInstance] =
    useState<TossPaymentsPayment | null>(null);

  useEffect(() => {
    if (!clientKey || !customerKey) return;

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
    orderId,
    orderIdParam,
    tableId,
    orderData,
  }: PaymentParams) => {
    if (!orderId || !orderData || !paymentInstance) return;

    const origin = window.location.origin;

    await paymentInstance.requestPayment({
      method: 'CARD',
      amount: {
        currency: 'KRW',
        value: orderData.totalPrice,
      },
      orderId: makePgOrderId(orderId), // 결제용 orderId
      orderName: createOrderName(orderData.orderItems),
      successUrl: `${origin}/pos/payment/success`,
      failUrl: `${origin}/pos/payment/fail?tableId=${tableId}&orderId=${orderIdParam}`,
    });
  };

  return { requestPayment };
}
