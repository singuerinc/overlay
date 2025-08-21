import { useSetActiveFrameId } from "@/appStore";
import { Columns } from "@/features/columns/Columns";
import { Crosshair } from "@/features/crosshair/Crosshair";
import { FrameContextProvider } from "@/features/frame/store/frameStore";
import { Grid } from "@/features/grid/Grid";
import { GuidelinesRoot } from "@/features/guideline/GuidelinesRoot";
import { Ruler } from "@/features/rulers/Ruler";
import { RulerContextProvider } from "@/features/rulers/store/rulerStore";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { ToolBox } from "@/features/toolbox/ToolBox";
import { cn } from "@/ui/cn";
import type { PropsWithChildren } from "react";

export function Frame({ frame }: { frame: { id: string } }) {
  const setActiveFrameId = useSetActiveFrameId();

  return (
    <FrameContextProvider id={frame.id}>
      <ToolBox />

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
  const { data: ruler } = useRulerQuery();
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
