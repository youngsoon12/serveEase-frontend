import { z } from 'zod';

// 요청 params
export const PaymentHistoryParamsSchema = z.object({
  page: z.number().int().min(0).default(0),
  size: z.number().int().min(1).max(100).default(20),
  range: z.enum(['TODAY', 'WEEK', 'MONTH', 'CUSTOM']).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  paymentMethod: z.string().optional(),
  orderType: z.string().optional(),
});

// 개별 결제 항목 (결제 내역 리스트)
export const PaymentSummarySchema = z.object({
  orderId: z.string(),
  totalPaymentAmount: z.number(),
  splitCount: z.number(),
  representativePaymentMethod: z.string().nullable(),
  representativePaymentStatus: z.string(),
  representativeApprovedAt: z.string().nullable(),
  representativeItemName: z.string(),
  totalItemCount: z.number(),
});

// 응답 데이터
export const PaymentHistoryResponseSchema = z.object({
  content: z.array(PaymentSummarySchema),
  totalElements: z.number(),
  totalPages: z.number(),
  size: z.number(),
  number: z.number(),
  first: z.boolean(),
  last: z.boolean(),
  empty: z.boolean(),
});

export type PaymentHistoryParams = z.infer<typeof PaymentHistoryParamsSchema>;
export type PaymentSummary = z.infer<typeof PaymentSummarySchema>;
export type PaymentHistoryResponse = z.infer<
  typeof PaymentHistoryResponseSchema
>;
