import { PaymentDetail } from '@/types/payment-history';
import DetailRow from './DetailRow';

interface PaymentDetailCardProps {
  detail: PaymentDetail;
}

export default function PaymentDetailCard({ detail }: PaymentDetailCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mb-3">
        <p className="text-sm text-gray-400 mb-1">총 결제금액</p>
        <p className="text-2xl font-bold">
          {detail.totalAmount.toLocaleString()}원
        </p>
      </div>

      <div className="border-t mb-3"></div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{detail.category}</span>

          {detail.approvalStatus !== '취소완료' && (
            <button className="px-4 py-1.5 font-semibold text-sm text-red-500 bg-red-50 rounded hover:bg-red-100 cursor-pointer">
              결제 취소
            </button>
          )}
        </div>

        <DetailRow label="금액" value={detail.totalPrice.toLocaleString()} />
        <DetailRow label="부가세" value={detail.vat.toLocaleString()} />
        <DetailRow label="결제시간" value={detail.paymentTime} />
        <DetailRow label="결제수단" value={detail.paymentMethod} />
        <DetailRow label="승인번호" value={detail.approvalNumber} />
        <DetailRow label="승인상태" value={detail.approvalStatus} />
      </div>
    </div>
  );
}
