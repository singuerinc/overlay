import { useSetActiveFrameId } from "@/appStore";
import { Crosshair } from "@/features/crosshair/Crosshair";
import { FrameContextProvider } from "@/features/frame/store/frameStore";
import { Grid } from "@/features/grid/Grid";
import { GuidelinesRoot } from "@/features/guideline/GuidelinesRoot";
import { Ruler } from "@/features/rulers/Ruler";
import { RulerContextProvider } from "@/features/rulers/store/rulerStore";
import { ToolBar } from "@/features/toolbar/ToolBar";
import { cn } from "@/ui/cn";

export function Frame({
  frame,
}: {
  frame: { id: string; x: number; y: number; width: number; height: number };
}) {
  const setActiveFrameId = useSetActiveFrameId();

  return (
    <FrameContextProvider
      id={frame.id}
      x={frame.x}
      y={frame.y}
      width={frame.width}
      height={frame.height}
    >
      <ToolBar initX={100} initY={window.innerHeight - 100} />
      <div
        onClick={() => setActiveFrameId(frame.id)}
        className={cn("absolute pointer-events-auto overflow-hidden")}
        style={{
          width: `100%`,
          height: `100%`,
        }}
      >
        <RulerContextProvider>
          <Grid />
          <Ruler />
          <GuidelinesRoot />
          <Crosshair />
        </RulerContextProvider>
      </div>
    </FrameContextProvider>
  );
}
