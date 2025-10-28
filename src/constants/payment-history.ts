export const PERIODS = {
  TODAY: '오늘',
  WEEK: '일주일',
  MONTH: '1개월',
  CUSTOM: '직접설정',
} as const;

export const PAYMENT_METHODS = {
  CARD: '카드',
  CASH: '현금',
} as const;

export const PAYMENT_TYPES = {
  CANCELLED: '취소결제',
  INSTALLMENT: '분할결제',
  NORMAL: '정상결제',
} as const;

export const APPROVAL_STATUS = {
  COMPLETED: '승인완료',
  CANCELLED: '취소완료',
  PENDING: '승인대기',
} as const;

export type PeriodType = (typeof PERIODS)[keyof typeof PERIODS];
export type PaymentMethodType =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];
export type PaymentTypeType =
  (typeof PAYMENT_TYPES)[keyof typeof PAYMENT_TYPES];
