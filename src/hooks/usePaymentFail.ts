'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function usePaymentFail() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // 에러 토스트 중복 방지 플래그
  const shownRef = useRef(false);

  const paymentFailed = params.get('paymentFailed');
  const errorCode = params.get('code');
  const errorMessage = params.get('message');

  useEffect(() => {
    // 1. 이미 알림을 띄웠거나, 실패 파라미터가 없으면 즉시 종료
    if (shownRef.current) return;
    if (paymentFailed !== 'true') return;

    // 2. 에러 토스트 플래그 설정(중복 방지)
    shownRef.current = true;

    // 3. 에러 토스트 띄우기
    toast.error(
      `결제 실패: ${errorCode ?? 'UNKNOWN_ERROR'}, 메시지: ${
        errorMessage ?? '결제 중 오류가 발생했어요.'
      }`,
    );

    console.error(
      `결제 실패: ${errorCode ?? 'UNKNOWN_ERROR'}, 메시지: ${errorMessage}`,
    );

    // 4. URL 쿼리 파라미터 정리 - replace를 위해 실패 관련 키 삭제
    const newParams = new URLSearchParams(params.toString());
    newParams.delete('paymentFailed');
    newParams.delete('code');
    newParams.delete('message');

    // 5. replace로 페이지 이동 없이 URL만 교체
    router.replace(`${pathname}?${newParams.toString()}`);
  }, [paymentFailed, errorCode, errorMessage, router, pathname, params]);
}
