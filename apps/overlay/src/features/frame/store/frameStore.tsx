import { createContext, useState } from "react";
import { createStore, type StoreApi } from "zustand";

type Store = {
  id: string;
};

const Context = createContext<StoreApi<Store> | null>(null);

export function FrameContextProvider({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<Store>(() => ({
      id,
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
