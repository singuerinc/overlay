import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { useSetOriginRulerCommand } from "@/features/rulers/store/useSetOriginRulerCommand";
import { ToolButton } from "@/ui/ToolButton";
import { IconFocusCentered } from "@tabler/icons-react";
import { useWindowSize } from "usehooks-ts";

export function CenterOriginRulerButton() {
  const windowSize = useWindowSize();
  const setOriginRulerCommand = useSetOriginRulerCommand();
  const { data: ruler } = useGetRulerQuery();

  const handleClick = () => {
    const originX = windowSize.width * 0.5;
    const originY = windowSize.height * 0.5;

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
