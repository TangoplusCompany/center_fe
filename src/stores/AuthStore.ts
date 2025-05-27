import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IAuthProps {
  isLogin: boolean;
  adminName: string;
  adminEmail: string;
  adminRole: number;
  adminSn: number;
  accessJwt: string;
}

interface IAuthActions {
  initAuthorization: () => void;
  setLogin: (userData: IAuthProps) => void;
  setAccessToken: (accessJwt: string) => void;
  setLogout: () => void;
}

export type AuthStore = IAuthProps & IAuthActions;

export const createAuthStore = (initialState?: IAuthProps) => {
  const DEFAULT_STATE: IAuthProps = {
    isLogin: false,
    adminName: "",
    adminEmail: "",
    adminRole: 0,
    adminSn: 0,
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
