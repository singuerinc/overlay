import { useActiveFrameId } from "@/appStore";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { useQueryClient } from "@tanstack/react-query";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";
import type { IGuideLineStore } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";
import { useMoveGuidelineMutation } from "./useMoveGuidelineMutation";

export function useMoveGuidelineCommand() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();
  const mutation = useMoveGuidelineMutation();
  const executeCommand = useExecuteCommand();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (id: string, position: { x: number; y: number }) => {
      const guidelines = queryClient.getQueryData<IGuideLineStore>(
        GUIDELINES_KEYS.guidelines(frameId)
      );
      const activeItem = guidelines?.guidelines.find((item) => item.id === id);
      const command = new Command(
        () => {
          if (activeItem) {
            mutation.mutate({
              id: activeItem.id,
              x: position.x,
              y: position.y,
            });
          }
        },
        () => {
          if (activeItem) {
            const pItem = { ...activeItem, y: activeItem.y, x: activeItem.x };
            mutation.mutate({
              id: pItem.id,
              x: pItem.x,
              y: pItem.y,
            });
            setSelectedTool(pItem);
          }
        }
      );

      executeCommand(command);
    },
  };
}
