import { instance } from '@/lib/axios';
import { Period, SalesReportParams, SalesReportResponse } from '@/types/sales';

export async function getSalesReport(params: SalesReportParams) {
  const periodTypeMap: Record<Period, string> = {
    day: 'DAILY',
    week: 'WEEKLY',
    month: 'MONTHLY',
  };

  const { data } = await instance.get<SalesReportResponse>('/reports/sales', {
    params: {
      to: params.to,
      from: params.from,
      storeId: params.storeId,
      periodType: periodTypeMap[params.period],
    },
  });

  return data;
}
