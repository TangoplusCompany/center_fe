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
  setCenterSn: (centerSn: number, centerName?: string, adminRole?: number) => void;
  /** 설정에서 개인 정보(이름, 이메일, 전화번호) 수정 시 스토어 반영 */
  setAdminProfile: (data: {
    adminName?: string;
    adminEmail?: string;
    adminMobile?: string;
  }) => void;
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
        setCenterSn: (centerSn: number, centerName?: string, adminRole?: number) =>
          set((state) => ({
            centerSn,
            centerName: centerSn === 0 ? "" : (centerName ?? state.centerName),
            ...(adminRole !== undefined && { adminRole }),
          })),
        setAdminProfile: (data) =>
          set((prev) => ({
            ...prev,
            ...(data.adminName !== undefined && { adminName: data.adminName }),
            ...(data.adminEmail !== undefined && { adminEmail: data.adminEmail }),
            ...(data.adminMobile !== undefined && { adminMobile: data.adminMobile }),
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
