import { z } from 'zod';

export const TableOrderItemSchema = z.object({
  menuName: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const ActiveOrderSchema = z.object({
  orderId: z.number(),
  totalPrice: z.number(),
  orderItems: z.array(TableOrderItemSchema),
});

export const TableContentSchema = z.object({
  id: z.number(),
  restaurantTableNumber: z.number(),
  displayStatus: z.string(),
  activeOrder: ActiveOrderSchema.nullable().optional(),
});

export const TablesResponseSchema = z.object({
  content: z.array(TableContentSchema),
  number: z.number(),
  totalPages: z.number(),
  totalElements: z.number(),
  size: z.number(),
  first: z.boolean(),
  last: z.boolean(),
  empty: z.boolean(),
});

// 테이블 카드 Props 스키마
export const TableStatusSchema = z.enum([
  'EMPTY',
  'ORDERED',
  'SERVED',
  'PARTIALLY_PAID',
]);

export const TableCardPropsSchema = z.object({
  tableNumber: z.number(),
  price: z.number().optional(),
  status: TableStatusSchema,
  href: z.string(),
  menuItems: z.array(z.string()).optional(),
  orderId: z.number().optional(),
});

export type TablesResponse = z.infer<typeof TablesResponseSchema>;
export type TableContent = z.infer<typeof TableContentSchema>;
export type ActiveOrder = z.infer<typeof ActiveOrderSchema>;
export type TableOrderItem = z.infer<typeof TableOrderItemSchema>;
export type TableCardProps = z.infer<typeof TableCardPropsSchema>;
export type TableStatus = z.infer<typeof TableStatusSchema>;
