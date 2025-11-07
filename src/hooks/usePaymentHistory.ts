import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getOrderDetail, getPaymentHistory } from '@/app/api/payments';
import { paymentKeys } from '@/lib/queries/keys/paymentKeys';
import { format } from 'date-fns';

const PAGE_SIZE = 20;

export function usePaymentHistory(date: Date) {
  const formattedDate = format(date, 'yyyy-MM-dd');

  return useInfiniteQuery({
    queryKey: paymentKeys.list({ date: formattedDate }),
    queryFn: ({ pageParam = 0 }) =>
      getPaymentHistory({
        page: pageParam,
        size: PAGE_SIZE,
        from: formattedDate,
        to: formattedDate,
      }),
    staleTime: 5 * 60 * 1000,

    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },

    initialPageParam: 0,
  });
}

export function useOrderDetail(orderId: string) {
  return useQuery({
    queryKey: paymentKeys.detail(orderId),
    queryFn: () => getOrderDetail(orderId),
    enabled: !!orderId,
  });
}
