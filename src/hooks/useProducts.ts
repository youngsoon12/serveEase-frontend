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
import { isAxiosError, AxiosError } from 'axios';
import { toast } from 'sonner';

type FieldError = { field: string; message: string };
type ValidationError = { title?: string; errors?: FieldError[] };
const PRODUCT_ORDER = ['name', 'price', 'categoryId', 'available'] as const;

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
    onError: (err) => {
      if (isAxiosError<ValidationError>(err) && err.response) {
        const data = err.response.data;
        const errors = data?.errors ?? [];
        const first =
          PRODUCT_ORDER.map((f) => errors.find((e) => e.field === f)).find(
            (e): e is FieldError => !!e,
          ) || errors[0];

        const msg = first?.message || data?.title || '상품 추가 실패';
        toast.error(msg);

        if (first?.field) {
          const $el = document.querySelector<HTMLElement>(
            `[name="${first.field}"], [data-field="${first.field}"]`,
          );
          $el?.focus();
          $el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        toast.error('네트워크 오류가 발생했습니다.');
      }
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
    onError: (err) => {
      if (isAxiosError<ValidationError>(err) && err.response) {
        const data = err.response.data;
        const errors = data?.errors ?? [];
        const first =
          PRODUCT_ORDER.map((f) => errors.find((e) => e.field === f)).find(
            (e): e is FieldError => !!e,
          ) || errors[0];

        const msg = first?.message || data?.title || '상품 수정 실패';
        toast.error(msg);

        if (first?.field) {
          const $el = document.querySelector<HTMLElement>(
            `[name="${first.field}"], [data-field="${first.field}"]`,
          );
          $el?.focus();
          $el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        toast.error('네트워크 오류가 발생했습니다.');
      }
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
    onError: (err) => {
      if (isAxiosError<ValidationError>(err) && err.response) {
        const data = err.response.data;
        toast.error(data?.title ?? '상품 삭제 실패');
      } else {
        toast.error('네트워크 오류가 발생했습니다.');
      }
    },
  });
}
