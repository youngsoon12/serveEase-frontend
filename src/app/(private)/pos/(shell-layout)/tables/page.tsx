'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import TableCard from '@/components/TableCard';
import { useTables } from '@/hooks/useTables';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { tableKeys } from '@/lib/queries/keys';
import { getTables, PAGE_SIZE } from '@/app/api/tables';

export default function TablesPage() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const sp = useSearchParams();
  const page = Math.max(0, Number(sp.get('page') ?? 0));

  const { data, cards, noticeText } = useTables(page);

  // 페이지네이션
  const pageNumber = data?.number ?? page;
  const isFirst = data?.first ?? true;
  const isLast = data?.last ?? true;
  const showPager = (data?.totalPages ?? 0) > 1;

  const goPrev = () => {
    if (isFirst) return;
    router.push(`?page=${pageNumber - 1}`);
  };

  const goNext = () => {
    if (isLast) return;
    router.push(`?page=${pageNumber + 1}`);
  };

  // 다음 페이지 프리패치
  useEffect(() => {
    if (data && !isLast) {
      queryClient.prefetchQuery({
        queryKey: tableKeys.list(page + 1),
        queryFn: () => getTables(page + 1, PAGE_SIZE),
        staleTime: 60_000,
      });
    }
  }, [page, isLast, data]);

  return (
    <div className="mx-auto flex items-center justify-center h-full ">
      <h1 className="sr-only">테이블 목록</h1>

      {noticeText && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-md text-red-800">
          {noticeText}
        </div>
      )}

      {data?.empty && (
        <div className="text-lg text-muted-foreground my-4">
          등록된 테이블이 없습니다.
        </div>
      )}

      {showPager && (
        <button
          type="button"
          aria-label="이전 페이지"
          className="rounded px-3 py-1 disabled:opacity-50 mr-8 cursor-pointer disabled:cursor-not-allowed"
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
          type="button"
          aria-label="다음 페이지"
          className="rounded px-3 py-1 ml-8 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          onClick={goNext}
          disabled={isLast}
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
