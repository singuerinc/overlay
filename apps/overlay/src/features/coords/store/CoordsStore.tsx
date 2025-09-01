import { createContext, useContext, useState } from "react";
import { createStore, useStore, type StoreApi } from "zustand";

type Store = {
  x: number | null;
  y: number | null;
  actions: {
    setPositionX: (x: number | null) => void;
    setPositionY: (y: number | null) => void;
  };
};

const Context = createContext<StoreApi<Store> | null>(null);

export function CoordsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<Store>((set) => ({
      x: 0,
      y: 0,
      actions: {
        setPositionX: (x: number | null) =>
          set({ x: x !== null ? Math.round(x) : null }),
        setPositionY: (y: number | null) =>
          set({ y: y !== null ? Math.round(y) : null }),
      },
    }))
  );

  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export const useCoordsStore = <T,>(selector: (store: Store) => T): T => {
  const storeContext = useContext(Context);

  if (!storeContext) {
    throw new Error(`useCoordsStore must be used within CoordsContextProvider`);
  }

  return useStore(storeContext, selector);
};

export const useCoordsPositionX = () => useCoordsStore((state) => state.x);
export const useCoordsPositionY = () => useCoordsStore((state) => state.y);

export const useCoordsSetPositionX = () =>
  useCoordsStore((state) => state.actions.setPositionX);

export const useCoordsSetPositionY = () =>
  useCoordsStore((state) => state.actions.setPositionY);
