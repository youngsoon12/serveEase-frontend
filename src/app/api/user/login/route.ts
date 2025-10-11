import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const APIURL = process.env.NEXT_PUBLIC_BASE_API_URL!.replace(/\/$/, '');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 백엔드 로그인 호출
    const { data, status } = await axios.post(`${APIURL}/user/login`, body, {
      validateStatus: () => true,
    });

    if (status >= 400) {
      return NextResponse.json(data, { status });
    }

    const token: string = data.token;

    // 클라이언트에는 토큰을 주지 않고, 필요한 프로필만 내려줌
    const res = NextResponse.json({
      userId: data.userId,
      username: data.username,
      stores: data.stores ?? [],
    });

    // HttpOnly 쿠키로 저장
    res.cookies.set('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 로컬개발은 false
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return res;
  } catch {
    return NextResponse.json({ title: '로그인 요청 실패' }, { status: 500 });
  }
}
