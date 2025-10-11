import { instance } from '@/lib/axios';
import { getStoreId } from './store';
import { MenuItem } from '@/types/menu';

export async function getMenus(): Promise<MenuItem[]> {
  const { data } = await instance.get<MenuItem[]>(`/stores/@me/menus`);
  return data;
}
