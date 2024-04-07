import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ChatStoreType = {
    isChatInputFocus: boolean;
    setIsChatInputFocus: () => void;
    setIsChatInputBlur: () => void;
};

export const useChatStore = create(
  persist<ChatStoreType>(
    (set) => ({
        isChatInputFocus:false,
        setIsChatInputFocus: () => set({ isChatInputFocus: true }),
        setIsChatInputBlur: () => set({ isChatInputFocus: false }),
    }),
    {
      name: "chatStore",

      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
