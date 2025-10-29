import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSalesCalendar } from '@/app/api/salesCalendar';
import { SalesCalendarResponse } from '@/types/calendar';
import { AxiosError } from 'axios';

export function useSalesCalendar(month: string) {
  const { data, error, isError, isLoading, isFetching } = useQuery<
    SalesCalendarResponse,
    AxiosError
  >({
    queryKey: ['salesCalendar', month],
    queryFn: () => getSalesCalendar(month),
    enabled: !!month,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isError && error) {
      console.error('Status:', error.response?.status);
      console.error('Message:', error.response?.data);
    }
  }, [isError, error]);

  return { data, error, isError, isLoading, isFetching };
}
