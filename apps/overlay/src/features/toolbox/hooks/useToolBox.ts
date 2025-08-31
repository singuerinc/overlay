import { useToolBoxMoveCommand } from "@/features/toolbox/commands/useToolBoxMoveCommand";
import { useToolBoxToggleCommand } from "@/features/toolbox/commands/useToolBoxToggleCommand";
import { useToolBoxQuery } from "@/features/toolbox/store/useToolBoxQuery";
import { useCallback } from "react";

export function useToolBox() {
  const { data: toolBox } = useToolBoxQuery();
  const moveCmd = useToolBoxMoveCommand();
  const toggleCmd = useToolBoxToggleCommand();

  const move = useCallback(
    (x: number, y: number) => {
      if (toolBox) {
        moveCmd.execute(Math.floor(x), Math.floor(y));
      }
    },
    [toolBox, moveCmd]
  );

  return { move, toggle: toggleCmd.execute };
}
