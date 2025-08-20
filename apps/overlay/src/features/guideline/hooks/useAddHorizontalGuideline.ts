import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { useAddGuidelineCommand } from "@/features/guideline/store/useAddGuidelineCommand";
import { useWindowSize } from "usehooks-ts";

export function useAddHorizontalGuideline() {
  const command = useAddGuidelineCommand();
  const windowSize = useWindowSize();
  return {
    addGuideline: () =>
      command.execute(
        createHorizontalGuideline({
          y: windowSize.height / 2,
        })
      ),
  };
}
