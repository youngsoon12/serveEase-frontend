import { instance } from '@/lib/axios';

export type Category = { id: number; name: string };

export async function getCategories(): Promise<Category[]> {
  const { data } = await instance.get(`/stores/@me/categories`);
  return data;
}

export async function postCategory(name: string): Promise<Category> {
  const { data } = await instance.post(`/stores/@me/categories`, {
    name,
  });
  return data;
}

export async function deleteCategory(categoryId: number): Promise<void> {
  await instance.delete(`/stores/@me/categories/${categoryId}`);
}
