import { IconBorderHorizontal, IconBorderVertical } from "@tabler/icons-react";
import {
  GUIDELINE_HORIZONTAL,
  GUIDELINE_VERTICAL,
  type IHorizontalGuideline,
  type IVerticalGuideline,
} from "../types";

import { v4 as uuidv4 } from "uuid";
import { useAddGuidelineCommand } from "../../../features/guideline/store/useAddGuidelineCommand";
import { useSelectedTool } from "../../../features/tools/store/tools";
import { ToolButton } from "../../../ui/ToolButton";
import { GuidelineToolbar } from "../toolbar/GuidelineToolbar";

const createHorizontalGuideline = (): IHorizontalGuideline => ({
  id: uuidv4(),
  type: "guideline-horizontal",
  y: 100,
  x: 0,
  color: "cyan",
});

const createVerticalGuideline = (): IVerticalGuideline => ({
  id: uuidv4(),
  type: "guideline-vertical",
  x: 100,
  y: 0,
  color: "cyan",
});

export function GuidelinesToolbar() {
  const selectedTool = useSelectedTool();
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
      {selectedTool && selectedTool.type === GUIDELINE_HORIZONTAL && (
        <GuidelineToolbar />
      )}
      <ToolButton
        enabled={true}
        Icon={<IconBorderVertical />}
        onClick={() => {
          const guideline = createVerticalGuideline();
          addGuidelineCommand.execute(guideline);
        }}
      />
      {selectedTool && selectedTool.type === GUIDELINE_VERTICAL && (
        <GuidelineToolbar />
      )}
    </div>
  );
}
