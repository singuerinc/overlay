import { CROSSHAIR_KEYS } from "@/features/crosshair/store/crosshairKeys";
import { useMoveCrosshairMutation } from "@/features/crosshair/store/useMoveCrosshairMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import type { Coordinates } from "@dnd-kit/core/dist/types";
import { useQueryClient } from "@tanstack/react-query";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";
import type { ICrosshairStore } from "../types";

export function useMoveCrosshairCommand() {
  const queryClient = useQueryClient();
  const mutation = useMoveCrosshairMutation();
  const executeCommand = useExecuteCommand();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (id: string, delta: Coordinates) => {
      const crosshairList = queryClient.getQueryData<ICrosshairStore>(
        CROSSHAIR_KEYS.crosshair
      );
      const activeItem = crosshairList.find((item) => item.id === id);
      const command = new Command(
        () => {
          mutation.mutate({
            id: activeItem.id,
            x: activeItem.x + delta.x,
            y: activeItem.y + delta.y,
          });
        },
        () => {
          const pItem = { ...activeItem, y: activeItem.y, x: activeItem.x };
          mutation.mutate({
            id: pItem.id,
            x: pItem.x,
            y: pItem.y,
          });
          setSelectedTool(pItem);
        }
      );

      executeCommand(command);
    },
  };
}
