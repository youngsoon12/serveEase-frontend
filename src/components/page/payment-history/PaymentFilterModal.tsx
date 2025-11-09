'use client';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { calculateDateRange } from '@/lib/paymentCalculatePeriod';
import DatePicker from './DatePicker';
import {
  FILTER_ORDER_TYPES,
  FILTER_PAYMENT_METHODS,
  FILTER_PERIODS,
  FilterOrderTypeType,
  FilterPaymentMethodType,
  FilterPeriodType,
  ORDER_TYPE_TO_API,
  PAYMENT_METHOD_TO_API,
  PERIOD_TO_API,
} from '@/constants/payment-filter';
import { format } from 'date-fns';
import { FilterValues } from '@/lib/schemas/payment-history';

interface FilterState {
  period: FilterPeriodType;
  paymentMethod: FilterPaymentMethodType;
  orderType: FilterOrderTypeType;
  startDate: Date | undefined;
  endDate: Date | undefined;
  isDateInputDisabled: boolean;
}

interface Props {
  onApply: (filters: FilterValues) => void;
}

export default function PaymentFilterModal({ onApply }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    period: FILTER_PERIODS.TODAY,
    paymentMethod: FILTER_PAYMENT_METHODS.CARD,
    orderType: FILTER_ORDER_TYPES.NORMAL,
    startDate: new Date(),
    endDate: new Date(),
    isDateInputDisabled: true,
  });

  const periods = Object.values(FILTER_PERIODS);
  const paymentMethods = Object.values(FILTER_PAYMENT_METHODS);
  const orderTypes = Object.values(FILTER_ORDER_TYPES);

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

  // UI 상태 → API 파라미터로 변환
  const handleApply = () => {
    const apiFilters: FilterValues = {
      range: PERIOD_TO_API[filters.period],
      paymentMethod: PAYMENT_METHOD_TO_API[filters.paymentMethod],
      orderType: ORDER_TYPE_TO_API[filters.orderType],
    };

    if (filters.period === FILTER_PERIODS.CUSTOM) {
      if (filters.startDate && filters.endDate) {
        apiFilters.range = 'CUSTOM';
        apiFilters.from = format(filters.startDate, 'yyyy-MM-dd');
        apiFilters.to = format(filters.endDate, 'yyyy-MM-dd');
      }
    } else {
      apiFilters.range = PERIOD_TO_API[filters.period];
    }

    onApply(apiFilters);
  };

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
            {orderTypes.map((type) => (
              <button
                key={type}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, orderType: type }))
                }
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  filters.orderType === type
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
        <Button
          onClick={handleApply}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-medium"
        >
          확인
        </Button>
      </div>
    </div>
  );
}
