import { useMoveGuidelineCommand } from "@/features/guideline/store/useMoveGuidelineCommand";
import { useRulerSetPosition } from "@/features/rulers/store/rulerStore";
import { useSetSelectedTool } from "@/features/tools/store/tools";
import { useCallback } from "react";
import { Guideline } from "./Guideline";
import { useGetGuidelinesQuery } from "./store/useGetGuidelinesQuery";
import {
  GUIDELINE_HORIZONTAL,
  GUIDELINE_VERTICAL,
  type IGuideline,
} from "./types";

export function GuidelinesRoot() {
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
    (guideline: IGuideline, position: { x: number; y: number }) => {
      moveGuidelineCommand.execute(guideline.id, position);
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

  if (!guidelines.isGuidelinesVisible) {
    return null;
  }

  return (
    <div className="h-screen w-screen pointer-events-none absolute top-0 left-0">
      {guidelines.guidelines
        .filter((item) => item.type === GUIDELINE_HORIZONTAL)
        .map((item) => (
          <Guideline
            key={item.id}
            guideline={item}
            style="solid"
            onGuidelineSelected={onGuidelineSelected}
            onGuidelinePositionChanged={onGuidelinePositionChanged}
            onGuidelinePositionChangeEnded={onGuidelinePositionChangeEnded}
          />
        ))}
      {guidelines.guidelines
        .filter((item) => item.type === GUIDELINE_VERTICAL)
        .map((item) => (
          <Guideline
            key={item.id}
            guideline={item}
            style="solid"
            onGuidelineSelected={onGuidelineSelected}
            onGuidelinePositionChanged={onGuidelinePositionChanged}
            onGuidelinePositionChangeEnded={onGuidelinePositionChangeEnded}
          />
        ))}
    </div>
  );
}
