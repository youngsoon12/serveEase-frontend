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
    totalItemPrice: number;
  }[];
  paid: boolean;
};
