'use client';

import { Period } from '@/types/sales';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { mockChartData } from '@/lib/mock/salesData';

interface Props {
  period: Period;
}

const chartConfig = {
  sales: {
    label: '매출',
    color: '#3b82f6',
  },
};

export default function SalesChart({ period }: Props) {
  const data = mockChartData[period];

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
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
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
