import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { IGuideLineStore, type IGuideline } from "../types";

export function useAddGuideline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ guideline }: { guideline: IGuideline }) => {
      const prevGuidelines = queryClient.getQueryData<IGuideLineStore>([
        "guidelines",
      ]);

      const guidelines = produce(
        prevGuidelines,
        (draftState: IGuideLineStore) => {
          if (guideline.type === "guideline-horizontal") {
            draftState.hGuidelines.push(guideline);
          } else {
            draftState.vGuidelines.push(guideline);
          }
        }
      );

      queryClient.setQueryData(["guidelines"], guidelines);
      localStorage.setItem("guidelines", JSON.stringify(guidelines));

      return guidelines;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guidelines"] });
    },
  });
}
