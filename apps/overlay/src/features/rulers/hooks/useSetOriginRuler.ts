import { useSetOriginRulerCommand } from "@/features/rulers/store/useSetOriginRulerCommand";
import { useWindowSize } from "usehooks-ts";

export function useSetOriginRuler() {
  const windowSize = useWindowSize();
  const setOriginRulerCommand = useSetOriginRulerCommand();
  const centerX = windowSize.width / 2;
  const centerY = windowSize.height / 2;

  return {
    resetOrigin: () => {
      setOriginRulerCommand.execute(0, 0);
    },
    centerOrigin: () => {
      setOriginRulerCommand.execute(centerX, centerY);
    },
    setOrigin: (x: number, y: number) => {
      setOriginRulerCommand.execute(x, y);
    },
  };
}
