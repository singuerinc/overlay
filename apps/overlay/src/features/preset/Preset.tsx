import { Columns } from "@/features/columns/Columns";
import { Coords } from "@/features/coords/Coords";
import { CoordsContextProvider } from "@/features/coords/store/CoordsStore";
import { Crosshair } from "@/features/crosshair/Crosshair";
import { Grid } from "@/features/grid/Grid";
import { Guidelines } from "@/features/guideline/Guidelines";
import { OnionImages } from "@/features/onion-image/OnionImages";
import { usePresetByIdQuery } from "@/features/preset/hooks/usePresetByIdQuery";
import type { IPreset } from "@/features/preset/types";
import { Ruler } from "@/features/rulers/Ruler";
import { RulerContextProvider } from "@/features/rulers/store/rulerStore";
import { Sizes } from "@/features/sizes/Sizes";
import { SizesContextProvider } from "@/features/sizes/store/SizesStore";
import { ToolBar } from "@/features/toolbar/ToolBar";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { cn } from "@/ui/cn";

export function Preset({ id }: { id: IPreset["id"] }) {
  const { data: workspace } = useWorkspaceQuery();
  const { data: preset } = usePresetByIdQuery({ id });

  if (!preset || !workspace) {
    return null;
  }

  return (
    <div
      data-overlay-preset-id={preset.id}
      className={cn("overlay-root o:overflow-hidden")}
    >
      <ToolBar />
      {/* <ShortcutsObserver /> */}
      {/* <CommandsDebugger /> */}
      {workspace.visible && (
        <CoordsContextProvider>
          <SizesContextProvider>
            <RulerContextProvider>
              <Columns />
              <OnionImages />
              <Guidelines />
              <Grid />
              <Ruler />
              <Crosshair />
              <Coords />
              <Sizes />
            </RulerContextProvider>
          </SizesContextProvider>
        </CoordsContextProvider>
      )}
    </div>
  );
}
