import { Period } from '@/types/sales';
import { mockData } from '@/lib/mock/salesData';

interface Props {
  title: string;
  period: Period;
}

export default function SalesKPICard({ title, period }: Props) {
  const value = mockData[title as keyof typeof mockData]?.[period] || 0;

  return (
    <div className="flex flex-col gap-2 p-5 border rounded-md bg-white">
      <p className="text-gray-600">{title}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
        <span className="text-gray-500">원</span>
      </div>
    </div>
  );
}
