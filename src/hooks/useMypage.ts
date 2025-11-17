import { useQuery } from '@tanstack/react-query';
import { getMyPage } from '@/app/api/mypage';

export function useMyPage() {
  return useQuery({
    queryKey: ['mypage'],
    queryFn: getMyPage,
    staleTime: 1000 * 60 * 5,
  });
}
