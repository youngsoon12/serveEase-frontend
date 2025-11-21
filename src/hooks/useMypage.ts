import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMyPage,
  patchPassword,
  patchPhoneNumber,
  patchStoreName,
} from '@/app/api/mypage';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

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

    onError: (err) => {
      const axiosErr = err as AxiosError<{ message?: string; detail?: string }>;

      const backendMessage =
        axiosErr.response?.data?.message ||
        axiosErr.response?.data?.detail ||
        '비밀번호 변경 실패';

      // toast.error(backendMessage);
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
