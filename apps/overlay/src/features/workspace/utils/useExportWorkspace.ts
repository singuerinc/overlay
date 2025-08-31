import { getColumns } from "@/features/columns/store/useColumnsQuery";
import type { IColumnsStore } from "@/features/columns/types";
import { getCrosshair } from "@/features/crosshair/store/useCrosshairQuery";
import type { ICrosshairStore } from "@/features/crosshair/types";
import { getGrid } from "@/features/grid/store/useGridQuery";
import type { IGridStore } from "@/features/grid/types";
import { getGuideline } from "@/features/guideline/store/useGuidelineByIdQuery";
import { getGuidelines } from "@/features/guideline/store/useGuidelinesQuery";
import type { IGuideline, IGuidelineStore } from "@/features/guideline/types";
import { getNotes } from "@/features/notes/store/useNotesQuery";
import type { INotesStore } from "@/features/notes/types";
import { getOnionImage } from "@/features/onion-image/store/useOnionImageByIdQuery";
import { getOnionImages } from "@/features/onion-image/store/useOnionImagesQuery";
import type {
  IOnionImage,
  IOnionImagesStore,
} from "@/features/onion-image/types";
import { getPreset } from "@/features/preset/hooks/usePresetByIdQuery";
import type { IPreset } from "@/features/preset/types";
import { getRuler } from "@/features/rulers/store/useRulerQuery";
import type { IRulerStore } from "@/features/rulers/types";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import type { IWorkspace } from "@/features/workspace/types";

type IExportedWorkspace = {
  id: string;
  type: IWorkspace["type"];
  presets: (IPreset & {
    ruler: IRulerStore;
    crosshair: ICrosshairStore;
    columns: IColumnsStore;
    grid: IGridStore;
    guidelines: Exclude<IGuidelineStore, "guidelines"> & {
      guidelines: IGuideline[];
    };
    notes: INotesStore;
    onionImages: Exclude<IOnionImagesStore, "onionImages"> & {
      onionImages: IOnionImage[];
    };
  })[];
};

export function useExportWorkspace() {
  const { data: workspace } = useWorkspaceQuery();

  return {
    exportWorkspace: async () => {
      if (!workspace) {
        throw new Error("Workspace not loaded");
      }

      return {
        id: workspace.id,
        type: workspace.type,
        presets: await Promise.all(
          workspace.presets.map(async (presetId) => {
            const preset = await getPreset(workspace.id, presetId);
            const ruler = await getRuler(presetId);
            const crosshair = await getCrosshair(presetId);
            const columns = await getColumns(presetId);
            const grid = await getGrid(presetId);
            const guidelines = await getGuidelines(presetId);
            const guidelineList = await Promise.all(
              guidelines.guidelines.map((id) => getGuideline(presetId, id))
            );
            const guidelinesWithList = {
              ...guidelines,
              guidelines: guidelineList,
            };

            const notes = await getNotes(presetId);
            const onionImages = await getOnionImages(presetId);
            const onionImagesList = await Promise.all(
              onionImages.onionImages.map((id) => getOnionImage(presetId, id))
            );

            const onionImagesWithList = {
              ...onionImages,
              onionImages: onionImagesList,
            };

            return {
              ...preset,
              ruler,
              grid,
              crosshair,
              columns,
              guidelines: guidelinesWithList,
              onionImages: onionImagesWithList,
              notes,
            };
          })
        ),
      } as IExportedWorkspace;
    },
  };
}
