import { Columns } from "@/features/columns/Columns";
import { Crosshair } from "@/features/crosshair/Crosshair";
import { useFrameSetActiveId } from "@/features/frame/hooks/useFrameSetActiveId";
import { Grid } from "@/features/grid/Grid";
import { GuidelinesRoot } from "@/features/guideline/GuidelinesRoot";
import { Ruler } from "@/features/rulers/Ruler";
import { RulerContextProvider } from "@/features/rulers/store/rulerStore";
import { useRulerQuery } from "@/features/rulers/store/useRulerQuery";
import { cn } from "@/ui/cn";
import type { PropsWithChildren } from "react";

export function Frame({ id }: { id: string }) {
  const setFrameActiveId = useFrameSetActiveId();

  return (
    <div
      onClick={() => setFrameActiveId(id)}
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
