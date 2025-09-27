import { OrderResponse, OrderRequest, createOrder } from '@/app/api/order';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useCreateOrder() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, unknown, OrderRequest>({
    mutationFn: (payload) => createOrder(payload),
    onSuccess: (order) => {
      toast.success('주문이 접수되었습니다.');
      console.log(order);

      router.push('/pos/tables');
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
    onError: (error) => {
      toast.error('주문 처리에 실패했습니다.');
      console.log(error);
    },
  });
}
