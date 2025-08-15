import { useRemoveGuidelineCommand } from "@/features/guideline/store/useRemoveGuidelineCommand";
import { useSelectedTool } from "@/features/tools/store/tools";
import { ToolButton } from "@/ui/ToolButton";
import { IconTrash } from "@tabler/icons-react";
import { type IGuideline } from "../types";

export function RemoveGuidelineButton() {
  const selectedTool = useSelectedTool();
  const removeGuidelineCommand = useRemoveGuidelineCommand();
  return (
    <ToolButton
      enabled={true}
      Icon={<IconTrash />}
      onClick={() => {
        const guideline = { ...selectedTool } as IGuideline;
        removeGuidelineCommand.execute(guideline);
      }}
    />
  );
}
