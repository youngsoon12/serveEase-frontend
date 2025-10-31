import axios from 'axios';
import { getCookie } from './cookies';

export const instance = axios.create({
  baseURL: '/api/bff',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401) {
      alert('로그인이 만료되었습니다.');
      console.warn(' 인증 만료 (401 Unauthorized)');

      const currentPath = window.location.pathname;
      document.cookie = 'accessToken=; Max-Age=0; path=/;';

      window.location.href = `/?redirect=${encodeURIComponent(currentPath)}`;
      return;
    }

    return Promise.reject(error);
  },
);
