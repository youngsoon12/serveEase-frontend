export type PaymentStatus = '완료' | '취소';

export interface Payment {
  id: number;
  cardName: string;
  amount: number;
  status: PaymentStatus;
  description: string;
  date: string;
}

// 결제 상세 정보
export interface PaymentDetail {
  paymentId: number; // Payment의 id와 매칭
  totalAmount: number;
  category: string; // 결제 수단
  totalPrice: number;
  vat: number;
  paymentTime: string;
  paymentMethod: string;
  approvalNumber: string;
  approvalStatus: string;
}

// 주문 아이템
export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  options?: string;
}

// 주문 상세 정보
export interface OrderDetail {
  paymentId: number;
  items: OrderItem[];
}
