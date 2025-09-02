import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useFrameAddMutation } from "@/features/frames/store/useFrameAddMutation";
import { useFrameRemoveMutation } from "@/features/frames/store/useFrameRemoveMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { type IFrame } from "../types";

export function useFrameAddCommand() {
  const setSelectedTool = useSetSelectedTool();
  const { execute: executeCommand } = useCommands();
  const addFrame = useFrameAddMutation();
  const removeFrame = useFrameRemoveMutation();

  return {
    execute: (frame: IFrame) => {
      const command = new Command(
        "Frames - Add one",
        () =>
          addFrame
            .mutateAsync({
              frame,
            })
            .then(() => {
              setSelectedTool(frame);
            }),
        () =>
          removeFrame
            .mutateAsync({
              frame,
            })
            .then(() => {
              setSelectedTool(null);
            })
      );
      return executeCommand(command);
    },
  };
}
