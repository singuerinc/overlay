import type { IFrame } from "@/features/frame/types";
import { createContext, useState } from "react";
import { createStore, type StoreApi } from "zustand";

export type FrameStore = {
  activeFrameId: IFrame["id"];
};

export const FrameContext = createContext<StoreApi<FrameStore> | null>(null);

export function FrameContextProvider({
  activeFrameId,
  children,
}: {
  activeFrameId: IFrame["id"];
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<FrameStore>(() => ({
      activeFrameId,
    }))
  );

  return (
    <FrameContext.Provider value={store}>{children}</FrameContext.Provider>
  );
}
