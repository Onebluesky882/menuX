import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  id: string;
  linePictureUrl: string;
  lineDisplayName: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUserState: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user }),
      clearUserState: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        // fallback สำหรับ SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
