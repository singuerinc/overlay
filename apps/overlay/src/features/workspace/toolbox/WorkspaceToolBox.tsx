import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";
import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { useExportWorkspace } from "@/features/workspace/utils/useExportWorkspace";

export function WorkspaceToolBox() {
  const { data: workspace } = useWorkspaceQuery();
  const { addPreset, setActivePresetId } = useWorkspace();
  const { exportWorkspace } = useExportWorkspace();

  if (!workspace) {
    return null;
  }

  return (
    <ToolBoxTabGrid>
      <button type="button" onClick={() => addPreset()}>
        Add Preset
      </button>
      <select
        value={workspace.activePresetId}
        onChange={(e) => {
          const selectedPresetId = e.target.value;
          setActivePresetId(selectedPresetId);
        }}
      >
        {workspace.presets.map((presetId) => (
          <option key={presetId}>{presetId}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={async () => {
          console.log(await exportWorkspace());
        }}
      >
        export
      </button>
    </ToolBoxTabGrid>
  );
}
