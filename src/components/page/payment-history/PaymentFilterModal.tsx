import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function PaymentFilterModal() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>상세 조회</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <p className="text-sm text-muted-foreground">
          주문번호, 카드번호 입력, 승인번호, 금액대 등...
        </p>
      </div>
    </>
  );
}
