'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import { useMemo } from 'react';

type SalesMap = Record<string, number>;
type Props = { sales: SalesMap; onMonthChange?: (monthStart: Date) => void };

export default function SalesCalendar({ sales, onMonthChange }: Props) {
  const totalSales = useMemo(
    () => Object.values(sales).reduce((a, b) => a + b, 0),
    [sales],
  );

  const events = useMemo(
    () =>
      Object.entries(sales).map(([date, amount]) => ({
        title: `₩${amount.toLocaleString()}`,
        date,
      })),
    [sales],
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* ⬇️ 카드 하나에 헤더+달력 묶기, 높이는 화면 비율로 */}
      <div
        className="rounded-xl border bg-white shadow p-4
                      h-[70svh] min-h-[560px] grid grid-rows-[auto_1fr] gap-2"
      >
        {/* 헤더(자동 높이) */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">매출 달력</h1>
          <div className="text-base">
            <span className="text-gray-500 mr-2">총 매출</span>
            <span className="font-bold">
              {totalSales.toLocaleString('ko-KR')}원
            </span>
          </div>
        </div>

        {/* 달력(남은 공간 100%) */}
        <div className="min-h-0">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale={koLocale}
            height="100%" // ✅ 부모(이 div)의 남은 높이를 꽉 채움
            expandRows={true} // ✅ 행을 남은 높이에 맞춰 늘림
            dayMaxEventRows={2}
            headerToolbar={{ left: 'prev', center: 'title', right: 'next' }}
            eventBackgroundColor="transparent"
            eventBorderColor="transparent"
            eventContent={(info) => (
              <div className="flex justify-end pr-1">
                <span className="text-[11px] font-semibold text-blue-600">
                  {info.event.title}
                </span>
              </div>
            )}
            datesSet={(info) => onMonthChange?.(info.view.currentStart)}
          />
        </div>
      </div>
    </div>
  );
}
