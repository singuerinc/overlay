import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";
import type { IWorkspace } from "@/features/workspace/types";
import { useQueryClient } from "@tanstack/react-query";

export function useWorkspaceSetSnapToGridCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useWorkspaceMutation();
  const queryClient = useQueryClient();

  return {
    execute: (snapToGrid: IWorkspace["snapToGrid"]) => {
      const prev = queryClient.getQueryData<IWorkspace>([
        "workspace",
      ])?.snapToGrid;

      const command = new Command(
        "Workspace - Set snap to grid",
        () =>
          mutation.mutateAsync({
            snapToGrid,
          }),
        () =>
          mutation.mutateAsync({
            snapToGrid: !prev,
          })
      );
      executeCommand(command, true);
    },
  };
}
