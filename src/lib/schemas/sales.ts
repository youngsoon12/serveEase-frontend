import { z } from 'zod';

export const PERIODS = ['day', 'week', 'month'] as const;
export const PeriodSchema = z.enum(PERIODS);

export const SalesKPITitleSchema = z.enum([
  '실매출',
  '주문건당 평균가',
  '취소 금액',
]);

export function isPeriod(value: string): value is Period {
  return PERIODS.includes(value as Period);
}

export const SalesReportParamsSchema = z.object({
  storeId: z.number(),
  from: z.string(),
  to: z.string(),
  period: PeriodSchema,
});

export const SalesSummarySchema = z.object({
  netSales: z.number(),
  orderCount: z.number(),
  averageOrderValue: z.number(),
  canceledAmount: z.number(),
});

export const SalesSeriesDataSchema = z.object({
  date: z.string(),
  month: z.string(),
  monthValue: z.number(),
  week: z.number().nullable(),
  netSales: z.number(),
  orderCount: z.number(),
  averageOrderValue: z.number(),
  canceledAmount: z.number(),
});

export const SalesReportResponseSchema = z.object({
  context: z.object({
    periodType: z.string(),
    storeId: z.number(),
    from: z.string(),
    to: z.string(),
  }),
  summary: SalesSummarySchema,
  series: z.array(SalesSeriesDataSchema),
});

export type Period = z.infer<typeof PeriodSchema>;
export type SalesKPITitle = z.infer<typeof SalesKPITitleSchema>;

export type SalesReportParams = z.infer<typeof SalesReportParamsSchema>;
export type SalesSummary = z.infer<typeof SalesSummarySchema>;
export type SalesSeriesData = z.infer<typeof SalesSeriesDataSchema>;
export type SalesReportResponse = z.infer<typeof SalesReportResponseSchema>;
