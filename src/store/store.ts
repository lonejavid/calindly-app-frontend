import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import createSelectors from "./selectors";

type UserType = {
  id?: string;
  name: string;
  username: string;
  email: string;
  imageUrl?: string | null;
  isApproved?: boolean;
  /** Setup wizard step 0..4 (4 = completed). Used to resume after refresh. */
  setupStep?: number;
};

type AuthState = {
  user: UserType | null;
  accessToken: string | null;
  expiresAt: number | null;

  setUser: (user: UserType | null) => void;
  setAccessToken: (token: string | null) => void;
  setExpiresAt: (expiresAt: number | null) => void;

  clearUser: () => void;
  clearAccessToken: () => void;
  clearExpiresAt: () => void;
  /** Clear all auth state (e.g. on logout or 401). */
  clearAuth: () => void;
};

const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  accessToken: null,
  expiresAt: null,

  setAccessToken: (token) => set({ accessToken: token }),
  setExpiresAt: (expiresAt: number | null) => set({ expiresAt }),
  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),
  clearAccessToken: () => set({ accessToken: null }),
  clearExpiresAt: () => set({ expiresAt: null }),
  clearAuth: () =>
    set({ user: null, accessToken: null, expiresAt: null }),
});

type StoreType = AuthState;

export const useStoreBase = create<StoreType>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createAuthSlice(...a),
      })),
      {
        name: "local-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export const useStore = createSelectors(useStoreBase);
