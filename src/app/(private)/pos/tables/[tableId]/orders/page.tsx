'use client';

import BackButton from '@/components/BackButton';
import OrderCheck from '@/components/page/OrderCheck';

export default function OrderCheckPage() {
  return (
    <div className="w-[80%] mx-auto pt-8 flex-1 overflow-auto">
      <BackButton
        buttonStyle={'w-14'}
        iconStyle={'size-5'}
        targetPath={'/pos/tables'}
      />
      <main className="flex flex-col items-center justify-center p-5">
        <h1 className="text-2xl font-bold mb-8">주문 내역 확인</h1>

        <div className="bg-white p-8 rounded-lg shadow-lg border w-full max-w-sm">
          <OrderCheck />
        </div>
      </main>
    </div>
  );
}
