import { instance } from '@/lib/axios';

export type LoginRequest = {
  loginId: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export async function postLogin(
  loginInfo: LoginRequest,
): Promise<LoginResponse> {
  const { data } = await instance.post<LoginResponse>('/user/login', loginInfo);
  return data;
}
