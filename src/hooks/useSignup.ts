import { useMutation } from '@tanstack/react-query';
import { postSignUp, SignupRequest, SignupResponse } from '@/app/api/signup';

export default function useSignup() {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: (body: SignupRequest) => postSignUp(body),
  });
}
