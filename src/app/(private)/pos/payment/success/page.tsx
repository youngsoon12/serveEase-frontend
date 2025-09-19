'use client';

import React from 'react';
import { Check, CreditCard, Clock, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// 토스 결제 응답 타입 정의
interface PaymentData {
  totalAmount: number;
  method: string;
  approvedAt: string;
  approveNo: string;
  cardNumber?: string;
  company?: string;
}

// 예시 데이터
const paymentData: PaymentData = {
  totalAmount: 25000,
  method: '카드',
  approvedAt: '2025-09-19 14:10:25',
  approveNo: '12345678',
  cardNumber: '433012******1234',
  company: '현대카드',
};

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center ">
      {/* 성공 아이콘 & 메시지 */}
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
              {paymentData.totalAmount.toLocaleString()}원
            </span>
          </div>

          {/* 결제 방법 */}
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 flex items-center gap-2 text-sm">
              <CreditCard size={14} />
              결제 방법
            </span>
            <div className="text-right">
              <div className="font-medium text-sm">{paymentData.method}</div>
              {paymentData.company && paymentData.cardNumber && (
                <div className="text-xs text-gray-500">
                  {paymentData.company} ({paymentData.cardNumber})
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
            <span className="font-medium text-sm">
              {paymentData.approvedAt}
            </span>
          </div>

          {/* 승인번호 */}
          <div className="flex justify-between items-center py-2 bg-gray-50 px-3 rounded-lg">
            <span className="text-gray-600 text-sm">승인번호</span>
            <span className="font-mono text-xs font-medium">
              {paymentData.approveNo}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* CTA 버튼 */}
      <Button className="w-full max-w-sm">
        <Link href={'/pos/tables'}>테이블 페이지로 돌아가기</Link>
      </Button>

      {/* 추가 안내 */}
      <p className="text-xs text-gray-500 mt-4 text-center max-w-sm">
        영수증이 필요하신 경우 승인번호를 이용해 출력하실 수 있습니다.
      </p>
    </div>
  );
}
