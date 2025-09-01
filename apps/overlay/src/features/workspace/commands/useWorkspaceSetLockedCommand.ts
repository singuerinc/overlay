import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";
import type { IWorkspace } from "@/features/workspace/types";

export function useWorkspaceSetLockedCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useWorkspaceMutation();

  return {
    execute: (locked: IWorkspace["locked"]) => {
      const command = new Command(
        "Workspace - Set locked state",
        () =>
          mutation.mutateAsync({
            locked,
          }),
        () => Promise.resolve(void 0)
      );
      executeCommand(command, true);
    },
  };
}
