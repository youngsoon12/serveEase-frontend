import { z } from 'zod';

export const OrderItemRequestSchema = z.object({
  menuId: z.number(),
  quantity: z.number(),
});

export const OrderRequestSchema = z.object({
  restaurantTableNumber: z.number(),
  orderItems: z.array(OrderItemRequestSchema),
});

export const OrderItemResponseSchema = z.object({
  orderItemId: z.number(),
  menuId: z.number(),
  menuName: z.string(),
  quantity: z.number(),
  itemPrice: z.number(),
  totalItemPrice: z.number(),
});

export const OrderResponseSchema = z.object({
  id: z.number(),
  orderId: z.string(),
  restaurantTableId: z.number(),
  status: z.string(),
  totalPrice: z.number(),
  orderTime: z.string(),
  orderItems: z.array(OrderItemResponseSchema),
  remainingAmount: z.number(),
  paid: z.boolean(),
});

export type OrderRequest = z.infer<typeof OrderRequestSchema>;
export type OrderItemRequest = z.infer<typeof OrderItemRequestSchema>;
export type OrderResponse = z.infer<typeof OrderResponseSchema>;
export type OrderItemResponse = z.infer<typeof OrderItemResponseSchema>;
