import { createPreset } from "@/features/preset/store/createPreset";
import type { IPreset } from "@/features/preset/types";
import { useWorkspaceAddPresetCommand } from "@/features/workspace/commands/useWorkspaceAddPresetCommand";
import { useWorkspaceSetActivePresetIdCommand } from "@/features/workspace/commands/useWorkspaceSetActivePresetIdCommand";
import { useWorkspaceSetLockedCommand } from "@/features/workspace/commands/useWorkspaceSetLockedCommand";
import { useWorkspaceSetSnapToGridCommand } from "@/features/workspace/commands/useWorkspaceSetSnapToGridCommand";
import { useWorkspaceSetVisibleCommand } from "@/features/workspace/commands/useWorkspaceSetVisibleCommand";

export function useWorkspace() {
  const addPresetCmd = useWorkspaceAddPresetCommand();
  const setActivePresetIdCmd = useWorkspaceSetActivePresetIdCommand();
  const setLockedCmd = useWorkspaceSetLockedCommand();
  const setSnapToGridCmd = useWorkspaceSetSnapToGridCommand();
  const setVisibleCmd = useWorkspaceSetVisibleCommand();

  return {
    setVisible: (visible: boolean) => {
      setVisibleCmd.execute(visible);
    },
    setLocked: (locked: boolean) => {
      setLockedCmd.execute(locked);
    },
    setSnapToGrid: (snapToGrid: boolean) => {
      setSnapToGridCmd.execute(snapToGrid);
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
