import { instance } from '@/lib/axios';

export type Category = { id: number; name: string };

export async function getCategories(): Promise<Category[]> {
  const { data } = await instance.get('/categories');
  return data;
}

// 카테고리 생성
export async function postCategory(name: string): Promise<Category> {
  const { data } = await instance.post('/categories', { name });
  return data;
}
