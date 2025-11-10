'use client';

import { OrderDetailResponse } from '@/lib/schemas/payment-detail';
import DetailRow from './DetailRow';
import SplitPaymentItem from './SplitPaymentItem';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { getPaymentMethodLabel } from '@/constants/payment-history';
import { formatApprovalNumber } from '@/lib/paymentUtils';
import {
  useCancelCardPayment,
  useRefundCashPayment,
} from '@/hooks/usePaymentCancel';
import { getStoreId } from '@/app/api/store';
import ConfirmModal from '@/components/ConfirmModal';

interface Props {
  detail: OrderDetailResponse;
}

export default function PaymentDetailCard({ detail }: Props) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const splitCount = detail.splits?.length ?? detail.splitCount ?? 0;

  const paidAmount = Number(detail.totalPaymentAmount ?? 0);
  const remaining = Number(detail.remainingAmount ?? 0);

  const hasRemainingAmount = remaining > 0;
  const isSplitPayment = hasRemainingAmount ? splitCount >= 1 : splitCount > 1;
  const orderStatusText = hasRemainingAmount ? '부분결제 진행중' : '결제완료';

  // 결제 취소
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { mutate: cancelCard } = useCancelCardPayment();
  const { mutate: refundCash } = useRefundCashPayment();

  const handleCancelSinglePayment = () => {
    const split = detail.splits?.[0];

    if (!split) return;

    if (split.paymentMethod === '간편결제') {
      cancelCard({
        paymentKey: split.paymentKey,
        cancelAmount: split.paymentAmount,
      });
    } else if (split.paymentMethod === 'CASH') {
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

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white p-6">
        <div className="mb-3">
          <p className="text-sm text-gray-400 mb-1">총 결제금액</p>
          <p className="text-2xl font-bold">
            {isSplitPayment && hasRemainingAmount
              ? (paidAmount + remaining).toLocaleString()
              : paidAmount.toLocaleString()}
            원
          </p>
        </div>

        <div className="border-t mb-3"></div>

        <div className="space-y-4">
          {/* 단일 결제 */}
          {!hasRemainingAmount && splitCount === 1 && detail.splits?.[0] && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  {getPaymentMethodLabel(detail.splits[0].paymentMethod)}
                </span>
                {detail.splits[0].paymentStatus !== 'CANCELLED' && (
                  <button
                    className="px-4 py-1.5 font-semibold text-sm text-red-500 bg-red-50 cursor-pointer rounded hover:bg-red-100"
                    onClick={() => setIsCancelModalOpen(true)}
                  >
                    결제 취소
                  </button>
                )}
              </div>

              <DetailRow
                label="금액"
                value={`${detail.splits[0].paymentAmount.toLocaleString()}원`}
              />
              <DetailRow
                label="부가세"
                value={`${detail.splits[0].vat.toLocaleString()}원`}
              />
              <DetailRow
                label="승인 시간"
                value={format(
                  parseISO(detail.splits[0].approvedAt),
                  'yyyy-MM-dd HH:mm',
                )}
              />
              <DetailRow
                label="승인 번호"
                value={formatApprovalNumber(detail.splits[0].approvalNumber)}
              />
            </>
          )}

          {/* 남은 금액 있을 경우 */}
          {hasRemainingAmount && (
            <>
              <DetailRow
                label="결제 완료"
                value={`${paidAmount.toLocaleString()}원`}
              />
              <DetailRow
                label="남은 금액 ⚠️"
                value={`${remaining.toLocaleString()}원`}
                valueClassName="text-orange-600 font-semibold"
              />
            </>
          )}

          {/* 공통 정보 */}
          <DetailRow label="테이블" value={`${detail.tableNumber}번`} />
          <DetailRow
            label="결제 수단"
            value={getPaymentMethodLabel(detail.representativePaymentMethod)}
          />
          <DetailRow label="결제 상태" value={orderStatusText} />

          {/* 분할 결제 - 아코디언 */}
          {isSplitPayment && (
            <>
              <button
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                className="w-full flex justify-center items-center gap-2 py-3 text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <span className="font-medium">
                  {isAccordionOpen ? '▲' : '▼'} 분할 결제 상세보기 ({splitCount}
                  건)
                </span>
              </button>

              {/* 아코디언 내용 */}
              {isAccordionOpen && (
                <div className="space-y-3 pt-2">
                  {detail.splits.map((split, index) => (
                    <SplitPaymentItem
                      key={split.paymentId}
                      split={split}
                      index={index + 1}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ConfirmModal
        open={isCancelModalOpen}
        title={'결제를 취소하시겠습니까?'}
        description={`${detail.splits?.[0].paymentAmount.toLocaleString()}원이 취소됩니다.`}
        confirmText={'취소'}
        onOpenChange={setIsCancelModalOpen}
        onConfirm={handleCancelSinglePayment}
      />
    </div>
  );
}
