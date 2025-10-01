import {
  getProducts,
  postProduct,
  ProductsResponse,
  CreateProductInput,
  putProduct,
  deleteProduct,
} from '@/app/api/products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useProducts() {
  const query = useQuery<ProductsResponse[]>({
    queryKey: ['products'],
    queryFn: () => getProducts(),
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

export function useUpdateProduct() {
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; product: CreateProductInput }) =>
      putProduct(params.id, params.product),
    onSuccess: (updated) => {
      qc.setQueryData<ProductsResponse[]>(['products'], (prev) =>
        prev ? prev.map((p) => (p.id === updated.id ? updated : p)) : prev,
      );
      toast.success('상품이 수정되었습니다.');
      router.back();
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했어요.';
      toast.error(`상품 수정에 실패했습니다. ${msg}`);
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
      toast.success('상품을 삭제했습니다.');
    },
    onError: () => {
      toast.error('상품 삭제에 실패했습니다.');
    },
  });
}
