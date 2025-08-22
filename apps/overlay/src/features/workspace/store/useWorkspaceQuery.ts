import { createWorkspace } from "@/features/workspace/store/createWorkspace";
import { WORKSPACE_KEYS } from "@/features/workspace/store/workspaceKeys";
import type { IWorkspace } from "@/features/workspace/types";
import { useQuery } from "@tanstack/react-query";

function getWorkspace(): Promise<IWorkspace> {
  return new Promise((resolve) => {
    const maybeWorkspace = localStorage.getItem(
      WORKSPACE_KEYS.workspace().join("-")
    );

    if (maybeWorkspace === null) {
      const workspace = createWorkspace();
      localStorage.setItem(
        WORKSPACE_KEYS.workspace().join("-"),
        JSON.stringify(workspace)
      );
      resolve(workspace);
    } else {
      resolve(JSON.parse(maybeWorkspace));
    }
  });
}

export function useWorkspaceQuery() {
  return useQuery({
    queryKey: WORKSPACE_KEYS.workspace(),
    queryFn: () => getWorkspace(),
  });
}
