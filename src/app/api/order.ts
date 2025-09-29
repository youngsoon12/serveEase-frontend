import { instance } from '@/lib/axios';
import { getStoreId } from './store';

export type OrderRequest = {
  restaurantTableNumber: number;
  orderItems: { menuId: number; quantity: number }[];
};

export type OrderResponse = {
  id: number;
  restaurantTableId: number;
  status: string;
  totalPrice: number;
  orderTime: string;
  orderItems: {
    orderItemId: number;
    menuId: number;
    menuName: string;
    quantity: number;
    itemPrice: number;
  }[];
  paid: boolean;
};

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
