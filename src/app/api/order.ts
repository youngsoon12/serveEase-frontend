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

export async function getOrder(orderId: number) {
  const { data } = await instance.get<OrderResponse>(`/orders/${orderId}`);
  return data;
}

export async function createOrder(payload: OrderRequest) {
  const storeId = getStoreId();

  const { data } = await instance.post<OrderResponse>(
    `/stores/${storeId}/orders`,
    payload,
  );
  return data;
}
