import { useRulerSetOriginCommand } from "@/features/rulers/store/useRulerSetOriginCommand";
import { useWindowSize } from "usehooks-ts";

export function useRulerSetOrigin() {
  const windowSize = useWindowSize();
  const setOriginRulerCommand = useRulerSetOriginCommand();
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
