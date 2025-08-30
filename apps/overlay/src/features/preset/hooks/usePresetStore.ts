import {
  PresetContext,
  type PresetStore,
} from "@/features/preset/store/presetsStore";
import { useContext } from "react";
import { useStore } from "zustand";

export const usePresetStore = <T>(selector: (store: PresetStore) => T): T => {
  const storeContext = useContext(PresetContext);

  if (!storeContext) {
    throw new Error(`usePresetStore must be used within PresetContextProvider`);
  }

  return useStore(storeContext, selector);
};
