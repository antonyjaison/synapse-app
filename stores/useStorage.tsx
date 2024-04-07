import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SelectedDate = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
};

export const useSelectedDate = create(
  persist<SelectedDate>(
    (set) => ({
      selectedDate: "2024-04-04",
      setSelectedDate: (date: string) => set({ selectedDate: date }),
    }),
    {
      name: "selectedDate",

      storage: createJSONStorage(() => AsyncStorage), // <==  pay attention
    }
  )
);
