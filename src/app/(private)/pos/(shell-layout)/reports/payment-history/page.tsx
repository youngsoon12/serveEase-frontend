import Button from '@/components/Button';
import FilterSection from '@/components/page/payment-history/FilterSection';
import OrderDetailCard from '@/components/page/payment-history/OrderDetailCard';
import PaymentDetailCard from '@/components/page/payment-history/PaymentDetailCard';
import PaymentList from '@/components/page/payment-history/PaymentList';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function PaymentHistory() {
  return (
    <div className="flex h-full gap-6 p-6">
      {/* 좌측: 필터 + 리스트 */}
      <div className="flex w-[40%] flex-col gap-4">
        <h2 className="text-2xl font-bold">결제내역</h2>

        {/* 검색바 */}
        <div>검색바</div>

        {/* 필터 영역*/}
        <FilterSection />

        {/* 결제 내역 리스트 */}
        <PaymentList />
      </div>

      {/* 우측: 상세 카드 */}
      <div className="flex flex-1 flex-col gap-4">
        {/* 위아래 버튼 */}
        <div className="flex justify-end gap-1">
          <Button variant="outline">
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* 결제 상세 카드 */}
        <div>
          <PaymentDetailCard />
        </div>

        {/* 주문 상세 카드 */}
        <div className="flex-1">
          <OrderDetailCard />
        </div>
      </div>
    </div>
  );
}
