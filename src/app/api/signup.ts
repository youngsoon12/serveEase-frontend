import { instance } from '@/lib/axios';

export type SignupRequest = {
  loginId: string;
  password: string;
  phoneNumber: string;
  username: string;
  storeName: string;
  tableCount: number;
};

export type SignupResponse = {
  userId: number;
  loginId: string;
  username: string;
  storeName: string;
};

export async function postSignUp(
  signupInfo: SignupRequest,
): Promise<SignupResponse> {
  const { data } = await instance.post<SignupResponse>(
    '/user/signup',
    signupInfo,
  );
  return data;
}
