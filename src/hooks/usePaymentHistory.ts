import { useInfiniteQuery } from '@tanstack/react-query';
import { getPaymentHistory } from '@/app/api/payments';
import { paymentKeys } from '@/lib/queries/keys/paymentKeys';

const PAGE_SIZE = 20;

export function usePaymentHistory() {
  return useInfiniteQuery({
    queryKey: paymentKeys.lists(),
    queryFn: ({ pageParam = 0 }) =>
      getPaymentHistory({ page: pageParam, size: PAGE_SIZE }),

    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },

    initialPageParam: 0,
  });
}
