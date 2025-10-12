import { instance } from '@/lib/axios';
import { getStoreId } from './store';
import { OrderRequest, OrderResponse } from '@/types/order';

const storeId = getStoreId();

export async function getOrder(orderId: number) {
  const { data } = await instance.get<OrderResponse>(
    `/stores/${storeId}/orders/${orderId}`,
  );
  return data;
}

export async function createOrder(tableId: number, payload: OrderRequest) {
  const { data } = await instance.post<OrderResponse>(
    `/stores/${storeId}/tables/${tableId}/orders`,
    payload,
  );
  return data;
}

export async function addOrder(orderId: number, payload: OrderRequest) {
  const body = payload.orderItems;

  const { data } = await instance.post<OrderResponse>(
    `/stores/${storeId}/orders/${orderId}/items`,
    body,
  );
  return data;
}

export async function cancelOrder(orderId: number) {
  const { data } = await instance.patch<OrderResponse>(
    `/stores/${storeId}/orders/${orderId}/cancel`,
  );
  return data;
}
