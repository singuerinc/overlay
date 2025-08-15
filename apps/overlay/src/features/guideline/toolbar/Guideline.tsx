import { IconCircle, IconTrash } from "@tabler/icons-react";
import { type IGuideline } from "../types";

import { useRemoveGuidelineCommand } from "../../../features/guideline/store/useRemoveGuidelineCommand";
import { useSelectedTool } from "../../../features/tools/store/tools";
import { ToolButton } from "../../../ui/ToolButton";

export function Guideline() {
  const selectedTool = useSelectedTool();
  const removeGuidelineCommand = useRemoveGuidelineCommand();

  if (
    selectedTool === null ||
    (selectedTool.type !== "guideline-horizontal" &&
      selectedTool.type !== "guideline-vertical")
  ) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-1 bg-neutral-700 px-1 rounded-sm">
      <ToolButton
        enabled={selectedTool !== null}
        Icon={<IconTrash size={16} />}
        onClick={() => {
          const guideline = { ...selectedTool } as IGuideline;
          removeGuidelineCommand.execute(guideline);
        }}
      />
      <ToolButton
        enabled={selectedTool !== null}
        Icon={<IconCircle size={16} />}
        onClick={() => {
          //
        }}
      />
    </div>
  );
}
