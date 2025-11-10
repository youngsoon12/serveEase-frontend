import z from 'zod';

// 카드 취소
export const CancelCardPaymentRequestSchema = z.object({
  paymentKey: z.string(),
  cancelAmount: z.number(),
});

export const CancelCardPaymentResponseSchema = z.object({
  paymentKey: z.string(),
  orderId: z.string(),
  canceledAmount: z.number(),
  paidAmount: z.number(),
  remainingAmount: z.number(),
  orderStatus: z.enum(['NORMAL', 'CANCELED', 'PARTIALLY_PAID', 'REFUNDED']),
  canceledAt: z.string(),
  cancelReason: z.string(),
});

// 현금 환불
export const RefundCashPaymentRequestSchema = z.object({
  refundAmount: z.number(),
});

export const RefundCashPaymentResponseSchema = z.object({
  cashPaymentId: z.number(),
  orderId: z.string(),
  refundedAmount: z.number(),
  paidAmount: z.number(),
  remainingAmount: z.number(),
  orderStatus: z.enum(['NORMAL', 'CANCELED', 'PARTIALLY_PAID', 'REFUNDED']),
  refundedAt: z.string(),
  refundReason: z.string(),
});

export const RefundCashPaymentParamsSchema = z.object({
  storeId: z.number(),
  cashPaymentId: z.number(),
  body: RefundCashPaymentRequestSchema,
});

export type CancelCardPaymentRequest = z.infer<
  typeof CancelCardPaymentRequestSchema
>;
export type CancelCardPaymentResponse = z.infer<
  typeof CancelCardPaymentResponseSchema
>;
export type RefundCashPaymentRequest = z.infer<
  typeof RefundCashPaymentRequestSchema
>;
export type RefundCashPaymentResponse = z.infer<
  typeof RefundCashPaymentResponseSchema
>;
export type RefundCashPaymentParams = z.infer<
  typeof RefundCashPaymentParamsSchema
>;
