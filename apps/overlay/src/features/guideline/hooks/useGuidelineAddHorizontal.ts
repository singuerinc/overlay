import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { useGuidelineAddCommand } from "@/features/guideline/store/useGuidelineAddCommand";
import { useWindowSize } from "usehooks-ts";

export function useGuidelineAddHorizontal() {
  const command = useGuidelineAddCommand();
  const windowSize = useWindowSize();
  return {
    add: () =>
      command.execute(
        createHorizontalGuideline({
          y: windowSize.height / 2,
        })
      ),
  };
}
