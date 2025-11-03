import {
  getSalesReport,
  SalesReportParams,
  SalesReportResponse,
} from '@/app/api/salesReport';
import { salesKeys } from '@/lib/queries/keys';
import { useQuery } from '@tanstack/react-query';

export function useSalesReport(params: SalesReportParams) {
  return useQuery<SalesReportResponse>({
    queryKey: salesKeys.report(params),
    queryFn: () => getSalesReport(params),
    staleTime: 60 * 5 * 1000,
    enabled: !!params.from && !!params.to,
  });
}
