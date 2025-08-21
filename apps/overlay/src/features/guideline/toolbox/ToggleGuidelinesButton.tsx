import { useGuidelinesToggle } from "@/features/guideline/hooks/useGuidelinesToggle";
import { useGetGuidelinesQuery } from "@/features/guideline/store/useGetGuidelinesQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconTable } from "@tabler/icons-react";

export function ToggleGuidelinesButton() {
  const { data: guidelines } = useGetGuidelinesQuery();

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
