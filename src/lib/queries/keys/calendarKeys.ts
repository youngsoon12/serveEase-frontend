export const calendarKeys = {
  all: ['calendar'] as const,
  month: (yyyyMM: string) => [...calendarKeys.all, 'month', yyyyMM] as const,
};
