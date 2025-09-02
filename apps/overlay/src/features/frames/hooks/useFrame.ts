import { useFrameLockCommand } from "@/features/frames/commands/useFrameLockCommand";
import { useFrameMoveCommand } from "@/features/frames/commands/useFrameMoveCommand";
import { useFrameRemoveCommand } from "@/features/frames/commands/useFrameRemoveCommand";
import { useFrameResizeCommand } from "@/features/frames/commands/useFrameResizeCommand";
import type { IFrame } from "@/features/frames/types";

export function useFrame() {
  const moveCmd = useFrameMoveCommand();
  const lockCmd = useFrameLockCommand();
  const removeCmd = useFrameRemoveCommand();
  const resizeCmd = useFrameResizeCommand();

  return {
    toggleLock: (frame: IFrame) => {
      lockCmd.execute(frame, !frame.locked);
    },
    resize: (frameId: IFrame["id"], { width, height }: { width: number; height: number }) => {
      resizeCmd.execute(frameId, { width, height });
    },
    move: (frameId: IFrame["id"], { x, y }: { x: number; y: number }) => {
      moveCmd.execute(frameId, { x, y });
    },
    remove: (frame: IFrame) => {
      removeCmd.execute(frame);
    },
  };
}
