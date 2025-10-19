'use client';

import { useMemo, useState } from 'react';
import SalesCalendar from './_components/SalesCalendar';
import { parseISO, isSameMonth, getWeekOfMonth, endOfMonth } from 'date-fns';
import { ko } from 'date-fns/locale';

type SalesMap = Record<string, number>;

export default function Page() {
  const sales: SalesMap = {
    '2025-07-01': 2234000,
    '2025-07-02': 234000,
    '2025-07-05': 1230000,
    '2025-07-13': 3234000,
    '2025-07-14': 500000,
    '2025-07-21': 880000,
  };

  // 일요일 = 0, 월요일 = 1
  const WEEK_STARTS_ON = 1;

  const [viewMonth, setViewMonth] = useState<Date>(new Date());

  const monthEntries = useMemo(() => {
    return Object.entries(sales)
      .map(([iso, amount]) => ({ date: parseISO(iso), amount }))
      .filter(({ date }) => isSameMonth(date, viewMonth))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [sales, viewMonth]);

  // 월 합계
  const monthTotal = useMemo(
    () => monthEntries.reduce((sum, it) => sum + it.amount, 0),
    [monthEntries],
  );

  const weeklyTotals = useMemo(() => {
    const totalWeeksInMonth = getWeekOfMonth(endOfMonth(viewMonth), {
      locale: ko,
      weekStartsOn: WEEK_STARTS_ON,
    });

    const map = new Map<number, number>();
    monthEntries.forEach(({ date, amount }) => {
      const w = getWeekOfMonth(date, {
        locale: ko,
        weekStartsOn: WEEK_STARTS_ON,
      });
      map.set(w, (map.get(w) ?? 0) + amount);
    });

    return Array.from({ length: totalWeeksInMonth }, (_, i) => {
      const weekNo = i + 1;
      const total = map.get(weekNo) ?? 0;
      return [weekNo, total] as const;
    });
  }, [monthEntries, viewMonth]);

  return (
    <main className="p-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] max-w-6xl mx-auto">
        <SalesCalendar sales={sales} onMonthChange={setViewMonth} />

        <aside className="rounded-xl border bg-white p-4 shadow h-fit lg:sticky lg:top-6">
          <div className="text-sm text-gray-500">현재 월 총액</div>
          <div className="text-2xl font-bold tabular-nums">
            {monthTotal.toLocaleString('ko-KR')}원
          </div>

          <div className="mt-4 text-sm font-medium">주차별 합계</div>
          {weeklyTotals.length === 0 ? (
            <div className="mt-2 text-sm text-gray-500">데이터가 없습니다.</div>
          ) : (
            <ul className="mt-2 divide-y">
              {weeklyTotals.map(([week, total]) => (
                <li
                  key={week}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-gray-600">{week}주</span>
                  <span className="font-semibold tabular-nums">
                    {total.toLocaleString('ko-KR')}원
                  </span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </main>
  );
}
