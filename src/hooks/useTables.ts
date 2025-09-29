import { getTables, PAGE_SIZE, TablesResponse } from '@/app/api/tables';
import { TableCardProps } from '@/components/TableCard';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useTables(page: number) {
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

      return {
        tableNumber: item.restaurantTableNumber,
        status,
        href: `/pos/tables/${item.restaurantTableNumber}`,
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
