import { useOnionImageRemoveCommand } from "@/features/onion-image/store/useOnionImageRemoveCommand";
import type { IOnionImage } from "@/features/onion-image/types";

export function useOnionImageDelete() {
  const command = useOnionImageRemoveCommand();
  return {
    delete: (onionImage: IOnionImage) => {
      command.execute(onionImage);
    },
  };
}
