import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IAuthProps {
  isLogin: boolean;
  adminName: string;
  adminEmail: string;
  adminMobile: string;
  adminRole: number;
  adminSn: number;
  centerSn: number;
  centerName: string;
  accessJwt: string;
}

interface IAuthActions {
  initAuthorization: () => void;
  setLogin: (userData: IAuthProps) => void;
  setAccessToken: (accessJwt: string) => void;
  setCenterSn: (centerSn: number, centerName?: string) => void;
  setLogout: () => void;
}

export type AuthStore = IAuthProps & IAuthActions;

/**
 * 인증 상태 관리 Store
 * @param initialState 초기 상태
 */
export const createAuthStore = (initialState?: IAuthProps) => {
  const DEFAULT_STATE: IAuthProps = {
    isLogin: false,
    adminName: "",
    adminEmail: "",
    adminMobile: "",
    adminRole: 0,
    adminSn: 0,
    centerSn: 0,
    centerName: "",
    accessJwt: "",
  };
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        ...DEFAULT_STATE,
        ...initialState,
        initAuthorization: () => set({ ...DEFAULT_STATE }),
        setLogin: (userData: IAuthProps) => set({ ...userData }),
        setAccessToken: (accessJwt: string) => set({ accessJwt }),
        setCenterSn: (centerSn: number, centerName?: string) =>
          set((state) => ({
            centerSn,
            centerName: centerSn === 0 ? "" : (centerName ?? state.centerName),
          })),
        setLogout: () => {
          set({ ...DEFAULT_STATE });
          sessionStorage.removeItem("login-user");
        },
      }),
      {
        name: "login-user",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};
