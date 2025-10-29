import { instance } from '@/lib/axios';
import { TablesResponse } from '@/types/table';
import { OrderResponse } from '@/types/order';

export const PAGE_SIZE = 12;

export async function getTables(
  page: number,
  size = PAGE_SIZE,
): Promise<TablesResponse> {
  const { data } = await instance.get(`/stores/@me/tables`, {
    params: { page, size },
  });
  return data;
}

export async function updateTableCount(newTotalCount: number) {
  const { data } = await instance.put(`/stores/@me/tables/bulk-update`, {
    newTotalCount,
  });

  return data;
}

export async function updateTableState(
  orderId: number,
): Promise<OrderResponse> {
  const { data } = await instance.patch(
    `/stores/@me/orders/${orderId}/serve`,
    {},
  );

  return data;
}
