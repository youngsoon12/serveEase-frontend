'use client';

import DateRangePicker from '@/components/page/sales-chart/DateRangePicker';
import SalesChart from '@/components/page/sales-chart/SalesChart';
import SalesKPICard from '@/components/page/sales-chart/SalesKPICard';
import SalesPeriodTabs from '@/components/page/sales-chart/SalesPeriodTabs';
import salesCalculateDate from '@/lib/salesCalculateDate';
import { getStoreId } from '@/app/api/store';
import { useSalesReport } from '@/hooks/useSalesReport';
import { useState } from 'react';
import { Period } from '@/lib/schemas';
import ErrorState from '@/components/ErrorState';

export default function SalesReportChart() {
  const [period, setPeriod] = useState<Period>('day');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const storeId = getStoreId();

  const { to, from } = salesCalculateDate(period);

  const getFinalDateRange = () => {
    if (period === 'day' && selectedDate) {
      const endDate = new Date(selectedDate);
      const startDate = new Date(selectedDate);

      startDate.setDate(endDate.getDate() - 6);

      return {
        to: selectedDate,
        from: startDate.toISOString().split('T')[0],
      };
    }

    return { to, from };
  };

  const { to: finalTo, from: finalFrom } = getFinalDateRange();

  const {
    data: salesData,
    isError,
    refetch,
    isFetching,
    isLoading,
  } = useSalesReport({
    to: finalTo,
    from: finalFrom,
    storeId,
    period,
  });

  if (isError) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">매출 현황</h1>
        <ErrorState
          title="매출 데이터를 불러올 수 없습니다"
          message="네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요."
          onRetry={() => refetch()}
          isRetrying={isFetching}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 ">
      <h1 className="text-2xl font-bold">매출 현황</h1>

      <div className="flex justify-between items-center">
        <SalesPeriodTabs value={period} onChange={setPeriod} />

        {period === 'day' && (
          <DateRangePicker
            selectedDate={selectedDate || to}
            onDateChange={setSelectedDate}
          />
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SalesKPICard title="실매출" value={salesData?.summary.netSales ?? 0} />
        <SalesKPICard
          title="주문건당 평균가"
          value={salesData?.summary.averageOrderValue ?? 0}
        />
        <SalesKPICard
          title="취소 금액"
          value={salesData?.summary.canceledAmount ?? 0}
        />
      </div>

      <SalesChart
        period={period}
        seriesData={salesData?.series ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
