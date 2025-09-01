import { createContext, useContext, useState } from "react";
import { createStore, useStore, type StoreApi } from "zustand";

type Store = {
  x0: number | null;
  y0: number | null;
  x1: number | null;
  y1: number | null;
  actions: {
    setX0: (x: number | null) => void;
    setY0: (y: number | null) => void;
    setX1: (x: number | null) => void;
    setY1: (y: number | null) => void;
  };
};

const Context = createContext<StoreApi<Store> | null>(null);

export function SizesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<Store>((set) => ({
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
      actions: {
        setX0: (x: number | null) =>
          set({ x0: x !== null ? Math.round(x) : null }),
        setY0: (y: number | null) =>
          set({ y0: y !== null ? Math.round(y) : null }),
        setX1: (x: number | null) =>
          set({ x1: x !== null ? Math.round(x) : null }),
        setY1: (y: number | null) =>
          set({ y1: y !== null ? Math.round(y) : null }),
      },
    }))
  );

  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export const useSizesStore = <T,>(selector: (store: Store) => T): T => {
  const storeContext = useContext(Context);

  if (!storeContext) {
    throw new Error(`useSizesStore must be used within SizesContextProvider`);
  }

  return useStore(storeContext, selector);
};

export const useSizesX0 = () => useSizesStore((state) => state.x0);
export const useSizesY0 = () => useSizesStore((state) => state.y0);
export const useSizesX1 = () => useSizesStore((state) => state.x1);
export const useSizesY1 = () => useSizesStore((state) => state.y1);

export const useSizesSetX0 = () =>
  useSizesStore((state) => state.actions.setX0);

export const useSizesSetY0 = () =>
  useSizesStore((state) => state.actions.setY0);

export const useSizesSetX1 = () =>
  useSizesStore((state) => state.actions.setX1);

export const useSizesSetY1 = () =>
  useSizesStore((state) => state.actions.setY1);
