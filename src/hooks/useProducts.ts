import {
  getProducts,
  postProduct,
  ProductsResponse,
  CreateProductInput,
} from '@/app/api/products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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

export function useCreateProduct() {
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (product: CreateProductInput) => postProduct(product),
    onSuccess: (created) => {
      qc.setQueryData<ProductsResponse[]>(['products'], (prev) =>
        prev ? [created, ...prev] : [created],
      );
      toast.success('상품이 추가되었습니다.');
      router.back();
    },

    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했어요.';
      toast.error(`상품 추가에 실패했습니다. ${msg}`);
    },
  });
}
