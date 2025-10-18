export const PERIODS = ['day', 'week', 'month'] as const;
export type Period = (typeof PERIODS)[number];

export function isPeriod(v: string): v is Period {
  return (PERIODS as readonly string[]).includes(v);
}
