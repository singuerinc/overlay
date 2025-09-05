import { WORKSPACE_KEYS } from "@/features/workspace/store/workspaceKeys";
import type { IWorkspace } from "@/features/workspace/types";

export async function workspaceSave(workspace: IWorkspace) {
  return localStorage.setItem(
    WORKSPACE_KEYS.workspace().join("-"),
    JSON.stringify(workspace)
  );
}
