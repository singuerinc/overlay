import { GRID_KEYS } from "@/features/grid/store/gridKeys";
import type { IGridStore } from "@/features/grid/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useToggleGridMutation({ frameId }: { frameId: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ visible }: { visible: boolean }) => {
      const grid = queryClient.getQueryData<IGridStore>(
        GRID_KEYS.grid(frameId)
      );

      const updatedGrid = produce(grid, (draftState: IGridStore) => {
        draftState.visible = visible;
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
