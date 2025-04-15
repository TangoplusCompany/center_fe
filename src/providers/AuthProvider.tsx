"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { type AuthStore, createAuthStore } from "@/stores/AuthStore";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthContext = createContext<AuthStoreApi | null>(null);

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStore = useContext(AuthContext);
  if (!authStore) {
    throw new Error("authStore는 AuthStoreProvider 내부에서만 사용할 수 있습니다.");
  }
  return useStore(authStore, selector);
};

const AuthStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AuthStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }
  return <AuthContext.Provider value={storeRef.current}>{children}</AuthContext.Provider>;
};

export default AuthStoreProvider;
