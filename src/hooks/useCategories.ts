import { Category, getCategories } from '@/app/api/pos';
import { useQuery } from '@tanstack/react-query';

export default function useCategories() {
  const query = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 60 * 5 * 1000,
  });
  return query;
}
