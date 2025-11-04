import { instance } from '@/lib/axios';
import {
  TablesResponse,
  TablesResponseSchema,
  OrderResponseSchema,
} from '@/lib/schemas';
import { validate } from '@/app/api/validate';

export const PAGE_SIZE = 12;

export async function getTables(
  page: number,
  size = PAGE_SIZE,
): Promise<TablesResponse> {
  const { data } = await instance.get(`/stores/@me/tables`, {
    params: { page, size },
  });

  return validate(data, TablesResponseSchema);
}

export async function updateTableCount(newTotalCount: number) {
  await instance.put(`/stores/@me/tables/bulk-update`, {
    newTotalCount,
  });
}

export async function updateTableState(orderId: number) {
  const { data } = await instance.patch(
    `/stores/@me/orders/${orderId}/serve`,
    {},
  );

  return validate(data, OrderResponseSchema);
}
