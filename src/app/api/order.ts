import { instance } from '@/lib/axios';

export type CreateOrderRequest = {
  restaurantTableNumber: number;
  orderItems: { menuId: number; quantity: number }[];
};

export type CreateOrderResponse = {
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

export async function createOrder(payload: CreateOrderRequest) {
  const { data } = await instance.post<CreateOrderResponse>('/orders', payload);
  return data;
}
