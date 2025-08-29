import { useColumnsSetSizeCommand } from "@/features/columns/store/useColumnsSetSizeCommand";
import type { IColumns } from "@/features/columns/types";

export function useColumnsSetSize() {
  const cmd = useColumnsSetSizeCommand();

  return {
    set: (size: IColumns["size"]) => {
      cmd.execute(size);
    },
  };
}
