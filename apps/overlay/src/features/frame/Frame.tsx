import { useSetActiveFrameId } from "@/appStore";
import { Columns } from "@/features/columns/Columns";
import { Crosshair } from "@/features/crosshair/Crosshair";
import { FrameContextProvider } from "@/features/frame/store/frameStore";
import { Grid } from "@/features/grid/Grid";
import { GuidelinesRoot } from "@/features/guideline/GuidelinesRoot";
import { Ruler } from "@/features/rulers/Ruler";
import { RulerContextProvider } from "@/features/rulers/store/rulerStore";
import { useGetRulerQuery } from "@/features/rulers/store/useGetRulerQuery";
import { ToolBox } from "@/features/toolbox/ToolBox";
import { cn } from "@/ui/cn";
import type { PropsWithChildren } from "react";

export function Frame({ frame }: { frame: { id: string } }) {
  const setActiveFrameId = useSetActiveFrameId();

  return (
    <FrameContextProvider id={frame.id}>
      <ToolBox initX={100} initY={window.innerHeight - 100} />
      <div
        onClick={() => setActiveFrameId(frame.id)}
        className={cn(
          "overlay-root pointer-events-auto overflow-hidden w-full h-full"
        )}
      >
        <RulerContextProvider>
          <Ruler />
          <FrameContent>
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

function FrameContent({ children }: PropsWithChildren) {
  const { data: ruler } = useGetRulerQuery();
  return (
    <div
      className="pointer-events-none w-full h-full"
      style={{
        transform: `translate(${ruler?.originX}px, ${ruler?.originY}px)`,
      }}
    >
      {children}
    </div>
  );
}
