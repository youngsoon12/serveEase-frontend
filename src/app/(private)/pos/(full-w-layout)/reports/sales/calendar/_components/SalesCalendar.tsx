'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import { useMemo } from 'react';

type SalesMap = Record<string, number>;

interface Props {
  sales: SalesMap;
  onMonthChange?: (monthStart: Date) => void;
}

export default function SalesCalendar({ sales, onMonthChange }: Props) {
  const events = useMemo(
    () =>
      Object.entries(sales)
        .filter(([_, amount]) => amount > 0)
        .map(([date, amount]) => ({
          title: `₩${amount.toLocaleString()}`,
          date,
          backgroundColor: '#E6F4EA',
          borderColor: '#16a34a',
          textColor: '#166534',
        })),
    [sales],
  );

  return (
    <div className="rounded-xl border bg-white shadow p-4 w-full h-[70svh] min-h-[560px]">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={koLocale}
        height="100%"
        events={events}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        datesSet={(info) => {
          const correctedMonth = new Date(info.start);
          correctedMonth.setDate(correctedMonth.getDate() + 7);

          onMonthChange?.(correctedMonth);
        }}
        eventContent={(eventInfo) => (
          <div className="text-sm font-medium">{eventInfo.event.title}</div>
        )}
        dayMaxEventRows={true}
        fixedWeekCount={false}
      />
    </div>
  );
}
