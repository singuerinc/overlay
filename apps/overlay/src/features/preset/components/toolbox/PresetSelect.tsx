import { usePresetByIdQuery } from "@/features/preset/hooks/usePresetByIdQuery";
import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import { useWorkspaceQuery } from "@/features/workspace/store/useWorkspaceQuery";
import { cn } from "@/ui/cn";

export function PresetSelect() {
  const { data: workspace } = useWorkspaceQuery();
  const { setActivePresetId } = useWorkspace();

  return (
    <div
      className={cn(
        "o:flex o:flex-col o:col-span-2 o:rounded-md o:gap-1 o:items-start"
      )}
    >
      <select
        className="o:text-xs"
        value={workspace?.activePresetId ?? undefined}
        onChange={(e) => {
          const selectedPresetId = e.target.value;
          setActivePresetId(selectedPresetId);
        }}
      >
        {workspace?.presets.map((presetId) => (
          <PresetOption key={presetId} presetId={presetId} />
        ))}
      </select>
    </div>
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
