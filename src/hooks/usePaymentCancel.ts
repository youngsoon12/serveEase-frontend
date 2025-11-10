import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelCardPayment, refundCashPayment } from '@/app/api/payments';
import { paymentKeys } from '@/lib/queries/keys/paymentKeys';
import {
  CancelCardPaymentRequest,
  CancelCardPaymentResponse,
  RefundCashPaymentParams,
  RefundCashPaymentResponse,
} from '@/lib/schemas/payment-cancel';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function useCancelCardPayment() {
  const queryClient = useQueryClient();

  return useMutation<
    CancelCardPaymentResponse,
    AxiosError,
    CancelCardPaymentRequest
  >({
    mutationKey: paymentKeys.cancelCard(),
    mutationFn: cancelCardPayment,
    onSuccess: () => {
      toast.success('카드 결제가 취소되었습니다.');

      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: paymentKeys.details() });
    },
    onError: (err) => {
      toast.error('카드 결제 취소에 실패했습니다.');

      console.error('status:', err?.response?.status);
      console.error('data:', err?.response?.data);
    },
  });
}

export function useRefundCashPayment() {
  const queryClient = useQueryClient();

  return useMutation<
    RefundCashPaymentResponse,
    AxiosError,
    RefundCashPaymentParams
  >({
    mutationKey: paymentKeys.refundCash(),
    mutationFn: refundCashPayment,
    onSuccess: () => {
      toast.success('현금 결제가 취소되었습니다.');

      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: paymentKeys.details() });
    },
    onError: (err) => {
      toast.error('현금 결제 취소에 실패했습니다.');

      console.error('status:', err?.response?.status);
      console.error('data:', err?.response?.data);
    },
  });
}
