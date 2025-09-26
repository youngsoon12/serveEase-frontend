import { instance } from '@/lib/axios';

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  available: boolean;
};

export async function getMenus(): Promise<MenuItem[]> {
  const { data } = await instance.get<MenuItem[]>('/menus');
  return data;
}
