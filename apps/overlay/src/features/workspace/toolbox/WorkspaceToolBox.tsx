import { usePreset } from "@/features/preset/hooks/usePreset";
import { usePresetByIdQuery } from "@/features/preset/hooks/usePresetByIdQuery";
import type { IPreset } from "@/features/preset/types";
import { ToolBoxTabGrid } from "@/features/toolbox/components/ToolBox";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { useExportWorkspace } from "@/features/workspace/utils/useExportWorkspace";
import {
  IconAdjustmentsPlus,
  IconFileArrowRight,
  IconPencilCheck,
} from "@tabler/icons-react";
import { useCopyToClipboard } from "usehooks-ts";

export function WorkspaceToolBox() {
  const { data: workspace } = useWorkspaceQuery();
  const { addPreset, setActivePresetId } = useWorkspace();
  const { exportWorkspace } = useExportWorkspace();
  const [, copy] = useCopyToClipboard();

  if (!workspace) {
    return null;
  }

  return (
    <ToolBoxTabGrid>
      <ToolBoxLabeledButton
        onClick={async () => {
          const exportedWorkspace = await exportWorkspace();
          copy(JSON.stringify(exportedWorkspace, null, 2));
        }}
        Icon={<IconFileArrowRight />}
        label={"Import Workspace"}
      />
      <ToolBoxLabeledButton
        onClick={async () => {
          const exportedWorkspace = await exportWorkspace();
          copy(JSON.stringify(exportedWorkspace, null, 2));
        }}
        Icon={<IconFileArrowRight />}
        label={"Export Workspace"}
      />
      <ToolBoxLabeledButton
        onClick={() => addPreset()}
        Icon={<IconAdjustmentsPlus />}
        label={"Create New Preset"}
      />

      <div />
      <label htmlFor="presets">
        <span>Presets:</span>
        <select
          value={workspace.activePresetId}
          onChange={(e) => {
            const selectedPresetId = e.target.value;
            setActivePresetId(selectedPresetId);
          }}
        >
          {workspace.presets.map((presetId) => (
            <PresetOption key={presetId} presetId={presetId} />
          ))}
        </select>
      </label>
      <UpdatePresetName id={workspace.activePresetId} />
    </ToolBoxTabGrid>
  );
}

function PresetOption({ presetId }: { presetId: string }) {
  const { data: preset } = usePresetByIdQuery({ id: presetId });

  if (!preset) {
    return null;
  }

  return (
    <option key={preset.id} value={preset.id}>
      {preset.name}
    </option>
  );
}

function UpdatePresetName({ id }: { id: IPreset["id"] }) {
  const { data: preset } = usePresetByIdQuery({ id });
  const { updateName: updatePresetName } = usePreset();

  if (!preset) {
    return null;
  }

  return (
    <ToolBoxLabeledButton
      onClick={() => {
        const name = prompt("Enter new preset name", preset.name);
        if (name && preset) {
          updatePresetName(preset, name);
        }
      }}
      Icon={<IconPencilCheck />}
      label={"Update Preset Name"}
    />
  );
}
