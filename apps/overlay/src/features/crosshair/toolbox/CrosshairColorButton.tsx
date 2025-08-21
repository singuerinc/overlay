import {
  CrosshairColors,
  type CrosshairColorType,
} from "@/features/crosshair/CrosshairColor";
import { useCrosshairColorCommand } from "@/features/crosshair/store/useCrosshairColorCommand";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconCircle } from "@tabler/icons-react";
import { useCallback } from "react";

const fillByColor = {
  cyan: "text-cyan-400",
  red: "text-red-400",
  green: "text-green-400",
};

export function CrosshairColorButton() {
  const colorCrosshairCommand = useCrosshairColorCommand();
  const { data: crosshair } = useCrosshairQuery();
  const color: CrosshairColorType = crosshair?.color || CrosshairColors[0];

  const handleClick = useCallback(() => {
    const newColor =
      CrosshairColors[
        (CrosshairColors.indexOf(color) + 1) % CrosshairColors.length
      ];

    if (crosshair) {
      colorCrosshairCommand.execute(crosshair, newColor);
    }
  }, [color, colorCrosshairCommand, crosshair]);

  if (!crosshair) {
    return null;
  }

  return (
    <ToolButton
      activated={crosshair.visible}
      enabled={true}
      Icon={<IconCircle className={fillByColor[color]} />}
      onClick={handleClick}
    />
  );
}
