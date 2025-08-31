import {
  CrosshairColors,
  type CrosshairColorType,
} from "@/features/crosshair/CrosshairColor";
import { useCrosshair } from "@/features/crosshair/hooks/useCrosshair";
import { useCrosshairQuery } from "@/features/crosshair/store/useCrosshairQuery";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { cn } from "@/ui/cn";
import { IconCircle } from "@tabler/icons-react";
import { useCallback } from "react";

const fillByColor = {
  cyan: "o:fill-cyan-400",
  red: "o:fill-red-400",
  green: "o:fill-green-400",
};

export function CrosshairColorButton() {
  const { data: crosshair } = useCrosshairQuery();
  const { setColor } = useCrosshair();
  const color: CrosshairColorType = crosshair?.color || CrosshairColors[0];

  const handleClick = useCallback(() => {
    const newColor =
      CrosshairColors[
        (CrosshairColors.indexOf(color) + 1) % CrosshairColors.length
      ];

    if (crosshair) {
      setColor(newColor);
    }
  }, [color, setColor, crosshair]);

  if (!crosshair) {
    return null;
  }

  return (
    <ToolBoxLabeledButton
      label="Color"
      Icon={
        <IconCircle className={cn(fillByColor[color], "o:text-transparent")} />
      }
      onClick={handleClick}
    />
  );
}
