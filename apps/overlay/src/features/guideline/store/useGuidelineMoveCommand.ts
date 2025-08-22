import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useFrameActiveId } from "@/features/frame/hooks/useFrameActiveId";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { useQueryClient } from "@tanstack/react-query";
import type { IGuideline } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useGuidelineMoveCommand() {
  const frameId = useFrameActiveId();
  const queryClient = useQueryClient();
  const mutation = useGuidelineMutation();
  const executeCommand = useCommandExecute();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (id: string, position: { x: number; y: number }) => {
      const guideline = queryClient.getQueryData<IGuideline>(
        GUIDELINES_KEYS.guideline(frameId, id)
      );

      const command = new Command(
        () => {
          if (guideline) {
            mutation.mutate({
              id: guideline.id,
              x: position.x,
              y: position.y,
            });
          }
        },
        () => {
          if (guideline) {
            const pItem = { ...guideline, y: guideline.y, x: guideline.x };
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
