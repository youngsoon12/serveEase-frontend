import { instance } from '@/lib/axios';
import { getStoreId } from './store';

export type TablesResponse = {
  content: {
    id: number;
    restaurantTableNumber: number;
    displayStatus: string;
    activeOrder?: {
      orderId: number;
      totalPrice: number;
      orderItems: {
        menuName: string;
        quantity: number;
        price: number;
      }[];
    } | null;
  }[];
  number: number;
  totalPages: number;
  totalElements: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type UpdateTablesRequest = {
  newTotalCount: number;
};

export const PAGE_SIZE = 12;

const storeId = getStoreId();

export async function getTables(
  page: number,
  size = PAGE_SIZE,
): Promise<TablesResponse> {
  const { data } = await instance.get(`/stores/${storeId}/tables`, {
    params: { page, size },
  });
  return data;
}

export async function updateTables(newTotalCount: number) {
  const { data } = await instance.put(`/stores/${storeId}/tables/bulk-update`, {
    newTotalCount,
  });

  return data;
}
