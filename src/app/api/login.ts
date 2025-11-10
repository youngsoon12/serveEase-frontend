import { instance } from '@/lib/axios';
import axios from 'axios';

export type LoginRequest = {
  loginId: string;
  password: string;
};

export type LoginResponse = {
  ok: boolean;
  stores?: { storeId: number; storeName: string }[];
};

export async function postLogin(
  loginInfo: LoginRequest,
): Promise<LoginResponse> {
  const { data } = await axios.post<LoginResponse>('/api/login', loginInfo, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });

  return data;
}

export async function postLogout() {
  try {
    const { data } = await instance.post('/user/logout');
    return data;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
}
