import { instance } from '@/lib/axios';
import {
  Period,
  SalesReportParams,
  SalesReportResponseSchema,
} from '@/lib/schemas';
import { validate } from '@/app/api/validate';

export async function getSalesReport(params: SalesReportParams) {
  const periodTypeMap: Record<Period, string> = {
    day: 'DAILY',
    week: 'WEEKLY',
    month: 'MONTHLY',
  };

  const { data } = await instance.get('/reports/sales', {
    params: {
      to: params.to,
      from: params.from,
      storeId: params.storeId,
      periodType: periodTypeMap[params.period],
    },
  });

  return validate(data, SalesReportResponseSchema);
}
