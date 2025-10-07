import { instance } from '@/lib/axios';
import { PaymentConfirmRequest, PaymentConfirmResponse } from '@/types/payment';

export async function confirmPayment(body: PaymentConfirmRequest) {
  const { data } = await instance.post<PaymentConfirmResponse>(
    '/payments/confirm',
    body,
  );
  return data;
}
