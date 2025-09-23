'use client';

import TableCard, { TableCardProps } from '@/components/TableCard';
import { getTables, PAGE_SIZE, TablesResponse } from '@/app/api/tables';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TablesPage() {
  // 현재 URL에서 페이지 번호 읽기
  const sp = useSearchParams();
  const page = Math.max(0, Number(sp.get('page') ?? 0));

  const router = useRouter();

  // 데이터 및 에러 상태
  const [data, setData] = useState<TablesResponse | null>(null);
  const [cards, setCards] = useState<TableCardProps[]>([]);
  const [noticeText, setNoticeText] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;

    getTables(page, PAGE_SIZE)
      .then((res) => {
        if (aborted) return;

        setData(res);
        setCards(
          res.content.map((item) => ({
            tableNumber: item.restaurantTableNumber,
            status:
              item.status === 'EMPTY'
                ? 'EMPTY'
                : item.status === 'SERVED'
                ? 'SERVED'
                : 'ORDERED',
            href: `/pos/tables/${item.restaurantTableNumber}`,
          })),
        );

        console.log('[API] tables raw:', res);
        console.log('[MAP] cards:', cards);
      })
      .catch((err) => {
        if (aborted) return;

        const title = err?.response?.data?.title as string | undefined;
        setNoticeText(title ?? '요청을 처리하지 못했습니다.');

        console.error(
          '[tables:error]',
          err?.response?.status,
          err?.response?.data,
        );
      });

    return () => {
      aborted = true;
    };
  }, [page]);

  const pageNumber = data?.number ?? page;
  const totalPages = data?.totalPages ?? 1;

  const isFirst = pageNumber <= 0;
  const isLast = pageNumber >= totalPages - 1;

  const showPager = (data?.totalPages ?? 0) > 1;

  const goPrev = () => {
    if (isFirst) return;
    router.push(`?page=${pageNumber - 1}`);
  };

  const goNext = () => {
    if (isLast) return;
    router.push(`?page=${pageNumber + 1}`);
  };

  return (
    <div className="mx-auto flex items-center justify-center h-full ">
      <h1 className="sr-only">테이블 목록</h1>

      {noticeText && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-md text-red-800">
          {noticeText}
        </div>
      )}

      {showPager && (
        <button
          className="rounded px-3 py-1 disabled:opacity-50 mr-8 cursor-pointer"
          onClick={goPrev}
          disabled={isFirst}
        >
          <ChevronLeft />
        </button>
      )}

      <ul
        className="h-[90%]
          grid          
          gap-x-6 gap-y-4        
          md:gap-x-8 md:gap-y-4  
          lg:gap-x-12 lg:gap-y-6 
          lg:grid-cols-4 
          md:grid-cols-3"
        role="list"
        aria-label="테이블 목록"
      >
        {cards.map((t) => (
          <li key={t.tableNumber} className="flex">
            <div className="w-full">
              <div className="aspect-[4/3]">
                <TableCard {...t} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {showPager && (
        <button
          className="rounded px-3 py-1 ml-8 disabled:opacity-50 cursor-pointer"
          onClick={goNext}
          disabled={isLast}
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
