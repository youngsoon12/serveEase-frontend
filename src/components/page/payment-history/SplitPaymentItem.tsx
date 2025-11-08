import { SplitPayment } from '@/lib/schemas/paymentDetail';
import DetailRow from './DetailRow';
import { format, parseISO } from 'date-fns';
import { formatApprovalNumber } from '@/lib/paymentUtils';
import {
  getDisplayStatus,
  getPaymentMethodLabel,
} from '@/constants/payment-history';

interface Props {
  split: SplitPayment;
  index: number;
}

export default function SplitPaymentItem({ split, index }: Props) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-gray-900">{index}차 결제</h4>

        {split.paymentStatus !== 'CANCELLED' && (
          <button className="px-3 py-1 text-sm text-red-500 bg-red-50 rounded hover:bg-red-100 font-semibold cursor-pointer">
            결제 취소
          </button>
        )}
      </div>

      <DetailRow
        label="결제 수단"
        value={getPaymentMethodLabel(split.paymentMethod)}
      />
      <DetailRow
        label="금액"
        value={`${split.paymentAmount.toLocaleString()}원`}
      />
      <DetailRow label="부가세" value={`${split.vat.toLocaleString()}원`} />
      <DetailRow
        label="승인 시간"
        value={format(parseISO(split.approvedAt), 'yyyy-MM-dd HH:mm')}
      />
      <DetailRow
        label="승인 번호"
        value={formatApprovalNumber(split.approvalNumber)}
      />
      <DetailRow
        label="승인 상태"
        value={getDisplayStatus(split.paymentStatus)}
      />
    </div>
  );
}
