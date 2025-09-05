import { GRID_KEYS } from "@/features/grid/store/gridKeys";
import { gridSave } from "@/features/grid/store/gridSave";
import type { IGridStore } from "@/features/grid/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useGridMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IGridStore, "id">>) => {
      const grid = queryClient.getQueryData<IGridStore>(
        GRID_KEYS.grid(presetId)
      );

      if (grid) {
        const updatedGrid = produce(grid, (draftState: IGridStore) => {
          Object.assign(draftState, props);
        });

        await gridSave(presetId, updatedGrid);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GRID_KEYS.grid(presetId) });
    },
  });
}
