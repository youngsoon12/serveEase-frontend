import { instance } from '@/lib/axios';

export type ProductsResponse = {
  id: number;
  name: string;
  price: number;
  category: string;
  available: boolean;
};

export async function getProducts(): Promise<ProductsResponse[]> {
  const { data } = await instance.get<ProductsResponse[]>('/menus');
  return data;
}
