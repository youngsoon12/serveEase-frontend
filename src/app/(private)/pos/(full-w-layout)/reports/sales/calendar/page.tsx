'use client';

import { useState } from 'react';
import SalesCalendar from './_components/SalesCalendar';
import SalesSummary from './_components/SalesSummary';
import { useSalesSummary } from '@/hooks/useSalesSummary';

const sales = {
  '2025-07-01': 2234000,
  '2025-07-02': 234000,
  '2025-07-05': 1230000,
  '2025-08-13': 3234000,
  '2025-07-14': 500000,
  '2025-07-21': 880000,
};

export default function Page() {
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const { monthTotal, weeklyTotals } = useSalesSummary(sales, viewMonth);

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
          <SalesCalendar sales={sales} onMonthChange={setViewMonth} />
          <SalesSummary monthTotal={monthTotal} weeklyTotals={weeklyTotals} />
        </div>
      </div>
    </main>
  );
}
