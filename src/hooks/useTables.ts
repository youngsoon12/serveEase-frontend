import {
  getTables,
  PAGE_SIZE,
  TablesResponse,
  updateTables,
} from '@/app/api/tables';
import { TableCardProps } from '@/components/TableCard';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useTables(page: number) {
  const query = useQuery<TablesResponse>({
    queryKey: ['tables', page],
    queryFn: () => getTables(page, PAGE_SIZE),
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  const toUIStatus = (s: string): 'EMPTY' | 'ORDERED' | 'SERVED' => {
    if (s === 'EMPTY') return 'EMPTY';
    if (s === 'SERVED') return 'SERVED';
    return 'ORDERED';
  };

  const cards: TableCardProps[] =
    query.data?.content.map((item) => {
      const status = toUIStatus(item.displayStatus);
      const href = item.activeOrder?.orderId
        ? `/pos/tables/${item.restaurantTableNumber}?orderId=${item.activeOrder.orderId}`
        : `/pos/tables/${item.restaurantTableNumber}`;

      return {
        tableNumber: item.restaurantTableNumber,
        status,
        href,
        price: item.activeOrder?.totalPrice,
        menuItems:
          item.activeOrder?.orderItems?.map((o) => o.menuName).slice(0, 2) ??
          [],
      };
    }) ?? [];

  return {
    data: query.data,
    cards,
    noticeText: query.error ? '요청을 처리하지 못했습니다.' : null,
  };
}

export function useUpdateTables() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: (newTotalCount: number) => updateTables(newTotalCount),
    onSuccess: () => {
      toast.error('테이블 개수가 정상적으로 수정되었습니다.');

      router.push('/pos/tables');
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
    onError: (err) => {
      toast.error('테이블 개수 수정에 실패했습니다.');

      console.error('status:', err?.response?.status);
      console.error('data:', err?.response?.data);
    },
  });
}
