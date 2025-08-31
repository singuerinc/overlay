import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { useGuidelineAddCommand } from "@/features/guideline/store/useGuidelineAddCommand";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconPlus } from "@tabler/icons-react";

export function GuidelinesAddButton() {
  const cmd = useGuidelineAddCommand();

  return (
    <ToolBoxLabeledButton
      className="o:col-span-2"
      label="Add Guideline"
      Icon={<IconPlus size={16} />}
      onClick={() => {
        const guideline = createHorizontalGuideline({
          y: window.innerHeight / 2,
        });
        cmd.execute(guideline);
      }}
    />
  );
}
