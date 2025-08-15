import { GuidelineToolbar } from "@/features/guideline/toolbar/GuidelineToolbar";
import {
  GUIDELINE_HORIZONTAL,
  GUIDELINE_VERTICAL,
} from "@/features/guideline/types";
import { ToolBar } from "@/features/toolbar/ToolBar";
import { useSelectedTool } from "@/features/tools/store/tools";

export function ToolSelectedToolBar() {
  const selectedTool = useSelectedTool();
  const isGuideline =
    selectedTool &&
    (selectedTool.type === GUIDELINE_HORIZONTAL ||
      selectedTool.type === GUIDELINE_VERTICAL);

  if (selectedTool === null) {
    return null;
  }

  return (
    <ToolBar initX={20} initY={80}>
      {isGuideline && <GuidelineToolbar />}
    </ToolBar>
  );
}
