import { getTables, PAGE_SIZE, TablesResponse } from '@/app/api/tables';
import { TableCardProps } from '@/components/TableCard';
import { useQuery } from '@tanstack/react-query';

export default function useTables(page: number) {
  const query = useQuery<TablesResponse>({
    queryKey: ['tables', page],
    queryFn: () => getTables(page, PAGE_SIZE),
    staleTime: 1000 * 60,
  });

  const cards: TableCardProps[] =
    query.data?.content.map((item) => ({
      tableNumber: item.restaurantTableNumber,
      status:
        item.status === 'EMPTY'
          ? 'EMPTY'
          : item.status === 'SERVED'
          ? 'SERVED'
          : 'ORDERED',
      href: `/pos/tables/${item.restaurantTableNumber}`,
    })) ?? [];

  return {
    data: query.data,
    cards,
    noticeText: query.error ? '요청을 처리하지 못했습니다.' : null,
  };
}
