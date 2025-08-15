import type { Coordinates } from "@dnd-kit/core/dist/types";
import { useQueryClient } from "@tanstack/react-query";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";
import type { IGuideLineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";
import { useMoveGuidelineMutation } from "./useMoveGuidelineMutation";

export function useMoveGuidelineCommand() {
  const queryClient = useQueryClient();
  const mutation = useMoveGuidelineMutation();
  const executeCommand = useExecuteCommand();

  return {
    execute: (id: string, delta: Coordinates) => {
      const guidelines = queryClient.getQueryData<IGuideLineStore>(
        GUIDELINES_KEYS.guidelines
      );
      const activeItem = guidelines.find((item) => item.id === id);
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
        }
      );

      executeCommand(command);
    },
  };
}
