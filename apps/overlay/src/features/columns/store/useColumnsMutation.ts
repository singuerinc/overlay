import { COLUMNS_KEYS } from "@/features/columns/store/columnsKeys";
import { columnsSave } from "@/features/columns/store/columnsSave";
import type { IColumnsStore } from "@/features/columns/types";
import { usePresetActiveId } from "@/features/preset/hooks/usePresetActiveId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useColumnsMutation() {
  const presetId = usePresetActiveId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IColumnsStore, "id">>) => {
      const columns = queryClient.getQueryData<IColumnsStore>(
        COLUMNS_KEYS.verticalColumns(presetId)
      );

      if (columns) {
        const updatedColumns = produce(columns, (draftState: IColumnsStore) => {
          Object.assign(draftState, props);
        });

        await columnsSave(presetId, updatedColumns);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COLUMNS_KEYS.verticalColumns(presetId),
      });
    },
  });
}
