'use client';

import { useState } from 'react';
import { CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import PaymentFilterModal from './PaymentFilterModal';

export default function FilterSection() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="space-y-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(date, 'yyyy-MM-dd(EEE)', { locale: ko })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
          />
        </PopoverContent>
      </Popover>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">
            <Search className="mr-1 h-3 w-3" />
            상세조회
          </Button>
        </DialogTrigger>
        <DialogContent>
          <PaymentFilterModal />
        </DialogContent>
      </Dialog>
    </div>
  );
}
