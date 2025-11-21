import { confirmPayment } from '@/app/api/payments';
import { PaymentConfirmRequest, PaymentConfirmResponse } from '@/types/payment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useConfirmPayment() {
  const queryClient = useQueryClient();

  return useMutation<PaymentConfirmResponse, AxiosError, PaymentConfirmRequest>(
    {
      mutationKey: ['payments', 'confirm'],
      mutationFn: confirmPayment,
      onSuccess: (data) => {
        console.log('결제 성공:', data);
        queryClient.invalidateQueries({ queryKey: ['tables'] });
      },
      onError: (err) => {
        console.error('status:', err?.response?.status);
        console.error('data:', err?.response?.data);
      },
    },
  );
}
