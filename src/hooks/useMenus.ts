import { getMenus } from '@/app/api/menu';
import { MenuItem } from '@/types/menu';
import { useQuery } from '@tanstack/react-query';

export default function useMenus() {
  const query = useQuery<MenuItem[]>({
    queryKey: ['menus'],
    queryFn: getMenus,
    staleTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false,
  });

  return query;
}
