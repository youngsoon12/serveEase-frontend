'use client';

import { useOrder } from '@/hooks/useOrder';
import { useSearchParams } from 'next/navigation';

export default function OrderCheck() {
  const param = useSearchParams();
  const orderIdParam = param.get('orderId');
  const orderId = orderIdParam ? Number(orderIdParam) : undefined;

  const { data, isFetching, isError } = useOrder(orderId);

  if (isFetching) {
    return (
      <p role="status" aria-live="polite" className="py-8 text-gray-500">
        주문 내역 불러오는 중…
      </p>
    );
  }
  if (isError) {
    return (
      <p role="alert" className="py-8 text-red-600">
        주문 내역을 불러올 수 없습니다.
      </p>
    );
  }

  const items = data?.orderItems ?? [];
  const kinds = items.length; // 상품 종류 수
  const totalQty = items.reduce((sum, it) => sum + (it.quantity ?? 0), 0);
  const totalAmount = items.reduce(
    (sum, it) => sum + (it.totalItemPrice ?? 0),
    0,
  );

  return (
    <div className="w-full max-w-[21rem] h-full mx-auto px-4 py-6 grid grid-rows-[1fr_auto] gap-4">
      {/* 주문 내역 상단*/}
      <div className="min-h-[260px] max-h-[52vh] overflow-auto rounded-lg border bg-white p-3">
        {!orderId || items.length === 0 ? (
          <div className="flex items-center justify-center py-10 text-gray-500">
            주문 내역이 없습니다.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li
                key={item.orderItemId}
                className="py-3 flex items-center justify-between"
              >
                <span className="text-sm">
                  {item.menuName}{' '}
                  <span className="text-gray-400">× {item.quantity}</span>
                </span>
                <span className="text-sm text-gray-700 tabular-nums font-medium">
                  {item.totalItemPrice.toLocaleString('ko-KR')}원
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 하단 */}
      <div className="rounded-lg border bg-white px-4 py-3">
        <div className="grid grid-cols-[1fr_auto] gap-y-1 text-sm">
          <div className="text-gray-500">상품 종류</div>
          <div className="tabular-nums">{kinds}개</div>

          <div className="text-gray-500">총 수량</div>
          <div className="tabular-nums">{totalQty}개</div>

          <div className="col-span-2 h-2" />

          <div className="font-semibold">총 금액</div>
          <div className="tabular-nums font-bold text-lg">
            {totalAmount.toLocaleString('ko-KR')}원
          </div>
        </div>
      </div>
    </div>
  );
}
