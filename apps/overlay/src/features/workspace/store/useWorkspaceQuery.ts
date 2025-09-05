import { createPreset } from "@/features/preset/store/createPreset";
import { presetSave } from "@/features/preset/store/presetSave";
import { createWorkspace } from "@/features/workspace/store/createWorkspace";
import { WORKSPACE_KEYS } from "@/features/workspace/store/workspaceKeys";
import { workspaceSave } from "@/features/workspace/store/workspaceSave";
import type { IWorkspace } from "@/features/workspace/types";
import { useQuery } from "@tanstack/react-query";

function getWorkspace(): Promise<IWorkspace> {
  return new Promise((resolve) => {
    const maybeWorkspace = localStorage.getItem(
      WORKSPACE_KEYS.workspace().join("-")
    );

    if (maybeWorkspace === null) {
      const preset = createPreset();
      const workspace = createWorkspace({ preset });

      workspaceSave(workspace).then(() => {
        presetSave(workspace.id, preset).then(() => {
          resolve(workspace);
        });
      });
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
