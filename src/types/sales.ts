export const PERIODS = ['day', 'week', 'month'] as const;
export type Period = (typeof PERIODS)[number];
export type SalesKPITitle = '실매출' | '주문건당 평균가' | '취소 금액';

export function isPeriod(value: string): value is Period {
  return PERIODS.includes(value as Period);
}

export interface SalesReportParams {
  storeId: number;
  from: string;
  to: string;
  period: Period;
}

export interface SalesReportResponse {
  context: {
    periodType: string;
    storeId: number;
    from: string;
    to: string;
  };
  summary: SalesSummary;
  series: SalesSeriesData[];
}

export interface SalesSeriesData {
  date: string;
  month: string;
  monthValue: number;
  week: number | null;
  netSales: number;
  orderCount: number;
  averageOrderValue: number;
  canceledAmount: number;
}

export interface SalesSummary {
  netSales: number;
  orderCount: number;
  averageOrderValue: number;
  canceledAmount: number;
}
