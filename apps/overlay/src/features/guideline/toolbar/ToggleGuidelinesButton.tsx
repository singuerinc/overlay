import { useToggleGuidelines } from "@/features/guideline/hooks/useToggleGuidelines";
import { useGetGuidelinesQuery } from "@/features/guideline/store/useGetGuidelinesQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconTable } from "@tabler/icons-react";

export function ToggleGuidelinesButton() {
  const { data: guidelines } = useGetGuidelinesQuery();

  const { toggleGuidelines } = useToggleGuidelines();

  return (
    <ToolButton
      activated={guidelines?.visible}
      enabled={true}
      Icon={<IconTable />}
      onClick={() => {
        toggleGuidelines();
      }}
    />
  );
}
