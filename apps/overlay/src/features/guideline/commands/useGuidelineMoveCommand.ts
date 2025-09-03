import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useCoords } from "@/features/coords/hooks/useCoords";
import { GUIDELINES_KEYS } from "@/features/guideline/store/guidelinesKeys";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { useQueryClient } from "@tanstack/react-query";
import {
  GUIDELINE_HORIZONTAL,
  GUIDELINE_VERTICAL,
  type IGuideline,
} from "../types";

export function useGuidelineMoveCommand() {
  const { setX, setY } = useCoords();
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();
  const mutation = useGuidelineMutation();
  const { execute: executeCommand } = useCommands();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (id: IGuideline["id"], position: { x: number; y: number }) => {
      const guideline = queryClient.getQueryData<IGuideline>(
        GUIDELINES_KEYS.guideline(presetId, id)
      );

      const command = new Command(
        "Guideline - Move",
        () => {
          return new Promise((resolve, reject) => {
            if (guideline) {
              mutation
                .mutateAsync({
                  id: guideline.id,
                  x: position.x,
                  y: position.y,
                })
                .then((g) => {
                  if (g) {
                    if (g.type === GUIDELINE_VERTICAL) {
                      setX(g.x);
                      setY(null);
                    } else if (g.type === GUIDELINE_HORIZONTAL) {
                      setX(null);
                      setY(g.y);
                    }
                  }
                  resolve(void 0);
                });
            } else {
              reject();
            }
          });
        },
        () => {
          return new Promise((resolve, reject) => {
            if (guideline) {
              const pItem = { ...guideline, y: guideline.y, x: guideline.x };
              mutation
                .mutateAsync({
                  id: pItem.id,
                  x: pItem.x,
                  y: pItem.y,
                })
                .then((g) => {
                  if (g) {
                    setSelectedTool(g);
                    if (g.type === GUIDELINE_VERTICAL) {
                      setX(g.x);
                      setY(null);
                    } else if (g.type === GUIDELINE_HORIZONTAL) {
                      setX(null);
                      setY(g.y);
                    }
                  }
                  resolve(g);
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
