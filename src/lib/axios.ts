import { refreshAccessToken } from "@/services/auth/postRefreshAccessToken";
import { createAuthStore } from "@/stores/AuthStore";
import { session } from "@/utils/helperSessionStorage";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const customUnAuthAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const customJsonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FILE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const authStore = createAuthStore();

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: AxiosError) => void;
}[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error || !token) reject(error!);
    else resolve(token);
  });
  failedQueue = [];
};

export const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ 요청 인터셉터: 항상 최신 토큰을 헤더에 부착
customAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = session.get<{
    state: {
      isLogin: boolean;
      adminName: string;
      adminEmail: string;
      adminRole: number;
      adminSn: number;
      accessJwt: string;
    };
  }>("login-user");
  if (!token) {
    window.location.href = "/login";
  }
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token.state.accessJwt}`;
  }
  return config;
});

// ✅ 응답 인터셉터: 401 에러 발생 시, 토큰 갱신 요청
customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(customAxios(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await refreshAccessToken(); // 🍪 쿠키로 refreshToken 보내는 API
        authStore.getState().setAccessToken(refreshResponse.data.access_jwt); // 상태 업데이트
        processQueue(null, refreshResponse.data.access_jwt);

        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access_jwt}`;
        return customAxios(originalRequest);
      } catch (err) {
        processQueue(err as AxiosError, null);
        authStore.getState().setLogout(); // 로그아웃 처리
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
