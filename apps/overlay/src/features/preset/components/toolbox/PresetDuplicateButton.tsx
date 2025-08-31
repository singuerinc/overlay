import { usePreset } from "@/features/preset/hooks/usePreset";
import { usePresetByIdQuery } from "@/features/preset/hooks/usePresetByIdQuery";
import type { IPreset } from "@/features/preset/types";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconCopy } from "@tabler/icons-react";

export function PresetDuplicateButton({ id }: { id: IPreset["id"] }) {
  const { data: preset } = usePresetByIdQuery({ id });
  const { duplicatePreset } = usePreset();

  if (!preset) {
    return null;
  }

  return (
    <ToolBoxLabeledButton
      onClick={() => {
        duplicatePreset(preset);
      }}
      Icon={<IconCopy size={18} />}
      label="Duplicate"
    />
  );
}
