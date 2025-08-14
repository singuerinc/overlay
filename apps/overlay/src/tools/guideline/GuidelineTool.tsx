import { IconBorderHorizontal, IconBorderVertical } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import {
  IGuideLineStore,
  type IGuideline,
  type IHorizontalGuideline,
  type IVerticalGuideline,
} from "./types";

import { v4 as uuidv4 } from "uuid";

const createHorizontalGuideline = (): IHorizontalGuideline => ({
  id: uuidv4(),
  type: "horizontal",
  y: 100,
});
const createVerticalGuideline = (): IVerticalGuideline => ({
  id: uuidv4(),
  type: "vertical",
  x: 100,
});

export function GuidelineTool() {
  const queryClient = useQueryClient();

  const addGuideline = useMutation({
    mutationFn: ({ guideline }: { guideline: IGuideline }) => {
      const prevGuidelines = queryClient.getQueryData<IGuideLineStore>([
        "guidelines",
      ]);

      const guidelines = produce(
        prevGuidelines,
        (draftState: IGuideLineStore) => {
          if (guideline.type === "horizontal") {
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

  return (
    <div className="flex gap-x-1">
      <button
        className="hover:bg-neutral-100 rounded-sm p-1 cursor-pointer active:scale-95 transition-transform"
        onClick={() => {
          console.log("MUTATEEEEEE");
          addGuideline.mutate({
            guideline: createHorizontalGuideline(),
          });
        }}
      >
        <IconBorderHorizontal />
      </button>
      <button className="hover:bg-neutral-100 rounded-sm p-1 cursor-pointer active:scale-95 transition-transform">
        <IconBorderVertical
          onClick={() =>
            addGuideline.mutate({
              guideline: createVerticalGuideline(),
            })
          }
        />
      </button>
    </div>
  );
}
