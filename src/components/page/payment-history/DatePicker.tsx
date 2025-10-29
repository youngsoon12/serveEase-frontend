import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Props {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  disabled: boolean;
}

export default function DatePicker({ date, onSelect, disabled }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'flex-1 justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'yyyy.MM.dd', { locale: ko }) : '날짜 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          locale={ko}
        />
      </PopoverContent>
    </Popover>
  );
}
