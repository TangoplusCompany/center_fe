"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { type AuthStore, createAuthStore } from "@/stores/AuthStore";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthContext = createContext<AuthStoreApi | null>(null);

/**
 * 인증 상태 관리 Hooks
 * 
 * Zustand를 통해 인증 상태를 관리하는 Hooks.
 * @param selector 인증 상태 관리 함수
 * @returns 인증 상태 관리 함수
 */
export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStore = useContext(AuthContext);
  if (!authStore) {
    throw new Error("authStore는 AuthStoreProvider 내부에서만 사용할 수 있습니다.");
  }
  return useStore(authStore, selector);
};

/**
 * 인증 상태 관리 Hooks (Optional)
 * 
 * AuthStoreProvider가 없어도 사용할 수 있는 optional 버전
 * Provider가 없으면 기본값을 반환
 * @param selector 인증 상태 관리 함수
 * @param defaultValue Provider가 없을 때 반환할 기본값
 * @returns 인증 상태 관리 함수 또는 기본값
 */
export const useAuthStoreOptional = <T,>(
  selector: (store: AuthStore) => T,
  defaultValue: T
): T => {
  const authStore = useContext(AuthContext);
  // useStore는 항상 호출되어야 하므로, authStore가 없으면 기본 store를 생성
  // 하지만 실제로는 사용하지 않고 defaultValue를 반환
  const fallbackStore = useRef(createAuthStore()).current;
  const storeToUse = authStore || fallbackStore;
  
  // useStore는 항상 호출 (Hook 규칙 준수)
  const value = useStore(storeToUse, selector);
  
  // authStore가 없으면 defaultValue 반환
  return authStore ? value : defaultValue;
};

const AuthStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AuthStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }
  return <AuthContext.Provider value={storeRef.current}>{children}</AuthContext.Provider>;
};

export default AuthStoreProvider;
