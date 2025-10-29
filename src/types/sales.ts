export const PERIODS = ['day', 'week', 'month'] as const;

export type Period = (typeof PERIODS)[number];

export type SalesKPITitle = '실매출' | '주문건당 평균가' | '취소 금액';

// export function isPeriod(v: string): v is Period {
//   return (PERIODS as readonly string[]).includes(v);
// }
