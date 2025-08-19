import { createContext, useState } from "react";
import { createStore, type StoreApi } from "zustand";

type Store = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const Context = createContext<StoreApi<Store> | null>(null);

export function FrameContextProvider({
  id,
  x,
  y,
  width,
  height,
  children,
}: {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<Store>(() => ({
      id,
      x,
      y,
      width,
      height,
    }))
  );

  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// const useFrameStore = <T,>(selector: (store: Store) => T): T => {
//   const storeContext = useContext(Context);

//   if (!storeContext) {
//     throw new Error(`useFrameStore must be used within FrameContextProvider`);
//   }

//   return useStore(storeContext, selector);
// };
