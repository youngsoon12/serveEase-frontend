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
  COMPLETED: '완료',
  DONE: '완료',
  CANCELLED: '취소',
  PARTIALLY_PAID: '분할 결제',
} as const;

export const APPROVAL_STATUS_VARIANT: Record<
  string,
  'secondary' | 'destructive' | 'default'
> = {
  완료: 'secondary',
  취소: 'destructive',
  '분할 결제': 'destructive',
} as const;

export const PAYMENT_METHOD_RESPONSE_LABEL: Record<string, string> = {
  간편결제: '간편 결제',
  CASH: '현금 결제',
} as const;

export type PeriodType = (typeof PERIODS)[keyof typeof PERIODS];
export type PaymentMethodType =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];
export type PaymentTypeType =
  (typeof PAYMENT_TYPES)[keyof typeof PAYMENT_TYPES];

export const getApprovalStatusLabel = (status: string) =>
  APPROVAL_STATUS[status as keyof typeof APPROVAL_STATUS] ?? status;

export const getApprovalStatusVariant = (statusLabel: string) =>
  APPROVAL_STATUS_VARIANT[statusLabel] ?? 'secondary';

export const getPaymentMethodLabel = (method: string | null) => {
  if (!method) return '결제수단 없음';
  return PAYMENT_METHOD_RESPONSE_LABEL[method] ?? method;
};

export function getDisplayStatus(status: string | null | undefined) {
  if (!status) return '-';

  return APPROVAL_STATUS[status as keyof typeof APPROVAL_STATUS] || status;
}
