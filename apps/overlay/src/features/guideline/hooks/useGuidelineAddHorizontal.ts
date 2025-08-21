import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { useAddGuidelineCommand } from "@/features/guideline/store/useAddGuidelineCommand";
import { useWindowSize } from "usehooks-ts";

export function useGuidelineAddHorizontal() {
  const command = useAddGuidelineCommand();
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
