import { columnsSave } from "@/features/columns/store/columnsSave";
import { createColumns } from "@/features/columns/store/createColumns";
import { createCrosshair } from "@/features/crosshair/store/createCrosshair";
import { crosshairSave } from "@/features/crosshair/store/crosshairSave";
import { createFrames } from "@/features/frames/store/createFrames";
import { frameSave } from "@/features/frames/store/frameSave";
import { framesSave } from "@/features/frames/store/framesSave";
import { createGrid } from "@/features/grid/store/createGrid";
import { gridSave } from "@/features/grid/store/gridSave";
import { createGuidelines } from "@/features/guideline/store/createGuidelines";
import { guidelineSave } from "@/features/guideline/store/guidelineSave";
import { guidelinesSave } from "@/features/guideline/store/guidelinesSave";
import { createOnionImages } from "@/features/onion-image/store/createOnionImages";
import { onionImageSave } from "@/features/onion-image/store/onionImageSave";
import { onionImagesSave } from "@/features/onion-image/store/onionImagesSave";
import { createPreset } from "@/features/preset/store/createPreset";
import { presetSave } from "@/features/preset/store/presetSave";
import { createRuler } from "@/features/rulers/store/createRuler";
import { rulerSave } from "@/features/rulers/store/rulerSave";
import { createWorkspace } from "@/features/workspace/store/createWorkspace";
import { workspaceSave } from "@/features/workspace/store/workspaceSave";
import type { IExportedWorkspace } from "@/features/workspace/utils/useExportWorkspace";

export async function workspaceImport(exportedWorkspace?: IExportedWorkspace) {
  if (!exportedWorkspace) {
    throw new Error("Workspace cannot be imported");
  }

  const presets = exportedWorkspace.presets.map((preset) =>
    createPreset(preset)
  );

  const preset = presets[0];

  const workspace = createWorkspace({ preset });
  await workspaceSave(workspace);

  await Promise.all(
    presets.map(async (preset) => {
      await presetSave(workspace.id, preset);
    })
  );

  const p = exportedWorkspace.presets[0];

  await rulerSave(preset.id, createRuler(p.ruler));
  await crosshairSave(preset.id, createCrosshair(p.crosshair));
  await columnsSave(preset.id, createColumns(p.columns));
  await gridSave(preset.id, createGrid(p.grid));

  await guidelinesSave(
    preset.id,
    createGuidelines({
      guidelines: p.guidelines.guidelines.map((g) => g.id),
      visible: p.guidelines.visible,
      locked: p.guidelines.locked,
    })
  );

  await Promise.all(
    p.guidelines.guidelines.map(async (guideline) => {
      await guidelineSave(preset.id, guideline);
    })
  );

  await onionImagesSave(
    preset.id,
    createOnionImages({
      onionImages: p.onionImages.onionImages.map((g) => g.id),
      visible: p.onionImages.visible,
      locked: p.onionImages.locked,
    })
  );

  await Promise.all(
    p.onionImages.onionImages.map(async (guideline) => {
      await onionImageSave(preset.id, guideline);
    })
  );

  await framesSave(
    preset.id,
    createFrames({
      frames: p.frames.frames.map((g) => g.id),
      visible: p.frames.visible,
      locked: p.frames.locked,
    })
  );

  await Promise.all(
    p.frames.frames.map(async (frame) => {
      await frameSave(preset.id, frame);
    })
  );
}
