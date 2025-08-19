import { useActiveFrameId } from "@/appStore";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { useToggleRulerCommand } from "@/features/rulers/store/useToggleRulerCommand";
import { ToolButton } from "@/ui/ToolButton";
import { IconRuler } from "@tabler/icons-react";

export function ToggleRulerButton() {
  const frameId = useActiveFrameId();
  const toggleRulerCommand = useToggleRulerCommand({ frameId });
  const { data: ruler } = useGetRulerQuery();

  const handleClick = () => {
    if (ruler) {
      toggleRulerCommand.execute(!ruler.visible);
    }
  };

  return (
    <ToolButton
      activated={ruler?.visible}
      enabled={true}
      Icon={<IconRuler />}
      onClick={handleClick}
    />
  );
}
