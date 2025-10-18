import { Payment } from '@/types/payment-history';

// PaymentList
export const mockPaymentData: Payment[] = [
  {
    id: 1,
    cardName: '삼성카드 613*',
    amount: 30000,
    status: '완료',
    description: 'Hot 아메리카노 등/총2건',
    date: '1020번 15:24',
  },
  {
    id: 2,
    cardName: '현대카드 112*',
    amount: 52000,
    status: '취소',
    description: '아메리카노 등/총2건',
    date: '1019번 15:23',
  },
  {
    id: 3,
    cardName: '신한카드 332*',
    amount: 12500,
    status: '완료',
    description: 'Hot 아메리카노 등/총2건',
    date: '1018번 15:22',
  },
  {
    id: 4,
    cardName: '현금 결제',
    amount: 5000,
    status: '완료',
    description: '대추생강차 등/총1건',
    date: '1017번 02-02 13:40',
  },
  {
    id: 5,
    cardName: '현대카드 112*',
    amount: 12500,
    status: '완료',
    description: 'Ice 아메리카노 등/총2건',
    date: '1016번 02-02 11:00',
  },
];
