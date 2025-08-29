import { useOnionImageMoveCommand } from "@/features/onion-image/store/useOnionImageMoveCommand";
import type { IOnionImage } from "@/features/onion-image/types";

export function useOnionImageMove() {
  const cmd = useOnionImageMoveCommand();
  return {
    move: (id: IOnionImage["id"], { x, y }: { x: number; y: number }) => {
      cmd.execute(id, { x, y });
    },
  };
}
