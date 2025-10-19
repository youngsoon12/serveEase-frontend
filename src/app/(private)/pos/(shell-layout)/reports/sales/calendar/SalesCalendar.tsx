// // app/(whatever)/SalesReportCalendar.tsx
// 'use client';

// import { Sun, CloudRain, Cloud, Snowflake } from 'lucide-react';
// import { useMemo } from 'react';

// type DayData = {
//   amount: number;
//   weather?: 'sunny' | 'rain' | 'cloud' | 'snow';
//   isMax?: boolean;
//   isMin?: boolean;
//   note?: string;
// };
// type SalesMap = Record<string, DayData>; // 'YYYY-MM-DD' -> data

// function fmt(n: number) {
//   return n.toLocaleString('ko-KR');
// }
// function toKey(d: Date) {
//   const y = d.getFullYear();
//   const m = `${d.getMonth() + 1}`.padStart(2, '0');
//   const day = `${d.getDate()}`.padStart(2, '0');
//   return `${y}-${m}-${day}`;
// }

// const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

// function WeatherIcon({ type }: { type?: DayData['weather'] }) {
//   if (type === 'sunny') return <Sun className="h-4 w-4 text-amber-500" />;
//   if (type === 'rain') return <CloudRain className="h-4 w-4 text-blue-500" />;
//   if (type === 'cloud') return <Cloud className="h-4 w-4 text-gray-400" />;
//   if (type === 'snow') return <Snowflake className="h-4 w-4 text-sky-400" />;
//   return null;
// }

// export default function SalesCalendar({
//   year,
//   month, // 1~12
//   data,
// }: {
//   year: number;
//   month: number;
//   data: SalesMap;
// }) {
//   const { weeks, monthTotal, weeklyTotals } = useMemo(() => {
//     const first = new Date(year, month - 1, 1);
//     const firstDay = first.getDay(); // 0(일)~6(토)
//     const daysInMonth = new Date(year, month, 0).getDate();

//     // 6주 * 7일 = 42칸 고정(보여줄 때 바깥달도 함께)
//     const cells: Date[] = [];
//     // 앞쪽 이전달
//     for (let i = 0; i < firstDay; i++) {
//       const d = new Date(year, month - 1, 1 - (firstDay - i));
//       cells.push(d);
//     }
//     // 이번달
//     for (let d = 1; d <= daysInMonth; d++) {
//       cells.push(new Date(year, month - 1, d));
//     }
//     // 뒷쪽 다음달
//     while (cells.length < 42) {
//       const last = cells[cells.length - 1];
//       const d = new Date(last);
//       d.setDate(d.getDate() + 1);
//       cells.push(d);
//     }

//     const weeks: Date[][] = Array.from({ length: 6 }, (_, i) =>
//       cells.slice(i * 7, i * 7 + 7),
//     );

//     // 합계
//     let monthTotal = 0;
//     const weeklyTotals = weeks.map((wk) => {
//       let sum = 0;
//       wk.forEach((d) => {
//         if (d.getMonth() === month - 1) {
//           const k = toKey(d);
//           sum += data[k]?.amount ?? 0;
//         }
//       });
//       monthTotal += sum;
//       return sum;
//     });

//     return { weeks, monthTotal, weeklyTotals };
//   }, [year, month, data]);

//   return (
//     <div className="rounded-xl border bg-white p-4">
//       {/* 헤더 */}
//       <div className="mb-3 flex items-center justify-between">
//         <div className="text-lg font-semibold">
//           {year}년 {month}월
//         </div>
//         <div className="text-sm">
//           <span className="text-gray-500 mr-2">총 실매출</span>
//           <span className="font-bold">{fmt(monthTotal)}원</span>
//         </div>
//       </div>

//       {/* 요일 헤더 + 주간합산 타이틀 */}
//       <div className="grid grid-cols-[repeat(7,minmax(0,1fr))_10rem] gap-px bg-gray-200 mb-1 rounded-md overflow-hidden">
//         {WEEKDAYS.map((w, i) => (
//           <div
//             key={w}
//             className={[
//               'bg-white px-3 py-2 text-sm font-medium',
//               i === 0 ? 'text-red-500' : '',
//               i === 6 ? 'text-blue-600' : '',
//             ].join(' ')}
//           >
//             {w}
//           </div>
//         ))}
//         <div className="bg-white px-3 py-2 text-sm font-medium text-right">
//           주간 합산
//         </div>

