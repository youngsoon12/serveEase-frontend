'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Period } from '@/types/sales';

interface Props {
  period: Period;
  seriesData: Array<{
    date: string;
    month: {
      year: number;
      month: string;
      monthValue: number;
      leapYear: boolean;
    };
    week: number;
    netSales: number;
    orderCount: number;
    averageOrderValue: number;
    canceledAmount: number;
  }>;
}

const chartConfig = {
  sales: {
    label: '매출',
    color: '#3b82f6',
  },
};

export default function SalesChart({ period, seriesData }: Props) {
  const chartData = seriesData.map((item) => {
    let xAxisLabel: string;

    if (period === 'day') {
      xAxisLabel = item.date.slice(5).replace('-', '/');
    } else if (period === 'week') {
      xAxisLabel = `${item.week}주차`;
    } else {
      xAxisLabel = `${item.month.monthValue}월`;
    }

    return {
      label: xAxisLabel,
      sales: item.netSales,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="sr-only">매출 현황 차트</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[clamp(240px,40vh,420px)] w-full"
        >
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="sales"
              fill="var(--color-sales)"
              radius={[4, 4, 0, 0]}
              maxBarSize={52}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
