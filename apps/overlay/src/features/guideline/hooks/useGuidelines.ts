import { useGuidelineAddCommand } from "@/features/guideline/commands/useGuidelineAddCommand";
import { useGuidelinesToggleCommand } from "@/features/guideline/commands/useGuidelinesToggleCommand";
import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { createVerticalGuideline } from "@/features/guideline/store/createVerticalGuideline";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { useCallback } from "react";
import { useWindowSize } from "usehooks-ts";

export function useGuidelines() {
  const addCmd = useGuidelineAddCommand();
  const windowSize = useWindowSize();
  const { data: guidelines } = useGuidelinesQuery();
  const toggleCmd = useGuidelinesToggleCommand();
  const toggle = useCallback(() => {
    return toggleCmd.execute(!guidelines?.visible);
  }, [guidelines, toggleCmd]);

  return {
    visible: guidelines?.visible ?? false,
    toggle,
    addHorizontal: () =>
      addCmd.execute(
        createHorizontalGuideline({
          y: windowSize.height / 2,
        })
      ),
    addVertical: () =>
      addCmd.execute(
        createVerticalGuideline({
          x: windowSize.width / 2,
        })
      ),
  };
}
