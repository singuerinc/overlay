import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import type { IFrame } from "@/features/frame/types";
import { useWorkspaceMutation } from "@/features/workspace/store/useWorkspaceMutation";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";

export function useWorkspaceAddFrameCommand() {
  const { data: workspace } = useWorkspaceQuery();
  const executeCommand = useCommandExecute();
  const mutation = useWorkspaceMutation();

  return {
    execute: (frame: IFrame) => {
      const command = new Command(
        () => {
          if (workspace) {
            mutation.mutate({
              frames: [...workspace.frames, frame.id],
              activeFrameId: frame.id,
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
