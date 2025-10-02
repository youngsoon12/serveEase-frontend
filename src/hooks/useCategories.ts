import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import {
  getCategories,
  postCategory,
  deleteCategory,
  Category,
} from '@/app/api/categories';

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useCreateCategory() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCategory,
    onSuccess: (created) => {
      queryClient.setQueryData<Category[]>(['categories'], (prev) =>
        prev ? [...prev, created] : [created],
      );
      toast.success('카테고리 추가에 성공하였습니다.');
      router.back();
    },
    onError: (err) => {
      const axiosErr = err as AxiosError<{ title?: string; detail?: string }>;
      if (axiosErr.response) {
        const data = axiosErr.response.data;
        toast.error(data?.title ?? '카테고리 추가 실패');
      } else {
        toast.error('네트워크 오류가 발생했습니다.');
      }
    },
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['categories'] });
      toast.success('카테고리를 삭제 했습니다.');
    },
    onError: (err) => {
      const axiosErr = err as AxiosError<{ title?: string; detail?: string }>;
      if (axiosErr.response) {
        const data = axiosErr.response.data;
        toast.error(data?.title ?? '카테고리 삭제 실패');
      } else {
        toast.error('네트워크 오류가 발생했습니다.');
      }
    },
  });
}
