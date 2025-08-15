import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { Guideline } from "./Guideline";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Command } from "../../features/commands/Command";
import { useExecuteCommand } from "../../features/commands/store/commands";
import { useSetSelectedTool } from "../../features/tools/store/tools";
import type { IGuideLineStore } from "./types";

function getGuidelines(): Promise<IGuideLineStore> {
  return new Promise((resolve) => {
    const maybeGuidelines = localStorage.getItem("guidelines");

    if (maybeGuidelines === null) {
      resolve([]);
    } else {
      resolve(JSON.parse(maybeGuidelines));
    }
  });
}

function postGuidelines(data: IGuideLineStore): Promise<void> {
  return new Promise((resolve) => {
    localStorage.setItem("guidelines", JSON.stringify(data));
    resolve();
  });
}

export function GuidelinesRoot() {
  const setSelectedTool = useSetSelectedTool();
  const executeCommand = useExecuteCommand();
  const queryClient = useQueryClient();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      tolerance: 10,
      delay: 100,
    },
  });
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const { data } = useQuery<IGuideLineStore>({
    queryKey: ["guidelines"],
    queryFn: getGuidelines,
  });

  const guidelines = data ?? [];

  const mutation = useMutation({
    mutationFn: postGuidelines,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guidelines"] });
    },
  });

  // TODO: extract to avoid repetition with horizontal & vertical

  const handleHorizontalDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    const activeItem = guidelines.find((item) => item.id === active.id);

    const command = new Command(
      () => {
        mutation.mutate(
          guidelines.map((item) => {
            if (item.id === active.id) {
              const newItem = { ...item, y: item.y + delta.y };
              setSelectedTool(newItem);
              return newItem;
            }
            return item;
          })
        );
      },
      () => {
        const pItem = { ...activeItem, y: activeItem.y };
        mutation.mutate(
          guidelines.map((item) => {
            if (item.id === active.id) {
              setSelectedTool(pItem);
              return pItem;
            }
            return item;
          })
        );
      }
    );

    executeCommand(command);
  };

  const handleVerticalDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    const activeItem = guidelines.find((item) => item.id === active.id);

    const command = new Command(
      () => {
        mutation.mutate(
          guidelines.map((item) => {
            if (item.id === active.id) {
              const newItem = { ...item, x: item.x + delta.x };
              setSelectedTool(newItem);
              return newItem;
            }
            return item;
          })
        );
      },
      () => {
        const pItem = { ...activeItem, x: activeItem.x };
        mutation.mutate(
          guidelines.map((item) => {
            if (item.id === active.id) {
              setSelectedTool(pItem);
              return pItem;
            }
            return item;
          })
        );
      }
    );

    executeCommand(command);
  };

  return (
    <div className="h-screen w-screen relative">
      <DndContext
        sensors={sensors}
        onDragEnd={handleHorizontalDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        {guidelines
          .filter((item) => item.type === "guideline-horizontal")
          .map((item) => (
            <Guideline key={item.id} tool={item} />
          ))}
      </DndContext>
      <DndContext
        sensors={sensors}
        onDragEnd={handleVerticalDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        {guidelines
          .filter((item) => item.type === "guideline-vertical")
          .map((item) => (
            <Guideline key={item.id} tool={item} />
          ))}
      </DndContext>
    </div>
  );
}
