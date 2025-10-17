import { Period } from '@/types/sales';

interface Props {
  title: string;
  period: Period;
}

export default function SalesKPICard({ title, period }: Props) {
  return (
    <div className="flex flex-col gap-2 p-5 border rounded-md">
      <p className="font-semibold">{title}</p>
      <p className="text-xl">{period}</p>
    </div>
  );
}
