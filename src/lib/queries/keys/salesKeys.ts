import { SalesReportParams } from '@/types/sales';

export const salesKeys = {
  all: ['salesReport'] as const,
  reports: () => [...salesKeys.all, 'report'] as const,
  report: (params: SalesReportParams) =>
    [...salesKeys.reports(), params] as const,
};
