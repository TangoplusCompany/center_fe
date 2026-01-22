import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IResultPageLoginUser, IResultPageLoginSuccessResponse } from "@/types/user";

interface IResultPageUserProps {
  isLogin: boolean;
  user: IResultPageLoginUser | null;
  accessToken: string;
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
 * ResultPage 사용자 인증 상태 관리 Store
 * @param initialState 초기 상태
 */
export const createResultPageUserStore = (initialState?: Partial<IResultPageUserProps>) => {
  const DEFAULT_STATE: IResultPageUserProps = {
    isLogin: false,
    user: null,
    accessToken: "",
  };
  return createStore<ResultPageUserStore>()(
    persist(
      (set) => ({
        ...DEFAULT_STATE,
        ...initialState,
        initAuthorization: () => set({ ...DEFAULT_STATE }),
        setLogin: (user: IResultPageLoginUser, accessToken: string) =>
          set({
            isLogin: true,
            user,
            accessToken,
          }),
        setLoginFromResponse: (response: IResultPageLoginSuccessResponse["data"]) =>
          set({
            isLogin: true,
            user: response.user,
            accessToken: response.access_token,
          }),
        setAccessToken: (accessToken: string) => set({ accessToken }),
        setLogout: () => {
          set({ ...DEFAULT_STATE });
          document.cookie = "resultPageLogin=; path=/; max-age=0";
        },
      }),
      {
        name: "result-page-user",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};
