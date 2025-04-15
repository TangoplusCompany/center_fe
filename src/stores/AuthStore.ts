import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IAuthProps {
  isLogin: boolean;
  adminName: string;
  adminEmail: string;
  adminRole: number;
  accessJwt: string;
}

interface IAuthActions {
  initAuthorization: () => void;
  setAuthorization: (userData: IAuthProps) => void;
}

export type AuthStore = IAuthProps & IAuthActions;

export const createAuthStore = (initialState?: IAuthProps) => {
  const DEFAULT_STATE: IAuthProps = {
    isLogin: false,
    adminName: "",
    adminEmail: "",
    adminRole: 0,
    accessJwt: "",
  };
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        ...DEFAULT_STATE,
        ...initialState,
        initAuthorization: () => set({ ...DEFAULT_STATE }),
        setAuthorization: (userData: IAuthProps) => set({ ...userData }),
      }),
      {
        name: "login-user",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};
