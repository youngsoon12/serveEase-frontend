import { getMenus } from '@/app/api/menu';
import { useQuery } from '@tanstack/react-query';
import { MenuItem } from '@/lib/schemas/menu';
import { menuKeys } from '@/lib/queries/keys';

export default function useMenus() {
  const query = useQuery<MenuItem[]>({
    queryKey: menuKeys.all,
    queryFn: getMenus,
    staleTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false,
  });

  return query;
}
