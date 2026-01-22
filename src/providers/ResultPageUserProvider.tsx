"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { type ResultPageUserStore, createResultPageUserStore } from "@/stores/ResultPageUserStore";

export type ResultPageUserStoreApi = ReturnType<typeof createResultPageUserStore>;

export const ResultPageUserContext = createContext<ResultPageUserStoreApi | null>(null);

/**
 * ResultPage 사용자 인증 상태 관리 Hooks
 * 
 * Zustand를 통해 사용자 인증 상태를 관리하는 Hooks.
 * @param selector 인증 상태 관리 함수
 * @returns 인증 상태 관리 함수
 */
export const useResultPageUserStore = <T,>(selector: (store: ResultPageUserStore) => T): T => {
  const userStore = useContext(ResultPageUserContext);
  if (!userStore) {
    throw new Error("userStore는 ResultPageUserProvider 내부에서만 사용할 수 있습니다.");
  }
  return useStore(userStore, selector);
};

const ResultPageUserProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ResultPageUserStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createResultPageUserStore();
  }
  return <ResultPageUserContext.Provider value={storeRef.current}>{children}</ResultPageUserContext.Provider>;
};

export default ResultPageUserProvider;
