import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import type { IWorkspace } from "@/features/workspace/types";

export function useWorkspaceSetVisibleCommand() {
  const { data: workspace } = useWorkspaceQuery();
  const { execute: executeCommand } = useCommands();
  const mutation = useWorkspaceMutation();

  return {
    execute: (visible: IWorkspace["visible"]) => {
      const command = new Command(
        "Workspace - Set visible state",
        () => {
          if (workspace) {
            mutation.mutate({
              visible,
            });
          }
        },
        () => {
          //
        }
      );
      executeCommand(command, true);
    },
  };
}
