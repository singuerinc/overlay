import { Columns } from "@/features/columns/Columns";
import { Coords } from "@/features/coords/Coords";
import { Crosshair } from "@/features/crosshair/Crosshair";
import { useFrameByIdQuery } from "@/features/frame/hooks/useFrameByIdQuery";
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
  const { data: frame } = useFrameByIdQuery({ id });

  if (!frame) {
    return null;
  }

  return (
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
        <Coords />
      </RulerContextProvider>
    </div>
  );
}
