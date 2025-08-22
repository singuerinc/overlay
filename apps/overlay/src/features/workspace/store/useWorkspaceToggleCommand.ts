import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";

export function useWorkspaceToggleCommand() {
  const executeCommand = useCommandExecute();
  const mutation = useWorkspaceMutation();

  return {
    execute: () => {
      const command = new Command(
        () => {
          mutation.mutate({});
        },
        () => {
          mutation.mutate({});
        }
      );
      executeCommand(command, true);
    },
  };
}
