'use client';

import { useMemo } from 'react';
import { parseISO, isSameMonth, getWeekOfMonth, endOfMonth } from 'date-fns';
import { ko } from 'date-fns/locale';

type WeeklyTotal = readonly [number, number];
export type SalesMap = Record<string, number>;

export function useSalesSummary(sales: SalesMap, viewMonth: Date) {
  const WEEK_STARTS_ON = 1;

  // 이번 달 매출만 필터링
  const monthEntries = useMemo(() => {
    return Object.entries(sales)
      .map(([iso, amount]) => ({ date: parseISO(iso), amount }))
      .filter(({ date }) => isSameMonth(date, viewMonth))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [sales, viewMonth]);

  // 월 총액
  const monthTotal = useMemo(
    () => monthEntries.reduce((sum, it) => sum + it.amount, 0),
    [monthEntries],
  );

  // 주차별 합계
  const weeklyTotals: WeeklyTotal[] = useMemo(() => {
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

  return { monthTotal, weeklyTotals };
}
