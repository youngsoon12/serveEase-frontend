export const FILTER_PERIODS = {
  TODAY: '오늘',
  LAST_7_DAYS: '일주일',
  LAST_30_DAYS: '1개월',
  CUSTOM: '직접설정',
} as const;

export const FILTER_PAYMENT_METHODS = {
  CARD: '카드',
  CASH: '현금',
} as const;

export const FILTER_ORDER_TYPES = {
  NORMAL: '정상결제',
  CANCELED: '취소결제',
  PARTIAL: '분할결제',
} as const;

export const PERIOD_TO_API = {
  오늘: 'TODAY',
  일주일: 'LAST_7_DAYS',
  '1개월': 'LAST_30_DAYS',
  직접설정: 'CUSTOM',
} as const;

export const PAYMENT_METHOD_TO_API = {
  카드: 'CARD',
  현금: 'CASH',
} as const;

export const ORDER_TYPE_TO_API = {
  정상결제: 'NORMAL',
  취소결제: 'CANCELED',
  분할결제: 'PARTIAL',
} as const;

export type FilterPeriodType =
  (typeof FILTER_PERIODS)[keyof typeof FILTER_PERIODS];
export type FilterPaymentMethodType =
  (typeof FILTER_PAYMENT_METHODS)[keyof typeof FILTER_PAYMENT_METHODS];
export type FilterOrderTypeType =
  (typeof FILTER_ORDER_TYPES)[keyof typeof FILTER_ORDER_TYPES];

export const getRangeLabel = (range: string) => {
  const key = Object.keys(FILTER_PERIODS).find(
    (k) => k === range,
  ) as keyof typeof FILTER_PERIODS;
  return key ? FILTER_PERIODS[key] : range;
};

export const getPaymentMethodLabel = (method: string) => {
  const key = Object.keys(FILTER_PAYMENT_METHODS).find(
    (k) => k === method,
  ) as keyof typeof FILTER_PAYMENT_METHODS;
  return key ? FILTER_PAYMENT_METHODS[key] : method;
};

export const getOrderTypeLabel = (type: string) => {
  const key = Object.keys(FILTER_ORDER_TYPES).find(
    (k) => k === type,
  ) as keyof typeof FILTER_ORDER_TYPES;
  return key ? FILTER_ORDER_TYPES[key] : type;
};
