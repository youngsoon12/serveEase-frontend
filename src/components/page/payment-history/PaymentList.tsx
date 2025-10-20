'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Payment, PaymentStatus } from '@/types/payment-history';

const STATUS_BADGE_STATUS: Record<PaymentStatus, 'secondary' | 'destructive'> =
  {
    완료: 'secondary',
    취소: 'destructive',
  };

interface PaymentListProps {
  payments: Payment[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function PaymentList({
  payments,
  selectedId,
  onSelect,
}: PaymentListProps) {
  return (
    <ScrollArea className="h-[67%]">
      <div className="space-y-2">
        {payments.map((payment) => (
          <Card
            key={payment.id}
            className={`p-4 cursor-pointer transition-colors ${
              selectedId === payment.id
                ? 'bg-blue-50 border-blue-200'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelect(payment.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 mr-4">
                <h3 className="font-semibold mb-1">{payment.cardName}</h3>
                <p className="text-sm text-muted-foreground">
                  {payment.description}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="flex items-center justify-end gap-2">
                  <p className="font-bold text-lg">
                    {payment.amount.toLocaleString()}원
                  </p>
                  <Badge variant={STATUS_BADGE_STATUS[payment.status]}>
                    {payment.status}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{payment.date}</p>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
