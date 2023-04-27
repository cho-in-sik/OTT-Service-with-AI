import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // 기본 서버 주소 입력
  timeout: 3000,
  params: {},
  withCredentials: true,
});

api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    // let token = localStorage.getItem('accessToken');

    // const isLogin = config.url?.includes('login');

    // if (!isLogin && !token) window.location.replace('/');

    return config;
  },
  (error) => {
    alert(error.response?.data.message);
    throw error;
  },
);
api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error);
    alert(error.response?.data.message);
    throw error;
  },
);

export { api };
