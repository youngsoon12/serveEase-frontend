import axios from 'axios';
import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_BASE_API_URL!.replace(/\/$/, '');

export async function POST(req: Request) {
  const body = await req.json();

  const { data, status } = await axios.post(`${API}/user/login`, body, {
    validateStatus: () => true,
  });

  if (status >= 400) {
    return NextResponse.json(data, { status });
  }

  const res = NextResponse.json({
    ok: true,
    stores: data.stores ?? [],
  });

  res.cookies.set('accessToken', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일
  });

  if (Array.isArray(data.stores) && data.stores?.length > 0) {
    const storeId = String(data.stores[0].storeId);
    const storeName = data.stores[0].storeName ?? '';

    res.cookies.set('storeId', storeId, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    res.cookies.set('storeName', storeName, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return res;
}
