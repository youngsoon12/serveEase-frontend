import { instance } from '@/lib/axios';

export async function getSalesCalendar(month: string) {
  const { data } = await instance.get(
    `/reports/sales/calendar?storeId=@me&month=${month}`,
  );

  return data;
}
