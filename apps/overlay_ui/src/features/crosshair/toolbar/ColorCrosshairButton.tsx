import {
  CrosshairColors,
  type CrosshairColorType,
} from "@/features/crosshair/CrosshairColor";
import { useColorCrosshairCommand } from "@/features/crosshair/store/useColorCrosshairCommand";
import { useGetCrosshairQuery } from "@/features/crosshair/store/useGetCrosshairQuery";
import { ToolButton } from "@/ui/ToolButton";
import { IconCircle } from "@tabler/icons-react";
import { useCallback } from "react";

const fillByColor = {
  cyan: "text-cyan-400",
  red: "text-red-400",
  green: "text-green-400",
};

export function ColorCrosshairButton() {
  const colorCrosshairCommand = useColorCrosshairCommand();
  const { data: crosshair } = useGetCrosshairQuery();
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
