import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import {
  paymentsCash,
  paymentsCashFull,
  type RequestCash,
} from '@/app/api/paymentsCash';

export function useCashPayment() {
  return useMutation<unknown, unknown, RequestCash>({
    mutationFn: (payload) => paymentsCash(payload),
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
  return useMutation<unknown, unknown, void>({
    mutationFn: () => paymentsCashFull(),
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
