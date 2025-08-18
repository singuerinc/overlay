import { CrosshairSettingsToolbar } from "@/features/crosshair/toolbar/CrosshairSettingsToolbar";
import { CROSSHAIR } from "@/features/crosshair/types";
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

  const isCrosshair = selectedTool && selectedTool.type === CROSSHAIR;

  if (selectedTool === null) {
    return null;
  }

  return (
    <ToolBar initX={20} initY={80}>
      {isGuideline && <GuidelineToolbar />}
      {isCrosshair && <CrosshairSettingsToolbar />}
    </ToolBar>
  );
}
