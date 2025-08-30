import { createPreset } from "@/features/preset/store/createPreset";
import type { IPreset } from "@/features/preset/types";
import { useWorkspaceAddPresetCommand } from "@/features/workspace/store/useWorkspaceAddPresetCommand";
import { useWorkspaceSetActivePresetIdCommand } from "@/features/workspace/store/useWorkspaceSetActivePresetIdCommand";

export function useWorkspace() {
  const addPresetCmd = useWorkspaceAddPresetCommand();
  const setActivePresetIdCmd = useWorkspaceSetActivePresetIdCommand();

  return {
    setActivePresetId: (id: IPreset["id"]) => {
      setActivePresetIdCmd.execute(id);
    },
    addPreset: () => {
      const preset = createPreset();
      addPresetCmd.execute(preset);
    },
  };
}
