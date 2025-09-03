import { Command } from "@/features/commands/Command";
import { useCommands } from "@/features/commands/hooks/useCommands";
import { useCoords } from "@/features/coords/hooks/useCoords";
import { useGuidelineMutation } from "@/features/guideline/store/useGuidelineMutation";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import {
  GUIDELINE_HORIZONTAL,
  GUIDELINE_VERTICAL,
  type IGuideline,
} from "../types";

export function useGuidelineRotateCommand() {
  const { setX, setY } = useCoords();
  const { execute: executeCommand } = useCommands();
  const mutation = useGuidelineMutation();
  const setSelectedTool = useSetSelectedTool();

  return {
    execute: (guideline: IGuideline) => {
      const command = new Command(
        "Guideline - Rotate",
        () =>
          mutation
            .mutateAsync({
              id: guideline.id,
              x: guideline.y,
              y: guideline.x,
              type:
                guideline.type === GUIDELINE_VERTICAL
                  ? GUIDELINE_HORIZONTAL
                  : GUIDELINE_VERTICAL,
            })
            .then((g) => {
              if (g?.type === GUIDELINE_VERTICAL) {
                setX(g?.x);
                setY(null);
              } else if (g?.type === GUIDELINE_HORIZONTAL) {
                setX(null);
                setY(g?.y);
              }
            }),
        () =>
          mutation
            .mutateAsync({
              id: guideline.id,
              x: guideline.y,
              y: guideline.x,
              type:
                guideline.type === GUIDELINE_VERTICAL
                  ? GUIDELINE_HORIZONTAL
                  : GUIDELINE_VERTICAL,
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
            })
      );
      return executeCommand(command);
    },
  };
}
