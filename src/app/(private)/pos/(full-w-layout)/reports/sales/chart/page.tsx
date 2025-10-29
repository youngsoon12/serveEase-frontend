'use client';

import DateRangePicker from '@/components/page/sales-chart/DateRangePicker';
import SalesChart from '@/components/page/sales-chart/SalesChart';
import SalesKPICard from '@/components/page/sales-chart/SalesKPICard';
import SalesPeriodTabs from '@/components/page/sales-chart/SalesPeriodTabs';
import salesCalculateDate from '@/lib/salesCalculateDate';
import { Period } from '@/types/sales';
import { getStoreId } from '@/app/api/store';
import { useSalesReport } from '@/hooks/useSalesReport';
import { useState } from 'react';

export default function SalesReportChart() {
  const [period, setPeriod] = useState<Period>('day');

  const storeId = getStoreId();

  const { to, from } = salesCalculateDate(period);

  const { data: salesData } = useSalesReport({
    to,
    from,
    storeId,
    period,
  });

  return (
    <div className="p-6 space-y-6 ">
      <h1 className="text-2xl font-bold">매출 현황</h1>

      <div className="flex justify-between items-center">
        <SalesPeriodTabs value={period} onChange={setPeriod} />

        {period === 'day' && <DateRangePicker />}
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

      <SalesChart period={period} seriesData={salesData?.series ?? []} />
    </div>
  );
}
