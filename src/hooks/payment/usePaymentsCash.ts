import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  paymentsCash,
  paymentsCashFull,
  type RequestCash,
} from '@/app/api/paymentsCash';
import { paymentKeys } from '@/lib/queries/keys/paymentKeys';
import { tableKeys } from '@/lib/queries/keys';

type CashVars = { orderId: number; amount: number };
type FullVars = { orderId: number };
export interface CashPaymentResponse {
  orderStatus: string; // COMPLETED | PARTIALLY_PAID
  paidAmount: number;
  remainingAmount: number;
}

export function useCashPayment() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<
    {
      orderStatus: 'COMPLETED' | 'PARTIALLY_PAID';
      paidAmount: number;
      remainingAmount: number;
      approvedAt?: string;
      cashApprovalNumber?: string;
    },
    unknown,
    CashVars
  >({
    mutationFn: ({ orderId, amount }) => paymentsCash(orderId, { amount }),
    onSuccess: (data, vars) => {
      toast.success('현금 결제가 처리되었습니다.');

      queryClient.invalidateQueries({
        queryKey: paymentKeys.lists(),
      });

      const qs = new URLSearchParams({
        orderId: String(vars.orderId),
        amount: String(data.paidAmount ?? vars.amount),
        remaining: String(data.remainingAmount ?? 0),
        approvedAt: data.approvedAt ?? '',
        cashApprovalNumber: data.cashApprovalNumber ?? '',
      }).toString();
      router.replace(`/pos/payment/success/cash-success?${qs}`);
    },
    onError: (err) => {
      isAxiosError(err)
        ? toast.error(
            err.response?.data?.message ??
              `요청 실패 (${err.response?.status})`,
          )
        : toast.error('알 수 없는 오류가 발생했어요.');
    },
  });
}

export function useCashPaymentFull() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<
    {
      orderStatus: 'COMPLETED' | 'PARTIALLY_PAID';
      paidAmount: number;
      remainingAmount: number;
      approvedAt?: string;
      cashApprovalNumber?: string;
    },
    unknown,
    FullVars
  >({
    mutationFn: ({ orderId }) => paymentsCashFull(orderId),
    onSuccess: (data, vars) => {
      queryClient.invalidateQueries({
        queryKey: tableKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: paymentKeys.lists(),
      });

      const qs = new URLSearchParams({
        orderId: String(vars.orderId),
        amount: String(data.paidAmount ?? 0),
        remaining: String(data.remainingAmount ?? 0),
        approvedAt: data.approvedAt ?? '',
        cashApprovalNumber: data.cashApprovalNumber ?? '',
      }).toString();
      router.replace(`/pos/payment/success/cash-success?${qs}`);
    },
    onError: (err) => {
      isAxiosError(err)
        ? toast.error(
            err.response?.data?.message ??
              `요청 실패 (${err.response?.status})`,
          )
        : toast.error('알 수 없는 오류가 발생했어요.');
    },
  });
}
