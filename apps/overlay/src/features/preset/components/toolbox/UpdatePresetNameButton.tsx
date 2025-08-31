import { usePreset } from "@/features/preset/hooks/usePreset";
import { usePresetByIdQuery } from "@/features/preset/hooks/usePresetByIdQuery";
import type { IPreset } from "@/features/preset/types";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconPencil } from "@tabler/icons-react";

export function PresetUpdateNameButton({ id }: { id: IPreset["id"] }) {
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
      Icon={<IconPencil size={18} />}
      label={"Update"}
    />
  );
}
