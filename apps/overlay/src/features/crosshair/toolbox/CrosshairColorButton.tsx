import {
  CrosshairColors,
  type CrosshairColorType,
} from "@/features/crosshair/CrosshairColor";
import { useCrosshairColorCommand } from "@/features/crosshair/store/useCrosshairColorCommand";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { cn } from "@/ui/cn";
import { ToolButton } from "@/ui/ToolButton";
import { IconCircle } from "@tabler/icons-react";
import { useCallback } from "react";

const fillByColor = {
  cyan: "overlay:fill-cyan-400",
  red: "overlay:fill-red-400",
  green: "overlay:fill-green-400",
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
      enabled={true}
      Icon={
        <IconCircle
          className={cn(fillByColor[color], "overlay:text-transparent")}
        />
      }
      onClick={handleClick}
    />
  );
}
