import { createPreset } from "@/features/preset/store/createPreset";
import type { IPreset } from "@/features/preset/types";
import { useWorkspaceAddPresetCommand } from "@/features/workspace/store/useWorkspaceAddPresetCommand";
import { useWorkspaceSetActivePresetIdCommand } from "@/features/workspace/store/useWorkspaceSetActivePresetIdCommand";
import { useWorkspaceSetLockedCommand } from "@/features/workspace/store/useWorkspaceSetLockedCommand";
import { useWorkspaceSetVisibleCommand } from "@/features/workspace/store/useWorkspaceSetVisibleCommand";

export function useWorkspace() {
  const addPresetCmd = useWorkspaceAddPresetCommand();
  const setActivePresetIdCmd = useWorkspaceSetActivePresetIdCommand();
  const setLockedCmd = useWorkspaceSetLockedCommand();
  const setVisibleCmd = useWorkspaceSetVisibleCommand();

  return {
    setVisible: (visible: boolean) => {
      setVisibleCmd.execute(visible);
    },
    setLocked: (locked: boolean) => {
      setLockedCmd.execute(locked);
    },
    setActivePresetId: (id: IPreset["id"]) => {
      setActivePresetIdCmd.execute(id);
    },
    addPreset: () => {
      const presetNamePrompt = prompt("Enter preset name", "Preset");
      if (presetNamePrompt !== null) {
        const preset = createPreset({ name: presetNamePrompt });
        addPresetCmd.execute(preset);
      }
    },
  };
}
