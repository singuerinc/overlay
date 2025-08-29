import { useGuidelinesToggle } from "@/features/guideline/hooks/useGuidelinesToggle";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { ToolBoxInputBoolean } from "@/features/toolbox/components/ToolBoxInputBoolean";

export function GuidelinesToggleButton() {
  const { data: guidelines } = useGuidelinesQuery();

  const { toggle } = useGuidelinesToggle();

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
