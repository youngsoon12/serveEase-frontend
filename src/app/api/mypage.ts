import { instance } from '@/lib/axios';
import { validate } from '@/app/api/validate';
import { MyPageResponseSchema } from '@/lib/schemas/mypage';

export async function getMyPage() {
  const { data } = await instance.get('/mypage');
  return validate(data, MyPageResponseSchema);
}

export async function patchPassword(
  currentPassword: string,
  newPassword: string,
) {
  const body = {
    currentPassword,
    newPassword,
  };

  const { data } = await instance.patch('/mypage/password', body);
  return data;
}

export async function patchPhoneNumber(phoneNumber: string) {
  const body = { phoneNumber };
  const { data } = await instance.patch('/mypage/phone-number', body);
  return data;
}

export async function patchStoreName(storeId: number, storeName: string) {
  const body = { storeName };

  const { data } = await instance.patch(`/stores/${storeId}/name`, body);
  return data;
}
