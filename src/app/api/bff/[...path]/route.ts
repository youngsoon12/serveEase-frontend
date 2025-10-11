import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, '') ?? '';

// @me를 storeId로 치환
function buildTargetUrl(pathSegments: string[], storeId?: string, search = '') {
  const joined = pathSegments.join('/'); // e.g. "stores/@me/menus"
  const resolved = joined.replace(
    /stores\/@me/gi,
    `stores/${storeId ?? 'unknown'}`,
  );
  return `${API}/${resolved}${search}`;
}

export async function proxy(req: Request, ctx: { params: { path: string[] } }) {
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
    return NextResponse.json(
      { title: '매장 정보가 없습니다.' },
      { status: 400 },
    );
  }

  const url = new URL(req.url);
  const { path } = await ctx.params;

  const targetUrl = buildTargetUrl(path, storeId, url.search);
  //   console.log('Target URL : ', targetUrl); // 디버깅용 URL

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  const contentType = req.headers.get('content-type');
  if (contentType) headers['content-type'] = contentType;

  const init: RequestInit = {
    method: req.method,
    headers,
    cache: 'no-store',
  };

  if (!['GET', 'HEAD'].includes(req.method)) {
    init.body = await req.text();
  }

  const upstream = await fetch(targetUrl, init);

  if (upstream.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

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
