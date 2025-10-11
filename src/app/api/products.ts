import { instance } from '@/lib/axios';
import { getStoreId } from './store';

export type ProductsResponse = {
  id: number;
  name: string;
  price: number;
  category: string;
  available: boolean;
};

export type CreateProductInput = {
  name: string;
  price: number;
  categoryId: number | null;
  available: boolean;
};

export async function getProducts(): Promise<ProductsResponse[]> {
  const { data } = await instance.get<ProductsResponse[]>(`/stores/@me/menus`);
  return data;
}

export async function postProduct(
  product: CreateProductInput,
): Promise<ProductsResponse> {
  const storeId = getStoreId();
  const { data } = await instance.post(`/stores/${storeId}/menus`, product);
  return data;
}

export async function deleteProduct(menuId: number) {
  const storeId = getStoreId();
  const { data } = await instance.delete(`/stores/${storeId}/menus/${menuId}`);
}

export async function putProduct(
  menuId: number,
  product: CreateProductInput,
): Promise<ProductsResponse> {
  const storeId = getStoreId();
  const { data } = await instance.put(
    `/stores/${storeId}/menus/${menuId}`,
    product,
  );
  return data;
}
