import { TOOLBOX_KEYS } from "@/features/toolbox/store/toolBoxKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import type { IToolBox } from "../types";

export function useToolBoxMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: Partial<Exclude<IToolBox, "id">>) => {
      const toolBox = queryClient.getQueryData<IToolBox>(
        TOOLBOX_KEYS.toolbox()
      );

      const updatedToolBox = produce(toolBox, (draftState: IToolBox) => {
        Object.assign(draftState, props);
      });

      localStorage.setItem(
        TOOLBOX_KEYS.toolbox().join("-"),
        JSON.stringify(updatedToolBox)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TOOLBOX_KEYS.toolbox(),
      });
    },
  });
}
