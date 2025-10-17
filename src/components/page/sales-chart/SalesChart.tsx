import { Period } from '@/types/sales';

interface Props {
  period: Period;
}

export default function SalesChart({ period }: Props) {
  return (
    <div className="p-6 border rounded">
      <p>차트 영역 (현재: {period})</p>
    </div>
  );
}
