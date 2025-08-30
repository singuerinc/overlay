import type { IPreset } from "@/features/preset/types";
import type { IWorkspace } from "@/features/workspace/types";
import { v4 as uuidv4 } from "uuid";

export const createWorkspace = ({
  preset,
}: {
  preset: IPreset;
}): IWorkspace => ({
  id: uuidv4(),
  type: "workspace" as const,
  presets: [preset.id],
  activePresetId: preset.id,
});
