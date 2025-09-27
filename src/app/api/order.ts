import { instance } from '@/lib/axios';

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
  const { data } = await instance.post<OrderResponse>('/orders', payload);
  return data;
}
