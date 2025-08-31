import { usePresetByIdQuery } from "@/features/preset/hooks/usePresetByIdQuery";
import { Preset } from "@/features/preset/Preset";
import { PresetContextProvider } from "@/features/preset/store/presetsStore";
import type { IPreset } from "@/features/preset/types";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { WorkspaceContextProvider } from "@/features/workspace/store/workspaceStore";

export function Workspace() {
  const { data: workspace } = useWorkspaceQuery();

  if (!workspace) {
    return null;
  }

  return (
    <WorkspaceContextProvider id={workspace.id}>
      {workspace.activePresetId && (
        <PresetLoader id={workspace.activePresetId} />
      )}
    </WorkspaceContextProvider>
  );
}

function PresetLoader({ id }: { id: IPreset["id"] }) {
  const { data: preset } = usePresetByIdQuery({ id });

  if (!preset) {
    return null;
  }

  return (
    <PresetContextProvider key={preset.id} activePresetId={preset.id}>
      <Preset key={preset.id} id={preset.id} />
    </PresetContextProvider>
  );
}
