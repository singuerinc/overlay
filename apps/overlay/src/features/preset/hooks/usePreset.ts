import { usePresetUpdateNameCommand } from "@/features/preset/store/usePresetUpdateNameCommand";
import type { IPreset } from "@/features/preset/types";

export function usePreset() {
  const updateNameCmd = usePresetUpdateNameCommand();

  return {
    updateName: (preset: IPreset, name: string) => {
      return updateNameCmd.execute(preset, name);
    },
  };
}
