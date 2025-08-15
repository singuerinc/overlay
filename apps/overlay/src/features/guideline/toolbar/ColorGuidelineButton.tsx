import { type GuidelineColorType } from "@/features/guideline/GuidelineColor";
import { useColorGuidelineCommand } from "@/features/guideline/store/useColorGuidelineCommand";
import { useSelectedTool } from "@/features/tools/store/tools";
import { ToolButton } from "@/ui/ToolButton";
import { IconCircle } from "@tabler/icons-react";
import { useState } from "react";
import { type IGuideline } from "../types";

const colors: GuidelineColorType[] = ["cyan", "red", "green"];

const fillByColor = {
  cyan: "fill-cyan-400",
  red: "fill-red-400",
  green: "fill-green-400",
};

export function ColorGuidelineButton() {
  const selectedTool = useSelectedTool<IGuideline>();
  const colorGuidelineCommand = useColorGuidelineCommand();
  const [color, setColor] = useState(selectedTool?.color || "cyan");

  const handleClick = () => {
    const newColor = colors[(colors.indexOf(color) + 1) % colors.length];
    setColor(newColor);
    const guideline = { ...selectedTool } as IGuideline;
    colorGuidelineCommand.execute(guideline, newColor);
  };

  return (
    <ToolButton
      enabled={true}
      Icon={<IconCircle size={16} className={fillByColor[color]} />}
      onClick={handleClick}
    />
  );
}
