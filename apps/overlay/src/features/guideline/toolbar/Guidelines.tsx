import { IconBorderHorizontal, IconBorderVertical } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import {
  IGuideLineStore,
  type IGuideline,
  type IHorizontalGuideline,
  type IVerticalGuideline,
} from "../types";

import { v4 as uuidv4 } from "uuid";
import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";
import { useSetSelectedTool } from "../../../features/tools/store/tools";
import { ToolButton } from "../../../ui/ToolButton";

const createHorizontalGuideline = (): IHorizontalGuideline => ({
  id: uuidv4(),
  type: "guideline-horizontal",
  y: 100,
});
const createVerticalGuideline = (): IVerticalGuideline => ({
  id: uuidv4(),
  type: "guideline-vertical",
  x: 100,
});

export function Guidelines() {
  const setSelectedTool = useSetSelectedTool();
  const executeCommand = useExecuteCommand();
  const queryClient = useQueryClient();

  const addGuideline = useMutation({
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

  const removeGuideline = useMutation({
    mutationFn: async ({ guideline }: { guideline: IGuideline }) => {
      const prevGuidelines = queryClient.getQueryData<IGuideLineStore>([
        "guidelines",
      ]);

      const guidelines = produce(
        prevGuidelines,
        (draftState: IGuideLineStore) => {
          if (guideline.type === "guideline-horizontal") {
            draftState.hGuidelines = draftState.hGuidelines.filter(
              (item) => item.id !== guideline.id
            );
          } else {
            draftState.vGuidelines = draftState.vGuidelines.filter(
              (item) => item.id !== guideline.id
            );
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
      <ToolButton
        enabled={true}
        Icon={IconBorderHorizontal}
        onClick={() => {
          const guideline = createHorizontalGuideline();
          const command = new Command(
            () => {
              addGuideline.mutate({
                guideline,
              });
              setSelectedTool(guideline);
            },
            () => {
              removeGuideline.mutate({
                guideline,
              });
              setSelectedTool(null);
            }
          );

          executeCommand(command);
        }}
      />
      <ToolButton
        enabled={true}
        Icon={IconBorderVertical}
        onClick={() => {
          const guideline = createVerticalGuideline();
          const command = new Command(
            () => {
              addGuideline.mutate({
                guideline,
              });
              setSelectedTool(guideline);
            },
            () => {
              removeGuideline.mutate({
                guideline,
              });
              setSelectedTool(null);
            }
          );

          executeCommand(command);
        }}
      />
    </div>
  );
}
