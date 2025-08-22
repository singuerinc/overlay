import { Columns } from "@/features/columns/Columns";
import { Crosshair } from "@/features/crosshair/Crosshair";
import { useFrameQueryById } from "@/features/frame/hooks/useFrameQueryById";
import { FrameContextProvider } from "@/features/frame/store/frameStore";
import type { IFrame } from "@/features/frame/types";
import { Grid } from "@/features/grid/Grid";
import { Guidelines } from "@/features/guideline/Guidelines";
import { Ruler } from "@/features/rulers/Ruler";
import { RulerContextProvider } from "@/features/rulers/store/rulerStore";
import { ShortcutsObserver } from "@/features/shortcuts/ShortcutsObserver";
import { ToolBox } from "@/features/toolbox/ToolBox";
import { cn } from "@/ui/cn";

export function Frame({ id }: { id: IFrame["id"] }) {
  const { data: frame } = useFrameQueryById({ id });
  // const setFrameActive = useFrameSetActive();

  if (!frame) {
    return null;
  }

  return (
    <FrameContextProvider key={frame.id} activeFrame={frame}>
      <div
        data-overlay-frame-id={frame.id}
        // onClick={() => setFrameActive(frame)}
        className={cn(
          "overlay-root overlay:border-2 overlay:pointer-events-none overlay:overflow-hidden"
        )}
        style={{
          width: frame.width,
          height: frame.height,
          // top: `${frame.y}px`,
          // left: `${frame.x}px`,
        }}
      >
        <ToolBox />
        <ShortcutsObserver />
        {/* <CommandMenu /> */}
        <RulerContextProvider>
          <Ruler />
          <Columns />
          <Guidelines />
          <Crosshair />
          <Grid />
        </RulerContextProvider>
      </div>
    </FrameContextProvider>
  );
}
