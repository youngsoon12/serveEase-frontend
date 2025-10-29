// SalesKPICard
export const mockData = {
  실매출: {
    day: 1234567,
    week: 8500000,
    month: 35000000,
  },
  '주문건당 평균가': {
    day: 25000,
    week: 27000,
    month: 26500,
  },
  '취소 금액': {
    day: 50000,
    week: 350000,
    month: 1200000,
  },
};

// SalesChart
export const mockChartData = {
  day: [
    { date: '16일(금)', sales: 80000 },
    { date: '17일(토)', sales: 0 },
    { date: '18일(일)', sales: 0 },
    { date: '19일(월)', sales: 120000 },
    { date: '20일(화)', sales: 120000 },
    { date: '21일(수)', sales: 120000 },
    { date: '22일(목)', sales: 120000 },
  ],
  week: [
    { date: '1주차', sales: 850000 },
    { date: '2주차', sales: 920000 },
    { date: '3주차', sales: 1100000 },
    { date: '4주차', sales: 980000 },
  ],
  month: [
    { date: '7월', sales: 3200000 },
    { date: '8월', sales: 3500000 },
    { date: '9월', sales: 3800000 },
    { date: '10월', sales: 3500000 },
  ],
};
