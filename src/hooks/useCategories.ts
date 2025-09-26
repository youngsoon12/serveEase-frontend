import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
    onError: (message) => {
      toast.error(`${message} 카테고리 추가에 실패하였습니다.`);
    },
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['categories'] });
      toast.success('카테고리를 삭제했습니다.');
    },
    onError: () => {
      toast.error('카테고리 삭제에 실패했습니다.');
    },
  });
}
