import { PresetCreateButton } from "@/features/preset/components/toolbox/PresetCreateButton";
import { PresetDuplicateButton } from "@/features/preset/components/toolbox/PresetDuplicateButton";
import { PresetRemoveButton } from "@/features/preset/components/toolbox/PresetRemoveButton";
import { PresetSelect } from "@/features/preset/components/toolbox/PresetSelect";
import { PresetUpdateNameButton } from "@/features/preset/components/toolbox/UpdatePresetNameButton";
import {
  ToolBoxGridTitle,
  ToolBoxTabGrid,
} from "@/features/toolbox/components/ToolBox";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { useExportWorkspace } from "@/features/workspace/utils/useExportWorkspace";
import { IconDownload, IconUpload } from "@tabler/icons-react";
import { useCopyToClipboard } from "usehooks-ts";

export function WorkspaceToolBox() {
  const { data: workspace } = useWorkspaceQuery();
  const { exportWorkspace } = useExportWorkspace();
  const [, copy] = useCopyToClipboard();

  if (!workspace) {
    return null;
  }

  return (
    <>
      <ToolBoxTabGrid>
        <ToolBoxGridTitle>Workspace</ToolBoxGridTitle>
        <ToolBoxLabeledButton
          onClick={async () => {
            const exportedWorkspace = await exportWorkspace();
            copy(JSON.stringify(exportedWorkspace, null, 2));
          }}
          Icon={<IconDownload size={18} />}
          label={"Import"}
        />
        <ToolBoxLabeledButton
          onClick={async () => {
            const exportedWorkspace = await exportWorkspace();
            copy(JSON.stringify(exportedWorkspace, null, 2));
          }}
          Icon={<IconUpload size={18} />}
          label={"Export"}
        />
      </ToolBoxTabGrid>
      <ToolBoxTabGrid>
        <ToolBoxGridTitle>Presets</ToolBoxGridTitle>
        <PresetSelect />
        <PresetCreateButton />
        {workspace.activePresetId && (
          <>
            <PresetUpdateNameButton id={workspace.activePresetId} />
            <PresetDuplicateButton id={workspace.activePresetId} />
            {workspace.presets.length > 1 && (
              <PresetRemoveButton id={workspace.activePresetId} />
            )}
          </>
        )}
      </ToolBoxTabGrid>
    </>
  );
}
