export type TablesResponse = {
  content: {
    id: number;
    restaurantTableNumber: number;
    displayStatus: string;
    activeOrder?: {
      orderId: number;
      totalPrice: number;
      orderItems: {
        menuName: string;
        quantity: number;
        price: number;
      }[];
    } | null;
  }[];
  number: number;
  totalPages: number;
  totalElements: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};
