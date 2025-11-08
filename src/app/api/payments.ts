import { instance } from '@/lib/axios';
import { PaymentConfirmRequest, PaymentConfirmResponse } from '@/types/payment';
import {
  PaymentHistoryParams,
  PaymentHistoryResponseSchema,
} from '@/lib/schemas/paymentHistory';
import { validate } from '@/app/api/validate';
import { OrderDetailResponseSchema } from '@/lib/schemas/paymentDetail';

export async function confirmPayment(body: PaymentConfirmRequest) {
  const { data } = await instance.post<PaymentConfirmResponse>(
    '/payments/confirm',
    body,
  );
  return data;
}

export async function getPaymentHistory(params: PaymentHistoryParams) {
  const { data } = await instance.get('/payments', {
    params: {
      ...params,
      range: params.from && params.to ? undefined : params.range ?? 'TODAY',
    },
  });

  return validate(data, PaymentHistoryResponseSchema);
}

export async function getOrderDetail(orderId: string) {
  const { data } = await instance.get(`/payments/orders/${orderId}`);

  return validate(data, OrderDetailResponseSchema);
}
