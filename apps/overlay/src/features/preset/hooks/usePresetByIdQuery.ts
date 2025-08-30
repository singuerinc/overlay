import { createPreset } from "@/features/preset/store/createPreset";
import { PRESETS_KEYS } from "@/features/preset/store/presetsKeys";
import type { IPreset } from "@/features/preset/types";
import { useWorkspaceId } from "@/features/workspace/hooks/useWorkspaceId";
import { useQuery } from "@tanstack/react-query";

function getPreset(workspaceId: string, id: IPreset["id"]): Promise<IPreset> {
  return new Promise((resolve) => {
    const maybePreset = localStorage.getItem(
      PRESETS_KEYS.preset(workspaceId, id).join("-")
    );

    if (maybePreset === null) {
      const preset = createPreset({ id });
      localStorage.setItem(
        PRESETS_KEYS.preset(workspaceId, preset.id).join("-"),
        JSON.stringify(preset)
      );
      resolve(preset);
    } else {
      resolve(JSON.parse(maybePreset));
    }
  });
}

export function usePresetByIdQuery({ id }: { id: IPreset["id"] }) {
  const workspaceId = useWorkspaceId();
  return useQuery({
    queryKey: PRESETS_KEYS.preset(workspaceId, id),
    queryFn: () => getPreset(workspaceId, id),
  });
}
