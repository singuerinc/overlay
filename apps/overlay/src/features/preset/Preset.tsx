import { Columns } from "@/features/columns/Columns";
import { CommandsDebugger } from "@/features/commands/components/CommandsDebugger";
import { Coords } from "@/features/coords/Coords";
import { Crosshair } from "@/features/crosshair/Crosshair";
import { Grid } from "@/features/grid/Grid";
import { Guidelines } from "@/features/guideline/Guidelines";
import { OnionImages } from "@/features/onion-image/OnionImages";
import { usePresetByIdQuery } from "@/features/preset/hooks/usePresetByIdQuery";
import type { IPreset } from "@/features/preset/types";
import { Ruler } from "@/features/rulers/Ruler";
import { RulerContextProvider } from "@/features/rulers/store/rulerStore";
import { ShortcutsObserver } from "@/features/shortcuts/ShortcutsObserver";
import { OverlayToolBox } from "@/features/toolbox/OverlayToolBox";
import { cn } from "@/ui/cn";

export function Preset({ id }: { id: IPreset["id"] }) {
  const { data: preset } = usePresetByIdQuery({ id });

  if (!preset) {
    return null;
  }

  return (
    <div
      data-overlay-preset-id={preset.id}
      className={cn("overlay-root o:pointer-events-auto o:overflow-hidden")}
    >
      <OverlayToolBox />
      <ShortcutsObserver />
      <CommandsDebugger />
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
