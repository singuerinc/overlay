import { useActiveFrameId } from "@/appStore";
import { GRID_KEYS } from "@/features/grid/store/gridKeys";
import type { IGridStore } from "@/features/grid/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useGridMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IGridStore, "id">>) => {
      const grid = queryClient.getQueryData<IGridStore>(
        GRID_KEYS.grid(frameId)
      );

      const updatedGrid = produce(grid, (draftState: IGridStore) => {
        Object.assign(draftState, props);
      });

      localStorage.setItem(
        GRID_KEYS.grid(frameId).join("-"),
        JSON.stringify(updatedGrid)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GRID_KEYS.grid(frameId) });
    },
  });
}
