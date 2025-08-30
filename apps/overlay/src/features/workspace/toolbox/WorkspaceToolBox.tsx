import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";
import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";

export function WorkspaceToolBox() {
  const { data: workspace } = useWorkspaceQuery();
  const { addPreset, setActivePresetId } = useWorkspace();

  return (
    <ToolBoxTabGrid>
      <button type="button" onClick={() => addPreset()}>
        Add Preset
      </button>
      <select
        onChange={(e) => {
          const selectedPresetId = e.target.value;
          setActivePresetId(selectedPresetId);
        }}
      >
        {workspace?.presets.map((presetId) => (
          <option
            key={presetId}
            value={presetId}
            selected={workspace.activePresetId === presetId}
          >
            {presetId}
          </option>
        ))}
      </select>
    </ToolBoxTabGrid>
  );
}
