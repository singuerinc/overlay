import type { IFrame } from "@/features/frame/types";
import { createContext, useState } from "react";
import { createStore, type StoreApi } from "zustand";

export type FrameStore = {
  activeFrame: IFrame;
  actions: {
    setActiveFrame: (frame: IFrame) => void;
  };
};

export const FrameContext = createContext<StoreApi<FrameStore> | null>(null);

export function FrameContextProvider({
  activeFrame,
  children,
}: {
  activeFrame: IFrame;
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<FrameStore>((set) => ({
      activeFrame,
      actions: {
        setActiveFrame: (frame: IFrame) => {
          set({ activeFrame: frame });
        },
      },
    }))
  );

  return (
    <FrameContext.Provider value={store}>{children}</FrameContext.Provider>
  );
}
