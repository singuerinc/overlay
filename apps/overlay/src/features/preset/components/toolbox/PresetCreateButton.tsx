import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import { IconPlus } from "@tabler/icons-react";

export function PresetCreateButton() {
  const { addPreset } = useWorkspace();
  return (
    <ToolBoxLabeledButton
      onClick={() => addPreset()}
      Icon={<IconPlus size={18} />}
      label={"Create"}
    />
  );
}
