'use client';

import { useOrder } from '@/hooks/useOrder';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function OrderCheck() {
  const param = useSearchParams();
  const orderIdParam = param.get('orderId');

  const orderId = orderIdParam ? Number(orderIdParam) : undefined;

  const { data } = useOrder(orderId);

  return (
    <div className="flex flex-col w-[21rem] max-w-full">
      {!orderId || !data ? (
        <div className="flex items-center justify-center py-8 text-gray-500">
          주문 내역이 없습니다.
        </div>
      ) : (
        <>
          {/* 주문 리스트 (스크롤 영역) */}
          <div className="max-h-[250px] overflow-y-auto scrollbar-hide">
            {data?.orderItems?.map((item) => (
              <div
                key={item.orderItemId}
                className="flex items-center justify-between py-3"
              >
                <span>
                  {item.menuName} × {item.quantity}
                </span>
                <span className="text-gray-500">
                  {item.totalItemPrice.toLocaleString()}원
                </span>
              </div>
            ))}
          </div>

          {/* 합계 + 버튼 (고정 영역) */}
          <div className="mt-4 border-t pt-4 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>총 결제 금액</span>
              <span>{data?.totalPrice.toLocaleString()}원</span>
            </div>
            <Button className="w-full h-12">결제하기</Button>
          </div>
        </>
      )}
    </div>
  );
}
