'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DateRangePicker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 날짜 포맷팅 (2025. 7. 1(금)
  const formattedDate = format(selectedDate, 'yyyy. M. d(EEE)', { locale: ko });

  // 이전 날짜
  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);

    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  // 다음 날짜
  const handleNextDay = () => {
    const newDate = new Date(selectedDate);

    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">기간선택</span>

      {/* 이전 버튼 */}
      <Button variant="ghost" className="h-8 w-8" onClick={handlePrevDay}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* 날짜 선택 Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-9 w-48">
            {formattedDate}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(newDate) => {
              if (newDate) setSelectedDate(newDate);
            }}
            locale={ko}
          />
        </PopoverContent>
      </Popover>

      {/* 다음 버튼 */}
      <Button variant="ghost" className="h-8 w-8" onClick={handleNextDay}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
