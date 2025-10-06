import { instance } from '@/lib/axios';

export type PaymentConfirmRequest = {
  paymentKey: string;
  orderId: string;
  amount: number;
};

export type PaymentResponse = {
  orderId: string;
  method: string;
  cardCompany: string;
  maskedCardNumber: string;
  approvalNumber: string;
  approvedAt: string;
};

export async function confirmPayment(body: PaymentConfirmRequest) {
  const { data } = await instance.post<PaymentResponse>(
    '/payments/confirm',
    body,
  );
  return data;
}
