import { IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { IGuideLineStore, type IGuideline } from "../types";

import { Command } from "../../../features/commands/Command";
import { useExecuteCommand } from "../../../features/commands/store/commands";
import {
  useSelectedTool,
  useSetSelectedTool,
} from "../../../features/tools/store/tools";
import { ToolButton } from "../../../ui/ToolButton";

export function Guideline() {
  const selectedTool = useSelectedTool();
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

  if (
    selectedTool === null ||
    (selectedTool.type !== "guideline-horizontal" &&
      selectedTool.type !== "guideline-vertical")
  ) {
    return null;
  }

  return (
    <div className="flex gap-x-1">
      <ToolButton
        enabled={selectedTool !== null}
        Icon={IconTrash}
        onClick={() => {
          const guideline = { ...selectedTool } as IGuideline;
          const command = new Command(
            () => {
              removeGuideline.mutate({
                guideline,
              });
              setSelectedTool(null);
            },
            () => {
              addGuideline.mutate({
                guideline,
              });
              setSelectedTool(guideline);
            }
          );

          executeCommand(command);
        }}
      />
    </div>
  );
}
