import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useFrameMutation } from "@/features/frames/store/useFrameMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IFrame } from "../types";

export function useFrameLockCommand() {
  const { execute: executeCommand } = useCommands();
  const mutation = useFrameMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (frame: IFrame, locked: boolean) => {
      const prevLocked = frame.locked;
      const command = new Command(
        "Frame - Lock",
        () =>
          mutation.mutateAsync({
            id: frame.id,
            locked,
          }),
        () =>
          mutation
            .mutateAsync({
              id: frame.id,
              locked: prevLocked,
            })
            .then(() => {
              setSelectedTool(frame);
            })
      );
      return executeCommand(command);
    },
  };
}
