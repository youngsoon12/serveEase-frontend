import { useMutation } from '@tanstack/react-query';
import { postLogin, LoginRequest, LoginResponse } from '@/app/api/login';

export default function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (body: LoginRequest) => postLogin(body),
  });
}
