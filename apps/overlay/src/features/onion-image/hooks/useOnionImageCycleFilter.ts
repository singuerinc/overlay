import { useOnionImageCycleFilterCommand } from "@/features/onion-image/store/useOnionImageCycleFilterCommand";
import type { IOnionImage } from "@/features/onion-image/types";

export function useOnionImageCycleFilter() {
  const cmd = useOnionImageCycleFilterCommand();
  return {
    cycle: (id: IOnionImage["id"]) => {
      cmd.execute(id);
    },
  };
}
