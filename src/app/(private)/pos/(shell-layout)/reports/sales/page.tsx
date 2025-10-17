'use client';

import DateRangePicker from '@/components/page/sales-chart/DateRangePicker';
import SalesChart from '@/components/page/sales-chart/SalesChart';
import SalesKPICard from '@/components/page/sales-chart/SalesKPICard';
import SalesPeriodTabs from '@/components/page/sales-chart/SalesPeriodTabs';
import { Period } from '@/types/sales';
import { useState } from 'react';

export default function SalesReportChart() {
  const [period, setPeriod] = useState<Period>('day');

  return (
    <div className="p-6 space-y-6 bg-white">
      <h1 className="text-2xl font-semibold">매출 현황</h1>

      <div className="flex justify-between items-center">
        <SalesPeriodTabs value={period} onChange={setPeriod} />
        <DateRangePicker />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SalesKPICard title="실매출" period={period} />
        <SalesKPICard title="주문건당 평균가" period={period} />
        <SalesKPICard title="취소 금액" period={period} />
      </div>

      <SalesChart period={period} />
    </div>
  );
}
