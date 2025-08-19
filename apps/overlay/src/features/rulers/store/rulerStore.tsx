import { createContext, useContext, useState } from "react";
import { createStore, useStore, type StoreApi } from "zustand";

type Store = {
  x: number | null;
  y: number | null;
  actions: {
    setPosition: (x: number | null, y: number | null) => void;
    setPositionX: (x: number | null) => void;
    setPositionY: (y: number | null) => void;
  };
};

const Context = createContext<StoreApi<Store> | null>(null);

export function RulerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<Store>((set) => ({
      x: null,
      y: null,
      actions: {
        setPosition: (x: number | null, y: number | null) => set({ x, y }),
        setPositionX: (x: number | null) => set({ x }),
        setPositionY: (y: number | null) => set({ y }),
      },
    }))
  );

  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export const useRulerStore = <T,>(selector: (store: Store) => T): T => {
  const storeContext = useContext(Context);

  if (!storeContext) {
    throw new Error(`useRulerStore must be used within RulerContextProvider`);
  }

  return useStore(storeContext, selector);
};

export const useRulerPositionX = () => useRulerStore((state) => state.x);
export const useRulerPositionY = () => useRulerStore((state) => state.y);

export const useRulerSetPosition = () =>
  useRulerStore((state) => state.actions.setPosition);
