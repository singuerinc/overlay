import { COLUMNS_KEYS } from "@/features/columns/store/columnsKeys";
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

      const updatedColumns = produce(columns, (draftState: IColumnsStore) => {
        Object.assign(draftState, props);
      });

      localStorage.setItem(
        COLUMNS_KEYS.verticalColumns(presetId).join("-"),
        JSON.stringify(updatedColumns)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COLUMNS_KEYS.verticalColumns(presetId),
      });
    },
  });
}
