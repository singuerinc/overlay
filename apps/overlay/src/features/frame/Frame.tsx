import { Columns } from "@/features/columns/Columns";
import { Crosshair } from "@/features/crosshair/Crosshair";
import { useFrameQueryById } from "@/features/frame/hooks/useFrameQueryById";
import { FrameContextProvider } from "@/features/frame/store/frameStore";
import type { IFrame } from "@/features/frame/types";
import { Grid } from "@/features/grid/Grid";
import { Guidelines } from "@/features/guideline/Guidelines";
import { OnionImages } from "@/features/onion-image/OnionImages";
import { Ruler } from "@/features/rulers/Ruler";
import { RulerContextProvider } from "@/features/rulers/store/rulerStore";
import { ShortcutsObserver } from "@/features/shortcuts/ShortcutsObserver";
import { OverlayToolBox } from "@/features/toolbox/OverlayToolBox";
import { cn } from "@/ui/cn";

export function Frame({ id }: { id: IFrame["id"] }) {
  const { data: frame } = useFrameQueryById({ id });

  if (!frame) {
    return null;
  }

  return (
    <FrameContextProvider key={frame.id} activeFrame={frame}>
      <div
        data-overlay-frame-id={frame.id}
        className={cn("overlay-root o:pointer-events-auto o:overflow-hidden")}
      >
        <OverlayToolBox />
        <ShortcutsObserver />
        <RulerContextProvider>
          <Columns />
          <OnionImages />
          <Guidelines />
          <Grid />
          <Ruler />
          <Crosshair />
        </RulerContextProvider>
      </div>
    </FrameContextProvider>
  );
}
