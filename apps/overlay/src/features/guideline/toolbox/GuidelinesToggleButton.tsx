import { useGuidelinesToggle } from "@/features/guideline/hooks/useGuidelinesToggle";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconTable } from "@tabler/icons-react";

export function GuidelinesToggleButton() {
  const { data: guidelines } = useGuidelinesQuery();

  const { toggle } = useGuidelinesToggle();

  return (
    <ToolButton
      activated={guidelines?.visible}
      enabled={true}
      Icon={<IconTable />}
      onClick={() => {
        toggle();
      }}
    />
  );
}
