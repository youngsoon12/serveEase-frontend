// 매장 & 조회 기간 정보
export interface SalesCalendarContext {
  storeId: number;
  month: string; // "yyyy-MM"
  from: string; // ISO 날짜 (예: 2025-11-01)
  to: string; // ISO 날짜 (예: 2025-11-30)
}

// 일별 순매출
export interface DailySales {
  date: string; // "2025-11-01"
  netSales: number; // 순매출 금액
}

// 주별 순매출 집계
export interface WeeklySummary {
  weekNumber: number; // 월 기준 주차 (1,2,3...)
  isoWeek: number; // ISO 주차
  weekYear: number; // ISO 주차의 연도
  startDate: string; // 주 시작일
  endDate: string; // 주 종료일
  netSales: number; // 주간 순매출 합계
}

// 최종 응답 타입
export interface SalesCalendarResponse {
  context: SalesCalendarContext;
  dailySales: DailySales[];
  weeklySummaries: WeeklySummary[];
}
