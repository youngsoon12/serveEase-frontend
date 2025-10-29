'use client';

type WeeklyTotal = readonly [number, number];

interface SalesSummaryProps {
  monthTotal: number;
  weeklyTotals: WeeklyTotal[];
}

export default function SalesSummary({
  monthTotal,
  weeklyTotals,
}: SalesSummaryProps) {
  return (
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
            <li key={week} className="flex items-center justify-between py-2">
              <span className="text-gray-600">{week}주</span>
              <span className="font-semibold tabular-nums">
                {total.toLocaleString('ko-KR')}원
              </span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
