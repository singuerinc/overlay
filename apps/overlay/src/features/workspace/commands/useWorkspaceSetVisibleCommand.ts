import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";
import type { IWorkspace } from "@/features/workspace/types";

export function useWorkspaceSetVisibleCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useWorkspaceMutation();

  return {
    execute: (visible: IWorkspace["visible"]) => {
      const command = new Command(
        "Workspace - Set visible state",
        () =>
          mutation.mutateAsync({
            visible,
          }),
        () => Promise.resolve(void 0)
      );
      executeCommand(command, true);
    },
  };
}
