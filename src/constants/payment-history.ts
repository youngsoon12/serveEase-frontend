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

export const PAYMENT_STATUS = {
  COMPLETED: '완료',
  REFUNDED: '취소',
  PARTIALLY_PAID: '부분 결제',
  PARTIALLY_REFUNDED: '부분 취소',
  DONE: '완료',
  CANCELLED: '취소',
  CANCELED: '취소',
} as const;

export const PAYMENT_STATUS_VARIANT: Record<
  string,
  'secondary' | 'destructive' | 'default'
> = {
  완료: 'secondary',
  취소: 'destructive',
  '부분 결제': 'default',
  '부분 취소': 'destructive',
} as const;

export const PAYMENT_METHOD_LABEL: Record<string, string> = {
  간편결제: '간편 결제',
  CASH: '현금 결제',
} as const;

export const PAYMENT_DETAIL_STATUS = {
  PAID: '결제 완료',
  REFUNDED: '결제 취소',
} as const;

export type PeriodType = (typeof PERIODS)[keyof typeof PERIODS];
export type PaymentMethodType =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];
export type PaymentTypeType =
  (typeof PAYMENT_TYPES)[keyof typeof PAYMENT_TYPES];

export const getPaymentStatusLabel = (status: string) =>
  PAYMENT_STATUS[status as keyof typeof PAYMENT_STATUS] ?? status;

export const getPaymentStatusVariant = (status: string) => {
  const label = getPaymentStatusLabel(status);
  return PAYMENT_STATUS_VARIANT[label] ?? 'default';
};

export const getPaymentMethodLabel = (method: string | null) => {
  if (!method) return '결제수단 없음';
  return PAYMENT_METHOD_LABEL[method] ?? method;
};
