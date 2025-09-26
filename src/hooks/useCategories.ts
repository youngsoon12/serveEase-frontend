import { CategoriesResponse, getCategories } from '@/app/api/pos';
import { useQuery } from '@tanstack/react-query';

export default function useCategories() {
  const query = useQuery<CategoriesResponse[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 5 * 50 * 1000,
  });
  return query;
}
