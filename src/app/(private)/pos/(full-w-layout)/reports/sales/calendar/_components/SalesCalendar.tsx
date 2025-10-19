'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import { useMemo } from 'react';

type SalesMap = Record<string, number>;
type Props = { sales: SalesMap; onMonthChange?: (monthStart: Date) => void };

export default function SalesCalendar({ sales, onMonthChange }: Props) {
  const events = useMemo(
    () =>
      Object.entries(sales).map(([date, amount]) => ({
        title: `₩${amount.toLocaleString()}`,
        date,
      })),
    [sales],
  );

  return (
    <div
      className="
        flex flex-col
        w-full h-full
        rounded-xl border bg-white shadow
        p-3 sm:p-4
        min-h-[400px]   /* 최소 높이만 설정, 고정 높이는 제거 */
        overflow-hidden
      "
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold">매출 달력</h1>
      </div>

      {/* 달력 영역 */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={koLocale}
          height="100%" // ✅ flex-1 공간만큼 자동으로 채움
          contentHeight="auto"
          expandRows
          fixedWeekCount={false}
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
  );
}
