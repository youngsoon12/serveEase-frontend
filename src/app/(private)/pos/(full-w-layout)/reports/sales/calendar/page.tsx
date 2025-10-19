'use client';

import { useState } from 'react';
import SalesCalendar from './_components/SalesCalendar';
import SalesSummary from './_components/SalesSummary';
import { useSalesSummary } from '@/hooks/useSalesSummary';

const sales = {
  '2025-07-01': 2234000,
  '2025-07-02': 234000,
  '2025-07-05': 1230000,
  '2025-07-13': 3234000,
  '2025-07-14': 500000,
  '2025-07-21': 880000,
};

export default function Page() {
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const { monthTotal, weeklyTotals } = useSalesSummary(sales, viewMonth);

  return (
    <main>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] max-w-6xl mx-auto">
        <div className="flex flex-col h-full">
          <SalesCalendar sales={sales} onMonthChange={setViewMonth} />
        </div>
        <SalesSummary monthTotal={monthTotal} weeklyTotals={weeklyTotals} />
      </div>
    </main>
  );
}
