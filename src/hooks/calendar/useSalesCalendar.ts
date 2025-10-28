import { useQuery } from '@tanstack/react-query';
import { getSalesCalendar } from '@/app/api/salesCalendar';
import { SalesCalendarResponse } from '@/types/calendar';

export function useSalesCalendar(month: string) {
  return useQuery<SalesCalendarResponse>({
    queryKey: ['salesCalendar', month],
    queryFn: () => getSalesCalendar(month),
    enabled: !!month,
    staleTime: 1000 * 60 * 5,
  });
}
