import type { IPreset } from "@/features/preset/types";

export interface IWorkspace {
  id: string;
  type: "workspace";
  visible: boolean;
  locked: boolean;
  snapToGrid: boolean;
  presets: IPreset["id"][];
  activePresetId: IPreset["id"] | null;
}
