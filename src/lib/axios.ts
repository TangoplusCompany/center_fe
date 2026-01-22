import { refreshAccessToken } from "@/services/auth/postRefreshAccessToken";
import { createAuthStore } from "@/stores/AuthStore";
import { createResultPageUserStore } from "@/stores/ResultPageUserStore";
import { session } from "@/utils/helperSessionStorage";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

/**
 * 비회원 전용 Axios 인스턴스
 */
export const customUnAuthAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * JSON 파일 전용 Axios 인스턴스
 */
export const customJsonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FILE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const authStore = createAuthStore();
const resultPageUserStore = createResultPageUserStore();

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

/**
 * 회원 전용 Axios 인스턴스
 */
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
  // result-page 경로는 별도의 인증 시스템을 사용하므로 토큰 체크 제외
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/result-page")) {
    return config;
  }
  
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
        // result-page 경로는 별도의 인증 시스템을 사용하므로 리다이렉트 제외
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/result-page")) {
          authStore.getState().setLogout(); // 로그아웃 처리
          window.location.href = "/login";
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

/**
 * 사용자 전용 Axios 인스턴스
 * result-page에서 사용하는 사용자 API 호출용
 */
export const customUserAxios = axios.create({
  baseURL: "https://gym.tangoplus.co.kr/user_api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ 요청 인터셉터: result-page 경로에서만 사용자 토큰을 헤더에 부착
customUserAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // result-page 경로에서만 사용자 토큰 사용
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/result-page")) {
    const userStore = resultPageUserStore.getState();
    
    if (userStore.isLogin && userStore.accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${userStore.accessToken}`;
    } else {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      window.location.href = "/result-page/login";
    }
  }
  
  return config;
});

// ✅ 응답 인터셉터: 401 에러 발생 시 로그인 페이지로 리다이렉트
customUserAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 에러 발생 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      const userStore = resultPageUserStore.getState();
      userStore.setLogout();
      
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/result-page")) {
        window.location.href = "/result-page/login";
      }
    }

    return Promise.reject(error);
  },
);
