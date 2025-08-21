import { Guideline } from "@/features/guideline/Guideline";
import { useGuidelineMove } from "@/features/guideline/hooks/useGuidelineMove";
import { useGuidelinesQuery } from "@/features/guideline/store/useGuidelinesQuery";
import { type IGuideline } from "@/features/guideline/types";
import { useRulerSetPosition } from "@/features/rulers/store/rulerStore";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { useCallback } from "react";

export function GuidelinesRoot() {
  const { data: ruler } = useRulerQuery();
  const { data: guidelines, isLoading, isError } = useGuidelinesQuery();
  const rulerSetPosition = useRulerSetPosition();
  const { move: moveGuideline } = useGuidelineMove();
  const setSelectedTool = useSetSelectedTool();

  const onGuidelinePositionChanged = useCallback(
    (_: IGuideline, x: number | null, y: number | null) => {
      rulerSetPosition(x, y);
    },
    [rulerSetPosition]
  );

  const onGuidelinePositionChangeEnded = useCallback(
    (guideline: IGuideline, x: number, y: number) => {
      moveGuideline(guideline, { x, y });
    },
    [moveGuideline]
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
