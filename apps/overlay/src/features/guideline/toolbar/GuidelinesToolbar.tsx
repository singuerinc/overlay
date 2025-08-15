import { IconBorderHorizontal, IconBorderVertical } from "@tabler/icons-react";
import { GUIDELINE_HORIZONTAL, GUIDELINE_VERTICAL } from "../types";

import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { createVerticalGuideline } from "@/features/guideline/store/createVerticalGuideline";
import { useAddGuidelineCommand } from "../../../features/guideline/store/useAddGuidelineCommand";
import { useSelectedTool } from "../../../features/tools/store/tools";
import { ToolButton } from "../../../ui/ToolButton";
import { GuidelineToolbar } from "../toolbar/GuidelineToolbar";

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
