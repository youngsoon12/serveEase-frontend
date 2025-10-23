import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import {
  paymentsCash,
  paymentsCashFull,
  type RequestCash,
} from '@/app/api/paymentsCash';

type CashVars = { orderId: number; amount: number };
type FullVars = { orderId: number };

export function useCashPayment() {
  return useMutation<unknown, unknown, CashVars>({
    mutationFn: ({ orderId, amount }) => paymentsCash(orderId, { amount }),
    onSuccess: () => {
      toast.success('현금 결제가 처리되었습니다.');
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ?? `요청 실패 (${err.response?.status})`,
        );
        console.error(err.response?.status, err.response?.data);
      } else {
        toast.error('알 수 없는 오류가 발생했어요.');
        console.error(err);
      }
    },
  });
}

export function useCashPaymentFull() {
  return useMutation<unknown, unknown, FullVars>({
    mutationFn: ({ orderId }) => paymentsCashFull(orderId),
    onSuccess: () => {
      toast.success('현금 전액 결제가 처리되었습니다.');
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ?? `요청 실패 (${err.response?.status})`,
        );
        console.error(err.response?.status, err.response?.data);
      } else {
        toast.error('알 수 없는 오류가 발생했어요.');
        console.error(err);
      }
    },
  });
}
