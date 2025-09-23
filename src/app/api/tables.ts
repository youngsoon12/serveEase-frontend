import { instance } from '@/lib/axios';

export type TablesResponse = {
  content: {
    id: number;
    restaurantTableNumber: number;
    status: string;
  }[];
  number: number;
  totalPages: number;
  totalElements: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export const PAGE_SIZE = 12;

export async function getTables(
  page: number,
  size = PAGE_SIZE,
): Promise<TablesResponse> {
  const { data } = await instance.get('/tables', {
    params: { page, size },
  });
  return data;
}
