'use client';

import { Button } from '@/components/ui/button';
import { CalendarIcon, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import PaymentFilterModal from './PaymentFilterModal';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  getRangeLabel,
  getPaymentMethodLabel,
  getOrderTypeLabel,
} from '@/constants/payment-filter';
import { FilterValues } from '@/lib/schemas/payment-history';
import { useState } from 'react';

interface Props {
  date: Date;
  onDateChange: (date: Date) => void;
  onFilterApply: (filters: FilterValues) => void;
  appliedFilters: FilterValues;
}

export default function FilterSection({
  date,
  onDateChange,
  onFilterApply,
  appliedFilters,
}: Props) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const hasFilters = Object.keys(appliedFilters).length > 0;

  const handleClearFilters = () => {
    onFilterApply({});
  };

  return (
    <div className="space-y-3">
      <Popover open={open} onOpenChange={setOpen}>
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
            onSelect={(selectedDate) => {
              if (selectedDate) {
                onDateChange(selectedDate);

                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>

      {/* 상세 조회 및 필터링 조건 UI */}
      <div className="flex items-center gap-2">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Search className="mr-1 h-3 w-3" />
              상세조회
            </Button>
          </DialogTrigger>
          <DialogContent>
            <PaymentFilterModal
              onApply={(filters) => {
                onFilterApply(filters);
                setDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* 필터 초기화 */}
        {hasFilters && (
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-muted-foreground hover:bg-muted ml-auto"
            onClick={handleClearFilters}
          >
            필터 초기화
            <X className=" h-3 w-3" />
          </Button>
        )}
      </div>

      {/* 적용된 필터 조건들 */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {appliedFilters.range && (
            <Badge variant="outline" className="text-xs rounded-full px-3 py-1">
              <CalendarIcon className="mr-1" />
              {appliedFilters.range === 'CUSTOM'
                ? `${appliedFilters.from} ~ ${appliedFilters.to?.slice(5)}`
                : getRangeLabel(appliedFilters.range)}
            </Badge>
          )}
          {appliedFilters.paymentMethod && (
            <Badge variant="outline" className="text-xs rounded-full px-3 py-1">
              {getPaymentMethodLabel(appliedFilters.paymentMethod)}
            </Badge>
          )}
          {appliedFilters.orderType && (
            <Badge variant="outline" className="text-xs rounded-full px-3 py-1">
              {getOrderTypeLabel(appliedFilters.orderType)}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
