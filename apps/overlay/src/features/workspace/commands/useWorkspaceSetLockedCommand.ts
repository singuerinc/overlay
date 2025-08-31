import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import type { IWorkspace } from "@/features/workspace/types";

export function useWorkspaceSetLockedCommand() {
  const { data: workspace } = useWorkspaceQuery();
  const { execute: executeCommand } = useCommands();
  const mutation = useWorkspaceMutation();

  return {
    execute: (locked: IWorkspace["locked"]) => {
      const command = new Command(
        "Workspace - Set locked state",
        () => {
          if (workspace) {
            mutation.mutate({
              locked,
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
