import { Period } from '@/types/sales';

interface Props {
  title: string;
  period: Period;
}

export default function SalesKPICard({ title, period }: Props) {
  return (
    <div className="p-4 border rounded">
      <p className="text-sm">{title}</p>
      <p className="text-xl">123,456원</p>
      <p className="text-xs text-gray-500">현재 기간: {period}</p>
    </div>
  );
}
