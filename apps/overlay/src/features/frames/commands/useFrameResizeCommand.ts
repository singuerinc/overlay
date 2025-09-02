import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { FRAMES_KEYS } from "@/features/frames/store/framesKeys";
import { useFrameMutation } from "@/features/frames/store/useFrameMutation";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { useQueryClient } from "@tanstack/react-query";
import type { IFrame } from "../types";

export function useFrameResizeCommand() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();
  const mutation = useFrameMutation();
  const { execute: executeCommand } = useCommands();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (id: IFrame["id"], size: { width: number; height: number }) => {
      const frame = queryClient.getQueryData<IFrame>(
        FRAMES_KEYS.frame(presetId, id)
      );

      const command = new Command(
        "Frame - Resize",
        () => {
          return new Promise((resolve, reject) => {
            if (frame) {
              mutation
                .mutateAsync({
                  id: frame.id,
                  width: size.width,
                  height: size.height,
                })
                .then(() => resolve(void 0));
            } else {
              reject();
            }
          });
        },
        () => {
          return new Promise((resolve, reject) => {
            if (frame) {
              const pItem = { ...frame, y: frame.y, x: frame.x };
              mutation
                .mutateAsync({
                  id: pItem.id,
                  width: pItem.width,
                  height: pItem.height,
                })
                .then(() => {
                  setSelectedTool(pItem);
                  resolve(pItem);
                });
            } else {
              reject();
            }
          });
        }
      );

      return executeCommand(command);
    },
  };
}
