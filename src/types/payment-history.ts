export type PaymentStatus = '완료' | '취소';

export interface Payment {
  id: number;
  cardName: string;
  amount: number;
  status: PaymentStatus;
  description: string;
  date: string;
}
