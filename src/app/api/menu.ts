import { instance } from '@/lib/axios';
import { getStoreId } from './store';

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  available: boolean;
};

export async function getMenus(): Promise<MenuItem[]> {
  const storeId = getStoreId();

  const { data } = await instance.get<MenuItem[]>(`/stores/${storeId}/menus`);
  return data;
}
