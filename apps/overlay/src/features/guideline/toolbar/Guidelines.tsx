import { IconBorderHorizontal, IconBorderVertical } from "@tabler/icons-react";
import { type IHorizontalGuideline, type IVerticalGuideline } from "../types";

import { v4 as uuidv4 } from "uuid";
import { useAddGuidelineCommand } from "../../../features/guideline/store/useAddGuidelineCommand";
import { ToolButton } from "../../../ui/ToolButton";
import { Guideline } from "../toolbar/Guideline";

const createHorizontalGuideline = (): IHorizontalGuideline => ({
  id: uuidv4(),
  type: "guideline-horizontal",
  y: 100,
  color: "cyan",
});

const createVerticalGuideline = (): IVerticalGuideline => ({
  id: uuidv4(),
  type: "guideline-vertical",
  x: 100,
  color: "cyan",
});

export function Guidelines() {
  const addGuidelineCommand = useAddGuidelineCommand();

  return (
    <div className="flex gap-x-1">
      <ToolButton
        enabled={true}
        Icon={<IconBorderHorizontal />}
        onClick={() => {
          const guideline = createHorizontalGuideline();
          addGuidelineCommand.execute(guideline);
        }}
      />
      <Guideline />
      <ToolButton
        enabled={true}
        Icon={<IconBorderVertical />}
        onClick={() => {
          const guideline = createVerticalGuideline();
          addGuidelineCommand.execute(guideline);
        }}
      />
    </div>
  );
}
