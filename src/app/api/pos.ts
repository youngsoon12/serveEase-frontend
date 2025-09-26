import { instance } from '@/lib/axios';

export type CategoriesResponse = {
  id: number;
  name: string;
};

export async function getCategories(): Promise<CategoriesResponse[]> {
  const { data } = await instance.get('/categories');
  return data;
}
