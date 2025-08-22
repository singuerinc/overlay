import {
  FrameContext,
  type FrameStore,
} from "@/features/frame/store/frameStore";
import { useContext } from "react";
import { useStore } from "zustand";

export const useFrameStore = <T>(selector: (store: FrameStore) => T): T => {
  const storeContext = useContext(FrameContext);

  if (!storeContext) {
    throw new Error(`useFrameStore must be used within FrameContextProvider`);
  }

  return useStore(storeContext, selector);
};
