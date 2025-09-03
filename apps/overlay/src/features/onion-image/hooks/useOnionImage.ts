import { useOnionImageCycleFilterCommand } from "@/features/onion-image/commands/useOnionImageCycleFilterCommand";
import { useOnionImageLockCommand } from "@/features/onion-image/commands/useOnionImageLockCommand";
import { useOnionImageMoveCommand } from "@/features/onion-image/commands/useOnionImageMoveCommand";
import { useOnionImageOpacityCommand } from "@/features/onion-image/commands/useOnionImageOpacityCommand";
import { useOnionImageRemoveCommand } from "@/features/onion-image/commands/useOnionImageRemoveCommand";
import { useOnionImageSetScaleCommand } from "@/features/onion-image/commands/useOnionImageSetScaleCommand";
import { useOnionImageToggleVisibilityCommand } from "@/features/onion-image/commands/useOnionImageToggleVisibilityCommand";
import type {
  IOnionImage,
  OnionImageScaleType,
} from "@/features/onion-image/types";

export function useOnionImage() {
  const setOpacityCmd = useOnionImageOpacityCommand();
  const moveCmd = useOnionImageMoveCommand();
  const removeCmd = useOnionImageRemoveCommand();
  const cycleFilterCmd = useOnionImageCycleFilterCommand();
  const lockCmd = useOnionImageLockCommand();
  const toggleVisibilityCmd = useOnionImageToggleVisibilityCommand();
  const setScaleCmd = useOnionImageSetScaleCommand();

  return {
    setScale: (onionImage: IOnionImage, scale: OnionImageScaleType) => {
      setScaleCmd.execute(onionImage, scale);
    },
    toggleVisibility: (onionImage: IOnionImage) => {
      toggleVisibilityCmd.execute(onionImage, !onionImage.visible);
    },
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
