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
    return config;
  },
  (error) => {
    console.log(error);
    alert(error.response?.data.message);
    throw error;
  },
);
api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const { config: originalRequest } = error;

    if (error.response?.data.code)
      return await api
        .patch(`/api/auth/refresh-token`)
        .then((res) => {
          if (res.status === 200) {
            return axios(originalRequest);
          }
        })
        .catch((err) => {
          console.log(err);
          return err;
        });

    console.log(error);
    alert(error.response?.data.message);

    throw error;
  },
);

export { api };