//         {/* 날짜 그리드 6주 */}
//         {weeks.map((wk, wi) => (
//           <FragmentRow
//             key={wi}
//             week={wk}
//             monthIdx={month - 1}
//             data={data}
//             weeklyTotal={weeklyTotals[wi]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function FragmentRow({
//   week,
//   monthIdx,
//   data,
//   weeklyTotal,
// }: {
//   week: Date[];
//   monthIdx: number; // 0~11
//   data: SalesMap;
//   weeklyTotal: number;
// }) {
//   return (
//     <>
//       {week.map((d, di) => {
//         const k = toKey(d);
//         const day = d.getDate();
//         const isCurrent = d.getMonth() === monthIdx;
//         const datum = data[k];
//         const amount = datum?.amount ?? 0;

//         return (
//           <div
//             key={k}
//             className={[
//               'bg-white p-2 min-h-24 relative',
//               !isCurrent ? 'opacity-40' : '',
//             ].join(' ')}
//           >
//             {/* 날짜/날씨 */}
//             <div className="flex items-center justify-between">
//               <span className="text-xs text-gray-500">{day}</span>
//               <WeatherIcon type={datum?.weather} />
//             </div>

//             {/* 금액 */}
//             {isCurrent && amount > 0 ? (
//               <div className="mt-2 text-sm font-semibold tabular-nums">
//                 {fmt(amount)}원
//               </div>
//             ) : (
//               <div className="mt-2 text-sm text-gray-300">—</div>
//             )}

//             {/* 최고/최저 뱃지 */}
//             <div className="absolute left-2 bottom-2 flex gap-1">
//               {datum?.isMax && (
//                 <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">
//                   최고
//                 </span>
//               )}
//               {datum?.isMin && (
//                 <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">
//                   최저
//                 </span>
//               )}
//             </div>
//           </div>
//         );
//       })}

//       {/* 주간 합산 열 */}
//       <div className="bg-white p-2 flex items-center justify-end">
//         <span className="text-sm font-semibold tabular-nums">
//           {fmt(weeklyTotal)}원
//         </span>
//       </div>
//     </>
//   );
// }
'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DayPicker } from 'react-day-picker';
import { addMonths, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type SalesMap = Record<string, number>;
const ymd = (d: Date) => format(d, 'yyyy-MM-dd');

type DayButtonCmp = NonNullable<
  React.ComponentProps<typeof DayPicker>['components']
>['DayButton'];

export default function SalesCalendar({ sales }: { sales: SalesMap }) {
  const [month, setMonth] = React.useState(new Date());

  const DayButton: DayButtonCmp = ({ day, modifiers, className, ...props }) => {
    const date: Date = (day as any).date ?? (day as unknown as Date);
    const amount = sales[ymd(date)];
    const isOutside = modifiers?.outside;

    return (
      <button
        {...props}
        className={[
          'relative h-20 w-full p-2 text-left rounded-md',
          isOutside ? 'opacity-40' : '',
          className ?? '',
        ].join(' ')}
      >
        <span className="text-xs text-gray-600">{date.getDate()}</span>
        {amount != null && (
          <span className="absolute bottom-1 right-1 text-[11px] font-semibold text-blue-600 tabular-nums">
            {amount.toLocaleString('ko-KR')}원
          </span>
        )}
      </button>
    );
  };

  const components = { DayButton } as Partial<
    React.ComponentProps<typeof DayPicker>['components']
  >;

  return (
    <div className="w-full max-w-lg rounded-lg border bg-white p-4 shadow-sm">
      {/* 🔸 헤더 (월 이동 버튼 + 현재 월 라벨) */}
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={() => setMonth((m) => addMonths(m, -1))}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-medium text-lg">
          {format(month, 'yyyy년 M월', { locale: ko })}
        </div>
        <button
          onClick={() => setMonth((m) => addMonths(m, 1))}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* 🔸 달력 본체 */}
      <Calendar
        month={month}
        onMonthChange={setMonth}
        showOutsideDays
        locale={ko}
        components={components}
      />
    </div>
  );
}
