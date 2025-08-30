import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import type { IFrame } from "@/features/frame/types";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";

export function useWorkspaceSetActiveFrameIdCommand() {
  const { data: workspace } = useWorkspaceQuery();
  const executeCommand = useCommandExecute();
  const mutation = useWorkspaceMutation();

  return {
    execute: (frameId: IFrame["id"]) => {
      const command = new Command(
        () => {
          if (workspace) {
            mutation.mutate({
              activeFrameId: frameId,
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
