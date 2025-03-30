import { create, StateCreator } from "zustand";
import type { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
}

export const storeApi: StateCreator<
  AuthState,
  [["zustand/devtools", never]]
> = (set) => ({
  status: "authorized",
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: "authorized", token, user }, false, "onLoginUser");
    } catch (error) {
      set(
        { status: "unauthorized", token: undefined, user: undefined },
        false,
        "offLoginUser"
      );
    }
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      storeApi, { name: "auth-store" }
    )
  )
);
