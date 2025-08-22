import { createContext, useState } from "react";
import { createStore, type StoreApi } from "zustand";

export type FrameStore = {
  activeId: string;
  actions: {
    setActiveId: (id: string) => void;
  };
};

export const FrameContext = createContext<StoreApi<FrameStore> | null>(null);

export function FrameContextProvider({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<FrameStore>((set) => ({
      activeId: id,
      actions: {
        setActiveId: (newId: string) => {
          set({ activeId: newId });
        },
      },
    }))
  );

  return (
    <FrameContext.Provider value={store}>{children}</FrameContext.Provider>
  );
}
