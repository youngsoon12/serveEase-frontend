'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import SalesChartSkeleton from './SalesChartSkeleton';
import { Period, SalesSeriesData } from '@/lib/schemas';
import { getWeekOfMonth } from 'date-fns';

interface Props {
  period: Period;
  seriesData: SalesSeriesData[];
  isLoading?: boolean;
}

const chartConfig = {
  sales: {
    label: '매출',
    color: '#3b82f6',
  },
};

export default function SalesChart({ period, seriesData, isLoading }: Props) {
  console.log(seriesData);
  const chartData = seriesData.map((item) => {
    let xAxisLabel: string;

    if (period === 'day') {
      xAxisLabel = item.date.slice(5).replace('-', '/');
    } else if (period === 'week') {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const weekOfMonth = getWeekOfMonth(date);

      xAxisLabel = `${month}월 ${weekOfMonth}주차`;
    } else {
      xAxisLabel = `${item.monthValue}월`;
    }

    return {
      label: xAxisLabel,
      sales: item.netSales,
    };
  });

  if (isLoading) {
    return <SalesChartSkeleton />;
  }

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
              minPointSize={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
