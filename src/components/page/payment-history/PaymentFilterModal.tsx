'use client';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export default function PaymentFilterModal() {
  const [selectedPeriod, setSelectedPeriod] = useState('오늘');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('카드');
  const [selectedPaymentType, setSelectedPaymentType] = useState('취소결제');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isDateInputDisabled, setIsDateInputDisabled] = useState(true);

  const periods = ['오늘', '일주일', '1개월', '직접설정'];
  const paymentMethods = ['카드', '현금'];
  const paymentTypes = ['취소결제', '분할결제', '정상결제'];

  // 기간 선택에 따라 날짜 설정
  useEffect(() => {
    const today = new Date();

    switch (selectedPeriod) {
      case '오늘':
        setStartDate(today);
        setEndDate(today);
        setIsDateInputDisabled(true);
        break;
      case '일주일':
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        setStartDate(weekAgo);
        setEndDate(today);
        setIsDateInputDisabled(true);
        break;
      case '1개월':
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        setStartDate(monthAgo);
        setEndDate(today);
        setIsDateInputDisabled(true);
        break;
      case '직접설정':
        setIsDateInputDisabled(false);
        break;
      default:
        break;
    }
  }, [selectedPeriod]);

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
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors rounded-lg ${
                selectedPeriod === period
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={isDateInputDisabled}
                className={cn(
                  'flex-1 justify-start text-left font-normal',
                  !startDate && 'text-muted-foreground',
                  isDateInputDisabled &&
                    'bg-gray-50 text-gray-500 cursor-not-allowed',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate
                  ? format(startDate, 'yyyy.MM.dd', { locale: ko })
                  : '날짜 선택'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-1" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                locale={ko}
              />
            </PopoverContent>
          </Popover>

          <span className="text-muted-foreground">~</span>

          {/* 종료 날짜 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={isDateInputDisabled}
                className={cn(
                  'flex-1 justify-start text-left font-normal',
                  !endDate && 'text-muted-foreground',
                  isDateInputDisabled &&
                    'bg-gray-50 text-gray-500 cursor-not-allowed',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate
                  ? format(endDate, 'yyyy.MM.dd', { locale: ko })
                  : '날짜 선택'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                locale={ko}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* 결제수단 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">결제수단</h3>
          <div className="flex gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method}
                onClick={() => setSelectedPaymentMethod(method)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedPaymentMethod === method
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
                onClick={() => setSelectedPaymentType(type)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedPaymentType === type
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
