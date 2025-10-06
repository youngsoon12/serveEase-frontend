'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, CreditCard, Clock, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useConfirmPayment } from '@/hooks/usePayment';
import type { PaymentResponse as TossPaymentResponse } from '@/app/api/payments';

export default function PaymentSuccessPage() {
  const params = useSearchParams();

  const orderId = params.get('orderId');
  const paymentKey = params.get('paymentKey');

  const amtStr = params.get('amount');
  const amount = amtStr ? parseInt(amtStr, 10) : undefined;

  const { mutateAsync, isError } = useConfirmPayment();

  const [paymentLocal, setPaymentLocal] = useState<TossPaymentResponse | null>(
    null,
  );

  const calledRef = useRef(false);

  useEffect(() => {
    const ready = !!(paymentKey && orderId && amount != null);
    console.log('[PAY] params ready:', { paymentKey, orderId, amount, ready });

    if (calledRef.current || !ready) return;
    calledRef.current = true;

    (async () => {
      try {
        const res = await mutateAsync({
          paymentKey,
          orderId,
          amount: amount as number,
        });

        setPaymentLocal(res);

        console.log('토스페이먼츠 결제 승인 성공:', res);
      } catch (err) {
        console.error('토스페이먼츠 결제 승인 실패:', err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentKey, orderId, amount]);

  if (!paymentLocal && !isError) {
    return <div className="p-10">결제 정보를 확인 중입니다…</div>;
  }

  if (isError || !paymentLocal) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-red-600">
        <h2 className="text-xl font-bold mb-2">결제 확인에 실패했습니다.</h2>
        <p>다시 시도해 주세요.</p>
        <Link href="/pos/tables">
          <Button className="mt-4 bg-red-600 hover:bg-red-700">
            테이블 페이지로 돌아가기
          </Button>
        </Link>
      </div>
    );
  }

  const payment = paymentLocal;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-center mb-5">
        <div className="w-13 h-13 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
          <Check size={32} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          결제가 완료되었습니다
        </h2>
        <p className="text-sm text-gray-600">
          고객님의 결제가 성공적으로 처리되었습니다.
        </p>
      </div>

      {/* 결제 정보 카드 */}
      <Card className="w-full max-w-sm mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText size={18} />
            결제 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {/* 결제 금액 */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">결제 금액</span>
            <span className="text-lg font-bold text-blue-600">
              {(amount as number).toLocaleString()}원
            </span>
          </div>

          {/* 결제 방법 */}
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 flex items-center gap-2 text-sm">
              <CreditCard size={14} />
              결제 방법
            </span>
            <div className="text-right">
              <div className="font-medium text-sm">{payment.method}</div>
              {payment.cardCompany && payment.maskedCardNumber && (
                <div className="text-xs text-gray-500">
                  {payment.cardCompany} ({payment.maskedCardNumber})
                </div>
              )}
            </div>
          </div>

          {/* 결제 시간 */}
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 flex items-center gap-2 text-sm">
              <Clock size={14} />
              결제 시간
            </span>
            <span className="font-medium text-sm">{payment.approvedAt}</span>
          </div>

          {/* 승인번호 */}
          <div className="flex justify-between items-center py-2 bg-gray-50 px-3 rounded-lg">
            <span className="text-gray-600 text-sm">승인번호</span>
            <span className="font-mono text-xs font-medium">
              {payment.approvalNumber}
            </span>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full max-w-sm">
        <Link href={'/pos/tables'}>테이블 페이지로 돌아가기</Link>
      </Button>

      <p className="text-xs text-gray-500 mt-4 text-center max-w-sm">
        영수증이 필요하신 경우 승인번호를 이용해 출력하실 수 있습니다.
      </p>
    </div>
  );
}
