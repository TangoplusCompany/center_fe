"use client";

import { type ReactNode, createContext, useContext } from "react";
import { useStore } from "zustand";
import { type ResultPageUserStore, resultPageUserStore } from "@/stores/ResultPageUserStore";

export type ResultPageUserStoreApi = typeof resultPageUserStore;

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
  // 전역 store 인스턴스를 사용하여 Provider와 axios가 동일한 store 공유
  return <ResultPageUserContext.Provider value={resultPageUserStore}>{children}</ResultPageUserContext.Provider>;
};

export default ResultPageUserProvider;
