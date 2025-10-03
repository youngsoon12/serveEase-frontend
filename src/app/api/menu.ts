import { instance } from '@/lib/axios';
import { getStoreId } from './store';
import { MenuItem } from '@/types/menu';

export async function getMenus(): Promise<MenuItem[]> {
  const storeId = getStoreId();

  const { data } = await instance.get<MenuItem[]>(`/stores/${storeId}/menus`);
  return data;
}
