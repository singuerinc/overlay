import type { IPreset } from "@/features/preset/types";

export interface IWorkspace {
  id: string;
  type: "workspace";
  presets: IPreset["id"][];
  activePresetId: IPreset["id"];
}
