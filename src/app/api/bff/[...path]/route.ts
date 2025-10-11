import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_BASE_API_URL!.replace(/\/$/, '');

function buildTargetUrl(pathSegments: string[], storeId?: string, search = '') {
  const raw = pathSegments.join('/');
  const resolved = raw.replace(
    /stores\/@me/gi,
    `stores/${storeId ?? 'unknown'}`,
  );
  return `${API}/${resolved}${search}`;
}

async function proxy(req: Request, ctx: { params: { path: string[] } }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const storeId = cookieStore.get('storeId')?.value;

  if (!token) {
    return NextResponse.json(
      { title: '인증정보가 유효하지 않습니다.' },
      { status: 401 },
    );
  }
  if (!storeId) {
    // 선택: storeId가 반드시 필요하다면 여기서도 방어
    return NextResponse.json(
      { title: '매장 정보가 없습니다.' },
      { status: 400 },
    );
  }

  const url = new URL(req.url);
  const targetUrl = buildTargetUrl(ctx.params.path, storeId, url.search);

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };
  const ct = req.headers.get('content-type');
  if (ct) headers['content-type'] = ct;

  const init: RequestInit = {
    method: req.method,
    headers,
    cache: 'no-store',
  };

  if (!['GET', 'HEAD'].includes(req.method)) {
    init.body = await req.text();
  }

  const upstream = await fetch(targetUrl, init);

  const buf = await upstream.arrayBuffer();
  return new NextResponse(buf, {
    status: upstream.status,
    headers: {
      'content-type':
        upstream.headers.get('content-type') ?? 'application/json',
    },
  });
}

export {
  proxy as GET,
  proxy as POST,
  proxy as PUT,
  proxy as PATCH,
  proxy as DELETE,
};
