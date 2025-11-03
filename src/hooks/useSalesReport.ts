import {
  getSalesReport,
  SalesReportParams,
  SalesReportResponse,
} from '@/app/api/salesReport';
import { useQuery } from '@tanstack/react-query';

export function useSalesReport(params: SalesReportParams) {
  return useQuery<SalesReportResponse>({
    queryKey: [
      'salesReport',
      params.to,
      params.from,
      params.storeId,
      params.period,
      params,
    ],
    queryFn: () => getSalesReport(params),
    staleTime: 60 * 5 * 1000,
    enabled: !!params.from && !!params.to,
  });
}
