import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { useGuidelineAddCommand } from "@/features/guideline/store/useGuidelineAddCommand";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconTablePlus } from "@tabler/icons-react";

export function GuidelinesAddButton() {
  const cmd = useGuidelineAddCommand();

  return (
    <ToolBoxLabeledButton
      label="Add 1"
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
