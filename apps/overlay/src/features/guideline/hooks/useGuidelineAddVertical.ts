import { createVerticalGuideline } from "@/features/guideline/store/createVerticalGuideline";
import { useGuidelineAddCommand } from "@/features/guideline/store/useGuidelineAddCommand";
import { useWindowSize } from "usehooks-ts";

export function useGuidelineAddVertical() {
  const command = useGuidelineAddCommand();
  const windowSize = useWindowSize();
  return {
    add: () =>
      command.execute(
        createVerticalGuideline({
          x: windowSize.width / 2,
        })
      ),
  };
}
