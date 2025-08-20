import { useActiveFrameId } from "@/appStore";
import { COLUMNS_KEYS } from "@/features/columns/store/columnsKeys";
import type { IColumnsStore } from "@/features/columns/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

export function useToggleColumnsMutation() {
  const frameId = useActiveFrameId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ visible }: { visible: boolean }) => {
      const columns = queryClient.getQueryData<IColumnsStore>(
        COLUMNS_KEYS.verticalColumns(frameId)
      );

      const updatedColumns = produce(columns, (draftState: IColumnsStore) => {
        draftState.visible = visible;
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
