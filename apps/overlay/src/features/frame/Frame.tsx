import { useSetActiveFrameId } from "@/appStore";
import { Columns } from "@/features/columns/Columns";
import { Crosshair } from "@/features/crosshair/Crosshair";
import { FrameContextProvider } from "@/features/frame/store/frameStore";
import { Grid } from "@/features/grid/Grid";
import { GuidelinesRoot } from "@/features/guideline/GuidelinesRoot";
import { Ruler } from "@/features/rulers/Ruler";
import { RulerContextProvider } from "@/features/rulers/store/rulerStore";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { ToolBar } from "@/features/toolbar/ToolBar";
import { cn } from "@/ui/cn";
import type { PropsWithChildren } from "react";

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
        className={cn("pointer-events-auto overflow-hidden")}
        style={{
          width: `${frame.width}px`,
          height: `${frame.height}px`,
        }}
      >
        <RulerContextProvider>
          <Ruler />
          <FrameContent width={frame.width} height={frame.height}>
            <Columns />
            <GuidelinesRoot />
          </FrameContent>
          <Crosshair />
          <Grid />
        </RulerContextProvider>
      </div>
    </FrameContextProvider>
  );
}

function FrameContent({
  children,
  width,
  height,
}: PropsWithChildren<{ width: number; height: number }>) {
  const { data: ruler } = useGetRulerQuery();
  return (
    <div
      className="pointer-events-none"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${ruler?.originX}px, ${ruler?.originY}px)`,
      }}
    >
      {children}
    </div>
  );
}
