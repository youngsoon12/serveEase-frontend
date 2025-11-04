import { z } from 'zod';

/**
 * Zod 스키마로 데이터를 검증하는 함수
 * @param data - 검증할 데이터(API 응답)
 * @param schema - Zod 스키마
 * @returns 검증된 데이터 (타입 안전)
 */

export function validate<T>(data: unknown, schema: z.ZodSchema<T>): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    // 개발 환경에서만 상세 로그
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ 데이터 검증 실패: ', data);
      console.error('Zod 검증 실패:', result.error.issues);
    }

    throw new Error('데이터 형식이 올바르지 않습니다.');
  }

  return result.data;
}
