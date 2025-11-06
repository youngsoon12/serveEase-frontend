'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PaymentSummary } from '@/lib/schemas/paymentHistory';

interface Props {
  payments: PaymentSummary[];
  selectedId: string | null;
  onSelect: (orderId: string) => void;
}

const STATUS_BADGE_STATUS: Record<string, string> = {
  COMPLETED: '완료',
  CANCELED: '취소',
};

const STATUS_BADGE_VARIANT: Record<string, 'secondary' | 'destructive'> = {
  완료: 'secondary',
  취소: 'destructive',
};

const getStatusLabel = (status: string) =>
  STATUS_BADGE_STATUS[status] ?? status;

export default function PaymentList({ payments, selectedId, onSelect }: Props) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-2">
        {payments.map((payment) => (
          <Card
            key={payment.orderId}
            className={`p-4 cursor-pointer transition-colors ${
              selectedId === payment.orderId
                ? 'bg-blue-50 border-blue-200'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelect(payment.orderId)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 mr-4">
                <h3 className="font-semibold mb-1">
                  {payment.representativePaymentMethod ?? '결제수단 없음'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {payment.representativeItemName}
                  {payment.totalItemCount > 1 && (
                    <span className="ml-1 text-xs">
                      외 {payment.totalItemCount - 1}개
                    </span>
                  )}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="flex items-center justify-end gap-2">
                  <p className="font-bold text-lg">
                    {payment.totalPaymentAmount.toLocaleString()}원
                  </p>
                  <Badge
                    variant={
                      STATUS_BADGE_VARIANT[
                        getStatusLabel(payment.representativePaymentStatus)
                      ] ?? 'secondary'
                    }
                  >
                    {getStatusLabel(payment.representativePaymentStatus)}
                  </Badge>
                </div>

                {payment.splitCount > 1 && (
                  <Badge variant="outline" className="mt-1">
                    분할 {payment.splitCount}건
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {payment.representativeApprovedAt
                ? new Date(payment.representativeApprovedAt).toLocaleString(
                    'ko-KR',
                  )
                : '승인시간 없음'}
            </p>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
