import { instance } from '@/lib/axios';

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
  const { data } = await instance.post(`/stores/@me/menus`, product);
  return data;
}

export async function deleteProduct(menuId: number) {
  const { data } = await instance.delete(`/stores/@me/menus/${menuId}`);
}

export async function putProduct(
  menuId: number,
  product: CreateProductInput,
): Promise<ProductsResponse> {
  const { data } = await instance.put(`/stores/@me/menus/${menuId}`, product);
  return data;
}
