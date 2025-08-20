import { Guideline } from "@/features/guideline/Guideline";
import { GuidelineColors } from "@/features/guideline/GuidelineColor";
import { createHorizontalGuideline } from "@/features/guideline/store/createHorizontalGuideline";
import { createVerticalGuideline } from "@/features/guideline/store/createVerticalGuideline";
import {
  GUIDELINE_VERTICAL,
  type IGuideline,
} from "@/features/guideline/types";
import { HorizontalRuler } from "@/features/rulers/components/HorizontalRuler";
import { VerticalRuler } from "@/features/rulers/components/VerticalRuler";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { useSetOriginRulerCommand } from "@/features/rulers/store/useSetOriginRulerCommand";
import { useCallback, useState } from "react";
import { HotkeysProvider } from "react-hotkeys-hook";

export function Ruler() {
  const { data: ruler } = useGetRulerQuery();
  const setOriginCommand = useSetOriginRulerCommand();

  const [hGuideline] = useState<IGuideline>(
    createHorizontalGuideline({
      color: GuidelineColors[3],
    })
  );
  const [vGuideline] = useState<IGuideline>(
    createVerticalGuideline({
      color: GuidelineColors[3],
    })
  );

  // useEffect(() => {
  //   if (ruler) {
  //     vGuideline.x = ruler.originX;
  //     hGuideline.y = ruler.originY;
  //   }
  // }, [hGuideline, ruler, vGuideline]);

  const handleResetOrigin = useCallback(() => {
    setOriginCommand.execute(0, 0);
  }, [setOriginCommand]);

  const onGuidelinePositionChanged = useCallback(
    (guideline: IGuideline, x: number | null, y: number | null) => {
      guideline.x = x ?? 0;
      guideline.y = y ?? 0;
      const isVertical = guideline.type === GUIDELINE_VERTICAL;
      if (ruler) {
        setOriginCommand.execute(
          isVertical ? (x ?? 0) : ruler.originX,
          isVertical ? ruler.originY : (y ?? 0)
        );
      }
    },
    [ruler, setOriginCommand]
  );

  const onGuidelinePositionChangeEnded = useCallback(
    (guideline: IGuideline, x: number, y: number) => {
      guideline.x = x;
      guideline.y = y;
      const isVertical = guideline.type === GUIDELINE_VERTICAL;
      if (ruler) {
        setOriginCommand.execute(
          isVertical ? x : ruler.originX,
          isVertical ? ruler.originY : y
        );
      }
    },
    [ruler, setOriginCommand]
  );

  const onGuidelineSelected = useCallback(() => {
    //
  }, []);

  if (!ruler || ruler.visible === false) {
    return null;
  }

  return (
    <HotkeysProvider>
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: `${ruler.width}`,
          height: `${ruler.height}`,
        }}
      >
        <div
          className="absolute top-0 left-0 w-6 h-6 bg-neutral-100 z-10 cursor-pointer"
          onClick={handleResetOrigin}
        />
        <VerticalRuler origin={ruler.originY} />
        <HorizontalRuler origin={ruler.originX} />
        <Guideline
          guideline={hGuideline}
          style="dashed"
          originX={0}
          originY={0}
          onGuidelineSelected={onGuidelineSelected}
          onGuidelinePositionChangeEnded={onGuidelinePositionChangeEnded}
          onGuidelinePositionChanged={onGuidelinePositionChanged}
        />
        <Guideline
          guideline={vGuideline}
          style="dashed"
          originX={0}
          originY={0}
          onGuidelineSelected={onGuidelineSelected}
          onGuidelinePositionChangeEnded={onGuidelinePositionChangeEnded}
          onGuidelinePositionChanged={onGuidelinePositionChanged}
        />
      </div>
    </HotkeysProvider>
  );
}
