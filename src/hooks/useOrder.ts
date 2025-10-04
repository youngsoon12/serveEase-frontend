import { createOrder, getOrder, addOrder, cancelOrder } from '@/app/api/order';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { ApiErrorBody } from '@/lib/error';
import { OrderRequest, OrderResponse } from '@/types/order';

export function useOrder(orderId?: number) {
  return useQuery<OrderResponse>({
    queryKey: ['order', orderId],
    queryFn: () => getOrder(orderId as number),
    staleTime: 60 * 5 * 1000,
    enabled: !!orderId,
  });
}

export function useCreateOrder(tableId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, AxiosError<ApiErrorBody>, OrderRequest>({
    mutationFn: (payload) => createOrder(tableId, payload),
    onSuccess: (order) => {
      toast.success('주문이 접수되었습니다.');
      console.log(order);

      router.push('/pos/tables');
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
    onError: (err) => {
      toast.error('주문 처리에 실패했습니다.');

      console.error('status:', err?.response?.status);
      console.error('data:', err?.response?.data);
    },
  });
}

export function useAddOrder(orderId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, AxiosError<ApiErrorBody>, OrderRequest>({
    mutationFn: (payload) => addOrder(orderId, payload),
    onSuccess: (order) => {
      toast.success('주문이 접수되었습니다.');
      console.log(order);

      router.push('/pos/tables');
      queryClient.invalidateQueries({ queryKey: ['tables'] });
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
    },
    onError: (err) => {
      toast.error('주문 처리에 실패했습니다.');

      console.error('status:', err?.response?.status);
      console.error('data:', err?.response?.data);
    },
  });
}

export function useCancelOrder(orderId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, AxiosError<ApiErrorBody>, void>({
    mutationFn: () => cancelOrder(orderId),
    onSuccess: (order) => {
      toast.success('주문이 취소되었습니다.');
      console.log(order);

      router.push('/pos/tables');
      queryClient.invalidateQueries({ queryKey: ['tables'] });
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
    },
    onError: (err) => {
      toast.error('주문 취소에 실패했습니다.');

      console.error('status:', err?.response?.status);
      console.error('data:', err?.response?.data);
    },
  });
}
