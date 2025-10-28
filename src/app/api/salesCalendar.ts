import { instance } from '@/lib/axios';

export async function getSalesCalendar(month: string) {
  const { data } = await instance.get('/reports/sales/calendar', {
    params: {
      storeId: '@me',
      month,
    },
  });

  return data;
}
