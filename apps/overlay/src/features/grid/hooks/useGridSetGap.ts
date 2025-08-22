import { useGridSetGapCommand } from "@/features/grid/store/useGridSetGapCommand";
import { useCallback } from "react";

export function useGridSetGap() {
  const cmd = useGridSetGapCommand();

  const set = useCallback(
    (gap: number) => {
      cmd.execute(gap);
    },
    [cmd]
  );

  return { set };
}
