import { useGridSetOpacityCommand } from "@/features/grid/store/useGridSetOpacityCommand";
import { useCallback } from "react";

export function useGridSetOpacity() {
  const cmd = useGridSetOpacityCommand();

  const set = useCallback(
    (opacity: number) => {
      cmd.execute(opacity);
    },
    [cmd]
  );

  return { set };
}
