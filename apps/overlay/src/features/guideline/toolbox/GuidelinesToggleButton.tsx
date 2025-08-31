import { useGuidelines } from "@/features/guideline/hooks/useGuidelines";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";

export function GuidelinesToggleButton() {
  const { data: guidelines } = useGuidelinesQuery();
  const { toggle } = useGuidelines();

  return (
    <ToolBoxInputBoolean
      label="Visible"
      defaultValue={guidelines?.visible ?? false}
      onChange={() => {
        toggle();
      }}
    />
  );
}
