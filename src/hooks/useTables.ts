import {
  getTables,
  PAGE_SIZE,
  updateTableCount,
  updateTableState,
} from '@/app/api/tables';
import { TableCardProps } from '@/components/TableCard';
import { OrderResponse } from '@/types/order';
import { TablesResponse } from '@/types/table';
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
        ? `/pos/tables/${item.id}?orderId=${item.activeOrder.orderId}&no=${item.restaurantTableNumber}`
        : `/pos/tables/${item.id}?no=${item.restaurantTableNumber}`;

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

export function useUpdateTableCount() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: (newTotalCount: number) => updateTableCount(newTotalCount),
    onSuccess: () => {
      toast.success('테이블 개수가 정상적으로 수정되었습니다.');

      router.push('/pos/tables');
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
    onError: (err) => {
      if (err?.response?.status === 409) {
        toast.error('사용 중인 테이블이 있어 개수를 변경할 수 없습니다.');
        return;
      }

      toast.error('테이블 개수 수정에 실패했습니다.');

      console.error('status:', err?.response?.status);
      console.error('data:', err?.response?.data);
    },
  });
}

type TablesSnapshot = Array<[readonly unknown[], TablesResponse | undefined]>;

export function useUpdateTableStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    OrderResponse,
    AxiosError,
    { orderId: number },
    { prevTables: TablesSnapshot }
  >({
    mutationFn: ({ orderId }) => updateTableState(orderId),

    onMutate: async ({ orderId }) => {
      await queryClient.cancelQueries({ queryKey: ['tables'] });

      const prevTables = queryClient.getQueriesData<TablesResponse>({
        queryKey: ['tables'],
      }) as TablesSnapshot;

      for (const [key, data] of prevTables) {
        if (!data) continue;

        const next = {
          ...data,
          content: data.content.map((t) =>
            t.activeOrder?.orderId === orderId
              ? {
                  ...t,
                  displayStatus: 'SERVED',
                  activeOrder: { ...t.activeOrder, status: 'SERVED' },
                }
              : t,
          ),
        };
        queryClient.setQueryData(key, next);
      }

      return { prevTables };
    },

    onSuccess: (updated) => {
      toast.success('서빙 완료 처리되었습니다.');

      queryClient.setQueryData(['order', updated.id], updated);
      queryClient.invalidateQueries({ queryKey: ['order', updated.id] });

      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },

    onError: (err, _vars, ctx) => {
      if (ctx?.prevTables) {
        for (const [key, data] of ctx.prevTables) {
          queryClient.setQueryData(key, data);
        }
      }

      toast.error('서빙 처리에 실패했습니다.');

      console.error('status:', err?.response?.status);
      console.error('data:', err?.response?.data);
    },

    onSettled: (_data, _err, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
  });
}
