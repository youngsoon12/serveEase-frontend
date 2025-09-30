import { instance } from '@/lib/axios';
import { getStoreId } from './store';

export type Category = { id: number; name: string };

export async function getCategories(): Promise<Category[]> {
  const storeId = getStoreId();
  const { data } = await instance.get(`/stores/${storeId}/categories`);
  return data;
}

export async function postCategory(name: string): Promise<Category> {
  const storeId = getStoreId();
  const { data } = await instance.post(`/stores/${storeId}/categories`, {
    name,
  });
  return data;
}

export async function deleteCategory(categoryId: number): Promise<void> {
  const storeId = getStoreId();
  await instance.delete(`/stores/${storeId}/categories/${categoryId}`);
}
