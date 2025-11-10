'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';

interface Props {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function DateRangePicker({ selectedDate, onDateChange }: Props) {
  const date = new Date(selectedDate);
  const [open, setOpen] = useState(false);

  const formattedDate = format(date, 'yyyy. M. d(EEE)', { locale: ko });

  const handlePrevDay = () => {
    const prevDate = new Date(selectedDate);

    prevDate.setDate(prevDate.getDate() - 1);
    onDateChange(format(prevDate, 'yyyy-MM-dd'));
  };

  const handleNextDay = () => {
    const nextDate = new Date(selectedDate);

    nextDate.setDate(nextDate.getDate() + 1);
    onDateChange(format(nextDate, 'yyyy-MM-dd'));
  };

  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">기간선택</span>

      {/* 이전 버튼 */}
      <Button variant="ghost" className="h-8 w-8" onClick={handlePrevDay}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* 날짜 선택 Popover */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-9 w-48">
            {formattedDate}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                onDateChange(format(newDate, 'yyyy-MM-dd'));

                setOpen(false);
              }
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
