import { Command } from "@/features/commands/Command";
import { useCommandExecute } from "@/features/commands/hooks/useCommandExecute";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { useQueryClient } from "@tanstack/react-query";
import type { IGuideline } from "../types";
import { GUIDELINES_KEYS } from "./guidelinesKeys";

export function useGuidelineMoveCommand() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();
  const mutation = useGuidelineMutation();
  const executeCommand = useCommandExecute();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (id: IGuideline["id"], position: { x: number; y: number }) => {
      const guideline = queryClient.getQueryData<IGuideline>(
        GUIDELINES_KEYS.guideline(presetId, id)
      );

      const command = new Command(
        "Guideline - Move",
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
