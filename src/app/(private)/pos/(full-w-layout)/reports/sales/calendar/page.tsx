'use client';

import { useState, useMemo } from 'react';
import SalesCalendar from './_components/SalesCalendar';
import SalesSummary from './_components/SalesSummary';
import { useSalesCalendar } from '@/hooks/calendar/useSalesCalendar';
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
    <main className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]
          px-6
          lg:px-10
          py-10
          flex
          flex-col
        "
      >
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">매출 달력</h1>
        </header>

        <section
          className="
            grid
            gap-8
            lg:grid-cols-[minmax(0,1fr)_320px]
            items-start
          "
        >
          <SalesCalendar sales={salesMap} onMonthChange={setViewMonth} />
          <SalesSummary monthTotal={monthTotal} weeklyTotals={weeklyTotals} />
        </section>
      </div>
    </main>
  );
}
