import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { postSignUp, SignupRequest, SignupResponse } from '@/app/api/signup';
import { toast } from 'sonner';

type FieldError = { field: string; message: string };
type ValidationError = { title?: string; errors?: FieldError[] };

const ORDER = [
  'loginId',
  'password',
  'username',
  'phoneNumber',
  'storeName',
  'tableCount',
] as const;

export default function useSignup() {
  const router = useRouter();
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: (body: SignupRequest) => postSignUp(body),
    onSuccess: (res) => {
      toast.success('회원가입 성공!');
      router.push('/');
    },
    onError: (err) => {
      if (isAxiosError<ValidationError>(err) && err.response) {
        const data = err.response.data;
        const errors = data?.errors ?? [];
        const first =
          ORDER.map((f) => errors.find((e) => e.field === f)).find(
            (e): e is FieldError => !!e,
          ) || errors[0];

        const msg = first?.message || data?.title || '회원가입 실패';
        toast.error(msg);

        if (first?.field) {
          const $input = document.querySelector<HTMLInputElement>(
            `[name="${first.field}"]`,
          );
          $input?.focus();
          $input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        toast.error('네트워크 오류가 발생했습니다.');
      }
    },
  });
}
