import { createVerticalGuideline } from "@/features/guideline/store/createVerticalGuideline";
import { useAddGuidelineCommand } from "@/features/guideline/store/useAddGuidelineCommand";
import { useWindowSize } from "usehooks-ts";

export function useGuidelineAddVertical() {
  const command = useAddGuidelineCommand();
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
