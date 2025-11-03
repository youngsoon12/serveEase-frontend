import { PERIODS, PeriodType } from '@/constants/payment-history';

export const DATE_RANGE_CONFIG = {
  [PERIODS.TODAY]: {
    start: () => new Date(),
    end: () => new Date(),
    disabled: true,
  },
  [PERIODS.WEEK]: {
    start: () => {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date;
    },
    end: () => new Date(),
    disabled: true,
  },
  [PERIODS.MONTH]: {
    start: () => {
      const date = new Date();
      date.setMonth(date.getMonth() - 1);
      return date;
    },
    end: () => new Date(),
    disabled: true,
  },
  [PERIODS.CUSTOM]: {
    start: () => null,
    end: () => null,
    disabled: false,
  },
};

export const calculateDateRange = (period: PeriodType) => {
  const config = DATE_RANGE_CONFIG[period] || DATE_RANGE_CONFIG[PERIODS.TODAY];

  return {
    start: config.start(),
    end: config.end(),
    disabled: config.disabled,
  };
};
