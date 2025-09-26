import { instance } from '@/lib/axios';

export type Category = {
  id: number;
  name: string;
};

export async function getCategories(): Promise<Category[]> {
  const { data } = await instance.get<Category[]>('/categories');
  return data;
}
