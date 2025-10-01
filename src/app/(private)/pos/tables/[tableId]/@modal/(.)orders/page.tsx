'use client';

import ModalShell from '@/components/ModalShell';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/hooks/useOrder';
import { useSearchParams } from 'next/navigation';

export default function OrderCheckModal() {
  const param = useSearchParams();
  const orderIdParam = param.get('orderId');

  const orderId = orderIdParam ? Number(orderIdParam) : undefined;

  const { data, isFetching, isError } = useOrder(orderId);

  if (isFetching) return <div className="p-2 text-sm text-gray-400">로딩…</div>;
  if (isError || !data)
    return <div className="p-2 text-sm text-red-500">불러오기 실패</div>;

  return (
    <ModalShell title={'주문 내역'} size="default">
      <div className="flex flex-col w-[21rem] max-w-full">
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
                {item.itemPrice.toLocaleString()}원
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
      </div>
    </ModalShell>
  );
}
