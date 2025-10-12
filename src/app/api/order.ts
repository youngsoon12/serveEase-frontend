import { instance } from '@/lib/axios';
import { OrderRequest, OrderResponse } from '@/types/order';

export async function getOrder(orderId: number) {
  const { data } = await instance.get<OrderResponse>(
    `/stores/@me/orders/${orderId}`,
  );
  return data;
}

export async function createOrder(tableId: number, payload: OrderRequest) {
  const { data } = await instance.post<OrderResponse>(
    `/stores/@me/tables/${tableId}/orders`,
    payload,
  );
  return data;
}

export async function addOrder(orderId: number, payload: OrderRequest) {
  const body = payload.orderItems;

  const { data } = await instance.post<OrderResponse>(
    `/stores/@me/orders/${orderId}/items`,
    body,
  );
  return data;
}

export async function cancelOrder(orderId: number) {
  const { data } = await instance.patch<OrderResponse>(
    `/stores/@me/orders/${orderId}/cancel`,
  );
  return data;
}
