import { instance } from '@/lib/axios';
import { PaymentConfirmRequest, PaymentConfirmResponse } from '@/types/payment';
import {
  PaymentHistoryParams,
  PaymentHistoryResponseSchema,
} from '@/lib/schemas/paymentHistory';
import { validate } from '@/app/api/validate';

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
      range: params.range ?? 'TODAY',
    },
  });

  return validate(data, PaymentHistoryResponseSchema);
}
