import { instance } from '@/lib/axios';
import {
  OrderRequest,
  OrderResponseSchema,
  OrderRequestSchema,
} from '@/lib/schemas/order';
import { validate } from '@/app/api/validate';

export async function getOrder(orderId: number) {
  const { data } = await instance.get(`/stores/@me/orders/${orderId}`);
  return validate(data, OrderResponseSchema);
}

export async function createOrder(tableId: number, payload: OrderRequest) {
  const validatedPayload = validate(payload, OrderRequestSchema);

  const { data } = await instance.post(
    `/stores/@me/tables/${tableId}/orders`,
    validatedPayload,
  );

  return validate(data, OrderResponseSchema);
}

export async function addOrder(orderId: number, payload: OrderRequest) {
  const validatedPayload = validate(payload, OrderRequestSchema);
  const body = validatedPayload.orderItems;

  const { data } = await instance.post(
    `/stores/@me/orders/${orderId}/items`,
    body,
  );

  return validate(data, OrderResponseSchema);
}

export async function cancelOrder(orderId: number) {
  const { data } = await instance.patch(`/stores/@me/orders/${orderId}/cancel`);

  return validate(data, OrderResponseSchema);
}
