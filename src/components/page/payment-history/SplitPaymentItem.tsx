import { SplitPayment } from '@/lib/schemas/payment-detail';
import DetailRow from './DetailRow';
import { format, parseISO } from 'date-fns';
import { formatApprovalNumber } from '@/lib/paymentUtils';
import { getPaymentMethodLabel } from '@/constants/payment-history';
import { useState } from 'react';
import {
  useCancelCardPayment,
  useRefundCashPayment,
} from '@/hooks/usePaymentCancel';
import { getStoreId } from '@/app/api/store';
import ConfirmModal from '@/components/ConfirmModal';
import { Badge } from '@/components/ui/badge';

interface Props {
  split: SplitPayment;
  index: number;
}

export default function SplitPaymentItem({ split, index }: Props) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { mutate: cancelCard } = useCancelCardPayment();
  const { mutate: refundCash } = useRefundCashPayment();

  const handleCancelPartialPayment = () => {
    if (split.paymentMethod === '간편결제') {
      cancelCard({
        paymentKey: split.paymentKey,
        cancelAmount: split.paymentAmount,
      });
    } else {
      const storeId = getStoreId();

      refundCash({
        storeId,
        cashPaymentId: split.paymentId,
        body: {
          refundAmount: split.paymentAmount,
        },
      });
    }
  };

  // 결제 취소 UI
  const isCanceled = split.representativePaymentDetailStatus === 'REFUNDED';

  return (
    <>
      <div className="border rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-900">{index}차 결제</h4>
          {isCanceled && (
            <Badge variant="destructive" className="h-6">
              취소
            </Badge>
          )}

          {!isCanceled && (
            <button
              className="px-3 py-1 text-sm text-red-500 bg-red-50 rounded hover:bg-red-100 font-semibold cursor-pointer"
              onClick={() => setIsCancelModalOpen(true)}
            >
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
          value={split.representativePaymentDetailStatusLabel}
        />
      </div>

      <ConfirmModal
        open={isCancelModalOpen}
        title={`${index}차 결제를 취소하시겠습니까?`}
        description={`${split.paymentAmount.toLocaleString()}원이 취소됩니다.`}
        confirmText={'취소'}
        onOpenChange={setIsCancelModalOpen}
        onConfirm={handleCancelPartialPayment}
      />
    </>
  );
}
