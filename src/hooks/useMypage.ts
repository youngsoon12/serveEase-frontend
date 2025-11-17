import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMyPage,
  patchPassword,
  patchPhoneNumber,
  patchStoreName,
} from '@/app/api/mypage';
import { useQuery } from '@tanstack/react-query';

export function useMyPage() {
  return useQuery({
    queryKey: ['mypage'],
    queryFn: getMyPage,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePatchPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => patchPassword(currentPassword, newPassword),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
  });
}

export function usePatchPhoneNumber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (phoneNumber: string) => patchPhoneNumber(phoneNumber),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
  });
}

export function usePatchStoreName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      storeId,
      storeName,
    }: {
      storeId: number;
      storeName: string;
    }) => patchStoreName(storeId, storeName),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
  });
}
