import { useQuery } from '@tanstack/react-query';
import { getCategories, Category } from '@/app/api/categories';

export default function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 60_000,
  });
}
