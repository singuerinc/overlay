import type { CrosshairColorType } from "@/features/crosshair/CrosshairColor";
import { useColorCrosshairCommand } from "@/features/crosshair/store/useColorCrosshairCommand";
import { useGetCrosshairQuery } from "@/features/crosshair/store/useGetCrosshairQuery";
import { useSelectedTool } from "@/features/tools/store/tools";
import { ToolButton } from "@/ui/ToolButton";
import { IconCircle } from "@tabler/icons-react";
import { type ICrosshair } from "../types";

const colors: CrosshairColorType[] = ["cyan", "red", "green"];

const fillByColor = {
  cyan: "text-cyan-400",
  red: "text-red-400",
  green: "text-green-400",
};

export function ColorCrosshairButton() {
  const selectedTool = useSelectedTool<ICrosshair>();
  const colorCrosshairCommand = useColorCrosshairCommand();
  const { data } = useGetCrosshairQuery();
  const crosshair = data?.find((g) => g.id === selectedTool.id);
  const color = crosshair?.color || "cyan";

  const handleClick = () => {
    const newColor = colors[(colors.indexOf(color) + 1) % colors.length];
    const crosshair = { ...selectedTool } as ICrosshair;
    colorCrosshairCommand.execute(crosshair, newColor);
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconCircle className={fillByColor[color]} />}
      onClick={handleClick}
    />
  );
}
