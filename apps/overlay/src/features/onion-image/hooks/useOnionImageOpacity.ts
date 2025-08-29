import { useOnionImageOpacityCommand } from "@/features/onion-image/store/useOnionImageOpacityCommand";
import type { IOnionImage } from "@/features/onion-image/types";

export function useOnionImageOpacity() {
  const cmd = useOnionImageOpacityCommand();
  return {
    set: (onionImage: IOnionImage, opacity: number) => {
      cmd.execute(onionImage, opacity);
    },
  };
}
