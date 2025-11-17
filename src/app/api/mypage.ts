import { instance } from '@/lib/axios';
import { validate } from '@/app/api/validate';
import { MyPageResponseSchema } from '@/lib/schemas/mypage';

export async function getMyPage() {
  const { data } = await instance.get('/mypage');
  return validate(data, MyPageResponseSchema);
}
