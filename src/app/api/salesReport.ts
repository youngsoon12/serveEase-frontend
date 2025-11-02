import { instance } from '@/lib/axios';
import { Period } from '@/types/sales';

export interface SalesReportResponse {
  context: {
    periodType: string;
    storeId: number;
    from: string;
    to: string;
  };
  summary: {
    netSales: number;
    orderCount: number;
    averageOrderValue: number;
    canceledAmount: number;
  };
  series: Array<{
    date: string;
    month: string;
    monthValue: number;
    week: number | null;
    netSales: number;
    orderCount: number;
    averageOrderValue: number;
    canceledAmount: number;
  }>;
}

export interface SalesReportParams {
  storeId: number;
  from: string;
  to: string;
  period: Period;
}

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
