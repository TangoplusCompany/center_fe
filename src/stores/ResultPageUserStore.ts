import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IResultPageLoginUser, IResultPageLoginSuccessResponse } from "@/types/user";

interface IResultPageUserProps {
  isLogin: boolean;
  user: IResultPageLoginUser | null;
  accessToken: string;
  _hasHydrated: boolean; // persist 복원 완료 여부
}

interface IResultPageUserActions {
  initAuthorization: () => void;
  setLogin: (user: IResultPageLoginUser, accessToken: string) => void;
  setLoginFromResponse: (response: IResultPageLoginSuccessResponse["data"]) => void;
  setAccessToken: (accessToken: string) => void;
  setLogout: () => void;
}

export type ResultPageUserStore = IResultPageUserProps & IResultPageUserActions;

/**
 * ResultPage 사용자 인증 상태 관리 Store 생성 함수
 * @param initialState 초기 상태
 */
export const createResultPageUserStore = (initialState?: Partial<IResultPageUserProps>) => {
  const DEFAULT_STATE: IResultPageUserProps = {
    isLogin: false,
    user: null,
    accessToken: "",
    _hasHydrated: false,
  };
  return createStore<ResultPageUserStore>()(
    persist(
      (set) => ({
        ...DEFAULT_STATE,
        ...initialState,
        initAuthorization: () => set({ ...DEFAULT_STATE, _hasHydrated: true }),
        setLogin: (user: IResultPageLoginUser, accessToken: string) =>
          set({
            isLogin: true,
            user,
            accessToken,
            _hasHydrated: true,
          }),
        setLoginFromResponse: (response: IResultPageLoginSuccessResponse["data"]) =>
          set({
            isLogin: true,
            user: response.user,
            accessToken: response.access_token,
            _hasHydrated: true,
          }),
        setAccessToken: (accessToken: string) => set({ accessToken }),
        setLogout: () => {
          set({ ...DEFAULT_STATE, _hasHydrated: true });
        },
      }),
      {
        name: "result-page-user",
        storage: createJSONStorage(() => sessionStorage),
        onRehydrateStorage: () => (state) => {
          // persist 복원 완료 시 _hasHydrated를 true로 설정
          if (state) {
            state._hasHydrated = true;
          }
        },
      },
    ),
  );
};

/**
 * 전역 ResultPage 사용자 Store 인스턴스
 * Provider와 axios 인터셉터가 같은 인스턴스를 사용하여 동기화 보장
 */
export const resultPageUserStore = createResultPageUserStore();
