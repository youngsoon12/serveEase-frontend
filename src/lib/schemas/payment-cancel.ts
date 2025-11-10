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
  orderStatus: z.enum(['NORMAL', 'CANCELED', 'PARTIAL']),
  canceledAt: z.string(),
  cancelReason: z.string(),
});

// 현금 환불
export const RefundCashPaymentRequestSchema = z.object({
  cashPaymentId: z.number(),
  refundAmount: z.number(),
  refundReason: z.string(),
});

export const RefundCashPaymentResponseSchema = z.object({
  cashPaymentId: z.number(),
  orderId: z.string(),
  refundedAmount: z.number(),
  paidAmount: z.number(),
  remainingAmount: z.number(),
  orderStatus: z.enum(['NORMAL', 'CANCELED', 'PARTIAL']),
  refundedAt: z.string(),
  refundReason: z.string(),
});

export const RefundCashPaymentParamsSchema = z.object({
  storeId: z.string(),
  orderId: z.string(),
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
