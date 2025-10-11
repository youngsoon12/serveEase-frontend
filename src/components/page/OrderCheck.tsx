'use client';

import { useOrder } from '@/hooks/useOrder';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const TossPayment = dynamic(() => import('./TossPayment'), {
  ssr: false,
  loading: () => (
    <div className="mt-4 border-t pt-4">
      <div className="w-full h-12 flex items-center justify-center">
        결제 모듈 로드 중…
      </div>
    </div>
  ),
});

export default function OrderCheck() {
  // 주문 내역
  const param = useSearchParams();

  const orderIdParam = param.get('orderId');
  const orderId = orderIdParam ? Number(orderIdParam) : undefined;

  const { data, isFetching, isError } = useOrder(orderId);

  const paymentOrderId = data?.orderId;

  if (isFetching) {
    return (
      <p role="status" aria-live="polite" className="py-8 text-gray-500">
        주문 내역 불러오는 중…
      </p>
    );
  } else if (isError) {
    return (
      <p role="alert" className="py-8 text-red-600">
        주문 내역을 불러올 수 없습니다.
      </p>
    );
  }

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

          {/* 결제  */}
          {paymentOrderId && orderIdParam && data && (
            <TossPayment
              data={data}
              orderIdParam={orderIdParam}
              paymentOrderId={paymentOrderId}
            />
          )}
        </>
      )}
    </div>
  );
}
