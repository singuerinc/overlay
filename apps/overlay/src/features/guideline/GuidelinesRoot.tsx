import { useMoveGuidelineCommand } from "@/features/guideline/store/useMoveGuidelineCommand";
import { useRulerSetPosition } from "@/features/rulers/store/rulerStore";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { useCallback } from "react";
import { Guideline } from "./Guideline";
import { useGetGuidelinesQuery } from "./store/useGetGuidelinesQuery";
import { type IGuideline } from "./types";

export function GuidelinesRoot() {
  const { data: ruler } = useGetRulerQuery();
  const { data: guidelines, isLoading, isError } = useGetGuidelinesQuery();
  const rulerSetPosition = useRulerSetPosition();
  const moveGuidelineCommand = useMoveGuidelineCommand();
  const setSelectedTool = useSetSelectedTool();

  const onGuidelinePositionChanged = useCallback(
    (_: IGuideline, x: number | null, y: number | null) => {
      rulerSetPosition(x, y);
    },
    [rulerSetPosition]
  );

  const onGuidelinePositionChangeEnded = useCallback(
    (guideline: IGuideline, x: number, y: number) => {
      moveGuidelineCommand.execute(guideline.id, { x, y });
    },
    [moveGuidelineCommand]
  );

  const onGuidelineSelected = useCallback(
    (guideline: IGuideline) => {
      setSelectedTool(guideline);
    },
    [setSelectedTool]
  );

  if (isLoading || isError || !guidelines) {
    return null;
  }

  if (!guidelines.visible) {
    return null;
  }

  return (
    <div className="h-screen w-screen pointer-events-none absolute top-0 left-0">
      {guidelines.guidelines.map((guidelineId) => (
        <Guideline
          key={guidelineId}
          id={guidelineId}
          originX={ruler?.originX ?? 0}
          originY={ruler?.originY ?? 0}
          style="solid"
          onGuidelineSelected={onGuidelineSelected}
          onGuidelinePositionChanged={onGuidelinePositionChanged}
          onGuidelinePositionChangeEnded={onGuidelinePositionChangeEnded}
        />
      ))}
      {/* {guidelines.guidelines
        .filter((item) => item.type === GUIDELINE_VERTICAL)
        .map((item) => (
          <Guideline
            key={item.id}
            guideline={item}
            originX={ruler?.originX ?? 0}
            originY={ruler?.originY ?? 0}
            style="solid"
            onGuidelineSelected={onGuidelineSelected}
            onGuidelinePositionChanged={onGuidelinePositionChanged}
            onGuidelinePositionChangeEnded={onGuidelinePositionChangeEnded}
          />
        ))} */}
    </div>
  );
}
