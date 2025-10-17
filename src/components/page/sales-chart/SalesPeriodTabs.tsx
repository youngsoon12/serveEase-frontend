import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isPeriod, Period } from '@/types/sales';

interface Props {
  value: Period;
  onChange: (value: Period) => void;
}

export default function SalesPeriodTabs({ value, onChange }: Props) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => {
        if (isPeriod(v)) onChange(v);
      }}
    >
      <TabsList className="grid grid-cols-3 rounded-full border border-input p-0.1 h-10 ">
        <TabsTrigger
          value="day"
          className="rounded-full px-4 py-1.5   font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          일간
        </TabsTrigger>
        <TabsTrigger
          value="week"
          className="rounded-full px-4 py-1.5 font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          주간
        </TabsTrigger>
        <TabsTrigger
          value="month"
          className="rounded-full px-4 py-1.5 font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          월간
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
