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
    if (status === 400 || status === 401) {
      const msg =
        status === 400 ? '로그인이 필요합니다.' : '로그인이 만료되었습니다.';
      alert(msg);
      console.warn(`인증 문제 (${status})`);

      document.cookie = 'isLoggedIn=; Max-Age=0; path=/;';
      document.cookie = 'storeId=; Max-Age=0; path=/;';
      document.cookie = 'storeName=; Max-Age=0; path=/;';
      try {
        localStorage.removeItem('storeId');
        localStorage.removeItem('storeName');
      } catch {}

      const currentPath = window.location.pathname;
      document.cookie = 'accessToken=; Max-Age=0; path=/;';

      window.location.href = `/?redirect=${encodeURIComponent(currentPath)}`;
      return;
    }

    return Promise.reject(error);
  },
);
