import { instance } from '@/lib/axios';

export type LoginRequest = {
  loginId: string;
  password: string;
};

export type LoginResponse = {
  userId: number;
  username: string;
  token: string;
  stores: { storeId: number; storeName: string }[];
};

export async function postLogin(
  loginInfo: LoginRequest,
): Promise<LoginResponse> {
  const { data } = await instance.post<LoginResponse>('/user/login', loginInfo);

  if (data.stores?.length > 0) {
    localStorage.setItem('storeId', String(data.stores[0].storeId));
  }

  return data;
}
