import { z } from 'zod';

// 주문 아이템
export const OrderItemSchema = z.object({
  menuName: z.string(),
  quantity: z.number(),
  price: z.number(),
});

// 분할 결제
export const SplitPaymentSchema = z.object({
  paymentId: z.number(),
  paymentKey: z.string(),
  paymentAmount: z.number(),
  vat: z.number(),
  paymentMethod: z.string(),
  paymentStatus: z.string(),
  approvedAt: z.string(),
  approvalNumber: z.string(),
  approvalStatus: z.string().nullable(),
});

// 전체 주문 상세 응답
export const OrderDetailResponseSchema = z.object({
  orderId: z.string(),
  totalPaymentAmount: z.number(),
  splitCount: z.number(),
  representativePaymentMethod: z.string(),
  representativePaymentStatus: z.string(),
  representativeApprovedAt: z.string(),
  tableNumber: z.number(),
  orderStatus: z.string(),
  remainingAmount: z.number(),
  orderItems: z.array(OrderItemSchema),
  splits: z.array(SplitPaymentSchema),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type SplitPayment = z.infer<typeof SplitPaymentSchema>;
export type OrderDetailResponse = z.infer<typeof OrderDetailResponseSchema>;
