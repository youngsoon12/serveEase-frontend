import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getOrderDetail, getPaymentHistory } from '@/app/api/payments';
import { paymentKeys } from '@/lib/queries/keys/paymentKeys';
import { format } from 'date-fns';
import { FilterValues } from '@/lib/schemas/payment-history';

const PAGE_SIZE = 20;

export function usePaymentHistory(date: Date, filters: FilterValues = {}) {
  const formattedDate = format(date, 'yyyy-MM-dd');

  return useInfiniteQuery({
    queryKey: paymentKeys.list({ date: formattedDate, ...filters }),
    queryFn: ({ pageParam = 0 }) => {
      const hasFilters = Object.keys(filters).length > 0;

      return getPaymentHistory({
        page: pageParam,
        size: PAGE_SIZE,
        ...(hasFilters
          ? filters
          : {
              from: formattedDate,
              to: formattedDate,
            }),
      });
    },
    staleTime: 5 * 60 * 1000,

    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },

    initialPageParam: 0,
  });
}

export function useOrderDetail(orderId: string | null) {
  return useQuery({
    queryKey: paymentKeys.detail(orderId || 'empty'),
    queryFn: () => getOrderDetail(orderId!),
    staleTime: 5 * 60 * 1000,
    enabled: !!orderId && orderId.length > 0,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
