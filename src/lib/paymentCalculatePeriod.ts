import { FILTER_PERIODS, FilterPeriodType } from '@/constants/payment-filter';

export const DATE_RANGE_CONFIG = {
  [FILTER_PERIODS.TODAY]: {
    start: () => new Date(),
    end: () => new Date(),
    disabled: true,
  },
  [FILTER_PERIODS.LAST_7_DAYS]: {
    start: () => {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date;
    },
    end: () => new Date(),
    disabled: true,
  },
  [FILTER_PERIODS.LAST_30_DAYS]: {
    start: () => {
      const date = new Date();
      date.setMonth(date.getMonth() - 1);
      return date;
    },
    end: () => new Date(),
    disabled: true,
  },
  [FILTER_PERIODS.CUSTOM]: {
    start: () => null,
    end: () => null,
    disabled: false,
  },
};

export const calculateDateRange = (period: FilterPeriodType) => {
  const config =
    DATE_RANGE_CONFIG[period] || DATE_RANGE_CONFIG[FILTER_PERIODS.TODAY];

  return {
    start: config.start(),
    end: config.end(),
    disabled: config.disabled,
  };
};
