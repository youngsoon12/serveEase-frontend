import { OrderDetail, Payment, PaymentDetail } from '@/types/payment-history';

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

// 결제 상세 정보 목 데이터
export const mockPaymentDetailData: PaymentDetail[] = [
  {
    paymentId: 1,
    totalAmount: 30000,
    category: '신용카드',
    totalPrice: 27273,
    vat: 2727,
    paymentTime: '2024-10-20 15:24',
    paymentMethod: '삼성카드 613*',
    approvalNumber: '115679435',
    approvalStatus: '결제완료',
  },
  {
    paymentId: 2,
    totalAmount: 52000,
    category: '신용카드',
    totalPrice: 47273,
    vat: 4727,
    paymentTime: '2024-10-19 15:23',
    paymentMethod: '현대카드 112*',
    approvalNumber: '115679436',
    approvalStatus: '취소완료',
  },
  {
    paymentId: 3,
    totalAmount: 12500,
    category: '신용카드',
    totalPrice: 11364,
    vat: 1136,
    paymentTime: '2024-10-18 15:22',
    paymentMethod: '신한카드 332*',
    approvalNumber: '115679437',
    approvalStatus: '결제완료',
  },
  {
    paymentId: 4,
    totalAmount: 5000,
    category: '계좌이체(현금 영수증)',
    totalPrice: 4545,
    vat: 455,
    paymentTime: '2024-02-02 13:40',
    paymentMethod: '계좌이체(현금 영수증)',
    approvalNumber: '115679438',
    approvalStatus: '결제완료',
  },
  {
    paymentId: 5,
    totalAmount: 12500,
    category: '신용카드',
    totalPrice: 11364,
    vat: 1136,
    paymentTime: '2024-02-02 11:00',
    paymentMethod: '현대카드 112*',
    approvalNumber: '115679439',
    approvalStatus: '결제완료',
  },
];

// 주문 상세 정보 목 데이터
export const mockOrderDetailData: OrderDetail[] = [
  {
    paymentId: 1,
    items: [
      {
        id: 1,
        name: 'Hot 아메리카노',
        quantity: 1,
        price: 4500,
      },
      {
        id: 2,
        name: '카페라떼',
        quantity: 1,
        price: 5000,
      },
      {
        id: 3,
        name: '카라멜 마키아또',
        quantity: 1,
        price: 5500,
      },
      {
        id: 4,
        name: '녹차라떼',
        quantity: 2,
        price: 11000,
      },
    ],
  },
  {
    paymentId: 2,
    items: [
      {
        id: 5,
        name: 'Ice 아메리카노',
        quantity: 2,
        price: 9000,
      },
      {
        id: 6,
        name: '카페모카',
        quantity: 1,
        price: 5500,
      },
      {
        id: 7,
        name: '바닐라라떼',
        quantity: 1,
        price: 5000,
      },
    ],
  },
  {
    paymentId: 3,
    items: [
      {
        id: 8,
        name: 'Hot 아메리카노',
        quantity: 2,
        price: 9000,
      },
      {
        id: 9,
        name: '바닐라라떼',
        quantity: 1,
        price: 5000,
      },
      {
        id: 10,
        name: '카푸치노',
        quantity: 1,
        price: 4800,
      },
      {
        id: 11,
        name: '치즈케이크',
        quantity: 1,
        price: 6000,
      },
    ],
  },
  {
    paymentId: 4,
    items: [
      {
        id: 12,
        name: '대추생강차',
        quantity: 1,
        price: 5000,
      },
      {
        id: 13,
        name: '유자차',
        quantity: 1,
        price: 5000,
      },
      {
        id: 14,
        name: '허니브레드',
        quantity: 1,
        price: 8000,
      },
    ],
  },
  {
    paymentId: 5,
    items: [
      {
        id: 15,
        name: 'Ice 아메리카노',
        quantity: 2,
        price: 9000,
      },
      {
        id: 16,
        name: '헤이즐넛라떼',
        quantity: 1,
        price: 5500,
      },
      {
        id: 17,
        name: '딸기스무디',
        quantity: 1,
        price: 6500,
      },
      {
        id: 18,
        name: '두바이초콜릿',
        quantity: 2,
        price: 8000,
      },
      {
        id: 19,
        name: '딸기바나나빵',
        quantity: 2,
        price: 8000,
      },
      {
        id: 20,
        name: '땅콩크림빵',
        quantity: 2,
        price: 8000,
      },
    ],
  },
];
