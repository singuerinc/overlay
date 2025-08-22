import { Columns } from "@/features/columns/Columns";
import { Crosshair } from "@/features/crosshair/Crosshair";
import { useFrameQueryById } from "@/features/frame/hooks/useFrameQueryById";
import { FrameContextProvider } from "@/features/frame/store/frameStore";
import type { IFrame } from "@/features/frame/types";
import { Grid } from "@/features/grid/Grid";
import { GuidelinesRoot } from "@/features/guideline/GuidelinesRoot";
import { Ruler } from "@/features/rulers/Ruler";
import { RulerContextProvider } from "@/features/rulers/store/rulerStore";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { ShortcutsObserver } from "@/features/shortcuts/ShortcutsObserver";
import { ToolBox } from "@/features/toolbox/ToolBox";
import { cn } from "@/ui/cn";
import type { PropsWithChildren } from "react";

export function Frame({ id }: { id: IFrame["id"] }) {
  const { data: frame } = useFrameQueryById({ id });
  // const setFrameActive = useFrameSetActive();

  if (!frame) {
    return null;
  }

  return (
    <FrameContextProvider key={frame.id} activeFrame={frame}>
      <div
        // onClick={() => setFrameActive(frame)}
        className={cn(
          "overlay-root pointer-events-auto overflow-hidden w-full h-full"
        )}
      >
        <ToolBox />
        <ShortcutsObserver />
        {/* <CommandMenu /> */}
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
