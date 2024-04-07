import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "firebase/auth";

type UserStoreType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
};

export const useUser = create(
  persist<UserStoreType>(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
      isLoaded: false,
      setIsLoaded: (isLoaded: boolean) => set({ isLoaded }),
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
