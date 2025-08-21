import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { useGuidelineAddCommand } from "@/features/guideline/store/useGuidelineAddCommand";
import { IconTablePlus } from "@tabler/icons-react";
import { ToolButton } from "../../../ui/ToolButton";

export function GuidelinesAddButton() {
  const cmd = useGuidelineAddCommand();

  return (
    <ToolButton
      Icon={<IconTablePlus />}
      onClick={() => {
        const guideline = createHorizontalGuideline({
          y: window.innerHeight / 2,
        });
        cmd.execute(guideline);
      }}
    />
  );
}
