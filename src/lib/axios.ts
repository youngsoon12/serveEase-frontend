import axios from 'axios';

export const instance = axios.create({
  baseURL: '/api/bff',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
