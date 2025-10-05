import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // 토스페이먼츠 실패 정보
  const errorCode = searchParams.get('code');
  const errorMessage = searchParams.get('message');
  const orderId = searchParams.get('orderId');

  // 리다이렉트 tableId
  const tableId = searchParams.get('tableId');

  const targetPage = `/pos/tables/${tableId}/orders`;

  const targetSearchParams = new URLSearchParams({
    orderId: orderId || '',

    paymentFailed: 'true',
    code: errorCode || 'UNKNOWN_ERROR',
    message: errorMessage || '결제 중 알 수 없는 오류 발생',
  });

  const redirectUrl = new URL(
    `${targetPage}?${targetSearchParams}`,
    request.url,
  );

  return NextResponse.redirect(redirectUrl);
}
