import { useOnionImageLockCommand } from "@/features/onion-image/store/useOnionImageLockCommand";
import type { IOnionImage } from "@/features/onion-image/types";

export function useOnionImageToggleLock() {
  const command = useOnionImageLockCommand();
  return {
    toggleLock: (onionImage: IOnionImage) => {
      command.execute(onionImage, !onionImage.locked);
    },
  };
}
