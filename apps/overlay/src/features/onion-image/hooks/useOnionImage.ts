import { useOnionImageCycleFilterCommand } from "@/features/onion-image/commands/useOnionImageCycleFilterCommand";
import { useOnionImageLockCommand } from "@/features/onion-image/commands/useOnionImageLockCommand";
import { useOnionImageMoveCommand } from "@/features/onion-image/commands/useOnionImageMoveCommand";
import { useOnionImageOpacityCommand } from "@/features/onion-image/commands/useOnionImageOpacityCommand";
import { useOnionImageRemoveCommand } from "@/features/onion-image/commands/useOnionImageRemoveCommand";
import type { IOnionImage } from "@/features/onion-image/types";

export function useOnionImage() {
  const setOpacityCmd = useOnionImageOpacityCommand();
  const moveCmd = useOnionImageMoveCommand();
  const removeCmd = useOnionImageRemoveCommand();
  const cycleFilterCmd = useOnionImageCycleFilterCommand();
  const lockCmd = useOnionImageLockCommand();

  return {
    toggleLock: (onionImage: IOnionImage) => {
      lockCmd.execute(onionImage, !onionImage.locked);
    },
    cycleFilter: (onionImage: IOnionImage) => {
      cycleFilterCmd.execute(onionImage["id"]);
    },
    remove: (onionImage: IOnionImage) => {
      removeCmd.execute(onionImage);
    },
    move: (id: IOnionImage["id"], { x, y }: { x: number; y: number }) => {
      moveCmd.execute(id, { x, y });
    },
    setOpacity: (onionImage: IOnionImage, opacity: number) => {
      setOpacityCmd.execute(onionImage, opacity);
    },
  };
}
