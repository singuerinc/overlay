import { useGuidelines } from "@/features/guideline/hooks/useGuidelines";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconPlus } from "@tabler/icons-react";

export function GuidelinesAddButton() {
  const { addHorizontal } = useGuidelines();

  return (
    <ToolBoxLabeledButton
      className="o:col-span-2"
      label="Add Guideline"
      Icon={<IconPlus size={16} />}
      onClick={() => {
        addHorizontal();
      }}
    />
  );
}
