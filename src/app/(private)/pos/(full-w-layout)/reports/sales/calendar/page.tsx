'use client';

import { useState, useMemo } from 'react';
import SalesCalendar from './_components/SalesCalendar';
import SalesSummary from './_components/SalesSummary';
import { useSalesCalendar } from '@/hooks/calendar/useSalesCalendar';
// import { useSalesSummary } from '@/hooks/useSalesSummary';
import { format } from 'date-fns';

export default function salesCalendarPage() {
  const [viewMonth, setViewMonth] = useState<Date>(new Date());

  const viewMonthString = useMemo(
    () => format(viewMonth, 'yyyy-MM'),
    [viewMonth],
  );
  const { data } = useSalesCalendar(viewMonthString);
  console.log(data);

  const salesMap = useMemo(() => {
    if (!data?.dailySales) return {};
    return Object.fromEntries(data.dailySales.map((d) => [d.date, d.netSales]));
  }, [data?.dailySales]);

  const weeklyTotals = useMemo(() => {
    if (!data?.weeklySummaries) return [];
    return data.weeklySummaries.map((w) => [w.weekNumber, w.netSales] as const);
  }, [data?.weeklySummaries]);

  const monthTotal = useMemo(
    () => weeklyTotals.reduce((sum, [, total]) => sum + total, 0),
    [weeklyTotals],
  );

  return (
    <main
      className="
    flex
    items-center justify-center
    min-h-[calc(100vh-80px)]    
  "
    >
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">매출 달력</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <SalesCalendar sales={salesMap} onMonthChange={setViewMonth} />
          <SalesSummary monthTotal={monthTotal} weeklyTotals={weeklyTotals} />
        </div>
      </div>
    </main>
  );
}
