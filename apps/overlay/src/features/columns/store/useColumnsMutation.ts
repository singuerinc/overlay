import { COLUMNS_KEYS } from "@/features/columns/store/columnsKeys";
import type { IColumnsStore } from "@/features/columns/types";
import { useFrameActiveId } from "@/features/frame/hooks/useFrameActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useColumnsMutation() {
  const frameId = useFrameActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IColumnsStore, "id">>) => {
      const columns = queryClient.getQueryData<IColumnsStore>(
        COLUMNS_KEYS.verticalColumns(frameId)
      );

      const updatedColumns = produce(columns, (draftState: IColumnsStore) => {
        Object.assign(draftState, props);
      });

      localStorage.setItem(
        COLUMNS_KEYS.verticalColumns(frameId).join("-"),
        JSON.stringify(updatedColumns)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COLUMNS_KEYS.verticalColumns(frameId),
      });
    },
  });
}
