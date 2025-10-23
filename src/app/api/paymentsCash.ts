import { instance } from '@/lib/axios';

export type RequestCash = {
  amount: number;
};

export async function paymentsCash(body: RequestCash) {
  const { data } = await instance.post('/payments/cash', body);
  return data;
}

export async function paymentsCashFull() {
  const { data } = await instance.post('/payments/cash/full');
  return data;
}
