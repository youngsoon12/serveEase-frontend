import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSalesCalendar } from '@/app/api/salesCalendar';
import { SalesCalendarResponse } from '@/types/calendar';
import { calendarKeys } from '@/lib/queries/keys/calendarKeys';
import { AxiosError } from 'axios';

export function useSalesCalendar(month: string) {
  const queryKey = calendarKeys.month(month);

  const query = useQuery<SalesCalendarResponse, AxiosError>({
    queryKey,
    queryFn: () => getSalesCalendar(month),
    enabled: !!month,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh
  });

  useEffect(() => {
    if (query.isError && query.error) {
      console.error('❌ Sales Calendar API Error');
      console.error('Status:', query.error.response?.status);
      console.error('Message:', query.error.response?.data);
    }
  }, [query.isError, query.error]);

  return query;
}
