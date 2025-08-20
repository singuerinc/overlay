import { useActiveFrameId } from "@/appStore";
import { COLUMNS_KEYS } from "@/features/columns/store/columnsKeys";
import type { IColumnsStore } from "@/features/columns/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useSetColumnsMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ numColumns }: { numColumns: number }) => {
      const columns = queryClient.getQueryData<IColumnsStore>(
        COLUMNS_KEYS.verticalColumns(frameId)
      );

      const updatedColumns = produce(columns, (draftState: IColumnsStore) => {
        draftState.numColumns = Math.max(0, numColumns);
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
