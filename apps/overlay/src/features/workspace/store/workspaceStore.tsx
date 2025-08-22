import { createContext, useState } from "react";
import { createStore, type StoreApi } from "zustand";

export type WorkspaceStore = {
  id: string;
};

export const WorkspaceContext = createContext<StoreApi<WorkspaceStore> | null>(
  null
);

export function WorkspaceContextProvider({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<WorkspaceStore>(() => ({
      id,
    }))
  );

  return (
    <WorkspaceContext.Provider value={store}>
      {children}
    </WorkspaceContext.Provider>
  );
}
