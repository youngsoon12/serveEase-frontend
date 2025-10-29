import { Period } from '@/types/sales';

export default function salesCalculateDate(period: Period) {
  const today = new Date();
  const to = today.toISOString().split('T')[0]; // 2025-10-29

  let from: string;

  if (period === 'day') {
    from = to;
  } else if (period === 'week') {
    const weekAgo = new Date(today);

    weekAgo.setDate(today.getDate() - 6);
    from = weekAgo.toISOString().split('T')[0]; // 2025-10-23
  } else {
    const monthAgo = new Date(today);

    monthAgo.setMonth(today.getMonth() - 1);
    from = monthAgo.toISOString().split('T')[0]; // 2025-09-29
  }

  return { to, from };
}
