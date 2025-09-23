import { getTables, PAGE_SIZE, TablesResponse } from '@/app/api/tables';
import { TableCardProps } from '@/components/TableCard';
import { useEffect, useState } from 'react';

export default function useTables(page: number) {
  const [data, setData] = useState<TablesResponse | null>(null);
  const [cards, setCards] = useState<TableCardProps[]>([]);
  const [noticeText, setNoticeText] = useState<string | null>(null);

  useEffect(() => {
    getTables(page, PAGE_SIZE)
      .then((res) => {
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
        const title = err?.response?.data?.title as string | undefined;
        setNoticeText(title ?? '요청을 처리하지 못했습니다.');

        console.error(
          '[tables:error]',
          err?.response?.status,
          err?.response?.data,
        );
      });
  }, [page]);

  return { data, cards, noticeText };
}
