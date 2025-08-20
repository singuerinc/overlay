import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { useSetOriginRulerCommand } from "@/features/rulers/store/useSetOriginRulerCommand";
import { ToolButton } from "@/ui/ToolButton";
import { IconFocusCentered } from "@tabler/icons-react";

export function CenterOriginRulerButton() {
  const setOriginRulerCommand = useSetOriginRulerCommand();
  const { data: ruler } = useGetRulerQuery();

  const handleClick = () => {
    const originX = 0; //window.innerWidth * 0.5;
    const originY = 0; //window.innerHeight * 0.5;

    if (ruler) {
      setOriginRulerCommand.execute(originX, originY);
    }
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconFocusCentered />}
      onClick={handleClick}
    />
  );
}
