import { useToolBoxMoveCommand } from "@/features/toolbox/store/useToolBoxMoveCommand";
import { useToolBoxQuery } from "@/features/toolbox/store/useToolBoxQuery";
import { useCallback } from "react";

export function useToolBoxMove() {
  const { data: toolBox } = useToolBoxQuery();
  const { execute } = useToolBoxMoveCommand();

  const move = useCallback(
    (x: number, y: number) => {
      if (toolBox) {
        execute(Math.floor(x), Math.floor(y));
      }
    },
    [toolBox, execute]
  );

  return { move };
}
