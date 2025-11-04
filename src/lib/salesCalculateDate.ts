import { Period } from './schemas';

export default function salesCalculateDate(period: Period) {
  const today = new Date();
  const to = today.toISOString().split('T')[0];

  let from: string;

  if (period === 'day') {
    const dayPeriod = new Date(today);

    dayPeriod.setDate(today.getDate() - 6);
    from = dayPeriod.toISOString().split('T')[0];
  } else if (period === 'week') {
    const weekPeriod = new Date(today);

    weekPeriod.setDate(today.getDate() - 42);
    from = weekPeriod.toISOString().split('T')[0];
  } else {
    const monthPeriod = new Date(today);

    monthPeriod.setMonth(today.getMonth() - 6);
    from = monthPeriod.toISOString().split('T')[0];
  }

  return { to, from };
}
