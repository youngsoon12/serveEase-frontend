'use client';

import ModalShell from '@/components/ModalShell';
import { Button } from '@/components/ui/button';

// 임시 주문 데이터
const ORDER_ITEMS = [
  { id: 1, name: '돈까스', quantity: 1, price: 13000 },
  { id: 2, name: '돈까스', quantity: 2, price: 13000 },
  { id: 3, name: '돈까스', quantity: 1, price: 13000 },
  { id: 4, name: '돈까스', quantity: 3, price: 13000 },
  { id: 5, name: '돈까스', quantity: 1, price: 13000 },
  { id: 6, name: '돈까스', quantity: 1, price: 13000 },
  { id: 7, name: '돈까스', quantity: 1, price: 13000 },
  { id: 8, name: '돈까스', quantity: 1, price: 13000 },
  { id: 9, name: '돈까스', quantity: 1, price: 13000 },
];

export default function OrderCheckModal() {
  const total = ORDER_ITEMS.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <ModalShell title={'주문 내역'}>
      <div className="flex flex-col w-[28rem] max-w-full">
        {/* 주문 리스트 (스크롤 영역) */}
        <div className="max-h-[250px] overflow-y-auto ">
          {ORDER_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span className="text-gray-500">
                {(item.price * item.quantity).toLocaleString()}원
              </span>
            </div>
          ))}
        </div>

        {/* 합계 + 버튼 (고정 영역) */}
        <div className="mt-4 border-t pt-4 space-y-4">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>총 결제 금액</span>
            <span>{total.toLocaleString()}원</span>
          </div>
          <Button className="w-full h-12">결제하기</Button>
        </div>
      </div>
    </ModalShell>
  );
}
