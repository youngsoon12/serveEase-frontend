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
  const { data } = await instance.get<ProductsResponse[]>('/menus');
  return data;
}

export async function postProduct(
  product: CreateProductInput,
): Promise<ProductsResponse> {
  const { data } = await instance.post('/menus', product);
  return data;
}

export async function deleteProduct(productId: number) {
  const { data } = await instance.delete(`/menus/${productId}`);
}
