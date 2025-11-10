import { useMutation } from '@tanstack/react-query';
import {
  postLogin,
  postLogout,
  LoginRequest,
  LoginResponse,
} from '@/app/api/login';
import { useRouter } from 'next/navigation';

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (body: LoginRequest) => postLogin(body),
  });
}

export function useLogout() {
  const router = useRouter();
  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      localStorage.removeItem('storeId');
      localStorage.removeItem('storeName');

      const cookies = ['accessToken', 'isLoggedIn', 'storeId', 'storeName'];
      cookies.forEach((cookieName) => {
        document.cookie = `${cookieName}=; Max-Age=0; path=/;`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      });
      requestAnimationFrame(() => router.push('/'));
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
    },
  });
}
