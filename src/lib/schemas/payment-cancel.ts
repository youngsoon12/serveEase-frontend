import z from 'zod';

// 카드 취소
export const cancelCardPaymentRequestSchema = z.object({
  paymentKey: z.string(),
  cancelAmount: z.number(),
});

export const cancelCardPaymentResponseSchema = z.object({
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
export const refundCashPaymentRequestSchema = z.object({
  cashPaymentId: z.number(),
  refundAmount: z.number(),
  refundReason: z.string(),
});

export const refundCashPaymentResponseSchema = z.object({
  cashPaymentId: z.number(),
  orderId: z.string(),
  refundedAmount: z.number(),
  paidAmount: z.number(),
  remainingAmount: z.number(),
  orderStatus: z.enum(['NORMAL', 'CANCELED', 'PARTIAL']),
  refundedAt: z.string(),
  refundReason: z.string(),
});

export type CancelCardPaymentRequest = z.infer<
  typeof cancelCardPaymentRequestSchema
>;
export type CancelCardPaymentResponse = z.infer<
  typeof cancelCardPaymentResponseSchema
>;
export type RefundCashPaymentRequest = z.infer<
  typeof refundCashPaymentRequestSchema
>;
export type RefundCashPaymentResponse = z.infer<
  typeof refundCashPaymentResponseSchema
>;
