import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModelType } from "@/components/Headers/Chat/ChatHeaderRight";

type ChatStoreType = {
    isChatInputFocus: boolean;
    setIsChatInputFocus: () => void;
    setIsChatInputBlur: () => void;
    changeModel: (model: ChatStoreType["model"]) => void;
    model: ModelType
};

export const useChatStore = create(
  persist<ChatStoreType>(
    (set) => ({
        isChatInputFocus:false,
        setIsChatInputFocus: () => set({ isChatInputFocus: true }),
        setIsChatInputBlur: () => set({ isChatInputFocus: false }),
        changeModel: (model: ChatStoreType["model"]) => set({ model }),
        model:"hygeia"
    }),
    {
      name: "chatStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
