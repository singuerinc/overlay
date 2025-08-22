import { WORKSPACE_KEYS } from "@/features/workspace/store/workspaceKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IWorkspace } from "../types";

export function useWorkspaceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IWorkspace, "id">>) => {
      const workspace = queryClient.getQueryData<IWorkspace>(
        WORKSPACE_KEYS.workspace()
      );

      const updatedWorkspace = produce(workspace, (draftState: IWorkspace) => {
        Object.assign(draftState, props);
      });

      localStorage.setItem(
        WORKSPACE_KEYS.workspace().join("-"),
        JSON.stringify(updatedWorkspace)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: WORKSPACE_KEYS.workspace(),
      });
    },
  });
}
