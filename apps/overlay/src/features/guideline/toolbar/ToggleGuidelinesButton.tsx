import { useGetGuidelinesQuery } from "@/features/guideline/store/useGetGuidelinesQuery";
import { useToggleGuidelinesCommand } from "@/features/guideline/store/useToggleGuidelinesCommand";
import { ToolButton } from "@/ui/ToolButton";
import { IconTable } from "@tabler/icons-react";

export function ToggleGuidelinesButton() {
  const { data: guidelines } = useGetGuidelinesQuery();
  const toggleGuidelinesCommand = useToggleGuidelinesCommand();

  return (
    <ToolButton
      activated={guidelines?.isGuidelinesVisible}
      enabled={true}
      Icon={<IconTable />}
      onClick={() => {
        toggleGuidelinesCommand.execute(!guidelines?.isGuidelinesVisible);
      }}
    />
  );
}
