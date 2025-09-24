import { getProducts, type ProductsResponse } from '@/app/api/products';
import { useQuery } from '@tanstack/react-query';

export default function useProducts() {
  const query = useQuery<ProductsResponse[]>({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60,
  });

  const rows =
    query.data?.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      available: p.available ? '판매중' : '품절',
      href: `/pos/products/${p.id}/edit`,
    })) ?? [];

  return {
    data: query.data,
    rows,
    isLoading: query.isLoading,
    error: query.error,
    noticeText: query.error ? '요청을 처리하지 못했습니다.' : null,
  };
}
