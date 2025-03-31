import { create, StateCreator } from "zustand";
import type { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;

  logoutUser: () => void;
}

export const storeApi: StateCreator<
  AuthState,
  [["zustand/devtools", never]]
> = (set) => ({
  status: "pending",
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
      throw "Unauthorized";
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },

  logoutUser: async () => {
    set({ status: "unauthorized", token: undefined, user: undefined });
  },

  //
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-store" }))
);
