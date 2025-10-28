'use client';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  PERIODS,
  PAYMENT_METHODS,
  PAYMENT_TYPES,
  PeriodType,
  PaymentMethodType,
  PaymentTypeType,
} from '@/constants/payment-history';
import { useState, useEffect } from 'react';
import { calculateDateRange } from '@/lib/payment-period-utils';
import DatePicker from './DatePicker';

interface FilterState {
  period: PeriodType;
  paymentMethod: PaymentMethodType;
  paymentType: PaymentTypeType;
  startDate: Date | undefined;
  endDate: Date | undefined;
  isDateInputDisabled: boolean;
}

export default function PaymentFilterModal() {
  const [filters, setFilters] = useState<FilterState>({
    period: PERIODS.TODAY,
    paymentMethod: PAYMENT_METHODS.CARD,
    paymentType: PAYMENT_TYPES.CANCELLED,
    startDate: new Date(),
    endDate: new Date(),
    isDateInputDisabled: true,
  });

  const periods = Object.values(PERIODS);
  const paymentMethods = Object.values(PAYMENT_METHODS);
  const paymentTypes = Object.values(PAYMENT_TYPES);

  // 기간 선택에 따라 날짜 설정
  useEffect(() => {
    const { start, end, disabled } = calculateDateRange(filters.period);

    if (start && end) {
      setFilters((prev) => ({
        ...prev,
        startDate: start,
        endDate: end,
        isDateInputDisabled: disabled,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        isDateInputDisabled: disabled,
      }));
    }
  }, [filters.period]);

  return (
    <div className="flex flex-col h-full">
      <DialogHeader className="px-6 py-1.5">
        <DialogTitle className="text-2xl font-bold">상세 조회</DialogTitle>
      </DialogHeader>

      <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
        {/* 기간 버튼 */}
        <div className="grid grid-cols-4 gap-2">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setFilters((prev) => ({ ...prev, period }))}
              className={`px-4 py-2.5 text-sm font-medium transition-colors rounded-lg ${
                filters.period === period
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* 날짜 범위 선택 */}
        <div className="flex items-center gap-3">
          {/* 시작 날짜 */}
          <DatePicker
            date={filters.startDate}
            onSelect={(date) =>
              setFilters((prev) => ({ ...prev, startDate: date }))
            }
            disabled={filters.isDateInputDisabled}
          />
          <span className="text-muted-foreground">~</span>

          {/* 종료 날짜 */}
          <DatePicker
            date={filters.endDate}
            onSelect={(date) =>
              setFilters((prev) => ({ ...prev, endDate: date }))
            }
            disabled={filters.isDateInputDisabled}
          />
        </div>

        {/* 결제수단 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">결제수단</h3>
          <div className="flex gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, paymentMethod: method }))
                }
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  filters.paymentMethod === method
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* 결제/주문유형 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            결제/주문유형
          </h3>
          <div className="flex gap-2">
            {paymentTypes.map((type) => (
              <button
                key={type}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, paymentType: type }))
                }
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  filters.paymentType === type
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 확인 버튼 */}
      <div className="px-6 py-4 border-t">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-medium">
          확인
        </Button>
      </div>
    </div>
  );
}
