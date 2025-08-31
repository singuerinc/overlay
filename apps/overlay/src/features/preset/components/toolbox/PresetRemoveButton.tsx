import { usePreset } from "@/features/preset/hooks/usePreset";
import { usePresetByIdQuery } from "@/features/preset/hooks/usePresetByIdQuery";
import type { IPreset } from "@/features/preset/types";
import { ToolBoxLabeledButton } from "@/features/toolbox/components/ToolBoxLabeledButton";
import { IconTrash } from "@tabler/icons-react";

export function PresetRemoveButton({ id }: { id: IPreset["id"] }) {
  const { data: preset } = usePresetByIdQuery({ id });
  const { removePreset } = usePreset();

  if (!preset) {
    return null;
  }

  return (
    <ToolBoxLabeledButton
      onClick={() => {
        const confirmed = confirm(
          "Are you sure you want to remove this preset?"
        );
        if (confirmed) {
          removePreset(preset);
        }
      }}
      Icon={<IconTrash size={18} />}
      label={"Delete"}
    />
  );
}
