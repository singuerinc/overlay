import { useFrameMoveCommand } from "@/features/frames/commands/useFrameMoveCommand";
import { useFrameRemoveCommand } from "@/features/frames/commands/useFrameRemoveCommand";
import type { IFrame } from "@/features/frames/types";

export function useFrame() {
  const moveCmd = useFrameMoveCommand();
  const removeCmd = useFrameRemoveCommand();

  return {
    move: (frameId: IFrame["id"], { x, y }: { x: number; y: number }) => {
      moveCmd.execute(frameId, { x, y });
    },
    remove: (frame: IFrame) => {
      removeCmd.execute(frame);
    },
  };
}
