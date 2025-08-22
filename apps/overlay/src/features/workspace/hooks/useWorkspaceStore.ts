import {
  WorkspaceContext,
  type WorkspaceStore,
} from "@/features/workspace/store/workspaceStore";
import { useContext } from "react";
import { useStore } from "zustand";

export const useWorkspaceStore = <T>(
  selector: (store: WorkspaceStore) => T
): T => {
  const storeContext = useContext(WorkspaceContext);

  if (!storeContext) {
    throw new Error(
      `useWorkspaceStore must be used within WorkspaceContextProvider`
    );
  }

  return useStore(storeContext, selector);
};
