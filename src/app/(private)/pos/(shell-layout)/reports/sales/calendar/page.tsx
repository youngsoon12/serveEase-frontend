import SalesCalendar from './SalesCalendar';

export default function Page() {
  const sales = {
    '2025-10-02': 120000,
    '2025-10-07': 345000,
    '2025-10-13': 98000,
    '2025-10-21': 87000,
  };
  return (
    <div className="p-6">
      <SalesCalendar sales={sales} />
    </div>
  );
}
