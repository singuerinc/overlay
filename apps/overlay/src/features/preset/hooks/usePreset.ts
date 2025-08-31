import { usePresetRemoveCommand } from "@/features/preset/store/usePresetRemoveCommand";
import { usePresetUpdateNameCommand } from "@/features/preset/store/usePresetUpdateNameCommand";
import type { IPreset } from "@/features/preset/types";

export function usePreset() {
  const updateNameCmd = usePresetUpdateNameCommand();
  const removePresetCmd = usePresetRemoveCommand();

  return {
    updateName: (preset: IPreset, name: string) => {
      return updateNameCmd.execute(preset, name);
    },
    duplicatePreset: (_preset: IPreset) => {
      return false;
    },
    removePreset: (preset: IPreset) => {
      return removePresetCmd.execute(preset);
    },
  };
}
